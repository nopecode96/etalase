import { notFound } from "next/navigation";
import { prisma, serializePlain } from "@/lib/db/prisma";
import TipClient from "./TipClient";

interface TipPageProps {
  params: {
    slug: string;
  };
}

export default async function TipPage({ params }: TipPageProps) {
  const { slug } = params;

  const store = await prisma.store.findUnique({
    where: { slug },
    select: {
      slug: true,
      name: true,
      avatarUrl: true,
      isActive: true,
    },
  });

  if (!store || !store.isActive) {
    if (slug === "demo") {
      return (
        <TipClient
          storeSlug={slug}
          storeName="Studio Demo Creative"
          avatarUrl="/images/demo/avatar-rafa.jpg"
        />
      );
    }
    notFound();
  }

  const serialized = serializePlain(store);

  return (
    <TipClient
      storeSlug={serialized.slug}
      storeName={serialized.name}
      avatarUrl={serialized.avatarUrl}
    />
  );
}
