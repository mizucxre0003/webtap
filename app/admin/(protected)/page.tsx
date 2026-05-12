import Link from "next/link";
import { DashboardCards } from "@/components/admin/DashboardCards";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { WhatsAppButton } from "@/components/admin/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getDashboardData } from "@/lib/finance";
import { generateAutomationReminders } from "@/lib/reminders";
import { formatDate, formatKzt } from "@/lib/utils";

export default async function AdminDashboardPage() {
  await generateAutomationReminders();
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-ink">Dashboard</h1>
        <p className="mt-1 text-black/55">Заявки, деньги, обслуживание и ближайшие действия.</p>
      </div>

      <DashboardCards cards={data.cards} />
      <RevenueChart data={data.series} />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-1">
          <h2 className="mb-4 text-xl font-black text-brand-ink">Кому скоро написать</h2>
          {data.upcomingReminders.length ? (
            <div className="space-y-3">
              {data.upcomingReminders.map((reminder) => (
                <div key={reminder.id} className="rounded-2xl bg-brand-mist p-4">
                  <p className="font-bold text-brand-ink">{reminder.title}</p>
                  <p className="mt-1 text-sm text-black/55">{formatDate(reminder.remindAt)}</p>
                  <div className="mt-3">
                    <WhatsAppButton phone={reminder.client?.whatsapp ?? reminder.client?.phone} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="Нет ближайших напоминаний" />
          )}
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-black text-brand-ink">Просрочили оплату</h2>
          {data.overdueSubscriptions.length ? (
            <div className="space-y-3">
              {data.overdueSubscriptions.map((subscription) => (
                <div key={subscription.id} className="rounded-2xl bg-red-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/admin/clients/${subscription.clientId}`} className="font-bold text-brand-ink">
                        {subscription.client.name}
                      </Link>
                      <p className="mt-1 text-sm text-red-700">
                        {formatKzt(subscription.amount)} · {formatDate(subscription.nextPaymentDate)}
                      </p>
                    </div>
                    <StatusBadge value={subscription.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="Просрочек нет" />
          )}
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-black text-brand-ink">Ожидаются в 7 дней</h2>
          {data.expectedPayments.length ? (
            <div className="space-y-3">
              {data.expectedPayments.map((subscription) => (
                <div key={subscription.id} className="rounded-2xl bg-brand-mist p-4">
                  <Link href={`/admin/clients/${subscription.clientId}`} className="font-bold text-brand-ink">
                    {subscription.client.name}
                  </Link>
                  <p className="mt-1 text-sm text-black/55">
                    {formatKzt(subscription.amount)} · {formatDate(subscription.nextPaymentDate)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="Платежей на неделе нет" />
          )}
        </Card>
      </div>
    </div>
  );
}
