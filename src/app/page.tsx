"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShowcaseCarousel } from "@/components/home/ShowcaseCarousel";
import { CreatorMarquee } from "@/components/home/CreatorMarquee";
import { HeroProductMockup } from "@/components/home/HeroProductMockup";
import {
  ArrowRight,
  ShoppingBag,
  Zap,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Calendar,
  Users,
  CheckCircle2,
  ChevronRight,
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
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-500/30">
              E
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              etalase<span className="text-blue-500">.online</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <Link href="/digital-product" className="hover:text-white transition">
              Produk Digital
            </Link>
            <Link href="/event" className="hover:text-white transition">
              Event &amp; Webinar
            </Link>
            <Link href="/consultation" className="hover:text-white transition">
              Konsultasi 1-on-1
            </Link>
            <Link href="/affiliate" className="hover:text-white transition">
              Afiliasi
            </Link>
            <Link href="/templates" className="hover:text-white transition">
              Template (11)
            </Link>
            <Link href="/pricing" className="hover:text-white transition">
              Harga
            </Link>
            <Link href="/tools" className="hover:text-white transition">
              Free Tools
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/onboarding"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-500/25 flex items-center gap-1.5"
            >
              <span>Mulai Gratis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Split 2-Column & Product Inside Hero */}
      <section className="pt-12 sm:pt-20 pb-16 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copywriting & Instant Slug Claim */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Platform Bio Link &amp; Etalase Visual No. 1 Asia Tenggara</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Satu Link Bio untuk Jualan Produk Digital, Keranjang Kuning &amp; Order Chat.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Tinggalkan bio link biasa yang kaku. Ubah pengunjung media sosial Anda jadi pembeli setia dengan checkout instan QRIS/PayPal, preset Beg Kuning TikTok &amp; Shopee, serta order WhatsApp tanpa potongan komisi.
            </p>

            {/* 1-Step Instant Username Claimer Form */}
            <form
              onSubmit={handleClaim}
              className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto lg:mx-0 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl"
            >
              <div className="flex items-center pl-3.5 text-xs text-slate-400 font-mono w-full sm:w-auto">
                <span>etalase.online/</span>
                <input
                  type="text"
                  placeholder="namamu"
                  value={claimSlug}
                  onChange={(e) => setClaimSlug(e.target.value)}
                  className="bg-transparent text-white font-bold text-xs pl-0.5 pr-2 py-2 outline-none w-full sm:w-28 placeholder:text-slate-600"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-md shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Klaim Link Saya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>0% Komisi Order Chat</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Auto-Kirim WA via n8n</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1-Klik Google Connect</span>
              </span>
            </div>
          </div>

          {/* Right Column: Live Interactive Smartphone Mockup with Floating Badges */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroProductMockup />
          </div>
        </div>
      </section>

      {/* Infinite Horizontal Scrolling Cards (Creator Marquee) */}
      <CreatorMarquee />

      {/* Multi-Page Feature Pillars Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Ekosistem Monetisasi Terlengkap
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Semua yang Anda Butuhkan untuk Cuan Maksimal
          </h2>
          <p className="text-slate-400 text-sm">
            Bukan sekadar penampung tautan, melainkan mesin konversi multi-channel:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Produk Digital */}
          <Link
            href="/digital-product"
            className="group bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                Produk Digital &amp; E-Learning
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Jual e-book, template Notion, preset foto, dan video modul dengan auto-delivery WhatsApp instan via n8n.
              </p>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-blue-400 gap-1">
              <span>Pelajari Fitur</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Event & Webinar */}
          <Link
            href="/event"
            className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition">
                Tiket Event &amp; Webinar
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Registrasi tiket webinar online &amp; acara offline dengan auto-kirim link Zoom/GMeet dan reminder jadwal.
              </p>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-emerald-400 gap-1">
              <span>Pelajari Fitur</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Konsultasi 1-on-1 */}
          <Link
            href="/consultation"
            className="group bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                Konsultasi &amp; Booking 1-on-1
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Buka sesi mentoring, review toko, atau konsultasi privat via Google Meet dengan pemilihan slot waktu instan.
              </p>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-amber-400 gap-1">
              <span>Pelajari Fitur</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Afiliasi */}
          <Link
            href="/affiliate"
            className="group bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition">
                Jaringan Afiliasi Kreator
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rekrut pasukan affiliator untuk menjualkan produk Anda dengan sistem komisi otomatis dan link referral transparan.
              </p>
            </div>
            <div className="pt-6 flex items-center text-xs font-bold text-purple-400 gap-1">
              <span>Pelajari Fitur</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Interactive Template Showcase */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Galeri Template Lynk.id Style
          </span>
          <h2 className="text-3xl font-black text-white">
            11 Template Khusus Karakter Industri Anda
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Bebas pilih tema visual yang sesuai tanpa repot mengatur CSS. Kontras tajam dan mobile-first.
          </p>
        </div>
        <ShowcaseCarousel />
        <div className="text-center mt-8">
          <Link
            href="/templates"
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition inline-flex items-center gap-1.5"
          >
            <span>Buka Halaman Galeri Semua Template</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Simple CTA Banner */}
      <section className="py-20 px-4 max-w-5xl mx-auto w-full text-center space-y-6">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 sm:p-14 shadow-2xl text-white space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Siap Membangun Etalase Cuan Anda Hari Ini?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            Daftar gratis dalam 10 detik dengan Google Connect. Tanpa instalasi rumit, tanpa biaya bulanan tersembunyi.
          </p>
          <div className="pt-4">
            <Link
              href="/onboarding"
              className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-3.5 rounded-2xl text-sm transition shadow-lg inline-flex items-center gap-2"
            >
              <span>Buka Etalase Gratis Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <footer className="mt-auto bg-slate-950 border-t border-slate-900 py-14 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Col 1 & 2: Brand */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base">
                E
              </div>
              <span className="font-bold text-lg text-white">etalase.online</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              All-in-One Bio Link, Visual Storefront &amp; Chat-First Commerce Platform untuk kreator dan bisnis di Asia Tenggara.
            </p>
            <p className="text-[11px] text-slate-600">
              Didukung Borderpay QRIS Cross-Border &amp; WhatsApp Automation Engine.
            </p>
          </div>

          {/* Col 3: Fitur */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Fitur Utama</h4>
            <ul className="space-y-2">
              <li><Link href="/digital-product" className="hover:text-white transition">Produk Digital</Link></li>
              <li><Link href="/event" className="hover:text-white transition">Event &amp; Webinar</Link></li>
              <li><Link href="/consultation" className="hover:text-white transition">Konsultasi 1-on-1</Link></li>
              <li><Link href="/affiliate" className="hover:text-white transition">Afiliasi Kreator</Link></li>
            </ul>
          </div>

          {/* Col 4: Solusi */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Solusi Industri</h4>
            <ul className="space-y-2">
              <li><Link href="/creator" className="hover:text-white transition">Content Creator</Link></li>
              <li><Link href="/sales" className="hover:text-white transition">Sales Mobil &amp; Properti</Link></li>
              <li><Link href="/umkm" className="hover:text-white transition">F&amp;B &amp; Toko Offline</Link></li>
              <li><Link href="/templates" className="hover:text-white transition">Galeri Template</Link></li>
            </ul>
          </div>

          {/* Col 5: Tools & Harga */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/pricing" className="hover:text-white transition">Paket &amp; Harga</Link></li>
              <li><Link href="/tools" className="hover:text-white transition">Kalkulator Penghematan</Link></li>
              <li><Link href="/tools" className="hover:text-white transition">WhatsApp Link Gen</Link></li>
              <li><Link href="/mabes/login" className="hover:text-white transition">Mabes Admin</Link></li>
            </ul>
          </div>

          {/* Col 6: Regional SEA */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Regional SEA</h4>
            <div className="space-y-1.5 text-[11px] text-slate-500">
              <div>🇮🇩 Indonesia (QRIS)</div>
              <div>🇲🇾 Malaysia (Beg Kuning)</div>
              <div>🇸🇬 Singapore (PayNow)</div>
              <div>🇹🇭 Thailand (LINE)</div>
              <div>🇻🇳 Vietnam (Zalo)</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>&copy; {new Date().getFullYear()} etalase.online. Hak Cipta Dilindungi.</div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="hover:text-slate-400">Privasi</Link>
            <Link href="/pricing" className="hover:text-slate-400">Ketentuan Layanan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
