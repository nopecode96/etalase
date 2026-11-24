import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { OnboardingClient } from "./OnboardingClient";

export default async function OnboardingPage() {
  const user = await getCurrentUser();

  // If user is already authenticated and already owns a store, redirect directly to /admin
  if (user?.id) {
    const existingStore = await prisma.store.findFirst({
      where: { ownerId: user.id },
      select: { id: true, slug: true },
    });

    if (existingStore) {
      redirect("/admin");
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center px-4 py-12 selection:bg-[#D94E28] selection:text-white">
      <Suspense
        fallback={
          <div className="w-full max-w-xl bg-white rounded-3xl border border-[#E7E5E4] p-10 text-center animate-pulse text-[#57534E] text-xs">
            Memuat langkah onboarding...
          </div>
        }
      >
        <OnboardingClient />
      </Suspense>
    </main>
  );
}
