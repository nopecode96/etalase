import React from "react";
import Link from "next/link";
import { ShieldCheck, MessageCircle } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="mt-auto bg-slate-50 border-t border-slate-200 py-16 px-4 sm:px-6 lg:px-8 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
        {/* Col 1 & 2: Brand */}
        <div className="col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-blue-500/20">
              E
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              etalase<span className="text-blue-600">.online</span>
            </span>
          </Link>
          <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
            All-in-One Bio Link, Visual Storefront &amp; Chat-First Commerce Platform untuk kreator, seller, dan brand di Asia Tenggara.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-600">
            <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Borderpay QRIS Cross-Border
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700 shadow-xs">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              Auto WhatsApp Delivery
            </span>
          </div>
        </div>

        {/* Col 3: Fitur Utama */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Fitur Utama</h4>
          <ul className="space-y-2.5">
            <li><Link href="/digital-product" className="hover:text-slate-900 transition">Produk Digital</Link></li>
            <li><Link href="/event" className="hover:text-slate-900 transition">Event &amp; Webinar</Link></li>
            <li><Link href="/consultation" className="hover:text-slate-900 transition">Konsultasi 1-on-1</Link></li>
            <li><Link href="/affiliate" className="hover:text-slate-900 transition">Afiliasi Kreator</Link></li>
            <li><Link href="/templates" className="hover:text-slate-900 transition">Galeri 11 Template</Link></li>
          </ul>
        </div>

        {/* Col 4: Solusi Industri */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Solusi Industri</h4>
          <ul className="space-y-2.5">
            <li><Link href="/creator" className="hover:text-slate-900 transition">Content Creator</Link></li>
            <li><Link href="/sales" className="hover:text-slate-900 transition">Sales Mobil &amp; Properti</Link></li>
            <li><Link href="/umkm" className="hover:text-slate-900 transition">UMKM &amp; Resto Fisik</Link></li>
            <li><Link href="/templates" className="hover:text-slate-900 transition">Koleksi Desain</Link></li>
          </ul>
        </div>

        {/* Col 5: Platform & Tools */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Platform &amp; Tools</h4>
          <ul className="space-y-2.5">
            <li><Link href="/pricing" className="hover:text-slate-900 transition">Paket &amp; Harga</Link></li>
            <li><Link href="/tools" className="hover:text-slate-900 transition">Kalkulator Penghematan</Link></li>
            <li><Link href="/tools" className="hover:text-slate-900 transition">WhatsApp Link Gen</Link></li>
            <li><Link href="/mabes/login" className="hover:text-slate-900 transition">Mabes Admin Internal</Link></li>
          </ul>
        </div>

        {/* Col 6: Regional SEA */}
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Regional SEA</h4>
          <div className="space-y-2 text-[11px] text-slate-600">
            <div>🇮🇩 Indonesia (QRIS Instan)</div>
            <div>🇲🇾 Malaysia (Beg Kuning &amp; DuitNow)</div>
            <div>🇸🇬 Singapore (PayNow &amp; SGD)</div>
            <div>🇹🇭 Thailand (PromptPay &amp; LINE)</div>
            <div>🇻🇳 Vietnam (Zalo &amp; MoMo)</div>
            <div>🇵🇭 Philippines (GCash &amp; Maya)</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>&copy; {new Date().getFullYear()} etalase.online. Hak Cipta Dilindungi di Seluruh Asia Tenggara.</div>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="hover:text-slate-700">Kebijakan Privasi</Link>
          <Link href="/pricing" className="hover:text-slate-700">Ketentuan Layanan</Link>
          <Link href="/pricing" className="hover:text-slate-700">Bantuan &amp; FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
