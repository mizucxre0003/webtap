import { CreateProjectModal } from "@/components/admin/CreateProjectModal";
import { ProjectsTable } from "@/components/admin/ProjectsTable";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Form";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim();
  const status = params.status;

  const [projects, clients] = await Promise.all([
    prisma.project.findMany({
      where: {
        ...(status ? { status: status as never } : {}),
        ...(q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { domain: { contains: q, mode: "insensitive" } },
                { client: { name: { contains: q, mode: "insensitive" } } },
                { client: { businessName: { contains: q, mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      include: { client: true, payments: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-ink">Проекты / сайты</h1>
        <p className="mt-1 text-black/55">Стоимость запуска, остаток оплаты, ссылки и прибыль.</p>
      </div>
      <CreateProjectModal clients={clients} />
      <Card className="p-4">
        <form className="grid gap-3 md:grid-cols-[1fr_220px_140px]">
          <Input name="q" defaultValue={q} placeholder="Поиск по проекту, домену, клиенту" />
          <Select name="status" defaultValue={status ?? ""}>
            <option value="">Все статусы</option>
            <option value="brief">brief</option>
            <option value="design">design</option>
            <option value="development">development</option>
            <option value="waiting_payment">waiting_payment</option>
            <option value="launched">launched</option>
            <option value="support">support</option>
            <option value="paused">paused</option>
            <option value="closed">closed</option>
          </Select>
          <button className="rounded-2xl bg-brand-ink px-4 text-sm font-bold text-white">Фильтр</button>
        </form>
      </Card>
      <ProjectsTable projects={projects} />
    </div>
  );
}
