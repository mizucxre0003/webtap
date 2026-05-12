import { Badge, type BadgeTone } from "@/components/ui/Badge";

const labels: Record<string, string> = {
  new: "новая",
  contacted: "связался",
  in_progress: "в работе",
  won: "клиент",
  lost: "отказ",
  active: "активен",
  paused: "пауза",
  archived: "архив",
  brief: "бриф",
  design: "дизайн",
  development: "сборка",
  waiting_payment: "ждёт оплату",
  launched: "запущен",
  support: "обслуживание",
  closed: "закрыт",
  overdue: "просрочено",
  cancelled: "отменено",
  pending: "ожидает",
  done: "готово",
  monthly: "месяц",
  yearly: "год",
  none: "нет",
  launch_payment: "запуск",
  monthly_support: "месячное",
  yearly_support: "годовое",
  extra_work: "доработки",
  other: "другое",
};

const tones: Record<string, BadgeTone> = {
  new: "violet",
  contacted: "blue",
  in_progress: "amber",
  won: "green",
  lost: "red",
  active: "green",
  paused: "amber",
  archived: "gray",
  brief: "gray",
  design: "violet",
  development: "blue",
  waiting_payment: "amber",
  launched: "green",
  support: "green",
  closed: "gray",
  overdue: "red",
  cancelled: "gray",
  pending: "amber",
  done: "green",
};

export function StatusBadge({ value }: { value: string }) {
  return <Badge tone={tones[value] ?? "gray"}>{labels[value] ?? value}</Badge>;
}
