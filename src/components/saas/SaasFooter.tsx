import Link from "next/link";
import { MessageCircle, ShieldCheck, Mail, Phone, Lock, Heart } from "lucide-react";

export default function SaasFooter() {
  const waContactMessage = encodeURIComponent(
    "Halo Tim etalase.online! Saya ingin bertanya tentang layanan pembuatan website portofolio."
  );
  const waContactLink = `https://wa.me/62895389974414?text=${waContactMessage}`;

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black text-white tracking-tight">
                etalase<span className="text-blue-500">.online</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed max-w-sm">
              Solusi pembuatan website portofolio dan penangkap prospek terpercaya untuk sales otomotif,
              properti, rental kendaraan, kafe &amp; restoran, serta pebisnis lokal di seluruh Indonesia.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-6">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>100% Menggunakan Domain Mandiri Resmi (.com / .id)</span>
            </div>
          </div>

          {/* Navigasi Kategori */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Kategori Spesialis
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#showcase" className="hover:text-blue-400 transition-colors">
                  Website Sales Mobil &amp; Motor
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-blue-400 transition-colors">
                  Website Rental Mobil &amp; Motor
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-blue-400 transition-colors">
                  Website Agen &amp; Sales Properti
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-blue-400 transition-colors">
                  Website Kafe, Resto &amp; Kuliner
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-blue-400 transition-colors">
                  Website Jasa &amp; Layanan Lokal
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak & Login Klien */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Bantuan &amp; Dasbor
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={waContactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Konsultasi</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:halo@etalase.online"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail size={16} />
                  <span>halo@etalase.online</span>
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-2 rounded-xl text-xs border border-slate-700 transition-colors"
                >
                  <Lock size={14} />
                  <span>Masuk ke Dasbor CMS</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} etalase.online. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            <span>Dibuat dengan dedikasi untuk mendukung kemajuan bisnis lokal Indonesia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
