"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  Calendar,
  Users,
  Zap,
  Wrench,
  Tag,
  Car,
  Store,
} from "lucide-react";

export function MarketingNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/digital-product", label: "Produk Digital", icon: Zap },
    { href: "/event", label: "Event & Webinar", icon: Calendar },
    { href: "/consultation", label: "Konsultasi 1-on-1", icon: Users },
    { href: "/affiliate", label: "Afiliasi", icon: Sparkles },
    { href: "/templates", label: "Template", icon: Layers },
    { href: "/pricing", label: "Harga", icon: Tag },
    { href: "/tools", label: "Free Tools", icon: Wrench },
  ];

  const solutionLinks = [
    { href: "/creator", label: "Content Creator", desc: "TikTok, IG & Affiliate Bio", icon: Sparkles },
    { href: "/sales", label: "Sales Mobil & Properti", desc: "Katalog unit & closing chat", icon: Car },
    { href: "/umkm", label: "UMKM, F&B & Toko Fisik", desc: "Menu QR & standee kasir", icon: Store },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-[#E2ECEA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#0F766E] flex items-center justify-center text-white font-black text-lg shadow-xs group-hover:scale-105 transition-transform">
            E
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xl tracking-tight text-[#111C1B]">
              etalase<span className="text-[#0F766E]">.online</span>
            </span>
            <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider bg-[#E6F4F1] text-[#0F766E] border border-[#C4E5DF] px-1.5 py-0.5 rounded-md">
              SEA
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-medium text-[#526664]">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-[#0F766E] font-bold border-b-2 border-[#0F766E]"
                    : "hover:text-[#111C1B]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Solutions Dropdown */}
          <div className="relative group">
            <button
              type="button"
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              onMouseEnter={() => setSolutionsOpen(true)}
              className="flex items-center gap-1 text-[#526664] hover:text-[#111C1B] py-1 transition-colors"
            >
              <span>Solusi Niche</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#526664] group-hover:text-[#111C1B] transition-transform duration-200" />
            </button>
            <div
              onMouseLeave={() => setSolutionsOpen(false)}
              className={`absolute top-full left-0 mt-2 w-64 bg-white border border-[#E2ECEA] rounded-2xl p-2 shadow-xl transition-all duration-200 z-50 ${
                solutionsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              }`}
            >
              {solutionLinks.map((sol) => (
                <Link
                  key={sol.href}
                  href={sol.href}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F4F8F7] transition"
                >
                  <sol.icon className="w-4 h-4 text-[#0F766E] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-[#111C1B]">{sol.label}</div>
                    <div className="text-[11px] text-[#526664]">{sol.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="https://demo.etalase.online"
            target="_blank"
            className="text-xs font-medium text-[#526664] hover:text-[#111C1B] px-3 py-2 rounded-xl transition flex items-center gap-1 hover:bg-[#F4F8F7]"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3 text-[#526664]" />
          </Link>
          <Link
            href="/onboarding"
            className="bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <span>Mulai Gratis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <Link
            href="/onboarding"
            className="sm:hidden bg-[#0F766E] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xs"
          >
            Mulai
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-xl bg-[#F4F8F7] border border-[#E2ECEA] text-[#526664] hover:text-[#111C1B] transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 border-b border-[#E2ECEA] px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto backdrop-blur-2xl shadow-xl animate-fade-in">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#526664] px-2">
            Menu Utama
          </div>
          <div className="space-y-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                    isActive
                      ? "bg-[#E6F4F1] text-[#0F766E] font-bold"
                      : "text-[#526664] hover:bg-[#F4F8F7] hover:text-[#111C1B]"
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#0F766E] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E2ECEA]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#526664] px-2 mb-2">
              Solusi Niche
            </div>
            <div className="space-y-1">
              {solutionLinks.map((sol) => (
                <Link
                  key={sol.href}
                  href={sol.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-[#526664] hover:bg-[#F4F8F7] hover:text-[#111C1B]"
                >
                  <sol.icon className="w-4 h-4 text-[#0F766E] shrink-0" />
                  <div>
                    <span className="font-semibold text-[#111C1B]">{sol.label}</span>
                    <span className="block text-[11px] text-[#526664]">{sol.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E2ECEA] flex flex-col gap-2">
            <Link
              href="https://demo.etalase.online"
              target="_blank"
              className="w-full text-center py-2.5 rounded-xl text-xs font-medium text-[#111C1B] bg-[#F4F8F7] border border-[#E2ECEA] flex items-center justify-center gap-1.5"
            >
              <span>Lihat Demo Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#526664]" />
            </Link>
            <Link
              href="/onboarding"
              className="w-full text-center py-3 rounded-xl text-xs font-bold text-white bg-[#0F766E] hover:bg-[#115E59] shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Daftar Sekarang (0% Komisi)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
