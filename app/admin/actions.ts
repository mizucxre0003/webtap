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
import { prisma } from "@/lib/prisma";
import { advancePaymentDate } from "@/lib/finance";
import {
  clientSchema,
  expenseSchema,
  leadStatusSchema,
  loginSchema,
  noteSchema,
  paymentSchema,
  projectSchema,
  publicLeadSchema,
  reminderSchema,
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

export async function createReminderAction(formData: FormData) {
  await requireAdmin();
  const data = reminderSchema.parse(values(formData));
  await prisma.reminder.create({ data });
  revalidatePath("/admin/reminders");
  withToast("/admin/reminders", "created");
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
  withToast("/admin/settings", "updated");
}
