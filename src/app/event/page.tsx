import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Ticket, Video, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Penjualan Tiket Event & Webinar — etalase.online",
  description: "Kelola registrasi tiket webinar Zoom dan event offline. Kirim link meeting dan barcode tiket instan via WhatsApp.",
};

export default function EventPage() {
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
            Buat Event Sekarang
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            Fitur #2 • Event &amp; Webinar Ticketing
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Jual Tiket Webinar &amp; Acara Offline Tanpa Ribet.
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Dari kelas online hingga gathering komunitas. Konfirmasi pembayaran otomatis, simpan data peserta, dan kirim pengingat jadwal via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <Ticket className="w-8 h-8 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Tiket Digital Berkode Unik</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Setiap peserta menerima kode order unik yang bisa diverifikasi saat check-in di lokasi acara offline.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <Video className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Integrasi Zoom / Google Meet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tautan ruang meeting otomatis dikirimkan ke WhatsApp peserta begitu QRIS lunas, mencegah kebocoran link ke non-peserta.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <Calendar className="w-8 h-8 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Pengingat Jadwal Otomatis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Workflow n8n otomatis mengingatkan peserta H-1 dan 1 jam sebelum event dimulai agar kehadiran maksimal.
            </p>
          </div>
        </div>

        <div className="text-center py-8">
          <Link
            href="/onboarding"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-sm transition shadow-lg shadow-blue-500/25 inline-flex items-center gap-2"
          >
            <span>Buka Penjualan Tiket Event Anda</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
