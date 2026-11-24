"use client";

import React, { useState, useTransition } from "react";
import {
  Users,
  UserPlus,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Lock,
  Mail,
  User,
  Search,
  Loader2,
  X,
  AlertTriangle,
} from "lucide-react";
import { actionCreateMabesStaff, actionDeleteMabesStaff } from "@/app/mabes/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { formatDate } from "@/lib/core/formatters";

interface TeamMember {
  id: string;
  name?: string | null;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN_MABES";
  createdAt: string;
  preferredLang: string;
}

interface MabesTeamClientProps {
  initialUsers: TeamMember[];
  currentUserId: string;
  isSuperAdmin: boolean;
}

export function MabesTeamClient({
  initialUsers,
  currentUserId,
  isSuperAdmin,
}: MabesTeamClientProps) {
  const [team, setTeam] = useState<TeamMember[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);

  // Form State for New Staff
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN_MABES" as "SUPER_ADMIN" | "ADMIN_MABES",
  });
  const [formError, setFormError] = useState("");

  const [isPending, startTransition] = useTransition();

  const filteredTeam = team.filter(
    (m) =>
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.name && m.name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.email || !formData.password) {
      setFormError("Email and password are required.");
      return;
    }

    if (formData.password.length < 8) {
      setFormError("Password must be at least 8 characters long.");
      return;
    }

    startTransition(async () => {
      const res = await actionCreateMabesStaff(formData);
      if (res.success) {
        setTeam((prev) => [res.data, ...prev]);
        setShowAddModal(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "ADMIN_MABES",
        });
        showToast("New Mabes staff account provisioned successfully!", "success");
      } else {
        setFormError(res.error || "Failed to provision staff account.");
      }
    });
  };

  const handleDeleteStaff = (target: TeamMember) => {
    startTransition(async () => {
      const res = await actionDeleteMabesStaff(target.id);
      if (res.success) {
        setTeam((prev) => prev.filter((m) => m.id !== target.id));
        setDeleteTarget(null);
        showToast(`Staff account ${target.email} removed.`, "success");
      } else {
        showToast(res.error || "Failed to remove staff account.", "error");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search staff by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {isSuperAdmin && (
          <button
            type="button"
            onClick={() => {
              setFormError("");
              setShowAddModal(true);
            }}
            className="px-3.5 py-2 text-xs bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-medium flex items-center justify-center gap-1.5 shadow-sm transition"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Provision Staff Account
          </button>
        )}
      </div>

      {/* Staff Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Administrator</th>
                <th className="px-4 py-3">Role &amp; Permissions</th>
                <th className="px-4 py-3">Provisioned Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTeam.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-slate-500">
                    <Users className="w-8 h-8 mx-auto mb-2 text-slate-600 stroke-[1.5]" />
                    <p className="font-medium text-slate-400">No staff members found</p>
                  </td>
                </tr>
              ) : (
                filteredTeam.map((member) => {
                  const isSelf = member.id === currentUserId;
                  const isSuper = member.role === "SUPER_ADMIN";

                  return (
                    <tr key={member.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              isSuper
                                ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                                : "bg-sky-600/20 text-sky-400 border border-sky-500/30"
                            }`}
                          >
                            {(member.name || member.email)[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-slate-200">
                                {member.name || "Mabes Staff"}
                              </span>
                              {isSelf && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                                  YOU
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono block">
                              {member.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        {isSuper ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                            <ShieldAlert className="w-3 h-3 text-purple-400" />
                            Super Admin (Full Access)
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                            <ShieldCheck className="w-3 h-3 text-sky-400" />
                            Mabes Admin (Ops &amp; Billing)
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 font-mono text-[11px]">
                        {formatDate(member.createdAt)}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {isSuperAdmin && !isSelf ? (
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(member)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition"
                            title="Remove staff account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-600 italic">
                            {isSelf ? "Self" : "Restricted"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-rose-500" />
                <h3 className="text-sm font-semibold text-white">Provision New Mabes Staff</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="p-5 space-y-4">
              {formError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adit Pratama"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="admin@etalase.online"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Initial Password (min 8 characters) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Assigned Mabes Role *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "ADMIN_MABES" })}
                    className={`p-2.5 rounded-lg border text-left text-xs transition ${
                      formData.role === "ADMIN_MABES"
                        ? "bg-sky-500/10 border-sky-500 text-sky-200"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <p className="font-semibold text-xs text-white">Mabes Admin</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Billing &amp; payout ops</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "SUPER_ADMIN" })}
                    className={`p-2.5 rounded-lg border text-left text-xs transition ${
                      formData.role === "SUPER_ADMIN"
                        ? "bg-purple-500/10 border-purple-500 text-purple-200"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <p className="font-semibold text-xs text-white">Super Admin</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Full internal authority</p>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-xs bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Provisioning...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Staff Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">Confirm Staff Deletion</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to revoke and delete account{" "}
              <strong className="text-white font-mono">{deleteTarget.email}</strong>? They will
              immediately lose all access to Mabes Console.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setDeleteTarget(null)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleDeleteStaff(deleteTarget)}
                className="px-4 py-1.5 text-xs bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Confirm Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
