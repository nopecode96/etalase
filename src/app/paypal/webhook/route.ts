import { NextRequest, NextResponse } from "next/server";
import { getActivePaypalConfig } from "@/lib/config/env";
import { prisma } from "@/lib/db/prisma";
import { emitN8nEvent } from "@/lib/n8n/dispatcher";
import { logger } from "@/lib/core/logger";
import {
  verifyPaypalWebhookSignature,
  verifyPaypalPaymentFromApi,
} from "@/services/payment-paypal";
import { computePlanExpiryDate } from "@/services/payment/plan-lifecycle";
import { settlePaidCustomerOrder } from "@/services/checkout-order/settlement";

export const dynamic = "force-dynamic";

/**
 * PayPal Global Payment Webhook Handler
 * Endpoint: https://etalase.online/paypal/webhook
 */
export async function POST(req: NextRequest) {
  try {
    const config = getActivePaypalConfig();
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json({ message: "Empty webhook payload" }, { status: 400 });
    }

    const eventType = body.event_type;
    const resource = body.resource || {};

    logger.info("PayPal Webhook received", "PaypalWebhook", {
      event_type: eventType,
      id: body.id,
      resource_id: resource.id,
      mode: config.mode,
    });

    // Authoritative verification: cryptographic webhook signature (if PAYPAL_WEBHOOK_ID is set)
    // OR direct verification of completed transaction against PayPal REST API.
    let isSignatureVerified = false;
    if (config.webhookId) {
      isSignatureVerified = await verifyPaypalWebhookSignature(req.headers, body);
      if (!isSignatureVerified) {
        logger.warn("Rejected PayPal webhook with invalid signature", "PaypalWebhook", {
          id: body.id,
        });
        return NextResponse.json({ error: "Invalid PayPal webhook signature" }, { status: 401 });
      }
    }

    // Handle completed payment / sale / capture
    const isPaymentCompleted =
      eventType === "PAYMENT.CAPTURE.COMPLETED" ||
      eventType === "PAYMENT.SALE.COMPLETED" ||
      eventType === "CHECKOUT.ORDER.APPROVED";

    if (isPaymentCompleted) {
      const paypalOrderId = resource.supplementary_data?.related_ids?.order_id;
      const captureId = resource.id;

      // Always verify payment state directly against PayPal REST API if signature wasn't verified
      if (!isSignatureVerified) {
        const apiCheck = await verifyPaypalPaymentFromApi({
          paypalOrderId,
          captureId,
        });
        if (!apiCheck.verified) {
          logger.warn("Rejected unverified PayPal webhook payment claim", "PaypalWebhook", {
            paypalOrderId,
            captureId,
          });
          return NextResponse.json({ error: "Unauthorized unverified webhook" }, { status: 401 });
        }
      }

      // Look for order reference in standard PayPal fields
      const orderRef =
        resource.custom_id ||
        resource.invoice_id ||
        paypalOrderId ||
        resource.id;

      if (!orderRef) {
        logger.warn("No order identifier found in PayPal webhook resource", "PaypalWebhook", { resource });
        return NextResponse.json({ received: true, note: "No order reference" });
      }

      // Check if this is an Admin Plan Upgrade (PlanOrder)
      if (typeof orderRef === "string" && (orderRef.startsWith("INV-UPG-") || orderRef.startsWith("UPG-"))) {
        const planOrder = await prisma.planOrder.findUnique({
          where: { orderNumber: orderRef },
          include: { store: true },
        });

        if (planOrder && planOrder.status !== "APPROVED") {
          const nextExpiry = computePlanExpiryDate(
            planOrder.billingCycle,
            planOrder.store.planExpiresAt
          );

          await prisma.$transaction([
            prisma.planOrder.update({
              where: { id: planOrder.id },
              data: {
                status: "APPROVED",
                paymentMethod: "PAYPAL",
                paidAt: new Date(),
                approvedAt: new Date(),
                adminNotes: `Auto-verified via PayPal Webhook (${body.id})`,
              },
            }),
            prisma.store.update({
              where: { id: planOrder.storeId },
              data: {
                tier: planOrder.planCode === "DFY" ? "DFY_BUSINESS" : "PRO",
                planExpiresAt: nextExpiry,
              },
            }),
          ]);

          logger.info(`PlanOrder ${planOrder.orderNumber} upgraded to ${planOrder.planCode}`, "PaypalWebhook");

          await emitN8nEvent("tier.upgraded", {
            orderNumber: planOrder.orderNumber,
            storeId: planOrder.storeId,
            storeSlug: planOrder.store.slug,
            planCode: planOrder.planCode,
            billingCycle: planOrder.billingCycle,
            amount: Number(planOrder.amount),
            paidVia: "PAYPAL",
          });

          return NextResponse.json({ success: true, type: "plan_upgrade", received: true });
        }
      }

      // Check standard Storefront Customer Order
      const settlement = await settlePaidCustomerOrder({
        orderRef: String(orderRef),
        paymentProvider: "PAYPAL",
        paymentRef: resource.id,
      });

      if (settlement.status === "SETTLED" || settlement.status === "ALREADY_PAID") {
        return NextResponse.json({ success: true, type: "customer_order", received: true });
      }
    }

    return NextResponse.json({ success: true, event_type: eventType, received: true });
  } catch (error: unknown) {
    logger.error("PayPal Webhook handler error", "PaypalWebhook", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  const config = getActivePaypalConfig();
  return NextResponse.json({
    status: "ok",
    gateway: "paypal",
    mode: config.mode,
    webhookUrl: config.webhookUrl,
    configured: Boolean(config.clientId && config.clientSecret),
  });
}
