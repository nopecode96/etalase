import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminProductsClient } from "@/components/admin/AdminProductsClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function AdminProductsPage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminProductsClient
      store={context.store}
      tier={context.tier}
      rules={context.rules}
    />
  );
}
