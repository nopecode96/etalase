import React from "react";
import { Metadata } from "next";
import { ToolsClient } from "@/components/tools/ToolsClient";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import { generateLocalizedMetadata } from "@/lib/seo/metadata-helper";

interface ToolsPageProps {
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: ToolsPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const titles: Record<SupportedLocale, string> = {
    id: "Alat Bantu Bisnis Gratis — etalase.online",
    en: "Free Business Utility Tools — etalase.online",
    ms: "Alat Pertumbuhan Perniagaan Percuma — etalase.online",
    th: "เครื่องมือธุรกิจและคำนวณกำไรฟรี — etalase.online",
    vi: "Công Cụ Kinh Doanh Miễn Phí — etalase.online",
  };

  const descriptions: Record<SupportedLocale, string> = {
    id: "Generator link order WhatsApp/Zalo/LINE dan kalkulator penghematan komisi marketplace vs direct checkout storefront.",
    en: "Free direct chat order link generator (WhatsApp, Zalo, LINE) and marketplace fee savings calculator.",
    ms: "Penjana pautan pesanan WhatsApp/Zalo/LINE dan kalkulator penjimatan potongan pasaran vs storefront mandiri.",
    th: "ระบบสร้างลิงก์สั่งซื้อทางแชต (WhatsApp, Zalo, LINE) และเครื่องมือคำนวณเปรียบเทียบค่าคอมมิชชันมาร์เก็ตเพลสฟรี",
    vi: "Trình tạo liên kết đặt hàng qua chat (WhatsApp, Zalo, LINE) và công cụ tính toán tiết kiệm phí sàn thương mại điện tử.",
  };

  return generateLocalizedMetadata({
    path: "/tools",
    locale,
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    type: "website",
  });
}

export default function FreeToolsPage({ searchParams }: ToolsPageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  return <ToolsClient locale={locale} />;
}
