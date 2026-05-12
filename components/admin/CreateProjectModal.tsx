import { createProjectAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";
import { FormPanel } from "@/components/admin/FormPanel";
import { toDateInput } from "@/lib/utils";

export function CreateProjectModal({
  clients,
}: {
  clients: Array<{ id: string; name: string; businessName: string | null }>;
}) {
  return (
    <FormPanel title="Добавить проект">
      <form action={createProjectAction} className="grid gap-4 md:grid-cols-2">
        <Label>
          Клиент
          <Select name="clientId" required defaultValue="">
            <option value="" disabled>Выберите клиента</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.businessName ?? client.name}
              </option>
            ))}
          </Select>
        </Label>
        <Label>Название проекта<Input name="title" required /></Label>
        <Label>
          Статус
          <Select name="status" defaultValue="brief">
            <option value="brief">brief</option>
            <option value="design">design</option>
            <option value="development">development</option>
            <option value="waiting_payment">waiting_payment</option>
            <option value="launched">launched</option>
            <option value="support">support</option>
            <option value="paused">paused</option>
            <option value="closed">closed</option>
          </Select>
        </Label>
        <Label>Стоимость запуска<Input name="launchPrice" type="number" defaultValue={49990} min={0} /></Label>
        <Label>Начало<Input name="launchStartedAt" type="date" defaultValue={toDateInput(new Date())} /></Label>
        <Label>Дата запуска<Input name="launchedAt" type="date" /></Label>
        <Label>Ссылка на сайт<Input name="websiteUrl" placeholder="https://" /></Label>
        <Label>Домен<Input name="domain" /></Label>
        <Label>Хостинг<Input name="hosting" defaultValue="Koyeb" /></Label>
        <Label className="md:col-span-2">Описание<Textarea name="description" /></Label>
        <Label className="md:col-span-2">Заметки<Textarea name="notes" /></Label>
        <Button className="md:col-span-2">Сохранить проект</Button>
      </form>
    </FormPanel>
  );
}
