import Link from "next/link";
import { ArrowLeft, Store, QrCode, MapPin } from "lucide-react";

export default function UmkmPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-100 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke etalase.online</span>
          </Link>
          <Link
            href="/onboarding"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
          >
            Buka Toko UMKM
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 flex-1">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
          <Store className="w-3.5 h-3.5" />
          <span>Untuk Cafe, Resto, Toko Fisik & Usaha Jasa</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Menu Digital & Standee Meja Kasir yang Terhubung ke Google Maps Review.
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed mb-10">
          Gantikan daftar menu kertas yang lusuh dengan katalog visual modern di meja kasir. Pelanggan cukup scan QR untuk lihat menu, pesan via WhatsApp, atau beri review bintang 5 di Google Maps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-blue-600" />
              Generator Standee Meja Kasir
            </h3>
            <p className="text-sm text-slate-600">
              Auto-generate file siap cetak ukuran tent card meja kasir: QR Visit Katalog Menu + QR ajakan review Google Maps bisnis lokal Anda.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-600" />
              Navigasi Google Maps 1-Klik
            </h3>
            <p className="text-sm text-slate-600">
              Tombol penunjuk arah langsung membuka Google Maps rute tercepat ke outlet fisik Anda.
            </p>
          </div>
        </div>

        <div className="text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Digitalisasikan Usaha Lokal Anda Sekarang
          </h2>
          <p className="text-slate-600 text-sm mb-6">
            Gratis selamanya, tanpa batasan jumlah pesanan, dan 0% potongan komisi pesanan chat.
          </p>
          <Link
            href="/onboarding"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-2xl transition"
          >
            Buka Menu UMKM Gratis
          </Link>
        </div>
      </main>
    </div>
  );
}
