import { Metadata } from "next";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { RefreshCw, ShieldCheck, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kebijakan Pengembalian & Refund | etalase.online",
  description: "Kebijakan pengembalian dana dan produk pada platform etalase.online.",
};

export default function RefundPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Dokumen Hukum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] leading-tight mb-3">
            Kebijakan Pengembalian &amp; Refund
          </h1>
          <p className="text-sm text-[#57534E]">
            Berlaku untuk pembelian di platform <strong>etalase.online</strong>. Terakhir diperbarui: November 2026.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
            <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D94E28]" />
              1. Produk Digital (E-book, Template, File)
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Produk digital bersifat <strong>tidak dapat dikembalikan</strong> setelah berhasil diunduh atau dikirim ke
              pembeli, mengingat sifat produk yang langsung dapat digunakan setelah distribusi. Pengecualian berlaku
              apabila:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[#57534E]">
              <li className="flex items-start gap-2">
                <span className="text-[#D94E28] font-bold mt-0.5">•</span>
                Produk tidak terkirim dalam 24 jam meski transaksi berhasil
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D94E28] font-bold mt-0.5">•</span>
                File produk rusak/tidak dapat dibuka dan Tenant tidak responsif dalam 3×24 jam
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D94E28] font-bold mt-0.5">•</span>
                Produk yang diterima berbeda signifikan dari deskripsi yang tertera
              </li>
            </ul>
          </div>

          <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
            <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D94E28]" />
              2. Produk Fisik
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Kebijakan pengembalian produk fisik sepenuhnya menjadi tanggung jawab Tenant (penjual) masing-masing.
              Platform etalase.online tidak terlibat langsung dalam transaksi fisik dan pengiriman. Pembeli harus
              menghubungi Tenant terkait langsung melalui WhatsApp atau kontak yang tertera di toko mereka.
            </p>
          </div>

          <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
            <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D94E28]" />
              3. Biaya Berlangganan PRO
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Biaya berlangganan PRO (Rp 49.000/bulan atau Rp 468.000/tahun) dapat direfund penuh apabila:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[#57534E]">
              <li className="flex items-start gap-2">
                <span className="text-[#D94E28] font-bold mt-0.5">•</span>
                Permintaan diajukan dalam <strong>7 hari pertama</strong> setelah pembayaran
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D94E28] font-bold mt-0.5">•</span>
                Fitur PRO belum digunakan secara signifikan (custom domain belum dikonfigurasi, dll.)
              </li>
            </ul>
            <p className="mt-3 text-sm text-[#57534E]">
              Setelah 7 hari atau setelah fitur PRO aktif digunakan, biaya langganan tidak dapat dikembalikan.
            </p>
          </div>

          <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
            <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D94E28]" />
              4. Proses Pengajuan Dispute & Timeline
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Untuk mengajukan dispute atau refund, hubungi kami melalui:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[#57534E]">
              <li className="flex items-start gap-2">
                <span className="text-[#D94E28] font-bold mt-0.5">•</span>
                <span>CS Rani via Telegram: <a href="https://t.me/etalaseonline_bot" className="text-sky-600 hover:underline font-medium" target="_blank" rel="noreferrer">@etalaseonline_bot</a></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D94E28] font-bold mt-0.5">•</span>
                <span>Email: <a href="mailto:halo@etalase.online" className="text-sky-600 hover:underline font-medium">halo@etalase.online</a> dengan subjek &quot;Dispute #NomorOrder&quot;</span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-[#57534E]">
              <strong>Timeline resolusi: 3–7 hari kerja</strong> sejak laporan lengkap diterima. Refund yang disetujui
              akan dikembalikan ke metode pembayaran asal dalam 1–5 hari kerja tambahan (tergantung kebijakan bank/
              payment gateway).
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E7E5E4] flex flex-wrap gap-4 text-xs text-[#57534E]">
          <Link href="/syarat" className="hover:text-[#D94E28] transition font-medium">Syarat &amp; Ketentuan →</Link>
          <Link href="/privasi" className="hover:text-[#D94E28] transition font-medium">Kebijakan Privasi →</Link>
          <Link href="/kontak" className="hover:text-[#D94E28] transition font-medium">Hubungi Kami →</Link>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}
