"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  Store,
  ShoppingBag,
  Calendar,
  Ticket,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Globe,
} from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

interface InteractiveFeatureShowcaseProps {
  locale?: SupportedLocale;
}

const SHOWCASE_TRANSLATIONS: Record<
  SupportedLocale,
  {
    card1Badge: string;
    card1Title: string;
    card1Desc: string;
    waBotTitle: string;
    waBotJustNow: string;
    waGreeting: string;
    waPaidText: string;
    waDownloadBtn: string;
    waDeliveredSec: string;
    waOpenRate: string;
    card1Bullet1: string;
    card1Bullet2: string;
    card1Bullet3: string;

    card2Badge: string;
    card2Title: string;
    card2Desc: string;
    card2DpBadge: string;
    card2CarTitle: string;
    card2CarPrice: string;
    card2ChatNote: string;
    card2ZeroFee: string;

    card3Badge: string;
    card3Title: string;
    card3Desc: string;
    card3Tiktok: string;
    card3DirectLink: string;
    card3Marketplace: string;
    card3AutoUtm: string;
    card3Note: string;

    card4Badge: string;
    card4Title: string;
    card4Desc: string;
    card4Days: [string, string, string, string];
    card4Time: string;
    card4Slots: string;

    card5Badge: string;
    card5Title: string;
    card5Desc: string;
    card5TicketTitle: string;
    card5Price: string;
    card5Location: string;
    card5AutoLink: string;
    card5Reminder: string;

    card6Badge: string;
    card6Title: string;
    card6Desc: string;
    card6Box1Label: string;
    card6Box1Val: string;
    card6Box1Sub: string;
    card6Box2Label: string;
    card6Box2Val: string;
    card6Box2Sub: string;
    card6Box3Label: string;
    card6Box3Val: string;
    card6Box3Sub: string;

    card7Badge: string;
    card7Title: string;
    card7Desc: string;
    card7Domain: string;
    card7Ssl: string;
    card7Pixel: string;
    card7Ga: string;
    card7Dns: string;

    bottomLabel: string;
    bottomDesc: string;
    bottomExploreBtn: string;
    bottomPricingBtn: string;
  }
