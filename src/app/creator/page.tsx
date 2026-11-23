import React from "react";
import Link from "next/link";
import { Sparkles, ShoppingBag, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Solusi Bio Link & Storefront untuk Kreator — etalase.online",
  description: "Maksimalkan penghasilan dari setiap klik di TikTok, IG & Threads. Jual file digital via QRIS dan monetisasi affiliate.",
};

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col">
      <MarketingNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Solusi Khusus Kreator, Coach &amp; Affiliator SEA</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Maksimalkan Penghasilan dari Setiap Klik di TikTok, IG &amp; Threads.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Jual e-book, preset Lightroom, template Notion, dan kelas video terproteksi via QRIS instan, sambil merekomendasikan produk fisik di Keranjang Kuning dengan tracking akurat.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal direction="up" delay={100}>
            <div className="h-full bg-white border border-slate-200 p-8 rounded-3xl space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-xl">
                Instant Digital Delivery via WhatsApp
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Begitu pembeli membayar via Pembayaran QRIS Instan atau PayPal, sistem otomatis mengirim file download atau link Zoom ke WhatsApp pembeli secara instan tanpa delay email spam.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="h-full bg-white border border-slate-200 p-8 rounded-3xl space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-xl">
                Preset Keranjang Kuning &amp; Shopee
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tombol afiliasi dilengkapi badge warna dan istilah resmi SEA (Keranjang Kuning ID, Beg Kuning MY, Yellow Basket SG) yang sudah terbukti menaikkan CTR hingga 3x lipat.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={150}>
          <div className="text-center bg-white border border-slate-200 p-10 rounded-3xl space-y-4 shadow-xs">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Siap Membangun Mesin Penghasilan Kreator Anda?
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto">
              Daftar dalam 10 detik dengan Google Connect. Mulai gratis selamanya dengan 0% komisi chat commerce.
            </p>
            <div className="pt-2">
              <Link
                href="/onboarding"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition shadow-sm inline-flex items-center gap-2"
              >
                <span>Mulai Etalase Kreator Gratis</span>
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
