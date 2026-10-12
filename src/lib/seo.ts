import type { Tenant, BusinessSector } from "@/generated/prisma";

/**
 * Map BusinessSector ke Schema.org @type
 */
const SECTOR_SCHEMA_TYPE: Record<BusinessSector, string> = {
  AUTOMOTIVE: "AutoDealer",
  PROPERTY: "RealEstateAgent",
  RENTAL: "AutoRental",
  RESTAURANT_CAFE: "Restaurant",
  GENERAL_SERVICE: "DryCleaningOrLaundry",
};

/**
 * Bangun objek JSON-LD Schema.org LocalBusiness untuk tenant.
 */
export function buildLocalBusinessJsonLd(
  tenant: Pick<
    Tenant,
    | "businessName"
    | "sector"
    | "address"
    | "contactEmail"
    | "whatsappNumber"
    | "latitude"
    | "longitude"
    | "seoDescription"
    | "logoUrl"
    | "googleMapsUrl"
    | "customDomain"
    | "geoCity"
    | "geoRegion"
  >
): Record<string, unknown> {
  const schemaType = SECTOR_SCHEMA_TYPE[tenant.sector];

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: tenant.businessName,
    url: `https://${tenant.customDomain}`,
    description: tenant.seoDescription ?? undefined,
  };

  if (tenant.address) {
    jsonLd.address = {
      "@type": "PostalAddress",
      streetAddress: tenant.address,
      addressLocality: tenant.geoCity ?? undefined,
      addressRegion: tenant.geoRegion ?? undefined,
      addressCountry: "ID",
    };
  }

  if (tenant.latitude && tenant.longitude) {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: tenant.latitude,
      longitude: tenant.longitude,
    };
  }

  if (tenant.contactEmail) {
    jsonLd.email = tenant.contactEmail;
  }

  if (tenant.whatsappNumber) {
    jsonLd.telephone = `+${tenant.whatsappNumber}`;
  }

  if (tenant.logoUrl) {
    jsonLd.image = tenant.logoUrl;
    jsonLd.logo = tenant.logoUrl;
  }

  if (tenant.googleMapsUrl) {
    jsonLd.hasMap = tenant.googleMapsUrl;
  }

  return jsonLd;
}

/**
 * Bangun BreadcrumbList JSON-LD.
 */
export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Bangun metadata Next.js untuk halaman publik tenant.
 */
export function buildTenantMetadata(
  tenant: Pick<
    Tenant,
    | "businessName"
    | "seoTitle"
    | "seoDescription"
    | "seoKeywords"
    | "customDomain"
    | "logoUrl"
    | "geoCity"
    | "geoRegion"
    | "latitude"
    | "longitude"
  >,
  overrides?: {
    title?: string;
    description?: string;
    path?: string;
  }
) {
  const title =
    overrides?.title ??
    tenant.seoTitle ??
    `${tenant.businessName} | ${tenant.geoCity ?? "Indonesia"}`;
  const description =
    overrides?.description ??
    tenant.seoDescription ??
    `Website profesional ${tenant.businessName}`;
  const url = `https://${tenant.customDomain}${overrides?.path ?? ""}`;

  return {
    title,
    description,
    keywords: tenant.seoKeywords ?? undefined,
    metadataBase: new URL(`https://${tenant.customDomain}`),
    openGraph: {
      title,
      description,
      url,
      siteName: tenant.businessName,
      locale: "id_ID",
      type: "website" as const,
      images: tenant.logoUrl
        ? [{ url: tenant.logoUrl, alt: tenant.businessName }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
    other: {
      ...(tenant.geoCity
        ? { "geo.placename": tenant.geoCity }
        : {}),
      ...(tenant.geoRegion
        ? { "geo.region": tenant.geoRegion }
        : {}),
      ...(tenant.latitude && tenant.longitude
        ? {
            "geo.position": `${tenant.latitude};${tenant.longitude}`,
            ICBM: `${tenant.latitude}, ${tenant.longitude}`,
          }
        : {}),
    },
  };
}
