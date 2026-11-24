import { Metadata } from "next";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { prisma } from "@/lib/db/prisma";
import { MabesLayoutWrapper } from "@/components/mabes/MabesLayoutWrapper";

export const metadata: Metadata = {
  title: "Mabes HQ — etalase.online",
  description: "Internal administrative control console for Rafa Kreasindo Teknologi platform operators.",
};

export const dynamic = "force-dynamic";

export default async function MabesDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = await requireMabesContext();

  const [pendingBillingCount, pendingPayoutCount] = await Promise.all([
    prisma.planOrder.count({
      where: { status: { in: ["PENDING", "UNDER_REVIEW"] } },
    }),
    prisma.withdrawal.count({
      where: { status: "PENDING" },
    }),
  ]);

  return (
    <MabesLayoutWrapper
      user={context.user as any}
      pendingBillingCount={pendingBillingCount}
      pendingPayoutCount={pendingPayoutCount}
    >
      {children}
    </MabesLayoutWrapper>
  );
}
