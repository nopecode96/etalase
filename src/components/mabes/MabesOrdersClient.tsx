"use client";

import React, { useState, useTransition } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  QrCode,
  CreditCard,
  MessageCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Loader2,
  DollarSign,
  X,
  FileCheck2,
} from "lucide-react";
import { actionReconcileOrder } from "@/app/mabes/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { formatCurrency, formatDate } from "@/lib/core/formatters";

interface OrderItem {
  id: string;
  orderCode: string;
  storeId: string;
  buyerName: string;
  buyerWhatsapp: string;
  buyerEmail?: string | null;
  currency: string;
  amount: number | string;
  platformFee: number | string;
  netAmount: number | string;
  paymentProvider: "BORDERPAY_QRIS" | "PAYPAL";
  paymentRef?: string | null;
  status: "PENDING" | "PAID" | "EXPIRED" | "FAILED";
  createdAt: string;
  store: {
    name: string;
    slug: string;
  };
  product: {
    title: string;
    price: number | string;
  };
}

interface MabesOrdersClientProps {
  initialOrders: OrderItem[];
}

export function MabesOrdersClient({ initialOrders }: MabesOrdersClientProps) {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [providerFilter, setProviderFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [reconcileRef, setReconcileRef] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const [isPending, startTransition] = useTransition();

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.orderCode.toLowerCase().includes(search.toLowerCase()) ||
      o.buyerName.toLowerCase().includes(search.toLowerCase()) ||
      o.buyerWhatsapp.includes(search) ||
      (o.buyerEmail && o.buyerEmail.toLowerCase().includes(search.toLowerCase())) ||
      o.store.name.toLowerCase().includes(search.toLowerCase()) ||
      o.store.slug.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "ALL" || o.status === statusFilter;
    const matchProvider = providerFilter === "ALL" || o.paymentProvider === providerFilter;

    return matchSearch && matchStatus && matchProvider;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleReconcile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    startTransition(async () => {
      const res = await actionReconcileOrder(selectedOrder.id, reconcileRef);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === selectedOrder.id
              ? { ...o, status: "PAID", paymentRef: reconcileRef || `MANUAL-${Date.now()}` }
              : o
          )
        );
        showToast(`Order #${selectedOrder.orderCode} successfully marked as PAID!`, "success");
        setSelectedOrder(null);
        setReconcileRef("");
      } else {
        showToast(res.error || "Failed to reconcile order.", "error");
      }
    });
  };

  const totalGmv = orders
    .filter((o) => o.status === "PAID")
    .reduce((sum, o) => sum + Number(o.amount), 0);

  const totalPlatformFees = orders
    .filter((o) => o.status === "PAID")
    .reduce((sum, o) => sum + Number(o.platformFee), 0);

  return (
    <div className="space-y-6">
      {/* Top Stat Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Settled Gross GMV
            </span>
            <span className="text-xl font-bold font-mono text-emerald-400">
              {formatCurrency(totalGmv, "IDR")}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Platform Take-Rate Fees
            </span>
            <span className="text-xl font-bold font-mono text-sky-400">
              {formatCurrency(totalPlatformFees, "IDR")}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total Customer Invoices
            </span>
            <span className="text-xl font-bold font-mono text-white">
              {orders.length} orders
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order code, buyer name, WhatsApp, store slug..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            <option value="ALL">All Status ({orders.length})</option>
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING</option>
            <option value="EXPIRED">EXPIRED</option>
            <option value="FAILED">FAILED</option>
          </select>

          <select
            value={providerFilter}
            onChange={(e) => {
              setProviderFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-rose-500 cursor-pointer"
          >
            <option value="ALL">All Gateways</option>
            <option value="BORDERPAY_QRIS">Borderpay QRIS</option>
            <option value="PAYPAL">PayPal</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Order Code</th>
                <th className="px-4 py-3">Storefront &amp; Item</th>
                <th className="px-4 py-3">Buyer Contact</th>
                <th className="px-4 py-3">Gateway</th>
                <th className="px-4 py-3">Settlement Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-slate-600 stroke-[1.5]" />
                    <p className="font-medium text-slate-400">No customer transactions found</p>
                  </td>
                </tr>
              ) : (
                paginated.map((o) => {
                  const isPaid = o.status === "PAID";

                  return (
                    <tr key={o.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3.5">
                        <span className="font-mono font-semibold text-white block">
                          #{o.orderCode}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {formatDate(o.createdAt)}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="space-y-0.5 max-w-[200px]">
                          <span className="font-semibold text-slate-200 block truncate">
                            {o.product.title}
                          </span>
                          <span className="text-[10px] text-indigo-400 font-mono block">
                            @{o.store.slug} &bull; {o.store.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="font-medium text-slate-300 block">{o.buyerName}</span>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          WA: {o.buyerWhatsapp}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        {o.paymentProvider === "BORDERPAY_QRIS" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                            <QrCode className="w-3 h-3 text-rose-400" />
                            Borderpay QRIS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                            <CreditCard className="w-3 h-3 text-blue-400" />
                            PayPal
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="font-mono font-bold text-white block">
                          {formatCurrency(Number(o.amount), o.currency as any)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Fee: {formatCurrency(Number(o.platformFee), o.currency as any)}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            isPaid
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : o.status === "PENDING"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                          }`}
                        >
                          {isPaid && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                          {o.status === "PENDING" && <Clock className="w-3 h-3 text-amber-400" />}
                          {o.status}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        {!isPaid ? (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedOrder(o);
                              setReconcileRef(o.paymentRef || "");
                            }}
                            className="px-2.5 py-1 text-[11px] font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded transition"
                          >
                            Reconcile
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">
                            Ref: {o.paymentRef || "Automated"}
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

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing {(currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} orders
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-1 rounded bg-slate-800 text-slate-300 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono text-white">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1 rounded bg-slate-800 text-slate-300 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Manual Reconciliation Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-semibold text-white">Reconcile Customer Transaction</h3>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Manually mark order <strong className="font-mono text-white">#{selectedOrder.orderCode}</strong> as{" "}
              <strong className="text-emerald-400">PAID</strong>. This action will credit{" "}
              <strong className="font-mono text-white">
                {formatCurrency(Number(selectedOrder.netAmount), selectedOrder.currency as any)}
              </strong>{" "}
              to merchant wallet <strong className="text-white">@{selectedOrder.store.slug}</strong> and trigger the{" "}
              <code className="text-indigo-300">order.paid</code> automated n8n webhook.
            </p>

            <form onSubmit={handleReconcile} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bank / Gateway Transaction Reference ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BPAY-892173981273 / BCA-REF-9912"
                  value={reconcileRef}
                  onChange={(e) => setReconcileRef(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setSelectedOrder(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Reconciling...
                    </>
                  ) : (
                    "Confirm & Settle"
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
