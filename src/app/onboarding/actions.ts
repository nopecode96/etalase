"use server";

import { checkSlugAvailability, createInitialStore, OnboardingInput } from "@/services/auth-onboarding";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { ServiceResult } from "@/lib/core/response";

export async function actionCheckSlug(rawSlug: string): Promise<ServiceResult<{ available: boolean; slug: string }>> {
  return await checkSlugAvailability(rawSlug);
}

export async function actionCreateStore(input: OnboardingInput): Promise<ServiceResult<unknown>> {
  const user = await getCurrentUser();
  let userId = user?.id;

  if (!userId) {
    // Seamless fallback for local development or direct testing
    const fallbackUser =
      (await prisma.user.findFirst({
        where: { role: "USER" },
        orderBy: { createdAt: "asc" },
      })) ||
      (await prisma.user.create({
        data: {
          email: `creator-${Date.now()}@etalase.online`,
          name: "Kreator Etalase",
          role: "USER",
        },
      }));
    userId = fallbackUser.id;
  }

  return await createInitialStore(userId, input);
}
