import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { canManageTenant } from "@/lib/permissions";

export default async function AdminPage() {
  const session = await getSession();
  if (!session || !canManageTenant(session)) {
    redirect("/dashboard");
  }

  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
      _count: {
        select: { leads: true, users: true },
      },
    },
  });

  const categories = await prisma.tenantCategory.findMany({
    orderBy: { orderIndex: "asc" },
  });

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Tenant</h1>
          <p className="text-gray-500 text-sm mt-1">
            {tenants.length} tenant terdaftar
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
          + Tambah Tenant
        </button>
      </div>

      {/* Kategori Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-700">{cat.name}</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {tenants.filter((t) => t.categoryId === cat.id).length}
            </p>
          </div>
        ))}
      </div>

      {/* Tenant Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">Nama Bisnis</th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">Domain</th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">Kategori</th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">Prospek</th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {tenant.businessName}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`https://${tenant.customDomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-xs"
                  >
                    {tenant.customDomain}
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-600">{tenant.category.name}</td>
                <td className="px-6 py-4 text-gray-600">{tenant._count.leads}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      tenant.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tenant.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
