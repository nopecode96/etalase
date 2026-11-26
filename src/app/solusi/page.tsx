import React from "react";
import { Metadata } from "next";
import { SolusiClient } from "@/components/solusi/SolusiClient";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import {
  generateLocalizedMetadata,
  generateBreadcrumbJsonLd,
  generateWebPageJsonLd,
} from "@/lib/seo/metadata-helper";

interface SolusiPageProps {
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: SolusiPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const titles: Record<SupportedLocale, string> = {
    id: "Solusi Jualan Berdasarkan Industri — etalase.online",
    en: "Commerce Solutions by Industry — etalase.online",
    ms: "Penyelesaian Perniagaan Mengikut Industri — etalase.online",
    th: "โซลูชันการค้าตามประเภทธุรกิจ — etalase.online",
    vi: "Giải Pháp Bán Hàng Theo Ngành — etalase.online",
  };

  const descriptions: Record<SupportedLocale, string> = {
    id: "Solusi terarah untuk kreator digital, affiliator TikTok/Shopee, sales mobil/properti, kafe F&B, dan konsultan di Asia Tenggara.",
    en: "Targeted commerce solutions for digital creators, TikTok & Shopee affiliates, vehicle/property dealers, cafes, and consultants in Southeast Asia.",
    ms: "Penyelesaian terarah untuk pencipta digital, afiliasi TikTok/Shopee, jurujual kereta/hartanah, kafe F&B dan perunding.",
    th: "โซลูชันตรงจุดสำหรับครีเอเตอร์, แอฟฟิลิเอต TikTok/Shopee, ฝ่ายขายรถยนต์และอสังหาฯ, ร้านอาหารคาเฟ่ และที่ปรึกษา",
    vi: "Giải pháp tối ưu cho nhà sáng tạo số, tiếp thị liên kết TikTok/Shopee, tư vấn ô tô bất động sản, quán cafe và chuyên gia cố vấn.",
  };

  return generateLocalizedMetadata({
    path: "/solusi",
    locale,
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    type: "website",
  });
}

export default function SolusiPage({ searchParams }: SolusiPageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const path = locale === "id" ? "/solusi" : `/${locale}/solusi`;
  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: locale === "id" ? "Beranda" : "Home", url: locale === "id" ? "/" : `/${locale}` },
    { name: locale === "id" ? "Solusi" : "Solutions", url: path },
  ]);
  const webPageJsonLd = generateWebPageJsonLd({
    url: path,
    name: "Solusi Jualan Berdasarkan Industri — etalase.online",
    description:
      "Solusi etalase digital untuk kreator produk digital, afiliator TikTok/Shopee, sales showroom mobil/properti, cafe F&B, konsultan, dan UMKM.",
    locale,
  });

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
      <SolusiClient locale={locale} />
    </>
  );
}
