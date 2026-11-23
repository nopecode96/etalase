import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Video, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Booking Sesi Konsultasi 1-on-1 — etalase.online",
  description: "Monetisasi keahlian Anda dengan booking sesi konsultasi, audit bisnis, atau mentoring 1-on-1 via Google Meet.",
};

export default function ConsultationPage() {
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
            Buka Layanan Konsultasi
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16 flex-1 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Fitur #3 • 1-on-1 Consultation Booking
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ubah Pengalaman Anda Jadi Penghasilan Konsultasi 1-on-1.
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Klien memilih slot waktu yang tersedia, mengisi topik yang ingin dibahas, dan membayar via QRIS. Anda tinggal masuk ke ruang Google Meet saat jamnya tiba.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <Clock className="w-8 h-8 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Atur Durasi &amp; Tarif Bebas</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tentukan durasi sesi (misal 30, 45, atau 60 menit) dan pasang harga jasa profesional Anda sendiri.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Slot Waktu Fleksibel</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Klien hanya bisa memilih jam yang Anda aktifkan, mencegah bentrok jadwal atau panggilan tiba-tiba.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <Video className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Google Meet Otomatis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detail link video call dan topik klien terkirim rapi ke WhatsApp Anda dan klien sebelum sesi dimulai.
            </p>
          </div>
        </div>

        <div className="text-center py-8">
          <Link
            href="/onboarding"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl text-sm transition shadow-lg shadow-blue-500/25 inline-flex items-center gap-2"
          >
            <span>Mulai Jadwalkan Sesi Konsultasi Anda</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
