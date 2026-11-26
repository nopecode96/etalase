import { notFound } from "next/navigation";
import { resolveStoreSlugByCustomDomain } from "@/lib/custom-domain";
import TipPage from "@/app/[slug]/tip/page";

export default async function CustomDomainTipPage({
  params,
}: {
  params: { domain: string };
}) {
  const resolved = await resolveStoreSlugByCustomDomain(params.domain);
  if (!resolved) notFound();
  return <TipPage params={{ slug: resolved.slug }} />;
}
