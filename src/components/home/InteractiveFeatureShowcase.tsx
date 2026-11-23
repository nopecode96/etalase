"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Store,
  ShoppingBag,
  Calendar,
  Ticket,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

export function InteractiveFeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const features = [
    {
      id: "digital",
      title: "Produk Digital & Auto-WA",
      icon: Zap,
      desc: "Jual e-book, template Canva, preset foto, atau video course. Struk dan link download terkirim otomatis ke WhatsApp.",
      rightView: "single-phone-digital",
    },
    {
      id: "katalog",
      title: "Katalog Fisik & Showroom",
      icon: Store,
      desc: "Pajang unit mobil, motor, properti, pakaian, atau menu kuliner lengkap dengan foto tajam dan tombol chat tanya unit.",
      rightView: "phone-showroom",
    },
    {
      id: "affiliate",
      title: "Affiliate Keranjang Kuning",
      icon: ShoppingBag,
      desc: "Kumpulkan rekomendasi produk dari TikTok Shop (Beg Kuning), Shopee, dan Tokopedia dalam 1 link tanpa batas tautan.",
      rightView: "phone-affiliate",
    },
    {
      id: "booking",
      title: "Booking & Konsultasi 1-on-1",
      icon: Calendar,
      desc: "Buka sesi mentoring privat, audit portofolio, atau konsultasi dokter dengan pemilihan tanggal dan slot jam otomatis.",
      rightView: "dual-phone-booking",
    },
    {
      id: "event",
      title: "Event & Webinar Online",
      icon: Ticket,
      desc: "Registrasi tiket webinar online & acara offline dengan auto-kirim link Google Meet dan reminder jadwal ke WhatsApp.",
      rightView: "phone-event",
    },
    {
      id: "blog",
      title: "Blog & Artikel SEO",
      icon: FileText,
      desc: "Publikasikan artikel edukasi untuk menjaring trafik gratis dari pencarian Google yang langsung mengarah ke produk tokomu.",
      rightView: "tablet-blog",
    },
    {
      id: "bio",
      title: "Bio Link Visual All-in-One",
      icon: Sparkles,
      desc: "Satu halaman beranda mobile yang merangkum semua link medsos, katalog jualan, dan nomor WhatsApp admin.",
      rightView: "phone-bio",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Kolom Kiri: Grid 2x4 Kartu Klikable */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {features.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeFeature === idx;

          return (
            <button
              key={item.id}
              onClick={() => setActiveFeature(idx)}
              onMouseEnter={() => setActiveFeature(idx)}
              className={`text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? "bg-white border-[#D94E28] shadow-md ring-1 ring-[#D94E28]/15"
                  : "bg-white/80 hover:bg-white border-[#E7E5E4] hover:border-stone-300 shadow-2xs"
              }`}
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isActive
                      ? "bg-[#FDF0EC] text-[#D94E28]"
                      : "bg-[#FAF8F5] text-[#57534E]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#1C1917] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 flex items-center text-[11px] font-bold text-[#D94E28] gap-1">
                <span>Lihat Pratinjau</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}

        {/* Kartu ke-8: CTA "Jelajahi semua fitur →" */}
        <Link
          href="/fitur"
          className="p-5 rounded-2xl bg-[#FDF0EC] border border-[#FADCD3] hover:border-[#D94E28] transition-all flex flex-col justify-between group shadow-2xs"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-white text-[#D94E28] flex items-center justify-center mb-3 shadow-2xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#1C1917] mb-1.5">
              Lebih Banyak Kemampuan
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Domain custom, analitik pengunjung, pixel iklan, hingga integrasi multi-rekening SEA.
            </p>
          </div>

          <div className="pt-3 flex items-center text-xs font-bold text-[#D94E28] gap-1">
            <span>Jelajahi Semua Fitur</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Kolom Kanan: Interactive Context-Aware Dynamic Device Preview */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="w-full max-w-[340px] sm:max-w-[360px] bg-[#1C1917] rounded-[2.8rem] p-3 shadow-2xl border-4 border-[#292524] relative flex flex-col items-center min-h-[560px]">
          {/* Dynamic Island Notch */}
          <div className="w-24 h-4 bg-black rounded-full mb-2 flex items-center justify-between px-2.5 shrink-0 z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
            <div className="w-2 h-2 rounded-full bg-stone-800 border border-stone-700"></div>
          </div>

          {/* Screen Content based on Active Feature */}
          <div className="w-full h-[500px] bg-[#FAF8F5] rounded-[2.1rem] overflow-y-auto no-scrollbar relative p-4 flex flex-col">
            {/* View 1: Detail E-Book + QRIS + Auto-WA */}
            {activeFeature === 0 && (
              <div className="space-y-4 animate-fade-in">
                <div className="text-center pb-2 border-b border-[#E7E5E4]">
                  <span className="text-[10px] font-bold text-[#D94E28] bg-[#FDF0EC] px-2 py-0.5 rounded-full">
                    PRODUK DIGITAL
                  </span>
                  <div className="text-xs font-bold text-[#1C1917] mt-1">
                    rafa.etalase.online
                  </div>
                </div>

                <div className="w-full h-44 rounded-2xl overflow-hidden bg-stone-100 relative shadow-2xs">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80"
                    alt="E-book Cover"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Instant Download
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[#1C1917]">
                    E-Book: 30 Hari Mahir Video Editing
                  </h4>
                  <div className="text-base font-extrabold text-[#D94E28] mt-1">
                    Rp 99.000
                  </div>
                  <p className="text-[11px] text-[#57534E] mt-1">
                    File PDF + link Google Drive materi video langsung dikirim ke WhatsApp begitu bayar.
                  </p>
                </div>

                <div className="p-3 bg-white border border-[#E7E5E4] rounded-xl text-left space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pembayaran QRIS Instan</span>
                  </div>
                  <div className="text-[10px] text-[#57534E]">
                    Support: GoPay, OVO, ShopeePay, BCA, Mandiri
                  </div>
                </div>

                <button className="w-full bg-[#D94E28] text-white py-3 rounded-xl font-bold text-xs shadow-xs">
                  Beli Sekarang (Auto-Kirim WA)
                </button>
              </div>
            )}

            {/* View 2: Katalog Showroom Unit */}
            {activeFeature === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="text-center pb-2 border-b border-[#E7E5E4]">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    KATALOG SHOWROOM
                  </span>
                  <div className="text-xs font-bold text-[#1C1917] mt-1">
                    bastianmobil.etalase.online
                  </div>
                </div>

                <div className="w-full h-40 rounded-2xl overflow-hidden bg-stone-100 relative shadow-2xs">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80"
                    alt="SUV Car"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Unit Baru 2026
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[#1C1917]">
                    All-New SUV Hybrid Sport 2026
                  </h4>
                  <div className="text-sm font-extrabold text-blue-600 mt-1">
                    Mulai DP 15 Juta &bull; Angsuran 4 Jt/Bln
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 bg-white rounded-lg border border-[#E7E5E4]">
                    Transmission: <strong>Matic</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-[#E7E5E4]">
                    Garansi: <strong>5 Tahun</strong>
                  </div>
                </div>

                <button className="w-full bg-[#1C1917] text-white py-3 rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-1.5">
                  <span>Tanya Unit &amp; Booking Test Drive</span>
                </button>
              </div>
            )}

            {/* View 3: Affiliate Keranjang Kuning */}
            {activeFeature === 2 && (
              <div className="space-y-3 animate-fade-in">
                <div className="text-center pb-2 border-b border-[#E7E5E4]">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    AFFILIATE BIO LINK
                  </span>
                  <div className="text-xs font-bold text-[#1C1917] mt-1">
                    aisyahlook.etalase.online
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E7E5E4] rounded-2xl space-y-2">
                  <img
                    src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=300&q=80"
                    alt="Lip Cream"
                    className="w-full h-28 object-cover rounded-xl"
                  />
                  <div className="text-xs font-bold text-[#1C1917]">
                    Velvet Matte Lip Cream Silk
                  </div>
                  <div className="text-xs font-bold text-rose-600">Rp 89.000</div>
                  <button className="w-full bg-[#F59E0B] text-black text-xs font-bold py-2 rounded-lg">
                    🟡 Beli di Keranjang Kuning TikTok
                  </button>
                </div>

                <div className="p-2.5 bg-white border border-[#E7E5E4] rounded-xl flex items-center justify-between text-xs">
                  <span className="font-semibold text-orange-600">🟠 Shopee Affiliate</span>
                  <span className="text-[10px] text-[#57534E]">Buka Link &rarr;</span>
                </div>
              </div>
            )}

            {/* View 4: Booking & Konsultasi 1-on-1 (Dual Step) */}
            {activeFeature === 3 && (
              <div className="space-y-3.5 animate-fade-in">
                <div className="text-center pb-2 border-b border-[#E7E5E4]">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    BOOKING JADWAL 1-ON-1
                  </span>
                  <div className="text-xs font-bold text-[#1C1917] mt-1">
                    drhendra.etalase.online
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E7E5E4] rounded-2xl text-left">
                  <div className="text-xs font-bold text-[#1C1917]">
                    Mentoring Audit Portofolio
                  </div>
                  <div className="text-xs font-bold text-[#D94E28] mt-0.5">
                    Rp 350.000 / 60 Menit
                  </div>
                </div>

                {/* Mini Calendar Card */}
                <div className="p-3 bg-white border border-stone-200 rounded-2xl space-y-2 text-left">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#1C1917]">
                    <span>Pilih Tanggal:</span>
                    <span className="text-emerald-700">November 2026</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                    <span className="p-1.5 rounded-lg bg-[#FDF0EC] text-[#D94E28] font-bold border border-[#FADCD3]">
                      Sel 24
                    </span>
                    <span className="p-1.5 rounded-lg bg-stone-50 text-stone-600">Rab 25</span>
                    <span className="p-1.5 rounded-lg bg-stone-50 text-stone-600">Kam 26</span>
                    <span className="p-1.5 rounded-lg bg-stone-50 text-stone-600">Jum 27</span>
                  </div>
                  <div className="text-[10px] text-[#57534E] flex items-center gap-1 pt-1">
                    <Clock className="w-3 h-3 text-[#D94E28]" />
                    <span>Slot: 10:00, 14:00, 19:30 WIB</span>
                  </div>
                </div>

                <button className="w-full bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs shadow-xs">
                  Konfirmasi Booking Google Meet
                </button>
              </div>
            )}

            {/* View 5: Event & Webinar Online */}
            {activeFeature === 4 && (
              <div className="space-y-4 animate-fade-in">
                <div className="text-center pb-2 border-b border-[#E7E5E4]">
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                    TIKET WEBINAR
                  </span>
                  <div className="text-xs font-bold text-[#1C1917] mt-1">
                    webinar.etalase.online
                  </div>
                </div>

                <div className="w-full h-36 rounded-2xl overflow-hidden bg-stone-100 relative shadow-2xs">
                  <img
                    src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=400&q=80"
                    alt="Webinar Event"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-purple-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Live via Zoom
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[#1C1917]">
                    Masterclass: Strategi Dividen Saham 2026
                  </h4>
                  <div className="text-sm font-extrabold text-[#D94E28] mt-1">
                    Rp 149.000 <span className="line-through text-stone-400 text-xs">Rp 300.000</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#57534E] bg-white p-2.5 rounded-xl border border-[#E7E5E4] space-y-1">
                  <div>📅 Sabtu, 28 November 2026</div>
                  <div>⏰ 19:30 - 21:30 WIB</div>
                  <div className="text-purple-700 font-semibold text-[10px]">
                    ✓ Link akses Zoom dikirim otomatis ke WA &amp; Email
                  </div>
                </div>

                <button className="w-full bg-[#D94E28] text-white py-2.5 rounded-xl font-bold text-xs shadow-xs">
                  Beli Tiket Sekarang
                </button>
              </div>
            )}

            {/* View 6: Blog & Artikel SEO */}
            {activeFeature === 5 && (
              <div className="space-y-3 animate-fade-in text-left">
                <div className="text-center pb-2 border-b border-[#E7E5E4]">
                  <span className="text-[10px] font-bold text-[#1C1917] bg-stone-200 px-2 py-0.5 rounded-full">
                    BLOG &amp; ARTIKEL SEO
                  </span>
                  <div className="text-xs font-bold text-[#1C1917] mt-1">
                    blog.etalase.online
                  </div>
                </div>

                <div className="w-full h-28 rounded-xl overflow-hidden bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80"
                    alt="Blog Cover"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#D94E28]">PANDUAN BISNIS</span>
                  <h4 className="font-bold text-xs text-[#1C1917] leading-snug">
                    5 Cara Menghasilkan 10 Juta Pertama dari Produk Digital Tanpa Modal Besar
                  </h4>
                  <p className="text-[10px] text-[#57534E] line-clamp-3">
                    Pelajari langkah praktis membangun bio link berkonversi tinggi dan mengumpulkan order otomatis via chat...
                  </p>
                </div>

                <div className="p-2.5 bg-white border border-[#E7E5E4] rounded-xl flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#1C1917]">Baca Artikel Penuh</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D94E28]" />
                </div>
              </div>
            )}

            {/* View 7: Bio Link Visual All-in-One */}
            {activeFeature === 6 && (
              <div className="space-y-3.5 animate-fade-in text-center">
                <div className="w-14 h-14 rounded-full mx-auto overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Bio Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[#1C1917]">Studio Rafa Creative</h4>
                  <p className="text-[11px] text-[#57534E]">
                    Kreator Video &bull; 140k di TikTok &amp; IG
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white border border-[#E7E5E4] rounded-xl font-bold text-[#1C1917] flex items-center justify-between shadow-2xs">
                    <span>🎬 Paket Preset Video 2026</span>
                    <span className="text-[#D94E28]">Rp 49rb</span>
                  </div>
                  <div className="p-2.5 bg-white border border-[#E7E5E4] rounded-xl font-bold text-[#1C1917] flex items-center justify-between shadow-2xs">
                    <span>🎙 Mic Rekomendasi (Keranjang Kuning)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                  <div className="p-2.5 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-2xs">
                    <span>Chat WhatsApp Admin</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
