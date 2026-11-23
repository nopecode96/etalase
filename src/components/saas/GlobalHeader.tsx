"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EtalaseLogo } from "@/components/brand/EtalaseLogo";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

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
    if (pathname.startsWith("/en")) setSelectedLang("EN");
    else if (pathname.startsWith("/ms")) setSelectedLang("MS");
    else if (pathname.startsWith("/th")) setSelectedLang("TH");
    else if (pathname.startsWith("/vi")) setSelectedLang("VI");
    else setSelectedLang("ID");

    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
  }, [pathname]);

  const handleLangChange = (code: string) => {
    setSelectedLang(code);
    setLangDropdownOpen(false);
    const targetLocale = code.toLowerCase();
    const cleanPath = pathname.replace(/^\/(id|en|ms|th|vi)(\/|$)/, "/");
    const targetPath = cleanPath === "" ? "/" : cleanPath;
    const dest =
      targetLocale === "id"
        ? targetPath
        : `/${targetLocale}${targetPath === "/" ? "" : targetPath}`;
    window.location.href = dest;
  };

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
        {/* Kiri: Logo Bersih */}
        <EtalaseLogo size="md" />

        {/* Tengah (Desktop lg:): 5 Menu Navigasi Utama */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#57534E]">
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

        {/* Kanan (Desktop lg:): Masuk, Mulai Gratis, Dropdown Bahasa */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-semibold text-[#1C1917] hover:text-[#D94E28] border border-[#E7E5E4] hover:border-[#D94E28]/40 bg-white px-3.5 py-2 rounded-xl transition shadow-2xs"
          >
            Masuk
          </Link>

          <Link
            href="/register"
            className="bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <span>Mulai Gratis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Dropdown Bahasa: 🌐 ID ▾ */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] px-2.5 py-2 rounded-xl bg-white border border-[#E7E5E4] hover:border-[#D94E28]/40 transition shadow-2xs cursor-pointer"
              aria-label="Pilih Bahasa"
            >
              <span>🌐</span>
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-[#57534E]" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white border border-[#E7E5E4] rounded-2xl shadow-xl p-1.5 z-50 animate-fade-in">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLangChange(lang.code)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center justify-between transition cursor-pointer ${
                      selectedLang === lang.code
                        ? "bg-[#FDF0EC] text-[#D94E28] font-bold"
                        : "text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#1C1917]"
                    }`}
                  >
                    <span>{lang.label}</span>
                    <span className="text-[10px] opacity-60 font-mono">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile (< lg): Logo + Mulai Gratis + Hamburger Menu */}
        <div className="flex lg:hidden items-center gap-2.5">
          <Link
            href="/register"
            className="bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition"
          >
            Mulai Gratis
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu Navigasi"
            className="p-2 rounded-xl bg-white border border-[#E7E5E4] text-[#1C1917] hover:bg-[#FAF8F5] transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (< lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-[#E7E5E4] px-4 py-6 space-y-4 shadow-xl animate-fade-in">
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

          <div className="pt-3 border-t border-[#E7E5E4] flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-2 py-1 text-xs text-[#57534E]">
              <span className="font-medium">Bahasa</span>
              <div className="flex gap-1.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => handleLangChange(l.code)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                      selectedLang === l.code
                        ? "bg-[#FDF0EC] text-[#D94E28]"
                        : "text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    {l.code}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/login"
              className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-[#1C1917] bg-[#FAF8F5] hover:bg-stone-100 border border-[#E7E5E4] transition"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="w-full text-center py-3 rounded-xl text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] shadow-xs flex items-center justify-center gap-1.5 transition"
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
