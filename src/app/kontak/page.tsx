import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Mail,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Headphones,
  FileText,
  LifeBuoy,
} from "lucide-react";
import {
  generateLocalizedMetadata,
  generateBreadcrumbJsonLd,
  BASE_URL,
} from "@/lib/seo/metadata-helper";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";

interface KontakPageProps {
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: KontakPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const titles: Record<SupportedLocale, string> = {
    id: "Kontak Resmi — Rafa Kreasindo Teknologi | etalase.online",
    en: "Official Contact — Rafa Kreasindo Teknologi | etalase.online",
    ms: "Hubungi Kami — Rafa Kreasindo Teknologi | etalase.online",
    th: "ติดต่อเรา — Rafa Kreasindo Teknologi | etalase.online",
    vi: "Liên Hệ Chính Thức — Rafa Kreasindo Teknologi | etalase.online",
  };

  const descriptions: Record<SupportedLocale, string> = {
    id: "Hubungi saluran korespondensi dan bantuan resmi Rafa Kreasindo Teknologi untuk pertanyaan akun, bantuan teknis, kemitraan, dan layanan Terima Beres (DFY).",
    en: "Contact official support and correspondence channels of Rafa Kreasindo Teknologi for technical help, enterprise partnerships, and DFY concierge services.",
    ms: "Saluran rasmi Rafa Kreasindo Teknologi untuk bantuan teknikal, perkongsian pintar dan perkhidmatan Terima Beres (DFY).",
    th: "ช่องทางติดต่ออย่างเป็นทางการของ Rafa Kreasindo Teknologi สำหรับความช่วยเหลือด้านเทคนิค ความร่วมมือทางธุรกิจ และบริการ DFY",
    vi: "Kênh liên hệ chính thức của Rafa Kreasindo Teknologi hỗ trợ kỹ thuật, hợp tác doanh nghiệp và dịch vụ trọn gói DFY.",
  };

  return generateLocalizedMetadata({
    path: "/kontak",
    locale,
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    type: "website",
    keywords: [
      "kontak etalase online",
      "customer support rafa kreasindo",
      "bantuan etalase",
      "email resmi etalase online",
    ],
  });
}

