import { PlanTier } from "@prisma/client";

/**
 * Single Source of Truth for BorderPay Margin Guardrails and Platform Fees
 */
export const PAYMENT_RULES = {
  FREE: {
    chatOrderFeePercent: 0,
    directCheckoutFeePercent: 4.5,     // Modal BorderPay max 1% -> aman & untung
    minQrisAmountIdr: 15000,           // Cegah rugi transaksi mikro < Rp 10rb
    withdrawalFeeIdr: 5000,            // Modal Rp 2.500 -> untung +Rp 2.500/tarik
    freeWithdrawalsPerMonth: 0,
    minWithdrawalAmountIdr: 50000,
    allowedDirectMethods: ["QRIS"] as const,
  },
  PRO: {
    chatOrderFeePercent: 0,
    directCheckoutFeePercent: 2.0,     // Modal BorderPay max 1%
    minQrisAmountIdr: 25000,           // Wajib >= Rp 25rb (break-even 2% ada di Rp 23.077)
    withdrawalFeeIdr: 2500,            // Tarif setelah kuota gratis habis (impas modal bank)
    freeWithdrawalsPerMonth: 4,        // Max beban subsidi Rp 10rb/bln (aman vs sub Rp 39rb-49rb)
    minWithdrawalAmountIdr: 50000,
    allowedDirectMethods: ["QRIS"] as const, // DILARANG direct OVO/ShopeePay (modal 3%)
  },
  DFY: {
    chatOrderFeePercent: 0,
    directCheckoutFeePercent: 2.0,
    minQrisAmountIdr: 25000,
    withdrawalFeeIdr: 2500,
    freeWithdrawalsPerMonth: 4,
    minWithdrawalAmountIdr: 50000,
    allowedDirectMethods: ["QRIS"] as const,
  },
} as const;

export interface PricingPlan {
  id: "FREE" | "PRO" | "DFY";
  tier: PlanTier;
  name: string;
  badge?: string;
  description: string;
  priceMonthly: number;
  priceYearlyMonthly: number;
  priceYearlyBilled: number;
  priceOnetime?: number;
  maxProducts: number; // Infinity for unlimited
  chatOrderFeePercent: number; // 0%
  directCheckoutFeePercent: number; // 4.5% for FREE, 2% for PRO & DFY
  minQrisAmountIdr: number; // 15.000 for FREE, 25.000 for PRO & DFY
  withdrawalFeeIdr: number; // 5000 for FREE, 2500 for PRO & DFY (after quota)
  freeWithdrawalsPerMonth: number; // 0 for FREE, 4 for PRO & DFY
  minWithdrawalAmountIdr: number; // 50.000
  allowedTemplates: string[];
  allowCustomDomain: boolean;
  removeBranding: boolean;
  features: string[];
}

