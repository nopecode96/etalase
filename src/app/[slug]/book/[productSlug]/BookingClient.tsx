"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Video, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { actionBookAppointment } from "@/lib/actions/creator-actions";
import { showServiceResultToast } from "@/components/ui/GlobalToast";
import { trackGtmGenerateLead } from "@/lib/analytics/gtm";

interface BookingClientProps {
  storeSlug: string;
  productSlug: string;
  title: string;
  description: string;
  price: number;
  durationMinutes: number;
  availableSlots: string[];
}

export default function BookingClient({
  storeSlug,
  productSlug,
  title,
  description,
  price,
  durationMinutes,
  availableSlots,
}: BookingClientProps) {
  const [selectedSlot, setSelectedSlot] = useState(availableSlots[0] || "10:00 WIB");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;

    if (storeSlug === "demo") {
      setOrderCode("BOOK-DEMO-001");
      setSubmitted(true);
      return;
    }

    setLoading(true);
    const res = await actionBookAppointment({
      storeSlug,
      productSlug,
      buyerName: name.trim(),
      buyerWhatsapp: whatsapp.trim(),
      bookedSlot: selectedSlot,
      notes: topic.trim() || undefined,
    });
    setLoading(false);
    showServiceResultToast(res);

    if (res.success && res.data) {
      setOrderCode(res.data.orderCode);
      setSubmitted(true);
      trackGtmGenerateLead({
        currency: "IDR",
        value: Number(price || 0),
        leadSource: "consultation_booking",
        storeSlug,
        itemName: title,
        transactionId: res.data.orderCode,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-6">
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
            <h2 className="text-2xl font-bold text-white">Sesi Konsultasi Terjadwal!</h2>
            {orderCode && (
              <div className="inline-block text-xs font-mono bg-slate-800 px-3 py-1 rounded-lg text-emerald-400">
                Kode Booking: {orderCode}
              </div>
            )}
            <p className="text-sm text-slate-400">
              Jadwal Anda: <span className="text-emerald-400 font-semibold">{selectedSlot}</span>.
              Detail konfirmasi sesi akan dikirimkan ke WhatsApp <span className="text-white font-mono">{whatsapp}</span>.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              {price > 0 && (
                <Link
                  href={`/${storeSlug}/checkout/${productSlug}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition"
                >
                  Lanjut Bayar Sekarang (QRIS / PayPal)
                </Link>
              )}
              <Link
                href={`/${storeSlug}`}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition"
              >
                Kembali ke Profil Toko
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                1-on-1 Consultation &amp; Booking
              </span>
              <h1 className="text-2xl font-black text-white mt-3">{title}</h1>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
            </div>

            <div className="flex items-center gap-4 py-3 px-4 bg-slate-800/60 rounded-xl text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{durationMinutes} Menit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Video className="w-4 h-4 text-blue-400" />
                <span>Google Meet / Zoom</span>
              </div>
              <div className="ml-auto font-bold text-emerald-400 text-sm">
                Rp {price.toLocaleString("id-ID")}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pilih Waktu Konsultasi yang Tersedia</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition text-center ${
                        selectedSlot === slot
                          ? "bg-emerald-500 text-slate-950 border-emerald-500 shadow-md"
                          : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nomor WhatsApp Aktif (untuk link meeting)
                </label>
                <input
                  type="text"
                  required
                  placeholder="08123456789"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Topik / Pertanyaan yang Ingin Dibahas (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ceritakan singkat tujuan sesi konsultasi Anda..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Konfirmasi Jadwal Konsultasi (Rp {price.toLocaleString("id-ID")})</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
