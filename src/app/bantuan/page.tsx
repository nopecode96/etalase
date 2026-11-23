"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Search,
  HelpCircle,
  ChevronDown,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Globe,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function BantuanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const topFaqs = [
    {
      q: "Apakah benar etalase.online bisa digunakan secara gratis selamanya?",
      tag: "POPULER",
      a: "Benar sekali. Paket Gratis etalase.online berlaku selamanya tanpa batas waktu trial. Anda mendapatkan 1 subdomain mandiri (namamu.etalase.online), produk & tautan tanpa batas (unlimited), dan 0% komisi transaksi di jalur pemesanan chat WhatsApp.",
    },
    {
      q: "Bagaimana cara kerja pengiriman file otomatis ke WhatsApp pembeli?",
      tag: "BARU!",
      a: "Begitu pembeli menyelesaikan pembayaran via QRIS Instan, sistem cloud kami langsung mendeteksi status lunas dan mengirimkan pesan WhatsApp resmi berisi invoice dan link download file eksklusif ke nomor pembeli dalam 2 detik.",
    },
    {
      q: "Apakah saya bisa menggunakan nama domain sendiri (contoh: tokoanda.com)?",
      tag: "POPULER",
      a: "Bisa! Di Paket Pro, Anda dapat menyambungkan domain pribadi (.com, .id, .shop, dll.) langsung ke etalase Anda. Kami menyediakan sertifikat SSL/HTTPS gratis dan panduan DNS super mudah.",
    },
    {
      q: "Bagaimana cara mencairkan uang hasil penjualan QRIS?",
      tag: "KEUANGAN",
      a: "Seluruh dana penjualan yang masuk melalui QRIS tercatat real-time di dashboard tokomu. Anda dapat melakukan penarikan saldo (payout) ke seluruh rekening bank di Indonesia (BCA, Mandiri, BRI, BNI) atau e-wallet setiap hari kerja.",
    },
    {
      q: "Apakah etalase.online cocok untuk usaha fisik seperti kafe dan sales mobil?",
      tag: "FITUR",
      a: "Sangat cocok! Kami memiliki template khusus 'Visual Menu Grid' untuk buku menu kafe QR meja, dan template 'Showroom Pro' untuk sales mobil/properti dengan chip spesifikasi unit dan tombol tanya simulasi DP via chat.",
    },
  ];

  const categories = [
    {
      icon: BookOpen,
      title: "Panduan Memulai",
      desc: "Langkah pertama mendaftar, mengklaim subdomain, dan mengisi profil toko.",
    },
    {
      icon: ShieldCheck,
      title: "Pembayaran & QRIS",
      desc: "Aktivasi QRIS, penarikan dana, verifikasi transaksi, dan mata uang SEA.",
    },
    {
      icon: MessageCircle,
      title: "Otomasi WhatsApp",
      desc: "Pengaturan auto-delivery file, format chat order, dan template pesan.",
    },
    {
      icon: Globe,
      title: "Domain & Kustomisasi",
      desc: "Menghubungkan domain sendiri, pemilihan warna, dan font template.",
    },
  ];

  const filteredFaqs = topFaqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />

      {/* Header Pusat Bantuan & Search Bar */}
      <section className="pt-16 pb-14 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pusat Bantuan &amp; Knowledgebase</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            Ada yang Bisa Kami Bantu?
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Temukan jawaban cepat seputar pengaturan etalase, pengiriman WhatsApp otomatis, hingga pembayaran QRIS.
          </p>

          {/* Search Bar Input */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari topik bantuan (contoh: QRIS, domain, file download)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E7E5E4] rounded-2xl pl-12 pr-4 py-3.5 text-sm text-[#1C1917] placeholder:text-[#57534E]/50 focus:outline-none focus:border-[#D94E28] focus:ring-2 focus:ring-[#D94E28]/15 shadow-sm transition"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* 4 Kategori Bantuan */}
      <section className="pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-2xs hover:shadow-md transition space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#1C1917]">{c.title}</h3>
                <p className="text-xs text-[#57534E] leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top 5 FAQ Accordion */}
      <section className="pb-24 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28]">
            Pertanyaan Populer
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
            FAQ yang Paling Sering Ditanyakan
          </h2>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden transition shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/50"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        faq.tag === "BARU!"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-[#FDF0EC] text-[#D94E28]"
                      }`}
                    >
                      {faq.tag}
                    </span>
                    <span className="font-bold text-sm text-[#1C1917]">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#57534E] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#D94E28]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#57534E] leading-relaxed border-t border-[#FAF8F5] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Butuh Bantuan Lebih Lanjut */}
        <div className="mt-12 bg-[#FDF0EC] border border-[#FADCD3] rounded-3xl p-8 text-center space-y-4">
          <h3 className="font-bold text-base sm:text-lg text-[#1C1917]">
            Belum Menemukan Jawaban yang Dicari?
          </h3>
          <p className="text-xs sm:text-sm text-[#57534E] max-w-md mx-auto">
            Tim Customer Support etalase.online siap membantu Anda langsung melalui chat WhatsApp.
          </p>
          <div className="pt-2">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 bg-[#D94E28] hover:bg-[#B83E1D] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition"
            >
              <span>Hubungi CS WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
