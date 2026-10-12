"use client";

import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Home,
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
  Layers,
  Compass,
  FileText,
  Calculator,
  Download,
  Check,
  Building2,
  BadgePercent,
  Maximize2,
  X,
  ChevronRight,
  Zap,
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

export default function PropertyTemplate({ tenant }: Props) {
  // Parsing metadata dinamis dari database (featureFlags)
  const flags = (tenant.featureFlags as Record<string, any>) || {};
  const businessName = tenant.businessName || "Grand Ciganitri Regency - Bandung";
  const geoCity = tenant.geoCity || "Bandung";
  const officeAddress = tenant.address || "Jl. Terusan Buah Batu No. 88, Bojongsoang, Bandung, Jawa Barat";
  const themeColor = tenant.themeColor || "#b45309"; // Warm Amber / Bronze Luxury

  const heroTitle = tenant.heroTitle || "Hunian Modern Tropis Premium di Bandung Selatan";
  const heroSubtitle =
    tenant.heroSubtitle ||
    "Lokasi strategis 10 menit dari Tol Buah Batu & Telkom University. Dapatkan promo DP 0%, Free Biaya KPR, dan Sertifikat SHM!";
  const heroBannerUrl = tenant.heroBannerUrl || "/assets/templates/property/hero-property.webp";

  const taglineBadge = flags.taglineBadge || "Exclusive Cluster & Smart Living • Hanya Tersedia 24 Unit";
  const developerName = flags.developerName || "PT Graha Mahakarya Propertindo";
  const agentProfile = flags.agentProfile || {
    name: "Riana Anggraini, S.Ars",
    role: "In-House Property Specialist",
    greeting:
      "Halo! Saya Riana, siap membantu konsultasi pemilihan kavling, perhitungan KPR bank syariah/konvensional, hingga jadwal survei lokasi.",
  };

  const heroHighlights: Array<{ label: string; value: string }> = flags.heroHighlights || [
    { label: "Promo DP", value: "0% / Bebas Uang Muka" },
    { label: "Sertifikat", value: "SHM Sudah Pecah per Kavling" },
    { label: "Akses Tol", value: "10 Menit Gerbang Buah Batu" },
  ];

  const commitments: string[] = flags.commitments || [
    "Jaminan Bangunan Bergaransi 1 Tahun",
    "Free Kanopi, Smart Door Lock & Toren Air",
    "Dibantu Proses Akad KPR sampai Lolos 100%",
    "Legalitas Clean & Clear (IMB/PBG Lengkap)",
  ];

  const facilityBadges: string[] = flags.facilityBadges || [
    "One Gate System & CCTV 24 Jam",
    "Clubhouse & Kolam Renang",
    "Jaringan Listrik & Fiber Optic Bawah Tanah",
    "Taman Hijau & Playground Ramah Anak",
  ];

  // Parsing katalog unit properti
  const units = tenant.catalogs.map((item) => {
    const specs = (item.specsJson as Record<string, any>) || {};
    return {
      ...item,
      landArea: specs.landArea || "84 m²",
      buildingArea: specs.buildingArea || "60 m²",
      bedrooms: specs.bedrooms || 3,
      bathrooms: specs.bathrooms || 2,
      floors: specs.floors || 2,
      carport: specs.carport || "1 Mobil",
      electricity: specs.electricity || "2200 VA",
      water: specs.water || "Jetpump Submersible",
      monthlyInstallment: specs.monthlyInstallment || "Mulai Rp 3,8 Jt/bln",
      floorplanUrl: specs.floorplanUrl || "/assets/templates/property/siteplan.webp",
      rawPrice: Number(item.price || 650000000),
    };
  });

  // State untuk Dual-Action Leads (KPR Simulator vs Site Visit)
  const [activeActionTab, setActiveActionTab] = useState<"kpr" | "survey">("kpr");

  // KPR Simulator State
  const [selectedUnitIndex, setSelectedUnitIndex] = useState<number>(0);
  const [dpPercent, setDpPercent] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [tenorYears, setTenorYears] = useState<number>(15);
  const [kprName, setKprName] = useState<string>("");
  const [kprPhone, setKprPhone] = useState<string>("");
  const [isSubmittingKpr, setIsSubmittingKpr] = useState<boolean>(false);

  // Perhitungan KPR Real-time
  const activeUnit = units[selectedUnitIndex] || units[0];
  const propertyPrice = activeUnit?.rawPrice || 650000000;
  const dpAmount = Math.round(propertyPrice * (dpPercent / 100));
  const loanAmount = Math.max(0, propertyPrice - dpAmount);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenorYears * 12;
  const estimatedMonthly =
    monthlyRate > 0 && totalMonths > 0
      ? Math.round(
          (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : Math.round(loanAmount / totalMonths);

  // Site Visit State
  const [surveyUnit, setSurveyUnit] = useState<string>(activeUnit?.title || "Rumah Tipe 60/84");
  const [surveyDate, setSurveyDate] = useState<string>("");
  const [surveyTime, setSurveyTime] = useState<string>("10:00 WIB (Pagi)");
  const [surveyName, setSurveyName] = useState<string>("");
  const [surveyPhone, setSurveyPhone] = useState<string>("");
  const [surveyNotes, setSurveyNotes] = useState<string>("");
  const [isSubmittingSurvey, setIsSubmittingSurvey] = useState<boolean>(false);

  // Modal Preview Denah / Siteplan
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Submit Handler: KPR Simulation
  const handleKprSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kprName || !kprPhone) {
      alert("Mohon lengkapi Nama dan Nomor WhatsApp.");
      return;
    }

    setIsSubmittingKpr(true);
    try {
      const res = await submitLeadAction({
        tenantId: tenant.id,
        name: kprName,
        phone: kprPhone,
        moduleType: "KPR_SIMULATION",
        details: {
          unit: activeUnit.title,
          harga: `Rp ${propertyPrice.toLocaleString("id-ID")}`,
          dp: `Rp ${dpAmount.toLocaleString("id-ID")} (${dpPercent}%)`,
          bunga: `${interestRate}%`,
          tenor: tenorYears,
          angsuran: `Rp ${estimatedMonthly.toLocaleString("id-ID")}`,
        },
      });

      if (res.success && res.whatsappUrl) {
        window.location.href = res.whatsappUrl;
      } else {
        alert(res.error || "Gagal memproses simulasi. Silakan hubungi via WhatsApp.");
      }
    } catch {
      alert("Terjadi kesalahan koneksi. Silakan coba kembali.");
    } finally {
      setIsSubmittingKpr(false);
    }
  };

  // Submit Handler: Site Visit Booking
  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyName || !surveyPhone || !surveyDate) {
      alert("Mohon lengkapi Nama, Nomor WhatsApp, dan Tanggal Kunjungan.");
      return;
    }

    setIsSubmittingSurvey(true);
    try {
      const res = await submitLeadAction({
        tenantId: tenant.id,
        name: surveyName,
        phone: surveyPhone,
        moduleType: "SITE_VISIT_BOOKING",
        details: {
          unit: surveyUnit,
          visitDate: surveyDate,
          visitTime: surveyTime,
          notes: surveyNotes || "Ingin survei unit dan konsultasi KPR",
        },
      });

      if (res.success && res.whatsappUrl) {
        window.location.href = res.whatsappUrl;
      } else {
        alert(res.error || "Gagal mendaftar survei. Silakan hubungi via WhatsApp.");
      }
    } catch {
      alert("Terjadi kesalahan koneksi. Silakan coba kembali.");
    } finally {
      setIsSubmittingSurvey(false);
    }
  };

  // Schema.org Structured Data RealEstateAgent
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: businessName,
    image: tenant.heroBannerUrl || "https://etalase.online/assets/templates/property/hero-property.webp",
    telephone: tenant.whatsappNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: officeAddress,
      addressLocality: geoCity,
      addressRegion: "Jawa Barat",
      postalCode: "40287",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: tenant.latitude || -6.9744,
      longitude: tenant.longitude || 107.6322,
    },
    url: `https://${tenant.customDomain}`,
    priceRange: "Rp 650.000.000 - Rp 1.850.000.000",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:30",
        closes: "17:30",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-600 selection:text-white pb-20">
      {/* JSON-LD Schema.org SEO RealEstateAgent */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. TOP ANNOUNCEMENT BAR (GEO TRUST) */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-stone-200 text-xs sm:text-sm font-medium py-2.5 px-4 border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-500/30">
              Galeri Resmi
            </span>
            <span>Galeri Pemasaran Resmi &amp; Booking Survey Lokasi {geoCity}</span>
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs">
              <Clock size={13} className="text-amber-400" /> Buka Setiap Hari (08.30 - 17.30 WIB)
            </span>
            <a
              href={`tel:${tenant.whatsappNumber}`}
              className="font-bold hover:text-amber-300 flex items-center gap-1 text-white transition-colors"
            >
              <Phone size={13} className="text-amber-400" /> {tenant.whatsappNumber}
            </a>
          </div>
        </div>
      </div>

      {/* 2. STICKY NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-amber-600/40 shadow-sm bg-stone-900 flex items-center justify-center flex-shrink-0">
              {tenant.logoUrl ? (
                <img
                  src={tenant.logoUrl}
                  alt={businessName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="text-amber-400" size={24} />
              )}
            </div>
            <div>
              <span className="font-black text-base sm:text-lg text-stone-950 leading-tight block">
                {businessName}
              </span>
              <p className="text-[11px] sm:text-xs text-amber-700 font-semibold tracking-wide">
                {developerName}
              </p>
            </div>
          </div>

          {/* Jump Links Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-stone-600">
            <a href="#tipe-unit" className="hover:text-amber-700 transition-colors">
              Pilihan Tipe Unit
            </a>
            <a href="#fasilitas" className="hover:text-amber-700 transition-colors">
              Fasilitas Cluster
            </a>
            <a href="#simulasi-kpr" className="hover:text-amber-700 transition-colors">
              Simulasi KPR
            </a>
            <a href="#survei-lokasi" className="hover:text-amber-700 transition-colors">
              Jadwal Survei
            </a>
            <a href="#legalitas" className="hover:text-amber-700 transition-colors">
              Legalitas &amp; Testimoni
            </a>
            <a href="#lokasi" className="hover:text-amber-700 transition-colors">
              Lokasi Galeri
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="#survei-lokasi"
              className="hidden sm:inline-flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
            >
              <Calendar size={14} className="text-amber-700" />
              <span>Jadwal Survei</span>
            </a>
            <a
              href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(
                `Halo ${agentProfile.name}, saya tertarik dengan info perumahan di ${businessName}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-amber-600/20 transition-all hover:scale-[1.02]"
            >
              <MessageCircle size={16} />
              <span>Chat WA Riana</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. SPLIT-SCREEN EDITORIAL ARCHITECTURAL HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-14 sm:py-20 lg:py-24 border-b border-stone-800">
        {/* Soft background ambient warmth */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-amber-600/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-700/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Kiri (6 Kolom): Headline, Value Highlights, CTA */}
            <div className="lg:col-span-6 text-left">
              <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-amber-500/30">
                <Sparkles size={14} className="text-amber-400" />
                <span>{taglineBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-6">
                {heroTitle}
              </h1>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-8 max-w-xl">
                {heroSubtitle}
              </p>

              {/* 3 Kartu Mini Highlight Arsitektur */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {heroHighlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="bg-stone-900/80 border border-stone-800 rounded-2xl p-3 sm:p-4 backdrop-blur-sm"
                  >
                    <p className="text-[10px] sm:text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
                      {hl.label}
                    </p>
                    <p className="text-xs sm:text-sm font-black text-white leading-snug">
                      {hl.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                <a
                  href="#tipe-unit"
                  className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm shadow-xl shadow-amber-600/25 transition-all hover:scale-[1.02]"
                >
                  <Home size={16} />
                  <span>Lihat Pilihan Tipe Unit</span>
                </a>
                <a
                  href="#simulasi-kpr"
                  className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-200 font-bold px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm border border-stone-700 transition-all"
                >
                  <Calculator size={16} className="text-amber-400" />
                  <span>Hitung Simulasi KPR</span>
                </a>
              </div>

              {/* 4 Komitmen Pengembang */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-6 border-t border-stone-800 text-xs text-stone-300">
                {commitments.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-amber-400 flex-shrink-0" />
                    <span className="truncate">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kanan (6 Kolom): Hero Image Fasad Berbingkai Elegan + Floating Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-600/30 shadow-2xl bg-stone-900 group">
                <img
                  src={heroBannerUrl}
                  alt={businessName}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Overlay Elegan */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                {/* Floating Badge Promo di Sudut Kanan Atas */}
                <div className="absolute top-4 right-4 bg-stone-950/90 backdrop-blur-md border border-amber-500/40 px-4 py-2.5 rounded-2xl shadow-xl max-w-xs text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <BadgePercent size={15} className="text-amber-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Promo Terbatas
                    </span>
                  </div>
                  <p className="text-xs font-black text-white leading-tight">
                    Subsidi Biaya KPR s/d Rp 25 Juta &amp; Free Canopy
                  </p>
                </div>

                {/* Banner Info Bawah Gambar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-300 bg-stone-900/90 backdrop-blur-md border border-stone-800 p-3 rounded-2xl">
                  <div>
                    <span className="block text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                      Developer Utama
                    </span>
                    <strong className="text-white text-xs">{developerName}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalImage(heroBannerUrl)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300"
                  >
                    <Maximize2 size={13} />
                    <span>Perbesar Foto</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FASILITAS KAWASAN CLUSTER (AMENITIES GRID) */}
      <section id="fasilitas" className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200">
              Kenyamanan &amp; Keamanan
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-950 mt-3 mb-3">
              Fasilitas Cluster Eksklusif
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              Dibangun dengan standar lingkungan asri, jaringan infrastruktur modern, dan sistem keamanan 24 jam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityBadges.map((badge, idx) => (
              <div
                key={idx}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-6 hover:border-amber-600/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 font-black">
                    {idx === 0 ? (
                      <ShieldCheck size={24} />
                    ) : idx === 1 ? (
                      <Layers size={24} />
                    ) : idx === 2 ? (
                      <Zap size={24} />
                    ) : (
                      <Compass size={24} />
                    )}
                  </div>
                  <h3 className="font-extrabold text-base text-stone-900 mb-1">{badge}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Standar kenyamanan premium untuk menunjang gaya hidup sehat keluarga Anda di Bandung.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SHOWCASE PILIHAN TIPE UNIT (ARCHITECTURAL CARDS) */}
      <section id="tipe-unit" className="py-16 sm:py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-3.5 py-1 rounded-full border border-amber-300">
              Katalog Tipe Rumah
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-950 mt-3 mb-3">
              Pilihan Tipe Unit Hunian &amp; Komersial
            </h2>
            <p className="text-stone-600 text-xs sm:text-base">
              Setiap unit dirancang dengan pencahayaan optimal, sirkulasi udara alami, dan material bergaransi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {units.map((unit, idx) => (
              <div
                key={unit.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Foto Fasad Unit */}
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden group">
                    <img
                      src={unit.imageUrl}
                      alt={unit.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-amber-700 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {unit.category || "Tipe Favorit"}
                    </div>
                    <div className="absolute top-3 right-3 bg-stone-950/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {unit.monthlyInstallment}
                    </div>

                    <button
                      type="button"
                      onClick={() => setModalImage(unit.imageUrl)}
                      className="absolute bottom-3 right-3 bg-stone-950/70 hover:bg-stone-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-md flex items-center gap-1 transition-colors"
                    >
                      <Maximize2 size={13} />
                      <span>Foto Fasad</span>
                    </button>
                  </div>

                  {/* Konten Unit */}
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-black text-xl text-stone-950">{unit.title}</h3>
                      <p className="font-black text-lg text-amber-700">
                        {unit.pricePrefix}{" "}
                        <span className="text-xl">
                          Rp {(unit.rawPrice / 1_000_000).toLocaleString("id-ID")} Jt
                        </span>
                      </p>
                    </div>

                    <p className="text-xs text-stone-500 mb-5 leading-relaxed">
                      {unit.description}
                    </p>

                    {/* Badge Spesifikasi Arsitektur */}
                    <div className="grid grid-cols-4 gap-2 text-center text-xs text-stone-600 mb-6 py-3 border-y border-stone-100 bg-stone-50/60 rounded-2xl">
                      <div>
                        <span className="block text-[10px] text-stone-400 font-bold uppercase">Luas Tanah</span>
                        <strong className="text-stone-900 text-xs sm:text-sm font-black">{unit.landArea}</strong>
                      </div>
                      <div>
                        <span className="block text-[10px] text-stone-400 font-bold uppercase">Bangunan</span>
                        <strong className="text-stone-900 text-xs sm:text-sm font-black">{unit.buildingArea}</strong>
                      </div>
                      <div>
                        <span className="block text-[10px] text-stone-400 font-bold uppercase">Kamar Tidur</span>
                        <strong className="text-stone-900 text-xs sm:text-sm font-black">{unit.bedrooms} KT</strong>
                      </div>
                      <div>
                        <span className="block text-[10px] text-stone-400 font-bold uppercase">Kamar Mandi</span>
                        <strong className="text-stone-900 text-xs sm:text-sm font-black">{unit.bathrooms} KM</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 mb-2">
                      <span>Carport: <strong>{unit.carport}</strong></span>
                      <span>Listrik: <strong>{unit.electricity}</strong></span>
                      <span>Air: <strong>{unit.water}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Tombol Action */}
                <div className="p-6 sm:p-7 pt-0 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUnitIndex(idx);
                      setActiveActionTab("kpr");
                      const el = document.getElementById("simulasi-kpr");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-3 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20"
                  >
                    <Calculator size={14} />
                    <span>Simulasi KPR Unit Ini</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSurveyUnit(unit.title);
                      setActiveActionTab("survey");
                      const el = document.getElementById("survei-lokasi");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Calendar size={14} className="text-amber-400" />
                    <span>Survei</span>
                  </button>
                  <a
                    href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(
                      `Halo ${agentProfile.name}, saya minta pricelist & brosur lengkap untuk *${unit.title}*.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-stone-100 hover:bg-stone-200 text-stone-700 p-3 rounded-xl text-xs transition-colors flex items-center justify-center"
                    title="Minta Brosur via WA"
                  >
                    <MessageCircle size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DUAL-ACTION: KALKULATOR SIMULASI KPR & BOOKING JADWAL SURVEI */}
      <section id="simulasi-kpr" className="py-16 sm:py-24 bg-stone-900 text-white relative">
        <div id="survei-lokasi" className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800/80 px-3.5 py-1.5 rounded-full">
              Layanan Interaktif Calon Pembeli
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-3">
              Kalkulator KPR &amp; Janji Temu Survei Lokasi
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Rencanakan anggaran pembelian rumah Anda secara transparan atau jadwalkan pendampingan survei kavling bersama agen resmi.
            </p>

            {/* Tab Switcher */}
            <div className="flex justify-center gap-2 mt-8">
              <button
                type="button"
                onClick={() => setActiveActionTab("kpr")}
                className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  activeActionTab === "kpr"
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                    : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
                }`}
              >
                <Calculator size={16} />
                <span>Simulasi Angsuran KPR</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveActionTab("survey")}
                className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  activeActionTab === "survey"
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                    : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
                }`}
              >
                <Calendar size={16} />
                <span>Formulir Survei Lokasi</span>
              </button>
            </div>
          </div>

          {/* TAB 1: KALKULATOR KPR */}
          {activeActionTab === "kpr" && (
            <div className="max-w-4xl mx-auto bg-stone-950/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
              <form onSubmit={handleKprSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pilihan Unit Rumah */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      1. Pilih Tipe Rumah
                    </label>
                    <select
                      value={selectedUnitIndex}
                      onChange={(e) => setSelectedUnitIndex(Number(e.target.value))}
                      className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-amber-500"
                    >
                      {units.map((u, i) => (
                        <option key={u.id} value={i}>
                          {u.title} — Rp {(u.rawPrice / 1_000_000).toLocaleString("id-ID")} Jt
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Input DP (%) */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-300">
                        2. Uang Muka (DP): {dpPercent}%
                      </label>
                      <span className="text-xs font-bold text-amber-400">
                        Rp {dpAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[0, 5, 10, 15, 20].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setDpPercent(pct)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                            dpPercent === pct
                              ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/30"
                              : "bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700"
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Suku Bunga Bank */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      3. Asumsi Suku Bunga Bank: {interestRate}% / Thn
                    </label>
                    <input
                      type="range"
                      min="3.5"
                      max="9.0"
                      step="0.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                      <span>3.5% (Promo Fix)</span>
                      <span>5.5% (Standard)</span>
                      <span>9.0% (Floating)</span>
                    </div>
                  </div>

                  {/* Tenor KPR */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      4. Jangka Waktu (Tenor): {tenorYears} Tahun
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[5, 10, 15, 20].map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setTenorYears(yr)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                            tenorYears === yr
                              ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/30"
                              : "bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700"
                          }`}
                        >
                          {yr} Thn
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Box Hasil Estimasi Angsuran */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                      Estimasi Angsuran KPR Bulanan:
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                      Rp {estimatedMonthly.toLocaleString("id-ID")}{" "}
                      <span className="text-xs font-normal text-stone-300">/ bulan</span>
                    </h3>
                    <p className="text-[11px] text-stone-400 mt-1">
                      Pokok Pinjaman: Rp {loanAmount.toLocaleString("id-ID")} • Tenor: {totalMonths} Bulan
                    </p>
                  </div>

                  <div className="w-full sm:w-auto text-right">
                    <span className="inline-block text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full">
                      ✓ Promo DP 0% Berlaku
                    </span>
                  </div>
                </div>

                {/* Input Kontak Konsumen */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-800">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Nama Lengkap Anda
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bpk. Irfan Maulana"
                      value={kprName}
                      onChange={(e) => setKprName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Nomor WhatsApp Aktif
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081298765432"
                      value={kprPhone}
                      onChange={(e) => setKprPhone(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingKpr}
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-black py-4 px-6 rounded-2xl text-base shadow-xl shadow-amber-600/30 transition-all hover:scale-[1.01]"
                >
                  <MessageCircle size={18} />
                  <span>
                    {isSubmittingKpr
                      ? "Memproses Hasil Simulasi..."
                      : "Kirim Hasil Simulasi KPR & Konsultasi ke WhatsApp"}
                  </span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: FORMULIR SURVEI LOKASI */}
          {activeActionTab === "survey" && (
            <div className="max-w-4xl mx-auto bg-stone-950/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
              <form onSubmit={handleSurveySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      1. Unit yang Ingin Disurvei
                    </label>
                    <select
                      value={surveyUnit}
                      onChange={(e) => setSurveyUnit(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-amber-500"
                    >
                      {units.map((u) => (
                        <option key={u.id} value={u.title}>
                          {u.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      2. Tanggal Rencana Kunjungan
                    </label>
                    <input
                      type="date"
                      required
                      value={surveyDate}
                      onChange={(e) => setSurveyDate(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      3. Estimasi Jam Kunjungan
                    </label>
                    <select
                      value={surveyTime}
                      onChange={(e) => setSurveyTime(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-amber-500"
                    >
                      <option value="10:00 WIB (Pagi)">10:00 WIB (Pagi)</option>
                      <option value="13:30 WIB (Siang)">13:30 WIB (Siang)</option>
                      <option value="15:30 WIB (Sore)">15:30 WIB (Sore)</option>
                      <option value="Weekend Sesuai Janji">Weekend (Sabtu / Minggu)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      4. Catatan / Preferensi Khusus
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Mau lihat kavling hook / denah custom"
                      value={surveyNotes}
                      onChange={(e) => setSurveyNotes(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      5. Nama Lengkap Anda
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ibu Dian Anggraeni"
                      value={surveyName}
                      onChange={(e) => setSurveyName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      6. Nomor WhatsApp Aktif
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081312345678"
                      value={surveyPhone}
                      onChange={(e) => setSurveyPhone(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800">
                  <button
                    type="submit"
                    disabled={isSubmittingSurvey}
                    className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-black py-4 px-6 rounded-2xl text-base shadow-xl shadow-amber-600/30 transition-all hover:scale-[1.01]"
                  >
                    <Calendar size={18} />
                    <span>
                      {isSubmittingSurvey
                        ? "Mendaftarkan Jadwal..."
                        : "Konfirmasi Jadwal Survei ke WhatsApp Agen"}
                    </span>
                  </button>
                  <p className="text-center text-xs text-stone-400 mt-3">
                    Layanan survei dan konsultasi tata ruang gratis tanpa dipungut biaya apapun.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* 7. PROFIL IN-HOUSE PROPERTY SPECIALIST (TRUST BUILDER) */}
      <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-stone-50 border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-amber-600/40 shadow-lg bg-stone-900 flex-shrink-0">
              <img
                src={tenant.logoUrl || "/assets/templates/property/agent-profile.webp"}
                alt={agentProfile.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-left flex-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                In-House Property Specialist
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-950 mt-2 mb-1">
                {agentProfile.name}
              </h3>
              <p className="text-xs font-semibold text-amber-700 mb-4">
                {agentProfile.role} • {businessName}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 italic">
                &ldquo;{agentProfile.greeting}&rdquo;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 pt-4 border-t border-stone-200">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-amber-600 flex-shrink-0" />
                  <span>Pendampingan Berkas Bank BSI, BCA, Mandiri &amp; BTN</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-amber-600 flex-shrink-0" />
                  <span>Konsultasi Denah &amp; Custom Layout Arsitektur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BUKTI KONSUMEN, SERAH TERIMA & TESTIMONI (SOCIAL PROOF) */}
      <section id="legalitas" className="py-16 sm:py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-3.5 py-1 rounded-full border border-amber-300">
              Dokumentasi &amp; Legalitas
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-950 mt-3 mb-3">
              Bukti Serah Terima Kunci &amp; Akad Konsumen
            </h2>
            <p className="text-stone-600 text-xs sm:text-base">
              Legalitas terjamin (SHM &amp; PBG Lengkap) dan puluhan keluarga telah menempati rumah impian mereka di {businessName}.
            </p>
          </div>

          {/* Galeri Serah Terima */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {tenant.galleries.map((gal, idx) => (
              <div
                key={gal.id}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 shadow-sm border border-stone-200"
              >
                <img
                  src={gal.imageUrl}
                  alt={gal.caption || `Serah Terima Unit ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex items-end p-3 opacity-90 group-hover:opacity-100 transition-opacity">
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
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 text-amber-500 mb-3">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic mb-4">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                    {t.avatarUrl ? (
                      <img
                        src={t.avatarUrl}
                        alt={t.clientName}
                        className="w-10 h-10 rounded-full object-cover border border-stone-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm">
                        {t.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-black text-stone-950">{t.clientName}</h4>
                      <p className="text-[11px] text-stone-500">{t.clientRole}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 9. LOKASI POOL / GALERI PEMASARAN & GOOGLE MAPS */}
      <section id="lokasi" className="py-16 sm:py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                Peta &amp; Galeri Pemasaran
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 mt-3 mb-4">
                Kunjungi Galeri Pemasaran {businessName}
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-stone-600 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-amber-700 flex-shrink-0 mt-0.5" />
                  <p>{officeAddress}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-amber-700 flex-shrink-0" />
                  <p>Jam Kunjungan: 08.30 - 17.30 WIB (Buka Setiap Hari)</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-amber-700 flex-shrink-0" />
                  <p>
                    Hotline Marketing: <strong>{tenant.whatsappNumber}</strong>
                  </p>
                </div>
              </div>

              <a
                href={
                  tenant.googleMapsUrl ||
                  `https://maps.google.com/?q=${encodeURIComponent(officeAddress)}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
              >
                <span>Buka Rute di Google Maps</span>
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg border border-stone-300 h-80 bg-stone-200">
              <iframe
                title={`Peta Lokasi ${businessName}`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126732.3276708778!2d107.6186807!3d-6.9744093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9bb8b8e0b6b%3A0x6b6c7c8c8c8c8c8c!2sBojongsoang%2C%20Bandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. MODAL PREVIEW FOTO / DENAH */}
      {modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-md p-4">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-700">
            <button
              type="button"
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 z-10 text-white bg-stone-800/80 hover:bg-stone-700 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <img
              src={modalImage}
              alt="Preview Properti"
              className="w-full max-h-[80vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}

      {/* 11. FOOTER */}
      <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-white text-sm">{businessName}</p>
            <p className="mt-1">
              {developerName} • Hak Cipta &copy; {new Date().getFullYear()}. Seluruh Hak Dilindungi.
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
