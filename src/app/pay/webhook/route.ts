import { NextRequest, NextResponse } from "next/server";
import { getActiveBorderpayConfig } from "@/lib/config/env";
import { prisma } from "@/lib/db/prisma";
import { emitN8nEvent } from "@/lib/n8n/dispatcher";
import { logger } from "@/lib/core/logger";
import { sendMetaCapiEvent } from "@/lib/services/tracking-capi";
import { notifyTenantNewOrder } from "@/lib/services/telegram-service";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const config = getActiveBorderpayConfig();
    const tokenHeader =
      req.headers.get("x-callback-token") ||
      req.headers.get("x-borderpay-key") ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    const body = await req.json().catch(() => null);

    logger.info("Borderpay Webhook received", "BorderpayWebhook", {
      tokenPresent: !!tokenHeader,
      body,
    });

    // Verify webhook key against active Borderpay configuration
    if (tokenHeader && tokenHeader !== config.webhookKey) {
      logger.warn("Invalid Borderpay webhook key", "BorderpayWebhook", { tokenHeader });
      return NextResponse.json({ error: "Unauthorized webhook key" }, { status: 401 });
    }

    const { order_id, transaction_status, gross_amount, payment_reference } = body || {};

    if (!order_id) {
      return NextResponse.json({ message: "No order_id in webhook" }, { status: 400 });
    }

    // Process payment success / paid event
    const isPaid =
      transaction_status === "SUCCESS" ||
      transaction_status === "PAID" ||
      transaction_status === "settlement";

    if (isPaid) {
      // 1. Check if this is an Admin Plan Upgrade (PlanOrder)
      if (typeof order_id === "string" && (order_id.startsWith("INV-UPG-") || order_id.startsWith("UPG-"))) {
        const planOrder = await prisma.planOrder.findUnique({
          where: { orderNumber: order_id },
          include: { store: true },
        });

        if (planOrder && planOrder.status !== "APPROVED") {
          await prisma.$transaction([
            prisma.planOrder.update({
              where: { id: planOrder.id },
              data: {
                status: "APPROVED",
                paymentMethod: "BORDERPAY_QRIS",
                paidAt: new Date(),
                approvedAt: new Date(),
                adminNotes: `Auto-verified via Borderpay QRIS Webhook (${payment_reference || "SETTLED"})`,
              },
            }),
            prisma.store.update({
              where: { id: planOrder.storeId },
              data: {
                tier: planOrder.planCode === "DFY" ? "DFY_BUSINESS" : "PRO",
              },
            }),
          ]);

          logger.info(`PlanOrder ${planOrder.orderNumber} upgraded to ${planOrder.planCode} via Borderpay Webhook`, "BorderpayWebhook");

          await emitN8nEvent("tier.upgraded", {
            orderNumber: planOrder.orderNumber,
            storeId: planOrder.storeId,
            storeSlug: planOrder.store.slug,
            planCode: planOrder.planCode,
            billingCycle: planOrder.billingCycle,
            amount: Number(planOrder.amount),
            paidVia: "BORDERPAY_QRIS",
          });

          return NextResponse.json({ success: true, type: "plan_upgrade", received: true });
        }
      }

      // 2. Standard Storefront Customer Order
      const order = await prisma.order.findUnique({
        where: { orderCode: String(order_id) },
        include: { store: true, product: true },
      });

      if (!order) {
        logger.warn(`Order not found for code: ${order_id}`, "BorderpayWebhook");
        return NextResponse.json({ message: "Order not found" }, { status: 404 });
      }

      if (order.status !== "PAID") {
        // Update order status & credit tenant wallet balance atomically
        await prisma.$transaction([
          prisma.order.update({
            where: { id: order.id },
            data: {
              status: "PAID",
              paymentRef: payment_reference || order.paymentRef,
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

        logger.info(`Order ${order.orderCode} marked as PAID`, "BorderpayWebhook");

        // Fire-and-forget: Trigger n8n Ops-02 WA delivery flow
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
        });

        // Fire-and-forget: Notify tenant on Telegram if linked
        notifyTenantNewOrder(order.storeId, {
          orderCode: order.orderCode,
          productTitle: order.product.title,
          amount: Number(order.amount),
          buyerName: order.buyerName,
          buyerWhatsapp: order.buyerWhatsapp,
          paymentMethod: "BORDERPAY_QRIS",
        }).catch(() => {});

        // Fire-and-forget: Server-side Meta CAPI Purchase event (PRO / DFY)
        if (order.store.tier !== "FREE" && order.store.metaPixelId && order.store.metaCapiToken) {
          await sendMetaCapiEvent({
            pixelId: order.store.metaPixelId,
            accessToken: order.store.metaCapiToken,
            eventName: "Purchase",
            eventId: order.orderCode,
            value: Number(order.amount),
            currency: order.currency || "IDR",
            phone: order.buyerWhatsapp,
            contentIds: [order.productId],
            contentName: order.product.title,
          });
        }
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error: unknown) {
    logger.error("Borderpay Webhook handler error", "BorderpayWebhook", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
