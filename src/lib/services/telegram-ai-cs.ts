import { prisma } from "../db/prisma";
import { escapeHtml } from "./telegram-service";

export interface RaniCsReplyResult {
  reply: string;
  shouldEscalate: boolean;
  escalationCategory?: "DFY_CONSULT" | "HUMAN_AGENT" | "PAYMENT_PAYOUT" | "GENERAL";
  escalationReason?: string;
  matchedTopic?: string;
}

export interface RaniCsInput {
  userMessage: string;
  userName?: string;
  userChatId: string;
  userHandle?: string;
}

/**
 * Knowledge Base of etalase.online platform
 */
const PLATFORM_KB = {
  name: "etalase.online",
  company: "PT Rafa Kreasindo Teknologi",
  location: "Bandung Digital Hub, Jawa Barat, Indonesia",
  summary:
    "Platform pembuatan website etalase digital visual, menu F&B QR meja, dan bio link instant dengan checkout WhatsApp tanpa potongan komisi, otomatis terhubung QRIS Borderpay & PayPal.",
  plans: {
    free: {
      name: "FREE Selamanya",
      price: "Rp 0 / bulan",
      benefits:
        "Katalog produk tak terbatas, 0% potongan komisi pesanan chat WhatsApp, QRIS Borderpay instan (biaya flat 2%), subdomain toko.etalase.online, template Clean Minimal.",
    },
    pro: {
      name: "PRO Merchant",
      price: "Rp 49.000 / bulan atau Rp 468.000 / tahun (hemat 20%)",
      benefits:
        "Bisa pakai Custom Domain pribadi (namatoko.com) dengan gratis SSL HTTPS, bebas gunakan 4 Layout Archetype (Clean Minimal, Visual Menu Grid kafe, Showroom Pro sales mobil/properti, Editorial Pastel), integrasi Google Analytics & Meta Pixel, prioritas support.",
    },
    dfy: {
      name: "Terima Beres (DFY - Done-For-You VIP)",
      price: "Rp 899.000 (sekali bayar seumur hidup)",
      benefits:
        "Dikerjakan langsung sampai tuntas oleh tim teknis kami: setup domain kustom, input hingga 30 menu/produk, copywriting profesional, optimasi foto produk, konfigurasi QRIS Borderpay, dan pengujian alur pesanan siap jualan.",
    },
  },
  gateways:
    "Borderpay QRIS (semua e-wallet GoPay, OVO, Dana, ShopeePay & m-Banking BCA, Mandiri, BRI, BNI) serta PayPal untuk kartu kredit internasional (Visa, Mastercard, Amex).",
  dashboardUrl: "https://etalase.online/admin",
  helpDeskUrl: "https://etalase.online/bantuan",
};

/**
 * Detects if a message requires escalation to human Mabes operators
 */
function detectEscalation(message: string): {
  shouldEscalate: boolean;
  category?: "DFY_CONSULT" | "HUMAN_AGENT" | "PAYMENT_PAYOUT" | "GENERAL";
  reason?: string;
} {
  const text = message.toLowerCase();

  // 1. DFY / Terima Beres VIP setup request
  if (
    text.includes("terima beres") ||
    text.includes("dfy") ||
    text.includes("899") ||
    text.includes("jasa buat") ||
    text.includes("buatkan toko") ||
    text.includes("bantu bikin toko") ||
    text.includes("setup vip")
  ) {
    return {
      shouldEscalate: true,
      category: "DFY_CONSULT",
      reason: "Calon klien tertarik atau berkonsultasi mengenai paket Terima Beres (DFY) Rp 899.000.",
    };
  }

  // 2. Urgent Payment, Payout, or Billing issues
  if (
    text.includes("payout") ||
    text.includes("penarikan") ||
    text.includes("tarik saldo") ||
    text.includes("belum masuk") ||
    text.includes("gagal bayar") ||
    text.includes("qris error") ||
    text.includes("uang belum") ||
    text.includes("komplain") ||
    text.includes("refund")
  ) {
    return {
      shouldEscalate: true,
      category: "PAYMENT_PAYOUT",
      reason: "User melaporkan kendala terkait pembayaran, pencairan saldo toko (payout), atau transaksi finansial.",
    };
  }

  // 3. Human agent escalation request
  if (
    text.includes("orang") ||
    text.includes("manusia") ||
    text.includes("admin") ||
    text.includes("staf") ||
    text.includes("staff") ||
    text.includes("cs manusia") ||
    text.includes("bicara langsung") ||
    text.includes("bisa telpon") ||
    text.includes("telepon") ||
    text.includes("nomor hp admin") ||
    text.includes("operator")
  ) {
    return {
      shouldEscalate: true,
      category: "HUMAN_AGENT",
      reason: "User meminta dihubungkan langsung dengan staf/admin manusia.",
    };
  }

  return { shouldEscalate: false };
}

