"use client";

import React from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { SubdomainClaimer } from "@/components/home/SubdomainClaimer";
import { Hero3DDevice } from "@/components/home/Hero3DDevice";
import { CreatorMarquee } from "@/components/home/CreatorMarquee";
import { InteractiveFeatureShowcase } from "@/components/home/InteractiveFeatureShowcase";
import { Showcase4Archetypes } from "@/components/home/Showcase4Archetypes";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#D94E28] selection:text-white">
      {/* 1. Global Header Terpusat */}
      <GlobalHeader />

      {/* 2. Hero Section - Warm Editorial 2027 (#FAF8F5) with 3D Tilt Device */}
      <section className="border-b border-[#E7E5E4] pt-14 sm:pt-20 lg:pt-24 pb-20 lg:pb-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Kolom Kiri: Copywriting & Subdomain Claim Bar with Typewriter */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <ScrollReveal direction="up" delay={50}>
                <div className="inline-flex items-center gap-2 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
                  <span>Satu Website Etalase, Semua Penjualan</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={120}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1917] tracking-tight leading-[1.12]">
                  Satu Website Etalase untuk Semua Jualan Anda.
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180}>
                <p className="text-[#57534E] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Jual produk digital, pajang katalog fisik, tautkan keranjang kuning, atau terima pesanan langsung ke WhatsApp. Siap pakai dalam hitungan menit.
                </p>
              </ScrollReveal>

              {/* Subdomain Claim Input Bar dengan Typewriter Effect */}
              <ScrollReveal direction="up" delay={240}>
                <SubdomainClaimer />
              </ScrollReveal>

              {/* 3 Micro-trust text */}
              <ScrollReveal direction="up" delay={300}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#57534E] pt-1 font-medium">
                  <span>Gratis Selamanya</span>
                  <span className="text-[#E7E5E4]">&bull;</span>
                  <span>0% Komisi Order Chat</span>
                  <span className="text-[#E7E5E4]">&bull;</span>
                  <span>Otomatis ke WhatsApp</span>
                </div>
              </ScrollReveal>
            </div>

            {/* Kolom Kanan: CSS 3D Tilt Smartphone Mockup + Secondary Depth Layer + 4 Outer Floating 3D Badges */}
            <div className="lg:col-span-5 flex justify-center">
              <ScrollReveal direction="none" delay={200}>
                <Hero3DDevice />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Social Proof / Creator Marquee Section (Subdomain URLs) */}
      <section className="py-10 bg-white border-b border-[#E7E5E4]">
        <div className="max-w-6xl mx-auto px-4 text-center mb-4">
          <ScrollReveal direction="up" delay={80}>
            <span className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
              Dipercaya Kreator, Coach &amp; Pebisnis di Seluruh Asia Tenggara
            </span>
          </ScrollReveal>
        </div>
        <CreatorMarquee />
      </section>

      {/* 4. Seksi "Lebih dari Sekadar Link di Bio" (Interactive Context-Aware Showcase) */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] border border-[#FADCD3] px-3.5 py-1 rounded-full">
              Kemampuan Lengkap
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
              Lebih dari Sekadar Link di Bio
            </h2>
            <p className="text-[#57534E] text-sm sm:text-base leading-relaxed">
              Satu platform dengan ekosistem jualan terlengkap yang dirancang khusus untuk mempercepat closing dan transaksi langsung di Asia Tenggara.
            </p>
          </div>
        </ScrollReveal>

        <InteractiveFeatureShowcase />
      </section>

      {/* 5. 4 Arketipe Template Tenant Terisolasi */}
      <section className="bg-white border-y border-[#E7E5E4] py-20 lg:py-28 px-4 sm:px-6">
        <ScrollReveal direction="up" delay={100}>
          <div className="max-w-6xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] px-3.5 py-1 rounded-full border border-[#FADCD3]">
              4 Arketipe Template Desain
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
              Pilih Arketipe yang Tepat untuk Karakter Bisnismu
            </h2>
            <p className="text-[#57534E] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Semua template terisolasi dengan struktur vertikal anti-tabrakan tombol dan subdomain mandiri siap pakai.
            </p>
          </div>
        </ScrollReveal>

        <Showcase4Archetypes />
      </section>

      {/* 6. Closing CTA Banner - Harmonis Soft Tint (#FDF0EC), Zero Dark #0B1220 Block */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <ScrollReveal direction="up" delay={150}>
          <div className="bg-[#FDF0EC] border border-[#FADCD3] rounded-3xl p-10 sm:p-16 text-center shadow-xs space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/90 border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D94E28]" />
              <span>Mulai Gratis Tanpa Kartu Kredit</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] leading-tight">
              Satu Website Etalase untuk Semua Jualan Anda.
            </h2>

            <p className="text-sm sm:text-base text-[#57534E] max-w-xl mx-auto leading-relaxed">
              Buka etalase online Anda sekarang. 0% komisi order chat, tanpa kontrak tersembunyi, dan langsung terhubung ke WhatsApp Anda dalam 3 menit.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/onboarding"
                className="w-full sm:w-auto bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition shadow-xs hover:shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buat Etalase Gratis Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/template"
                className="w-full sm:w-auto bg-white hover:bg-[#FAF8F5] border border-[#E7E5E4] text-[#1C1917] font-semibold px-6 py-3.5 rounded-xl text-sm transition inline-flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>Lihat 4 Arketipe Template</span>
              </Link>
            </div>

            <div className="text-xs text-[#57534E] pt-2 font-medium">
              Gratis Selamanya &bull; Setup Kurang dari 3 Menit &bull; Subdomain Mandiri Siap Pakai
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. Global Footer Terpusat */}
      <GlobalFooter />
    </div>
  );
}
