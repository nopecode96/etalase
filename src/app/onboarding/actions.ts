"use server";

import { checkSlugAvailability, createInitialStore, OnboardingInput } from "@/services/auth-onboarding";
import { getCurrentUser } from "@/lib/auth/session";
import { fail, ServiceResult } from "@/lib/core/response";

export async function actionCheckSlug(rawSlug: string): Promise<ServiceResult<{ available: boolean; slug: string }>> {
  return await checkSlugAvailability(rawSlug);
}

export async function actionCreateStore(input: OnboardingInput): Promise<ServiceResult<unknown>> {
  const user = await getCurrentUser();
  if (!user || !user.id) {
    return fail("UNAUTHORIZED", "Silakan login menggunakan Google terlebih dahulu.");
  }
  return await createInitialStore(user.id, input);
}
