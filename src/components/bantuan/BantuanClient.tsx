"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { OfficialSocialLinks } from "@/components/saas/OfficialSocialLinks";
import {
  Search,
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Globe,
  MessageCircle,
  Mail,
  X,
  RotateCcw,
} from "lucide-react";
import {
  OFFICIAL_WHATSAPP_GROUP_URL,
  SupportedLocale,
} from "@/lib/config/constants";

type CategoryKey = "start" | "payment" | "automation" | "domain";

interface FaqItem {
  id: string;
  category: CategoryKey;
  q: string;
  tag: string;
  a: string;
}

interface CategoryItem {
  key: CategoryKey;
  title: string;
  desc: string;
}

interface BantuanTranslation {
  badge: string;
  h1: string;
  subtitle: string;
  searchPlaceholder: string;
  quickKeywords: string[];
  allCategoriesLabel: string;
  showingLabel: (shown: number, total: number) => string;
  expandAllLabel: string;
  collapseAllLabel: string;
  resetLabel: string;
  categories: [CategoryItem, CategoryItem, CategoryItem, CategoryItem];
  faqSectionBadge: string;
  faqSectionTitle: string;
  faqs: FaqItem[];
  noResult: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaWaGroupLabel: string;
  ctaBtn: string;
}

export const BANTUAN_TRANSLATIONS: Record<SupportedLocale, BantuanTranslation> = {
  id: {
    badge: "Pusat Bantuan & Knowledgebase",
    h1: "Ada yang Bisa Kami Bantu?",
    subtitle:
      "Cari jawaban lengkap untuk calon tenant maupun pemilik toko aktif—mulai dari klaim subdomain, biaya QRIS, pencairan saldo, hingga custom domain & pixel iklan.",
    searchPlaceholder: "Ketik kata kunci (misal: fee qris, pencairan, domain, subdomain, pixel, dfy)...",
    quickKeywords: ["Fee QRIS", "Pencairan Saldo", "Paket Gratis", "Custom Domain", "WhatsApp", "Pixel & GA4", "Refund"],
    allCategoriesLabel: "Semua Topik",
    showingLabel: (shown, total) => `Menampilkan ${shown} dari ${total} pertanyaan`,
    expandAllLabel: "Buka Semua",
    collapseAllLabel: "Tutup Semua",
    resetLabel: "Reset Filter",
    categories: [
      {
        key: "start",
        title: "Memulai, Akun & Paket",
        desc: "Klaim subdomain, izin Google, perbedaan Free vs PRO vs Terima Beres (DFY), dan refund.",
      },
      {
        key: "payment",
        title: "Pembayaran, QRIS & Pencairan",
        desc: "Order WhatsApp 0%, biaya QRIS 4,5% vs 2%, Convenience Fee, minimum payout Rp 50.000 & keamanan.",
      },
      {
        key: "automation",
        title: "Produk, Kafe, Showroom & WA",
        desc: "Auto-delivery file ke WhatsApp, Watermark PDF, buku menu kafe QR, dan katalog showroom.",
      },
      {
        key: "domain",
        title: "Custom Domain, Tema & Pixel",
        desc: "Sambungkan domain pribadi + SSL gratis, Meta/TikTok Pixel, GA4, notifikasi Telegram & CS.",
      },
    ],
    faqSectionBadge: "Pertanyaan Lengkap Calon Tenant & Pemilik Toko",
    faqSectionTitle: "FAQ Pusat Bantuan",
    faqs: [
      {
        id: "id-1",
        category: "start",
        q: "Apakah etalase.online benar-benar gratis selamanya, dan apa saja batas paket Gratis vs PRO?",
        tag: "PAKET",
        a: "Ya. Paket Gratis berlaku selamanya tanpa masa percobaan (trial). Anda mendapat 1 subdomain mandiri (namamu.etalase.online), kapasitas produk & tautan tanpa batas (Unlimited), 0% komisi order chat WhatsApp, akses ke 1 template dasar (Clean Minimal), fitur Convenience Fee, dan checkout QRIS instan dengan biaya 4,5% (min. transaksi Rp 15.000) serta penarikan saldo Rp 5.000/tarik (min. Rp 50.000). Paket PRO (Rp 49.000/bulan atau Rp 39.000/bulan jika ditagih tahunan Rp 468.000) membuka 14 variasi template dalam 4 arketipe desain, custom domain pribadi + SSL gratis, penghapusan watermark bawah, diskon fee QRIS menjadi 2% (min. transaksi Rp 25.000), gratis biaya pencairan 4x/bulan (selanjutnya Rp 2.500), Meta Pixel (CAPI), TikTok Pixel, GA4, dan Content Blocks.",
      },
      {
        id: "id-2",
        category: "start",
        q: "Apa aturan memilih nama subdomain, dan data apa saja yang diakses saat daftar via Google?",
        tag: "AKUN & SUBDOMAIN",
        a: "Subdomain etalase Anda harus terdiri dari 3–30 karakter menggunakan huruf kecil (a–z), angka (0–9), atau satu tanda hubung (-) tunggal—tidak diawali/diakhiri tanda hubung, tanpa tanda hubung ganda (--), dan tidak memakai kata cadangan sistem seperti admin, api, login, www, bantuan, atau mail. Saat mendaftar via Google OAuth, kami hanya membaca nama dan alamat email Anda untuk membuat akun pemilik toko—tanpa meminta kata sandi baru atau akses file Drive/Gmail Anda.",
      },
      {
        id: "id-3",
        category: "start",
        q: "Apa perbedaan Paket PRO dengan layanan Terima Beres (DFY) Rp 899.000?",
        tag: "TERIMA BERES",
        a: "Paket PRO cocok jika Anda ingin mengatur katalog sendiri secara fleksibel dari HP/laptop. Sementara layanan Terima Beres / Done-For-You (DFY) seharga Rp 899.000 (sekali bayar) ditujukan bagi pebisnis yang ingin toko langsung siap jualan dalam 24 jam kerja: sudah termasuk langganan PRO 1 tahun penuh (senilai Rp 468.000), tim kami bantu input awal hingga 25 produk pertama (kapasitas toko tetap Unlimited), copywriting bio, banner toko, desain standee QR kasir, pengaturan domain, dan sesi konsultasi 1-on-1.",
      },
      {
        id: "id-4",
        category: "start",
        q: "Apakah bisa berhenti berlangganan PRO kapan saja, dan bagaimana kebijakan refund?",
        tag: "LANGGANAN",
        a: "Ya, paket PRO tidak memiliki kontrak mengikat dan bisa dihentikan kapan saja sebelum siklus tagihan berikutnya. Jika masa PRO berakhir, toko Anda aman kembali ke Paket Gratis tanpa menghapus data produk, tautan, maupun riwayat order (hanya fitur khusus PRO seperti custom domain & template tambahan yang dinonaktifkan sementara). Kami juga memberikan jaminan pengembalian dana penuh dalam 7 hari pertama untuk langganan PRO baru selama fitur PRO belum dikonfigurasi signifikan, sesuai halaman /refund.",
      },
      {
        id: "id-5",
        category: "payment",
        q: "Berapa komisi order WhatsApp vs biaya transaksi QRIS Instan?",
        tag: "BIAYA & FEE",
        a: "Seluruh pesanan yang masuk lewat tombol chat WhatsApp (Chat Order) dikenakan 0% komisi alias Rp 0 di semua paket—pembeli langsung chat ke WhatsApp Anda dengan draf pesan berisi nama produk. Khusus pembayaran otomatis via QRIS Instan (BorderPay), berlaku biaya layanan transparan: 4,5% (min. transaksi Rp 15.000) di Paket Gratis, atau 2% (min. transaksi Rp 25.000) di Paket PRO & DFY.",
      },
      {
        id: "id-6",
        category: "payment",
        q: "Bagaimana cara kerja opsi Convenience Fee (biaya QRIS ditanggung pembeli)?",
        tag: "PEMBAYARAN",
        a: "Di menu Pengaturan Pembayaran admin toko (tersedia baik di Paket Gratis maupun PRO), Anda bisa memilih apakah biaya QRIS ditanggung oleh Toko atau Pembeli (Convenience Fee). Jika memilih ditanggung Pembeli, sistem otomatis menambahkan biaya transaksi pada tagihan checkout pembeli (misal belanja Rp 50.000 + fee 2% = Rp 51.000), sehingga saldo hasil penjualan Anda masuk utuh sesuai harga barang.",
      },
      {
        id: "id-7",
        category: "payment",
        q: "Kapan uang hasil QRIS bisa dicairkan (payout), berapa minimumnya, dan ke bank mana saja?",
        tag: "PENCAIRAN",
        a: "Begitu transaksi QRIS berstatus Lunas (Paid), dana langsung masuk ke Saldo Dompet Toko Anda secara real-time. Pengajuan pencairan (payout) bisa dilakukan kapan saja selama memenuhi minimum penarikan Rp 50.000 ke rekening bank lokal di Indonesia (BCA, Mandiri, BRI, BNI, BSI, dll.). Dana diproses maksimal 1×24 jam pada hari kerja. Paket PRO/DFY mendapat gratis biaya pencairan 4x per bulan (selanjutnya Rp 2.500/penarikan), sedangkan Paket Gratis dikenakan biaya admin Rp 5.000/penarikan.",
      },
      {
        id: "id-8",
        category: "payment",
        q: "Bagaimana keamanan dana transaksi QRIS & perlindungan terhadap penipuan?",
        tag: "KEAMANAN",
        a: "Pembayaran QRIS diproses melalui mitra Payment Gateway berizin Penyelenggara Jasa Pembayaran (PJP) Bank Indonesia. Setiap pembaruan status pembayaran diverifikasi memakai signature webhook kriptografis sebelum produk digital dikirim atau saldo ditambahkan. Seluruh koneksi dilindungi HTTPS/TLS, dan pencairan dana hanya dikirim ke rekening bank terverifikasi milik pemilik toko.",
      },
      {
        id: "id-9",
        category: "automation",
        q: "Jenis produk apa saja yang bisa dijual di etalase.online? Apakah hanya untuk produk digital?",
        tag: "PRODUK",
        a: "Tidak hanya produk digital. Anda dapat menambahkan 6 tipe item sekaligus dalam satu toko: (1) Produk Digital (e-book, preset, template, software), (2) Produk Fisik UMKM & kuliner, (3) Video Kursus / Member Area, (4) Jadwal Konsultasi / Mentoring 1-on-1, (5) Event & Tiket Webinar, (6) Tautan Rekomendasi Affiliate (Keranjang Kuning TikTok Shop, Shopee, Tokopedia, Lazada), serta halaman Dukungan/Tip.",
      },
      {
        id: "id-10",
        category: "automation",
        q: "Bagaimana cara kerja pengiriman file otomatis dan Watermark PDF anti-bajak?",
        tag: "OTOMASI",
        a: "Saat mengunggah Produk Digital, Anda dapat melampirkan file PDF/aset atau tautan akses. Begitu pembeli membayar lewat QRIS Instan dan status berubah lunas, sistem otomatis menerbitkan invoice dan link unduhan ke WhatsApp/halaman konfirmasi pembeli dalam hitungan detik. Untuk file PDF, fitur Dynamic Watermarking dapat mencetak nama dan nomor WhatsApp pembeli di setiap halaman PDF untuk meminimalkan penyebaran ilegal.",
      },
      {
        id: "id-11",
        category: "automation",
        q: "Apakah cocok untuk cafe/resto, UMKM, atau sales showroom mobil dan properti?",
        tag: "INDUSTRI",
        a: "Sangat cocok. Tersedia arketipe Visual Menu Grid khusus cafe/kuliner (tampilan foto menu 2 kolom, QR meja kasir, dan order ke WhatsApp kasir 0% komisi), serta arketipe Showroom Pro khusus sales mobil, motor, atau agen properti yang mendukung label DP (contoh: 'Mulai DP 15 Jt'), chip spesifikasi unit, dan tombol 'Tanya Unit' yang otomatis menyisipkan nama kendaraan/properti di pesan WhatsApp.",
      },
      {
        id: "id-12",
        category: "domain",
        q: "Bagaimana cara menyambungkan domain sendiri (misal tokosaya.com) dan mengaktifkan SSL?",
        tag: "CUSTOM DOMAIN",
        a: "Di Paket PRO/DFY, buka Dashboard Admin > Settings > Custom Domain, ketik nama domain pribadi Anda (.com, .id, .my, .shop, dll.), lalu tambahkan A Record / CNAME DNS sesuai panduan di panel domain Anda (Niagahoster, Rumahweb, Cloudflare, Namecheap, dll.). Setelah propagasi DNS terverifikasi, sertifikat SSL HTTPS aktif otomatis agar toko tampil 100% atas nama brand Anda sendiri.",
      },
      {
        id: "id-13",
        category: "domain",
        q: "Bagaimana cara pasang Meta Pixel, TikTok Pixel, GA4, serta notifikasi order ke Telegram?",
        tag: "PIXEL & INTEGRASI",
        a: "Masuk ke Dashboard Admin > Analytics & Pixel (khusus PRO/DFY) untuk memasukkan ID Meta Pixel (+ optional CAPI Access Token), TikTok Pixel ID, dan Google Analytics 4 (GA4 Measurement ID) agar event view item, checkout, dan purchase terekam akurat. Untuk notifikasi instan ke HP pemilik toko, buka Settings > Integrations dan klik Connect Telegram (1-Click) dengan bot resmi @etalaseonline_bot atau gunakan token bot milik Anda sendiri.",
      },
      {
        id: "id-14",
        category: "domain",
        q: "Bagaimana cara menghubungi Customer Support jika mengalami kendala teknis atau transaksi?",
        tag: "DUKUNGAN CS",
        a: "Anda dapat langsung bergabung ke Grup WhatsApp Support Resmi etalase.online melalui tombol hijau di bawah halaman ini, mengirim email ke support@etalase.online (atau halo@etalase.online / billing@etalase.online), atau menghubungi CS Rani melalui bot Telegram @etalaseonline_bot. Jam operasional tim support: Senin–Sabtu 08:00–21:00 WIB dan Minggu/Hari Libur 09:00–17:00 WIB.",
      },
    ],
    noResult: "Tidak ada pertanyaan yang cocok dengan kata kunci atau kategori ini.",
    ctaTitle: "Masih belum menemukan jawaban yang Anda cari?",
    ctaDesc:
      "Tim support resmi PT Rafa Kreasindo Teknologi siap membantu melalui Grup WhatsApp Support, Email Resmi, atau Bot Telegram.",
    ctaWaGroupLabel: "Gabung Grup WhatsApp Support",
    ctaBtn: "Buka Halaman Kontak",
  },
  en: {
    badge: "Help Center & Knowledgebase",
    h1: "How Can We Help You Today?",
    subtitle:
      "Find complete answers for new and existing storefront owners—covering subdomain rules, QRIS fees, bank payouts, custom domains, and ad pixels.",
    searchPlaceholder: "Search help topics (e.g. qris fee, payout, domain, pixel, refund, whatsapp)...",
    quickKeywords: ["QRIS Fee", "Payout", "Free Plan", "Custom Domain", "WhatsApp", "Pixel & GA4", "Refund"],
    allCategoriesLabel: "All Topics",
    showingLabel: (shown, total) => `Showing ${shown} of ${total} questions`,
    expandAllLabel: "Expand All",
    collapseAllLabel: "Collapse All",
    resetLabel: "Reset Filter",
    categories: [
      {
        key: "start",
        title: "Getting Started & Plans",
        desc: "Subdomain rules, Google permissions, Free vs PRO vs Done-For-You (DFY), and cancellation.",
      },
      {
        key: "payment",
        title: "Payments, QRIS & Payouts",
        desc: "0% WhatsApp orders, 4.5% vs 2% QRIS fee, Convenience Fee option, min Rp 50k payout & security.",
      },
      {
        key: "automation",
        title: "Products, Delivery & WhatsApp",
        desc: "Automated file delivery, PDF Watermark, visual cafe menus, and showroom unit catalogs.",
      },
      {
        key: "domain",
        title: "Domains, Branding & Pixels",
        desc: "Custom apex domains with free SSL, Meta/TikTok Pixel, GA4, Telegram alerts & support.",
      },
    ],
    faqSectionBadge: "Complete Tenant & Buyer Guide",
    faqSectionTitle: "Frequently Asked Questions",
    faqs: [
      {
        id: "en-1",
        category: "start",
        q: "Is etalase.online genuinely free forever, and what are Free vs PRO limits?",
        tag: "PLANS",
        a: "Yes. Free tier has no trial expiry and includes 1 .etalase.online subdomain, Unlimited products & links, 0% WhatsApp chat order commission, 1 core template (Clean Minimal), Buyer Convenience Fee option, and instant QRIS at 4.5% (min Rp 15,000) with Rp 5,000/payout (min Rp 50,000). PRO (Rp 49,000/mo or Rp 39,000/mo billed yearly Rp 468,000) unlocks all 14 template variations across 4 archetypes, custom domain + free SSL, watermark removal, 2% QRIS fees (min Rp 25,000), 4x free payouts/mo (then Rp 2,500), Meta Pixel (CAPI), TikTok Pixel, GA4, and Content Blocks.",
      },
      {
        id: "en-2",
        category: "start",
        q: "What are the subdomain format rules and what Google account permissions are used?",
        tag: "ACCOUNT",
        a: "Subdomains must be 3–30 characters using lowercase letters (a–z), numbers (0–9), and single hyphens (-), without reserved words like admin, api, login, www, bantuan, or mail. When continuing with Google, we only read your name and email address to create your store account.",
      },
      {
        id: "en-3",
        category: "start",
        q: "Can I cancel PRO anytime, and do you offer refunds?",
        tag: "BILLING",
        a: "Yes, PRO has zero lock-in contracts and can be cancelled anytime before renewal. Your store and products remain active on the Free tier without data deletion. New PRO subscriptions are covered by a 7-day refund policy if PRO features haven't been actively used yet (see /refund).",
      },
      {
        id: "en-4",
        category: "payment",
        q: "What are the fees for WhatsApp orders vs instant QRIS checkouts?",
        tag: "FEES",
        a: "Direct WhatsApp chat orders carry 0% commission across all plans. Automated instant QRIS checkouts carry a 4.5% fee (min transaction Rp 15,000) on Free and 2% (min transaction Rp 25,000) on PRO & DFY. You can also toggle Convenience Fee so buyers cover the processing fee.",
      },
      {
        id: "en-5",
        category: "payment",
        q: "When can QRIS funds be withdrawn, what is the minimum payout, and how is security ensured?",
        tag: "PAYOUTS",
        a: "Settled QRIS funds credit immediately to your Wallet Balance. You can request a bank transfer once your balance reaches Rp 50,000 (settled within 1 working day / max 24h). PRO gets 4 free payouts/month (Rp 2,500 afterward), Free is Rp 5,000/payout. All QRIS checkouts run via Bank Indonesia-licensed PJP gateway partners with HTTPS/TLS and cryptographic webhook verification.",
      },
      {
        id: "en-6",
        category: "automation",
        q: "What types of items can I sell besides digital files?",
        tag: "PRODUCTS",
        a: "You can mix Digital Products (auto-delivered with dynamic PDF watermark), Physical SME items, Cafe/Restaurant visual menus, Automotive/Property unit listings (Showroom Pro with DP labels), 1-on-1 Calendar Bookings, Event Tickets, and External Affiliate Links (TikTok Shop, Shopee, Lazada).",
      },
      {
        id: "en-7",
        category: "domain",
        q: "How do I connect a custom domain, ad pixels (Meta, TikTok, GA4), and support?",
        tag: "DOMAIN & PIXEL",
        a: "On PRO/DFY, open Admin > Settings > Custom Domain to verify your DNS A/CNAME records for automatic free SSL, and visit Admin > Analytics & Pixel to enter Meta Pixel/CAPI, TikTok Pixel, and GA4 IDs. Reach support anytime via our official WhatsApp Support Group, Telegram @etalaseonline_bot, or support@etalase.online.",
      },
    ],
    noResult: "No help topics matched your search query or selected category.",
    ctaTitle: "Still haven't found what you need?",
    ctaDesc:
      "The official engineering and merchant support team at PT Rafa Kreasindo Teknologi is ready to assist via WhatsApp Group, Email, or Telegram.",
    ctaWaGroupLabel: "Join Official WhatsApp Support Group",
    ctaBtn: "Visit Contact Page",
  },
  ms: {
    badge: "Pusat Bantuan & Pangkalan Pengetahuan",
    h1: "Apa yang Boleh Kami Bantu?",
    subtitle:
      "Cari jawapan lengkap untuk pemilik kedai baharu dan sedia ada—subdomain, yuran QRIS, pengeluaran baki, domain kustom & piksel iklan.",
    searchPlaceholder: "Cari topik bantuan (contoh: yuran qris, pengeluaran, domain, piksel, whatsapp)...",
    quickKeywords: ["Yuran QRIS", "Pengeluaran", "Pelan Percuma", "Domain Kustom", "WhatsApp", "Piksel"],
    allCategoriesLabel: "Semua Topik",
    showingLabel: (shown, total) => `Memaparkan ${shown} daripada ${total} soalan`,
    expandAllLabel: "Buka Semua",
    collapseAllLabel: "Tutup Semua",
    resetLabel: "Set Semula",
    categories: [
      {
        key: "start",
        title: "Mula & Pelan Akaun",
        desc: "Peraturan subdomain, kebenaran Google, Free vs PRO vs DFY, dan pembatalan.",
      },
      {
        key: "payment",
        title: "Bayaran, QRIS & Pengeluaran",
        desc: "0% pesanan chat WA, yuran QRIS 4.5% vs 2%, Convenience Fee & min pengeluaran Rp 50rb.",
      },
      {
        key: "automation",
        title: "Produk & Automasi WA",
        desc: "Penghantaran fail automatik ke WhatsApp, tera air PDF, menu kafe & showroom.",
      },
      {
        key: "domain",
        title: "Domain, Tema & Piksel",
        desc: "Domain sendiri + SSL percuma, Meta/TikTok Pixel, GA4, notifikasi Telegram & sokongan.",
      },
    ],
    faqSectionBadge: "Panduan Lengkap Peniaga",
    faqSectionTitle: "Soalan Lazim (FAQ)",
    faqs: [
      {
        id: "ms-1",
        category: "start",
        q: "Adakah etalase.online percuma selamanya, dan apakah had pelan Percuma vs PRO?",
        tag: "PELAN",
        a: "Ya, Pelan Percuma tiada had tempoh dengan produk & pautan tanpa had (Unlimited), 0% komisen pesanan WhatsApp, 1 subdomain .etalase.online, dan 1 templat asas (Clean Minimal). Pelan PRO (Rp 49.000/bulan) membuka kesemua 14 variasi templat (4 arketip), domain sendiri + SSL, buang penjenamaan, QRIS 2% (min Rp 25.000), pengeluaran percuma 4x/bulan, Meta/TikTok Pixel & GA4.",
      },
      {
        id: "ms-2",
        category: "start",
        q: "Apakah peraturan subdomain dan kebenaran log masuk Google?",
        tag: "AKAUN",
        a: "Subdomain mestilah 3–30 aksara huruf kecil, nombor, atau satu tanda sempang tunggal (-), tanpa kata terhad sistem seperti admin, api, login, www, bantuan, atau mail. Log masuk Google hanya membaca nama dan e-mel anda.",
      },
      {
        id: "ms-3",
        category: "payment",
        q: "Berapakah caj pesanan WhatsApp berbanding QRIS, dan bagaimana pengeluaran baki?",
        tag: "KEWANGAN",
        a: "Pesanan WhatsApp adalah 0% komisen. Bayaran QRIS automatik ialah 4.5% (min Rp 15.000) untuk Percuma dan 2% (min Rp 25.000) untuk PRO, dengan pilihan Convenience Fee ditanggung pembeli. Pengeluaran minimum ialah Rp 50.000 diproses maks 1×24 jam hari bekerja (PRO percuma 4x/bln lalu Rp 2.500; Percuma Rp 5.000).",
      },
      {
        id: "ms-4",
        category: "automation",
        q: "Bagaimanakah penghantaran fail digital, menu kafe dan katalog kereta berfungsi?",
        tag: "AUTOMASI",
        a: "Selepas pembayaran QRIS disahkan, pautan fail digital beserta tera air PDF dinamik dihantar automatik. Untuk kedai fizikal, gunakan Visual Menu Grid (menu QR kafe) atau Showroom Pro (paparan DP & butang Tanya Unit ke WhatsApp).",
      },
      {
        id: "ms-5",
        category: "domain",
        q: "Bagaimanakah menyambungkan domain sendiri dan menghubungi sokongan?",
        tag: "DOMAIN & CS",
        a: "Pada PRO/DFY, tetapkan rekod DNS di Admin > Settings > Custom Domain untuk SSL automatik dan masukkan ID Meta/TikTok Pixel & GA4 di Analytics & Pixel. Hubungi kami di Kumpulan WhatsApp Sokongan, Telegram @etalaseonline_bot atau support@etalase.online.",
      },
    ],
    noResult: "Tiada topik bantuan sepadan dengan carian anda.",
    ctaTitle: "Masih belum menjumpai jawapan yang dicari?",
    ctaDesc:
      "Pasukan sokongan rasmi PT Rafa Kreasindo Teknologi sedia membantu melalui Kumpulan WhatsApp, E-mel atau Telegram.",
    ctaWaGroupLabel: "Sertai Kumpulan WhatsApp Sokongan",
    ctaBtn: "Halaman Hubungi Kami",
  },
  th: {
    badge: "ศูนย์ช่วยเหลือและฐานความรู้",
    h1: "มีอะไรให้เราช่วยคุณในวันนี้?",
    subtitle:
      "ค้นหาคำตอบครบถ้วนทั้งสำหรับผู้เริ่มต้นและร้านค้าที่เปิดใช้งานแล้ว—ซับโดเมน ค่าธรรมเนียม QRIS การถอนเงิน และโดเมนส่วนตัว",
    searchPlaceholder: "ค้นหาคำถาม (เช่น qris, ถอนเงิน, โดเมน, พิกเซล, whatsapp)...",
    quickKeywords: ["QRIS", "ถอนเงิน", "แพ็กเกจฟรี", "โดเมนส่วนตัว", "WhatsApp", "Pixel"],
    allCategoriesLabel: "ทุกหัวข้อ",
    showingLabel: (shown, total) => `แสดง ${shown} จาก ${total} คำถาม`,
    expandAllLabel: "เปิดทั้งหมด",
    collapseAllLabel: "ปิดทั้งหมด",
    resetLabel: "รีเซ็ต",
    categories: [
      {
        key: "start",
        title: "การเริ่มต้นและแพ็กเกจ",
        desc: "กฎซับโดเมน สิทธิ์ Google เปรียบเทียบ Free vs PRO vs DFY และการยกเลิก",
      },
      {
        key: "payment",
        title: "การเงิน QRIS และการถอนเงิน",
        desc: "ออเดอร์แชต 0% ค่าบริการ QRIS 4.5% vs 2% ถอนขั้นต่ำ Rp 50,000",
      },
      {
        key: "automation",
        title: "สินค้าและระบบ WhatsApp",
        desc: "ส่งไฟล์อัตโนมัติ ลายน้ำ PDF เมนูคาเฟ่ และแคตตาล็อกโชว์รูมรถ",
      },
      {
        key: "domain",
        title: "โดเมน พิกเซล และการติดต่อ",
        desc: "เชื่อมต่อโดเมน + SSL ฟรี Meta/TikTok Pixel GA4 และทีมช่วยเหลือ",
      },
    ],
    faqSectionBadge: "คู่มือฉบับสมบูรณ์",
    faqSectionTitle: "คำถามที่พบบ่อย (FAQ)",
    faqs: [
      {
        id: "th-1",
        category: "start",
        q: "แพ็กเกจฟรีมีข้อจำกัดอะไร และต่างจาก PRO อย่างไร?",
        tag: "แพ็กเกจ",
        a: "แพ็กเกจฟรีใช้งานได้ตลอดชีพ ลงสินค้าและลิงก์ไม่จำกัด คอมมิชชันออเดอร์ WhatsApp 0% ซับโดเมน .etalase.online และเทมเพลตพื้นฐาน 1 แบบ (Clean Minimal) ส่วนแพ็กเกจ PRO (Rp 49,000/เดือน) ปลดล็อก 14 เทมเพลต (4 รูปแบบ) โดเมนส่วนตัว + SSL ฟรี QRIS 2% (ขั้นต่ำ Rp 25,000) ถอนฟรี 4 ครั้ง/เดือน และ Meta/TikTok Pixel + GA4",
      },
      {
        id: "th-2",
        category: "payment",
        q: "ค่าธรรมเนียม QRIS และการถอนเงินเข้าบัญชีคิดอย่างไร?",
        tag: "การเงิน",
        a: "ออเดอร์ทางแชต 0% ส่วน QRIS อัตโนมัติคิด 4.5% (ขั้นต่ำ Rp 15,000) สำหรับฟรี และ 2% (ขั้นต่ำ Rp 25,000) สำหรับ PRO (ตั้งให้ผู้ซื้อช่วยจ่าย Convenience Fee ได้) ถอนเงินขั้นต่ำ Rp 50,000 โอนภายใน 1 วันทำการ",
      },
      {
        id: "th-3",
        category: "automation",
        q: "รองรับการขายสินค้าประเภทใดบ้างและส่งไฟล์อัตโนมัติอย่างไร?",
        tag: "ฟีเจอร์",
        a: "รองรับทั้งไฟล์ดิจิทัล (ส่งลิงก์อัตโนมัติพร้อมลายน้ำ PDF), สินค้าจริง, เมนูคาเฟ่ (Visual Menu Grid), แคตตาล็อกรถ/บ้าน (Showroom Pro), นัดหมาย 1 ต่อ 1 และลิงก์แอฟฟิลิเอต TikTok/Shopee",
      },
      {
        id: "th-4",
        category: "domain",
        q: "เชื่อมต่อโดเมนส่วนตัว พิกเซลโฆษณา และติดต่อทีมงานได้ทางไหน?",
        tag: "โดเมน & ซัพพอร์ต",
        a: "ตั้งค่า DNS ได้ที่ Admin > Settings > Custom Domain และกรอก Meta/TikTok Pixel & GA4 ที่ Analytics & Pixel หากต้องการความช่วยเหลือ ติดต่อผ่านกลุ่ม WhatsApp อย่างเป็นทางการ, Telegram @etalaseonline_bot หรือ support@etalase.online",
      },
    ],
    noResult: "ไม่พบคำถามที่ตรงกับการค้นหาของคุณ",
    ctaTitle: "ยังไม่พบคำตอบที่คุณต้องการใช่หรือไม่?",
    ctaDesc:
      "ทีมงานฝ่ายสนับสนุนของ PT Rafa Kreasindo Teknologi พร้อมช่วยเหลือผ่านกลุ่ม WhatsApp, อีเมล หรือ Telegram",
    ctaWaGroupLabel: "เข้าร่วมกลุ่ม WhatsApp ฝ่ายสนับสนุน",
    ctaBtn: "ไปที่หน้าติดต่อเรา",
  },
  vi: {
    badge: "Trung Tâm Trợ Giúp & Tri Thức",
    h1: "Chúng Tôi Có Thể Giúp Gì Cho Bạn?",
    subtitle:
      "Tìm câu trả lời đầy đủ cho người mới và chủ cửa hàng—tên miền phụ, phí QRIS, rút tiền, tên miền riêng và Pixel quảng cáo.",
    searchPlaceholder: "Tìm kiếm chủ đề (ví dụ: qris, rút tiền, tên miền, pixel, whatsapp)...",
    quickKeywords: ["Phí QRIS", "Rút Tiền", "Gói Miễn Phí", "Tên Miền Riêng", "WhatsApp", "Pixel"],
    allCategoriesLabel: "Tất Cả Chủ Đề",
    showingLabel: (shown, total) => `Hiển thị ${shown} / ${total} câu hỏi`,
    expandAllLabel: "Mở Tất Cả",
    collapseAllLabel: "Thu Gọn",
    resetLabel: "Đặt Lại",
    categories: [
      {
        key: "start",
        title: "Bắt Đầu & Gói Dịch Vụ",
        desc: "Quy tắc tên miền phụ, quyền Google, Gói Miễn phí vs PRO vs DFY & hủy gói.",
      },
      {
        key: "payment",
        title: "Thanh Toán, QRIS & Rút Tiền",
        desc: "Đơn WhatsApp 0%, phí QRIS 4.5% vs 2%, Convenience Fee & rút tối thiểu Rp 50.000.",
      },
      {
        key: "automation",
        title: "Sản Phẩm & Tự Động WhatsApp",
        desc: "Tự động giao file, đóng dấu PDF, thực đơn quán cafe & danh mục showroom.",
      },
      {
        key: "domain",
        title: "Tên Miền, Pixel & Hỗ Trợ",
        desc: "Gắn tên miền riêng + SSL miễn phí, Meta/TikTok Pixel, GA4 & kênh CSKH.",
      },
    ],
    faqSectionBadge: "Giải Đáp Chi Tiết",
    faqSectionTitle: "Các Câu Hỏi Thường Gặp",
    faqs: [
      {
        id: "vi-1",
        category: "start",
        q: "Gói Miễn Phí có giới hạn gì so với gói PRO?",
        tag: "GÓI DỊCH VỤ",
        a: "Gói Miễn Phí không giới hạn thời gian với số sản phẩm không giới hạn, 0% hoa hồng đơn chat WhatsApp, tên miền phụ .etalase.online và 1 giao diện cơ bản (Clean Minimal). Gói PRO (Rp 49.000/tháng) mở khóa 14 mẫu giao diện (4 phong cách), tên miền riêng + SSL miễn phí, phí QRIS 2% (tối thiểu Rp 25.000), miễn phí rút tiền 4 lần/tháng và Meta/TikTok Pixel + GA4.",
      },
      {
        id: "vi-2",
        category: "payment",
        q: "Phí giao dịch QRIS và quy định rút tiền tối thiểu như thế nào?",
        tag: "THANH TOÁN",
        a: "Đơn đặt qua chat WhatsApp là 0% phí. Thanh toán QR tự động thu 4,5% (tối thiểu Rp 15.000) trên gói Free và 2% (tối thiểu Rp 25.000) trên gói PRO (có tùy chọn để người mua trả phí). Rút tiền tối thiểu Rp 50.000 và xử lý trong tối đa 24 giờ ngày làm việc.",
      },
      {
        id: "vi-3",
        category: "automation",
        q: "Có thể bán những loại sản phẩm nào và cơ chế gửi file tự động?",
        tag: "SẢN PHẨM",
        a: "Hỗ trợ bán sản phẩm số (tự động gửi link tải + đóng dấu PDF chống sao chép), hàng hóa SME, thực đơn cafe (Visual Menu Grid), danh mục xe/BĐS (Showroom Pro), đặt lịch 1-1 và liên kết Affiliate.",
      },
      {
        id: "vi-4",
        category: "domain",
        q: "Cách gắn tên miền riêng, Pixel quảng cáo và liên hệ hỗ trợ?",
        tag: "HỖ TRỢ",
        a: "Cấu hình DNS tại Admin > Settings > Custom Domain để bật SSL miễn phí, và nhập Meta/TikTok Pixel & GA4 tại Analytics & Pixel. Liên hệ nhanh qua Nhóm Hỗ Trợ WhatsApp Chính Thức, Telegram @etalaseonline_bot hoặc support@etalase.online.",
      },
    ],
    noResult: "Không tìm thấy nội dung phù hợp với từ khóa của bạn.",
    ctaTitle: "Vẫn chưa tìm thấy thông tin bạn cần?",
    ctaDesc:
      "Đội ngũ hỗ trợ chính thức của PT Rafa Kreasindo Teknologi sẵn sàng trợ giúp qua Nhóm WhatsApp, Email hoặc Telegram.",
    ctaWaGroupLabel: "Tham Gia Nhóm Hỗ Trợ WhatsApp",
    ctaBtn: "Mở Trang Liên Hệ",
  },
};

