"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Check, Smartphone, ArrowRight } from "lucide-react";
import { TEMPLATE_METADATA } from "@/components/templates";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CATEGORIES = ["Semua", "Kreator & Coach", "F&B / Cafe", "Sales Mobil & Properti", "Fashion & Beauty", "Minimalist"];

export default function TemplatesPage() {
  const [selectedCat, setSelectedCat] = useState("Semua");

  const filtered = TEMPLATE_METADATA.filter((t) => {
    if (selectedCat === "Semua") return true;
    if (selectedCat === "Kreator & Coach") return ["sage-creator", "editorial-paper", "clean-minimal"].includes(t.id);
    if (selectedCat === "F&B / Cafe") return t.id === "cafe-menu";
    if (selectedCat === "Sales Mobil & Properti") return t.id === "sales-showcase";
    if (selectedCat === "Fashion & Beauty") return ["beauty-glam", "boutique-visual"].includes(t.id);
    if (selectedCat === "Minimalist") return ["clean-minimal", "classic-dark", "catalog-grid"].includes(t.id);
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-slate-800 flex flex-col">
      <MarketingNavbar />

      {/* Hero Header */}
      <section className="pt-16 pb-10 px-4 text-center max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Koleksi 11 Archetype Template Spesialis SEA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Pilih Desain Etalase yang Mencerminkan Karakter Bisnis Anda.
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Semua template dirancang mobile-first, berkecepatan tinggi, dan dioptimalkan agar pengunjung langsung membeli produk atau chat ke WhatsApp Anda.
          </p>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal direction="up" delay={150}>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                  selectedCat === cat
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Template Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((t, index) => (
          <ScrollReveal key={t.id} direction="up" delay={50 + (index % 3) * 100}>
            <div className="h-full bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-xl transition-all duration-300 shadow-xs group">
              {/* Visual Header Mockup Preview */}
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200/60 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                      t.tag === "Pro"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}
                  >
                    {t.tag}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">ID: {t.id}</span>
                </div>

                {/* Decorative mini cards */}
                <div className="space-y-2 opacity-80 group-hover:opacity-100 transition">
                  <div className="h-5 w-3/4 bg-white/80 rounded-lg shadow-xs"></div>
                  <div className="h-4 w-1/2 bg-white/60 rounded-lg"></div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Mobile First Ready
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5">{t.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {t.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/onboarding?template=${t.id}`}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition inline-flex items-center gap-1.5"
                  >
                    <span>Pilih Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`https://demo.etalase.online`}
                    target="_blank"
                    className="text-xs text-slate-500 hover:text-slate-900 transition font-medium"
                  >
                    Demo Live →
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <MarketingFooter />
    </div>
  );
}
