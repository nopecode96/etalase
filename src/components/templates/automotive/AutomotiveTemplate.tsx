"use client";

import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Car,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Calculator,
  ChevronRight,
  BadgeCheck,
  Clock,
  MapPin,
  Star,
  Award,
  Send,
} from "lucide-react";
import { submitLeadAction } from "@/actions/lead.actions";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import type { Tenant, CatalogItem, GalleryItem, Testimonial, TenantCategory } from "@/generated/prisma";

type TenantWithRelations = Tenant & {
  category?: TenantCategory | null;
  catalogs: CatalogItem[];
  galleries: GalleryItem[];
  testimonials: Testimonial[];
};

interface Props {
  tenant: TenantWithRelations;
}

export default function AutomotiveTemplate({ tenant }: Props) {
  // Parsing catalog specs
  const cars = tenant.catalogs.map((item) => {
    const specs = (item.specsJson as Record<string, string>) || {};
    return {
      ...item,
      otrFormatted: specs.otrPrice || `Rp ${Number(item.price || 0).toLocaleString("id-ID")}`,
      dpPromo: specs.dpPromo || "DP Mulai 20%",
      angsuranPromo: specs.angsuranPromo || "Angsuran Ringan",
      transmission: specs.transmission || "Automatic",
      fuelType: specs.fuelType || "Bensin",
      engine: specs.engine || "1500cc Turbo",
      warranty: specs.warranty || "Garansi Resmi Dealer",
      numericPrice: Number(item.price) || 400000000,
    };
  });

  // State untuk kalkulator simulasi kredit interaktif
  const [selectedCarSlug, setSelectedCarSlug] = useState<string>(cars[0]?.slug || "");
  const [dpPercent, setDpPercent] = useState<number>(20);
  const [tenorYears, setTenorYears] = useState<number>(5);
  const [leadName, setLeadName] = useState<string>("");
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const selectedCar = cars.find((c) => c.slug === selectedCarSlug) || cars[0];

  // Rumus kalkulasi cicilan kredit kendaraan
  const carPrice = selectedCar?.numericPrice || 400000000;
  const dpAmount = Math.round(carPrice * (dpPercent / 100));
  const loanPrincipal = carPrice - dpAmount;
  // Suku bunga flat pertahun perkiraan (e.g. 5.5% flat)
  const interestRateYearly = 0.055;
  const totalMonths = tenorYears * 12;
  const totalInterest = loanPrincipal * interestRateYearly * tenorYears;
  const monthlyInstallment = Math.round((loanPrincipal + totalInterest) / totalMonths);

  // Handle pengajuan simulasi dual-action leads
  const handleSimulasiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      alert("Mohon isi Nama dan Nomor WhatsApp Anda.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitLeadAction({
        tenantId: tenant.id,
        name: leadName,
        phone: leadPhone,
        moduleType: "INSTALLMENT_SIMULATION",
        details: {
          unit: selectedCar?.title || "Mobil Pilihan",
          otr: `Rp ${carPrice.toLocaleString("id-ID")}`,
          dp: `Rp ${dpAmount.toLocaleString("id-ID")} (${dpPercent}%)`,
          tenor: `${tenorYears} Tahun (${totalMonths} Bulan)`,
          angsuran: `Rp ${monthlyInstallment.toLocaleString("id-ID")}/bln`,
        },
      });

      if (res.success && res.whatsappUrl) {
        window.location.href = res.whatsappUrl;
      } else {
        alert(res.error || "Gagal memproses simulasi. Silakan hubungi langsung via WhatsApp.");
      }
    } catch {
      alert("Terjadi kesalahan koneksi. Silakan coba kembali.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const salesName = "Bastian";
  const dealerAddress = tenant.address || "Jl. Soekarno Hatta No. 500, Bandung, Jawa Barat";
  const geoCity = tenant.geoCity || "Bandung";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-500 selection:text-white pb-20">
      {/* 1. TOP ANNOUNCEMENT BAR (GEO TRUST) */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white text-xs sm:text-sm font-medium py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              Resmi
            </span>
            <span>Dealer Resmi Chery &amp; Jaecoo Wilayah {geoCity} &amp; Sekitarnya</span>
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Clock size={14} /> Layanan Konsultasi &amp; Test Drive 24 Jam
            </span>
            <a
              href={`tel:${tenant.whatsappNumber}`}
              className="font-bold underline hover:text-yellow-300 flex items-center gap-1"
            >
              <Phone size={13} /> {tenant.whatsappNumber}
            </a>
          </div>
        </div>
      </div>

      {/* 2. STICKY NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-red-600 shadow-sm bg-red-50 flex-shrink-0">
              <img
                src="/assets/templates/automotive/sales-profile.webp"
                alt="Bastian Sales Chery Bandung"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                  {salesName}
                </span>
                <BadgeCheck size={16} className="text-blue-600 inline" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Senior Sales Consultant Chery &amp; Jaecoo
              </p>
            </div>
          </div>

          {/* Jump Links Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#katalog" className="hover:text-red-600 transition-colors">
              Pilihan Mobil
            </a>
            <a href="#simulasi" className="hover:text-red-600 transition-colors">
              Simulasi Kredit
            </a>
            <a href="#profil" className="hover:text-red-600 transition-colors">
              Tentang Bastian
            </a>
            <a href="#serah-terima" className="hover:text-red-600 transition-colors">
              Bukti Pengiriman
            </a>
            <a href="#lokasi" className="hover:text-red-600 transition-colors">
              Lokasi Dealer
            </a>
          </nav>

          {/* Quick CTA Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(
                `Halo ${salesName}, saya ingin konsultasi promo mobil Chery & Jaecoo di Bandung.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <MessageCircle size={16} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24 lg:py-28">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img
            src="/assets/templates/automotive/chery-omoda-5.webp"
            alt="Chery Omoda 5 Bandung"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-red-600/90 text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-red-400/30">
              <Sparkles size={15} />
              <span>Pesta Promo Spesial Bulan Ini • Khusus Plat D / Bandung</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white mb-6">
              Beli Mobil Baru <span className="text-red-500">Chery &amp; Jaecoo</span> di Bandung Lebih Mudah &amp; Cepat
            </h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-8">
              Dapatkan DP teringan mulai <strong>25 Jutaan</strong>, Bunga <strong>0%</strong>, Test Drive langsung ke rumah/kantor Anda, serta garansi mesin hingga <strong>10 Tahun / 1.000.000 KM</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <a
                href="#simulasi"
                className="inline-flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base shadow-xl shadow-red-600/30 transition-all hover:scale-[1.02]"
              >
                <Calculator size={18} />
                <span>Simulasi Kredit DP &amp; Cicilan</span>
              </a>
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all"
              >
                <span>Lihat Tipe Mobil</span>
                <ChevronRight size={18} />
              </a>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                <span>Unit Ready Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                <span>Dibantu Sampai Approve</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                <span>Test Drive ke Rumah</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                <span>Trade-in Segala Merk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SALES CONSULTANT PROFILE CARD (TRUST BUILDER) */}
      <section id="profil" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Sales Photo */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative group">
                  <div className="w-48 h-60 sm:w-60 sm:h-72 rounded-2xl overflow-hidden border-4 border-red-500 shadow-2xl bg-slate-800">
                    <img
                      src="/assets/templates/automotive/sales-profile.webp"
                      alt="Bastian Pratama Chery Bandung"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                    <Award size={14} /> Top Consultant
                  </div>
                </div>
              </div>

              {/* Sales Bio & Commitments */}
              <div className="md:col-span-8">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full">
                  Konsultan Penjualan Terpercaya
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-2">
                  Halo, Saya {salesName} Pratama
                </h2>
                <p className="text-red-300 text-sm font-semibold mb-4">
                  Senior Sales Consultant Dealer Resmi Chery &amp; Jaecoo Bandung
                </p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Dengan pengalaman melayani ratusan pengiriman mobil di area Bandung, Cimahi, dan Jawa Barat, saya berkomitmen memberikan pelayanan transparan tanpa biaya tersembunyi. Dari proses pemilihan tipe, kalkulasi kredit, hingga mobil tiba di garasi Anda dengan plat nomor resmi.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-700/60">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-600/20 text-red-400 rounded-lg">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Jaminan Diskon &amp; Promo Terbaik</h4>
                      <p className="text-xs text-slate-400">Bonus aksesoris resmi, kaca film, &amp; free service berkala.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-600/20 text-red-400 rounded-lg">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Proses Cepat &amp; Berkas Dijemput</h4>
                      <p className="text-xs text-slate-400">Anda cukup di rumah, seluruh administrasi leasing kami tangani.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KATALOG MOBIL (GRID UNIT TERBAIK) */}
      <section id="katalog" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-100 px-3 py-1 rounded-full">
              Line-Up Mobil Terbaru 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              Pilihan Tipe Chery &amp; Jaecoo
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Pilih mobil impian Anda dengan spesifikasi canggih, kenyamanan premium, dan penawaran kredit terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
                    <img
                      src={car.imageUrl}
                      alt={car.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                        {car.dpPromo}
                      </span>
                      <span className="bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                        {car.category}
                      </span>
                    </div>
                  </div>

                  {/* Car Content */}
                  <div className="p-6 sm:p-8">
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                        {car.title}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-slate-500 font-medium">OTR Bandung:</span>
                        <span className="text-lg sm:text-xl font-black text-red-600">
                          {car.otrFormatted}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {car.description}
                    </p>

                    {/* Technical Specs Badges */}
                    <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Transmisi:</span>
                        <span className="font-bold">{car.transmission}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Mesin:</span>
                        <span className="font-bold">{car.engine}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Bahan Bakar:</span>
                        <span className="font-bold">{car.fuelType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Garansi:</span>
                        <span className="font-bold text-red-600">{car.warranty}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 sm:p-8 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setSelectedCarSlug(car.slug);
                      const el = document.getElementById("simulasi");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all"
                  >
                    <Calculator size={15} />
                    <span>Hitung Simulasi</span>
                  </button>
                  <a
                    href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(
                      `Halo Bastian, saya tertarik dengan promo unit *${car.title}*. Bisa kirimkan rincian diskon dan hitungan cicilannya?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle size={15} />
                    <span>Tanya Promo WA</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. KALKULATOR SIMULASI KREDIT INTERAKTIF */}
      <section id="simulasi" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/80 border border-red-800/80 px-3.5 py-1.5 rounded-full">
              Kalkulator Cicilan Akurat
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-3">
              Simulasi Kredit Mobil Chery &amp; Jaecoo
            </h2>
            <p className="text-slate-400 text-sm">
              Sesuaikan besaran Uang Muka (DP) dan jangka waktu cicilan sesuai dengan anggaran Anda.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Form Input Parameters */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Pilih Tipe Mobil */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    1. Pilih Model Kendaraan
                  </label>
                  <select
                    value={selectedCarSlug}
                    onChange={(e) => setSelectedCarSlug(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3.5 text-sm sm:text-base focus:outline-none focus:border-red-500 font-semibold"
                  >
                    {cars.map((car) => (
                      <option key={car.slug} value={car.slug}>
                        {car.title} - {car.otrFormatted}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Pilihan Persentase DP */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      2. Uang Muka / DP ({dpPercent}%)
                    </label>
                    <span className="text-sm font-extrabold text-red-400">
                      Rp {dpAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 20, 25, 30].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setDpPercent(pct)}
                        className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                          dpPercent === pct
                            ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Pilihan Jangka Waktu / Tenor */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      3. Jangka Waktu / Tenor ({tenorYears} Tahun)
                    </label>
                    <span className="text-xs text-slate-400 font-medium">
                      {totalMonths} Kali Cicilan
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setTenorYears(yr)}
                        className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                          tenorYears === yr
                            ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500"
                        }`}
                      >
                        {yr} Thn
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simulation Result Card & Form WhatsApp */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-inner">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full">
                  Estimasi Angsuran
                </span>

                <div className="mt-4 mb-6">
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Rp {monthlyInstallment.toLocaleString("id-ID")}
                    <span className="text-sm font-semibold text-slate-400"> /bulan</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    *Estimasi bunga flat pembiayaan leasing rekanan resmi Chery Bandung.
                  </p>
                </div>

                {/* Form Data Diri */}
                <form onSubmit={handleSimulasiSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Nama Lengkap Anda
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bpk. Hendra"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Nomor WhatsApp Anda
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]"
                  >
                    <Send size={16} />
                    <span>{isSubmitting ? "Memproses..." : "Ajukan Hitungan Ini via WhatsApp"}</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    Data Anda aman dan langsung tersambung ke WhatsApp {salesName}.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GALERI SERAH TERIMA UNIT (SOCIAL PROOF) */}
      <section id="serah-terima" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-100 px-3 py-1 rounded-full">
              Bukti Pengiriman Nyata
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
              Galeri Serah Terima Konsumen
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Ratusan konsumen di Bandung dan Jawa Barat telah mempercayakan pembelian mobil Chery mereka kepada {salesName}.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 border border-slate-200 shadow-sm"
              >
                <img
                  src={`/assets/templates/automotive/delivery-${idx}.webp`}
                  alt={`Serah terima mobil Chery ${idx}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-[11px] font-bold leading-tight">
                    Serah Terima Unit #{idx} Bandung
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIAL KONSUMEN */}
      {tenant.testimonials.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-100 px-3 py-1 rounded-full">
                Ulasan Pelanggan
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                Kepuasan Pelanggan Adalah Prioritas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tenant.testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 text-amber-400 mb-3">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed italic mb-4">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center text-sm">
                      {t.clientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">{t.clientName}</h4>
                      <p className="text-[11px] text-slate-500">{t.clientRole}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. REKANAN LEASING & PEMBIAYAAN */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Bekerjasama dengan Mitra Lembaga Pembiayaan Resmi &amp; Terpercaya
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80 font-black text-slate-600 text-base sm:text-lg">
            <span className="hover:text-blue-600 transition-colors">BCA Finance</span>
            <span className="hover:text-yellow-600 transition-colors">Maybank Finance</span>
            <span className="hover:text-yellow-500 transition-colors">Mandiri Tunas Finance</span>
            <span className="hover:text-orange-600 transition-colors">Adira Finance</span>
            <span className="hover:text-blue-800 transition-colors">Mandiri Utama Finance (MUF)</span>
          </div>
        </div>
      </section>

      {/* 10. LOKASI DEALER & GOOGLE MAPS EMBED */}
      <section id="lokasi" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-100 px-3 py-1 rounded-full">
                Kunjungi Showroom Kami
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-4">
                Dealer Resmi Chery &amp; Jaecoo Bandung
              </h2>
              <div className="space-y-4 text-sm text-slate-600 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p>{dealerAddress}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-red-600 flex-shrink-0" />
                  <p>Senin - Minggu: 08.00 - 19.00 WIB (Showroom Buka)</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-red-600 flex-shrink-0" />
                  <p>Hotline Sales: <strong>{tenant.whatsappNumber}</strong> ({salesName})</p>
                </div>
              </div>

              <a
                href={tenant.googleMapsUrl || "https://maps.google.com/?q=Bandung"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg border border-slate-300 h-80 bg-slate-200">
              <iframe
                title="Lokasi Dealer Chery Bandung"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862215!2d107.5731165243575!3d-6.903444341680749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-white text-sm">
              {tenant.businessName}
            </p>
            <p className="mt-1">
              Website portofolio &amp; lead generation resmi. Hak Cipta &copy; {new Date().getFullYear()}.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span>Ditenagai oleh</span>
            <a href="https://etalase.online" className="text-white font-bold hover:underline">
              etalase.online
            </a>
          </div>
        </div>
      </footer>

      {/* 12. FLOATING WHATSAPP CTA */}
      <FloatingWhatsApp
        whatsappNumber={tenant.whatsappNumber}
        businessName={salesName}
        themeColor="#b91c1c"
      />
    </div>
  );
}
