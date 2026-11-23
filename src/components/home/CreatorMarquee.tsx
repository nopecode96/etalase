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
    name: "Dr. Alana Skin Clinic",
    handle: "alana",
    role: "Aesthetic Doctor & Skincare",
    avatar: "https://images.unsplash.com/photo-1594824813589-3d12d0800e28?auto=format&fit=crop&w=200&q=80",
    templateName: "Soft Blush Beauty Glam",
    templateTag: "Pro",
    productTitle: "Serum Barrier & Acne Consultation",
    productPrice: "Rp 129.000",
    modeIcon: "yellow",
    modeLabel: "Shopee Toko Orange",
    stat: "5.8k Pembeli",
  },
  {
    name: "Dimas Pratama OS",
    handle: "dimas",
    role: "Productivity & Notion Coach",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    templateName: "Clean Minimal",
    templateTag: "Free",
    productTitle: "Solopreneur Notion OS & Kelas",
    productPrice: "Rp 149.000",
    modeIcon: "qris",
    modeLabel: "Auto-Kirim WA",
    stat: "2.1k Member",
  },
  {
    name: "Chic Boutique Bangkok",
    handle: "bangkokchic",
    role: "SEA Fashion Importer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    templateName: "Visual Boutique Pro",
    templateTag: "Pro",
    productTitle: "Linen Summer Dress Edition",
    productPrice: "Rp 185.000",
    modeIcon: "yellow",
    modeLabel: "Keranjang Kuning TikTok",
    stat: "18k Klik Afiliasi",
  },
];

export function CreatorMarquee() {
  return (
    <div className="w-full overflow-hidden py-10 bg-slate-900 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Kreator &amp; Bisnis Nyata di Asia Tenggara
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            Dipercaya Oleh 10,000+ Kreator, Sales &amp; Brand Lokal
          </h2>
        </div>
        <Link
          href="/templates"
          className="text-xs font-semibold text-slate-400 hover:text-white inline-flex items-center gap-1 transition"
        >
          <span>Lihat Semua 11 Template</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Marquee Track */}
      <div className="relative flex overflow-x-hidden group">
        {/* Row 1 */}
        <div className="flex animate-marquee gap-4 shrink-0 group-hover:[animation-play-state:paused] py-2">
          {CREATORS.concat(CREATORS).map((c, idx) => (
            <div
              key={idx}
              className="w-[300px] sm:w-[320px] bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-2xl p-4 transition-all duration-200 shrink-0 shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Header Card */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-600 shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-white text-xs truncate">{c.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono truncate">
                        {c.handle}.etalase.online
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      c.templateTag === "Pro"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {c.templateName}
                  </span>
                </div>

                {/* Product Snippet */}
                <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 mb-3">
                  <div className="text-[11px] font-medium text-slate-300 line-clamp-1 mb-1">
                    {c.productTitle}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400">{c.productPrice}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{c.stat}</span>
                  </div>
                </div>
              </div>

              {/* Mode Badge Footer */}
              <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-700/50 text-slate-400">
                <span className="flex items-center gap-1 text-slate-300 font-medium">
                  {c.modeIcon === "qris" && <Zap className="w-3 h-3 text-emerald-400" />}
                  {c.modeIcon === "yellow" && <ShoppingBag className="w-3 h-3 text-amber-400" />}
                  {c.modeIcon === "chat" && <MessageCircle className="w-3 h-3 text-blue-400" />}
                  <span>{c.modeLabel}</span>
                </span>
                <span className="text-emerald-400 font-bold">0% Komisi</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
