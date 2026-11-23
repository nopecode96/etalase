import { SupportedCurrency, SupportedLocale } from "../config/constants";

export interface ChatChannelConfig {
  id: string;
  name: string;
  badgeColor: string;
  placeholder: string;
  iconName: string;
  popularCountries: string[]; // e.g. ["ID", "MY", "SG"]
  buildUrl: (handle: string, message?: string) => string;
}

export interface MarketplaceConfig {
  id: string;
  name: string;
  badgeColor: string;
  labels: Record<SupportedLocale, string>;
  popularCountries: string[];
  seaWide: boolean;
}

export interface SeaCountryProfile {
  code: string;
  name: string;
  flag: string;
  currency: SupportedCurrency;
  currencySymbol: string;
  locale: SupportedLocale;
  primaryChat: string;
  supportedChats: string[];
  popularMarketplaces: string[];
  paymentGateways: string[];
}

// -------------------------------------------------------------
// 1. MASTER DATA: CHAT CHANNELS
// -------------------------------------------------------------
export const CHAT_CHANNELS_REGISTRY: Record<string, ChatChannelConfig> = {
  WHATSAPP: {
    id: "WHATSAPP",
    name: "WhatsApp",
    badgeColor: "#25D366",
    placeholder: "Misal: 628123456789 atau 08123456789",
    iconName: "MessageCircle",
    popularCountries: ["ID", "MY", "SG", "PH"],
    buildUrl: (handle: string, message?: string) => {
      let phone = handle.replace(/\D/g, "");
      if (phone.startsWith("0")) {
        phone = "62" + phone.slice(1);
      }
      const encoded = message ? encodeURIComponent(message) : "";
      return `https://wa.me/${phone}${encoded ? `?text=${encoded}` : ""}`;
    },
  },
  LINE: {
    id: "LINE",
    name: "LINE",
    badgeColor: "#00C300",
    placeholder: "ID Akun LINE (cth: @namatoko)",
    iconName: "MessageSquare",
    popularCountries: ["TH", "ID"],
    buildUrl: (handle: string) => {
      const clean = handle.startsWith("@") ? handle.slice(1) : handle;
      return `https://line.me/ti/p/~${clean}`;
    },
  },
  ZALO: {
    id: "ZALO",
    name: "Zalo",
    badgeColor: "#0068FF",
    placeholder: "Nomor Telepon Zalo (cth: 0912345678)",
    iconName: "Send",
    popularCountries: ["VI"],
    buildUrl: (handle: string) => {
      const phone = handle.replace(/\D/g, "");
      return `https://zalo.me/${phone}`;
    },
  },
  WECHAT: {
    id: "WECHAT",
    name: "WeChat (微信)",
    badgeColor: "#07C160",
    placeholder: "WeChat ID (cth: wxid_12345)",
    iconName: "Users",
    popularCountries: ["SG", "MY", "TH"],
    buildUrl: (handle: string) => {
      return `weixin://dl/chat?${handle.trim()}`;
    },
  },
  MESSENGER: {
    id: "MESSENGER",
    name: "Facebook Messenger",
    badgeColor: "#0084FF",
    placeholder: "Username Page / Profile (cth: namatoko)",
    iconName: "MessageCircle",
    popularCountries: ["PH", "VI", "TH"],
    buildUrl: (handle: string) => {
      return `https://m.me/${handle.trim()}`;
    },
  },
  TELEGRAM: {
    id: "TELEGRAM",
    name: "Telegram",
    badgeColor: "#229ED9",
    placeholder: "Username Telegram (cth: username)",
    iconName: "Send",
    popularCountries: ["ID", "MY", "SG"],
    buildUrl: (handle: string, message?: string) => {
      const clean = handle.startsWith("@") ? handle.slice(1) : handle;
      const encoded = message ? encodeURIComponent(message) : "";
      return `https://t.me/${clean}${encoded ? `?text=${encoded}` : ""}`;
    },
  },
};

