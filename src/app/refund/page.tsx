import { Metadata } from "next";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import {
  RefreshCw,
  ShieldCheck,
  Clock,
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
  path: "/refund",
  locale: "id",
  title: "Kebijakan Pengembalian & Refund | etalase.online",
  description:
    "Kebijakan pengembalian dana langganan PRO 7 hari, sengketa produk digital/fisik, dan resolusi dispute 3–7 hari kerja oleh PT Rafa Kreasindo Teknologi.",
  type: "website",
  keywords: ["kebijakan refund etalase online", "pengembalian dana pro", "dispute order"],
});

export default function RefundPage() {
  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: "Beranda", url: "/" },
    { name: "Kebijakan Refund", url: "/refund" },
  ]);
  const webPageJsonLd = generateWebPageJsonLd({
    url: "/refund",
    name: "Kebijakan Pengembalian & Refund — etalase.online",
    description:
      "Aturan pengembalian dana produk digital, produk fisik, serta jaminan refund 7 hari langganan PRO Rp 49.000/bulan.",
    locale: "id",
  });

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
          <span className="font-semibold text-[#1C1917]">Kebijakan Pengembalian &amp; Refund</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Dokumen Perlindungan Konsumen</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] leading-tight mb-3">
                Kebijakan Pengembalian &amp; Refund
              </h1>
              <p className="text-sm text-[#57534E]">
                Berlaku untuk pembelian di platform <strong>etalase.online</strong> yang dikelola oleh{" "}
                <strong>PT Rafa Kreasindo Teknologi</strong>. Terakhir diperbarui: November 2026.
              </p>
            </div>

            <section className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
              <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D94E28]" />
                <span>1. Produk Digital (E-book, Template, File)</span>
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Produk digital bersifat <strong>tidak dapat dikembalikan</strong> setelah berhasil diunduh atau dikirim ke
                pembeli, mengingat sifat produk yang langsung dapat digunakan setelah distribusi. Pengecualian berlaku
                apabila:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#57534E]">
                <li className="flex items-start gap-2">
                  <span className="text-[#D94E28] font-bold mt-0.5">&bull;</span>
                  <span>Produk tidak terkirim dalam 24 jam meski transaksi berhasil</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D94E28] font-bold mt-0.5">&bull;</span>
                  <span>File produk rusak/tidak dapat dibuka dan Tenant tidak responsif dalam 3&times;24 jam</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D94E28] font-bold mt-0.5">&bull;</span>
                  <span>Produk yang diterima berbeda signifikan dari deskripsi yang tertera</span>
                </li>
              </ul>
            </section>

            <section className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
              <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D94E28]" />
                <span>2. Produk Fisik</span>
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Kebijakan pengembalian produk fisik sepenuhnya menjadi tanggung jawab Tenant (penjual) masing-masing.
                Platform etalase.online tidak terlibat langsung dalam pengiriman barang fisik. Pembeli dapat menghubungi
                Tenant terkait langsung melalui WhatsApp atau kontak yang tertera pada etalase toko mereka.
              </p>
            </section>

            <section className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
              <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D94E28]" />
                <span>3. Biaya Berlangganan PRO</span>
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Biaya berlangganan PRO (Rp 49.000/bulan atau Rp 468.000/tahun) dapat direfund penuh apabila:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#57534E]">
                <li className="flex items-start gap-2">
                  <span className="text-[#D94E28] font-bold mt-0.5">&bull;</span>
                  <span>
                    Permintaan diajukan dalam <strong>7 hari pertama</strong> setelah pembayaran
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D94E28] font-bold mt-0.5">&bull;</span>
                  <span>
                    Fitur PRO belum digunakan secara signifikan (custom domain belum dikonfigurasi, dll.)
                  </span>
                </li>
              </ul>
              <p className="mt-3 text-sm text-[#57534E]">
                Anda juga dapat menghentikan perpanjangan otomatis PRO kapan saja sebelum siklus tagihan berikutnya.
              </p>
            </section>

            <section className="bg-white border border-[#E7E5E4] rounded-2xl p-6">
              <h2 className="text-base font-bold text-[#1C1917] mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D94E28]" />
                <span>4. Proses Pengajuan Dispute &amp; Timeline</span>
              </h2>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Untuk mengajukan dispute atau refund, hubungi kami melalui:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#57534E]">
                <li className="flex items-start gap-2">
                  <span className="text-[#D94E28] font-bold mt-0.5">&bull;</span>
                  <span>
                    Grup WhatsApp Support Resmi:{" "}
                    <a
                      href={OFFICIAL_WHATSAPP_GROUP_URL}
                      className="text-emerald-700 hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gabung Grup Support WhatsApp
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D94E28] font-bold mt-0.5">&bull;</span>
                  <span>
                    Email:{" "}
                    <a href="mailto:halo@etalase.online" className="text-[#D94E28] hover:underline font-medium">
                      halo@etalase.online
                    </a>{" "}
                    atau{" "}
                    <a href="mailto:support@etalase.online" className="text-[#D94E28] hover:underline font-medium">
                      support@etalase.online
                    </a>{" "}
                    dengan subjek &quot;Dispute #NomorOrder&quot;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D94E28] font-bold mt-0.5">&bull;</span>
                  <span>
                    CS Rani via Telegram:{" "}
                    <a
                      href="https://t.me/etalaseonline_bot"
                      className="text-sky-600 hover:underline font-medium"
                      target="_blank"
                      rel="noreferrer"
                    >
                      @etalaseonline_bot
                    </a>
                  </span>
                </li>
              </ul>
              <p className="mt-3 text-sm text-[#57534E]">
                <strong>Timeline resolusi: 3–7 hari kerja</strong> sejak laporan lengkap diterima. Refund yang disetujui
                akan dikembalikan ke metode pembayaran asal dalam 1–5 hari kerja tambahan (tergantung kebijakan bank /
                payment gateway).
              </p>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
            <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D94E28]">
                <Building className="w-4 h-4" />
                <span>Tim Resolusi &amp; CS Resmi</span>
              </div>
              <div className="text-xs text-[#57534E] space-y-2 leading-relaxed">
                <p className="font-bold text-sm text-[#1C1917]">PT Rafa Kreasindo Teknologi</p>
                <p>Jl. Nias Dalam No. 14, Bandung, Jawa Barat 40115, Indonesia</p>
                <p>Operasional: Senin–Sabtu 08:00–21:00 WIB</p>
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
                  href="mailto:support@etalase.online"
                  className="flex items-center gap-2 font-medium text-[#1C1917] hover:text-[#D94E28]"
                >
                  <Mail className="w-4 h-4 text-[#D94E28] shrink-0" />
                  <span>support@etalase.online</span>
                </a>
                <a
                  href="mailto:halo@etalase.online"
                  className="flex items-center gap-2 font-medium text-[#1C1917] hover:text-[#D94E28]"
                >
                  <Mail className="w-4 h-4 text-[#D94E28] shrink-0" />
                  <span>halo@etalase.online</span>
                </a>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl p-6 space-y-2.5 text-xs">
              <div className="font-bold text-[#1C1917] uppercase tracking-wider text-[11px]">
                Dokumen Hukum &amp; Bantuan
              </div>
              <ul className="space-y-2 text-[#57534E]">
                <li>
                  <Link href="/syarat" className="hover:text-[#D94E28] font-medium transition">
                    Syarat &amp; Ketentuan →
                  </Link>
                </li>
                <li>
                  <Link href="/privasi" className="hover:text-[#D94E28] font-medium transition">
                    Kebijakan Privasi →
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
