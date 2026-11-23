import React from "react";
import Link from "next/link";
import { Calendar, Ticket, Video, CheckCircle2, ArrowRight } from "lucide-react";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Penjualan Tiket Event & Webinar — etalase.online",
  description: "Kelola registrasi tiket webinar Zoom dan event offline. Kirim link meeting dan barcode tiket instan via WhatsApp.",
};

export default function EventPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-slate-800 flex flex-col">
      <MarketingNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full">
              Fitur #2 • Event &amp; Ticketing
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Jual Tiket Webinar &amp; Event Offline Tanpa Potongan Tiket Mahal.
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Mulai dari webinar Google Meet/Zoom, workshop intim, hingga tiket pameran komunitas. Peserta bayar via QRIS dan tiket dikirim langsung ke WhatsApp mereka.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal direction="up" delay={100}>
            <div className="h-full bg-white border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Manajemen Kuota Tiket</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tetapkan kuota tiket Early Bird vs Regular. Saat kuota habis, form registrasi otomatis menutup tanpa overbooked.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="h-full bg-white border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Auto-Link Zoom &amp; GMeet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Integrasi link ruang meeting yang dikirimkan terenkripsi khusus untuk peserta yang status pembayarannya lunas.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="h-full bg-white border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Pengingat Jadwal Otomatis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sistem otomatis mengingatkan peserta H-1 dan 1 jam sebelum event dimulai agar tingkat kehadiran maksimal.
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
              <span>Buka Penjualan Tiket Event Anda</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </main>

      <MarketingFooter />
    </div>
  );
}
