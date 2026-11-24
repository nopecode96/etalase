import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getTelegramConfig, sendTelegramMessage } from "@/lib/services/telegram-service";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();

    const message = update.message || update.edited_message;
    if (!message || !message.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = String(message.chat.id);
    const text = message.text.trim();
    const from = message.from;
    const config = await getTelegramConfig();

    // 1. Handle /start command
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

          const telegramUserName = from?.username
            ? `@${from.username}`
            : from?.first_name || "Merchant";

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
            `🎉 *Selamat! Toko Berhasil Terhubung!*`,
            ``,
            `Toko *${store.name}* (\`${store.slug}.etalase.online\`) kini telah resmi terhubung ke akun Telegram ini.`,
            ``,
            `Anda akan menerima notifikasi instan langsung di chat ini setiap kali:`,
            `✅ Ada pesanan baru dari konsumen`,
            `✅ Pembayaran QRIS Borderpay atau PayPal sukses`,
            `✅ Status penarikan saldo toko diproses`,
            ``,
            `📦 [Buka Dashboard Admin](https://${store.slug}.etalase.online/admin)`,
          ].join("\n");

          await sendTelegramMessage(chatId, successMsg);
          return NextResponse.json({ ok: true });
        } else {
          const notFoundMsg = [
            `⚠️ *Token Toko Tidak Ditemukan*`,
            ``,
            `Tautan aktivasi tidak valid atau telah kedaluwarsa.`,
            `Silakan buka kembali Admin Console Toko Anda di menu *Settings > Integrations*, lalu klik tombol *Connect Telegram (1-Click)*.`,
          ].join("\n");

          await sendTelegramMessage(chatId, notFoundMsg);
          return NextResponse.json({ ok: true });
        }
      }

      // B. General /start greeting
      const greetingMsg = [
        `👋 *Halo! Selamat Datang di Bot Resmi etalase.online*`,
        ``,
        `Platform SaaS pembuatan etalase digital, menu visual F&B, dan link-in-bio instan untuk UMKM & Kreator Asia Tenggara.`,
        ``,
        `🌐 *Website Utama:* https://etalase.online`,
        `🏢 *Bantuan & Support:* ${config.supportLink}`,
        ``,
        `*Bagi Pemilik Toko:*`,
        `Untuk menghubungkan toko Anda ke bot ini agar menerima push notifikasi pesanan masuk, buka menu *Settings > Integrations* di Dashboard Admin Toko Anda lalu klik *Connect Telegram (1-Click)*.`,
      ].join("\n");

      await sendTelegramMessage(chatId, greetingMsg);
      return NextResponse.json({ ok: true });
    }

    // 2. Handle /help command
    if (text === "/help") {
      const helpMsg = [
        `ℹ️ *Bantuan etalase.online Bot*`,
        ``,
        `Perintah yang tersedia:`,
        `• \`/start\` — Menampilkan informasi selamat datang & status bot`,
        `• \`/help\` — Menampilkan panduan penggunaan ini`,
        ``,
        `Jika Anda membutuhkan bantuan teknis, hubungi Customer Care kami di ${config.supportLink}.`,
      ].join("\n");

      await sendTelegramMessage(chatId, helpMsg);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: true, error: err.message }, { status: 200 });
  }
}
