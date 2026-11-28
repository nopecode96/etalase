import { StoreTemplateProduct, StoreTemplateStore } from "../types";

export function isDemoStoreContext(store: StoreTemplateStore, isMockup = false): boolean {
  return Boolean(isMockup || store.isDemo || store.slug === "demo");
}

export function getStoreInitial(name?: string | null): string {
  const clean = (name || "E").trim();
  return (clean.charAt(0) || "E").toUpperCase();
}

export function getProductDiscountPercent(
  price: number | string,
  compareAtPrice?: number | string | null
): number | null {
  const p = Number(price);
  const c = compareAtPrice ? Number(compareAtPrice) : 0;
  if (!c || c <= p) return null;
  return Math.round(((c - p) / c) * 100);
}

export function getTemplateProductUrl(
  store: StoreTemplateStore,
  item: StoreTemplateProduct,
  isMockup = false
): string {
  const demoBase = `https://${store.slug}.etalase.online`;
  if (isMockup) {
    if (item.productType === "SUPPORT_TIP") {
      return `${demoBase}/tip`;
    }
    if (item.productType === "APPOINTMENT" && item.checkoutMode !== "CHAT_ORDER") {
      return `${demoBase}/book/${item.slug}`;
    }
    if (item.checkoutMode === "DIRECT_CHECKOUT" && item.slug) {
      return `${demoBase}/checkout/${item.slug}`;
    }
    return demoBase;
  }
  if (item.checkoutMode === "EXTERNAL_LINK") {
    return item.externalUrl || demoBase;
  }
  if (item.productType === "SUPPORT_TIP") {
    return `/${store.slug}/tip`;
  }
  if (item.productType === "APPOINTMENT" && item.checkoutMode !== "CHAT_ORDER") {
    return `/${store.slug}/book/${item.slug}`;
  }
  if (item.checkoutMode === "CHAT_ORDER") {
    return `/${store.slug}/checkout/${item.slug}`;
  }
  return `/${store.slug}/checkout/${item.slug}`;
}

export function getTemplateProductCtaLabel(item: StoreTemplateProduct): string {
  if (item.checkoutMode === "EXTERNAL_LINK") {
    return item.externalLabel || "Beli di Toko";
  }
  if (item.productType === "APPOINTMENT" && item.checkoutMode !== "CHAT_ORDER") {
    return "Pilih Jadwal Konsultasi";
  }
  if (item.productType === "SUPPORT_TIP") {
    return "Kirim Dukungan";
  }
  if (item.checkoutMode === "CHAT_ORDER") {
    return "Pesan Sekarang";
  }
  return "Beli Sekarang — QRIS";
}

export function getProductTypeBadgeLabel(productType?: string | null): string {
  switch (productType) {
    case "PHYSICAL":
      return "Produk Fisik";
    case "COURSE":
      return "Video Kursus";
    case "APPOINTMENT":
      return "Konsultasi 1-on-1";
    case "EVENT_WEBINAR":
    case "EVENT":
      return "Event / Tiket";
    case "SUPPORT_TIP":
      return "Dukungan";
    case "AFFILIATE_LINK":
      return "Rekomendasi";
    case "DIGITAL":
    default:
      return "Produk Digital";
  }
}

export function trackStorefrontEventClient(payload: {
  storeSlug: string;
  type: "view" | "click";
  productId?: string;
  productIds?: string[];
}) {
  if (typeof window === "undefined" || !payload.storeSlug || payload.storeSlug === "demo") {
    return;
  }
  try {
    if (payload.type === "click") {
      try {
        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        if (typeof w.gtag === "function") {
          w.gtag("event", "select_content", {
            content_type: "product",
            item_id: payload.productId,
            store_slug: payload.storeSlug,
          });
        }
      } catch {}
    }

    const body = JSON.stringify(payload);
    if (payload.type === "click" && navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/track",
        new Blob([body], { type: "application/json" })
      );
      return;
    }
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Non-blocking analytics
  }
}
