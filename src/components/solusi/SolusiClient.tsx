"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Sparkles,
  ArrowRight,
  XCircle,
  CheckCircle2,
  Car,
  Coffee,
  ShoppingBag,
  Users,
  Compass,
} from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

interface IndustryItem {
  id: string;
  title: string;
  icon: React.ElementType;
  tagline: string;
  templateLink: string;
  beforeProblems: string[];
  afterSolutions: string[];
  features: string[];
}

export const SOLUSI_DATA: Record<
  SupportedLocale,
  {
    badge: string;
    h1: string;
    subtitle: string;
    sidebarHeader: string;
    beforeHeader: string;
    afterHeader: string;
    featuresHeader: string;
    ctaPrefix: string;
    ctaSecondary: string;
    industries: IndustryItem[];
  }
> = {
  id: {
    badge: "Solusi Terarah Sesuai Industri Anda",
    h1: "Dibangun untuk Cara Jualan Anda di Asia Tenggara.",
    subtitle:
      "Bukan sekadar link bio biasa. etalase.online dirancang untuk menyelesaikan friksi transaksi nyata: dari jualan e-book via WhatsApp hingga simulasi DP mobil.",
    sidebarHeader: "Pilih Jenis Usaha Anda",
    beforeHeader: "Sebelum Pakai etalase.online",
    afterHeader: "Dengan etalase.online",
    featuresHeader: "Kemampuan Khusus Terintegrasi:",
    ctaPrefix: "Buat Etalase untuk",
    ctaSecondary: "Lihat Arketipe Template →",
    industries: [
      {
        id: "creator",
        title: "Kreator & Penjual Produk Digital",
        icon: Sparkles,
        tagline: "E-Book, Preset Lightroom, Template Canva, & Video Course",
        templateLink: "rafa.etalase.online",
        beforeProblems: [
          "Harus kirim file manual satu per satu ke chat pembeli setelah transfer bank",
          "Rawan file dibajak dan disebarkan ulang tanpa izin",
          "Komisi marketplace digital asing memotong hingga 10–20% dari tiap penjualan",
          "Calon pembeli ragu karena link bio teks kaku tanpa foto preview karya",
        ],
        afterSolutions: [
          "Sistem otomatis mengirimkan link download & struk ke WhatsApp pembeli dalam 2 detik",
          "Watermark PDF dinamis anti-bajak mencantumkan nama & nomor HP pembeli",
          "0% komisi transaksi order chat & QRIS murah mulai 2% (bisa ditanggung pembeli)",
          "Showcase visual mobile-first berkarakter Warm Editorial yang meyakinkan",
        ],
        features: [
          "Auto-Delivery WhatsApp",
          "Watermark PDF Dinamis",
          "QRIS Instan BorderPay",
          "Domain Pribadi (.com)",
        ],
      },
      {
        id: "affiliate",
        title: "Afiliator TikTok & Shopee Video",
        icon: ShoppingBag,
        tagline: "Rekomendasi Racun Belanja Keranjang Kuning & Shopee Mall",
        templateLink: "aisyahlook.etalase.online",
        beforeProblems: [
          "Link affiliate diblokir atau kena shadowban di bio media sosial",
          "Hanya bisa taruh 1 link di bio, bingung membagi ratusan produk racun",
          "Tampilan bio link kompetitor lambat dibuka dan penuh tombol teks kaku",
          "Tidak tahu produk mana yang paling banyak menghasilkan klik",
        ],
        afterSolutions: [
          "Subdomain mandiri bebas razia algoritma & ramah crawler TikTok / IG",
          "Tampilan katalog visual dengan tab kategori (Fashion, Skincare, Gadget)",
          "Deep link langsung membuka aplikasi marketplace di smartphone pembeli",
          "Pelacakan klik akurat per produk untuk memaksimalkan strategi promosi",
        ],
        features: [
          "Deep-Link Aplikasi",
          "Kategori Tab Multi-Level",
          "Bebas Banned Algoritma",
          "Integrasi Meta Pixel",
        ],
      },
      {
        id: "sales",
        title: "Sales Mobil, Motor & Properti",
        icon: Car,
        tagline: "Showroom Mobil Baru/Bekas, Agen Properti & Konsultan Unit",
        templateLink: "bastianmobil.etalase.online",
        beforeProblems: [
          "Kolega sales membagikan PDF price list ratusan MB yang bikin HP calon pembeli hang",
          "Calon pembeli bingung menghitung simulasi uang muka (DP) dan cicilan bulanan",
          "Chat masuk dari calon pembeli tidak menyertakan unit spesifik yang dimaksud",
          "Katalog listing di medsos berantakan dan sulit diperbarui",
        ],
        afterSolutions: [
          "Showroom digital mobile-first super ringan dengan galeri foto resolusi tinggi",
          "Chip simulasi DP & cicilan bulanan langsung di bawah foto unit",
          "Tombol 'Tanya Unit' ke WA otomatis memuat nama dan tipe mobil di draf pesan",
          "Perbarui stok dan harga unit kapan saja langsung dari dashboard smartphone",
        ],
        features: [
          "Simulasi DP Otomatis",
          "Chip Spesifikasi Unit",
          "Chat Order Draf Otomatis",
          "Galeri Foto HD",
        ],
      },
      {
        id: "cafe",
        title: "Cafe, Resto & Bisnis Kuliner",
        icon: Coffee,
        tagline: "Menu Visual QR Meja Kasir & Pemesanan Mandiri",
        templateLink: "kopisenja.etalase.online",
        beforeProblems: [
          "Buku menu cetak cepat kusam, robek, dan mahal tiap kali ganti harga",
          "Pelanggan antre lama di kasir hanya untuk melihat-lihat menu",
          "Sistem POS aplikasi meja berbayar jutaan rupiah per tahun",
          "Sulit mendapatkan ulasan Google Review bintang 5 dari pengunjung",
        ],
        afterSolutions: [
          "Standee QR meja akrilik siap cetak yang langsung membuka buku menu visual",
          "Pelanggan pesan langsung dari meja ke WhatsApp kasir tanpa unduh aplikasi",
          "Gratis selamanya tanpa biaya langganan bulanan yang memberatkan kas cafe",
          "Tombol booster Google Review bintang 5 terintegrasi di akhir menu",
        ],
        features: [
          "Standee QR Meja Akrilik",
          "Menu Visual 2 Kolom",
          "0% Komisi Order WA",
          "Booster Google Review",
        ],
      },
      {
        id: "consultant",
        title: "Konsultan, Dokter & Mentor",
        icon: Users,
        tagline: "Sesi Mentoring Privat, Audit Portofolio & Konsultasi 1-on-1",
        templateLink: "drhendra.etalase.online",
        beforeProblems: [
          "Menghabiskan waktu berjam-jam tanya-jawab ketersediaan jadwal kosong",
          "Klien sering lupa jadwal atau membatalkan sesi secara mendadak",
          "Ribet meminta bukti transfer dan mengirim tautan Google Meet manual",
          "Tidak ada bukti profesionalitas platform saat menawarkan jasa bernilai tinggi",
        ],
        afterSolutions: [
          "Kalender booking instan: klien memilih tanggal & jam yang kosong secara mandiri",
          "Wajib bayar di muka via QRIS untuk mengunci slot komitmen konsultasi",
          "Tautan Google Meet dan invoice resmi terkirim otomatis ke WhatsApp klien",
          "Pengingat otomatis H-1 ke WhatsApp klien untuk meminimalkan no-show",
        ],
        features: [
          "Kalender Booking Real-time",
          "Kirim Link Meet Otomatis",
          "Reminder H-1 WhatsApp",
          "Pembayaran Di Muka",
        ],
      },
      {
        id: "rental",
        title: "Rental Mobil, Kamera & Studio",
        icon: Compass,
        tagline: "Penyewaan Alat Fotografi, Mobil Lepas Kunci & Studio Foto",
        templateLink: "bastianmobil.etalase.online",
        beforeProblems: [
          "Penyewa sering menanyakan unit yang sebenarnya sedang disewa orang lain",
          "Format syarat sewa (KTP, SIM, deposit) harus diketik berulang-ulang di chat",
          "Katalog harga sewa 12 jam vs 24 jam membingungkan di medsos",
          "Sulit mendokumentasikan draf pemesanan secara rapi",
        ],
        afterSolutions: [
          "Status ketersediaan unit terpasang jelas dengan opsi durasi sewa harian/mingguan",
          "Syarat & ketentuan sewa otomatis tercantum di halaman etalase sebelum booking",
          "Formulir sewa otomatis merangkum tanggal sewa dan data identitas ke WhatsApp admin",
          "Tampilan profesional meningkatkan rasa percaya untuk transaksi bernilai jutaan",
        ],
        features: [
          "Pilihan Durasi Sewa",
          "Format Syarat & Ketentuan",
          "Order Chat Terstruktur",
          "Dukungan Multi-Admin",
        ],
      },
    ],
  },
  en: {
    badge: "Tailored Solutions by Industry",
    h1: "Engineered for How You Sell in Southeast Asia.",
    subtitle:
      "Not just another generic link-in-bio tool. etalase.online solves concrete commerce friction: from automated digital downloads to high-ticket automotive financing.",
    sidebarHeader: "Select Your Business Category",
    beforeHeader: "Before etalase.online",
    afterHeader: "With etalase.online",
    featuresHeader: "Specialized Integrated Features:",
    ctaPrefix: "Launch Storefront for",
    ctaSecondary: "Explore Design Archetypes →",
    industries: [
      {
        id: "creator",
        title: "Digital Creators & Knowledge Sellers",
        icon: Sparkles,
        tagline: "E-Books, Lightroom Presets, Canva Templates & Video Courses",
        templateLink: "rafa.etalase.online",
        beforeProblems: [
          "Manually sending download links one by one over chat after bank transfers",
          "High risk of digital asset piracy and unauthorized link redistributions",
          "Global marketplace platforms taking 10–20% cuts from every transaction",
          "Prospects hesitating due to plain text links lacking visual previews",
        ],
        afterSolutions: [
          "Cloud bot automatically dispatches receipts & download links to WhatsApp in 2s",
          "Dynamic PDF anti-piracy watermarking stamps buyer name & phone details",
          "0% commission on direct chat orders, discounted QR from 2% (convenience fee available)",
          "Polished Warm Editorial mobile-first visuals establishing instant credibility",
        ],
        features: [
          "Automated WhatsApp Delivery",
          "Anti-Piracy PDF Watermarking",
          "Instant FinTech QR",
          "Custom Apex Domain (.com)",
        ],
      },
      {
        id: "affiliate",
        title: "TikTok & Shopee Video Affiliates",
        icon: ShoppingBag,
        tagline: "Curated Recommendations for TikTok Yellow Basket & Shopee Mall",
        templateLink: "aisyahlook.etalase.online",
        beforeProblems: [
          "Affiliate links repeatedly flagged or shadowbanned on social media bios",
          "Restricted to a single bio link while recommending hundreds of viral products",
          "Slow-loading link trees cluttered with outdated text-only buttons",
          "Zero product-level analytics to see which specific items convert best",
        ],
        afterSolutions: [
          "Independent dedicated subdomain safe from algorithmic link purges",
          "Structured visual photo catalog organized by multi-level category tabs",
          "Mobile deep-linking directly into marketplace apps with affiliate tags",
          "Granular per-item click tracking to double down on high-converting winners",
        ],
        features: [
          "App Deep-Linking",
          "Multi-Level Category Tabs",
          "Algorithm-Safe Architecture",
          "Meta Pixel Server-Side Tracking",
        ],
      },
      {
        id: "sales",
        title: "Auto & Property Sales Consultants",
        icon: Car,
        tagline: "New/Used Vehicle Showrooms, Real Estate Listings & Dealerships",
        templateLink: "bastianmobil.etalase.online",
        beforeProblems: [
          "Sales reps sending heavy 100MB PDF brochures that crash client smartphones",
          "Clients confused by complex down-payment schedules and monthly installments",
          "Incoming WhatsApp leads failing to specify the exact vehicle trim in question",
          "Social media listing feeds messy, disoriented, and tedious to maintain",
        ],
        afterSolutions: [
          "Super-fast mobile showroom with high-resolution galleries and spec chips",
          "Down-payment calculators and monthly financing tables directly beneath unit photos",
          "'Inquire Unit' button automatically pre-fills vehicle name & trim into chat drafts",
          "Update stock status and pricing anytime on the go directly from your mobile device",
        ],
        features: [
          "Instant Down-Payment Estimator",
          "Unit Specification Chips",
          "Pre-Filled Chat Drafts",
          "HD Mobile Galleries",
        ],
      },
      {
        id: "cafe",
        title: "Cafes, Dining & Food Services",
        icon: Coffee,
        tagline: "Contactless QR Menus & Zero-Commission Table Ordering",
        templateLink: "kopisenja.etalase.online",
        beforeProblems: [
          "Printed laminated menus stain quickly and cost hundreds to reprint per price change",
          "Long customer queues at the cashier counter just to browse options",
          "Expensive restaurant POS software charging thousands of dollars yearly",
          "Struggling to collect verified 5-star Google Map reviews from dine-in guests",
        ],
        afterSolutions: [
          "Print-ready acrylic table standees linking directly to visual digital menus",
          "Customers order from their table straight to cashier WhatsApp without app downloads",
          "Free forever with zero monthly overhead eating into food margins",
          "Built-in 5-star Google Review booster button integrated at the bottom of the menu",
        ],
        features: [
          "Acrylic Counter Standee QR",
          "2-Column Visual Menu Grid",
          "0% WhatsApp Order Fees",
          "Google Review Booster",
        ],
      },
      {
        id: "consultant",
        title: "Consultants, Doctors & Advisors",
        icon: Users,
        tagline: "Private Mentoring, Portfolio Audits & 1-on-1 Strategy Sessions",
        templateLink: "drhendra.etalase.online",
        beforeProblems: [
          "Wasting hours exchanging messages back and forth to find open time slots",
          "Clients forgetting session appointments or canceling last minute",
          "Awkward manual bank transfer reconciliation and manually emailing meeting links",
          "Lack of professional presentation when offering high-ticket advisory packages",
        ],
        afterSolutions: [
          "Real-time booking calendar: clients self-select available dates and times",
          "Mandatory upfront payments via QR to secure client session commitments",
          "Google Meet conferencing links and official invoices dispatched automatically",
          "Automated WhatsApp 24h reminders sent to clients to minimize missed appointments",
        ],
        features: [
          "Real-Time Booking Calendar",
          "Automated Meeting Links",
          "24-Hour WhatsApp Reminders",
          "Mandatory Upfront Payment",
        ],
      },
      {
        id: "rental",
        title: "Vehicle, Camera & Studio Rentals",
        icon: Compass,
        tagline: "Equipment Rentals, Self-Drive Cars & Creative Studio Bookings",
        templateLink: "bastianmobil.etalase.online",
        beforeProblems: [
          "Renters continuously inquiring about gear or cars already booked by others",
          "Repetitively typing deposit terms, driver license rules, and rental contracts in chat",
          "Unclear pricing tables between 12-hour vs 24-hour rental rates on social feeds",
          "Difficulty maintaining clean documentation of booking details",
        ],
        afterSolutions: [
          "Real-time asset availability clearly displayed with daily and weekly rate options",
          "Terms and rental requirements prominently stated on storefront before inquiry",
          "Rental request forms automatically summarize rental dates and identity info into chat",
          "Professional presentation establishing trust for high-value equipment rentals",
        ],
        features: [
          "Flexible Rental Durations",
          "Built-in Rental Terms",
          "Structured Chat Orders",
          "Multi-Agent Support",
        ],
      },
    ],
  },
  ms: {
    badge: "Penyelesaian Khusus Mengikut Industri",
    h1: "Dibina untuk Cara Anda Berniaga di Asia Tenggara.",
    subtitle:
      "Bukan sekadar pautan bio biasa. etalase.online menyelesaikan cabaran jualan sebenar: daripada penghantaran e-buku secara automatik hingga simulasi pinjaman kereta.",
    sidebarHeader: "Pilih Kategori Perniagaan",
    beforeHeader: "Sebelum etalase.online",
    afterHeader: "Dengan etalase.online",
    featuresHeader: "Ciri Khas Bersepadu:",
    ctaPrefix: "Bina Etalase untuk",
    ctaSecondary: "Lihat Arketip Templat →",
    industries: [
      {
        id: "creator",
        title: "Pencipta & Penjual Produk Digital",
        icon: Sparkles,
        tagline: "E-Buku, Praset Lightroom, Templat Canva & Kursus Video",
        templateLink: "rafa.etalase.online",
        beforeProblems: [
          "Menghantar pautan muat turun satu per satu secara manual selepas bayaran",
          "Risiko fail digital dicetak rompak dan disebarkan tanpa kebenaran",
          "Potongan komisen pasaran digital global mencecah 10–20% bagi setiap transaksi",
          "Pelanggan ragu-ragu kerana pautan teks lama tanpa gambar pratonton",
        ],
        afterSolutions: [
          "Bot awan menghantar resit & pautan fail ke WhatsApp pembeli dalam 2 saat",
          "Tera air PDF anti-cetak rompak mencetak nama & nombor telefon pembeli",
          "0% komisen pesanan sembang terus & yuran QR murah dari 2%",
          "Gaya visual Warm Editorial mobile-first yang membina keyakinan pembeli",
        ],
        features: [
          "Penghantaran WhatsApp Pantas",
          "Tera Air PDF Dinamik",
          "Bayaran QR FinTech",
          "Domain Kustom (.com)",
        ],
      },
      {
        id: "affiliate",
        title: "Penyunting TikTok & Shopee Video",
        icon: ShoppingBag,
        tagline: "Cadangan Barangan Beg Kuning & Shopee Mall",
        templateLink: "aisyahlook.etalase.online",
        beforeProblems: [
          "Pautan afiliasi disekat atau disembunyikan oleh algoritma media sosial",
          "Hanya boleh meletakkan 1 pautan sedangkan mempunyai ratusan produk syor",
          "Pohon pautan lama lambat dimuatkan dan dipenuhi butang teks kaku",
          "Tiada data statistik klik bagi setiap produk untuk menilai prestasi",
        ],
        afterSolutions: [
          "Subdomain mandiri selamat daripada sekatan algoritma TikTok / IG",
          "Katalog foto tersusun dengan tab kategori (Fesyen, Kosmetik, Peranti)",
          "Pautan terus (deep link) membuka aplikasi pasaran di telefon pembeli",
          "Penjejakan klik tepat bagi setiap barangan untuk melipatgandakan jualan",
        ],
        features: [
          "Pautan Terus Aplikasi",
          "Tab Kategori Pelbagai Peringkat",
          "Bebas Sekatan Algoritma",
          "Penjejakan Meta Pixel",
        ],
      },
      {
        id: "sales",
        title: "Jurujual Kereta, Motosikal & Hartanah",
        icon: Car,
        tagline: "Bilik Pameran Kenderaan Baharu/Terpakai & Ejen Hartanah",
        templateLink: "bastianmobil.etalase.online",
        beforeProblems: [
          "Jurujual menghantar risalah PDF bersaiz 100MB yang membebankan telefon pelanggan",
          "Pelanggan keliru mengira simulasi wang muka (DP) dan ansuran bulanan",
          "Pertanyaan WhatsApp daripada pelanggan tidak menyatakan jenis kenderaan spesifik",
          "Senarai jualan di media sosial bersepah dan sukar dikemas kini",
        ],
        afterSolutions: [
          "Bilik pameran digital mobile-first pantas dengan galeri foto resolusi tinggi",
          "Simulasi wang muka dan jadual ansuran bulanan terus di bawah gambar unit",
          "Butang 'Tanya Unit' secara automatik mengisi nama model dalam draf sembang",
          "Kemas kini status stok dan harga bila-bila masa terus dari telefon pintar anda",
        ],
        features: [
          "Simulasi Wang Muka Pantas",
          "Cip Spesifikasi Unit",
          "Draf Mesej Automatik",
          "Galeri Foto HD",
        ],
      },
      {
        id: "cafe",
        title: "Kafe, Restoran & Makanan Minuman",
        icon: Coffee,
        tagline: "Menu Visual QR Meja & Pesanan Terus",
        templateLink: "kopisenja.etalase.online",
        beforeProblems: [
          "Buku menu kertas cepat kotor dan mahal untuk dicetak semula setiap perubahan harga",
          "Pelanggan beratur panjang di kaunter semata-mata untuk meneliti menu",
          "Perisian POS sistem meja mengenakan yuran langganan tahunan yang tinggi",
          "Sukar mengumpul ulasan 5 bintang Google Maps daripada pelanggan",
        ],
        afterSolutions: [
          "Standee QR akrilik sedia cetak yang terus memaparkan menu visual digital",
          "Pelanggan memesan terus dari meja ke WhatsApp kaunter tanpa memuat turun aplikasi",
          "Percuma selamanya tanpa yuran bulanan yang menjejaskan margin makanan",
          "Butang galakan ulasan 5 bintang Google Maps bersepadu di penghujung menu",
        ],
        features: [
          "Standee QR Meja Akrilik",
          "Menu Visual 2 Kolum",
          "0% Yuran Pesanan WhatsApp",
          "Penggalak Ulasan Google",
        ],
      },
      {
        id: "consultant",
        title: "Perunding, Doktor & Pembimbing",
        icon: Users,
        tagline: "Sesi Bimbingan Peribadi, Audit Portfolio & Rundingan 1-on-1",
        templateLink: "drhendra.etalase.online",
        beforeProblems: [
          "Membuang masa berjam-jam bertukar mesej untuk mencari slot masa terluang",
          "Klien kerap terlupa temu janji atau membatalkan sesi pada saat akhir",
          "Kekok menyemak resit pemindahan bank dan menghantar pautan Google Meet manual",
          "Kurang keyakinan apabila menawarkan pakej perundingan bernilai tinggi",
        ],
        afterSolutions: [
          "Kalendar tempahan langsung: klien memilih tarikh dan masa secara mandiri",
          "Wajib bayar pendahuluan melalui QR untuk mengesahkan komitmen klien",
          "Pautan Google Meet dan invois rasmi dihantar secara automatik ke WhatsApp klien",
          "Peringatan automatik H-1 ke WhatsApp klien untuk mengelakkan ketidakhadiran",
        ],
        features: [
          "Kalendar Tempahan Langsung",
          "Pautan Google Meet Automatik",
          "Peringatan 24 Jam WhatsApp",
          "Bayaran Pendahuluan Mandatori",
        ],
      },
      {
        id: "rental",
        title: "Sewa Kereta, Kamera & Studio",
        icon: Compass,
        tagline: "Penyewaan Alat Fotografi, Kereta Pandu Sendiri & Studio Kreatif",
        templateLink: "bastianmobil.etalase.online",
        beforeProblems: [
          "Penyewa kerap bertanyakan barangan yang sebenarnya sudah ditempah orang lain",
          "Perlu menaip syarat sewa (kad pengenalan, lesen, deposit) berulang kali di sembang",
          "Harga sewa 12 jam vs 24 jam mengelirukan pelanggan di media sosial",
          "Sukar mendokumentasikan butiran tempahan dengan kemas",
        ],
        afterSolutions: [
          "Status ketersediaan unit dipaparkan dengan jelas beserta pilihan kadar harian/mingguan",
          "Terma dan syarat sewaan dinyatakan secara jelas di etalase sebelum tempahan",
          "Borang tempahan merumuskan tarikh dan maklumat penyewa ke WhatsApp pentadbir",
          "Penampilan profesional membina keyakinan untuk penyewaan barangan bernilai tinggi",
        ],
        features: [
          "Pilihan Tempoh Sewa",
          "Syarat Sewaan Bersepadu",
          "Pesanan Sembang Teratur",
          "Sokongan Pelbagai Pentadbir",
        ],
      },
    ],
  },
  th: {
    badge: "โซลูชันที่ตรงจุดตามประเภทธุรกิจของคุณ",
    h1: "ออกแบบมาเพื่อวิธีการขายของคุณในเอเชียตะวันออกเฉียงใต้",
    subtitle:
      "ไม่ใช่แค่เครื่องมือรวมลิงก์ทั่วไป etalase.online ออกแบบมาเพื่อแก้ปัญหาการซื้อขายจริง: ตั้งแต่การส่งมอบอีบุ๊กอัตโนมัติทาง WhatsApp ไปจนถึงการคำนวณเงินดาวน์รถยนต์",
    sidebarHeader: "เลือกประเภทธุรกิจของคุณ",
    beforeHeader: "ก่อนใช้ etalase.online",
    afterHeader: "หลังใช้ etalase.online",
    featuresHeader: "ฟังก์ชันเฉพาะทางที่ผสานรวมในตัว:",
    ctaPrefix: "สร้างหน้าร้านสำหรับ",
    ctaSecondary: "ดูรูปแบบเทมเพลตทั้งหมด →",
    industries: [
      {
        id: "creator",
        title: "ครีเอเตอร์และผู้ขายสินค้าดิจิทัล",
        icon: Sparkles,
        tagline: "อีบุ๊ก, พรีเซ็ต Lightroom, เทมเพลต Canva และคอร์สเรียนวิดีโอ",
        templateLink: "rafa.etalase.online",
        beforeProblems: [
          "ต้องคอยส่งลิงก์ดาวน์โหลดทีละคนด้วยตนเองในแชตหลังจากลูกค้าโอนเงิน",
          "เสี่ยงต่อการถูกขโมยผลงานและนำลิงก์ไปแจกจ่ายต่อโดยไม่ได้รับอนุญาต",
          "มาร์เก็ตเพลสดิจิทัลต่างประเทศหักค่าคอมมิชชันสูงถึง 10–20% ในทุกยอดขาย",
          "ลูกค้าลังเลที่จะซื้อเพราะลิงก์ไบโอแบบเก่ามีแต่ข้อความ ไม่มีภาพพรีวิวผลงาน",
        ],
        afterSolutions: [
          "ระบบคลาวด์ส่งใบเสร็จและลิงก์ดาวน์โหลดถึง WhatsApp ลูกค้าอัตโนมัติใน 2 วินาที",
          "ระบบใส่ลายน้ำบน PDF อัตโนมัติระบุชื่อและเบอร์โทรศัพท์ของผู้ซื้อเพื่อป้องกันการแชร์",
          "0% ค่าคอมมิชชันคำสั่งซื้อทางแชต & ค่าธรรมเนียม QR เริ่มต้น 2% (ผู้ซื้อจ่ายได้)",
          "การจัดแสดงผลงานสไตล์ Warm Editorial บนมือถือที่สร้างความน่าเชื่อถือทันตา",
        ],
        features: [
          "ส่งมอบทาง WhatsApp อัตโนมัติ",
          "ลายน้ำ PDF ป้องกันการละเมิด",
          "ระบบชำระเงิน QR ทันใจ",
          "โดเมนส่วนตัว (.com)",
        ],
      },
      {
        id: "affiliate",
        title: "แอฟฟิลิเอต TikTok & Shopee Video",
        icon: ShoppingBag,
        tagline: "รวมพิกัดป้ายยาตะกร้าเหลือง TikTok และ Shopee Mall",
        templateLink: "aisyahlook.etalase.online",
        beforeProblems: [
          "ลิงก์แอฟฟิลิเอตถูกปิดกั้นหรือโดนลดการมองเห็นในไบโอโซเชียลมีเดีย",
          "ใส่ลิงก์ในไบโอได้แค่ลิงก์เดียว แต่มีสินค้าแนะนำหลายร้อยรายการ",
          "หน้าเว็บรวมลิงก์แบบเดิมโหลดช้าและเต็มไปด้วยปุ่มข้อความที่ดูไม่น่าสนใจ",
          "ไม่รู้ว่าสินค้าตัวไหนสร้างยอดคลิกและยอดขายได้ดีที่สุด",
        ],
        afterSolutions: [
          "ซับโดเมนส่วนตัวที่ปลอดภัยจากการปิดกั้นของอัลกอริทึม TikTok และ IG",
          "แคตตาล็อกรูปภาพสวยงามพร้อมแท็บแยกหมวดหมู่ (แฟชั่น, สกินแคร์, แกดเจ็ต)",
          "ระบบเปิดแอปช้อปปิ้งโดยตรง (Deep Link) พร้อมแนบรหัสแอฟฟิลิเอตของคุณ",
          "สถิติการคลิกรายสินค้าแบบเจาะลึก เพื่อเน้นโปรโมตสินค้าที่ทำเงินได้สูงสุด",
        ],
        features: [
          "เปิดเข้าแอปโดยตรง",
          "แท็บหมวดหมู่หลายระดับ",
          "ปลอดภัยจากอัลกอริทึม",
          "เชื่อมต่อ Meta Pixel ฝั่งเซิร์ฟเวอร์",
        ],
      },
      {
        id: "sales",
        title: "ฝ่ายขายรถยนต์ มอเตอร์ไซค์ & อสังหาฯ",
        icon: Car,
        tagline: "โชว์รูมรถยนต์ใหม่/มือสอง, รายการอสังหาริมทรัพย์ และที่ปรึกษาการขาย",
        templateLink: "bastianmobil.etalase.online",
        beforeProblems: [
          "เซลส์ต้องส่งไฟล์ PDF โบรชัวร์ขนาด 100MB ที่ทำให้มือถือลูกค้าค้าง",
          "ลูกค้าคำนวณเงินดาวน์และค่างวดรายเดือนไม่ถูก เสียเวลาสอบถามไปมา",
          "ลูกค้าทักแชตมาแต่ไม่ระบุรุ่นและสเปกรถที่ต้องการอย่างชัดเจน",
          "โพสต์ขายบนโซเชียลมีเดียกระจัดกระจายและอัปเดตสต็อกได้ยากลำบาก",
        ],
        afterSolutions: [
          "โชว์รูมดิจิทัลบนมือถือที่โหลดเร็วมาก พร้อมแกลเลอรีรูปภาพคมชัดระดับ HD",
          "ระบบจำลองเงินดาวน์และตารางค่างวดรายเดือนอยู่ใต้รูปภาพของแต่ละคัน",
          "ปุ่ม 'สอบถามข้อมูล' เติมชื่อรุ่นและสเปกลงในแชต WhatsApp ให้ลูกค้าทันที",
          "อัปเดตสถานะและราคาสินค้าได้ทุกที่ทุกเวลาโดยตรงจากสมาร์ตโฟนของคุณ",
        ],
        features: [
          "คำนวณเงินดาวน์อัตโนมัติ",
          "แสดงสเปกสินค้าชัดเจน",
          "สร้างข้อความแชตอัตโนมัติ",
          "แกลเลอรีรูปภาพคมชัด",
        ],
      },
      {
        id: "cafe",
        title: "คาเฟ่ ร้านอาหาร & ธุรกิจอาหาร",
        icon: Coffee,
        tagline: "เมนูรูปภาพ QR ตั้งโต๊ะ & สั่งอาหารโดยตรง",
        templateLink: "kopisenja.etalase.online",
        beforeProblems: [
          "เล่มเมนูกระดาษเปรอะเปื้อนง่าย และมีค่าใช้จ่ายสูงทุกครั้งที่ต้องเปลี่ยนราคา",
          "ลูกค้าต้องต่อคิวยาวที่เคาน์เตอร์แคชเชียร์เพียงเพื่อขอดูเมนู",
          "ระบบ POS สั่งอาหารที่โต๊ะมีค่าบริการรายปีหลายหมื่นบาท",
          "ยากที่จะขอให้ลูกค้าช่วยรีวิว 5 ดาวบน Google Maps",
        ],
        afterSolutions: [
          "ป้ายสแตนดี้อะคริลิกตั้งโต๊ะพร้อมพิมพ์ที่เปิดดูเมนูรูปภาพได้ทันที",
          "ลูกค้าสั่งอาหารจากโต๊ะตรงสู่ WhatsApp แคชเชียร์โดยไม่ต้องดาวน์โหลดแอป",
          "ใช้งานฟรีตลอดชีพ ไม่มีค่าธรรมเนียมรายเดือนมากวนใจกำไรอาหารของคุณ",
          "ปุ่มกระตุ้นการรีวิว 5 ดาวบน Google Maps ติดตั้งอยู่ท้ายเมนูอาหาร",
        ],
        features: [
          "ป้าย QR อะคริลิกตั้งโต๊ะ",
          "เมนูรูปภาพ 2 คอลัมน์",
          "0% ค่าคอมมิชชันสั่งทางแชต",
          "ปุ่มกระตุ้นรีวิว Google 5 ดาว",
        ],
      },
      {
        id: "consultant",
        title: "ที่ปรึกษา แพทย์ & ผู้เชี่ยวชาญ",
        icon: Users,
        tagline: "ปรึกษาส่วนตัว, ตรวจพอร์ตผลงาน และเซสชัน 1 ต่อ 1",
        templateLink: "drhendra.etalase.online",
        beforeProblems: [
          "เสียเวลาหลายชั่วโมงในการส่งข้อความสอบถามวันเวลาว่างไปมา",
          "ลูกค้าลืมนัดหมายหรือขอยกเลิกนัดกะทันหันในนาทีสุดท้าย",
          "วุ่นวายกับการตรวจสลิปโอนเงินและส่งลิงก์ห้องประชุม Google Meet ทีละคน",
          "ขาดภาพลักษณ์ระดับมืออาชีพเมื่อต้องนำเสนอบริการราคาสูง",
        ],
        afterSolutions: [
          "ปฏิทินจองเวลาแบบเรียลไทม์: ลูกค้าเลือกวันและเวลาที่ว่างได้ด้วยตนเอง",
          "ระบบบังคับชำระเงินล่วงหน้าผ่าน QR เพื่อยืนยันการจองคิวจริง",
          "ลิงก์ Google Meet และใบเสร็จรับเงินจัดส่งถึง WhatsApp ลูกค้าโดยอัตโนมัติ",
          "ระบบส่งข้อความเตือนล่วงหน้า 1 วันทาง WhatsApp ลดปัญหาการไม่มาตามนัด",
        ],
        features: [
          "ปฏิทินจองเวลาเรียลไทม์",
          "ส่งลิงก์ห้องประชุมอัตโนมัติ",
          "แจ้งเตือนล่วงหน้า 1 วัน",
          "ระบบชำระเงินล่วงหน้า",
        ],
      },
      {
        id: "rental",
        title: "บริการเช่ารถ กล้อง & สตูดิโอ",
        icon: Compass,
        tagline: "เช่าอุปกรณ์ถ่ายภาพ, เช่ารถขับเอง และจองสตูดิโอถ่ายทำ",
        templateLink: "bastianmobil.etalase.online",
        beforeProblems: [
          "ลูกค้าทักมาสอบถามรายการสินค้าหรือรถที่ติดคิวเช่าของคนอื่นอยู่แล้ว",
          "ต้องคอยพิมพ์เงื่อนไขการเช่า (บัตรประชาชน, ใบขับขี่, เงินมัดจำ) ซ้ำๆ ในแชต",
          "ราคาเช่า 12 ชม. vs 24 ชม. ดูสับสนเมื่อโพสต์ลงบนโซเชียลมีเดีย",
          "ยากที่จะจัดเก็บข้อมูลการจองและหลักฐานของผู้เช่าอย่างเป็นระเบียบ",
        ],
        afterSolutions: [
          "แสดงสถานะความว่างของสินค้าชัดเจน พร้อมตัวเลือกราคาเช่ารายวันและรายสัปดาห์",
          "เงื่อนไขและข้อตกลงการเช่าระบุไว้อย่างชัดเจนบนหน้าร้านก่อนกดจอง",
          "แบบฟอร์มการจองสรุปวันเวลาและข้อมูลผู้เช่าส่งตรงสู่ WhatsApp แอดมิน",
          "ภาพลักษณ์ระดับมืออาชีพช่วยสร้างความไว้วางใจในการเช่าอุปกรณ์ราคาสูง",
        ],
        features: [
          "เลือกระยะเวลาการเช่าได้",
          "เงื่อนไขการเช่าในตัว",
          "ใบสรุปออเดอร์ในแชต",
          "รองรับแอดมินหลายคน",
        ],
      },
    ],
  },
  vi: {
    badge: "Giải Pháp Đo Ni Đóng Giày Theo Ngành Hàng",
    h1: "Được Thiết Kế Cho Cách Bạn Bán Hàng Tại Đông Nam Á.",
    subtitle:
      "Không đơn thuần là công cụ gom link thông thường. etalase.online giải quyết rào cản chuyển đổi thực tế: từ tự động gửi e-book qua WhatsApp đến tính toán trả góp ô tô.",
    sidebarHeader: "Chọn Ngành Nghề Của Bạn",
    beforeHeader: "Trước khi dùng etalase.online",
    afterHeader: "Với etalase.online",
    featuresHeader: "Tính Năng Chuyên Sâu Tích Hợp:",
    ctaPrefix: "Tạo Storefront Cho",
    ctaSecondary: "Xem Các Mẫu Giao Diện →",
    industries: [
      {
        id: "creator",
        title: "Nhà Sáng Tạo & Bán Sản Phẩm Số",
        icon: Sparkles,
        tagline: "E-Book, Preset Lightroom, Template Canva & Khóa Học Video",
        templateLink: "rafa.etalase.online",
        beforeProblems: [
          "Gửi link tải tài liệu thủ công từng người một sau khi khách chuyển khoản",
          "Nguy cơ cao bị sao chép nội dung số và chia sẻ link trái phép",
          "Các sàn kỹ thuật số quốc tế trừ phí hoa hồng lên tới 10–20% mỗi đơn hàng",
          "Khách hàng ngần ngại mua vì bio link dạng chữ đơn điệu thiếu hình ảnh xem trước",
        ],
        afterSolutions: [
          "Hệ thống tự động gửi hóa đơn & link tải tài liệu vào WhatsApp khách sau 2 giây",
          "Đóng dấu bản quyền PDF động in tên & số điện thoại người mua trên từng trang",
          "0% hoa hồng đơn chat & phí thanh toán QR ưu đãi từ 2% (người mua chi trả được)",
          "Giao diện chuẩn Warm Editorial tối ưu di động nâng tầm uy tín thương hiệu",
        ],
        features: [
          "Gửi File Tự Động Qua WA",
          "Bản Quyền PDF Động",
          "Thanh Toán QR Tức Thì",
          "Tên Miền Riêng (.com)",
        ],
      },
      {
        id: "affiliate",
        title: "Tiếp Thị Liên Kết TikTok & Shopee",
        icon: ShoppingBag,
        tagline: "Gom Link Đề Xuất Giỏ Vàng TikTok Shop & Shopee Mall",
        templateLink: "aisyahlook.etalase.online",
        beforeProblems: [
          "Link tiếp thị liên kết bị thuật toán quét hoặc bóp tương tác trên bio mạng xã hội",
          "Chỉ được gắn 1 link duy nhất trong khi có hàng trăm sản phẩm cần giới thiệu",
          "Trang gom link cũ tải chậm và đầy các nút bấm thô sơ kém hấp dẫn",
          "Không có số liệu chi tiết để biết sản phẩm nào mang lại nhiều lượt nhấp nhất",
        ],
        afterSolutions: [
          "Tên miền phụ riêng biệt an toàn trước thuật toán quét link của TikTok và IG",
          "Danh mục hình ảnh sắc nét được phân chia theo từng danh mục (Thời trang, Mỹ phẩm)",
          "Deep link mở thẳng ứng dụng mua sắm trên điện thoại kèm mã tiếp thị của bạn",
          "Theo dõi số lượt nhấp chuột theo từng sản phẩm để tập trung quảng bá sản phẩm hot",
        ],
        features: [
          "Deep-Link Mở Ứng Dụng",
          "Phân Nhóm Danh Mục Đa Tầng",
          "An Toàn Thuật Toán",
          "Tích Hợp Meta Pixel Máy Chủ",
        ],
      },
      {
        id: "sales",
        title: "Tư Vấn Bán Ô Tô, Xe Máy & Bất Động Sản",
        icon: Car,
        tagline: "Showroom Xe Mới/Lướt, Môi Giới Bất Động Sản & Tư Vấn Dự Án",
        templateLink: "bastianmobil.etalase.online",
        beforeProblems: [
          "Gửi các file catalog PDF nặng hàng trăm MB làm đơ máy điện thoại của khách",
          "Khách hàng lúng túng khi tự tính toán số tiền trả trước và lịch trả góp hàng tháng",
          "Khách nhắn tin qua WhatsApp nhưng không nói rõ đang quan tâm phiên bản xe nào",
          "Bài đăng bán hàng trên mạng xã hội bị trôi và rất khó cập nhật giá",
        ],
        afterSolutions: [
          "Showroom trực tuyến trên di động tải cực nhanh kèm thư viện ảnh sắc nét",
          "Công cụ ước tính tiền trả trước và bảng tính trả góp ngay dưới từng mẫu xe",
          "Nút 'Tư Vấn Xe' tự động điền sẵn tên xe và thông số vào tin nhắn chat",
          "Cập nhật tình trạng xe và giá bán bất cứ lúc nào ngay từ điện thoại của bạn",
        ],
        features: [
          "Tính Tiền Trả Trước Tự Động",
          "Thẻ Thông Số Chi Tiết",
          "Soạn Sẵn Tin Nhắn Đặt Xe",
          "Thư Viện Ảnh HD Di Động",
        ],
      },
      {
        id: "cafe",
        title: "Quán Cafe, Nhà Hàng & Ẩm Thực",
        icon: Coffee,
        tagline: "Thực Đơn Hình Ảnh Quét Mã QR Tại Bàn & Đặt Món Trực Tiếp",
        templateLink: "kopisenja.etalase.online",
        beforeProblems: [
          "Menu in giấy dễ rách, bẩn và tốn kém chi phí in lại mỗi lần điều chỉnh giá món",
          "Khách hàng phải đứng xếp hàng dài ở quầy chỉ để đọc thực đơn",
          "Các phần mềm gọi món tại bàn thu phí thuê bao hàng triệu đồng mỗi năm",
          "Khó khăn trong việc xin đánh giá 5 sao Google Maps từ thực khách dùng bữa",
        ],
        afterSolutions: [
          "Biển mica quét mã QR để bàn sắc nét mở ngay thực đơn hình ảnh trực quan",
          "Khách gọi món trực tiếp từ bàn gửi về WhatsApp quầy thu ngân không cần cài app",
          "Miễn phí trọn đời không phát sinh phí duy trì hàng tháng bào mòn lợi nhuận",
          "Tích hợp nút kêu gọi đánh giá 5 sao Google Maps ở cuối danh mục thực đơn",
        ],
        features: [
          "Biển QR Mica Để Bàn",
          "Menu Hình Ảnh 2 Cột",
          "0% Phí Đơn Chat WhatsApp",
          "Nút Kêu Gọi Đánh Giá Google",
        ],
      },
      {
        id: "consultant",
        title: "Chuyên Gia, Bác Sĩ & Cố Vấn",
        icon: Users,
        tagline: "Cố Vấn Riêng, Đánh Giá Dự Án & Buổi Tư Vấn 1-kèm-1",
        templateLink: "drhendra.etalase.online",
        beforeProblems: [
          "Mất hàng giờ trao đổi qua lại để thống nhất lịch hẹn còn trống",
          "Khách hàng hay quên lịch hoặc hủy lịch đột ngột vào phút chót",
          "Bất tiện khi phải đối soát hóa đơn chuyển khoản và gửi link phòng họp thủ công",
          "Thiếu hình ảnh chuyên nghiệp khi chào bán các gói dịch vụ giá trị cao",
        ],
        afterSolutions: [
          "Lịch đặt chỗ thời gian thực: khách hàng chủ động chọn ngày và giờ còn trống",
          "Bắt buộc thanh toán trước qua QR để đảm bảo cam kết tham gia của khách hàng",
          "Link Google Meet và hóa đơn xác nhận được gửi tự động tới WhatsApp người đặt",
          "Tin nhắn nhắc hẹn tự động trước 24 giờ qua WhatsApp hạn chế tối đa việc vắng mặt",
        ],
        features: [
          "Lịch Đặt Hẹn Thời Gian Thực",
          "Tự Động Gửi Link Google Meet",
          "Nhắc Hẹn 24h Qua WhatsApp",
          "Bắt Buộc Thanh Toán Trước",
        ],
      },
      {
        id: "rental",
        title: "Cho Thuê Xe, Thiết Bị & Studio",
        icon: Compass,
        tagline: "Thuê Thiết Bị Máy Ảnh, Thuê Xe Tự Lái & Đặt Phòng Studio",
        templateLink: "bastianmobil.etalase.online",
        beforeProblems: [
          "Khách liên tục hỏi thuê những dòng máy hoặc xe đang có người khác thuê",
          "Phải gõ đi gõ lại các điều khoản đặt cọc và quy định giấy tờ trong chat",
          "Mức giá thuê 12 giờ vs 24 giờ dễ gây nhầm lẫn trên các bài đăng mạng xã hội",
          "Khó lưu trữ ngăn nắp thông tin người thuê và ngày trả đồ",
        ],
        afterSolutions: [
          "Tình trạng còn trống hiển thị rõ ràng kèm đơn giá thuê theo ngày hoặc tuần",
          "Quy định và điều khoản cho thuê hiển thị minh bạch trước khi khách gửi yêu cầu",
          "Form đặt thuê tự động tổng hợp ngày giờ và thông tin người thuê gửi về WhatsApp",
          "Giao diện chuẩn chỉ nâng cao uy tín cho các giao dịch thuê tài sản giá trị",
        ],
        features: [
          "Linh Hoạt Thời Gian Thuê",
          "Điều Khoản Thuê Đi Kèm",
          "Đơn Đặt Hàng Soạn Sẵn",
          "Hỗ Trợ Nhiều Quản Trị Viên",
        ],
      },
    ],
  },
};

