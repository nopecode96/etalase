import React from "react";
import Link from "next/link";
import { Check, X, ArrowRight, Zap, Shield, Sparkles, HelpCircle } from "lucide-react";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Paket & Harga — etalase.online",
  description: "Bandingkan paket Gratis vs Pro vs Terima Beres. 0% komisi order chat, biaya terendah se-Asia Tenggara.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-slate-800 flex flex-col">
      <MarketingNavbar />

      {/* Hero Header */}
      <section className="pt-16 pb-12 px-4 text-center max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Biaya Transaksi Terendah &amp; Paling Transparan di SEA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Pilih Paket yang Sesuai dengan Kebutuhan Anda.
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Mulai gratis selamanya. Upgrade ke Pro saat Anda ingin custom domain pribadi dan automasi WhatsApp penuh tanpa watermark.
          </p>
        </ScrollReveal>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* FREE PLAN */}
        <ScrollReveal direction="up" delay={100}>
          <div className="h-full bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">GRATIS</h3>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                  Selamanya
                </span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-black text-slate-900">Rp 0</span>
                <span className="text-xs text-slate-500"> / bulan</span>
              </div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Solusi ideal untuk kreator pemula, affiliator, dan penjual yang baru mulai membangun etalase bio link.
              </p>
              <ul className="space-y-3 text-xs text-slate-700 border-t border-slate-100 pt-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Subdomain <code>[namamu].etalase.online</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3 Template Dasar (Clean Minimal, Classic Dark, Catalog Grid)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>0% Komisi</strong> Order via Chat WhatsApp/LINE/Zalo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Checkout Otomatis Borderpay QRIS &amp; PayPal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Preset Marketplace SEA (Keranjang Kuning/Shopee)</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <X className="w-4 h-4 text-slate-300 shrink-0" />
                  <span>Custom Domain Pribadi</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <X className="w-4 h-4 text-slate-300 shrink-0" />
                  <span>Hapus Watermark etalase.online</span>
                </li>
              </ul>
            </div>
            <Link
              href="/onboarding"
              className="w-full mt-8 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl text-xs text-center transition"
            >
              Mulai Gratis
            </Link>
          </div>
        </ScrollReveal>

        {/* PRO PLAN */}
        <ScrollReveal direction="up" delay={200}>
          <div className="h-full bg-white border-2 border-blue-600 rounded-3xl p-8 flex flex-col justify-between shadow-xl shadow-blue-500/10 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
              Paling Populer
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">PRO CREATOR</h3>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
                  White Label
                </span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-black text-slate-900">Rp 79.000</span>
                <span className="text-xs text-slate-500"> / bulan (atau $6/bln)</span>
              </div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Untuk kreator profesional, coach, dan brand yang ingin white-label, domain sendiri, dan automasi penjualan penuh.
              </p>
              <ul className="space-y-3 text-xs text-slate-700 border-t border-slate-100 pt-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Custom Domain Pribadi</strong> (<code>namabrand.com</code>)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Hapus Watermark</strong> (100% White-Label)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Semua 11 Template Premium</strong> + Custom CSS &amp; Font</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>WhatsApp Cart Recovery Otomatis</strong> (Follow-up 30 menit n8n)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Modul E-Learning Video &amp; Booking 1-on-1 Konsultasi</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Meta Pixel, TikTok Pixel &amp; Google Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Termasuk Akses Bundling Ekosistem <code>asistencuan.shop</code></span>
                </li>
              </ul>
            </div>
            <Link
              href="/onboarding"
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs text-center transition shadow-md shadow-blue-500/20"
            >
              Pilih Paket Pro
            </Link>
          </div>
        </ScrollReveal>

        {/* DFY BUSINESS */}
        <ScrollReveal direction="up" delay={300}>
          <div className="h-full bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">TERIMA BERES (DFY)</h3>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
                  Full Service
                </span>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-black text-slate-900">Rp 750rb – 1,5jt</span>
                <span className="text-xs text-slate-500"> / tahun</span>
              </div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Khusus pemilik bisnis lokal, F&amp;B cafe, showroom, dan sales yang tidak ingin repot setup manual. Tim kami siapkan semuanya!
              </p>
              <ul className="space-y-3 text-xs text-slate-700 border-t border-slate-100 pt-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Semua Fitur Paket Pro Termasuk</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Setup Desain Banner, Foto Produk &amp; Bio oleh Desainer</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pengaturan Custom Domain + DNS Handled 100%</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kit Pemasaran Fisik Siap Cetak (A5 Tent Card Kasir &amp; Poster)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated Priority WhatsApp Support</span>
                </li>
              </ul>
            </div>
            <Link
              href="/sales"
              className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs text-center transition"
            >
              Konsultasi Paket DFY
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Comparison vs Lynk.id Table */}
      <section className="bg-white border-y border-slate-200/80 py-20 px-4 sm:px-6">
        <ScrollReveal direction="up" delay={100}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Komparasi Transparan
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3">
                Mengapa etalase.online Lebih Menguntungkan dari Lynk.id?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Bandingkan efisiensi biaya dan keunggulan fitur secara langsung:
              </p>
            </div>

            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="p-4 font-bold">Fitur &amp; Kemampuan</th>
                    <th className="p-4 font-bold text-blue-600">etalase.online</th>
                    <th className="p-4 font-bold text-slate-400">Lynk.id</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-800">Komisi Order via Chat WhatsApp/LINE</td>
                    <td className="p-4 font-bold text-emerald-600">0% Komisi Selamanya</td>
                    <td className="p-4 text-slate-400">Tidak ada fitur chat-first order</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-800">Biaya Paket Pro Bulanan</td>
                    <td className="p-4 font-bold text-emerald-600">Rp 79.000 / bln</td>
                    <td className="p-4 text-slate-400">Rp 99.000 – Rp 100.000 / bln</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-800">Pilihan Arketipe Template</td>
                    <td className="p-4 font-bold text-slate-900">11 Template Khusus Industri (F&amp;B, Sales Mobil, Skincare, Tech)</td>
                    <td className="p-4 text-slate-400">Template standar bio link</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-800">Ekosistem Regional Asia Tenggara</td>
                    <td className="p-4 font-bold text-slate-900">Zalo (VN), LINE (TH), WeChat, Beg Kuning (MY), Shopee</td>
                    <td className="p-4 text-slate-400">Fokus domestik Indonesia saja</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-800">Offline Marketing Kit (Standee Meja Kasir A5 QR)</td>
                    <td className="p-4 font-bold text-emerald-600">Tersedia Siap Cetak (A5 &amp; Story 9:16)</td>
                    <td className="p-4 text-slate-400">Hanya QR code standar</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-20 space-y-6">
        <ScrollReveal direction="up" delay={100}>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center mb-8">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </ScrollReveal>
        <div className="space-y-4">
          <ScrollReveal direction="up" delay={150}>
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">
                Apakah paket gratis benar-benar gratis selamanya?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ya, 100% gratis tanpa batasan waktu. Anda bisa menjual produk digital, menghubungkan link marketplace, dan menerima pesanan chat tanpa dipungut biaya langganan bulanan.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">
                Bagaimana cara kerja pembayaran otomatis QRIS?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pembayaran QRIS diproses secara instan melalui gateway resmi Borderpay. Begitu pembeli scan dan bayar, dana langsung tercatat di saldo wallet etalase Anda, dan struk otomatis dikirim via WhatsApp pembeli.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={250}>
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">
                Bisakah saya menggunakan domain sendiri seperti nama saya.com?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bisa! Pada paket PRO dan TERIMA BERES (DFY), Anda bisa menghubungkan domain kustom sendiri tanpa watermark etalase.online.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
