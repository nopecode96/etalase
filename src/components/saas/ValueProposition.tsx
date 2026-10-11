import { ShieldCheck, Clock, MapPin, MessageSquareShare } from "lucide-react";

export default function ValueProposition() {
  const benefits = [
    {
      icon: ShieldCheck,
      color: "from-blue-500 to-indigo-600",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      title: "Lebih Dipercaya Pembeli",
      description:
        "Konsumen mobil, properti, atau rental sering ragu bertransaksi jika Anda hanya menggunakan akun sosmed biasa. Memiliki website resmi dengan nama domain sendiri membangun reputasi dan trust instan.",
    },
    {
      icon: Clock,
      color: "from-amber-500 to-orange-600",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      title: "Katalog & Simulasi Selalu Siap 24 Jam",
      description:
        "Calon pembeli bisa leluasa mengecek stok unit, foto detail, spesifikasi lengkap, hingga hitungan simulasi cicilan atau tarif rental kapan saja, tanpa perlu menunggu balasan manual dari Anda.",
    },
    {
      icon: MapPin,
      color: "from-emerald-500 to-teal-600",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      title: "Mudah Ditemukan Pembeli Lokal (Google SEO)",
      description:
        "Website dirancang dengan optimasi pencarian lokal Google, membantu Anda tampil di halaman pertama saat warga kota mencari 'Sales Mobil [Kota]', 'Sewa Mobil Terdekat', atau 'Perumahan [Kota]'.",
    },
    {
      icon: MessageSquareShare,
      color: "from-purple-500 to-pink-600",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      title: "Semua Calon Pembeli Masuk ke WhatsApp",
      description:
        "Setiap formulir langsung mencatat nama dan nomor HP prospek ke dasbor Anda, lalu otomatis membuka chat WhatsApp pribadi Anda dengan format pesan rapi siap tindak lanjuti.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50 relative border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-blue-600 bg-blue-100/60 border border-blue-200 px-3.5 py-1 rounded-full">
            Kenapa Wajib Punya Website Sendiri?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight">
            Tingkatkan Closing Penjualan Anda dengan Identitas Resmi
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Di era digital, pembeli mencari informasi dan membandingkan penjual sebelum memutuskan transaksi.
            Inilah 4 alasan rekan sales dan pebisnis lokal beralih ke etalase.online:
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md mb-6`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
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
