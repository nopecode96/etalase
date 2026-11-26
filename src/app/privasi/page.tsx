import { Metadata } from "next";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import {
  Lock,
  Eye,
  Database,
  Building,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  generateBreadcrumbJsonLd,
  generateLocalizedMetadata,
  generateWebPageJsonLd,
} from "@/lib/seo/metadata-helper";
import { OFFICIAL_WHATSAPP_GROUP_URL } from "@/lib/config/constants";

export const metadata: Metadata = generateLocalizedMetadata({
  path: "/privasi",
  locale: "id",
  title: "Kebijakan Privasi (UU PDP No. 27/2022) | etalase.online",
  description:
    "Kebijakan privasi dan perlindungan data pribadi pengguna etalase.online oleh PT Rafa Kreasindo Teknologi sesuai UU PDP No. 27/2022, Google OAuth, dan Google Consent Mode.",
  type: "website",
  keywords: ["kebijakan privasi etalase online", "uu pdp 27 2022", "perlindungan data"],
});

export default function PrivasiPage() {
  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: "Beranda", url: "/" },
    { name: "Kebijakan Privasi", url: "/privasi" },
  ]);
  const webPageJsonLd = generateWebPageJsonLd({
    url: "/privasi",
    name: "Kebijakan Privasi — etalase.online",
    description:
      "Transparansi pengelolaan data pribadi, izin Google OAuth (nama & email), cookie persetujuan, dan kontak DPO PT Rafa Kreasindo Teknologi.",
    locale: "id",
  });

  const sections = [
    {
      icon: Database,
      title: "1. Data yang Kami Kumpulkan",
      content: `Kami mengumpulkan data berikut saat Anda menggunakan platform:\n\n• Data identitas: nama lengkap, alamat email (melalui Google OAuth—kami hanya membaca nama dan email Anda)\n• Data toko: nama toko, subdomain slug, deskripsi, foto produk yang Anda unggah\n• Data transaksi: nomor pesanan, jumlah pembayaran, status transaksi\n• Data teknis: alamat IP, jenis perangkat, browser, waktu akses\n• Data opsional: nomor WhatsApp/Telegram yang Anda hubungkan ke akun`,
    },
    {
      icon: Lock,
      title: "2. Dasar Hukum Pemrosesan",
      content: `Pemrosesan data pribadi Anda didasarkan pada:\n\n• Pelaksanaan perjanjian: data diperlukan untuk menyediakan layanan platform yang Anda daftarkan\n• Kepentingan legitim: data teknis untuk keamanan sistem dan pencegahan penipuan\n• Persetujuan eksplisit: untuk analitik/pemasaran opsional melalui banner persetujuan cookie\n\nSesuai Undang-Undang Perlindungan Data Pribadi (UU PDP) No. 27 Tahun 2022 Republik Indonesia.`,
    },
    {
      icon: Eye,
      title: "3. Penggunaan Data",
      content: `Data Anda digunakan untuk:\n\n• Mengoperasikan dan meningkatkan layanan platform etalase.online\n• Mengirim notifikasi transaksi (email & Telegram jika diaktifkan)\n• Pelaporan keuangan internal dan kewajiban perpajakan\n• Mencegah penipuan dan menjaga keamanan platform\n• Menghubungi Anda terkait perubahan layanan yang material`,
    },
    {
      icon: Lock,
      title: "4. Berbagi Data dengan Pihak Ketiga",
      content: `Kami TIDAK menjual data pribadi Anda ke pihak ketiga. Data dibagikan hanya kepada:\n\n• Penyedia Jasa Pembayaran berlisensi Bank Indonesia (untuk proses QRIS)\n• PayPal Inc. (untuk transaksi internasional)\n• Penyedia infrastruktur cloud (server hosting) dengan perjanjian kerahasiaan\n• Otoritas hukum jika diwajibkan oleh putusan pengadilan`,
    },
    {
      icon: Lock,
      title: "5. Keamanan Data",
      content: `Kami menerapkan langkah keamanan berikut:\n\n• Enkripsi HTTPS/TLS untuk seluruh koneksi\n• Verifikasi signature kriptografis untuk seluruh webhook pembayaran\n• Autentikasi OAuth 2.0 via Google (tidak menyimpan password)\n• Akses database dibatasi oleh firewall dan role-based access control\n• Audit log untuk seluruh akses data sensitif`,
    },
    {
      icon: Eye,
      title: "6. Hak Pemilik Data",
      content: `Sesuai UU PDP, Anda berhak untuk:\n\n• Mengakses: meminta salinan data pribadi yang kami simpan\n• Mengoreksi: memperbarui data yang tidak akurat melalui dashboard\n• Menghapus: meminta penghapusan akun dan data terkait (proses maksimal 30 hari kerja)\n• Portabilitas: mengekspor data transaksi dalam format CSV\n• Keberatan: menolak pemrosesan data untuk tujuan pemasaran\n\nAjukan permintaan ke: halo@etalase.online dengan subjek "Permintaan Hak Data Pribadi".`,
    },
    {
      icon: Lock,
      title: "7. Retensi Data",
      content: `Data akun aktif disimpan selama akun berstatus aktif. Data transaksi disimpan minimal 5 tahun untuk keperluan perpajakan sesuai regulasi Indonesia. Setelah akun dihapus, data anonim (agregat) dapat disimpan untuk keperluan statistik internal.`,
    },
    {
      icon: Lock,
      title: "8. Cookie & Teknologi Pelacakan",
      content: `Kami menggunakan cookie sesi esensial untuk autentikasi serta cookie analitik/iklan opsional (GA4, Meta Pixel, TikTok Pixel melalui Google Tag Manager) sesuai pilihan Anda pada Banner Persetujuan Cookie. Untuk Tenant paket PRO yang mengaktifkan Meta Pixel, TikTok Pixel, atau Google Analytics 4 pada tokonya masing-masing, teknologi pelacakan tersebut dioperasikan langsung oleh Tenant sesuai kebijakan privasi penyedia terkait.`,
    },
    {
      icon: Lock,
      title: "9. Kontak Data Protection Officer (DPO)",
      content: `Untuk pertanyaan atau keluhan terkait privasi data:\n\nEmail: halo@etalase.online / support@etalase.online\nAlamat: PT Rafa Kreasindo Teknologi, Jl. Nias Dalam No. 14, Bandung, Jawa Barat 40115\n\nKami akan merespons dalam maksimal 14 hari kerja.`,
    },
    {
      icon: Lock,
      title: "10. Perubahan Kebijakan",
      content: `Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan material akan diberitahukan melalui email terdaftar minimal 14 hari sebelum berlaku. Versi terbaru selalu tersedia di halaman ini.`,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <GlobalHeader />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
        <nav aria-label="Breadcrumb" className="text-xs text-[#57534E] flex items-center gap-2 mb-8">
          <Link href="/" className="hover:text-[#D94E28] transition">
            Beranda
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#1C1917]">Kebijakan Privasi</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
                <Lock className="w-3.5 h-3.5" />
                <span>Perlindungan Data Pribadi</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] leading-tight mb-3">
                Kebijakan Privasi
              </h1>
              <p className="text-sm text-[#57534E]">
                Berlaku untuk platform <strong>etalase.online</strong> yang dikelola oleh{" "}
                <strong>PT Rafa Kreasindo Teknologi</strong> sesuai UU PDP No. 27/2022. Terakhir diperbarui: November 2026.
              </p>
            </div>

            <div className="space-y-6">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <section key={s.title} className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
                    <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#D94E28]" />
                      <span>{s.title}</span>
                    </h2>
                    <p className="text-sm text-[#57534E] leading-relaxed whitespace-pre-line">{s.content}</p>
                  </section>
                );
              })}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D94E28]">
                <Building className="w-4 h-4" />
                <span>Pengendali Data (DPO)</span>
              </div>
              <div className="text-xs text-[#57534E] space-y-2 leading-relaxed">
                <p className="font-bold text-sm text-[#1C1917]">PT Rafa Kreasindo Teknologi</p>
                <p>Jl. Nias Dalam No. 14, Bandung, Jawa Barat 40115, Indonesia</p>
                <p>Mematuhi UU PDP No. 27/2022 &amp; Google Consent Mode v2</p>
              </div>
              <div className="pt-3 border-t border-[#E7E5E4] space-y-2 text-xs">
                <a
                  href={OFFICIAL_WHATSAPP_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-emerald-700 hover:underline"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Grup WhatsApp Support Resmi</span>
                </a>
                <a
                  href="mailto:halo@etalase.online"
                  className="flex items-center gap-2 font-medium text-[#1C1917] hover:text-[#D94E28]"
                >
                  <Mail className="w-4 h-4 text-[#D94E28] shrink-0" />
                  <span>halo@etalase.online</span>
                </a>
                <a
                  href="mailto:support@etalase.online"
                  className="flex items-center gap-2 font-medium text-[#1C1917] hover:text-[#D94E28]"
                >
                  <Mail className="w-4 h-4 text-[#D94E28] shrink-0" />
                  <span>support@etalase.online</span>
                </a>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl p-6 space-y-2.5 text-xs">
              <div className="font-bold text-[#1C1917] uppercase tracking-wider text-[11px]">
                Tautan Hukum &amp; Bantuan
              </div>
              <ul className="space-y-2 text-[#57534E]">
                <li>
                  <Link href="/syarat" className="hover:text-[#D94E28] font-medium transition">
                    Syarat &amp; Ketentuan →
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-[#D94E28] font-medium transition">
                    Kebijakan Pengembalian &amp; Refund →
                  </Link>
                </li>
                <li>
                  <Link href="/bantuan" className="hover:text-[#D94E28] font-medium transition">
                    Pusat Bantuan &amp; FAQ →
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="hover:text-[#D94E28] font-medium transition">
                    Kontak Resmi →
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}
