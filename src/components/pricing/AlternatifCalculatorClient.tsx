"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, Check, X, ArrowRight, Info, MessageCircle, QrCode } from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";
import { PAYMENT_RULES } from "@/lib/constants/pricing";

export function AlternatifCalculatorClient({ locale = "id" }: { locale?: SupportedLocale }) {
  const [monthlyGmv, setMonthlyGmv] = useState<number>(10000000);
  const [competitorFeePercent, setCompetitorFeePercent] = useState<number>(5);
  const [etalaseChannel, setEtalaseChannel] = useState<"CHAT" | "QRIS_PRO" | "QRIS_FREE">("QRIS_PRO");
  const [passConvenienceFee, setPassConvenienceFee] = useState<boolean>(false);

  const etalaseRate =
    etalaseChannel === "CHAT"
      ? 0
      : passConvenienceFee
      ? 0
      : etalaseChannel === "QRIS_PRO"
      ? PAYMENT_RULES.PRO.directCheckoutFeePercent
      : PAYMENT_RULES.FREE.directCheckoutFeePercent;

  const competitorFeeIdr = Math.round((monthlyGmv * competitorFeePercent) / 100);
  const etalaseFeeIdr = Math.round((monthlyGmv * etalaseRate) / 100);
  const etalaseSubCostIdr = etalaseChannel === "QRIS_PRO" ? 49000 : 0;
  const totalEtalaseCostIdr = etalaseFeeIdr + etalaseSubCostIdr;
  const differenceIdr = competitorFeeIdr - totalEtalaseCostIdr;

  const fmt = (val: number) => `Rp ${Math.abs(val).toLocaleString("id-ID")}`;
  const getLocalizedHref = (p: string) => (locale === "id" ? p : `/${locale}${p}`);

  return (
    <div className="space-y-12">
      {/* Honest Interactive Fee Calculator */}
      <section className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4 pb-6 border-b border-[#E7E5E4]">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] border border-[#FADCD3] px-3 py-1 rounded-full">
              <Calculator className="w-3.5 h-3.5" />
              <span>Kalkulator Perbandingan Fee Jujur</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917]">
              Hitung Estimasi Biaya Platform dari Omzet Anda
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E]">
              Sesuaikan omzet bulanan dan persentase fee platform lain sesuai paket yang Anda bandingkan—kami hitung terbuka termasuk biaya langganan PRO Rp 49.000/bulan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#1C1917]">
                <label htmlFor="gmv-range">Estimasi Omzet Penjualan / Bulan</label>
                <span className="text-sm font-extrabold text-[#D94E28]">
                  {fmt(monthlyGmv)}
                </span>
              </div>
              <input
                id="gmv-range"
                type="range"
                min={500000}
                max={100000000}
                step={500000}
                value={monthlyGmv}
                onChange={(e) => setMonthlyGmv(Number(e.target.value))}
                className="w-full accent-[#D94E28] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#57534E]">
                <span>Rp 500rb</span>
                <span>Rp 25jt</span>
                <span>Rp 50jt</span>
                <span>Rp 100jt</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#1C1917]">
                <label htmlFor="comp-fee-range">Asumsi Fee Platform Pembanding (dapat diubah)</label>
                <span className="text-sm font-extrabold text-[#1C1917]">
                  {competitorFeePercent}%
                </span>
              </div>
              <input
                id="comp-fee-range"
                type="range"
                min={1}
                max={15}
                step={0.5}
                value={competitorFeePercent}
                onChange={(e) => setCompetitorFeePercent(Number(e.target.value))}
                className="w-full accent-[#1C1917] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#57534E]">
                <span>1%</span>
                <span>5%</span>
                <span>10%</span>
                <span>15%</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-bold text-[#1C1917]">
                Pilih Jalur Transaksi Anda di etalase.online
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setEtalaseChannel("CHAT")}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    etalaseChannel === "CHAT"
                      ? "bg-[#FDF0EC] border-[#D94E28] text-[#1C1917]"
                      : "bg-[#FAF8F5] border-[#E7E5E4] text-[#57534E]"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Order WhatsApp</span>
                  </div>
                  <div className="text-[11px] mt-0.5 font-semibold text-emerald-700">0% Komisi</div>
                </button>

                <button
                  type="button"
                  onClick={() => setEtalaseChannel("QRIS_PRO")}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    etalaseChannel === "QRIS_PRO"
                      ? "bg-[#FDF0EC] border-[#D94E28] text-[#1C1917]"
                      : "bg-[#FAF8F5] border-[#E7E5E4] text-[#57534E]"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-[#D94E28]" />
                    <span>QRIS PRO (2%)</span>
                  </div>
                  <div className="text-[11px] mt-0.5 text-[#57534E]">+Rp 49rb/bln PRO</div>
                </button>

                <button
                  type="button"
                  onClick={() => setEtalaseChannel("QRIS_FREE")}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    etalaseChannel === "QRIS_FREE"
                      ? "bg-[#FDF0EC] border-[#D94E28] text-[#1C1917]"
                      : "bg-[#FAF8F5] border-[#E7E5E4] text-[#57534E]"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-[#57534E]" />
                    <span>QRIS Free (4,5%)</span>
                  </div>
                  <div className="text-[11px] mt-0.5 text-[#57534E]">Rp 0 langganan</div>
                </button>
              </div>
            </div>

            {etalaseChannel !== "CHAT" && (
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={passConvenienceFee}
                  onChange={(e) => setPassConvenienceFee(e.target.checked)}
                  className="mt-0.5 accent-[#D94E28]"
                />
                <span className="text-[#57534E]">
                  Aktifkan <strong className="text-[#1C1917]">Convenience Fee</strong> (biaya QRIS ditanggung pembeli saat checkout; tetap perlu diingat total harga ke pembeli jadi sedikit lebih tinggi).
                </span>
              </label>
            )}
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-6 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-[#E7E5E4]">
                <span className="text-[#57534E]">Estimasi Potongan Platform Pembanding ({competitorFeePercent}%)</span>
                <span className="font-bold text-[#1C1917] text-sm">{fmt(competitorFeeIdr)}/bln</span>
              </div>

              <div className="space-y-1.5 text-xs pb-3 border-b border-[#E7E5E4]">
                <div className="flex items-center justify-between">
                  <span className="text-[#57534E]">Fee Transaksi etalase.online ({etalaseRate}%)</span>
                  <span className="font-bold text-[#1C1917]">{fmt(etalaseFeeIdr)}</span>
                </div>
                {etalaseSubCostIdr > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#57534E]">Langganan Paket PRO</span>
                    <span className="font-bold text-[#1C1917]">{fmt(etalaseSubCostIdr)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-[#1C1917]">Total Biaya di etalase.online</span>
                  <span className="font-extrabold text-[#D94E28] text-sm">{fmt(totalEtalaseCostIdr)}/bln</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  differenceIdr >= 0
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-amber-50 border-amber-200 text-amber-900"
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider">
                  {differenceIdr >= 0 ? "Estimasi Selisih Hemat / Bulan" : "Catatan Jujur Untuk Omzet Ini"}
                </div>
                <div className="text-2xl font-black mt-1">
                  {differenceIdr >= 0 ? `+${fmt(differenceIdr)} / bulan` : `Lebih hemat pakai Free / Chat`}
                </div>
                <p className="text-[11px] mt-1 leading-relaxed opacity-90">
                  {differenceIdr >= 0
                    ? "Belum termasuk biaya penarikan saldo (PRO gratis 4x/bln lalu Rp 2.500, Free Rp 5.000/penarikan, min. Rp 50.000)."
                    : "Pada omzet kecil, biaya tetap PRO Rp 49.000/bulan belum tentu ekonomis—Anda bebas memakai Paket Gratis (0% order chat, QRIS 4,5%) sampai omzet berkembang."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-[#57534E] leading-relaxed">
              <Info className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
              <span>
                Minimum transaksi QRIS di etalase.online adalah Rp 15.000 (Free) dan Rp 25.000 (PRO). Minimum pencairan saldo ke bank adalah Rp 50.000.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Side-by-Side Comparison Matrix */}
      <section className="bg-white border border-[#E7E5E4] rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 border-b border-[#E7E5E4]">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917]">
            Perbandingan Fitur & Model Closing
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Ringkasan transparan perbedaan pendekatan jualan langsung di WhatsApp & QRIS di etalase.online vs bio-link berfokus link daftar seperti Lynk.id. Tarif kompetitor dapat berubah sesuai kebijakan masing-masing penyedia.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E7E5E4] text-xs font-bold text-[#57534E]">
                <th className="py-4 px-6 w-[42%]">Aspek Penting</th>
                <th className="py-4 px-6 w-[29%] text-[#D94E28]">etalase.online</th>
                <th className="py-4 px-6 w-[29%]">Platform Bio-Link Umum (mis. Lynk.id)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E4] text-xs sm:text-sm">
              <tr>
                <td className="py-4 px-6 font-semibold text-[#1C1917]">Order Langsung via Chat WhatsApp</td>
                <td className="py-4 px-6 text-emerald-700 font-bold">0% Komisi di Semua Paket (Gratis & PRO)</td>
                <td className="py-4 px-6 text-[#57534E]">Umumnya checkout diarahkan lewat keranjang/payment platform</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-[#1C1917]">Biaya Checkout QRIS Otomatis</td>
                <td className="py-4 px-6 text-[#1C1917]">4,5% Free (min. Rp 15rb) • 2% PRO (min. Rp 25rb)</td>
                <td className="py-4 px-6 text-[#57534E]">Mengikuti struktur platform fee & payment fee penyedia</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-[#1C1917]">Opsi Convenience Fee (Ditanggung Pembeli)</td>
                <td className="py-4 px-6 text-emerald-700 font-semibold"><Check className="w-4 h-4 inline mr-1" />Tersedia di Free & PRO</td>
                <td className="py-4 px-6 text-[#57534E]">Bervariasi tergantung paket</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-[#1C1917]">Template Showroom Mobil / Menu Cafe QR</td>
                <td className="py-4 px-6 text-emerald-700 font-semibold"><Check className="w-4 h-4 inline mr-1" />Khusus tersedia (Showroom Pro & Visual Menu)</td>
                <td className="py-4 px-6 text-[#57534E]"><X className="w-4 h-4 inline mr-1 text-stone-400" />Fokus kreator digital & link bio</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-[#1C1917]">Minimum Penarikan Saldo</td>
                <td className="py-4 px-6 text-[#1C1917]">Min. Rp 50.000 (PRO gratis 4x/bln, Free Rp 5.000)</td>
                <td className="py-4 px-6 text-[#57534E]">Mengikuti ketentuan pencairan masing-masing platform</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-[#1C1917]">Custom Domain & Pixel Iklan</td>
                <td className="py-4 px-6 text-[#1C1917]">PRO Rp 49.000/bln (Meta CAPI, TikTok Pixel, GA4)</td>
                <td className="py-4 px-6 text-[#57534E]">Tersedia di paket berbayar penyedia terkait</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={getLocalizedHref("/register")}
            className="w-full sm:w-auto bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition inline-flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Coba Gratis Tanpa Kartu Kredit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://rafa.etalase.online"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white hover:bg-[#FAF8F5] border border-[#E7E5E4] text-[#1C1917] font-semibold px-6 py-3.5 rounded-xl text-sm transition"
          >
            Lihat Contoh Toko: rafa.etalase.online
          </a>
        </div>
      </div>
    </div>
  );
}
