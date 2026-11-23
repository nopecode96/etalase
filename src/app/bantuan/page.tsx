import React from "react";
import { Metadata } from "next";
import { BantuanClient } from "@/components/bantuan/BantuanClient";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import { generateLocalizedMetadata } from "@/lib/seo/metadata-helper";

interface BantuanPageProps {
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: BantuanPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const titles: Record<SupportedLocale, string> = {
    id: "Pusat Bantuan & Panduan — etalase.online",
    en: "Help Center & Documentation — etalase.online",
    ms: "Pusat Bantuan & Panduan — etalase.online",
    th: "ศูนย์ช่วยเหลือและฐานความรู้ — etalase.online",
    vi: "Trung Tâm Trợ Giúp & Hướng Dẫn — etalase.online",
  };

  const descriptions: Record<SupportedLocale, string> = {
    id: "Temukan jawaban cepat seputar pengaturan etalase, pengiriman WhatsApp otomatis, aktivasi domain, dan pembayaran FinTech.",
    en: "Find quick answers regarding storefront setup, automated WhatsApp file delivery, custom domain mapping, and FinTech checkouts.",
    ms: "Dapatkan jawapan pantas tentang persediaan etalase, penghantaran WhatsApp automatik, domain kustom dan bayaran tanpa tunai.",
    th: "ค้นหาคำตอบอย่างรวดเร็วเกี่ยวกับการตั้งค่าหน้าร้าน, ระบบส่งไฟล์ทาง WhatsApp อัตโนมัติ, การเชื่อมต่อโดเมน และการรับชำระเงิน",
    vi: "Tìm kiếm câu trả lời nhanh chóng về thiết lập storefront, tự động gửi file qua WhatsApp, trỏ tên miền riêng và cổng thanh toán.",
  };

  return generateLocalizedMetadata({
    path: "/bantuan",
    locale,
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    type: "website",
  });
}

export default function BantuanPage({ searchParams }: BantuanPageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  return <BantuanClient locale={locale} />;
}
