import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Building,
  ShieldCheck,
  Zap,
  Globe,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Mail,
} from "lucide-react";
import {
  generateLocalizedMetadata,
  generateBreadcrumbJsonLd,
  BASE_URL,
} from "@/lib/seo/metadata-helper";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";

interface AboutPageProps {
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: AboutPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const titles: Record<SupportedLocale, string> = {
    id: "Tentang Kami — Rafa Kreasindo Teknologi | etalase.online",
    en: "About Us — Rafa Kreasindo Teknologi | etalase.online",
    ms: "Mengenai Kami — Rafa Kreasindo Teknologi | etalase.online",
    th: "เกี่ยวกับเรา — Rafa Kreasindo Teknologi | etalase.online",
    vi: "Về Chúng Tôi — Rafa Kreasindo Teknologi | etalase.online",
  };

  const descriptions: Record<SupportedLocale, string> = {
    id: "Mengenal Rafa Kreasindo Teknologi, pengembang dan pengelola platform etalase.online yang berdedikasi membangun kemandirian transaksi digital di Asia Tenggara.",
    en: "Learn about Rafa Kreasindo Teknologi, the engineering firm and official operator of etalase.online, empowering independent digital commerce in Southeast Asia.",
    ms: "Ketahui mengenai Rafa Kreasindo Teknologi, pembangun dan pengendali platform etalase.online yang memperkasa perniagaan digital di Asia Tenggara.",
    th: "ทำความรู้จักกับ Rafa Kreasindo Teknologi ผู้พัฒนาและผู้ดำเนินงานอย่างเป็นทางการของ etalase.online เพื่อขับเคลื่อนการค้าดิจิทัลในเอเชียตะวันออกเฉียงใต้",
    vi: "Tìm hiểu về Rafa Kreasindo Teknologi, đơn vị phát triển và quản lý chính thức của etalase.online, thúc đẩy thương mại số độc lập tại Đông Nam Á.",
  };

  return generateLocalizedMetadata({
    path: "/about",
    locale,
    title: titles[locale] || titles.id,
    description: descriptions[locale] || descriptions.id,
    type: "website",
    keywords: [
      "tentang etalase online",
      "rafa kreasindo teknologi",
      "profil perusahaan etalase",
      "platform storefront asia tenggara",
    ],
  });
}

