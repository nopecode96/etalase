"use client";

import { useState } from "react";
import {
  Phone,
  MessageCircle,
  UtensilsCrossed,
  Coffee,
  Clock,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  Star,
  ChefHat,
  CheckCircle2,
  ArrowRight,
  Check,
  Flame,
  Wifi,
  Car,
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

export default function RestaurantTemplate({ tenant }: Props) {
  // Parsing metadata dinamis dari database (featureFlags)
  const flags = (tenant.featureFlags as Record<string, any>) || {};
  const businessName = tenant.businessName || "Kopi & Dapur Kuliner Kita - Bandung";
  const geoCity = tenant.geoCity || "Bandung";
  const address = tenant.address || "Jl. Riau (LLRE Martadinata) No. 145, Cihapit, Bandung, Jawa Barat";
  const themeColor = tenant.themeColor || "#ea580c"; // Terracotta Warm Orange

  const heroTitle =
    tenant.heroTitle || "Cita Rasa Autentik & Suasana Hangat di Jantung Kota Bandung";
  const heroSubtitle =
    tenant.heroSubtitle ||
    "Perpaduan kopi artisan pilihan, sajian hidangan nusantara modern, dan area outdoor asri untuk momen santai bersama teman dan keluarga.";
  const heroBannerUrl = tenant.heroBannerUrl || "/assets/templates/restaurant/hero-cafe.webp";

  const taglineBadge =
    flags.taglineBadge || "Artisanal Coffee & Modern Comfort Dining • Bandung";
  const operatingHours = flags.operatingHours || "Setiap Hari: 08.00 - 23.00 WIB";
  const statusBadge = flags.statusBadge || "Buka Sekarang • Area Parkir Luas";

  const chefProfile = flags.chefProfile || {
    name: "Chef Arga Wicaksana",
    role: "Executive Culinary Director",
    bio: "Menghadirkan hidangan berkualitas tinggi dengan bahan lokal segar dan sentuhan gastronomi modern.",
  };

  const highlights: Array<{ label: string; value: string }> = flags.highlights || [
    { label: "Biji Kopi", value: "100% Single Origin Arabica Jawa Barat" },
    { label: "Bahan Masakan", value: "Bahan Segar Alami Tanpa Pengawet" },
    { label: "Kapasitas", value: "Tersedia 150 Seat & Private VIP Room" },
  ];

  const commitments: string[] = flags.commitments || [
    "Tempat Higienis, Nyaman & Ramah Keluarga",
    "Wi-Fi Kecepatan Tinggi & Tersedia Stop Kontak di Setiap Meja",
    "Musholla Bersih, Area Parkir Luas & Ramah Kursi Roda",
    "Tersedia Opsi Vegetarian & Makanan Ramah Anak",
  ];

  const seatingAreas: string[] = flags.seatingAreas || [
    "Indoor AC Bebas Asap Rokok",
    "Outdoor Garden Sejuk & Asri",
    "Meja Bar Barista",
    "Private VIP Room (Meeting/Arisan)",
  ];

  // Parsing menu katalog makanan & minuman
  const menuList = tenant.catalogs.map((item) => {
    const specs = (item.specsJson as Record<string, any>) || {};
    return {
      ...item,
      menuCat: (item.category || specs.category || "Main Course") as string,
      isRecommended: specs.isRecommended !== undefined ? specs.isRecommended : true,
      spicyLevel: specs.spicyLevel || 0,
      calories: specs.calories || "",
      preparationTime: specs.preparationTime || "15 Menit",
      portion: specs.portion || "1 Orang",
      tags: (specs.tags as string[]) || ["Favorit"],
      rawPrice: Number(item.price || 0),
    };
  });

  // State untuk Filter Kategori Menu
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>("Semua Menu");

  const categories = [
    "Semua Menu",
    "Artisan Coffee",
    "Main Course",
    "Pastry & Bakery",
    "Refreshing Drinks",
  ];

  const filteredMenu =
    activeMenuCategory === "Semua Menu"
      ? menuList
      : menuList.filter((m) => m.menuCat.toLowerCase().includes(activeMenuCategory.toLowerCase()) || activeMenuCategory.toLowerCase().includes(m.menuCat.toLowerCase()));

  // State untuk Form Reservasi Meja (Dual-Action Lead)
  const [guestCount, setGuestCount] = useState<string>("2-4 Orang");
  const [seatingArea, setSeatingArea] = useState<string>(seatingAreas[0] || "Indoor AC Bebas Asap Rokok");
  const [reservationDate, setReservationDate] = useState<string>("");
  const [reservationTime, setReservationTime] = useState<string>("19:00 WIB (Dinner)");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Submit Handler: Table Reservation
  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !reservationDate) {
      alert("Mohon lengkapi Nama, Nomor WhatsApp, dan Tanggal Reservasi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitLeadAction({
        tenantId: tenant.id,
        name: customerName,
        phone: customerPhone,
        moduleType: "RESTAURANT_RESERVATION",
        details: {
          guests: guestCount,
          area: seatingArea,
          date: reservationDate,
          time: reservationTime,
          notes: notes || "Reservasi santap bersama",
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

  // Schema.org Structured Data Restaurant
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: businessName,
    image: tenant.heroBannerUrl || "https://etalase.online/assets/templates/restaurant/hero-cafe.webp",
    telephone: tenant.whatsappNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: geoCity,
      addressRegion: "Jawa Barat",
      postalCode: "40114",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: tenant.latitude || -6.9083,
      longitude: tenant.longitude || 107.6234,
    },
    url: `https://${tenant.customDomain}`,
    servesCuisine: ["Indonesian Modern", "Artisanal Coffee", "Western Comfort Food"],
    priceRange: "Rp 35.000 - Rp 185.000",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "23:00",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-orange-600 selection:text-white pb-20">
      {/* JSON-LD Schema.org SEO Restaurant */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. TOP ANNOUNCEMENT BAR (JAM OPERASIONAL & STATUS LIVE) */}
      <div className="bg-gradient-to-r from-stone-900 via-orange-950 to-stone-900 text-stone-200 text-xs sm:text-sm font-medium py-2.5 px-4 border-b border-orange-900/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {statusBadge.split("•")[0].trim()}
            </span>
            <span className="text-stone-300">
              {operatingHours} • {address.split(",")[0]}
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <a
              href={`tel:${tenant.whatsappNumber}`}
              className="font-bold hover:text-orange-400 flex items-center gap-1 text-white transition-colors"
            >
              <Phone size={13} className="text-orange-400" /> {tenant.whatsappNumber}
            </a>
          </div>
        </div>
      </div>

      {/* 2. STICKY NAVBAR */}
      <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800 shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-orange-500/40 shadow-sm bg-stone-900 flex items-center justify-center flex-shrink-0">
              {tenant.logoUrl ? (
                <img
                  src={tenant.logoUrl}
                  alt={businessName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Coffee className="text-orange-500" size={24} />
              )}
            </div>
            <div>
              <span className="font-black text-base sm:text-lg text-white leading-tight block">
                {businessName}
              </span>
              <p className="text-[11px] sm:text-xs text-orange-400 font-semibold tracking-wide">
                Artisanal Coffee &amp; Kitchen • Bandung
              </p>
            </div>
          </div>

          {/* Jump Links Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-stone-300">
            <a href="#menu" className="hover:text-orange-400 transition-colors">
              Buku Menu
            </a>
            <a href="#suasana" className="hover:text-orange-400 transition-colors">
              Suasana Resto
            </a>
            <a href="#reservasi" className="hover:text-orange-400 transition-colors">
              Reservasi Meja
            </a>
            <a href="#chef" className="hover:text-orange-400 transition-colors">
              Executive Chef
            </a>
            <a href="#lokasi" className="hover:text-orange-400 transition-colors">
              Lokasi &amp; Peta
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="#reservasi"
              className="hidden sm:inline-flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold px-4 py-2 rounded-xl text-xs transition-colors border border-stone-700"
            >
              <Calendar size={14} className="text-orange-400" />
              <span>Reservasi Meja</span>
            </a>
            <a
              href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(
                `Halo ${businessName}, saya ingin menanyakan meja atau info menu hari ini.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-orange-600/30 transition-all hover:scale-[1.02]"
            >
              <MessageCircle size={16} />
              <span>Chat WA Resto</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. ARTISANAL ATMOSPHERIC HERO SECTION */}
      <section className="relative overflow-hidden bg-stone-950 py-16 sm:py-24 lg:py-28 border-b border-stone-800">
        {/* Background Image with Warm Vignette & Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105"
          style={{ backgroundImage: `url(${heroBannerUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/90" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/15 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 backdrop-blur-md border border-orange-500/30">
            <Sparkles size={14} className="text-orange-400" />
            <span>{taglineBadge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight text-white mb-6">
            {heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>

          {/* 2 Tombol Aksi Hero */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2.5 bg-orange-600 hover:bg-orange-500 text-white font-black px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm shadow-xl shadow-orange-600/30 transition-all hover:scale-[1.02]"
            >
              <UtensilsCrossed size={17} />
              <span>Buka Buku Menu Digital</span>
            </a>
            <a
              href="#reservasi"
              className="inline-flex items-center justify-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-200 font-bold px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm backdrop-blur-md border border-stone-700 transition-all"
            >
              <Calendar size={17} className="text-orange-400" />
              <span>Reservasi Meja Sekarang</span>
            </a>
          </div>

          {/* 3 Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8 border-t border-stone-800/80">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 text-center backdrop-blur-sm"
              >
                <p className="text-[11px] text-orange-400 font-bold uppercase tracking-wider mb-1">
                  {h.label}
                </p>
                <p className="text-xs sm:text-sm font-black text-white">{h.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUKU MENU DIGITAL INTERAKTIF (INTERACTIVE MENU SHOWCASE) */}
      <section id="menu" className="py-16 sm:py-24 bg-stone-900/60 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 border border-orange-800/80 px-3.5 py-1.5 rounded-full">
              Sajian Spesial Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-3">
              Buku Menu Digital
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Diramu dari bahan lokal terbaik dengan standar kuliner premium. Klik tombol pesan untuk konfirmasi ketersediaan hidangan.
            </p>

            {/* Tab Kategori Menu */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveMenuCategory(cat)}
                  className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    activeMenuCategory === cat
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                      : "bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-white border border-stone-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Menu Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="bg-stone-950 rounded-3xl overflow-hidden border border-stone-800 shadow-md hover:border-orange-500/40 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Foto Menu */}
                  <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {item.spicyLevel > 0 && (
                      <div className="absolute top-3 right-3 bg-red-950/80 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-800 flex items-center gap-1 backdrop-blur-sm">
                        <Flame size={12} className="text-red-400" />
                        <span>Pedas Level {item.spicyLevel}</span>
                      </div>
                    )}
                  </div>

                  {/* Konten Menu */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-black text-lg text-white group-hover:text-orange-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-stone-400 mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Metadata: Porsi, Waktu & Kalori */}
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-400 pt-3 border-t border-stone-800/80 mb-4">
                      <span>Porsi: <strong>{item.portion}</strong></span>
                      <span>Prep: <strong>{item.preparationTime}</strong></span>
                      {item.calories && <span>{item.calories}</span>}
                    </div>
                  </div>
                </div>

                {/* Footer Card: Harga & Action */}
                <div className="p-5 sm:p-6 pt-0 flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                      Harga
                    </span>
                    <strong className="text-orange-400 text-lg font-black">
                      Rp {item.rawPrice.toLocaleString("id-ID")}
                    </strong>
                  </div>

                  <a
                    href={`https://wa.me/${tenant.whatsappNumber}?text=${encodeURIComponent(
                      `Halo ${businessName}, saya ingin memesan / menanyakan menu *${item.title}* (Rp ${item.rawPrice.toLocaleString("id-ID")}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-orange-600 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-colors border border-stone-700 hover:border-orange-500"
                  >
                    <MessageCircle size={14} />
                    <span>Pesan via WA</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FORMULIR RESERVASI MEJA INTERAKTIF (DUAL-ACTION LEAD) */}
      <section id="reservasi" className="py-16 sm:py-24 bg-stone-950 relative border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 border border-orange-800/80 px-3.5 py-1.5 rounded-full">
              Layanan Booking Meja
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-3">
              Formulir Reservasi Meja &amp; Acara
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Pastikan ketersediaan meja favorit Anda sebelum datang. Cocok untuk makan siang kantor, dinner intim, arisan, atau gathering keluarga.
            </p>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Jumlah Tamu */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                    1. Estimasi Jumlah Tamu
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-white rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-orange-500"
                  >
                    <option value="1-2 Orang">1-2 Orang (Meja Intim)</option>
                    <option value="3-4 Orang">3-4 Orang (Meja Reguler)</option>
                    <option value="5-8 Orang">5-8 Orang (Meja Keluarga)</option>
                    <option value="Rombongan > 10 Orang">Rombongan &gt; 10 Orang (Event/Arisan)</option>
                  </select>
                </div>

                {/* 2. Pilihan Area Meja */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                    2. Pilihan Area Duduk
                  </label>
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-white rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-orange-500"
                  >
                    {seatingAreas.map((area, aIdx) => (
                      <option key={aIdx} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Tanggal Kunjungan */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                    3. Tanggal Kunjungan
                  </label>
                  <input
                    type="date"
                    required
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* 4. Estimasi Jam Kedatangan */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                    4. Waktu Kedatangan
                  </label>
                  <select
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-white rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-orange-500"
                  >
                    <option value="11:30 WIB (Lunch)">11:30 WIB (Makan Siang)</option>
                    <option value="13:00 WIB (Afternoon)">13:00 WIB (Siang)</option>
                    <option value="16:00 WIB (Sunset Coffee)">16:00 WIB (Ngopi Sore)</option>
                    <option value="19:00 WIB (Dinner)">19:00 WIB (Makan Malam)</option>
                    <option value="20:30 WIB (Night Gathering)">20:30 WIB (Malam)</option>
                  </select>
                </div>

                {/* 5. Nama Pemesan */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                    5. Nama Lengkap Pemesan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ibu Nadia Tamara"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* 6. Nomor WhatsApp */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                    6. Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081223344556"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* 7. Catatan Khusus */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                  7. Catatan Khusus (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Dekat stop kontak, Baby chair 1 pcs, Surprise ulang tahun"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="pt-4 border-t border-stone-800">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-black py-4 px-6 rounded-2xl text-base shadow-xl shadow-orange-600/30 transition-all hover:scale-[1.01]"
                >
                  <Calendar size={18} />
                  <span>
                    {isSubmitting
                      ? "Memproses Reservasi..."
                      : "Konfirmasi Reservasi & Kirim ke WhatsApp"}
                  </span>
                </button>
                <p className="text-center text-xs text-stone-400 mt-3">
                  Tanpa uang muka untuk reservasi reguler. Resepsionis {businessName} akan mengonfirmasi meja Anda melalui WhatsApp.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 6. SUASANA & FASILITAS (AMBIENCE GALLERY) */}
      <section id="suasana" className="py-16 sm:py-24 bg-stone-900/40 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 border border-orange-800/80 px-3.5 py-1.5 rounded-full">
              Dokumentasi Tempat
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-3">
              Suasana Hangat &amp; Estetik
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Sudut-sudut nyaman yang dirancang untuk kerja produktif, ngobrol santai, hingga acara kumpul berkesan.
            </p>
          </div>

          {/* Grid Galeri Suasana */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {tenant.galleries.map((gal, gIdx) => (
              <div
                key={gal.id}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 shadow-md border border-stone-800"
              >
                <img
                  src={gal.imageUrl}
                  alt={gal.caption || `Suasana Kafe ${gIdx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent flex items-end p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-[11px] font-bold leading-tight line-clamp-2">
                    {gal.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Komitmen Fasilitas Kafe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-stone-800">
            {commitments.map((com, cIdx) => (
              <div
                key={cIdx}
                className="bg-stone-950/80 border border-stone-800 p-4 rounded-2xl flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {cIdx === 0 ? (
                    <CheckCircle2 size={16} />
                  ) : cIdx === 1 ? (
                    <Wifi size={16} />
                  ) : cIdx === 2 ? (
                    <Car size={16} />
                  ) : (
                    <Users size={16} />
                  )}
                </div>
                <p className="text-xs text-stone-300 leading-snug">{com}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROFIL EXECUTIVE CHEF & ULASAN KONSUMEN */}
      <section id="chef" className="py-16 sm:py-24 bg-stone-950 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Profil Chef */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 mb-16 flex flex-col md:flex-row items-center gap-8 shadow-xl">
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-orange-500/40 shadow-lg bg-stone-800 flex-shrink-0">
              <img
                src="/assets/templates/restaurant/chef-profile.webp"
                alt={chefProfile.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-left flex-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 border border-orange-800/80 px-3 py-1 rounded-full">
                {chefProfile.role}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-1">
                {chefProfile.name}
              </h3>
              <p className="text-xs font-semibold text-orange-400 mb-4">
                {businessName}
              </p>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic mb-6">
                &ldquo;{chefProfile.bio}&rdquo;
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-stone-400 pt-4 border-t border-stone-800">
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-orange-400" /> Bahan Lokal Segar Berkualitas
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-orange-400" /> Resep Racikan Otentik
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial Pelanggan */}
          {tenant.testimonials.length > 0 && (
            <div>
              <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 border border-orange-800/80 px-3 py-1 rounded-full">
                  Kata Pelanggan &amp; Foodies
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Pengalaman Menyenangkan di {businessName}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tenant.testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-stone-900/80 rounded-2xl p-6 border border-stone-800 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex gap-1 text-amber-400 mb-3">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} size={15} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic mb-4">
                        &ldquo;{t.comment}&rdquo;
                      </p>
                    </div>
                    <div className="pt-4 border-t border-stone-800 flex items-center gap-3">
                      {t.avatarUrl ? (
                        <img
                          src={t.avatarUrl}
                          alt={t.clientName}
                          className="w-10 h-10 rounded-full object-cover border border-stone-700"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-600/20 text-orange-400 font-bold flex items-center justify-center text-sm">
                          {t.clientName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-black text-white">{t.clientName}</h4>
                        <p className="text-[11px] text-stone-400">{t.clientRole}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. LOKASI RESTO & GOOGLE MAPS */}
      <section id="lokasi" className="py-16 sm:py-20 bg-stone-950 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 border border-orange-800/80 px-3 py-1 rounded-full">
                Petunjuk Lokasi
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-4">
                Kunjungi {businessName}
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-stone-300 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <p>{address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-orange-500 flex-shrink-0" />
                  <p>{operatingHours}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-orange-500 flex-shrink-0" />
                  <p>
                    Hotline Reservasi: <strong>{tenant.whatsappNumber}</strong>
                  </p>
                </div>
              </div>

              <a
                href={
                  tenant.googleMapsUrl ||
                  `https://maps.google.com/?q=${encodeURIComponent(address)}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-orange-600/30"
              >
                <span>Buka Rute di Google Maps</span>
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg border border-stone-800 h-80 bg-stone-900">
              <iframe
                title={`Peta Lokasi ${businessName}`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.916893665518!2d107.62082337499632!3d-6.908306093091176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c1b5145df%3A0x7d6f555c412e0987!2sJl.%20L.L.R.E.%20Martadinata%2C%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-stone-950 text-stone-500 py-12 border-t border-stone-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-white text-sm">{businessName}</p>
            <p className="mt-1">
              Cita Rasa Autentik &amp; Kopi Artisan Bandung. Hak Cipta &copy; {new Date().getFullYear()}.
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

      {/* 10. FLOATING WHATSAPP CTA */}
      <FloatingWhatsApp
        whatsappNumber={tenant.whatsappNumber}
        businessName={businessName}
        themeColor={themeColor}
      />
    </div>
  );
}
