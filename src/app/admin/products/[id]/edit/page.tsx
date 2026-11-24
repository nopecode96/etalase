import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { ProductFormClient } from "@/components/admin/ProductFormClient";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Edit Product — Tenant Admin Console",
  description: "Update product pricing, media attachments, and checkout configuration.",
};

export default async function AdminEditProductPage({ params }: EditProductPageProps) {
  const context = await getAdminTenantContext();

  // Strict Tenant Ownership Isolation
  const product = await prisma.product.findFirst({
    where: {
      id: params.id,
      storeId: context.store.id,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <ProductFormClient
      store={context.store}
      initialProduct={serializePlain(product)}
      mode="edit"
    />
  );
}
