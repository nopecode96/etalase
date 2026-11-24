"use client";

import React, { useState, useTransition } from "react";
import {
  Wallet,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  actionUpdateFeeBearer,
  actionRequestWithdrawal,
} from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";

interface AdminOrdersPayoutsClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
  rules: any;
  monthlyWithdrawalsCount: number;
  remainingFreeWithdrawals: number;
}

export function AdminOrdersPayoutsClient({
  store,
  tier,
  rules,
  monthlyWithdrawalsCount,
  remainingFreeWithdrawals,
}: AdminOrdersPayoutsClientProps) {
  const isFree = tier === "FREE";
  const [isPending, startTransition] = useTransition();

  const [withdrawals, setWithdrawals] = useState<any[]>(store.withdrawals || []);
  const [feeBorneBy, setFeeBorneBy] = useState<"CUSTOMER" | "MERCHANT">(
    store.feeBorneBy || "CUSTOMER"
  );

  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(50000);
  const [bankName, setBankName] = useState("BCA");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const walletBalance = Number(store.walletBalance || 0);

  const isFreeQuota = !isFree && remainingFreeWithdrawals > 0;
  const estimatedFee = isFreeQuota ? 0 : rules.withdrawalFeeIdr;
  const netAmount = Math.max(0, withdrawalAmount - estimatedFee);

  const handleFeeBearerChange = (val: "CUSTOMER" | "MERCHANT") => {
    setFeeBorneBy(val);
    startTransition(async () => {
      const res = await actionUpdateFeeBearer({
        storeId: store.id,
        feeBorneBy: val,
      });
      if (res.success) {
        showToast(
          val === "CUSTOMER"
            ? "Saved: Customer pays QRIS fee. Your margin is 100% protected!"
            : "Saved: Merchant absorbs QRIS fee.",
          "success"
        );
      } else {
        showToast(res.error || "Failed to update fee setting", "error");
      }
    });
  };

  const handleRequestWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();

    if (withdrawalAmount < rules.minWithdrawalAmountIdr) {
      showToast(
        `Minimum withdrawal amount is Rp ${rules.minWithdrawalAmountIdr.toLocaleString("id-ID")}`,
        "error"
      );
      return;
    }

    if (withdrawalAmount > walletBalance) {
      showToast("Insufficient balance for withdrawal", "error");
      return;
    }

    if (!accountNumber.trim() || !accountHolder.trim()) {
      showToast("Please provide complete bank account details", "error");
      return;
    }

    startTransition(async () => {
      const res = await actionRequestWithdrawal({
        storeId: store.id,
        amount: withdrawalAmount,
        bankName,
        accountNumber,
        accountHolder,
      });

      if (res.success && res.data) {
        setWithdrawals([res.data, ...withdrawals]);
        setPayoutModalOpen(false);
        showToast("Withdrawal request submitted! Payout processed in 1x24 hours.", "success");
      } else {
        showToast(res.error || "Failed to submit withdrawal", "error");
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
            Wallet &amp; Withdrawals
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Manage your store wallet funds, BorderPay margin guard, and submit bank payouts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPayoutModalOpen(true)}
          disabled={walletBalance < rules.minWithdrawalAmountIdr}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-semibold shadow-xs transition disabled:opacity-40 self-start sm:self-auto cursor-pointer"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Request Payout</span>
        </button>
      </div>

      {/* 1. Wallet Balance & Anti-Rugi Guard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Wallet Balance Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#E7E5E4] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[#78716C] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Available Wallet</span>
              <Wallet className="w-4 h-4 text-[#D94E28]" />
            </div>
            <p className="text-3xl font-bold tracking-tight text-[#1C1917]">
              Rp {walletBalance.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-[#78716C] mt-1">
              Minimum payout: Rp {rules.minWithdrawalAmountIdr.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between text-xs">
            <span className="text-[#57534E]">Monthly Payout Status:</span>
            <span className="font-bold text-[#1C1917]">
              {isFree
                ? "Standard (Rp 5.000/tarik)"
                : `${remainingFreeWithdrawals} of 4 Free remaining`}
            </span>
          </div>
        </div>

        {/* Anti-Rugi QRIS Convenience Fee Setting Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-[#E7E5E4] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-[#1C1917]">
                BorderPay Margin Guardrail (Fee Bearer)
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              Anti-Loss Active
            </span>
          </div>

          <p className="text-xs text-[#57534E] leading-relaxed">
            Choose who pays the digital payment processing fee ({rules.directCheckoutFeePercent}% QRIS).
            Our system is built to protect 100% of your retail margin.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Option A: Customer Pays (Recommended) */}
            <div
              onClick={() => handleFeeBearerChange("CUSTOMER")}
              className={`p-3.5 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3 ${
                feeBorneBy === "CUSTOMER"
                  ? "border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/10"
                  : "border-[#E7E5E4] bg-white hover:border-stone-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                  feeBorneBy === "CUSTOMER"
                    ? "border-emerald-600 bg-emerald-600"
                    : "border-stone-300"
                }`}
              >
                {feeBorneBy === "CUSTOMER" && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <div>
                <p className="text-xs font-bold text-[#1C1917]">
                  Customer Pays Fee <span className="text-emerald-700 font-bold">(Recommended)</span>
                </p>
                <p className="text-[11px] text-[#57534E] mt-0.5 leading-snug">
                  Added as a Convenience Fee at checkout. Your store receives 100% full item price.
                </p>
              </div>
            </div>

            {/* Option B: Merchant Absorbs */}
            <div
              onClick={() => handleFeeBearerChange("MERCHANT")}
              className={`p-3.5 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3 ${
                feeBorneBy === "MERCHANT"
                  ? "border-[#D94E28] bg-[#FDF0EC]/50 ring-2 ring-[#D94E28]/10"
                  : "border-[#E7E5E4] bg-white hover:border-stone-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                  feeBorneBy === "MERCHANT"
                    ? "border-[#D94E28] bg-[#D94E28]"
                    : "border-stone-300"
                }`}
              >
                {feeBorneBy === "MERCHANT" && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <div>
                <p className="text-xs font-bold text-[#1C1917]">
                  Merchant Absorbs Fee
                </p>
                <p className="text-[11px] text-[#57534E] mt-0.5 leading-snug">
                  Fee ({rules.directCheckoutFeePercent}%) is deducted from your balance payout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Withdrawal History */}
      <section className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-4">
        <h2 className="text-base font-bold text-[#1C1917]">
          Withdrawal History ({withdrawals.length})
        </h2>

        {withdrawals.length === 0 ? (
          <p className="text-xs text-[#78716C] py-4">No payout requests made yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#78716C] font-semibold border-y border-[#E7E5E4]">
                <tr>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Requested</th>
                  <th className="py-2.5 px-4">Fee</th>
                  <th className="py-2.5 px-4">Net Payout</th>
                  <th className="py-2.5 px-4">Destination Bank Account</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5E4]">
                {withdrawals.map((w) => (
                  <tr key={w.id}>
                    <td className="py-3 px-4 text-[#78716C]">
                      {new Date(w.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#1C1917]">
                      Rp {Number(w.amount).toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-4 text-stone-500">
                      Rp {Number(w.feeCharged || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-700">
                      Rp {Number(w.netAmount).toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-4 text-[#57534E] font-medium">{w.destination}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Payout Request Modal */}
      {payoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <h3 className="text-base font-bold text-[#1C1917]">
                Request Balance Withdrawal
              </h3>
              <button
                type="button"
                onClick={() => setPayoutModalOpen(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRequestWithdrawal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Withdrawal Amount (IDR)
                </label>
                <input
                  type="number"
                  required
                  min={rules.minWithdrawalAmountIdr}
                  max={walletBalance}
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] font-bold"
                />
                <p className="text-[11px] text-[#78716C] mt-1">
                  Available: Rp {walletBalance.toLocaleString("id-ID")} &bull; Minimum: Rp{" "}
                  {rules.minWithdrawalAmountIdr.toLocaleString("id-ID")}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Destination Bank
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white font-semibold"
                >
                  <option value="BCA">BCA (Bank Central Asia)</option>
                  <option value="MANDIRI">Bank Mandiri</option>
                  <option value="BRI">BRI (Bank Rakyat Indonesia)</option>
                  <option value="BNI">BNI (Bank Negara Indonesia)</option>
                  <option value="SEABANK">SeaBank</option>
                  <option value="JAGO">Bank Jago</option>
                  <option value="BSI">BSI (Bank Syariah Indonesia)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="1234567890"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    placeholder="As registered in bank"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4]"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#57534E]">
                  <span>Requested Amount:</span>
                  <span className="font-semibold text-[#1C1917]">
                    Rp {withdrawalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-[#57534E]">
                  <span>Payout Fee:</span>
                  <span className="font-semibold text-emerald-600">
                    {isFreeQuota ? "Rp 0 (Free Quota)" : `Rp ${estimatedFee.toLocaleString("id-ID")}`}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E7E5E4] font-bold text-sm text-[#1C1917]">
                  <span>Net Funds Received:</span>
                  <span className="text-emerald-700">Rp {netAmount.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7E5E4]">
                <button
                  type="button"
                  onClick={() => setPayoutModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] rounded-xl transition shadow-xs flex items-center gap-2 disabled:opacity-50"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Confirm Payout Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
