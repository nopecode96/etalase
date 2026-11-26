import { notFound } from "next/navigation";
import { resolveStoreSlugByCustomDomain } from "@/lib/custom-domain";
import CoursePage from "@/app/[slug]/learn/[productSlug]/page";

export default async function CustomDomainLearnPage({
  params,
  searchParams,
}: {
  params: { domain: string; productSlug: string };
  searchParams?: { wa?: string };
}) {
  const resolved = await resolveStoreSlugByCustomDomain(params.domain);
  if (!resolved) notFound();
  return (
    <CoursePage
      params={{ slug: resolved.slug, productSlug: params.productSlug }}
      searchParams={searchParams}
    />
  );
}
