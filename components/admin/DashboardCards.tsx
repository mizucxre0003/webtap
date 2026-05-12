import {
  Bell,
  CreditCard,
  MessageSquare,
  Receipt,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatKzt } from "@/lib/utils";

const cardMeta = [
  ["newLeads", "новые заявки", MessageSquare],
  ["activeClients", "активные клиенты", Users],
  ["activeSubscriptions", "сайты на обслуживании", WalletCards],
  ["income", "доход за месяц", CreditCard],
  ["expenses", "расходы за месяц", Receipt],
  ["profit", "чистая прибыль", TrendingUp],
  ["expectedPayments", "ожидаемые платежи", CreditCard],
  ["overduePayments", "просроченные платежи", Receipt],
  ["upcomingReminders", "ближайшие напоминания", Bell],
] as const;

export function DashboardCards({
  cards,
}: {
  cards: Record<(typeof cardMeta)[number][0], number>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cardMeta.map(([key, label, Icon]) => {
        const money = ["income", "expenses", "profit"].includes(key);
        return (
          <Card key={key} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-black/45">{label}</p>
                <p className="mt-2 text-3xl font-black text-brand-ink">
                  {money ? formatKzt(cards[key]) : cards[key]}
                </p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-mist text-brand">
                <Icon className="size-6" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
