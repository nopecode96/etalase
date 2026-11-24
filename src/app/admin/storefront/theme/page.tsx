import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminStorefrontThemeClient } from "@/components/admin/AdminStorefrontThemeClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function StorefrontThemePage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminStorefrontThemeClient
      store={context.store}
      tier={context.tier}
    />
  );
}
