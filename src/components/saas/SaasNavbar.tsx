import Link from "next/link";
import { MessageCircle, Lock, Menu } from "lucide-react";

export default function SaasNavbar() {
  const waSalesMessage = encodeURIComponent(
    "Halo Tim etalase.online! Saya ingin konsultasi pembuatan website portofolio."
  );
  const waSalesLink = `https://wa.me/62895389974414?text=${waSalesMessage}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
            etalase<span className="text-blue-500">.online</span>
          </span>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#showcase" className="hover:text-white transition-colors">
            Contoh Website
          </a>
          <a href="#cara-kerja" className="hover:text-white transition-colors">
            Cara Pesan
          </a>
          <a href="#harga" className="hover:text-white transition-colors">
            Harga Paket
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition-colors"
          >
            <Lock size={15} />
            <span>Login Klien</span>
          </Link>

          <a
            href={waSalesLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20"
          >
            <MessageCircle size={16} className="fill-current" />
            <span className="hidden xs:inline">Konsultasi</span> WA
          </a>
        </div>
      </div>
    </header>
  );
}
