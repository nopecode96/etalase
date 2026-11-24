import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminStorefrontBlocksClient } from "@/components/admin/AdminStorefrontBlocksClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function StorefrontBlocksPage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminStorefrontBlocksClient
      store={context.store}
      tier={context.tier}
    />
  );
}
