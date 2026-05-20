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
      instagram: "https://instagram.com/",
      telegram: "https://t.me/",
    } as const);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-ink">Настройки</h1>
        <p className="mt-1 text-black/55">
          Базовые цены и контакты WebTap, которые отображаются на лендинге.
        </p>
      </div>
      <Card>
        <form action={updateSettingsAction} className="grid gap-4 md:grid-cols-2">
          <Label>
            Название бренда
            <Input name="brandName" defaultValue={settings.brandName} />
          </Label>
          <Label>
            Цена запуска по умолчанию
            <Input name="defaultLaunchPrice" type="number" defaultValue={settings.defaultLaunchPrice} />
          </Label>
          <Label>
            Месячное обслуживание
            <Input name="defaultMonthlySupportPrice" type="number" defaultValue={settings.defaultMonthlySupportPrice} />
          </Label>
          <Label>
            Годовое обслуживание
            <Input name="defaultYearlySupportPrice" type="number" defaultValue={settings.defaultYearlySupportPrice} />
          </Label>
          <Label>
            WhatsApp
            <Input name="whatsapp" placeholder="+77000000000" defaultValue={settings.whatsapp ?? ""} />
          </Label>
          <Label>
            Email
            <Input name="email" type="email" placeholder="hello@webtap.kz" defaultValue={settings.email ?? ""} />
          </Label>
          <Label>
            Instagram
            <Input name="instagram" placeholder="https://instagram.com/webtap" defaultValue={settings.instagram ?? ""} />
          </Label>
          <Label>
            Telegram
            <Input name="telegram" placeholder="https://t.me/webtap" defaultValue={settings.telegram ?? ""} />
          </Label>
          <Button className="md:col-span-2">Сохранить настройки</Button>
        </form>
      </Card>
    </div>
  );
}
