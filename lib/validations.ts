import { z } from "zod";

const optionalText = z.preprocess(
  (value) => (String(value ?? "").trim() === "" ? undefined : value),
  z.string().trim().optional(),
);

const dateFromInput = z.preprocess((value) => {
  const raw = String(value ?? "").trim();
  return raw ? new Date(raw) : undefined;
}, z.date().optional());

const requiredDate = z.preprocess((value) => new Date(String(value)), z.date());

export const leadStatuses = ["new", "contacted", "in_progress", "won", "lost"] as const;
export const clientStatuses = ["active", "paused", "archived"] as const;
export const projectStatuses = [
  "brief",
  "design",
  "development",
  "waiting_payment",
  "launched",
  "support",
  "paused",
  "closed",
] as const;
export const subscriptionTypes = ["monthly", "yearly", "none"] as const;
export const subscriptionStatuses = ["active", "overdue", "paused", "cancelled"] as const;
export const paymentTypes = [
  "launch_payment",
  "monthly_support",
  "yearly_support",
  "extra_work",
  "other",
] as const;
export const paymentMethods = ["cash", "kaspi", "bank_transfer", "other"] as const;
export const expenseCategories = [
  "domain",
  "hosting",
  "design_assets",
  "advertising",
  "subcontractor",
  "software",
  "other",
] as const;
export const reminderTypes = [
  "payment_due",
  "payment_overdue",
  "contact_client",
  "project_task",
  "custom",
] as const;
export const reminderStatuses = ["pending", "done", "cancelled"] as const;
export const recurringExpenseStatuses = ["active", "paused", "cancelled"] as const;

const urlOrPath = z.preprocess(
  (value) => (String(value ?? "").trim() === "" ? undefined : value),
  z.string().trim().refine(
    (value) =>
      value.startsWith("/") ||
      value.startsWith("http://") ||
      value.startsWith("https://"),
    "Введите ссылку, которая начинается с https:// или /",
  ).optional(),
);

const requiredUrlOrPath = z.string().trim().min(1, "Добавьте ссылку").refine(
  (value) =>
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://"),
  "Введите ссылку, которая начинается с https:// или /",
);

export const publicLeadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя"),
  phone: z.string().trim().min(6, "Укажите телефон или WhatsApp"),
  businessNiche: z.string().trim().min(2, "Укажите нишу бизнеса"),
  siteType: z.string().trim().min(2, "Выберите, что нужно"),
  budgetRange: z.string().trim().min(2, "Выберите бюджет"),
  comment: optionalText,
});

export const loginSchema = z.object({
  email: z.string().trim().email("Введите email"),
  password: z.string().min(6, "Введите пароль"),
});

export const leadStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(leadStatuses),
});

export const noteSchema = z.object({
  body: z.string().trim().min(2, "Введите заметку"),
  leadId: optionalText,
  clientId: optionalText,
  projectId: optionalText,
});

export const clientSchema = z.object({
  name: z.string().trim().min(2, "Введите имя клиента"),
  businessName: optionalText,
  contactPerson: optionalText,
  phone: z.string().trim().min(5, "Введите телефон"),
  whatsapp: optionalText,
  instagram: optionalText,
  email: optionalText,
  niche: optionalText,
  city: optionalText,
  status: z.enum(clientStatuses).default("active"),
  notes: optionalText,
});

export const projectSchema = z.object({
  clientId: z.string().min(1, "Выберите клиента"),
  title: z.string().trim().min(2, "Введите название проекта"),
  description: optionalText,
  status: z.enum(projectStatuses).default("brief"),
  launchPrice: z.coerce.number().int().min(0),
  launchStartedAt: dateFromInput,
  launchedAt: dateFromInput,
  websiteUrl: optionalText,
  domain: optionalText,
  hosting: optionalText,
  notes: optionalText,
});

export const paymentSchema = z.object({
  clientId: z.string().min(1, "Выберите клиента"),
  projectId: optionalText,
  subscriptionId: optionalText,
  type: z.enum(paymentTypes),
  amount: z.coerce.number().int().positive("Введите сумму"),
  currency: z.string().default("KZT"),
  paidAt: requiredDate,
  method: z.enum(paymentMethods).default("kaspi"),
  comment: optionalText,
});

export const expenseSchema = z.object({
  clientId: optionalText,
  projectId: optionalText,
  recurringExpenseId: optionalText,
  category: z.enum(expenseCategories),
  amount: z.coerce.number().int().positive("Введите сумму"),
  currency: z.string().default("KZT"),
  spentAt: requiredDate,
  comment: optionalText,
});

export const subscriptionSchema = z.object({
  clientId: z.string().min(1, "Выберите клиента"),
  projectId: optionalText,
  type: z.enum(subscriptionTypes),
  amount: z.coerce.number().int().min(0),
  startDate: requiredDate,
  nextPaymentDate: dateFromInput,
  status: z.enum(subscriptionStatuses).default("active"),
  notes: optionalText,
});

export const reminderSchema = z.object({
  clientId: optionalText,
  projectId: optionalText,
  subscriptionId: optionalText,
  recurringExpenseId: optionalText,
  title: z.string().trim().min(2, "Введите заголовок"),
  description: optionalText,
  remindAt: requiredDate,
  type: z.enum(reminderTypes).default("custom"),
  status: z.enum(reminderStatuses).default("pending"),
});

export const recurringExpenseSchema = z.object({
  clientId: z.string().min(1),
  projectId: z.string().min(1),
  category: z.enum(expenseCategories),
  amount: z.coerce.number().int().positive("Введите сумму"),
  currency: z.string().default("KZT"),
  dayOfMonth: z.coerce.number().int().min(1).max(28).default(1),
  nextExpenseDate: requiredDate,
  reminderDaysBefore: z.coerce.number().int().min(0).max(14).default(3),
  status: z.enum(recurringExpenseStatuses).default("active"),
  comment: optionalText,
});

export const reviewSchema = z.object({
  clientName: z.string().trim().min(2, "Введите имя клиента"),
  businessName: optionalText,
  text: z.string().trim().min(10, "Введите текст отзыва"),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  projectUrl: urlOrPath,
  instagramStoryUrl: requiredUrlOrPath,
  screenshotUrl: urlOrPath,
  isPublished: z.preprocess((value) => value === "on" || value === "true", z.boolean()).default(false),
  sortOrder: z.coerce.number().int().default(0),
});

export const settingsSchema = z.object({
  brandName: z.string().trim().min(2),
  defaultLaunchPrice: z.coerce.number().int().min(0),
  defaultMonthlySupportPrice: z.coerce.number().int().min(0),
  defaultYearlySupportPrice: z.coerce.number().int().min(0),
  whatsapp: optionalText,
  email: optionalText,
  instagram: optionalText,
  telegram: optionalText,
});
