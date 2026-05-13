import { createPaymentAction } from "@/app/admin/actions";
import { FormPanel } from "@/components/admin/FormPanel";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";
import {
  labelFrom,
  paymentMethodOptions,
  paymentTypeOptions,
  subscriptionTypeLabels,
} from "@/lib/admin-labels";
import { toDateInput } from "@/lib/utils";

export function CreatePaymentModal({
  clients,
  projects,
  subscriptions,
}: {
  clients: Array<{ id: string; name: string; businessName: string | null }>;
  projects: Array<{ id: string; title: string; clientId: string }>;
  subscriptions: Array<{ id: string; clientId: string; amount: number; type: string }>;
}) {
  return (
    <FormPanel title="Добавить оплату">
      <form action={createPaymentAction} className="grid gap-4 md:grid-cols-2">
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
          Обслуживание
          <Select name="subscriptionId" defaultValue="">
            <option value="">Без обслуживания</option>
            {subscriptions.map((subscription) => (
              <option key={subscription.id} value={subscription.id}>
                {labelFrom(subscriptionTypeLabels, subscription.type)} · {subscription.amount} ₸
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          Тип оплаты
          <Select name="type" defaultValue="launch_payment">
            {paymentTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Label>
        <Label>Сумма<Input name="amount" type="number" required min={1} /></Label>
        <Label>Дата оплаты<Input name="paidAt" type="date" required defaultValue={toDateInput(new Date())} /></Label>
        <Label>
          Способ
          <Select name="method" defaultValue="kaspi">
            {paymentMethodOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Label>
        <input type="hidden" name="currency" value="KZT" />
        <Label className="md:col-span-2">Комментарий<Textarea name="comment" /></Label>
        <Button className="md:col-span-2">Сохранить оплату</Button>
      </form>
    </FormPanel>
  );
}
