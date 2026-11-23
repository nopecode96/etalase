import React from "react";
import Link from "next/link";
import { ArrowLeft, Users, Percent, TrendingUp, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Program Afiliasi Kreator — etalase.online",
  description: "Rekrut pasukan affiliator untuk menjualkan produk digital Anda atau promosikan produk kreator lain untuk komisi otomatis.",
};

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke etalase.online</span>
          </Link>
          <Link
            href="/onboarding"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
          >
            Aktifkan Afiliasi
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
            Fitur #4 • Creator Affiliate Network
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Lipat Gandakan Penjualan dengan Pasukan Afiliasi.
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Biarkan audiens dan kreator lain mempromosikan produk digital Anda. Komisi dibagi secara transparan dan otomatis setiap kali ada pesanan lunas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <Percent className="w-8 h-8 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Atur Komisi Fleksibel</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tentukan persentase komisi (misal 10%, 20%, atau 50%) untuk setiap produk digital atau tiket event Anda.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <Users className="w-8 h-8 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Link Referral Unik Tiap Affiliator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Affiliator mendapatkan link khusus <code>[namamu].etalase.online?ref=namaaffiliator</code> dengan cookie pelacakan akurat.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Pencairan Saldo Otomatis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Komisi langsung masuk ke saldo wallet affiliator dan dapat diajukan penarikan ke rekening bank / e-wallet kapan saja.
            </p>
          </div>
        </div>

        <div className="text-center py-8">
          <Link
            href="/onboarding"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-sm transition shadow-lg shadow-blue-500/25 inline-flex items-center gap-2"
          >
            <span>Mulai Program Afiliasi Anda</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
