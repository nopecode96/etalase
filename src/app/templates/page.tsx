"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Check, Smartphone, ArrowRight } from "lucide-react";
import { TEMPLATE_METADATA } from "@/components/templates";

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              E
            </div>
            <span className="font-bold text-lg text-white">
              etalase<span className="text-blue-500">.online</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/onboarding"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              Mulai Pakai Template
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-8 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>11 Arketipe Visual Eksklusif • Zero Contrast Bug</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Galeri Template Visual Etalase
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
          Setiap template dirancang dengan palet warna dan positioning industri spesifik. Bukan sekadar link pohon biasa, melainkan toko visual siap konversi.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                selectedCat === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-400/40"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Template Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col hover:border-slate-700 transition shadow-xl group"
          >
            {/* Visual Header Mockup Preview */}
            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-950 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                    t.tag === "Pro"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  }`}
                >
                  {t.tag}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">ID: {t.id}</span>
              </div>

              {/* Decorative mini cards */}
              <div className="space-y-1.5 opacity-80 group-hover:opacity-100 transition">
                <div className="h-6 w-3/4 bg-slate-700/60 rounded-lg animate-pulse"></div>
                <div className="h-4 w-1/2 bg-slate-700/40 rounded-lg"></div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                  Mobile First Ready
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">{t.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {t.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <Link
                  href={`/onboarding?template=${t.id}`}
                  className="bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition inline-flex items-center gap-1.5"
                >
                  <span>Pilih Template Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/demo`}
                  target="_blank"
                  className="text-xs text-slate-400 hover:text-white transition font-medium"
                >
                  Demo Live →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
