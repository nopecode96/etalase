"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TemplateRenderer } from "../templates/TemplateRenderer";
import { StoreTemplateProps } from "../templates/types";
import {
  Zap,
  Store,
  ShoppingBag,
  Calendar,
  Ticket,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Shield,
  Heart,
  Share2,
} from "lucide-react";

// 1. Demo Store Data for Single Source of Truth
const DEMO_RAFA_STORE: StoreTemplateProps["store"] = {
  name: "Studio Rafa Creative",
  slug: "rafa",
  bio: "Digital Creator & Video Editor. Berbagi preset cinematic & kelas editing.",
  locale: "id",
  currency: "IDR",
  tier: "FREE",
  templateId: "clean-minimal",
  avatarUrl: "/images/demo/avatar-rafa.jpg",
  bannerUrl: "/images/demo/banner-creator.jpg",
  chatChannel: "WHATSAPP",
  chatHandle: "6281234567890",
  chatChannels: [{ channel: "WHATSAPP", handle: "6281234567890", isPrimary: true }],
  appearanceConfig: {
    bgType: "pattern",
    bgValue: "subtle-dots",
    buttonStyle: "rounded",
    accentColor: "#D94E28",
    coverBannerUrl: "/images/demo/banner-creator.jpg",
    socialLinks: {
      tiktok: "https://tiktok.com/@rafacreative",
      instagram: "https://instagram.com/rafacreative",
      whatsapp: "https://wa.me/6281234567890",
      youtube: "https://youtube.com/@rafacreative",
    },
  },
};

const DEMO_RAFA_PRODUCTS: StoreTemplateProps["products"] = [
  {
    id: "r1",
    title: "Preset Lightroom Pro Cinematic Pack",
    slug: "preset-cinematic",
    price: 49000,
    compareAtPrice: 99000,
    images: ["/images/demo/product-preset.jpg"],
    checkoutMode: "DIRECT_CHECKOUT",
    isFeatured: true,
  },
  {
    id: "r2",
    title: "E-Book: 30 Hari Kuasai CapCut & Premiere",
    slug: "ebook-capcut",
    price: 99000,
    compareAtPrice: 159000,
    images: ["/images/demo/product-ebook.jpg"],
    checkoutMode: "DIRECT_CHECKOUT",
  },
  {
    id: "r3",
    title: "Microphone Wireless Clip-On Studio",
    slug: "mic-wireless",
    price: 189000,
    compareAtPrice: 249000,
    images: ["/images/demo/product-mic.jpg"],
    checkoutMode: "EXTERNAL_LINK",
    externalPlatform: "TIKTOK_SHOP",
    externalLabel: "Keranjang Kuning",
  },
  {
    id: "r4",
    title: "Mentoring 1-on-1 Content Growth",
    slug: "mentoring-content",
    price: 250000,
    compareAtPrice: 500000,
    images: ["/images/demo/product-mentoring.jpg"],
    checkoutMode: "CHAT_ORDER",
  },
];

const DEMO_BASTIAN_STORE: StoreTemplateProps["store"] = {
  name: "Bastian Showroom Mobil",
  slug: "bastianmobil",
  bio: "Dealer Resmi Mobil Baru & Bekas. Simulasi DP Ringan & Booking Test Drive ke Rumah Anda.",
  locale: "id",
  currency: "IDR",
  tier: "PRO",
  templateId: "showroom-pro",
  avatarUrl: "/images/demo/avatar-bastian.jpg",
  bannerUrl: "/images/demo/banner-showroom.jpg",
  chatChannel: "WHATSAPP",
  chatHandle: "6281234567892",
  chatChannels: [{ channel: "WHATSAPP", handle: "6281234567892", isPrimary: true }],
  appearanceConfig: {
    bgType: "solid",
    bgValue: "#F4F5F7",
    buttonStyle: "sharp",
    accentColor: "#18181B",
    coverBannerUrl: "/images/demo/banner-showroom.jpg",
    socialLinks: {
      tiktok: "https://tiktok.com/@bastianmobil",
      instagram: "https://instagram.com/bastianmobil",
      whatsapp: "https://wa.me/6281234567892",
    },
  },
};

