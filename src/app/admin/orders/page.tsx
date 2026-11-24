import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminOrdersClient } from "@/components/admin/AdminOrdersClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function AdminOrdersPage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminOrdersClient
      store={context.store}
      tier={context.tier}
      rules={context.rules}
      monthlyWithdrawalsCount={context.monthlyWithdrawalsCount}
      remainingFreeWithdrawals={context.remainingFreeWithdrawals}
    />
  );
}
