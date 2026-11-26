import React from "react";
import { Metadata } from "next";
import { HargaClient } from "@/components/pricing/HargaClient";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import {
  generateLocalizedMetadata,
  generateBreadcrumbJsonLd,
  generateWebPageJsonLd,
  generateSoftwareAppJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo/metadata-helper";
import { getCurrentUser } from "@/lib/auth/session";

interface HargaPageProps {
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: HargaPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const titles: Record<SupportedLocale, string> = {
    id: "Biaya & Paket Berlangganan — etalase.online",
    en: "Pricing & Plans — etalase.online",
    ms: "Pakej Harga & Langganan — etalase.online",
    th: "แพ็กเกจราคาและค่าบริการ — etalase.online",
    vi: "Bảng Giá Dịch Vụ — etalase.online",
  };

  const descriptions: Record<SupportedLocale, string> = {
    id: "Biaya transparan: 0% komisi order chat WhatsApp, paket gratis selamanya, dan paket Pro dengan custom domain pribadi.",
    en: "Transparent pricing: 0% chat commission, free forever tier, and Pro plan with custom apex domain support.",
    ms: "Harga telus: 0% komisen pesanan WhatsApp, pelan percuma selamanya, dan pelan Pro dengan domain kustom.",
    th: "ราคาโปร่งใส: 0% ค่าคอมมิชชันคำสั่งซื้อทางแชต, แพ็กเกจฟรีตลอดชีพ, และแพ็กเกจ Pro พร้อมเชื่อมต่อโดเมนส่วนตัว",
    vi: "Bảng giá minh bạch: 0% hoa hồng đơn hàng chat WhatsApp, gói miễn phí vĩnh viễn, và gói Pro hỗ trợ tên miền riêng.",
  };

  return generateLocalizedMetadata({
    path: "/harga",
    locale,
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    type: "website",
  });
}

export default async function HargaPage({ searchParams }: HargaPageProps) {
  const user = await getCurrentUser();
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const path = locale === "id" ? "/harga" : `/${locale}/harga`;
  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: locale === "id" ? "Beranda" : "Home", url: locale === "id" ? "/" : `/${locale}` },
    { name: locale === "id" ? "Harga" : "Pricing", url: path },
  ]);
  const webPageJsonLd = generateWebPageJsonLd({
    url: path,
    name: "Biaya & Paket Berlangganan etalase.online",
    description:
      "Gratis Selamanya (0% order WhatsApp, QRIS 4,5% min Rp 15rb, 1 template), Paket PRO Rp 49.000/bulan (QRIS 2% min Rp 25rb, 14 template, custom domain, pixel iklan), atau DFY Rp 899.000.",
    locale,
  });
  const softwareOffersJsonLd = generateSoftwareAppJsonLd();
  const pricingFaqJsonLd = generateFaqJsonLd([
    {
      question: "Berapa harga langganan paket PRO di etalase.online?",
      answer:
        "Paket PRO berbiaya Rp 49.000 per bulan, atau Rp 39.000 per bulan jika dibayar tahunan sebesar Rp 468.000 per tahun. Paket Gratis tetap tersedia selamanya seharga Rp 0.",
    },
    {
      question: "Berapa biaya transaksi QRIS dan minimum pencairan saldo?",
      answer:
        "Order via WhatsApp gratis (0% komisi) di semua paket. Checkout QRIS dikenai 4,5% (min. Rp 15.000) di paket Gratis atau 2% (min. Rp 25.000) di paket PRO. Minimum pencairan saldo ke bank adalah Rp 50.000; paket PRO mendapat gratis 4x penarikan per bulan dan Rp 2.500 setelah kuota habis.",
    },
  ]);

  return (
    <>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareOffersJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqJsonLd) }}
      />
      <HargaClient locale={locale} isAuthenticated={Boolean(user)} />
    </>
  );
}
