import { CreateClientModal } from "@/components/admin/CreateClientModal";
import { ClientsTable } from "@/components/admin/ClientsTable";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Form";
import { prisma } from "@/lib/prisma";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim();
  const status = params.status;

  const clients = await prisma.client.findMany({
    where: {
      ...(status ? { status: status as never } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { businessName: { contains: q, mode: "insensitive" } },
              { phone: { contains: q, mode: "insensitive" } },
              { niche: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { payments: true, expenses: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-ink">Клиенты</h1>
        <p className="mt-1 text-black/55">Контакты, проекты, оплаты, расходы и прибыль.</p>
      </div>
      <CreateClientModal />
      <Card className="p-4">
        <form className="grid gap-3 md:grid-cols-[1fr_220px_140px]">
          <Input name="q" defaultValue={q} placeholder="Поиск по клиенту, телефону, нише" />
          <Select name="status" defaultValue={status ?? ""}>
            <option value="">Все статусы</option>
            <option value="active">active</option>
            <option value="paused">paused</option>
            <option value="archived">archived</option>
          </Select>
          <button className="rounded-2xl bg-brand-ink px-4 text-sm font-bold text-white">Фильтр</button>
        </form>
      </Card>
      <ClientsTable clients={clients} />
    </div>
  );
}
