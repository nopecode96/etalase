"use client";

import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Sparkles,
  Clock,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Check,
  Truck,
  Shirt,
  Layers,
  Scale,
  Droplets,
  Zap,
  Star,
  ChevronRight,
  Info,
  BadgeCheck,
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

export default function GeneralTemplate({ tenant }: Props) {
  // Parsing metadata dinamis dari database (featureFlags)
  const flags = (tenant.featureFlags as Record<string, any>) || {};
  const businessName = tenant.businessName || "Bastian Clean & Care - Premium Laundry Bandung";
  const geoCity = tenant.geoCity || "Bandung";
  const address = tenant.address || "Jl. Dago (Ir. H. Djuanda) No. 92, Coblong, Kota Bandung, Jawa Barat";
  const themeColor = tenant.themeColor || "#0284c7"; // Fresh Sky Blue

  const heroTitle =
    tenant.heroTitle || "Jasa Laundry Kiloan & Satuan Premium dengan Layanan Antar Jemput Gratis";
  const heroSubtitle =
    tenant.heroSubtitle ||
    "Pakaian bersih higienis, wangi tahan lama, dan disetrika uap rapi. Standar 1 Mesin 1 Pelanggan tanpa risiko tertukar atau luntur!";
  const heroBannerUrl = tenant.heroBannerUrl || "/assets/templates/laundry/hero-laundry.webp";
  const logoUrl = tenant.logoUrl || "/assets/templates/laundry/logo-laundry.webp";

  const taglineBadge =
    flags.taglineBadge || "Layanan Antar Jemput Laundry Bandung • Gratis Ongkir Radius 5 KM";
  const operatingHours = flags.operatingHours || "Setiap Hari: 07.30 - 20.00 WIB";
  const statusBadge = flags.statusBadge || "Kurir Pickup Aktif Hari Ini: 07.30 - 20.00 WIB";

  const serviceHighlights: Array<{ label: string; value: string }> = flags.serviceHighlights || [
    { label: "Higienis Terjamin", value: "1 Mesin Cuci Khusus 1 Pelanggan (Tidak Dicampur)" },
    { label: "Setrika Uap", value: "Setrika Uap Boiler (Pakaian Tidak Mengkilap & Rapi)" },
    { label: "Deterjen Khusus", value: "Deterjen Ramah Serat Kain & Parfum Grade Premium" },
  ];

  const commitments: string[] = flags.commitments || [
    "Jaminan Garansi Cuci Ulang Jika Kurang Bersih / Harum",
    "Timbangan Digital Akurat dan Transparan di Hadapan Anda",
    "Pemisahan Bahan Sensitif (Batik, Sutra, Wol)",
    "Gratis Antar Jemput Wilayah Bandung Kota (Radius 5 KM)",
  ];

  const processSteps: Array<{ step: string; title: string; desc: string }> = flags.processSteps || [
    { step: "01", title: "Pesan & Jadwalkan Pickup", desc: "Isi form online atau chat WA, kurir kami jemput ke rumah, kos, atau kantor Anda." },
    { step: "02", title: "Sortir & Timbang Digital", desc: "Pakaian dicek kondisi noda dan ditimbang transparan di hadapan Anda / via video." },
    { step: "03", title: "Cuci Higienis & Uap Boiler", desc: "Dicuci tersendiri menggunakan mesin komersial dan disetrika uap profesional." },
    { step: "04", title: "Packing Rapi & Diantar Balik", desc: "Dipacking plastik kedap wangi dan langsung diantar kembali tepat waktu." },
  ];

  // Parsing katalog layanan laundry
  const services = tenant.catalogs.map((item) => {
    const specs = (item.specsJson as Record<string, any>) || {};
    return {
      ...item,
      category: item.category || "Kiloan Reguler",
      duration: specs.duration || "2 Hari Kerja",
      unitType: specs.unitType || "Per Kg",
      includes: (specs.includes as string[]) || ["Cuci Bersih Higienis", "Setrika Uap Boiler"],
      isExpressAvailable: !!specs.isExpressAvailable,
      rawPrice: Number(item.price || 0),
    };
  });

  // State Filter Kategori Layanan
  const [activeCategory, setActiveCategory] = useState<string>("Semua Layanan");

  const categories = [
    "Semua Layanan",
    "Kiloan Reguler",
    "Kiloan Express",
    "Satuan Eksklusif",
    "Sepatu & Tas",
    "Bedding & Karpet",
  ];

  const filteredServices =
    activeCategory === "Semua Layanan"
      ? services
      : services.filter(
          (s) =>
            s.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
            activeCategory.toLowerCase().includes(s.category.toLowerCase())
        );

  // State Formulir Booking & Kalkulator Pickup (Dual-Action Lead)
  const defaultServiceTitle = services[0]?.title || "Cuci Komplit Kiloan Premium";
  const [selectedService, setSelectedService] = useState<string>(defaultServiceTitle);
  const [estimatedQty, setEstimatedQty] = useState<number>(5);
  const [speedPackage, setSpeedPackage] = useState<string>("Reguler");
  const [pickupDate, setPickupDate] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>("09:00 - 11:00 WIB");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [customerNotes, setCustomerNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Hitung estimasi harga live
  const activeSelectedObj = services.find((s) => s.title === selectedService) || services[0];
  const unitPrice = activeSelectedObj ? activeSelectedObj.rawPrice : 8000;
  const estimatedCost = unitPrice * Math.max(1, estimatedQty);

  // Handler Pilih Paket dari Katalog
  const handleSelectServiceFromCatalog = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const element = document.getElementById("estimasi-biaya");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handler Submit Lead & Redirect WhatsApp
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerPhone || !customerAddress) {
      alert("Mohon lengkapi Nama Lengkap, Nomor WhatsApp, dan Alamat Penjemputan.");
      return;
    }

    setIsSubmitting(true);
    try {
      const unitLabel = activeSelectedObj?.unitType?.includes("Kg") ? "Kg" : "Pcs/Pasang";
      const res = await submitLeadAction({
        tenantId: tenant.id,
        name: customerName,
        phone: customerPhone,
        moduleType: "LAUNDRY_PICKUP",
        details: {
          service: selectedService,
          weightOrPieces: `${estimatedQty} ${unitLabel} (Est. Rp ${estimatedCost.toLocaleString("id-ID")})`,
          speedPackage: speedPackage,
          pickupDate: pickupDate || "Hari Ini / Secepatnya",
          pickupTime: pickupTime,
          address: customerAddress,
          notes: customerNotes || "Penjemputan laundry reguler",
        },
      });

      if (res.success && res.whatsappUrl) {
        window.location.href = res.whatsappUrl;
      } else {
        alert(res.error || "Gagal memproses permintaan pickup. Silakan hubungi via WhatsApp.");
      }
    } catch {
      alert("Terjadi kendala koneksi. Silakan coba kembali.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Schema.org Structured Data DryCleaningOrLaundry
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    name: businessName,
    image: tenant.heroBannerUrl || "https://etalase.online/assets/templates/laundry/hero-laundry.webp",
    telephone: tenant.whatsappNumber,
    email: tenant.contactEmail || "care@jasaprofesional.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: geoCity,
      addressRegion: "Jawa Barat",
      postalCode: "40135",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: tenant.latitude || -6.8856,
      longitude: tenant.longitude || 107.6142,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:30",
        closes: "20:00",
      },
    ],
    priceRange: "Rp 8.000 - Rp 50.000",
    url: `https://${tenant.customDomain}`,
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-sky-950 text-sky-100 text-xs sm:text-sm py-2.5 px-4 sm:px-6 border-b border-sky-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-sky-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {statusBadge}
            </span>
            <span className="hidden md:inline-block text-sky-700">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-sky-200">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              {operatingHours}
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden sm:flex items-center gap-1 text-sky-300">
              <Truck className="w-3.5 h-3.5 text-sky-400" />
              Gratis Antar Jemput Radius 5 KM
            </span>
            <a
              href={`https://wa.me/${tenant.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-sky-800/80 hover:bg-sky-700 text-sky-100 px-3 py-1 rounded-full text-xs font-semibold transition"
            >
              <Phone className="w-3 h-3 text-sky-300" />
              <span>+{tenant.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* STICKY MAIN HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 p-0.5 shadow-md shadow-sky-600/20 flex items-center justify-center overflow-hidden">
              <img
                src={logoUrl}
                alt={businessName}
                className="w-full h-full object-cover rounded-[10px]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-sky-600 transition flex items-center gap-1.5">
                {businessName}
                <BadgeCheck className="w-4 h-4 text-sky-500" />
              </span>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Layanan Laundry Kiloan & Satuan Higienis
              </p>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#paket-layanan" className="hover:text-sky-600 transition">
              Paket & Tarif
            </a>
            <a href="#alur-proses" className="hover:text-sky-600 transition">
              Alur Jemput
            </a>
            <a href="#estimasi-biaya" className="hover:text-sky-600 transition">
              Kalkulator Pickup
            </a>
            <a href="#galeri-workshop" className="hover:text-sky-600 transition">
              Workshop
            </a>
            <a href="#testimoni" className="hover:text-sky-600 transition">
              Ulasan Pelanggan
            </a>
            <a href="#lokasi" className="hover:text-sky-600 transition">
              Outlet & Peta
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="#estimasi-biaya"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl shadow-md shadow-sky-600/25 transition active:scale-95"
            >
              <Truck className="w-4 h-4" />
              <span>Jadwalkan Pickup</span>
            </a>
            <a
              href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent("Halo Admin " + businessName + ", saya ingin tanya layanan laundry antar jemput.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2.5 rounded-xl shadow-sm transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Chat WA</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION (Fresh Sky & Mint Architecture) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-cyan-50/30 to-slate-50 pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-sky-100">
        <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline & Value Propositions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 bg-sky-100/90 text-sky-800 border border-sky-200/80 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>{taglineBadge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
                {heroTitle}
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {heroSubtitle}
              </p>

              {/* 3 Mini Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                {serviceHighlights.map((hl, i) => (
                  <div
                    key={i}
                    className="bg-white/80 backdrop-blur-sm border border-sky-100 rounded-2xl p-3.5 shadow-sm hover:border-sky-300 transition"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-xs">
                        {i === 0 ? <Shirt className="w-3.5 h-3.5" /> : i === 1 ? <Droplets className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{hl.label}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">{hl.value}</p>
                  </div>
                ))}
              </div>

              {/* Dual Hero CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="#estimasi-biaya"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-sky-600/30 text-sm sm:text-base transition active:scale-95"
                >
                  <Truck className="w-5 h-5" />
                  <span>Pesan Jemput Sekarang</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
                <a
                  href="#paket-layanan"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300/80 font-semibold px-6 py-3.5 rounded-xl text-sm sm:text-base shadow-xs transition"
                >
                  <Scale className="w-4 h-4 text-sky-600" />
                  <span>Cek Tarif & Layanan</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-sky-400/20 via-teal-400/20 to-blue-400/20 rounded-3xl blur-2xl -z-10" />

                {/* Main Image Frame */}
                <div className="relative bg-white p-2.5 rounded-3xl shadow-2xl border border-sky-100 overflow-hidden">
                  <img
                    src={heroBannerUrl}
                    alt={businessName}
                    className="w-full h-[360px] sm:h-[440px] object-cover rounded-2xl"
                  />

                  {/* Floating Badge 1: Top Right */}
                  <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md border border-emerald-100 shadow-lg rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">Garansi Cuci Ulang</p>
                      <p className="text-[11px] text-emerald-600 font-medium">100% Puas & Bebas Apek</p>
                    </div>
                  </div>

                  {/* Floating Badge 2: Bottom Left */}
                  <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md border border-sky-100 shadow-lg rounded-2xl p-3 flex items-center gap-3 max-w-[240px]">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">Antar Jemput Cepat</p>
                      <p className="text-[11px] text-slate-500 leading-snug">Kurir aktif Dago & Bandung Kota</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / ALUR 4 LANGKAH JEMPUT CUCIAN */}
      <section id="alur-proses" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Alur Layanan Praktis
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Cucian Bersih Sempurna Tanpa Perlu Keluar Rumah
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Proses transparan, cepat, dan higienis dari depan pintu Anda hingga kembali rapi ke lemari.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-sky-400 hover:bg-sky-50/40 transition duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-sky-600/30 group-hover:text-sky-600 transition">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 group-hover:border-sky-300 shadow-xs flex items-center justify-center text-sky-600">
                    {idx === 0 ? (
                      <Calendar className="w-5 h-5" />
                    ) : idx === 1 ? (
                      <Scale className="w-5 h-5" />
                    ) : idx === 2 ? (
                      <Droplets className="w-5 h-5" />
                    ) : (
                      <Truck className="w-5 h-5" />
                    )}
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KATALOG PAKET LAYANAN & DAFTAR HARGA */}
      <section id="paket-layanan" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
                Pilihan Paket & Tarif
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                Tarif Transparan & Berkualitas Tinggi
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Pilih paket kiloan untuk pakaian sehari-hari atau perawatan satuan khusus.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition ${
                    activeCategory === cat
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/25"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-300 transition duration-300 flex flex-col group"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-sky-800 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {service.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-400" />
                    <span>{service.duration}</span>
                  </div>
                  {service.isExpressAvailable && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      <span>Express Ready</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Price Block */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline gap-2">
                      <span className="text-xs font-medium text-slate-400">
                        {service.pricePrefix || "Mulai"}
                      </span>
                      <span className="text-2xl font-black text-sky-600">
                        Rp {Number(service.price).toLocaleString("id-ID")}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        / {service.unitType}
                      </span>
                    </div>

                    {/* Checklist Includes */}
                    <ul className="mt-4 space-y-2">
                      {service.includes.map((inc, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Choose Service CTA */}
                  <button
                    onClick={() => handleSelectServiceFromCatalog(service.title)}
                    className="w-full mt-4 bg-slate-100 hover:bg-sky-600 text-slate-800 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Pilih Paket & Jadwalkan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KALKULATOR ESTIMASI BIAYA & FORMULIR BOOKING PICKUP (DUAL-ACTION LEAD) */}
      <section id="estimasi-biaya" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-sky-900 via-sky-950 to-slate-950 rounded-3xl text-white shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden relative">
            {/* Ambient Background Circles */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-10 items-start relative z-10">
              {/* Left Column: Information & Live Estimate Card */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800">
                    Dual-Action Pickup Engine
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3 tracking-tight">
                    Hitung Estimasi Biaya & Jadwalkan Penjemputan
                  </h2>
                  <p className="text-sm text-sky-200/90 mt-2 leading-relaxed">
                    Kurir kami menjemput cucian langsung ke depan pintu Anda. Data pemesanan tercatat otomatis di sistem dan dialihkan langsung ke obrolan WhatsApp kurir.
                  </p>
                </div>

                {/* Live Estimation Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-4">
                  <div className="flex items-center justify-between text-xs text-sky-200">
                    <span>Layanan Terpilih:</span>
                    <span className="font-bold text-white text-right">{selectedService}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-sky-200">
                    <span>Estimasi Jumlah Cucian:</span>
                    <span className="font-bold text-white">
                      {estimatedQty} {activeSelectedObj?.unitType?.includes("Kg") ? "Kg" : "Pcs/Pasang"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-sky-200">
                    <span>Paket Kecepatan:</span>
                    <span className="font-bold text-teal-300">{speedPackage}</span>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                    <div>
                      <p className="text-xs text-sky-300 font-medium">Estimasi Total Biaya:</p>
                      <p className="text-[11px] text-sky-400">
                        *Ditimbang ulang secara presisi di lokasi
                      </p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                      Rp {estimatedCost.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Pickup Highlights */}
                <div className="space-y-2.5 text-xs text-sky-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Gratis biaya penjemputan & pengantaran (Radius 5 KM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Timbangan digital transparan dibawa langsung oleh kurir</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Garansi cuci ulang 100% jika hasil belum maksimal</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Booking Form */}
              <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl">
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Pilih Layanan */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Pilih Paket Layanan
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title} ({s.pricePrefix} Rp {s.rawPrice.toLocaleString("id-ID")} / {s.unitType})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Estimasi Jumlah Cucian */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Estimasi Jumlah (Kg atau Pcs)
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={estimatedQty}
                          onChange={(e) => setEstimatedQty(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                          required
                        />
                      </div>
                    </div>

                    {/* Opsi Kecepatan */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Paket Kecepatan
                      </label>
                      <select
                        value={speedPackage}
                        onChange={(e) => setSpeedPackage(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                      >
                        <option value="Reguler (2 Hari Kerja)">Reguler (2 Hari Kerja)</option>
                        <option value="Kilat Express (6 Jam Selesai)">Kilat Express (6 Jam Selesai)</option>
                        <option value="Next Day (1 Hari Selesai)">Next Day (1 Hari Selesai)</option>
                      </select>
                    </div>

                    {/* Tanggal Pickup */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tanggal Penjemputan
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                      />
                    </div>

                    {/* Waktu Pickup */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Waktu / Slot Penjemputan
                      </label>
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                      >
                        <option value="08:00 - 10:00 WIB (Pagi)">08:00 - 10:00 WIB (Pagi)</option>
                        <option value="10:00 - 12:00 WIB (Siang)">10:00 - 12:00 WIB (Siang)</option>
                        <option value="13:00 - 15:00 WIB (Siang-Sore)">13:00 - 15:00 WIB (Siang-Sore)</option>
                        <option value="15:00 - 17:00 WIB (Sore)">15:00 - 17:00 WIB (Sore)</option>
                        <option value="17:00 - 19:30 WIB (Malam)">17:00 - 19:30 WIB (Malam)</option>
                      </select>
                    </div>

                    {/* Nama Lengkap */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nama Lengkap Pelanggan *
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Rina Setyowati"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                        required
                      />
                    </div>

                    {/* Nomor WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        placeholder="Contoh: 081234567890"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                        required
                      />
                    </div>

                    {/* Alamat Lengkap */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Alamat Lengkap Penjemputan (Rumah / Kos / Kantor) *
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Jl. Tubagus Ismail VII No. 12, Coblong, Bandung (Pagar hitam samping minimarket)"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                        required
                      />
                    </div>

                    {/* Catatan Khusus */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Catatan Khusus (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Ada noda oli di kemeja putih / titip di satpam jika tidak ada"
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/30 text-sm sm:text-base flex items-center justify-center gap-2 transition active:scale-98 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Memproses Permintaan...</span>
                      ) : (
                        <>
                          <MessageCircle className="w-5 h-5" />
                          <span>Kirim Booking & Hubungi Kurir via WhatsApp</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      Data otomatis tersimpan & kurir akan konfirmasi sebelum menuju lokasi Anda.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STANDAR HIGIENITAS & GALERI WORKSHOP */}
      <section id="galeri-workshop" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
              Kualitas & Higienitas
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Workshop Standar Industri & Higienis
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Kami menerapkan standar sterilisasi dan penanganan busana secara profesional.
            </p>
          </div>

          {/* 4 Cards Gallery */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tenant.galleries.map((gal) => (
              <div
                key={gal.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={gal.imageUrl}
                    alt={gal.caption || "Workshop Laundry"}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {gal.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Komitmen Garansi Pelanggan */}
          <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-600" />
              Komitmen Kualitas Bastian Clean & Care
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {commitments.map((com, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">{com}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONI PELANGGAN */}
      <section id="testimoni" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Kepuasan Pelanggan
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Dipercaya Ratusan Keluarga & Profesional di Bandung
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Ulasan nyata dari pelanggan setia yang telah merasakan kemudahan layanan antar jemput kami.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {tenant.testimonials.map((testi) => (
              <div
                key={testi.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-sky-300 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {Array.from({ length: testi.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{testi.comment}&rdquo;
                  </p>
                </div>

                {/* Client Profile */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/60">
                  <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm">
                    {testi.clientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{testi.clientName}</h4>
                    <p className="text-xs text-slate-500">{testi.clientRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTLET & PETA LOKASI */}
      <section id="lokasi" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Contact & Outlet Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
                  Lokasi Workshop
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
                  Kunjungi Outlet atau Jadwalkan Penjemputan
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Drop off pakaian langsung di outlet atau serahkan penjemputan ke kurir kami.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200">
                  <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Alamat Workshop</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200">
                  <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Jam Operasional</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{operatingHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200">
                  <Phone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Kontak WhatsApp & Telepon</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">+{tenant.whatsappNumber}</p>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={tenant.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka Petunjuk Arah di Google Maps</span>
                </a>
              </div>
            </div>

            {/* Right Column: Google Maps Interactive Preview */}
            <div className="lg:col-span-7">
              <div className="bg-white p-3 rounded-3xl border border-slate-200 shadow-md overflow-hidden">
                <iframe
                  title="Peta Lokasi Bastian Clean & Care"
                  src="https://maps.google.com/maps?q=-6.8856,107.6142&hl=id&z=15&output=embed"
                  width="100%"
                  height="380"
                  className="rounded-2xl border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center font-black text-white text-sm">
              B
            </div>
            <div>
              <p className="text-sm font-bold text-white">{businessName}</p>
              <p className="text-xs text-slate-400">
                Solusi Laundry Kiloan & Satuan Premium Terpercaya di {geoCity}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#paket-layanan" className="hover:text-white transition">
              Paket Layanan
            </a>
            <a href="#alur-proses" className="hover:text-white transition">
              Alur Jemput
            </a>
            <a href="#estimasi-biaya" className="hover:text-white transition">
              Kalkulator Pickup
            </a>
            <a href="#galeri-workshop" className="hover:text-white transition">
              Workshop
            </a>
            <a href="#testimoni" className="hover:text-white transition">
              Ulasan
            </a>
          </div>

          <p className="text-xs text-slate-400 text-center md:text-right">
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp
        whatsappNumber={tenant.whatsappNumber}
        businessName={businessName}
        themeColor={themeColor}
      />
    </div>
  );
}
