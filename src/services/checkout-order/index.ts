import { prisma, serializePlain } from "@/lib/db/prisma";
import { calculateQrisCheckout } from "@/services/payment/fee-calculator";
import { convertIdrToUsd } from "@/services/payment/plan-lifecycle";
import { ok, fail, withErrorHandler, ServiceResult } from "@/lib/core/response";
import { createBorderpayInvoice, getBorderpayPaymentStatus } from "../payment-borderpay";
import { createPaypalOrder, capturePaypalOrder } from "../payment-paypal";
import { settlePaidCustomerOrder } from "./settlement";
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
    const paymentProvider: PaymentProvider = input.paymentProvider || "BORDERPAY_QRIS";

    // 1. Margin Guard & Convenience Fee Calculation
    let feeCalculation;
    try {
      feeCalculation = calculateQrisCheckout(
        basePrice,
        store.tier,
        store.feeBorneBy || "CUSTOMER",
        paymentProvider === "PAYPAL" ? "PAYPAL" : "BORDERPAY_QRIS"
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

    let paymentUrl: string | undefined;
    let paymentRef: string | undefined;
    let qrString: string | undefined;

    if (paymentProvider === "BORDERPAY_QRIS") {
      const appUrl = (
        process.env.NEXT_PUBLIC_APP_URL ||
        `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN || "etalase.online"}`
      ).replace(/\/$/, "");
      const invoiceRes = await createBorderpayInvoice({
        orderCode,
        amount: totalPayByCustomer,
        currency: store.currency,
        customerName: input.buyerName,
        customerWhatsapp: input.buyerWhatsapp,
        customerEmail: input.buyerEmail,
        description: `${product.title} - ${store.name}`,
        feeBorneBy: feeCalculation.borderpayFeeBearerParam,
        returnUrl: appUrl.startsWith("https://")
          ? `${appUrl}/${store.slug}/checkout/${product.slug}?orderCode=${orderCode}`
          : undefined,
      });

      if (!invoiceRes.success || !invoiceRes.data) {
        return fail(
          "PAYMENT_FAILED",
          (!invoiceRes.success && invoiceRes.error) ||
            "Gagal membuat tagihan QRIS. Silakan coba lagi atau order via WhatsApp."
        );
      }

      paymentUrl = invoiceRes.data.paymentUrl;
      paymentRef = invoiceRes.data.paymentRef;
      qrString = invoiceRes.data.qrString;
    } else if (paymentProvider === "PAYPAL") {
      const appUrl = (
        process.env.NEXT_PUBLIC_APP_URL ||
        `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN || "etalase.online"}`
      ).replace(/\/$/, "");
      const amountUsd =
        store.currency === "USD"
          ? Math.max(1, Math.round(totalPayByCustomer * 100) / 100)
          : convertIdrToUsd(totalPayByCustomer);

      const paypalRes = await createPaypalOrder({
        orderCode,
        amountUsd,
        description: `${product.title} - ${store.name}`,
        returnUrl: `${appUrl}/${store.slug}/checkout/${product.slug}?paypal_status=success&orderCode=${orderCode}`,
        cancelUrl: `${appUrl}/${store.slug}/checkout/${product.slug}?paypal_status=cancelled&orderCode=${orderCode}`,
        customId: orderCode,
      });

      if (!paypalRes.success || !paypalRes.data) {
        return fail(
          "PAYMENT_FAILED",
          (!paypalRes.success && paypalRes.error) ||
            "Gagal membuat sesi pembayaran PayPal. Silakan coba lagi."
        );
      }

      paymentRef = paypalRes.data.orderId;
      paymentUrl = paypalRes.data.approveUrl;
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

export async function captureCustomerPaypalOrder(input: {
  orderCode: string;
  paypalOrderId: string;
}): Promise<ServiceResult<{ orderCode: string; status: string; amount: number; currency: string; paymentProvider: string }>> {
  return withErrorHandler(async () => {
    const existing = await prisma.order.findUnique({
      where: { orderCode: input.orderCode },
      select: {
        id: true,
        orderCode: true,
        status: true,
        paymentRef: true,
        amount: true,
        currency: true,
        paymentProvider: true,
      },
    });

    if (!existing) {
      return fail("NOT_FOUND", "Pesanan tidak ditemukan.");
    }

    if (existing.status === "PAID" || existing.status === "COMPLETED") {
      return ok(
        {
          orderCode: input.orderCode,
          status: existing.status,
          amount: Number(existing.amount),
          currency: existing.currency,
          paymentProvider: existing.paymentProvider,
        },
        "SAVED"
      );
    }

    if (existing.paymentRef && existing.paymentRef !== input.paypalOrderId) {
      return fail("FORBIDDEN", "PayPal Order ID tidak cocok dengan invoice pesanan.");
    }

    const captureRes = await capturePaypalOrder(input.paypalOrderId);
    if (!captureRes.success && captureRes.error !== "ORDER_ALREADY_CAPTURED") {
      return fail("PAYMENT_FAILED", "Konfirmasi pembayaran PayPal gagal.");
    }

    const paymentRef = captureRes.success
      ? captureRes.data?.captureId || input.paypalOrderId
      : input.paypalOrderId;

    const settlement = await settlePaidCustomerOrder({
      orderRef: input.orderCode,
      paymentProvider: "PAYPAL",
      paymentRef,
    });

    if (settlement.status !== "SETTLED" && settlement.status !== "ALREADY_PAID") {
      return fail("NOT_FOUND", "Pesanan tidak ditemukan.");
    }

    return ok(
      {
        orderCode: input.orderCode,
        status: "PAID",
        amount: Number(existing.amount),
        currency: existing.currency,
        paymentProvider: "PAYPAL",
      },
      "SAVED"
    );
  });
}

export async function checkCustomerOrderStatus(
  orderCode: string
): Promise<
  ServiceResult<{
    orderCode: string;
    status: string;
    amount: number;
    currency: string;
    paymentProvider: string;
  }>
> {
  return withErrorHandler(async () => {
    const order = await prisma.order.findUnique({
      where: { orderCode },
      select: {
        orderCode: true,
        status: true,
        amount: true,
        currency: true,
        paymentProvider: true,
        paymentRef: true,
      },
    });

    if (!order) {
      return fail("NOT_FOUND", "Pesanan tidak ditemukan.");
    }

    if (order.status === "PAID" || order.status === "COMPLETED") {
      return ok(
        {
          orderCode: order.orderCode,
          status: order.status,
          amount: Number(order.amount),
          currency: order.currency,
          paymentProvider: order.paymentProvider,
        },
        "SAVED"
      );
    }

    if (
      order.status === "PENDING" &&
      order.paymentProvider === "BORDERPAY_QRIS"
    ) {
      const lookupRef = order.paymentRef || order.orderCode;
      const bpCheck = await getBorderpayPaymentStatus(lookupRef);
      if (bpCheck.success && bpCheck.data?.found && bpCheck.data.status === "paid") {
        const authoritativeAmount =
          bpCheck.data.orderAmount ?? bpCheck.data.customerPays;
        const settlement = await settlePaidCustomerOrder({
          orderRef: order.orderCode,
          paymentProvider: "BORDERPAY_QRIS",
          paymentRef: bpCheck.data.referenceId,
          grossAmount: authoritativeAmount,
        });

        if (
          settlement.status === "SETTLED" ||
          settlement.status === "ALREADY_PAID"
        ) {
          return ok(
            {
              orderCode: order.orderCode,
              status: "PAID",
              amount: Number(order.amount),
              currency: order.currency,
              paymentProvider: order.paymentProvider,
            },
            "SAVED"
          );
        }
      }
    }

    return ok(
      {
        orderCode: order.orderCode,
        status: order.status,
        amount: Number(order.amount),
        currency: order.currency,
        paymentProvider: order.paymentProvider,
      },
      "SAVED"
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
