"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Sparkles,
  ArrowRight,
  XCircle,
  CheckCircle2,
  Car,
  Coffee,
  ShoppingBag,
  Users,
  Compass,
} from "lucide-react";

export default function SolusiPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("creator");

  const industries = [
    {
      id: "creator",
      title: "Kreator Konten & Digital",
      icon: Sparkles,
      tagline: "Monetisasi follower medsos menjadi penjualan nyata",
      templateLink: "rafa.etalase.online",
      templateType: "Clean Minimal",
      beforeProblems: [
        "Jual e-book atau preset harus kirim file manual satu per satu lewat DM/WA.",
        "Sering lupa mengecek bukti transfer atau tertipu bukti transfer palsu.",
        "Link di bio bertumpuk-tumpuk membingungkan followers.",
      ],
      afterSolutions: [
        "Auto-Delivery WhatsApp: File download & invoice terkirim instan begitu bayar.",
        "Pembayaran QRIS Instan otomatis terverifikasi tanpa perlu cek mutasi bank manual.",
        "1 Halaman Bio Link bersih yang menggabungkan seluruh produk digital & mentoring.",
      ],
      features: ["Produk Digital", "Auto-WA", "QRIS Instan", "Subdomain Mandiri"],
    },
    {
      id: "affiliate",
      title: "Affiliator TikTok & Shopee",
      icon: ShoppingBag,
      tagline: "Kumpulkan ratusan komisi produk dalam 1 etalase",
      templateLink: "aisyahlook.etalase.online",
      templateType: "Editorial Pastel",
      beforeProblems: [
        "Followers sering bertanya 'Kak link beli di mana?' dan hilang saat cari di marketplace.",
        "Linktree atau bio link biasa terbatas dan tombolnya kaku tanpa foto produk.",
        "Sulit membedakan produk rekomendasi TikTok Beg Kuning vs Shopee.",
      ],
      afterSolutions: [
        "Etalase visual kartu foto produk besar lengkap dengan tombol resmi warna marketplace.",
        "Review jujur dan bintang rating tampil rapi untuk meningkatkan rasio klik (CTR).",
        "Kompilasi link tanpa batas tautan, selalu siap diakses followers 24 jam.",
      ],
      features: ["Tombol Kuning TikTok", "Shopee Direct", "Foto HD Kotak", "0% Biaya Platform"],
    },
    {
      id: "sales",
      title: "Sales Mobil & Properti",
      icon: Car,
      tagline: "Showroom digital unit siap kirim & simulasi DP chat",
      templateLink: "bastianmobil.etalase.online",
      templateType: "Showroom Pro",
      beforeProblems: [
        "Brosur PDF berat sering tidak diunduh prospek karena kuota habis.",
        "Prospek bingung membaca tabel cicilan kredit yang rumit di chat.",
        "Terlihat kurang profesional jika hanya mengirim foto unit berantakan di galeri WhatsApp.",
      ],
      afterSolutions: [
        "Katalog unit online modern dengan chip spesifikasi (Tahun, Transmisi, Garansi).",
        "Tombol langsung 'Tanya Unit & Booking Test Drive' membuka WhatsApp dengan format rapi.",
        "Tautan singkat namamu.etalase.online terlihat kredibel saat ditaruh di kartu nama & bio.",
      ],
      features: ["Katalog Unit Full-Width", "Simulasi DP", "Chat Test Drive", "Brand Personal"],
    },
    {
      id: "cafe",
      title: "Cafe, Resto & F&B",
      icon: Coffee,
      tagline: "Buku menu visual & order kasir QR tanpa aplikasi mahal",
      templateLink: "kopisenja.etalase.online",
      templateType: "Visual Menu Grid",
      beforeProblems: [
        "Cetak buku menu fisik mahal dan susah diubah jika harga bahan baku naik.",
        "Aplikasi kasir POS langganan bulanan jutaan rupiah terlalu membebani UMKM.",
        "Pelanggan antre lama di meja kasir hanya untuk memilih menu makanan.",
      ],
      afterSolutions: [
        "Buku menu QR online 2 kolom yang bisa di-scan dari stiker meja kasir.",
        "Pelanggan langsung memesan via chat WhatsApp tanpa perlu download aplikasi.",
        "Ubah harga atau tandai menu 'Habis' kapan saja dari smartphone secara real-time.",
      ],
      features: ["Menu Grid 2 Kolom", "QR Meja Kasir", "Update Realtime", "0% Komisi Order"],
    },
    {
      id: "consultant",
      title: "Konsultan, Coach & Dokter",
      icon: Users,
      tagline: "Booking kalender privat & sesi konsultasi online",
      templateLink: "drhendra.etalase.online",
      templateType: "Clean Minimal",
      beforeProblems: [
        "Jadwal janji temu bertabrakan karena pengaturan manual di chat.",
        "Klien sering lupa jadwal janji temu dan tidak hadir pada jam yang disepakati.",
        "Ribet membuat link Google Meet satu per satu setelah klien membayar.",
      ],
      afterSolutions: [
        "Klien memilih sendiri slot tanggal dan jam yang masih kosong secara otomatis.",
        "Sistem mengirimkan tautan Google Meet resmi otomatis ke WhatsApp begitu bayar.",
        "Pengingat jadwal otomatis H-1 dan 1 jam sebelum sesi konsultasi dimulai.",
      ],
      features: ["Sinkronisasi Kalender", "Link GMeet Otomatis", "Pengingat WA", "Booking Fee"],
    },
    {
      id: "rental",
      title: "Jasa Rental & Sewa Mobil",
      icon: Compass,
      tagline: "Katalog armada rental harian & mingguan",
      templateLink: "bastianmobil.etalase.online",
      templateType: "Showroom Pro",
      beforeProblems: [
        "Customer terus-menerus menanyakan 'Mobil apa saja yang tersedia untuk weekend ini?'.",
        "Kirim foto mobil bolak-balik di chat menghabiskan memori smartphone admin.",
        "Sulit memverifikasi ketersediaan armada saat sedang mengemudi di jalan.",
      ],
      afterSolutions: [
        "Satu link katalog memperlihatkan seluruh armada mobil lengkap dengan tarif per hari.",
        "Format chat otomatis langsung menyertakan nama unit dan tanggal sewa yang dipilih.",
        "Tersedia sistem pembayaran DP sewa online instan untuk mengunci tanggal.",
      ],
      features: ["Katalog Armada", "Tarif Harian", "Format Order Rapi", "Verifikasi Instan"],
    },
  ];

  const current = industries.find((i) => i.id === selectedIndustry) || industries[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />

      <section className="pt-16 pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solusi Spesifik Industri</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            Dibuat untuk Cara Kerja Nyata Bisnis Anda.
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Pilih industri Anda untuk melihat perbandingan tajam masalah sebelum dan solusi praktis dengan etalase.online.
          </p>
        </ScrollReveal>
      </section>

      <section className="pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Industri */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] px-2 mb-2">
              Pilih Bidang Usaha
            </div>
            {industries.map((ind) => {
              const Icon = ind.icon;
              const isSelected = selectedIndustry === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#D94E28] shadow-sm text-[#1C1917] ring-1 ring-[#D94E28]/15"
                      : "bg-white/60 hover:bg-white border-[#E7E5E4] text-[#57534E]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#FDF0EC] text-[#D94E28]"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#1C1917]">{ind.title}</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "text-[#D94E28] translate-x-1" : "text-stone-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Panel Komparasi: Masalah vs Solusi */}
          <div className="lg:col-span-8 bg-white border border-[#E7E5E4] rounded-3xl p-7 sm:p-10 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#E7E5E4]">
              <div>
                <h2 className="text-2xl font-bold text-[#1C1917]">{current.title}</h2>
                <p className="text-xs sm:text-sm text-[#57534E] mt-0.5">{current.tagline}</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#E7E5E4] px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-[#D94E28]">
                <span>https://{current.templateLink}</span>
              </div>
            </div>

            {/* Grid Komparasi: Masalah vs Solusi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom Masalah (Sebelum) */}
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider">
                  <XCircle className="w-4 h-4" />
                  <span>Sebelum (Cara Manual / Ribet)</span>
                </div>
                <div className="space-y-3">
                  {current.beforeProblems.map((prob, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-red-950/80 leading-relaxed">
                      <span className="text-red-400 font-bold shrink-0">&times;</span>
                      <span>{prob}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kolom Solusi (Dengan etalase.online) */}
              <div className="bg-[#FDF0EC]/60 border border-[#FADCD3] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#D94E28] font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dengan etalase.online</span>
                </div>
                <div className="space-y-3">
                  {current.afterSolutions.map((sol, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1C1917] leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D94E28] shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Tags */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
                Fitur Unggulan yang Digunakan:
              </span>
              <div className="flex flex-wrap gap-2">
                {current.features.map((f, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold bg-[#FAF8F5] border border-[#E7E5E4] text-[#1C1917] px-3 py-1 rounded-lg"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/onboarding"
                className="w-full sm:w-auto bg-[#D94E28] hover:bg-[#B83E1D] text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2"
              >
                <span>Buka Etalase untuk {current.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/template"
                className="text-xs font-semibold text-[#57534E] hover:text-[#1C1917]"
              >
                Lihat Pratinjau Template &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
