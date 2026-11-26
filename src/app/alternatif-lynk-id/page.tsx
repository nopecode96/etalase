import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { AlternatifCalculatorClient } from "@/components/pricing/AlternatifCalculatorClient";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import {
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
  generateLocalizedMetadata,
  generateWebPageJsonLd,
} from "@/lib/seo/metadata-helper";
import { Sparkles } from "lucide-react";

interface AlternatifPageProps {
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: AlternatifPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  return generateLocalizedMetadata({
    path: "/alternatif-lynk-id",
    locale,
    title: "Alternatif Lynk.id untuk Jualan WhatsApp & QRIS | etalase.online",
    description:
      "Bandingkan biaya transaksi secara jujur dengan kalkulator interaktif. 0% komisi order WhatsApp, QRIS mulai 2% (PRO) / 4,5% (Free), dan katalog UMKM hingga Showroom.",
    type: "website",
    keywords: [
      "alternatif lynk id",
      "perbandingan lynk id vs etalase online",
      "bio link checkout whatsapp",
      "kalkulator fee bio link",
    ],
  });
}

export default function AlternatifLynkIdPage({ searchParams }: AlternatifPageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: "Beranda", url: "/" },
    { name: "Alternatif Lynk.id", url: "/alternatif-lynk-id" },
  ]);
  const webPageJsonLd = generateWebPageJsonLd({
    url: "/alternatif-lynk-id",
    name: "Alternatif Lynk.id untuk Jualan WhatsApp & QRIS | etalase.online",
    description:
      "Perbandingan transparan biaya order WhatsApp (0% komisi), checkout QRIS (4,5% Free min. Rp 15rb / 2% PRO min. Rp 25rb), dan template katalog Showroom/Cafe.",
    locale,
  });
  const faqJsonLd = generateFaqJsonLd([
    {
      question: "Mengapa memilih etalase.online sebagai alternatif bio-link untuk jualan WhatsApp?",
      answer:
        "Semua pesanan langsung via WhatsApp di etalase.online dikenai 0% komisi, sedangkan pembayaran otomatis QRIS dikenai 4,5% (Free, min. Rp 15.000) atau 2% (PRO Rp 49.000/bln, min. Rp 25.000) dengan opsi Convenience Fee serta template khusus kafe dan showroom.",
    },
    {
      question: "Apakah kalkulator perbandingan fee di halaman ini transparan?",
      answer:
        "Ya. Persentase biaya platform pembanding dapat disesuaikan bebas lewat slider (1%–15%), dan total biaya PRO Rp 49.000/bulan ikut diperhitungkan secara terbuka termasuk catatan kapan Paket Gratis lebih hemat untuk omzet kecil.",
    },
  ]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GlobalHeader />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 pt-8 pb-24">
        <nav aria-label="Breadcrumb" className="text-xs text-[#57534E] flex items-center gap-2 mb-8">
          <Link href={locale === "id" ? "/" : `/${locale}`} className="hover:text-[#D94E28]">
            Beranda
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#1C1917]">Alternatif Lynk.id &amp; Kalkulator Fee</span>
        </nav>

        <section className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Perbandingan Transparan</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.15]">
            Alternatif Bio-Link yang Fokus Closing di WhatsApp &amp; Katalog Bisnis
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Jika Anda membutuhkan bio-link yang menerima pesanan langsung ke WhatsApp (0% komisi), katalog produk fisik, menu kafe, atau checkout QRIS dengan biaya jelas, hitung langsung selisihnya di bawah ini.
          </p>
        </section>

        <AlternatifCalculatorClient locale={locale} />
      </main>

      <GlobalFooter />
    </div>
  );
}
