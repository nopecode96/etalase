import Link from "next/link";
import { ShowcaseCarousel } from "@/components/home/ShowcaseCarousel";
import { ArrowRight, ShoppingBag, Zap, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              E
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              etalase<span className="text-blue-600">.online</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/creator" className="hover:text-blue-600 transition">
              Kreator & Affiliate
            </Link>
            <Link href="/sales" className="hover:text-blue-600 transition">
              Sales Mobil & Properti
            </Link>
            <Link href="/umkm" className="hover:text-blue-600 transition">
              UMKM & Bisnis Lokal
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/onboarding"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-sm shadow-blue-500/20"
            >
              Mulai Gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/60 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Platform Bio Link & Etalase Visual No. 1 Asia Tenggara</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          Satu Link Bio untuk Jualan Produk Digital, Keranjang Kuning & Order Chat.
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Tinggalkan bio link biasa. Gabungkan checkout otomatis QRIS/PayPal, tautan afiliasi marketplace SEA, dan draf pesanan chat langsung tanpa potongan komisi.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3.5 rounded-2xl shadow-lg transition text-base"
          >
            <span>Buka Etalase Kamu Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-xs text-slate-400 mt-4">
          ✓ 1-Klik Daftar via Google Connect &bull; Tanpa Password &bull; Gratis Selamanya
        </p>
      </section>

      {/* Interactive Template Showcase */}
      <section className="bg-slate-50 border-y border-slate-200/60 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Pilih Karakter Visual Etalase Anda
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Setiap template dirancang dengan kontras tajam, layout mobile-first, dan kecepatan instan.
          </p>
        </div>
        <ShowcaseCarousel />
      </section>

      {/* 3 Checkout Modes Breakdown */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
            3 Gaya Jualan dalam 1 Toko Sekaligus
          </h2>
          <p className="text-slate-600">
            Kreator dan penjual bebas mencampur metode transaksi sesuai produk yang dijual:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mode 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Transaksi Langsung (Instant Checkout)
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Pembayaran otomatis via Borderpay QRIS (ID & ASEAN Cross-Border) atau PayPal Global. Pengiriman struk & link produk otomatis ke WhatsApp via n8n.
            </p>
            <div className="mt-auto text-xs font-semibold text-blue-600">
              Cocok untuk: Produk Digital, E-book, Preset, Tiket Webinar
            </div>
          </div>

          {/* Mode 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Keranjang Kuning & Marketplace SEA
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Preset ikon & label akrab regional: Keranjang Kuning (TikTok), Toko Orange (Shopee), App Biru (Lazada), & Toko Hijau (Tokopedia khusus ID).
            </p>
            <div className="mt-auto text-xs font-semibold text-amber-600">
              Cocok untuk: Content Creator, Reviewer Produk, Affiliator
            </div>
          </div>

          {/* Mode 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Order via Chat SEA (0% Komisi)
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Draf pesan otomatis langsung ke aplikasi chat favorit pembeli: WhatsApp (ID/MY/SG), LINE (TH), Zalo (VN), atau Messenger (PH).
            </p>
            <div className="mt-auto text-xs font-semibold text-emerald-600">
              Cocok untuk: Sales Mobil, Properti, Jasa, Menu Cafe/Resto
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-900 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              E
            </div>
            <span className="font-bold text-white text-base">
              etalase.online
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/creator" className="hover:text-white transition">Kreator</Link>
            <Link href="/sales" className="hover:text-white transition">Sales</Link>
            <Link href="/umkm" className="hover:text-white transition">UMKM</Link>
            <Link href="/onboarding" className="hover:text-white transition">Mulai</Link>
          </div>

          <div className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} etalase.online. Southeast Asia Ready.
          </div>
        </div>
      </footer>
    </div>
  );
}
