"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShowcaseCarousel } from "@/components/home/ShowcaseCarousel";
import { CreatorMarquee } from "@/components/home/CreatorMarquee";
import { HeroProductMockup } from "@/components/home/HeroProductMockup";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  ArrowRight,
  Zap,
  ShoppingBag,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  Globe,
  Store,
  FileText,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [claimSlug, setClaimSlug] = useState("");

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = claimSlug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
    router.push(`/onboarding?slug=${encodeURIComponent(clean)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#111C1B] selection:bg-[#0F766E] selection:text-white">
      {/* Unified Minimalist Marketing Navbar */}
      <MarketingNavbar />

      {/* Hero Section - Soft Mist Background (#F4F8F7) with 2-Column Clean Layout */}
      <section className="bg-[#F4F8F7] border-b border-[#E2ECEA] pt-16 sm:pt-20 lg:pt-24 pb-20 lg:pb-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Focused Copywriting & Inline Claim Input Bar */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <ScrollReveal direction="up" delay={50}>
                <div className="inline-flex items-center gap-2 bg-[#E6F4F1] border border-[#C4E5DF] text-[#0F766E] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Bio Link &amp; Etalase Jualan Asia Tenggara</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={120}>
                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#111C1B] tracking-tight leading-[1.15]">
                  Satu Link Etalase untuk Semua Jualan Anda.
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180}>
                <p className="text-[#526664] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Jual produk digital, pajang katalog fisik, tautkan keranjang kuning, atau terima pesanan langsung ke WhatsApp. Siap pakai dalam hitungan menit.
                </p>
              </ScrollReveal>

              {/* Inline Claim Input Bar (Seamless Lynk.id style) */}
              <ScrollReveal direction="up" delay={240}>
                <form
                  onSubmit={handleClaim}
                  className="max-w-md mx-auto lg:mx-0 bg-white border border-[#E2ECEA] rounded-2xl p-1.5 shadow-sm focus-within:border-[#0F766E] focus-within:ring-2 focus-within:ring-[#0F766E]/20 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center w-full px-3 py-2 text-sm text-[#526664]">
                    <span className="text-[#526664]/60 font-medium select-none text-xs sm:text-sm">
                      etalase.online/
                    </span>
                    <input
                      type="text"
                      placeholder="namamu"
                      value={claimSlug}
                      onChange={(e) => setClaimSlug(e.target.value)}
                      className="w-full bg-transparent text-[#111C1B] font-semibold focus:outline-none ml-1 placeholder:text-[#526664]/40 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors shrink-0 shadow-xs flex items-center gap-1.5"
                  >
                    <span>Klaim Gratis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </ScrollReveal>

              {/* Micro-trust line (Calm, 0 rainbow colors) */}
              <ScrollReveal direction="up" delay={300}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#526664] pt-1 font-medium">
                  <span>Gratis Selamanya</span>
                  <span className="text-[#E2ECEA]">•</span>
                  <span>0% Komisi Order Chat</span>
                  <span className="text-[#E2ECEA]">•</span>
                  <span>Kirim Otomatis ke WhatsApp</span>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: 1 Clean Phone Mockup (Zero Overlapping Badges) */}
            <div className="lg:col-span-5 flex justify-center">
              <ScrollReveal direction="none" delay={200}>
                <HeroProductMockup />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Creator Marquee Section */}
      <section className="py-10 bg-white border-b border-[#E2ECEA]">
        <div className="max-w-6xl mx-auto px-4 text-center mb-4">
          <ScrollReveal direction="up" delay={80}>
            <span className="text-xs font-bold uppercase tracking-wider text-[#526664]">
              Dipercaya Kreator, Coach &amp; Pebisnis di Seluruh Asia Tenggara
            </span>
          </ScrollReveal>
        </div>
        <CreatorMarquee />
      </section>

      {/* Feature Section: "Lebih dari Sekadar Link di Bio" */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-[#E6F4F1] border border-[#C4E5DF] px-3 py-1 rounded-full">
              Fitur Lengkap
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111C1B] tracking-tight">
              Lebih dari Sekadar Link di Bio
            </h2>
            <p className="text-[#526664] text-sm sm:text-base leading-relaxed">
              Satu platform dengan ekosistem jualan lengkap yang dirancang khusus untuk mempermudah transaksi langsung dan closing di Asia Tenggara.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Produk Digital & Auto-WA */}
          <ScrollReveal direction="up" delay={120}>
            <Link
              href="/digital-product"
              className="h-full group bg-white border border-[#E2ECEA] hover:border-[#0F766E]/40 hover:shadow-lg rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#111C1B] group-hover:text-[#0F766E] transition-colors mb-2.5">
                  Produk Digital &amp; Auto-WA
                </h3>
                <p className="text-xs sm:text-sm text-[#526664] leading-relaxed">
                  Jual e-book, template Canva/Notion, preset foto, dan video course dengan pengiriman file dan invoice otomatis langsung ke WhatsApp pembeli.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-[#0F766E] gap-1">
                <span>Pelajari Fitur</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 2: Katalog Fisik & Showroom */}
          <ScrollReveal direction="up" delay={180}>
            <Link
              href="/sales"
              className="h-full group bg-white border border-[#E2ECEA] hover:border-[#0F766E]/40 hover:shadow-lg rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#111C1B] group-hover:text-[#0F766E] transition-colors mb-2.5">
                  Katalog Fisik &amp; Showroom
                </h3>
                <p className="text-xs sm:text-sm text-[#526664] leading-relaxed">
                  Tampilkan unit mobil, properti, pakaian, atau menu kuliner lengkap dengan foto tajam, spesifikasi, dan tombol chat konsultasi langsung.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-[#0F766E] gap-1">
                <span>Pelajari Fitur</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 3: Affiliate Keranjang Kuning */}
          <ScrollReveal direction="up" delay={240}>
            <Link
              href="/affiliate"
              className="h-full group bg-white border border-[#E2ECEA] hover:border-[#0F766E]/40 hover:shadow-lg rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#111C1B] group-hover:text-[#0F766E] transition-colors mb-2.5">
                  Affiliate Keranjang Kuning
                </h3>
                <p className="text-xs sm:text-sm text-[#526664] leading-relaxed">
                  Kumpulkan rekomendasi produk dari TikTok Shop, Shopee, dan Tokopedia dalam satu bio link rapi tanpa batasan jumlah tautan.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-[#0F766E] gap-1">
                <span>Pelajari Fitur</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 4: Event, Webinar & Booking */}
          <ScrollReveal direction="up" delay={300}>
            <Link
              href="/event"
              className="h-full group bg-white border border-[#E2ECEA] hover:border-[#0F766E]/40 hover:shadow-lg rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#111C1B] group-hover:text-[#0F766E] transition-colors mb-2.5">
                  Event, Webinar &amp; Booking
                </h3>
                <p className="text-xs sm:text-sm text-[#526664] leading-relaxed">
                  Registrasi tiket workshop online &amp; acara offline, sesi mentoring privat 1-on-1, dan booking kalender dengan integrasi Google Meet otomatis.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-[#0F766E] gap-1">
                <span>Pelajari Fitur</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 5: Blog SEO & Artikel */}
          <ScrollReveal direction="up" delay={360}>
            <Link
              href="/tools"
              className="h-full group bg-white border border-[#E2ECEA] hover:border-[#0F766E]/40 hover:shadow-lg rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#111C1B] group-hover:text-[#0F766E] transition-colors mb-2.5">
                  Blog SEO &amp; Artikel
                </h3>
                <p className="text-xs sm:text-sm text-[#526664] leading-relaxed">
                  Publikasikan artikel edukasi dan optimasi mesin pencari untuk menjaring trafik organik dari Google yang langsung terhubung ke tokomu.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-[#0F766E] gap-1">
                <span>Pelajari Fitur</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 6: Custom Domain Sendiri */}
          <ScrollReveal direction="up" delay={420}>
            <Link
              href="/pricing"
              className="h-full group bg-white border border-[#E2ECEA] hover:border-[#0F766E]/40 hover:shadow-lg rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E6F4F1] text-[#0F766E] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#111C1B] group-hover:text-[#0F766E] transition-colors mb-2.5">
                  Custom Domain Sendiri
                </h3>
                <p className="text-xs sm:text-sm text-[#526664] leading-relaxed">
                  Gunakan domain brand profesional Anda sendiri (contoh: namabrand.com) untuk membangun reputasi bisnis yang kredibel dan terpercaya.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-[#0F766E] gap-1">
                <span>Pelajari Fitur</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive Creator Showcase Carousel Section (#F4F8F7) */}
      <section className="bg-[#F4F8F7] border-y border-[#E2ECEA] py-20 lg:py-28 px-4 sm:px-6">
        <ScrollReveal direction="up" delay={100}>
          <div className="max-w-6xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] bg-white px-3 py-1 rounded-full border border-[#E2ECEA] shadow-2xs">
              Showcase Kreator &amp; Bisnis
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111C1B] tracking-tight">
              Lihat Bagaimana Mereka Berjualan dengan etalase.online
            </h2>
            <p className="text-[#526664] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Dari kreator edukasi, kedai kopi, sales showroom mobil, hingga beauty influencer di Asia Tenggara.
            </p>
          </div>
        </ScrollReveal>

        {/* 5-Phone Horizontal Showcase Carousel */}
        <ShowcaseCarousel />

        <ScrollReveal direction="up" delay={200}>
          <div className="text-center mt-10">
            <Link
              href="/templates"
              className="bg-white hover:bg-[#F4F8F7] border border-[#E2ECEA] text-[#111C1B] font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-xs inline-flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#0F766E]" />
              <span>Jelajahi Semua 11 Pilihan Template</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Closing CTA Banner - Harmonious Soft Teal Tint (#E6F4F1), Zero Dark #0B1220 Block */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <ScrollReveal direction="up" delay={150}>
          <div className="bg-[#E6F4F1] border border-[#C4E5DF] rounded-3xl p-10 sm:p-16 text-center shadow-xs space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/90 border border-[#C4E5DF] text-[#0F766E] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>Mulai Gratis Tanpa Kartu Kredit</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111C1B] leading-tight">
              Satu Link untuk Semua Penjualan Anda.
            </h2>

            <p className="text-sm sm:text-base text-[#526664] max-w-xl mx-auto leading-relaxed">
              Buka etalase online Anda sekarang. 0% komisi order chat, tanpa kontrak tersembunyi, dan langsung terhubung ke WhatsApp Anda dalam 3 menit.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/onboarding"
                className="w-full sm:w-auto bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition shadow-xs hover:shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>Buat Etalase Gratis Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://demo.etalase.online"
                target="_blank"
                className="w-full sm:w-auto bg-white hover:bg-[#F4F8F7] border border-[#E2ECEA] text-[#111C1B] font-semibold px-6 py-3.5 rounded-xl text-sm transition inline-flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>Lihat Demo Storefront</span>
              </Link>
            </div>

            <div className="text-xs text-[#526664] pt-2">
              Gratis Selamanya • Setup Kurang dari 3 Menit • Tanpa Biaya Tersembunyi
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Comprehensive Minimalist Footer */}
      <MarketingFooter />
    </div>
  );
}
