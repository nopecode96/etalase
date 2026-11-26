"use server";

import {
  getCourseContent,
  bookAppointmentSlot,
  createSupportTipOrder,
  CourseAccessData,
} from "@/services/creator-features";
import { ServiceResult } from "@/lib/core/response";

export async function actionVerifyCourseAccess(input: {
  storeSlug: string;
  productSlug: string;
  buyerWhatsapp: string;
}): Promise<ServiceResult<CourseAccessData>> {
  return await getCourseContent(input.storeSlug, input.productSlug, input.buyerWhatsapp);
}

export async function actionBookAppointment(input: {
  storeSlug: string;
  productSlug: string;
  buyerName: string;
  buyerWhatsapp: string;
  buyerEmail?: string;
  bookedSlot: string;
  notes?: string;
}): Promise<ServiceResult<{ orderCode: string; bookedSlot: string }>> {
  return await bookAppointmentSlot(input);
}

export async function actionSubmitTip(input: {
  storeSlug: string;
  supporterName: string;
  supporterWhatsapp: string;
  amount: number;
  message?: string;
}): Promise<ServiceResult<{ orderCode: string; amount: number }>> {
  return await createSupportTipOrder(input);
}
