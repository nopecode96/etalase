import { MessageSquareText, Palette, Rocket, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: MessageSquareText,
      title: "Kirim Materi Usaha via Chat",
      description:
        "Cukup kirimkan foto produk/unit Anda, daftar harga, dan nomor WhatsApp yang ingin digunakan. Anda tidak perlu pusing menyiapkan format teknis.",
      tag: "Mudah & Praktis",
    },
    {
      number: "02",
      icon: Palette,
      title: "Kami Siapkan & Desainkan",
      description:
        "Tim desainer kami merapikan katalog, menyambungkan nama domain resmi Anda (.com / .id), dan mengatur kalkulator simulasi agar siap pakai.",
      tag: "Terima Beres",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Website Aktif & Siap Promosi",
      description:
        "Website langsung online! Pasang link website di bio Instagram, TikTok, dan kirimkan ke calon pembeli untuk meningkatkan kepercayaan dan closing.",
      tag: "Langsung Jualan",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-blue-400 bg-blue-500/10 border border-blue-400/20 px-3.5 py-1 rounded-full">
            Alur Pemesanan 3 Langkah
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 mb-4 tracking-tight">
            Miliki Website Resmi Tanpa Repot
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Kami tahu waktu Anda sangat berharga untuk melayani calon pembeli. 
            Serahkan urusan pembuatan website kepada tim etalase.online:
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 relative flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Icon size={28} />
                    </div>
                    <span className="text-3xl font-black text-slate-600 font-mono">
                      {step.number}
                    </span>
                  </div>

                  <span className="inline-block text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full mb-3">
                    {step.tag}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
