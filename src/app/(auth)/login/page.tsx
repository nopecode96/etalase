import type { Metadata } from "next";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";
import { LoginClient } from "@/components/auth/LoginClient";

interface LoginPageProps {
  searchParams?: {
    lang?: string;
    callbackUrl?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: LoginPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  // NOTE: User explicitly instructed: "https://etalase.online/login harus pakai English"
  // Default to English ('en') when /login is accessed or without lang param.
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "en";

  const titles: Record<SupportedLocale, string> = {
    en: "Sign in to your Etalase — etalase.online",
    id: "Masuk ke Etalase Anda — etalase.online",
    ms: "Log Masuk ke Etalase Anda — etalase.online",
    th: "เข้าสู่ระบบหน้าร้านของคุณ — etalase.online",
    vi: "Đăng nhập vào Etalase của bạn — etalase.online",
  };

  const descriptions: Record<SupportedLocale, string> = {
    en: "Sign in to manage your digital products, WhatsApp orders, physical catalog, and store analytics.",
    id: "Masuk untuk mengelola produk digital, pesanan WhatsApp, katalog fisik, dan analitik tokomu.",
    ms: "Log masuk untuk mengurus produk digital, pesanan WhatsApp, katalog fizikal, dan analitik kedai anda.",
    th: "เข้าสู่ระบบเพื่อจัดการสินค้าดิจิทัล คำสั่งซื้อ WhatsApp/LINE แคตตาล็อกสินค้า และสถิติร้านค้าของคุณ",
    vi: "Đăng nhập để quản lý sản phẩm số, đơn hàng WhatsApp/Zalo, danh mục vật lý và phân tích cửa hàng.",
  };

  const canonicalPath = locale === "en" ? "/login" : `/${locale}/login`;

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `https://etalase.online${canonicalPath}`,
      languages: {
        en: "https://etalase.online/login",
        id: "https://etalase.online/id/login",
        ms: "https://etalase.online/ms/login",
        th: "https://etalase.online/th/login",
        vi: "https://etalase.online/vi/login",
        "x-default": "https://etalase.online/login",
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `https://etalase.online${canonicalPath}`,
      siteName: "etalase.online",
      type: "website",
    },
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const rawLang = searchParams?.lang;
  // User explicitly requested: "https://etalase.online/login harus pakai English"
  // Default to 'en' when /login is accessed without locale param
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "en";

  const callbackUrl = searchParams?.callbackUrl || "/admin";

  return <LoginClient locale={locale} callbackUrl={callbackUrl} />;
}