// -------------------------------------------------------------
// 2. MASTER DATA: SEA COUNTRY PROFILES
// -------------------------------------------------------------
export const SEA_COUNTRY_PROFILES: Record<string, SeaCountryProfile> = {
  ID: {
    code: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
    currency: "IDR",
    currencySymbol: "Rp",
    locale: "id",
    primaryChat: "WHATSAPP",
    supportedChats: ["WHATSAPP", "TELEGRAM", "LINE"],
    popularMarketplaces: ["TIKTOK_SHOP", "SHOPEE", "TOKOPEDIA", "LAZADA"],
    paymentGateways: ["BORDERPAY_QRIS"],
  },
  MY: {
    code: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    currency: "MYR",
    currencySymbol: "RM",
    locale: "ms",
    primaryChat: "WHATSAPP",
    supportedChats: ["WHATSAPP", "TELEGRAM", "WECHAT"],
    popularMarketplaces: ["TIKTOK_SHOP", "SHOPEE", "LAZADA"],
    paymentGateways: ["BORDERPAY_QRIS", "PAYPAL"],
  },
  SG: {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    currency: "SGD",
    currencySymbol: "S$",
    locale: "en",
    primaryChat: "WHATSAPP",
    supportedChats: ["WHATSAPP", "WECHAT", "TELEGRAM"],
    popularMarketplaces: ["TIKTOK_SHOP", "SHOPEE", "LAZADA"],
    paymentGateways: ["PAYPAL", "BORDERPAY_QRIS"],
  },
  TH: {
    code: "TH",
    name: "Thailand (ไทย)",
    flag: "🇹🇭",
    currency: "THB",
    currencySymbol: "฿",
    locale: "th",
    primaryChat: "LINE",
    supportedChats: ["LINE", "WHATSAPP", "MESSENGER", "WECHAT"],
    popularMarketplaces: ["TIKTOK_SHOP", "SHOPEE", "LAZADA"],
    paymentGateways: ["BORDERPAY_QRIS", "PAYPAL"],
  },
  VI: {
    code: "VI",
    name: "Vietnam (Việt Nam)",
    flag: "🇻🇳",
    currency: "VND",
    currencySymbol: "₫",
    locale: "vi",
    primaryChat: "ZALO",
    supportedChats: ["ZALO", "MESSENGER", "WHATSAPP"],
    popularMarketplaces: ["TIKTOK_SHOP", "SHOPEE", "LAZADA"],
    paymentGateways: ["PAYPAL"],
  },
  PH: {
    code: "PH",
    name: "Philippines",
    flag: "🇵🇭",
    currency: "PHP",
    currencySymbol: "₱",
    locale: "en",
    primaryChat: "MESSENGER",
    supportedChats: ["MESSENGER", "WHATSAPP", "TELEGRAM"],
    popularMarketplaces: ["TIKTOK_SHOP", "SHOPEE", "LAZADA"],
    paymentGateways: ["PAYPAL"],
  },
};

// -------------------------------------------------------------
// 3. MASTER DATA: CHECKOUT MODES
// -------------------------------------------------------------
export const CHECKOUT_MODES_REGISTRY = {
  DIRECT_CHECKOUT: {
    id: "DIRECT_CHECKOUT",
    name: "Direct Checkout (QRIS / PayPal)",
    shortDesc: "Bayar instan via QRIS Borderpay atau PayPal + Auto-Delivery WA",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  EXTERNAL_LINK: {
    id: "EXTERNAL_LINK",
    name: "Marketplace / Keranjang Kuning",
    shortDesc: "Arahkan pembeli ke TikTok Shop, Shopee, Lazada, atau Tokopedia",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  CHAT_ORDER: {
    id: "CHAT_ORDER",
    name: "Order by Chat SEA (0% Komisi)",
    shortDesc: "Langsung chat WhatsApp, LINE, Zalo, WeChat, atau Messenger",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
} as const;

// -------------------------------------------------------------
// 4. HELPER FUNCTIONS
// -------------------------------------------------------------
export function buildMasterChatUrl(channel: string, handle: string, message?: string): string {
  const cfg = CHAT_CHANNELS_REGISTRY[channel.toUpperCase()];
  if (!cfg || !handle) return "#";
  return cfg.buildUrl(handle, message);
}

export function getCountryProfileByLocale(locale: string): SeaCountryProfile {
  const match = Object.values(SEA_COUNTRY_PROFILES).find((p) => p.locale === locale);
  return match || SEA_COUNTRY_PROFILES.ID;
}

export function getAllChatChannels(): ChatChannelConfig[] {
  return Object.values(CHAT_CHANNELS_REGISTRY);
}
