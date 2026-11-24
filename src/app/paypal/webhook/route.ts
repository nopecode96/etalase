import { NextRequest, NextResponse } from "next/server";
import { getActivePaypalConfig } from "@/lib/config/env";
import { prisma } from "@/lib/db/prisma";
import { emitN8nEvent } from "@/lib/n8n/dispatcher";
import { logger } from "@/lib/core/logger";

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

    // Handle completed payment / sale / capture
    const isPaymentCompleted =
      eventType === "PAYMENT.CAPTURE.COMPLETED" ||
      eventType === "PAYMENT.SALE.COMPLETED" ||
      eventType === "CHECKOUT.ORDER.APPROVED";

    if (isPaymentCompleted) {
      // Look for order reference in standard PayPal fields
      const orderRef =
        resource.custom_id ||
        resource.invoice_id ||
        resource.supplementary_data?.related_ids?.order_id ||
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
      const order = await prisma.order.findFirst({
        where: {
          OR: [
            { orderCode: String(orderRef) },
            { paymentRef: String(orderRef) },
          ],
        },
        include: { store: true, product: true },
      });

      if (order && order.status !== "PAID") {
        await prisma.$transaction([
          prisma.order.update({
            where: { id: order.id },
            data: {
              status: "PAID",
              paymentProvider: "PAYPAL",
              paymentRef: resource.id || order.paymentRef,
            },
          }),
          prisma.store.update({
            where: { id: order.storeId },
            data: {
              walletBalance: {
                increment: order.netAmount,
              },
            },
          }),
        ]);

        logger.info(`Customer Order ${order.orderCode} marked as PAID via PayPal`, "PaypalWebhook");

        await emitN8nEvent("order.paid", {
          orderId: order.id,
          orderCode: order.orderCode,
          storeId: order.storeId,
          storeSlug: order.store.slug,
          buyerName: order.buyerName,
          buyerWhatsapp: order.buyerWhatsapp,
          productTitle: order.product.title,
          productType: order.product.productType,
          digitalFileUrl: order.product.digitalFileUrl,
          amount: Number(order.amount),
          currency: order.currency,
          locale: order.store.locale,
          paymentProvider: "PAYPAL",
        });

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
