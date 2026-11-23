import React from "react";
import Link from "next/link";
import { Car, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";

export const metadata = {
  title: "Showroom Digital & Katalog Sales — etalase.online",
  description: "Showroom digital untuk sales mobil, motor, agen properti & rental. Closing langsung via WhatsApp tanpa komisi.",
};

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <MarketingNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Car className="w-3.5 h-3.5" />
            <span>Solusi Khusus Sales Otomotif, Properti &amp; Rental</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Showroom Digital Profesional yang Langsung Closing di Chat WhatsApp.
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Ubah kartu nama biasa jadi katalog visual interaktif. Tampilkan unit siap kirim, simulasi promo, foto serah terima pelanggan, dan tombol chat yang sudah berisi draf tipe unit idaman pembeli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-xl">
              Order Chat Otomatis (0% Komisi)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calon pembeli klik &ldquo;Tanya Promo&rdquo; langsung membuka WhatsApp Anda dengan pesan terisi rapi: <em>&ldquo;Halo Pak, saya tertarik promo unit Avanza G CVT di etalase Anda.&rdquo;</em>
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-xl">
              Bisa Custom Domain Sendiri
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gunakan domain kredibel seperti <code>budi-toyota.com</code> atau <code>rumahimpianbdg.com</code> untuk meningkatkan kepercayaan prospek pembeli bernilai tinggi.
            </p>
          </div>
        </div>

        <div className="text-center bg-slate-900 border border-slate-800 p-10 rounded-3xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Tingkatkan Closing Sales Anda Bulan Ini
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Setup katalog showroom dalam 2 menit. Tampil kredibel di bio Instagram, TikTok, dan kartu nama digital Anda.
          </p>
          <div className="pt-2">
            <Link
              href="/onboarding"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition shadow-lg shadow-emerald-500/25 inline-flex items-center gap-2"
            >
              <span>Buka Katalog Showroom Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
