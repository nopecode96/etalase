import HargaPage from "../harga/page";

interface PricingPageProps {
  searchParams?: {
    lang?: string;
  };
}

export default async function PricingPage({ searchParams }: PricingPageProps) {
  return <HargaPage searchParams={searchParams} />;
}
