import { CheckCircle2, MessageCircle, Sparkles, Shield, RefreshCw } from "lucide-react";

export default function PricingSection() {
  const waOrderMessage = encodeURIComponent(
    "Halo Tim etalase.online! 👋 Saya ingin memesan Paket Bisnis All-In-One (Rp 2.500.000) untuk website usaha saya. Boleh dibantu pendaftarannya?"
  );
  const waOrderLink = `https://wa.me/6281234567890?text=${waOrderMessage}`;

  const inclusions = [
    "Domain Mandiri Resmi (.com / .id pilihan Anda)",
    "Desain Website Portofolio Eksklusif sesuai Kategori Usaha",
    "Formulir Interaktif + Auto-Connect WhatsApp Pembeli",
    "Dasbor Pribadi Pencatat Kontak Calon Pembeli (Leads)",
    "Optimasi Google SEO Lokal & Peta Wilayah Kota Anda",
    "Dibantu input unit, foto, & materi awal sampai tayang sempurna",
    "Bantuan pembaruan materi promo atau update harga berkala",
    "Tampilan cepat, ringan, & optimal dibuka dari smartphone pembeli",
  ];

  return (
    <section id="harga" className="py-20 md:py-28 bg-slate-50 relative border-t border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-blue-600 bg-blue-100/70 border border-blue-200 px-3.5 py-1 rounded-full">
            Investasi Jelas &amp; Transparan
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight">
            Satu Paket Lengkap. Terima Beres &amp; Siap Jualan.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Tanpa biaya tersembunyi, tanpa repot beli domain dan hosting terpisah. 
            Semua kebutuhan website bisnis Anda sudah kami urus tuntas.
          </p>
        </div>

        {/* Flagship Single Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-blue-600 shadow-2xl shadow-blue-600/10 overflow-hidden relative">
          {/* Top Badge */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-bold tracking-wide uppercase flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-yellow-300" />
            <span>Pilihan Utama Sales &amp; Pengusaha Lokal — All-In-One Flagship</span>
          </div>

          <div className="p-8 sm:p-12">
            {/* Title & Price Header */}
            <div className="text-center pb-8 border-b border-slate-200">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Paket Bisnis All-In-One
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Cocok untuk Sales Mobil, Sales Properti, Rental Kendaraan, Kafe &amp; Jasa Lokal
              </p>

              {/* Price Tag */}
              <div className="inline-block bg-blue-50/70 border border-blue-100 rounded-3xl px-6 py-4 mb-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Investasi Tahun Pertama
                </p>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-xl font-bold text-slate-700">Rp</span>
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    2.500.000
                  </span>
                </div>
                <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-3 py-0.5 rounded-full mt-2">
                  Terima Jadi, Siap Pakai &amp; Langsung Jualan
                </span>
              </div>

              {/* Renewal Note */}
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 mt-3 font-medium">
                <RefreshCw size={15} className="text-blue-600 flex-shrink-0" />
                <span>
                  Perpanjangan tahun berikutnya: <strong>Rp 1.700.000 / tahun</strong> (Hanya ~Rp 140 ribuan/bulan untuk perpanjangan domain resmi, pemeliharaan sistem, &amp; bantuan update berkala).
                </span>
              </div>
            </div>

            {/* Inclusions List */}
            <div className="pt-8 pb-10">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 text-center sm:text-left">
                Semua yang Anda Dapatkan di Paket Ini:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={16} className="stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Action Button */}
            <div className="text-center pt-2">
              <a
                href={waOrderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-8 py-4 sm:py-5 rounded-2xl text-base sm:text-lg transition-all shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                <MessageCircle size={24} className="fill-current" />
                <span>Mulai Buat Website Saya Sekarang</span>
              </a>

              <p className="text-xs text-slate-500 mt-4 flex items-center justify-center gap-1.5">
                <Shield size={14} className="text-blue-600" />
                <span>Konsultasi gratis &bull; Pembayaran aman &bull; Garansi live siap jualan</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
