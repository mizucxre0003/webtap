"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

const messages: Record<string, string> = {
  saved: "Сохранено",
  created: "Создано",
  updated: "Обновлено",
  deleted: "Готово",
  login: "Добро пожаловать в WebTap CRM",
};

export function ToastFromQuery() {
  const params = useSearchParams();
  const [visible, setVisible] = useState(false);
  const key = params.get("toast");

  useEffect(() => {
    if (!key) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 3200);
    return () => window.clearTimeout(timer);
  }, [key]);

  if (!key || !visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl bg-brand-ink px-4 py-3 text-sm font-semibold text-white shadow-soft">
      <CheckCircle2 className="size-5 text-emerald-300" />
      {messages[key] ?? "Готово"}
    </div>
  );
}
