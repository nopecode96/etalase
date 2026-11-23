"use server";

import { createCheckoutOrder, CreateOrderInput } from "@/services/checkout-order";
import { ServiceResult } from "@/lib/core/response";

export async function actionSubmitOrder(input: CreateOrderInput): Promise<ServiceResult<unknown>> {
  return await createCheckoutOrder(input);
}
