"use client";

import React, { useState } from "react";
import { Zap, ShoppingBag, MessageCircle, CheckCircle2 } from "lucide-react";
import { getTemplateComponent } from "../templates";
import { StoreTemplateProps } from "../templates/types";

const HERO_STORE: StoreTemplateProps["store"] = {
  name: "Studio Rafa Creative",
  slug: "demo",
  bio: "Digital Creator & Video Editor. Berbagi tools produktivitas, preset Lightroom & kelas online.",
  locale: "id",
  currency: "IDR",
  tier: "PRO",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  chatChannels: [
    { channel: "WHATSAPP", handle: "6281234567890", isPrimary: true },
    { channel: "LINE", handle: "rafastudio", isPrimary: false },
  ],
};

const HERO_PRODUCTS: StoreTemplateProps["products"] = [
  {
    id: "p1",
    title: "Preset Lightroom Pro Cinematic",
    slug: "preset-lightroom",
    price: 49000,
    checkoutMode: "DIRECT_CHECKOUT",
    secondaryModes: [{ mode: "CHAT_ORDER", label: "Tanya via WA" }],
  },
  {
    id: "p2",
    title: "Microphone Wireless TikTok (Beg Kuning)",
    slug: "mic-wireless",
    price: 189000,
    checkoutMode: "EXTERNAL_LINK",
    externalPlatform: "TIKTOK_SHOP",
  },
  {
    id: "p3",
    title: "Sesi 1-on-1 Content Growth Audit",
    slug: "konsultasi-growth",
    price: 250000,
    checkoutMode: "CHAT_ORDER",
  },
];

const PREVIEW_TEMPLATES = [
  { id: "clean-minimal", label: "Clean Minimal" },
  { id: "sage-creator", label: "Sage Creator" },
  { id: "classic-dark", label: "Classic Dark" },
  { id: "sales-showcase", label: "Sales Pro" },
];

export function HeroProductMockup() {
  const [activeTemplate, setActiveTemplate] = useState("sage-creator");
  const TemplateComponent = getTemplateComponent(activeTemplate);

  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[400px] mx-auto flex flex-col items-center">
      {/* Quick Template Switcher Pills Above Phone */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-full mb-5 shadow-sm backdrop-blur z-20">
        {PREVIEW_TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTemplate(t.id)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition ${
              activeTemplate === t.id
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Floating Pill 1: QRIS Payment Success (Top Right) */}
      <div className="absolute -top-2 -right-4 sm:-right-10 z-30 animate-float-slow bg-white/95 border border-emerald-100 rounded-2xl p-3 shadow-xl shadow-slate-200/60 backdrop-blur flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
            <span>QRIS Lunas: Rp 49.000</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <p className="text-[10px] text-emerald-600 font-medium">Auto-delivery WA terkirim</p>
        </div>
      </div>

      {/* Floating Pill 2: Keranjang Kuning (Bottom Left) */}
      <div className="absolute top-1/2 -left-4 sm:-left-12 z-30 animate-float-delayed bg-white/95 border border-amber-100 rounded-2xl p-3 shadow-xl shadow-slate-200/60 backdrop-blur flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-900">Beg / Keranjang Kuning</div>
          <p className="text-[10px] text-amber-600 font-medium">+142 Klik Afiliasi TikTok</p>
        </div>
      </div>

      {/* Floating Pill 3: WhatsApp Order (Bottom Right) */}
      <div className="absolute -bottom-3 -right-3 sm:-right-6 z-30 animate-float-slow bg-white/95 border border-blue-100 rounded-2xl p-3 shadow-xl shadow-slate-200/60 backdrop-blur flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-900">Pesanan Chat Langsung</div>
          <p className="text-[10px] text-blue-600 font-medium">0% Komisi Transaksi</p>
        </div>
      </div>

      {/* Smartphone Device Frame */}
      <div className="relative w-full h-[620px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl shadow-slate-300/60 border-4 border-slate-800 flex flex-col items-center ring-1 ring-slate-900/10">
        {/* Dynamic Island Notch */}
        <div className="w-28 h-5 bg-black rounded-full mb-2 flex items-center justify-between px-3 z-20">
          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700"></div>
        </div>

        {/* Screen Frame */}
        <div className="w-full h-full bg-white rounded-[2.3rem] overflow-y-auto no-scrollbar relative shadow-inner">
          <TemplateComponent
            store={HERO_STORE}
            products={HERO_PRODUCTS}
            isPreview={true}
          />
        </div>
      </div>
    </div>
  );
}
