import { prisma, serializePlain } from "@/lib/db/prisma";
import { getFeeRateForTier } from "@/lib/constants/pricing";
import { calculateQrisCheckout } from "@/services/payment/fee-calculator";
import { ok, fail, withErrorHandler, ServiceResult } from "@/lib/core/response";
import { createBorderpayInvoice } from "../payment-borderpay";
import { emitN8nEvent } from "@/lib/n8n/dispatcher";
import { PaymentProvider } from "@prisma/client";

export interface CreateOrderInput {
  storeSlug: string;
  productSlug: string;
  buyerName: string;
  buyerWhatsapp: string;
  buyerEmail?: string;
  shippingAddress?: string;
  paymentProvider?: PaymentProvider;
}

export async function createCheckoutOrder(
  input: CreateOrderInput
): Promise<ServiceResult<unknown>> {
  return withErrorHandler(async () => {
    const store = await prisma.store.findUnique({
      where: { slug: input.storeSlug },
      include: {
        products: {
          where: { slug: input.productSlug, isActive: true },
        },
      },
    });

    if (!store || store.products.length === 0) {
      return fail("NOT_FOUND", "Produk atau toko tidak ditemukan.");
    }

    const product = store.products[0];
    const basePrice = Number(product.price);

    // 1. Margin Guard: Anti-Rugi BorderPay & Convenience Fee Calculation
    let feeCalculation;
    try {
      feeCalculation = calculateQrisCheckout(
        basePrice,
        store.tier,
        store.feeBorneBy || "CUSTOMER"
      );
    } catch (err: unknown) {
      return fail(
        "INVALID_INPUT",
        err instanceof Error ? err.message : "Nominal tidak memenuhi syarat minimal QRIS."
      );
    }

    const platformFee = feeCalculation.platformFee;
    const netAmount = feeCalculation.netToMerchant;
    const totalPayByCustomer = feeCalculation.totalPayByCustomer;

    const timestamp = Date.now().toString().slice(-6);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderCode = `ORD-${timestamp}-${randomSuffix}`;

    const paymentProvider = input.paymentProvider || "BORDERPAY_QRIS";
    let paymentUrl: string | undefined;
    let paymentRef: string | undefined;
    let qrString: string | undefined;

    if (paymentProvider === "BORDERPAY_QRIS") {
      const invoiceRes = await createBorderpayInvoice({
        orderCode,
        amount: totalPayByCustomer,
        currency: store.currency,
        customerName: input.buyerName,
        customerWhatsapp: input.buyerWhatsapp,
        customerEmail: input.buyerEmail,
        description: `${product.title} - ${store.name}`,
        feeBorneBy: feeCalculation.borderpayFeeBearerParam,
      });

      if (invoiceRes.success && invoiceRes.data) {
        paymentUrl = invoiceRes.data.paymentUrl;
        paymentRef = invoiceRes.data.paymentRef;
        qrString = invoiceRes.data.qrString;
      }
    }

    const order = await prisma.order.create({
      data: {
        orderCode,
        storeId: store.id,
        productId: product.id,
        buyerName: input.buyerName,
        buyerWhatsapp: input.buyerWhatsapp,
        buyerEmail: input.buyerEmail,
        shippingAddress: input.shippingAddress,
        currency: store.currency,
        amount: totalPayByCustomer,
        platformFee,
        netAmount,
        paymentProvider,
        paymentRef,
        paymentUrl,
        status: "PENDING",
      },
    });

    // Fire-and-forget: n8n Cart Recovery / Order Created webhook
    await emitN8nEvent("order.created", {
      orderId: order.id,
      orderCode: order.orderCode,
      storeId: store.id,
      storeSlug: store.slug,
      storeTier: store.tier,
      buyerName: order.buyerName,
      buyerWhatsapp: order.buyerWhatsapp,
      amount: totalPayByCustomer,
      currency: order.currency,
      paymentUrl,
    });

    return ok(
      {
        order: serializePlain(order),
        paymentUrl,
        qrString,
      },
      "CREATED"
    );
  });
}

export async function getOrderByCode(orderCode: string): Promise<ServiceResult<unknown>> {
  return withErrorHandler(async () => {
    const order = await prisma.order.findUnique({
      where: { orderCode },
      include: {
        store: true,
        product: true,
      },
    });

    if (!order) {
      return fail("NOT_FOUND", "Pesanan tidak ditemukan.");
    }

    return ok(serializePlain(order), "SAVED");
  });
}
