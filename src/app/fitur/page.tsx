import React from "react";
import { Metadata } from "next";
import { FiturClient } from "@/components/fitur/FiturClient";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import {
  generateLocalizedMetadata,
  generateBreadcrumbJsonLd,
  generateWebPageJsonLd,
} from "@/lib/seo/metadata-helper";

interface FiturPageProps {
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: FiturPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const titles: Record<SupportedLocale, string> = {
    id: "Katalog Fitur Lengkap — etalase.online",
    en: "Full Features Catalog — etalase.online",
    ms: "Katalog Ciri Lengkap — etalase.online",
    th: "แคตตาล็อกฟีเจอร์ครบครัน — etalase.online",
    vi: "Danh Mục Tính Năng Toàn Diện — etalase.online",
  };

  const descriptions: Record<SupportedLocale, string> = {
    id: "Pelajari ekosistem jualan terlengkap: auto-delivery produk digital ke WhatsApp, katalog showroom mobil/properti, booking 1-on-1, dan QRIS instan.",
    en: "Explore our complete selling ecosystem: automated digital product delivery to WhatsApp, showroom catalogs, 1-on-1 bookings, and instant QR checkouts.",
    ms: "Ketahui ekosistem jualan lengkap: penghantaran fail digital automatik ke WhatsApp, katalog bilik pameran, tempahan 1-on-1 dan bayaran QR pantas.",
    th: "สำรวจฟีเจอร์ทั้งหมด: ส่งมอบไฟล์ดิจิทัลอัตโนมัติถึง WhatsApp, แคตตาล็อกโชว์รูมรถยนต์และอสังหาฯ, ระบบจองเวลา และชำระเงินผ่าน QR ทันใจ",
    vi: "Khám phá hệ sinh thái bán hàng toàn diện: tự động gửi sản phẩm số qua WhatsApp, danh mục showroom, đặt lịch hẹn và cổng thanh toán QR tiện lợi.",
  };

  return generateLocalizedMetadata({
    path: "/fitur",
    locale,
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    type: "website",
  });
}

export default function FiturPage({ searchParams }: FiturPageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const path = locale === "id" ? "/fitur" : `/${locale}/fitur`;
  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: locale === "id" ? "Beranda" : "Home", url: locale === "id" ? "/" : `/${locale}` },
    { name: locale === "id" ? "Fitur" : "Features", url: path },
  ]);
  const webPageJsonLd = generateWebPageJsonLd({
    url: path,
    name: "Katalog Fitur Lengkap etalase.online",
    description:
      "Auto-delivery file digital ke WhatsApp, katalog showroom mobil/properti, booking 1-on-1, QRIS instan 2%/4,5%, custom domain + SSL, dan pixel tracking.",
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
      <FiturClient locale={locale} />
    </>
  );
}
