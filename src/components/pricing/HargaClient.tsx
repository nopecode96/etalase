"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Check, X, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

interface ComparisonRow {
  feature: string;
  detail?: string;
  free: React.ReactNode;
  pro: React.ReactNode;
  dfy: React.ReactNode;
}

interface ComparisonCategory {
  title: string;
  rows: ComparisonRow[];
}

interface PricingTierData {
  badge: string;
  title: string;
  desc: string;
  price: string;
  period: string;
  billedYearly?: string;
  points: React.ReactNode[];
  buttonText: string;
}

interface PricingPageData {
  badge: string;
  h1: string;
  subtitle: string;
  billingMonthly: string;
  billingYearly: string;
  saveBadge: string;
  popularBadge: string;
  freeTier: PricingTierData;
  proTier: {
    badge: string;
    title: string;
    desc: string;
    monthlyPrice: string;
    yearlyPrice: string;
    period: string;
    billedYearly: string;
    points: React.ReactNode[];
    buttonText: string;
  };
  dfyTier: PricingTierData;
  tableTitle: string;
  tableSubtitle: string;
  comparison: ComparisonCategory[];
}

export const PRICING_LOCALES: Record<SupportedLocale, PricingPageData> = {
  id: {
    badge: "Transparan • 0% Komisi Order Chat",
    h1: "Harga Sederhana untuk Semua Skala Bisnis.",
    subtitle:
      "Mulai gratis hari ini tanpa batas waktu trial. Upgrade ke Pro kapan saja untuk custom domain dan fitur otomasi FinTech penuh.",
    billingMonthly: "Tagihan Bulanan",
    billingYearly: "Tagihan Tahunan (Hemat 20%)",
    saveBadge: "HEMAT 20%",
    popularBadge: "PALING DIMINATI",
    freeTier: {
      badge: "Gratis Selamanya",
      title: "Free Tier",
      desc: "Solusi lengkap untuk kreator & UMKM pemula yang ingin langsung jualan.",
      price: "Rp 0",
      period: "/selamanya",
      points: [
        "1 Subdomain Mandiri (namamu.etalase.online)",
        "0% Komisi Order Jalur WhatsApp (0 rupiah)",
        "Produk & Tautan Tanpa Batas (Unlimited)",
        "1 Template Desain Dasar (Upgrade PRO untuk +3 Template Premium)",
        "Katalog Foto & Spesifikasi Unit Lengkap",
        "QRIS Otomatis 4.5% (min Rp 3.000) — atau 0% via Jalur Chat/WhatsApp",
        "Notifikasi Order Real-time via Telegram & Link File Otomatis",
        "Watermark PDF Anti-Bajak Otomatis",
        "Standee QR Kasir Siap Cetak (A5/Akrilik)",
        "Pencairan Saldo (Payout): Min. Rp 50.000 (Fee Rp 5.000/penarikan)",
      ],
      buttonText: "Mulai Gratis Sekarang",
    },
    proTier: {
      badge: "Pebisnis & Showroom Pro",
      title: "PRO Tier",
      desc: "Dirancang untuk brand bertumbuh yang membutuhkan domain sendiri & fee rendah.",
      monthlyPrice: "Rp 49.000",
      yearlyPrice: "Rp 39.000",
      period: "/bulan",
      billedYearly: "Ditagih tahunan Rp 468.000 / tahun",
      points: [
        "Semua fitur di Paket Gratis + 4 Template Desain Lengkap",
        "Custom Domain Pribadi (.com, .id, dll.) + SSL Gratis",
        "Hapus Seluruh Branding etalase.online",
        "Fee QRIS Hemat: Hanya 2% (min Rp 3.000) — hemat 56% vs paket FREE",
        "Convenience Fee: Alihkan biaya ke pembeli → Toko dapat 100% harga penuh",
        "Pencairan Saldo (Payout): Min. Rp 50.000 (GRATIS fee 4x/bulan)",
        "Integrasi Meta Pixel (CAPI) & Google Analytics 4",
        "Kode Promo & Diskon Bertingkat",
        "Rotasi Multi-Nomor WhatsApp Sales Admin",
        "Dukungan CS Prioritas via WhatsApp",
      ],
      buttonText: "Pilih Paket Pro",
    },
    dfyTier: {
      badge: "Layanan Terima Beres",
      title: "DFY Concierge",
      desc: "Tim desainer & copywriter kami yang membuatkan toko Anda sampai siap terima order.",
      price: "Rp 899.000",
      period: "/sekali bayar",
      points: [
        "Termasuk Langganan PRO 1 Tahun Penuh (Senilai Rp 468.000)",
        "Riset Desain & Copywriting Banner Toko Profesional",
        "Input Maksimal 25 Produk Lengkap dengan Foto & Copy Sales",
        "Integrasi Domain & Pengaturan DNS Terima Beres",
        "Setup Bot WhatsApp Auto-Delivery & Format Chat Order",
        "File Desain Siap Cetak Standee Akrilik Meja Kasir Khusus",
        "Selesai & Siap Jualan dalam 24 Jam Kerja",
        "Sesi Konsultasi Private 1-on-1 via Google Meet (45 Menit)",
      ],
      buttonText: "Pesan Layanan Terima Beres",
    },
    tableTitle: "Perbandingan Fitur Lengkap",
    tableSubtitle: "Pilih paket yang paling sesuai dengan target pertumbuhan tokomu.",
    comparison: [
      {
        title: "Toko & Personalisasi Brand",
        rows: [
          {
            feature: "Subdomain Mandiri (namamu.etalase.online)",
            detail: "Website storefront independen siap pakai",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Custom Domain Pribadi (namabrand.com)",
            detail: "Gunakan nama domain sendiri dengan sertifikat SSL gratis",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Hapus Branding 'Powered by etalase.online'",
            detail: "Tampilan toko 100% white-label profesional",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Jumlah Produk & Tautan",
            detail: "Bebas pajang katalog tanpa dibatasi kuota",
            free: <span className="text-xs font-semibold text-[#1C1917]">Unlimited</span>,
            pro: <span className="text-xs font-semibold text-[#1C1917]">Unlimited</span>,
            dfy: <span className="text-xs font-semibold text-[#1C1917]">Unlimited (25 diinputkan)</span>,
          },
          {
            feature: "Pilihan Arketipe Template",
            detail: "Clean Minimal, Visual Menu, Showroom Pro, Editorial Pastel",
            free: <span className="text-xs font-semibold text-[#1C1917]">4 Arketipe</span>,
            pro: <span className="text-xs font-semibold text-[#1C1917]">4 Arketipe</span>,
            dfy: <span className="text-xs font-semibold text-[#1C1917]">Didesainkan Khusus</span>,
          },
        ],
      },
      {
        title: "Penjualan & FinTech",
        rows: [
          {
            feature: "Komisi Pesanan Jalur WhatsApp",
            detail: "Closing order langsung di WhatsApp tanpa potongan",
            free: <span className="text-xs font-bold text-emerald-600">0% (Gratis)</span>,
            pro: <span className="text-xs font-bold text-emerald-600">0% (Gratis)</span>,
            dfy: <span className="text-xs font-bold text-emerald-600">0% (Gratis)</span>,
          },
          {
            feature: "Biaya Transaksi QRIS Instan BorderPay",
            detail: "Verifikasi pembayaran otomatis dalam 2 detik",
            free: <span className="text-xs font-semibold text-[#57534E]">4.5% (min Rp 3.000)</span>,
            pro: <span className="text-xs font-bold text-[#D94E28]">2% (min Rp 3.000)</span>,
            dfy: <span className="text-xs font-bold text-[#D94E28]">2% (min Rp 3.000)</span>,
          },
          {
            feature: "Opsi Biaya Ditanggung Pembeli (*Convenience Fee*)",
            detail: "Keuntungan Anda tetap 100% utuh tanpa dipotong",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Biaya Pencairan Saldo (Payout)",
            detail: "Transfer saldo penjualan ke seluruh bank di Indonesia",
            free: <span className="text-xs text-[#57534E]">Rp 5.000 / transfer</span>,
            pro: <span className="text-xs font-bold text-emerald-600">GRATIS 4x / bulan</span>,
            dfy: <span className="text-xs font-bold text-emerald-600">GRATIS 4x / bulan</span>,
          },
          {
            feature: "Auto-Delivery Berkas Digital ke WhatsApp",
            detail: "Kirim struk & link download otomatis 24 jam",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Watermark PDF Dinamis Anti-Bajak",
            detail: "Cetak otomatis nama & nomor HP pembeli di setiap halaman PDF",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
        ],
      },
      {
        title: "Pemasaran & Analitik",
        rows: [
          {
            feature: "Voucher Diskon & Kode Promo Bertingkat",
            detail: "Atur kupon potongan harga dengan batas kuota penggunaan",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Integrasi Meta Pixel (CAPI) & TikTok Ads",
            detail: "Lacak konversi iklan digital akurat dengan Server-Side Tracking",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Desain Banner & Pengaturan Toko oleh Tim",
            detail: "Toko langsung jadi tanpa Anda harus meluangkan waktu setup",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            dfy: <span className="text-xs font-bold text-emerald-700">✅ Termasuk (24 Jam)</span>,
          },
          {
            feature: "Dukungan Pelanggan WhatsApp",
            detail: "Jalur komunikasi bantuan teknis",
            free: <span className="text-xs text-[#57534E]">Standar</span>,
            pro: <span className="text-xs font-semibold text-[#D94E28]">Prioritas</span>,
            dfy: <span className="text-xs font-bold text-[#1C1917]">Prioritas + 1-on-1 Meet</span>,
          },
        ],
      },
    ],
  },
  en: {
    badge: "Transparent • 0% Chat Commission",
    h1: "Predictable Pricing for Growing Businesses.",
    subtitle:
      "Start free today with no trial expiration. Upgrade to Pro anytime for custom apex domains and full FinTech automation.",
    billingMonthly: "Billed Monthly",
    billingYearly: "Billed Annually (Save 20%)",
    saveBadge: "SAVE 20%",
    popularBadge: "MOST POPULAR",
    freeTier: {
      badge: "Free Forever",
      title: "Free Tier",
      desc: "Complete storefront setup for creators and SMBs starting direct sales.",
      price: "$0",
      period: "/forever",
      points: [
        "1 Dedicated Subdomain (yourname.etalase.online)",
        "0% Chat Order Platform Commission ($0 cut)",
        "Unlimited Products & Showcase Links",
        "All 4 Design Template Archetypes",
        "High-Res Catalogs & Detailed Specifications",
        "Instant Regional QR Processing (4.5% min $1.00 fee)",
        "Automated Digital File Delivery to Buyer WhatsApp",
        "Dynamic Anti-Piracy PDF Watermarking",
        "Print-Ready Counter QR Standee (A5 Acrylic)",
        "Local Payouts: $0.50 per withdrawal request",
      ],
      buttonText: "Start Free Forever",
    },
    proTier: {
      badge: "Sovereign Commerce",
      title: "PRO Tier",
      desc: "Built for scaling brands requiring personal domains and lower transaction fees.",
      monthlyPrice: "$3.99",
      yearlyPrice: "$2.99",
      period: "/month",
      billedYearly: "Billed annually $35.88 / year",
      points: [
        "Everything included in Free Plan",
        "Custom Apex Domain (.com, .store, etc.) + Free SSL",
        "Remove All etalase.online Platform Branding",
        "Discounted QR Processing: Only 2% (min $2.00 fee)",
        "'Convenience Fee' Option: Pass transaction fees to buyers",
        "Bank Payouts: 4x FREE every month",
        "Meta Pixel (CAPI) & Google Analytics 4 Integrations",
        "Tiered Promo Codes & Discount Vouchers",
        "Multi-Agent WhatsApp Sales Lead Rotation",
        "Priority Customer Support via WhatsApp",
      ],
      buttonText: "Choose Pro Tier",
    },
    dfyTier: {
      badge: "Done-For-You Service",
      title: "DFY Concierge",
      desc: "Our copywriters and designers build and launch your complete storefront.",
      price: "$59",
      period: "/one-time fee",
      points: [
        "Includes 1 Full Year of PRO Subscription (Worth $35.88)",
        "Custom Visual Branding & High-Converting Copywriting",
        "Catalog Onboarding: Up to 25 items with photos & copy",
        "Custom Domain Setup & DNS Routing Handled End-to-End",
        "WhatsApp Automation Setup & Chat Order Template Tuning",
        "Custom High-Resolution Cashier Counter Standee Design",
        "Delivered & Live Within 24 Business Hours",
        "1-on-1 Strategy Session via Google Meet (45 Mins)",
      ],
      buttonText: "Order DFY Concierge",
    },
    tableTitle: "Comprehensive Feature Breakdown",
    tableSubtitle: "Compare options to choose the right trajectory for your business.",
    comparison: [
      {
        title: "Storefront & Brand Authority",
        rows: [
          {
            feature: "Dedicated Subdomain (yourname.etalase.online)",
            detail: "Ready-to-use sovereign mobile storefront",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Custom Apex Domain (yourbrand.com)",
            detail: "Map personal domain with automated SSL encryption",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Remove 'Powered by etalase.online' Branding",
            detail: "100% white-label professional storefront appearance",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Product & Link Capacity",
            detail: "Display catalogs without artificial catalog ceilings",
            free: <span className="text-xs font-semibold text-[#1C1917]">Unlimited</span>,
            pro: <span className="text-xs font-semibold text-[#1C1917]">Unlimited</span>,
            dfy: <span className="text-xs font-semibold text-[#1C1917]">Unlimited (25 pre-loaded)</span>,
          },
          {
            feature: "Design Archetypes Selection",
            detail: "Clean Minimal, Visual Menu, Showroom Pro, Editorial Pastel",
            free: <span className="text-xs font-semibold text-[#1C1917]">All 4 Archetypes</span>,
            pro: <span className="text-xs font-semibold text-[#1C1917]">All 4 Archetypes</span>,
            dfy: <span className="text-xs font-semibold text-[#1C1917]">Custom Curated</span>,
          },
        ],
      },
      {
        title: "Sales & Transactions",
        rows: [
          {
            feature: "Chat Order Commission Rate",
            detail: "Direct WhatsApp checkouts without platform cuts",
            free: <span className="text-xs font-bold text-emerald-600">0% (Free)</span>,
            pro: <span className="text-xs font-bold text-emerald-600">0% (Free)</span>,
            dfy: <span className="text-xs font-bold text-emerald-600">0% (Free)</span>,
          },
          {
            feature: "Instant QR Transaction Fee",
            detail: "Automated payment verification in 2 seconds",
            free: <span className="text-xs font-semibold text-[#57534E]">4.5% (min $1.00)</span>,
            pro: <span className="text-xs font-bold text-[#D94E28]">2% (min $2.00)</span>,
            dfy: <span className="text-xs font-bold text-[#D94E28]">2% (min $2.00)</span>,
          },
          {
            feature: "Buyer-Covered Convenience Fee Option",
            detail: "Preserve 100% of your earnings by passing fees to buyers",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Payout Withdrawal Fees",
            detail: "Direct fund transfers to local banking accounts",
            free: <span className="text-xs text-[#57534E]">$0.50 / transfer</span>,
            pro: <span className="text-xs font-bold text-emerald-600">4x FREE / month</span>,
            dfy: <span className="text-xs font-bold text-emerald-600">4x FREE / month</span>,
          },
          {
            feature: "Automated WhatsApp Digital File Dispatch",
            detail: "Instant receipts and authenticated download links 24/7",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Dynamic Anti-Piracy PDF Watermarking",
            detail: "Prints buyer name & phone details across document pages",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
        ],
      },
      {
        title: "Marketing & Analytics",
        rows: [
          {
            feature: "Promo Codes & Tiered Discounts",
            detail: "Configurable coupon codes with redemption caps",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Meta Pixel (CAPI) & TikTok Ads",
            detail: "High-accuracy server-side event tracking for ad scaling",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Storefront Design & Cataloging by Concierge",
            detail: "Turnkey operational setup handled by our specialists",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            dfy: <span className="text-xs font-bold text-emerald-700">✅ Included (24 Hours)</span>,
          },
          {
            feature: "WhatsApp Customer Support",
            detail: "Direct support communication channels",
            free: <span className="text-xs text-[#57534E]">Standard</span>,
            pro: <span className="text-xs font-semibold text-[#D94E28]">Priority</span>,
            dfy: <span className="text-xs font-bold text-[#1C1917]">Priority + 1-on-1 Meet</span>,
          },
        ],
      },
    ],
  },
  ms: {
    badge: "Telus • 0% Komisen Pesanan Sembang",
    h1: "Harga Mudah untuk Pertumbuhan Bisnes Anda.",
    subtitle:
      "Mula secara percuma hari ini tanpa had tempoh percubaan. Naik taraf ke Pro bila-bila masa untuk domain sendiri dan yuran transaksi rendah.",
    billingMonthly: "Bayaran Bulanan",
    billingYearly: "Bayaran Tahunan (Jimat 20%)",
    saveBadge: "JIMAT 20%",
    popularBadge: "PILIHAN UTAMA",
    freeTier: {
      badge: "Percuma Selamanya",
      title: "Free Tier",
      desc: "Penyelesaian lengkap untuk pencipta & PKS yang ingin mula berniaga terus.",
      price: "RM 0",
      period: "/selamanya",
      points: [
        "1 Subdomain Sendiri (namamu.etalase.online)",
        "0% Komisen Pesanan Jalur WhatsApp (RM 0)",
        "Produk & Pautan Tanpa Had (Unlimited)",
        "Semua 4 Arketip Templat Reka Bentuk",
        "Katalog Foto & Spesifikasi Unit Lengkap",
        "Bayaran DuitNow/QR Pantas (Yuran 4.5% min RM 4.50)",
        "Penghantaran Fail Digital Automatik ke WhatsApp Pembeli",
        "Tera Air PDF Anti-Cetak Rompak Automatik",
        "Standee QR Kaunter Sedia Cetak (A5 Akrilik)",
        "Pengeluaran Baki: RM 1.50 bagi setiap pengeluaran",
      ],
      buttonText: "Mula Percuma Sekarang",
    },
    proTier: {
      badge: "Perniagaan & Showroom Pro",
      title: "PRO Tier",
      desc: "Direka khas untuk jenama yang memerlukan domain peribadi dan yuran rendah.",
      monthlyPrice: "RM 15",
      yearlyPrice: "RM 12",
      period: "/bulan",
      billedYearly: "Ditagih tahunan RM 144 / tahun",
      points: [
        "Semua ciri yang terdapat dalam Pelan Percuma",
        "Domain Kustom Peribadi (.com, .my dll.) + SSL Percuma",
        "Buang Semua Penjenamaan etalase.online",
        "Yuran Transaksi QR Murah: Hanya 2% (min RM 8.00)",
        "Ciri 'Convenience Fee': Yuran boleh ditanggung Pembeli",
        "Pengeluaran Baki: PERCUMA 4x setiap bulan",
        "Integrasi Meta Pixel (CAPI) & Google Analytics 4",
        "Kod Kupon Promosi & Diskaun Bertingkat",
        "Penggiliran Pelbagai Nombor WhatsApp Sales Admin",
        "Sokongan Pelanggan Keutamaan melalui WhatsApp",
      ],
      buttonText: "Pilih Pelan Pro",
    },
    dfyTier: {
      badge: "Perkhidmatan Terima Beres",
      title: "DFY Concierge",
      desc: "Pasukan pereka dan penulis kami membina etalase anda sehingga siap berniaga.",
      price: "RM 269",
      period: "/sekali bayar",
      points: [
        "Termasuk Langganan PRO 1 Tahun Penuh (Bernilai RM 144)",
        "Kajian Reka Bentuk & Penulisan Iklan Kedai Profesional",
        "Pemasukan Sehingga 25 Produk Lengkap dengan Foto & Copywriting",
        "Integrasi Domain & Tetapan DNS Terima Beres",
        "Tetapan Bot WhatsApp Penghantaran Fail & Format Pesanan",
        "Fail Reka Bentuk Sedia Cetak Standee Akrilik Meja Kaunter",
        "Siap & Boleh Berniaga dalam 24 Jam Bekerja",
        "Sesi Strategi 1-on-1 melalui Google Meet (45 Minit)",
      ],
      buttonText: "Tempah DFY Concierge",
    },
    tableTitle: "Perbandingan Ciri Penuh",
    tableSubtitle: "Pilih pelan yang bersesuaian dengan matlamat perniagaan anda.",
    comparison: [
      {
        title: "Kedai & Kredibiliti Jenama",
        rows: [
          {
            feature: "Subdomain Sendiri (namamu.etalase.online)",
            detail: "Laman storefront bebas sedia digunakan",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Domain Kustom Peribadi (namabrand.com)",
            detail: "Gunakan domain sendiri beserta sijil SSL percuma",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Buang Penjenamaan 'Powered by etalase.online'",
            detail: "Penampilan kedai 100% white-label profesional",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Kapasiti Produk & Pautan",
            detail: "Pamerkan katalog tanpa had bilangan barangan",
            free: <span className="text-xs font-semibold text-[#1C1917]">Tanpa Had</span>,
            pro: <span className="text-xs font-semibold text-[#1C1917]">Tanpa Had</span>,
            dfy: <span className="text-xs font-semibold text-[#1C1917]">Tanpa Had (25 dimuat naikkan)</span>,
          },
          {
            feature: "Pilihan Arketip Templat",
            detail: "Clean Minimal, Visual Menu, Showroom Pro, Editorial Pastel",
            free: <span className="text-xs font-semibold text-[#1C1917]">4 Arketip</span>,
            pro: <span className="text-xs font-semibold text-[#1C1917]">4 Arketip</span>,
            dfy: <span className="text-xs font-semibold text-[#1C1917]">Disesuaikan Khas</span>,
          },
        ],
      },
      {
        title: "Jualan & Transaksi",
        rows: [
          {
            feature: "Kadar Komisen Pesanan Sembang WhatsApp",
            detail: "Penutupan jualan terus di WhatsApp tanpa potongan",
            free: <span className="text-xs font-bold text-emerald-600">0% (Percuma)</span>,
            pro: <span className="text-xs font-bold text-emerald-600">0% (Percuma)</span>,
            dfy: <span className="text-xs font-bold text-emerald-600">0% (Percuma)</span>,
          },
          {
            feature: "Yuran Transaksi DuitNow / QR Pantas",
            detail: "Pengesahan bayaran automatik dalam 2 saat",
            free: <span className="text-xs font-semibold text-[#57534E]">4.5% (min RM 4.50)</span>,
            pro: <span className="text-xs font-bold text-[#D94E28]">2% (min RM 8.00)</span>,
            dfy: <span className="text-xs font-bold text-[#D94E28]">2% (min RM 8.00)</span>,
          },
          {
            feature: "Pilihan Yuran Ditanggung Pembeli (*Convenience Fee*)",
            detail: "Keuntungan anda kekal 100% utuh tanpa potongan",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Yuran Pengeluaran Baki",
            detail: "Pindahan wang jualan terus ke akaun bank tempatan",
            free: <span className="text-xs text-[#57534E]">RM 1.50 / pindahan</span>,
            pro: <span className="text-xs font-bold text-emerald-600">PERCUMA 4x / bulan</span>,
            dfy: <span className="text-xs font-bold text-emerald-600">PERCUMA 4x / bulan</span>,
          },
          {
            feature: "Penghantaran Fail Digital Automatik ke WhatsApp",
            detail: "Hantar resit & pautan muat turun automatik 24 jam",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Tera Air PDF Dinamik Anti-Cetak Rompak",
            detail: "Cetak nama & nombor telefon pembeli pada setiap halaman PDF",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
        ],
      },
      {
        title: "Pemasaran & Analitik",
        rows: [
          {
            feature: "Kupon Diskaun & Kod Promosi",
            detail: "Tetapkan kupon diskaun dengan had kuota penggunaan",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Integrasi Meta Pixel (CAPI) & TikTok Ads",
            detail: "Jejak penukaran iklan secara tepat dengan Server-Side Tracking",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Reka Bentuk Banner & Penataan Kedai oleh Pasukan",
            detail: "Kedai disiapkan tanpa perlu meluangkan masa membina",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            dfy: <span className="text-xs font-bold text-emerald-700">✅ Termasuk (24 Jam)</span>,
          },
          {
            feature: "Sokongan Pelanggan WhatsApp",
            detail: "Saluran komunikasi bantuan teknikal",
            free: <span className="text-xs text-[#57534E]">Biasa</span>,
            pro: <span className="text-xs font-semibold text-[#D94E28]">Keutamaan</span>,
            dfy: <span className="text-xs font-bold text-[#1C1917]">Keutamaan + Google Meet</span>,
          },
        ],
      },
    ],
  },
  th: {
    badge: "โปร่งใส • 0% ค่าคอมมิชชันแชต",
    h1: "แพ็กเกจราคาชัดเจนสำหรับทุกขนาดธุรกิจ",
    subtitle:
      "เริ่มต้นฟรีวันนี้ไม่มีหมดอายุ อัปเกรดเป็น Pro ได้ทุกเมื่อเพื่อเชื่อมต่อโดเมนส่วนตัวและระบบ FinTech เต็มรูปแบบ",
    billingMonthly: "ชำระแบบรายเดือน",
    billingYearly: "ชำระแบบรายปี (ประหยัด 20%)",
    saveBadge: "ประหยัด 20%",
    popularBadge: "ยอดนิยมอันดับ 1",
    freeTier: {
      badge: "ฟรีตลอดชีพ",
      title: "แพ็กเกจฟรี (Free Tier)",
      desc: "ระบบครบวงจรสำหรับครีเอเตอร์และผู้ประกอบการเริ่มต้นขายของออนไลน์ทันที",
      price: "฿0",
      period: "/ตลอดชีพ",
      points: [
        "1 ซับโดเมนส่วนตัว (yourname.etalase.online)",
        "0% ค่าคอมมิชชันคำสั่งซื้อทาง WhatsApp/LINE (ฟรี 100%)",
        "เพิ่มสินค้าและลิงก์ได้ไม่จำกัด (Unlimited)",
        "ใช้งานได้ครบทั้ง 4 รูปแบบแม่แบบเทมเพลต",
        "แคตตาล็อกรูปภาพและข้อมูลจำเพาะสินค้าครบถ้วน",
        "ระบบชำระเงิน PromptPay/QR ทันใจ (ค่าบริการ 4.5% ขั้นต่ำ ฿35)",
        "ระบบส่งไฟล์ดิจิทัลอัตโนมัติถึง WhatsApp ผู้ซื้อ 24 ชม.",
        "ระบบใส่ลายน้ำบน PDF ป้องกันการละเมิดลิขสิทธิ์อัตโนมัติ",
        "ไฟล์พิมพ์สแตนดี้ QR หน้าร้านขนาด A5 สำหรับตั้งที่เคาน์เตอร์",
        "การถอนเงินเข้าบัญชี: ฿15 ต่อครั้ง",
      ],
      buttonText: "เริ่มต้นใช้งานฟรี",
    },
    proTier: {
      badge: "ธุรกิจและโชว์รูมมืออาชีพ",
      title: "แพ็กเกจโปร (PRO Tier)",
      desc: "ออกแบบสำหรับแบรนด์ที่ต้องการสร้างความน่าเชื่อถือด้วยโดเมนส่วนตัวและค่าธรรมเนียมต่ำ",
      monthlyPrice: "฿119",
      yearlyPrice: "฿99",
      period: "/เดือน",
      billedYearly: "เรียกเก็บรายปี ฿1,188 / ปี",
      points: [
        "รวมทุกฟีเจอร์ในแพ็กเกจฟรี",
        "เชื่อมต่อโดเมนของคุณเอง (.com, .co.th ฯลฯ) + SSL ฟรี",
        "ซ่อนโลโก้และชื่อ etalase.online ทั้งหมด (White-label)",
        "ค่าธรรมเนียม QR ถูกพิเศษ: เพียง 2% (ขั้นต่ำ ฿60)",
        "ฟีเจอร์ 'Convenience Fee': ตั้งค่าให้ผู้ซื้อช่วยจ่ายค่าธรรมเนียมได้",
        "การถอนเงินเข้าบัญชี: ฟรี 4 ครั้งต่อเดือน",
        "เชื่อมต่อ Meta Pixel (CAPI) และ Google Analytics 4",
        "ระบบโค้ดส่วนลดและโปรโมชันตามขั้นบันได",
        "ระบบกระจายงานแอดมินหลายเบอร์ WhatsApp",
        "ฝ่ายบริการลูกค้าเร่งด่วนผ่าน WhatsApp",
      ],
      buttonText: "เลือกแพ็กเกจโปร",
    },
    dfyTier: {
      badge: "บริการทำให้พร้อมใช้ (DFY)",
      title: "บริการทำให้เสร็จสรรพ (DFY)",
      desc: "ทีมงานดีไซเนอร์และผู้เชี่ยวชาญสร้างและตั้งค่าหน้าร้านให้คุณจนพร้อมรับออเดอร์",
      price: "฿1,990",
      period: "/ชำระครั้งเดียว",
      points: [
        "รวมการเป็นสมาชิก PRO 1 ปีเต็ม (มูลค่า ฿1,188)",
        "ออกแบบแบนเนอร์และเขียนข้อความขายโดยทีมงานมืออาชีพ",
        "ลงข้อมูลสินค้าให้สูงสุด 25 รายการพร้อมภาพและรายละเอียด",
        "เชื่อมต่อโดเมนส่วนตัวและตั้งค่า DNS ให้จนเสร็จสมบูรณ์",
        "ตั้งค่าระบบส่งของอัตโนมัติทาง WhatsApp และเทมเพลตข้อความแชต",
        "ไฟล์พิมพ์สแตนดี้อะคริลิกสำหรับตั้งเคาน์เตอร์แบบพิเศษ",
        "ส่งมอบงานและพร้อมเปิดขายภายใน 24 ชั่วโมงทำการ",
        "เซสชันปรึกษากลยุทธ์แบบ 1 ต่อ 1 ผ่าน Google Meet (45 นาที)",
      ],
      buttonText: "สั่งซื้อบริการ DFY",
    },
    tableTitle: "ตารางเปรียบเทียบฟังก์ชันทั้งหมด",
    tableSubtitle: "เลือกแพ็กเกจที่สอดคล้องกับเป้าหมายการเติบโตของร้านค้าคุณมากที่สุด",
    comparison: [
      {
        title: "หน้าร้านและความน่าเชื่อถือของแบรนด์",
        rows: [
          {
            feature: "ซับโดเมนส่วนตัว (yourname.etalase.online)",
            detail: "เว็บไซต์หน้าร้านส่วนตัวพร้อมใช้งานทันที",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "โดเมนส่วนตัวของคุณเอง (yourbrand.com)",
            detail: "เชื่อมต่อโดเมนของคุณเองพร้อมระบบรักษาความปลอดภัย SSL ฟรี",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "ซ่อนโลโก้ 'Powered by etalase.online'",
            detail: "หน้าร้านแบบ White-label มืออาชีพ 100%",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "จำนวนสินค้าและลิงก์ที่ลงได้",
            detail: "ลงรายการสินค้าได้เต็มที่โดยไม่จำกัดจำนวน",
            free: <span className="text-xs font-semibold text-[#1C1917]">ไม่จำกัด</span>,
            pro: <span className="text-xs font-semibold text-[#1C1917]">ไม่จำกัด</span>,
            dfy: <span className="text-xs font-semibold text-[#1C1917]">ไม่จำกัด (ทีมงานลงให้ 25 ชิ้น)</span>,
          },
          {
            feature: "การเลือกรูปแบบเทมเพลต",
            detail: "Clean Minimal, Visual Menu, Showroom Pro, Editorial Pastel",
            free: <span className="text-xs font-semibold text-[#1C1917]">ครบทั้ง 4 รูปแบบ</span>,
            pro: <span className="text-xs font-semibold text-[#1C1917]">ครบทั้ง 4 รูปแบบ</span>,
            dfy: <span className="text-xs font-semibold text-[#1C1917]">ปรับแต่งให้เฉพาะแบรนด์</span>,
          },
        ],
      },
      {
        title: "การขายและการชำระเงิน",
        rows: [
          {
            feature: "อัตราค่าคอมมิชชันคำสั่งซื้อทางแชต",
            detail: "ปิดการขายตรงสู่ WhatsApp หรือแชตโดยไม่มีการหักค่าธรรมเนียม",
            free: <span className="text-xs font-bold text-emerald-600">0% (ฟรี)</span>,
            pro: <span className="text-xs font-bold text-emerald-600">0% (ฟรี)</span>,
            dfy: <span className="text-xs font-bold text-emerald-600">0% (ฟรี)</span>,
          },
          {
            feature: "ค่าธรรมเนียมชำระเงินผ่าน QR ทันใจ",
            detail: "ตรวจสอบยอดเงินอัตโนมัติใน 2 วินาที",
            free: <span className="text-xs font-semibold text-[#57534E]">4.5% (ขั้นต่ำ ฿35)</span>,
            pro: <span className="text-xs font-bold text-[#D94E28]">2% (ขั้นต่ำ ฿60)</span>,
            dfy: <span className="text-xs font-bold text-[#D94E28]">2% (ขั้นต่ำ ฿60)</span>,
          },
          {
            feature: "ตัวเลือกตั้งค่าให้ผู้ซื้อช่วยจ่ายค่าธรรมเนียม (*Convenience Fee*)",
            detail: "กำไรสุทธิของคุณยังคงอยู่ครบ 100% เต็ม",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "ค่าธรรมเนียมถอนเงินเข้าบัญชีธนาคาร",
            detail: "โอนเงินเข้าบัญชีธนาคารในประเทศ",
            free: <span className="text-xs text-[#57534E]">฿15 / ครั้ง</span>,
            pro: <span className="text-xs font-bold text-emerald-600">ฟรี 4 ครั้ง / เดือน</span>,
            dfy: <span className="text-xs font-bold text-emerald-600">ฟรี 4 ครั้ง / เดือน</span>,
          },
          {
            feature: "ส่งมอบไฟล์ดิจิทัลอัตโนมัติไปยัง WhatsApp",
            detail: "ส่งใบเสร็จและลิงก์ดาวน์โหลดปลอดภัยตลอด 24 ชั่วโมง",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "ระบบใส่ลายน้ำบน PDF ป้องกันการละเมิดลิขสิทธิ์",
            detail: "พิมพ์ชื่อและเบอร์โทรศัพท์ของผู้ซื้อลงบนเอกสาร PDF ทุกหน้า",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
        ],
      },
      {
        title: "การตลาดและการวิเคราะห์ข้อมูล",
        rows: [
          {
            feature: "โค้ดส่วนลดและโปรโมชันตามขั้นบันได",
            detail: "กำหนดคูปองส่วนลดและจำกัดจำนวนสิทธิ์ในการใช้งานได้",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "เชื่อมต่อ Meta Pixel (CAPI) และ TikTok Ads",
            detail: "ติดตามผลการยิงแอดแม่นยำด้วยการส่งข้อมูลฝั่งเซิร์ฟเวอร์",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "ออกแบบแบนเนอร์และตั้งค่าร้านค้าโดยทีมงาน",
            detail: "หน้าร้านพร้อมเปิดขายโดยที่คุณไม่ต้องเสียเวลาตั้งค่าด้วยตนเอง",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            dfy: <span className="text-xs font-bold text-emerald-700">✅ รวมในบริการ (24 ชม.)</span>,
          },
          {
            feature: "ฝ่ายบริการลูกค้าผ่าน WhatsApp",
            detail: "ช่องทางติดต่อช่วยเหลือด้านเทคนิค",
            free: <span className="text-xs text-[#57534E]">มาตรฐาน</span>,
            pro: <span className="text-xs font-semibold text-[#D94E28]">เร่งด่วน</span>,
            dfy: <span className="text-xs font-bold text-[#1C1917]">เร่งด่วน + Google Meet 1 ต่อ 1</span>,
          },
        ],
      },
    ],
  },
  vi: {
    badge: "Minh Bạch • 0% Phí Hoa Hồng Đơn Chat",
    h1: "Bảng Giá Rõ Ràng Cho Doanh Nghiệp Tăng Trưởng.",
    subtitle:
      "Bắt đầu miễn phí ngay hôm nay không giới hạn thời gian. Nâng cấp Pro bất cứ khi nào để sở hữu tên miền riêng và tối ưu chi phí thanh toán.",
    billingMonthly: "Thanh Toán Theo Tháng",
    billingYearly: "Thanh Toán Theo Năm (Tiết kiệm 20%)",
    saveBadge: "TIẾT KIỆM 20%",
    popularBadge: "ĐƯỢC ƯA CHUỘNG NHẤT",
    freeTier: {
      badge: "Miễn Phí Vĩnh Viễn",
      title: "Gói Miễn Phí (Free Tier)",
      desc: "Giải pháp toàn diện cho nhà sáng tạo và doanh nghiệp nhỏ bắt đầu bán hàng trực tiếp.",
      price: "0 ₫",
      period: "/vĩnh viễn",
      points: [
        "1 Tên Miền Phụ Riêng (yourname.etalase.online)",
        "0% Hoa Hồng Đơn Hàng Qua WhatsApp/Chat (0 đồng)",
        "Không Giới Hạn Số Lượng Sản Phẩm & Liên Kết",
        "Đầy Đủ 4 Mẫu Giao Diện Storefront Hiện Đại",
        "Danh Mục Hình Ảnh & Thông Số Chi Tiết Đầy Đủ",
        "Cổng Thanh Toán VietQR Tức Thì (Phí 4,5% tối thiểu 25.000 ₫)",
        "Tự Động Gửi File Kỹ Thuật Số Vào WhatsApp Khách Hàng",
        "Đóng Dấu Bản Quyền PDF Chống Sao Chép",
        "File In Standee QR Để Bàn Sẵn Sàng (Khổ A5/Mica)",
        "Phí Rút Tiền Về Ngân Hàng: 10.000 ₫ mỗi giao dịch",
      ],
      buttonText: "Bắt Đầu Miễn Phí",
    },
    proTier: {
      badge: "Thương Hiệu & Showroom Chuyên Nghiệp",
      title: "Gói Chuyên Nghiệp (PRO Tier)",
      desc: "Dành riêng cho thương hiệu đang phát triển cần gắn tên miền cá nhân và hạ thấp phí giao dịch.",
      monthlyPrice: "79.000 ₫",
      yearlyPrice: "65.000 ₫",
      period: "/tháng",
      billedYearly: "Thanh toán theo năm 780.000 ₫ / năm",
      points: [
        "Toàn bộ quyền lợi của Gói Miễn Phí",
        "Tên Miền Riêng (.com, .vn, .store v.v.) + SSL Miễn Phí",
        "Ẩn Hoàn Toàn Dấu Ấn etalase.online (White-label)",
        "Phí Giao Dịch QR Ưu Đãi: Chỉ 2% (tối thiểu 40.000 ₫)",
        "Tính Năng 'Convenience Fee': Người mua chi trả phí giao dịch",
        "Rút Tiền Về Ngân Hàng: MIỄN PHÍ 4 lần mỗi tháng",
        "Tích Hợp Meta Pixel (CAPI) & Google Analytics 4",
        "Tạo Mã Khuyến Mãi & Voucher Giảm Giá Nhiều Tầng",
        "Tự Động Điều Phối Nhiều Số WhatsApp Tư Vấn",
        "Hỗ Trợ Khách Hàng Ưu Tiên Qua WhatsApp",
      ],
      buttonText: "Chọn Gói PRO",
    },
    dfyTier: {
      badge: "Dịch Vụ Trọn Gói (DFY)",
      title: "DFY Concierge",
      desc: "Đội ngũ thiết kế và copywriter của chúng tôi xây dựng hoàn chỉnh gian hàng cho bạn.",
      price: "1.490.000 ₫",
      period: "/thanh toán 1 lần",
      points: [
        "Bao Gồm 1 Năm Đầy Đủ Thuê Bao Gói PRO (Trị giá 780.000 ₫)",
        "Nghiên Cứu Phong Cách Thiết Kế & Soạn Thảo Copywriting Chuẩn Bán Hàng",
        "Nhập Liệu Lên Đến 25 Sản Phẩm Hoàn Chỉnh Kèm Ảnh & Nội Dung",
        "Trỏ Tên Miền & Cấu Hình DNS Bàn Giao Hoàn Thiện",
        "Cài Đặt Bot WhatsApp Gửi File & Tối Ưu Mẫu Tin Nhắn Đặt Hàng",
        "File Thiết Kế Standee Mica Quầy Thu Ngân Độ Nét Cao Độc Quyền",
        "Bàn Giao Sẵn Sàng Vận Hành Trong Vòng 24 Giờ Làm Việc",
        "Buổi Tư Vấn Chiến Lược 1-kèm-1 Qua Google Meet (45 Phút)",
      ],
      buttonText: "Đặt Dịch Vụ DFY",
    },
    tableTitle: "So Sánh Tính Năng Chi Tiết",
    tableSubtitle: "Lựa chọn gói phù hợp nhất với lộ trình phát triển của bạn.",
    comparison: [
      {
        title: "Storefront & Định Vị Thương Hiệu",
        rows: [
          {
            feature: "Tên Miền Phụ Riêng (yourname.etalase.online)",
            detail: "Website storefront độc lập sẵn sàng bán ngay",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Tên Miền Riêng Của Bạn (yourbrand.com)",
            detail: "Gắn tên miền cá nhân kèm chứng chỉ SSL miễn phí",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Ẩn Dòng Chữ 'Powered by etalase.online'",
            detail: "Giao diện White-label chuyên nghiệp 100%",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Số Lượng Sản Phẩm & Liên Kết",
            detail: "Thoải mái trưng bày danh mục không bị giới hạn",
            free: <span className="text-xs font-semibold text-[#1C1917]">Không giới hạn</span>,
            pro: <span className="text-xs font-semibold text-[#1C1917]">Không giới hạn</span>,
            dfy: <span className="text-xs font-semibold text-[#1C1917]">Không giới hạn (Nhập sẵn 25)</span>,
          },
          {
            feature: "Lựa Chọn Mẫu Giao Diện",
            detail: "Clean Minimal, Visual Menu, Showroom Pro, Editorial Pastel",
            free: <span className="text-xs font-semibold text-[#1C1917]">Đầy đủ 4 Mẫu</span>,
            pro: <span className="text-xs font-semibold text-[#1C1917]">Đầy đủ 4 Mẫu</span>,
            dfy: <span className="text-xs font-semibold text-[#1C1917]">Thiết Kế Tinh Chỉnh Riêng</span>,
          },
        ],
      },
      {
        title: "Bán Hàng & Giao Dịch",
        rows: [
          {
            feature: "Phí Hoa Hồng Đơn Hàng Qua Chat",
            detail: "Chốt đơn trực tiếp qua WhatsApp không thu phí nền tảng",
            free: <span className="text-xs font-bold text-emerald-600">0% (Miễn phí)</span>,
            pro: <span className="text-xs font-bold text-emerald-600">0% (Miễn phí)</span>,
            dfy: <span className="text-xs font-bold text-emerald-600">0% (Miễn phí)</span>,
          },
          {
            feature: "Phí Cổng Thanh Toán QR Tức Thì",
            detail: "Tự động xác nhận giao dịch trong 2 giây",
            free: <span className="text-xs font-semibold text-[#57534E]">4,5% (tối thiểu 25.000 ₫)</span>,
            pro: <span className="text-xs font-bold text-[#D94E28]">2% (tối thiểu 40.000 ₫)</span>,
            dfy: <span className="text-xs font-bold text-[#D94E28]">2% (tối thiểu 40.000 ₫)</span>,
          },
          {
            feature: "Tùy Chọn Người Mua Trả Phí (*Convenience Fee*)",
            detail: "Bảo toàn 100% doanh thu thuần của bạn",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Phí Rút Tiền Về Ngân Hàng",
            detail: "Chuyển tiền về tài khoản ngân hàng nội địa",
            free: <span className="text-xs text-[#57534E]">10.000 ₫ / giao dịch</span>,
            pro: <span className="text-xs font-bold text-emerald-600">MIỄN PHÍ 4 lần / tháng</span>,
            dfy: <span className="text-xs font-bold text-emerald-600">MIỄN PHÍ 4 lần / tháng</span>,
          },
          {
            feature: "Tự Động Gửi File Qua WhatsApp",
            detail: "Gửi hóa đơn & link tải tức thì 24/7",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Đóng Dấu Bản Quyền PDF Chống Sao Chép",
            detail: "Tự động in tên & số điện thoại người mua trên từng trang PDF",
            free: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
        ],
      },
      {
        title: "Tiếp Thị & Báo Cáo",
        rows: [
          {
            feature: "Mã Giảm Giá & Voucher Phân Tầng",
            detail: "Thiết lập coupon với giới hạn số lần sử dụng",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Tích Hợp Meta Pixel (CAPI) & TikTok Ads",
            detail: "Đo lường chuyển đổi chính xác với Server-Side Tracking",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
            dfy: <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={2.5} />,
          },
          {
            feature: "Thiết Kế Banner & Danh Mục Bởi Đội Ngũ",
            detail: "Gian hàng sẵn sàng vận hành không cần tốn công cài đặt",
            free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            pro: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
            dfy: <span className="text-xs font-bold text-emerald-700">✅ Đã bao gồm (24 giờ)</span>,
          },
          {
            feature: "Hỗ Trợ Khách Hàng WhatsApp",
            detail: "Hỗ trợ kỹ thuật trực tiếp qua tin nhắn",
            free: <span className="text-xs text-[#57534E]">Tiêu chuẩn</span>,
            pro: <span className="text-xs font-semibold text-[#D94E28]">Ưu tiên</span>,
            dfy: <span className="text-xs font-bold text-[#1C1917]">Ưu tiên + Hướng dẫn 1-kèm-1</span>,
          },
        ],
      },
    ],
  },
};

export function HargaClient({
  locale,
  isAuthenticated = false,
}: {
  locale: SupportedLocale;
  isAuthenticated?: boolean;
}) {
  const copy = PRICING_LOCALES[locale] || PRICING_LOCALES.id;
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  const proHref = isAuthenticated
    ? `/admin/billing/upgrade?plan=pro&cycle=${billingCycle}`
    : getLocalizedHref(`/register?plan=pro&cycle=${billingCycle}`);

  const dfyHref = isAuthenticated
    ? "/admin/billing/upgrade?plan=dfy"
    : getLocalizedHref("/register?plan=dfy");

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#D94E28] selection:text-white">
      <GlobalHeader />

      {/* Header Harga */}
      <section className="pt-16 pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{copy.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            {copy.h1}
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {copy.subtitle}
          </p>

          {/* Billing Switcher Toggle: Bulanan vs Tahunan */}
          <div className="mt-8 inline-flex items-center p-1 bg-white border border-[#E7E5E4] rounded-2xl shadow-2xs">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              {copy.billingMonthly}
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                billingCycle === "yearly"
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              <span>{copy.billingYearly}</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-md font-bold">
                {copy.saveBadge}
              </span>
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 3 Tier Pricing Cards */}
      <section className="pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Paket 1: Gratis Selamanya */}
          <div className="bg-white border border-[#E7E5E4] rounded-3xl p-8 flex flex-col justify-between shadow-2xs space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#57534E] bg-stone-100 px-3 py-1 rounded-full">
                {copy.freeTier.badge}
              </span>
              <div>
                <h3 className="text-2xl font-bold text-[#1C1917]">{copy.freeTier.title}</h3>
                <p className="text-xs text-[#57534E] mt-1">
                  {copy.freeTier.desc}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-extrabold text-[#1C1917]">{copy.freeTier.price}</span>
                <span className="text-xs text-[#57534E] ml-1.5 font-medium">{copy.freeTier.period}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E7E5E4] text-xs text-[#57534E]">
                {copy.freeTier.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={getLocalizedHref("/register")}
              className="w-full text-center py-3.5 rounded-xl text-xs font-bold text-[#1C1917] bg-[#FAF8F5] hover:bg-stone-100 border border-[#E7E5E4] transition cursor-pointer"
            >
              {copy.freeTier.buttonText}
            </Link>
          </div>

          {/* Paket 2: Pro (Paling Populer) */}
          <div className="bg-white border-2 border-[#D94E28] rounded-3xl p-8 flex flex-col justify-between shadow-lg relative space-y-6">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D94E28] text-white text-[11px] font-bold px-3.5 py-0.5 rounded-full shadow-xs">
              {copy.popularBadge}
            </span>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] px-3 py-1 rounded-full">
                {copy.proTier.badge}
              </span>
              <div>
                <h3 className="text-2xl font-bold text-[#1C1917]">{copy.proTier.title}</h3>
                <p className="text-xs text-[#57534E] mt-1">
                  {copy.proTier.desc}
                </p>
              </div>

              <div className="pt-2">
                {billingCycle === "yearly" && (
                  <div className="text-xs text-[#57534E] line-through mb-0.5">{copy.proTier.monthlyPrice}</div>
                )}
                <span className="text-4xl font-extrabold text-[#D94E28]">
                  {billingCycle === "yearly" ? copy.proTier.yearlyPrice : copy.proTier.monthlyPrice}
                </span>
                <span className="text-xs text-[#57534E] ml-1.5 font-medium">{copy.proTier.period}</span>
                {billingCycle === "yearly" && (
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    {copy.proTier.billedYearly}
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E7E5E4] text-xs text-[#1C1917]">
                {copy.proTier.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={proHref}
              className="w-full text-center py-3.5 rounded-xl text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] shadow-xs transition cursor-pointer"
            >
              {copy.proTier.buttonText}
            </Link>
          </div>

          {/* Paket 3: Terima Beres (DFY) */}
          <div className="bg-white border border-[#E7E5E4] rounded-3xl p-8 flex flex-col justify-between shadow-2xs space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                {copy.dfyTier.badge}
              </span>
              <div>
                <h3 className="text-2xl font-bold text-[#1C1917]">{copy.dfyTier.title}</h3>
                <p className="text-xs text-[#57534E] mt-1">
                  {copy.dfyTier.desc}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-extrabold text-[#1C1917]">{copy.dfyTier.price}</span>
                <span className="text-xs text-[#57534E] ml-1.5 font-medium">{copy.dfyTier.period}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E7E5E4] text-xs text-[#57534E]">
                {copy.dfyTier.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={dfyHref}
              className="w-full text-center py-3.5 rounded-xl text-xs font-bold text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition cursor-pointer"
            >
              {copy.dfyTier.buttonText}
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 bg-white border-t border-[#E7E5E4] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {copy.tableTitle}
            </h2>
            <p className="text-sm text-[#57534E]">
              {copy.tableSubtitle}
            </p>
          </div>

          <div className="overflow-x-auto border border-[#E7E5E4] rounded-2xl shadow-2xs">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E7E5E4] text-xs font-bold text-[#1C1917]">
                  <th className="p-4 sm:p-5 w-2/5">Fitur</th>
                  <th className="p-4 sm:p-5 text-center w-1/5">Free</th>
                  <th className="p-4 sm:p-5 text-center w-1/5 text-[#D94E28] bg-[#FDF0EC]/50">PRO</th>
                  <th className="p-4 sm:p-5 text-center w-1/5 text-purple-900">DFY Concierge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5E4] text-xs">
                {copy.comparison.map((cat, cIdx) => (
                  <React.Fragment key={cIdx}>
                    <tr className="bg-[#FAF8F5]/80">
                      <td colSpan={4} className="p-3.5 px-5 font-bold uppercase tracking-wider text-[11px] text-[#57534E]">
                        {cat.title}
                      </td>
                    </tr>
                    {cat.rows.map((r, rIdx) => (
                      <tr key={rIdx} className="hover:bg-stone-50/50 transition">
                        <td className="p-4 px-5">
                          <div className="font-semibold text-[#1C1917]">{r.feature}</div>
                          {r.detail && <div className="text-[11px] text-[#57534E] mt-0.5">{r.detail}</div>}
                        </td>
                        <td className="p-4 text-center">{r.free}</td>
                        <td className="p-4 text-center bg-[#FDF0EC]/20">{r.pro}</td>
                        <td className="p-4 text-center">{r.dfy}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
