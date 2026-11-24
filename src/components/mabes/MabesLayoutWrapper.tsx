"use client";

import React, { useState } from "react";
import { MabesSidebar } from "./MabesSidebar";
import { MabesTopNav } from "./MabesTopNav";

interface MabesLayoutWrapperProps {
  user: {
    id: string;
    email: string;
    name?: string | null;
    role: "SUPER_ADMIN" | "ADMIN_MABES";
  };
  pendingBillingCount: number;
  pendingPayoutCount: number;
  children: React.ReactNode;
}

export function MabesLayoutWrapper({
  user,
  pendingBillingCount,
  pendingPayoutCount,
  children,
}: MabesLayoutWrapperProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Left Sidebar */}
      <MabesSidebar
        user={user}
        pendingBillingCount={pendingBillingCount}
        pendingPayoutCount={pendingPayoutCount}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      {/* Main Container (Padded left on desktop for fixed sidebar) */}
      <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300 min-w-0">
        <MabesTopNav user={user} onMenuClick={() => setIsMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
