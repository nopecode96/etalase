import SaasNavbar from "@/components/saas/SaasNavbar";
import HeroSection from "@/components/saas/HeroSection";
import ValueProposition from "@/components/saas/ValueProposition";
import CategoryShowcase from "@/components/saas/CategoryShowcase";
import HowItWorks from "@/components/saas/HowItWorks";
import PricingSection from "@/components/saas/PricingSection";
import FaqSection from "@/components/saas/FaqSection";
import SaasFooter from "@/components/saas/SaasFooter";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";

export default function SaasHomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* 1. Header Navigation */}
      <SaasNavbar />

      {/* 2. Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero Banner & Trust Badges */}
        <HeroSection />

        {/* Section 2: Masalah & Solusi (Value Proposition) */}
        <ValueProposition />

        {/* Section 3: Interactive Showcase per Kategori Bisnis */}
        <CategoryShowcase />

        {/* Section 4: Alur Pemesanan 3 Langkah Mudah */}
        <div id="cara-kerja">
          <HowItWorks />
        </div>

        {/* Section 5: Paket Harga Tunggal & Transparan (Flagship) */}
        <PricingSection />

        {/* Section 6: Tanya Jawab / FAQ Bahasa Awam */}
        <div id="faq">
          <FaqSection />
        </div>
      </main>

      {/* 3. Footer */}
      <SaasFooter />

      {/* 4. Floating WhatsApp CTA Widget */}
      <FloatingWhatsApp
        whatsappNumber="62895389974414"
        businessName="etalase.online"
        themeColor="#25D366"
      />
    </div>
  );
}
