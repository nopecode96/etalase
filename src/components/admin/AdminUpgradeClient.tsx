"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  QrCode,
  Building2,
  Copy,
  Check,
  UploadCloud,
  Loader2,
  Zap,
  Star,
  ExternalLink,
  ChevronRight,
  Headphones,
  Check as CheckIcon,
} from "lucide-react";
import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";
import { showToast } from "@/components/ui/GlobalToast";
import {
  actionCreatePlanOrder,
  actionSubmitPaymentProof,
} from "@/app/admin/billing/upgrade/actions";

interface AdminUpgradeClientProps {
  store: any;
  user: any;
  currentTier: "FREE" | "PRO" | "DFY";
  initialPlan?: string;
  initialCycle?: string;
  returnTo?: string;
  existingOrder?: any;
}

export function AdminUpgradeClient({
  store,
  user,
  currentTier,
  initialPlan = "pro",
  initialCycle = "yearly",
  returnTo = "/admin",
  existingOrder = null,
}: AdminUpgradeClientProps) {
  // Plan selection
  const [selectedPlan, setSelectedPlan] = useState<"PRO" | "DFY">(
    initialPlan.toLowerCase() === "dfy" ? "DFY" : "PRO"
  );
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">(
    initialCycle.toLowerCase() === "monthly" ? "MONTHLY" : "YEARLY"
  );

  // Active Order / Checkout State
  const [activeOrder, setActiveOrder] = useState<any | null>(existingOrder);
  const [proofUrl, setProofUrl] = useState<string>(existingOrder?.proofUrl || "");
  const [notes, setNotes] = useState<string>(existingOrder?.notes || "");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [isCreatingOrder, startCreateTransition] = useTransition();
  const [isSubmittingProof, startProofTransition] = useTransition();

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    showToast("Copied to clipboard!", "success");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const calculateAmount = () => {
    if (selectedPlan === "DFY") return 899000;
    return billingCycle === "YEARLY" ? 468000 : 49000;
  };

  const handleSelectPlanAndProceed = () => {
    startCreateTransition(async () => {
      const res = await actionCreatePlanOrder({
        planCode: selectedPlan,
        billingCycle: selectedPlan === "DFY" ? "ONE_TIME" : billingCycle,
      });

      if (res.success && res.data) {
        setActiveOrder(res.data);
        showToast("Invoice generated! Please complete payment below.", "success");
      } else {
        const errorMsg = !res.success ? res.error : "Failed to generate invoice";
        showToast(errorMsg, "error");
      }
    });
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder?.id) return;
    if (!proofUrl) {
      showToast("Please upload your payment receipt screenshot first.", "error");
      return;
    }

    startProofTransition(async () => {
      const res = await actionSubmitPaymentProof({
        orderId: activeOrder.id,
        proofUrl,
        notes,
      });

      if (res.success && res.data) {
        setActiveOrder(res.data);
        showToast("Payment confirmation submitted! Under review by Mabes.", "success");
      } else {
        const errorMsg = !res.success ? res.error : "Failed to submit payment confirmation";
        showToast(errorMsg, "error");
      }
    });
  };

  // 1. UNDER REVIEW STATE (Customer has already paid and submitted receipt)
  if (activeOrder && activeOrder.status === "UNDER_REVIEW") {
    return (
      <div className="w-full space-y-8 animate-in fade-in duration-300">
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
          <Link
            href={returnTo}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">{store.name} ({store.slug}.etalase.online)</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
              Payment Under Review
            </span>
          </div>
        </div>

        {/* Status Hero Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E7E5E4] p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#1C1917]">
              Payment Confirmation Under Review
            </h1>
            <p className="text-sm text-[#57534E] max-w-lg mx-auto">
              Thank you! Your payment proof for invoice{" "}
              <strong className="text-stone-900 font-mono">{activeOrder.orderNumber}</strong>{" "}
              has been securely received and dispatched to our Mabes operations team.
            </p>
          </div>

          {/* Invoice Summary Box */}
          <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E7E5E4] text-left text-xs space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-[#E7E5E4]">
              <span className="text-[#78716C]">Plan</span>
              <span className="font-bold text-[#1C1917]">
                {activeOrder.planCode === "DFY" ? "Terima Beres (Done-For-You)" : `PRO Plan (${activeOrder.billingCycle})`}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#E7E5E4]">
              <span className="text-[#78716C]">Total Amount</span>
              <span className="font-bold text-base text-[#D94E28]">
                Rp {Number(activeOrder.amount).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#E7E5E4]">
              <span className="text-[#78716C]">Status</span>
              <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-[11px]">
                <Clock className="w-3 h-3" />
                Under Verification
              </span>
            </div>
            {activeOrder.proofUrl && (
              <div className="pt-2">
                <span className="text-[#78716C] block mb-2">Uploaded Receipt Preview:</span>
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-[#E7E5E4] bg-stone-100">
                  <Image
                    src={activeOrder.proofUrl}
                    alt="Payment receipt proof"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs flex items-center gap-3 text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Verifications usually take <strong>5–15 minutes</strong> during active business hours. Your store features (Custom Domain, 2% QRIS, Premium Themes) will activate automatically upon approval.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={returnTo}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold transition shadow-xs"
            >
              Back to Dashboard
            </Link>
            <button
              type="button"
              onClick={() => setActiveOrder(null)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#E7E5E4] bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 transition"
            >
              Submit Another Receipt or Change Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href={returnTo}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-xs text-[#78716C]">Billing & Subscription</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1C1917] flex items-center gap-2">
            <span>Upgrade Storefront Plan</span>
            <Sparkles className="w-5 h-5 text-[#D94E28]" />
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-bold text-[#1C1917]">{store.name}</div>
            <div className="text-[11px] text-[#78716C]">{store.slug}.etalase.online</div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700 border border-[#E7E5E4]">
            Current: {currentTier}
          </span>
        </div>
      </div>

      {/* Main Grid: Left Options / Right Invoice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Plan Selector Cards */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-[#1C1917]">
              1. Choose Your Upgrade Tier
            </h2>
            <p className="text-xs text-[#57534E]">
              Unlock premium template designs, 2% low QRIS transaction fee, custom domain mapping, and Meta/GA4 tracking.
            </p>
          </div>

          {/* Billing Cycle Switcher for PRO */}
          <div className="flex items-center gap-2 p-1 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl w-fit">
            <button
              type="button"
              onClick={() => {
                setSelectedPlan("PRO");
                setBillingCycle("YEARLY");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedPlan === "PRO" && billingCycle === "YEARLY"
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              <span>PRO Yearly (Save 20%)</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full uppercase">
                Best Value
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedPlan("PRO");
                setBillingCycle("MONTHLY");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedPlan === "PRO" && billingCycle === "MONTHLY"
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              PRO Monthly
            </button>
          </div>

          {/* Plan Cards Stack */}
          <div className="space-y-4">
            {/* Plan Card 1: PRO Yearly (Highlighted) */}
            <div
              onClick={() => {
                setSelectedPlan("PRO");
                setBillingCycle("YEARLY");
              }}
              className={`p-6 rounded-3xl border-2 transition cursor-pointer relative ${
                selectedPlan === "PRO" && billingCycle === "YEARLY"
                  ? "border-[#D94E28] bg-white shadow-md ring-2 ring-[#D94E28]/10"
                  : "border-[#E7E5E4] bg-white hover:border-stone-300"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FDF0EC] text-[#D94E28] uppercase mb-1">
                    <Star className="w-3 h-3 fill-[#D94E28]" />
                    Most Popular & Recommended
                  </div>
                  <h3 className="text-base font-bold text-[#1C1917]">PRO Plan — Annual Billing</h3>
                  <p className="text-xs text-[#57534E]">Full access to all Pro features with 20% discount.</p>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-xl font-extrabold text-[#D94E28]">Rp 39.000<span className="text-xs font-normal text-stone-500">/mo</span></div>
                  <div className="text-[11px] text-[#78716C]">Billed Rp 468.000 / year</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[#E7E5E4] text-xs text-[#1C1917]">
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All 4 Template Archetypes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom Branded Domain + SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Low 2% QRIS Fee (min. 25k)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Meta Pixel & GA4 Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>4x Free Withdrawals/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Remove etalase.online Badge</span>
                </div>
              </div>
            </div>

            {/* Plan Card 2: PRO Monthly */}
            <div
              onClick={() => {
                setSelectedPlan("PRO");
                setBillingCycle("MONTHLY");
              }}
              className={`p-6 rounded-3xl border-2 transition cursor-pointer ${
                selectedPlan === "PRO" && billingCycle === "MONTHLY"
                  ? "border-[#D94E28] bg-white shadow-md ring-2 ring-[#D94E28]/10"
                  : "border-[#E7E5E4] bg-white hover:border-stone-300"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-base font-bold text-[#1C1917]">PRO Plan — Monthly Billing</h3>
                  <p className="text-xs text-[#57534E]">Pay month-to-month, cancel anytime.</p>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-xl font-extrabold text-[#1C1917]">Rp 49.000<span className="text-xs font-normal text-stone-500">/mo</span></div>
                  <div className="text-[11px] text-[#78716C]">Billed monthly</div>
                </div>
              </div>
            </div>

            {/* Plan Card 3: Terima Beres (DFY) */}
            <div
              onClick={() => {
                setSelectedPlan("DFY");
                setBillingCycle("YEARLY");
              }}
              className={`p-6 rounded-3xl border-2 transition cursor-pointer ${
                selectedPlan === "DFY"
                  ? "border-purple-600 bg-white shadow-md ring-2 ring-purple-600/10"
                  : "border-[#E7E5E4] bg-white hover:border-stone-300"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 uppercase mb-1">
                    <Sparkles className="w-3 h-3 text-purple-700" />
                    Done-For-You VIP Service
                  </div>
                  <h3 className="text-base font-bold text-[#1C1917]">Terima Beres by asistencuan</h3>
                  <p className="text-xs text-[#57534E]">Includes 1 full year of PRO + store setup by our design team.</p>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-xl font-extrabold text-purple-900">Rp 899.000</div>
                  <div className="text-[11px] text-[#78716C]">One-time payment</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[#E7E5E4] text-xs text-[#1C1917]">
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>1 Full Year of PRO Plan included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Custom Banner & Canva Graphics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Catalog & Initial Product Upload</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Custom Domain DNS Setup Assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Invoice Summary & Payment Step */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-[#1C1917]">2. Payment & Invoice</h3>
                <p className="text-[11px] text-[#78716C]">Instant QRIS settlement</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#D94E28] bg-[#FDF0EC] px-2.5 py-1 rounded-lg">
                {activeOrder ? activeOrder.orderNumber : "INVOICE"}
              </span>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-[#57534E]">
                <span>Selected Package</span>
                <span className="font-bold text-[#1C1917]">
                  {selectedPlan === "DFY" ? "Terima Beres (DFY)" : `PRO Plan (${billingCycle})`}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#57534E]">
                <span>Store</span>
                <span className="font-medium text-[#1C1917]">{store.slug}.etalase.online</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#E7E5E4]">
                <span className="text-sm font-bold text-[#1C1917]">Total Amount Due</span>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-[#D94E28]">
                    Rp {calculateAmount().toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            {/* Generate or Show Invoice Flow */}
            {!activeOrder ? (
              <button
                type="button"
                onClick={handleSelectPlanAndProceed}
                disabled={isCreatingOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {isCreatingOrder ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4 fill-white" />
                )}
                <span>Proceed to Payment</span>
              </button>
            ) : (
              /* Active Order Payment Instructions */
              <div className="space-y-6 pt-2">
                {/* QRIS & Bank Transfer Details */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-[#D94E28]" />
                      <span className="text-xs font-bold text-[#1C1917]">Official Payment Gateway</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Zero Processing Fee
                    </span>
                  </div>

                  {/* QRIS / BCA Account Box */}
                  <div className="bg-white rounded-xl p-3 border border-[#E7E5E4] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#78716C]">Bank Central Asia (BCA)</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("8730928172", "bca")}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D94E28] hover:underline"
                      >
                        {copiedField === "bca" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === "bca" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <div className="font-mono text-sm font-bold text-[#1C1917]">
                      8730928172
                    </div>
                    <div className="text-[10px] text-[#78716C]">
                      A.N. PT RAFA KREASINDO TEKNOLOGI
                    </div>
                  </div>

                  {/* QRIS Barcode Option */}
                  <div className="bg-white rounded-xl p-3 border border-[#E7E5E4] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-[#1C1917]">Instant QRIS All SEA</div>
                      <div className="text-[10px] text-[#78716C]">BCA, Mandiri, GoPay, OVO, ShopeePay</div>
                    </div>
                    <a
                      href="https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=00020101021226670016ID.CO.BORDERPAY011893600000000000000002158730928172000010303UMI51440014ID.LINKAJA.WWW02158730928172000010303UMI5204581253033605802ID5927PT%20RAFA%20KREASINDO%20TEKNOLOGI6007BANDUNG61054011562070703A016304"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D94E28] hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View QR Code</span>
                    </a>
                  </div>
                </div>

                {/* Proof of Payment Upload Form */}
                <form onSubmit={handleSubmitProof} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#1C1917]">
                      Upload Payment Receipt (Screenshot) *
                    </label>
                    <p className="text-[11px] text-[#78716C]">
                      Upload JPG, PNG, or WebP screenshot of your transfer.
                    </p>
                  </div>

                  <ImageUploadDropzone
                    value={proofUrl}
                    onChange={(url) => setProofUrl(url)}
                    folder="payment"
                    label="Payment Receipt"
                    helperText="Drag and drop your transfer receipt here"
                    aspectRatio="square"
                  />

                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">
                      Additional Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Transferred from BCA a.n. Budi"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20 focus:border-[#D94E28]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingProof || !proofUrl}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmittingProof ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <UploadCloud className="w-4 h-4" />
                    )}
                    <span>Submit Payment Confirmation</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
