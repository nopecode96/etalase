import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import {
  SEGMENT_PAGES,
  findSegmentBySlug,
} from "@/lib/constants/segments";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import {
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
  generateLocalizedMetadata,
  generateWebPageJsonLd,
} from "@/lib/seo/metadata-helper";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Eye,
  Sparkles,
  XCircle,
} from "lucide-react";

interface SegmentLandingProps {
  params: {
    segment: string;
  };
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({
  params,
  searchParams,
}: SegmentLandingProps): Promise<Metadata> {
  const seg = findSegmentBySlug(params.segment);
  if (!seg) {
    return {
      title: "Solusi | etalase.online",
    };
  }
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  return generateLocalizedMetadata({
    path: `/solusi/${seg.slug}`,
    locale,
    title: seg.metaTitle[locale] || seg.metaTitle.id,
    description: seg.metaDescription[locale] || seg.metaDescription.id,
    type: "website",
  });
}

export default function SegmentLandingPage({
  params,
  searchParams,
}: SegmentLandingProps) {
  const seg = findSegmentBySlug(params.segment);
  if (!seg) {
    notFound();
  }

  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: locale === "id" ? "Beranda" : "Home", url: "/" },
    { name: locale === "id" ? "Solusi" : "Solutions", url: getLocalizedHref("/solusi") },
    { name: seg.title[locale] || seg.title.id, url: getLocalizedHref(`/solusi/${seg.slug}`) },
  ]);
  const webPageJsonLd = generateWebPageJsonLd({
    url: getLocalizedHref(`/solusi/${seg.slug}`),
    name: seg.title[locale] || seg.title.id,
    description: seg.subtitle[locale] || seg.subtitle.id,
    locale,
  });
  const segmentFaqJsonLd = generateFaqJsonLd([
    {
      question:
        locale === "id"
          ? `Berapa biaya berjualan di kategori ${seg.slug} memakai etalase.online?`
          : `How much does etalase.online cost for ${seg.slug} sellers?`,
      answer:
        locale === "id"
          ? "Order langsung via chat WhatsApp 0% komisi di semua paket. Pembayaran QRIS dikenai 4,5% (min. Rp 15.000) pada Paket Gratis atau 2% (min. Rp 25.000) pada Paket PRO Rp 49.000/bulan. Penarikan saldo minimum Rp 50.000."
          : "Direct WhatsApp orders carry 0% commission across all plans. Automated QRIS is 4.5% (min Rp 15,000) on Free or 2% (min Rp 25,000) on PRO (Rp 49,000/month), with Rp 50,000 minimum payouts.",
    },
    {
      question:
        locale === "id"
          ? `Apakah ada contoh tampilan untuk kategori ${seg.slug}?`
          : `Is there a live sample preview for ${seg.slug}?`,
      answer: `Ya, contoh tampilan tersedia di https://${seg.demoSubdomain} menggunakan template ${seg.templateId}.`,
    },
  ]);

  const registerHref = `${getLocalizedHref("/register")}?category=${encodeURIComponent(
    seg.categoryParam
  )}&template=${encodeURIComponent(seg.templateId)}`;

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(segmentFaqJsonLd) }}
      />
      <GlobalHeader />

      <main className="flex-1">
        {/* Segment Switcher Pills */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex flex-wrap items-center justify-between gap-3 w-full">
          <nav aria-label="Breadcrumb" className="text-xs text-[#57534E] flex items-center gap-2">
            <Link href={getLocalizedHref("/")} className="hover:text-[#D94E28]">
              {locale === "id" ? "Beranda" : "Home"}
            </Link>
            <span>/</span>
            <Link href={getLocalizedHref("/solusi")} className="hover:text-[#D94E28]">
              {locale === "id" ? "Solusi" : "Solutions"}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#1C1917] capitalize">{seg.slug}</span>
          </nav>

          <div className="flex flex-wrap gap-1.5">
            {SEGMENT_PAGES.map((item) => (
              <Link
                key={item.slug}
                href={getLocalizedHref(`/solusi/${item.slug}`)}
                className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition ${
                  item.slug === seg.slug
                    ? "bg-[#D94E28] text-white border-[#D94E28]"
                    : "bg-white text-[#57534E] border-[#E7E5E4] hover:border-[#D94E28]/50"
                }`}
              >
                /{item.slug}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-10 pb-12 px-4 sm:px-6 max-w-6xl mx-auto w-full text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{seg.badge[locale] || seg.badge.id}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.15]">
            {seg.title[locale] || seg.title.id}
          </h1>

          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {seg.subtitle[locale] || seg.subtitle.id}
          </p>

          {/* Direct CTA + Demo Store CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={registerHref}
              className="w-full sm:w-auto bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-7 py-3.5 rounded-xl text-sm shadow-xs transition inline-flex items-center justify-center gap-2"
            >
              <span>{seg.ctaText[locale] || seg.ctaText.id}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://${seg.demoSubdomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white hover:bg-[#FAF8F5] border border-[#E7E5E4] text-[#1C1917] font-semibold px-6 py-3.5 rounded-xl text-sm transition inline-flex items-center justify-center gap-2 shadow-2xs"
            >
              <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold inline-flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>Contoh tampilan</span>
              </span>
              <span>{seg.demoLabel}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D94E28]" />
            </a>
          </div>

          {/* Highlight Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            {(seg.highlights[locale] || seg.highlights.id).map((h) => (
              <span
                key={h}
                className="text-xs font-semibold bg-white border border-[#E7E5E4] text-[#1C1917] px-3.5 py-1.5 rounded-full"
              >
                ✓ {h}
              </span>
            ))}
          </div>
        </section>

        {/* Pain Points vs Solution Grid */}
        <section className="pb-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>
                  {locale === "id"
                    ? "Kendala Umum Sebelumnya"
                    : "Common Friction Without etalase.online"}
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-red-950/80 leading-relaxed">
                {(seg.painPoints[locale] || seg.painPoints.id).map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">&times;</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FDF0EC]/70 border border-[#FADCD3] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#D94E28] font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {locale === "id"
                    ? "Solusi dengan etalase.online"
                    : "How etalase.online Solves It"}
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-[#1C1917] leading-relaxed">
                {(seg.solutions[locale] || seg.solutions.id).map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Transparent Pricing Summary */}
          <div className="mt-8 bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-[#1C1917]">
                {locale === "id"
                  ? "Mulai Gratis, Upgrade PRO Hanya Rp 49.000/bulan"
                  : "Start Free, Upgrade PRO Anytime for Rp 49,000/month"}
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E]">
                {locale === "id"
                  ? "Order WhatsApp 0% komisi di semua paket • QRIS otomatis 4,5% (Free) atau 2% (PRO) • Penarikan min. Rp 50.000."
                  : "0% commission on WhatsApp orders • Instant QRIS 4.5% (Free) or 2% (PRO) • Minimum payout Rp 50,000."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href={registerHref}
                className="bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm transition inline-flex items-center gap-2"
              >
                <span>{seg.ctaText[locale] || seg.ctaText.id}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={getLocalizedHref("/harga")}
                className="bg-[#FAF8F5] hover:bg-stone-100 border border-[#E7E5E4] text-[#1C1917] font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm transition"
              >
                {locale === "id" ? "Detail Biaya" : "Pricing Details"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
