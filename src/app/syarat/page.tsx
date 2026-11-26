import { Metadata } from "next";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
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
  path: "/syarat",
  locale: "id",
  title: "Syarat & Ketentuan Layanan | etalase.online",
  description:
    "Syarat dan ketentuan penggunaan platform etalase.online oleh PT Rafa Kreasindo Teknologi termasuk struktur biaya QRIS, chat 0%, payout min. Rp 50.000, dan kepatuhan hukum.",
  type: "website",
  keywords: ["syarat dan ketentuan etalase online", "ketentuan layanan pjp qris"],
});

export default function SyaratPage() {
  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: "Beranda", url: "/" },
    { name: "Syarat & Ketentuan", url: "/syarat" },
  ]);
  const webPageJsonLd = generateWebPageJsonLd({
    url: "/syarat",
    name: "Syarat & Ketentuan Layanan — etalase.online",
    description:
      "Ketentuan hukum penggunaan layanan multi-tenant etalase.online oleh PT Rafa Kreasindo Teknologi di Indonesia.",
    locale: "id",
  });

  const sections = [
    {
      title: "1. Identitas Penyelenggara",
      content: `Platform etalase.online dikelola oleh PT Rafa Kreasindo Teknologi, berdomisili di Jl. Nias Dalam No. 14, Bandung, Jawa Barat, Indonesia. Kontak resmi: halo@etalase.online dan support@etalase.online.`,
    },
    {
      title: "2. Lingkup Layanan",
      content: `etalase.online adalah platform e-commerce multi-tenant yang memungkinkan penjual (Tenant) membuat toko digital mandiri dengan subdomain namatoko.etalase.online. Platform ini tidak bertindak sebagai marketplace yang mempertemukan pembeli dan penjual secara langsung, melainkan menyediakan infrastruktur toko online kepada Tenant.`,
    },
    {
      title: "3. Pembayaran & Biaya Transaksi",
      content: `Platform mendukung metode pembayaran berikut:\n\n• QRIS (Quick Response Code Indonesian Standard): diproses melalui Penyedia Jasa Pembayaran (PJP) berlisensi Bank Indonesia. Biaya transaksi standar 4,5% (min. transaksi Rp 15.000) untuk paket FREE, atau 2% (min. transaksi Rp 25.000) untuk paket PRO. Tenant dapat mengaktifkan "Convenience Fee" agar biaya transaksi dibebankan kepada pembeli.\n\n• PayPal: untuk transaksi internasional (USD/Kartu Kredit). Biaya mengikuti ketentuan PayPal yang berlaku.\n\n• Order via WhatsApp (Chat Order): 0% komisi dari Platform. Pembayaran diatur langsung antara Tenant dan pembeli.`,
    },
    {
      title: "4. Kebijakan Payout (Pencairan)",
      content: `Minimum penarikan saldo adalah Rp 50.000 ke seluruh rekening bank lokal di Indonesia. Paket FREE: biaya pencairan Rp 5.000 per penarikan. Paket PRO & DFY: GRATIS biaya pencairan 4x per bulan (selanjutnya Rp 2.500 per penarikan). SLA pencairan: maksimal 1×24 jam kerja setelah permintaan diajukan. Platform berhak menunda pencairan apabila terdapat indikasi penipuan atau sengketa transaksi yang belum terselesaikan.`,
    },
    {
      title: "5. Subdomain & Custom Domain",
      content: `Setiap Tenant mendapat satu subdomain mandiri (namatoko.etalase.online, 3–30 karakter) yang bersifat eksklusif selama akun aktif. Paket PRO dapat menghubungkan domain pribadi (.com, .id, dll.) dengan SSL gratis. Platform berhak mencabut subdomain yang melanggar ketentuan ini.`,
    },
    {
      title: "6. Produk & Konten Terlarang",
      content: `Tenant dilarang keras menjual atau mempromosikan: perjudian (dalam bentuk apapun), narkotika dan zat berbahaya, konten pornografi, produk palsu/bajakan, layanan penipuan atau skema ponzi, senjata tanpa izin resmi, dan produk lain yang melanggar hukum Republik Indonesia. Pelanggaran mengakibatkan penutupan akun permanen tanpa pengembalian dana.`,
    },
    {
      title: "7. Hak Kekayaan Intelektual",
      content: `Konten yang diunggah Tenant (foto, deskripsi, harga) tetap menjadi milik Tenant. Dengan menggunakan platform, Tenant memberikan lisensi non-eksklusif kepada PT Rafa Kreasindo Teknologi untuk menampilkan konten tersebut demi keperluan operasional platform.`,
    },
    {
      title: "8. Batasan Tanggung Jawab",
      content: `Platform tidak bertanggung jawab atas: sengketa antara Tenant dan pembeli terkait kualitas produk fisik, keterlambatan pengiriman oleh pihak ketiga, kerugian akibat force majeure (bencana alam, pemadaman jaringan nasional), atau penyalahgunaan akun akibat kelalaian Tenant dalam menjaga keamanan kredensial.`,
    },
    {
      title: "9. Perubahan Ketentuan",
      content: `PT Rafa Kreasindo Teknologi berhak mengubah Syarat & Ketentuan ini sewaktu-waktu. Perubahan material akan diberitahukan melalui email terdaftar atau notifikasi dashboard minimal 7 hari sebelum berlaku.`,
    },
    {
      title: "10. Hukum yang Berlaku",
      content: `Syarat & Ketentuan ini tunduk pada hukum Republik Indonesia. Sengketa diselesaikan melalui Badan Arbitrase Nasional Indonesia (BANI) di Bandung, atau melalui pengadilan negeri yang berwenang.`,
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
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-[#57534E] flex items-center gap-2 mb-8">
          <Link href="/" className="hover:text-[#D94E28] transition">
            Beranda
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#1C1917]">Syarat &amp; Ketentuan</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Utama Dokumen Hukum */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
                <FileText className="w-3.5 h-3.5" />
                <span>Dokumen Hukum &amp; Kepatuhan</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] leading-tight mb-3">
                Syarat &amp; Ketentuan Layanan
              </h1>
              <p className="text-sm text-[#57534E]">
                Berlaku untuk platform <strong>etalase.online</strong> yang dikelola oleh{" "}
                <strong>PT Rafa Kreasindo Teknologi</strong>. Terakhir diperbarui: November 2026.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-800">
                Dengan mendaftar dan menggunakan layanan etalase.online, Anda menyatakan telah membaca, memahami, dan
                menyetujui seluruh ketentuan di bawah ini.
              </p>
            </div>

            <div className="space-y-6">
              {sections.map((s) => (
                <section key={s.title} className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
                  <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D94E28]" />
                    <span>{s.title}</span>
                  </h2>
                  <p className="text-sm text-[#57534E] leading-relaxed whitespace-pre-line">{s.content}</p>
                </section>
              ))}
            </div>
          </div>

          {/* Sidebar Verifikasi Legal (E-E-A-T) */}
          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D94E28]">
                <Building className="w-4 h-4" />
                <span>Identitas Pengelola Resmi</span>
              </div>
              <div className="text-xs text-[#57534E] space-y-2 leading-relaxed">
                <p className="font-bold text-sm text-[#1C1917]">PT Rafa Kreasindo Teknologi</p>
                <p>Jl. Nias Dalam No. 14, Bandung, Jawa Barat 40115, Indonesia</p>
                <p>Mitra Pembayaran QRIS berizin PJP Bank Indonesia • Enkripsi HTTPS/TLS</p>
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
                Dokumen Hukum Terkait
              </div>
              <ul className="space-y-2 text-[#57534E]">
                <li>
                  <Link href="/privasi" className="hover:text-[#D94E28] font-medium transition">
                    Kebijakan Privasi (UU PDP No. 27/2022) →
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
