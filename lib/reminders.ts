import "server-only";

import { prisma } from "@/lib/prisma";
import { dateKey, formatDate, formatKzt, startOfDay } from "@/lib/utils";

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

async function createReminderOnce(input: {
  subscriptionId: string;
  clientId: string;
  projectId: string | null;
  type: "payment_due" | "payment_overdue";
  remindAt: Date;
  title: string;
  description: string;
}) {
  const dedupeKey = `${input.subscriptionId}:${input.type}:${dateKey(input.remindAt)}`;
  const existing = await prisma.reminder.findUnique({ where: { dedupeKey } });
  if (existing) return false;

  await prisma.reminder.create({
    data: {
      subscriptionId: input.subscriptionId,
      clientId: input.clientId,
      projectId: input.projectId ?? undefined,
      type: input.type,
      remindAt: input.remindAt,
      title: input.title,
      description: input.description,
      dedupeKey,
    },
  });

  return true;
}
