import { NextRequest, NextResponse } from "next/server";
import { getActiveBorderpayConfig } from "@/lib/config/env";
import { logger } from "@/lib/core/logger";
import { getBorderpayPaymentStatus } from "@/services/payment-borderpay";
import {
  settlePaidCustomerOrder,
  settlePaidPlanOrder,
} from "@/services/checkout-order/settlement";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const config = getActiveBorderpayConfig();
    const tokenHeader =
      req.headers.get("x-borderpay-token") ||
      req.headers.get("x-callback-token") ||
      req.headers.get("x-borderpay-key") ||
      req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

    const body = await req.json().catch(() => null);
    const payload =
      (body?.data && typeof body.data === "object" ? body.data : body) || {};
    const eventHeader =
      req.headers.get("x-borderpay-event") || body?.event || "";
    const modeHeader = String(
      req.headers.get("x-borderpay-mode") || body?.mode || ""
    ).toLowerCase();

    const referenceId =
      payload.reference_id ||
      payload.order_id ||
      body?.reference_id ||
      body?.order_id;
    const rawStatus = String(
      payload.status || payload.transaction_status || ""
    ).toLowerCase();

    logger.info("Borderpay Webhook received", "BorderpayWebhook", {
      tokenPresent: !!tokenHeader,
      event: eventHeader,
      mode: modeHeader || (config.isLive ? "live" : "test"),
      referenceId,
      status: rawStatus,
    });

    // 1. Fail-closed token verification (x-borderpay-token per BorderPay docs)
    if (!config.webhookKey || !tokenHeader || tokenHeader !== config.webhookKey) {
      logger.warn(
        "Rejected unauthenticated or invalid Borderpay webhook",
        "BorderpayWebhook",
        { tokenPresent: !!tokenHeader }
      );
      return NextResponse.json(
        { error: "Unauthorized webhook key" },
        { status: 401 }
      );
    }

    // 2. Prevent test-mode webhooks from crediting live environment
    if (config.isLive && modeHeader === "test") {
      logger.warn(
        "Rejected test-mode Borderpay webhook while server is in live mode",
        "BorderpayWebhook",
        { referenceId }
      );
      return NextResponse.json(
        { error: "Test mode webhook rejected in live environment" },
        { status: 401 }
      );
    }

    if (!referenceId) {
      return NextResponse.json(
        { message: "No reference_id or order_id in webhook" },
        { status: 400 }
      );
    }

    if (
      eventHeader === "payment.expired" ||
      eventHeader === "payment.failed" ||
      rawStatus === "expired" ||
      rawStatus === "failed"
    ) {
      return NextResponse.json({
        success: true,
        received: true,
        ignoredStatus: rawStatus || eventHeader,
      });
    }

    const isPaid =
      rawStatus === "paid" ||
      rawStatus === "success" ||
      rawStatus === "settlement" ||
      (!rawStatus && eventHeader === "payment.paid");

    if (!isPaid) {
      return NextResponse.json({ success: true, received: true });
    }

    let authoritativeAmount =
      payload.order_amount !== undefined
        ? Number(payload.order_amount)
        : payload.amount !== undefined
        ? Number(payload.amount)
        : payload.gross_amount !== undefined
        ? Number(payload.gross_amount)
        : undefined;

    const paymentRef =
      String(
        payload.reference_id ||
          payload.payment_reference ||
          body?.payment_reference ||
          referenceId
      );

    // 3. In live mode, verify status directly via BorderPay REST API (Rule #4 / security tip)
    if (config.isLive && process.env.BORDERPAY_VERIFY_VIA_API !== "false") {
      const apiCheck = await getBorderpayPaymentStatus(String(paymentRef));
      if (!apiCheck.success || !apiCheck.data) {
        logger.warn(
          "Borderpay REST API verification failed",
          "BorderpayWebhook",
          { paymentRef }
        );
        return NextResponse.json(
          { error: "Unable to verify payment with Borderpay API" },
          { status: 502 }
        );
      }

      if (!apiCheck.data.found || apiCheck.data.status !== "paid") {
        logger.warn(
          "Rejected Borderpay webhook because API status is not paid",
          "BorderpayWebhook",
          {
            paymentRef,
            found: apiCheck.data.found,
            apiStatus: apiCheck.data.status,
          }
        );
        return NextResponse.json(
          { error: "Payment not verified as paid on Borderpay" },
          { status: apiCheck.data.found ? 400 : 401 }
        );
      }

      if (apiCheck.data.orderAmount !== undefined) {
        authoritativeAmount = apiCheck.data.orderAmount;
      } else if (apiCheck.data.customerPays !== undefined) {
        authoritativeAmount = apiCheck.data.customerPays;
      }
    }

    // 4. Route to Admin Plan Upgrade (PlanOrder) or Customer Order
    const cleanRef = String(payload.order_id || referenceId);
    if (cleanRef.startsWith("INV-UPG-") || cleanRef.startsWith("UPG-")) {
      const planSettlement = await settlePaidPlanOrder({
        orderNumber: cleanRef,
        paymentProvider: "BORDERPAY_QRIS",
        paymentRef,
        grossAmount: authoritativeAmount,
        adminNotes: `Auto-verified via Borderpay QRIS Webhook (${paymentRef})`,
      });

      if (planSettlement.status === "NOT_FOUND") {
        return NextResponse.json(
          { message: "Plan order not found" },
          { status: 404 }
        );
      }

      if (planSettlement.status === "AMOUNT_MISMATCH") {
        logger.warn(
          "Borderpay webhook amount mismatch for plan order",
          "BorderpayWebhook",
          {
            orderNumber: cleanRef,
            expected: planSettlement.expected,
            received: planSettlement.received,
          }
        );
        return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        type: "plan_upgrade",
        alreadyProcessed: planSettlement.status === "ALREADY_APPROVED",
        received: true,
      });
    }

    // 5. Standard Storefront Customer Order
    const settlement = await settlePaidCustomerOrder({
      orderRef: cleanRef,
      paymentProvider: "BORDERPAY_QRIS",
      paymentRef,
      grossAmount: authoritativeAmount,
    });

    if (settlement.status === "NOT_FOUND") {
      logger.warn(`Order not found for code: ${cleanRef}`, "BorderpayWebhook");
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (settlement.status === "AMOUNT_MISMATCH") {
      logger.warn(
        "Borderpay webhook amount mismatch for customer order",
        "BorderpayWebhook",
        {
          orderCode: cleanRef,
          expected: settlement.expected,
          received: settlement.received,
        }
      );
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      type: "customer_order",
      alreadyProcessed: settlement.status === "ALREADY_PAID",
      received: true,
    });
  } catch (error: unknown) {
    logger.error("Borderpay Webhook handler error", "BorderpayWebhook", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "active",
    endpoint: "Borderpay Webhook Gateway",
    mode: getActiveBorderpayConfig().isLive ? "live" : "test",
    timestamp: new Date().toISOString(),
  });
}
