import { prisma } from "../db/prisma";

export interface TelegramConfig {
  botToken: string;
  mabesChatId: string;
  botUsername: string;
  supportLink: string;
}

// In-memory cache for bot username to avoid round-tripping to Telegram API constantly
let cachedBotUsername: string | null = null;
let lastUsernameFetchTime = 0;

/**
 * 1. Dynamic Config Loader:
 * Reads latest Telegram Bot configuration from PostgreSQL (PlatformSetting),
 * with fallback to process.env variables.
 */
export async function getTelegramConfig(): Promise<TelegramConfig> {
  try {
    const settings = await prisma.platformSetting.findMany({
      where: {
        key: {
          in: [
            "telegram_mabes_bot_token",
            "telegramBotToken",
            "telegram_mabes_chat_id",
            "telegramMabesChatId",
            "support_telegram",
            "supportLink",
            "telegram_bot_username",
            "telegramBotUsername",
          ],
        },
      },
    });

    const map = new Map<string, string>();
    for (const s of settings) {
      map.set(s.key, s.value);
    }

    const botToken = (
      map.get("telegram_mabes_bot_token") ||
      map.get("telegramBotToken") ||
      process.env.TELEGRAM_BOT_TOKEN ||
      ""
    ).trim();

    const mabesChatId = (
      map.get("telegram_mabes_chat_id") ||
      map.get("telegramMabesChatId") ||
      process.env.TELEGRAM_MABES_CHAT_ID ||
      ""
    ).trim();

    const supportLink = (
      map.get("support_telegram") ||
      map.get("supportLink") ||
      "https://t.me/etalaseonline_bot"
    ).trim();

    let botUsername = (
      map.get("telegram_bot_username") ||
      map.get("telegramBotUsername") ||
      process.env.TELEGRAM_BOT_USERNAME ||
      cachedBotUsername ||
      ""
    ).trim();

    // Auto-fetch bot username from getMe if empty
    const now = Date.now();
    if (!botUsername && botToken && now - lastUsernameFetchTime > 300000) {
      lastUsernameFetchTime = now;
      const fetched = await fetchTelegramBotUsername(botToken);
      if (fetched) {
        botUsername = fetched;
        cachedBotUsername = fetched;
        prisma.platformSetting
          .upsert({
            where: { key: "telegram_bot_username" },
            update: { value: fetched, group: "TELEGRAM" },
            create: { key: "telegram_bot_username", value: fetched, group: "TELEGRAM" },
          })
          .catch((err) => console.warn("Failed to persist bot username:", err));
      }
    }

    return {
      botToken,
      mabesChatId,
      botUsername: botUsername || "etalaseonline_bot",
      supportLink,
    };
  } catch (err) {
    console.warn("getTelegramConfig error:", err);
    return {
      botToken: (process.env.TELEGRAM_BOT_TOKEN || "").trim(),
      mabesChatId: (process.env.TELEGRAM_MABES_CHAT_ID || "").trim(),
      botUsername: (process.env.TELEGRAM_BOT_USERNAME || "etalaseonline_bot").trim(),
      supportLink: "https://t.me/etalaseonline_bot",
    };
  }
}

/**
 * 2. Fetch Bot Username via Telegram getMe
 */
