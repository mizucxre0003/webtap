export const leadStatusLabels = {
  new: "Новая",
  contacted: "Связались",
  in_progress: "В работе",
  won: "Стала клиентом",
  lost: "Отказ",
} as const;

export const clientStatusLabels = {
  active: "Активный",
  paused: "Пауза",
  archived: "Архив",
} as const;

export const projectStatusLabels = {
  brief: "Бриф",
  design: "Дизайн",
  development: "Сборка",
  waiting_payment: "Ждём оплату",
  launched: "Запущен",
  support: "На обслуживании",
  paused: "Пауза",
  closed: "Закрыт",
} as const;

export const subscriptionTypeLabels = {
  monthly: "Ежемесячное",
  yearly: "Годовое",
  none: "Без обслуживания",
} as const;

export const subscriptionStatusLabels = {
  active: "Активно",
  overdue: "Просрочено",
  paused: "Пауза",
  cancelled: "Отменено",
} as const;

export const paymentTypeLabels = {
  launch_payment: "Оплата запуска",
  monthly_support: "Месячное обслуживание",
  yearly_support: "Годовое обслуживание",
  extra_work: "Доработки",
  other: "Другое",
} as const;

export const paymentMethodLabels = {
  kaspi: "Kaspi",
  cash: "Наличные",
  bank_transfer: "Банковский перевод",
  other: "Другое",
} as const;

export const expenseCategoryLabels = {
  domain: "Домен",
  hosting: "Хостинг",
  design_assets: "Дизайн-ассеты",
  advertising: "Реклама",
  subcontractor: "Подрядчик",
  software: "Софт",
  other: "Другое",
} as const;

export const reminderTypeLabels = {
  payment_due: "Оплата скоро",
  payment_overdue: "Просрочка оплаты",
  contact_client: "Связаться с клиентом",
  project_task: "Задача по проекту",
  custom: "Своя задача",
} as const;

export const reminderStatusLabels = {
  pending: "Ожидает",
  done: "Готово",
  cancelled: "Отменено",
} as const;

export const recurringExpenseStatusLabels = {
  active: "Активно",
  paused: "Пауза",
  cancelled: "Отменено",
} as const;

type LabelMap = Record<string, string>;

export function optionsFromLabels(labels: LabelMap) {
  return Object.entries(labels).map(([value, label]) => ({ value, label }));
}

export function labelFrom(labels: LabelMap, value: string | null | undefined) {
  if (!value) return "—";
  return labels[value] ?? value;
}

export const leadStatusOptions = optionsFromLabels(leadStatusLabels);
export const clientStatusOptions = optionsFromLabels(clientStatusLabels);
export const projectStatusOptions = optionsFromLabels(projectStatusLabels);
export const subscriptionTypeOptions = optionsFromLabels(subscriptionTypeLabels);
export const subscriptionStatusOptions = optionsFromLabels(subscriptionStatusLabels);
export const paymentTypeOptions = optionsFromLabels(paymentTypeLabels);
export const paymentMethodOptions = optionsFromLabels(paymentMethodLabels);
export const expenseCategoryOptions = optionsFromLabels(expenseCategoryLabels);
export const reminderTypeOptions = optionsFromLabels(reminderTypeLabels);
export const reminderStatusOptions = optionsFromLabels(reminderStatusLabels);
