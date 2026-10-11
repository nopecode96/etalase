import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { canManageClientUsers } from "@/lib/permissions";
import TeamClientManagement from "./TeamClientManagement";

export default async function TeamPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  // Hanya CLIENT_SUPER_ADMIN (atau SAAS_SUPER_ADMIN) yang memiliki akses
  if (!canManageClientUsers(session)) {
    redirect("/dashboard");
  }

  const tenantId = session.tenantId;
  if (!tenantId) {
    redirect("/dashboard");
  }

  // Ambil informasi tenant dan anggota tim
  const [tenant, teamUsers] = await Promise.all([
    prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { id: true, businessName: true, customDomain: true },
    }),
    prisma.user.findMany({
      where: { tenantId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  if (!tenant) redirect("/dashboard");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Tim & Akses</h1>
        <p className="text-gray-500 text-sm mt-1">
          Kelola akun staf dan administrator untuk website{" "}
          <span className="font-semibold text-blue-600">{tenant.businessName}</span> (
          {tenant.customDomain})
        </p>
      </div>

      <TeamClientManagement
        tenantId={tenant.id}
        currentUserId={session.id}
        initialUsers={teamUsers}
      />
    </div>
  );
}
