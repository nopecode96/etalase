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
  "Konsultasi & Jasa": {
    id: "Konsultasi & Jasa",
    en: "Coaching & Services",
    ms: "Konsultasi & Servis",
    th: "บริการและที่ปรึกษา",
    vi: "Tư vấn & Dịch vụ",
  },
  "Kuliner & F&B": {
    id: "Kuliner & F&B",
    en: "Culinary & F&B",
    ms: "Kulinari & F&B",
    th: "อาหารและเครื่องดื่ม",
    vi: "Ẩm thực & F&B",
  },
  "Branding & Bisnis": {
    id: "Branding & Bisnis",
    en: "Branding & Domain",
    ms: "Penjenamaan & Bisnes",
    th: "การสร้างแบรนด์และธุรกิจ",
    vi: "Thương hiệu & Kinh doanh",
  },
  "Konversi & Promo": {
    id: "Konversi & Promo",
    en: "Conversion & Promos",
    ms: "Penukaran & Promosi",
    th: "โปรโมชันและยอดขาย",
    vi: "Chuyển đổi & Khuyến mãi",
  },
  "Kreator & Kursus": {
    id: "Kreator & Kursus",
    en: "Creators & Courses",
    ms: "Pencipta & Kursus",
    th: "ครีเอเตอร์และคอร์สเรียน",
    vi: "Nhà sáng tạo & Khóa học",
  },
};

export function getLocalizedCategory(rawCategory: string, locale: SupportedLocale): string {
  if (CATEGORY_TRANSLATIONS[rawCategory]?.[locale]) {
    return CATEGORY_TRANSLATIONS[rawCategory][locale];
  }
  return rawCategory;
}
