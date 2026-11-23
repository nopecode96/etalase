import { redirect } from "next/navigation";

export default function AdminPaymentsRedirectPage() {
  redirect("/demo/admin?tab=finance");
}
