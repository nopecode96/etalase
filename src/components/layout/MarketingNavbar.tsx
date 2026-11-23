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
  ShoppingBag,
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
    { href: "/templates", label: "Template (11)", icon: Layers },
    { href: "/pricing", label: "Harga", icon: Tag },
    { href: "/tools", label: "Free Tools", icon: Wrench },
  ];

  const solutionLinks = [
    { href: "/creator", label: "Content Creator", desc: "TikTok, IG & Affiliate Bio", icon: Sparkles },
    { href: "/sales", label: "Sales Mobil & Properti", desc: "Katalog unit & closing chat", icon: Car },
    { href: "/umkm", label: "UMKM, F&B & Toko Fisik", desc: "Menu QR & standee kasir", icon: Store },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
            E
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              etalase<span className="text-blue-600">.online</span>
            </span>
            <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-md">
              SEA
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-medium text-slate-600">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-blue-600 font-bold border-b-2 border-blue-600"
                    : "hover:text-slate-900"
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
              className="flex items-center gap-1 text-slate-600 group-hover:text-slate-900 py-1 transition-colors"
            >
              <span>Solusi Niche</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform duration-200" />
            </button>
            <div
              onMouseLeave={() => setSolutionsOpen(false)}
              className={`absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl p-2 shadow-xl transition-all duration-200 z-50 ${
                solutionsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              }`}
            >
              {solutionLinks.map((sol) => (
                <Link
                  key={sol.href}
                  href={sol.href}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition"
                >
                  <sol.icon className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-900">{sol.label}</div>
                    <div className="text-[11px] text-slate-500">{sol.desc}</div>
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
            className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl transition flex items-center gap-1 hover:bg-slate-50"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
          <Link
            href="/onboarding"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-sm flex items-center gap-1.5"
          >
            <span>Mulai Gratis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <Link
            href="/onboarding"
            className="sm:hidden bg-blue-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg"
          >
            Mulai
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 border-b border-slate-200 px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto backdrop-blur-2xl animate-fade-in shadow-xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
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
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
              Solusi Niche
            </div>
            <div className="space-y-1">
              {solutionLinks.map((sol) => (
                <Link
                  key={sol.href}
                  href={sol.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <sol.icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">{sol.label}</span>
                    <span className="block text-[11px] text-slate-500">{sol.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="https://demo.etalase.online"
              target="_blank"
              className="w-full text-center py-2.5 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 flex items-center justify-center gap-1.5"
            >
              <span>Lihat Demo Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/onboarding"
              className="w-full text-center py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm flex items-center justify-center gap-1.5"
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
