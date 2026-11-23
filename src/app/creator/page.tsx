import Link from "next/link";
import { ArrowLeft, Sparkles, ShoppingBag, Zap, CheckCircle2 } from "lucide-react";

export default function CreatorPage() {
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
            Buka Etalase Kreator
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 flex-1">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Untuk Kreator, Coach & Affiliator Asia Tenggara</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Maksimalkan Penghasilan dari Setiap Klik di TikTok, IG & Threads.
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed mb-10">
          Jual e-book, preset, template Notion, dan kelas online secara instan via QRIS, sambil merekomendasikan produk fisik di Keranjang Kuning dan Shopee dengan pelacakan klik akurat.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Instant Digital Delivery via WhatsApp
            </h3>
            <p className="text-sm text-slate-600">
              Begitu pembeli membayar via Borderpay QRIS atau PayPal, n8n otomatis mengirim link download file atau link Zoom ke WhatsApp pembeli secara instan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              Preset Keranjang Kuning & Shopee
            </h3>
            <p className="text-sm text-slate-600">
              Tombol afiliasi dilengkapi badge warna dan istilah resmi SEA (Keranjang Kuning, Beg Kuning, Yellow Basket) yang sudah terbukti menaikkan CTR hingga 3x lipat.
            </p>
          </div>
        </div>

        <div className="text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Siap Membangun Mesin Penghasilan Kreator Anda?
          </h2>
          <p className="text-slate-600 text-sm mb-6">
            Daftar dalam 10 detik dengan Google Connect. Tanpa biaya bulanan tersembunyi.
          </p>
          <Link
            href="/onboarding"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-2xl transition"
          >
            Mulai Etalase Kreator Gratis
          </Link>
        </div>
      </main>
    </div>
  );
}