export function BantuanClient({ locale }: { locale: SupportedLocale }) {
  const t = BANTUAN_TRANSLATIONS[locale] || BANTUAN_TRANSLATIONS.id;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | "all">("all");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => ({
    [t.faqs[0]?.id || ""]: true,
  }));
  const faqSectionRef = useRef<HTMLElement>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const queryTokens = useMemo(
    () => normalizedQuery.split(/\s+/).filter(Boolean),
    [normalizedQuery]
  );

  const filteredFaqs = useMemo(() => {
    return t.faqs.filter((f) => {
      if (selectedCategory !== "all" && f.category !== selectedCategory) {
        return false;
      }
      if (queryTokens.length === 0) return true;
      const catObj = t.categories.find((c) => c.key === f.category);
      const searchable = `${f.q} ${f.a} ${f.tag} ${catObj?.title || ""} ${catObj?.desc || ""}`.toLowerCase();
      return queryTokens.every((token) => searchable.includes(token));
    });
  }, [t.faqs, t.categories, selectedCategory, queryTokens]);

  const toggleFaq = (faqId: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }));
  };

  const handleSelectCategory = (catKey: CategoryKey) => {
    setSelectedCategory((prev) => (prev === catKey ? "all" : catKey));
    faqSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleExpandAll = () => {
    const next: Record<string, boolean> = {};
    filteredFaqs.forEach((f) => {
      next[f.id] = true;
    });
    setOpenIds(next);
  };

  const handleCollapseAll = () => {
    setOpenIds({});
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setOpenIds({ [t.faqs[0]?.id || ""]: true });
  };

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  const categoryIcons = [BookOpen, ShieldCheck, MessageCircle, Globe];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const isSearching = queryTokens.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GlobalHeader />

      <main className="flex-1">
        {/* Header Pusat Bantuan & Search Bar (presisi max-w-6xl px-4 sm:px-6 sesuai Header & Footer) */}
        <section className="pt-14 pb-10 px-4 sm:px-6 max-w-6xl mx-auto w-full text-center">
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            {t.h1}
          </h1>
          <p className="text-[#57534E] text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* Search Bar Interaktif + Reset */}
          <div className="max-w-2xl mx-auto mt-8 space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                aria-label={t.searchPlaceholder}
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E7E5E4] rounded-2xl pl-12 pr-11 py-3.5 text-sm text-[#1C1917] placeholder:text-[#57534E]/55 focus:outline-none focus:border-[#D94E28] focus:ring-2 focus:ring-[#D94E28]/15 shadow-sm transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Hapus pencarian"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-stone-400 hover:text-[#1C1917] hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Keyword Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {t.quickKeywords.map((kw) => {
                const isActiveKw = normalizedQuery === kw.toLowerCase();
                return (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => setSearchQuery(isActiveKw ? "" : kw)}
                    className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition cursor-pointer ${
                      isActiveKw
                        ? "bg-[#D94E28] text-white border-[#D94E28]"
                        : "bg-white text-[#57534E] border-[#E7E5E4] hover:border-[#D94E28]/50 hover:text-[#1C1917]"
                    }`}
                  >
                    {kw}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4 Kategori Bantuan Interaktif */}
        <section className="pb-14 px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.categories.map((c, idx) => {
              const Icon = categoryIcons[idx] || HelpCircle;
              const isSelectedCat = selectedCategory === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => handleSelectCategory(c.key)}
                  className={`text-left bg-white border rounded-2xl p-6 shadow-2xs hover:shadow-xs transition space-y-3 cursor-pointer ${
                    isSelectedCat
                      ? "border-[#D94E28] ring-2 ring-[#D94E28]/15"
                      : "border-[#E7E5E4] hover:border-[#D94E28]/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelectedCat
                          ? "bg-[#D94E28] text-white"
                          : "bg-[#FDF0EC] text-[#D94E28]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#57534E]">
                      {t.faqs.filter((f) => f.category === c.key).length} FAQ
                    </span>
                  </div>
                  <h2 className="font-bold text-sm text-[#1C1917]">{c.title}</h2>
                  <p className="text-xs text-[#57534E] leading-relaxed">{c.desc}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* FAQ Accordion Presisi Full max-w-6xl */}
        <section
          ref={faqSectionRef}
          id="faq-list"
          className="pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full scroll-mt-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#E7E5E4]">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28]">
                {t.faqSectionBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
                {t.faqSectionTitle}
              </h2>
              <p className="text-xs text-[#57534E]">
                {t.showingLabel(filteredFaqs.length, t.faqs.length)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3] cursor-pointer"
                >
                  {t.allCategoriesLabel} &times;
                </button>
              )}
              {(isSearching || selectedCategory !== "all") && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-[#E7E5E4] hover:border-[#D94E28] text-[#1C1917] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetLabel}</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleExpandAll}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-[#E7E5E4] hover:border-[#D94E28] text-[#1C1917] cursor-pointer"
              >
                {t.expandAllLabel}
              </button>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-[#E7E5E4] hover:border-[#D94E28] text-[#57534E] cursor-pointer"
              >
                {t.collapseAllLabel}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="p-10 text-center space-y-3 bg-white rounded-2xl border border-[#E7E5E4]">
                <p className="text-sm text-[#57534E]">{t.noResult}</p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D94E28] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetLabel}</span>
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = isSearching ? true : Boolean(openIds[faq.id]);
                return (
                  <article
                    key={faq.id}
                    className={`bg-white border rounded-2xl overflow-hidden transition ${
                      isOpen ? "border-[#FADCD3] shadow-xs" : "border-[#E7E5E4]"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${faq.id}`}
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#1C1917] hover:text-[#D94E28] transition cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
                        <span className="self-start sm:self-center text-[10px] font-bold uppercase tracking-wider bg-[#FDF0EC] text-[#D94E28] px-2.5 py-0.5 rounded-md shrink-0">
                          {faq.tag}
                        </span>
                        <span className="text-left leading-snug">{faq.q}</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 text-[#D94E28] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    <div
                      id={`faq-panel-${faq.id}`}
                      style={{
                        display: "grid",
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                      className="transition-[grid-template-rows] duration-200 ease-out"
                    >
                      <div className="overflow-hidden min-h-0">
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#57534E] leading-relaxed border-t border-stone-100 pt-4">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        {/* CTA Bantuan Tambahan Presisi Full max-w-6xl */}
        <section className="pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <div className="bg-[#FDF0EC] border border-[#FADCD3] rounded-3xl p-8 sm:p-12 text-center space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917]">
              {t.ctaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] max-w-2xl mx-auto leading-relaxed">
              {t.ctaDesc}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
              <a
                href={OFFICIAL_WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-sm inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.ctaWaGroupLabel}</span>
              </a>

              <a
                href="mailto:support@etalase.online"
                className="w-full sm:w-auto bg-white hover:bg-[#FAF8F5] text-[#1C1917] border border-[#E7E5E4] font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#D94E28]" />
                <span>support@etalase.online</span>
              </a>

              <a
                href="https://t.me/etalaseonline_bot"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-sm inline-flex items-center justify-center gap-2.5"
                title="Chat Customer Support (Rani • EtalaseOnline CS via Telegram)"
              >
                <div className="w-5 h-5 rounded-full overflow-hidden border border-white/40 shrink-0">
                  <img
                    src="/images/rani-cs.png"
                    alt="Rani CS"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Telegram: Rani CS</span>
              </a>

              <Link
                href={getLocalizedHref("/kontak")}
                className="w-full sm:w-auto bg-[#FAF8F5] hover:bg-stone-100 text-[#1C1917] border border-[#E7E5E4] font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition inline-flex items-center justify-center gap-2"
              >
                <span>{t.ctaBtn}</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-[#FADCD3]/80">
              <OfficialSocialLinks
                locale={locale}
                variant="pills"
                align="center"
                showHeading
              />
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
