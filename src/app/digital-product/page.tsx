import React from "react";
import Link from "next/link";
import { ArrowLeft, Zap, ShieldCheck, Download, Smartphone, CheckCircle2 } from "lucide-react";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";

export const metadata = {
  title: "Jual Produk Digital & E-Course — etalase.online",
  description: "Jual e-book, template Canva/Notion, preset, dan kelas video terproteksi. Auto-delivery instan via WhatsApp setelah QRIS lunas.",
};

export default function DigitalProductPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <MarketingNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            Fitur #1 • Digital Storefront
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Jual File Digital &amp; E-Learning dengan Auto-Delivery WhatsApp Instan.
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Tidak perlu kirim link manual via DM atau email yang sering nyangkut di folder spam. Sistem otomatis mengirimkan file unduhan dan link kelas langsung ke WhatsApp pembeli detik itu juga.
          </p>
        </div>

        {/* 3 Step Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Upload File / Masukkan Link</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload e-book PDF, file ZIP preset, template Notion/Canva, atau masukkan link playlist video unlisted YouTube/Drive.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Pembeli Scan QRIS / PayPal</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Checkout 1-langkah super cepat. Mendukung QRIS semua bank &amp; e-wallet Indonesia serta QRIS Cross-Border (MY, SG, TH).
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Auto-Delivery WhatsApp</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              n8n &amp; Fonnte langsung menembakkan struk lunas dan tautan akses eksklusif ke nomor WhatsApp pembeli secara otomatis.
            </p>
          </div>
        </div>

        {/* Comparison Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Perbandingan Pengalaman Pembeli
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
              <span className="font-bold text-rose-400">❌ Platform Lain / Kirim Manual:</span>
              <ul className="space-y-1.5 text-slate-300">
                <li>• Pembeli harus cek email (sering masuk spam/promo).</li>
                <li>• Seller harus cek mutasi bank manual lalu kirim DM satu per satu.</li>
                <li>• Komisi platform tinggi (5% s/d 15%).</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <span className="font-bold text-emerald-400">✅ Di etalase.online:</span>
              <ul className="space-y-1.5 text-slate-200">
                <li>• Notifikasi instan masuk ke WhatsApp pembeli dalam 3 detik.</li>
                <li>• 100% otomatis 24 jam nonstop bahkan saat Anda sedang tidur.</li>
                <li>• Komisi terendah: Borderpay QRIS 0.7%, saldo masuk wallet real-time.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <Link
            href="/onboarding"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-sm transition shadow-lg shadow-blue-500/25 inline-flex items-center gap-2"
          >
            <span>Buka Toko Digital Gratis Sekarang</span>
            <Zap className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
