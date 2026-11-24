import { Metadata } from "next";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { Lock, Eye, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | etalase.online",
  description: "Kebijakan privasi dan perlindungan data pribadi pengguna platform etalase.online sesuai UU PDP No. 27/2022.",
};

export default function PrivasiPage() {
  const sections = [
    {
      icon: Database,
      title: "1. Data yang Kami Kumpulkan",
      content: `Kami mengumpulkan data berikut saat Anda menggunakan platform:\n\n• Data identitas: nama lengkap, alamat email (via Google OAuth)\n• Data toko: nama toko, slug, deskripsi, foto produk yang Anda unggah\n• Data transaksi: nomor pesanan, jumlah pembayaran, status transaksi\n• Data teknis: alamat IP, jenis perangkat, browser, waktu akses\n• Data opsional: nomor WhatsApp/Telegram yang Anda hubungkan ke akun`,
    },
    {
      icon: Lock,
      title: "2. Dasar Hukum Pemrosesan",
      content: `Pemrosesan data pribadi Anda didasarkan pada:\n\n• Pelaksanaan perjanjian: data diperlukan untuk menyediakan layanan platform yang Anda daftarkan\n• Kepentingan legitim: data teknis untuk keamanan sistem dan pencegahan penipuan\n• Persetujuan eksplisit: untuk notifikasi pemasaran opsional\n\nSesuai Undang-Undang Perlindungan Data Pribadi (UU PDP) No. 27 Tahun 2022 Republik Indonesia.`,
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
      content: `Kami menerapkan langkah keamanan berikut:\n\n• Enkripsi HTTPS/TLS untuk seluruh koneksi\n• Hashing bcrypt untuk data sensitif\n• Autentikasi OAuth 2.0 via Google (tidak menyimpan password)\n• Akses database dibatasi oleh firewall dan role-based access control\n• Audit log untuk seluruh akses data sensitif`,
    },
    {
      icon: Eye,
      title: "6. Hak Pemilik Data",
      content: `Sesuai UU PDP, Anda berhak untuk:\n\n• Mengakses: meminta salinan data pribadi yang kami simpan\n• Mengoreksi: memperbarui data yang tidak akurat melalui dashboard\n• Menghapus: meminta penghapusan akun dan data terkait (proses 30 hari kerja)\n• Portabilitas: mengekspor data transaksi dalam format CSV\n• Keberatan: menolak pemrosesan data untuk tujuan pemasaran\n\nAjukan permintaan ke: halo@etalase.online dengan subjek "Permintaan Hak Data Pribadi".`,
    },
    {
      icon: Lock,
      title: "7. Retensi Data",
      content: `Data akun aktif disimpan selama akun berstatus aktif. Data transaksi disimpan minimal 5 tahun untuk keperluan perpajakan sesuai regulasi Indonesia. Setelah akun dihapus, data anonim (agregat) dapat disimpan untuk keperluan statistik internal.`,
    },
    {
      icon: Lock,
      title: "8. Cookie & Teknologi Pelacakan",
      content: `Kami menggunakan cookie sesi untuk autentikasi dan cookie analitik (opsional, dapat dinonaktifkan). Untuk Tenant paket PRO yang mengaktifkan Meta Pixel atau Google Analytics 4, teknologi pelacakan tersebut dioperasikan langsung oleh Tenant dan tunduk pada kebijakan privasi Meta/Google masing-masing.`,
    },
    {
      icon: Lock,
      title: "9. Kontak Data Protection Officer (DPO)",
      content: `Untuk pertanyaan atau keluhan terkait privasi data:\n\nEmail: halo@etalase.online\nAlamat: PT Rafa Kreasindo Teknologi, Jl. Nias Dalam No. 14, Bandung, Jawa Barat 40115\n\nKami akan merespons dalam 14 hari kerja.`,
    },
    {
      icon: Lock,
      title: "10. Perubahan Kebijakan",
      content: `Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan material akan diberitahukan melalui email terdaftar minimal 14 hari sebelum berlaku. Versi terbaru selalu tersedia di halaman ini.`,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Dokumen Hukum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] leading-tight mb-3">
            Kebijakan Privasi
          </h1>
          <p className="text-sm text-[#57534E]">
            Berlaku untuk platform <strong>etalase.online</strong> yang dikelola oleh{" "}
            <strong>PT Rafa Kreasindo Teknologi</strong>. Sesuai UU PDP No. 27/2022. Terakhir diperbarui: November 2026.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
                <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#D94E28]" />
                  {s.title}
                </h2>
                <p className="text-sm text-[#57534E] leading-relaxed whitespace-pre-line">{s.content}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-[#E7E5E4] flex flex-wrap gap-4 text-xs text-[#57534E]">
          <Link href="/syarat" className="hover:text-[#D94E28] transition font-medium">Syarat &amp; Ketentuan →</Link>
          <Link href="/refund" className="hover:text-[#D94E28] transition font-medium">Kebijakan Pengembalian →</Link>
          <Link href="/kontak" className="hover:text-[#D94E28] transition font-medium">Hubungi Kami →</Link>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}
