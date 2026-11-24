import { Metadata } from "next";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { FileText, ShieldCheck, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan Layanan | etalase.online",
  description: "Syarat dan ketentuan penggunaan platform etalase.online oleh PT Rafa Kreasindo Teknologi.",
};

export default function SyaratPage() {
  const sections = [
    {
      title: "1. Identitas Penyelenggara",
      content: `Platform etalase.online dikelola oleh PT Rafa Kreasindo Teknologi, berdomisili di Jl. Nias Dalam No. 14, Bandung, Jawa Barat, Indonesia. Kontak resmi: halo@etalase.online.`,
    },
    {
      title: "2. Lingkup Layanan",
      content: `etalase.online adalah platform e-commerce multi-tenant yang memungkinkan penjual (Tenant) membuat toko digital mandiri dengan subdomain namatoko.etalase.online. Platform ini tidak bertindak sebagai marketplace yang mempertemukan pembeli dan penjual secara langsung, melainkan menyediakan infrastruktur toko online kepada Tenant.`,
    },
    {
      title: "3. Pembayaran & Biaya Transaksi",
      content: `Platform mendukung dua metode pembayaran utama:\n\n• QRIS (Quick Response Code Indonesian Standard): diproses melalui Penyedia Jasa Pembayaran (PJP) berlisensi Bank Indonesia. Biaya transaksi standar 4.5% (min Rp 3.000) untuk paket FREE, atau 2% (min Rp 3.000) untuk paket PRO. Tenant PRO dapat mengaktifkan "Convenience Fee" sehingga biaya ditanggung pembeli dan Tenant menerima 100% harga penuh.\n\n• PayPal: untuk transaksi internasional. Biaya sesuai ketentuan PayPal yang berlaku.\n\n• Order via WhatsApp (Chat Order): 0% komisi dari Platform. Pembayaran diatur langsung antara Tenant dan pembeli.`,
    },
    {
      title: "4. Kebijakan Payout (Pencairan)",
      content: `Paket FREE: biaya pencairan Rp 5.000 per penarikan. Paket PRO: 4x pencairan gratis per bulan. SLA pencairan: maksimal 1×24 jam kerja setelah permintaan diajukan. Platform berhak menunda pencairan apabila terdapat indikasi penipuan atau sengketa transaksi yang belum terselesaikan.`,
    },
    {
      title: "5. Subdomain & Custom Domain",
      content: `Setiap Tenant mendapat satu subdomain mandiri (namatoko.etalase.online) yang bersifat eksklusif selama akun aktif. Paket PRO dapat menghubungkan domain pribadi (.com, .id, dll.) dengan SSL gratis. Platform berhak mencabut subdomain yang melanggar ketentuan ini.`,
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
      <GlobalHeader />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Dokumen Hukum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] leading-tight mb-3">
            Syarat &amp; Ketentuan Layanan
          </h1>
          <p className="text-sm text-[#57534E]">
            Berlaku untuk platform <strong>etalase.online</strong> yang dikelola oleh{" "}
            <strong>PT Rafa Kreasindo Teknologi</strong>. Terakhir diperbarui: November 2026.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 mb-8 text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-800">
            Dengan mendaftar dan menggunakan layanan etalase.online, Anda menyatakan telah membaca, memahami, dan
            menyetujui seluruh ketentuan di bawah ini.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title} className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
              <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D94E28]" />
                {s.title}
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed whitespace-pre-line">{s.content}</p>
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-10 pt-6 border-t border-[#E7E5E4] flex flex-wrap gap-4 text-xs text-[#57534E]">
          <Link href="/privasi" className="hover:text-[#D94E28] transition font-medium">Kebijakan Privasi →</Link>
          <Link href="/refund" className="hover:text-[#D94E28] transition font-medium">Kebijakan Pengembalian →</Link>
          <Link href="/bantuan" className="hover:text-[#D94E28] transition font-medium">Pusat Bantuan →</Link>
          <Link href="/kontak" className="hover:text-[#D94E28] transition font-medium">Hubungi Kami →</Link>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}
