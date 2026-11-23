import React from "react";
import Link from "next/link";
import { ShieldCheck, MessageCircle } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="mt-auto bg-white border-t border-[#E2ECEA] py-16 px-4 sm:px-6 lg:px-8 text-xs text-[#526664]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
        {/* Col 1 & 2: Brand & Positioning */}
        <div className="col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0F766E] flex items-center justify-center text-white font-black text-lg shadow-xs">
              E
            </div>
            <span className="font-bold text-xl text-[#111C1B] tracking-tight">
              etalase<span className="text-[#0F766E]">.online</span>
            </span>
          </Link>
          <p className="text-[#526664] text-xs leading-relaxed max-w-sm">
            Bio Link &amp; Etalase Jualan Terlengkap untuk kreator, seller, dan brand lokal di Asia Tenggara.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
            <span className="inline-flex items-center gap-1.5 bg-[#F4F8F7] border border-[#E2ECEA] px-3 py-1.5 rounded-lg text-[#111C1B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
              Pembayaran QRIS Instan
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#F4F8F7] border border-[#E2ECEA] px-3 py-1.5 rounded-lg text-[#111C1B]">
              <MessageCircle className="w-3.5 h-3.5 text-[#0F766E]" />
              Kirim File &amp; Struk Otomatis ke WhatsApp
            </span>
          </div>
        </div>

        {/* Col 3: Fitur Utama */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#111C1B] text-xs uppercase tracking-wider">Fitur Utama</h4>
          <ul className="space-y-2.5">
            <li><Link href="/digital-product" className="hover:text-[#111C1B] transition">Produk Digital &amp; Auto-WA</Link></li>
            <li><Link href="/sales" className="hover:text-[#111C1B] transition">Katalog Fisik &amp; Showroom</Link></li>
            <li><Link href="/affiliate" className="hover:text-[#111C1B] transition">Affiliate Keranjang Kuning</Link></li>
            <li><Link href="/event" className="hover:text-[#111C1B] transition">Event, Webinar &amp; Booking</Link></li>
            <li><Link href="/templates" className="hover:text-[#111C1B] transition">Pilihan Template Desain</Link></li>
          </ul>
        </div>

        {/* Col 4: Solusi Industri */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#111C1B] text-xs uppercase tracking-wider">Solusi Industri</h4>
          <ul className="space-y-2.5">
            <li><Link href="/creator" className="hover:text-[#111C1B] transition">Content Creator</Link></li>
            <li><Link href="/sales" className="hover:text-[#111C1B] transition">Sales Mobil &amp; Properti</Link></li>
            <li><Link href="/umkm" className="hover:text-[#111C1B] transition">UMKM, Resto &amp; Kafe</Link></li>
            <li><Link href="/templates" className="hover:text-[#111C1B] transition">Galeri Showcase</Link></li>
          </ul>
        </div>

        {/* Col 5: Bantuan & Platform */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#111C1B] text-xs uppercase tracking-wider">Bantuan &amp; Alat</h4>
          <ul className="space-y-2.5">
            <li><Link href="/pricing" className="hover:text-[#111C1B] transition">Paket &amp; Harga</Link></li>
            <li><Link href="/tools" className="hover:text-[#111C1B] transition">Kalkulator Penghematan</Link></li>
            <li><Link href="/tools" className="hover:text-[#111C1B] transition">WhatsApp Link Generator</Link></li>
            <li><Link href="/pricing" className="hover:text-[#111C1B] transition">Pusat Bantuan &amp; FAQ</Link></li>
          </ul>
        </div>

        {/* Col 6: Regional SEA */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#111C1B] text-xs uppercase tracking-wider">Regional SEA</h4>
          <div className="space-y-2 text-[11px] text-[#526664]">
            <div>🇮🇩 Indonesia (QRIS Instan)</div>
            <div>🇲🇾 Malaysia (Beg Kuning &amp; DuitNow)</div>
            <div>🇸🇬 Singapore (PayNow &amp; SGD)</div>
            <div>🇹🇭 Thailand (PromptPay &amp; LINE)</div>
            <div>🇻🇳 Vietnam (Zalo &amp; MoMo)</div>
            <div>🇵🇭 Philippines (GCash &amp; Maya)</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#E2ECEA] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#526664]">
        <div>&copy; {new Date().getFullYear()} etalase.online. Hak Cipta Dilindungi di Seluruh Asia Tenggara.</div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[#111C1B] font-bold">ID</span>
            <span className="text-[#E2ECEA]">|</span>
            <span className="hover:text-[#111C1B] cursor-pointer">EN</span>
            <span className="text-[#E2ECEA]">|</span>
            <span className="hover:text-[#111C1B] cursor-pointer">MS</span>
            <span className="text-[#E2ECEA]">|</span>
            <span className="hover:text-[#111C1B] cursor-pointer">TH</span>
            <span className="text-[#E2ECEA]">|</span>
            <span className="hover:text-[#111C1B] cursor-pointer">VI</span>
          </div>
          <Link href="/pricing" className="hover:text-[#111C1B] transition">Kebijakan Privasi</Link>
          <Link href="/pricing" className="hover:text-[#111C1B] transition">Ketentuan Layanan</Link>
          <Link href="/pricing" className="hover:text-[#111C1B] transition">Bantuan &amp; FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
