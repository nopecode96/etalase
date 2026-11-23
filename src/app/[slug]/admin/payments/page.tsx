import { redirect } from "next/navigation";

interface StorePaymentsPageProps {
  params: {
    slug: string;
  };
}

export default function StorePaymentsRedirectPage({ params }: StorePaymentsPageProps) {
  redirect(`/${params.slug}/admin?tab=finance`);
}
