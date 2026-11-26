"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Coffee, Heart, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { actionSubmitTip } from "@/lib/actions/creator-actions";
import { showServiceResultToast } from "@/components/ui/GlobalToast";
import { trackGtmGenerateLead } from "@/lib/analytics/gtm";

interface TipClientProps {
  storeSlug: string;
  storeName: string;
  avatarUrl?: string | null;
}

const PRESET_AMOUNTS = [10000, 25000, 50000, 100000];

export default function TipClient({ storeSlug, storeName, avatarUrl }: TipClientProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(25000);
  const [customAmount, setCustomAmount] = useState("");
  const [supporterName, setSupporterName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supporterName.trim() || !whatsapp.trim() || finalAmount <= 0) return;

    if (storeSlug === "demo") {
      setOrderCode("TIP-DEMO-001");
      setSubmitted(true);
      return;
    }

    setLoading(true);
    const res = await actionSubmitTip({
      storeSlug,
      supporterName: supporterName.trim(),
      supporterWhatsapp: whatsapp.trim(),
      amount: finalAmount,
      message: message.trim() || undefined,
    });
    setLoading(false);
    showServiceResultToast(res);

    if (res.success && res.data) {
      setOrderCode(res.data.orderCode);
      setSubmitted(true);
      trackGtmGenerateLead({
        currency: "IDR",
        value: Number(finalAmount || 0),
        leadSource: "creator_support_tip",
        storeSlug,
        itemName: `Tip - ${storeName}`,
        transactionId: res.data.orderCode,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <Link
          href={`/${storeSlug}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Toko</span>
        </Link>

        {submitted ? (
          <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Terima Kasih Banyak!</h2>
            {orderCode && (
              <div className="inline-block text-xs font-mono bg-slate-800 px-3 py-1 rounded-lg text-amber-400">
                Kode Dukungan: {orderCode}
              </div>
            )}
            <p className="text-sm text-slate-400">
              Apresiasi sebesar <span className="text-emerald-400 font-bold">Rp {finalAmount.toLocaleString("id-ID")}</span> untuk {storeName} telah dicatat.
            </p>
            <div className="pt-4">
              <Link
                href={`/${storeSlug}`}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition"
              >
                Kembali ke Profil
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center">
            {/* Creator Avatar & Header */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-1 shadow-lg mb-3">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={storeName} className="w-full h-full object-cover" />
                  ) : (
                    <Coffee className="w-8 h-8 text-amber-400" />
                  )}
                </div>
              </div>
              <h1 className="text-xl font-bold text-white">Traktir Kopi untuk {storeName}</h1>
              <p className="text-xs text-slate-400 mt-1">
                Dukungan kecil Anda sangat berarti untuk terus berkarya.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Preset buttons */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Pilih Jumlah Dukungan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`py-3 px-3 rounded-xl text-xs font-bold border transition text-center ${
                        selectedAmount === amt && !customAmount
                          ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md"
                          : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      ☕ Rp {amt.toLocaleString("id-ID")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Atau Nominal Lain (Rp)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 150000"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Anda</label>
                <input
                  type="text"
                  required
                  placeholder="Nama atau Anonim"
                  value={supporterName}
                  onChange={(e) => setSupporterName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nomor WhatsApp (untuk bukti tanda terima)
                </label>
                <input
                  type="text"
                  required
                  placeholder="08123456789"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Pesan Semangat (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Semangat terus bikin karyanya ya!..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-1.5"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Heart className="w-4 h-4 fill-current" />}
                <span>Kirim Dukungan Rp {finalAmount.toLocaleString("id-ID")}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