export async function fetchTelegramBotUsername(token: string): Promise<string | null> {
  if (!token) return null;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getMe`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.ok && data.result?.username) {
      cachedBotUsername = data.result.username;
      return data.result.username;
    }
    return null;
  } catch (e) {
    console.warn("fetchTelegramBotUsername error:", e);
    return null;
  }
}

/**
 * 3. Auto-Register Webhook to /api/telegram/webhook
 */
export async function registerTelegramWebhook(
  token?: string,
  customWebhookUrl?: string
): Promise<{ success: boolean; description: string; webhookUrl: string; botUsername?: string }> {
  const config = await getTelegramConfig();
  const activeToken = token ? token.trim() : config.botToken;

  if (!activeToken) {
    return {
      success: false,
      description: "No Telegram Bot Token provided or configured.",
      webhookUrl: "",
    };
  }

  const appUrl = (
    process.env.NEXT_PUBLIC_APP_URL ||
    `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN || "etalase.online"}`
  ).replace(/\/$/, "");

  const webhookUrl = customWebhookUrl || `${appUrl}/api/telegram/webhook`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${activeToken}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        drop_pending_updates: false,
        allowed_updates: ["message", "callback_query"],
      }),
    });

    const data = await res.json();

    let fetchedUsername = config.botUsername;
    if (activeToken) {
      const u = await fetchTelegramBotUsername(activeToken);
      if (u) {
        fetchedUsername = u;
        await prisma.platformSetting
          .upsert({
            where: { key: "telegram_bot_username" },
            update: { value: u, group: "TELEGRAM" },
            create: { key: "telegram_bot_username", value: u, group: "TELEGRAM" },
          })
          .catch(() => {});
      }
    }

    if (data.ok) {
      // Record in AutomationLog
      prisma.automationLog
        .create({
          data: {
            event: "telegram.set_webhook",
            channel: "TELEGRAM",
            status: "SUCCESS",
            payload: { webhookUrl, botUsername: fetchedUsername },
            response: data.description,
          },
        })
        .catch(() => {});

      return {
        success: true,
        description: data.description || "Webhook successfully registered with Telegram.",
        webhookUrl,
        botUsername: fetchedUsername,
      };
    } else {
      prisma.automationLog
        .create({
          data: {
            event: "telegram.set_webhook",
            channel: "TELEGRAM",
            status: "FAILED",
            payload: { webhookUrl },
            error: data.description,
          },
        })
        .catch(() => {});

      return {
        success: false,
        description: data.description || "Telegram API rejected webhook registration.",
        webhookUrl,
        botUsername: fetchedUsername,
      };
    }
  } catch (err: any) {
    console.error("registerTelegramWebhook error:", err);
    return {
      success: false,
      description: err.message || "Network error registering webhook.",
      webhookUrl,
    };
  }
}

/**
 * Helper to escape HTML characters for safe Telegram HTML parse_mode
 */
export function escapeHtml(str: string | number | null | undefined): string {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * 4. Generic Message Sender with dynamic configuration & resilient HTML parse_mode
 * Automatically falls back to plain text if Telegram rejects parsing entities.
 */
export async function sendTelegramMessage(
  chatId: string,
  text: string,
  options?: {
    customBotToken?: string;
    parseMode?: "HTML" | "Markdown" | "NONE";
    replyMarkup?: any;
    eventTag?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const config = await getTelegramConfig();
    const token = options?.customBotToken || config.botToken;

    if (!token || !chatId) {
      return { success: false, error: "Missing bot token or destination chat ID." };
    }

    const trimmedChatId = chatId.trim();

    // Guard: Prevent sending message to bot username
    if (
      trimmedChatId.toLowerCase().includes("bot") &&
      !trimmedChatId.startsWith("-100")
    ) {
      const err = `Invalid Chat ID: '${trimmedChatId}' appears to be a bot username. Telegram bots cannot message themselves. Please use a numerical User ID (e.g. 123456789) or Group Chat ID (e.g. -1001234567890).`;
      prisma.automationLog
        .create({
          data: {
            event: options?.eventTag || "telegram.send_message",
            channel: "TELEGRAM",
            status: "FAILED",
            payload: { chatId: trimmedChatId, eventTag: options?.eventTag },
            error: err,
          },
        })
        .catch(() => {});
      return { success: false, error: err };
    }

    const parseMode = options?.parseMode === "NONE" ? undefined : options?.parseMode || "HTML";

    const payload: any = {
      chat_id: trimmedChatId,
      text,
    };

    if (parseMode) {
      payload.parse_mode = parseMode;
    }

    if (options?.replyMarkup) {
      payload.reply_markup = options.replyMarkup;
    }

    let res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let resJson = await res.json();

    // Automatic fallback: If Telegram fails with entity parsing error, retry once as plain text
    if (!res.ok && resJson?.description && resJson.description.includes("can't parse entities")) {
      console.warn(`[telegram-service] Telegram entity parsing failed, retrying as plain text without parse_mode: ${resJson.description}`);
      const plainPayload = {
        ...payload,
        parse_mode: undefined,
        text: text.replace(/<[^>]+>/g, ""), // strip HTML tags for plain text fallback
      };
      res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plainPayload),
      });
      resJson = await res.json();
    }

    // Log automation event
    prisma.automationLog
      .create({
        data: {
          event: options?.eventTag || "telegram.send_message",
          channel: "TELEGRAM",
          status: res.ok ? "SUCCESS" : "FAILED",
          payload: { chatId: trimmedChatId, eventTag: options?.eventTag },
          response: res.ok ? "Message sent" : undefined,
          error: res.ok ? undefined : resJson?.description,
        },
      })
      .catch(() => {});

    if (!res.ok) {
      return { success: false, error: resJson?.description || "Telegram API error." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("sendTelegramMessage error:", err);
    return { success: false, error: err.message || "Failed to send message." };
  }
}

/**
 * 5. Notify Mabes Group: New Tenant Registered
 */
export async function notifyMabesNewTenant(data: {
  storeName: string;
  storeSlug: string;
  ownerEmail: string;
  tier: string;
  chatHandle?: string | null;
}): Promise<void> {
  const config = await getTelegramConfig();
  if (!config.mabesChatId) return;

  const msg = [
    `🏪 <b>[Mabes Alert] Toko Baru Terdaftar!</b>`,
    ``,
    `• <b>Nama Toko:</b> ${escapeHtml(data.storeName)}`,
    `• <b>Subdomain:</b> <code>${escapeHtml(data.storeSlug)}.etalase.online</code>`,
    `• <b>Email Merchant:</b> <code>${escapeHtml(data.ownerEmail)}</code>`,
    `• <b>Tier:</b> <b>${escapeHtml(data.tier)}</b>`,
    `• <b>WhatsApp:</b> <code>${escapeHtml(data.chatHandle || "N/A")}</code>`,
    `• <b>Waktu:</b> ${new Date().toLocaleString("id-ID")}`,
    ``,
    `🔗 <a href="https://mabes.etalase.online/mabes/tenants">Buka di Tenant Console</a>`,
  ].join("\n");

  sendTelegramMessage(config.mabesChatId, msg, {
    eventTag: "mabes.new_tenant",
    parseMode: "HTML",
  }).catch(() => {});
}

/**
 * 6. Notify Mabes Group: New Plan Upgrade Order / Proof of Payment
 */
export async function notifyMabesUpgradePayment(data: {
  orderNumber: string;
  storeName: string;
  storeSlug: string;
  planCode: string;
  billingCycle: string;
  amount: number | string;
  paymentMethod: string;
  proofUrl?: string | null;
}): Promise<void> {
  const config = await getTelegramConfig();
  if (!config.mabesChatId) return;

  const msg = [
    `💳 <b>[Mabes Alert] Pesanan Upgrade Paket Masuk!</b>`,
    ``,
    `• <b>No. Invoice:</b> <b>#${escapeHtml(data.orderNumber)}</b>`,
    `• <b>Toko:</b> ${escapeHtml(data.storeName)} (<code>${escapeHtml(data.storeSlug)}</code>)`,
    `• <b>Paket:</b> <b>${escapeHtml(data.planCode)} (${escapeHtml(data.billingCycle)})</b>`,
    `• <b>Nominal:</b> <b>Rp ${Number(data.amount).toLocaleString("id-ID")}</b>`,
    `• <b>Metode:</b> <b>${escapeHtml(data.paymentMethod)}</b>`,
    data.proofUrl ? `• <b>Bukti Transfer:</b> <a href="${data.proofUrl}">Lihat Gambar Bukti</a>` : ``,
    `• <b>Waktu:</b> ${new Date().toLocaleString("id-ID")}`,
    ``,
    `⚡ <a href="https://mabes.etalase.online/mabes/billing">Verifikasi & Aktivasi Segera</a>`,
  ]
    .filter(Boolean)
    .join("\n");

  sendTelegramMessage(config.mabesChatId, msg, {
    eventTag: "mabes.plan_upgrade",
    parseMode: "HTML",
  }).catch(() => {});
}

