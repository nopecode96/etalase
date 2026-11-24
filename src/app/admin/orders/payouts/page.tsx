import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminOrdersPayoutsClient } from "@/components/admin/AdminOrdersPayoutsClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function OrdersPayoutsPage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminOrdersPayoutsClient
      store={context.store}
      tier={context.tier}
      rules={context.rules}
      monthlyWithdrawalsCount={context.monthlyWithdrawalsCount}
      remainingFreeWithdrawals={context.remainingFreeWithdrawals}
    />
  );
}
