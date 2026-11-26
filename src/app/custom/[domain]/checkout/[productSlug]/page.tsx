import { notFound } from "next/navigation";
import { resolveStoreSlugByCustomDomain } from "@/lib/custom-domain";
import CheckoutPage from "@/app/[slug]/checkout/[productSlug]/page";

interface CustomCheckoutPageProps {
  params: {
    domain: string;
    productSlug: string;
  };
  searchParams?: {
    paypal_status?: string;
    token?: string;
    orderCode?: string;
  };
}

export default async function CustomDomainCheckoutPage({
  params,
  searchParams,
}: CustomCheckoutPageProps) {
  const resolved = await resolveStoreSlugByCustomDomain(params.domain);
  if (!resolved) {
    notFound();
  }
  return (
    <CheckoutPage
      params={{ slug: resolved.slug, productSlug: params.productSlug }}
      searchParams={searchParams}
    />
  );
}