/**
 * Intelligent rule-based FAQ fallback when Gemini API is unavailable or unconfigured
 */
function generateStructuredFaqFallback(
  message: string,
  userName: string,
  storeContext?: { name: string; slug: string; tier: string } | null
): string {
  const text = message.toLowerCase();
  const greeting = userName ? `Halo Kak ${userName}! 😊` : `Halo Kak! 😊`;

  // Start Commands
  if (text.startsWith("/start support")) {
    return [
      `${greeting} Kenalkan, saya <b>Rani</b>, Customer Success Specialist resmi dari <b>etalase.online</b> (PT Rafa Kreasindo Teknologi) ✨`,
      ``,
      `Ada yang bisa Rani bantu hari ini seputar toko online Kakak?`,
      `• 💡 <b>Tanya Fitur:</b> Ketik <i>"Apa kelebihan etalase.online?"</i>`,
      `• 💳 <b>Tanya Harga:</b> Ketik <i>"Berapa harga paket PRO?"</i>`,
      `• 🌟 <b>Terima Beres:</b> Ketik <i>"Mau dibuatkan toko terima beres"</i>`,
      `• 🔑 <b>Login Admin:</b> Ketik <i>"Link login dashboard"</i>`,
      ``,
      `Silakan ketik pertanyaan Kakak langsung di sini ya!`,
    ].join("\n");
  }

  if (text.startsWith("/start ask_pricing") || text.includes("harga") || text.includes("paket") || text.includes("biaya") || text.includes("pricing")) {
    return [
      `${greeting} Berikut pilihan paket resmi di <b>etalase.online</b>:`,
      ``,
      `1️⃣ <b>Paket FREE Selamanya (Rp 0)</b>`,
      `• Bebas upload produk tak terbatas`,
      `• 0% komisi transaksi chat WhatsApp`,
      `• Biaya QRIS instan Borderpay flat 2%`,
      `• Subdomain gratis: <code>namatoko.etalase.online</code>`,
      ``,
      `2️⃣ <b>Paket PRO (Rp 49.000 / bln atau Rp 468.000 / thn)</b>`,
      `• <b>Bisa pakai domain sendiri</b> (contoh: <code>namatoko.com</code>) gratis SSL`,
      `• Buka semua 4 Desain Toko (Clean Minimal, Menu Kafe QR, Showroom Pro, Pastel)`,
      `• Google Analytics & Facebook/Meta Pixel tracking`,
      ``,
      `3️⃣ <b>Terima Beres DFY VIP (Rp 899.000 sekali bayar)</b>`,
      `• Tim teknis kami buatkan sampai siap jualan (input 30 produk, domain, copywriting & QRIS)`,
      ``,
      `Mau Rani bantu aktifkan paket yang mana nih Kak?`,
    ].join("\n");
  }

  if (text.startsWith("/start dfy_consult") || text.includes("terima beres") || text.includes("dfy")) {
    return [
      `${greeting} Wah, pilihan tepat sekali! Dengan layanan <b>Terima Beres (DFY - Done For You)</b> seharga <b>Rp 899.000</b> (sekali bayar seumur hidup), Kakak tinggal duduk manis dan toko langsung siap jualan! 🚀`,
      ``,
      `Yang dikerjakan oleh tim teknisi kami:`,
      `✅ Pemasangan nama domain pilihan Kakak (contoh: <code>namabisnis.com</code>)`,
      `✅ Input hingga 30 foto produk/menu lengkap dengan copywriting memikat`,
      `✅ Konfigurasi pembayaran QRIS Borderpay & tombol checkout WhatsApp`,
      `✅ Pengujian transaksi live end-to-end`,
      ``,
      `Pesan ini telah Rani teruskan langsung ke <b>Tim Staf Mabes etalase.online</b>. Tim kami akan segera menghubungi Kakak di chat ini untuk proses pembuatan tokonya ya!`,
    ].join("\n");
  }

  if (text.startsWith("/start tenant_") || storeContext) {
    const sName = storeContext?.name || "Toko Kakak";
    const sSlug = storeContext?.slug || "";
    const sTier = storeContext?.tier || "FREE";
    return [
      `${greeting} Selamat datang kembali di layanan bantuan toko <b>${escapeHtml(sName)}</b>! ✨`,
      ``,
      `• <b>Status Paket:</b> <b>${escapeHtml(sTier)}</b>`,
      sSlug ? `• <b>Alamat Etalase:</b> <code>https://${escapeHtml(sSlug)}.etalase.online</code>` : ``,
      `• <b>Dashboard Toko:</b> <a href="https://${escapeHtml(sSlug || "etalase")}.etalase.online/admin">Buka Admin Console</a>`,
      ``,
      `Ada kendala teknis, pertanyaan penarikan saldo, atau ingin upgrade ke paket PRO? Rani siap bantu Kak!`,
    ].filter(Boolean).join("\n");
  }

  if (text.includes("qris") || text.includes("borderpay") || text.includes("bayar") || text.includes("rekening")) {
    return [
      `${greeting} Untuk sistem pembayaran, <b>etalase.online</b> bekerja sama resmi dengan <b>Borderpay</b> dan <b>PayPal</b>:`,
      ``,
      `• <b>QRIS Instan Borderpay:</b> Konsumen bisa bayar pakai GoPay, OVO, Dana, ShopeePay, LinkAja, dan BCA/Mandiri/BRI mobile banking. Saldo otomatis masuk ke dompet dashboard toko Kakak dengan potongan flat hanya 2%.`,
      `• <b>PayPal:</b> Menerima pembayaran kartu kredit internasional (Visa, Mastercard, Amex).`,
      `• <b>Chat WhatsApp:</b> 100% tanpa potongan komisi (0%).`,
      ``,
      `Penarikan dana (payout) bisa dicairkan ke seluruh rekening bank di Indonesia kapan saja melalui menu <b>Admin &gt; Orders &gt; Payouts</b>! 💸`,
    ].join("\n");
  }

  if (text.includes("domain") || text.includes("custom domain") || text.includes(".com")) {
    return [
      `${greeting} Di etalase.online, Kakak bisa menggunakan nama domain sendiri (seperti <code>tokoanda.com</code> atau <code>tokobaru.id</code>) dengan berlangganan <b>Paket PRO</b> (hanya Rp 49.000/bln) 🌐`,
      ``,
      `Cara pasangnya sangat mudah:`,
      `1. Buka dashboard toko di <b>Settings &gt; Custom Domain</b>`,
      `2. Masukkan nama domain Kakak`,
      `3. Arahkan DNS CNAME domain ke <code>cname.etalase.online</code>`,
      `4. Sertifikat SSL/HTTPS otomatis aktif gratis dalam beberapa menit!`,
    ].join("\n");
  }

  if (text.includes("login") || text.includes("masuk") || text.includes("dashboard") || text.includes("daftar")) {
    return [
      `${greeting} Untuk membuka toko Kakak:`,
      ``,
      `• <b>Login Dashboard Admin:</b> <a href="https://etalase.online/login">https://etalase.online/login</a>`,
      `• <b>Daftar Toko Baru (Gratis):</b> <a href="https://etalase.online/register">https://etalase.online/register</a>`,
      ``,
      `Cukup klik <i>"Masuk dengan Google"</i> atau gunakan email/password yang Kakak daftarkan ya! 📱`,
    ].join("\n");
  }

  if (text.includes("manusia") || text.includes("admin") || text.includes("orang") || text.includes("kontak")) {
    return [
      `${greeting} Baik Kak, permintaan Kakak untuk terhubung dengan staf admin manusia telah Rani catat dan teruskan ke <b>Grup Operasional Mabes etalase.online</b> 🚨`,
      ``,
      `Staf kami akan segera menindaklanjuti pesan Kakak melalui pesan Telegram ini. Mohon ditunggu sebentar ya Kak, terima kasih atas kesabarannya! 🙏`,
    ].join("\n");
  }

  // General default fallback
  return [
    `${greeting} Terima kasih sudah menghubungi layanan resmi <b>etalase.online</b>! Saya <b>Rani</b>, asisten digital yang siap membantu Kakak 24/7.`,
    ``,
    `Apakah Kakak ingin bertanya mengenai:`,
    `1️⃣ <b>Pilihan Paket & Harga</b> (FREE, PRO Rp 49rb, atau Terima Beres Rp 899rb)`,
    `2️⃣ <b>Cara Sambungkan Domain Sendiri (.com / .id)</b>`,
    `3️⃣ <b>Pembayaran QRIS & Pencairan Saldo (Payout)</b>`,
    `4️⃣ <b>Bantuan Teknis Toko</b>`,
    ``,
    `Ketik pertanyaan Kakak dengan santai, Rani siap jelaskan selengkapnya! ✨`,
  ].join("\n");
}

