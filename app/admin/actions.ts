"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearSessionCookie,
  createSession,
  requireAdmin,
  setSessionCookie,
  validateOrBootstrapAdmin,
} from "@/lib/auth";
import { expenseCategoryLabels, labelFrom } from "@/lib/admin-labels";
import { prisma } from "@/lib/prisma";
import { advancePaymentDate } from "@/lib/finance";
import { nextRecurringExpenseDate } from "@/lib/reminders";
import {
  clientSchema,
  expenseSchema,
  leadStatusSchema,
  loginSchema,
  noteSchema,
  paymentSchema,
  projectSchema,
  publicLeadSchema,
  recurringExpenseSchema,
  reminderSchema,
  reviewSchema,
  settingsSchema,
  subscriptionSchema,
} from "@/lib/validations";

function values(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

function withToast(path: string, toast = "saved") {
  redirect(`${path}${path.includes("?") ? "&" : "?"}toast=${toast}`);
}

export async function loginAction(formData: FormData) {
  const next = String(formData.get("next") || "/admin");
  const parsed = loginSchema.safeParse(values(formData));
  if (!parsed.success) redirect("/admin/login?error=invalid");

  const admin = await validateOrBootstrapAdmin(parsed.data.email, parsed.data.password);
  if (!admin) redirect("/admin/login?error=credentials");

  const token = await createSession({ adminId: admin.id, email: admin.email });
  await setSessionCookie(token);
  redirect(`${next}?toast=login`);
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function createLeadAction(formData: FormData) {
  await requireAdmin();
  const data = publicLeadSchema.parse(values(formData));
  await prisma.lead.create({ data });
  revalidatePath("/admin/leads");
  withToast("/admin/leads", "created");
}

export async function updateLeadStatusAction(formData: FormData) {
  await requireAdmin();
  const { id, status } = leadStatusSchema.parse(values(formData));
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
  withToast(`/admin/leads/${id}`, "updated");
}

export async function addNoteAction(formData: FormData) {
  await requireAdmin();
  const data = noteSchema.parse(values(formData));
  await prisma.note.create({ data });
  if (data.leadId) {
    revalidatePath(`/admin/leads/${data.leadId}`);
    withToast(`/admin/leads/${data.leadId}`, "created");
  }
  if (data.clientId) {
    revalidatePath(`/admin/clients/${data.clientId}`);
    withToast(`/admin/clients/${data.clientId}`, "created");
  }
  if (data.projectId) {
    revalidatePath(`/admin/projects/${data.projectId}`);
    withToast(`/admin/projects/${data.projectId}`, "created");
  }
  withToast("/admin", "created");
}

export async function createClientFromLeadAction(formData: FormData) {
  await requireAdmin();
  const leadId = String(formData.get("leadId") ?? "");
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) redirect("/admin/leads");

  const client = await prisma.client.create({
    data: {
      name: lead.name,
      contactPerson: lead.name,
      phone: lead.phone,
      whatsapp: lead.phone,
      niche: lead.businessNiche,
      notes: lead.comment,
    },
  });

  await prisma.lead.update({ where: { id: lead.id }, data: { status: "won" } });
  revalidatePath("/admin/leads");
  revalidatePath("/admin/clients");
  withToast(`/admin/clients/${client.id}`, "created");
}

export async function createClientAction(formData: FormData) {
  await requireAdmin();
  const data = clientSchema.parse(values(formData));
  const client = await prisma.client.create({ data });
  revalidatePath("/admin/clients");
  withToast(`/admin/clients/${client.id}`, "created");
}

export async function updateClientAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = clientSchema.parse(values(formData));
  await prisma.client.update({ where: { id }, data });
  revalidatePath(`/admin/clients/${id}`);
  revalidatePath("/admin/clients");
  withToast(`/admin/clients/${id}`, "updated");
}

export async function createProjectAction(formData: FormData) {
  await requireAdmin();
  const data = projectSchema.parse(values(formData));
  const project = await prisma.project.create({ data });
  revalidatePath("/admin/projects");
  withToast(`/admin/projects/${project.id}`, "created");
}

export async function updateProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = projectSchema.parse(values(formData));
  await prisma.project.update({ where: { id }, data });
  revalidatePath(`/admin/projects/${id}`);
  revalidatePath("/admin/projects");
  withToast(`/admin/projects/${id}`, "updated");
}

export async function createSubscriptionAction(formData: FormData) {
  await requireAdmin();
  const data = subscriptionSchema.parse(values(formData));
  await prisma.subscription.create({ data });
  revalidatePath("/admin/subscriptions");
  withToast("/admin/subscriptions", "created");
}

export async function updateSubscriptionStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "active") as
    | "active"
    | "overdue"
    | "paused"
    | "cancelled";
  await prisma.subscription.update({ where: { id }, data: { status } });
  revalidatePath("/admin/subscriptions");
  withToast("/admin/subscriptions", "updated");
}

