"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createClientUserAction,
  updateClientUserAction,
  deleteClientUserAction,
} from "@/actions/user.actions";
import { UserPlus, Trash2, Edit2, Shield, User, Key } from "lucide-react";

import type { UserRole } from "@/generated/prisma";

interface TeamUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export default function TeamClientManagement({
  tenantId,
  currentUserId,
  initialUsers,
}: {
  tenantId: string;
  currentUserId: string;
  initialUsers: TeamUser[];
}) {
  const router = useRouter();
  const [users, setUsers] = useState<TeamUser[]>(initialUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<TeamUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State untuk Tambah
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CLIENT_SUPER_ADMIN" | "CLIENT_ADMIN">("CLIENT_ADMIN");

  // Form State untuk Edit
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editRole, setEditRole] = useState<"CLIENT_SUPER_ADMIN" | "CLIENT_ADMIN">("CLIENT_ADMIN");

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await createClientUserAction({
      name,
      email,
      password,
      role,
      tenantId,
    });

    if (res.success) {
      setShowAddModal(false);
      setName("");
      setEmail("");
      setPassword("");
      setRole("CLIENT_ADMIN");
      router.refresh();
    } else {
      setError(res.error || "Gagal membuat user");
    }
    setLoading(false);
  }

  async function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!editingUser) return;
    setLoading(true);
    setError(null);

    const res = await updateClientUserAction({
      userId: editingUser.id,
      name: editName,
      email: editEmail,
      password: editPassword ? editPassword : undefined,
      role: editRole,
    });

    if (res.success) {
      setEditingUser(null);
      setEditPassword("");
      router.refresh();
    } else {
      setError(res.error || "Gagal mengubah user");
    }
    setLoading(false);
  }

  async function handleDeleteUser(userId: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus akses anggota tim ini?")) return;
    setLoading(true);

    const res = await deleteClientUserAction(userId);
    if (res.success) {
      router.refresh();
    } else {
      alert(res.error || "Gagal menghapus anggota");
    }
    setLoading(false);
  }

  return (
    <div>
      {/* Top Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Daftar Anggota</h2>
          <p className="text-xs text-gray-500">
            Anggota dengan role Staf (CLIENT_ADMIN) hanya dapat mengelola katalog, galeri, dan prospek.
          </p>
        </div>
        <button
          onClick={() => {
            setError(null);
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          <UserPlus size={16} />
          Tambah Staf / Admin
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Nama</th>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Email</th>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Peran (Role)</th>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Terdaftar</th>
              <th className="text-right px-6 py-3.5 text-gray-600 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {initialUsers.map((user) => {
              const isSelf = user.id === currentUserId;
              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-2">
                    {user.role === "CLIENT_SUPER_ADMIN" ? (
                      <Shield size={16} className="text-blue-600" />
                    ) : (
                      <User size={16} className="text-gray-400" />
                    )}
                    {user.name}
                    {isSelf && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-normal">
                        Anda
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        user.role === "CLIENT_SUPER_ADMIN"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role === "CLIENT_SUPER_ADMIN"
                        ? "Owner (Super Admin)"
                        : "Staf (Admin)"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(user.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setEditName(user.name);
                          setEditRole(
                            user.role === "CLIENT_SUPER_ADMIN"
                              ? "CLIENT_SUPER_ADMIN"
                              : "CLIENT_ADMIN"
                          );
                          setEditPassword("");
                          setError(null);
                        }}
                        className="p-1.5 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Edit User"
                      >
                        <Edit2 size={16} />
                      </button>

                      {!isSelf && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Hapus User"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah User */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Tambah Anggota Tim Baru
            </h3>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Rian Pratama"
                  className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rian@salesmobil.com"
                  className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password Awal
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Peran / Hak Akses
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full text-sm border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CLIENT_ADMIN">Staf (CLIENT_ADMIN) - Kelola Katalog & Leads</option>
                  <option value="CLIENT_SUPER_ADMIN">Owner (CLIENT_SUPER_ADMIN) - Akses Penuh Tenant</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Menyimpan..." : "Buat Akun"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit User */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Edit Anggota Tim
            </h3>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Ganti Password (Kosongkan jika tidak diubah)
                </label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="Kosongkan jika tetap"
                  className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Peran / Hak Akses
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as any)}
                  className="w-full text-sm border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CLIENT_ADMIN">Staf (CLIENT_ADMIN)</option>
                  <option value="CLIENT_SUPER_ADMIN">Owner (CLIENT_SUPER_ADMIN)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
