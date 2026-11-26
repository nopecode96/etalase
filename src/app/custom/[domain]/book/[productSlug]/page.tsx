import { notFound } from "next/navigation";
import { resolveStoreSlugByCustomDomain } from "@/lib/custom-domain";
import BookingPage from "@/app/[slug]/book/[productSlug]/page";

export default async function CustomDomainBookPage({
  params,
}: {
  params: { domain: string; productSlug: string };
}) {
  const resolved = await resolveStoreSlugByCustomDomain(params.domain);
  if (!resolved) notFound();
  return <BookingPage params={{ slug: resolved.slug, productSlug: params.productSlug }} />;
}
