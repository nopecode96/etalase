import React from "react";
import type { Metadata } from "next";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { GlobalToast } from "@/components/ui/GlobalToast";

export const metadata: Metadata = {
  title: "Tenant Admin Console — etalase.online",
  description: "Manage your storefront products, orders, payouts, and marketing analytics.",
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const context = await getAdminTenantContext();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col antialiased selection:bg-[#D94E28] selection:text-white">
      {/* Sidebar Navigation (Desktop Fixed + Mobile Bars) */}
      <AdminSidebar store={context.store} user={context.user} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
          {children}
        </main>
      </div>

      <GlobalToast />
    </div>
  );
}
