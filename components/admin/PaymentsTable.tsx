import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate, formatKzt } from "@/lib/utils";

export function PaymentsTable({
  payments,
}: {
  payments: Array<{
    id: string;
    type: string;
    amount: number;
    method: string;
    paidAt: Date;
    comment: string | null;
    client: { name: string; businessName: string | null };
    project: { title: string } | null;
  }>;
}) {
  if (!payments.length) return <EmptyState title="Оплат пока нет" />;

  return (
    <div className="overflow-x-auto">
      <table className="admin-table min-w-[900px]">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Проект</th>
            <th>Тип</th>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Способ</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="font-black text-brand-ink">{payment.client.businessName ?? payment.client.name}</td>
              <td>{payment.project?.title ?? "—"}</td>
              <td><StatusBadge value={payment.type} /></td>
              <td className="font-black">{formatKzt(payment.amount)}</td>
              <td>{formatDate(payment.paidAt)}</td>
              <td>{payment.method}</td>
              <td>{payment.comment ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
