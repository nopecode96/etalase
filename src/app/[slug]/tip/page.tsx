import TipClient from "./TipClient";

interface TipPageProps {
  params: {
    slug: string;
  };
}

export default async function TipPage({ params }: TipPageProps) {
  const { slug } = params;

  return (
    <TipClient
      storeSlug={slug}
      storeName={slug === "demo" ? "Studio Demo Kreator" : slug}
      avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    />
  );
}
