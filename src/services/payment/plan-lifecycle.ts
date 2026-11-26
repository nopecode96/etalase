import { PlanTier } from "@prisma/client";

/**
 * Computes the next subscription expiration date for PRO / DFY upgrades.
 */
export function computePlanExpiryDate(
  billingCycle: string,
  existingExpiry?: Date | string | null
): Date {
  const days =
    billingCycle === "YEARLY" || billingCycle === "ONE_TIME" ? 365 : 30;
  const parsedExisting = existingExpiry ? new Date(existingExpiry) : null;
  const baseDate =
    parsedExisting &&
    !Number.isNaN(parsedExisting.getTime()) &&
    parsedExisting > new Date()
      ? parsedExisting
      : new Date();
  return new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000);
}

/**
 * Checks whether a paid subscription tier has passed its expiration timestamp.
 */
export function isStorePlanExpired(
  tier: PlanTier,
  planExpiresAt?: Date | string | null
): boolean {
  if (tier === PlanTier.FREE || !planExpiresAt) {
    return false;
  }
  const expiry = new Date(planExpiresAt);
  if (Number.isNaN(expiry.getTime())) {
    return false;
  }
  return expiry.getTime() < Date.now();
}

/**
 * Converts IDR to approximate USD for PayPal international checkout (min $1.00 USD).
 */
export function convertIdrToUsd(amountIdr: number): number {
  const rate = 15500;
  const usd = Math.round((amountIdr / rate) * 100) / 100;
  return Math.max(1.0, usd);
}
