import React from "react";
import Link from "next/link";
import { Car, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Showroom Digital & Katalog Sales — etalase.online",
  description: "Showroom digital untuk sales mobil, motor, agen properti & rental. Closing langsung via WhatsApp tanpa komisi.",
};

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-slate-800 flex flex-col">
      <MarketingNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Car className="w-3.5 h-3.5 text-emerald-600" />
              <span>Solusi Khusus Sales Otomotif, Properti &amp; Rental</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Showroom Digital Profesional yang Langsung Closing di Chat WhatsApp.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Ubah kartu nama biasa jadi katalog visual interaktif. Tampilkan unit siap kirim, simulasi promo, foto serah terima pelanggan, dan tombol chat yang sudah berisi draf tipe unit idaman pembeli.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal direction="up" delay={100}>
            <div className="h-full bg-white border border-slate-200 p-8 rounded-3xl space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-xl">
                Order Chat Otomatis (0% Komisi)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calon pembeli klik &ldquo;Tanya Promo&rdquo; langsung membuka WhatsApp Anda dengan pesan terisi rapi: <em>&ldquo;Halo Pak, saya tertarik promo unit Avanza G CVT di etalase Anda.&rdquo;</em>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="h-full bg-white border border-slate-200 p-8 rounded-3xl space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-xl">
                Bisa Custom Domain Sendiri
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gunakan domain kredibel seperti <code>budi-toyota.com</code> atau <code>rumahimpianbdg.com</code> untuk meningkatkan kepercayaan prospek pembeli bernilai tinggi.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={150}>
          <div className="text-center bg-white border border-slate-200 p-10 rounded-3xl space-y-4 shadow-xs">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Tingkatkan Closing Sales Anda Bulan Ini
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto">
              Setup katalog showroom dalam 2 menit. Tampil kredibel di bio Instagram, TikTok, dan kartu nama digital Anda.
            </p>
            <div className="pt-2">
              <Link
                href="/onboarding"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition shadow-sm inline-flex items-center gap-2"
              >
                <span>Buka Katalog Showroom Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <MarketingFooter />
    </div>
  );
}
