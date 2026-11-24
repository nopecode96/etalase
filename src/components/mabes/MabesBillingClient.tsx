"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ShieldAlert,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  X,
  Sparkles,
} from "lucide-react";
import { actionApprovePlanOrder, actionRejectPlanOrder } from "@/app/mabes/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { formatCurrency, formatDate } from "@/lib/core/formatters";

interface PlanOrderItem {
  id: string;
  orderNumber: string;
  storeId: string;
  planCode: string;
  billingCycle: string;
  amount: number | string;
  currency: string;
  status: string;
  paymentMethod: string;
  proofUrl?: string | null;
  notes?: string | null;
  adminNotes?: string | null;
  paidAt?: string | null;
  approvedAt?: string | null;
  createdAt: string;
  store: {
    name: string;
    slug: string;
    tier: string;
  };
}

interface MabesBillingClientProps {
  initialOrders: PlanOrderItem[];
}

export function MabesBillingClient({ initialOrders }: MabesBillingClientProps) {
  const [orders, setOrders] = useState<PlanOrderItem[]>(initialOrders);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [rejectModalOrder, setRejectModalOrder] = useState<PlanOrderItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [isPending, startTransition] = useTransition();

  const filtered = orders.filter((o) => {
    if (statusFilter === "ALL") return true;
    if (statusFilter === "PENDING") {
      return o.status === "PENDING" || o.status === "UNDER_REVIEW";
    }
    return o.status === statusFilter;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleApprove = (order: PlanOrderItem) => {
    if (!confirm(`Confirm approval for ${order.orderNumber} (${order.store.name} -> ${order.planCode})?`)) {
      return;
    }

    startTransition(async () => {
      const res = await actionApprovePlanOrder(order.id);
      if (res.success) {
        const approvedTier = (res.data as any)?.store?.tier || order.planCode;
        setOrders((prev) =>
          prev.map((o) =>
            o.id === order.id
              ? {
                  ...o,
                  status: "APPROVED",
                  approvedAt: new Date().toISOString(),
                  store: { ...o.store, tier: approvedTier },
                }
              : o
          )
        );
        showToast(`Invoice ${order.orderNumber} approved! Store upgraded to ${order.planCode}.`, "success");
      } else {
        showToast(res.error || "Approval failed.", "error");
      }
    });
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalOrder) return;

    startTransition(async () => {
      const res = await actionRejectPlanOrder(rejectModalOrder.id, rejectReason);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === rejectModalOrder.id ? { ...o, status: "REJECTED" } : o
          )
        );
        showToast(`Invoice ${rejectModalOrder.orderNumber} rejected.`, "success");
        setRejectModalOrder(null);
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
            <option value="ALL">All Invoices ({orders.length})</option>
            <option value="PENDING">Pending / Review</option>
            <option value="APPROVED">Approved &amp; Active</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <span className="text-xs font-mono text-slate-500">
          Total orders: {filtered.length} entries
        </span>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="pb-3 pl-2">Invoice / Ref</th>
                <th className="pb-3">Store</th>
                <th className="pb-3">Plan Package</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Channel / Proof</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-xs">
                    No upgrade orders found in this filter view.
                  </td>
                </tr>
              ) : (
                paginated.map((order) => {
                  const isPendingStatus =
                    order.status === "PENDING" || order.status === "UNDER_REVIEW";

                  return (
                    <tr key={order.id} className="hover:bg-slate-800/30 transition">
                      {/* 1. Invoice Ref */}
                      <td className="py-3.5 pl-2 font-mono text-slate-300">
                        <div className="font-bold text-white">{order.orderNumber}</div>
                        <div className="text-[10px] text-slate-500">
                          {formatDate(order.createdAt)}
                        </div>
                      </td>

                      {/* 2. Store */}
                      <td className="py-3.5">
                        <div className="font-bold text-white">{order.store.name}</div>
                        <div className="text-slate-400 font-mono text-[11px]">
                          {order.store.slug}.etalase.online
                        </div>
                      </td>

                      {/* 3. Plan Package */}
                      <td className="py-3.5">
                        <span className="font-bold text-white">
                          {order.planCode === "DFY" ? "Terima Beres (DFY)" : `PRO (${order.billingCycle})`}
                        </span>
                      </td>

                      {/* 4. Amount */}
                      <td className="py-3.5 font-mono">
                        <span className="font-extrabold text-emerald-400">
                          {formatCurrency(Number(order.amount), order.currency as any, "id")}
                        </span>
                      </td>

                      {/* 5. Payment Channel & Proof */}
                      <td className="py-3.5 text-slate-300">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-400">
                            {order.paymentMethod}
                          </span>
                          {order.proofUrl && (
                            <button
                              type="button"
                              onClick={() => setPreviewImage(order.proofUrl!)}
                              className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-rose-400 transition"
                              title="View uploaded proof image"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>

                      {/* 6. Status Badge */}
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider inline-flex items-center gap-1 ${
                            order.status === "APPROVED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : order.status === "REJECTED"
                              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {order.status === "APPROVED" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : order.status === "REJECTED" ? (
                            <XCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3 animate-spin" />
                          )}
                          <span>{order.status}</span>
                        </span>
                      </td>

                      {/* 7. Action Buttons */}
                      <td className="py-3.5 pr-2 text-right">
                        {isPendingStatus ? (
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() => handleApprove(order)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() => {
                                setRejectModalOrder(order);
                                setRejectReason("");
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-800/40 border border-slate-700 text-slate-400 text-xs font-semibold transition cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">
                            {order.approvedAt ? formatDate(order.approvedAt) : "Completed"}
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

      {/* Lightbox Modal for Receipt Preview */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-white">
              <span>Payment Proof Receipt Preview</span>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-full h-80 rounded-xl overflow-hidden bg-black">
              <Image
                src={previewImage}
                alt="Receipt proof"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal with Reason */}
      {rejectModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                Reject Upgrade Invoice {rejectModalOrder.orderNumber}
              </h3>
              <button
                type="button"
                onClick={() => setRejectModalOrder(null)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Rejection Reason / Notes
                </label>
                <textarea
                  required
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g. Transfer amount did not match invoice nominal or proof image was illegible..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectModalOrder(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Confirm Rejection</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