export async function createPaymentAction(formData: FormData) {
  await requireAdmin();
  const data = paymentSchema.parse(values(formData));
  const payment = await prisma.payment.create({ data });

  if (
    data.subscriptionId &&
    (data.type === "monthly_support" || data.type === "yearly_support")
  ) {
    const subscription = await prisma.subscription.findUnique({
      where: { id: data.subscriptionId },
    });

    if (subscription) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          status: "active",
          nextPaymentDate: advancePaymentDate(
            subscription.nextPaymentDate,
            data.paidAt,
            data.type === "yearly_support" ? "yearly" : "monthly",
          ),
        },
      });
    }
  }

  revalidatePath("/admin/payments");
  if (payment.projectId) revalidatePath(`/admin/projects/${payment.projectId}`);
  if (payment.clientId) revalidatePath(`/admin/clients/${payment.clientId}`);
  withToast("/admin/payments", "created");
}

export async function createExpenseAction(formData: FormData) {
  await requireAdmin();
  const data = expenseSchema.parse(values(formData));
  await prisma.expense.create({ data });
  revalidatePath("/admin/expenses");
  if (data.projectId) revalidatePath(`/admin/projects/${data.projectId}`);
  if (data.clientId) revalidatePath(`/admin/clients/${data.clientId}`);
  withToast("/admin/expenses", "created");
}

export async function createProjectExpenseAction(formData: FormData) {
  await requireAdmin();
  const projectId = String(formData.get("projectId") ?? "");
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { id: true, title: true, clientId: true },
  });
  if (!project) redirect("/admin/projects");

  const data = expenseSchema.parse({
    ...values(formData),
    clientId: project.clientId,
    projectId: project.id,
  });

  const expense = await prisma.expense.create({ data });
  const remindAtRaw = String(formData.get("remindAt") ?? "").trim();
  const expenseCategoryLabel = labelFrom(expenseCategoryLabels, expense.category);

  if (remindAtRaw) {
    await prisma.reminder.create({
      data: {
        clientId: project.clientId,
        projectId: project.id,
        type: "project_task",
        status: "pending",
        title: `Проверить расход по проекту ${project.title}`,
        description: `Расход ${expenseCategoryLabel} на ${expense.amount} ₸. ${expense.comment ?? ""}`.trim(),
        remindAt: new Date(remindAtRaw),
      },
    });
  }

  revalidatePath(`/admin/projects/${project.id}`);
  revalidatePath("/admin/expenses");
  withToast(`/admin/projects/${project.id}`, "created");
}

export async function createRecurringExpenseAction(formData: FormData) {
  await requireAdmin();
  const projectId = String(formData.get("projectId") ?? "");
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { id: true, clientId: true },
  });
  if (!project) redirect("/admin/projects");

  const data = recurringExpenseSchema.parse({
    ...values(formData),
    clientId: project.clientId,
    projectId: project.id,
  });

  await prisma.recurringExpense.create({ data });
  revalidatePath(`/admin/projects/${project.id}`);
  withToast(`/admin/projects/${project.id}`, "created");
}

export async function markRecurringExpensePaidAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const item = await prisma.recurringExpense.findUnique({
    where: { id },
    include: { project: true },
  });
  if (!item) redirect("/admin/projects");

  await prisma.$transaction([
    prisma.expense.create({
      data: {
        clientId: item.clientId,
        projectId: item.projectId,
        recurringExpenseId: item.id,
        category: item.category,
        amount: item.amount,
        currency: item.currency,
        spentAt: item.nextExpenseDate,
        comment: item.comment
          ? `${item.comment} · регулярный расход`
          : "Регулярный расход",
      },
    }),
    prisma.recurringExpense.update({
      where: { id: item.id },
      data: {
        nextExpenseDate: nextRecurringExpenseDate(item.nextExpenseDate, item.dayOfMonth),
        status: "active",
      },
    }),
    prisma.reminder.updateMany({
      where: {
        recurringExpenseId: item.id,
        status: "pending",
        remindAt: { lte: item.nextExpenseDate },
      },
      data: { status: "done" },
    }),
  ]);

  revalidatePath(`/admin/projects/${item.projectId}`);
  revalidatePath("/admin/expenses");
  withToast(`/admin/projects/${item.projectId}`, "created");
}

export async function createReminderAction(formData: FormData) {
  await requireAdmin();
  const data = reminderSchema.parse(values(formData));
  await prisma.reminder.create({ data });
  revalidatePath("/admin/reminders");
  withToast("/admin/reminders", "created");
}

export async function createReviewAction(formData: FormData) {
  await requireAdmin();
  const data = reviewSchema.parse(values(formData));
  await prisma.review.create({ data });
  revalidatePath("/admin/reviews");
  revalidatePath("/");
  withToast("/admin/reviews", "created");
}

export async function updateReviewAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = reviewSchema.parse(values(formData));
  await prisma.review.update({ where: { id }, data });
  revalidatePath("/admin/reviews");
  revalidatePath("/");
  withToast("/admin/reviews", "updated");
}

export async function updateReminderStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "done") as "pending" | "done" | "cancelled";
  await prisma.reminder.update({ where: { id }, data: { status } });
  revalidatePath("/admin/reminders");
  withToast("/admin/reminders", "updated");
}

