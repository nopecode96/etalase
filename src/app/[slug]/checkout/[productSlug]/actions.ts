"use server";

import {
  createCheckoutOrder,
  captureCustomerPaypalOrder,
  checkCustomerOrderStatus,
  CreateOrderInput,
} from "@/services/checkout-order";
import { ServiceResult } from "@/lib/core/response";

export async function actionSubmitOrder(input: CreateOrderInput): Promise<ServiceResult<unknown>> {
  return await createCheckoutOrder(input);
}

export async function actionCaptureCustomerPaypalOrder(input: {
  orderCode: string;
  paypalOrderId: string;
}): Promise<
  ServiceResult<{
    orderCode: string;
    status: string;
    amount: number;
    currency: string;
    paymentProvider: string;
  }>
> {
  return await captureCustomerPaypalOrder(input);
}

export async function actionCheckCustomerOrderStatus(
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
  return await checkCustomerOrderStatus(orderCode);
}
