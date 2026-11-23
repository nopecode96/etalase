import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export default async function AdminAppearanceRedirectPage() {
  const user = await getCurrentUser();
  if (user && user.id) {
    const store = await prisma.store.findFirst({
      where: { ownerId: user.id },
      select: { slug: true },
    });
    if (store) {
      redirect(`/${store.slug}/admin/appearance`);
    }
  }

  // Fallback to demo customizer
  redirect("/demo/admin/appearance");
}
