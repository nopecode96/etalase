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
  Save,
  Globe,
  CreditCard,
} from "lucide-react";
import {
  actionUpdateFeeBearer,
  actionRequestWithdrawal,
} from "@/app/admin/actions";
import {
  SupportedCountryWithBanksDto,
  updateStorePayoutBankAction,
} from "@/lib/actions/payout-actions";
import { showToast } from "@/components/ui/GlobalToast";

interface AdminOrdersPayoutsClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
  rules: any;
  monthlyWithdrawalsCount: number;
  remainingFreeWithdrawals: number;
  supportedCountries?: SupportedCountryWithBanksDto[];
}

export function AdminOrdersPayoutsClient({
  store,
  tier,
  rules,
  monthlyWithdrawalsCount,
  remainingFreeWithdrawals,
  supportedCountries = [],
}: AdminOrdersPayoutsClientProps) {
  const isFree = tier === "FREE";
  const [isPending, startTransition] = useTransition();

  const [withdrawals, setWithdrawals] = useState<any[]>(store.withdrawals || []);
  const [feeBorneBy, setFeeBorneBy] = useState<"CUSTOMER" | "MERCHANT">(
    store.feeBorneBy || "CUSTOMER"
  );

  // Payout Bank Configuration State (100% Database-Driven)
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(
    store.countryCode || "ID"
  );
  const [payoutBankId, setPayoutBankId] = useState<string>(
    store.payoutBankId || ""
  );
  const [payoutBankName, setPayoutBankName] = useState<string>(
    store.payoutBankName || "BCA"
  );
  const [payoutAccountNumber, setPayoutAccountNumber] = useState<string>(
    store.payoutAccountNumber || ""
  );
  const [payoutAccountHolder, setPayoutAccountHolder] = useState<string>(
    store.payoutAccountHolder || ""
  );
  const [isSavingBank, setIsSavingBank] = useState<boolean>(false);

  // Modal State for requesting withdrawal
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(50000);
  const [modalBankName, setModalBankName] = useState(payoutBankName || "BCA");
  const [modalAccountNumber, setModalAccountNumber] = useState(payoutAccountNumber || "");
  const [modalAccountHolder, setModalAccountHolder] = useState(payoutAccountHolder || "");

  const walletBalance = Number(store.walletBalance || 0);

  const isFreeQuota = !isFree && remainingFreeWithdrawals > 0;
  const estimatedFee = isFreeQuota ? 0 : rules.withdrawalFeeIdr;
  const netAmount = Math.max(0, withdrawalAmount - estimatedFee);

  // Compute selected country's active banks
  const activeCountry =
    supportedCountries.find((c) => c.code === selectedCountryCode) ||
    supportedCountries.find((c) => c.code === "ID") || {
      code: "ID",
      name: "Indonesia",
      flagEmoji: "🇮🇩",
      currencyCode: "IDR",
      currencySymbol: "Rp",
      isActive: true,
      banks: [],
    };

  const countryBanks = activeCountry.banks || [];
  const bankOptions = countryBanks.filter((b) => b.type === "BANK");
  const ewalletOptions = countryBanks.filter((b) => b.type === "EWALLET");

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

  const handleCountryChange = (newCountryCode: string) => {
    setSelectedCountryCode(newCountryCode);
    const targetCountry = supportedCountries.find((c) => c.code === newCountryCode);
    if (targetCountry && targetCountry.banks.length > 0) {
      setPayoutBankId(targetCountry.banks[0].id);
      setPayoutBankName(targetCountry.banks[0].name);
    }
  };

  const handleBankSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setPayoutBankId(selectedId);
    const found = countryBanks.find((b) => b.id === selectedId || b.name === selectedId);
    if (found) {
      setPayoutBankName(found.name);
    } else {
      setPayoutBankName(selectedId);
    }
  };

  const handleSavePayoutBank = (e: React.FormEvent) => {
    e.preventDefault();

    if (!payoutAccountNumber.trim() || !payoutAccountHolder.trim()) {
      showToast("Mohon isi nomor dan nama pemilik rekening secara lengkap.", "error");
      return;
    }

    setIsSavingBank(true);
    startTransition(async () => {
      const res = await updateStorePayoutBankAction({
        storeId: store.id,
        countryCode: selectedCountryCode,
        payoutBankId: payoutBankId || payoutBankName,
        payoutBankName,
        payoutAccountNumber,
        payoutAccountHolder,
      });
      setIsSavingBank(false);

      if (res.success) {
        showToast("Rekening bank pencairan berhasil disimpan!", "success");
        setModalBankName(payoutBankName);
        setModalAccountNumber(payoutAccountNumber);
        setModalAccountHolder(payoutAccountHolder);
      } else {
        showToast(res.error || "Gagal menyimpan rekening pencairan", "error");
      }
    });
  };

  const handleOpenPayoutModal = () => {
    // Validate if store has registered payout account
    const hasAccount = Boolean(
      (payoutAccountNumber && payoutAccountNumber.trim()) ||
      (store.payoutAccountNumber && store.payoutAccountNumber.trim())
    );

    if (!hasAccount) {
      showToast(
        "Silakan daftarkan Rekening Bank Pencairan terlebih dahulu sebelum mengajukan payout.",
        "error"
      );
      const card = document.getElementById("payout-bank-card");
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = card.querySelector<HTMLInputElement>("input[name='accountNumber']");
        if (input) input.focus();
      }
      return;
    }

    // Pre-fill modal with saved credentials
    setModalBankName(payoutBankName || store.payoutBankName || "BCA");
    setModalAccountNumber(payoutAccountNumber || store.payoutAccountNumber || "");
    setModalAccountHolder(payoutAccountHolder || store.payoutAccountHolder || "");
    setPayoutModalOpen(true);
  };

  const handleRequestWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();

    if (withdrawalAmount < rules.minWithdrawalAmountIdr) {
      showToast(
        `Minimum penarikan adalah Rp ${rules.minWithdrawalAmountIdr.toLocaleString("id-ID")}`,
        "error"
      );
      return;
    }

    if (withdrawalAmount > walletBalance) {
      showToast("Saldo dompet tidak mencukupi untuk penarikan.", "error");
      return;
    }

    if (!modalAccountNumber.trim() || !modalAccountHolder.trim()) {
      showToast("Detail rekening bank pencairan belum lengkap.", "error");
      return;
    }

    startTransition(async () => {
      const res = await actionRequestWithdrawal({
        storeId: store.id,
        amount: withdrawalAmount,
        bankName: modalBankName,
        accountNumber: modalAccountNumber,
        accountHolder: modalAccountHolder,
      });

      if (res.success && res.data) {
        setWithdrawals([res.data, ...withdrawals]);
        setPayoutModalOpen(false);
        showToast("Permintaan pencairan berhasil dikirim! Diproses dalam 1x24 jam.", "success");
      } else {
        showToast(res.error || "Gagal mengajukan penarikan", "error");
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
            Wallet &amp; Withdrawals
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Kelola saldo dompet toko, margin guard BorderPay, dan ajukan pencairan ke rekening bank.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenPayoutModal}
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
            Tentukan siapa penanggung biaya pemrosesan pembayaran QRIS ({rules.directCheckoutFeePercent}%).
            Sistem kami dirancang untuk melindungi 100% margin keuntungan toko Anda.
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
                  Ditambahkan otomatis sebagai biaya layanan saat checkout. Toko Anda menerima 100% nominal harga produk.
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
                  Biaya ({rules.directCheckoutFeePercent}%) dipotong langsung dari saldo pencairan toko.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Payout Bank Account Configuration (100% Database-Driven) */}
      <section
        id="payout-bank-card"
        className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#E7E5E4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1C1917]">
                Rekening Pencairan (Payout Bank Account)
              </h2>
              <p className="text-xs text-[#57534E] mt-0.5">
                Daftarkan rekening bank atau e-wallet untuk menerima transfer saldo pencairan otomatis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                payoutAccountNumber
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {payoutAccountNumber ? "✓ Rekening Terdaftar" : "! Belum Didaftarkan"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSavePayoutBank} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Country Dropdown (Database-Driven) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1C1917] flex items-center justify-between">
                <span>Negara Operasional Toko</span>
                <span className="text-[10px] text-[#78716C] font-normal">
                  Bahasa antarmuka terpisah dari negara toko
                </span>
              </label>
              <select
                value={selectedCountryCode}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E5E4] bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20 focus:border-[#D94E28]"
              >
                {supportedCountries.map((c) => (
                  <option
                    key={c.code}
                    value={c.code}
                    disabled={!c.isActive}
                  >
                    {c.flagEmoji} {c.name} ({c.currencyCode}) {c.isActive ? "— Aktif" : "— Segera Hadir"}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-[#78716C]">
                Hanya negara bertanda <b>Aktif</b> yang mendukung direct payout BorderPay saat ini.
              </p>
            </div>

            {/* Bank / E-Wallet Dynamic Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1C1917]">
                Bank / Dompet Digital Pencairan *
              </label>
              <select
                value={payoutBankId || payoutBankName}
                onChange={handleBankSelect}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E5E4] bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20 focus:border-[#D94E28]"
              >
                {bankOptions.length > 0 && (
                  <optgroup label="🏦 Bank Transfer (Real-time Payout)">
                    {bankOptions.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                {ewalletOptions.length > 0 && (
                  <optgroup label="📱 Dompet Digital (E-Wallet)">
                    {ewalletOptions.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                {bankOptions.length === 0 && ewalletOptions.length === 0 && (
                  <option value="BCA">Bank Central Asia (BCA)</option>
                )}
              </select>
            </div>

            {/* Account Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1C1917]">
                Nomor Rekening / No. HP E-Wallet *
              </label>
              <input
                type="text"
                name="accountNumber"
                required
                value={payoutAccountNumber}
                onChange={(e) => setPayoutAccountNumber(e.target.value)}
                placeholder="Contoh: 1234567890 atau 081234567890"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E5E4] font-mono focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20 focus:border-[#D94E28]"
              />
            </div>

            {/* Account Holder Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1C1917]">
                Nama Pemilik Rekening (Sesuai KTP / Rekening) *
              </label>
              <input
                type="text"
                required
                value={payoutAccountHolder}
                onChange={(e) => setPayoutAccountHolder(e.target.value)}
                placeholder="Contoh: BUDI SANTOSO"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E5E4] font-semibold uppercase focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20 focus:border-[#D94E28]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#E7E5E4]">
            <p className="text-[11px] text-[#78716C]">
              Rekening ini akan otomatis terisi saat Anda mengajukan penarikan dana.
            </p>
            <button
              type="submit"
              disabled={isSavingBank || isPending}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition disabled:opacity-50 cursor-pointer"
            >
              {isSavingBank ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>Simpan Rekening Pencairan</span>
            </button>
          </div>
        </form>
      </section>

      {/* 3. Withdrawal History */}
      <section className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-4">
        <h2 className="text-base font-bold text-[#1C1917]">
          Riwayat Penarikan Dana ({withdrawals.length})
        </h2>

        {withdrawals.length === 0 ? (
          <p className="text-xs text-[#78716C] py-4">Belum ada riwayat penarikan dana.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#78716C] font-semibold border-y border-[#E7E5E4]">
                <tr>
                  <th className="py-2.5 px-4">Tanggal</th>
                  <th className="py-2.5 px-4">Jumlah Diminta</th>
                  <th className="py-2.5 px-4">Biaya Payout</th>
                  <th className="py-2.5 px-4">Dana Diterima</th>
                  <th className="py-2.5 px-4">Rekening Tujuan</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5E4]">
                {withdrawals.map((w) => (
                  <tr key={w.id}>
                    <td className="py-3 px-4 text-[#78716C]">
                      {new Date(w.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
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
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          w.status === "COMPLETED"
                            ? "bg-emerald-50 text-emerald-700"
                            : w.status === "REJECTED"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
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
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#D94E28]" />
                <h3 className="text-base font-bold text-[#1C1917]">
                  Ajukan Penarikan Saldo
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPayoutModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRequestWithdrawal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Nominal Penarikan (IDR)
                </label>
                <input
                  type="number"
                  required
                  min={rules.minWithdrawalAmountIdr}
                  max={walletBalance}
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E5E4] font-bold"
                />
                <p className="text-[11px] text-[#78716C] mt-1">
                  Tersedia: Rp {walletBalance.toLocaleString("id-ID")} &bull; Minimum: Rp{" "}
                  {rules.minWithdrawalAmountIdr.toLocaleString("id-ID")}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Bank / E-Wallet Tujuan
                </label>
                <input
                  type="text"
                  readOnly
                  value={modalBankName}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-stone-100 font-semibold text-stone-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Nomor Rekening
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={modalAccountNumber}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-stone-100 font-mono text-stone-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Atas Nama
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={modalAccountHolder}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-stone-100 text-stone-700 uppercase"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#57534E]">
                  <span>Nominal Diminta:</span>
                  <span className="font-semibold text-[#1C1917]">
                    Rp {withdrawalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-[#57534E]">
                  <span>Biaya Payout:</span>
                  <span className="font-semibold text-emerald-600">
                    {isFreeQuota ? "Rp 0 (Kuota Gratis)" : `Rp ${estimatedFee.toLocaleString("id-ID")}`}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E7E5E4] font-bold text-sm text-[#1C1917]">
                  <span>Estimasi Dana Masuk:</span>
                  <span className="text-emerald-700">Rp {netAmount.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7E5E4]">
                <button
                  type="button"
                  onClick={() => setPayoutModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] rounded-xl transition shadow-xs flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Konfirmasi Pengajuan Payout</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
