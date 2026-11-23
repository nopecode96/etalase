"use client";

import React, { useState } from "react";
import { getTemplateComponent } from "../templates";
import { StoreTemplateProps } from "../templates/types";

const HERO_STORE: StoreTemplateProps["store"] = {
  name: "Studio Rafa Creative",
  slug: "demo",
  bio: "Digital Creator & Video Editor. Berbagi tools produktivitas, preset Lightroom & kelas online.",
  locale: "id",
  currency: "IDR",
  tier: "PRO",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
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
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
    ],
    checkoutMode: "DIRECT_CHECKOUT",
    secondaryModes: [{ mode: "CHAT_ORDER", label: "Tanya via WA" }],
  },
  {
    id: "p2",
    title: "Microphone Wireless Clip-On",
    slug: "mic-wireless",
    price: 189000,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
    ],
    checkoutMode: "EXTERNAL_LINK",
    externalPlatform: "TIKTOK_SHOP",
    externalLabel: "Keranjang Kuning",
  },
  {
    id: "p3",
    title: "Mentoring 1-on-1 Content Growth",
    slug: "konsultasi-growth",
    price: 250000,
    images: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80",
    ],
    checkoutMode: "CHAT_ORDER",
  },
];

const PREVIEW_TEMPLATES = [
  { id: "sage-creator", label: "Sage Creator" },
  { id: "clean-minimal", label: "Clean Minimal" },
  { id: "classic-dark", label: "Classic Dark" },
  { id: "sales-showcase", label: "Sales Pro" },
];

export function HeroProductMockup() {
  const [activeTemplate, setActiveTemplate] = useState("sage-creator");
  const TemplateComponent = getTemplateComponent(activeTemplate);

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[370px] mx-auto flex flex-col items-center">
      {/* Template Switcher Tabs - Minimal & Clean */}
      <div className="flex items-center gap-1 p-1 bg-white border border-[#E2ECEA] rounded-full mb-5 shadow-xs">
        {PREVIEW_TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTemplate(t.id)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
              activeTemplate === t.id
                ? "bg-[#0F766E] text-white shadow-xs font-semibold"
                : "text-[#526664] hover:text-[#111C1B]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Clean Modern Smartphone Device Frame (Zero Overlapping Badges) */}
      <div className="relative w-full h-[620px] bg-slate-900 rounded-[3rem] p-3 shadow-xl border-4 border-slate-800 flex flex-col items-center ring-1 ring-slate-900/10 transition-all">
        {/* Dynamic Island Notch */}
        <div className="w-28 h-5 bg-black rounded-full mb-2 flex items-center justify-between px-3 z-10 shrink-0">
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
