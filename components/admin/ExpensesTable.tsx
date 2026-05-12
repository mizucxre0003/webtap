import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate, formatKzt } from "@/lib/utils";

export function ExpensesTable({
  expenses,
}: {
  expenses: Array<{
    id: string;
    category: string;
    amount: number;
    spentAt: Date;
    comment: string | null;
    client: { name: string; businessName: string | null } | null;
    project: { title: string } | null;
  }>;
}) {
  if (!expenses.length) return <EmptyState title="Расходов пока нет" />;

  return (
    <div className="overflow-x-auto">
      <table className="admin-table min-w-[860px]">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Проект</th>
            <th>Категория</th>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.client?.businessName ?? expense.client?.name ?? "—"}</td>
              <td>{expense.project?.title ?? "—"}</td>
              <td className="font-bold">{expense.category}</td>
              <td className="font-black text-red-600">{formatKzt(expense.amount)}</td>
              <td>{formatDate(expense.spentAt)}</td>
              <td>{expense.comment ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
