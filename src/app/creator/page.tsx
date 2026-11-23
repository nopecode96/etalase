import React from "react";
import Link from "next/link";
import { Sparkles, ShoppingBag, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";

export const metadata = {
  title: "Solusi Bio Link & Storefront untuk Kreator — etalase.online",
  description: "Maksimalkan penghasilan dari setiap klik di TikTok, IG & Threads. Jual file digital via QRIS dan monetisasi affiliate.",
};

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <MarketingNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solusi Khusus Kreator, Coach &amp; Affiliator SEA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Maksimalkan Penghasilan dari Setiap Klik di TikTok, IG &amp; Threads.
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Jual e-book, preset Lightroom, template Notion, dan kelas video terproteksi via QRIS instan, sambil merekomendasikan produk fisik di Keranjang Kuning dengan tracking akurat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-black">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-xl">
              Instant Digital Delivery via WhatsApp
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Begitu pembeli membayar via Borderpay QRIS atau PayPal, workflow n8n otomatis mengirim file download atau link Zoom ke WhatsApp pembeli secara instan tanpa delay email spam.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-black">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-xl">
              Preset Keranjang Kuning &amp; Shopee
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tombol afiliasi dilengkapi badge warna dan istilah resmi SEA (Keranjang Kuning ID, Beg Kuning MY, Yellow Basket SG) yang sudah terbukti menaikkan CTR hingga 3x lipat.
            </p>
          </div>
        </div>

        <div className="text-center bg-slate-900 border border-slate-800 p-10 rounded-3xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Siap Membangun Mesin Penghasilan Kreator Anda?
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Daftar dalam 10 detik dengan Google Connect. Mulai gratis selamanya dengan 0% komisi chat commerce.
          </p>
          <div className="pt-2">
            <Link
              href="/onboarding"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition shadow-lg shadow-blue-500/25 inline-flex items-center gap-2"
            >
              <span>Mulai Etalase Kreator Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
