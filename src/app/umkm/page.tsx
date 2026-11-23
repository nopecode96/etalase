import React from "react";
import Link from "next/link";
import { Store, QrCode, MapPin, ArrowRight } from "lucide-react";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";

export const metadata = {
  title: "Katalog Menu Digital & Standee Kasir UMKM — etalase.online",
  description: "Menu digital interaktif dan standee meja kasir dengan QR Google Maps review bintang 5 untuk cafe, resto & toko fisik.",
};

export default function UmkmPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <MarketingNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Store className="w-3.5 h-3.5" />
            <span>Solusi Khusus Cafe, Resto, Toko Fisik &amp; UMKM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Menu Digital &amp; Standee Meja Kasir yang Terhubung ke Review Google Maps.
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Gantikan daftar menu kertas yang lusuh dengan katalog visual modern di meja kasir. Pelanggan cukup scan QR untuk lihat menu, pesan via WhatsApp, atau beri review bintang 5 di Google Maps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-black">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-xl">
              Generator Standee Meja Kasir
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-generate file siap cetak ukuran tent card meja kasir: QR Visit Katalog Menu + QR ajakan review Google Maps bisnis lokal Anda.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-black">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-xl">
              Navigasi Google Maps 1-Klik
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tombol penunjuk arah langsung membuka Google Maps rute tercepat ke outlet fisik Anda, mempermudah pelanggan baru menemukan lokasi toko.
            </p>
          </div>
        </div>

        <div className="text-center bg-slate-900 border border-slate-800 p-10 rounded-3xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Digitalisasikan Usaha Lokal Anda Sekarang
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Tingkatkan omset dan rating Google Maps restoran atau tokomu tanpa biaya langganan bulanan mahal.
          </p>
          <div className="pt-2">
            <Link
              href="/onboarding"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition shadow-lg shadow-amber-500/25 inline-flex items-center gap-2"
            >
              <span>Buka Menu Toko Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
