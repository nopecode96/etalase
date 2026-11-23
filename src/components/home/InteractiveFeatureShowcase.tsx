"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  Store,
  ShoppingBag,
  Calendar,
  Ticket,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export function InteractiveFeatureShowcase() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Bento Grid 3-Kolom Editorial */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ============================================================== */}
        {/* KARTU 1 (Span 2 Kolom): Produk Digital & Pengiriman Auto-WA */}
        {/* ============================================================== */}
        <div className="lg:col-span-2 bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center shadow-xs">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] border border-[#FADCD3] px-3 py-1 rounded-full">
                Paling Favorit Kreator
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight mb-2">
              Produk Digital &amp; Pengiriman Berkas Otomatis ke WhatsApp
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed max-w-xl">
              Jual e-book, template Canva, preset foto, Notion template, atau video course. Struk pembayaran dan link akses file terkirim instan ke WhatsApp pembeli secara otomatis 24 jam nonstop tanpa Anda harus standby.
            </p>
          </div>

          {/* Micro-UI: Simulasi Chat WhatsApp Auto-Delivery */}
          <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-8 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-stone-500 pb-2 border-b border-stone-200/60">
                <span className="font-semibold text-[#1C1917] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Bot Notifikasi WhatsApp etalase.online
                </span>
                <span className="text-[10px]">Baru Saja</span>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 text-xs text-stone-800 space-y-1.5">
                <p className="font-semibold text-emerald-950">
                  Halo Kak Budi Santoso! 👋 Terima kasih telah berbelanja di <strong>Studio Rafa Creative</strong>.
                </p>
                <p className="text-[11px] text-stone-600">
                  Pembayaran <strong>#ORD-84920 (Rp 49.000)</strong> telah lunas via QRIS.
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-emerald-300 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                    <span>📥 Akses Download Preset Pack (.zip)</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-stone-400 pt-0.5">
                <span>✓ Terkirim otomatis dalam 3 detik</span>
                <span className="text-emerald-700 font-semibold">Tingkat Buka 98%</span>
              </div>
            </div>

            <div className="sm:col-span-4 space-y-2 text-xs text-[#57534E]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Support Google Drive, PDF, Notion, Canva</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Watermark PDF anti-bajak otomatis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Notifikasi admin ke multi-nomor WA</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU 2 (1 Kolom): Katalog Fisik & Showroom */}
        {/* ============================================================== */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-stone-100 text-[#1C1917] flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] bg-stone-100 px-3 py-1 rounded-full">
                Sales &amp; UMKM
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#1C1917] tracking-tight mb-2">
              Katalog Fisik &amp; Showroom Unit
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Pajang mobil, motor, properti, pakaian, atau menu kuliner. Mendukung simulasi DP, harga pasti, hingga tombol konsultasi &ldquo;Tanya Unit&rdquo; ke WhatsApp.
            </p>
          </div>

          {/* Micro-UI: Mini Showroom Card */}
          <div className="mt-5 pt-4 border-t border-stone-100">
            <div className="bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl p-3 flex items-center gap-3">
              <img
                src="/images/demo/product-car-suv.jpg"
                alt="Showroom Preview"
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                  Simulasi DP
                </span>
                <div className="font-bold text-xs text-[#1C1917] truncate mt-0.5">
                  All-New SUV Hybrid 2026
                </div>
                <div className="text-[11px] font-extrabold text-[#D94E28]">
                  DP Mulai 15 Jt &bull; Angs. 4 Jt
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 font-medium">
              <span>Chat langsung isi draf spesifikasi</span>
              <span className="text-emerald-700 font-bold">0% Komisi</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU 3 (1 Kolom): Affiliate Keranjang Kuning SEA */}
        {/* ============================================================== */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Afiliator SEA
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#1C1917] tracking-tight mb-2">
              Affiliate Keranjang Kuning Multi-Platform
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Kumpulkan seluruh rekomendasi racun belanja TikTok Shop (Beg Kuning), Shopee Mall, dan Lazada dalam 1 link tanpa batas jumlah tautan.
            </p>
          </div>

          {/* Micro-UI: Multi-Platform Chips */}
          <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                <span>🛍️</span> TikTok Shop (Beg Kuning)
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Direct Link
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                <span>🟠</span> Shopee Mall &amp; Lazada SEA
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Auto-UTM
              </span>
            </div>

            <p className="text-[10px] text-stone-400 text-center">
              Aman dari razia algoritma &bull; Buka langsung di aplikasi marketplace
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU 4 (1 Kolom): Booking Jadwal 1-on-1 & Kalender */}
        {/* ============================================================== */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                Konsultan &amp; Coach
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#1C1917] tracking-tight mb-2">
              Booking 1-on-1 &amp; Sinkronisasi Kalender
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Buka sesi mentoring privat, audit portofolio, atau konsultasi dokter. Klien memilih slot tanggal &amp; jam kosong secara otomatis tanpa drama tanya-jawab jadwal.
            </p>
          </div>

          {/* Micro-UI: Date Picker Mini */}
          <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
            <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
              <div className="p-2 rounded-xl bg-[#D94E28] text-white font-bold shadow-2xs">
                <div>Sel</div>
                <div className="text-xs">24</div>
              </div>
              <div className="p-2 rounded-xl bg-stone-100 text-stone-600 font-medium">
                <div>Rab</div>
                <div className="text-xs">25</div>
              </div>
              <div className="p-2 rounded-xl bg-stone-100 text-stone-600 font-medium">
                <div>Kam</div>
                <div className="text-xs">26</div>
              </div>
              <div className="p-2 rounded-xl bg-stone-100 text-stone-600 font-medium">
                <div>Jum</div>
                <div className="text-xs">27</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-center justify-between text-[11px] text-blue-900">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                19:30 WIB
              </span>
              <span className="font-bold text-emerald-700">2 Slot Tersedia</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU 5 (1 Kolom): Event & Webinar Online */}
        {/* ============================================================== */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Ticket className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                Event &amp; Webinar
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#1C1917] tracking-tight mb-2">
              Tiketing Webinar &amp; Auto-Reminder
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Jual tiket workshop online atau acara tatap muka. Kuota peserta terkontrol otomatis dan sistem otomatis mengirimkan pengingat H-1 ke WhatsApp peserta.
            </p>
          </div>

          {/* Micro-UI: Mini Ticket */}
          <div className="mt-5 pt-4 border-t border-stone-100 space-y-2.5">
            <div className="bg-[#FAF8F5] border border-dashed border-stone-300 rounded-2xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold text-[#1C1917]">
                <span className="truncate">Masterclass Content 2026</span>
                <span className="text-[#D94E28] shrink-0">Rp 149rb</span>
              </div>
              <div className="text-[11px] text-stone-500 flex items-center gap-1">
                <span>📍 Live via Google Meet &bull; Kuota 48/50</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-purple-700 font-semibold px-1">
              <span>✓ Auto-generate link meeting</span>
              <span>Reminder H-1 WA</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU 6 (Span 2 Kolom): Pagar Margin & Bebas Biaya Siluman */}
        {/* ============================================================== */}
        <div className="lg:col-span-2 bg-[#FAF8F5] border-2 border-[#D94E28]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#D94E28] text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Margin Terlindungi 100% Utuh
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight mb-2">
              0% Komisi Order Chat &amp; Pembayaran QRIS Transparan
            </h3>
            <p className="text-sm text-[#57534E] leading-relaxed max-w-xl">
              Bebas dari potongan komisi marketplace yang menggerus keuntungan. Terima pesanan via WhatsApp tanpa potongan biaya sepeser pun (0%), atau sediakan pembayaran QRIS instan dengan opsi fleksibel: biaya transaksi bisa diatur ditanggung pembeli (*Convenience Fee*) sehingga keuntungan Anda tetap 100% utuh.
            </p>
          </div>

          {/* Micro-UI: Transparansi 3 Pilar Biaya */}
          <div className="mt-6 pt-6 border-t border-[#E7E5E4] grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-white rounded-2xl p-4 border border-[#E7E5E4] shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#57534E] block mb-1">
                Order via WhatsApp
              </span>
              <div className="text-2xl font-black text-emerald-600">0%</div>
              <span className="text-[11px] text-stone-500 font-medium mt-0.5 block">
                Tanpa potongan komisi apa pun
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#E7E5E4] shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#57534E] block mb-1">
                Checkout QRIS Instan
              </span>
              <div className="text-2xl font-black text-[#D94E28]">Mulai 2%</div>
              <span className="text-[11px] text-stone-500 font-medium mt-0.5 block">
                Bisa diatur dibayar Pembeli
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#E7E5E4] shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#57534E] block mb-1">
                Pencairan Saldo (Payout)
              </span>
              <div className="text-2xl font-black text-slate-900">GRATIS 4x</div>
              <span className="text-[11px] text-stone-500 font-medium mt-0.5 block">
                Tiap bulan ke semua rekening bank
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Link Eksplorasi ke Halaman Fitur & Harga */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-2xs">
        <div className="text-xs text-[#57534E] text-center sm:text-left">
          <strong>Masih banyak kemampuan lainnya:</strong> Custom domain pribadi (<code>.com</code>), analitik pengunjung real-time, Meta Pixel &amp; CAPI, Google Analytics 4, hingga dukungan multi-mata uang SEA.
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/fitur"
            className="text-xs font-bold text-[#D94E28] hover:text-[#B83E1D] inline-flex items-center gap-1 transition"
          >
            <span>Jelajahi Semua Fitur</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-stone-300">|</span>
          <Link
            href="/harga"
            className="text-xs font-bold text-[#1C1917] hover:text-[#D94E28] inline-flex items-center gap-1 transition"
          >
            <span>Lihat Paket Harga</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
