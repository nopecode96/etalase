"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CleanMinimal } from "../templates/clean-minimal/CleanMinimal";
import { CafeMenu } from "../templates/cafe-menu/CafeMenu";
import { SalesShowcase } from "../templates/sales-showcase/SalesShowcase";
import { BeautyGlam } from "../templates/beauty-glam/BeautyGlam";
import { StoreTemplateProps } from "../templates/types";
import { CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";

interface ArchetypeDemo {
  id: string;
  name: string;
  subdomain: string;
  industry: string;
  tag: string;
  component: React.FC<StoreTemplateProps>;
  store: StoreTemplateProps["store"];
  products: StoreTemplateProps["products"];
}

const ARCHETYPES: ArchetypeDemo[] = [
  {
    id: "creator",
    name: "Kreator Digital",
    subdomain: "rafa.etalase.online",
    industry: "E-Book, Preset & Mentoring",
    tag: "Clean Minimal",
    component: CleanMinimal,
    store: {
      name: "Studio Rafa Creative",
      slug: "rafa",
      bio: "Digital Creator & Video Editor. Berbagi preset cinematic & kelas editing.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567890", isPrimary: true }],
    },
    products: [
      {
        id: "r1",
        title: "Preset Lightroom Pro Cinematic Pack",
        slug: "preset-cinematic",
        price: 49000,
        images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "DIRECT_CHECKOUT",
        secondaryModes: [{ mode: "CHAT_ORDER", label: "Tanya via WA" }],
      },
      {
        id: "r2",
        title: "E-Book: 30 Hari Kuasai CapCut & Premiere",
        slug: "ebook-capcut",
        price: 99000,
        images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "DIRECT_CHECKOUT",
      },
      {
        id: "r3",
        title: "Mentoring 1-on-1 Content Growth",
        slug: "mentoring-content",
        price: 250000,
        images: ["https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
    ],
  },
  {
    id: "cafe",
    name: "Cafe & Resto",
    subdomain: "kopisenja.etalase.online",
    industry: "Menu Visual & Order Kasir QR",
    tag: "Visual Menu Grid",
    component: CafeMenu,
    store: {
      name: "Kopi Senja Roastery",
      slug: "kopisenja",
      bio: "Kopi spesialti seduh manual & bakery hangat fresh setiap pagi.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      avatarUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567891", isPrimary: true }],
    },
    products: [
      {
        id: "k1",
        title: "Kopi Susu Aren Senja",
        slug: "aren-senja",
        price: 25000,
        images: ["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
      {
        id: "k2",
        title: "Butter Croissant",
        slug: "croissant",
        price: 28000,
        images: ["https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
      {
        id: "k3",
        title: "V60 Gayo Highland",
        slug: "v60-gayo",
        price: 32000,
        images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
      {
        id: "k4",
        title: "Biji Kopi Arabika 250g",
        slug: "arabika-250",
        price: 95000,
        images: ["https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "DIRECT_CHECKOUT",
      },
    ],
  },
  {
    id: "sales",
    name: "Sales Mobil & Properti",
    subdomain: "bastianmobil.etalase.online",
    industry: "Katalog Showroom & Simulasi DP",
    tag: "Showroom Pro",
    component: SalesShowcase,
    store: {
      name: "Bastian Showroom Mobil",
      slug: "bastianmobil",
      bio: "Dealer Resmi Mobil Baru & Bekas. Simulasi DP Ringan & Booking Test Drive.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567892", isPrimary: true }],
    },
    products: [
      {
        id: "s1",
        title: "All-New SUV Hybrid 2026",
        slug: "suv-hybrid",
        price: "Mulai DP 15 Jt",
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
      {
        id: "s2",
        title: "City Car Matic Termurah",
        slug: "city-car",
        price: "Angsuran 3 Jt-an",
        images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Affiliate",
    subdomain: "aisyahlook.etalase.online",
    industry: "Keranjang Kuning, Shopee & TikTok",
    tag: "Editorial Pastel",
    component: BeautyGlam,
    store: {
      name: "Aisyah Hijab & Beauty",
      slug: "aisyahlook",
      bio: "Rekomendasi makeup, skincare favorit & koleksi hijab harian.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567893", isPrimary: true }],
    },
    products: [
      {
        id: "b1",
        title: "Velvet Matte Lip Cream Silk",
        slug: "lip-cream",
        price: 89000,
        images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "EXTERNAL_LINK",
        externalPlatform: "TIKTOK_SHOP",
        externalLabel: "Keranjang Kuning TikTok",
      },
      {
        id: "b2",
        title: "Glow Serum Niacinamide 10%",
        slug: "glow-serum",
        price: 129000,
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "EXTERNAL_LINK",
        externalPlatform: "TIKTOK_SHOP",
        externalLabel: "Keranjang Kuning TikTok",
      },
    ],
  },
];

export function Showcase4Archetypes() {
  const [activeTab, setActiveTab] = useState(0);
  const activeArchetype = ARCHETYPES[activeTab];
  const Component = activeArchetype.component;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* 4 Archetype Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 bg-white border border-[#E7E5E4] rounded-2xl shadow-xs">
        {ARCHETYPES.map((arch, index) => {
          const isSelected = activeTab === index;
          return (
            <button
              key={arch.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5]"
              }`}
            >
              <span>{arch.name}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isSelected ? "bg-white/20 text-white" : "bg-[#FAF8F5] text-[#57534E]"
                }`}
              >
                {arch.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Showcase Display: Info Card Left + Real Phone Mockup Right */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* Left Column: Archetype Details */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] text-xs font-bold px-3 py-1 rounded-full">
            <span>Subdomain Mandiri Aktif</span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {activeArchetype.name}
            </h3>
            <div className="font-mono text-sm sm:text-base font-bold text-[#D94E28] mt-1 flex items-center gap-1.5">
              <span>https://{activeArchetype.subdomain}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-sm text-[#57534E] mt-3 leading-relaxed">
              Dirancang khusus untuk kebutuhan {activeArchetype.industry}. Tata letak vertikal penuh mencegah benturan tombol dan memudahkan pembeli menyelesaikan pesanan dalam 1 kali klik.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#E7E5E4] text-xs text-[#57534E]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D94E28]"></span>
              <span>Tata letak vertikal anti-tabrakan untuk layar smartphone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D94E28]"></span>
              <span>Format harga dinamis (Bebas dari bug Rp 0)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D94E28]"></span>
              <span>Terhubung langsung ke WhatsApp &amp; Checkout QRIS Instan</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/onboarding?template=${activeArchetype.id}`}
              className="inline-flex items-center gap-2 bg-[#D94E28] hover:bg-[#B83E1D] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition"
            >
              <span>Gunakan Template Ini Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: 1 Clean Phone Mockup Rendering the Exact Isolated Template */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[320px] sm:max-w-[340px] bg-[#1C1917] rounded-[2.8rem] p-3 shadow-xl border-4 border-[#292524] flex flex-col items-center">
            {/* Notch */}
            <div className="w-24 h-4 bg-black rounded-full mb-2 flex items-center justify-between px-2.5 shrink-0 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
              <div className="w-2 h-2 rounded-full bg-stone-800 border border-stone-700"></div>
            </div>

            {/* Screen Frame */}
            <div className="w-full h-[540px] bg-[#FAF8F5] rounded-[2.1rem] overflow-y-auto no-scrollbar relative shadow-inner">
              <Component
                store={activeArchetype.store}
                products={activeArchetype.products}
                isPreview={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
