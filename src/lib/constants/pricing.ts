import { PlanTier } from "@prisma/client";

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
  withdrawalFeeIdr: number; // 5000 for FREE, 0 for PRO & DFY
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
    chatOrderFeePercent: 0, // 0% Komisi Order Chat
    directCheckoutFeePercent: 4.5, // 4.5% Biaya Transaksi QRIS / Direct Checkout
    withdrawalFeeIdr: 5000, // Rp 5.000 per penarikan
    allowedTemplates: ["clean-minimal"], // Hanya 1 Template Dasar
    allowCustomDomain: false,
    removeBranding: false,
    features: [
      "Produk & Link Tanpa Batas (Unlimited)",
      "0% Komisi Transaksi Order Chat WhatsApp",
      "Biaya Transaksi QRIS & Direct Checkout 4,5%",
      "Biaya Penarikan Saldo Rp 5.000",
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
    chatOrderFeePercent: 0,
    directCheckoutFeePercent: 2, // Hanya 2% — lebih murah dari kompetitor 3%
    withdrawalFeeIdr: 0, // GRATIS
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
    ], // Semua 4 Arketipe Premium + Kustom Warna
    allowCustomDomain: true, // + SSL Gratis
    removeBranding: true,
    features: [
      "Semua Fitur Paket Gratis",
      "Semua 4 Arketipe Premium + Kustom Warna Toko",
      "Custom Domain Pribadi (namabrand.com) + SSL Gratis",
      "Hapus Branding Watermark etalase.online",
      "Biaya Transaksi QRIS Hanya 2% (Hemat 55%)",
      "Penarikan Saldo GRATIS Tanpa Potongan",
      "Meta Pixel & Conversion API (CAPI) & GA4",
      "Parameter UTM Lengkap & Analitik Konversi",
      "Watermark PDF Otomatis (Anti-Bajak E-Book)",
      "Booking Kalender 1-on-1 & Tiketing Webinar",
      "Notifikasi Order Multi-Admin WhatsApp",
      "Prioritas Dukungan CS WhatsApp",
    ],
  },
  DFY: {
    id: "DFY",
    tier: PlanTier.DFY_BUSINESS,
    name: "Terima Beres by asistencuan",
    badge: "LAYANAN DFY",
    description: "Tidak punya waktu mendesain? Tim kami yang akan menyiapkan seluruh isi tokomu dalam 24 jam.",
    priceMonthly: 899000,
    priceYearlyMonthly: 899000,
    priceYearlyBilled: 899000,
    priceOnetime: 899000, // Revisi Rp 899.000 sekali bayar
    maxProducts: Infinity,
    chatOrderFeePercent: 0,
    directCheckoutFeePercent: 2,
    withdrawalFeeIdr: 0,
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
      "Upload Katalog Awal oleh Tim asistencuan",
      "Integrasi WhatsApp Admin & Pembayaran QRIS",
      "Bantuan Pengaturan Custom Domain Pribadi (DNS Setup Beres)",
      "Garansi Toko Siap Jualan dalam 24 Jam Kerja",
      "Pendampingan Setup & Prioritas CS WhatsApp Khusus",
    ],
  },
};

/**
 * Validates if a template ID is allowed for the store tier.
 * FREE tier is strictly restricted to "clean-minimal".
 */
export function isTemplateAllowedForTier(templateId: string, tier: PlanTier): boolean {
  if (tier === PlanTier.PRO || tier === PlanTier.DFY_BUSINESS) {
    return true;
  }
  return PRICING_PLANS.FREE.allowedTemplates.includes(templateId);
}

/**
 * Returns the direct checkout platform fee rate for a given plan tier.
 * FREE: 4.5% (0.045)
 * PRO & DFY: 2.0% (0.02)
 */
export function getFeeRateForTier(tier: PlanTier): number {
  switch (tier) {
    case PlanTier.PRO:
    case PlanTier.DFY_BUSINESS:
      return 0.02; // 2%
    case PlanTier.FREE:
    default:
      return 0.045; // 4.5%
  }
}

/**
 * Returns the withdrawal fee in IDR for a given plan tier.
 * FREE: Rp 5.000
 * PRO & DFY: Rp 0 (Gratis)
 */
export function getWithdrawalFeeIdr(tier: PlanTier): number {
  switch (tier) {
    case PlanTier.PRO:
    case PlanTier.DFY_BUSINESS:
      return 0;
    case PlanTier.FREE:
    default:
      return 5000;
  }
}
