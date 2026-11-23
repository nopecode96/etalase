"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export function HargaContent() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
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

          {/* Billing Switcher Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-white border border-[#E7E5E4] rounded-2xl shadow-2xs">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                billingCycle === "monthly"
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                billingCycle === "yearly"
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              <span>Tahunan</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded-md font-bold">
                Hemat 20%
              </span>
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* 3 Tier Pricing Cards */}
      <section className="pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
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
                  <span>1 Subdomain Mandiri (<code>namamu.etalase.online</code>)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Hingga 5 Produk Digital &amp; Katalog Fisik</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Kirim File &amp; Struk Otomatis ke WhatsApp</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>0% Komisi Transaksi di Jalur Order Chat</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dukungan 4 Arketipe Template Desain</span>
                </div>
              </div>
            </div>

            <Link
              href="/onboarding"
              className="w-full text-center py-3 rounded-xl text-xs font-bold text-[#1C1917] bg-[#FAF8F5] hover:bg-stone-100 border border-[#E7E5E4] transition"
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
                    Ditagih Rp 468.000 / tahun (Hemat Rp 120.000)
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E7E5E4] text-xs text-[#1C1917]">
                <div className="flex items-start gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span><strong>Tanpa Batas Produk</strong> &amp; File Penyimpanan Cloud</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span><strong>Custom Domain Pribadi</strong> (<code>namabrand.com</code>) + SSL</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span>Hapus Branding Watermark etalase.online</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                  <span>Fitur Booking Kalender &amp; Tiketing Webinar</span>
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
              href="/onboarding?tier=PRO"
              className="w-full text-center py-3.5 rounded-xl text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] shadow-xs transition"
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
                <span className="text-[10px] font-bold text-stone-500">by asistencuan.shop</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1C1917]">Terima Beres (DFY)</h3>
                <p className="text-xs text-[#57534E] mt-1">
                  Tidak punya waktu mendesain? Tim kami yang akan menyiapkan seluruh isi tokomu.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1C1917]">Rp 499.000</span>
                <span className="text-xs text-[#57534E] ml-1.5 font-medium">sekali bayar</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E7E5E4] text-xs text-[#57534E]">
                <div className="flex items-start gap-2.5 font-medium text-[#1C1917]">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span><strong>Termasuk Akses PRO Selama 1 Tahun Penuh</strong></span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Setup Desain Banner, Foto Produk &amp; Copy Bio</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Integrasi WhatsApp Admin &amp; Pembayaran QRIS</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Bantuan Hubungkan Domain Pribadi (contoh: tokoanda.com)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>Garansi Toko Siap Pakai dalam 24 Jam Kerja</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/6281288003005?text=Halo%20tim%20etalase.online,%20saya%20tertarik%20dengan%20Layanan%20Terima%20Beres%20(DFY)"
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-3 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-black transition flex items-center justify-center gap-1.5"
            >
              <span>Konsultasi Terima Beres di WA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
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