const DEMO_BASTIAN_PRODUCTS: StoreTemplateProps["products"] = [
  {
    id: "s1",
    title: "All-New SUV Hybrid 2026",
    slug: "suv-hybrid",
    price: 0,
    images: ["/images/demo/product-car-suv.jpg"],
    checkoutMode: "CHAT_ORDER",
    isFeatured: true,
  },
  {
    id: "s2",
    title: "City Car Matic Sporty 1.2",
    slug: "city-car",
    price: 0,
    images: ["/images/demo/product-car-city.jpg"],
    checkoutMode: "CHAT_ORDER",
  },
  {
    id: "s3",
    title: "Cluster Modern Minimalis 2 Lantai",
    slug: "cluster-modern",
    price: 0,
    images: ["/images/demo/product-property.jpg"],
    checkoutMode: "CHAT_ORDER",
  },
];

const DEMO_AISYAH_STORE: StoreTemplateProps["store"] = {
  name: "Aisyah Hijab & Beauty",
  slug: "aisyahlook",
  bio: "Beauty, Hijab & Skincare Favorit. Rekomendasi racun harian yang beneran dipakai & worth to buy ✨",
  locale: "id",
  currency: "IDR",
  tier: "PRO",
  templateId: "editorial-pastel",
  avatarUrl: "/images/demo/avatar-aisyah.jpg",
  bannerUrl: "/images/demo/banner-beauty.jpg",
  chatChannel: "WHATSAPP",
  chatHandle: "6281234567893",
  chatChannels: [{ channel: "WHATSAPP", handle: "6281234567893", isPrimary: true }],
  appearanceConfig: {
    bgType: "pattern",
    bgValue: "organic-pastel",
    buttonStyle: "pill",
    accentColor: "#D94E28",
    coverBannerUrl: "/images/demo/banner-beauty.jpg",
    socialLinks: {
      tiktok: "https://tiktok.com/@aisyahlook",
      instagram: "https://instagram.com/aisyahlook",
      whatsapp: "https://wa.me/6281234567893",
    },
  },
};

const DEMO_AISYAH_PRODUCTS: StoreTemplateProps["products"] = [
  {
    id: "b1",
    title: "Glow Barrier Serum 30ml",
    slug: "glow-serum",
    price: 89000,
    compareAtPrice: 149000,
    images: ["/images/demo/product-serum.jpg"],
    checkoutMode: "EXTERNAL_LINK",
    externalPlatform: "TIKTOK_SHOP",
    externalLabel: "Keranjang Kuning",
    isFeatured: true,
  },
  {
    id: "b2",
    title: "Velvet Matte Lip Cream Silk",
    slug: "lip-cream",
    price: 79000,
    compareAtPrice: 110000,
    images: ["/images/demo/product-lipcream.jpg"],
    checkoutMode: "EXTERNAL_LINK",
    externalPlatform: "SHOPEE",
    externalLabel: "Shopee Mall",
  },
  {
    id: "b3",
    title: "Hijab Segiempat Voal Premium",
    slug: "hijab-voal",
    price: 45000,
    images: ["/images/demo/product-hijab.jpg"],
    checkoutMode: "EXTERNAL_LINK",
    externalPlatform: "TIKTOK_SHOP",
  },
  {
    id: "b4",
    title: "E-Book: 14 Hari Glowing Alami",
    slug: "ebook-glowing",
    price: 35000,
    images: ["/images/demo/product-ebook.jpg"],
    checkoutMode: "DIRECT_CHECKOUT",
    productType: "DIGITAL",
  },
];

