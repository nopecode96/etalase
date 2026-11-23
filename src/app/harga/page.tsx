"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Check, X, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

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

const COMPARISON_DATA: ComparisonCategory[] = [
  {
    title: "1. Etalase & Branding",
    rows: [
      {
        feature: "Subdomain Mandiri",
        detail: "Alamat web resmi namamu.etalase.online",
        free: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
        pro: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
        dfy: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
      },
      {
        feature: "Jumlah Produk & Tautan",
        detail: "Upload produk digital, fisik, maupun affiliate",
        free: <span className="font-semibold text-emerald-700">Tanpa Batas</span>,
        pro: <span className="font-semibold text-emerald-700">Tanpa Batas</span>,
        dfy: <span className="font-semibold text-emerald-700">Tanpa Batas</span>,
      },
      {
        feature: "Pilihan Arketipe Template",
        detail: "Struktur tampilan vertikal terisolasi",
        free: <span className="text-xs font-medium text-[#57534E]">1 Dasar (Clean Minimal)</span>,
        pro: <span className="text-xs font-semibold text-[#D94E28]">Semua 4 Arketipe + Kustom Warna</span>,
        dfy: <span className="text-xs font-semibold text-[#1C1917]">Semua 4 Arketipe + Didesainkan Tim</span>,
      },
      {
        feature: "Custom Domain Pribadi + SSL",
        detail: "Gunakan domain namabrand.com sendiri",
        free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
        pro: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
        dfy: <span className="text-xs font-semibold text-[#1C1917]">✅ + Setup DNS Beres</span>,
      },
      {
        feature: "Hapus Branding etalase.online",
        detail: "Etalase 100% tampil putih polos membawa brand Anda",
        free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
        pro: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
        dfy: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
      },
    ],
  },
  {
    title: "2. Jualan & Transaksi (Transparan)",
    rows: [
      {
        feature: "Komisi Order by Chat",
        detail: "Pesanan masuk via WhatsApp, LINE, Zalo, atau Messenger",
        free: <span className="font-bold text-emerald-700">0%</span>,
        pro: <span className="font-bold text-emerald-700">0%</span>,
        dfy: <span className="font-bold text-emerald-700">0%</span>,
      },
      {
        feature: "Biaya Transaksi QRIS & PayPal",
        detail: "Direct checkout otomatis tanpa konfirmasi manual. Opsi fleksibel: biaya transaksi bisa diatur ditanggung Pembeli atau Penjual.",
        free: <span className="text-xs font-semibold text-[#57534E]">4,5% (min. Rp 15rb)</span>,
        pro: <span className="text-xs font-bold text-[#D94E28]">2% (min. Rp 25rb)</span>,
        dfy: <span className="text-xs font-bold text-[#D94E28]">2% (min. Rp 25rb)</span>,
      },
      {
        feature: "Biaya Penarikan Saldo (Payout)",
        detail: "Penarikan hasil penjualan ke rekening bank / e-wallet mana saja di Indonesia",
        free: <span className="text-xs font-medium text-[#57534E]">Rp 5.000 / tarik (min. Rp 50rb)</span>,
        pro: (
          <span className="text-xs font-bold text-emerald-700">
            GRATIS 4x / bulan <span className="font-normal text-stone-500">(selanjutnya Rp 2.500 &bull; min. Rp 50rb)</span>
          </span>
        ),
        dfy: (
          <span className="text-xs font-bold text-emerald-700">
            GRATIS 4x / bulan <span className="font-normal text-stone-500">(selanjutnya Rp 2.500 &bull; min. Rp 50rb)</span>
          </span>
        ),
      },
      {
        feature: "Kirim File & Struk Otomatis ke WA",
        detail: "Invoice & link produk digital otomatis kirim ke WA pembeli",
        free: <span className="text-xs text-[#57534E]">Dasar</span>,
        pro: <span className="text-xs font-semibold text-[#1C1917]">Penuh + Multi-Admin</span>,
        dfy: <span className="text-xs font-semibold text-[#1C1917]">Penuh + Setup Tim</span>,
      },
      {
        feature: "Affiliate Keranjang Kuning SEA",
        detail: "Tautan afiliasi TikTok Shop, Shopee & Lazada",
        free: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
        pro: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
        dfy: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
      },
      {
        feature: "Booking Jadwal 1-on-1 & Tiket Webinar",
        detail: "Sinkronisasi kalender dan pembatasan kuota peserta",
        free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
        pro: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
        dfy: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
      },
    ],
  },
  {
    title: "3. Marketing, Analitik & Layanan",
    rows: [
      {
        feature: "Meta Pixel, Conversion API (CAPI) & GA4",
        detail: "Pelacakan konversi iklan Meta Ads & Google Analytics",
        free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
        pro: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
        dfy: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
      },
      {
        feature: "Parameter UTM & Analitik Konversi",
        detail: "Ketahui sumber trafik bio medsos yang menghasilkan penjualan",
        free: <span className="text-xs text-[#57534E]">Terbatas</span>,
        pro: <span className="text-xs font-semibold text-emerald-700">Lengkap</span>,
        dfy: <span className="text-xs font-semibold text-emerald-700">Lengkap</span>,
      },
      {
        feature: "Watermark PDF Otomatis",
        detail: "Cetak nama dan email pembeli di tiap lembar e-book anti-bajak",
        free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
        pro: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
        dfy: <Check className="w-5 h-5 text-[#D94E28] mx-auto" strokeWidth={2.5} />,
      },
      {
        feature: "Setup Banner, Katalog & Copywriting Tim",
        detail: "Toko langsung beres disiapkan tanpa repot setting manual",
        free: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
        pro: <X className="w-5 h-5 text-[#A8A29E] mx-auto" strokeWidth={1.5} />,
        dfy: <span className="text-xs font-bold text-emerald-700">✅ Termasuk (24 Jam)</span>,
      },
      {
        feature: "Dukungan CS WhatsApp",
        detail: "Bantuan teknis via chat WhatsApp langsung",
        free: <span className="text-xs text-[#57534E]">Standar</span>,
        pro: <span className="text-xs font-semibold text-[#D94E28]">Prioritas</span>,
        dfy: <span className="text-xs font-bold text-[#1C1917]">Prioritas + Pendampingan Setup</span>,
      },
    ],
  },
];

