import "server-only";

import { expenseCategoryLabels, labelFrom } from "@/lib/admin-labels";
import { prisma } from "@/lib/prisma";
import { addMonths, dateKey, formatDate, formatKzt, startOfDay } from "@/lib/utils";

export async function generateAutomationReminders(now = new Date()) {
  const [payments, recurringExpenses] = await Promise.all([
    generatePaymentReminders(now),
    generateRecurringExpenseReminders(now),
  ]);

  return {
    payments,
    recurringExpenses,
    checked: payments.checked + recurringExpenses.checked,
    created: payments.created + recurringExpenses.created,
    overdue: payments.overdue + recurringExpenses.overdue,
  };
}

export async function generatePaymentReminders(now = new Date()) {
  const today = startOfDay(now);
  const subscriptions = await prisma.subscription.findMany({
    where: {
      status: { in: ["active", "overdue"] },
      type: { not: "none" },
      nextPaymentDate: { not: null },
    },
    include: { client: true, project: true },
  });

  let created = 0;
  let overdue = 0;

  for (const subscription of subscriptions) {
    if (!subscription.nextPaymentDate) continue;

    const dueDate = startOfDay(subscription.nextPaymentDate);
    const daysUntil = Math.round((dueDate.getTime() - today.getTime()) / 86_400_000);

    if (daysUntil === 3 || daysUntil === 0) {
      const wasCreated = await createReminderOnce({
        subscriptionId: subscription.id,
        clientId: subscription.clientId,
        projectId: subscription.projectId,
        type: "payment_due",
        remindAt: dueDate,
        title: `Написать клиенту ${subscription.client.name} в WhatsApp`,
        description: `Написать клиенту ${subscription.client.name} в WhatsApp: скоро оплата обслуживания ${formatKzt(subscription.amount)}. Дата оплаты: ${formatDate(dueDate)}.`,
        dedupeKey: `${subscription.id}:payment_due:${dateKey(dueDate)}`,
      });
      if (wasCreated) created += 1;
    }

    if (daysUntil < 0) {
      const wasCreated = await createReminderOnce({
        subscriptionId: subscription.id,
        clientId: subscription.clientId,
        projectId: subscription.projectId,
        type: "payment_overdue",
        remindAt: today,
        title: `Просрочена оплата: ${subscription.client.name}`,
        description: `Клиент ${subscription.client.name} просрочил оплату обслуживания ${formatKzt(subscription.amount)}. Нужно написать в WhatsApp.`,
        dedupeKey: `${subscription.id}:payment_overdue:${dateKey(today)}`,
      });

      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: "overdue" },
      });

      if (wasCreated) created += 1;
      overdue += 1;
    }
  }

  return { checked: subscriptions.length, created, overdue };
}

export async function generateRecurringExpenseReminders(now = new Date()) {
  const today = startOfDay(now);
  const recurringExpenses = await prisma.recurringExpense.findMany({
    where: { status: "active" },
    include: { client: true, project: true },
  });

  let created = 0;
  let overdue = 0;

  for (const item of recurringExpenses) {
    const dueDate = startOfDay(item.nextExpenseDate);
    const daysUntil = Math.round((dueDate.getTime() - today.getTime()) / 86_400_000);
    const shouldRemind = daysUntil === item.reminderDaysBefore || daysUntil === 0;

    if (shouldRemind) {
      const wasCreated = await createReminderOnce({
        recurringExpenseId: item.id,
        clientId: item.clientId,
        projectId: item.projectId,
        type: "project_task",
        remindAt: dueDate,
        title: `Оплатить расход по проекту ${item.project.title}`,
        description: `Запланированный расход ${formatKzt(item.amount)} (${labelFrom(expenseCategoryLabels, item.category)}). Дата оплаты: ${formatDate(dueDate)}.`,
        dedupeKey: `${item.id}:expense_due:${dateKey(dueDate)}`,
      });
      if (wasCreated) created += 1;
    }

    if (daysUntil < 0) {
      const wasCreated = await createReminderOnce({
        recurringExpenseId: item.id,
        clientId: item.clientId,
        projectId: item.projectId,
        type: "project_task",
        remindAt: today,
        title: `Просрочен расход по проекту ${item.project.title}`,
        description: `Нужно оплатить или отметить расход ${formatKzt(item.amount)} (${labelFrom(expenseCategoryLabels, item.category)}). Плановая дата: ${formatDate(dueDate)}.`,
        dedupeKey: `${item.id}:expense_overdue:${dateKey(today)}`,
      });
      if (wasCreated) created += 1;
      overdue += 1;
    }
  }

  return { checked: recurringExpenses.length, created, overdue };
}

export function nextRecurringExpenseDate(currentDate: Date, dayOfMonth: number) {
  const next = addMonths(currentDate, 1);
  next.setDate(Math.min(Math.max(dayOfMonth, 1), 28));
  return startOfDay(next);
}

async function createReminderOnce(input: {
  subscriptionId?: string;
  recurringExpenseId?: string;
  clientId: string;
  projectId: string | null;
  type: "payment_due" | "payment_overdue" | "project_task";
  remindAt: Date;
  title: string;
  description: string;
  dedupeKey: string;
}) {
  const existing = await prisma.reminder.findUnique({ where: { dedupeKey: input.dedupeKey } });
  if (existing) return false;

  await prisma.reminder.create({
    data: {
      subscriptionId: input.subscriptionId,
      recurringExpenseId: input.recurringExpenseId,
      clientId: input.clientId,
      projectId: input.projectId ?? undefined,
      type: input.type,
      remindAt: input.remindAt,
      title: input.title,
      description: input.description,
      dedupeKey: input.dedupeKey,
    },
  });

  return true;
}
