"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Produk Digital", "Otomasi WhatsApp", "Sales & Properti", "Afiliasi"];

  const articles = [
    {
      id: "cara-jual-produk-digital-2027",
      title: "5 Cara Menghasilkan 10 Juta Pertama dari Produk Digital Tanpa Modal Iklan",
      category: "Produk Digital",
      readTime: "5 min baca",
      date: "20 November 2026",
      summary:
        "Panduan langkah demi langkah mengubah keahlian, template Canva, dan e-book PDF menjadi aset digital berulang dengan sistem pengiriman otomatis via WhatsApp.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      featured: true,
    },
    {
      id: "strategi-closing-sales-mobil-chat",
      title: "Rahasia Closing 12 Unit Mobil Per Bulan dengan Katalog Online & WhatsApp",
      category: "Sales & Properti",
      readTime: "4 min baca",
      date: "18 November 2026",
      summary:
        "Bagaimana konsultan otomotif senior mengganti brosur PDF yang berat dengan showroom mobile yang ringan dan menghasilkan prospek test drive berkualitas.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
      featured: false,
    },
    {
      id: "optimasi-keranjang-kuning-tiktok",
      title: "Trik Meningkatkan Klik Keranjang Kuning TikTok Tanpa Terkena Pelanggaran Bio",
      category: "Afiliasi",
      readTime: "6 min baca",
      date: "15 November 2026",
      summary:
        "Cara menyusun etalase visual produk rekomendasi agar followers tidak bingung mencari link produk yang Anda ulas di konten video pendek.",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
      featured: false,
    },
    {
      id: "otomasi-chat-qris-instan",
      title: "Mengapa 78% Pembeli di Indonesia Lebih Memilih Bayar via QRIS Dibanding Transfer Manual",
      category: "Otomasi WhatsApp",
      readTime: "4 min baca",
      date: "12 November 2026",
      summary:
        "Studi kasus perilaku konsumen digital di Asia Tenggara: Kecepatan verifikasi 2 detik melipatgandakan omset penjual tanpa drama cek mutasi bank.",
      image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80",
      featured: false,
    },
  ];

  const filtered =
    selectedCategory === "Semua"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />

      <section className="pt-16 pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blog &amp; Panduan Monetisasi SEA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            Edukasi &amp; Trik Praktis Menjual di Jalur Chat.
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Artikel panduan teknis, studi kasus seller lokal, dan strategi memaksimalkan konversi bio link untuk pasar Asia Tenggara.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === c
                    ? "bg-[#D94E28] text-white shadow-xs"
                    : "bg-white text-[#57534E] hover:text-[#1C1917] border border-[#E7E5E4]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Grid Artikel */}
      <section className="pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-[#E7E5E4] rounded-3xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-full h-56 overflow-hidden bg-stone-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#D94E28] text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-xs">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-[#57534E]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-[#1C1917] group-hover:text-[#D94E28] transition-colors leading-snug">
                    {item.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                <span className="inline-flex items-center text-xs font-bold text-[#D94E28] gap-1 group-hover:gap-2 transition-all">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
