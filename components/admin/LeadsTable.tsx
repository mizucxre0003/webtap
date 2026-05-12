import Link from "next/link";
import { deleteLeadAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { WhatsAppButton } from "@/components/admin/WhatsAppButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

export function LeadsTable({
  leads,
}: {
  leads: Array<{
    id: string;
    name: string;
    phone: string;
    businessNiche: string;
    siteType: string;
    budgetRange: string;
    status: string;
    createdAt: Date;
  }>;
}) {
  if (!leads.length) return <EmptyState title="Заявок пока нет" />;

  return (
    <div className="overflow-x-auto">
      <table className="admin-table min-w-[980px]">
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Ниша</th>
            <th>Что нужно</th>
            <th>Бюджет</th>
            <th>Статус</th>
            <th>Дата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>
                <Link href={`/admin/leads/${lead.id}`} className="font-black text-brand-ink">
                  {lead.name}
                </Link>
                <p className="text-sm text-black/45">{lead.phone}</p>
              </td>
              <td>{lead.businessNiche}</td>
              <td>{lead.siteType}</td>
              <td>{lead.budgetRange}</td>
              <td><StatusBadge value={lead.status} /></td>
              <td>{formatDate(lead.createdAt)}</td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <WhatsAppButton phone={lead.phone} />
                  <Link href={`/admin/leads/${lead.id}`} className="rounded-2xl bg-brand-mist px-4 py-2 text-sm font-bold text-brand-dark">
                    Открыть
                  </Link>
                  <DeleteButton
                    id={lead.id}
                    action={deleteLeadAction}
                    compact
                    confirmText="Удалить заявку вместе с заметками?"
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
