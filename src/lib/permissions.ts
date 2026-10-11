import type { UserRole } from "@/generated/prisma";
import type { SessionUser } from "@/lib/auth";

/**
 * Daftar role SaaS Platform (tenantId = null)
 */
export const SAAS_ROLES: UserRole[] = [
  "SAAS_SUPER_ADMIN",
  "SAAS_ADMIN",
  "SAAS_MARKETING",
  "SAAS_FINANCE",
  "SAAS_TECHNICAL",
];

/**
 * Daftar role Tenant Klien (tenantId terikat)
 */
export const CLIENT_ROLES: UserRole[] = [
  "CLIENT_SUPER_ADMIN",
  "CLIENT_ADMIN",
];

/**
 * Cek apakah user adalah internal SaaS platform
 */
export function isSaaSRole(role: UserRole): boolean {
  return SAAS_ROLES.includes(role);
}

/**
 * Cek apakah user adalah role client tenant
 */
export function isClientRole(role: UserRole): boolean {
  return CLIENT_ROLES.includes(role);
}

/**
 * canManageTenant(user): True jika SAAS_SUPER_ADMIN atau SAAS_ADMIN.
 * Mengatur CRUD tenant, status aktif, pembuatan website tenant baru.
 */
export function canManageTenant(user: SessionUser | { role: UserRole }): boolean {
  return user.role === "SAAS_SUPER_ADMIN" || user.role === "SAAS_ADMIN";
}

/**
 * canManageBilling(user): True jika SAAS_SUPER_ADMIN atau SAAS_FINANCE.
 * Mengatur paket langganan, masa aktif expiresAt, verifikasi pembayaran invoice.
 */
export function canManageBilling(user: SessionUser | { role: UserRole }): boolean {
  return user.role === "SAAS_SUPER_ADMIN" || user.role === "SAAS_FINANCE";
}

/**
 * canManageTechnical(user): True jika SAAS_SUPER_ADMIN atau SAAS_TECHNICAL.
 * Mengatur DNS records, status SSL/Cloudflare, diagnostik domain, server logs.
 */
export function canManageTechnical(user: SessionUser | { role: UserRole }): boolean {
  return user.role === "SAAS_SUPER_ADMIN" || user.role === "SAAS_TECHNICAL";
}

/**
 * canManageMarketing(user): True jika SAAS_SUPER_ADMIN atau SAAS_MARKETING.
 * Mengatur leads calon pembeli SaaS, showcase kategori di etalase.online.
 */
export function canManageMarketing(user: SessionUser | { role: UserRole }): boolean {
  return user.role === "SAAS_SUPER_ADMIN" || user.role === "SAAS_MARKETING";
}

/**
 * canManageClientUsers(user, targetTenantId?):
 * True jika:
 * 1. SAAS_SUPER_ADMIN (bisa kelola semua user)
 * 2. CLIENT_SUPER_ADMIN (hanya pada tenant-nya sendiri)
 */
export function canManageClientUsers(
  user: SessionUser,
  targetTenantId?: string
): boolean {
  if (user.role === "SAAS_SUPER_ADMIN") return true;

  if (user.role === "CLIENT_SUPER_ADMIN") {
    // Jika target tenant disebutkan, pastikan cocok
    if (targetTenantId) {
      return Boolean(user.tenantId && user.tenantId === targetTenantId);
    }
    return Boolean(user.tenantId);
  }

  return false;
}

/**
 * canManageClientSettings(user):
 * Hanya CLIENT_SUPER_ADMIN atau SAAS_SUPER_ADMIN yang boleh mengubah identitas utama,
 * custom domain, dan konfigurasi sensitif tenant.
 * CLIENT_ADMIN (staf) dilarang mengubah domain dan identitas utama.
 */
export function canManageClientSettings(user: SessionUser): boolean {
  if (user.role === "SAAS_SUPER_ADMIN") return true;
  return user.role === "CLIENT_SUPER_ADMIN";
}

/**
 * canManageCatalogsAndLeads(user):
 * Seluruh role tenant (CLIENT_SUPER_ADMIN & CLIENT_ADMIN) serta SAAS_SUPER_ADMIN / SAAS_ADMIN.
 */
export function canManageCatalogsAndLeads(user: SessionUser): boolean {
  if (user.role === "SAAS_SUPER_ADMIN" || user.role === "SAAS_ADMIN") return true;
  return user.role === "CLIENT_SUPER_ADMIN" || user.role === "CLIENT_ADMIN";
}
