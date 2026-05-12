import "server-only";

import type { Payment, Project, SubscriptionType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { addMonths, addYears, monthKey, monthLabel, startOfDay } from "@/lib/utils";

export function sumAmounts(items: Array<{ amount: number }>) {
  return items.reduce((total, item) => total + item.amount, 0);
}

export function monthRange(date = new Date()) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return { start, end };
}

export function advancePaymentDate(currentDate: Date | null, paidAt: Date, type: SubscriptionType) {
  const base = currentDate && currentDate > paidAt ? currentDate : paidAt;
  if (type === "yearly") return addYears(base, 1);
  if (type === "monthly") return addMonths(base, 1);
  return currentDate;
}

export function getLaunchSummary(project: Project & { payments: Payment[] }) {
  const paid = sumAmounts(project.payments.filter((payment) => payment.type === "launch_payment"));
  const remaining = Math.max(project.launchPrice - paid, 0);
  return {
    launchPrice: project.launchPrice,
    launchPaidAmount: paid,
    launchRemaining: remaining,
    launchPaid: remaining <= 0,
  };
}

export async function getDashboardData() {
  const now = new Date();
  const today = startOfDay(now);
  const inSevenDays = new Date(today);
  inSevenDays.setDate(inSevenDays.getDate() + 7);
  const { start, end } = monthRange(now);

  const [
    newLeads,
    activeClients,
    activeSubscriptions,
    monthPayments,
    monthExpenses,
    expectedPayments,
    overdueSubscriptions,
    upcomingReminders,
    overdueReminders,
    payments,
    expenses,
  ] = await Promise.all([
    prisma.lead.count({ where: { status: "new" } }),
    prisma.client.count({ where: { status: "active" } }),
    prisma.subscription.count({ where: { status: "active", type: { not: "none" } } }),
    prisma.payment.findMany({ where: { paidAt: { gte: start, lt: end } } }),
    prisma.expense.findMany({ where: { spentAt: { gte: start, lt: end } } }),
    prisma.subscription.findMany({
      where: {
        status: { in: ["active", "overdue"] },
        type: { not: "none" },
        nextPaymentDate: { gte: today, lte: inSevenDays },
      },
      include: { client: true, project: true },
      orderBy: { nextPaymentDate: "asc" },
      take: 8,
    }),
    prisma.subscription.findMany({
      where: {
        status: { in: ["active", "overdue"] },
        type: { not: "none" },
        nextPaymentDate: { lt: today },
      },
      include: { client: true, project: true },
      orderBy: { nextPaymentDate: "asc" },
      take: 8,
    }),
    prisma.reminder.findMany({
      where: { status: "pending", remindAt: { gte: today, lte: inSevenDays } },
      include: { client: true, project: true, subscription: true },
      orderBy: { remindAt: "asc" },
      take: 8,
    }),
    prisma.reminder.findMany({
      where: { status: "pending", remindAt: { lt: today } },
      include: { client: true, project: true, subscription: true },
      orderBy: { remindAt: "asc" },
      take: 8,
    }),
    prisma.payment.findMany({ where: { paidAt: { gte: monthsAgo(6) } } }),
    prisma.expense.findMany({ where: { spentAt: { gte: monthsAgo(6) } } }),
  ]);

  const income = sumAmounts(monthPayments);
  const expenseTotal = sumAmounts(monthExpenses);
  const series = buildMonthlySeries(payments, expenses, 6);

  return {
    cards: {
      newLeads,
      activeClients,
      activeSubscriptions,
      income,
      expenses: expenseTotal,
      profit: income - expenseTotal,
      expectedPayments: expectedPayments.length,
      overduePayments: overdueSubscriptions.length,
      upcomingReminders: upcomingReminders.length + overdueReminders.length,
    },
    series,
    expectedPayments,
    overdueSubscriptions,
    upcomingReminders,
    overdueReminders,
  };
}

export async function getClientProfit(clientId: string) {
  const [payments, expenses] = await Promise.all([
    prisma.payment.findMany({ where: { clientId } }),
    prisma.expense.findMany({ where: { clientId } }),
  ]);

  const income = sumAmounts(payments);
  const costs = sumAmounts(expenses);
  return { income, expenses: costs, profit: income - costs };
}

export async function getProjectProfit(projectId: string) {
  const [payments, expenses] = await Promise.all([
    prisma.payment.findMany({ where: { projectId } }),
    prisma.expense.findMany({ where: { projectId } }),
  ]);

  const income = sumAmounts(payments);
  const costs = sumAmounts(expenses);
  return { income, expenses: costs, profit: income - costs };
}

function monthsAgo(count: number) {
  const date = new Date();
  date.setMonth(date.getMonth() - count + 1, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function buildMonthlySeries(
  payments: Array<{ paidAt: Date; amount: number }>,
  expenses: Array<{ spentAt: Date; amount: number }>,
  months: number,
) {
  const keys = Array.from({ length: months }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - 1 - index), 1);
    return monthKey(date);
  });

  return keys.map((key) => {
    const income = sumAmounts(payments.filter((payment) => monthKey(payment.paidAt) === key));
    const costs = sumAmounts(expenses.filter((expense) => monthKey(expense.spentAt) === key));
    return {
      key,
      label: monthLabel(key),
      income,
      expenses: costs,
      profit: income - costs,
    };
  });
}
