import crypto from "crypto";
import { logger } from "@/lib/core/logger";

function sha256Normalize(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

function normalizePhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  return digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
}

export interface MetaCapiEventInput {
  pixelId?: string | null;
  accessToken?: string | null;
  eventName: "PageView" | "ViewContent" | "InitiateCheckout" | "Purchase";
  eventId?: string;
  eventSourceUrl?: string;
  value?: number;
  currency?: string;
  email?: string | null;
  phone?: string | null;
  contentIds?: string[];
  contentName?: string;
}

/**
 * Sends a server-side event to Meta Conversions API (CAPI).
 * Never throws so payment webhooks stay resilient.
 */
export async function sendMetaCapiEvent(input: MetaCapiEventInput): Promise<void> {
  try {
    const pixelId = input.pixelId?.trim();
    const accessToken = input.accessToken?.trim();
    if (!pixelId || !accessToken) return;

    const hashedEmail = sha256Normalize(input.email);
    const hashedPhone = sha256Normalize(normalizePhone(input.phone));

    const userData: Record<string, any> = {};
    if (hashedEmail) userData.em = [hashedEmail];
    if (hashedPhone) userData.ph = [hashedPhone];

    const payload = {
      data: [
        {
          event_name: input.eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          ...(input.eventId ? { event_id: input.eventId } : {}),
          ...(input.eventSourceUrl ? { event_source_url: input.eventSourceUrl } : {}),
          user_data: userData,
          custom_data: {
            currency: input.currency || "IDR",
            value: typeof input.value === "number" ? input.value : 0,
            ...(input.contentIds ? { content_ids: input.contentIds } : {}),
            ...(input.contentName ? { content_name: input.contentName } : {}),
            content_type: "product",
          },
        },
      ],
    };

    const url = `https://graph.facebook.com/v19.0/${encodeURIComponent(
      pixelId
    )}/events?access_token=${encodeURIComponent(accessToken)}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      logger.warn("Meta CAPI event returned non-200", "MetaCapi", {
        status: res.status,
        pixelId,
        eventName: input.eventName,
        errBody: errBody.slice(0, 300),
      });
    } else {
      logger.info("Meta CAPI event sent", "MetaCapi", {
        pixelId,
        eventName: input.eventName,
        eventId: input.eventId,
      });
    }
  } catch (err) {
    logger.warn("Meta CAPI event failed", "MetaCapi", err);
  }
}
