import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Download, Smartphone, CheckCircle2, ArrowRight } from "lucide-react";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Jual Produk Digital & E-Course — etalase.online",
  description: "Jual e-book, template Canva/Notion, preset, dan kelas video terproteksi. Auto-delivery instan via WhatsApp setelah QRIS lunas.",
};

export default function DigitalProductPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-slate-800 flex flex-col">
      <MarketingNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full">
              Fitur #1 • Digital Storefront
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Jual File Digital &amp; E-Learning dengan Auto-Delivery WhatsApp Instan.
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Tidak perlu kirim link manual via DM atau email yang sering nyangkut di folder spam. Sistem otomatis mengirimkan file unduhan dan link kelas langsung ke WhatsApp pembeli detik itu juga.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Step Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal direction="up" delay={100}>
            <div className="h-full bg-white border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Upload File / Masukkan Link</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload e-book PDF, file ZIP preset, template Notion/Canva, atau masukkan link playlist video unlisted YouTube/Drive.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="h-full bg-white border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Pembeli Scan QRIS / PayPal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Checkout 1-langkah super cepat. Mendukung QRIS semua bank &amp; e-wallet Indonesia serta QRIS Cross-Border (MY, SG, TH).
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="h-full bg-white border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Auto-Delivery WhatsApp</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                n8n &amp; Fonnte langsung menembakkan struk lunas dan tautan akses eksklusif ke nomor WhatsApp pembeli secara otomatis.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Comparison Box */}
        <ScrollReveal direction="up" delay={200}>
          <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xs">
            <h2 className="text-2xl font-bold text-slate-900 text-center">
              Perbandingan Pengalaman Pembeli
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200/80 space-y-2.5">
                <span className="font-bold text-rose-800 text-sm">❌ Platform Lain / Kirim Manual:</span>
                <ul className="space-y-2 text-rose-900">
                  <li>• Pembeli harus cek email (sering masuk spam/promo).</li>
                  <li>• Seller harus cek mutasi bank manual lalu kirim DM satu per satu.</li>
                  <li>• Komisi platform tinggi (5% s/d 15%).</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-2.5">
                <span className="font-bold text-emerald-800 text-sm">✅ Di etalase.online:</span>
                <ul className="space-y-2 text-emerald-900">
                  <li>• Notifikasi instan masuk ke WhatsApp pembeli dalam 3 detik.</li>
                  <li>• 100% otomatis 24 jam nonstop bahkan saat Anda sedang tidur.</li>
                  <li>• Komisi terendah: Borderpay QRIS 0.7%, saldo masuk wallet real-time.</li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={150}>
          <div className="text-center py-6">
            <Link
              href="/onboarding"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl text-sm transition shadow-sm inline-flex items-center gap-2"
            >
              <span>Buka Toko Digital Gratis Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </main>

      <MarketingFooter />
    </div>
  );
}
