import { prisma } from "@/lib/db/prisma";
import { PAYMENT_RULES } from "@/lib/constants/pricing";
import { FeeBearer, PlanTier } from "@prisma/client";

export type PricingTier = "FREE" | "PRO" | "DFY";

export interface QrisCheckoutCalculation {
  amountIdr: number;
  platformFee: number;
  totalPayByCustomer: number;
  netToMerchant: number;
  feeBorneBy: FeeBearer;
  borderpayFeeBearerParam: "customer" | "merchant";
}

export interface WithdrawalFeeCalculation {
  requestedAmountIdr: number;
  fee: number;
  netAmount: number;
  isFreeQuota: boolean;
  remainingFreeQuota: number;
  monthlyWithdrawalCount: number;
}

/**
 * Normalizes PlanTier from database to PricingTier ("FREE" | "PRO" | "DFY")
 */
export function normalizeTier(tier: string | PlanTier): PricingTier {
  if (tier === PlanTier.PRO || tier === "PRO") return "PRO";
  if (tier === PlanTier.DFY_BUSINESS || tier === "DFY" || tier === "DFY_BUSINESS") return "DFY";
  return "FREE";
}

/**
 * 1. Calculate Direct Checkout Amount, Platform Fee, and Convenience Fee Bearer.
 * Pure function enforcing BorderPay Anti-Rugi Margin Guard for QRIS, and supporting PayPal.
 */
export function calculateQrisCheckout(
  amountIdr: number,
  tierInput: PricingTier | PlanTier | string,
  feeBorneBy: FeeBearer | "CUSTOMER" | "MERCHANT" = "CUSTOMER",
  paymentProvider: "BORDERPAY_QRIS" | "PAYPAL" = "BORDERPAY_QRIS"
): QrisCheckoutCalculation {
  const tier = normalizeTier(tierInput);
  const rules = PAYMENT_RULES[tier];

  // 1. Validation: Minimum QRIS amount guard (applies strictly to QRIS)
  if (paymentProvider === "BORDERPAY_QRIS" && amountIdr < rules.minQrisAmountIdr) {
    const minFormatted = `Rp ${rules.minQrisAmountIdr.toLocaleString("id-ID")}`;
    throw new Error(
      `Minimal transaksi QRIS untuk paket Anda adalah ${minFormatted}. Untuk produk di bawah nominal tersebut, gunakan jalur Order by Chat (0% komisi).`
    );
  }

  // 2. Platform Fee Calculation
  // Math.ceil((amountIdr * directCheckoutFeePercent) / 100)
  const platformFee = Math.ceil((amountIdr * rules.directCheckoutFeePercent) / 100);

  // 3. Convenience Fee Bearer allocation
  const isCustomerBorne = (feeBorneBy as string) === "CUSTOMER";

  let totalPayByCustomer: number;
  let netToMerchant: number;
  let borderpayFeeBearerParam: "customer" | "merchant";

  if (isCustomerBorne) {
    totalPayByCustomer = amountIdr + platformFee;
    netToMerchant = amountIdr;
    borderpayFeeBearerParam = "customer";
  } else {
    totalPayByCustomer = amountIdr;
    netToMerchant = amountIdr - platformFee;
    borderpayFeeBearerParam = "merchant";
  }

  return {
    amountIdr,
    platformFee,
    totalPayByCustomer,
    netToMerchant,
    feeBorneBy: isCustomerBorne ? FeeBearer.CUSTOMER : FeeBearer.MERCHANT,
    borderpayFeeBearerParam,
  };
}

/**
 * 2. Calculate Withdrawal Fee & Pro Monthly Quota from Database.
 */
export async function calculateWithdrawalFee(
  storeId: string,
  tierInput: PricingTier | PlanTier | string,
  requestedAmountIdr: number
): Promise<WithdrawalFeeCalculation> {
  const tier = normalizeTier(tierInput);
  const rules = PAYMENT_RULES[tier];

  // 1. Minimum withdrawal amount validation
  if (requestedAmountIdr < rules.minWithdrawalAmountIdr) {
    const minFormatted = `Rp ${rules.minWithdrawalAmountIdr.toLocaleString("id-ID")}`;
    throw new Error(`Minimal penarikan saldo adalah ${minFormatted}.`);
  }

  // 2. Count withdrawals in current calendar month for this store
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let monthlyWithdrawalCount = 0;
  if (storeId && storeId !== "demo-store") {
    monthlyWithdrawalCount = await prisma.withdrawal.count({
      where: {
        storeId,
        createdAt: { gte: startOfMonth },
        status: { in: ["PENDING", "APPROVED", "SUCCESS", "COMPLETED"] },
      },
    });
  }

  // 3. Free quota check for PRO / DFY
  let fee: number = rules.withdrawalFeeIdr;
  let isFreeQuota = false;
  let remainingFreeQuota = 0;

  if (tier === "PRO" || tier === "DFY") {
    const maxFree = rules.freeWithdrawalsPerMonth; // 4
    if (monthlyWithdrawalCount < maxFree) {
      fee = 0;
      isFreeQuota = true;
      remainingFreeQuota = maxFree - monthlyWithdrawalCount;
    } else {
      fee = rules.withdrawalFeeIdr; // Rp 2.500
      isFreeQuota = false;
      remainingFreeQuota = 0;
    }
  } else {
    // FREE tier
    fee = rules.withdrawalFeeIdr; // Rp 5.000
    isFreeQuota = false;
    remainingFreeQuota = 0;
  }

  const netAmount = Math.max(0, requestedAmountIdr - fee);

  return {
    requestedAmountIdr,
    fee,
    netAmount,
    isFreeQuota,
    remainingFreeQuota,
    monthlyWithdrawalCount,
  };
}
