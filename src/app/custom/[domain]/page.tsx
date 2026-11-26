import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveStoreSlugByCustomDomain } from "@/lib/custom-domain";
import StorefrontPage, {
  generateMetadata as generateStorefrontMetadata,
} from "@/app/[slug]/page";

interface CustomDomainPageProps {
  params: {
    domain: string;
  };
}

export async function generateMetadata({
  params,
}: CustomDomainPageProps): Promise<Metadata> {
  const resolved = await resolveStoreSlugByCustomDomain(params.domain);
  if (!resolved) {
    return {
      title: "Store Not Found",
      robots: { index: false, follow: false },
    };
  }
  return generateStorefrontMetadata({ params: { slug: resolved.slug } });
}

export default async function CustomDomainStorefrontPage({
  params,
}: CustomDomainPageProps) {
  const resolved = await resolveStoreSlugByCustomDomain(params.domain);
  if (!resolved) {
    notFound();
  }
  return <StorefrontPage params={{ slug: resolved.slug }} />;
}
