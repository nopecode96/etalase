import React from "react";
import Link from "next/link";
import { Users, Percent, TrendingUp, ArrowRight } from "lucide-react";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Program Afiliasi Kreator — etalase.online",
  description: "Rekrut pasukan affiliator untuk menjualkan produk digital Anda atau promosikan produk kreator lain untuk komisi otomatis.",
};

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-slate-800 flex flex-col">
      <MarketingNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-purple-800 uppercase tracking-widest bg-purple-50 border border-purple-200 px-3.5 py-1.5 rounded-full">
              Fitur #4 • Affiliate Growth
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Lipatgandakan Penjualan dengan Pasukan Afiliasi Kreator.
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Biarkan kreator dan audiens Anda membagikan link produk Anda ke jejaring sosial mereka. Sistem mencatat referral secara transparan dan menghitung komisi secara akurat.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal direction="up" delay={100}>
            <div className="h-full bg-white border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Rekrut Affiliator Mudah</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buat link pendaftaran affiliator instan. Siapapun bisa mendaftar dan mendapatkan link referensi unik dalam 10 detik.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="h-full bg-white border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Atur Persentase Bebas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tentukan komisi (misal 20%, 30%, 50%) per item produk. Komisi otomatis dihitung setiap ada transaksi yang berhasil.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="h-full bg-white border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Tracking Real-Time</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dashboard khusus bagi affiliator untuk melihat jumlah klik, pembeli, dan total komisi yang siap dicairkan ke rekening.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={150}>
          <div className="text-center py-6">
            <Link
              href="/onboarding"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl text-sm transition shadow-sm inline-flex items-center gap-2"
            >
              <span>Aktifkan Program Afiliasi Anda</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </main>

      <MarketingFooter />
    </div>
  );
}
