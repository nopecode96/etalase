import { SupportedLocale } from "@/lib/config/constants";

export const CATEGORY_TRANSLATIONS: Record<string, Record<SupportedLocale, string>> = {
  "Produk Digital": {
    id: "Produk Digital",
    en: "Digital Products",
    ms: "Produk Digital",
    th: "สินค้าดิจิทัล",
    vi: "Sản phẩm số",
  },
  "Sales & Properti": {
    id: "Sales & Properti",
    en: "Sales & Showroom",
    ms: "Jualan & Bilik Pameran",
    th: "ยานยนต์และอสังหาฯ",
    vi: "Kinh doanh & Showroom",
  },
  "Afiliasi": {
    id: "Afiliasi",
    en: "Affiliate Marketing",
    ms: "Afiliasi",
    th: "แอฟฟิลิเอต",
    vi: "Tiếp thị liên kết",
  },
  "Otomasi WhatsApp": {
    id: "Otomasi WhatsApp",
    en: "WhatsApp Automation",
    ms: "Automasi WhatsApp",
    th: "ระบบอัตโนมัติ",
    vi: "Tự động hóa WhatsApp",
  },
  "Eksplorasi Pasar SEA": {
    id: "Eksplorasi Pasar SEA",
    en: "SEA Market Exploration",
    ms: "Penerokaan Pasaran SEA",
    th: "การสำรวจตลาดเอเชียตะวันออกเฉียงใต้",
    vi: "Khám phá Thị trường Đông Nam Á",
  },
};

export function getLocalizedCategory(rawCategory: string, locale: SupportedLocale): string {
  if (CATEGORY_TRANSLATIONS[rawCategory]?.[locale]) {
    return CATEGORY_TRANSLATIONS[rawCategory][locale];
  }
  return rawCategory;
}
