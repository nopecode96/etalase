"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";

export default function FreeToolsPage() {
  // Tool 1: Chat Link Generator
  const [channel, setChannel] = useState<"whatsapp" | "zalo" | "line">("whatsapp");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("Halo, saya ingin bertanya tentang produk...");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleGenerateChatLink = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    let url = "";

    if (channel === "whatsapp") {
      url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    } else if (channel === "zalo") {
      url = `https://zalo.me/${cleanPhone}`;
    } else {
      url = `https://line.me/ti/p/~${phone}`;
    }

    setGeneratedLink(url);
  };

  // Tool 2: Fee Savings Calculator
  const [monthlyGmv, setMonthlyGmv] = useState(10000000); // 10 juta IDR default
  const marketplaceFee = monthlyGmv * 0.10; // 10% average Shopee/TikTok
  const etalaseBorderpayFee = monthlyGmv * 0.007; // 0.7% QRIS standard
  const estimatedSavings = marketplaceFee - etalaseBorderpayFee;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <MarketingNavbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Free Growth Tools untuk Kreator & Seller SEA
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              Koleksi kalkulator profit dan generator link multi-channel gratis untuk mempercepat
              penjualan langsung Anda di Asia Tenggara.
            </p>
          </div>

        {/* Tool 1: Multi-Channel Chat Link Generator */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Tool #1 • Multi-Channel SEA
            </span>
            <h2 className="text-2xl font-bold text-white mt-3">
              Direct Chat Order Link Generator
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Buat link chat otomatis (WhatsApp, Zalo, LINE) yang siap dipasang di bio media sosial Anda.
            </p>
          </div>

          <form onSubmit={handleGenerateChatLink} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Pilih Saluran Chat
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="whatsapp">WhatsApp (ID, MY, SG)</option>
                  <option value="zalo">Zalo (Vietnam)</option>
                  <option value="line">LINE (Thailand)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nomor HP / LINE ID (Gunakan kode negara, misal: 628123456789)
                </label>
                <input
                  type="text"
                  required
                  placeholder="628123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Pesan Pembuka Otomatis (Opsional)
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
              Generate Link Sekarang
            </button>
          </form>

          {generatedLink && (
            <div className="mt-4 p-4 bg-slate-800/80 border border-slate-700 rounded-xl space-y-2">
              <p className="text-xs text-slate-400 font-medium">Link Siap Pakai:</p>
              <div className="flex items-center justify-between gap-2 overflow-hidden">
                <code className="text-emerald-400 text-sm truncate">{generatedLink}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedLink)}
                  className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-semibold text-white shrink-0"
                >
                  Salin Link
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tool 2: Fee Savings Calculator */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Tool #2 • Kalkulator Penghematan
            </span>
            <h2 className="text-2xl font-bold text-white mt-3">
              Kalkulator Potongan Marketplace vs Direct Storefront
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Bandingkan berapa juta rupiah yang bisa Anda hemat tiap bulan dengan direct checkout di etalase.online (0.7% Borderpay QRIS) vs potongan 10–12% marketplace.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Omset Penjualan Bulanan (Rp): {monthlyGmv.toLocaleString("id-ID")}
              </label>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="1000000"
                value={monthlyGmv}
                onChange={(e) => setMonthlyGmv(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-slate-800/60 border border-rose-500/20 rounded-xl">
                <p className="text-xs text-slate-400">Potongan Marketplace (~10%)</p>
                <p className="text-xl font-bold text-rose-400 mt-1">
                  Rp {marketplaceFee.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="p-4 bg-slate-800/60 border border-emerald-500/20 rounded-xl">
                <p className="text-xs text-slate-400">Biaya etalase.online QRIS (0.7%)</p>
                <p className="text-xl font-bold text-emerald-400 mt-1">
                  Rp {etalaseBorderpayFee.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <p className="text-xs text-emerald-300 font-semibold">Uang yang Anda Hemat:</p>
                <p className="text-2xl font-black text-emerald-400 mt-1">
                  Rp {estimatedSavings.toLocaleString("id-ID")} /bln
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-center">
            <Link
              href="/onboarding"
              className="inline-block bg-white hover:bg-slate-100 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg"
            >
              Mulai Simpan Profit Anda dengan etalase.online →
            </Link>
          </div>
        </div>
      </div>
    </div>
    <MarketingFooter />
  </div>
  );
}
