"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import {
  Zap,
  Store,
  ShoppingBag,
  Calendar,
  Ticket,
  MessageCircle,
  ShieldCheck,
  Globe,
  Printer,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

interface FeatureItem {
  id: string;
  groupKey: "sales" | "tools";
  icon: React.ElementType;
  badge: string;
  title: string;
  target: string;
  headline: string;
  desc: string;
  points: string[];
  previewImg: string;
}

export const FEATURE_DATA: Record<
  SupportedLocale,
  {
    badge: string;
    h1: string;
    subtitle: string;
    groupSales: string;
    groupTools: string;
    suitableFor: string;
    keyAdvantages: string;
    ctaPrimary: string;
    ctaSecondary: string;
    items: FeatureItem[];
  }
> = {
  id: {
    badge: "Katalog Kemampuan Lengkap",
    h1: "Satu Platform, Semua Jenis Jualan.",
    subtitle:
      "Dirancang untuk menyederhanakan transaksi langsung di Asia Tenggara. Dari jualan file digital otomatis hingga display showroom bernilai tinggi.",
    groupSales: "📦 Format Jualan (Apa yang Anda Jual)",
    groupTools: "⚡ Alat Bantu Bisnis (Cara Anda Mengelola)",
    suitableFor: "Cocok untuk:",
    keyAdvantages: "Keunggulan Utama:",
    ctaPrimary: "Coba Fitur Ini Sekarang",
    ctaSecondary: "Lihat Contoh di Halaman Solusi →",
    items: [
      {
        id: "digital",
        groupKey: "sales",
        icon: Zap,
        badge: "Auto-WA Delivery",
        title: "Produk Digital & E-Course",
        target: "Kreator konten, edukator, coach, desainer grafis & fotografer.",
        headline: "Jual File Digital dengan Pengiriman WhatsApp Otomatis 24 Jam.",
        desc: "Jual e-book, template Canva/Notion, preset foto Lightroom, atau link video course. Begitu pembayaran QRIS lunas terverifikasi dalam 2 detik, sistem otomatis mengirim struk resmi dan link download file ke WhatsApp pembeli tanpa Anda harus standby.",
        points: [
          "Auto-delivery file ke WhatsApp pembeli secara instan",
          "Watermark PDF dinamis anti-bajak (nama & nomor HP pembeli tercetak)",
          "Integrasi Google Drive, file upload langsung, atau tautan Notion",
          "Dukungan kupon diskon dan batas kuota unduhan per pembeli",
        ],
        previewImg: "/images/demo/product-ebook.jpg",
      },
      {
        id: "katalog",
        groupKey: "sales",
        icon: Store,
        badge: "Showroom & Menu QR",
        title: "Katalog Fisik & Showroom",
        target: "Sales mobil/motor, agen properti, kafe/resto, & UMKM retail.",
        headline: "Pajang Unit & Menu dengan Simulasi Harga serta Chat Otomatis.",
        desc: "Pajang unit mobil, motor baru/bekas, listing rumah, baju distro, atau buku menu kafe. Dilengkapi tombol 'Tanya Unit' ke WhatsApp yang otomatis menyertakan nama dan spesifikasi produk di draf chat pembeli.",
        points: [
          "Format harga pasti, rentang harga, atau tombol 'Tanya Harga'",
          "Simulasi DP dan cicilan bulanan khusus unit kendaraan / properti",
          "QR meja interaktif untuk cafe & resto tanpa perlu unduh aplikasi",
          "Pilihan warna dan varian ukuran produk yang jelas di layar HP",
        ],
        previewImg: "/images/demo/product-car-suv.jpg",
      },
      {
        id: "affiliate",
        groupKey: "sales",
        icon: ShoppingBag,
        badge: "Multi-Platform SEA",
        title: "Affiliate Keranjang Kuning",
        target: "Kreator TikTok, Shopee Video creator, & influencer media sosial.",
        headline: "Gom Semua Rekomendasi Racun Belanja dalam 1 Bio Link Cantik.",
        desc: "Kumpulkan ratusan tautan rekomendasi TikTok Shop (Beg Kuning), Shopee Mall, dan Lazada dalam tampilan katalog foto yang rapi. Pembeli mengklik gambar dan langsung diarahkan ke aplikasi marketplace dengan tag affiliate Anda.",
        points: [
          "Tautan langsung (deep link) membuka aplikasi marketplace di HP",
          "Kategori produk terorganisir (Skincare, Fashion, Gadget, Home)",
          "Bebas razia tautan karena menggunakan landing page subdomain mandiri",
          "Analitik klik per produk untuk mengetahui produk paling laris",
        ],
        previewImg: "/images/demo/product-mic.jpg",
      },
      {
        id: "booking",
        groupKey: "sales",
        icon: Calendar,
        badge: "Sinkronisasi Kalender",
        title: "Booking 1-on-1 & Konsultasi",
        target: "Konsultan finansial, dokter, mentor bisnis, fotografer, & terapis.",
        headline: "Monetisasi Waktu & Keahlian Tanpa Drama Atur Jadwal Manual.",
        desc: "Buka sesi konsultasi privat atau audit portofolio 1-on-1. Klien memilih slot hari dan jam yang masih kosong langsung dari etalase Anda, menyelesaikan pembayaran, dan link Google Meet terkirim otomatis.",
        points: [
          "Pilihan slot tanggal dan jam yang sinkron otomatis",
          "Opsi durasi sesi (30 menit, 60 menit, atau paket pertemuan)",
          "Pengingat otomatis H-1 ke WhatsApp klien agar meminimalkan no-show",
          "Integrasi pembayaran di muka untuk menghindari pembatalan sepihak",
        ],
        previewImg: "/images/demo/product-mentoring.jpg",
      },
      {
        id: "event",
        groupKey: "sales",
        icon: Ticket,
        badge: "Tiket & Reminder WA",
        title: "Event Online & Webinar",
        target: "Penyelenggara webinar, komunitas, trainer, & event organizer.",
        headline: "Jual Tiket Acara Online atau Offline Tanpa Biaya Tiket Mahal.",
        desc: "Kelola registrasi peserta webinar Zoom/Meet atau seminar tatap muka. Kuota tiket terkelola otomatis, struk ber-barcode dikirim ke WhatsApp, dan pengingat jadwal terkirim otomatis saat hari pelaksanaan.",
        points: [
          "Batas kuota peserta real-time yang tertutup otomatis saat penuh",
          "Tiket digital dengan nomor registrasi unik langsung ke WhatsApp",
          "Tipe tiket bertingkat (Early Bird, Reguler, VIP)",
          "Pengiriman link streaming terlindungi hanya untuk peserta terdaftar",
        ],
        previewImg: "/images/demo/product-mentoring.jpg",
      },
      {
        id: "chat-order",
        groupKey: "tools",
        icon: MessageCircle,
        badge: "0% Potongan Komisi",
        title: "Order Direct via WhatsApp",
        target: "Semua pebisnis yang ingin menjaga 100% margin keuntungan.",
        headline: "Terima Pesanan Masuk ke Chat Tanpa Potongan Biaya Apapun.",
        desc: "Setiap pesanan di etalase Anda bisa diarahkan langsung menjadi draf pesan WhatsApp yang rapi berisi rincian item, total harga, dan data pembeli. Anda closing langsung di chat dengan 0% biaya potongan platform.",
        points: [
          "Format pesan chat rapi siap kirim, pembeli tinggal klik kirim",
          "0% komisi platform untuk semua pesanan jalur chat",
          "Mendukung multi-nomor CS WhatsApp untuk rotasi admin sales",
          "Dukungan saluran pesan regional (LINE di Thailand, Zalo di Vietnam)",
        ],
        previewImg: "/images/demo/product-car-suv.jpg",
      },
      {
        id: "fintech",
        groupKey: "tools",
        icon: ShieldCheck,
        badge: "Settlement 2 Detik",
        title: "QRIS Instan & BorderPay FinTech",
        target: "Merchant yang membutuhkan pembayaran otomatis tanpa ribet cek mutasi.",
        headline: "Pembayaran Otomatis dengan Opsi Bebas Biaya Transaksi.",
        desc: "Terima pembayaran QRIS dari semua bank dan e-wallet. Fitur Convenience Fee memungkinkan biaya pemrosesan transaksi dibebankan ke pembeli sehingga Anda menerima uang bersih 100% utuh.",
        points: [
          "Verifikasi pembayaran otomatis dalam 2 detik tanpa upload bukti transfer",
          "Biaya transaksi fleksibel: bisa ditanggung merchant atau pembeli",
          "Penarikan dana harian (payout) ke semua bank di Indonesia",
          "Mendukung standar QR regional SEA (PromptPay, DuitNow, VietQR)",
        ],
        previewImg: "/images/demo/product-preset.jpg",
      },
      {
        id: "domain",
        groupKey: "tools",
        icon: Globe,
        badge: "SEO & Brand Authority",
        title: "Custom Domain Pribadi",
        target: "Pebisnis yang ingin membangun brand profesional jangka panjang.",
        headline: "Gunakan Domain Anda Sendiri (namabrand.com) dengan SSL Gratis.",
        desc: "Tingkatkan kepercayaan calon pembeli dengan menghubungkan domain pribadi (.com, .id, .co, dll.). Dilengkapi sertifikat keamanan SSL gratis dan panduan DNS praktis 1-klik.",
        points: [
          "Koneksi domain pribadi mudah tanpa ribet konfigurasi server",
          "Sertifikat keamanan SSL / HTTPS otomatis aktif gratis",
          "Hapus seluruh branding platform etalase.online (White-label)",
          "Koneksi instan ke Google Analytics 4 dan Meta Pixel",
        ],
        previewImg: "/images/demo/product-ebook.jpg",
      },
      {
        id: "standee",
        groupKey: "tools",
        icon: Printer,
        badge: "Pemasaran Offline-to-Online",
        title: "Standee Kasir & Generator QR",
        target: "Pemilik cafe, kedai kopi, butik, bengkel, & toko fisik.",
        headline: "Cetak Kartu Meja & Standee QR Siap Pajang di Kasir.",
        desc: "Download file cetak standee akrilik meja kasir beresolusi tinggi yang berisi QR etalase toko Anda, nomor WhatsApp pemesanan, dan link Google Review bintang 5 untuk meningkatkan reputasi offline toko Anda.",
        points: [
          "Format file siap cetak ukuran A5 dan kartu saku",
          "QR dinamis yang tetap aktif meskipun isi katalog Anda berganti",
          "Tombol ajakan ulasan Google Maps bintang 5 terintegrasi",
          "Desain profesional bertema Warm Editorial yang selaras dengan outlet",
        ],
        previewImg: "/images/demo/product-mic.jpg",
      },
    ],
  },
  en: {
    badge: "Full Capabilities Catalog",
    h1: "One Platform, All Selling Formats.",
    subtitle:
      "Engineered to streamline direct transactions across Southeast Asia. From automated digital product downloads to high-ticket vehicle showrooms.",
    groupSales: "📦 Selling Formats (What You Offer)",
    groupTools: "⚡ Business Power Tools (How You Operate)",
    suitableFor: "Ideal for:",
    keyAdvantages: "Core Advantages:",
    ctaPrimary: "Try This Feature Now",
    ctaSecondary: "View Examples on Solutions Page →",
    items: [
      {
        id: "digital",
        groupKey: "sales",
        icon: Zap,
        badge: "Auto-WA Delivery",
        title: "Digital Products & E-Courses",
        target: "Content creators, educators, coaches, designers & photographers.",
        headline: "Sell Digital Assets with 24/7 Automated WhatsApp Delivery.",
        desc: "Sell e-books, Canva templates, Lightroom presets, Notion workspaces, or video course links. The moment payments are verified in 2 seconds, our cloud bot automatically dispatches receipts and secure file links to the buyer's WhatsApp without manual monitoring.",
        points: [
          "Instant automated file dispatch to buyer WhatsApp accounts",
          "Dynamic anti-piracy PDF watermarks (buyer name & phone number stamped)",
          "Google Drive, direct file uploads, or Notion link integrations",
          "Configurable promo discount vouchers and per-buyer download limits",
        ],
        previewImg: "/images/demo/product-ebook.jpg",
      },
      {
        id: "katalog",
        groupKey: "sales",
        icon: Store,
        badge: "Showrooms & QR Menus",
        title: "Physical Catalogs & Showrooms",
        target: "Car/bike sales consultants, property agents, cafes & retail shops.",
        headline: "Display Units & Menus with Down Payment Estimators and Direct Chat.",
        desc: "Showcase new/used vehicles, property listings, fashion collections, or restaurant menus. Features an 'Inquire Unit' chat button that automatically pre-fills the chat draft with the exact item name and specifications.",
        points: [
          "Supports fixed prices, price ranges, or 'Inquire Price' inquiry buttons",
          "Down-payment calculators and monthly installment tables for vehicles/real estate",
          "Interactive table QR menus for cafes & restaurants without app installs",
          "Clear color variants, sizing chips, and high-res mobile previews",
        ],
        previewImg: "/images/demo/product-car-suv.jpg",
      },
      {
        id: "affiliate",
        groupKey: "sales",
        icon: ShoppingBag,
        badge: "Multi-Platform SEA",
        title: "Yellow Basket Affiliate Hub",
        target: "TikTok creators, Shopee Video creators, & social media influencers.",
        headline: "Unify All Curated Product Recommendations in One Clean Bio Link.",
        desc: "Organize hundreds of TikTok Shop Yellow Basket, Shopee Mall, and Lazada product picks into a structured visual grid. Shoppers tap an image and open the respective shopping app directly with your affiliate attribution intact.",
        points: [
          "Direct app deep-linking straight into marketplace apps on mobile",
          "Organized category tabs (Skincare, Fashion, Electronics, Home)",
          "Protected against algorithm link bans using independent subdomains",
          "Item-level click analytics to identify your highest-earning recommendations",
        ],
        previewImg: "/images/demo/product-mic.jpg",
      },
      {
        id: "booking",
        groupKey: "sales",
        icon: Calendar,
        badge: "Calendar Sync",
        title: "1-on-1 Bookings & Consultations",
        target: "Financial consultants, doctors, coaches, photographers, & therapists.",
        headline: "Monetize Expertise and Advisory Without Scheduling Back-and-Forth.",
        desc: "Offer private mentoring or portfolio audits. Clients select open dates and time slots directly from your storefront, complete payment upfront, and receive automated Google Meet invites.",
        points: [
          "Live date and time slot pickers synchronized automatically",
          "Configurable session lengths (30 mins, 60 mins, or bundled packages)",
          "Automated WhatsApp 24-hour reminders to minimize no-show rates",
          "Mandatory upfront payments to eliminate last-minute cancellations",
        ],
        previewImg: "/images/demo/product-mentoring.jpg",
      },
      {
        id: "event",
        groupKey: "sales",
        icon: Ticket,
        badge: "Ticketing & WA Reminders",
        title: "Online Events & Webinars",
        target: "Webinar hosts, communities, workshop trainers, & event organizers.",
        headline: "Sell Online or In-Person Event Tickets Free of Exorbitant Fees.",
        desc: "Manage registrations for Zoom webinars or offline seminars. Real-time ticket quotas, barcode-enabled WhatsApp receipts, and scheduled reminders sent automatically on event day.",
        points: [
          "Real-time seat quotas that automatically close when tickets sell out",
          "Digital passes with unique registration codes sent straight to WhatsApp",
          "Tiered ticket pricing (Early Bird, Standard, VIP)",
          "Protected meeting link access restricted to verified registered attendees",
        ],
        previewImg: "/images/demo/product-mentoring.jpg",
      },
      {
        id: "chat-order",
        groupKey: "tools",
        icon: MessageCircle,
        badge: "0% Platform Fee",
        title: "Direct WhatsApp Orders",
        target: "Merchants focused on maintaining 100% of their gross profit margins.",
        headline: "Receive Pre-Formatted Orders Straight to Chat with Zero Platform Fees.",
        desc: "Every product order can be converted into a structured WhatsApp message including item details, total pricing, and customer delivery data. You close sales directly in chat with 0% platform cuts.",
        points: [
          "Formatted chat messages ready to send in 1 click by the buyer",
          "0% platform commission on all orders processed through chat",
          "Supports multiple WhatsApp CS numbers for sales team lead rotation",
          "Regional chat compatibility (LINE in Thailand, Zalo in Vietnam)",
        ],
        previewImg: "/images/demo/product-car-suv.jpg",
      },
      {
        id: "fintech",
        groupKey: "tools",
        icon: ShieldCheck,
        badge: "2-Second Settlement",
        title: "Instant QR & FinTech Automation",
        target: "Merchants wanting automated checkout without manual bank reconciliation.",
        headline: "Automated Payments with Optional Zero Transaction Fee Models.",
        desc: "Accept instant QR payments from regional banking apps and e-wallets. The Convenience Fee feature lets buyers cover transaction fees so you keep 100% net profit.",
        points: [
          "2-second automated payment verification with zero receipt uploads",
          "Flexible transaction fees: paid by merchant or covered by customer",
          "Daily bank payout options across Southeast Asian financial institutions",
          "Supports native SEA standards (PromptPay, DuitNow, VietQR, QRIS)",
        ],
        previewImg: "/images/demo/product-preset.jpg",
      },
      {
        id: "domain",
        groupKey: "tools",
        icon: Globe,
        badge: "SEO & Brand Authority",
        title: "Custom Apex Domain",
        target: "Brands seeking long-term professional credibility and customer trust.",
        headline: "Connect Your Personal Domain (yourbrand.com) with Complimentary SSL.",
        desc: "Build sovereign consumer confidence by linking your custom domain (.com, .store, .net). Includes free automated SSL encryption and 1-click DNS configuration.",
        points: [
          "Effortless domain mapping without complex server management",
          "Free, automated SSL/HTTPS security certificates with zero downtime",
          "Complete removal of etalase.online platform branding (White-label)",
          "Instant plug-and-play setup for Google Analytics 4 and Meta Pixel",
        ],
        previewImg: "/images/demo/product-ebook.jpg",
      },
      {
        id: "standee",
        groupKey: "tools",
        icon: Printer,
        badge: "Offline-to-Online Hub",
        title: "Cashier Standee & QR Generator",
        target: "Coffee shops, cafes, retail boutiques, repair shops, and physical stores.",
        headline: "Print Ready-to-Display Table Tents & Counter QR Standees.",
        desc: "Download high-resolution print-ready counter acrylic artwork containing your storefront QR, ordering WhatsApp handle, and 5-star Google Review links to boost physical outlet footfall.",
        points: [
          "Print-ready high-resolution formats for A5 table cards and counter tents",
          "Dynamic QR codes that remain permanently valid even as your menu updates",
          "Built-in 5-star Google Maps review booster button",
          "Refined Warm Editorial visual aesthetics matching modern interior concepts",
        ],
        previewImg: "/images/demo/product-mic.jpg",
      },
    ],
  },
  ms: {
    badge: "Katalog Keupayaan Lengkap",
    h1: "Satu Platform, Semua Jenis Jualan.",
    subtitle:
      "Direka untuk memudahkan transaksi terus di Asia Tenggara. Daripada jualan fail digital secara automatik hingga pameran bilik pameran kenderaan bernilai tinggi.",
    groupSales: "📦 Format Jualan (Apa yang Anda Jual)",
    groupTools: "⚡ Alat Bantu Bisnes (Cara Anda Menguruskan)",
    suitableFor: "Sesuai untuk:",
    keyAdvantages: "Kelebihan Utama:",
    ctaPrimary: "Cuba Ciri Ini Sekarang",
    ctaSecondary: "Lihat Contoh di Halaman Penyelesaian →",
    items: [
      {
        id: "digital",
        groupKey: "sales",
        icon: Zap,
        badge: "Auto-WA Delivery",
        title: "Produk Digital & E-Course",
        target: "Pencipta kandungan, pendidik, jurulatih, pereka grafik & jurugambar.",
        headline: "Jual Fail Digital dengan Penghantaran WhatsApp Automatik 24 Jam.",
        desc: "Jual e-buku, templat Canva/Notion, praset foto Lightroom, atau pautan kursus video. Sebaik bayaran QR disahkan dalam 2 saat, sistem secara automatik menghantar resit rasmi dan pautan muat turun ke WhatsApp pembeli tanpa perlu anda tunggu.",
        points: [
          "Penghantaran fail automatik serta-merta ke WhatsApp pembeli",
          "Tera air PDF dinamik anti-cetak rompak (nama & nombor telefon pembeli dicetak)",
          "Integrasi Google Drive, muat naik fail terus, atau pautan Notion",
          "Sokongan kupon diskaun dan had kuota muat turun bagi setiap pembeli",
        ],
        previewImg: "/images/demo/product-ebook.jpg",
      },
      {
        id: "katalog",
        groupKey: "sales",
        icon: Store,
        badge: "Showroom & Menu QR",
        title: "Katalog Fizikal & Bilik Pameran",
        target: "Jurujual kereta/motosikal, ejen hartanah, kafe/restoran & kedai runcit.",
        headline: "Pamerkan Unit & Menu dengan Simulasi Harga serta Sembang Automatik.",
        desc: "Pamerkan unit kenderaan baharu/terpakai, senarai hartanah, pakaian atau menu sajian kafe. Dilengkapi butang 'Tanya Unit' ke WhatsApp yang secara automatik menyertakan spesifikasi produk dalam draf mesej pembeli.",
        points: [
          "Format harga tetap, anggaran harga, atau butang 'Tanya Harga'",
          "Simulasi wang muka (DP) dan ansuran bulanan untuk kenderaan / hartanah",
          "Menu QR meja interaktif untuk kafe & restoran tanpa perlu memuat turun aplikasi",
          "Pilihan warna dan variasi saiz produk yang jelas di skrin telefon",
        ],
        previewImg: "/images/demo/product-car-suv.jpg",
      },
      {
        id: "affiliate",
        groupKey: "sales",
        icon: ShoppingBag,
        badge: "Multi-Platform SEA",
        title: "Afiliasi Beg Kuning",
        target: "Pencipta TikTok, pencipta Shopee Video & pempengaruh media sosial.",
        headline: "Himpunkan Semua Cadangan Belanja dalam 1 Pautan Bio yang Kemas.",
        desc: "Kumpulkan ratusan pautan cadangan barangan TikTok Shop (Beg Kuning), Shopee Mall dan Lazada dalam susunan katalog foto yang kemas. Pembeli menekan gambar dan terus dibawa ke aplikasi pasaran dengan kod afiliasi anda.",
        points: [
          "Pautan terus (deep link) membuka aplikasi pasaran di telefon bimbit",
          "Kategori produk tersusun rapi (Penjagaan Kulit, Fesyen, Alat Elektronik)",
          "Bebas sekatan pautan kerana menggunakan subdomain mandiri",
          "Analisis klik bagi setiap produk untuk mengetahui produk paling laris",
        ],
        previewImg: "/images/demo/product-mic.jpg",
      },
      {
        id: "booking",
        groupKey: "sales",
        icon: Calendar,
        badge: "Penyelarasan Kalendar",
        title: "Tempahan 1-on-1 & Rundingan",
        target: "Perunding kewangan, doktor, pembimbing bisnes, jurugambar & pakar terapi.",
        headline: "Jana Pendapatan daripada Masa & Kepakaran Tanpa Kekeliruan Jadual.",
        desc: "Buka sesi bimbingan peribadi atau audit portfolio secara 1-on-1. Pelanggan memilih tarikh dan masa terluang terus dari etalase anda, membuat bayaran, dan pautan Google Meet dihantar secara automatik.",
        points: [
          "Pilihan tarikh dan slot masa yang diselaraskan secara automatik",
          "Pilihan tempoh sesi (30 minit, 60 minit, atau pakej pertemuan)",
          "Peringatan automatik H-1 ke WhatsApp pelanggan untuk mengelakkan ketidakhadiran",
          "Integrasi bayaran pendahuluan untuk mengelakkan pembatalan saat akhir",
        ],
        previewImg: "/images/demo/product-mentoring.jpg",
      },
      {
        id: "event",
        groupKey: "sales",
        icon: Ticket,
        badge: "Tiket & Peringatan WA",
        title: "Acara Dalam Talian & Webinar",
        target: "Penganjur webinar, komuniti, jurulatih bengkel & penganjur acara.",
        headline: "Jual Tiket Acara Dalam Talian atau Bersemuka Tanpa Yuran Tiket yang Mahal.",
        desc: "Urus pendaftaran peserta webinar Zoom/Meet atau seminar fizikal. Kuota tiket dipantau secara langsung, tiket ber-kod bar dihantar ke WhatsApp, dan peringatan jadual dihantar pada hari acara berlangsung.",
        points: [
          "Had kuota peserta masa nyata yang ditutup secara automatik apabila penuh",
          "Tiket digital dengan nombor pendaftaran unik terus ke WhatsApp",
          "Kategori tiket berperingkat (Early Bird, Standard, VIP)",
          "Penghantaran pautan persidangan dilindungi hanya untuk peserta berdaftar",
        ],
        previewImg: "/images/demo/product-mentoring.jpg",
      },
      {
        id: "chat-order",
        groupKey: "tools",
        icon: MessageCircle,
        badge: "0% Komisen Platform",
        title: "Pesanan Terus via WhatsApp",
        target: "Semua peniaga yang ingin mengekalkan 100% margin keuntungan.",
        headline: "Terima Pesanan Terus ke Sembang Tanpa Sebarang Potongan Yuran.",
        desc: "Setiap pesanan di etalase anda boleh diarahkan menjadi draf mesej WhatsApp yang lengkap dengan butiran barangan, jumlah harga dan maklumat pembeli. Anda membuat jualan di ruang sembang dengan 0% caj potongan platform.",
        points: [
          "Format mesej sembang kemas sedia dihantar oleh pembeli",
          "0% komisen platform untuk semua pesanan melalui sembang",
          "Sokongan pelbagai nombor CS WhatsApp untuk giliran pentadbir jualan",
          "Sokongan saluran sembang serantau (LINE di Thailand, Zalo di Vietnam)",
        ],
        previewImg: "/images/demo/product-car-suv.jpg",
      },
      {
        id: "fintech",
        groupKey: "tools",
        icon: ShieldCheck,
        badge: "Pengesahan 2 Saat",
        title: "Bayaran QR Pantas & FinTech",
        target: "Peniaga yang mahukan sistem bayaran automatik tanpa perlu menyemak resit secara manual.",
        headline: "Bayaran Automatik dengan Pilihan Bebas Caj Transaksi.",
        desc: "Terima bayaran QR daripada semua aplikasi perbankan tempatan dan e-dompet. Ciri Convenience Fee membolehkan caj transaksi ditanggung pembeli supaya keuntungan anda kekal 100% utuh.",
        points: [
          "Pengesahan bayaran automatik dalam 2 saat tanpa muat naik bukti pindahan",
          "Caj transaksi fleksibel: boleh ditanggung peniaga atau pembeli",
          "Pengeluaran baki harian ke semua akaun bank tempatan",
          "Menyokong piawaian QR serantau SEA (DuitNow, PromptPay, VietQR, QRIS)",
        ],
        previewImg: "/images/demo/product-preset.jpg",
      },
      {
        id: "domain",
        groupKey: "tools",
        icon: Globe,
        badge: "SEO & Kredibiliti Jenama",
        title: "Domain Kustom Sendiri",
        target: "Peniaga yang ingin membina jenama profesional jangka panjang.",
        headline: "Gunakan Domain Anda Sendiri (namabrand.com) dengan SSL Percuma.",
        desc: "Tingkatkan keyakinan bakal pembeli dengan memautkan domain peribadi (.com, .my, .store dll.). Dilengkapi sijil keselamatan SSL percuma dan panduan DNS 1-klik yang mudah.",
        points: [
          "Sambungan domain sendiri yang mudah tanpa konfigurasi pelayan rumit",
          "Sijil keselamatan SSL / HTTPS automatik percuma",
          "Buang semua penjenamaan platform etalase.online (Label Putih)",
          "Sambungan segera ke Google Analytics 4 dan Meta Pixel",
        ],
        previewImg: "/images/demo/product-ebook.jpg",
      },
      {
        id: "standee",
        groupKey: "tools",
        icon: Printer,
        badge: "Pemasaran Luar Talian ke Dalam Talian",
        title: "Standee Kaunter & Penjana QR",
        target: "Pemilik kafe, butik fesyen, bengkel & kedai fizikal.",
        headline: "Cetak Kad Meja & Standee QR Sedia Dipamerkan di Kaunter.",
        desc: "Muat turun karya seni standee akrilik resolusi tinggi yang mengandungi QR etalase kedai anda, nombor WhatsApp pesanan, dan pautan Ulasan Google bintang 5 untuk meningkatkan reputasi kedai fizikal anda.",
        points: [
          "Format fail sedia cetak saiz A5 dan kad poket",
          "QR dinamik yang kekal aktif walaupun senarai katalog anda bertukar",
          "Butang ajakan ulasan Google Maps bintang 5 bersepadu",
          "Reka bentuk profesional bertema Warm Editorial yang sesuai dengan susun atur kedai",
        ],
        previewImg: "/images/demo/product-mic.jpg",
      },
    ],
  },
  th: {
    badge: "แคตตาล็อกฟังก์ชันครบครัน",
    h1: "แพลตฟอร์มเดียว รองรับทุกรูปแบบการขาย",
    subtitle:
      "ออกแบบมาเพื่อลดความซับซ้อนของการซื้อขายโดยตรงในเอเชียตะวันออกเฉียงใต้ ตั้งแต่การส่งมอบไฟล์ดิจิทัลอัตโนมัติไปจนถึงโชว์รูมสินค้ามูลค่าสูง",
    groupSales: "📦 หมวดหมู่สินค้า (สิ่งที่คุณขาย)",
    groupTools: "⚡ เครื่องมือทรงพลังทางธุรกิจ (วิธีที่คุณบริหารจัดการ)",
    suitableFor: "เหมาะสำหรับ:",
    keyAdvantages: "จุดเด่นสำคัญ:",
    ctaPrimary: "ทดลองใช้ฟีเจอร์นี้เลย",
    ctaSecondary: "ดูตัวอย่างในหน้าโซลูชัน →",
    items: [
      {
        id: "digital",
        groupKey: "sales",
        icon: Zap,
        badge: "ส่งของอัตโนมัติทาง WA",
        title: "สินค้าดิจิทัลและคอร์สออนไลน์",
        target: "ครีเอเตอร์, อาจารย์, โค้ช, กราฟิกดีไซเนอร์ และช่างภาพ",
        headline: "ขายไฟล์ดิจิทัลพร้อมระบบส่งมอบทาง WhatsApp อัตโนมัติ 24 ชม.",
        desc: "ขายอีบุ๊ก, เทมเพลต Canva/Notion, พรีเซ็ต Lightroom, หรือลิงก์คอร์สเรียนวิดีโอ เมื่อลูกค้าชำระเงินเรียบร้อยใน 2 วินาที ระบบคลาวด์จะส่งใบเสร็จและลิงก์ดาวน์โหลดไฟล์ไปยัง WhatsApp ของลูกค้าทันทีโดยที่คุณไม่ต้องคอยเฝ้าหน้าจอ",
        points: [
          "จัดส่งไฟล์ไปยัง WhatsApp ของผู้ซื้อทันทีโดยอัตโนมัติ",
          "ระบบประทับลายน้ำป้องกันการละเมิดลิขสิทธิ์บนไฟล์ PDF อัตโนมัติ",
          "เชื่อมต่อ Google Drive, อัปโหลดไฟล์โดยตรง หรือลิงก์ Notion ได้อย่างง่ายดาย",
          "รองรับโค้ดส่วนลดและจำกัดจำนวนครั้งในการดาวน์โหลดต่อผู้ซื้อ",
        ],
        previewImg: "/images/demo/product-ebook.jpg",
      },
      {
        id: "katalog",
        groupKey: "sales",
        icon: Store,
        badge: "โชว์รูมและเมนู QR",
        title: "แคตตาล็อกสินค้าจริงและโชว์รูม",
        target: "ฝ่ายขายรถยนต์/มอเตอร์ไซค์, นายหน้าอสังหาฯ, ร้านอาหาร/คาเฟ่ และร้านค้าปลีก",
        headline: "จัดแสดงสินค้าพร้อมระบบคำนวณเงินดาวน์และข้อความแชตอัตโนมัติ",
        desc: "แสดงรายการรถยนต์ใหม่หรือมือสอง, รายการบ้านและคอนโด, เสื้อผ้าแฟชั่น หรือเมนูอาหาร มาพร้อมปุ่ม 'สอบถามข้อมูล' ตรงสู่ WhatsApp ที่ระบุชื่อสินค้าและรายละเอียดลงในข้อความแชตให้ลูกค้าทันที",
        points: [
          "เลือกแสดงราคาแบบคงที่, ช่วงราคา หรือปุ่ม 'สอบถามราคา'",
          "ระบบคำนวณเงินดาวน์และตารางผ่อนชำระสำหรับรถยนต์และอสังหาริมทรัพย์",
          "เมนู QR บนโต๊ะอาหารสำหรับคาเฟ่และร้านอาหาร ไม่ต้องดาวน์โหลดแอป",
          "ตัวเลือกสี ไซส์ และขนาดสินค้าชัดเจนบนหน้าจอมือถือ",
        ],
        previewImg: "/images/demo/product-car-suv.jpg",
      },
      {
        id: "affiliate",
        groupKey: "sales",
        icon: ShoppingBag,
        badge: "ครอบคลุมทั่ว SEA",
        title: "ศูนย์รวมลิงก์ตะกร้าเหลือง",
        target: "ครีเอเตอร์ TikTok, ครีเอเตอร์ Shopee Video และอินฟลูเอนเซอร์",
        headline: "รวบรวมไอเทมป้ายยาช้อปปิ้งทั้งหมดไว้ในไบโอลิงก์เดียวที่สวยงาม",
        desc: "รวบรวมลิงก์แนะนำสินค้า TikTok Shop (ตะกร้าเหลือง), Shopee Mall และ Lazada ไว้ในรูปแบบแคตตาล็อกรูปภาพที่เป็นระเบียบ ลูกค้าแตะที่รูปแล้วระบบจะเปิดแอปพลิเคชันช้อปปิ้งโดยตรงพร้อมรหัสแอฟฟิลิเอตของคุณ",
        points: [
          "ลิงก์ตรง (Deep Link) สลับเปิดแอปมาร์เก็ตเพลสบนมือถือได้ทันที",
          "จัดหมวดหมู่สินค้าชัดเจน (สกินแคร์, แฟชั่น, แกดเจ็ต, ของแต่งบ้าน)",
          "ปลอดภัยจากการถูกแบนลิงก์ด้วยซับโดเมนส่วนตัว",
          "ระบบสถิติการคลิกรายสินค้า เพื่อให้คุณรู้ว่าชิ้นไหนสร้างรายได้ดีที่สุด",
        ],
        previewImg: "/images/demo/product-mic.jpg",
      },
      {
        id: "booking",
        groupKey: "sales",
        icon: Calendar,
        badge: "ซิงค์ปฏิทิน",
        title: "จองเวลา 1 ต่อ 1 และคำปรึกษา",
        target: "ที่ปรึกษาการเงิน, แพทย์, โค้ชธุรกิจ, ช่างภาพ และผู้เชี่ยวชาญ",
        headline: "สร้างรายได้จากความเชี่ยวชาญโดยไม่ต้องวุ่นวายเรื่องการจัดตารางเวลา",
        desc: "เปิดรับการปรึกษาส่วนตัวหรือตรวจพอร์ตงานแบบ 1 ต่อ 1 ลูกค้าสามารถเลือกวันและช่วงเวลาที่ว่างได้โดยตรงจากหน้าร้านของคุณ ชำระเงินล่วงหน้า และระบบจะส่งลิงก์ Google Meet ให้อัตโนมัติ",
        points: [
          "เลือกวันและเวลาที่ว่างได้แบบเรียลไทม์ ซิงค์ปฏิทินอัตโนมัติ",
          "กำหนดระยะเวลาแต่ละรอบได้ (30 นาที, 60 นาที หรือแพ็กเกจต่อเนื่อง)",
          "ระบบส่งข้อความแจ้งเตือนล่วงหน้า 1 วันทาง WhatsApp ลดปัญหาการลืมนัด",
          "ระบบเก็บเงินล่วงหน้าเพื่อป้องกันการยกเลิกนัดกะทันหัน",
        ],
        previewImg: "/images/demo/product-mentoring.jpg",
      },
      {
        id: "event",
        groupKey: "sales",
        icon: Ticket,
        badge: "บัตรเข้างานและเตือนทาง WA",
        title: "อีเวนต์และสัมมนาออนไลน์",
        target: "ผู้จัดสัมมนา, ชุมชน, วิทยากร และผู้จัดงานอีเวนต์",
        headline: "จำหน่ายบัตรงานสัมมนาหรือเวิร์กช็อปโดยไม่มีค่าธรรมเนียมบัตรแพง",
        desc: "จัดการลงทะเบียนสัมมนาออนไลน์ผ่าน Zoom/Meet หรือสัมมนาแบบพบตัว ควบคุมจำนวนที่นั่งเรียลไทม์ จัดส่งบัตรพร้อมบาร์โค้ดทาง WhatsApp และส่งข้อความเตือนเมื่อถึงวันจัดงาน",
        points: [
          "จำกัดจำนวนที่นั่งเรียลไทม์ ระบบปิดรับอัตโนมัติเมื่อบัตรเต็ม",
          "บัตรดิจิทัลพร้อมรหัสลงทะเบียนส่งตรงสู่ WhatsApp ของผู้ร่วมงาน",
          "แยกประเภทบัตรได้หลายระดับ (Early Bird, บัตรปกติ, VIP)",
          "ส่งมอบลิงก์ห้องประชุมที่ปลอดภัยให้เฉพาะผู้ที่ลงทะเบียนสำเร็จเท่านั้น",
        ],
        previewImg: "/images/demo/product-mentoring.jpg",
      },
      {
        id: "chat-order",
        groupKey: "tools",
        icon: MessageCircle,
        badge: "0% ค่าคอมมิชชัน",
        title: "สั่งซื้อตรงสู่ WhatsApp",
        target: "ผู้ประกอบการทุกคนที่ต้องการรักษากำไรเต็ม 100% ไว้กับตัว",
        headline: "รับคำสั่งซื้อเข้าสู่แชตโดยไม่มีการหักค่าคอมมิชชันใดๆ ทั้งสิ้น",
        desc: "ทุกการสั่งซื้อบนหน้าร้านของคุณสามารถแปลงเป็นข้อความแชต WhatsApp ที่ระบุรายการสินค้า ยอดรวม และข้อมูลการจัดส่งของลูกค้าอย่างเป็นระเบียบ ปิดการขายในแชตได้ทันทีด้วยค่าคอมมิชชัน 0%",
        points: [
          "ข้อความแชตพร้อมส่ง ลูกค้าเพียงแตะส่งได้ทันที",
          "0% ค่าคอมมิชชันแพลตฟอร์มสำหรับการสั่งซื้อทางแชตทุกรายการ",
          "รองรับเบอร์ WhatsApp แอดมินหลายเบอร์พร้อมระบบกระจายงาน",
          "รองรับแอปแชตยอดนิยมในภูมิภาค (LINE ในประเทศไทย, Zalo ในเวียดนาม)",
        ],
        previewImg: "/images/demo/product-car-suv.jpg",
      },
      {
        id: "fintech",
        groupKey: "tools",
        icon: ShieldCheck,
        badge: "ตรวจสอบยอดใน 2 วินาที",
        title: "ระบบชำระเงิน QR ทันใจ & FinTech",
        target: "ร้านค้าที่ต้องการระบบรับชำระเงินอัตโนมัติ ไม่ต้องคอยตรวจสลิปโอนเงิน",
        headline: "ระบบรับชำระเงินอัตโนมัติพร้อมตัวเลือกฟรีค่าธรรมเนียม",
        desc: "รับชำระเงินผ่าน QR จากทุกแอปพลิเคชันธนาคารและกระเป๋าเงินอิเล็กทรอนิกส์ ฟังก์ชัน Convenience Fee ช่วยให้คุณเลือกตั้งค่าให้ผู้ซื้อช่วยรับผิดชอบค่าธรรมเนียมได้ ทำให้คุณได้รับเงินเต็มจำนวน 100%",
        points: [
          "ตรวจสอบยอดชำระเงินอัตโนมัติใน 2 วินาที ไม่ต้องอัปโหลดสลิป",
          "ตั้งค่าค่าธรรมเนียมได้ยืดหยุ่น: ร้านค้ารับผิดชอบ หรือให้ผู้ซื้อจ่าย",
          "ระบบถอนเงินเข้าบัญชีธนาคารในประเทศได้ทุกวันทำการ",
          "รองรับมาตรฐาน QR ทั่วเอเชียตะวันออกเฉียงใต้ (PromptPay, DuitNow, VietQR, QRIS)",
        ],
        previewImg: "/images/demo/product-preset.jpg",
      },
      {
        id: "domain",
        groupKey: "tools",
        icon: Globe,
        badge: "SEO และภาพลักษณ์แบรนด์",
        title: "โดเมนส่วนตัวของคุณเอง",
        target: "ธุรกิจที่ต้องการสร้างแบรนด์อย่างมืออาชีพในระยะยาว",
        headline: "ใช้ชื่อโดเมนของคุณเอง (yourbrand.com) พร้อมระบบความปลอดภัย SSL ฟรี",
        desc: "สร้างความมั่นใจให้ผู้ซื้อด้วยการเชื่อมต่อโดเมนส่วนตัว (.com, .net, .co.th ฯลฯ) มาพร้อมใบรับรองความปลอดภัย SSL ฟรี และคู่มือตั้งค่า DNS ภายใน 1 คลิก",
        points: [
          "เชื่อมต่อโดเมนส่วนตัวได้ง่าย ไม่ต้องมีความรู้ด้านเซิร์ฟเวอร์",
          "ใบรับรอง SSL / HTTPS ฟรี ทำงานตลอด 24 ชั่วโมง",
          "ซ่อนโลโก้และชื่อแพลตฟอร์ม etalase.online ทั้งหมด (White-label)",
          "เชื่อมต่อกับ Google Analytics 4 และ Meta Pixel ได้ทันที",
        ],
        previewImg: "/images/demo/product-ebook.jpg",
      },
      {
        id: "standee",
        groupKey: "tools",
        icon: Printer,
        badge: "การตลาดจากหน้าร้านสู่โลกออนไลน์",
        title: "สแตนดี้หน้าร้านและตัวสร้าง QR",
        target: "เจ้าของร้านกาแฟ, คาเฟ่, ร้านอาหาร, บูติกเสื้อผ้า และร้านค้าที่มีหน้าร้าน",
        headline: "พิมพ์ป้ายตั้งโต๊ะและสแตนดี้ QR Code พร้อมวางที่เคาน์เตอร์แคชเชียร์",
        desc: "ดาวน์โหลดไฟล์พิมพ์สแตนดี้อะคริลิกความละเอียดสูงที่มี QR หน้าร้านของคุณ เบอร์ WhatsApp สำหรับสั่งซื้อ และลิงก์รีวิว Google Maps 5 ดาว เพื่อเพิ่มยอดขายและสร้างชื่อเสียงให้กับร้านค้าจริงของคุณ",
        points: [
          "ไฟล์ความละเอียดสูงพร้อมพิมพ์ขนาด A5 และการ์ดตั้งโต๊ะ",
          "QR Code อัจฉริยะที่ยังคงใช้งานได้ตลอดไป แม้คุณจะเปลี่ยนรายการสินค้าในร้าน",
          "ปุ่มกระตุ้นการรีวิว Google Maps 5 ดาวในตัว",
          "ดีไซน์สวยงามสไตล์ Warm Editorial เข้ากับการตกแต่งร้านค้าสมัยใหม่",
        ],
        previewImg: "/images/demo/product-mic.jpg",
      },
    ],
  },
  vi: {
    badge: "Danh Mục Tính Năng Toàn Diện",
    h1: "Một Nền Tảng, Mọi Hình Thức Bán Hàng.",
    subtitle:
      "Được thiết kế để tối ưu hóa thương mại trực tiếp tại Đông Nam Á. Từ tự động hóa sản phẩm số đến trưng bày showroom sản phẩm giá trị cao.",
    groupSales: "📦 Hình Thức Bán Hàng (Những Gì Bạn Bán)",
    groupTools: "⚡ Công Cụ Quản Trị (Cách Bạn Vận Hành)",
    suitableFor: "Phù hợp với:",
    keyAdvantages: "Ưu Thế Vượt Trội:",
    ctaPrimary: "Trải Nghiệm Tính Năng Này",
    ctaSecondary: "Xem Ví Dụ Tại Trang Giải Pháp →",
    items: [
      {
        id: "digital",
        groupKey: "sales",
        icon: Zap,
        badge: "Gửi Tự Động Qua WA",
        title: "Sản Phẩm Số & Khóa Học",
        target: "Nhà sáng tạo nội dung, giảng viên, huấn luyện viên, nhà thiết kế & nhiếp ảnh.",
        headline: "Bán File Kỹ Thuật Số với Tính Năng Tự Động Gửi Qua WhatsApp 24/7.",
        desc: "Bán e-book, template Canva/Notion, preset Lightroom, hoặc khóa học video. Khi thanh toán được xác thực trong 2 giây, hệ thống đám mây sẽ tự động gửi hóa đơn và liên kết tải tài liệu trực tiếp tới WhatsApp của người mua.",
        points: [
          "Tự động gửi tài liệu tức thì vào WhatsApp của khách hàng",
          "Đóng dấu bản quyền PDF chống sao chép (in tên & số điện thoại người mua)",
          "Tích hợp linh hoạt Google Drive, tải file trực tiếp hoặc liên kết Notion",
          "Hỗ trợ tạo mã giảm giá và giới hạn số lượt tải cho mỗi người mua",
        ],
        previewImg: "/images/demo/product-ebook.jpg",
      },
      {
        id: "katalog",
        groupKey: "sales",
        icon: Store,
        badge: "Showroom & Menu QR",
        title: "Danh Mục Hiện Vật & Showroom",
        target: "Tư vấn viên ô tô/xe máy, môi giới bất động sản, quán cafe/nhà hàng & bán lẻ.",
        headline: "Trưng Bày Sản Phẩm với Bảng Tính Trả Góp và Chat Tư Vấn Tự Động.",
        desc: "Trưng bày xe hơi, bất động sản, thời trang hoặc thực đơn ăn uống. Tích hợp nút 'Tư Vấn Sản Phẩm' qua WhatsApp tự động đính kèm tên và thông số sản phẩm vào tin nhắn.",
        points: [
          "Tùy chọn hiển thị giá cố định, khoảng giá hoặc nút 'Liên Hệ Báo Giá'",
          "Công cụ tính tiền trả trước và lịch trả góp hàng tháng cho ô tô/bất động sản",
          "Thực đơn quét mã QR tại bàn cho quán cafe & nhà hàng không cần cài app",
          "Lựa chọn phân loại màu sắc và kích cỡ hiển thị sắc nét trên điện thoại",
        ],
        previewImg: "/images/demo/product-car-suv.jpg",
      },
      {
        id: "affiliate",
        groupKey: "sales",
        icon: ShoppingBag,
        badge: "Đa Nền Tảng SEA",
        title: "Tiếp Thị Liên Kết Giỏ Vàng",
        target: "Nhà sáng tạo TikTok, người làm video Shopee & người có sức ảnh hưởng.",
        headline: "Gom Toàn Bộ Link Đề Xuất Mua Sắm Vào Một Bio Link Duy Nhất.",
        desc: "Tập hợp hàng trăm sản phẩm tiếp thị TikTok Shop (Giỏ Vàng), Shopee Mall và Lazada vào một giao diện hình ảnh đẹp mắt. Người mua chạm vào sản phẩm sẽ mở thẳng ứng dụng mua sắm kèm mã tiếp thị của bạn.",
        points: [
          "Deep link trực tiếp mở ứng dụng sàn thương mại trên điện thoại người mua",
          "Phân loại danh mục ngăn nắp (Chăm sóc da, Thời trang, Đồ gia dụng)",
          "An toàn trước thuật toán quét link nhờ sở hữu tên miền phụ độc lập",
          "Báo cáo số lượt nhấp chuột theo từng sản phẩm để tối ưu doanh thu",
        ],
        previewImg: "/images/demo/product-mic.jpg",
      },
      {
        id: "booking",
        groupKey: "sales",
        icon: Calendar,
        badge: "Đồng Bộ Lịch Hẹn",
        title: "Đặt Lịch 1-kèm-1 & Tư Vấn",
        target: "Chuyên gia tài chính, bác sĩ, huấn luyện viên, nhiếp ảnh gia & cố vấn.",
        headline: "Kiếm Tiền Từ Chuyên Môn Mà Không Mất Thời Gian Sắp Xếp Lịch Thủ Công.",
        desc: "Mở các buổi tư vấn trực tiếp hoặc cố vấn dự án 1-kèm-1. Khách hàng chủ động chọn ngày và khung giờ còn trống từ storefront của bạn, hoàn tất thanh toán và nhận link Google Meet tự động.",
        points: [
          "Bảng chọn ngày và khung giờ trống đồng bộ theo thời gian thực",
          "Tùy chỉnh thời lượng buổi hẹn (30 phút, 60 phút, hoặc gói dài hạn)",
          "Tin nhắn nhắc hẹn tự động trước 24 giờ qua WhatsApp giảm thiểu việc vắng mặt",
          "Bắt buộc thanh toán trước để loại bỏ tình trạng hủy lịch phút chót",
        ],
        previewImg: "/images/demo/product-mentoring.jpg",
      },
      {
        id: "event",
        groupKey: "sales",
        icon: Ticket,
        badge: "Vé Điện Tử & Nhắc Hẹn",
        title: "Sự Kiện Trực Tuyến & Webinar",
        target: "Người tổ chức hội thảo, cộng đồng học tập, diễn giả & đơn vị sự kiện.",
        headline: "Bán Vé Sự Kiện Trực Tuyến Hoặc Trực Tiếp Không Lo Phí Nền Tảng Đắt Đỏ.",
        desc: "Quản lý đăng ký tham gia webinar Zoom/Meet hoặc hội thảo thực tế. Kiểm soát số lượng chỗ theo thời gian thực, vé điện tử có mã quét gửi qua WhatsApp và nhắc lịch vào ngày diễn ra.",
        points: [
          "Giới hạn số lượng người tham gia tự động đóng cổng khi hết vé",
          "Vé số kèm mã đăng ký duy nhất gửi trực tiếp tới WhatsApp khách hàng",
          "Phân tầng hạng vé linh hoạt (Vé Sớm, Vé Tiêu Chuẩn, Vé VIP)",
          "Bảo mật liên kết phòng họp chỉ dành riêng cho người đã thanh toán",
        ],
        previewImg: "/images/demo/product-mentoring.jpg",
      },
      {
        id: "chat-order",
        groupKey: "tools",
        icon: MessageCircle,
        badge: "0% Phí Nền Tảng",
        title: "Đặt Hàng Trực Tiếp Qua WhatsApp",
        target: "Mọi doanh nghiệp muốn bảo toàn trọn vẹn 100% tỷ suất lợi nhuận.",
        headline: "Tiếp Nhận Đơn Hàng Thẳng Vào Tin Nhắn Chat Không Mất Phí.",
        desc: "Mỗi đơn hàng trên storefront của bạn có thể được chuyển thành tin nhắn WhatsApp soạn sẵn đầy đủ chi tiết sản phẩm, tổng tiền và địa chỉ người mua. Bạn chốt đơn trực tiếp trong chat với 0% phí hoa hồng sàn.",
        points: [
          "Định dạng tin nhắn đặt hàng soạn sẵn, khách chỉ cần chạm nút gửi",
          "0% phí hoa hồng sàn cho mọi đơn hàng tiếp nhận qua kênh chat",
          "Hỗ trợ phân chia nhiều số WhatsApp CSKH cho đội ngũ tư vấn",
          "Tương thích với ứng dụng nhắn tin phổ biến trong khu vực (Zalo tại Việt Nam, LINE tại Thái Lan)",
        ],
        previewImg: "/images/demo/product-car-suv.jpg",
      },
      {
        id: "fintech",
        groupKey: "tools",
        icon: ShieldCheck,
        badge: "Xác Thực Trong 2 Giây",
        title: "Thanh Toán QR Tức Thì & FinTech",
        target: "Người bán muốn tự động hóa thanh toán mà không phải đối soát sao kê thủ công.",
        headline: "Cổng Thanh Toán Tự Động với Tùy Chọn Miễn Phí Giao Dịch.",
        desc: "Chấp nhận thanh toán bằng mã QR từ tất cả ứng dụng ngân hàng và ví điện tử. Tính năng Convenience Fee cho phép người mua trả phí giao dịch để bạn giữ trọn 100% doanh thu thuần.",
        points: [
          "Tự động xác nhận giao dịch trong 2 giây không cần chụp màn hình chuyển khoản",
          "Linh hoạt phí giao dịch: người bán chi trả hoặc người mua thanh toán",
          "Hỗ trợ rút tiền hàng ngày về tài khoản ngân hàng nội địa",
          "Tương thích với chuẩn QR khu vực Đông Nam Á (VietQR, PromptPay, DuitNow, QRIS)",
        ],
        previewImg: "/images/demo/product-preset.jpg",
      },
      {
        id: "domain",
        groupKey: "tools",
        icon: Globe,
        badge: "SEO & Uy Tín Thương Hiệu",
        title: "Tên Miền Riêng Của Bạn",
        target: "Doanh nghiệp muốn xây dựng thương hiệu uy tín và bền vững.",
        headline: "Kết Nối Tên Miền Cá Nhân (namabrand.com) Kèm Chứng Chỉ SSL Miễn Phí.",
        desc: "Nâng cao niềm tin của người mua bằng việc gắn tên miền riêng (.com, .vn, .store v.v.). Tích hợp chứng chỉ bảo mật SSL miễn phí và hướng dẫn cài đặt DNS nhanh chóng.",
        points: [
          "Trỏ tên miền dễ dàng không đòi hỏi kiến thức quản trị máy chủ phức tạp",
          "Tự động cấp phát chứng chỉ bảo mật SSL / HTTPS miễn phí",
          "Ẩn toàn bộ dấu ấn thương hiệu nền tảng etalase.online (White-label)",
          "Kết nối ngay lập tức với Google Analytics 4 và Meta Pixel",
        ],
        previewImg: "/images/demo/product-ebook.jpg",
      },
      {
        id: "standee",
        groupKey: "tools",
        icon: Printer,
        badge: "Tiếp Thị Offline Lên Online",
        title: "Standee Quầy Thu Ngân & Tạo Mã QR",
        target: "Chủ quán cafe, nhà hàng, cửa hàng thời trang & điểm bán trực tiếp.",
        headline: "In Biển Để Bàn & Standee Mã QR Đặt Ngay Tại Quầy.",
        desc: "Tải file in standee mica độ phân giải cao chứa mã QR gian hàng của bạn, số điện thoại WhatsApp đặt hàng và liên kết đánh giá 5 sao Google Maps để gia tăng uy tín cho cửa hàng thực tế.",
        points: [
          "Định dạng tệp in sắc nét khổ A5 và thẻ để bàn",
          "Mã QR động luôn hoạt động ngay cả khi bạn thay đổi danh mục món",
          "Tích hợp nút kêu gọi đánh giá 5 sao Google Maps",
          "Thiết kế phong cách Warm Editorial sang trọng phù hợp với không gian quán",
        ],
        previewImg: "/images/demo/product-mic.jpg",
      },
    ],
  },
};

