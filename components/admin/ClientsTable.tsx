import Link from "next/link";
import { deleteClientAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { WhatsAppButton } from "@/components/admin/WhatsAppButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate, formatKzt } from "@/lib/utils";

export function ClientsTable({
  clients,
}: {
  clients: Array<{
    id: string;
    name: string;
    businessName: string | null;
    phone: string;
    whatsapp: string | null;
    niche: string | null;
    status: string;
    createdAt: Date;
    payments: Array<{ amount: number }>;
    expenses: Array<{ amount: number }>;
  }>;
}) {
  if (!clients.length) return <EmptyState title="Клиентов пока нет" />;

  return (
    <div className="overflow-x-auto">
      <table className="admin-table min-w-[980px]">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Ниша</th>
            <th>Статус</th>
            <th>Прибыль</th>
            <th>Создан</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            const income = client.payments.reduce((sum, item) => sum + item.amount, 0);
            const expenses = client.expenses.reduce((sum, item) => sum + item.amount, 0);
            return (
              <tr key={client.id}>
                <td>
                  <Link href={`/admin/clients/${client.id}`} className="font-black text-brand-ink">
                    {client.businessName ?? client.name}
                  </Link>
                  <p className="text-sm text-black/45">{client.phone}</p>
                </td>
                <td>{client.niche ?? "—"}</td>
                <td><StatusBadge value={client.status} /></td>
                <td className="font-black">{formatKzt(income - expenses)}</td>
                <td>{formatDate(client.createdAt)}</td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <WhatsAppButton phone={client.whatsapp ?? client.phone} />
                    <Link href={`/admin/clients/${client.id}`} className="rounded-2xl bg-brand-mist px-4 py-2 text-sm font-bold text-brand-dark">
                      Открыть
                    </Link>
                    <DeleteButton
                      id={client.id}
                      action={deleteClientAction}
                      compact
                      confirmText="Удалить клиента и связанные проекты, оплаты, расходы и напоминания?"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
