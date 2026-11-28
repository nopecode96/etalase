import { notFound } from "next/navigation";
import { getCourseContent } from "@/services/creator-features";
import LearnClient from "./LearnClient";

interface CoursePageProps {
  params: {
    slug: string;
    productSlug: string;
  };
  searchParams?: {
    wa?: string;
    order?: string;
  };
}

export default async function CoursePage({ params, searchParams }: CoursePageProps) {
  const { slug, productSlug } = params;
  const buyerWa = searchParams?.wa;
  const orderNumber = searchParams?.order;

  let courseData = null;

  try {
    const res = await getCourseContent(slug, productSlug, buyerWa, orderNumber);
    if (res.success && res.data) {
      courseData = res.data;
    }
  } catch {
    // Fallback if db is unavailable
  }

  if (!courseData) {
    if (slug === "demo") {
      courseData = {
        hasAccess: false,
        productTitle: "Masterclass Creator SEA: Dari 0 ke $1,000 Pertama",
        description: "Panduan lengkap membangun visual storefront dan automasi direct checkout untuk pasar Asia Tenggara.",
        modules: [
          {
            id: "mod-1",
            title: "Modul 1: Mindset & Riset Niche Konten Asia Tenggara",
            duration: "14:20",
            videoUrl: "https://etalase.online/templates",
            isFreePreview: true,
          },
          {
            id: "mod-2",
            title: "Modul 2: Setup Etalase & Custom Domain Profesional",
            duration: "21:45",
            videoUrl: undefined,
            isFreePreview: false,
          },
          {
            id: "mod-3",
            title: "Modul 3: Funnel WhatsApp & Integrasi Borderpay QRIS",
            duration: "30:10",
            videoUrl: undefined,
            isFreePreview: false,
          },
        ],
      };
    } else {
      notFound();
    }
  }

  return (
    <LearnClient
      storeSlug={slug}
      productSlug={productSlug}
      initialData={courseData}
    />
  );
}