> = {
  id: {
    card1Badge: "Paling Favorit Kreator",
    card1Title: "Produk Digital & Pengiriman Berkas Otomatis ke WhatsApp",
    card1Desc:
      "Jual e-book, template Canva, preset foto, Notion template, atau video course. Struk pembayaran dan link akses file terkirim instan ke WhatsApp pembeli secara otomatis 24 jam nonstop tanpa Anda harus standby.",
    waBotTitle: "Bot Notifikasi WhatsApp etalase.online",
    waBotJustNow: "Baru Saja",
    waGreeting: "Halo Kak Budi Santoso! 👋 Terima kasih telah berbelanja di",
    waPaidText: "Pembayaran #ORD-84920 (Rp 49.000) telah lunas via QRIS.",
    waDownloadBtn: "📥 Akses Download Preset Pack (.zip)",
    waDeliveredSec: "✓ Terkirim otomatis dalam 3 detik",
    waOpenRate: "Tingkat Buka 98%",
    card1Bullet1: "Support Google Drive, PDF, Notion, Canva",
    card1Bullet2: "Watermark PDF anti-bajak otomatis",
    card1Bullet3: "Notifikasi admin ke multi-nomor WA",

    card2Badge: "Sales & UMKM",
    card2Title: "Katalog Fisik & Showroom Unit",
    card2Desc:
      "Pajang mobil, motor, properti, pakaian, atau menu kuliner. Mendukung simulasi DP, harga pasti, hingga tombol konsultasi “Tanya Unit” ke WhatsApp.",
    card2DpBadge: "Simulasi DP",
    card2CarTitle: "All-New SUV Hybrid 2026",
    card2CarPrice: "DP Mulai 15 Jt • Angs. 4 Jt",
    card2ChatNote: "Chat langsung isi draf spesifikasi",
    card2ZeroFee: "0% Komisi",

    card3Badge: "Afiliator SEA",
    card3Title: "Affiliate Keranjang Kuning Multi-Platform",
    card3Desc:
      "Kumpulkan seluruh rekomendasi racun belanja TikTok Shop (Beg Kuning), Shopee Mall, dan Lazada dalam 1 link tanpa batas jumlah tautan.",
    card3Tiktok: "TikTok Shop (Beg Kuning)",
    card3DirectLink: "Direct Link",
    card3Marketplace: "Shopee Mall & Lazada SEA",
    card3AutoUtm: "Auto-UTM",
    card3Note: "Aman dari razia algoritma • Buka langsung di aplikasi marketplace",

    card4Badge: "Konsultan & Coach",
    card4Title: "Booking 1-on-1 & Sinkronisasi Kalender",
    card4Desc:
      "Buka sesi mentoring privat, audit portofolio, atau konsultasi dokter. Klien memilih slot tanggal & jam kosong secara otomatis tanpa drama tanya-jawab jadwal.",
    card4Days: ["Sel", "Rab", "Kam", "Jum"],
    card4Time: "19:30 WIB",
    card4Slots: "2 Slot Tersedia",

    card5Badge: "Event & Webinar",
    card5Title: "Tiketing Webinar & Auto-Reminder",
    card5Desc:
      "Jual tiket workshop online atau acara tatap muka. Kuota peserta terkontrol otomatis dan sistem otomatis mengirimkan pengingat H-1 ke WhatsApp peserta.",
    card5TicketTitle: "Masterclass Content 2026",
    card5Price: "Rp 149rb",
    card5Location: "📍 Live via Google Meet • Kuota 48/50",
    card5AutoLink: "✓ Auto-generate link meeting",
    card5Reminder: "Reminder H-1 WA",

    card6Badge: "Margin Terlindungi 100% Utuh",
    card6Title: "0% Komisi Order Chat & Pembayaran QRIS Transparan",
    card6Desc:
      "Bebas dari potongan komisi marketplace yang menggerus keuntungan. Terima pesanan via WhatsApp tanpa potongan biaya sepeser pun (0%), atau sediakan pembayaran QRIS instan dengan opsi fleksibel: biaya transaksi bisa diatur ditanggung pembeli (*Convenience Fee*) sehingga keuntungan Anda tetap 100% utuh.",
    card6Box1Label: "Order via WhatsApp",
    card6Box1Val: "0%",
    card6Box1Sub: "Tanpa potongan komisi apa pun",
    card6Box2Label: "Checkout QRIS Instan",
    card6Box2Val: "Mulai 2%",
    card6Box2Sub: "Bisa diatur dibayar Pembeli",
    card6Box3Label: "Pencairan Saldo (Payout)",
    card6Box3Val: "GRATIS 4x",
    card6Box3Sub: "Tiap bulan ke semua rekening bank",

    card7Badge: "Custom Domain + Ads",
    card7Title: "Domain Pribadi & Tracking Ads Pixel",
    card7Desc:
      "Tingkatkan wibawa tokomu dengan domain sendiri (namabrand.com) + SSL gratis. Terhubung langsung ke Meta Pixel, TikTok Ads, dan Google Analytics 4.",
    card7Domain: "namabrand.com",
    card7Ssl: "SSL Aktif",
    card7Pixel: "✓ Meta Pixel & CAPI",
    card7Ga: "✓ Google Analytics 4",
    card7Dns: "Setup DNS 1-klik • Hapus branding etalase.online",

    bottomLabel: "Ekosistem Lengkap Lainnya:",
    bottomDesc:
      "Multi-bahasa antarmuka SEA (ID, EN, MS, TH, VI), watermark PDF otomatis anti-bajak, voucher promo & diskon bertingkat, hingga pelacakan parameter UTM.",
    bottomExploreBtn: "Jelajahi Semua Fitur",
    bottomPricingBtn: "Lihat Paket Harga",
  },
  en: {
    card1Badge: "Top Creator Favorite",
    card1Title: "Digital Products & Automated WhatsApp File Delivery",
    card1Desc:
      "Sell e-books, Canva templates, Lightroom presets, Notion kits, or video masterclasses. Receipts and secure download links are delivered instantly to the buyer's WhatsApp 24/7 without manual intervention.",
    waBotTitle: "etalase.online WhatsApp Notification Bot",
    waBotJustNow: "Just Now",
    waGreeting: "Hi Budi Santoso! 👋 Thank you for purchasing from",
    waPaidText: "Order #ORD-84920 ($3.99) has been settled via Instant QR.",
    waDownloadBtn: "📥 Download Preset Pack (.zip)",
    waDeliveredSec: "✓ Dispatched automatically in 3 seconds",
    waOpenRate: "98% Open Rate",
    card1Bullet1: "Supports Google Drive, PDF, Notion, Canva",
    card1Bullet2: "Automated anti-piracy PDF watermarking",
    card1Bullet3: "Admin notifications to multiple WA numbers",

    card2Badge: "Sales & SMBs",
    card2Title: "Physical Catalogs & Showroom Units",
    card2Desc:
      "Showcase cars, motorcycles, real estate listings, fashion, or dining menus. Features down payment calculators, fixed pricing, and instant 'Inquire Unit' chat buttons.",
    card2DpBadge: "Down Payment Est.",
    card2CarTitle: "All-New SUV Hybrid 2026",
    card2CarPrice: "DP from $990 • Mo. $280",
    card2ChatNote: "Chat pre-filled with unit specs",
    card2ZeroFee: "0% Commission",

    card3Badge: "SEA Affiliates",
    card3Title: "Multi-Platform Yellow Basket Affiliate Hub",
    card3Desc:
      "Curate and unify all your TikTok Shop Yellow Basket, Shopee Mall, and Lazada product recommendations into a single, clean storefront link with zero URL limits.",
    card3Tiktok: "TikTok Shop (Yellow Basket)",
    card3DirectLink: "Direct Link",
    card3Marketplace: "Shopee Mall & Lazada SEA",
    card3AutoUtm: "Auto-UTM",
    card3Note: "Safe from algorithm bans • Deep-links directly into shopping apps",

    card4Badge: "Consultants & Coaches",
    card4Title: "1-on-1 Bookings & Calendar Synchronization",
    card4Desc:
      "Offer private mentoring, portfolio audits, or professional consultations. Clients select open date and time slots without tedious back-and-forth scheduling.",
    card4Days: ["Tue", "Wed", "Thu", "Fri"],
    card4Time: "19:30 UTC+7",
    card4Slots: "2 Slots Open",

    card5Badge: "Events & Webinars",
    card5Title: "Webinar Ticketing & Automated Reminders",
    card5Desc:
      "Sell online workshop tickets or physical event passes. Real-time quota management with automatic 24-hour reminder notifications sent straight to attendee WhatsApp.",
    card5TicketTitle: "Content Masterclass 2026",
    card5Price: "$9.90",
    card5Location: "📍 Live via Google Meet • Seats 48/50",
    card5AutoLink: "✓ Auto-generated meeting link",
    card5Reminder: "WhatsApp 24h Reminder",

    card6Badge: "100% Margin Protected",
    card6Title: "0% Chat Order Commission & Transparent Payment Processing",
    card6Desc:
      "Break free from marketplace commission cuts eating your profits. Receive direct orders via WhatsApp with zero platform fees (0%), or provide instant checkout with flexible fee models: pass transaction fees to buyers (*Convenience Fee*) to keep 100% of your earnings.",
    card6Box1Label: "WhatsApp Orders",
    card6Box1Val: "0%",
    card6Box1Sub: "Zero platform commission cuts",
    card6Box2Label: "Instant QR Checkout",
    card6Box2Val: "From 2%",
    card6Box2Sub: "Configurable buyer convenience fee",
    card6Box3Label: "Bank Payouts",
    card6Box3Val: "4x FREE",
    card6Box3Sub: "Every month to local bank accounts",

    card7Badge: "Custom Domain + Ads",
    card7Title: "Custom Domain & Advertising Pixel Tracking",
    card7Desc:
      "Build sovereign brand authority with your personal domain (yourbrand.com) plus free SSL. Seamlessly connects to Meta Pixel, TikTok Ads, and Google Analytics 4.",
    card7Domain: "yourbrand.com",
    card7Ssl: "Active SSL",
    card7Pixel: "✓ Meta Pixel & CAPI",
    card7Ga: "✓ Google Analytics 4",
    card7Dns: "1-Click DNS setup • Remove platform branding",

    bottomLabel: "Full Regional Ecosystem:",
    bottomDesc:
      "Native SEA multi-language UI (ID, EN, MS, TH, VI), dynamic PDF anti-piracy watermarks, tiered discount promo codes, and granular UTM analytics.",
    bottomExploreBtn: "Explore All Features",
    bottomPricingBtn: "View Pricing Plans",
  },
  ms: {
    card1Badge: "Paling Digemari Pencipta",
    card1Title: "Produk Digital & Penghantaran Fail Automatik ke WhatsApp",
    card1Desc:
      "Jual e-buku, templat Canva, praset foto, kit Notion, atau kursus video. Resit bayaran dan pautan akses fail dihantar serta-merta ke WhatsApp pembeli secara automatik 24 jam sehari.",
    waBotTitle: "Bot Pemberitahuan WhatsApp etalase.online",
    waBotJustNow: "Sebentar Tadi",
    waGreeting: "Salam Saudara Budi Santoso! 👋 Terima kasih membeli di",
    waPaidText: "Pesanan #ORD-84920 (RM 15.00) telah disahkan via DuitNow QR.",
    waDownloadBtn: "📥 Muat Turun Praset Pack (.zip)",
    waDeliveredSec: "✓ Dihantar secara automatik dalam 3 saat",
    waOpenRate: "Kadar Buka 98%",
    card1Bullet1: "Sokongan Google Drive, PDF, Notion, Canva",
    card1Bullet2: "Tera air PDF anti-cetak rompak automatik",
    card1Bullet3: "Pemberitahuan admin ke pelbagai nombor WA",

    card2Badge: "Jurujual & PKS",
    card2Title: "Katalog Fizikal & Bilik Pameran",
    card2Desc:
      "Pamerkan kereta, motosikal, hartanah, pakaian atau menu sajian. Menyokong simulasi wang muka (DP), harga tetap, hingga butang tanya unit ke WhatsApp.",
    card2DpBadge: "Simulasi DP",
    card2CarTitle: "All-New SUV Hybrid 2026",
    card2CarPrice: "DP Dari RM 4,500 • Ansuran RM 950",
    card2ChatNote: "Chat terus dengan spesifikasi unit",
    card2ZeroFee: "0% Komisen",

    card3Badge: "Afiliasi SEA",
    card3Title: "Hab Afiliasi Beg Kuning Pelbagai Platform",
    card3Desc:
      "Himpunkan semua syor barangan TikTok Shop (Beg Kuning), Shopee Mall dan Lazada dalam 1 pautan etalase tanpa had kuantiti pautan.",
    card3Tiktok: "TikTok Shop (Beg Kuning)",
    card3DirectLink: "Pautan Terus",
    card3Marketplace: "Shopee Mall & Lazada SEA",
    card3AutoUtm: "Auto-UTM",
    card3Note: "Selamat dari sekatan algoritma • Terus buka dalam aplikasi e-dagang",

    card4Badge: "Konsultan & Jurulatih",
    card4Title: "Tempahan 1-on-1 & Penyelarasan Kalendar",
    card4Desc:
      "Buka sesi bimbingan peribadi, audit portfolio atau rundingan pakar. Pelanggan memilih tarikh dan masa terluang secara automatik tanpa kekeliruan jadual.",
    card4Days: ["Sel", "Rab", "Kha", "Jum"],
    card4Time: "19:30 MYT",
    card4Slots: "2 Slot Tersedia",

    card5Badge: "Acara & Webinar",
    card5Title: "Tiket Webinar & Peringatan Automatik",
    card5Desc:
      "Jual tiket bengkel dalam talian atau acara bersemuka. Kuota peserta dipantau secara langsung dan sistem menghantar peringatan H-1 ke WhatsApp peserta.",
    card5TicketTitle: "Bengkel Kandungan Kreatif 2026",
    card5Price: "RM 45",
    card5Location: "📍 Live via Google Meet • Kuota 48/50",
    card5AutoLink: "✓ Pautan perjumpaan automatik",
    card5Reminder: "Peringatan H-1 WhatsApp",

    card6Badge: "Margin Terpelihara 100% Penuh",
    card6Title: "0% Komisen Pesanan Chat & Bayaran QR Telus",
    card6Desc:
      "Bebas daripada potongan komisen platform yang mengikis untung. Terima pesanan melalui WhatsApp tanpa sebarang caj (0%), atau sediakan bayaran QR pantas dengan tetapan fleksibel: caj transaksi boleh ditanggung pembeli supaya keuntungan anda kekal 100% utuh.",
    card6Box1Label: "Pesanan WhatsApp",
    card6Box1Val: "0%",
    card6Box1Sub: "Tiada sebarang potongan komisen",
    card6Box2Label: "Bayaran QR Pantas",
    card6Box2Val: "Dari 2%",
    card6Box2Sub: "Boleh ditetapkan dibayar Pembeli",
    card6Box3Label: "Pengeluaran Baki",
    card6Box3Val: "PERCUMA 4x",
    card6Box3Sub: "Setiap bulan ke semua akaun bank",

    card7Badge: "Domain Kustom + Iklan",
    card7Title: "Domain Sendiri & Penjejakan Piksel Iklan",
    card7Desc:
      "Tingkatkan kredibiliti perniagaan dengan domain sendiri (namabrand.com) + SSL percuma. Terhubung terus ke Meta Pixel, TikTok Ads, dan Google Analytics 4.",
    card7Domain: "namabrand.com",
    card7Ssl: "SSL Aktif",
    card7Pixel: "✓ Meta Pixel & CAPI",
    card7Ga: "✓ Google Analytics 4",
    card7Dns: "Persediaan DNS 1-klik • Buang penjenamaan platform",

    bottomLabel: "Ekosistem Lengkap Lainnya:",
    bottomDesc:
      "Antara muka pelbagai bahasa SEA (ID, EN, MS, TH, VI), tera air PDF anti-rompak automatik, kod kupon promosi, dan analisis parameter UTM.",
    bottomExploreBtn: "Terokai Semua Ciri",
    bottomPricingBtn: "Lihat Pelan Harga",
  },
  th: {
    card1Badge: "ยอดนิยมสำหรับครีเอเตอร์",
    card1Title: "สินค้าดิจิทัลและระบบส่งมอบไฟล์อัตโนมัติถึง WhatsApp",
    card1Desc:
      "ขายอีบุ๊ก เทมเพลต Canva พรีเซ็ตแต่งรูป ไฟล์ Notion หรือคอร์สเรียนวิดีโอ ใบเสร็จและลิงก์ดาวน์โหลดจะถูกส่งไปยัง WhatsApp ของผู้ซื้อทันทีตลอด 24 ชั่วโมง โดยที่คุณไม่ต้องคอยเฝ้าหน้าจอ",
    waBotTitle: "บอทแจ้งเตือน WhatsApp etalase.online",
    waBotJustNow: "เมื่อสักครู่",
    waGreeting: "สวัสดีคุณ Budi Santoso! 👋 ขอบคุณที่อุดหนุนสินค้าจาก",
    waPaidText: "คำสั่งซื้อ #ORD-84920 (฿119) ได้รับชำระเงินเรียบร้อยผ่าน PromptPay QR",
    waDownloadBtn: "📥 ลิงก์ดาวน์โหลด Preset Pack (.zip)",
    waDeliveredSec: "✓ จัดส่งอัตโนมัติภายใน 3 วินาที",
    waOpenRate: "อัตราการเปิดอ่าน 98%",
    card1Bullet1: "รองรับ Google Drive, PDF, Notion, Canva",
    card1Bullet2: "ลายน้ำบน PDF ป้องกันการละเมิดลิขสิทธิ์อัตโนมัติ",
    card1Bullet3: "ระบบแจ้งเตือนแอดมินหลายเบอร์พร้อมกัน",

    card2Badge: "ฝ่ายขายและร้านค้า",
    card2Title: "แคตตาล็อกสินค้าจริงและโชว์รูม",
    card2Desc:
      "แสดงรายการรถยนต์ มอเตอร์ไซค์ อสังหาริมทรัพย์ เสื้อผ้า หรือเมนูอาหาร รองรับการคำนวณเงินดาวน์ ราคาที่แน่นอน และปุ่ม 'สอบถามข้อมูล' ตรงสู่ WhatsApp",
    card2DpBadge: "คำนวณเงินดาวน์",
    card2CarTitle: "All-New SUV Hybrid 2026",
    card2CarPrice: "ดาวน์เริ่มต้น ฿35,000 • ผ่อน ฿9,900",
    card2ChatNote: "แชตพร้อมระบุสเปกสินค้าในข้อความ",
    card2ZeroFee: "0% ค่าคอมมิชชัน",

    card3Badge: "แอฟฟิลิเอตเอเชียตะวันออกเฉียงใต้",
    card3Title: "ศูนย์รวมลิงก์ตะกร้าเหลืองทุกแพลตฟอร์ม",
    card3Desc:
      "รวบรวมลิงก์แนะนำสินค้า TikTok Shop (ตะกร้าเหลือง), Shopee Mall และ Lazada ไว้ในลิงก์หน้าร้านเดียวโดยไม่จำกัดจำนวนลิงก์",
    card3Tiktok: "TikTok Shop (ตะกร้าเหลือง)",
    card3DirectLink: "ลิงก์ตรง",
    card3Marketplace: "Shopee Mall & Lazada SEA",
    card3AutoUtm: "Auto-UTM",
    card3Note: "ปลอดภัยจากการปิดกั้นของอัลกอริทึม • เปิดแอปพลิเคชันช้อปปิ้งโดยตรง",

    card4Badge: "ที่ปรึกษาและโค้ช",
    card4Title: "จองเวลาแบบ 1 ต่อ 1 และซิงค์ปฏิทิน",
    card4Desc:
      "เปิดรับการให้คำปรึกษาส่วนตัว ตรวจผลงาน หรือบริการวิชาชีพ ลูกค้าสามารถเลือกวันและเวลาที่ว่างได้เองโดยอัตโนมัติ ไม่ต้องเสียเวลาสอบถามคิว",
    card4Days: ["อังคาร", "พุธ", "พฤหัส", "ศุกร์"],
    card4Time: "19:30 น.",
    card4Slots: "ว่าง 2 รอบ",

    card5Badge: "อีเวนต์และสัมมนาออนไลน์",
    card5Title: "บัตรเข้าชมสัมมนาและระบบเตือนอัตโนมัติ",
    card5Desc:
      "จำหน่ายบัตรเวิร์กช็อปออนไลน์หรืออีเวนต์ออฟไลน์ ควบคุมจำนวนที่นั่งเรียลไทม์ และระบบจะส่งข้อความแจ้งเตือนก่อนวันงาน 1 วันไปยัง WhatsApp ของผู้เข้าร่วม",
    card5TicketTitle: "Masterclass สร้างคอนเทนต์ 2026",
    card5Price: "฿390",
    card5Location: "📍 สดผ่าน Google Meet • ที่นั่ง 48/50",
    card5AutoLink: "✓ สร้างลิงก์ห้องประชุมอัตโนมัติ",
    card5Reminder: "แจ้งเตือนก่อนเริ่ม 1 วัน",

    card6Badge: "กำไรเต็ม 100% ไม่ถูกหัก",
    card6Title: "0% ค่าคอมมิชชันคำสั่งซื้อทางแชต & ค่าธรรมเนียม QR ชัดเจน",
    card6Desc:
      "ปลดล็อกจากการถูกหักค่าคอมมิชชันสูงของมาร์เก็ตเพลส รับออเดอร์ตรงผ่าน WhatsApp โดยไม่มีค่าคอมมิชชันใดๆ (0%) หรือเปิดรับชำระเงินผ่าน PromptPay/QR ทันใจ พร้อมตัวเลือกตั้งค่าให้ผู้ซื้อช่วยรับผิดชอบค่าธรรมเนียม เพื่อให้กำไรของคุณยังคงอยู่ครบ 100%",
    card6Box1Label: "คำสั่งซื้อทาง WhatsApp",
    card6Box1Val: "0%",
    card6Box1Sub: "ไม่มีการหักค่าคอมมิชชันใดๆ",
    card6Box2Label: "ชำระเงินผ่าน QR ทันใจ",
    card6Box2Val: "เริ่มต้น 2%",
    card6Box2Sub: "สามารถตั้งค่าให้ผู้ซื้อจ่ายได้",
    card6Box3Label: "การถอนเงินเข้าบัญชี",
    card6Box3Val: "ฟรี 4 ครั้ง",
    card6Box3Sub: "ทุกเดือนไปยังทุกบัญชีธนาคาร",

    card7Badge: "โดเมนส่วนตัว + ยิงแอด",
    card7Title: "โดเมนของคุณเองและพิกเซลติดตามโฆษณา",
    card7Desc:
      "เพิ่มความน่าเชื่อถือให้กับแบรนด์ด้วยโดเมนส่วนตัว (yourbrand.com) พร้อม SSL ฟรี เชื่อมต่อกับ Meta Pixel, TikTok Ads และ Google Analytics 4 ได้ทันที",
    card7Domain: "yourbrand.com",
    card7Ssl: "SSL ทำงานอยู่",
    card7Pixel: "✓ Meta Pixel & CAPI",
    card7Ga: "✓ Google Analytics 4",
    card7Dns: "ตั้งค่า DNS ใน 1 คลิก • ซ่อนโลโก้แพลตฟอร์ม",

    bottomLabel: "ระบบนิเวศการขายที่ครบครันอื่นๆ:",
    bottomDesc:
      "รองรับ 5 ภาษาในเอเชียตะวันออกเฉียงใต้ (ID, EN, MS, TH, VI), ลายน้ำอัตโนมัติบน PDF, โค้ดส่วนลด และระบบติดตามพารามิเตอร์ UTM",
    bottomExploreBtn: "สำรวจฟีเจอร์ทั้งหมด",
    bottomPricingBtn: "ดูแพ็กเกจราคา",
  },
  vi: {
    card1Badge: "Nhà Sáng Tạo Ưa Chuộng Nhất",
    card1Title: "Sản Phẩm Kỹ Thuật Số & Tự Động Gửi File Qua WhatsApp",
    card1Desc:
      "Bán e-book, template Canva, preset ảnh, Notion template, hoặc khóa học video. Hóa đơn và liên kết tải file được gửi tự động tức thì đến WhatsApp của người mua 24/7 mà không cần bạn trực máy.",
    waBotTitle: "Bot Thông Báo WhatsApp etalase.online",
    waBotJustNow: "Vừa Xong",
    waGreeting: "Chào bạn Budi Santoso! 👋 Cảm ơn bạn đã mua hàng tại",
    waPaidText: "Đơn hàng #ORD-84920 (79.000 ₫) đã thanh toán qua VietQR.",
    waDownloadBtn: "📥 Tải Về Gói Preset Pack (.zip)",
    waDeliveredSec: "✓ Gửi tự động trong 3 giây",
    waOpenRate: "Tỷ Lệ Mở 98%",
    card1Bullet1: "Hỗ trợ Google Drive, PDF, Notion, Canva",
    card1Bullet2: "Đóng dấu bản quyền PDF chống sao chép",
    card1Bullet3: "Thông báo quản trị viên đến nhiều số WA",

    card2Badge: "Tư Vấn & Doanh Nghiệp",
    card2Title: "Danh Mục Hiện Vật & Showroom Trực Quan",
    card2Desc:
      "Trưng bày xe hơi, xe máy, bất động sản, thời trang hoặc thực đơn ăn uống. Hỗ trợ tính toán trả góp, giá cố định, và nút 'Tư Vấn Sản Phẩm' qua WhatsApp.",
    card2DpBadge: "Tính Trả Góp",
    card2CarTitle: "All-New SUV Hybrid 2026",
    card2CarPrice: "Trả trước từ 25 Tr • Góp 6,5 Tr/tháng",
    card2ChatNote: "Chat tự động kèm thông số xe",
    card2ZeroFee: "0% Hoa Hồng",

    card3Badge: "Tiếp Thị Liên Kết SEA",
    card3Title: "Trung Tâm Tiếp Thị Giỏ Vàng Đa Nền Tảng",
    card3Desc:
      "Gom toàn bộ link đề xuất mua sắm TikTok Shop (Giỏ Vàng), Shopee Mall và Lazada vào một liên kết duy nhất không giới hạn số lượng sản phẩm.",
    card3Tiktok: "TikTok Shop (Giỏ Vàng)",
    card3DirectLink: "Link Trực Tiếp",
    card3Marketplace: "Shopee Mall & Lazada SEA",
    card3AutoUtm: "Auto-UTM",
    card3Note: "An toàn khỏi hạn chế thuật toán • Mở thẳng trong app mua sắm",

    card4Badge: "Chuyên Gia & Huấn Luyện",
    card4Title: "Đặt Lịch 1-kèm-1 & Đồng Bộ Lịch Hẹn",
    card4Desc:
      "Mở các buổi cố vấn riêng, đánh giá dự án hoặc tư vấn chuyên sâu. Khách hàng chủ động chọn ngày và khung giờ còn trống mà không mất công trao đổi qua lại.",
    card4Days: ["Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"],
    card4Time: "19:30 GMT+7",
    card4Slots: "Còn 2 Lịch Trống",

    card5Badge: "Sự Kiện & Hội Thảo Trực Tuyến",
    card5Title: "Bán Vé Webinar & Nhắc Hẹn Tự Động",
    card5Desc:
      "Bán vé hội thảo trực tuyến hoặc sự kiện trực tiếp. Tự động kiểm soát số lượng vé và gửi thông báo nhắc hẹn trước 1 ngày qua WhatsApp của người tham dự.",
    card5TicketTitle: "Masterclass Sáng Tạo Nội Dung 2026",
    card5Price: "249.000 ₫",
    card5Location: "📍 Trực tiếp qua Google Meet • Còn 48/50 chỗ",
    card5AutoLink: "✓ Tự động tạo link phòng họp",
    card5Reminder: "Nhắc hẹn trước 1 ngày qua WA",

    card6Badge: "Bảo Toàn 100% Lợi Nhuận",
    card6Title: "0% Hoa Hồng Đơn Hàng Chat & Thanh Toán QR Minh Bạch",
    card6Desc:
      "Giải phóng bản thân khỏi mức phí hoa hồng cắt xén của các sàn thương mại. Tiếp nhận đơn hàng qua WhatsApp với 0% phí nền tảng, hoặc cung cấp cổng thanh toán QR tiện lợi với tùy chọn linh hoạt: người mua có thể trả phí giao dịch để bạn giữ trọn 100% doanh thu.",
    card6Box1Label: "Đơn Hàng WhatsApp",
    card6Box1Val: "0%",
    card6Box1Sub: "Không thu bất kỳ khoản hoa hồng nào",
    card6Box2Label: "Thanh Toán QR Tức Thì",
    card6Box2Val: "Từ 2%",
    card6Box2Sub: "Có thể cài đặt Người Mua chi trả",
    card6Box3Label: "Rút Tiền Về Ngân Hàng",
    card6Box3Val: "MIỄN PHÍ 4x",
    card6Box3Sub: "Mỗi tháng về tài khoản ngân hàng",

    card7Badge: "Tên Miền Riêng + Quảng Cáo",
    card7Title: "Tên Miền Thương Hiệu & Mã Theo Dõi Quảng Cáo",
    card7Desc:
      "Nâng tầm uy tín với tên miền riêng (namabrand.com) kèm chứng chỉ SSL miễn phí. Kết nối nhanh chóng với Meta Pixel, TikTok Ads và Google Analytics 4.",
    card7Domain: "namabrand.com",
    card7Ssl: "SSL Hoạt Động",
    card7Pixel: "✓ Meta Pixel & CAPI",
    card7Ga: "✓ Google Analytics 4",
    card7Dns: "Cài đặt DNS 1 chạm • Ẩn thương hiệu etalase.online",

    bottomLabel: "Hệ Sinh Thái Toàn Diện:",
    bottomDesc:
      "Giao diện đa ngôn ngữ Đông Nam Á (ID, EN, MS, TH, VI), đóng dấu bản quyền PDF tự động, mã voucher giảm giá và đo lường tham số UTM chi tiết.",
    bottomExploreBtn: "Khám Phá Tất Cả Tính Năng",
    bottomPricingBtn: "Xem Bảng Giá",
  },
};

