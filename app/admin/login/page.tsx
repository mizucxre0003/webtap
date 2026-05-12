import { LockKeyhole } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Form";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-brand text-white">
            <LockKeyhole className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-brand-ink">Вход в WebTap CRM</h1>
            <p className="text-sm text-black/55">Закрытая панель владельца</p>
          </div>
        </div>
        <form action={loginAction} className="space-y-4">
          <input type="hidden" name="next" value={params.next ?? "/admin"} />
          <Label>
            Email
            <Input name="email" type="email" required placeholder="admin@webtap.kz" />
          </Label>
          <Label>
            Пароль
            <Input name="password" type="password" required placeholder="••••••••" />
          </Label>
          {error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Не получилось войти. Проверьте email и пароль.
            </p>
          ) : null}
          <Button className="w-full">Войти</Button>
        </form>
        <LinkButton href="/" variant="ghost" className="mt-4 w-full">
          Вернуться на сайт
        </LinkButton>
      </Card>
    </main>
  );
}
