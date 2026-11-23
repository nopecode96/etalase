import React from "react";
import Link from "next/link";
import { MessageCircle, Mail, ShieldCheck, Zap } from "lucide-react";

export function GlobalFooter() {
  return (
    <footer className="mt-auto bg-white border-t border-[#E7E5E4] py-16 px-4 sm:px-6 lg:px-8 text-xs text-[#57534E]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Kolom 1 (Brand & Kontak) */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D94E28] flex items-center justify-center text-white font-black text-base shadow-xs">
              E
            </div>
            <span className="font-bold text-lg text-[#1C1917] tracking-tight">
              etalase<span className="text-[#D94E28]">.online</span>
            </span>
          </Link>
          <p className="text-[#57534E] text-xs leading-relaxed">
            Satu website etalase untuk semua jualan Anda di Asia Tenggara. Bio link visual, katalog instan, dan checkout chat tanpa potongan komisi.
          </p>

          <div className="pt-2 space-y-2 text-xs">
            <a
              href="https://wa.me/6281288003005"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#57534E] hover:text-[#D94E28] transition"
            >
              <MessageCircle className="w-4 h-4 text-[#D94E28] shrink-0" />
              <span>WhatsApp: +62 812-8800-3005</span>
            </a>
            <a
              href="mailto:halo@etalase.online"
              className="flex items-center gap-2 text-[#57534E] hover:text-[#D94E28] transition"
            >
              <Mail className="w-4 h-4 text-[#D94E28] shrink-0" />
              <span>Email: halo@etalase.online</span>
            </a>
          </div>

          <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] px-2.5 py-1 rounded-lg text-[#1C1917]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D94E28]" />
              Pembayaran QRIS Instan
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] px-2.5 py-1 rounded-lg text-[#1C1917]">
              <Zap className="w-3.5 h-3.5 text-[#D94E28]" />
              Kirim File Otomatis ke WA
            </span>
          </div>
        </div>

        {/* Kolom 2 (Jualan) */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">Jualan</h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/fitur#digital" className="hover:text-[#1C1917] transition">
                Produk Digital &amp; E-Book
              </Link>
            </li>
            <li>
              <Link href="/fitur#katalog" className="hover:text-[#1C1917] transition">
                Katalog Fisik &amp; Showroom
              </Link>
            </li>
            <li>
              <Link href="/fitur#affiliate" className="hover:text-[#1C1917] transition">
                Affiliate Keranjang Kuning
              </Link>
            </li>
            <li>
              <Link href="/fitur#chat" className="hover:text-[#1C1917] transition">
                Order Direct by Chat (0% Fee)
              </Link>
            </li>
            <li>
              <Link href="/fitur#event" className="hover:text-[#1C1917] transition">
                Event, Tiket &amp; Booking Jadwal
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3 (Fitur & Tools) */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">Fitur &amp; Tools</h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/fitur" className="hover:text-[#1C1917] transition">
                Kirim File &amp; Struk ke WhatsApp
              </Link>
            </li>
            <li>
              <Link href="/fitur" className="hover:text-[#1C1917] transition">
                QRIS Instan &amp; PayPal
              </Link>
            </li>
            <li>
              <Link href="/harga" className="hover:text-[#1C1917] transition">
                Custom Domain (namabrand.com)
              </Link>
            </li>
            <li>
              <Link href="/template" className="hover:text-[#1C1917] transition">
                4 Arketipe Template Desain
              </Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-[#1C1917] transition">
                Free Tools WhatsApp &amp; QR Code
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 4 (Perusahaan & Bantuan) */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-wider">Perusahaan &amp; Bantuan</h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/bantuan" className="hover:text-[#1C1917] transition">
                Pusat Bantuan &amp; Panduan
              </Link>
            </li>
            <li>
              <Link href="/kontak" className="hover:text-[#1C1917] transition">
                Hubungi Kami &amp; Layanan DFY
              </Link>
            </li>
            <li>
              <Link href="/harga" className="hover:text-[#1C1917] transition">
                Biaya &amp; Paket Berlangganan
              </Link>
            </li>
            <li>
              <Link href="/bantuan" className="hover:text-[#1C1917] transition">
                Syarat &amp; Ketentuan Layanan
              </Link>
            </li>
            <li>
              <Link href="/bantuan" className="hover:text-[#1C1917] transition">
                Kebijakan Privasi
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#57534E]">
        <div>
          &copy; {new Date().getFullYear()} etalase.online. Hak Cipta Dilindungi di Seluruh Asia Tenggara.
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[#1C1917] font-bold">ID</span>
            <span className="text-[#E7E5E4]">|</span>
            <span className="hover:text-[#1C1917] cursor-pointer">EN</span>
            <span className="text-[#E7E5E4]">|</span>
            <span className="hover:text-[#1C1917] cursor-pointer">MS</span>
            <span className="text-[#E7E5E4]">|</span>
            <span className="hover:text-[#1C1917] cursor-pointer">TH</span>
            <span className="text-[#E7E5E4]">|</span>
            <span className="hover:text-[#1C1917] cursor-pointer">VI</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Semua Sistem Normal
          </span>
        </div>
      </div>
    </footer>
  );
}
