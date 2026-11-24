import { redirect } from "next/navigation";

interface AdminPageProps {
  params: {
    slug: string;
  };
}

export default function LegacyTenantAdminPage({ params }: AdminPageProps) {
  redirect(`/admin?slug=${params.slug}`);
}
