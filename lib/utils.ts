import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKzt(amount: number | null | undefined) {
  return `${new Intl.NumberFormat("ru-KZ").format(amount ?? 0)} ₸`;
}

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("ru-KZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function toDateInput(date: Date | string | null | undefined) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export function parseInteger(value: FormDataEntryValue | null, fallback = 0) {
  const raw = String(value ?? "").replace(/[^\d-]/g, "");
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function optionalString(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length ? text : undefined;
}

export function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

export function addYears(date: Date, years: number) {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + years);
  return next;
}

export function dateKey(date: Date) {
  return startOfDay(date).toISOString().slice(0, 10);
}

export function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function monthLabel(key: string) {
  const [year, month] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("ru-KZ", {
    month: "short",
    year: "2-digit",
  }).format(new Date(year, month - 1, 1));
}
