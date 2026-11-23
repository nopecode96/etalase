import Link from "next/link";
import { ArrowLeft, Car, MessageCircle, ShieldCheck } from "lucide-react";

export default function SalesPage() {
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
            Buka Katalog Sales
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 flex-1">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
          <Car className="w-3.5 h-3.5" />
          <span>Untuk Sales Mobil, Motor, Agen Properti & Rental</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Showroom Digital Profesional yang Langsung Closing di Chat WhatsApp.
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed mb-10">
          Ubah kartu nama biasa jadi katalog visual interaktif. Tampilkan unit siap kirim, simulasi promo, foto serah terima pelanggan, dan tombol chat yang sudah berisi draf tipe unit idaman pembeli.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              Order Chat Otomatis (0% Komisi)
            </h3>
            <p className="text-sm text-slate-600">
              Calon pembeli klik &ldquo;Tanya Promo&rdquo; langsung membuka WhatsApp Anda dengan pesan terisi rapi: <em>&ldquo;Halo Pak, saya tertarik promo unit Avanza G CVT di etalase Anda.&rdquo;</em>
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Bisa Custom Domain Sendiri
            </h3>
            <p className="text-sm text-slate-600">
              Gunakan domain kredibel seperti <code>budi-toyota.com</code> atau <code>rumahimpianbdg.com</code> untuk meningkatkan kepercayaan prospek pembeli bernilai tinggi.
            </p>
          </div>
        </div>

        <div className="text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Tingkatkan Closing Sales Anda Bulan Ini
          </h2>
          <p className="text-slate-600 text-sm mb-6">
            Setup katalog sales pertama Anda dalam 3 menit. Tanpa ribet coding.
          </p>
          <Link
            href="/onboarding"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-2xl transition"
          >
            Mulai Showroom Gratis
          </Link>
        </div>
      </main>
    </div>
  );
}
