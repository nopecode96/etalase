"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  ExternalLink,
  MessageCircle,
  ShoppingBag,
  Zap,
  Globe,
  Settings,
  Trash2,
  Check,
  Loader2,
  X,
  Share2,
  Palette,
  Wallet,
  CreditCard,
  ArrowDownToLine,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import {
  actionCreateProduct,
  actionDeleteProduct,
  actionUpdateStoreSettings,
  actionUpdateFeeBearer,
  actionRequestWithdrawal,
} from "./actions";
import { toast } from "sonner";
import { EtalaseLogoIcon } from "@/components/brand/EtalaseLogo";
import { PAYMENT_RULES } from "@/lib/constants/pricing";
import { showServiceResultToast } from "@/components/ui/GlobalToast";
import {
  CHAT_CHANNELS_REGISTRY,
  SEA_COUNTRY_PROFILES,
  CHECKOUT_MODES_REGISTRY,
} from "@/lib/master-data/sea-registry";
import { MARKETPLACE_PRESETS } from "@/lib/config/constants";
import { formatCurrency } from "@/lib/core/formatters";
import { CheckoutMode, ExternalPlatform } from "@prisma/client";

interface AdminDashboardProps {
  store: {
    id: string;
    slug: string;
    name: string;
    tier: string;
    locale: string;
    currency: string;
    chatChannel: string;
    chatHandle?: string | null;
    feeBorneBy?: "CUSTOMER" | "MERCHANT";
    walletBalance?: number;
    chatChannels?: Array<{ channel: string; handle: string; isPrimary?: boolean }> | null;
    products: Array<{
      id: string;
      title: string;
      slug: string;
      price: number;
      compareAtPrice?: number | null;
      checkoutMode: CheckoutMode;
      externalPlatform?: ExternalPlatform | null;
      externalUrl?: string | null;
      externalLabel?: string | null;
      clicks: number;
      views: number;
    }>;
  };
  monthlyWithdrawalCount?: number;
  initialTab?: "products" | "regional" | "finance";
}