export function HargaContent() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#D94E28] selection:text-white">
      <GlobalHeader />

      {/* Header Harga */}
      <section className="pt-16 pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biaya Transparan &bull; Tanpa Potongan Siluman</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            Investasi Ringan untuk Penjualan yang Berlipat.
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Mulai gratis selamanya. Upgrade ke paket Pro untuk domain brand sendiri, atau pilih paket Terima Beres jika Anda ingin tim kami yang menyiapkan semuanya.
          </p>

          {/* Billing Switcher Toggle: Bulanan vs Tahunan (Hemat 20%) */}
          <div className="mt-8 inline-flex items-center p-1 bg-white border border-[#E75E4] border-[#E7E5E4] rounded-2xl shadow-2xs">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              Bulanan
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
              <span>Tahunan</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-md font-bold">
                Hemat 20%
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
                Gratis
              </span>
              <div>
                <h3 className="text-2xl font-bold text-[#1C1917]">Mulai Gratis</h3>
                <p className="text-xs text-[#57534E] mt-1">
                  Cocok untuk kreator pemula, pelajar, atau UMKM yang baru memulai jualan online.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-extrabold text-[#1C1917]">Rp 0</span>
                <span className="text-xs text-[#57534E] ml-1.5 font-medium">selamanya</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E7E5E4] text-xs text-[#57534E]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Produk &amp; Link Tanpa Batas</strong> (Unlimited)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>0% Komisi Order Chat</strong> WhatsApp</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Biaya Transaksi QRIS 4,5%</strong> (min. transaksi Rp 15rb)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Biaya Penarikan Saldo Rp 5.000 (min. tarik Rp 50rb)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>1 Template Dasar (Clean Minimal)</strong></span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>1 Subdomain Mandiri (<code>namamu.etalase.online</code>)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Kirim File &amp; Struk Otomatis ke WhatsApp</span>
                </div>
              </div>
            </div>

            <Link
              href="/register"
              className="w-full text-center py-3.5 rounded-xl text-xs font-bold text-[#1C1917] bg-[#FAF8F5] hover:bg-stone-100 border border-[#E7E5E4] transition cursor-pointer"
            >
              Mulai Gratis Sekarang
            </Link>
          </div>

          {/* Paket 2: Pro (Paling Populer) */}
          <div className="bg-white border-2 border-[#D94E28] rounded-3xl p-8 flex flex-col justify-between shadow-lg relative space-y-6">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D94E28] text-white text-[11px] font-bold px-3.5 py-0.5 rounded-full shadow-xs">
              PILIHAN POPULER
            </span>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] px-3 py-1 rounded-full">
                Paket Pro
              </span>
              <div>
                <h3 className="text-2xl font-bold text-[#1C1917]">Kreator &amp; Bisnis Pro</h3>
                <p className="text-xs text-[#57534E] mt-1">
                  Untuk kreator aktif, sales showroom, dan UMKM yang ingin branding profesional.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-extrabold text-[#D94E28]">
                  {billingCycle === "yearly" ? "Rp 39.000" : "Rp 49.000"}
                </span>
                <span className="text-xs text-[#57534E] ml-1.5 font-medium">/ bulan</span>
                {billingCycle === "yearly" && (
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    Ditagih Rp 468.000 / tahun &bull; Hemat Rp 120.000
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E7E5E4] text-xs text-[#1C1917]">
                <div className="flex items-start gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span><strong>Semua 4 Arketipe Premium</strong> + Kustom Warna</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span><strong>Custom Domain Pribadi</strong> (<code>namabrand.com</code>) + SSL</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span>Hapus Branding Watermark etalase.online</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span><strong>Biaya Transaksi QRIS Hanya 2%</strong> (min. transaksi Rp 25rb)</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span><strong>Penarikan Saldo GRATIS 4x / bulan</strong> (selanjutnya Rp 2.500 &bull; min. tarik Rp 50rb)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span>Fitur Booking Kalender &amp; Tiketing Webinar</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span>Meta Pixel &amp; CAPI, Google Analytics 4 &amp; UTM Lengkap</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span>Notifikasi Order ke Multi-Nomor WhatsApp Admin</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span>Prioritas Dukungan Teknis WhatsApp CS</span>
                </div>
              </div>
            </div>

            <Link
              href="/register?tier=PRO"
              className="w-full text-center py-3.5 rounded-xl text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] shadow-xs transition cursor-pointer"
            >
              Coba Paket Pro 14 Hari
            </Link>
          </div>

          {/* Paket 3: Terima Beres (DFY) */}
          <div className="bg-[#FAF8F5] border border-[#E7E5E4] rounded-3xl p-8 flex flex-col justify-between shadow-2xs space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                  Layanan DFY
                </span>
                <span className="text-[10px] font-bold text-stone-500">by asistencuan</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1C1917]">Terima Beres (DFY)</h3>
                <p className="text-xs text-[#57534E] mt-1">
                  Tidak punya waktu mendesain? Tim kami yang akan menyiapkan seluruh isi tokomu.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1C1917]">Rp 899.000</span>
                <span className="text-xs text-[#57534E] ml-1.5 font-medium">sekali bayar</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E7E5E4] text-xs text-[#57534E]">
                <div className="flex items-start gap-2.5 font-medium text-[#1C1917]">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span><strong>Termasuk Akses PRO Selama 1 Tahun Penuh</strong> (senilai Rp 468.000)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Setup Desain Banner, Foto Produk &amp; Copy Bio oleh Tim</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Upload Katalog Awal &amp; Copywriting Bio by asistencuan</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Integrasi WhatsApp Admin &amp; Pembayaran QRIS</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Bantuan Hubungkan Domain Pribadi (DNS Setup Beres)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Garansi Siap Jualan dalam 24 Jam Kerja</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/6281288003005?text=Halo%20tim%20etalase.online,%20saya%20tertarik%20dengan%20Layanan%20Terima%20Beres%20(DFY)"
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-3.5 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-black transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Konsultasi Terima Beres via WA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* WAJIB: Tabel Komparasi Lengkap */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full border-t border-[#E7E5E4]">
        <ScrollReveal direction="up" delay={80}>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] border border-[#FADCD3] px-3.5 py-1 rounded-full">
              Tabel Komparasi Lengkap
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917]">
              Bandingkan Seluruh Fitur &amp; Keunggulan Setiap Paket
            </h2>
            <p className="text-[#57534E] text-sm sm:text-base leading-relaxed">
              Semua paket memberikan kebebasan jualan tanpa komisi chat. Pilih tingkat otomasi dan kendali branding yang paling pas untuk bisnismu.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabel dengan Desktop Sticky Header & Mobile Horizontal Scroll */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              {/* Sticky Header Column Names */}
              <thead className="sticky top-16 z-20 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4]">
                <tr>
                  <th className="p-4 sm:p-5 w-5/12 text-xs font-bold text-[#57534E] uppercase tracking-wider">
                    Fitur &amp; Layanan
                  </th>
                  <th className="p-4 sm:p-5 w-2/12 text-center text-xs font-bold text-[#1C1917] uppercase tracking-wider bg-stone-50/50">
                    Gratis
                  </th>
                  <th className="p-4 sm:p-5 w-2/12 text-center text-xs font-bold text-[#D94E28] uppercase tracking-wider bg-[#FDF0EC]/60 border-x border-[#FADCD3]">
                    Pro
                  </th>
                  <th className="p-4 sm:p-5 w-3/12 text-center text-xs font-bold text-stone-900 uppercase tracking-wider bg-purple-50/50">
                    Terima Beres (DFY)
                  </th>
                </tr>
              </thead>

              <tbody>
                {COMPARISON_DATA.map((category, catIdx) => (
                  <React.Fragment key={category.title}>
                    {/* Category Header Row */}
                    <tr className="bg-[#FAF8F5] border-y border-[#E7E5E4]">
                      <td
                        colSpan={4}
                        className="py-3 px-4 sm:px-5 font-bold text-xs sm:text-sm text-[#1C1917] tracking-tight"
                      >
                        {category.title}
                      </td>
                    </tr>

                    {/* Category Rows */}
                    {category.rows.map((row, rowIdx) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-[#E7E5E4] transition hover:bg-stone-50/60 ${
                          rowIdx % 2 === 1 ? "bg-stone-50/20" : "bg-white"
                        }`}
                      >
                        <td className="p-4 sm:p-5 align-middle">
                          <div className="font-semibold text-xs sm:text-sm text-[#1C1917]">
                            {row.feature}
                          </div>
                          {row.detail && (
                            <div className="text-[11px] text-[#57534E] mt-0.5">
                              {row.detail}
                            </div>
                          )}
                        </td>
                        <td className="p-4 sm:p-5 text-center align-middle bg-stone-50/30">
                          {row.free}
                        </td>
                        <td className="p-4 sm:p-5 text-center align-middle bg-[#FDF0EC]/30 border-x border-[#FADCD3]">
                          {row.pro}
                        </td>
                        <td className="p-4 sm:p-5 text-center align-middle bg-purple-50/30">
                          {row.dfy}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}

                {/* Bottom Action Buttons Row */}
                <tr className="bg-white">
                  <td className="p-4 sm:p-5 font-semibold text-xs text-[#57534E]">
                    Pilih Paket Pilihanmu:
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-stone-50/50">
                    <Link
                      href="/register"
                      className="inline-block w-full py-2.5 px-3 rounded-xl text-xs font-bold text-[#1C1917] bg-[#FAF8F5] hover:bg-stone-100 border border-[#E7E5E4] transition shadow-2xs"
                    >
                      Mulai Gratis
                    </Link>
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-[#FDF0EC]/50 border-x border-[#FADCD3]">
                    <Link
                      href="/register?tier=PRO"
                      className="inline-block w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] transition shadow-xs"
                    >
                      Pilih Pro
                    </Link>
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-purple-50/50">
                    <a
                      href="https://wa.me/6281288003005?text=Halo%20tim%20etalase.online,%20saya%20tertarik%20dengan%20Layanan%20Terima%20Beres%20(DFY)"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-black transition shadow-xs"
                    >
                      Konsultasi WA
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}

export default function HargaPage() {
  return <HargaContent />;
}
