"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown, ArrowRight } from "lucide-react";

export function GlobalHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("ID");

  const languages = [
    { code: "ID", label: "Bahasa Indonesia" },
    { code: "EN", label: "English" },
    { code: "MS", label: "Bahasa Melayu" },
    { code: "TH", label: "ภาษาไทย" },
    { code: "VI", label: "Tiếng Việt" },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/solusi", label: "Solusi" },
    { href: "/fitur", label: "Fitur" },
    { href: "/template", label: "Template" },
    { href: "/harga", label: "Harga" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF8F5]/90 border-b border-[#E7E5E4] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Kiri: Logo Bersih (Tanpa badge SEA) */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-[#D94E28] flex items-center justify-center text-white font-black text-base shadow-xs group-hover:scale-105 transition-transform">
            E
          </div>
          <span className="font-bold text-lg tracking-tight text-[#1C1917]">
            etalase<span className="text-[#D94E28]">.online</span>
          </span>
        </Link>

        {/* Tengah: Hanya 5 Menu High-Level */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#57534E]">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-[#D94E28] font-bold border-b-2 border-[#D94E28]"
                    : "hover:text-[#1C1917]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Kanan: Masuk, Mulai Gratis, Language Selector */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] px-2 py-1.5 rounded-lg hover:bg-white/80 border border-transparent hover:border-[#E7E5E4] transition"
              aria-label="Pilih Bahasa"
            >
              <Globe className="w-3.5 h-3.5 text-[#57534E]" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-[#57534E]" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-40 bg-white border border-[#E7E5E4] rounded-xl shadow-lg p-1 z-50 animate-fade-in">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between transition ${
                      selectedLang === lang.code
                        ? "bg-[#FDF0EC] text-[#D94E28] font-bold"
                        : "text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#1C1917]"
                    }`}
                  >
                    <span>{lang.label}</span>
                    <span className="text-[10px] opacity-60">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/onboarding"
            className="text-xs font-semibold text-[#1C1917] hover:text-[#D94E28] border border-[#E7E5E4] hover:border-[#D94E28]/40 bg-white px-3.5 py-2 rounded-xl transition shadow-2xs"
          >
            Masuk
          </Link>

          <Link
            href="/onboarding"
            className="bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <span>Mulai Gratis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/onboarding"
            className="sm:hidden bg-[#D94E28] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xs"
          >
            Mulai
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu Navigasi"
            className="p-2 rounded-xl bg-white border border-[#E7E5E4] text-[#1C1917] hover:bg-[#FAF8F5] transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-[#E7E5E4] px-4 py-6 space-y-4 shadow-xl animate-fade-in">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-[#FDF0EC] text-[#D94E28]"
                      : "text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#1C1917]"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E7E5E4] flex flex-col gap-2">
            <div className="flex items-center justify-between px-2 py-1 text-xs text-[#57534E]">
              <span>Bahasa</span>
              <div className="flex gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setSelectedLang(l.code)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      selectedLang === l.code
                        ? "bg-[#FDF0EC] text-[#D94E28]"
                        : "text-[#57534E] hover:text-[#1C1917]"
                    }`}
                  >
                    {l.code}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/onboarding"
              className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-[#1C1917] bg-[#FAF8F5] border border-[#E7E5E4]"
            >
              Masuk ke Akun
            </Link>
            <Link
              href="/onboarding"
              className="w-full text-center py-3 rounded-xl text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Mulai Gratis (0% Komisi)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
