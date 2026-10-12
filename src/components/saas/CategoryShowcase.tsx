"use client";

import { useState } from "react";
import { Car, Key, Home, Coffee, Wrench, ExternalLink, Check, Sparkles } from "lucide-react";

export default function CategoryShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const categories = [
    {
      id: "automotive",
      name: "Sales Otomotif",
      subtitle: "Mobil & Motor Baru / Bekas",
      icon: Car,
      color: "from-blue-600 to-indigo-700",
      accentBadge: "Otomotif & Dealer",
      headline: "Website Sales Mobil & Motor: Mesin Penjualan & Konsultasi Kredit",
      description:
        "Tampilkan seluruh varian unit, harga OTR terupdate, galeri foto serah terima unit ke pelanggan yang puas, serta kalkulator kredit interaktif yang langsung terhubung ke WhatsApp Anda.",
      features: [
        "Kalkulator simulasi DP & angsuran bulanan otomatis",
        "Galeri foto serah terima unit (bukti transaksi terpercaya)",
        "Spesifikasi lengkap & brosur digital per tipe kendaraan",
        "Tombol cepat tanya stok & booking test drive langsung ke WhatsApp",
      ],
      demoUrl: "https://etalase.online/bastian-sales",
      demoDomain: "bastian-sales.com",
      demoButtonLabel: "Buka Contoh Website Otomotif",
      image: "/showcase/automotive-web.png",
    },
    {
      id: "rental",
      name: "Rental Kendaraan",
      subtitle: "Mobil, Motor & Bus Wisata",
      icon: Key,
      color: "from-purple-600 to-indigo-800",
      accentBadge: "Rental & Transportasi",
      headline: "Website Rental Mobil & Motor: Booking Cepat Tanpa Ribet Balas DM",
      description:
        "Pamerkan armada kendaraan Anda yang terawat dengan daftar tarif yang transparan. Calon penyewa bisa memilih durasi sewa, opsi lepas kunci atau sopir, dan langsung mengirim jadwal booking ke WhatsApp.",
      features: [
        "Tabel tarif harian, mingguan, 12 jam, & 24 jam",
        "Pilihan layanan: Lepas Kunci atau Dengan Pengemudi",
        "Informasi syarat sewa yang jelas & transparan",
        "Formulir reservasi tanggal & armada siap kirim ke WhatsApp",
      ],
      demoUrl: "https://etalase.online/bastian-rental",
      demoDomain: "bastian-rental.com",
      demoButtonLabel: "Buka Contoh Website Rental",
      image: "/showcase/rental-web.png",
    },
    {
      id: "property",
      name: "Agen & Sales Properti",
      subtitle: "Rumah, Apartemen & Ruko",
      icon: Home,
      color: "from-emerald-600 to-teal-800",
      accentBadge: "Real Estate & Properti",
      headline: "Website Portofolio Properti: Listing Elegan, Simulasi KPR & E-Brosur",
      description:
        "Tampilkan proyek perumahan atau listing rumah sekunder dengan denah, spesifikasi material, foto lingkungan, estimasi cicilan KPR, dan tombol download e-brosur untuk menjaring kontak calon pembeli serius.",
      features: [
        "Katalog tipe unit rumah/ruko beserta denah tata ruang",
        "Detail fasilitas lingkungan & akses jalan terdekat",
        "Formulir simulasi cicilan KPR & estimasi DP",
        "Form download e-brosur berhadiah kontak calon pembeli",
      ],
      demoUrl: "https://etalase.online/properti-bandung",
      demoDomain: "propertibandung.com",
      demoButtonLabel: "Buka Contoh Website Properti",
      image: "/showcase/property-web.png",
    },
    {
      id: "restaurant",
      name: "Kafe & Resto",
      subtitle: "Kuliner, Coffee Shop & Catering",
      icon: Coffee,
      color: "from-amber-600 to-orange-800",
      accentBadge: "F&B & Kuliner",
      headline: "Website Kafe & Kuliner: Buku Menu Digital & Reservasi Meja Instan",
      description:
        "Buku menu digital berfoto makanan yang menggugah selera, navigasi rute Google Maps sekali klik, dan formulir reservasi meja untuk acara keluarga atau kumpul kantor yang langsung masuk ke WhatsApp kasir/manajer.",
      features: [
        "Daftar menu berfoto dengan kategori makanan, kopi, & minuman",
        "Tombol reservasi meja & pemesanan paket katering",
        "Integrasi peta lokasi Google Maps & jam buka operasional",
        "Bisa dipasang sebagai QR Code meja tanpa biaya tambahan",
      ],
      demoUrl: "https://etalase.online/kuliner-kita",
      demoDomain: "kulinerkita.com",
      demoButtonLabel: "Buka Contoh Website Kafe & Resto",
      image: "/showcase/restaurant-web.png",
    },
    {
      id: "service",
      name: "Jasa & Bisnis Lokal",
      subtitle: "Klinik, Bengkel, Salon & Kontraktor",
      icon: Wrench,
      color: "from-slate-700 to-slate-900",
      accentBadge: "Layanan & Servis",
      headline: "Website Jasa Lokal: Tampilkan Keahlian & Raih Klien di Kota Anda",
      description:
        "Website portofolio yang menampilkan daftar paket servis, rincian pengerjaan, testimoni pelanggan, dan tombol konsultasi cepat bagi calon konsumen yang membutuhkan solusi di hari yang sama.",
      features: [
        "Daftar paket layanan & estimasi biaya pengerjaan",
        "Galeri hasil pengerjaan sebelum dan sesudah (before-after)",
        "Review & testimoni kepuasan pelanggan terdahulu",
        "Tombol darurat/konsultasi cepat via WhatsApp 24 Jam",
      ],
      demoUrl: "https://etalase.online/jasaprofesional",
      demoDomain: "jasaprofesional.id",
      demoButtonLabel: "Buka Contoh Website Jasa Lokal",
      image: "/showcase/service-web.png",
    },
  ];

  const current = categories[activeTab];

  return (
    <section id="showcase" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            <Sparkles size={16} />
            <span>Desain Khusus Sesuai Bidang Usaha Anda</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pilih Tampilan yang Pas untuk Bisnis Anda
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Bukan template toko online generic yang membingungkan. Setiap website dirancang dengan modul khusus
            yang dibutuhkan industri Anda agar calon konsumen langsung terhubung ke WhatsApp.
          </p>
        </div>

        {/* Tab Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <Icon size={18} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Panel Card */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Description & Feature List */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 border border-blue-200 px-3 py-1 rounded-full">
                {current.accentBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight leading-snug">
                {current.headline}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Feature Highlights */}
              <div className="space-y-3 mb-8">
                {current.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 p-1 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                    <span className="text-slate-700 text-sm sm:text-base font-medium">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Demo Button */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={current.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base transition-all shadow-md shadow-blue-600/20 hover:shadow-lg"
                >
                  <span>{current.demoButtonLabel}</span>
                  <ExternalLink size={16} />
                </a>

                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Domain mandiri resmi: <strong>{current.demoDomain}</strong></span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Mockup */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/50 group">
                {/* Browser-like address bar simulation */}
                <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <div className="bg-white border border-slate-200 text-slate-500 text-xs px-3 py-1 rounded-md flex-1 text-center font-mono truncate">
                    https://{current.demoDomain}
                  </div>
                </div>

                {/* Preview Image */}
                <div className="aspect-[16/10] overflow-hidden relative bg-slate-900">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-5">
                    <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                      Tampilan Responsif di HP &amp; Komputer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
