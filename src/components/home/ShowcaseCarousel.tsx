"use client";

import React, { useState } from "react";
import { getTemplateComponent, TEMPLATE_METADATA } from "../templates";
import { StoreTemplateProps } from "../templates/types";

const MOCK_STORE: StoreTemplateProps["store"] = {
  name: "Studio Rafa Creative",
  slug: "demo",
  bio: "Digital Creator, Video Editor & Tech Reviewer. Berbagi tools produktivitas & kelas online.",
  locale: "id",
  currency: "IDR",
  tier: "PRO",
  chatChannels: [
    { channel: "WHATSAPP", handle: "6281234567890", isPrimary: true },
    { channel: "LINE", handle: "rafastudio", isPrimary: false },
  ],
};

const MOCK_PRODUCTS: StoreTemplateProps["products"] = [
  {
    id: "p1",
    title: "Preset Lightroom Pro Creator Pack",
    slug: "preset-lightroom",
    price: 49000,
    checkoutMode: "DIRECT_CHECKOUT",
    secondaryModes: [
      {
        mode: "CHAT_ORDER",
        label: "Tanya via Chat",
      },
    ],
  },
  {
    id: "p2",
    title: "Microphone Wireless TikTok (Keranjang Kuning)",
    slug: "mic-wireless",
    price: 189000,
    checkoutMode: "EXTERNAL_LINK",
    externalPlatform: "TIKTOK_SHOP",
  },
  {
    id: "p3",
    title: "Konsultasi 1-on-1 Content Growth",
    slug: "konsultasi-growth",
    price: 250000,
    checkoutMode: "CHAT_ORDER",
  },
];

export function ShowcaseCarousel() {
  const [activeTemplate, setActiveTemplate] = useState("clean-minimal");

  const TemplateComponent = getTemplateComponent(activeTemplate);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto py-12 px-4">
      {/* Selector Tabs with Lynk.id style variety */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-4xl">
        {TEMPLATE_METADATA.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTemplate(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTemplate === tab.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400/40"
                : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
            }`}
          >
            {tab.name}
            <span
              className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded font-bold ${
                tab.tag === "Pro"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {tab.tag}
            </span>
          </button>
        ))}
      </div>

      {/* Smartphone Mockup Container */}
      <div className="relative w-full max-w-[360px] h-[680px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800 flex flex-col items-center">
        {/* Phone Notch/Speaker */}
        <div className="w-24 h-4 bg-slate-800 rounded-full mb-2"></div>

        {/* Screen Frame with scrolling */}
        <div className="w-full h-full bg-white rounded-[2.2rem] overflow-y-auto no-scrollbar relative">
          <TemplateComponent
            store={MOCK_STORE}
            products={MOCK_PRODUCTS}
            isPreview={true}
          />
        </div>
      </div>
    </div>
  );
}
