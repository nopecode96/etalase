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
  MessageCircle,
  Calendar,
  Users,
  CheckCircle2,
  ChevronRight,
  Sparkles,
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
    <div className="flex flex-col min-h-screen bg-[#FAFAF9] text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* Unified Marketing Navbar */}
      <MarketingNavbar />

      {/* Hero Section with Split 2-Column & Product Inside Hero */}
      <section className="pt-12 sm:pt-20 pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copywriting & Instant Slug Claim */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <ScrollReveal direction="up" delay={50}>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>All-in-One Bio Link &amp; Chat Commerce Asia Tenggara</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={120}>
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Satu Link Bio untuk Semua Penjualan{" "}
                <span className="text-blue-600">TikTok, IG &amp; WhatsApp</span> Anda.
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Jual file digital dengan auto-delivery WhatsApp instan, terima pembayaran QRIS otomatis, rekomendasikan Keranjang Kuning, dan dapatkan pesanan chat dengan <strong>0% komisi platform</strong>.
              </p>
            </ScrollReveal>

            {/* 1-Step Instant Username Claimer Form */}
            <ScrollReveal direction="up" delay={260}>
              <form
                onSubmit={handleClaim}
                className="max-w-md mx-auto lg:mx-0 bg-white border border-slate-200 rounded-2xl p-2 shadow-lg shadow-slate-200/50 flex flex-col sm:flex-row items-center gap-2"
              >
                <div className="flex items-center w-full px-3 py-2 text-sm text-slate-500 font-mono">
                  <span className="text-slate-400 select-none">etalase.online/</span>
                  <input
                    type="text"
                    placeholder="namamu"
                    value={claimSlug}
                    onChange={(e) => setClaimSlug(e.target.value)}
                    className="w-full bg-transparent text-slate-900 font-bold focus:outline-none ml-0.5 placeholder:text-slate-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl text-xs transition shrink-0 shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Klaim Link</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={320}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>0% Komisi Order Chat</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Auto-Kirim WA via n8n</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Gratis Selamanya</span>
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Live Interactive Smartphone Mockup with Floating Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal direction="none" delay={250}>
              <HeroProductMockup />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Infinite Horizontal Scrolling Cards (Creator Marquee) */}
      <section className="py-8 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 text-center mb-2">
          <ScrollReveal direction="up" delay={100}>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Digunakan Kreator, Coach &amp; Pebisnis di Seluruh Asia Tenggara
            </span>
          </ScrollReveal>
        </div>
        <CreatorMarquee />
      </section>

      {/* Multi-Page Feature Pillars Section */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Ekosistem Monetisasi Terlengkap
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Semua Fitur Monetisasi dalam Satu Genggaman
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Bukan sekadar daftar link statis, melainkan platform penjualan visual berkonversi tinggi:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Produk Digital */}
          <ScrollReveal direction="up" delay={150}>
            <Link
              href="/digital-product"
              className="h-full group bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-slate-200/60 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                  Produk Digital &amp; E-Learning
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jual e-book, template Canva/Notion, preset foto, dan video modul dengan auto-delivery WhatsApp instan via n8n.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-blue-600 gap-1">
                <span>Pelajari Fitur</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 2: Event & Webinar */}
          <ScrollReveal direction="up" delay={250}>
            <Link
              href="/event"
              className="h-full group bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-200/60 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition">
                  Tiket Event &amp; Webinar
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Registrasi tiket webinar online &amp; acara offline dengan auto-kirim link Zoom/GMeet dan reminder jadwal.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-emerald-600 gap-1">
                <span>Pelajari Fitur</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 3: Konsultasi 1-on-1 */}
          <ScrollReveal direction="up" delay={350}>
            <Link
              href="/consultation"
              className="h-full group bg-white border border-slate-200 hover:border-amber-300 hover:shadow-xl hover:shadow-slate-200/60 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition">
                  Konsultasi &amp; Booking 1-on-1
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Buka sesi mentoring, review portfolio, atau konsultasi privat via Google Meet dengan pemilihan slot waktu instan.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-amber-600 gap-1">
                <span>Pelajari Fitur</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Card 4: Afiliasi */}
          <ScrollReveal direction="up" delay={450}>
            <Link
              href="/affiliate"
              className="h-full group bg-white border border-slate-200 hover:border-purple-300 hover:shadow-xl hover:shadow-slate-200/60 rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition">
                  Jaringan Afiliasi Kreator
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rekrut pasukan affiliator untuk menjualkan produk Anda dengan sistem komisi otomatis dan link referral transparan.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-purple-600 gap-1">
                <span>Pelajari Fitur</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive Template Showcase */}
      <section className="bg-slate-100/60 border-y border-slate-200/80 py-20 px-4 sm:px-6">
        <ScrollReveal direction="up" delay={100}>
          <div className="max-w-6xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
              Galeri 11 Archetype Desain
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Pilih Gaya Visual yang Sesuai dengan Brand Anda
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              Dari minimalis elegan, warm cafe, hingga beauty glam. Tampil menawan di layar HP pengunjung.
            </p>
          </div>
        </ScrollReveal>

        <ShowcaseCarousel />

        <ScrollReveal direction="up" delay={200}>
          <div className="text-center mt-10">
            <Link
              href="/templates"
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-xl text-xs transition-all shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Jelajahi Semua 11 Template</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Simple Warm CTA Banner */}
      <section className="py-24 px-4 sm:px-6 max-w-5xl mx-auto w-full text-center">
        <ScrollReveal direction="up" delay={150}>
          <div className="bg-slate-900 rounded-3xl p-10 sm:p-14 shadow-xl text-white space-y-5">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Mulai Buat Etalase Bio Link Anda Sekarang.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Daftar gratis dalam hitungan detik. 0% komisi order chat, tanpa kontrak, tanpa biaya langganan bulanan tersembunyi.
            </p>
            <div className="pt-3">
              <Link
                href="/onboarding"
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-3.5 rounded-2xl text-sm transition shadow-md inline-flex items-center gap-2"
              >
                <span>Buka Etalase Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Comprehensive Footer */}
      <MarketingFooter />
    </div>
  );
}