export async function updateSettingsAction(formData: FormData) {
  await requireAdmin();
  const data = settingsSchema.parse(values(formData));
  const existing = await prisma.settings.findFirst();

  if (existing) {
    await prisma.settings.update({ where: { id: existing.id }, data });
  } else {
    await prisma.settings.create({ data });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  withToast("/admin/settings", "updated");
}

export async function deleteLeadAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
  withToast("/admin/leads", "deleted");
}

export async function deleteClientAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const [projects, subscriptions, recurringExpenses] = await Promise.all([
    prisma.project.findMany({ where: { clientId: id }, select: { id: true } }),
    prisma.subscription.findMany({ where: { clientId: id }, select: { id: true } }),
    prisma.recurringExpense.findMany({ where: { clientId: id }, select: { id: true } }),
  ]);
  const projectIds = projects.map((item) => item.id);
  const subscriptionIds = subscriptions.map((item) => item.id);
  const recurringExpenseIds = recurringExpenses.map((item) => item.id);

  await prisma.$transaction([
    prisma.reminder.deleteMany({
      where: {
        OR: [
          { clientId: id },
          { projectId: { in: projectIds } },
          { subscriptionId: { in: subscriptionIds } },
          { recurringExpenseId: { in: recurringExpenseIds } },
        ],
      },
    }),
    prisma.expense.deleteMany({
      where: {
        OR: [
          { clientId: id },
          { projectId: { in: projectIds } },
          { recurringExpenseId: { in: recurringExpenseIds } },
        ],
      },
    }),
    prisma.payment.deleteMany({
      where: {
        OR: [
          { clientId: id },
          { projectId: { in: projectIds } },
          { subscriptionId: { in: subscriptionIds } },
        ],
      },
    }),
    prisma.subscription.deleteMany({ where: { clientId: id } }),
    prisma.recurringExpense.deleteMany({ where: { clientId: id } }),
    prisma.note.deleteMany({ where: { clientId: id } }),
    prisma.project.deleteMany({ where: { clientId: id } }),
    prisma.client.delete({ where: { id } }),
  ]);

  revalidatePath("/admin/clients");
  withToast("/admin/clients", "deleted");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const [subscriptions, recurringExpenses] = await Promise.all([
    prisma.subscription.findMany({ where: { projectId: id }, select: { id: true } }),
    prisma.recurringExpense.findMany({ where: { projectId: id }, select: { id: true } }),
  ]);
  const subscriptionIds = subscriptions.map((item) => item.id);
  const recurringExpenseIds = recurringExpenses.map((item) => item.id);

  await prisma.$transaction([
    prisma.reminder.deleteMany({
      where: {
        OR: [
          { projectId: id },
          { subscriptionId: { in: subscriptionIds } },
          { recurringExpenseId: { in: recurringExpenseIds } },
        ],
      },
    }),
    prisma.expense.deleteMany({
      where: {
        OR: [{ projectId: id }, { recurringExpenseId: { in: recurringExpenseIds } }],
      },
    }),
    prisma.payment.deleteMany({
      where: {
        OR: [{ projectId: id }, { subscriptionId: { in: subscriptionIds } }],
      },
    }),
    prisma.subscription.deleteMany({ where: { projectId: id } }),
    prisma.recurringExpense.deleteMany({ where: { projectId: id } }),
    prisma.note.deleteMany({ where: { projectId: id } }),
    prisma.project.delete({ where: { id } }),
  ]);

  revalidatePath("/admin/projects");
  withToast("/admin/projects", "deleted");
}

export async function deletePaymentAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.payment.delete({ where: { id } });
  revalidatePath("/admin/payments");
  withToast("/admin/payments", "deleted");
}

export async function deleteExpenseAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.expense.delete({ where: { id } });
  revalidatePath("/admin/expenses");
  withToast("/admin/expenses", "deleted");
}

export async function deleteSubscriptionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.$transaction([
    prisma.reminder.deleteMany({ where: { subscriptionId: id } }),
    prisma.subscription.delete({ where: { id } }),
  ]);
  revalidatePath("/admin/subscriptions");
  withToast("/admin/subscriptions", "deleted");
}

export async function deleteReminderAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.reminder.delete({ where: { id } });
  revalidatePath("/admin/reminders");
  withToast("/admin/reminders", "deleted");
}

export async function deleteReviewAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.review.delete({ where: { id } });
  revalidatePath("/admin/reviews");
  revalidatePath("/");
  withToast("/admin/reviews", "deleted");
}

export async function deleteRecurringExpenseAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const item = await prisma.recurringExpense.findUnique({ where: { id } });
  if (!item) redirect("/admin/projects");

  await prisma.$transaction([
    prisma.reminder.deleteMany({ where: { recurringExpenseId: id } }),
    prisma.recurringExpense.delete({ where: { id } }),
  ]);

  revalidatePath(`/admin/projects/${item.projectId}`);
  withToast(`/admin/projects/${item.projectId}`, "deleted");
}
