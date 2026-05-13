import { CreateExpenseModal } from "@/components/admin/CreateExpenseModal";
import { ExpensesTable } from "@/components/admin/ExpensesTable";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Form";
import { expenseCategoryOptions } from "@/lib/admin-labels";
import { prisma } from "@/lib/prisma";

export default async function ExpensesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const [expenses, clients, projects] = await Promise.all([
    prisma.expense.findMany({
      where: category ? { category: category as never } : undefined,
      include: { client: true, project: true },
      orderBy: { spentAt: "desc" },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-ink">Расходы</h1>
        <p className="mt-1 text-black/55">Куда уходят деньги по клиентам и проектам.</p>
      </div>
      <CreateExpenseModal clients={clients} projects={projects} />
      <Card className="p-4">
        <form className="grid gap-3 md:grid-cols-[260px_140px]">
          <Select name="category" defaultValue={category ?? ""}>
            <option value="">Все категории</option>
            {expenseCategoryOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
          <button className="rounded-2xl bg-brand-ink px-4 text-sm font-bold text-white">Фильтр</button>
        </form>
      </Card>
      <ExpensesTable expenses={expenses} />
    </div>
  );
}
