"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { Showcase4Archetypes } from "@/components/home/Showcase4Archetypes";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

function TemplateContent() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />

      <section className="pt-16 pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Desain Terisolasi &bull; Anti Tabrakan Tombol</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            4 Arketipe Desain Toko yang Terbukti Mengonversi.
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Tidak ada lagi tombol bertumpuk atau teks terpotong aneh di layar HP pembeli. Setiap arketipe dibangun dengan konsep layout vertikal khusus sesuai bidang bisnismu.
          </p>
        </ScrollReveal>
      </section>

      {/* 4 Archetypes Showcase Interactive Component */}
      <section className="pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <Showcase4Archetypes />

        {/* Feature Comparison Grid for Templates */}
        <div className="mt-16 bg-white border border-[#E7E5E4] rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-[#1C1917]">
              Semua Template Sudah Dilengkapi Standar Modern 2027
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E]">
              Standar baku teknis untuk memastikan kenyamanan pembeli Anda di smartphone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-[#57534E]">
            <div className="p-5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl space-y-2">
              <div className="font-bold text-[#1C1917] flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D94E28]" />
                <span>Desain Mobile-First yang Rapi</span>
              </div>
              <p className="leading-relaxed">
                Foto di atas, judul &amp; harga rapi di tengah, tombol aksi penuh di bawah. Memudahkan checkout 1-klik di layar smartphone.
              </p>
            </div>

            <div className="p-5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl space-y-2">
              <div className="font-bold text-[#1C1917] flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D94E28]" />
                <span>Mendukung Berbagai Format Harga</span>
              </div>
              <p className="leading-relaxed">
                Mendukung harga pasti, simulasi DP, hingga tombol &apos;Tanya Harga&apos; yang nyaman untuk produk bernilai tinggi atau konsultasi.
              </p>
            </div>

            <div className="p-5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl space-y-2">
              <div className="font-bold text-[#1C1917] flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D94E28]" />
                <span>Subdomain Mandiri Aktif</span>
              </div>
              <p className="leading-relaxed">
                Langsung aktif di <code>namamu.etalase.online</code> tanpa biaya hosting tambahan. Siap dibagikan ke bio Instagram, TikTok, dan kartu nama fisik.
              </p>
            </div>
          </div>

          <div className="pt-6 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-[#D94E28] hover:bg-[#B83E1D] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-xs transition"
            >
              <span>Pilih Template &amp; Buka Etalase Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}

export default function TemplatePage() {
  return <TemplateContent />;
}
