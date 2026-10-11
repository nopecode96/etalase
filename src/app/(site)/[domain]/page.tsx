import { notFound } from "next/navigation";
import { getTenantFullByDomain } from "@/services/tenant.service";
import AutomotiveTemplate from "@/components/templates/automotive/AutomotiveTemplate";
import PropertyTemplate from "@/components/templates/property/PropertyTemplate";
import RentalTemplate from "@/components/templates/rental/RentalTemplate";
import RestaurantTemplate from "@/components/templates/restaurant/RestaurantTemplate";
import GeneralTemplate from "@/components/templates/general/GeneralTemplate";

export default async function SitePage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const tenant = await getTenantFullByDomain(domain);

  if (!tenant) {
    notFound();
  }

  // Template selector berdasarkan sektor bisnis tenant
  switch (tenant.sector) {
    case "AUTOMOTIVE":
      return <AutomotiveTemplate tenant={tenant} />;
    case "PROPERTY":
      return <PropertyTemplate tenant={tenant} />;
    case "RENTAL":
      return <RentalTemplate tenant={tenant} />;
    case "RESTAURANT_CAFE":
      return <RestaurantTemplate tenant={tenant} />;
    case "GENERAL_SERVICE":
    default:
      return <GeneralTemplate tenant={tenant} />;
  }
}
