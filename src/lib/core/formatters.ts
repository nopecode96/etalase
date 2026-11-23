import { CHAT_CHANNELS, SupportedCurrency, SupportedLocale } from "../config/constants";

export function formatCurrency(
  amount: number | string | { toString(): string } | undefined | null,
  currency: SupportedCurrency = "IDR",
  locale: SupportedLocale = "id"
): string {
  if (amount === undefined || amount === null) {
    return "Tanya Harga";
  }

  // Handle custom string labels directly (e.g. "DP 15 Juta", "Mulai DP 15 Jt", "Tanya Harga")
  if (typeof amount === "string") {
    const trimmed = amount.trim();
    if (isNaN(Number(trimmed))) {
      return trimmed;
    }
  }

  const numericAmount = typeof amount === "number" ? amount : Number(amount);
  
  // HARAM DATA BUG Rp 0: If zero, negative or NaN, display "Tanya Harga"
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return "Tanya Harga";
  }

  const localeMap: Record<SupportedLocale, string> = {
    id: "id-ID",
    en: "en-US",
    ms: "ms-MY",
    th: "th-TH",
    vi: "vi-VN",
  };

  try {
    return new Intl.NumberFormat(localeMap[locale] || "id-ID", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: currency === "IDR" || currency === "VND" ? 0 : 2,
    }).format(numericAmount);
  } catch {
    return `${currency} ${numericAmount.toLocaleString()}`;
  }
}

export function formatDate(
  date: Date | string | number,
  locale: SupportedLocale = "id"
): string {
  const d = new Date(date);
  const localeMap: Record<SupportedLocale, string> = {
    id: "id-ID",
    en: "en-US",
    ms: "ms-MY",
    th: "th-TH",
    vi: "vi-VN",
  };

  return new Intl.DateTimeFormat(localeMap[locale] || "id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function buildChatUrl(
  channel: string,
  handle: string | null | undefined,
  message?: string
): string {
  if (!handle) return "#";
  const cleanHandle = handle.trim();
  const encodedMsg = message ? encodeURIComponent(message) : "";

  switch (channel.toUpperCase()) {
    case "WHATSAPP": {
      let phone = cleanHandle.replace(/\D/g, "");
      if (phone.startsWith("0")) {
        phone = "62" + phone.slice(1);
      }
      return `https://wa.me/${phone}${encodedMsg ? `?text=${encodedMsg}` : ""}`;
    }
    case "LINE": {
      const clean = cleanHandle.startsWith("@") ? cleanHandle.slice(1) : cleanHandle;
      return `https://line.me/ti/p/~${clean}`;
    }
    case "ZALO": {
      const zaloPhone = cleanHandle.replace(/\D/g, "");
      return `https://zalo.me/${zaloPhone}`;
    }
    case "WECHAT": {
      return `weixin://dl/chat?${cleanHandle}`;
    }
    case "MESSENGER": {
      return `https://m.me/${cleanHandle}`;
    }
    case "TELEGRAM": {
      const clean = cleanHandle.startsWith("@") ? cleanHandle.slice(1) : cleanHandle;
      return `https://t.me/${clean}${encodedMsg ? `?text=${encodedMsg}` : ""}`;
    }
    default:
      return `https://wa.me/${cleanHandle}`;
  }
}
