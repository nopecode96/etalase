"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  MessageCircle,
  ExternalLink,
  Check,
  Clock,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { actionUpdateOrderStatus } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { AdminPagination } from "@/components/admin/AdminPagination";

interface AdminOrdersClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
  rules: any;
}

export function AdminOrdersClient({ store, tier }: AdminOrdersClientProps) {
  const [orders, setOrders] = useState<any[]>(store.orders || []);
  const [isPending, startTransition] = useTransition();

  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "PAID" | "COMPLETED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleUpdateStatus = (orderId: string, status: "PENDING" | "PAID" | "COMPLETED") => {
    startTransition(async () => {
      const res = await actionUpdateOrderStatus({
        orderId,
        storeId: store.id,
        status,
      });

      if (res.success) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status } : o)));
        showToast(`Order status updated to ${status}!`, "success");
      } else {
        showToast(res.error || "Failed to update order", "error");
      }
    });
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyerWhatsapp?.includes(searchQuery);

    if (!matchesSearch) return false;
    if (statusFilter === "ALL") return true;
    return order.status === statusFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedOrders = filteredOrders.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  return (
    <div className="space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
              Customer Orders
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
              {orders.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Track paid customer checkouts, customer WhatsApp numbers, and fulfillment status.
          </p>
        </div>

        <Link
          href="/admin/orders/payouts"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E7E5E4] hover:bg-[#FAF8F5] text-xs font-semibold text-[#1C1917] transition shadow-2xs self-start sm:self-auto"
        >
          <Wallet className="w-3.5 h-3.5 text-[#D94E28]" />
          <span>Wallet &amp; Withdrawals →</span>
        </Link>
      </div>

      {/* Search and Dropdown Filter (No Horizontal Tab Strips) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order Code, Customer Name, or WhatsApp..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20 focus:border-[#D94E28]"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[#78716C] whitespace-nowrap">
            Filter Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl border border-[#E7E5E4] bg-white text-xs font-semibold text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20"
          >
            <option value="ALL">All Statuses ({orders.length})</option>
            <option value="PAID">Paid Only</option>
            <option value="COMPLETED">Completed Only</option>
            <option value="PENDING">Pending Only</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-[#E7E5E4] p-8 shadow-xs">
          <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#1C1917]">No orders found</h3>
          <p className="text-xs text-[#78716C] mt-1 max-w-sm mx-auto">
            {searchQuery
              ? "No orders matched your search criteria."
              : "Customer orders placed via your storefront or WhatsApp will appear here."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#78716C] font-semibold border-b border-[#E7E5E4]">
                <tr>
                  <th className="py-3 px-4">Order Code</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Product Item</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Fulfillment Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5E4]">
                {paginatedOrders.map((order) => {
                  const cleanPhone = (order.buyerWhatsapp || "").replace(/[^0-9]/g, "");
                  const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${order.buyerName}, thank you for your order (${order.orderCode}) at ${store.name}!`
                  )}`;

                  return (
                    <tr key={order.id} className="hover:bg-[#FAF8F5]/50 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#1C1917]">
                        {order.orderCode}
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-bold text-[#1C1917]">{order.buyerName || "Customer"}</p>
                        {cleanPhone ? (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-600 hover:underline mt-0.5"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp Customer</span>
                          </a>
                        ) : null}
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-medium text-[#1C1917] truncate max-w-xs">
                          {order.product?.title || "Store Item"}
                        </p>
                        <p className="text-[10px] text-[#78716C]">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-[#1C1917]">
                        Rp {Number(order.amount).toLocaleString("id-ID")}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            order.status === "PAID"
                              ? "bg-emerald-50 text-emerald-700"
                              : order.status === "COMPLETED"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {order.status === "PENDING" && (
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(order.id, "PAID")}
                              className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-2xs"
                            >
                              Mark Paid
                            </button>
                          )}
                          {order.status === "PAID" && (
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(order.id, "COMPLETED")}
                              className="px-2.5 py-1 text-[11px] font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition"
                            >
                              Mark Completed
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
          <AdminPagination
            currentPage={safePage}
            totalItems={filteredOrders.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
