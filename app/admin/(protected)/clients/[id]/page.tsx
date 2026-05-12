import Link from "next/link";
import { notFound } from "next/navigation";
import { addNoteAction, deleteClientAction, updateClientAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { WhatsAppButton } from "@/components/admin/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";
import { getClientProfit } from "@/lib/finance";
import { prisma } from "@/lib/prisma";
import { formatDate, formatKzt } from "@/lib/utils";

export default async function ClientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [client, profit] = await Promise.all([
    prisma.client.findUnique({
      where: { id },
      include: {
        projects: { orderBy: { createdAt: "desc" } },
        payments: { orderBy: { paidAt: "desc" }, take: 8 },
        expenses: { orderBy: { spentAt: "desc" }, take: 8 },
        subscriptions: { orderBy: { nextPaymentDate: "asc" } },
        noteItems: { orderBy: { createdAt: "desc" } },
      },
    }),
    getClientProfit(id),
  ]);

  if (!client) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-black text-brand-ink">{client.businessName ?? client.name}</h1>
          <p className="mt-1 text-black/55">{client.niche ?? "Ниша не указана"} · {client.city ?? "город не указан"}</p>
        </div>
        <div className="flex gap-2">
          <StatusBadge value={client.status} />
          <WhatsAppButton phone={client.whatsapp ?? client.phone} />
          <DeleteButton
            id={client.id}
            action={deleteClientAction}
            confirmText="Удалить клиента и связанные проекты, оплаты, расходы и напоминания?"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><p className="text-sm text-black/45">Доход</p><p className="mt-2 text-3xl font-black">{formatKzt(profit.income)}</p></Card>
        <Card><p className="text-sm text-black/45">Расходы</p><p className="mt-2 text-3xl font-black text-red-600">{formatKzt(profit.expenses)}</p></Card>
        <Card><p className="text-sm text-black/45">Прибыль</p><p className="mt-2 text-3xl font-black text-emerald-600">{formatKzt(profit.profit)}</p></Card>
      </div>

      <Card>
        <h2 className="text-xl font-black text-brand-ink">Редактировать клиента</h2>
        <form action={updateClientAction} className="mt-5 grid gap-4 md:grid-cols-2">
          <input type="hidden" name="id" value={client.id} />
          <Label>Имя<Input name="name" defaultValue={client.name} required /></Label>
          <Label>Телефон<Input name="phone" defaultValue={client.phone} required /></Label>
          <Label>Название бизнеса<Input name="businessName" defaultValue={client.businessName ?? ""} /></Label>
          <Label>Контактное лицо<Input name="contactPerson" defaultValue={client.contactPerson ?? ""} /></Label>
          <Label>WhatsApp<Input name="whatsapp" defaultValue={client.whatsapp ?? ""} /></Label>
          <Label>Instagram<Input name="instagram" defaultValue={client.instagram ?? ""} /></Label>
          <Label>Email<Input name="email" type="email" defaultValue={client.email ?? ""} /></Label>
          <Label>Ниша<Input name="niche" defaultValue={client.niche ?? ""} /></Label>
          <Label>Город<Input name="city" defaultValue={client.city ?? ""} /></Label>
          <Label>
            Статус
            <Select name="status" defaultValue={client.status}>
              <option value="active">active</option>
              <option value="paused">paused</option>
              <option value="archived">archived</option>
            </Select>
          </Label>
          <Label className="md:col-span-2">Заметки<Textarea name="notes" defaultValue={client.notes ?? ""} /></Label>
          <Button className="md:col-span-2">Сохранить изменения</Button>
        </form>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-xl font-black text-brand-ink">Проекты</h2>
          <div className="space-y-3">
            {client.projects.map((project) => (
              <Link key={project.id} href={`/admin/projects/${project.id}`} className="block rounded-2xl bg-brand-mist p-4">
                <p className="font-black text-brand-ink">{project.title}</p>
                <p className="mt-1 text-sm text-black/55">{formatKzt(project.launchPrice)} · {project.status}</p>
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-xl font-black text-brand-ink">Обслуживание</h2>
          <div className="space-y-3">
            {client.subscriptions.map((subscription) => (
              <div key={subscription.id} className="rounded-2xl bg-brand-mist p-4">
                <p className="font-black">{formatKzt(subscription.amount)} · {subscription.type}</p>
                <p className="mt-1 text-sm text-black/55">Следующая оплата: {formatDate(subscription.nextPaymentDate)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-black text-brand-ink">Заметки по клиенту</h2>
        <form action={addNoteAction} className="mt-4 grid gap-3">
          <input type="hidden" name="clientId" value={client.id} />
          <Textarea name="body" required placeholder="Например: написать после запуска рекламы" />
          <Button>Добавить заметку</Button>
        </form>
        <div className="mt-6 space-y-3">
          {client.noteItems.map((note) => (
            <div key={note.id} className="rounded-2xl bg-brand-mist p-4">
              <p className="text-sm text-black/55">{formatDate(note.createdAt)}</p>
              <p className="mt-1 font-semibold text-brand-ink">{note.body}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
