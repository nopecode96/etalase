import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminStorefrontClient } from "@/components/admin/AdminStorefrontClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function AdminStorefrontPage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminStorefrontClient
      store={context.store}
      tier={context.tier}
    />
  );
}
