import React from "react";
import Link from "next/link";
import { ShieldCheck, MessageCircle } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="mt-auto bg-slate-950 border-t border-slate-900 py-14 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
        {/* Col 1 & 2: Brand */}
        <div className="col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-blue-500/30">
              E
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">
              etalase<span className="text-blue-500">.online</span>
            </span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            All-in-One Bio Link, Visual Storefront &amp; Chat-First Commerce Platform untuk kreator dan bisnis di Asia Tenggara.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Borderpay QRIS Cross-Border
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              Auto WhatsApp Delivery
            </span>
          </div>
        </div>

        {/* Col 3: Fitur Utama */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Fitur Utama</h4>
          <ul className="space-y-2">
            <li><Link href="/digital-product" className="hover:text-white transition">Produk Digital</Link></li>
            <li><Link href="/event" className="hover:text-white transition">Event &amp; Webinar</Link></li>
            <li><Link href="/consultation" className="hover:text-white transition">Konsultasi 1-on-1</Link></li>
            <li><Link href="/affiliate" className="hover:text-white transition">Afiliasi Kreator</Link></li>
            <li><Link href="/templates" className="hover:text-white transition">Galeri 11 Template</Link></li>
          </ul>
        </div>

        {/* Col 4: Solusi Industri */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Solusi Industri</h4>
          <ul className="space-y-2">
            <li><Link href="/creator" className="hover:text-white transition">Content Creator</Link></li>
            <li><Link href="/sales" className="hover:text-white transition">Sales Mobil &amp; Properti</Link></li>
            <li><Link href="/umkm" className="hover:text-white transition">UMKM &amp; Resto Fisik</Link></li>
            <li><Link href="/templates" className="hover:text-white transition">Koleksi Desain</Link></li>
          </ul>
        </div>

        {/* Col 5: Platform & Tools */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Platform &amp; Tools</h4>
          <ul className="space-y-2">
            <li><Link href="/pricing" className="hover:text-white transition">Paket &amp; Harga</Link></li>
            <li><Link href="/tools" className="hover:text-white transition">Kalkulator Penghematan</Link></li>
            <li><Link href="/tools" className="hover:text-white transition">WhatsApp Link Gen</Link></li>
            <li><Link href="/mabes/login" className="hover:text-white transition">Mabes Admin Internal</Link></li>
          </ul>
        </div>

        {/* Col 6: Regional SEA */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Regional SEA</h4>
          <div className="space-y-1.5 text-[11px] text-slate-400">
            <div>🇮🇩 Indonesia (QRIS Instan)</div>
            <div>🇲🇾 Malaysia (Beg Kuning &amp; DuitNow)</div>
            <div>🇸🇬 Singapore (PayNow &amp; SGD)</div>
            <div>🇹🇭 Thailand (PromptPay &amp; LINE)</div>
            <div>🇻🇳 Vietnam (Zalo &amp; MoMo)</div>
            <div>🇵🇭 Philippines (GCash &amp; Maya)</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>&copy; {new Date().getFullYear()} etalase.online. Hak Cipta Dilindungi di Seluruh Asia Tenggara.</div>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="hover:text-slate-400">Kebijakan Privasi</Link>
          <Link href="/pricing" className="hover:text-slate-400">Ketentuan Layanan</Link>
          <Link href="/pricing" className="hover:text-slate-400">Bantuan &amp; FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
