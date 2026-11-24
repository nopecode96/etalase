"use client";

import React, { useState, useTransition } from "react";
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  Edit3,
  X,
  FileText,
  UserCheck,
  FolderOpen,
} from "lucide-react";
import { actionUpdateDfyStage } from "@/app/mabes/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { formatDate } from "@/lib/core/formatters";

interface DfyProjectItem {
  id?: string;
  storeId: string;
  stage: "NEW" | "ASSETS_PENDING" | "BUILDING" | "REVIEW" | "COMPLETED";
  assignedTo?: string | null;
  notes?: string | null;
  assetsUrl?: string | null;
  completedAt?: string | null;
  createdAt?: string;
  store: {
    id: string;
    name: string;
    slug: string;
    tier: string;
    chatHandle?: string | null;
    customDomain?: string | null;
    owner: {
      email: string;
      name?: string | null;
    };
  };
}

interface MabesDfyClientProps {
  initialProjects: DfyProjectItem[];
}

const STAGES = [
  { key: "NEW", label: "New Order", color: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
  { key: "ASSETS_PENDING", label: "Assets Pending", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { key: "BUILDING", label: "Building Store", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  { key: "REVIEW", label: "Tenant Review", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { key: "COMPLETED", label: "Handed Over", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
] as const;

export function MabesDfyClient({ initialProjects }: MabesDfyClientProps) {
  const [projects, setProjects] = useState<DfyProjectItem[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [editProject, setEditProject] = useState<DfyProjectItem | null>(null);

  // Edit form state
  const [stage, setStage] = useState<string>("NEW");
  const [assignedTo, setAssignedTo] = useState("");
  const [notes, setNotes] = useState("");
  const [assetsUrl, setAssetsUrl] = useState("");

  const [isPending, startTransition] = useTransition();

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.store.name.toLowerCase().includes(search.toLowerCase()) ||
      p.store.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.store.owner.email.toLowerCase().includes(search.toLowerCase());

    const matchStage = stageFilter === "ALL" || p.stage === stageFilter;
    return matchSearch && matchStage;
  });

  const handleOpenEdit = (p: DfyProjectItem) => {
    setEditProject(p);
    setStage(p.stage || "NEW");
    setAssignedTo(p.assignedTo || "");
    setNotes(p.notes || "");
    setAssetsUrl(p.assetsUrl || "");
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProject) return;

    startTransition(async () => {
      const res = await actionUpdateDfyStage({
        storeId: editProject.storeId,
        stage,
        assignedTo,
        notes,
        assetsUrl,
      });

      if (res.success) {
        setProjects((prev) =>
          prev.map((item) =>
            item.storeId === editProject.storeId
              ? {
                  ...item,
                  stage: stage as any,
                  assignedTo,
                  notes,
                  assetsUrl,
                  completedAt: stage === "COMPLETED" ? new Date().toISOString() : item.completedAt,
                }
              : item
          )
        );
        showToast("DFY Project stage and details updated successfully!", "success");
        setEditProject(null);
      } else {
        showToast(res.error || "Failed to update project.", "error");
      }
    });
  };

  const completedCount = projects.filter((p) => p.stage === "COMPLETED").length;
  const inProgressCount = projects.filter((p) => p.stage !== "COMPLETED").length;

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total DFY Contracts
            </span>
            <span className="text-xl font-bold font-mono text-white">
              {projects.length} projects
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              In Production Pipeline
            </span>
            <span className="text-xl font-bold font-mono text-amber-400">
              {inProgressCount} active
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Delivered &amp; Handed Over
            </span>
            <span className="text-xl font-bold font-mono text-emerald-400">
              {completedCount} completed
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search DFY project by merchant name, slug, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setStageFilter("ALL")}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition shrink-0 ${
              stageFilter === "ALL"
                ? "bg-rose-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            All Projects ({projects.length})
          </button>
          {STAGES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setStageFilter(s.key)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition shrink-0 border ${
                stageFilter === s.key ? "bg-slate-800 text-white border-slate-600" : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Store &amp; Client</th>
                <th className="px-4 py-3">Pipeline Stage</th>
                <th className="px-4 py-3">Assigned Staff</th>
                <th className="px-4 py-3">Assets &amp; Brief</th>
                <th className="px-4 py-3">Internal Notes</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-slate-600 stroke-[1.5]" />
                    <p className="font-medium text-slate-400">No DFY projects match criteria</p>
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const stageMeta = STAGES.find((s) => s.key === p.stage) || STAGES[0];

                  return (
                    <tr key={p.storeId} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3.5">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-white block">{p.store.name}</span>
                          <a
                            href={`https://${p.store.slug}.etalase.online`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-slate-400 hover:text-indigo-400 font-mono transition inline-flex items-center gap-1"
                          >
                            {p.store.slug}.etalase.online
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                          <span className="text-[10px] text-slate-500 block">
                            {p.store.owner.email} &bull; WA: {p.store.chatHandle || "N/A"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${stageMeta.color}`}
                        >
                          {stageMeta.label}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-slate-300 font-mono text-[11px]">
                        {p.assignedTo || <span className="text-slate-500 italic">Unassigned</span>}
                      </td>

                      <td className="px-4 py-3.5">
                        {p.assetsUrl ? (
                          <a
                            href={p.assetsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs font-medium underline"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                            Open Assets
                          </a>
                        ) : (
                          <span className="text-slate-500 text-[11px] italic">No drive link</span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-slate-400 text-xs max-w-xs truncate">
                        {p.notes || <span className="text-slate-600 italic">No notes</span>}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(p)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-medium transition inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit DFY Modal */}
      {editProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-white">Update Terima Beres Pipeline</h3>
                <span className="text-xs text-indigo-400 font-mono">@{editProject.store.slug}</span>
              </div>
              <button
                type="button"
                onClick={() => setEditProject(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 pt-1 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Workflow Stage *
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-rose-500"
                >
                  {STAGES.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Assigned Operator / Staff Email
                </label>
                <input
                  type="email"
                  placeholder="operator@etalase.online"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono placeholder-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Google Drive / Asset Folder URL
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/drive/folders/..."
                  value={assetsUrl}
                  onChange={(e) => setAssetsUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono placeholder-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Progress Notes / Feedback
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Logo and 5 products uploaded. Waiting for custom domain verification from client..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setEditProject(null)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Progress"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
