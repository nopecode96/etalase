"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, MessageCircle, Zap, ArrowUpRight } from "lucide-react";

interface CreatorCard {
  name: string;
  handle: string;
  role: string;
  avatar: string;
  templateName: string;
  templateTag: string;
  productTitle: string;
  productPrice: string;
  modeIcon: "qris" | "yellow" | "chat";
  modeLabel: string;
  stat: string;
}

const CREATORS: CreatorCard[] = [
  {
    name: "Rafa Creative Studio",
    handle: "rafa",
    role: "Video Editor & Digital Creator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    templateName: "Sage Creator Studio",
    templateTag: "Pro",
    productTitle: "Preset Lightroom Cinematic Pack",
    productPrice: "Rp 49.000",
    modeIcon: "qris",
    modeLabel: "Borderpay QRIS Instan",
    stat: "1,420 Terjual",
  },
  {
    name: "Kopi Senja & Roastery",
    handle: "kopisenja",
    role: "Artisan Cafe & F&B Bandung",
    avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=200&q=80",
    templateName: "Aesthetic Menu Card",
    templateTag: "Pro",
    productTitle: "Buku Menu Visual & Meja Kasir QR",
    productPrice: "Rp 25.000",
    modeIcon: "chat",
    modeLabel: "Order via WhatsApp (0% Fee)",
    stat: "850+ Order/Bln",
  },
  {
    name: "Bastian Showroom Mobil",
    handle: "bastiansales",
    role: "Senior Automotive Consultant",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    templateName: "Sales & Showroom Pro",
    templateTag: "Pro",
    productTitle: "Katalog Unit & Simulasi Cicilan",
    productPrice: "DP 15 Juta",
    modeIcon: "chat",
    modeLabel: "Chat Test Drive Langsung",
    stat: "12 Unit Clossed",
  },
  {
    name: "Aisyah Hijab & Beauty",
    handle: "aisyahlook",
    role: "Beauty & Fashion Creator",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    templateName: "Beauty Glam & Boutique",
    templateTag: "Pro",
    productTitle: "Rekomendasi Lipcream & Pashmina Silk",
    productPrice: "Keranjang Kuning",
    modeIcon: "yellow",
    modeLabel: "TikTok Shop Affiliate",
    stat: "3.4K Klik Rekomendasi",
  },
  {
    name: "Dr. Hendra Wibowo",
    handle: "drhendra",
    role: "Konsultan Finansial & Edukasi Saham",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    templateName: "Clean Minimal Editorial",
    templateTag: "Free",
    productTitle: "Mentoring Portfolio Audit 1-on-1",
    productPrice: "Rp 350.000",
    modeIcon: "qris",
    modeLabel: "Google Meet Booking",
    stat: "94 Slot Penuh",
  },
  {
    name: "Nurul Kitchen KL",
    handle: "nurulkl",
    role: "Kek & Pastri Homebaker Malaysia",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    templateName: "Catalog Grid Modern",
    templateTag: "Pro",
    productTitle: "Order Kek Batik & Brownies",
    productPrice: "RM 35.00",
    modeIcon: "chat",
    modeLabel: "WhatsApp Direct Order",
    stat: "RM 8,200 GMV/Bln",
  },
];

export function CreatorMarquee() {
  const allCards = [...CREATORS, ...CREATORS];

  return (
    <div className="w-full overflow-hidden py-6">
      <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused] w-max">
        {allCards.map((c, i) => (
          <div
            key={`${c.handle}-${i}`}
            className="w-[320px] sm:w-[350px] shrink-0 bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between"
          >
            {/* Header: Avatar, Name, Handle, Badge */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                        {c.name}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      etalase.online/{c.handle}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">
                  {c.templateTag}
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-4 line-clamp-1">{c.role}</p>

              {/* Product preview card */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 mb-4 space-y-1.5">
                <div className="text-xs font-semibold text-slate-800 line-clamp-1">
                  {c.productTitle}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{c.productPrice}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500">
                    {c.modeIcon === "qris" && <Zap className="w-3 h-3 text-emerald-600" />}
                    {c.modeIcon === "yellow" && (
                      <ShoppingBag className="w-3 h-3 text-amber-600" />
                    )}
                    {c.modeIcon === "chat" && (
                      <MessageCircle className="w-3 h-3 text-blue-600" />
                    )}
                    <span>{c.modeLabel}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom: Template Name & Verified Metric */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px]">
              <span className="text-slate-500 font-medium">{c.templateName}</span>
              <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {c.stat}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
