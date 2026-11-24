import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  getTelegramConfig,
  sendTelegramMessage,
  sendChatAction,
  escapeHtml,
} from "@/lib/services/telegram-service";
import { generateRaniCsReply } from "@/lib/services/telegram-ai-cs";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();

    const message = update.message || update.edited_message;
    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const chatId = String(message.chat.id);
    const from = message.from;
    const config = await getTelegramConfig();
    const isGroup = message.chat.type === "group" || message.chat.type === "supergroup";
    const senderName = from?.first_name || "Kak";
    const userHandle = from?.username;

    // Helper: Build direct Telegram link to private chat with the user
    const userTelegramUrl = userHandle
      ? `https://t.me/${userHandle}`
      : `tg://user?id=${chatId}`;

    // Handle bot being added to a group: auto-post group chat ID
    if (
      message.new_chat_members ||
      message.group_chat_created ||
      message.supergroup_chat_created
    ) {
      const groupAlert = [
        `👋 <b>Bot etalase.online Berhasil Terhubung ke Grup Ini!</b>`,
        ``,
        `🆔 <b>Mabes Group Chat ID:</b> <code>${chatId}</code>`,
        ``,
        `💡 <i>Salin angka Chat ID di atas dan masukkan ke menu <b>Platform Settings &gt; Telegram Mabes Group Chat ID</b> di Mabes Console (<code>/mabes/settings</code>) untuk mengaktifkan notifikasi operasional platform.</i>`,
      ].join("\n");
      await sendTelegramMessage(chatId, groupAlert, { parseMode: "HTML" });
      return NextResponse.json({ ok: true });
    }

    const text = (message.text || "").trim();
    if (!text) {
      return NextResponse.json({ ok: true });
    }

    // Handle /id, /myid, /chatid commands
    if (text === "/id" || text === "/myid" || text === "/chatid") {
      const idMsg = [
        `🆔 <b>${isGroup ? "ID Grup Telegram Ini" : "Telegram User ID Anda"}:</b>`,
        `<code>${chatId}</code>`,
        ``,
        `💡 <i>Salin angka di atas dan tempelkan ke kolom <b>Telegram Mabes Group Chat ID</b> di menu Platform Settings Mabes (<code>/mabes/settings</code>) untuk menerima notifikasi operasional realtime.</i>`,
      ].join("\n");

      await sendTelegramMessage(chatId, idMsg, { parseMode: "HTML" });
      return NextResponse.json({ ok: true });
    }

    // 1. Handle /start command and sub-actions
    if (text.startsWith("/start")) {
      const parts = text.split(" ");
      const param = parts.length > 1 ? parts[1].trim() : "";

      // A. Tenant 1-Click Bind: /start bind_<STORE_ID_OR_SLUG>
      if (param.startsWith("bind_")) {
        const storeIdentifier = param.replace("bind_", "").trim();

        const store = await prisma.store.findFirst({
          where: {
            OR: [
              { id: storeIdentifier },
              { slug: storeIdentifier.toLowerCase() },
            ],
          },
          select: {
            id: true,
            name: true,
            slug: true,
            appearanceConfig: true,
          },
        });

        if (store) {
          const currentConfig =
            typeof store.appearanceConfig === "object" && store.appearanceConfig !== null
              ? (store.appearanceConfig as any)
              : {};

          const telegramUserName = userHandle ? `@${userHandle}` : senderName;

          await prisma.store.update({
            where: { id: store.id },
            data: {
              appearanceConfig: {
                ...currentConfig,
                telegramIntegration: {
                  chatId,
                  isConnected: true,
                  connectedAt: new Date().toISOString(),
                  telegramUser: telegramUserName,
                },
              },
            },
          });

          // Record in AutomationLog
          await prisma.automationLog.create({
            data: {
              event: "tenant.telegram_bound",
              channel: "TELEGRAM",
              status: "SUCCESS",
              payload: {
                storeId: store.id,
                storeSlug: store.slug,
                chatId,
                telegramUser: telegramUserName,
              },
              response: "Store connected to Telegram chat",
            },
          });

          const successMsg = [
            `🎉 <b>Selamat! Toko Berhasil Terhubung!</b>`,
            ``,
            `Toko <b>${escapeHtml(store.name)}</b> (<code>${store.slug}.etalase.online</code>) kini telah resmi terhubung ke akun Telegram ini.`,
            ``,
            `Anda akan menerima notifikasi instan langsung di chat ini setiap kali:`,
            `✅ Ada pesanan baru dari konsumen`,
            `✅ Pembayaran QRIS Borderpay atau PayPal sukses`,
            `✅ Status penarikan saldo toko diproses`,
            ``,
            `📦 <a href="https://${store.slug}.etalase.online/admin">Buka Dashboard Admin</a>`,
          ].join("\n");

          await sendTelegramMessage(chatId, successMsg, { parseMode: "HTML" });
          return NextResponse.json({ ok: true });
        } else {
          const notFoundMsg = [
            `⚠️ <b>Token Toko Tidak Ditemukan</b>`,
            ``,
            `Tautan aktivasi tidak valid atau telah kedaluwarsa.`,
            `Silakan buka kembali Admin Console Toko Anda di menu <b>Settings &gt; Integrations</b>, lalu klik tombol <b>Connect Telegram (1-Click)</b>.`,
          ].join("\n");

          await sendTelegramMessage(chatId, notFoundMsg, { parseMode: "HTML" });
          return NextResponse.json({ ok: true });
        }
      }

      // Send typing indicator for Rani's greeting
      await sendChatAction(chatId, "typing");

      // B. Sub-route: /start support, /start ask_pricing, /start dfy_consult, /start tenant_<slug>
      if (
        param === "support" ||
        param === "ask_pricing" ||
        param === "dfy_consult" ||
        param.startsWith("tenant_")
      ) {
        const replyResult = await generateRaniCsReply({
          userMessage: `/start ${param}`,
          userName: senderName,
          userChatId: chatId,
          userHandle,
        });

        await sendTelegramMessage(chatId, replyResult.reply, { parseMode: "HTML" });

        // If consulting DFY or requesting support escalation, notify Mabes Private Group
        if (replyResult.shouldEscalate && config.mabesChatId) {
          const mabesEscalationMsg = [
            `🚨 <b>MABES ALERT: Calon Klien Konsultasi / Butuh Bantuan</b>`,
            ``,
            `👤 <b>Dari:</b> ${escapeHtml(senderName)} ${userHandle ? `(@${userHandle})` : `(ID: <code>${chatId}</code>)`}`,
            `📌 <b>Kategori:</b> <code>${replyResult.escalationCategory || "GENERAL"}</code>`,
            `📝 <b>Alasan:</b> ${replyResult.escalationReason || "Memerlukan konsultasi tim Mabes."}`,
            `💬 <b>Parameter:</b> <code>/start ${param}</code>`,
          ].join("\n");

          await sendTelegramMessage(config.mabesChatId, mabesEscalationMsg, {
            parseMode: "HTML",
            replyMarkup: {
              inline_keyboard: [
                [
                  {
                    text: `💬 Balas Japri @${userHandle || senderName}`,
                    url: userTelegramUrl,
                  },
                ],
              ],
            },
            eventTag: "mabes.escalation_alert",
          });
        }

        return NextResponse.json({ ok: true });
      }

      // C. General /start Greeting from Rani
      const raniWelcomeMsg = [
        `👋 <b>Halo Kak ${escapeHtml(senderName)}! Selamat Datang di Bot Resmi etalase.online ✨</b>`,
        ``,
        `Kenalkan, saya <b>Rani</b>, Customer Success & Product Specialist dari <b>etalase.online</b> (PT Rafa Kreasindo Teknologi). Senang sekali bisa menyapa Kakak! 😊`,
        ``,
        `Ada yang bisa Rani bantu hari ini? Kakak bisa langsung tanya apa saja atau gunakan opsi di bawah ini:`,
        ``,
        `• 💡 <b>Tanya Paket & Harga:</b> Ketik <i>"Berapa harga paket PRO?"</i>`,
        `• 🌟 <b>Paket Terima Beres:</b> Ketik <i>"Mau paket Terima Beres DFY"</i>`,
        `• 💳 <b>Metode Pembayaran:</b> Ketik <i>"Cara bayar QRIS dan PayPal"</i>`,
        `• 🌐 <b>Custom Domain:</b> Ketik <i>"Cara pasang domain sendiri"</i>`,
        `• 🆔 <b>Cek ID Chat:</b> Ketik <code>/id</code>`,
        ``,
        `💬 <i>Silakan langsung ketik pertanyaan Kakak di kolom chat ini ya! Rani siap bantu 24/7.</i>`,
      ].join("\n");

      await sendTelegramMessage(chatId, raniWelcomeMsg, { parseMode: "HTML" });
      return NextResponse.json({ ok: true });
    }

    // 2. Handle /help command
    if (text === "/help") {
      const helpMsg = [
        `ℹ️ <b>Bantuan etalase.online Bot</b>`,
        ``,
        `🆔 <b>Chat ID Anda / Grup Ini:</b> <code>${chatId}</code>`,
        ``,
        `Perintah & Bantuan yang tersedia:`,
        `• <code>/start</code> — Sapaan & ringkasan bot resmi`,
        `• <code>/id</code> — Cek ID Chat ini untuk konfigurasi Mabes`,
        `• <code>/help</code> — Menampilkan panduan penggunaan ini`,
        ``,
        `🤖 <b>Tanya Rani AI CS 24/7:</b> Langsung ketik pertanyaan bebas Anda seputar etalase.online di ruang obrolan ini.`,
        `🏢 <b>Website:</b> https://etalase.online`,
        `💬 <b>Portal Bantuan:</b> https://etalase.online/bantuan`,
      ].join("\n");

      await sendTelegramMessage(chatId, helpMsg, { parseMode: "HTML" });
      return NextResponse.json({ ok: true });
    }

    // 3. Handle Natural Language / Free-Text Message in Private Chat (AI CS "Rani")
    if (!isGroup) {
      // Send Telegram typing action indicator
      await sendChatAction(chatId, "typing");

      // Generate conversational AI reply from Rani (Gemini 2.5 Flash with fallback)
      const replyResult = await generateRaniCsReply({
        userMessage: text,
        userName: senderName,
        userChatId: chatId,
        userHandle,
      });

      // Deliver Rani's response to the user
      await sendTelegramMessage(chatId, replyResult.reply, { parseMode: "HTML" });

      // Record in AutomationLog
      await prisma.automationLog
        .create({
          data: {
            event: "telegram.ai_cs_reply",
            channel: "TELEGRAM",
            status: "SUCCESS",
            payload: {
              chatId,
              userHandle,
              userMessage: text,
              escalated: replyResult.shouldEscalate,
              escalationCategory: replyResult.escalationCategory,
            },
            response: replyResult.reply.substring(0, 500),
          },
        })
        .catch(() => {});

      // If Rani detects escalation condition (Human Agent, Payout issue, or DFY consult)
      // forward alert to Mabes Private Group if configured
      if (replyResult.shouldEscalate && config.mabesChatId) {
        const mabesEscalationMsg = [
          `🚨 <b>ESKALASI CS MABES: Butuh Penanganan Operator</b>`,
          ``,
          `👤 <b>User:</b> ${escapeHtml(senderName)} ${userHandle ? `(@${userHandle})` : `(ID: <code>${chatId}</code>)`}`,
          `📌 <b>Kategori:</b> <code>${replyResult.escalationCategory || "GENERAL"}</code>`,
          `📝 <b>Alasan:</b> ${replyResult.escalationReason || "Pengguna meminta penanganan staf manusia."}`,
          ``,
          `💬 <b>Pesan User:</b>`,
          `<i>"${escapeHtml(text)}"</i>`,
          ``,
          `💡 <i>Klik tombol di bawah untuk langsung membuka chat japri Telegram dengan user ini.</i>`,
        ].join("\n");

        await sendTelegramMessage(config.mabesChatId, mabesEscalationMsg, {
          parseMode: "HTML",
          replyMarkup: {
            inline_keyboard: [
              [
                {
                  text: `💬 Balas Japri @${userHandle || senderName}`,
                  url: userTelegramUrl,
                },
              ],
            ],
          },
          eventTag: "mabes.escalation_alert",
        });
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: true, error: err.message }, { status: 200 });
  }
}
