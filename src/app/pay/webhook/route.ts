import { NextRequest, NextResponse } from "next/server";
import { getActiveBorderpayConfig } from "@/lib/config/env";
import { prisma } from "@/lib/db/prisma";
import { emitN8nEvent } from "@/lib/n8n/dispatcher";
import { logger } from "@/lib/core/logger";

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