export function InteractiveFeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const features = [
    {
      id: "digital",
      title: "Produk Digital & Auto-WA",
      icon: Zap,
      desc: "Jual e-book, template Canva, preset foto, atau video course. Struk dan link download terkirim otomatis ke WhatsApp.",
      rightView: "template-digital",
    },
    {
      id: "katalog",
      title: "Katalog Fisik & Showroom",
      icon: Store,
      desc: "Pajang unit mobil, motor, properti, pakaian, atau menu kuliner lengkap dengan foto tajam dan tombol chat tanya unit.",
      rightView: "template-showroom",
    },
    {
      id: "affiliate",
      title: "Affiliate Keranjang Kuning",
      icon: ShoppingBag,
      desc: "Kumpulkan rekomendasi produk dari TikTok Shop (Beg Kuning), Shopee, dan Tokopedia dalam 1 link tanpa batas tautan.",
      rightView: "template-affiliate",
    },
    {
      id: "booking",
      title: "Booking & Konsultasi 1-on-1",
      icon: Calendar,
      desc: "Buka sesi mentoring privat, audit portofolio, atau konsultasi dokter dengan pemilihan tanggal dan slot jam otomatis.",
      rightView: "view-booking",
    },
    {
      id: "event",
      title: "Event & Webinar Online",
      icon: Ticket,
      desc: "Registrasi tiket webinar online & acara offline dengan auto-kirim link Google Meet dan reminder jadwal ke WhatsApp.",
      rightView: "view-event",
    },
    {
      id: "blog",
      title: "Blog & Artikel SEO",
      icon: FileText,
      desc: "Publikasikan artikel edukasi untuk menjaring trafik gratis dari pencarian Google yang langsung mengarah ke produk tokomu.",
      rightView: "view-blog",
    },
    {
      id: "bio",
      title: "Bio Link Visual All-in-One",
      icon: Sparkles,
      desc: "Satu halaman beranda mobile yang merangkum semua link medsos, katalog jualan, dan nomor WhatsApp admin.",
      rightView: "template-bio",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Kolom Kiri: Grid 2x4 Kartu Klikable */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {features.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeFeature === idx;

          return (
            <button
              key={item.id}
              onClick={() => setActiveFeature(idx)}
              onMouseEnter={() => setActiveFeature(idx)}
              className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? "bg-white border-[#D94E28] shadow-md ring-1 ring-[#D94E28]/15"
                  : "bg-white/80 hover:bg-white border-[#E7E5E4] hover:border-stone-300 shadow-2xs"
              }`}
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isActive
                      ? "bg-[#FDF0EC] text-[#D94E28]"
                      : "bg-[#FAF8F5] text-[#57534E]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#1C1917] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 flex items-center text-[11px] font-bold text-[#D94E28] gap-1">
                <span>Lihat Pratinjau</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}

        {/* Kartu ke-8: CTA "Jelajahi semua fitur →" */}
        <Link
          href="/fitur"
          className="p-5 rounded-2xl bg-[#FDF0EC] border border-[#FADCD3] hover:border-[#D94E28] transition-all flex flex-col justify-between group shadow-2xs"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-white text-[#D94E28] flex items-center justify-center mb-3 shadow-2xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1C1917] mb-1.5">
              Lebih Banyak Kemampuan
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Domain custom, analitik pengunjung, pixel iklan, hingga integrasi multi-rekening SEA.
            </p>
          </div>

          <div className="pt-3 flex items-center text-xs font-bold text-[#D94E28] gap-1">
            <span>Jelajahi Semua Fitur</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Kolom Kanan: Single Source of Truth Phone Mockup */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="w-full max-w-[320px] sm:max-w-[340px] bg-[#1C1917] rounded-[2.8rem] p-3 shadow-2xl border-4 border-[#292524] relative flex flex-col items-center">
          {/* Dynamic Island Notch */}
          <div className="w-24 h-4 bg-black rounded-full mb-2 flex items-center justify-between px-2.5 shrink-0 z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
            <div className="w-2 h-2 rounded-full bg-stone-800 border border-stone-700"></div>
          </div>

          {/* Screen Content - Modern Mini-Store View */}
          <div className="w-full h-[540px] bg-[#FAF8F5] rounded-[2.1rem] overflow-y-auto no-scrollbar relative shadow-inner">
            {/* View 0: Produk Digital (Clean Minimal Live Template) */}
            {activeFeature === 0 && (
              <TemplateRenderer
                store={DEMO_RAFA_STORE}
                products={DEMO_RAFA_PRODUCTS}
                isMockup={true}
              />
            )}

            {/* View 1: Katalog Fisik & Showroom (Showroom Pro Live Template) */}
            {activeFeature === 1 && (
              <TemplateRenderer
                store={DEMO_BASTIAN_STORE}
                products={DEMO_BASTIAN_PRODUCTS}
                isMockup={true}
              />
            )}

            {/* View 2: Affiliate Keranjang Kuning (Editorial Pastel Live Template) */}
            {activeFeature === 2 && (
              <TemplateRenderer
                store={DEMO_AISYAH_STORE}
                products={DEMO_AISYAH_PRODUCTS}
                isMockup={true}
              />
            )}

            {/* View 3: Booking & Konsultasi 1-on-1 (Modern Appointment Storefront) */}
            {activeFeature === 3 && (
              <div className="min-h-full bg-[#FAF8F5] flex flex-col animate-fade-in text-left">
                {/* TopBar */}
                <div className="w-full px-4 py-2 flex items-center justify-between text-xs text-stone-500 border-b border-black/5 bg-white/70 backdrop-blur-xs select-none">
                  <span className="font-mono text-[11px] font-semibold text-stone-700 truncate">
                    mentoring.etalase.online
                  </span>
                  <Share2 className="w-3.5 h-3.5 text-stone-500" />
                </div>

                {/* Header Cover & Avatar Overlap */}
                <div className="relative w-full h-28 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="px-4 pb-5 -mt-10 relative z-10 flex flex-col items-center text-center">
                  <img
                    src="/images/demo/avatar-rafa.jpg"
                    alt="Rafa Consultant"
                    className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover bg-white"
                  />
                  <div className="flex items-center gap-1.5 mt-2">
                    <h4 className="font-bold text-sm text-[#1C1917]">Rafa Creative</h4>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full mt-1">
                    <Shield className="w-3 h-3" />
                    <span>Sesi Mentoring Privat 1-on-1</span>
                  </span>
                  <p className="text-[11px] text-[#57534E] mt-1.5 max-w-[240px]">
                    Bedah portofolio &amp; strategi monetisasi konten langsung via Google Meet.
                  </p>

                  {/* Consultation Service Card */}
                  <div className="w-full bg-white border border-[#E7E5E4] rounded-2xl p-3.5 mt-3 shadow-xs text-left space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1C1917]">Sesi 60 Menit</span>
                      <span className="text-xs font-extrabold text-[#D94E28]">
                        Rp 250.000 <span className="line-through text-[10px] text-stone-400 font-normal">Rp 500rb</span>
                      </span>
                    </div>

                    {/* Date Selector */}
                    <div className="pt-1 border-t border-stone-100 space-y-1.5">
                      <span className="text-[10px] font-bold text-stone-500 block">Pilih Tanggal:</span>
                      <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                        <span className="p-1.5 rounded-lg bg-[#D94E28] text-white font-bold shadow-xs">
                          Sel 24
                        </span>
                        <span className="p-1.5 rounded-lg bg-stone-100 text-stone-600 font-medium">Rab 25</span>
                        <span className="p-1.5 rounded-lg bg-stone-100 text-stone-600 font-medium">Kam 26</span>
                        <span className="p-1.5 rounded-lg bg-stone-100 text-stone-600 font-medium">Jum 27</span>
                      </div>
                    </div>

                    {/* Time Slot Chips */}
                    <div className="pt-1 border-t border-stone-100 flex items-center justify-between text-[10px]">
                      <span className="text-stone-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-[#D94E28]" />
                        <span>Slot: 10:00, 14:00, 19:30</span>
                      </span>
                      <span className="text-emerald-700 font-bold">2 Slot Tersedia</span>
                    </div>

                    <button
                      type="button"
                      className="w-full bg-[#1C1917] hover:bg-black text-white py-2.5 rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer mt-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Konfirmasi Jadwal via WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View 4: Event & Webinar Online (Modern Ticket Storefront) */}
            {activeFeature === 4 && (
              <div className="min-h-full bg-[#FAF8F5] flex flex-col animate-fade-in text-left">
                {/* TopBar */}
                <div className="w-full px-4 py-2 flex items-center justify-between text-xs text-stone-500 border-b border-black/5 bg-white/70 backdrop-blur-xs select-none">
                  <span className="font-mono text-[11px] font-semibold text-stone-700 truncate">
                    webinar.etalase.online
                  </span>
                  <Share2 className="w-3.5 h-3.5 text-stone-500" />
                </div>

                {/* Banner Event */}
                <div className="relative w-full h-32 overflow-hidden shrink-0">
                  <img
                    src="/images/demo/banner-creator.jpg"
                    alt="Webinar Event Banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-purple-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                    Live via Zoom &amp; Meet
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">
                      Masterclass Interaktif 2026
                    </span>
                    <h4 className="font-bold text-sm text-[#1C1917] mt-0.5 leading-snug">
                      Strategi Monetisasi Konten &amp; Menjual Produk Digital Pertama
                    </h4>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-base font-extrabold text-[#D94E28]">Rp 149.000</span>
                      <span className="line-through text-xs text-stone-400">Rp 300.000</span>
                      <span className="text-[10px] font-bold bg-[#FDF0EC] text-[#D94E28] px-2 py-0.5 rounded-full border border-[#FADCD3]">
                        Hemat 50%
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#E7E5E4] rounded-xl p-3 text-xs space-y-1.5 text-stone-600">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">📅 Waktu:</span>
                      <span>Sabtu, 28 November 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">⏰ Jam:</span>
                      <span>19:30 - 21:30 WIB</span>
                    </div>
                    <div className="text-[11px] text-purple-700 font-semibold pt-1 border-t border-stone-100">
                      ✓ Link akses &amp; reminder dikirim otomatis ke WA Anda
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full bg-[#D94E28] hover:bg-[#B83E1D] text-white py-3 rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <span>Daftar Tiket (Auto-Kirim WA)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* View 5: Blog & Artikel SEO (Editorial Reader View) */}
            {activeFeature === 5 && (
              <div className="min-h-full bg-[#FAF8F5] flex flex-col animate-fade-in text-left">
                {/* TopBar */}
                <div className="w-full px-4 py-2 flex items-center justify-between text-xs text-stone-500 border-b border-black/5 bg-white/70 backdrop-blur-xs select-none">
                  <span className="font-mono text-[11px] font-semibold text-stone-700 truncate">
                    blog.etalase.online
                  </span>
                  <Share2 className="w-3.5 h-3.5 text-stone-500" />
                </div>

                <div className="relative w-full h-32 overflow-hidden shrink-0">
                  <img
                    src="/images/demo/banner-cafe.jpg"
                    alt="Blog Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Panduan Bisnis • 3 Min Read
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#1C1917] leading-snug">
                      5 Cara Menghasilkan 10 Juta Pertama dari Produk Digital Tanpa Modal Besar
                    </h4>
                    <p className="text-[11px] text-[#57534E] mt-1.5 leading-relaxed line-clamp-3">
                      Membangun bio link berkonversi tinggi jauh lebih efektif dibanding sekadar menumpuk link teks di media sosial...
                    </p>
                  </div>

                  {/* Embedded Recommended Product Callout */}
                  <div className="bg-white border border-[#E7E5E4] rounded-xl p-3 shadow-2xs space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D94E28]">
                      Rekomendasi Penulis
                    </span>
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/images/demo/product-ebook.jpg"
                        alt="E-book"
                        className="w-11 h-11 rounded-lg object-cover bg-stone-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-[#1C1917] truncate">
                          E-Book: 30 Hari Kuasai CapCut
                        </div>
                        <div className="text-[11px] font-extrabold text-[#D94E28]">Rp 99.000</div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#1C1917] text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Baca Artikel Penuh</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* View 6: Bio Link Visual All-in-One (Strict Single Source of Truth via TemplateRenderer) */}
            {activeFeature === 6 && (
              <TemplateRenderer
                store={DEMO_RAFA_STORE}
                products={DEMO_RAFA_PRODUCTS}
                isMockup={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
