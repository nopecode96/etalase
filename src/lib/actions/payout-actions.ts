"use server";

import { prisma, serializePlain } from "@/lib/db/prisma";
import { requireTenantContext } from "@/lib/auth/tenant-guard";
import { ServiceResult, ok, fail } from "@/lib/core/response";
import { revalidatePath } from "next/cache";

export interface SupportedBankDto {
  id: string;
  countryCode: string;
  code: string;
  name: string;
  type: string;
  isActive: boolean;
  sortOrder: number;
}

export interface SupportedCountryWithBanksDto {
  code: string;
  name: string;
  flagEmoji: string;
  currencyCode: string;
  currencySymbol: string;
  defaultLocale: string;
  isActive: boolean;
  sortOrder: number;
  banks: SupportedBankDto[];
}

/**
 * 1. Retrieves all supported countries and their active banks from PostgreSQL
 * 100% database-driven single source of truth.
 */
export async function getSupportedCountriesWithBanksAction(): Promise<
  ServiceResult<SupportedCountryWithBanksDto[]>
> {
  try {
    const countries = await prisma.supportedCountry.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        banks: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return ok(serializePlain(countries));
  } catch (err: any) {
    console.error("getSupportedCountriesWithBanksAction error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to load countries and banks.");
  }
}

/**
 * 2. Updates the store's payout bank configuration with strict multi-tenant isolation
 */
export async function updateStorePayoutBankAction(input: {
  storeId?: string;
  countryCode: string;
  payoutBankId: string;
  payoutBankName: string;
  payoutAccountNumber: string;
  payoutAccountHolder: string;
}): Promise<ServiceResult<{ success: boolean }>> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const verifiedStoreId = ctx.storeId;

    const {
      countryCode,
      payoutBankId,
      payoutBankName,
      payoutAccountNumber,
      payoutAccountHolder,
    } = input;

    if (!countryCode || !payoutBankName || !payoutAccountNumber || !payoutAccountHolder) {
      return fail("INVALID_INPUT", "Semua kolom rekening pencairan wajib diisi.");
    }

    // Verify country exists and is active
    const country = await prisma.supportedCountry.findUnique({
      where: { code: countryCode.toUpperCase() },
    });

    if (!country) {
      return fail("NOT_FOUND", `Negara '${countryCode}' tidak ditemukan.`);
    }

    if (!country.isActive) {
      return fail(
        "INVALID_INPUT",
        `Negara ${country.name} (${country.code}) saat ini belum aktif untuk pencairan dana.`
      );
    }

    const cleanAccountNumber = payoutAccountNumber.trim().replace(/[^0-9a-zA-Z-]/g, "");
    const cleanAccountHolder = payoutAccountHolder.trim().toUpperCase();

    await prisma.store.update({
      where: { id: verifiedStoreId },
      data: {
        countryCode: country.code,
        payoutBankId: payoutBankId.trim(),
        payoutBankName: payoutBankName.trim(),
        payoutAccountNumber: cleanAccountNumber,
        payoutAccountHolder: cleanAccountHolder,
      },
    });

    revalidatePath("/admin/orders/payouts");
    revalidatePath("/admin");

    return ok({ success: true });
  } catch (err: any) {
    console.error("updateStorePayoutBankAction error:", err);
    return fail("INTERNAL_ERROR", err.message || "Gagal menyimpan rekening pencairan.");
  }
}

/**
 * 3. Marks the initial self-service onboarding tour as completed
 */
export async function completeOnboardingTourAction(storeId?: string): Promise<
  ServiceResult<{ hasCompletedOnboarding: boolean }>
> {
  try {
    const ctx = await requireTenantContext(storeId);
    const verifiedStoreId = ctx.storeId;

    await prisma.store.update({
      where: { id: verifiedStoreId },
      data: {
        hasCompletedOnboarding: true,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/orders/payouts");

    return ok({ hasCompletedOnboarding: true });
  } catch (err: any) {
    console.error("completeOnboardingTourAction error:", err);
    return fail("INTERNAL_ERROR", err.message || "Gagal menyelesaikan onboarding tour.");
  }
}
