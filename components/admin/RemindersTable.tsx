import { deleteReminderAction, updateReminderStatusAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { WhatsAppButton } from "@/components/admin/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

export function RemindersTable({
  reminders,
}: {
  reminders: Array<{
    id: string;
    title: string;
    description: string | null;
    type: string;
    status: string;
    remindAt: Date;
    client: { name: string; phone: string; whatsapp: string | null } | null;
    project: { title: string } | null;
  }>;
}) {
  if (!reminders.length) return <EmptyState title="Напоминаний пока нет" />;

  return (
    <div className="overflow-x-auto">
      <table className="admin-table min-w-[1040px]">
        <thead>
          <tr>
            <th>Задача</th>
            <th>Клиент</th>
            <th>Проект</th>
            <th>Дата</th>
            <th>Тип</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((reminder) => (
            <tr key={reminder.id}>
              <td>
                <p className="font-black text-brand-ink">{reminder.title}</p>
                <p className="mt-1 max-w-sm text-sm text-black/50">{reminder.description ?? "—"}</p>
              </td>
              <td>{reminder.client?.name ?? "—"}</td>
              <td>{reminder.project?.title ?? "—"}</td>
              <td>{formatDate(reminder.remindAt)}</td>
              <td><StatusBadge value={reminder.type} /></td>
              <td><StatusBadge value={reminder.status} /></td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <WhatsAppButton phone={reminder.client?.whatsapp ?? reminder.client?.phone} />
                  <form action={updateReminderStatusAction}>
                    <input type="hidden" name="id" value={reminder.id} />
                    <input type="hidden" name="status" value="done" />
                    <Button variant="secondary" className="min-h-10 px-3">Готово</Button>
                  </form>
                  <DeleteButton
                    id={reminder.id}
                    action={deleteReminderAction}
                    compact
                    confirmText="Удалить напоминание?"
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
