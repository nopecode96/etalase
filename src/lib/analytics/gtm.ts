export const GTM_CONTAINER_ID = "GTM-WM3KQKB6";

export interface GtmEcommerceItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  price?: number;
  quantity?: number;
}

function pushGtagEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== "function") {
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer?.push(args);
    };
  }
  w.gtag("event", eventName, params);
  // Also emit standard GTM custom event object for Meta Pixel & TikTok Pixel GTM triggers
  w.dataLayer.push({
    event: eventName,
    ...params,
  });
}

function runOncePerSession(dedupeKey: string, fn: () => void) {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(dedupeKey)) return;
    fn();
    sessionStorage.setItem(dedupeKey, "1");
  } catch {
    fn();
  }
}

export function trackGtmCookieConsent(status: "accepted" | "essential_only") {
  pushGtagEvent("cookie_consent_update", {
    consent_status: status,
  });
}

export function trackGtmClaimClick(params: {
  slug: string;
  available?: boolean;
  source?: string;
}) {
  pushGtagEvent("claim_click", {
    claimed_slug: params.slug,
    slug_available: typeof params.available === "boolean" ? params.available : undefined,
    claim_source: params.source || "hero",
  });
}

export function trackGtmRegisterView(params?: {
  slug?: string;
  plan?: string;
  locale?: string;
}) {
  runOncePerSession("gtm_register_view", () => {
    pushGtagEvent("register_view", {
      claimed_slug: params?.slug || undefined,
      selected_plan: params?.plan || "free",
      locale: params?.locale || "id",
    });
  });
}

export function trackGtmSignUpStart(params?: {
  method?: string;
  claimedSlug?: string;
  selectedPlan?: string;
}) {
  pushGtagEvent("sign_up_start", {
    method: params?.method || "google",
    claimed_slug: params?.claimedSlug || undefined,
    selected_plan: params?.selectedPlan || undefined,
  });
}

export function trackGtmLoginStart(params?: { method?: string }) {
  pushGtagEvent("login", {
    method: params?.method || "google",
  });
}

export function trackGtmOnboardingStart(params?: {
  claimedSlug?: string;
  selectedPlan?: string;
}) {
  runOncePerSession("gtm_begin_onboarding", () => {
    pushGtagEvent("begin_onboarding", {
      claimed_slug: params?.claimedSlug || undefined,
      selected_plan: params?.selectedPlan || "free",
    });
  });
}

export function trackGtmSignUpComplete(params: {
  storeSlug: string;
  businessCategory: string;
  selectedPlan?: string;
}) {
  runOncePerSession(`gtm_sign_up_${params.storeSlug}`, () => {
    const payload = {
      method: "google",
      store_slug: params.storeSlug,
      business_category: params.businessCategory,
      selected_plan: params.selectedPlan || "free",
    };
    pushGtagEvent("signup_complete", payload);
    pushGtagEvent("sign_up", payload);
  });
}

export function trackGtmViewItem(params: {
  currency?: string;
  value: number;
  item: GtmEcommerceItem;
}) {
  runOncePerSession(`gtm_view_${params.item.item_id}`, () => {
    pushGtagEvent("view_item", {
      currency: params.currency || "IDR",
      value: params.value,
      items: [{ ...params.item, quantity: params.item.quantity || 1 }],
    });
  });
}

export function trackGtmBeginCheckout(params: {
  currency?: string;
  value: number;
  paymentType?: string;
  transactionId?: string;
  items: GtmEcommerceItem[];
}) {
  const payload = {
    currency: params.currency || "IDR",
    value: params.value,
    payment_type: params.paymentType || undefined,
    transaction_id: params.transactionId || undefined,
    items: params.items.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    })),
  };
  pushGtagEvent("begin_checkout", payload);
  if (params.paymentType) {
    pushGtagEvent("add_payment_info", payload);
  }
}

export function trackGtmGenerateLead(params: {
  currency?: string;
  value?: number;
  leadSource: string;
  storeSlug?: string;
  itemName?: string;
  transactionId?: string;
}) {
  pushGtagEvent("generate_lead", {
    currency: params.currency || "IDR",
    value: typeof params.value === "number" ? params.value : 0,
    lead_source: params.leadSource,
    store_slug: params.storeSlug || undefined,
    item_name: params.itemName || undefined,
    transaction_id: params.transactionId || undefined,
  });
}

export function trackGtmPurchase(params: {
  transactionId: string;
  currency?: string;
  value: number;
  paymentType?: string;
  affiliation?: string;
  items: GtmEcommerceItem[];
}) {
  if (!params.transactionId) return;
  runOncePerSession(`gtm_purchase_${params.transactionId}`, () => {
    pushGtagEvent("purchase", {
      transaction_id: params.transactionId,
      currency: params.currency || "IDR",
      value: params.value,
      payment_type: params.paymentType || undefined,
      affiliation: params.affiliation || "etalase.online",
      items: params.items.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      })),
    });
  });
}
