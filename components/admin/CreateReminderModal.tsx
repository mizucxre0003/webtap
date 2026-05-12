import { createReminderAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";
import { FormPanel } from "@/components/admin/FormPanel";
import { toDateInput } from "@/lib/utils";

export function CreateReminderModal({
  clients,
  projects,
  subscriptions,
}: {
  clients: Array<{ id: string; name: string; businessName: string | null }>;
  projects: Array<{ id: string; title: string }>;
  subscriptions: Array<{ id: string; type: string; amount: number }>;
}) {
  return (
    <FormPanel title="Добавить напоминание">
      <form action={createReminderAction} className="grid gap-4 md:grid-cols-2">
        <Label>
          Клиент
          <Select name="clientId" defaultValue="">
            <option value="">Без клиента</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.businessName ?? client.name}</option>
            ))}
          </Select>
        </Label>
        <Label>
          Проект
          <Select name="projectId" defaultValue="">
            <option value="">Без проекта</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.title}</option>
            ))}
          </Select>
        </Label>
        <Label>
          Обслуживание
          <Select name="subscriptionId" defaultValue="">
            <option value="">Без обслуживания</option>
            {subscriptions.map((subscription) => (
              <option key={subscription.id} value={subscription.id}>{subscription.type} · {subscription.amount} ₸</option>
            ))}
          </Select>
        </Label>
        <Label>
          Тип
          <Select name="type" defaultValue="custom">
            <option value="custom">custom</option>
            <option value="payment_due">payment_due</option>
            <option value="payment_overdue">payment_overdue</option>
            <option value="contact_client">contact_client</option>
            <option value="project_task">project_task</option>
          </Select>
        </Label>
        <Label className="md:col-span-2">Заголовок<Input name="title" required /></Label>
        <Label>Дата<Input name="remindAt" type="date" required defaultValue={toDateInput(new Date())} /></Label>
        <input type="hidden" name="status" value="pending" />
        <Label className="md:col-span-2">Описание<Textarea name="description" /></Label>
        <Button className="md:col-span-2">Сохранить напоминание</Button>
      </form>
    </FormPanel>
  );
}
