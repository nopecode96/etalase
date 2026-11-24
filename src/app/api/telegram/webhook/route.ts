import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getTelegramConfig, sendTelegramMessage } from "@/lib/services/telegram-service";

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

    // Handle bot being added to a group: auto-post group chat ID
    if (message.new_chat_members || message.group_chat_created || message.supergroup_chat_created) {
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
        `💡 <i>Salin angka di atas dan tempelkan ke kolom <b>Telegram Mabes Group Chat ID</b> di menu Platform Settings Mabes (<code>/mabes/settings</code>).</i>`,
      ].join("\n");

      await sendTelegramMessage(chatId, idMsg, { parseMode: "HTML" });
      return NextResponse.json({ ok: true });
    }

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
            `🎉 <b>Selamat! Toko Berhasil Terhubung!</b>`,
            ``,
            `Toko <b>${store.name}</b> (<code>${store.slug}.etalase.online</code>) kini telah resmi terhubung ke akun Telegram ini.`,
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

      // B. General /start greeting
      const greetingMsg = [
        `👋 <b>Halo! Selamat Datang di Bot Resmi etalase.online</b>`,
        ``,
        `Platform SaaS pembuatan etalase digital, menu visual F&B, dan link-in-bio instan untuk UMKM & Kreator Asia Tenggara.`,
        ``,
        `🆔 <b>Chat ID Anda / Grup Ini:</b> <code>${chatId}</code>`,
        `🌐 <b>Website Utama:</b> https://etalase.online`,
        `🏢 <b>Bantuan & Support:</b> ${config.supportLink}`,
        ``,
        `<b>Bagi Pemilik Toko:</b>`,
        `Untuk menghubungkan toko Anda ke bot ini agar menerima push notifikasi pesanan masuk, buka menu <b>Settings &gt; Integrations</b> di Dashboard Admin Toko Anda lalu klik <b>Connect Telegram (1-Click)</b>.`,
        ``,
        `<b>Bagi Admin Mabes:</b>`,
        `Gunakan Chat ID <code>${chatId}</code> di menu Platform Settings (<code>/mabes/settings</code>) untuk menerima realtime alert pesanan & permohonan penarikan dana.`,
      ].join("\n");

      await sendTelegramMessage(chatId, greetingMsg, { parseMode: "HTML" });
      return NextResponse.json({ ok: true });
    }

    // 2. Handle /help command
    if (text === "/help") {
      const helpMsg = [
        `ℹ️ <b>Bantuan etalase.online Bot</b>`,
        ``,
        `🆔 <b>Chat ID Anda / Grup Ini:</b> <code>${chatId}</code>`,
        ``,
        `Perintah yang tersedia:`,
        `• <code>/start</code> — Menampilkan informasi selamat datang & status bot`,
        `• <code>/id</code> — Menampilkan ID Chat ini untuk konfigurasi Mabes`,
        `• <code>/help</code> — Menampilkan panduan penggunaan ini`,
        ``,
        `Jika Anda membutuhkan bantuan teknis, hubungi Customer Care kami di ${config.supportLink}.`,
      ].join("\n");

      await sendTelegramMessage(chatId, helpMsg, { parseMode: "HTML" });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: true, error: err.message }, { status: 200 });
  }
}
