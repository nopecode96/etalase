"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TemplateRenderer } from "../templates/TemplateRenderer";
import { StoreTemplateProps } from "../templates/types";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface ArchetypeDemo {
  id: string;
  name: string;
  subdomain: string;
  industry: string;
  tag: string;
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
    store: {
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
    },
    products: [
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
    ],
  },
  {
    id: "cafe",
    name: "Cafe & F&B",
    subdomain: "kopisenja.etalase.online",
    industry: "Menu Visual & Order Kasir WA",
    tag: "Visual Menu Grid",
    store: {
      name: "Kopi Senja Roastery",
      slug: "kopisenja",
      bio: "Kopi spesialti seduh manual & bakery fresh oven setiap pagi. Buka 08:00 - 22:00.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      templateId: "visual-menu-grid",
      avatarUrl: "/images/demo/avatar-senja.jpg",
      bannerUrl: "/images/demo/banner-cafe.jpg",
      chatChannel: "WHATSAPP",
      chatHandle: "6281234567891",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567891", isPrimary: true }],
      appearanceConfig: {
        bgType: "solid",
        bgValue: "#FAF6F0",
        buttonStyle: "pill",
        accentColor: "#4A2C2A",
        coverBannerUrl: "/images/demo/banner-cafe.jpg",
        socialLinks: {
          instagram: "https://instagram.com/kopisenja",
          whatsapp: "https://wa.me/6281234567891",
          website: "https://kopisenja.etalase.online",
        },
      },
    },
    products: [
      {
        id: "k1",
        title: "Kopi Susu Aren Senja",
        slug: "aren-senja",
        price: 25000,
        compareAtPrice: 28000,
        images: ["/images/demo/product-coffee-aren.jpg"],
        checkoutMode: "CHAT_ORDER",
        isFeatured: true,
        category: "Kopi",
      },
      {
        id: "k2",
        title: "Butter Croissant Fresh Oven",
        slug: "croissant",
        price: 28000,
        compareAtPrice: 32000,
        images: ["/images/demo/product-croissant.jpg"],
        checkoutMode: "CHAT_ORDER",
        category: "Pastry",
      },
      {
        id: "k3",
        title: "V60 Gayo Highland Single Origin",
        slug: "v60-gayo",
        price: 32000,
        images: ["/images/demo/product-v60.jpg"],
        checkoutMode: "CHAT_ORDER",
        category: "Kopi",
      },
      {
        id: "k4",
        title: "Biji Kopi Arabika Gayo 250g",
        slug: "arabika-250",
        price: 95000,
        compareAtPrice: 110000,
        images: ["/images/demo/product-beans.jpg"],
        checkoutMode: "DIRECT_CHECKOUT",
        category: "Biji Kopi",
      },
    ],
  },
  {
    id: "sales",
    name: "Sales Mobil & Properti",
    subdomain: "bastianmobil.etalase.online",
    industry: "Katalog Showroom & Simulasi DP",
    tag: "Showroom Pro",
    store: {
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
    },
    products: [
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
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Affiliate",
    subdomain: "aisyahlook.etalase.online",
    industry: "Keranjang Kuning & Racun Viral",
    tag: "Editorial Pastel",
    store: {
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
    },
    products: [
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
    ],
  },
];

export function Showcase4Archetypes() {
  const [activeTab, setActiveTab] = useState(0);
  const activeArchetype = ARCHETYPES[activeTab];

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
              Dirancang khusus untuk kebutuhan {activeArchetype.industry}. Desain mobile-first yang rapi dan memudahkan pembeli menyelesaikan pesanan dalam 1 kali klik.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#E7E5E4] text-xs text-[#57534E]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D94E28]"></span>
              <span>Desain mobile-first yang rapi dan memudahkan checkout 1-klik</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D94E28]"></span>
              <span>Mendukung harga pasti, simulasi DP, hingga tombol &apos;Tanya Harga&apos;</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D94E28]"></span>
              <span>Terhubung langsung ke WhatsApp &amp; Checkout QRIS Instan</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={`/register?template=${activeArchetype.id}`}
              className="inline-flex items-center gap-2 bg-[#D94E28] hover:bg-[#B83E1D] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition"
            >
              <span>Gunakan Template Ini Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: 1 Clean Phone Mockup Rendering the Exact Single Source of Truth Template */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[320px] sm:max-w-[340px] bg-[#1C1917] rounded-[2.8rem] p-3 shadow-xl border-4 border-[#292524] flex flex-col items-center">
            {/* Notch */}
            <div className="w-24 h-4 bg-black rounded-full mb-2 flex items-center justify-between px-2.5 shrink-0 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
              <div className="w-2 h-2 rounded-full bg-stone-800 border border-stone-700"></div>
            </div>

            {/* Screen Frame - Strict Single Source of Truth */}
            <div className="w-full h-[540px] bg-[#FAF8F5] rounded-[2.1rem] overflow-y-auto no-scrollbar relative shadow-inner">
              <TemplateRenderer
                store={activeArchetype.store}
                products={activeArchetype.products}
                isMockup={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