export function SolusiClient({ locale }: { locale: SupportedLocale }) {
  const currentLocaleData = SOLUSI_DATA[locale] || SOLUSI_DATA.id;
  const industries = currentLocaleData.industries;

  const [selectedIndustry, setSelectedIndustry] = useState<string>("creator");
  const current = industries.find((i) => i.id === selectedIndustry) || industries[0];

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />

      <section className="pt-16 pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentLocaleData.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            {currentLocaleData.h1}
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {currentLocaleData.subtitle}
          </p>
        </ScrollReveal>
      </section>

      <section className="pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Industri */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] px-2 mb-2">
              {currentLocaleData.sidebarHeader}
            </div>
            {industries.map((ind) => {
              const Icon = ind.icon;
              const isSelected = selectedIndustry === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#D94E28] shadow-sm text-[#1C1917] ring-1 ring-[#D94E28]/15"
                      : "bg-white/60 hover:bg-white border-[#E7E5E4] text-[#57534E]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#FDF0EC] text-[#D94E28]"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#1C1917]">{ind.title}</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "text-[#D94E28] translate-x-1" : "text-stone-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Panel Komparasi: Masalah vs Solusi */}
          <div className="lg:col-span-8 bg-white border border-[#E7E5E4] rounded-3xl p-7 sm:p-10 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#E7E5E4]">
              <div>
                <h2 className="text-2xl font-bold text-[#1C1917]">{current.title}</h2>
                <p className="text-xs sm:text-sm text-[#57534E] mt-0.5">{current.tagline}</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#E7E5E4] px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-[#D94E28]">
                <span>https://{current.templateLink}</span>
              </div>
            </div>

            {/* Grid Komparasi: Masalah vs Solusi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom Masalah (Sebelum) */}
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider">
                  <XCircle className="w-4 h-4" />
                  <span>{currentLocaleData.beforeHeader}</span>
                </div>
                <div className="space-y-3">
                  {current.beforeProblems.map((prob, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-red-950/80 leading-relaxed">
                      <span className="text-red-400 font-bold shrink-0">&times;</span>
                      <span>{prob}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kolom Solusi (Dengan etalase.online) */}
              <div className="bg-[#FDF0EC]/60 border border-[#FADCD3] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#D94E28] font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{currentLocaleData.afterHeader}</span>
                </div>
                <div className="space-y-3">
                  {current.afterSolutions.map((sol, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1C1917] leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D94E28] shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Tags */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
                {currentLocaleData.featuresHeader}
              </span>
              <div className="flex flex-wrap gap-2">
                {current.features.map((f, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold bg-[#FAF8F5] border border-[#E7E5E4] text-[#1C1917] px-3 py-1 rounded-lg"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href={getLocalizedHref("/register")}
                className="w-full sm:w-auto bg-[#D94E28] hover:bg-[#B83E1D] text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2"
              >
                <span>{currentLocaleData.ctaPrefix} {current.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={getLocalizedHref("/template")}
                className="text-xs font-semibold text-[#57534E] hover:text-[#1C1917]"
              >
                {currentLocaleData.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
