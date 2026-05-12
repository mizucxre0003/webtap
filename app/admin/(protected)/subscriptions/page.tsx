import { CreateSubscriptionModal } from "@/components/admin/CreateSubscriptionModal";
import { SubscriptionsTable } from "@/components/admin/SubscriptionsTable";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Form";
import { prisma } from "@/lib/prisma";

export default async function SubscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = params.status;
  const [subscriptions, clients, projects] = await Promise.all([
    prisma.subscription.findMany({
      where: status ? { status: status as never } : undefined,
      include: { client: true, project: true },
      orderBy: { nextPaymentDate: "asc" },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-ink">Обслуживание</h1>
        <p className="mt-1 text-black/55">Месячное и годовое сопровождение, даты оплат и просрочки.</p>
      </div>
      <CreateSubscriptionModal clients={clients} projects={projects} />
      <Card className="p-4">
        <form className="grid gap-3 md:grid-cols-[220px_140px]">
          <Select name="status" defaultValue={status ?? ""}>
            <option value="">Все статусы</option>
            <option value="active">active</option>
            <option value="overdue">overdue</option>
            <option value="paused">paused</option>
            <option value="cancelled">cancelled</option>
          </Select>
          <button className="rounded-2xl bg-brand-ink px-4 text-sm font-bold text-white">Фильтр</button>
        </form>
      </Card>
      <SubscriptionsTable subscriptions={subscriptions} />
    </div>
  );
}
