import type { Metadata } from "next";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import { RegisterClient } from "@/components/auth/RegisterClient";

interface RegisterPageProps {
  searchParams?: {
    lang?: string;
    slug?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: RegisterPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const titles: Record<SupportedLocale, string> = {
    id: "Mulai Gratis dengan Google — Klaim Subdomain Tokomu | etalase.online",
    en: "Start Free with Google — Claim Your Storefront Subdomain | etalase.online",
    ms: "Mula Percuma dengan Google — Buka Kedai Etalase Anda | etalase.online",
    th: "เริ่มต้นใช้งานฟรีด้วย Google — เปิดหน้าร้านของคุณ | etalase.online",
    vi: "Bắt đầu miễn phí với Google — Mở cửa hàng ngay | etalase.online",
  };

  const descriptions: Record<SupportedLocale, string> = {
    id: "Klaim subdomain tokomu dalam 30 detik. Jual produk digital, katalog fisik, dan affiliate tanpa potongan komisi lewat link di bio WhatsApp.",
    en: "Claim your custom etalase subdomain in 30 seconds. Sell digital products, physical catalogs, and affiliate links with 0% commission.",
    ms: "Tuntut subdomain etalase anda dalam masa 30 saat. Jual produk digital, katalog fizikal, dan pautan affiliate tanpa potongan komisen.",
    th: "จองซับโดเมนร้านค้าของคุณได้ภายใน 30 วินาที ขายสินค้าดิจิทัล แคตตาล็อกสินค้า และลิงก์แอฟฟิลิเอต ค่าคอมมิชชัน 0% ผ่านลิงก์ในไบโอ",
    vi: "Sở hữu tên miền phụ cửa hàng trong 30 giây. Bán sản phẩm số, danh mục vật lý và link affiliate với 0% hoa hồng qua link bio.",
  };

  const canonicalPath = locale === "id" ? "/register" : `/${locale}/register`;

  return {
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    alternates: {
      canonical: `https://etalase.online${canonicalPath}`,
      languages: {
        id: "https://etalase.online/register",
        en: "https://etalase.online/en/register",
        ms: "https://etalase.online/ms/register",
        th: "https://etalase.online/th/register",
        vi: "https://etalase.online/vi/register",
        "x-default": "https://etalase.online/register",
      },
    },
    openGraph: {
      title: titles[locale] || titles.id,
      description: descriptions[locale] || descriptions.id,
      url: `https://etalase.online${canonicalPath}`,
      siteName: "etalase.online",
      type: "website",
    },
  };
}

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const slug = searchParams?.slug || "";

  return <RegisterClient locale={locale} initialSlug={slug} />;
}
