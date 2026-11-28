"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Zap, QrCode, CheckCircle2, Loader2, MessageSquare, AlertCircle, CreditCard } from "lucide-react";
import {
  actionSubmitOrder,
  actionCaptureCustomerPaypalOrder,
  actionCheckCustomerOrderStatus,
} from "./actions";
import { formatCurrency } from "@/lib/core/formatters";
import { PAYMENT_RULES } from "@/lib/constants/pricing";
import { showServiceResultToast, showToast } from "@/components/ui/GlobalToast";
import { QrCodeImage } from "@/components/ui/QrCodeImage";
import {
  trackGtmViewItem,
  trackGtmBeginCheckout,
  trackGtmGenerateLead,
  trackGtmPurchase,
} from "@/lib/analytics/gtm";

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
    stock?: number | null;
    isPreOrder?: boolean;
    poNote?: string | null;
    variants?: Array<{ name: string; price: number }> | null;
  };
  paypalStatus?: string;
  paypalToken?: string;
  paypalOrderCode?: string;
}

export function CheckoutClient({
  store,
  product,
  paypalStatus,
  paypalToken,
  paypalOrderCode,
}: CheckoutClientProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [buyerWhatsapp, setBuyerWhatsapp] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [buyerNote, setBuyerNote] = useState("");
  const [paymentProvider, setPaymentProvider] = useState<"BORDERPAY_QRIS" | "PAYPAL">("BORDERPAY_QRIS");
  const [loading, setLoading] = useState(false);
  const [paypalCapturing, setPaypalCapturing] = useState(false);
  const [paidOrderCode, setPaidOrderCode] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<{
    orderCode: string;
    paymentUrl?: string;
    qrString?: string;
    amount: number;
    paymentProvider: "BORDERPAY_QRIS" | "PAYPAL";
  } | null>(null);

  useEffect(() => {
    trackGtmViewItem({
      currency: store.currency,
      value: Number(product.price),
      item: {
        item_id: product.id,
        item_name: product.title,
        item_category: product.productType,
        price: Number(product.price),
      },
    });
  }, [store.currency, product.id, product.title, product.productType, product.price]);

  useEffect(() => {
    if (paypalStatus === "success" && paypalToken && paypalOrderCode) {
      setPaypalCapturing(true);
      actionCaptureCustomerPaypalOrder({
        orderCode: paypalOrderCode,
        paypalOrderId: paypalToken,
      }).then((res) => {
        setPaypalCapturing(false);
        showServiceResultToast(res);
        if (res.success && res.data) {
          setPaidOrderCode(paypalOrderCode);
          trackGtmPurchase({
            transactionId: paypalOrderCode,
            currency: res.data.currency || store.currency,
            value: Number(res.data.amount || product.price),
            paymentType: res.data.paymentProvider || "PAYPAL",
            affiliation: store.slug,
            items: [
              {
                item_id: product.id,
                item_name: product.title,
                item_category: product.productType,
                price: Number(product.price),
              },
            ],
          });
        }
      });
    } else if (!paypalStatus && paypalOrderCode) {
      // Returning from external Borderpay hosted pay_url
      actionCheckCustomerOrderStatus(paypalOrderCode).then((res) => {
        if (
          res.success &&
          (res.data?.status === "PAID" || res.data?.status === "COMPLETED")
        ) {
          setPaidOrderCode(paypalOrderCode);
          trackGtmPurchase({
            transactionId: paypalOrderCode,
            currency: res.data.currency || store.currency,
            value: Number(res.data.amount || product.price),
            paymentType: res.data.paymentProvider || "BORDERPAY_QRIS",
            affiliation: store.slug,
            items: [
              {
                item_id: product.id,
                item_name: product.title,
                item_category: product.productType,
                price: Number(product.price),
              },
            ],
          });
        }
      });
    }
  }, [paypalStatus, paypalToken, paypalOrderCode, store.currency, store.slug, product.id, product.title, product.productType, product.price]);

  // Real-time 4-second polling while awaiting Borderpay QRIS settlement
  useEffect(() => {
    if (
      !orderResult?.orderCode ||
      orderResult.paymentProvider !== "BORDERPAY_QRIS" ||
      paidOrderCode
    ) {
      return;
    }

    const interval = setInterval(async () => {
      const res = await actionCheckCustomerOrderStatus(orderResult.orderCode);
      if (
        res.success &&
        (res.data?.status === "PAID" || res.data?.status === "COMPLETED")
      ) {
        setPaidOrderCode(orderResult.orderCode);
        trackGtmPurchase({
          transactionId: orderResult.orderCode,
          currency: res.data.currency || store.currency,
          value: Number(res.data.amount || orderResult.amount),
          paymentType: res.data.paymentProvider || "BORDERPAY_QRIS",
          affiliation: store.slug,
          items: [
            {
              item_id: product.id,
              item_name: product.title,
              item_category: product.productType,
              price: Number(product.price),
            },
          ],
        });
        showToast("Pembayaran QRIS terverifikasi! Pesanan Anda diproses.", "success");
        clearInterval(interval);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [orderResult?.orderCode, orderResult?.paymentProvider, orderResult?.amount, paidOrderCode, store.currency, store.slug, product.id, product.title, product.productType, product.price]);

  const tierKey = store.tier === "PRO" ? "PRO" : store.tier === "DFY_BUSINESS" ? "DFY" : "FREE";
  const rules = PAYMENT_RULES[tierKey];
  const isPhysical = product.productType === "PHYSICAL";
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const activeVariant = hasVariants ? product.variants![selectedVariantIdx] || product.variants![0] : null;
  const unitPrice = activeVariant ? Number(activeVariant.price) : Number(product.price);
  const subtotalPrice = unitPrice * Math.max(1, quantity);

  const isBelowMinQris = subtotalPrice < rules.minQrisAmountIdr;

  const isCustomerBorne = store.feeBorneBy === "CUSTOMER";
  const convenienceFee = isCustomerBorne
    ? Math.ceil((subtotalPrice * rules.directCheckoutFeePercent) / 100)
    : 0;
  const totalAmountToPay = subtotalPrice + convenienceFee;

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
      trackGtmBeginCheckout({
        currency: store.currency,
        value: Number(data.order.amount || totalAmountToPay),
        paymentType: paymentProvider,
        transactionId: data.order.orderCode,
        items: [
          {
            item_id: product.id,
            item_name: product.title,
            item_category: product.productType,
            price: Number(product.price),
          },
        ],
      });
      if (paymentProvider === "PAYPAL" && data.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }
      setOrderResult({
        orderCode: data.order.orderCode,
        paymentUrl: data.paymentUrl,
        qrString: data.qrString,
        amount: data.order.amount,
        paymentProvider,
      });
    }
  };

  if (paypalCapturing) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <h2 className="text-base font-bold text-slate-900">Memverifikasi Pembayaran PayPal...</h2>
        <p className="text-xs text-slate-500">Mohon tunggu sebentar sambil mengonfirmasi pembayaran Anda.</p>
      </div>
    );
  }

  if (paidOrderCode) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 font-sans">
        <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-lg text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Pembayaran Berhasil!</h1>
          <p className="text-xs text-slate-600">
            Pesanan <strong className="font-mono">{paidOrderCode}</strong> telah terkonfirmasi. Akses dan detail pesanan telah diproses oleh toko {store.name}.
          </p>
          {product.productType === "COURSE" && (
            <Link
              href={`/${store.slug}/learn/${product.slug}?order=${encodeURIComponent(paidOrderCode || "")}`}
              className="inline-block w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
            >
              Buka Member Area Kursus
            </Link>
          )}
          <Link
            href={`/${store.slug}`}
            className="inline-block w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition"
          >
            Kembali ke {store.name}
          </Link>
        </div>
      </div>
    );
  }

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

            {/* QRIS Dynamic Code or PayPal Session */}
            {orderResult.paymentProvider === "PAYPAL" ? (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-xs mx-auto mb-6 space-y-3">
                <CreditCard className="w-8 h-8 text-blue-600 mx-auto" />
                <div className="text-xs font-bold text-blue-950">Sesi Pembayaran PayPal Siap</div>
                {orderResult.paymentUrl ? (
                  <a
                    href={orderResult.paymentUrl}
                    className="inline-block w-full bg-[#0070BA] hover:bg-[#003087] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition"
                  >
                    Lanjutkan ke PayPal Checkout
                  </a>
                ) : null}
              </div>
            ) : (
              <div className="bg-slate-900 text-white rounded-2xl p-6 max-w-xs mx-auto mb-6 shadow-md">
                <div className="text-xs font-bold tracking-widest text-slate-400 mb-3">
                  QRIS &bull; BORDERPAY
                </div>
                {orderResult.qrString && !orderResult.qrString.startsWith("SANDBOX_QRIS_SIMULATOR_") ? (
                  <div className="w-48 h-48 bg-white rounded-xl p-2 mx-auto flex items-center justify-center overflow-hidden">
                    <QrCodeImage
                      value={orderResult.qrString}
                      alt={`QRIS ${orderResult.orderCode}`}
                      size={320}
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-amber-50 text-amber-900 rounded-xl p-4 mx-auto flex flex-col items-center justify-center gap-2 border border-amber-200">
                    <QrCode className="w-9 h-9 text-amber-600" />
                    <span className="text-[11px] font-bold">
                      {orderResult.qrString?.startsWith("SANDBOX_QRIS_SIMULATOR_")
                        ? "Sandbox QRIS Simulator"
                        : "QRIS Tidak Tersedia"}
                    </span>
                    <span className="text-[10px] leading-snug text-amber-700">
                      {orderResult.paymentUrl
                        ? "Gunakan tombol Link Pembayaran Eksternal di bawah untuk melanjutkan."
                        : "Silakan muat ulang tagihan atau hubungi penjual via WhatsApp."}
                    </span>
                  </div>
                )}
                <p className="text-[10px] text-slate-400 mt-3">
                  Scan via BCA, Mandiri, GoPay, OVO, Dana, ShopeePay, atau Bank ASEAN (PromptPay / DuitNow).
                </p>
              </div>
            )}

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
                {product.isPreOrder && (
                  <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    {product.poNote ? `PO • ${product.poNote}` : "Pre-Order (PO)"}
                  </span>
                )}
                <p className="text-xs text-slate-500 mt-0.5">Dijual oleh {store.name}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-extrabold text-slate-900">
                  {formatCurrency(unitPrice, store.currency as any, store.locale as any)}
                </div>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {hasVariants && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Pilih Varian
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants!.map((v, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedVariantIdx(idx)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                          selectedVariantIdx === idx
                            ? "border-[#D94E28] bg-[#FDF0EC] text-[#D94E28]"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {v.name} • {formatCurrency(v.price, store.currency as any, store.locale as any)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isPhysical && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Jumlah Pesanan (Qty)
                    {product.stock && product.stock > 0 ? (
                      <span className="ml-1.5 font-normal normal-case text-slate-500">
                        (Sisa stok: {product.stock})
                      </span>
                    ) : null}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={product.stock && product.stock > 0 ? product.stock : 99}
                    value={quantity}
                    onChange={(e) => {
                      const maxQty = product.stock && product.stock > 0 ? product.stock : 99;
                      setQuantity(Math.min(maxQty, Math.max(1, Number(e.target.value) || 1)));
                    }}
                    className="w-28 px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
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
                  {isPhysical
                    ? "Nomor WhatsApp (Untuk Konfirmasi & Pengiriman)"
                    : "Nomor WhatsApp (Untuk Struk & Akses Produk)"}
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
                  {isPhysical
                    ? "Detail pesanan & jadwal pengiriman akan dikonfirmasi melalui WhatsApp ini."
                    : "Link file atau detail pesanan akan otomatis dikirimkan ke nomor ini."}
                </span>
              </div>

              {isPhysical && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Alamat Pengiriman Lengkap
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Jalan, Nomor Rumah, Kecamatan, Kota, Kode Pos"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Catatan / Kartu Ucapan (Opsional)
                    </label>
                    <input
                      type="text"
                      value={buyerNote}
                      onChange={(e) => setBuyerNote(e.target.value)}
                      placeholder="Misal: Ucapan Selamat Natal dari Keluarga Budi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

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
                  <span>
                    {activeVariant
                      ? `${activeVariant.name} × ${quantity}`
                      : isPhysical
                      ? `Harga Produk (× ${quantity})`
                      : "Harga Produk"}
                  </span>
                  <span>{formatCurrency(subtotalPrice, store.currency as any, store.locale as any)}</span>
                </div>
                {isCustomerBorne ? (
                  <div className="flex justify-between text-slate-600">
                    <span>
                      {paymentProvider === "PAYPAL" ? "Biaya Layanan PayPal" : "Biaya layanan checkout otomatis"} ({rules.directCheckoutFeePercent}%)
                    </span>
                    <span>+{formatCurrency(convenienceFee, store.currency as any, store.locale as any)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>{paymentProvider === "PAYPAL" ? "Biaya Layanan PayPal" : "Biaya layanan checkout otomatis"}</span>
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
                    href={`https://wa.me/${store.chatHandle || "6281234567890"}?text=${encodeURIComponent(
                      `Halo ${store.name}, saya pesan ${product.title}${
                        activeVariant ? ` — ${activeVariant.name}` : ""
                      } × ${quantity}${
                        product.isPreOrder && product.poNote ? ` (${product.poNote})` : ""
                      }\n• Total: ${formatCurrency(subtotalPrice, store.currency as any, store.locale as any)}${
                        buyerName ? `\n• Nama: ${buyerName}` : ""
                      }${shippingAddress ? `\n• Alamat: ${shippingAddress}` : ""}${
                        buyerNote ? `\n• Catatan: ${buyerNote}` : ""
                      }`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackGtmGenerateLead({
                        currency: store.currency,
                        value: Number(product.price),
                        leadSource: "checkout_whatsapp_fallback",
                        storeSlug: store.slug,
                        itemName: product.title,
                      })
                    }
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

              {!(isBelowMinQris && paymentProvider === "BORDERPAY_QRIS") && (
                <button
                  type="button"
                  onClick={() => {
                    if (formRef.current && !formRef.current.reportValidity()) {
                      return;
                    }
                    const waUrl = `https://wa.me/${store.chatHandle || "6281234567890"}?text=${encodeURIComponent(
                      `Halo ${store.name}, saya pesan ${product.title}${
                        activeVariant ? ` — ${activeVariant.name}` : ""
                      } × ${quantity}${
                        product.isPreOrder && product.poNote ? ` (${product.poNote})` : ""
                      }\n• Total: ${formatCurrency(subtotalPrice, store.currency as any, store.locale as any)}${
                        buyerName ? `\n• Nama: ${buyerName}` : ""
                      }${buyerWhatsapp ? `\n• No. WA: ${buyerWhatsapp}` : ""}${
                        shippingAddress ? `\n• Alamat: ${shippingAddress}` : ""
                      }${buyerNote ? `\n• Catatan: ${buyerNote}` : ""}`
                    )}`;
                    trackGtmGenerateLead({
                      currency: store.currency,
                      value: subtotalPrice,
                      leadSource: "checkout_whatsapp_direct",
                      storeSlug: store.slug,
                      itemName: product.title,
                    });
                    window.open(waUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim Pesanan via WhatsApp (0% Komisi)</span>
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
