import { requireTenantContext, TenantContext } from "@/lib/auth/tenant-guard";

export type AdminTenantContext = TenantContext;

/**
 * Resolves the authenticated tenant and their strictly isolated store.
 * Delegates to requireTenantContext() for zero data leakage.
 */
export async function getAdminTenantContext(slugParam?: string): Promise<AdminTenantContext> {
  return await requireTenantContext();
}
