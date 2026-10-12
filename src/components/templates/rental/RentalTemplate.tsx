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
  Clock,
  MapPin,
  Star,
  Key,
  Users,
  Fuel,
  Gauge,
  Send,
  HelpCircle,
  FileText,
  ChevronRight,
  Check,
  X,
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

export default function RentalTemplate({ tenant }: Props) {
  // Parsing metadata dinamis dari database (featureFlags)
  const flags = (tenant.featureFlags as Record<string, any>) || {};
  const businessName = tenant.businessName || "Bastian Rental Mobil Bandung";
  const geoCity = tenant.geoCity || "Bandung";
  const dealerAddress = tenant.address || "Jl. Pasteur No. 120, Sukajadi, Kota Bandung, Jawa Barat";
  const themeColor = tenant.themeColor || "#059669"; // Emerald Green

  const heroTitle = tenant.heroTitle || "Sewa Mobil Bandung Lepas Kunci & Plus Driver Murah Terpercaya";
  const heroSubtitle =
    tenant.heroSubtitle ||
    "Armada keluaran terbaru, bersih terawat, dan siap antar-jemput ke Stasiun/Bandara/Hotel. Proses mudah tanpa survey berbelit!";
  const heroBannerUrl = tenant.heroBannerUrl || "/assets/templates/rental/hero-rental.webp";

  const taglineBadge = flags.taglineBadge || "Solusi Transportasi & Wisata Bandung • Unit 2023-2025";
  const heroBadges: Array<{ label: string; icon?: string; sublabel?: string }> = flags.heroBadges || [
    { label: "Bisa Lepas Kunci Tanpa Survey", icon: "Key", sublabel: "Kemudahan Sewa" },
    { label: "Gratis Antar Jemput Stasiun / Hotel", icon: "MapPin", sublabel: "Layanan Antar Unit" },
  ];

  const commitments: string[] = flags.commitments || [
    "Armada Bersih, Wangi & Rutin Servis Resmi",
    "Pilihan Durasi: 12 Jam, 24 Jam, & Mingguan",
    "Driver Ramah, Berpengalaman & Menguasai Rute Wisata",
    "Asuransi All-Risk & Jaminan Mobil Pengganti",
  ];

  const rentalTerms: Array<{ title: string; items: string[] }> = flags.rentalTerms || [];
  const facilities: Array<{ title: string; desc: string }> = flags.facilities || [];

  // Parsing armada mobil dari CatalogItem
  const armada = tenant.catalogs.map((item) => {
    const specs = (item.specsJson as Record<string, any>) || {};
    return {
      ...item,
      seats: specs.seats || "7 Kursi",
      transmission: specs.transmission || "Matic / Manual",
      fuelType: specs.fuelType || "Bensin",
      year: specs.year || "2023 - 2024",
      price12h: specs.price12h || `Rp ${(Number(item.price || 0) * 0.8).toLocaleString("id-ID")}`,
      price24h: specs.price24h || `Rp ${Number(item.price || 0).toLocaleString("id-ID")}`,
      priceWithDriver: specs.priceWithDriver || "Hubungi Admin",
      features: (specs.features as string[]) || ["AC Dingin", "Audio Bluetooth", "Kamera Parkir"],
      imageUrl: item.imageUrl || "/assets/templates/rental/avanza-2024.webp",
    };
  });

  // State untuk form reservasi cepat (Dual-Action Leads)
  const [selectedUnit, setSelectedUnit] = useState<string>(armada[0]?.title || "Toyota All New Avanza 2024");
  const [rentalPackage, setRentalPackage] = useState<string>("Lepas Kunci 24 Jam");
  const [startDate, setStartDate] = useState<string>("");
  const [durationDays, setDurationDays] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Active tab untuk Syarat & Ketentuan
  const [activeTermTab, setActiveTermTab] = useState<number>(0);

  // Handle submit form reservasi
  const handleBookingSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customerName || !customerPhone || !startDate) {
      setIsModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitLeadAction({
        tenantId: tenant.id,
        name: customerName,
        phone: customerPhone,
        moduleType: "RENTAL_BOOKING",
        details: {
          unit: selectedUnit,
          paket: rentalPackage,
          tanggalMulai: startDate,
          durasi: `${durationDays} Hari`,
          lokasiPenjemputan: geoCity,
        },
      });

      if (res.success && res.whatsappUrl) {
        window.location.href = res.whatsappUrl;
      } else {
        alert(res.error || "Gagal memproses reservasi. Silakan hubungi via WhatsApp.");
      }
    } catch {
      alert("Terjadi kesalahan koneksi. Silakan coba kembali.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler untuk Floating Booking Bar Button
  const handleFloatingBookingClick = () => {
    if (!startDate) {
      alert("Silakan pilih Tanggal Mulai Sewa terlebih dahulu.");
      return;
    }
    if (!customerName || !customerPhone) {
      setIsModalOpen(true);
    } else {
      handleBookingSubmit();
    }
  };

  // Schema.org Structured Data AutoRental
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: businessName,
    image: tenant.heroBannerUrl || "https://etalase.online/assets/templates/rental/hero-rental.webp",
    telephone: tenant.whatsappNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: dealerAddress,
      addressLocality: geoCity,
      addressRegion: "Jawa Barat",
      postalCode: "40161",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: tenant.latitude || -6.8905,
      longitude: tenant.longitude || 107.5996,
    },
    url: `https://${tenant.customDomain}`,
    priceRange: "Rp 350.000 - Rp 1.350.000",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-600 selection:text-white pb-20">
      {/* JSON-LD Schema.org SEO AutoRental */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. TOP ANNOUNCEMENT BAR (GEO TRUST) */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white text-xs sm:text-sm font-medium py-2.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/30 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-400/30">
              Resmi
            </span>
            <span>Rental Mobil Resmi {geoCity} &amp; Drop Off Jawa Barat / Bandara</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-100">
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Clock size={14} /> Layanan Siaga Antar Jemput 24 Jam
            </span>
            <a
              href={`tel:${tenant.whatsappNumber}`}
              className="font-bold underline hover:text-yellow-300 flex items-center gap-1 text-white"
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
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-emerald-600 shadow-sm bg-emerald-50 flex items-center justify-center flex-shrink-0">
              {tenant.logoUrl ? (
                <img
                  src={tenant.logoUrl}
                  alt={businessName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Car className="text-emerald-700" size={24} />
              )}
            </div>
            <div>
              <span className="font-black text-base sm:text-lg text-slate-900 leading-tight block">
                {businessName}
              </span>
              <p className="text-[11px] sm:text-xs text-emerald-700 font-semibold">
                Sewa Lepas Kunci &amp; Driver Profesional
              </p>
            </div>
          </div>

          {/* Jump Links Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-600">
            <a href="#armada" className="hover:text-emerald-600 transition-colors">
              Pilihan Armada
            </a>
            <a href="#booking" className="hover:text-emerald-600 transition-colors">
              Reservasi Cepat
            </a>
            <a href="#syarat" className="hover:text-emerald-600 transition-colors">
              Syarat Sewa
            </a>
            <a href="#testimoni" className="hover:text-emerald-600 transition-colors">
              Ulasan Pelanggan
            </a>
            <a href="#lokasi" className="hover:text-emerald-600 transition-colors">
              Lokasi Pool
            </a>
          </nav>

          {/* Quick CTA Button */}
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(
                `Halo ${businessName}, saya ingin cek jadwal & tarif rental mobil di ${geoCity}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <MessageCircle size={16} />
              <span className="hidden sm:inline">WhatsApp Booking</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER SECTION (CENTERED LUXURY PANORAMIC LAYOUT) */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-14 sm:pt-20 pb-20 sm:pb-28">
        {/* Ambient emerald blur glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-600/20 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-300 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-6 backdrop-blur-md border border-emerald-500/30">
            <Sparkles size={15} className="text-emerald-400" />
            <span>{taglineBadge}</span>
          </div>

          {/* Main Headline Centered */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight text-white mb-6 max-w-4xl mx-auto">
            {heroTitle}
          </h1>

          {/* Subtitle Centered */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>

          {/* 2 CTA Buttons Centered */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <a
              href="#armada"
              className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.02]"
            >
              <Car size={18} />
              <span>Cek Ketersediaan Armada</span>
            </a>
            <a
              href="#syarat"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all"
            >
              <FileText size={18} />
              <span>Syarat Lepas Kunci</span>
            </a>
          </div>

          {/* Panoramic Car Showcase with Soft Emerald Glow */}
          <div className="relative max-w-4xl mx-auto mt-4 sm:mt-8">
            {/* Center ambient glow directly behind car */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[520px] h-48 sm:h-[260px] bg-emerald-500/25 blur-[100px] rounded-full pointer-events-none" />

            {/* Left Floating Badge (Desktop) */}
            {heroBadges[0] && (
              <div className="hidden md:flex absolute top-12 left-0 z-20 bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 px-4 py-2.5 rounded-2xl shadow-2xl items-center gap-3 transform hover:-translate-y-1 transition-transform">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Key size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {heroBadges[0].sublabel || "Kemudahan Sewa"}
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-white">
                    {heroBadges[0].label}
                  </p>
                </div>
              </div>
            )}

            {/* Right Floating Badge (Desktop) */}
            {heroBadges[1] && (
              <div className="hidden md:flex absolute top-12 right-0 z-20 bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 px-4 py-2.5 rounded-2xl shadow-2xl items-center gap-3 transform hover:-translate-y-1 transition-transform">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {heroBadges[1].sublabel || "Layanan Antar Unit"}
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-white">
                    {heroBadges[1].label}
                  </p>
                </div>
              </div>
            )}

            {/* Panoramic Car Showcase Image */}
            <div className="relative z-10 w-full group">
              <img
                src={heroBannerUrl}
                alt={`${businessName} Showcase`}
                className="w-full max-h-[360px] sm:max-h-[420px] object-contain mx-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="text-center mt-2">
                <span className="inline-block text-[11px] sm:text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-700/50 px-4 py-1.5 rounded-full backdrop-blur-md">
                  Toyota Kijang Innova Zenix &bull; Pilihan Favorit Wisata &amp; Bisnis Bandung
                </span>
              </div>
            </div>

            {/* 4 Poin Komitmen Layanan Rental */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-300 max-w-4xl mx-auto mt-6">
              {commitments.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 justify-center sm:justify-start">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLOATING QUICK BOOKING BAR (JONAS RENT STYLE OVERLAP) */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 -mt-10 sm:-mt-14">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 p-5 sm:p-7 text-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Calendar size={18} />
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base text-slate-900">
                  Cari &amp; Reservasi Jadwal Armada
                </h3>
                <p className="text-[11px] text-slate-500">
                  Pilih unit &amp; paket sewa untuk konfirmasi ketersediaan instan
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Sparkles size={12} /> Unit Terawat 2023-2025
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
            {/* Col 1: Model Mobil */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Model Armada
              </label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-emerald-500"
              >
                {armada.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title} ({item.seats})
                  </option>
                ))}
              </select>
            </div>

            {/* Col 2: Paket Sewa */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Paket Layanan
              </label>
              <select
                value={rentalPackage}
                onChange={(e) => setRentalPackage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="Lepas Kunci 24 Jam">Lepas Kunci (24 Jam)</option>
                <option value="Lepas Kunci 12 Jam">Lepas Kunci (12 Jam)</option>
                <option value="Paket Mobil + Driver (12 Jam)">Paket + Driver (12 Jam)</option>
                <option value="Paket All-In (Mobil + Driver + BBM + Tol)">Paket All-In Wisata</option>
                <option value="Drop Off Bandara / Luar Kota">Drop Off Bandara / Drop</option>
              </select>
            </div>

            {/* Col 3: Tanggal Sewa */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Mulai Sewa
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Col 4: Submit Button */}
            <div>
              <button
                type="button"
                onClick={handleFloatingBookingClick}
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Send size={15} />
                <span>Cek Jadwal &amp; Pesan WA</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL POPUP RESERVASI CEPAT (JIKA NAMA/PHONE BELUM LENGKAP) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                Konfirmasi Reservasi
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">Lengkapi Data Pemesanan</h3>
              <p className="text-xs text-slate-500 mt-1">
                Unit: <strong className="text-slate-800">{selectedUnit}</strong> ({rentalPackage})
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
                handleBookingSubmit();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Penyewa
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dimas Prasetyo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor WhatsApp Aktif
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081298765432"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {!startDate && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tanggal Mulai Sewa
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <Send size={14} />
                  <span>{isSubmitting ? "Memproses..." : "Konfirmasi & Hubungi WA"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. VALUE PROPOSITION 3 FASILITAS UNGGULAN */}
      {facilities.length > 0 && (
        <section className="pt-16 pb-12 bg-white border-b border-slate-200 mt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {facilities.map((f, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:border-emerald-500/60 transition-all hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 font-black text-lg">
                    {i === 0 ? <Clock size={24} /> : i === 1 ? <ShieldCheck size={24} /> : <Phone size={24} />}
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. ARMADA PILIHAN (CLEAN LIGHT-THEMED CARDS GAYA JONAS RENT) */}
      <section id="armada" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
              Pilihan Armada &amp; Tarif Sewa
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-4">
              Armada Pilihan, Perjalanan Nyaman &amp; Bebas Repot
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Seluruh unit mobil dalam kondisi prima, wangi, ber-AC sejuk, dan rutin servis berkala di bengkel resmi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {armada.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Foto Mobil Rental Berlatar Terang Lembut (Clean Light Background) */}
                  <div className="relative aspect-[16/10] bg-gradient-to-b from-slate-50 via-slate-100/70 to-slate-100 border-b border-slate-100 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={car.imageUrl}
                      alt={car.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 drop-shadow-md"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      {car.category || "Favorit"}
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                      {car.year}
                    </div>
                  </div>

                  {/* Konten Unit */}
                  <div className="p-6">
                    <h3 className="font-black text-xl text-slate-900 mb-1">{car.title}</h3>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">{car.description}</p>

                    {/* Badge Spesifikasi */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-600 mb-5 pb-5 border-b border-slate-100">
                      <div className="bg-slate-100 p-2 rounded-xl">
                        <Users size={14} className="mx-auto text-emerald-600 mb-1" />
                        <span className="font-bold block text-[11px] text-slate-800">{car.seats}</span>
                      </div>
                      <div className="bg-slate-100 p-2 rounded-xl">
                        <Gauge size={14} className="mx-auto text-emerald-600 mb-1" />
                        <span className="font-bold block text-[11px] text-slate-800 truncate">{car.transmission}</span>
                      </div>
                      <div className="bg-slate-100 p-2 rounded-xl">
                        <Fuel size={14} className="mx-auto text-emerald-600 mb-1" />
                        <span className="font-bold block text-[11px] text-slate-800 truncate">{car.fuelType}</span>
                      </div>
                    </div>

                    {/* Tabel Tarif Ringkas per Durasi (Kontras & Jelas) */}
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3.5 mb-5 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center text-slate-600">
                        <span>Lepas Kunci 12 Jam:</span>
                        <strong className="text-slate-900 font-bold">{car.price12h}</strong>
                      </div>
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-medium text-emerald-800">Lepas Kunci 24 Jam:</span>
                        <strong className="text-emerald-700 font-black text-sm">{car.price24h}</strong>
                      </div>
                      <div className="flex justify-between items-center text-slate-600 pt-1 border-t border-emerald-100/60">
                        <span>Paket All-In + Driver:</span>
                        <strong className="text-slate-900 font-bold">{car.priceWithDriver}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tombol Action */}
                <div className="p-6 pt-0 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnit(car.title);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                  >
                    <Key size={14} />
                    <span>Pesan Unit Ini</span>
                  </button>
                  <a
                    href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(
                      `Halo ${businessName}, saya ingin cek ketersediaan unit *${car.title}* untuk tanggal sewa.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold p-3 rounded-xl text-xs transition-colors flex items-center justify-center"
                    title="Tanya via WA"
                  >
                    <MessageCircle size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FORMULIR LENGKAP RESERVASI RENTAL (DUAL-ACTION LEADS) */}
      <section id="booking" className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3.5 py-1.5 rounded-full">
              Formulir Reservasi Cepat
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-3">
              Cek Jadwal &amp; Booking Armada Anda
            </h2>
            <p className="text-slate-400 text-sm">
              Pilih mobil dan paket sewa. Data Anda langsung diproses untuk konfirmasi ketersediaan via WhatsApp.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-800/95 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Pilih Mobil */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    1. Model Armada Pilihan
                  </label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    {armada.map((item) => (
                      <option key={item.id} value={item.title}>
                        {item.title} ({item.seats})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Pilihan Paket Sewa */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    2. Paket Layanan Sewa
                  </label>
                  <select
                    value={rentalPackage}
                    onChange={(e) => setRentalPackage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Lepas Kunci 24 Jam">Lepas Kunci (24 Jam Penuh)</option>
                    <option value="Lepas Kunci 12 Jam">Lepas Kunci (12 Jam)</option>
                    <option value="Paket Mobil + Driver (12 Jam)">Mobil + Driver Profesional (12 Jam)</option>
                    <option value="Paket All-In (Mobil + Driver + BBM + Tol)">Paket All-In Wisata (BBM &amp; Tol)</option>
                    <option value="Drop Off Bandara / Luar Kota">Drop Off Stasiun / Bandara / Luar Kota</option>
                  </select>
                </div>

                {/* 3. Tanggal Mulai Sewa */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    3. Tanggal Mulai Sewa
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* 4. Durasi Hari */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    4. Durasi Pemakaian (Hari)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 5].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setDurationDays(day)}
                        className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                          durationDays === day
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30"
                            : "bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500"
                        }`}
                      >
                        {day} Hari
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Nama Lengkap */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    5. Nama Lengkap Penyewa
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dimas Prasetyo"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* 6. Nomor WhatsApp */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    6. Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081298765432"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/80">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black py-4 px-6 rounded-2xl text-base shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.01]"
                >
                  <Send size={18} />
                  <span>{isSubmitting ? "Memproses Reservasi..." : "Cek Jadwal & Kirim Booking ke WhatsApp"}</span>
                </button>
                <p className="text-center text-xs text-slate-400 mt-3">
                  Tanpa biaya administrasi tersembunyi. Tim operasional {businessName} akan segera merespons konfirmasi ketersediaan unit Anda.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 8. SYARAT & KETENTUAN SEWA TRANSPARAN (TAB / ACCORDION) */}
      {rentalTerms.length > 0 && (
        <section id="syarat" className="py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                Transparansi Persyaratan
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-3">
                Syarat &amp; Ketentuan Sewa Mobil
              </h2>
              <p className="text-slate-600 text-sm">
                Proses verifikasi cepat tanpa birokrasi rumit untuk kenyamanan Anda berkendara di Bandung.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
              {rentalTerms.map((term, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTermTab(idx)}
                  className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                    activeTermTab === idx
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {term.title.split("(")[0].trim()}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <h3 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="text-emerald-600" size={20} />
                <span>{rentalTerms[activeTermTab]?.title}</span>
              </h3>
              <ul className="space-y-3">
                {rentalTerms[activeTermTab]?.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 9. FOTO PELANGGAN HAPPY & TESTIMONIAL (SOCIAL PROOF) */}
      <section id="testimoni" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Dokumentasi &amp; Testimoni
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-3">
              Pelanggan Happy Kami
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Ratusan wisatawan, keluarga, dan instansi mempercayakan perjalanan mereka di Bandung kepada {businessName}.
            </p>
          </div>

          {/* Grid Galeri Serah Terima */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {tenant.galleries.map((gal, idx) => (
              <div
                key={gal.id}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-sm border border-slate-200"
              >
                <img
                  src={gal.imageUrl}
                  alt={gal.caption || `Pelanggan Rental ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-[11px] font-bold leading-tight line-clamp-2">
                    {gal.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Cards */}
          {tenant.testimonials.length > 0 && (
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
                    {t.avatarUrl ? (
                      <img
                        src={t.avatarUrl}
                        alt={t.clientName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                        {t.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{t.clientName}</h4>
                      <p className="text-[11px] text-slate-500">{t.clientRole}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 10. LOKASI POOL & GOOGLE MAPS EMBED */}
      <section id="lokasi" className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                Lokasi Pool &amp; Kantor
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 mb-4">
                Pool Pusat {businessName}
              </h2>
              <div className="space-y-4 text-sm text-slate-600 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p>{dealerAddress}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-emerald-600 flex-shrink-0" />
                  <p>Operasional: 24 Jam (Antar-Jemput Standby)</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-emerald-600 flex-shrink-0" />
                  <p>Hotline Reservasi: <strong>{tenant.whatsappNumber}</strong></p>
                </div>
              </div>

              <a
                href={tenant.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(dealerAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md"
              >
                <span>Buka Rute di Google Maps</span>
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg border border-slate-300 h-80 bg-slate-200">
              <iframe
                title={`Peta Lokasi ${businessName}`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126750.56347862215!2d107.5731165243575!3d-6.890500041680749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sPasteur%2C%20Bandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid"
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
              {businessName}
            </p>
            <p className="mt-1">
              Solusi Sewa Mobil Lepas Kunci &amp; Wisata Bandung Terpercaya. Hak Cipta &copy; {new Date().getFullYear()}.
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
        businessName={businessName}
        themeColor={themeColor}
      />
    </div>
  );
}
