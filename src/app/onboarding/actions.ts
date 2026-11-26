"use server";

import {
  checkSlugAvailability,
  createInitialStore,
  OnboardingInput,
  SlugCheckResult,
} from "@/services/auth-onboarding";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { fail, ServiceResult } from "@/lib/core/response";

export async function actionCheckSlug(rawSlug: string): Promise<ServiceResult<SlugCheckResult>> {
  return await checkSlugAvailability(rawSlug);
}

export async function actionCreateStore(input: OnboardingInput): Promise<ServiceResult<unknown>> {
  const user = await getCurrentUser();
  if (!user?.id) {
    return fail("UNAUTHORIZED", "Silakan masuk dengan akun Google Anda terlebih dahulu.");
  }

  const existingStore = await prisma.store.findFirst({
    where: { ownerId: user.id },
    select: { id: true },
  });

  if (existingStore) {
    return fail("INVALID_INPUT", "Akun Anda sudah memiliki toko terdaftar.");
  }

  return await createInitialStore(user.id, input);
}
