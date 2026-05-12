import Link from "next/link";
import { notFound } from "next/navigation";
import { addNoteAction, updateProjectAction } from "@/app/admin/actions";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";
import { getLaunchSummary, getProjectProfit } from "@/lib/finance";
import { prisma } from "@/lib/prisma";
import { formatDate, formatKzt, toDateInput } from "@/lib/utils";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, clients, profit] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        payments: { orderBy: { paidAt: "desc" } },
        expenses: { orderBy: { spentAt: "desc" } },
        subscriptions: true,
        noteItems: { orderBy: { createdAt: "desc" } },
      },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    getProjectProfit(id),
  ]);

  if (!project) notFound();
  const launch = getLaunchSummary(project);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-black text-brand-ink">{project.title}</h1>
          <p className="mt-1 text-black/55">
            <Link href={`/admin/clients/${project.clientId}`} className="font-semibold text-brand-dark">
              {project.client.businessName ?? project.client.name}
            </Link>{" "}
            · {formatDate(project.createdAt)}
          </p>
        </div>
        <StatusBadge value={project.status} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-black/45">Стоимость запуска</p><p className="mt-2 text-2xl font-black">{formatKzt(launch.launchPrice)}</p></Card>
        <Card><p className="text-sm text-black/45">Оплачено за запуск</p><p className="mt-2 text-2xl font-black">{formatKzt(launch.launchPaidAmount)}</p></Card>
        <Card><p className="text-sm text-black/45">Остаток</p><p className="mt-2 text-2xl font-black text-red-600">{formatKzt(launch.launchRemaining)}</p></Card>
        <Card><p className="text-sm text-black/45">Прибыль</p><p className="mt-2 text-2xl font-black text-emerald-600">{formatKzt(profit.profit)}</p></Card>
      </div>

      <Card>
        <h2 className="text-xl font-black text-brand-ink">Редактировать проект</h2>
        <form action={updateProjectAction} className="mt-5 grid gap-4 md:grid-cols-2">
          <input type="hidden" name="id" value={project.id} />
          <Label>
            Клиент
            <Select name="clientId" defaultValue={project.clientId}>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>{client.businessName ?? client.name}</option>
              ))}
            </Select>
          </Label>
          <Label>Название<Input name="title" defaultValue={project.title} required /></Label>
          <Label>
            Статус
            <Select name="status" defaultValue={project.status}>
              <option value="brief">brief</option>
              <option value="design">design</option>
              <option value="development">development</option>
              <option value="waiting_payment">waiting_payment</option>
              <option value="launched">launched</option>
              <option value="support">support</option>
              <option value="paused">paused</option>
              <option value="closed">closed</option>
            </Select>
          </Label>
          <Label>Стоимость запуска<Input name="launchPrice" type="number" defaultValue={project.launchPrice} min={0} /></Label>
          <Label>Начало<Input name="launchStartedAt" type="date" defaultValue={toDateInput(project.launchStartedAt)} /></Label>
          <Label>Дата запуска<Input name="launchedAt" type="date" defaultValue={toDateInput(project.launchedAt)} /></Label>
          <Label>Ссылка<Input name="websiteUrl" defaultValue={project.websiteUrl ?? ""} /></Label>
          <Label>Домен<Input name="domain" defaultValue={project.domain ?? ""} /></Label>
          <Label>Хостинг<Input name="hosting" defaultValue={project.hosting ?? ""} /></Label>
          <Label className="md:col-span-2">Описание<Textarea name="description" defaultValue={project.description ?? ""} /></Label>
          <Label className="md:col-span-2">Заметки<Textarea name="notes" defaultValue={project.notes ?? ""} /></Label>
          <Button className="md:col-span-2">Сохранить проект</Button>
        </form>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-xl font-black text-brand-ink">Оплаты проекта</h2>
          <div className="space-y-3">
            {project.payments.map((payment) => (
              <div key={payment.id} className="rounded-2xl bg-brand-mist p-4">
                <p className="font-black">{formatKzt(payment.amount)} · {payment.type}</p>
                <p className="mt-1 text-sm text-black/55">{formatDate(payment.paidAt)}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-xl font-black text-brand-ink">Расходы проекта</h2>
          <div className="space-y-3">
            {project.expenses.map((expense) => (
              <div key={expense.id} className="rounded-2xl bg-red-50 p-4">
                <p className="font-black text-red-700">{formatKzt(expense.amount)} · {expense.category}</p>
                <p className="mt-1 text-sm text-red-700/70">{formatDate(expense.spentAt)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-black text-brand-ink">Заметки по проекту</h2>
        <form action={addNoteAction} className="mt-4 grid gap-3">
          <input type="hidden" name="projectId" value={project.id} />
          <Textarea name="body" required placeholder="Что нужно сделать по проекту?" />
          <Button>Добавить заметку</Button>
        </form>
        <div className="mt-6 space-y-3">
          {project.noteItems.map((note) => (
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
