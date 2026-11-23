"use client";

import React from "react";
import { CheckCircle2, ShoppingBag, MessageCircle, Zap } from "lucide-react";

interface CreatorCard {
  name: string;
  subdomain: string;
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
    subdomain: "rafa.etalase.online",
    role: "Video Editor & Digital Creator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    templateName: "Clean Minimal",
    templateTag: "Gratis",
    productTitle: "Preset Lightroom Cinematic Pack",
    productPrice: "Rp 49.000",
    modeIcon: "qris",
    modeLabel: "Pembayaran QRIS Instan",
    stat: "1,420 Terjual",
  },
  {
    name: "Kopi Senja & Roastery",
    subdomain: "kopisenja.etalase.online",
    role: "Artisan Cafe & F&B Bandung",
    avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=200&q=80",
    templateName: "Visual Menu Grid",
    templateTag: "Pro",
    productTitle: "Buku Menu Visual & Meja Kasir QR",
    productPrice: "Rp 25.000",
    modeIcon: "chat",
    modeLabel: "Order via WhatsApp (0% Fee)",
    stat: "850+ Order/Bln",
  },
  {
    name: "Bastian Showroom Mobil",
    subdomain: "bastianmobil.etalase.online",
    role: "Senior Automotive Consultant",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    templateName: "Showroom Pro",
    templateTag: "Pro",
    productTitle: "Katalog Unit & Simulasi Cicilan",
    productPrice: "Mulai DP 15 Jt",
    modeIcon: "chat",
    modeLabel: "Chat Test Drive Langsung",
    stat: "12 Unit Terjual",
  },
  {
    name: "Aisyah Hijab & Beauty",
    subdomain: "aisyahlook.etalase.online",
    role: "Beauty & Fashion Creator",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    templateName: "Editorial Pastel",
    templateTag: "Pro",
    productTitle: "Rekomendasi Lipcream & Pashmina Silk",
    productPrice: "Keranjang Kuning",
    modeIcon: "yellow",
    modeLabel: "TikTok Shop Affiliate",
    stat: "3.4K Klik Rekomendasi",
  },
  {
    name: "Dr. Hendra Wibowo",
    subdomain: "drhendra.etalase.online",
    role: "Konsultan Finansial & Edukasi Saham",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    templateName: "Clean Minimal",
    templateTag: "Gratis",
    productTitle: "Mentoring Portfolio Audit 1-on-1",
    productPrice: "Rp 350.000",
    modeIcon: "qris",
    modeLabel: "Google Meet Booking",
    stat: "94 Slot Penuh",
  },
  {
    name: "Nurul Kitchen KL",
    subdomain: "nurulkl.etalase.online",
    role: "Kek & Pastri Homebaker Malaysia",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    templateName: "Visual Menu Grid",
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
    <div className="w-full overflow-hidden py-4">
      <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] w-max">
        {allCards.map((c, i) => (
          <div
            key={`${c.subdomain}-${i}`}
            className="w-[310px] sm:w-[330px] shrink-0 bg-white border border-[#E7E5E4] rounded-3xl p-5 shadow-2xs hover:shadow-md hover:border-[#D94E28]/30 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-[#E7E5E4] shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm text-[#1C1917] group-hover:text-[#D94E28] transition-colors">
                        {c.name}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D94E28] shrink-0" />
                    </div>
                    <span className="text-[11px] text-[#57534E] font-mono font-medium">
                      {c.subdomain}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-[#FAF8F5] text-[#57534E] px-2 py-0.5 rounded-full border border-[#E7E5E4] shrink-0">
                  {c.templateTag}
                </span>
              </div>

              <p className="text-xs text-[#57534E] mb-3.5 line-clamp-1">{c.role}</p>

              {/* Product preview card */}
              <div className="bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl p-3 mb-3.5 space-y-1.5">
                <div className="text-xs font-semibold text-[#1C1917] line-clamp-1">
                  {c.productTitle}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1C1917]">{c.productPrice}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#57534E]">
                    {c.modeIcon === "qris" && <Zap className="w-3 h-3 text-[#D94E28]" />}
                    {c.modeIcon === "yellow" && <ShoppingBag className="w-3 h-3 text-[#D94E28]" />}
                    {c.modeIcon === "chat" && <MessageCircle className="w-3 h-3 text-[#D94E28]" />}
                    <span>{c.modeLabel}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom: Template Name & Verified Metric */}
            <div className="flex items-center justify-between pt-3 border-t border-[#FAF8F5] text-[11px]">
              <span className="text-[#57534E] font-medium">{c.templateName}</span>
              <span className="font-bold text-[#D94E28] bg-[#FDF0EC] px-2 py-0.5 rounded-md">
                {c.stat}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