/**
 * Calls Google Gemini 2.5 Flash API with platform knowledge base
 */
async function callGeminiApi(
  userMessage: string,
  userName: string,
  storeContext?: { name: string; slug: string; tier: string } | null
): Promise<string | null> {
  const apiKey = (process.env.GEMINI_API_KEY || "").trim();
  if (!apiKey) return null;

  try {
    const systemPrompt = `Anda adalah "Rani", Customer Success & Product Specialist resmi untuk platform SaaS "etalase.online" (dikembangkan oleh PT Rafa Kreasindo Teknologi, berlokasi di Bandung Digital Hub, Indonesia).

Karakter & Gaya Komunikasi:
- Sangat ramah, sopan, antusias, ringkas, dan mudah dipahami oleh UMKM, pedagang F&B, kreator, dan sales showroom.
- Gunakan bahasa yang sama dengan pengguna (Bahasa Indonesia sebagai default, Bahasa Melayu bila user berbahasa Melayu, English jika berbahasa Inggris).
- Gunakan formatting HTML Telegram secara rapi: <b>tebal</b>, <code>kode/link</code>, dan bullet points emoji. JANGAN gunakan tanda bintang ganda markdown (**text**), tapi gunakan <b>text</b>.
- Sapa pengguna dengan nama jika diketahui (contoh: "Halo Kak ${userName || ""}!").

Informasi Resmi etalase.online:
1. Layanan: Platform etalase online instan & bio link visual modern dengan checkout chat WhatsApp (0% komisi) dan pembayaran otomatis QRIS Borderpay & PayPal.
2. Paket:
   - FREE (Rp 0): Produk tanpa batas, checkout WhatsApp tanpa potongan komisi, QRIS Borderpay flat 2%, subdomain toko.etalase.online, template Clean Minimal.
   - PRO (Rp 49.000/bulan atau Rp 468.000/tahun hemat 20%): Mendukung Custom Domain pribadi (namatoko.com) gratis SSL, 4 tema desain (Clean Minimal, Menu Kafe QR, Showroom Pro mobil/properti, Editorial Pastel), Google Analytics & Meta Pixel, prioritas support.
   - Terima Beres (DFY - Done-For-You VIP) seharga Rp 899.000 sekali bayar seumur hidup: Dikerjakan langsung oleh tim teknisi kami (setup domain, input 30 produk/menu, copywriting, foto produk, setup QRIS, siap jualan).
3. Transaksi & Penarikan Dana:
   - QRIS Borderpay instan (semua e-wallet GoPay/OVO/Dana/ShopeePay & bank).
   - Penarikan dana (payout) masuk ke rekening bank apa saja di Indonesia via menu Admin > Orders > Payouts.
4. Akses Dashboard Admin: https://etalase.online/admin

${
  storeContext
    ? `Konteks Toko Pengguna yang Terhubung:
- Nama Toko: ${storeContext.name}
- Subdomain: ${storeContext.slug}.etalase.online
- Paket Aktif: ${storeContext.tier}`
    : ""
}

Tugas:
Jawab pertanyaan pengguna secara akurat, ramah, dan solutif. Jika pengguna meminta bicara dengan orang/admin manusia atau berminat paket Terima Beres (DFY), sampaikan bahwa permohonan mereka telah dicatat dan tim staf operasional Mabes etalase.online akan segera menindaklanjuti. Jawab dalam 2-4 paragraf singkat terstruktur.`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nPertanyaan Pengguna: "${userMessage}"` }],
            },
          ],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!res.ok) {
      console.warn("Gemini API HTTP error:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) return null;

    // Convert any stray markdown **bold** to <b>bold</b> and `code` to <code>code</code>
    return candidateText
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  } catch (err) {
    console.warn("callGeminiApi exception:", err);
    return null;
  }
}

/**
 * Main AI CS Engine: Generates smart, contextual response as "Rani"
 */
export async function generateRaniCsReply(input: RaniCsInput): Promise<RaniCsReplyResult> {
  const { userMessage, userName = "Sahabat etalase", userChatId } = input;

  // 1. Check if user is linked to any active store in database
  let storeContext: { name: string; slug: string; tier: string } | null = null;
  try {
    const stores = await prisma.store.findMany({
      where: { isActive: true },
      select: { name: true, slug: true, tier: true, appearanceConfig: true },
    });

    for (const s of stores) {
      const cfg = (s.appearanceConfig as any) || {};
      if (cfg?.telegramIntegration?.chatId === userChatId) {
        storeContext = { name: s.name, slug: s.slug, tier: s.tier };
        break;
      }
    }
  } catch (e) {
    console.warn("Failed to lookup store context for Telegram user:", e);
  }

  // 2. Detect escalation trigger
  const escalation = detectEscalation(userMessage);

  // 3. Try Gemini AI first if configured
  let replyText = await callGeminiApi(userMessage, userName, storeContext);

  // 4. Fallback to rich structured FAQ engine
  if (!replyText) {
    replyText = generateStructuredFaqFallback(userMessage, userName, storeContext);
  }

  return {
    reply: replyText,
    shouldEscalate: escalation.shouldEscalate,
    escalationCategory: escalation.category,
    escalationReason: escalation.reason,
  };
}
