import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { Sidebar } from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/Button";
import { ToastFromQuery } from "@/components/ui/Toast";

export function AdminLayout({
  children,
  admin,
}: {
  children: React.ReactNode;
  admin: { name: string; email: string };
}) {
  return (
    <div className="min-h-screen bg-brand-mist text-brand-ink">
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-black/5 bg-brand-mist/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">WebTap CRM</p>
                <p className="text-sm text-black/55">{admin.email}</p>
              </div>
              <form action={logoutAction}>
                <Button variant="secondary" className="min-h-10 px-4">
                  <LogOut className="size-4" />
                  Выйти
                </Button>
              </form>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
      <ToastFromQuery />
    </div>
  );
}
