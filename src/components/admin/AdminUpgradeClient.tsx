"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QrCodeImage } from "@/components/ui/QrCodeImage";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  QrCode,
  CreditCard,
  Copy,
  Check,
  Loader2,
  Zap,
  Star,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Lock,
} from "lucide-react";
import { showToast } from "@/components/ui/GlobalToast";
import { trackGtmBeginCheckout, trackGtmPurchase } from "@/lib/analytics/gtm";
import {
  actionCreatePlanOrder,
  actionCapturePaypalPlanOrder,
  actionCheckPlanOrderStatus,
  actionSimulateBorderpaySuccess,
} from "@/app/admin/billing/upgrade/actions";

interface AdminUpgradeClientProps {
  store: any;
  user: any;
  currentTier: "FREE" | "PRO" | "DFY";
  initialPlan?: string;
  initialCycle?: string;
  returnTo?: string;
  existingOrder?: any;
  paypalStatus?: string;
  paypalToken?: string;
  paypalOrderNumber?: string;
  allowSandbox?: boolean;
}

export function AdminUpgradeClient({
  store,
  user,
  currentTier,
  initialPlan = "pro",
  initialCycle = "yearly",
  returnTo = "/admin",
  existingOrder = null,
  paypalStatus,
  paypalToken,
  paypalOrderNumber,
  allowSandbox = false,
}: AdminUpgradeClientProps) {
  const router = useRouter();

  // Plan Selection
  const [selectedPlan, setSelectedPlan] = useState<"PRO" | "DFY">(
    initialPlan.toLowerCase() === "dfy" ? "DFY" : "PRO"
  );
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">(
    initialCycle.toLowerCase() === "monthly" ? "MONTHLY" : "YEARLY"
  );

  // Payment Method Selection: strictly Borderpay QRIS or PayPal (Credit Card)
  const [paymentProvider, setPaymentProvider] = useState<"BORDERPAY_QRIS" | "PAYPAL">("BORDERPAY_QRIS");

  // Active Invoice & Gateway Session State
  const [activeOrder, setActiveOrder] = useState<any | null>(existingOrder);
  const [qrString, setQrString] = useState<string>("");
  const [paymentUrl, setPaymentUrl] = useState<string>("");
  const [paypalApproveUrl, setPaypalApproveUrl] = useState<string>("");
  const [paypalOrderId, setPaypalOrderId] = useState<string>("");
  const [amountUsd, setAmountUsd] = useState<number>(29.99);

  // Clear stale pending invoice when user switches plan or billing cycle
  useEffect(() => {
    if (!activeOrder || activeOrder.status === "APPROVED") return;
    const expectedCycle = selectedPlan === "DFY" ? "ONE_TIME" : billingCycle;
    if (activeOrder.planCode !== selectedPlan || activeOrder.billingCycle !== expectedCycle) {
      setActiveOrder(null);
      setQrString("");
      setPaymentUrl("");
      setPaypalApproveUrl("");
      setPaypalOrderId("");
    }
  }, [selectedPlan, billingCycle, activeOrder]);

  // Status & Verification state
  const [isApproved, setIsApproved] = useState<boolean>(existingOrder?.status === "APPROVED");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [isPendingAction, startTransition] = useTransition();

  // Parse notes from existing order if present
  useEffect(() => {
    if (existingOrder?.notes) {
      try {
        const parsed = JSON.parse(existingOrder.notes);
        if (parsed.qrString) setQrString(parsed.qrString);
        if (parsed.paymentUrl) setPaymentUrl(parsed.paymentUrl);
        if (parsed.paypalApproveUrl) setPaypalApproveUrl(parsed.paypalApproveUrl);
        if (parsed.paypalOrderId) setPaypalOrderId(parsed.paypalOrderId);
        if (parsed.amountUsd) setAmountUsd(parsed.amountUsd);
      } catch {}
    }
    if (existingOrder?.paymentMethod === "PAYPAL") {
      setPaymentProvider("PAYPAL");
    }
  }, [existingOrder]);

  // Handle return from PayPal Checkout
  useEffect(() => {
    if (paypalStatus === "paypal_success" && paypalToken && paypalOrderNumber) {
      setIsVerifying(true);
      actionCapturePaypalPlanOrder({
        paypalOrderId: paypalToken,
        orderNumber: paypalOrderNumber,
      }).then((res) => {
        setIsVerifying(false);
        if (res.success) {
          setIsApproved(true);
          const approvedOrder = res.data?.order;
          trackGtmPurchase({
            transactionId: paypalOrderNumber,
            currency: approvedOrder?.currency === "USD" ? "USD" : "IDR",
            value:
              approvedOrder?.currency === "USD"
                ? calculateAmountUsd()
                : Number(approvedOrder?.amount || calculateAmountIdr()),
            paymentType: "PAYPAL",
            affiliation: "etalase_plan_upgrade",
            items: [
              {
                item_id: approvedOrder?.planCode || selectedPlan,
                item_name:
                  (approvedOrder?.planCode || selectedPlan) === "DFY"
                    ? "Terima Beres (Done-For-You)"
                    : `Etalase PRO (${approvedOrder?.billingCycle || billingCycle})`,
                item_category: "SaaS Plan",
                price: Number(approvedOrder?.amount || calculateAmountIdr()),
              },
            ],
          });
          showToast("PayPal Credit Card payment approved! Store upgraded to PRO.", "success");
        } else {
          showToast(res.error || "Failed to finalize PayPal capture.", "error");
        }
      });
    }
  }, [paypalStatus, paypalToken, paypalOrderNumber]);

  // Auto-polling for QRIS / Webhook updates when invoice is active and pending
  useEffect(() => {
    if (!activeOrder?.id || isApproved) return;

    const interval = setInterval(async () => {
      const res = await actionCheckPlanOrderStatus(activeOrder.id);
      if (res.success && res.data?.status === "APPROVED") {
        setIsApproved(true);
        trackGtmPurchase({
          transactionId: activeOrder.orderNumber,
          currency: activeOrder.currency || "IDR",
          value: Number(activeOrder.amount || calculateAmountIdr()),
          paymentType: activeOrder.paymentMethod || "BORDERPAY_QRIS",
          affiliation: "etalase_plan_upgrade",
          items: [
            {
              item_id: activeOrder.planCode || selectedPlan,
              item_name:
                (activeOrder.planCode || selectedPlan) === "DFY"
                  ? "Terima Beres (Done-For-You)"
                  : `Etalase PRO (${activeOrder.billingCycle || billingCycle})`,
              item_category: "SaaS Plan",
              price: Number(activeOrder.amount || calculateAmountIdr()),
            },
          ],
        });
        showToast("Payment successfully verified! Your store is now PRO.", "success");
        clearInterval(interval);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeOrder?.id, activeOrder?.orderNumber, activeOrder?.amount, activeOrder?.currency, activeOrder?.paymentMethod, activeOrder?.planCode, activeOrder?.billingCycle, isApproved]);

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    showToast("Copied to clipboard!", "success");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const calculateAmountIdr = () => {
    if (selectedPlan === "DFY") return 899000;
    return billingCycle === "YEARLY" ? 468000 : 49000;
  };

  const calculateAmountUsd = () => {
    if (selectedPlan === "DFY") return 57.99;
    return billingCycle === "YEARLY" ? 29.99 : 3.20;
  };

  const handleProceedPayment = () => {
    startTransition(async () => {
      const res = await actionCreatePlanOrder({
        planCode: selectedPlan,
        billingCycle: selectedPlan === "DFY" ? "ONE_TIME" : billingCycle,
        paymentProvider,
      });

      if (res.success && res.data) {
        const d = res.data;
        setActiveOrder(d.order);
        if (d.qrString) setQrString(d.qrString);
        if (d.paymentUrl) setPaymentUrl(d.paymentUrl);
        if (d.paypalApproveUrl) setPaypalApproveUrl(d.paypalApproveUrl);
        if (d.paypalOrderId) setPaypalOrderId(d.paypalOrderId);
        if (d.amountUsd) setAmountUsd(d.amountUsd);

        trackGtmBeginCheckout({
          currency: paymentProvider === "PAYPAL" ? "USD" : "IDR",
          value:
            paymentProvider === "PAYPAL"
              ? Number(d.amountUsd || calculateAmountUsd())
              : Number(d.order?.amount || calculateAmountIdr()),
          paymentType: paymentProvider,
          transactionId: d.order?.orderNumber,
          items: [
            {
              item_id: selectedPlan,
              item_name:
                selectedPlan === "DFY"
                  ? "Terima Beres (Done-For-You)"
                  : `Etalase PRO (${billingCycle})`,
              item_category: "SaaS Plan",
              price:
                paymentProvider === "PAYPAL"
                  ? Number(d.amountUsd || calculateAmountUsd())
                  : Number(d.order?.amount || calculateAmountIdr()),
            },
          ],
        });

        if (paymentProvider === "PAYPAL" && d.paypalApproveUrl) {
          showToast("Redirecting to PayPal secure Credit Card checkout...", "success");
          window.location.href = d.paypalApproveUrl;
        } else {
          showToast("Dynamic Borderpay QRIS generated! Please scan to pay.", "success");
        }
      } else {
        const errorMsg = !res.success ? res.error : "Failed to generate payment session.";
        showToast(errorMsg, "error");
      }
    });
  };

  const handleSimulateSandbox = () => {
    if (!activeOrder?.id) return;
    startTransition(async () => {
      const res = await actionSimulateBorderpaySuccess(activeOrder.id);
      if (res.success) {
        setIsApproved(true);
        trackGtmPurchase({
          transactionId: activeOrder.orderNumber,
          currency: activeOrder.currency || "IDR",
          value: Number(activeOrder.amount || calculateAmountIdr()),
          paymentType: "BORDERPAY_QRIS_SIMULATOR",
          affiliation: "etalase_plan_upgrade",
          items: [
            {
              item_id: activeOrder.planCode || selectedPlan,
              item_name:
                (activeOrder.planCode || selectedPlan) === "DFY"
                  ? "Terima Beres (Done-For-You)"
                  : `Etalase PRO (${activeOrder.billingCycle || billingCycle})`,
              item_category: "SaaS Plan",
              price: Number(activeOrder.amount || calculateAmountIdr()),
            },
          ],
        });
        showToast("Sandbox payment simulated successfully! Store upgraded to PRO.", "success");
      } else {
        showToast(res.error || "Simulation failed", "error");
      }
    });
  };

  // 1. SUCCESS / CELEBRATION STATE (Payment Verified Automatically)
  if (isApproved) {
    return (
      <div className="w-full space-y-8 animate-in fade-in duration-300">
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
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
              Active Tier: PRO
            </span>
          </div>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-[#E7E5E4] p-8 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Verification Complete</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Welcome to etalase PRO!
            </h1>
            <p className="text-sm text-[#57534E] max-w-md mx-auto">
              Your payment has been automatically verified and settled. All Pro features are now unlocked for your store.
            </p>
          </div>

          <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E7E5E4] text-left text-xs space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-[#E7E5E4]">
              <span className="text-[#78716C]">Store Domain</span>
              <span className="font-bold text-[#1C1917]">{store.slug}.etalase.online</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#E7E5E4]">
              <span className="text-[#78716C]">Unlocked Benefits</span>
              <span className="font-bold text-emerald-700">4 Templates + Custom Domain + 2% QRIS</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#78716C]">Payment Verification</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified via {activeOrder?.paymentMethod === "PAYPAL" ? "PayPal Credit Card" : "Borderpay QRIS"}</span>
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                router.push(returnTo);
                router.refresh();
              }}
              className="w-full py-4 px-6 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-sm font-bold transition shadow-xs"
            >
              Go to Store Admin Console
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. VERIFYING PAYPAL CAPTURE LOADER
  if (isVerifying) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#D94E28]" />
        <h2 className="text-lg font-bold text-[#1C1917]">Finalizing PayPal Credit Card Payment...</h2>
        <p className="text-xs text-[#57534E]">Please wait while we confirm your transaction and upgrade your plan.</p>
      </div>
    );
  }

  const qrValueToRender =
    qrString && !qrString.startsWith("SANDBOX_QRIS_SIMULATOR_")
      ? qrString
      : !qrString?.startsWith("SANDBOX_QRIS_SIMULATOR_") && paymentUrl
      ? paymentUrl
      : "";
  const isSandboxQr = Boolean(qrString?.startsWith("SANDBOX_QRIS_SIMULATOR_"));

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

      {/* Main Grid: Left Plan Selection / Right Payment Methods */}
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
                setActiveOrder(null);
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
                setActiveOrder(null);
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
                setActiveOrder(null);
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
                  <div className="text-lg sm:text-xl font-extrabold text-[#D94E28]">
                    Rp 39.000<span className="text-xs font-normal text-stone-500">/mo</span>
                  </div>
                  <div className="text-[11px] text-[#78716C]">
                    Billed Rp 468.000 / year &bull; $29.99 USD
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[#E7E5E4] text-xs text-[#1C1917]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All 4 Archetypes (14 Templates)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom Branded Domain + SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2% QRIS Fee (min. Rp 25.000 tx)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Meta Pixel (CAPI), TikTok Pixel &amp; GA4</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>4x Free Withdrawals/mo (min. Rp 50.000, Rp 2.500 after)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Remove etalase.online Badge</span>
                </div>
              </div>
            </div>

            {/* Plan Card 2: PRO Monthly */}
            <div
              onClick={() => {
                setSelectedPlan("PRO");
                setBillingCycle("MONTHLY");
                setActiveOrder(null);
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
                  <div className="text-lg sm:text-xl font-extrabold text-[#1C1917]">
                    Rp 49.000<span className="text-xs font-normal text-stone-500">/mo</span>
                  </div>
                  <div className="text-[11px] text-[#78716C]">Billed monthly &bull; $3.20 USD</div>
                </div>
              </div>
            </div>

            {/* Plan Card 3: Terima Beres (DFY) */}
            <div
              onClick={() => {
                setSelectedPlan("DFY");
                setBillingCycle("YEARLY");
                setActiveOrder(null);
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
                  <h3 className="text-base font-bold text-[#1C1917]">Terima Beres (Done-For-You)</h3>
                  <p className="text-xs text-[#57534E]">Includes 1 full year of PRO + store setup by our design team.</p>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-xl font-extrabold text-purple-900">Rp 899.000</div>
                  <div className="text-[11px] text-[#78716C]">One-time payment &bull; $57.99 USD</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[#E7E5E4] text-xs text-[#1C1917]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>1 Full Year of PRO Plan included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Custom Banner & Canva Graphics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Catalog & Initial Product Upload</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Custom Domain DNS Setup Assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Automated Payment & Invoice Methods */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-[#1C1917]">2. Payment & Invoice</h3>
                <p className="text-[11px] text-[#78716C]">Automated instant settlement</p>
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
                  {(activeOrder?.planCode || selectedPlan) === "DFY"
                    ? "Terima Beres (DFY)"
                    : `PRO Plan (${activeOrder?.billingCycle || billingCycle})`}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#57534E]">
                <span>Store</span>
                <span className="font-medium text-[#1C1917]">{store?.slug || "toko"}.etalase.online</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#E7E5E4]">
                <span className="text-sm font-bold text-[#1C1917]">Total Amount Due</span>
                <div className="text-right">
                  <div className="text-xl font-extrabold text-[#D94E28]">
                    {activeOrder
                      ? activeOrder.currency === "USD"
                        ? `$${Number(amountUsd || calculateAmountUsd()).toFixed(2)} USD`
                        : `Rp ${Number(activeOrder.amount).toLocaleString("id-ID")}`
                      : paymentProvider === "PAYPAL"
                      ? `$${calculateAmountUsd().toFixed(2)} USD`
                      : `Rp ${calculateAmountIdr().toLocaleString("id-ID")}`}
                  </div>
                  {paymentProvider === "PAYPAL" && (
                    <div className="text-[10px] text-stone-500">
                      Approx. Rp {calculateAmountIdr().toLocaleString("id-ID")}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method Selector: STRICTLY Borderpay QRIS & PayPal (Credit Card Only) */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-[#1C1917]">
                Select Payment Channel
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Channel 1: Borderpay QRIS */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentProvider("BORDERPAY_QRIS");
                    if (activeOrder?.paymentMethod === "PAYPAL") {
                      setActiveOrder(null);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition relative flex flex-col justify-between cursor-pointer ${
                    paymentProvider === "BORDERPAY_QRIS"
                      ? "border-[#D94E28] bg-[#FDF0EC]/60 ring-2 ring-[#D94E28]/10"
                      : "border-[#E7E5E4] hover:bg-stone-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E7E5E4] flex items-center justify-center text-[#D94E28]">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                      Zero Fee
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C1917]">Borderpay QRIS</div>
                    <div className="text-[10px] text-[#78716C] mt-0.5">
                      BCA, Mandiri, BRI, GoPay, OVO, ShopeePay
                    </div>
                  </div>
                </button>

                {/* Channel 2: PayPal (Credit Card Only) */}
                <button
                  type="button"
                  onClick={() => {
                    setPaymentProvider("PAYPAL");
                    if (activeOrder?.paymentMethod === "BORDERPAY_QRIS") {
                      setActiveOrder(null);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition relative flex flex-col justify-between cursor-pointer ${
                    paymentProvider === "PAYPAL"
                      ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/10"
                      : "border-[#E7E5E4] hover:bg-stone-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E7E5E4] flex items-center justify-center text-blue-600">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200">
                      Card Only
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C1917]">Credit Card (PayPal)</div>
                    <div className="text-[10px] text-[#78716C] mt-0.5">
                      Visa, Mastercard, Amex, JCB
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Generate or Active Invoice Payment Flow */}
            {!activeOrder ? (
              <button
                type="button"
                onClick={handleProceedPayment}
                disabled={isPendingAction}
                className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer ${
                  paymentProvider === "PAYPAL"
                    ? "bg-[#0070BA] hover:bg-[#003087]"
                    : "bg-[#D94E28] hover:bg-[#B83E1D]"
                }`}
              >
                {isPendingAction ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : paymentProvider === "PAYPAL" ? (
                  <CreditCard className="w-4 h-4" />
                ) : (
                  <Zap className="w-4 h-4 fill-white" />
                )}
                <span>
                  {paymentProvider === "PAYPAL"
                    ? `Proceed to Credit Card Checkout ($${calculateAmountUsd().toFixed(2)} USD)`
                    : `Generate Borderpay QRIS (Rp ${calculateAmountIdr().toLocaleString("id-ID")})`}
                </span>
              </button>
            ) : paymentProvider === "BORDERPAY_QRIS" ? (
              /* ACTIVE BORDERPAY QRIS VIEW */
              <div className="space-y-5 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-4 text-center">
                  <div className="flex items-center justify-between text-left">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-[#D94E28]" />
                      <span className="text-xs font-bold text-[#1C1917]">Borderpay Dynamic QRIS</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Real-Time Auto Detect
                    </span>
                  </div>

                  {/* QRIS Code Image Box */}
                  <div className="bg-white rounded-2xl p-4 border border-[#E7E5E4] inline-block shadow-xs mx-auto">
                    {qrValueToRender ? (
                      <div className="relative w-48 h-48 mx-auto">
                        <QrCodeImage
                          value={qrValueToRender}
                          alt="Borderpay QRIS Code"
                          size={360}
                        />
                      </div>
                    ) : (
                      <div className="w-48 h-48 mx-auto flex flex-col items-center justify-center rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-800 gap-2">
                        <QrCode className="w-10 h-10 text-amber-600" />
                        <span className="text-[11px] font-bold">
                          {isSandboxQr ? "Sandbox Test Mode (QRIS Gateway Offline)" : "QRIS code unavailable"}
                        </span>
                        <span className="text-[10px] text-amber-700 leading-snug">
                          {isSandboxQr
                            ? "Use sandbox simulation or PayPal Credit Card below."
                            : "Please regenerate the invoice or switch to PayPal."}
                        </span>
                      </div>
                    )}
                    <div className="text-[11px] font-mono font-bold text-stone-800 mt-2">
                      Rp {Number(activeOrder.amount).toLocaleString("id-ID")}
                    </div>
                  </div>

                  {/* Real-time Status Indicator */}
                  <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs flex items-center justify-center gap-2 text-amber-800">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </div>
                    <span className="font-medium text-[11px]">
                      Awaiting payment... System auto-verifies within 2 seconds
                    </span>
                  </div>

                  {/* Step Instructions */}
                  <div className="text-left text-[11px] text-[#57534E] space-y-1.5 pt-1">
                    <div className="font-bold text-stone-800 mb-1">How to Pay:</div>
                    <p>1. Open BCA Mobile, Livin Mandiri, GoPay, OVO, DANA, or ShopeePay.</p>
                    <p>2. Scan the QRIS code above and confirm payment of <strong>Rp {Number(activeOrder.amount).toLocaleString("id-ID")}</strong>.</p>
                    <p>3. Your PRO plan unlocks automatically as soon as payment settles.</p>
                  </div>
                </div>

                {/* External payment link or Simulation */}
                <div className="space-y-2">
                  {paymentUrl && (
                    <a
                      href={paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl border border-[#E7E5E4] bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 flex items-center justify-center gap-2 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Direct Checkout Page</span>
                    </a>
                  )}

                  {allowSandbox && (
                    <button
                      type="button"
                      onClick={handleSimulateSandbox}
                      disabled={isPendingAction}
                      className="w-full py-2.5 px-4 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/60 text-emerald-800 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      {isPendingAction ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      <span>Simulate Instant Settlement (Sandbox Demo)</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveOrder(null)}
                    className="w-full text-center text-[11px] text-[#78716C] hover:text-[#1C1917] transition pt-1 cursor-pointer"
                  >
                    Change plan or payment method
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE PAYPAL (CREDIT CARD) VIEW */
              <div className="space-y-5 pt-2">
                <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold text-[#1C1917]">Credit Card via PayPal</span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-full">
                      Global Gateway
                    </span>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-blue-200/60 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-500">Order Reference:</span>
                      <span className="font-mono font-bold text-stone-800">{activeOrder.orderNumber}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-stone-500">Billed in USD:</span>
                      <span className="text-base font-extrabold text-blue-700">${amountUsd.toFixed(2)} USD</span>
                    </div>
                    <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Supports Visa, Mastercard, American Express, JCB.</span>
                    </div>
                  </div>

                  {paypalApproveUrl ? (
                    <a
                      href={paypalApproveUrl}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#0070BA] hover:bg-[#003087] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay ${amountUsd.toFixed(2)} USD with Credit Card</span>
                    </a>
                  ) : (
                    <div className="text-center text-xs text-stone-500 py-2">
                      PayPal approval URL not available. Click below to regenerate.
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveOrder(null)}
                  className="w-full text-center text-[11px] text-[#78716C] hover:text-[#1C1917] transition cursor-pointer"
                >
                  Change plan or payment method
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
