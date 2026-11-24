"use client";

import React, { useState, useTransition } from "react";
import {
  Wallet,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ArrowDownRight,
  ShieldAlert,
  Send,
  X,
} from "lucide-react";
import { actionApprovePayout, actionRejectPayout } from "@/app/mabes/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { formatCurrency, formatDate } from "@/lib/core/formatters";

interface PayoutItem {
  id: string;
  storeId: string;
  amount: number | string;
  feeCharged: number | string;
  netAmount: number | string;
  currency: string;
  destination: string;
  status: string;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
  store: {
    name: string;
    slug: string;
    walletBalance: number | string;
  };
}

interface MabesPayoutsClientProps {
  initialPayouts: PayoutItem[];
}

export function MabesPayoutsClient({ initialPayouts }: MabesPayoutsClientProps) {
  const [payouts, setPayouts] = useState<PayoutItem[]>(initialPayouts);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [approveModalPayout, setApproveModalPayout] = useState<PayoutItem | null>(null);
  const [transferRef, setTransferRef] = useState("");
  const [rejectModalPayout, setRejectModalPayout] = useState<PayoutItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [isPending, startTransition] = useTransition();

  const filtered = payouts.filter((p) => {
    if (statusFilter === "ALL") return true;
    return p.status === statusFilter;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleApproveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!approveModalPayout) return;

    startTransition(async () => {
      const res = await actionApprovePayout(approveModalPayout.id, transferRef);
      if (res.success) {
        setPayouts((prev) =>
          prev.map((p) =>
            p.id === approveModalPayout.id
              ? {
                  ...p,
                  status: "APPROVED",
                  adminNotes: transferRef
                    ? `Transferred via ref #${transferRef}`
                    : "Transferred",
                }
              : p
          )
        );
        showToast("Payout marked as transferred successfully!", "success");
        setApproveModalPayout(null);
        setTransferRef("");
      } else {
        showToast(res.error || "Approval failed.", "error");
      }
    });
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalPayout) return;

    startTransition(async () => {
      const res = await actionRejectPayout(rejectModalPayout.id, rejectReason);
      if (res.success) {
        setPayouts((prev) =>
          prev.map((p) =>
            p.id === rejectModalPayout.id
              ? { ...p, status: "REJECTED", adminNotes: `Rejected: ${rejectReason}` }
              : p
          )
        );
        showToast("Payout rejected and balance refunded to merchant wallet.", "success");
        setRejectModalPayout(null);
        setRejectReason("");
      } else {
        showToast(res.error || "Rejection failed.", "error");
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            <option value="ALL">All Payouts ({payouts.length})</option>
            <option value="PENDING">Pending Transfer</option>
            <option value="APPROVED">Transferred (Approved)</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <span className="text-xs font-mono text-slate-500">
          Total payout claims: {filtered.length} entries
        </span>
      </div>

      {/* Payouts Table */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="pb-3 pl-2">Store / Merchant</th>
                <th className="pb-3">Gross Claim</th>
                <th className="pb-3">Admin Fee</th>
                <th className="pb-3">Net Disbursal</th>
                <th className="pb-3">Destination Account</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-xs">
                    No payout records found in this view.
                  </td>
                </tr>
              ) : (
                paginated.map((p) => {
                  const isPendingStatus = p.status === "PENDING";

                  return (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition">
                      {/* 1. Store */}
                      <td className="py-3.5 pl-2">
                        <div className="font-bold text-white">{p.store.name}</div>
                        <div className="text-slate-400 font-mono text-[11px]">
                          {p.store.slug}.etalase.online
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {formatDate(p.createdAt)}
                        </div>
                      </td>

                      {/* 2. Gross Claim */}
                      <td className="py-3.5 font-mono text-slate-300">
                        {formatCurrency(Number(p.amount), p.currency as any, "id")}
                      </td>

                      {/* 3. Fee */}
                      <td className="py-3.5 font-mono text-slate-400">
                        {Number(p.feeCharged) > 0 ? (
                          <span className="text-rose-400">
                            -{formatCurrency(Number(p.feeCharged), p.currency as any, "id")}
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-bold">Free (PRO)</span>
                        )}
                      </td>

                      {/* 4. Net Disbursal */}
                      <td className="py-3.5 font-mono">
                        <span className="font-extrabold text-emerald-400">
                          {formatCurrency(Number(p.netAmount), p.currency as any, "id")}
                        </span>
                      </td>

                      {/* 5. Destination */}
                      <td className="py-3.5 text-slate-300 font-mono text-[11px]">
                        <div className="max-w-[200px] truncate" title={p.destination}>
                          {p.destination}
                        </div>
                        {p.adminNotes && (
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">
                            {p.adminNotes}
                          </div>
                        )}
                      </td>

                      {/* 6. Status */}
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider inline-flex items-center gap-1 ${
                            p.status === "APPROVED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : p.status === "REJECTED"
                              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {p.status === "APPROVED" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : p.status === "REJECTED" ? (
                            <XCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3 animate-pulse" />
                          )}
                          <span>{p.status}</span>
                        </span>
                      </td>

                      {/* 7. Action Buttons */}
                      <td className="py-3.5 pr-2 text-right">
                        {isPendingStatus ? (
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() => {
                                setApproveModalPayout(p);
                                setTransferRef("");
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                            >
                              Disburse
                            </button>
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() => {
                                setRejectModalPayout(p);
                                setRejectReason("");
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-800/40 border border-slate-700 text-slate-400 text-xs font-semibold transition cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">
                            Settled
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

        {/* Pagination Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Approve Modal with Transfer Reference */}
      {approveModalPayout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                Confirm Disbursal for {approveModalPayout.store.name}
              </h3>
              <button
                type="button"
                onClick={() => setApproveModalPayout(null)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Net Transfer Amount:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {formatCurrency(Number(approveModalPayout.netAmount), approveModalPayout.currency as any, "id")}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Destination:</span>
                <span className="font-mono text-white font-semibold">
                  {approveModalPayout.destination}
                </span>
              </div>
            </div>

            <form onSubmit={handleApproveSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Bank Transfer Reference / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={transferRef}
                  onChange={(e) => setTransferRef(e.target.value)}
                  placeholder="e.g. BCA Ref #TRX987654321..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setApproveModalPayout(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Confirm Disbursal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Modal with Reason */}
      {rejectModalPayout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                Reject Payout Claim for {rejectModalPayout.store.name}
              </h3>
              <button
                type="button"
                onClick={() => setRejectModalPayout(null)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Rejecting will automatically refund{" "}
              <strong className="text-white">
                {formatCurrency(Number(rejectModalPayout.amount), rejectModalPayout.currency as any, "id")}
              </strong>{" "}
              back into the merchant&apos;s wallet balance.
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Rejection Reason
                </label>
                <textarea
                  required
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g. Account number does not match beneficiary name or invalid IFSC/bank code..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectModalPayout(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Refund &amp; Reject</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