export function FiturClient({ locale }: { locale: SupportedLocale }) {
  const currentLocaleData = FEATURE_DATA[locale] || FEATURE_DATA.id;
  const featureItems = currentLocaleData.items;

  const [activeTab, setActiveTab] = useState<string>("digital");
  const detailRef = useRef<HTMLDivElement>(null);

  // Helper to map URL hash or alias to actual tab id
  const resolveTabId = useCallback((hashString: string) => {
    const clean = hashString
      .replace(/^#/, "")
      .replace(/^(detail-|tab-link-)/, "")
      .toLowerCase()
      .trim();
    if (!clean) return null;
    if (clean === "chat" || clean === "whatsapp" || clean === "wa") return "chat-order";
    if (clean === "qris" || clean === "payment" || clean === "bayar") return "fintech";
    if (clean === "customdomain" || clean === "custom-domain") return "domain";
    if (clean === "qr" || clean === "qrcode" || clean === "cetak") return "standee";
    if (clean === "ebook" || clean === "file") return "digital";
    if (clean === "showroom" || clean === "mobil" || clean === "properti") return "katalog";
    if (clean === "keranjang-kuning" || clean === "tiktok") return "affiliate";
    if (clean === "jadwal" || clean === "konsultasi") return "booking";
    if (clean === "webinar" || clean === "tiket") return "event";

    const match = featureItems.find((f) => f.id === clean);
    return match ? match.id : null;
  }, [featureItems]);

  // Sync state with URL hash on mount & on popstate / hashchange
  useEffect(() => {
    const handleHashSync = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const resolved = resolveTabId(window.location.hash);
        if (resolved) {
          setActiveTab(resolved);
        }
      }
    };

    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    window.addEventListener("popstate", handleHashSync);
    return () => {
      window.removeEventListener("hashchange", handleHashSync);
      window.removeEventListener("popstate", handleHashSync);
    };
  }, [resolveTabId]);

  const handleSelectTab = (tabId: string, shouldScrollMobile: boolean = false) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${tabId}`);
      if (shouldScrollMobile && window.innerWidth < 1024 && detailRef.current) {
        detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const currentItem = featureItems.find((f) => f.id === activeTab) || featureItems[0];

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />

      {/* Header Halaman */}
      <section className="pt-16 pb-12 px-4 sm:px-6 text-center max-w-6xl mx-auto w-full">
        <div className="max-w-3xl mx-auto">
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
        </div>
      </section>

      {/* Split-Panel Interactive Showcase */}
      <section className="pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        {/* Hidden SEO Anchors for direct search engine crawler discovery */}
        <div className="sr-only" aria-hidden="true">
          {featureItems.map((item) => (
            <div key={item.id} id={item.id} className="scroll-mt-24" />
          ))}
          <div id="whatsapp" className="scroll-mt-24" />
          <div id="qris" className="scroll-mt-24" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigasi Kiri */}
          <div className="lg:col-span-5 space-y-6">
            {/* Kelompok 1: Jenis Jualan */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] px-2 mb-2.5">
                {currentLocaleData.groupSales}
              </div>
              <div className="space-y-1.5">
                {featureItems
                  .filter((item) => item.groupKey === "sales")
                  .map((item) => {
                    const Icon = item.icon;
                    const isSelected = activeTab === item.id;
                    return (
                      <a
                        key={item.id}
                        id={`tab-link-${item.id}`}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectTab(item.id, true);
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
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
                          <div>
                            <div className="text-xs font-bold text-[#1C1917]">{item.title}</div>
                            <div className="text-[11px] text-[#57534E]">{item.badge}</div>
                          </div>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? "text-[#D94E28] translate-x-1" : "text-stone-300"
                          }`}
                        />
                      </a>
                    );
                  })}
              </div>
            </div>

            {/* Kelompok 2: Alat Bantu Bisnis */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] px-2 mb-2.5">
                {currentLocaleData.groupTools}
              </div>
              <div className="space-y-1.5">
                {featureItems
                  .filter((item) => item.groupKey === "tools")
                  .map((item) => {
                    const Icon = item.icon;
                    const isSelected = activeTab === item.id;
                    return (
                      <a
                        key={item.id}
                        id={`tab-link-${item.id}`}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectTab(item.id, true);
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
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
                          <div>
                            <div className="text-xs font-bold text-[#1C1917]">{item.title}</div>
                            <div className="text-[11px] text-[#57534E]">{item.badge}</div>
                          </div>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? "text-[#D94E28] translate-x-1" : "text-stone-300"
                          }`}
                        />
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Panel Detail Kanan - tampilkan hanya fitur yang dipilih secara visual, tetap indexable di DOM */}
          <div ref={detailRef} className="lg:col-span-7 scroll-mt-24">
            {featureItems.map((item) => {
              const isSelected = activeTab === item.id;
              return (
                <article
                  key={item.id}
                  id={`detail-${item.id}`}
                  aria-hidden={!isSelected}
                  className={
                    isSelected
                      ? "bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 transition-all duration-300"
                      : "sr-only"
                  }
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] border border-[#FADCD3] px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] mt-4 tracking-tight">
                      {item.headline}
                    </h2>
                    <p className="text-[#57534E] text-sm sm:text-base leading-relaxed mt-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Baris "Cocok untuk: ..." */}
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl text-xs">
                    <span className="font-bold text-[#1C1917]">{currentLocaleData.suitableFor} </span>
                    <span className="text-[#57534E]">{item.target}</span>
                  </div>

                  {/* Visual Hero Image for the Feature */}
                  <div className="w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-stone-100 border border-[#E7E5E4] relative shadow-2xs">
                    <img
                      src={item.previewImg}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Manfaat Utama */}
                  <div className="space-y-2 pt-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#1C1917]">
                      {currentLocaleData.keyAdvantages}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#57534E]">
                      {item.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <Link
                      href={getLocalizedHref("/register")}
                      className="w-full sm:w-auto bg-[#D94E28] hover:bg-[#B83E1D] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-1.5"
                    >
                      <span>{currentLocaleData.ctaPrimary}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={getLocalizedHref("/solusi")}
                      className="text-xs font-semibold text-[#57534E] hover:text-[#1C1917]"
                    >
                      {currentLocaleData.ctaSecondary}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
