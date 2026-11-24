import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminProductsPromosClient } from "@/components/admin/AdminProductsPromosClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function ProductsPromosPage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminProductsPromosClient
      store={context.store}
      tier={context.tier}
    />
  );
}
