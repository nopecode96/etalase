"use client";

import React from "react";
import { TemplateRenderer } from "../templates/TemplateRenderer";
import { Zap, ShoppingBag, MessageCircle, Store } from "lucide-react";
import { StoreTemplateProps } from "../templates/types";

const DEMO_STORE: StoreTemplateProps["store"] = {
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

const DEMO_PRODUCTS: StoreTemplateProps["products"] = [
  {
    id: "h1",
    title: "Preset Lightroom Pro Cinematic Pack",
    slug: "preset-cinematic",
    price: 49000,
    compareAtPrice: 99000,
    images: ["/images/demo/product-preset.jpg"],
    checkoutMode: "DIRECT_CHECKOUT",
    isFeatured: true,
  },
  {
    id: "h2",
    title: "E-Book: 30 Hari Kuasai CapCut & Premiere",
    slug: "ebook-capcut",
    price: 99000,
    compareAtPrice: 159000,
    images: ["/images/demo/product-ebook.jpg"],
    checkoutMode: "DIRECT_CHECKOUT",
  },
  {
    id: "h3",
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
    id: "h4",
    title: "Mentoring 1-on-1 Content Growth",
    slug: "mentoring-content",
    price: 250000,
    compareAtPrice: 500000,
    images: ["/images/demo/product-mentoring.jpg"],
    checkoutMode: "CHAT_ORDER",
  },
];

export function Hero3DDevice() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[370px] mx-auto perspective-1000 select-none py-6">
      {/* 4 Floating Badges Outside the Mockup Frame */}
      
      {/* Badge 1: Top Left Outer (Produk Digital) */}
      <div className="absolute -top-1 -left-4 sm:-left-12 z-20 animate-float-slow hidden xs:flex items-center gap-2 bg-white/95 border border-[#E7E5E4] rounded-2xl px-3 py-2 shadow-md backdrop-blur-xs">
        <div className="w-7 h-7 rounded-lg bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 fill-current" />
        </div>
        <div className="text-left">
          <div className="text-[11px] font-bold text-[#1C1917]">Produk Digital</div>
          <div className="text-[9px] text-[#57534E]">Auto-Kirim ke WA</div>
        </div>
      </div>

      {/* Badge 2: Top Right Outer (Order WA) */}
      <div className="absolute top-12 -right-4 sm:-right-10 z-20 animate-float-delayed flex items-center gap-2 bg-white/95 border border-[#E7E5E4] rounded-2xl px-3 py-2 shadow-md backdrop-blur-xs">
        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <MessageCircle className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="text-[11px] font-bold text-[#1C1917]">Order Direct Chat</div>
          <div className="text-[9px] text-emerald-600 font-semibold">0% Komisi</div>
        </div>
      </div>

      {/* Badge 3: Bottom Left Outer (Katalog Fisik) */}
      <div className="absolute bottom-20 -left-4 sm:-left-12 z-20 animate-float-slow hidden xs:flex items-center gap-2 bg-white/95 border border-[#E7E5E4] rounded-2xl px-3 py-2 shadow-md backdrop-blur-xs">
        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Store className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="text-[11px] font-bold text-[#1C1917]">Katalog Showroom</div>
          <div className="text-[9px] text-[#57534E]">Mobil &amp; Properti</div>
        </div>
      </div>

      {/* Badge 4: Bottom Right Outer (Keranjang Kuning) */}
      <div className="absolute -bottom-2 -right-3 sm:-right-8 z-20 animate-float-delayed flex items-center gap-2 bg-white/95 border border-[#E7E5E4] rounded-2xl px-3 py-2 shadow-md backdrop-blur-xs">
        <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="text-[11px] font-bold text-[#1C1917]">Keranjang Kuning</div>
          <div className="text-[9px] text-amber-600 font-semibold">+TikTok &amp; Shopee</div>
        </div>
      </div>

      {/* 3D Container with Tilt */}
      <div className="relative transform-style-3d tilt-3d-hero">
        {/* Secondary Screen Depth Layer Behind Mockup */}
        <div className="absolute inset-0 bg-[#E7E5E4] rounded-[2.8rem] border-2 border-stone-300 tilt-3d-depth-layer opacity-60 blur-[1px]"></div>

        {/* Primary Smartphone Mockup */}
        <div className="relative w-full h-[580px] bg-[#1C1917] rounded-[2.8rem] p-2.5 shadow-2xl border-4 border-[#292524] flex flex-col items-center ring-1 ring-black/20">
          {/* Dynamic Island Notch */}
          <div className="w-24 h-4 bg-black rounded-full mb-1.5 flex items-center justify-between px-2.5 z-10 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
            <div className="w-2 h-2 rounded-full bg-stone-800 border border-stone-700"></div>
          </div>

          {/* Screen Content - Single Source of Truth via TemplateRenderer */}
          <div className="w-full h-full bg-[#FAF8F5] rounded-[2.1rem] overflow-y-auto no-scrollbar relative shadow-inner">
            <TemplateRenderer
              store={DEMO_STORE}
              products={DEMO_PRODUCTS}
              isMockup={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
