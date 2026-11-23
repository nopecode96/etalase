import React from "react";
import { Metadata } from "next";
import { HargaClient } from "@/components/pricing/HargaClient";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import { generateLocalizedMetadata } from "@/lib/seo/metadata-helper";

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

export default function HargaPage({ searchParams }: HargaPageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  return <HargaClient locale={locale} />;
}
