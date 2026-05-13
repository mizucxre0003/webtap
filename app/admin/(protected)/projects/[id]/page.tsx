import Link from "next/link";
import { notFound } from "next/navigation";
import {
  addNoteAction,
  createProjectExpenseAction,
  createRecurringExpenseAction,
  deleteProjectAction,
  deleteRecurringExpenseAction,
  markRecurringExpensePaidAction,
  updateProjectAction,
} from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";
import {
  expenseCategoryLabels,
  expenseCategoryOptions,
  labelFrom,
  projectStatusOptions,
} from "@/lib/admin-labels";
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
        recurringExpenses: { orderBy: { nextExpenseDate: "asc" } },
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
        <div className="flex flex-wrap gap-2">
          <StatusBadge value={project.status} />
          <DeleteButton
            id={project.id}
            action={deleteProjectAction}
            confirmText="Удалить проект вместе с оплатами, расходами, обслуживанием и напоминаниями?"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-black/45">Стоимость запуска</p><p className="mt-2 text-2xl font-black">{formatKzt(launch.launchPrice)}</p></Card>
        <Card><p className="text-sm text-black/45">Оплачено за запуск</p><p className="mt-2 text-2xl font-black">{formatKzt(launch.launchPaidAmount)}</p></Card>
        <Card><p className="text-sm text-black/45">Остаток</p><p className="mt-2 text-2xl font-black text-red-600">{formatKzt(launch.launchRemaining)}</p></Card>
        <Card><p className="text-sm text-black/45">Прибыль</p><p className="mt-2 text-2xl font-black text-emerald-600">{formatKzt(profit.profit)}</p></Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">Быстрое действие</p>
            <h2 className="mt-1 text-xl font-black text-brand-ink">Добавить расход за месяц</h2>
            <p className="mt-1 text-sm text-black/50">Расход сразу привяжется к клиенту и проекту.</p>
          </div>
          <form action={createProjectExpenseAction} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="projectId" value={project.id} />
            <input type="hidden" name="currency" value="KZT" />
            <Label>
              Категория
              <Select name="category" defaultValue="hosting">
                {expenseCategoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </Label>
            <Label>Сумма<Input name="amount" type="number" min={1} required placeholder="4990" /></Label>
            <Label>Дата расхода<Input name="spentAt" type="date" defaultValue={toDateInput(new Date())} required /></Label>
            <Label>Напомнить позже<Input name="remindAt" type="date" /></Label>
            <Label className="md:col-span-2">Комментарий<Textarea name="comment" placeholder="Например: хостинг за май" /></Label>
            <Button className="md:col-span-2">Добавить расход</Button>
          </form>
        </Card>

        <Card>
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-brand">Автоматизация</p>
            <h2 className="mt-1 text-xl font-black text-brand-ink">Ежемесячный расход</h2>
            <p className="mt-1 text-sm text-black/50">CRM сама будет напоминать, а кнопка “оплачено” создаст расход.</p>
          </div>
          <form action={createRecurringExpenseAction} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="projectId" value={project.id} />
            <input type="hidden" name="currency" value="KZT" />
            <input type="hidden" name="status" value="active" />
            <Label>
              Категория
              <Select name="category" defaultValue="hosting">
                {expenseCategoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </Label>
            <Label>Сумма<Input name="amount" type="number" min={1} required placeholder="4990" /></Label>
            <Label>День месяца<Input name="dayOfMonth" type="number" min={1} max={28} defaultValue={5} /></Label>
            <Label>Следующая оплата<Input name="nextExpenseDate" type="date" defaultValue={toDateInput(new Date())} required /></Label>
            <Label>Напомнить за дней<Input name="reminderDaysBefore" type="number" min={0} max={14} defaultValue={3} /></Label>
            <Label className="md:col-span-2">Комментарий<Textarea name="comment" placeholder="Например: Koyeb, домен, подписка на сервис" /></Label>
            <Button className="md:col-span-2">Автоматизировать расход</Button>
          </form>
        </Card>
      </div>

      <Card>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-black text-brand-ink">Ежемесячные расходы проекта</h2>
            <p className="text-sm text-black/50">Когда расход оплачен, нажми “Оплачено” — запись создастся сама.</p>
          </div>
        </div>
        {project.recurringExpenses.length ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {project.recurringExpenses.map((item) => (
              <div key={item.id} className="rounded-3xl bg-brand-mist p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black text-brand-ink">{labelFrom(expenseCategoryLabels, item.category)}</p>
                      <StatusBadge value={item.status} />
                    </div>
                    <p className="mt-1 text-sm text-black/55">
                      {formatKzt(item.amount)} · следующая оплата {formatDate(item.nextExpenseDate)}
                    </p>
                    <p className="mt-1 text-sm text-black/45">
                      напоминание за {item.reminderDaysBefore} дн. · день месяца {item.dayOfMonth}
                    </p>
                    {item.comment ? <p className="mt-2 text-sm font-semibold text-brand-dark">{item.comment}</p> : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <form action={markRecurringExpensePaidAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <Button variant="secondary" className="min-h-10 px-3">Оплачено</Button>
                    </form>
                    <DeleteButton
                      id={item.id}
                      action={deleteRecurringExpenseAction}
                      compact
                      confirmText="Удалить ежемесячный расход и его будущие напоминания?"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="Ежемесячные расходы не настроены" description="Добавьте хостинг, домен, сервисы или подрядчика один раз." />
        )}
      </Card>

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
              {projectStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
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
                <p className="font-black text-red-700">{formatKzt(expense.amount)} · {labelFrom(expenseCategoryLabels, expense.category)}</p>
                <p className="mt-1 text-sm text-red-700/70">
                  {formatDate(expense.spentAt)} · {monthLabel(expense.spentAt)}
                </p>
                {expense.comment ? <p className="mt-2 text-sm text-red-700/70">{expense.comment}</p> : null}
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

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("ru-KZ", {
    month: "long",
    year: "numeric",
  }).format(date);
}
