import { createSubscriptionAction } from "@/app/admin/actions";
import { FormPanel } from "@/components/admin/FormPanel";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";
import { subscriptionStatusOptions, subscriptionTypeOptions } from "@/lib/admin-labels";
import { toDateInput } from "@/lib/utils";

export function CreateSubscriptionModal({
  clients,
  projects,
}: {
  clients: Array<{ id: string; name: string; businessName: string | null }>;
  projects: Array<{ id: string; title: string }>;
}) {
  return (
    <FormPanel title="Добавить обслуживание">
      <form action={createSubscriptionAction} className="grid gap-4 md:grid-cols-2">
        <Label>
          Клиент
          <Select name="clientId" required defaultValue="">
            <option value="" disabled>Выберите клиента</option>
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
          Тип
          <Select name="type" defaultValue="monthly">
            {subscriptionTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Label>
        <Label>Сумма<Input name="amount" type="number" defaultValue={4990} min={0} /></Label>
        <Label>Старт<Input name="startDate" type="date" required defaultValue={toDateInput(new Date())} /></Label>
        <Label>Следующая оплата<Input name="nextPaymentDate" type="date" /></Label>
        <Label>
          Статус
          <Select name="status" defaultValue="active">
            {subscriptionStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Label>
        <Label className="md:col-span-2">Заметки<Textarea name="notes" /></Label>
        <Button className="md:col-span-2">Сохранить обслуживание</Button>
      </form>
    </FormPanel>
  );
}