export function AdminDashboardClient({
  store,
  monthlyWithdrawalCount = 0,
  initialTab = "products",
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"products" | "regional" | "finance">(initialTab);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Financial & Fee Bearer State
  const [feeBorneBy, setFeeBorneBy] = useState<"CUSTOMER" | "MERCHANT">(store.feeBorneBy || "CUSTOMER");
  const [savingFeeBearer, setSavingFeeBearer] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number>(store.walletBalance || 0);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [withdrawDestination, setWithdrawDestination] = useState<string>("");
  const [submittingWithdrawal, setSubmittingWithdrawal] = useState(false);
  const [withdrawalCount, setWithdrawalCount] = useState<number>(monthlyWithdrawalCount);

  // New Product Form State
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [checkoutMode, setCheckoutMode] = useState<CheckoutMode>("DIRECT_CHECKOUT");
  const [externalPlatform, setExternalPlatform] = useState<ExternalPlatform>("TIKTOK_SHOP");
  const [externalUrl, setExternalUrl] = useState("");
  const [externalLabel, setExternalLabel] = useState("");
  const [chatChannel, setChatChannel] = useState(store.chatChannel || "WHATSAPP");
  const [chatHandle, setChatHandle] = useState(store.chatHandle || "");
  const [chatMessage, setChatMessage] = useState("");
  const [enableSecondaryChat, setEnableSecondaryChat] = useState(false);

  // Regional & Multi-Channel Chat State
  const [selectedLocale, setSelectedLocale] = useState(store.locale || "id");
  const [selectedCurrency, setSelectedCurrency] = useState(store.currency || "IDR");
  const [channels, setChannels] = useState<Array<{ channel: string; handle: string }>>(
    (store.chatChannels as Array<{ channel: string; handle: string }>) || [
      { channel: store.chatChannel || "WHATSAPP", handle: store.chatHandle || "" },
    ]
  );
  const [savingSettings, setSavingSettings] = useState(false);

  const handleAddChannelRow = () => {
    setChannels([...channels, { channel: "LINE", handle: "" }]);
  };

  const handleRemoveChannelRow = (index: number) => {
    setChannels(channels.filter((_, i) => i !== index));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    const primary = channels[0];
    const res = await actionUpdateStoreSettings(store.slug, {
      locale: selectedLocale,
      currency: selectedCurrency,
      chatChannel: (primary?.channel as any) || "WHATSAPP",
      chatHandle: primary?.handle || "",
      chatChannels: channels,
    });
    setSavingSettings(false);
    showServiceResultToast(res);
  };

  const handleSaveFeeBearer = async () => {
    setSavingFeeBearer(true);
    const res = await actionUpdateFeeBearer(store.slug, feeBorneBy);
    setSavingFeeBearer(false);
    if (res.success) {
      toast.success("Pengaturan penanggung biaya transaksi berhasil diperbarui!");
    } else {
      toast.error(res.error || "Gagal memperbarui pengaturan biaya.");
    }
  };

  const handleRequestWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);
    if (isNaN(amountNum) || amountNum < 50000) {
      toast.error("Minimal penarikan saldo adalah Rp 50.000.");
      return;
    }
    if (!withdrawDestination.trim()) {
      toast.error("Harap isi nomor rekening dan bank/e-wallet tujuan.");
      return;
    }
    if (store.tier !== "FREE" && amountNum > walletBalance) {
      toast.error("Saldo dompet Anda tidak mencukupi untuk penarikan ini.");
      return;
    }

    setSubmittingWithdrawal(true);
    const res = await actionRequestWithdrawal(store.slug, amountNum, withdrawDestination);
    setSubmittingWithdrawal(false);
    if (res.success) {
      toast.success(res.message || "Permintaan penarikan berhasil diajukan!");
      setWalletBalance((prev) => Math.max(0, prev - amountNum));
      setWithdrawalCount((prev) => prev + 1);
      setWithdrawAmount("");
      setWithdrawDestination("");
    } else {
      toast.error(res.error || "Gagal mengajukan penarikan.");
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    setLoading(true);
    const numericPrice = parseFloat(price) || 0;

    const secondaryModes = enableSecondaryChat
      ? [
          {
            mode: "CHAT_ORDER" as CheckoutMode,
            label: "Tanya via Chat",
            chatChannel: chatChannel,
            chatHandle: chatHandle,
          },
        ]
      : undefined;

    const res = await actionCreateProduct(store.slug, {
      title,
      price: numericPrice,
      checkoutMode,
      externalPlatform: checkoutMode === "EXTERNAL_LINK" ? externalPlatform : undefined,
      externalUrl: checkoutMode === "EXTERNAL_LINK" ? externalUrl : undefined,
      externalLabel: checkoutMode === "EXTERNAL_LINK" ? externalLabel : undefined,
      chatMessage: checkoutMode === "CHAT_ORDER" ? chatMessage : undefined,
      secondaryModes,
    });

    setLoading(false);
    showServiceResultToast(res);

    if (res.success) {
      setIsModalOpen(false);
      setTitle("");
      setPrice("");
      setExternalUrl("");
      setChatMessage("");
      setEnableSecondaryChat(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Hapus produk ini dari etalase?")) return;
    const res = await actionDeleteProduct(store.slug, productId);
    showServiceResultToast(res);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EtalaseLogoIcon size={32} />
            <div>
              <h1 className="font-bold text-slate-900 leading-none">
                {store.name}
              </h1>
              <span className="text-xs text-slate-500 font-mono">
                {store.slug}.etalase.online
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/${store.slug}/admin/appearance`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] px-3.5 py-2 rounded-xl transition shadow-xs"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Desain &amp; Susun Blok</span>
            </Link>
            <Link
              href={`/${store.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 px-3.5 py-2 rounded-xl border border-slate-200 bg-white transition shadow-sm"
            >
              <span>Kunjungi Etalase Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="w-full px-6 flex gap-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`py-3.5 text-sm font-semibold border-b-2 transition flex items-center gap-2 ${
              activeTab === "products"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Katalog Produk &amp; Mode Jualan</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {store.products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("regional")}
            className={`py-3.5 text-sm font-semibold border-b-2 transition flex items-center gap-2 ${
              activeTab === "regional"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Regional &amp; Multi-Channel Chat SEA</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
              {channels.length} Saluran
            </span>
          </button>

          <button
            onClick={() => setActiveTab("finance")}
            className={`py-3.5 text-sm font-semibold border-b-2 transition flex items-center gap-2 ${
              activeTab === "finance"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Keuangan &amp; Biaya QRIS</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
              Saldo {formatCurrency(walletBalance, "IDR", "id")}
            </span>
          </button>

          <Link
            href={`/${store.slug}/admin/appearance`}
            className="py-3.5 text-sm font-semibold border-b-2 border-transparent text-[#57534E] hover:text-[#D94E28] transition flex items-center gap-2"
          >
            <Palette className="w-4 h-4 text-[#D94E28]" />
            <span>Desain &amp; Susun Blok</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FDF0EC] text-[#D94E28] font-bold border border-[#FADCD3]">
              Live Preview
            </span>
          </Link>
        </div>
      </div>

      {/* Body Content */}
      <main className="w-full px-6 py-8 flex-1">
        {activeTab === "products" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Daftar Produk &amp; Tautan Jualan
                </h2>
                <p className="text-xs text-slate-500">
                  Kombinasikan QRIS instan, Keranjang Kuning TikTok, dan Order WhatsApp dalam satu toko.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk Baru</span>
              </button>
            </div>

            {/* Product Cards List */}
            {store.products.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Belum ada produk jualan
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  Buat produk digital pertama Anda, link afiliasi Keranjang Kuning, atau katalog pemesanan via chat.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Produk Sekarang</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {store.products.map((p) => {
                  const modeInfo = CHECKOUT_MODES_REGISTRY[p.checkoutMode];
                  return (
                    <div
                      key={p.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${modeInfo.badgeColor}`}
                          >
                            {modeInfo.name}
                          </span>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="text-slate-400 hover:text-rose-600 transition p-1"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base mb-1">
                          {p.title}
                        </h3>
                        <div className="text-sm font-extrabold text-blue-600 mb-4">
                          {formatCurrency(p.price, store.currency as any, store.locale as any)}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span>{p.clicks} total klik</span>
                        <span className="font-mono text-[10px]">/{p.slug}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "regional" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-2xl">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Master Data Regional &amp; Saluran Chat SEA
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Sesuaikan mata uang default, bahasa antarmuka, serta akun chat favorit tiap negara agar pembeli lokal merasa akrab.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Country & Currency Presets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Mata Uang Transaksi
                  </label>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {Object.values(SEA_COUNTRY_PROFILES).map((country) => (
                      <option key={country.code} value={country.currency}>
                        {country.flag} {country.currency} — {country.name} ({country.currencySymbol})
                      </option>
                    ))}
                    <option value="USD">🇺🇸 USD — United States Dollar ($)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Bahasa Antarmuka Toko
                  </label>
                  <select
                    value={selectedLocale}
                    onChange={(e) => setSelectedLocale(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="id">🇮🇩 Bahasa Indonesia (ID)</option>
                    <option value="en">🌐 English (SG/PH/Global)</option>
                    <option value="ms">🇲🇾 Bahasa Melayu (MY)</option>
                    <option value="th">🇹🇭 ภาษาไทย (TH)</option>
                    <option value="vi">🇻🇳 Tiếng Việt (VI)</option>
                  </select>
                </div>
              </div>

              {/* Multi-Channel Chat Accounts */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Akun Saluran Chat Aktif (Multi-Channel SEA)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddChannelRow}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Saluran Lain</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {channels.map((ch, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <select
                        value={ch.channel}
                        onChange={(e) => {
                          const updated = [...channels];
                          updated[idx].channel = e.target.value;
                          setChannels(updated);
                        }}
                        className="w-44 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {Object.values(CHAT_CHANNELS_REGISTRY).map((cfg) => (
                          <option key={cfg.id} value={cfg.id}>
                            {cfg.name}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        value={ch.handle}
                        onChange={(e) => {
                          const updated = [...channels];
                          updated[idx].handle = e.target.value;
                          setChannels(updated);
                        }}
                        placeholder={
                          CHAT_CHANNELS_REGISTRY[ch.channel]?.placeholder || "Handle/Nomor"
                        }
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {channels.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveChannelRow(idx)}
                          className="p-2 text-slate-400 hover:text-rose-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Saluran pertama akan menjadi saluran utama. Jika menambahkan lebih dari 1 saluran, pembeli dapat memilih aplikasi chat favorit mereka.
                </p>
              </div>

              <button
                type="submit"
                disabled={savingSettings}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition shadow-sm disabled:opacity-50"
              >
                {savingSettings ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>Simpan Pengaturan Regional</span>
              </button>
            </form>
          </div>
        )}

        {activeTab === "finance" && (
          <div className="space-y-8 w-full">
            {/* Kartu 1: Penanggung Biaya Transaksi QRIS */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Penanggung Biaya Transaksi QRIS
                  </h2>
                  <p className="text-xs text-slate-500">
                    Tentukan apakah biaya platform checkout QRIS ditanggung oleh pembeli atau dipotong dari keuntungan toko.
                  </p>
                </div>
              </div>

              {/* Status Tarif Saat Ini */}
              <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>
                  Tarif QRIS Paket Anda:{" "}
                  <strong className="text-slate-900 font-bold">
                    {store.tier === "FREE" ? "4,5% (min. transaksi Rp 15.000)" : "2,0% (min. transaksi Rp 25.000)"}
                  </strong>
                </span>
                {store.tier === "FREE" && (
                  <Link
                    href="/harga"
                    className="text-xs font-bold text-[#D94E28] hover:underline"
                  >
                    Upgrade ke Pro (Tarif 2%) &rarr;
                  </Link>
                )}
              </div>

              <div className="mt-5 space-y-3">
                {/* Opsi 1: CUSTOMER (Default / Recommended) */}
                <label
                  onClick={() => setFeeBorneBy("CUSTOMER")}
                  className={`block p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition ${
                    feeBorneBy === "CUSTOMER"
                      ? "border-blue-600 bg-blue-50/40 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="feeBorneBy"
                      value="CUSTOMER"
                      checked={feeBorneBy === "CUSTOMER"}
                      onChange={() => setFeeBorneBy("CUSTOMER")}
                      className="mt-1 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 text-sm">
                          Ditanggung Pembeli (Convenience Fee)
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Direkomendasikan &bull; Margin 100% Utuh
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Biaya platform ditambahkan ke total belanja pembeli saat checkout (misal: barang Rp 50.000 + 2% = Rp 51.000). Hasil penjualan yang masuk ke saldo Anda utuh 100% tanpa potongan.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Opsi 2: MERCHANT */}
                <label
                  onClick={() => setFeeBorneBy("MERCHANT")}
                  className={`block p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition ${
                    feeBorneBy === "MERCHANT"
                      ? "border-blue-600 bg-blue-50/40 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="feeBorneBy"
                      value="MERCHANT"
                      checked={feeBorneBy === "MERCHANT"}
                      onChange={() => setFeeBorneBy("MERCHANT")}
                      className="mt-1 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 text-sm">
                          Ditanggung Penjual (Merchant Absorbed)
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          Harga Pas di Pembeli
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Pembeli membayar persis seharga barang (misal: Rp 50.000). Biaya platform dipotong langsung dari saldo penjualan yang Anda terima (misal bersih: Rp 49.000).
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveFeeBearer}
                  disabled={savingFeeBearer}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs disabled:opacity-50"
                >
                  {savingFeeBearer ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>Simpan Pengaturan Biaya</span>
                </button>
              </div>
            </div>

            {/* Kartu 2: Saldo Dompet & Penarikan Saldo (Disbursement) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Dompet &amp; Penarikan Saldo (Payout)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Cairkan hasil penjualan toko ke rekening bank atau e-wallet mana saja di Indonesia.
                  </p>
                </div>
              </div>

              {/* Saldo Siap Tarik */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-300 font-medium">Saldo Dompet Tersedia</span>
                  <div className="text-3xl font-extrabold text-white mt-0.5 font-mono">
                    {formatCurrency(walletBalance, "IDR", "id")}
                  </div>
                </div>

                <div className="text-xs sm:text-right text-slate-300 space-y-1">
                  <div>Min. Penarikan: <strong>Rp 50.000</strong></div>
                  <div>Status: <span className="text-emerald-400 font-semibold">&bull; Siap Dicairkan</span></div>
                </div>
              </div>

              {/* Kuota Penarikan Bulanan Guardrail */}
              <div className="mt-5 p-4 rounded-2xl border text-xs leading-relaxed space-y-2 bg-slate-50 border-slate-200">
                {store.tier === "PRO" || store.tier === "DFY_BUSINESS" ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        Kuota Gratis Penarikan Pro Bulan Ini
                      </span>
                      <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full text-[11px]">
                        Sisa {Math.max(0, 4 - withdrawalCount)} dari 4x Gratis
                      </span>
                    </div>
                    <p className="text-slate-600">
                      Sebagai pelanggan Pro, Anda mendapatkan <strong>4x penarikan gratis</strong> setiap bulan kalender. Setelah kuota gratis habis, penarikan berikutnya dikenakan tarif bank modal flat sebesar <strong>Rp 2.500</strong> per penarikan.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        Biaya Penarikan Saldo Paket Gratis
                      </span>
                      <span className="font-bold text-slate-700 bg-stone-200 px-2.5 py-0.5 rounded-full text-[11px]">
                        Rp 5.000 / Penarikan
                      </span>
                    </div>
                    <p className="text-slate-600">
                      Biaya penarikan paket Gratis adalah Rp 5.000 per transaksi (min. tarik Rp 50.000).{" "}
                      <Link href="/harga" className="text-[#D94E28] font-semibold hover:underline">
                        Upgrade ke Pro untuk Gratis 4x penarikan/bulan (hemat Rp 20.000) &rarr;
                      </Link>
                    </p>
                  </>
                )}
              </div>

              {/* Form Permintaan Penarikan */}
              <form onSubmit={handleRequestWithdrawal} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nominal Penarikan (Rp)
                  </label>
                  <input
                    type="number"
                    min="50000"
                    step="1000"
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Contoh: 100000 (Min. 50.000)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Rekening / E-Wallet Tujuan
                  </label>
                  <input
                    type="text"
                    required
                    value={withdrawDestination}
                    onChange={(e) => setWithdrawDestination(e.target.value)}
                    placeholder="BCA 1234567890 a.n Budi Santoso / GoPay 08123456789"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Pastikan nama pemilik rekening sesuai untuk kelancaran pencairan dana otomatis BorderPay.
                  </p>
                </div>

                {/* Ringkasan Estimasi Biaya */}
                {parseFloat(withdrawAmount) >= 50000 && (
                  <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 space-y-1">
                    <div className="flex justify-between">
                      <span>Nominal ditarik:</span>
                      <span className="font-semibold">{formatCurrency(parseFloat(withdrawAmount), "IDR", "id")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Biaya transfer bank:</span>
                      <span className="font-semibold text-emerald-600">
                        {store.tier === "PRO" || store.tier === "DFY_BUSINESS"
                          ? withdrawalCount < 4
                            ? "Rp 0 (Kuota Gratis Pro)"
                            : "Rp 2.500"
                          : "Rp 5.000"}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-blue-200/50 font-bold text-slate-900">
                      <span>Estimasi dana masuk:</span>
                      <span className="text-blue-700">
                        {formatCurrency(
                          Math.max(
                            0,
                            parseFloat(withdrawAmount) -
                              (store.tier === "PRO" || store.tier === "DFY_BUSINESS"
                                ? withdrawalCount < 4
                                  ? 0
                                  : 2500
                                : 5000)
                          ),
                          "IDR",
                          "id"
                        )}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submittingWithdrawal || (store.tier !== "FREE" && walletBalance < 50000)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white text-xs font-bold py-3 rounded-xl transition shadow-sm disabled:opacity-50"
                >
                  {submittingWithdrawal ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ArrowDownToLine className="w-4 h-4" />
                  )}
                  <span>Ajukan Penarikan Saldo</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Tambah Produk Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Tambah Produk Baru</h3>
                <p className="text-xs text-slate-500">Pilih 1 atau lebih mode jualan yang Anda inginkan.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Nama Produk / Penawaran
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Misal: Preset Lightroom, Kaos Polos, Booking Konsultasi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Harga ({store.currency})
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="50000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              {/* 3 Modes Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Mode Transaksi Utama
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: "DIRECT_CHECKOUT", label: "QRIS / PayPal", icon: Zap },
                    { id: "EXTERNAL_LINK", label: "Marketplace", icon: ShoppingBag },
                    { id: "CHAT_ORDER", label: "Order Chat", icon: MessageCircle },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setCheckoutMode(m.id as CheckoutMode)}
                        className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition ${
                          checkoutMode === m.id
                            ? "border-blue-600 bg-blue-50/50 text-blue-700 ring-2 ring-blue-500/20"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className="w-4 h-4 text-blue-600 mb-1" />
                        <span className="text-xs font-bold leading-tight">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Field for EXTERNAL_LINK */}
              {checkoutMode === "EXTERNAL_LINK" && (
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                      Preset Platform Marketplace
                    </label>
                    <select
                      value={externalPlatform}
                      onChange={(e) => setExternalPlatform(e.target.value as ExternalPlatform)}
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 text-xs font-semibold focus:outline-none bg-white text-slate-800"
                    >
                      {Object.entries(MARKETPLACE_PRESETS).map(([key, val]) => (
                        <option key={key} value={key}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                      Link URL Produk (Shopee / TikTok Shop / Lazada)
                    </label>
                    <input
                      type="url"
                      required
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      placeholder="https://vt.tiktok.com/... atau https://shopee.co.id/..."
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* Dynamic Field for CHAT_ORDER */}
              {checkoutMode === "CHAT_ORDER" && (
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                        Aplikasi Chat
                      </label>
                      <select
                        value={chatChannel}
                        onChange={(e) => setChatChannel(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-emerald-200 text-xs font-semibold focus:outline-none bg-white text-slate-800"
                      >
                        {Object.values(CHAT_CHANNELS_REGISTRY).map((cfg) => (
                          <option key={cfg.id} value={cfg.id}>
                            {cfg.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                        Handle / Nomor Chat
                      </label>
                      <input
                        type="text"
                        required
                        value={chatHandle}
                        onChange={(e) => setChatHandle(e.target.value)}
                        placeholder="628... / @line / id"
                        className="w-full px-3 py-2 rounded-xl border border-emerald-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                      Draf Pesan Otomatis (Opsional)
                    </label>
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Halo, saya ingin memesan produk ini..."
                      className="w-full px-3 py-2 rounded-xl border border-emerald-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* Multi-Mode Toggle: Allow Chat Fallback for Direct Checkout or Marketplace */}
              {checkoutMode !== "CHAT_ORDER" && (
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={enableSecondaryChat}
                      onChange={(e) => setEnableSecondaryChat(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span>Aktifkan Opsi Chat Tambahan (&ldquo;Tanya via WhatsApp/Chat&rdquo;)</span>
                  </label>
                  <p className="text-[11px] text-slate-400 mt-1 ml-6">
                    Menampilkan tombol kedua agar pembeli yang ragu bisa berkonsultasi via chat terlebih dahulu sebelum membayar.
                  </p>
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-sm disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Simpan Produk</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
