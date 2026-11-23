"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Zap,
  Store,
  ShoppingBag,
  Calendar,
  Ticket,
  MessageCircle,
  ShieldCheck,
  Globe,
  Printer,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function FiturPage() {
  const [activeTab, setActiveTab] = useState<string>("digital");

  const featureItems = [
    // Kelompok 1: Jenis Jualan (Produk)
    {
      id: "digital",
      group: "Jenis Jualan",
      title: "Produk Digital & E-Course",
      icon: Zap,
      badge: "Terlaris",
      target: "Kreator Konten, Desainer, Guru, Podcaster, Penulis E-book",
      headline: "Jual File Sekali Buat, Hasilkan Cuan Otomatis 24 Jam",
      desc: "Unggah e-book PDF, template Canva, preset Lightroom, atau modul video. Begitu pembeli membayar via QRIS, file dan invoice otomatis terkirim langsung ke nomor WhatsApp mereka tanpa perlu kirim manual.",
      points: [
        "Pengiriman file instan otomatis ke WhatsApp pembeli",
        "Penyimpanan cloud aman berkecepatan tinggi",
        "Tanpa potongan komisi penjualan di jalur chat",
        "Tersedia proteksi tautan unduhan sekali pakai",
      ],
      previewImg: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "katalog",
      group: "Jenis Jualan",
      title: "Katalog Fisik & Showroom",
      icon: Store,
      badge: "Sales Favorit",
      target: "Sales Mobil & Motor, Agen Properti, Butik Fashion, Toko Herbal",
      headline: "Katalog Digital Tajam yang Siap Dibagikan ke Prospek WhatsApp",
      desc: "Tampilkan unit mobil showroom, listing rumah/tanah, atau koleksi busana dengan foto resolusi tinggi, spesifikasi lengkap, dan tombol simulasi cicilan langsung ke chat penjual.",
      points: [
        "Foto beresolusi tajam dengan zoom detail unit",
        "Badge spesifikasi unit (Tahun, Transmisi, Garansi)",
        "Tombol Tanya Unit & Booking Test Drive langsung ke chat",
        "Katalog mudah dibagikan via tautan singkat di bio Instagram & TikTok",
      ],
      previewImg: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "affiliate",
      group: "Jenis Jualan",
      title: "Affiliate Keranjang Kuning",
      icon: ShoppingBag,
      badge: "Kreator TikTok",
      target: "Influencer TikTok, Reviewer Shopee, Foodies, Content Creator",
      headline: "Satu Bio Link untuk Seluruh Rekomendasi Marketplace SEA",
      desc: "Kumpulkan link rekomendasi produk dari Beg Kuning TikTok Shop, Shopee Affiliate, dan Lazada dalam satu etalase cantik. Pembeli tinggal klik dan langsung diarahkan ke aplikasi marketplace.",
      points: [
        "Tombol khusus dengan warna resmi marketplace (🟡 TikTok, 🟠 Shopee, 🔵 Lazada)",
        "Bebas pasang ratusan tautan afiliasi tanpa batasan",
        "Pelacakan klik rekomendasi untuk evaluasi performa komisi",
        "Tampilan kartu vertikal rapi tanpa tombol bertabrakan",
      ],
      previewImg: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "booking",
      group: "Jenis Jualan",
      title: "Booking & Konsultasi 1-on-1",
      icon: Calendar,
      badge: "Profesional",
      target: "Coach Bisnis, Dokter, Konsultan Pajak, Mentor Portofolio",
      headline: "Kalender Pemesanan Waktu Otomatis dengan Link Google Meet",
      desc: "Klien Anda dapat melihat jadwal kosong, memilih tanggal dan jam konsultasi, lalu membayar langsung. Link ruang rapat Google Meet dan pengingat jadwal akan terkirim otomatis ke WhatsApp.",
      points: [
        "Sinkronisasi slot jam kalender otomatis",
        "Kirim link Google Meet resmi begitu pembayaran selesai",
        "Pengingat jadwal H-1 dan 1 jam sebelum sesi dimulai",
        "Dukungan sesi konsultasi berbayar maupun konsultasi gratis",
      ],
      previewImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "event",
      group: "Jenis Jualan",
      title: "Tiket Event & Webinar",
      icon: Ticket,
      badge: "EO & Komunitas",
      target: "Penyelenggara Seminar, Komunitas Belajar, Event Organizer",
      headline: "Jual Tiket Acara Tanpa Potongan Tiketing yang Mahal",
      desc: "Mulai dari tiket webinar Zoom hingga tiket meetup tatap muka. Data pendaftar terekap rapi dalam dashboard dan tiket digital ber-barcode terkirim ke WhatsApp peserta.",
      points: [
        "Nomor e-tiket unik dengan konfirmasi instan",
        "Export data seluruh peserta ke Excel dengan 1 klik",
        "Reminder otomatis ke nomor WhatsApp seluruh peserta",
        "Kapasitas kuota peserta dengan status Habis otomatis",
      ],
      previewImg: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=600&q=80",
    },

    // Kelompok 2: Alat Bantu Bisnis (Fitur)
    {
      id: "autowa",
      group: "Alat Bantu Bisnis",
      title: "Kirim File & Struk Otomatis ke WhatsApp",
      icon: MessageCircle,
      badge: "Otomasi",
      target: "Semua Pemilik Toko & Kreator",
      headline: "Customer Service Otomatis yang Melayani Pembeli 24 Jam Nonstop",
      desc: "Tidak perlu lagi begadang membalas chat hanya untuk mengirimkan link download atau nomor resi. Sistem otomatis mengirimkan pesan sopan lengkap dengan file produk langsung ke nomor WhatsApp pembeli.",
      points: [
        "Respon instan dalam hitungan detik setelah bayar",
        "Kirim file PDF, link video, dan invoice resmi",
        "Pemberitahuan real-time ke WhatsApp pemilik toko saat ada order baru",
        "0% error salah kirim file ke pembeli",
      ],
      previewImg: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "qris",
      group: "Alat Bantu Bisnis",
      title: "Pembayaran QRIS Instan & Multi-Metode",
      icon: ShieldCheck,
      badge: "Fintech SEA",
      target: "UMKM, Seller Online, Kreator",
      headline: "Terima Uang dari Seluruh Aplikasi Bank & E-Wallet Tanpa Ribet",
      desc: "Pembeli cukup scan QRIS dari GoPay, OVO, ShopeePay, DANA, BCA, Mandiri, BRI, atau BNI. Untuk pembeli luar negeri, tersedia opsi PayPal dan mata uang regional SEA (MYR, SGD, THB, PHP, VND).",
      points: [
        "QRIS dinamis otomatis terverifikasi lunas dalam 2 detik",
        "Biaya transaksi transparan tanpa iuran bulanan siluman",
        "Dukungan mata uang lintas negara di Asia Tenggara",
        "Penarikan saldo harian langsung ke rekening bank Anda",
      ],
      previewImg: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "domain",
      group: "Alat Bantu Bisnis",
      title: "Subdomain Mandiri & Custom Domain",
      icon: Globe,
      badge: "Branding",
      target: "Brand Lokal, Agency, Sales Eksekutif",
      headline: "Alamat Website Eksklusif yang Terlihat Berkelas di Mata Klien",
      desc: "Setiap pengguna langsung mendapatkan alamat subdomain mandiri seperti namamu.etalase.online. Anda juga bisa menyambungkan domain pribadi seperti tokoanda.com secara instan dengan sertifikat SSL gratis.",
      points: [
        "Subdomain mandiri instan aktif saat mendaftar",
        "Bisa pasang domain .com, .id, .shop, atau .co.id milik sendiri",
        "Sertifikat keamanan HTTPS/SSL otomatis terpasang",
        "Meningkatkan kepercayaan dan rasio klik di bio medsos",
      ],
      previewImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "poster",
      group: "Alat Bantu Bisnis",
      title: "Poster Story 9:16 Siap Cetak & Share",
      icon: Printer,
      badge: "Marketing Kit",
      target: "Kafe, Resto, Toko Fisik, Sales Lapangan",
      headline: "Generate Brosur Meja QR & Poster Medsos Tanpa Perlu Desainer",
      desc: "Download poster berukuran vertikal 9:16 untuk story Instagram dan standing banner meja kasir dengan barcode QR yang langsung mengarah ke etalase tokomu.",
      points: [
        "Ukuran presisi siap cetak di kertas A4 / A5",
        "QR Code presisi tinggi yang mudah di-scan kamera HP",
        "Cocok untuk nomor meja kafe dan tenda pameran otomotif",
        "Unduh gratis dalam format PDF atau gambar tajam",
      ],
      previewImg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const currentItem = featureItems.find((f) => f.id === activeTab) || featureItems[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />

      {/* Header Halaman */}
      <section className="pt-16 pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ekosistem Lengkap etalase.online</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            Semua yang Anda Butuhkan untuk Mulai &amp; Membesarkan Jualan.
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Pemisahan tegas antara alat bantu bisnis yang bekerja di balik layar dengan jenis produk nyata yang bisa Anda tawarkan ke pelanggan.
          </p>
        </ScrollReveal>
      </section>

      {/* Split-Panel Interactive Showcase */}
      <section className="pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigasi Kiri */}
          <div className="lg:col-span-5 space-y-6">
            {/* Kelompok 1: Jenis Jualan */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] px-2 mb-2.5">
                📦 Jenis Jualan (Apa yang Anda Jual)
              </div>
              <div className="space-y-1.5">
                {featureItems
                  .filter((item) => item.group === "Jenis Jualan")
                  .map((item) => {
                    const Icon = item.icon;
                    const isSelected = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-white border-[#D94E28] shadow-sm text-[#1C1917] ring-1 ring-[#D94E28]/15"
                            : "bg-white/60 hover:bg-white border-[#E7E5E4] text-[#57534E]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-[#FDF0EC] text-[#D94E28]"
                                : "bg-stone-100 text-stone-600"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#1C1917]">{item.title}</div>
                            <div className="text-[11px] text-[#57534E]">{item.badge}</div>
                          </div>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? "text-[#D94E28] translate-x-1" : "text-stone-300"
                          }`}
                        />
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Kelompok 2: Alat Bantu Bisnis */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] px-2 mb-2.5">
                ⚡ Alat Bantu Bisnis (Cara Kerja Sistem)
              </div>
              <div className="space-y-1.5">
                {featureItems
                  .filter((item) => item.group === "Alat Bantu Bisnis")
                  .map((item) => {
                    const Icon = item.icon;
                    const isSelected = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-white border-[#D94E28] shadow-sm text-[#1C1917] ring-1 ring-[#D94E28]/15"
                            : "bg-white/60 hover:bg-white border-[#E7E5E4] text-[#57534E]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-[#FDF0EC] text-[#D94E28]"
                                : "bg-stone-100 text-stone-600"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#1C1917]">{item.title}</div>
                            <div className="text-[11px] text-[#57534E]">{item.badge}</div>
                          </div>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? "text-[#D94E28] translate-x-1" : "text-stone-300"
                          }`}
                        />
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Panel Preview Detail Kanan */}
          <div className="lg:col-span-7 bg-white border border-[#E7E5E4] rounded-3xl p-7 sm:p-10 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E7E5E4]">
              <span className="text-xs font-bold text-[#D94E28] bg-[#FDF0EC] px-3 py-1 rounded-full">
                {currentItem.group} &bull; {currentItem.badge}
              </span>
              <span className="text-xs text-[#57534E] font-medium">etalase.online v2.0</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] mb-2">
                {currentItem.headline}
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                {currentItem.desc}
              </p>
            </div>

            {/* Baris "Cocok untuk: ..." */}
            <div className="p-3.5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl text-xs">
              <span className="font-bold text-[#1C1917]">Cocok untuk: </span>
              <span className="text-[#57534E]">{currentItem.target}</span>
            </div>

            {/* Visual Hero Image for the Feature */}
            <div className="w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-stone-100 border border-[#E7E5E4] relative shadow-2xs">
              <img
                src={currentItem.previewImg}
                alt={currentItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Manfaat Utama */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#1C1917]">
                Keunggulan Utama:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#57534E]">
                {currentItem.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/onboarding"
                className="w-full sm:w-auto bg-[#D94E28] hover:bg-[#B83E1D] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-1.5"
              >
                <span>Coba Fitur Ini Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/solusi"
                className="text-xs font-semibold text-[#57534E] hover:text-[#1C1917]"
              >
                Lihat Solusi Industri Anda &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
