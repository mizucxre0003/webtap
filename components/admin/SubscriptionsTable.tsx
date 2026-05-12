import { deleteSubscriptionAction, updateSubscriptionStatusAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { WhatsAppButton } from "@/components/admin/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Select } from "@/components/ui/Form";
import { formatDate, formatKzt } from "@/lib/utils";

export function SubscriptionsTable({
  subscriptions,
}: {
  subscriptions: Array<{
    id: string;
    type: string;
    amount: number;
    nextPaymentDate: Date | null;
    status: string;
    client: { name: string; businessName: string | null; phone: string; whatsapp: string | null };
    project: { title: string } | null;
  }>;
}) {
  if (!subscriptions.length) return <EmptyState title="Обслуживания пока нет" />;

  return (
    <div className="overflow-x-auto">
      <table className="admin-table min-w-[1040px]">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Проект</th>
            <th>Тип</th>
            <th>Сумма</th>
            <th>Следующая оплата</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id}>
              <td className="font-black text-brand-ink">{subscription.client.businessName ?? subscription.client.name}</td>
              <td>{subscription.project?.title ?? "—"}</td>
              <td><StatusBadge value={subscription.type} /></td>
              <td className="font-black">{formatKzt(subscription.amount)}</td>
              <td>{formatDate(subscription.nextPaymentDate)}</td>
              <td><StatusBadge value={subscription.status} /></td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <WhatsAppButton phone={subscription.client.whatsapp ?? subscription.client.phone} />
                  <form action={updateSubscriptionStatusAction} className="flex gap-2">
                    <input type="hidden" name="id" value={subscription.id} />
                    <Select name="status" defaultValue={subscription.status} className="min-h-10 w-36 py-2">
                      <option value="active">active</option>
                      <option value="overdue">overdue</option>
                      <option value="paused">paused</option>
                      <option value="cancelled">cancelled</option>
                    </Select>
                    <Button variant="secondary" className="min-h-10 px-3">OK</Button>
                  </form>
                  <DeleteButton
                    id={subscription.id}
                    action={deleteSubscriptionAction}
                    compact
                    confirmText="Удалить обслуживание и связанные напоминания?"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
