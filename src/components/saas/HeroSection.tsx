import Link from "next/link";
import { MessageCircle, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Globe } from "lucide-react";

export default function HeroSection() {
  const waSalesMessage = encodeURIComponent(
    "Halo Tim etalase.online! 👋 Saya tertarik untuk membuat website bisnis/portofolio sales berdomain sendiri. Boleh info konsultasi lengkapnya?"
  );
  const waSalesLink = `https://wa.me/6281234567890?text=${waSalesMessage}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Badge Banner */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
          <Sparkles size={16} className="text-yellow-400" />
          <span>Solusi Website Portofolio & Mesin Prospek Sales Modern</span>
        </div>

        {/* Headline Utama */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto mb-6">
          Bikin Website Bisnis & Portofolio Sales Tanpa Ribet.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-yellow-300">
            Terima Beres, Langsung Siap Jualan.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Tinggalkan kartu nama kertas dan brosur yang sering hilang. Miliki website resmi berdomain sendiri,
          mudah ditemukan pembeli di Google kota Anda, dan terhubung langsung ke WhatsApp.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href={waSalesLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-2xl text-base sm:text-lg transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
          >
            <MessageCircle size={22} className="fill-current" />
            <span>Konsultasi &amp; Buat Web via WhatsApp</span>
          </a>

          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold px-8 py-4 rounded-2xl text-base sm:text-lg transition-all backdrop-blur-sm hover:text-white"
          >
            <span>Lihat Contoh Website</span>
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Trust Elements / Badges */}
        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">100% Siap Pakai</p>
              <p className="text-xs text-slate-400">Dibantu input materi &amp; disetting sampai live</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Tanpa Ribet Teknis</p>
              <p className="text-xs text-slate-400">Nol koding, tinggal kirim foto &amp; harga via chat</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Globe size={24} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Domain Sendiri</p>
              <p className="text-xs text-slate-400">Nama bisnis resmi .com atau .id pilihan Anda</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