export const PRICING_PLANS: Record<"FREE" | "PRO" | "DFY", PricingPlan> = {
  FREE: {
    id: "FREE",
    tier: PlanTier.FREE,
    name: "Gratis Selamanya",
    badge: "GRATIS",
    description: "Cocok untuk kreator pemula, pelajar, atau UMKM yang baru memulai jualan online.",
    priceMonthly: 0,
    priceYearlyMonthly: 0,
    priceYearlyBilled: 0,
    maxProducts: Infinity, // Tanpa Batas / Unlimited
    chatOrderFeePercent: PAYMENT_RULES.FREE.chatOrderFeePercent, // 0% Komisi Order Chat
    directCheckoutFeePercent: PAYMENT_RULES.FREE.directCheckoutFeePercent, // 4.5%
    minQrisAmountIdr: PAYMENT_RULES.FREE.minQrisAmountIdr, // Rp 15.000
    withdrawalFeeIdr: PAYMENT_RULES.FREE.withdrawalFeeIdr, // Rp 5.000
    freeWithdrawalsPerMonth: PAYMENT_RULES.FREE.freeWithdrawalsPerMonth, // 0
    minWithdrawalAmountIdr: PAYMENT_RULES.FREE.minWithdrawalAmountIdr, // Rp 50.000
    allowedTemplates: ["clean-minimal"], // 1 Template Dasar
    allowCustomDomain: false,
    removeBranding: false,
    features: [
      "Produk & Link Tanpa Batas (Unlimited)",
      "0% Komisi Transaksi Order Chat WhatsApp",
      "Biaya Transaksi QRIS 4,5% (min. transaksi Rp 15.000)",
      "Biaya Penarikan Saldo Rp 5.000 (min. tarik Rp 50.000)",
      "Opsi Fleksibel: Biaya QRIS Ditanggung Pembeli atau Penjual",
      "1 Subdomain Mandiri (namamu.etalase.online)",
      "1 Template Dasar (Clean Minimal)",
      "Kirim File & Struk Otomatis ke WhatsApp",
      "Affiliate Keranjang Kuning SEA (TikTok, Shopee, Lazada)",
      "Analitik Pengunjung Dasar",
      "Dukungan CS WhatsApp Standar",
    ],
  },
  PRO: {
    id: "PRO",
    tier: PlanTier.PRO,
    name: "Kreator & Bisnis Pro",
    badge: "PILIHAN POPULER",
    description: "Untuk kreator aktif, sales showroom, dan UMKM yang ingin branding profesional & konversi tinggi.",
    priceMonthly: 49000,
    priceYearlyMonthly: 39000,
    priceYearlyBilled: 468000, // Ditagih Rp 468.000/tahun (Hemat 20% / Rp 120.000)
    maxProducts: Infinity,
    chatOrderFeePercent: PAYMENT_RULES.PRO.chatOrderFeePercent,
    directCheckoutFeePercent: PAYMENT_RULES.PRO.directCheckoutFeePercent, // 2%
    minQrisAmountIdr: PAYMENT_RULES.PRO.minQrisAmountIdr, // Rp 25.000
    withdrawalFeeIdr: PAYMENT_RULES.PRO.withdrawalFeeIdr, // Rp 2.500 setelah kuota
    freeWithdrawalsPerMonth: PAYMENT_RULES.PRO.freeWithdrawalsPerMonth, // 4x / bulan
    minWithdrawalAmountIdr: PAYMENT_RULES.PRO.minWithdrawalAmountIdr, // Rp 50.000
    allowedTemplates: [
      "clean-minimal",
      "visual-menu-grid",
      "showroom-pro",
      "editorial-pastel",
      "cafe-menu",
      "sales-showcase",
      "beauty-glam",
      "classic-dark",
      "catalog-grid",
      "sage-creator",
      "editorial-paper",
      "midnight-glow",
      "boutique-visual",
      "wellness-pro",
    ],
    allowCustomDomain: true, // + SSL Gratis
    removeBranding: true,
    features: [
      "Semua Fitur Paket Gratis",
      "Semua Arketipe Template Premium + Kustom Warna Toko",
      "Custom Domain Pribadi (namabrand.com) + SSL Gratis",
      "Hapus Branding Watermark etalase.online",
      "Biaya Transaksi QRIS Hanya 2% (min. transaksi Rp 25.000)",
      "Penarikan Saldo GRATIS 4x / bulan (selanjutnya Rp 2.500)",
      "Opsi Fleksibel: Biaya QRIS Ditanggung Pembeli atau Penjual",
      "Meta Pixel (CAPI), TikTok Pixel & Google Analytics 4 (GA4)",
      "Flash Sale Harga Coret & Member Area E-Course",
      "Booking Kalender 1-on-1 & Content Blocks Kustom",
      "Notifikasi Order Real-Time Telegram Toko",
      "Prioritas Dukungan Grup WhatsApp & Email Support",
    ],
  },
  DFY: {
    id: "DFY",
    tier: PlanTier.DFY_BUSINESS,
    name: "Terima Beres (Done-For-You)",
    badge: "LAYANAN DFY",
    description: "Tidak punya waktu mendesain? Tim kami yang akan menyiapkan seluruh isi tokomu dalam 24 jam.",
    priceMonthly: 899000,
    priceYearlyMonthly: 899000,
    priceYearlyBilled: 899000,
    priceOnetime: 899000,
    maxProducts: Infinity,
    chatOrderFeePercent: PAYMENT_RULES.DFY.chatOrderFeePercent,
    directCheckoutFeePercent: PAYMENT_RULES.DFY.directCheckoutFeePercent,
    minQrisAmountIdr: PAYMENT_RULES.DFY.minQrisAmountIdr,
    withdrawalFeeIdr: PAYMENT_RULES.DFY.withdrawalFeeIdr,
    freeWithdrawalsPerMonth: PAYMENT_RULES.DFY.freeWithdrawalsPerMonth,
    minWithdrawalAmountIdr: PAYMENT_RULES.DFY.minWithdrawalAmountIdr,
    allowedTemplates: [
      "clean-minimal",
      "visual-menu-grid",
      "showroom-pro",
      "editorial-pastel",
      "cafe-menu",
      "sales-showcase",
      "beauty-glam",
      "classic-dark",
      "catalog-grid",
      "sage-creator",
      "editorial-paper",
      "midnight-glow",
      "boutique-visual",
      "wellness-pro",
    ],
    allowCustomDomain: true,
    removeBranding: true,
    features: [
      "Akses Paket PRO Selama 1 Tahun Penuh (Senilai Rp 468.000)",
      "Setup Desain Banner, Foto Produk & Copywriting Bio",
      "Upload Katalog Awal oleh Tim etalase.online",
      "Integrasi WhatsApp Admin & Pembayaran QRIS 2%",
      "Penarikan Saldo GRATIS 4x / bulan (selanjutnya Rp 2.500)",
      "Bantuan Pengaturan Custom Domain Pribadi (DNS Setup Beres)",
      "Garansi Toko Siap Jualan dalam 24 Jam Kerja",
      "Pendampingan Setup & Prioritas CS WhatsApp Khusus",
    ],
  },
};

/**
 * Validates if a template ID is allowed for the store tier.
 */
export function isTemplateAllowedForTier(templateId: string, tier: PlanTier): boolean {
  if (tier === PlanTier.PRO || tier === PlanTier.DFY_BUSINESS) {
    return true;
  }
  return PRICING_PLANS.FREE.allowedTemplates.includes(templateId);
}

/**
 * Returns the direct checkout platform fee rate for a given plan tier.
 */
export function getFeeRateForTier(tier: PlanTier): number {
  switch (tier) {
    case PlanTier.PRO:
    case PlanTier.DFY_BUSINESS:
      return PAYMENT_RULES.PRO.directCheckoutFeePercent / 100;
    case PlanTier.FREE:
    default:
      return PAYMENT_RULES.FREE.directCheckoutFeePercent / 100;
  }
}

/**
 * Returns the withdrawal fee in IDR for a given plan tier.
 */
export function getWithdrawalFeeIdr(tier: PlanTier, isFreeQuota: boolean = false): number {
  if (isFreeQuota) return 0;
  switch (tier) {
    case PlanTier.PRO:
    case PlanTier.DFY_BUSINESS:
      return PAYMENT_RULES.PRO.withdrawalFeeIdr;
    case PlanTier.FREE:
    default:
      return PAYMENT_RULES.FREE.withdrawalFeeIdr;
  }
}
