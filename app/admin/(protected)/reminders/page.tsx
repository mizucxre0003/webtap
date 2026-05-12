import { CreateReminderModal } from "@/components/admin/CreateReminderModal";
import { RemindersTable } from "@/components/admin/RemindersTable";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Form";
import { prisma } from "@/lib/prisma";
import { generateAutomationReminders } from "@/lib/reminders";

export default async function RemindersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await generateAutomationReminders();
  const params = await searchParams;
  const status = params.status;
  const [reminders, clients, projects, subscriptions] = await Promise.all([
    prisma.reminder.findMany({
      where: status ? { status: status as never } : undefined,
      include: { client: true, project: true },
      orderBy: { remindAt: "asc" },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.subscription.findMany({ orderBy: { nextPaymentDate: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-ink">Напоминания</h1>
        <p className="mt-1 text-black/55">Что нужно написать клиенту в WhatsApp и когда.</p>
      </div>
      <CreateReminderModal clients={clients} projects={projects} subscriptions={subscriptions} />
      <Card className="p-4">
        <form className="grid gap-3 md:grid-cols-[220px_140px]">
          <Select name="status" defaultValue={status ?? ""}>
            <option value="">Все статусы</option>
            <option value="pending">pending</option>
            <option value="done">done</option>
            <option value="cancelled">cancelled</option>
          </Select>
          <button className="rounded-2xl bg-brand-ink px-4 text-sm font-bold text-white">Фильтр</button>
        </form>
      </Card>
      <RemindersTable reminders={reminders} />
    </div>
  );
}
