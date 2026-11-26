import { getActiveBorderpayConfig } from "@/lib/config/env";
import { ok, fail, withErrorHandler, ServiceResult } from "@/lib/core/response";
import { logger } from "@/lib/core/logger";

export interface CreateInvoiceParams {
  orderCode: string;
  amount: number;
  currency?: string;
  customerName: string;
  customerWhatsapp: string;
  customerEmail?: string;
  description: string;
  feeBorneBy?: "customer" | "merchant";
  returnUrl?: string;
}

export interface BorderpayInvoiceResult {
  paymentUrl: string;
  paymentRef: string;
  qrString?: string;
  expiresAt?: string;
  isSandboxMock?: boolean;
}

export interface BorderpayPaymentStatusResult {
  found: boolean;
  referenceId: string;
  status: string;
  orderAmount?: number;
  customerPays?: number;
  merchantReceives?: number;
  fee?: number;
  method?: string;
  paidAt?: string;
}

function normalizeReferenceId(rawOrderCode: string): string {
  const cleaned = rawOrderCode.replace(/[^A-Za-z0-9._-]/g, "-");
  return cleaned.slice(0, 64) || `ORD-${Date.now()}`;
}

/**
 * Creates a Borderpay QRIS payment via POST /api/v1/payments.
 * Fails closed in live mode unless non-live dev/explicit sandbox fallback is enabled.
 */
export async function createBorderpayInvoice(
  params: CreateInvoiceParams
): Promise<ServiceResult<BorderpayInvoiceResult>> {
  return withErrorHandler(async () => {
    const config = getActiveBorderpayConfig();
    const allowSandboxFallback =
      !config.isLive &&
      (process.env.NODE_ENV !== "production" ||
        process.env.ALLOW_PAYMENT_SANDBOX === "true");

    const referenceId = normalizeReferenceId(params.orderCode);
    const sanitizedPhone = params.customerWhatsapp?.replace(/[^\d+]/g, "");

    const payload: Record<string, unknown> = {
      amount: Math.round(params.amount),
      method: "qris",
      reference_id: referenceId,
    };

    if (sanitizedPhone && sanitizedPhone.length >= 9) {
      payload.customer_phone = sanitizedPhone;
    }

    // Per BorderPay API docs: live keys enforce HTTPS return_url
    if (
      params.returnUrl &&
      (!config.isLive || params.returnUrl.startsWith("https://"))
    ) {
      payload.return_url = params.returnUrl;
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.warn(
          "Borderpay payment API responded with non-200",
          "BorderpayAdapter",
          { status: response.status, errorText }
        );
        if (!allowSandboxFallback) {
          return fail(
            "PAYMENT_FAILED",
            "Gateway QRIS sedang tidak dapat memproses tagihan. Silakan coba lagi atau gunakan Order via WhatsApp."
          );
        }
        return ok(
          {
            paymentUrl: "",
            paymentRef: `BP-SANDBOX-${referenceId}`,
            qrString: `SANDBOX_QRIS_SIMULATOR_${referenceId}`,
            isSandboxMock: true,
          },
          "SAVED"
        );
      }

      const data = await response.json();
      const qrString = data.qr_string || data.qris_string || "";
      const paymentUrl =
        data.pay_url || data.payment_url || data.actions?.[0]?.url || "";
      const paymentRef = data.reference_id || data.id || referenceId;

      if (!qrString && !paymentUrl) {
        return fail(
          "PAYMENT_FAILED",
          "Gateway QRIS tidak mengembalikan kode pembayaran yang valid."
        );
      }

      return ok(
        {
          paymentUrl,
          paymentRef,
          qrString,
          expiresAt: data.expires_at,
          isSandboxMock: false,
        },
        "SAVED"
      );
    } catch (err: unknown) {
      logger.warn(
        "Borderpay network connection failed",
        "BorderpayAdapter",
        err
      );
      if (!allowSandboxFallback) {
        return fail(
          "PAYMENT_FAILED",
          "Gagal terhubung ke gateway QRIS. Silakan coba sesaat lagi atau gunakan Order via WhatsApp."
        );
      }
      return ok(
        {
          paymentUrl: "",
          paymentRef: `BP-SANDBOX-${referenceId}`,
          qrString: `SANDBOX_QRIS_SIMULATOR_${referenceId}`,
          isSandboxMock: true,
        },
        "SAVED"
      );
    }
  });
}

/**
 * Fetches authoritative payment status from BorderPay REST API:
 * GET /api/v1/payments/{reference_id}
 */
export async function getBorderpayPaymentStatus(
  referenceId: string
): Promise<ServiceResult<BorderpayPaymentStatusResult>> {
  return withErrorHandler(async () => {
    const config = getActiveBorderpayConfig();
    const safeRef = normalizeReferenceId(referenceId);

    const response = await fetch(
      `${config.apiBaseUrl}/payments/${encodeURIComponent(safeRef)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (response.status === 404) {
      return ok({
        found: false,
        referenceId: safeRef,
        status: "not_found",
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      logger.warn(
        "Borderpay status check failed",
        "BorderpayAdapter",
        { status: response.status, errorText }
      );
      return fail("PAYMENT_FAILED", "Gagal memeriksa status pembayaran Borderpay.");
    }

    const data = await response.json();
    return ok({
      found: true,
      referenceId: String(data.reference_id || safeRef),
      status: String(data.status || "pending").toLowerCase(),
      orderAmount:
        data.order_amount !== undefined ? Number(data.order_amount) : undefined,
      customerPays:
        data.customer_pays !== undefined
          ? Number(data.customer_pays)
          : data.amount !== undefined
          ? Number(data.amount)
          : undefined,
      merchantReceives:
        data.merchant_receives !== undefined
          ? Number(data.merchant_receives)
          : undefined,
      fee: data.fee !== undefined ? Number(data.fee) : undefined,
      method: data.method,
      paidAt: data.paid_at,
    });
  });
}

/**
 * Cancels a pending BorderPay payment via POST /api/v1/payments/{reference_id}/cancel
 */
export async function cancelBorderpayPayment(
  referenceId: string
): Promise<ServiceResult<{ referenceId: string; status: string }>> {
  return withErrorHandler(async () => {
    const config = getActiveBorderpayConfig();
    const safeRef = normalizeReferenceId(referenceId);

    const response = await fetch(
      `${config.apiBaseUrl}/payments/${encodeURIComponent(safeRef)}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
        },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return fail(
        "PAYMENT_FAILED",
        `Gagal membatalkan pembayaran Borderpay (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    return ok({
      referenceId: String(data.reference_id || safeRef),
      status: String(data.status || "expired"),
    });
  });
}
