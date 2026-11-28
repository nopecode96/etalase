export type AdminLocale = "id" | "en" | "ms" | "th" | "vi";

export const ADMIN_LOCALE_COOKIE = "etalase_admin_locale";

export const ADMIN_LOCALE_OPTIONS: { code: AdminLocale; label: string; flag: string }[] = [
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ms", label: "Melayu", flag: "🇲🇾" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
];

export interface AdminTranslations {
  nav: {
    overview: string;
    storefront: string;
    templatesTheme: string;
    contentBlocks: string;
    productsPromos: string;
    allProducts: string;
    flashSalePromos: string;
    ordersPayouts: string;
    customerOrders: string;
    walletWithdrawals: string;
    analyticsPixel: string;
    settings: string;
    storeProfile: string;
    customDomain: string;
    integrations: string;
    upgradePlan: string;
  };
  shell: {
    tenantConsole: string;
    liveStorefront: string;
    storeGuide: string;
    signOut: string;
    openNav: string;
  };
}

export const ADMIN_DICT: Record<AdminLocale, AdminTranslations> = {
  id: {
    nav: {
      overview: "Ringkasan",
      storefront: "Etalase Toko",
      templatesTheme: "Template & Tema",
      contentBlocks: "Blok Konten",
      productsPromos: "Produk & Promo",
      allProducts: "Semua Produk",
      flashSalePromos: "Flash Sale & Promo",
      ordersPayouts: "Pesanan & Pencairan",
      customerOrders: "Pesanan Pelanggan",
      walletWithdrawals: "Dompet & Pencairan",
      analyticsPixel: "Analitik & Pixel",
      settings: "Pengaturan",
      storeProfile: "Profil Toko",
      customDomain: "Domain Kustom",
      integrations: "Integrasi",
      upgradePlan: "Upgrade Paket",
    },
    shell: {
      tenantConsole: "Konsol Toko",
      liveStorefront: "Lihat Toko",
      storeGuide: "Panduan",
      signOut: "Keluar",
      openNav: "Buka Navigasi",
    },
  },
  en: {
    nav: {
      overview: "Overview",
      storefront: "Storefront",
      templatesTheme: "Templates & Theme",
      contentBlocks: "Content Blocks",
      productsPromos: "Products & Promos",
      allProducts: "All Products",
      flashSalePromos: "Flash Sale & Promos",
      ordersPayouts: "Orders & Payouts",
      customerOrders: "Customer Orders",
      walletWithdrawals: "Wallet & Withdrawals",
      analyticsPixel: "Analytics & Pixel",
      settings: "Settings",
      storeProfile: "Store Profile",
      customDomain: "Custom Domain",
      integrations: "Integrations",
      upgradePlan: "Upgrade Plan",
    },
    shell: {
      tenantConsole: "Tenant Console",
      liveStorefront: "Live Storefront",
      storeGuide: "Store Guide",
      signOut: "Sign Out",
      openNav: "Open Navigation",
    },
  },
  ms: {
    nav: {
      overview: "Ringkasan",
      storefront: "Etalase Kedai",
      templatesTheme: "Templat & Tema",
      contentBlocks: "Blok Kandungan",
      productsPromos: "Produk & Promo",
      allProducts: "Semua Produk",
      flashSalePromos: "Jualan Kilat & Promo",
      ordersPayouts: "Pesanan & Pengeluaran",
      customerOrders: "Pesanan Pelanggan",
      walletWithdrawals: "Dompet & Pengeluaran",
      analyticsPixel: "Analitik & Pixel",
      settings: "Tetapan",
      storeProfile: "Profil Kedai",
      customDomain: "Domain Tersuai",
      integrations: "Integrasi",
      upgradePlan: "Naik Taraf Pelan",
    },
    shell: {
      tenantConsole: "Konsol Kedai",
      liveStorefront: "Lihat Kedai",
      storeGuide: "Panduan",
      signOut: "Log Keluar",
      openNav: "Buka Navigasi",
    },
  },
  th: {
    nav: {
      overview: "ภาพรวม",
      storefront: "หน้าร้าน",
      templatesTheme: "เทมเพลตและธีม",
      contentBlocks: "บล็อกเนื้อหา",
      productsPromos: "สินค้าและโปรโมชั่น",
      allProducts: "สินค้าทั้งหมด",
      flashSalePromos: "แฟลชเซลและโปรโมชั่น",
      ordersPayouts: "คำสั่งซื้อและการถอนเงิน",
      customerOrders: "คำสั่งซื้อลูกค้า",
      walletWithdrawals: "กระเป๋าเงินและการถอนเงิน",
      analyticsPixel: "การวิเคราะห์และพิกเซล",
      settings: "การตั้งค่า",
      storeProfile: "โปรไฟล์ร้านค้า",
      customDomain: "โดเมนที่กำหนดเอง",
      integrations: "การเชื่อมต่อ",
      upgradePlan: "อัปเกรดแพ็กเกจ",
    },
    shell: {
      tenantConsole: "คอนโซลร้านค้า",
      liveStorefront: "ดูหน้าร้าน",
      storeGuide: "คู่มือ",
      signOut: "ออกจากระบบ",
      openNav: "เปิดเมนู",
    },
  },
  vi: {
    nav: {
      overview: "Tổng quan",
      storefront: "Cửa hàng",
      templatesTheme: "Giao diện & Chủ đề",
      contentBlocks: "Khối nội dung",
      productsPromos: "Sản phẩm & Khuyến mãi",
      allProducts: "Tất cả sản phẩm",
      flashSalePromos: "Flash Sale & Khuyến mãi",
      ordersPayouts: "Đơn hàng & Thanh toán",
      customerOrders: "Đơn hàng khách",
      walletWithdrawals: "Ví & Rút tiền",
      analyticsPixel: "Phân tích & Pixel",
      settings: "Cài đặt",
      storeProfile: "Hồ sơ cửa hàng",
      customDomain: "Tên miền riêng",
      integrations: "Tích hợp",
      upgradePlan: "Nâng cấp gói",
    },
    shell: {
      tenantConsole: "Bảng điều khiển",
      liveStorefront: "Xem cửa hàng",
      storeGuide: "Hướng dẫn",
      signOut: "Đăng xuất",
      openNav: "Mở điều hướng",
    },
  },
};

export function normalizeAdminLocale(raw?: string | null): AdminLocale {
  if (raw === "en" || raw === "ms" || raw === "th" || raw === "vi" || raw === "id") {
    return raw;
  }
  return "id";
}
