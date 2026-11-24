import React from "react";
import type { Metadata } from "next";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { ProductFormClient } from "@/components/admin/ProductFormClient";

export const metadata: Metadata = {
  title: "Add New Product — Tenant Admin Console",
  description: "Create and publish a new product to your storefront catalog.",
};

export default async function AdminNewProductPage() {
  const context = await getAdminTenantContext();

  return (
    <ProductFormClient
      store={context.store}
      mode="create"
    />
  );
}
