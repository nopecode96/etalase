"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Zap, QrCode, CheckCircle2, Loader2, MessageSquare, AlertCircle } from "lucide-react";
import { actionSubmitOrder } from "./actions";
import { formatCurrency } from "@/lib/core/formatters";
import { PAYMENT_RULES } from "@/lib/constants/pricing";
import { showServiceResultToast } from "@/components/ui/GlobalToast";

interface CheckoutClientProps {
  store: {
    slug: string;
    name: string;
    currency: string;
    locale: string;
    tier?: string;
    feeBorneBy?: "CUSTOMER" | "MERCHANT";
    chatHandle?: string | null;
  };
  product: {
    id: string;
    slug: string;
    title: string;
    description?: string | null;
    price: number;
    compareAtPrice?: number | null;
    images?: string[];
    productType: string;
  };
}

export function CheckoutClient({ store, product }: CheckoutClientProps) {
  const [buyerName, setBuyerName] = useState("");
  const [buyerWhatsapp, setBuyerWhatsapp] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [paymentProvider, setPaymentProvider] = useState<"BORDERPAY_QRIS" | "PAYPAL">("BORDERPAY_QRIS");
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<{
    orderCode: string;
    paymentUrl?: string;
    qrString?: string;
    amount: number;
  } | null>(null);

  const tierKey = store.tier === "PRO" ? "PRO" : store.tier === "DFY_BUSINESS" ? "DFY" : "FREE";
  const rules = PAYMENT_RULES[tierKey];
  const isBelowMinQris = product.price < rules.minQrisAmountIdr;

  const isCustomerBorne = store.feeBorneBy !== "MERCHANT";
  const convenienceFee = isCustomerBorne
    ? Math.ceil((product.price * rules.directCheckoutFeePercent) / 100)
    : 0;
  const totalAmountToPay = product.price + convenienceFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerWhatsapp) return;

    setLoading(true);
    const res = await actionSubmitOrder({
      storeSlug: store.slug,
      productSlug: product.slug,
      buyerName,
      buyerWhatsapp,
      buyerEmail,
      paymentProvider,
    });

    setLoading(false);
    showServiceResultToast(res);

    if (res.success && res.data) {
      const data = res.data as any;
      setOrderResult({
        orderCode: data.order.orderCode,
        paymentUrl: data.paymentUrl,
        qrString: data.qrString,
        amount: data.order.amount,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 font-sans">
      <div className="max-w-xl w-full mx-auto">
        <Link
          href={`/${store.slug}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 mb-6 font-semibold transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke {store.name}</span>
        </Link>

        {orderResult ? (
          /* Payment Step: Display QRIS or Invoice */
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-6 h-6" />
            </div>

            <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 mb-2">
              Menunggu Pembayaran
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {formatCurrency(orderResult.amount, store.currency as any, store.locale as any)}
            </h2>
            <p className="text-xs text-slate-500 font-mono mb-6">
              Kode Pesanan: {orderResult.orderCode}
            </p>

            {/* QRIS Graphic Mockup */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 max-w-xs mx-auto mb-6 shadow-md">
              <div className="text-xs font-bold tracking-widest text-slate-400 mb-3">
                QRIS &bull; BORDERPAY
              </div>
              <div className="w-44 h-44 bg-white rounded-xl p-2 mx-auto flex flex-col items-center justify-center">
                {/* Visual QR representation */}
                <div className="grid grid-cols-6 gap-1 w-36 h-36 p-1 border-2 border-slate-900">
                  <div className="bg-slate-900 col-span-2 row-span-2"></div>
                  <div className="bg-slate-300"></div>
                  <div className="bg-slate-900 col-span-2 row-span-2"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-slate-900 col-span-2 row-span-2"></div>
                  <div className="bg-slate-400"></div>
                  <div className="bg-slate-900 col-span-2"></div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-3">
                Scan via BCA, Mandiri, GoPay, OVO, Dana, ShopeePay, atau Bank ASEAN (PromptPay / DuitNow).
              </p>
            </div>

            {/* Instructions */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 text-left mb-6 flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>WA-First Instant Delivery:</strong> Begitu pembayaran diverifikasi, struk lunas dan akses produk akan langsung dikirimkan ke WhatsApp Anda di <strong>{buyerWhatsapp}</strong>.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {orderResult.paymentUrl && (
                <a
                  href={orderResult.paymentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl text-xs transition"
                >
                  Buka Link Pembayaran Eksternal
                </a>
              )}
              <Link
                href={`/${store.slug}`}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition"
              >
                Selesai / Kembali
              </Link>
            </div>
          </div>
        ) : (
          /* Order Form Step */
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            {/* Product Summary */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {product.productType}
                </span>
                <h1 className="text-xl font-bold text-slate-900 mt-1">
                  {product.title}
                </h1>
                <p className="text-xs text-slate-500">Dijual oleh {store.name}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-extrabold text-slate-900">
                  {formatCurrency(product.price, store.currency as any, store.locale as any)}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Nomor WhatsApp (Untuk Struk &amp; Akses Produk)
                </label>
                <input
                  type="tel"
                  required
                  value={buyerWhatsapp}
                  onChange={(e) => setBuyerWhatsapp(e.target.value)}
                  placeholder="Misal: 08123456789 atau 628123456789"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Link file atau detail pesanan akan otomatis dikirimkan ke nomor ini.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email (Opsional)
                </label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="email@anda.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Metode Pembayaran
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentProvider("BORDERPAY_QRIS")}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                      paymentProvider === "BORDERPAY_QRIS"
                        ? "border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-500/20"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">Borderpay QRIS</div>
                      <div className="text-[10px] text-slate-500">ID &amp; ASEAN Cross-Border</div>
                    </div>
                    <Zap className="w-4 h-4 text-blue-600" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentProvider("PAYPAL")}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                      paymentProvider === "PAYPAL"
                        ? "border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-500/20"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">PayPal</div>
                      <div className="text-[10px] text-slate-500">Credit Card / Global</div>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Rincian Transaksi & Convenience Fee */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Harga Produk</span>
                  <span>{formatCurrency(product.price, store.currency as any, store.locale as any)}</span>
                </div>
                {isCustomerBorne ? (
                  <div className="flex justify-between text-slate-600">
                    <span>Biaya Layanan QRIS ({rules.directCheckoutFeePercent}%)</span>
                    <span>+{formatCurrency(convenienceFee, store.currency as any, store.locale as any)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Biaya Layanan QRIS</span>
                    <span>Ditanggung Penjual (Gratis)</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Tagihan</span>
                  <span className="text-blue-600">
                    {formatCurrency(totalAmountToPay, store.currency as any, store.locale as any)}
                  </span>
                </div>
              </div>

              {/* Pagar Pengaman Margin: Batas Minimal QRIS */}
              {isBelowMinQris && paymentProvider === "BORDERPAY_QRIS" ? (
                <div className="space-y-3 pt-2">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-amber-800">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Batas Minimal QRIS ({formatCurrency(rules.minQrisAmountIdr, "IDR", "id")})</span>
                    </div>
                    <p className="leading-relaxed text-[11px] text-amber-700">
                      Nominal produk ini di bawah batas minimal pembayaran QRIS otomatis. Silakan pesan langsung melalui WhatsApp penjual tanpa biaya tambahan (0% komisi).
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${store.chatHandle || "6281234567890"}?text=Halo%20${encodeURIComponent(store.name)},%20saya%20tertarik%20membeli%20${encodeURIComponent(product.title)}%20seharga%20${encodeURIComponent(formatCurrency(product.price, store.currency as any, store.locale as any))}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Pesan via WhatsApp (0% Komisi)</span>
                  </a>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition shadow-lg shadow-blue-500/20 mt-6"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memproses Invoice...</span>
                    </>
                  ) : (
                    <>
                      <span>Bayar Sekarang &bull; {formatCurrency(totalAmountToPay, store.currency as any, store.locale as any)}</span>
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
