import { CreateLeadModal } from "@/components/admin/CreateLeadModal";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Form";
import { leadStatusOptions } from "@/lib/admin-labels";
import { prisma } from "@/lib/prisma";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim();
  const status = params.status;

  const leads = await prisma.lead.findMany({
    where: {
      ...(status ? { status: status as never } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { phone: { contains: q, mode: "insensitive" } },
              { businessNiche: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-ink">Заявки</h1>
        <p className="mt-1 text-black/55">Все обращения с публичной формы и ручные заявки.</p>
      </div>
      <CreateLeadModal />
      <Card className="p-4">
        <form className="grid gap-3 md:grid-cols-[1fr_260px_140px]">
          <Input name="q" defaultValue={q} placeholder="Поиск по имени, телефону, нише" />
          <Select name="status" defaultValue={status ?? ""}>
            <option value="">Все статусы</option>
            {leadStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
          <button className="rounded-2xl bg-brand-ink px-4 text-sm font-bold text-white">Фильтр</button>
        </form>
      </Card>
      <LeadsTable leads={leads} />
    </div>
  );
}
