import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  return <AdminLayout admin={admin}>{children}</AdminLayout>;
}
