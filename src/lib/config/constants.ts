export const RESERVED_SLUGS = [
  "mabes",
  "flow",
  "n8n",
  "admin",
  "app",
  "api",
  "www",
  "auth",
  "login",
  "onboarding",
  "billing",
  "cdn",
  "static",
  "assets",
  "help",
  "support",
  "blog",
  "demo",
  "creator",
  "sales",
  "umkm",
  "tools",
  "fitur",
  "solusi",
  "harga",
  "bantuan",
  "kontak",
  "template",
  "templates",
  "pricing",
] as const;

export const SUPPORTED_LOCALES = ["id", "en", "ms", "th", "vi"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const SUPPORTED_CURRENCIES = [
  "IDR",
  "MYR",
  "SGD",
  "THB",
  "PHP",
  "VND",
  "USD",
] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const TIER_RULES = {
  FREE: {
    name: "Free",
    templates: ["clean-minimal", "classic-dark", "catalog-grid"],
    customDomain: false,
    customTheme: false,
    watermark: true,
    platformFeePercent: 3.5,
  },
  PRO: {
    name: "Pro",
    templates: [
      "clean-minimal",
      "classic-dark",
      "catalog-grid",
      "sage-creator",
      "editorial-paper",
      "boutique-visual",
      "sales-showcase",
      "cafe-menu",
      "beauty-glam",
      "midnight-glow",
      "wellness-pro",
    ],
    customDomain: true,
    customTheme: true,
    watermark: false,
    platformFeePercent: 1.0,
  },
  DFY_BUSINESS: {
    name: "Terima Beres",
    templates: "ALL",
    customDomain: true,
    customTheme: true,
    watermark: false,
    platformFeePercent: 0,
  },
} as const;

export const MARKETPLACE_PRESETS = {
  TIKTOK_SHOP: {
    name: "TikTok Shop",
    badgeColor: "#FE2C55",
    labels: {
      id: "Keranjang Kuning",
      ms: "Beg Kuning",
      en: "Yellow Basket",
      th: "ตะกร้าเหลือง",
      vi: "Giỏ hàng vàng",
    },
    seaWide: true,
  },
  SHOPEE: {
    name: "Shopee",
    badgeColor: "#EE4D2D",
    labels: {
      id: "Shopee (Toko Orange)",
      ms: "Shopee (App Oren)",
      en: "Shopee (Orange App)",
      th: "Shopee (แอปส้ม)",
      vi: "Shopee (Sàn Cam)",
    },
    seaWide: true,
  },
  LAZADA: {
    name: "Lazada",
    badgeColor: "#0F146D",
    labels: {
      id: "Lazada",
      ms: "Lazada (App Biru)",
      en: "Lazada (Blue App)",
      th: "Lazada (แอปน้ำเงิน)",
      vi: "Lazada (Sàn Xanh)",
    },
    seaWide: true,
  },
  TOKOPEDIA: {
    name: "Tokopedia",
    badgeColor: "#03AC0E",
    labels: {
      id: "Tokopedia (Toko Hijau)",
      ms: "Tokopedia",
      en: "Tokopedia",
      th: "Tokopedia",
      vi: "Tokopedia",
    },
    seaWide: false, // Indonesia only!
  },
  CUSTOM: {
    name: "Custom Link",
    badgeColor: "#3B82F6",
    labels: {
      id: "Beli Sekarang",
      ms: "Beli Sekarang",
      en: "Buy Now",
      th: "ซื้อเลย",
      vi: "Mua ngay",
    },
    seaWide: true,
  },
} as const;

export const CHAT_CHANNELS = {
  WHATSAPP: {
    name: "WhatsApp",
    prefix: "https://wa.me/",
    regions: ["id", "ms", "en"],
    badgeColor: "#25D366",
  },
  LINE: {
    name: "LINE",
    prefix: "https://line.me/ti/p/~",
    regions: ["th"],
    badgeColor: "#06C755",
  },
  ZALO: {
    name: "Zalo",
    prefix: "https://zalo.me/",
    regions: ["vi"],
    badgeColor: "#0068FF",
  },
  MESSENGER: {
    name: "Facebook Messenger",
    prefix: "https://m.me/",
    regions: ["en", "ph"],
    badgeColor: "#0084FF",
  },
  WECHAT: {
    name: "WeChat",
    prefix: "weixin://dl/chat?",
    regions: ["th", "vi"],
    badgeColor: "#07C160",
  },
  TELEGRAM: {
    name: "Telegram",
    prefix: "https://t.me/",
    regions: ["id", "ms", "en"],
    badgeColor: "#229ED9",
  },
} as const;