export default function KontakPage({ searchParams }: KontakPageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  const contactTranslations = {
    id: {
      breadcrumbHome: "Beranda",
      breadcrumbContact: "Kontak",
      badge: "Saluran Resmi Pengelola",
      h1: "Kami Siap Mendukung Pertumbuhan Bisnis Anda.",
      subtitle:
        "Punya kendala teknis, pertanyaan integrasi, atau ingin berkonsultasi mengenai paket Terima Beres? Tim Rafa Kreasindo Teknologi siap membantu.",
      card1Badge: "Helpdesk & Support Prioritas",
      card1Title: "Pusat Bantuan & Tiket CS Prioritas",
      card1Desc:
        "Gunakan saluran dukungan tiket terpadu untuk respon cepat dari tim teknisi kami. Melayani kendala integrasi domain, setup QRIS BorderPay, dan verifikasi akun.",
      hoursTitle: "Waktu Operasional Tim Bantuan:",
      hours1: "Senin - Sabtu: 08:00 - 21:00 WIB",
      hours2: "Minggu & Hari Libur: 09:00 - 17:00 WIB",
      helpDeskBtn: "Kirim Tiket Bantuan ke support@etalase.online",
      helpCenterBtn: "Kunjungi Pusat Bantuan & Dokumentasi",
      card2Badge: "Korespondensi Resmi",
      card2Title: "Korespondensi Resmi Per Divisi",
      card2Desc:
        "Pilih divisi terkait untuk memastikan surat atau penawaran Anda ditangani oleh tim yang tepat:",
      deptGeneral: "Pertanyaan Umum & Informasi Layanan",
      deptSales: "Kemitraan, Komunitas & Layanan DFY",
      deptBilling: "Faktur Pajak & Verifikasi Keuangan",
      legalNotice:
        "Pengelola Resmi: Rafa Kreasindo Teknologi • Bandung Digital Hub, Jawa Barat, Indonesia.",
    },
    en: {
      breadcrumbHome: "Home",
      breadcrumbContact: "Contact",
      badge: "Official Correspondence Channels",
      h1: "We are Here to Support Your Business Growth.",
      subtitle:
        "Have technical questions, domain setup inquiries, or interested in our Done-For-You (DFY) service? The Rafa Kreasindo Teknologi team is ready to assist.",
      card1Badge: "Help Desk & Priority Support",
      card1Title: "Help Desk & Priority Support Ticket",
      card1Desc:
        "Connect directly with our engineering support team for rapid resolution of domain routing, BorderPay QRIS settlements, and account verifications.",
      hoursTitle: "Support Operational Hours (GMT+7):",
      hours1: "Monday - Saturday: 08:00 - 21:00 WIB",
      hours2: "Sunday & Holidays: 09:00 - 17:00 WIB",
      helpDeskBtn: "Submit Support Ticket to support@etalase.online",
      helpCenterBtn: "Visit Help Center & Documentation",
      card2Badge: "Official Correspondence",
      card2Title: "Departmental Corporate Correspondence",
      card2Desc:
        "Direct your inquiry to the dedicated department to ensure expedited processing:",
      deptGeneral: "General Inquiries & Platform Onboarding",
      deptSales: "Enterprise Partnerships & DFY Concierge",
      deptBilling: "Tax Invoices & Financial Verification",
      legalNotice:
        "Official Operator: Rafa Kreasindo Teknologi • Bandung Digital Hub, West Java, Indonesia.",
    },
    ms: {
      breadcrumbHome: "Utama",
      breadcrumbContact: "Hubungi Kami",
      badge: "Saluran Rasmi Pengendali",
      h1: "Kami Bersedia Menyokong Pertumbuhan Perniagaan Anda.",
      subtitle:
        "Sebarang pertanyaan teknikal, bantuan persediaan domain, atau perkhidmatan DFY? Pasukan Rafa Kreasindo Teknologi sedia membantu.",
      card1Badge: "Pusat Bantuan & Sokongan Keutamaan",
      card1Title: "Pusat Bantuan & Tiket Keutamaan",
      card1Desc:
        "Hubungi jurutera sokongan kami untuk penyelesaian pantas berkenaan domain, penyelesaian QRIS dan akaun.",
      hoursTitle: "Waktu Operasi Bantuan:",
      hours1: "Isnin - Sabtu: 08:00 - 21:00 WIB",
      hours2: "Ahad & Cuti Umum: 09:00 - 17:00 WIB",
      helpDeskBtn: "Hantar Tiket ke support@etalase.online",
      helpCenterBtn: "Lawati Pusat Bantuan & Dokumentasi",
      card2Badge: "Surat-Menyurat Rasmi",
      card2Title: "Surat-Menyurat Mengikut Bahagian",
      card2Desc: "Pilih bahagian yang berkaitan untuk memproses pertanyaan anda dengan pantas:",
      deptGeneral: "Pertanyaan Umum & Sokongan Akaun",
      deptSales: "Perkongsian Pintar & Servis DFY",
      deptBilling: "Invois Cukai & Pengesahan Kewangan",
      legalNotice:
        "Pengendali Rasmi: Rafa Kreasindo Teknologi • Bandung Digital Hub, Jawa Barat, Indonesia.",
    },
    th: {
      breadcrumbHome: "หน้าแรก",
      breadcrumbContact: "ติดต่อเรา",
      badge: "ช่องทางติดต่ออย่างเป็นทางการ",
      h1: "เราพร้อมสนับสนุนการเติบโตของธุรกิจคุณ",
      subtitle:
        "มีข้อสงสัยทางเทคนิค การตั้งค่าโดเมน หรือบริการ DFY? ทีมงาน Rafa Kreasindo Teknologi พร้อมช่วยเหลือคุณ",
      card1Badge: "ศูนย์ช่วยเหลือและการสนับสนุนเร่งด่วน",
      card1Title: "ศูนย์ช่วยเหลือและแจ้งปัญหาเร่งด่วน",
      card1Desc:
        "ติดต่อทีมวิศวกรของเราโดยตรงเพื่อแก้ไขปัญหาการเชื่อมต่อโดเมน ระบบชำระเงิน QRIS และการยืนยันบัญชี",
      hoursTitle: "เวลาทำการของทีมสนับสนุน:",
      hours1: "จันทร์ - เสาร์: 08:00 - 21:00 น. (GMT+7)",
      hours2: "อาทิตย์และวันหยุด: 09:00 - 17:00 น. (GMT+7)",
      helpDeskBtn: "ส่งข้อความถึง support@etalase.online",
      helpCenterBtn: "ไปที่ศูนย์ช่วยเหลือและคู่มือการใช้งาน",
      card2Badge: "การติดต่ออย่างเป็นทางการ",
      card2Title: "การติดต่อแยกตามแผนกงาน",
      card2Desc: "เลือกแผนกที่เกี่ยวข้องเพื่อให้เรื่องของคุณได้รับการจัดการอย่างรวดเร็วที่สุด:",
      deptGeneral: "สอบถามข้อมูลทั่วไปและการใช้งาน",
      deptSales: "ความร่วมมือทางธุรกิจและบริการ DFY",
      deptBilling: "ใบกำกับภาษีและการตรวจสอบการเงิน",
      legalNotice:
        "ผู้ดำเนินงานอย่างเป็นทางการ: Rafa Kreasindo Teknologi • Bandung Digital Hub, อินโดนีเซีย",
    },
    vi: {
      breadcrumbHome: "Trang chủ",
      breadcrumbContact: "Liên Hệ",
      badge: "Kênh Liên Hệ Chính Thức",
      h1: "Chúng Tôi Sẵn Sàng Đồng Hành Cùng Doanh Nghiệp Bạn.",
      subtitle:
        "Bạn có thắc mắc kỹ thuật, cấu hình tên miền, hoặc dịch vụ trọn gói DFY? Đội ngũ Rafa Kreasindo Teknologi luôn sẵn sàng hỗ trợ.",
      card1Badge: "Bộ phận Hỗ trợ & Tiếp nhận ưu tiên",
      card1Title: "Trung Tâm Trợ Giúp & Hỗ Trợ Kỹ Thuật",
      card1Desc:
        "Kết nối trực tiếp với đội ngũ kỹ thuật để được hỗ trợ nhanh chóng về cấu hình tên miền riêng và xác thực thanh toán QRIS.",
      hoursTitle: "Thời Gian Hỗ Trợ Trực Tuyến:",
      hours1: "Thứ Hai - Thứ Bảy: 08:00 - 21:00 (GMT+7)",
      hours2: "Chủ Nhật & Ngày Lễ: 09:00 - 17:00 (GMT+7)",
      helpDeskBtn: "Gửi yêu cầu đến support@etalase.online",
      helpCenterBtn: "Truy cập Trung tâm Trợ giúp & Tài liệu",
      card2Badge: "Thư tín chính thức",
      card2Title: "Hòm Thư Liên Hệ Theo Bộ Phận",
      card2Desc: "Lựa chọn bộ phận phù hợp để thư của bạn được xử lý nhanh chóng nhất:",
      deptGeneral: "Thắc mắc chung & Hỗ trợ tài khoản",
      deptSales: "Hợp tác đối tác & Dịch vụ trọn gói DFY",
      deptBilling: "Hóa đơn & Đối soát thanh toán",
      legalNotice:
        "Đơn vị quản lý chính thức: Rafa Kreasindo Teknologi • Bandung Digital Hub, Indonesia.",
    },
  };

  const copy = contactTranslations[locale] || contactTranslations.id;

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: copy.breadcrumbHome, url: "/" },
    { name: copy.breadcrumbContact, url: getLocalizedHref("/kontak") },
  ]);

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: copy.h1,
    description: copy.subtitle,
    url: `${BASE_URL}${locale === "id" ? "" : `/${locale}`}/kontak`,
    mainEntity: {
      "@type": "Organization",
      name: "Rafa Kreasindo Teknologi",
      legalName: "Rafa Kreasindo Teknologi",
      url: BASE_URL,
      email: "halo@etalase.online",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@etalase.online",
          availableLanguage: ["Indonesian", "English", "Malay", "Thai", "Vietnamese"],
        },
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "sales@etalase.online",
        },
        {
          "@type": "ContactPoint",
          contactType: "billing support",
          email: "billing@etalase.online",
        },
      ],
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <GlobalHeader />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          <nav aria-label="Breadcrumb" className="text-xs text-[#57534E] flex items-center gap-2">
            <Link href={locale === "id" ? "/" : `/${locale}`} className="hover:text-[#D94E28] transition">
              {copy.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#1C1917]">
              {copy.breadcrumbContact}
            </span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="pt-10 pb-12 px-4 sm:px-6 text-center max-w-3xl mx-auto">
          <ScrollReveal direction="up" delay={50}>
            <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
              <Building className="w-3.5 h-3.5" />
              <span>{copy.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4 leading-[1.18]">
              {copy.h1}
            </h1>
            <p className="text-[#57534E] text-base sm:text-lg leading-relaxed">
              {copy.subtitle}
            </p>
          </ScrollReveal>
        </section>

        {/* 2 Main Columns */}
        <section className="pb-24 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: Official Support & Priority Ticket */}
            <div className="bg-white border-2 border-[#D94E28] rounded-3xl p-8 sm:p-10 shadow-lg space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] px-3 py-1 rounded-full">
                  {copy.card1Badge}
                </span>

                <h2 className="text-2xl font-bold text-[#1C1917]">
                  {copy.card1Title}
                </h2>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  {copy.card1Desc}
                </p>

                <div className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl space-y-2 text-xs text-[#57534E]">
                  <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                    <Clock className="w-4 h-4 text-[#D94E28]" />
                    <span>{copy.hoursTitle}</span>
                  </div>
                  <div className="pl-6 space-y-0.5">
                    <div>{copy.hours1}</div>
                    <div>{copy.hours2}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href="mailto:support@etalase.online?subject=Bantuan%20Akun%20etalase.online"
                  className="w-full bg-[#D94E28] hover:bg-[#B83E1D] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Headphones className="w-4 h-4 shrink-0" />
                  <span>{copy.helpDeskBtn}</span>
                </a>

                <Link
                  href={getLocalizedHref("/bantuan")}
                  className="w-full bg-[#FAF8F5] hover:bg-stone-100 text-[#1C1917] border border-[#E7E5E4] py-3 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <LifeBuoy className="w-4 h-4 text-[#D94E28]" />
                  <span>{copy.helpCenterBtn}</span>
                </Link>
              </div>
            </div>

            {/* Card 2: Department Correspondence */}
            <div className="bg-white border border-[#E7E5E4] rounded-3xl p-8 sm:p-10 shadow-2xs space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#57534E] bg-stone-100 px-3 py-1 rounded-full">
                  {copy.card2Badge}
                </span>

                <h2 className="text-2xl font-bold text-[#1C1917]">
                  {copy.card2Title}
                </h2>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  {copy.card2Desc}
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href="mailto:halo@etalase.online"
                    className="p-3.5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl flex items-center justify-between text-xs hover:border-[#D94E28] transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#D94E28] shrink-0" />
                      <div>
                        <div className="font-bold text-[#1C1917]">halo@etalase.online</div>
                        <div className="text-[11px] text-[#57534E]">{copy.deptGeneral}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#D94E28] transition shrink-0" />
                  </a>

                  <a
                    href="mailto:sales@etalase.online?subject=Kemitraan%20dan%20DFY%20etalase.online"
                    className="p-3.5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl flex items-center justify-between text-xs hover:border-[#D94E28] transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Building className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <div className="font-bold text-[#1C1917]">sales@etalase.online</div>
                        <div className="text-[11px] text-[#57534E]">{copy.deptSales}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-blue-600 transition shrink-0" />
                  </a>

                  <a
                    href="mailto:billing@etalase.online?subject=Penagihan%20dan%20Faktur%20etalase.online"
                    className="p-3.5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl flex items-center justify-between text-xs hover:border-[#D94E28] transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-bold text-[#1C1917]">billing@etalase.online</div>
                        <div className="text-[11px] text-[#57534E]">{copy.deptBilling}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-emerald-600 transition shrink-0" />
                  </a>
                </div>
              </div>

              <div className="text-[11px] text-[#57534E] pt-4 border-t border-[#E7E5E4] leading-relaxed">
                {copy.legalNotice}
              </div>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
