"use client";

import React, { useState, useRef } from "react";
import { getTemplateComponent } from "../templates";
import { StoreTemplateProps } from "../templates/types";
import { CheckCircle2, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface ShowcaseItem {
  id: string;
  category: string;
  categoryLabel: string;
  templateId: string;
  creator: {
    name: string;
    handle: string;
    role: string;
    avatar: string;
    metric: string;
  };
  store: StoreTemplateProps["store"];
  products: StoreTemplateProps["products"];
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "creator-digital",
    category: "kreator",
    categoryLabel: "Kreator Digital",
    templateId: "sage-creator",
    creator: {
      name: "Rafa Creative Studio",
      handle: "rafa",
      role: "Video Editor & Digital Creator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      metric: "1,420 File Terjual",
    },
    store: {
      name: "Studio Rafa Creative",
      slug: "rafa",
      bio: "Digital Creator & Video Editor. Berbagi tools produktivitas & preset video.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567890", isPrimary: true }],
    },
    products: [
      {
        id: "r1",
        title: "Preset Lightroom Pro Cinematic",
        slug: "preset-cinematic",
        price: 49000,
        images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "DIRECT_CHECKOUT",
        secondaryModes: [{ mode: "CHAT_ORDER", label: "Tanya via WA" }],
      },
      {
        id: "r2",
        title: "E-Book: 30 Hari Kuasai CapCut",
        slug: "ebook-capcut",
        price: 99000,
        images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "DIRECT_CHECKOUT",
      },
      {
        id: "r3",
        title: "Sesi Mentoring 1-on-1 Content Growth",
        slug: "mentoring-content",
        price: 250000,
        images: ["https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
    ],
  },
  {
    id: "cafe-resto",
    category: "cafe",
    categoryLabel: "Cafe & Resto",
    templateId: "cafe-menu",
    creator: {
      name: "Kopi Senja Roastery",
      handle: "kopisenja",
      role: "Artisan Coffee & Bakery Bandung",
      avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80",
      metric: "850+ Order/Bln",
    },
    store: {
      name: "Kopi Senja & Roastery",
      slug: "kopisenja",
      bio: "Kopi spesialti seduh manual & bakery hangat setiap pagi.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      avatarUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567891", isPrimary: true }],
    },
    products: [
      {
        id: "k1",
        title: "Kopi Susu Gula Aren Senja",
        slug: "kopisusu-aren",
        price: 25000,
        images: ["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
      {
        id: "k2",
        title: "Artisan Butter Croissant",
        slug: "croissant",
        price: 28000,
        images: ["https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
      {
        id: "k3",
        title: "Biji Kopi Arabika House Blend 250g",
        slug: "arabika-beans",
        price: 95000,
        images: ["https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "DIRECT_CHECKOUT",
      },
    ],
  },
  {
    id: "sales-otomotif",
    category: "sales",
    categoryLabel: "Sales Mobil & Properti",
    templateId: "sales-showcase",
    creator: {
      name: "Bastian Showroom Mobil",
      handle: "bastiansales",
      role: "Senior Automotive Consultant",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      metric: "12 Unit Terjual",
    },
    store: {
      name: "Bastian Showroom Mobil",
      slug: "bastiansales",
      bio: "Dealer Resmi Mobil Baru & Bekas Berkualitas. Simulasi DP & Kredit Cepat.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567892", isPrimary: true }],
    },
    products: [
      {
        id: "b1",
        title: "All-New SUV Hybrid 2026",
        slug: "suv-hybrid",
        price: "DP 15 Juta",
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
      {
        id: "b2",
        title: "City Car Matic Termurah",
        slug: "city-car",
        price: "Angsuran 3 Jt-an",
        images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
      {
        id: "b3",
        title: "Simulasi Cicilan & Booking Test Drive",
        slug: "test-drive",
        price: "Konsultasi Gratis",
        images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "CHAT_ORDER",
      },
    ],
  },
  {
    id: "beauty-affiliate",
    category: "beauty",
    categoryLabel: "Beauty & Affiliate",
    templateId: "beauty-glam",
    creator: {
      name: "Aisyah Hijab & Beauty",
      handle: "aisyahlook",
      role: "Beauty & Fashion Creator",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      metric: "3.4K Klik Rekomendasi",
    },
    store: {
      name: "Aisyah Hijab & Beauty",
      slug: "aisyahlook",
      bio: "Rekomendasi makeup, skincare favorit & koleksi hijab pilihan.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567893", isPrimary: true }],
    },
    products: [
      {
        id: "a1",
        title: "Velvet Matte Lip Cream Silk",
        slug: "lip-cream",
        price: 89000,
        images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "EXTERNAL_LINK",
        externalPlatform: "TIKTOK_SHOP",
        externalLabel: "Keranjang Kuning",
      },
      {
        id: "a2",
        title: "Pashmina Ceruty Baby Doll",
        slug: "pashmina",
        price: 55000,
        images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "DIRECT_CHECKOUT",
      },
      {
        id: "a3",
        title: "Glow Serum Niacinamide 10%",
        slug: "glow-serum",
        price: 129000,
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "EXTERNAL_LINK",
        externalPlatform: "TIKTOK_SHOP",
        externalLabel: "Keranjang Kuning",
      },
    ],
  },
  {
    id: "konsultan-expert",
    category: "konsultan",
    categoryLabel: "Konsultan Keuangan",
    templateId: "clean-minimal",
    creator: {
      name: "Dr. Hendra Wibowo",
      handle: "drhendra",
      role: "Konsultan Keuangan & Investor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      metric: "94 Slot Sesi Penuh",
    },
    store: {
      name: "Dr. Hendra Wibowo",
      slug: "drhendra",
      bio: "Edukasi investasi saham, wealth management & audit portofolio keluarga.",
      locale: "id",
      currency: "IDR",
      tier: "PRO",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      chatChannels: [{ channel: "WHATSAPP", handle: "6281234567894", isPrimary: true }],
    },
    products: [
      {
        id: "h1",
        title: "Mentoring Portfolio Audit 1-on-1",
        slug: "audit-portofolio",
        price: 350000,
        images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "DIRECT_CHECKOUT",
      },
      {
        id: "h2",
        title: "Webinar: Strategi Dividen 2026",
        slug: "webinar-dividen",
        price: 149000,
        images: ["https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "DIRECT_CHECKOUT",
      },
      {
        id: "h3",
        title: "Template Spreadsheet Keuangan Pribadi",
        slug: "spreadsheet-finansial",
        price: 75000,
        images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80"],
        checkoutMode: "DIRECT_CHECKOUT",
      },
    ],
  },
];

const CATEGORIES = [
  { id: "all", label: "Semua Kategori" },
  { id: "kreator", label: "Kreator Digital" },
  { id: "cafe", label: "Cafe & Resto" },
  { id: "sales", label: "Sales Mobil & Properti" },
  { id: "beauty", label: "Beauty & Affiliate" },
  { id: "konsultan", label: "Konsultan Keuangan" },
];

export function ShowcaseCarousel() {
  const [activeCategory, setActiveCategory] = useState("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeCategory === "all"
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
      {/* Category Pills & Scroll Controls Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 px-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 p-1 bg-white border border-[#E2ECEA] rounded-2xl shadow-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[#0F766E] text-white shadow-xs font-semibold"
                  : "text-[#526664] hover:text-[#111C1B] hover:bg-[#F4F8F7]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-full bg-white border border-[#E2ECEA] text-[#526664] hover:text-[#111C1B] hover:border-[#0F766E]/40 flex items-center justify-center shadow-xs transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-full bg-white border border-[#E2ECEA] text-[#526664] hover:text-[#111C1B] hover:border-[#0F766E]/40 flex items-center justify-center shadow-xs transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Phone Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto no-scrollbar scroll-smooth px-4 pb-6 flex gap-6 snap-x snap-mandatory"
      >
        {filteredItems.map((item) => {
          const TemplateComponent = getTemplateComponent(item.templateId);

          return (
            <div
              key={item.id}
              className="w-[300px] sm:w-[320px] shrink-0 snap-center flex flex-col items-center group"
            >
              {/* Smartphone Frame */}
              <div className="relative w-full h-[540px] bg-slate-900 rounded-[2.8rem] p-2.5 shadow-lg border-4 border-slate-800 flex flex-col items-center ring-1 ring-slate-900/10 transition-transform duration-300 group-hover:-translate-y-1">
                {/* Dynamic Island Notch */}
                <div className="w-24 h-4 bg-black rounded-full mb-2 flex items-center justify-between px-2.5 z-10 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>
                </div>

                {/* Screen Frame */}
                <div className="w-full h-full bg-white rounded-[2.1rem] overflow-y-auto no-scrollbar relative shadow-inner">
                  <TemplateComponent
                    store={item.store}
                    products={item.products}
                    isPreview={true}
                  />
                </div>
              </div>

              {/* Creator Info Card Below Mockup */}
              <div className="w-full mt-4 bg-white border border-[#E2ECEA] rounded-2xl p-4 shadow-xs text-left">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.creator.avatar}
                      alt={item.creator.name}
                      className="w-9 h-9 rounded-xl object-cover border border-[#E2ECEA] shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-xs text-[#111C1B]">
                          {item.creator.name}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                      </div>
                      <span className="text-[11px] text-[#526664] font-mono">
                        etalase.online/{item.creator.handle}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-[#F4F8F7] text-[11px]">
                  <span className="text-[#526664] text-[11px] truncate max-w-[150px]">
                    {item.creator.role}
                  </span>
                  <span className="font-semibold text-[#0F766E] bg-[#E6F4F1] px-2 py-0.5 rounded-md shrink-0">
                    {item.creator.metric}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
