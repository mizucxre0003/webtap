import { updateSettingsAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Form";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const settings =
    (await prisma.settings.findFirst()) ??
    ({
      brandName: "WebTap",
      defaultLaunchPrice: 49990,
      defaultMonthlySupportPrice: 4990,
      defaultYearlySupportPrice: 51990,
      whatsapp: process.env.WHATSAPP_PHONE ?? "",
      email: "hello@webtap.kz",
    } as const);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-ink">Настройки</h1>
        <p className="mt-1 text-black/55">Базовые цены и контакты WebTap.</p>
      </div>
      <Card>
        <form action={updateSettingsAction} className="grid gap-4 md:grid-cols-2">
          <Label>Название бренда<Input name="brandName" defaultValue={settings.brandName} /></Label>
          <Label>Цена запуска по умолчанию<Input name="defaultLaunchPrice" type="number" defaultValue={settings.defaultLaunchPrice} /></Label>
          <Label>Месячное обслуживание<Input name="defaultMonthlySupportPrice" type="number" defaultValue={settings.defaultMonthlySupportPrice} /></Label>
          <Label>Годовое обслуживание<Input name="defaultYearlySupportPrice" type="number" defaultValue={settings.defaultYearlySupportPrice} /></Label>
          <Label>Мой WhatsApp<Input name="whatsapp" defaultValue={settings.whatsapp ?? ""} /></Label>
          <Label>Мой email<Input name="email" type="email" defaultValue={settings.email ?? ""} /></Label>
          <Button className="md:col-span-2">Сохранить настройки</Button>
        </form>
      </Card>
    </div>
  );
}
