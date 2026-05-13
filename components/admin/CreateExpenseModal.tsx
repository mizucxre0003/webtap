import { createExpenseAction } from "@/app/admin/actions";
import { FormPanel } from "@/components/admin/FormPanel";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";
import { expenseCategoryOptions } from "@/lib/admin-labels";
import { toDateInput } from "@/lib/utils";

export function CreateExpenseModal({
  clients,
  projects,
}: {
  clients: Array<{ id: string; name: string; businessName: string | null }>;
  projects: Array<{ id: string; title: string }>;
}) {
  return (
    <FormPanel title="Добавить расход">
      <form action={createExpenseAction} className="grid gap-4 md:grid-cols-2">
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
          Категория
          <Select name="category" defaultValue="domain">
            {expenseCategoryOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Label>
        <Label>Сумма<Input name="amount" type="number" min={1} required /></Label>
        <Label>Дата<Input name="spentAt" type="date" required defaultValue={toDateInput(new Date())} /></Label>
        <input type="hidden" name="currency" value="KZT" />
        <Label className="md:col-span-2">Комментарий<Textarea name="comment" /></Label>
        <Button className="md:col-span-2">Сохранить расход</Button>
      </form>
    </FormPanel>
  );
}