/**
 * 7. Notify Mabes Group: Merchant Withdrawal Payout Requested
 */
export async function notifyMabesWithdrawalRequest(data: {
  storeName: string;
  storeSlug: string;
  amount: number | string;
  netAmount: number | string;
  destination: string;
}): Promise<void> {
  const config = await getTelegramConfig();
  if (!config.mabesChatId) return;

  const msg = [
    `💸 <b>[Mabes Alert] Permohonan Penarikan Dana (Payout)!</b>`,
    ``,
    `• <b>Toko:</b> ${escapeHtml(data.storeName)} (<code>${escapeHtml(data.storeSlug)}</code>)`,
    `• <b>Nominal Penarikan:</b> <b>Rp ${Number(data.amount).toLocaleString("id-ID")}</b>`,
    `• <b>Rekening Tujuan:</b> <code>${escapeHtml(data.destination)}</code>`,
    `• <b>Nominal Bersih Disalurkan:</b> <b>Rp ${Number(data.netAmount).toLocaleString("id-ID")}</b>`,
    `• <b>Waktu:</b> ${new Date().toLocaleString("id-ID")}`,
    ``,
    `⚡ <a href="https://mabes.etalase.online/mabes/payouts">Proses Pencairan di Mabes</a>`,
  ].join("\n");

  sendTelegramMessage(config.mabesChatId, msg, {
    eventTag: "mabes.withdrawal_request",
    parseMode: "HTML",
  }).catch(() => {});
}