export default function AboutPage({ searchParams }: AboutPageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  const aboutTranslations = {
    id: {
      breadcrumbHome: "Beranda",
      breadcrumbAbout: "Tentang Kami",
      badge: "Profil Entitas Resmi",
      h1: "Membangun Ekosistem Jualan Digital Mandiri di Asia Tenggara.",
      subtitle:
        "etalase.online dikembangkan dan dikelola sepenuhnya oleh Rafa Kreasindo Teknologi untuk membebaskan pebisnis lokal dari jeratan komisi tinggi dan ketergantungan marketplace.",
      entityBadge: "Entitas Pengembang & Pengelola",
      whoWeAreTitle: "Siapa Rafa Kreasindo Teknologi?",
      whoWeAreDesc1:
        "Rafa Kreasindo Teknologi adalah badan teknologi dan rekayasa perangkat lunak modern yang berfokus menghadirkan infrastruktur e-commerce mandiri untuk kreator konten, penjual produk digital, konsultan showroom, dan UMKM di seluruh Asia Tenggara.",
      whoWeAreDesc2:
        "Kami percaya bahwa setiap pemilik bisnis berhak atas 100% margin keuntungan dan data pelanggan mereka sendiri tanpa dipotong komisi sepihak atau dibatasi oleh format link teks kaku era lampau.",
      bullet1: "Pengembangan internal berkelanjutan dengan arsitektur Next.js & Prisma modern.",
      bullet2: "Didukung tim insinyur perangkat lunak dan spesialis e-commerce Asia Tenggara.",
      valuesTitle: "Prinsip Inti & Komitmen Kami",
      values: [
        {
          title: "0% Komisi Order Chat",
          desc: "Kami tidak pernah memotong komisi transaksi dari pesanan yang masuk via WhatsApp, LINE, atau chat langsung.",
          icon: ShieldCheck,
        },
        {
          title: "Otomasi FinTech Instan",
          desc: "Mengintegrasikan settlement QRIS BorderPay 2 detik dan pengiriman otomatis berkas digital langsung ke WhatsApp pembeli.",
          icon: Zap,
        },
        {
          title: "Desain Warm Editorial",
          desc: "Setiap storefront dirancang berkarakter dan modern dengan standar mobile-first agar calon pembeli merasa percaya seketika.",
          icon: Sparkles,
        },
        {
          title: "Jangkauan Pasar Regional",
          desc: "Mendukung transaksi dan kebutuhan lokal di Indonesia, Malaysia, Singapura, Thailand, dan Vietnam.",
          icon: Globe,
        },
      ],
      legalTitle: "Informasi Entitas & Kantor Operasional",
      cardDevLabel: "Badan Pengembang & Pengelola",
      companyName: "Rafa Kreasindo Teknologi",
      platformLabel: "Platform: etalase.online",
      cardOfficeLabel: "Kantor Operasional",
      operationalOffice: "Bandung Digital Hub, Jawa Barat, Indonesia",
      countryName: "Indonesia",
      cardPartnershipLabel: "Korespondensi & Kemitraan",
      officialEmail: "halo@etalase.online",
      cardSupportLabel: "Dukungan Teknis & Merchant",
      supportEmail: "support@etalase.online",
      ctaTitle: "Mulai Bangun Toko Mandiri Anda Hari Ini",
      ctaDesc:
        "Daftar gratis dalam 30 detik pakai akun Google. Tanpa kartu kredit, tanpa kontrak mengikat, dan langsung aktif.",
      ctaBtn: "Buat Etalase Sekarang",
      ctaContactBtn: "Hubungi Tim Kami",
    },
    en: {
      breadcrumbHome: "Home",
      breadcrumbAbout: "About Us",
      badge: "Official Entity Profile",
      h1: "Empowering Independent Digital Commerce Across Southeast Asia.",
      subtitle:
        "etalase.online is engineered and operated exclusively by Rafa Kreasindo Teknologi to liberate local merchants from exorbitant marketplace commissions and platform lock-in.",
      entityBadge: "Development & Operating Entity",
      whoWeAreTitle: "Who is Rafa Kreasindo Teknologi?",
      whoWeAreDesc1:
        "Rafa Kreasindo Teknologi is a modern software engineering and technology entity focused on building sovereign e-commerce infrastructure for creators, digital merchants, auto showroom consultants, and SMBs across Southeast Asia.",
      whoWeAreDesc2:
        "We believe business owners deserve 100% of their margins and full customer data ownership without paying hefty marketplace fees or being constrained by dull text links.",
      bullet1: "Continuous internal engineering powered by modern Next.js & Prisma architecture.",
      bullet2: "Backed by software engineers and Southeast Asian e-commerce growth specialists.",
      valuesTitle: "Our Core Principles & Commitment",
      values: [
        {
          title: "0% Chat Order Commissions",
          desc: "We never take revenue cuts from orders processed through direct WhatsApp, LINE, or chat channels.",
          icon: ShieldCheck,
        },
        {
          title: "Instant FinTech Automation",
          desc: "Integrating 2-second QRIS verification and automated digital asset dispatch to buyer WhatsApp accounts.",
          icon: Zap,
        },
        {
          title: "Warm Editorial Aesthetics",
          desc: "Every storefront features refined mobile-first visual architecture designed to establish instant consumer trust.",
          icon: Sparkles,
        },
        {
          title: "Regional SEA Footprint",
          desc: "Tailored to native commerce behaviors across Indonesia, Malaysia, Singapore, Thailand, and Vietnam.",
          icon: Globe,
        },
      ],
      legalTitle: "Official Corporate & Operational Details",
      cardDevLabel: "Developer & Operator Entity",
      companyName: "Rafa Kreasindo Teknologi",
      platformLabel: "Platform: etalase.online",
      cardOfficeLabel: "Operational Office",
      operationalOffice: "Bandung Digital Hub, West Java, Indonesia",
      countryName: "Indonesia",
      cardPartnershipLabel: "Correspondence & Partnerships",
      officialEmail: "halo@etalase.online",
      cardSupportLabel: "Technical & Merchant Support",
      supportEmail: "support@etalase.online",
      ctaTitle: "Launch Your Sovereign Storefront Today",
      ctaDesc:
        "Get started in 30 seconds with your Google account. No credit card required, zero platform lock-in.",
      ctaBtn: "Create Free Storefront",
      ctaContactBtn: "Contact Our Team",
    },
    ms: {
      breadcrumbHome: "Utama",
      breadcrumbAbout: "Mengenai Kami",
      badge: "Profil Entiti Rasmi",
      h1: "Membina Ekosistem Jualan Digital Berdikari di Asia Tenggara.",
      subtitle:
        "etalase.online dibangunkan dan dikendalikan sepenuhnya oleh Rafa Kreasindo Teknologi untuk membebaskan peniaga daripada potongan komisen pasaran yang tinggi.",
      entityBadge: "Entiti Pembangun & Pengendali",
      whoWeAreTitle: "Siapakah Rafa Kreasindo Teknologi?",
      whoWeAreDesc1:
        "Rafa Kreasindo Teknologi ialah entiti kejuruteraan perisian yang berdedikasi membina infrastruktur e-dagang berdaulat untuk pencipta dan perniagaan di seluruh Asia Tenggara.",
      whoWeAreDesc2:
        "Kami percaya pemilik perniagaan berhak memiliki 100% margin keuntungan dan data pelanggan mereka sendiri.",
      bullet1: "Pembangunan dalaman berterusan dengan seni bina moden Next.js & Prisma.",
      bullet2: "Disokong oleh jurutera perisian dan pakar e-dagang Asia Tenggara.",
      valuesTitle: "Prinsip Teras Kami",
      values: [
        {
          title: "0% Komisen Pesanan Chat",
          desc: "Tiada sebarang potongan komisen bagi pesanan melalui saluran chat WhatsApp.",
          icon: ShieldCheck,
        },
        {
          title: "Automasi FinTech Pantas",
          desc: "Pengesahan QR pantas 2 saat dan penghantaran fail digital terus ke WhatsApp pembeli.",
          icon: Zap,
        },
        {
          title: "Estetika Warm Editorial",
          desc: "Reka bentuk mobile-first yang kemas untuk meningkatkan keyakinan pembeli.",
          icon: Sparkles,
        },
        {
          title: "Liputan Pasaran Serantau",
          desc: "Menyokong keperluan perniagaan di Indonesia, Malaysia, Singapura, Thailand dan Vietnam.",
          icon: Globe,
        },
      ],
      legalTitle: "Maklumat Entiti & Pejabat Operasi",
      cardDevLabel: "Badan Pembangun & Pengendali",
      companyName: "Rafa Kreasindo Teknologi",
      platformLabel: "Platform: etalase.online",
      cardOfficeLabel: "Pejabat Operasi",
      operationalOffice: "Bandung Digital Hub, Jawa Barat, Indonesia",
      countryName: "Indonesia",
      cardPartnershipLabel: "Surat-Menyurat & Perkongsian",
      officialEmail: "halo@etalase.online",
      cardSupportLabel: "Sokongan Teknikal & Peniaga",
      supportEmail: "support@etalase.online",
      ctaTitle: "Mula Bina Kedai Digital Anda Hari Ini",
      ctaDesc:
        "Daftar percuma dalam 30 saat dengan akaun Google anda tanpa kad kredit.",
      ctaBtn: "Bina Etalase Percuma",
      ctaContactBtn: "Hubungi Kami",
    },
    th: {
      breadcrumbHome: "หน้าแรก",
      breadcrumbAbout: "เกี่ยวกับเรา",
      badge: "ข้อมูลองค์กรอย่างเป็นทางการ",
      h1: "สร้างระบบนิเวศการค้าดิจิทัลที่เป็นอิสระในเอเชียตะวันออกเฉียงใต้",
      subtitle:
        "etalase.online ได้รับการพัฒนาและดำเนินการโดย Rafa Kreasindo Teknologi เพื่อปลดล็อกร้านค้าจากค่าคอมมิชชันที่สูงเกินไปของมาร์เก็ตเพลส",
      entityBadge: "หน่วยงานพัฒนาและดำเนินงาน",
      whoWeAreTitle: "Rafa Kreasindo Teknologi คือใคร?",
      whoWeAreDesc1:
        "Rafa Kreasindo Teknologi คือบริษัทวิศวกรรมซอฟต์แวร์ที่มุ่งเน้นการสร้างโครงสร้างพื้นฐานอีคอมเมิร์ซสำหรับครีเอเตอร์และธุรกิจทั่วเอเชียตะวันออกเฉียงใต้",
      whoWeAreDesc2:
        "เราเชื่อมั่นว่าเจ้าของธุรกิจควรได้รับผลกำไรเต็ม 100% และเป็นเจ้าของฐานข้อมูลลูกค้าของตนเองอย่างสมบูรณ์",
      bullet1: "การพัฒนาภายในอย่างต่อเนื่องด้วยสถาปัตยกรรม Next.js และ Prisma ที่ทันสมัย",
      bullet2: "ขับเคลื่อนโดยวิศวกรซอฟต์แวร์และผู้เชี่ยวชาญด้านอีคอมเมิร์ซในเอเชียตะวันออกเฉียงใต้",
      valuesTitle: "หลักการสำคัญของเรา",
      values: [
        {
          title: "0% ค่าคอมมิชชันคำสั่งซื้อทางแชต",
          desc: "ไม่มีการหักค่าคอมมิชชันจากคำสั่งซื้อผ่าน WhatsApp หรือแชตโดยตรง",
          icon: ShieldCheck,
        },
        {
          title: "ระบบอัตโนมัติ FinTech รวดเร็ว",
          desc: "ตรวจจับยอดชำระเงินใน 2 วินาที และส่งมอบสินค้าดิจิทัลถึง WhatsApp ทันที",
          icon: Zap,
        },
        {
          title: "การออกแบบ Warm Editorial",
          desc: "หน้าร้านสวยงาม ใช้งานง่ายบนมือถือ เพื่อสร้างความน่าเชื่อถือทันตา",
          icon: Sparkles,
        },
        {
          title: "ครอบคลุมทั่วภูมิภาค",
          desc: "ออกแบบให้สอดคล้องกับพฤติกรรมการซื้อขายในอินโดนีเซีย มาเลเซีย สิงคโปร์ ไทย และเวียดนาม",
          icon: Globe,
        },
      ],
      legalTitle: "ข้อมูลบริษัทและสำนักงานปฏิบัติการ",
      cardDevLabel: "หน่วยงานพัฒนาและดำเนินงาน",
      companyName: "Rafa Kreasindo Teknologi",
      platformLabel: "แพลตฟอร์ม: etalase.online",
      cardOfficeLabel: "สำนักงานปฏิบัติการ",
      operationalOffice: "Bandung Digital Hub, ชวาตะวันตก, อินโดนีเซีย",
      countryName: "อินโดนีเซีย",
      cardPartnershipLabel: "การติดต่อและความร่วมมือ",
      officialEmail: "halo@etalase.online",
      cardSupportLabel: "ฝ่ายสนับสนุนเทคนิคและร้านค้า",
      supportEmail: "support@etalase.online",
      ctaTitle: "เริ่มสร้างหน้าร้านของคุณวันนี้",
      ctaDesc: "สมัครฟรีใน 30 วินาทีด้วยบัญชี Google ไม่ต้องใช้บัตรเครดิต",
      ctaBtn: "สร้างหน้าร้านฟรี",
      ctaContactBtn: "ติดต่อเรา",
    },
    vi: {
      breadcrumbHome: "Trang chủ",
      breadcrumbAbout: "Về Chúng Tôi",
      badge: "Hồ Sơ Doanh Nghiệp Chính Thức",
      h1: "Xây Dựng Hệ Sinh Thái Bán Hàng Số Độc Lập Tại Đông Nam Á",
      subtitle:
        "etalase.online được phát triển và vận hành bởi Rafa Kreasindo Teknologi nhằm trao quyền tự chủ tối đa cho người kinh doanh trực tuyến.",
      entityBadge: "Đơn vị phát triển & quản trị",
      whoWeAreTitle: "Rafa Kreasindo Teknologi Là Ai?",
      whoWeAreDesc1:
        "Rafa Kreasindo Teknologi là đơn vị công nghệ phần mềm chuyên xây dựng hạ tầng thương mại điện tử độc lập cho nhà sáng tạo và doanh nghiệp tại Đông Nam Á.",
      whoWeAreDesc2:
        "Chúng tôi tin rằng người bán xứng đáng giữ trọn 100% lợi nhuận và sở hữu toàn bộ dữ liệu khách hàng của mình mà không bị chi phối bởi các sàn trung gian.",
      bullet1: "Phát triển nội bộ liên tục với kiến trúc Next.js và Prisma hiện đại.",
      bullet2: "Được hỗ trợ bởi đội ngũ kỹ sư phần mềm và chuyên gia thương mại điện tử Đông Nam Á.",
      valuesTitle: "Giá Trị Cốt Lõi Của Chúng Tôi",
      values: [
        {
          title: "0% Hoa Hồng Đơn Hàng Chat",
          desc: "Không thu bất kỳ khoản hoa hồng nào từ các giao dịch chốt qua WhatsApp và tin nhắn.",
          icon: ShieldCheck,
        },
        {
          title: "Tự Động Hóa Thanh Toán Nhanh",
          desc: "Xác thực thanh toán trong 2 giây và tự động gửi tài liệu kỹ thuật số qua WhatsApp.",
          icon: Zap,
        },
        {
          title: "Thiết Kế Warm Editorial",
          desc: "Giao diện tối ưu di động sang trọng giúp gia tăng uy tín thương hiệu ngay từ cái nhìn đầu tiên.",
          icon: Sparkles,
        },
        {
          title: "Phù Hợp Thị Trường Đông Nam Á",
          desc: "Thiết kế đo ni đóng giày cho thị trường Indonesia, Malaysia, Singapore, Thái Lan và Việt Nam.",
          icon: Globe,
        },
      ],
      legalTitle: "Thông Tin Pháp Lý & Trụ Sở Hoạt Động",
      cardDevLabel: "Đơn vị phát triển & quản trị",
      companyName: "Rafa Kreasindo Teknologi",
      platformLabel: "Nền tảng: etalase.online",
      cardOfficeLabel: "Trụ sở hoạt động",
      operationalOffice: "Bandung Digital Hub, Tây Java, Indonesia",
      countryName: "Indonesia",
      cardPartnershipLabel: "Liên hệ & Hợp tác",
      officialEmail: "halo@etalase.online",
      cardSupportLabel: "Hỗ trợ kỹ thuật & người bán",
      supportEmail: "support@etalase.online",
      ctaTitle: "Bắt Đầu Xây Dựng Storefront Ngay Hôm Nay",
      ctaDesc: "Đăng ký miễn phí sau 30 giây bằng Google. Không cần thẻ tín dụng.",
      ctaBtn: "Tạo Storefront Miễn Phí",
      ctaContactBtn: "Liên Hệ Chúng Tôi",
    },
  };

  const content = aboutTranslations[locale] || aboutTranslations.id;

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: content.breadcrumbHome, url: "/" },
    { name: content.breadcrumbAbout, url: getLocalizedHref("/about") },
  ]);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: content.h1,
    description: content.subtitle,
    url: `${BASE_URL}${locale === "id" ? "" : `/${locale}`}/about`,
    publisher: {
      "@type": "Organization",
      name: "Rafa Kreasindo Teknologi",
      legalName: "Rafa Kreasindo Teknologi",
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
      email: "halo@etalase.online",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bandung",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <GlobalHeader />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          <nav aria-label="Breadcrumb" className="text-xs text-[#57534E] flex items-center gap-2">
            <Link href={locale === "id" ? "/" : `/${locale}`} className="hover:text-[#D94E28] transition">
              {content.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#1C1917]">
              {content.breadcrumbAbout}
            </span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="pt-10 pb-14 px-4 sm:px-6 text-center max-w-4xl mx-auto">
          <ScrollReveal direction="up" delay={50}>
            <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
              <Building className="w-3.5 h-3.5" />
              <span>{content.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-5 leading-[1.18]">
              {content.h1}
            </h1>
            <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>
          </ScrollReveal>
        </section>

        {/* Narrative Section: Who is Rafa Kreasindo Teknologi */}
        <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <div className="bg-white border border-[#E7E5E4] rounded-3xl p-8 sm:p-12 shadow-xs space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] px-3 py-1 rounded-full">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{content.entityBadge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
              {content.whoWeAreTitle}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#57534E] leading-relaxed">
              <p>{content.whoWeAreDesc1}</p>
              <p>{content.whoWeAreDesc2}</p>
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#E7E5E4] text-xs text-[#57534E]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                <span>{content.bullet1}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D94E28] shrink-0 mt-0.5" />
                <span>{content.bullet2}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
              {content.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-3 hover:border-[#D94E28]/40 transition"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center font-bold">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1917]">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Legal & Operational Information Box */}
        <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <div className="bg-[#FAF8F5] border-2 border-[#E7E5E4] rounded-3xl p-8 sm:p-10 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917]">
              {content.legalTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-1 bg-white p-4 rounded-2xl border border-[#E7E5E4]">
                <span className="text-[11px] uppercase font-bold text-[#57534E] block">
                  {content.cardDevLabel}
                </span>
                <span className="font-bold text-[#1C1917] text-base block">
                  {content.companyName}
                </span>
                <span className="text-xs text-[#57534E] block">
                  {content.platformLabel}
                </span>
              </div>

              <div className="space-y-1 bg-white p-4 rounded-2xl border border-[#E7E5E4]">
                <span className="text-[11px] uppercase font-bold text-[#57534E] block">
                  {content.cardOfficeLabel}
                </span>
                <span className="font-semibold text-[#1C1917] block">
                  {content.operationalOffice}
                </span>
                <span className="text-xs text-[#57534E] block">
                  {content.countryName}
                </span>
              </div>

              <div className="space-y-1 bg-white p-4 rounded-2xl border border-[#E7E5E4]">
                <span className="text-[11px] uppercase font-bold text-[#57534E] block">
                  {content.cardPartnershipLabel}
                </span>
                <a
                  href={`mailto:${content.officialEmail}`}
                  className="font-bold text-[#D94E28] hover:underline block"
                >
                  {content.officialEmail}
                </a>
              </div>

              <div className="space-y-1 bg-white p-4 rounded-2xl border border-[#E7E5E4]">
                <span className="text-[11px] uppercase font-bold text-[#57534E] block">
                  {content.cardSupportLabel}
                </span>
                <a
                  href={`mailto:${content.supportEmail}`}
                  className="font-bold text-[#D94E28] hover:underline block"
                >
                  {content.supportEmail}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Box */}
        <section className="py-12 pb-24 px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <div className="bg-[#FDF0EC] border border-[#FADCD3] rounded-3xl p-8 sm:p-12 text-center shadow-xs space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white border border-[#FADCD3] text-[#D94E28] text-xs font-semibold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rafa Kreasindo Teknologi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
              {content.ctaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] max-w-md mx-auto leading-relaxed">
              {content.ctaDesc}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={getLocalizedHref("/register")}
                className="w-full sm:w-auto bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-xs inline-flex items-center justify-center gap-2"
              >
                <span>{content.ctaBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={getLocalizedHref("/kontak")}
                className="w-full sm:w-auto bg-white hover:bg-stone-50 border border-[#E7E5E4] text-[#1C1917] font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm transition"
              >
                {content.ctaContactBtn}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
