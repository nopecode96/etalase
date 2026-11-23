import React from "react";
import Link from "next/link";
import { Check, X, ArrowRight, Zap, Shield, Sparkles, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Paket & Harga — etalase.online",
  description: "Bandingkan paket Gratis vs Pro vs Terima Beres. 0% komisi order chat, biaya terendah se-Asia Tenggara.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              E
            </div>
            <span className="font-bold text-lg text-white">
              etalase<span className="text-blue-500">.online</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/onboarding"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="pt-16 pb-12 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Biaya Transaksi Terendah &amp; Paling Transparan di SEA</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Pilih Paket yang Sesuai dengan Skala Bisnis Anda.
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
          Mulai gratis selamanya. Upgrade ke Pro saat Anda ingin custom domain dan automasi penuh tanpa watermark.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* FREE PLAN */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">FREE</h3>
              <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full">
                Gratis Selamanya
              </span>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-black text-white">Rp 0</span>
              <span className="text-xs text-slate-400"> / bulan</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Solusi ideal untuk kreator pemula, affiliator, dan penjual yang baru mulai membangun etalase bio link.
            </p>
            <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subdomain <code>[namamu].etalase.online</code></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3 Template Dasar (Clean Minimal, Classic Dark, Catalog Grid)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>0% Komisi</strong> Order via Chat WhatsApp/LINE/Zalo</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Checkout Otomatis Borderpay QRIS &amp; PayPal</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Preset Marketplace SEA (Keranjang Kuning/Shopee)</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <X className="w-4 h-4 text-slate-600 shrink-0" />
                <span>Custom Domain Pribadi</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <X className="w-4 h-4 text-slate-600 shrink-0" />
                <span>Hapus Watermark etalase.online</span>
              </li>
            </ul>
          </div>
          <Link
            href="/onboarding"
            className="w-full mt-8 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs text-center transition"
          >
            Mulai Gratis Sekarang
          </Link>
        </div>

        {/* PRO PLAN */}
        <div className="bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border-2 border-blue-500 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl shadow-blue-500/10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
            Paling Populer
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">PRO</h3>
              <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/30">
                Kreator &amp; Bisnis
              </span>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-black text-white">Rp 79.000</span>
              <span className="text-xs text-slate-400"> / bulan (atau $6/bln)</span>
            </div>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Untuk kreator profesional, coach, dan brand yang ingin white-label, domain sendiri, dan automasi penjualan penuh.
            </p>
            <ul className="space-y-3 text-xs text-slate-200 border-t border-slate-800 pt-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Custom Domain Pribadi</strong> (<code>namabrand.com</code>)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Hapus Watermark</strong> (100% White-Label)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Semua 11 Template Premium</strong> + Custom CSS &amp; Font</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>WhatsApp Cart Recovery Otomatis</strong> (Follow-up 30 menit n8n)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modul E-Learning Video &amp; Booking 1-on-1 Konsultasi</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Meta Pixel, TikTok Pixel &amp; Google Analytics Terintegrasi</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Termasuk Akses Bundling Ekosistem <code>asistencuan.shop</code></span>
              </li>
            </ul>
          </div>
          <Link
            href="/onboarding"
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs text-center transition shadow-lg shadow-blue-600/30"
          >
            Pilih Paket Pro
          </Link>
        </div>

        {/* DFY BUSINESS */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">TERIMA BERES (DFY)</h3>
              <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30">
                Full Service
              </span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-black text-white">Rp 750rb – 1,5jt</span>
              <span className="text-xs text-slate-400"> / tahun</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Khusus pemilik bisnis lokal, F&amp;B cafe, showroom, dan sales yang tidak ingin repot setup manual. Tim kami siapkan semuanya!
            </p>
            <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Semua Fitur Paket Pro Termasuk</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Setup Lengkap Desain Banner, Foto Produk &amp; Bio oleh Desainer</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pengaturan Custom Domain + DNS Handled 100%</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kit Pemasaran Fisik Siap Cetak (A5 Tent Card Kasir &amp; Story Poster)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated Priority WhatsApp Support</span>
              </li>
            </ul>
          </div>
          <Link
            href="/sales"
            className="w-full mt-8 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs text-center transition"
          >
            Konsultasi Paket DFY
          </Link>
        </div>
      </section>

      {/* Comparison vs Lynk.id Table */}
      <section className="bg-slate-900 border-y border-slate-800 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Mengapa etalase.online Lebih Unggul dari Lynk.id?
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Bandingkan fitur dan efisiensi biaya secara langsung:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
              <thead className="bg-slate-800/80 text-slate-200">
                <tr>
                  <th className="p-4 font-bold">Fitur &amp; Kemampuan</th>
                  <th className="p-4 font-bold text-blue-400">etalase.online</th>
                  <th className="p-4 font-bold text-slate-400">Lynk.id</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900">
                <tr>
                  <td className="p-4 font-medium text-slate-300">Komisi Order via Chat WhatsApp/LINE</td>
                  <td className="p-4 font-bold text-emerald-400">0% Komisi Selamanya</td>
                  <td className="p-4 text-slate-400">Tidak ada fitur chat-first order</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-300">Biaya Paket Pro Bulanan</td>
                  <td className="p-4 font-bold text-emerald-400">Rp 79.000 / bln</td>
                  <td className="p-4 text-slate-400">Rp 99.000 – Rp 100.000 / bln</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-300">Pilihan Arketipe Template</td>
                  <td className="p-4 font-bold text-white">11 Template Khusus Industri (F&amp;B, Sales Mobil, Skincare, Tech)</td>
                  <td className="p-4 text-slate-400">Template standar bio link</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-300">Ekosistem Regional Asia Tenggara</td>
                  <td className="p-4 font-bold text-white">Zalo (VN), LINE (TH), WeChat, Beg Kuning (MY), Toko Orange</td>
                  <td className="p-4 text-slate-400">Fokus domestik Indonesia saja</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-300">Offline Marketing Kit (Standee Meja Kasir A5 QR)</td>
                  <td className="p-4 font-bold text-emerald-400">Tersedia Siap Cetak (A5 &amp; Story 9:16)</td>
                  <td className="p-4 text-slate-400">Hanya QR code standar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h2>
        <div className="space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <h4 className="font-bold text-white text-sm mb-1">
              Apakah paket gratis benar-benar gratis selamanya?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ya, 100% gratis tanpa batasan waktu. Anda bisa menjual produk digital, menghubungkan link marketplace, dan menerima pesanan chat tanpa dipungut biaya langganan bulanan.
            </p>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <h4 className="font-bold text-white text-sm mb-1">
              Bagaimana cara kerja pembayaran otomatis QRIS?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pembayaran QRIS diproses secara instan melalui gateway resmi Borderpay. Begitu pembeli scan dan bayar, dana langsung tercatat di saldo wallet etalase Anda, dan struk otomatis dikirim via WhatsApp pembeli.
            </p>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <h4 className="font-bold text-white text-sm mb-1">
              Bisakah saya menggunakan domain sendiri seperti nama saya.com?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bisa! Pada paket PRO dan TERIMA BERES (DFY), Anda bisa menghubungkan domain kustom sendiri tanpa watermark etalase.online.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