/**
 * 8. Notify Tenant Store Owner: New Customer Order Paid
 */
export async function notifyTenantNewOrder(
  storeId: string,
  data: {
    orderCode: string;
    productTitle: string;
    amount: number | string;
    buyerName: string;
    buyerWhatsapp: string;
    paymentMethod?: string;
  }
): Promise<void> {
  try {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      select: {
        id: true,
        name: true,
        slug: true,
        appearanceConfig: true,
      },
    });

    if (!store) return;

    const appearance = (store.appearanceConfig as any) || {};
    const integration = appearance.telegramIntegration;

    if (!integration?.isConnected || !integration?.chatId) {
      return; // Tenant hasn't linked Telegram
    }

    const msg = [
      `🛍️ <b>Pesanan Baru Masuk di Toko Anda!</b>`,
      ``,
      `• <b>No. Pesanan:</b> <b>#${escapeHtml(data.orderCode)}</b>`,
      `• <b>Produk:</b> ${escapeHtml(data.productTitle)}`,
      `• <b>Total Pembayaran:</b> <b>Rp ${Number(data.amount).toLocaleString("id-ID")}</b>`,
      `• <b>Nama Pembeli:</b> ${escapeHtml(data.buyerName)}`,
      `• <b>WhatsApp:</b> <code>${escapeHtml(data.buyerWhatsapp)}</code>`,
      `• <b>Metode:</b> <b>${escapeHtml(data.paymentMethod || "QRIS / Chat")}</b>`,
      ``,
      `📦 <a href="https://${store.slug}.etalase.online/admin/orders">Buka Dashboard Pesanan Toko</a>`,
    ].join("\n");

    // Use custom bot token if tenant provided their own, otherwise platform bot
    const customToken = integration.botToken?.trim() || undefined;

    sendTelegramMessage(integration.chatId, msg, {
      customBotToken: customToken,
      eventTag: "tenant.new_order",
      parseMode: "HTML",
    }).catch(() => {});
  } catch (err) {
    console.warn("notifyTenantNewOrder error:", err);
  }
}
