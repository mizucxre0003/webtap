import { CreatePaymentModal } from "@/components/admin/CreatePaymentModal";
import { PaymentsTable } from "@/components/admin/PaymentsTable";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Form";
import { prisma } from "@/lib/prisma";

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const type = params.type;
  const [payments, clients, projects, subscriptions] = await Promise.all([
    prisma.payment.findMany({
      where: type ? { type: type as never } : undefined,
      include: { client: true, project: true },
      orderBy: { paidAt: "desc" },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.subscription.findMany({ where: { status: { in: ["active", "overdue"] } }, orderBy: { nextPaymentDate: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-ink">Оплаты</h1>
        <p className="mt-1 text-black/55">Доход, запуск сайта, обслуживание и доработки.</p>
      </div>
      <CreatePaymentModal clients={clients} projects={projects} subscriptions={subscriptions} />
      <Card className="p-4">
        <form className="grid gap-3 md:grid-cols-[220px_140px]">
          <Select name="type" defaultValue={type ?? ""}>
            <option value="">Все типы</option>
            <option value="launch_payment">launch_payment</option>
            <option value="monthly_support">monthly_support</option>
            <option value="yearly_support">yearly_support</option>
            <option value="extra_work">extra_work</option>
            <option value="other">other</option>
          </Select>
          <button className="rounded-2xl bg-brand-ink px-4 text-sm font-bold text-white">Фильтр</button>
        </form>
      </Card>
      <PaymentsTable payments={payments} />
    </div>
  );
}