export function InteractiveFeatureShowcase({ locale: propLocale }: InteractiveFeatureShowcaseProps = {}) {
  const pathname = usePathname() || "";

  let currentLocale: SupportedLocale = propLocale || "id";
  if (!propLocale) {
    if (pathname.startsWith("/en")) currentLocale = "en";
    else if (pathname.startsWith("/ms")) currentLocale = "ms";
    else if (pathname.startsWith("/th")) currentLocale = "th";
    else if (pathname.startsWith("/vi")) currentLocale = "vi";
  }

  const t = SHOWCASE_TRANSLATIONS[currentLocale] || SHOWCASE_TRANSLATIONS.id;

  const getLocalizedHref = (basePath: string) => {
    if (currentLocale === "id") return basePath;
    return `/${currentLocale}${basePath}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Bento Grid 3-Kolom Editorial */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ============================================================== */}
        {/* KARTU 1 (Span 2 Kolom): Digital Products & WhatsApp Delivery */}
        {/* ============================================================== */}
        <div className="lg:col-span-2 bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center shadow-xs">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] border border-[#FADCD3] px-3 py-1 rounded-full">
                {t.card1Badge}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight mb-2">
              {t.card1Title}
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed max-w-xl">
              {t.card1Desc}
            </p>
          </div>

          {/* Micro-UI: WhatsApp Chat Simulation */}
          <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-8 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-stone-500 pb-2 border-b border-stone-200/60">
                <span className="font-semibold text-[#1C1917] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {t.waBotTitle}
                </span>
                <span className="text-[10px]">{t.waBotJustNow}</span>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 text-xs text-stone-800 space-y-1.5">
                <p className="font-semibold text-emerald-950">
                  {t.waGreeting} <strong>Studio Rafa Creative</strong>.
                </p>
                <p className="text-[11px] text-stone-600">
                  {t.waPaidText}
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-emerald-300 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                    <span>{t.waDownloadBtn}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-stone-400 pt-0.5">
                <span>{t.waDeliveredSec}</span>
                <span className="text-emerald-700 font-semibold">{t.waOpenRate}</span>
              </div>
            </div>

            <div className="sm:col-span-4 space-y-2 text-xs text-[#57534E]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.card1Bullet1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.card1Bullet2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.card1Bullet3}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU 2 (1 Kolom): Physical Catalog & Showroom */}
        {/* ============================================================== */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-stone-100 text-[#1C1917] flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] bg-stone-100 px-3 py-1 rounded-full">
                {t.card2Badge}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#1C1917] tracking-tight mb-2">
              {t.card2Title}
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              {t.card2Desc}
            </p>
          </div>

          {/* Micro-UI: Mini Showroom Card */}
          <div className="mt-5 pt-4 border-t border-stone-100">
            <div className="bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl p-3 flex items-center gap-3">
              <img
                src="/images/demo/product-car-suv.jpg"
                alt="Showroom Preview"
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                  {t.card2DpBadge}
                </span>
                <div className="font-bold text-xs text-[#1C1917] truncate mt-0.5">
                  {t.card2CarTitle}
                </div>
                <div className="text-[11px] font-extrabold text-[#D94E28]">
                  {t.card2CarPrice}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 font-medium">
              <span>{t.card2ChatNote}</span>
              <span className="text-emerald-700 font-bold">{t.card2ZeroFee}</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU 3 (1 Kolom): Affiliate Keranjang Kuning SEA */}
        {/* ============================================================== */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                {t.card3Badge}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#1C1917] tracking-tight mb-2">
              {t.card3Title}
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              {t.card3Desc}
            </p>
          </div>

          {/* Micro-UI: Multi-Platform Chips */}
          <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                <span>🛍️</span> {t.card3Tiktok}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                {t.card3DirectLink}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                <span>🟠</span> {t.card3Marketplace}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                {t.card3AutoUtm}
              </span>
            </div>

            <p className="text-[10px] text-stone-400 text-center">
              {t.card3Note}
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU 4 (1 Kolom): 1-on-1 Booking & Calendar */}
        {/* ============================================================== */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                {t.card4Badge}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#1C1917] tracking-tight mb-2">
              {t.card4Title}
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              {t.card4Desc}
            </p>
          </div>

          {/* Micro-UI: Date Picker Mini */}
          <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
            <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
              <div className="p-2 rounded-xl bg-[#D94E28] text-white font-bold shadow-2xs">
                <div>{t.card4Days[0]}</div>
                <div className="text-xs">24</div>
              </div>
              <div className="p-2 rounded-xl bg-stone-100 text-stone-600 font-medium">
                <div>{t.card4Days[1]}</div>
                <div className="text-xs">25</div>
              </div>
              <div className="p-2 rounded-xl bg-stone-100 text-stone-600 font-medium">
                <div>{t.card4Days[2]}</div>
                <div className="text-xs">26</div>
              </div>
              <div className="p-2 rounded-xl bg-stone-100 text-stone-600 font-medium">
                <div>{t.card4Days[3]}</div>
                <div className="text-xs">27</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-center justify-between text-[11px] text-blue-900">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {t.card4Time}
              </span>
              <span className="font-bold text-emerald-700">{t.card4Slots}</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU 5 (1 Kolom): Event & Ticketing */}
        {/* ============================================================== */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Ticket className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                {t.card5Badge}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#1C1917] tracking-tight mb-2">
              {t.card5Title}
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              {t.card5Desc}
            </p>
          </div>

          {/* Micro-UI: Mini Ticket */}
          <div className="mt-5 pt-4 border-t border-stone-100 space-y-2.5">
            <div className="bg-[#FAF8F5] border border-dashed border-stone-300 rounded-2xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold text-[#1C1917]">
                <span className="truncate">{t.card5TicketTitle}</span>
                <span className="text-[#D94E28] shrink-0">{t.card5Price}</span>
              </div>
              <div className="text-[11px] text-stone-500 flex items-center gap-1">
                <span>{t.card5Location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-purple-700 font-semibold px-1">
              <span>{t.card5AutoLink}</span>
              <span>{t.card5Reminder}</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU 6 (Span 2 Kolom): Pagar Margin & Transparansi Biaya */}
        {/* ============================================================== */}
        <div className="lg:col-span-2 bg-[#FAF8F5] border-2 border-[#D94E28]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#D94E28] text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {t.card6Badge}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight mb-2">
              {t.card6Title}
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed max-w-xl">
              {t.card6Desc}
            </p>
          </div>

          {/* Micro-UI: 3 Pillar Fee Boxes */}
          <div className="mt-6 pt-6 border-t border-[#E7E5E4] grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-white rounded-2xl p-4 border border-[#E7E5E4] shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#57534E] block mb-1">
                {t.card6Box1Label}
              </span>
              <div className="text-2xl font-black text-emerald-600">{t.card6Box1Val}</div>
              <span className="text-[11px] text-stone-500 font-medium mt-0.5 block">
                {t.card6Box1Sub}
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#E7E5E4] shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#57534E] block mb-1">
                {t.card6Box2Label}
              </span>
              <div className="text-2xl font-black text-[#D94E28]">{t.card6Box2Val}</div>
              <span className="text-[11px] text-stone-500 font-medium mt-0.5 block">
                {t.card6Box2Sub}
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#E7E5E4] shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#57534E] block mb-1">
                {t.card6Box3Label}
              </span>
              <div className="text-2xl font-black text-slate-900">{t.card6Box3Val}</div>
              <span className="text-[11px] text-stone-500 font-medium mt-0.5 block">
                {t.card6Box3Sub}
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU 7 (1 Kolom): Custom Domain & Tracking Ads Pixel */}
        {/* ============================================================== */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-3 py-1 rounded-full">
                {t.card7Badge}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#1C1917] tracking-tight mb-2">
              {t.card7Title}
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              {t.card7Desc}
            </p>
          </div>

          {/* Micro-UI: Browser URL Bar + Tracking Chips */}
          <div className="mt-5 pt-4 border-t border-stone-100 space-y-2.5">
            <div className="bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-3 py-2 flex items-center justify-between text-xs font-mono">
              <span className="text-stone-700 font-semibold truncate flex items-center gap-1.5">
                <span className="text-emerald-600 text-[10px]">🔒</span>
                {t.card7Domain}
              </span>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                {t.card7Ssl}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10px] text-stone-600 font-medium">
              <div className="bg-stone-50 border border-stone-200/70 rounded-lg p-1.5 text-center truncate">
                {t.card7Pixel}
              </div>
              <div className="bg-stone-50 border border-stone-200/70 rounded-lg p-1.5 text-center truncate">
                {t.card7Ga}
              </div>
            </div>

            <p className="text-[10px] text-stone-400 text-center">
              {t.card7Dns}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Links to Features & Pricing */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-2xs">
        <div className="text-xs text-[#57534E] text-center sm:text-left">
          <strong>{t.bottomLabel}</strong> {t.bottomDesc}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={getLocalizedHref("/fitur")}
            className="text-xs font-bold text-[#D94E28] hover:text-[#B83E1D] inline-flex items-center gap-1 transition"
          >
            <span>{t.bottomExploreBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-stone-300">|</span>
          <Link
            href={getLocalizedHref("/harga")}
            className="text-xs font-bold text-[#1C1917] hover:text-[#D94E28] inline-flex items-center gap-1 transition"
          >
            <span>{t.bottomPricingBtn}</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
