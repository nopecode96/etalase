import { getActivePaypalConfig } from "@/lib/config/env";
import { ServiceResult, ok, fail } from "@/lib/core/response";
import { logger } from "@/lib/core/logger";

export interface CreatePaypalOrderParams {
  orderCode: string;
  amountUsd: number;
  description: string;
  returnUrl: string;
  cancelUrl: string;
  customId?: string;
}

export interface PaypalOrderResult {
  orderId: string;
  approveUrl: string;
  status: string;
  amountUsd: number;
}

/**
 * Generates an OAuth2 access token for PayPal REST API.
 */
export async function getPaypalAccessToken(): Promise<string | null> {
  const config = getActivePaypalConfig();
  if (!config.clientId || !config.clientSecret) {
    logger.warn("PayPal credentials not configured", "PaypalService");
    return null;
  }

  try {
    const auth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
    const res = await fetch(`${config.apiBaseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!res.ok) {
      const errorText = await res.text();
      logger.error("Failed to fetch PayPal access token", "PaypalService", errorText);
      return null;
    }

    const data = await res.json();
    return data.access_token || null;
  } catch (err) {
    logger.error("Exception fetching PayPal access token", "PaypalService", err);
    return null;
  }
}

/**
 * Creates a standard PayPal Order v2 for Credit Card / PayPal Checkout.
 */
export async function createPaypalOrder(
  params: CreatePaypalOrderParams
): Promise<ServiceResult<PaypalOrderResult>> {
  try {
    const token = await getPaypalAccessToken();
    if (!token) {
      return fail("PAYMENT_FAILED", "Unable to authenticate with PayPal gateway.");
    }

    const config = getActivePaypalConfig();
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: params.orderCode,
          custom_id: params.customId || params.orderCode,
          description: params.description,
          amount: {
            currency_code: "USD",
            value: params.amountUsd.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: "etalase.online",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        return_url: params.returnUrl,
        cancel_url: params.cancelUrl,
      },
    };

    const res = await fetch(`${config.apiBaseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      logger.error("PayPal create order API error", "PaypalService", errText);
      return fail("PAYMENT_FAILED", "Failed to create PayPal order session.");
    }

    const data = await res.json();
    const approveUrl =
      data.links?.find((l: any) => l.rel === "approve")?.href || "";

    return ok({
      orderId: data.id,
      approveUrl,
      status: data.status,
      amountUsd: params.amountUsd,
    });
  } catch (error: any) {
    logger.error("PayPal createPaypalOrder exception", "PaypalService", error);
    return fail("INTERNAL_ERROR", error.message || "PayPal order creation failed.");
  }
}

/**
 * Captures an approved PayPal Order v2.
 */
export async function capturePaypalOrder(
  paypalOrderId: string
): Promise<ServiceResult<{ captureId: string; status: string }>> {
  try {
    const token = await getPaypalAccessToken();
    if (!token) {
      return fail("PAYMENT_FAILED", "Unable to authenticate with PayPal gateway.");
    }

    const config = getActivePaypalConfig();
    const res = await fetch(`${config.apiBaseUrl}/v2/checkout/orders/${paypalOrderId}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const errText = await res.text();
      logger.error("PayPal capture order error", "PaypalService", errText);
      return fail("PAYMENT_FAILED", "Failed to capture PayPal payment.");
    }

    const data = await res.json();
    const captureId =
      data.purchase_units?.[0]?.payments?.captures?.[0]?.id || data.id;

    return ok({
      captureId,
      status: data.status,
    });
  } catch (error: any) {
    logger.error("PayPal capturePaypalOrder exception", "PaypalService", error);
    return fail("INTERNAL_ERROR", error.message || "PayPal capture failed.");
  }
}

/**
 * Conversion helper: returns USD equivalent for plan amounts
 */
export function getPlanUsdPrice(planCode: "PRO" | "DFY", billingCycle: "MONTHLY" | "YEARLY" | "ONE_TIME"): number {
  if (planCode === "DFY") {
    return 57.99; // Rp 899.000 ≈ $57.99 USD
  }
  if (billingCycle === "YEARLY") {
    return 29.99; // Rp 468.000 ≈ $29.99 USD
  }
  return 3.20; // Rp 49.000 ≈ $3.20 USD
}
