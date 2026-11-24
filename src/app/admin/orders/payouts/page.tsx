import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminOrdersPayoutsClient } from "@/components/admin/AdminOrdersPayoutsClient";
import { getSupportedCountriesWithBanksAction } from "@/lib/actions/payout-actions";

export const dynamic = "force-dynamic";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function OrdersPayoutsPage({ searchParams }: AdminPageProps) {
  const [context, countriesResult] = await Promise.all([
    getAdminTenantContext(searchParams?.slug),
    getSupportedCountriesWithBanksAction(),
  ]);

  const supportedCountries = countriesResult.success && countriesResult.data ? countriesResult.data : [];

  return (
    <AdminOrdersPayoutsClient
      store={context.store}
      tier={context.tier}
      rules={context.rules}
      monthlyWithdrawalsCount={context.monthlyWithdrawalsCount}
      remainingFreeWithdrawals={context.remainingFreeWithdrawals}
      supportedCountries={supportedCountries}
    />
  );
}
