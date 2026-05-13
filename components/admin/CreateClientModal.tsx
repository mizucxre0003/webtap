import { createClientAction } from "@/app/admin/actions";
import { FormPanel } from "@/components/admin/FormPanel";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";
import { clientStatusOptions } from "@/lib/admin-labels";

export function CreateClientModal() {
  return (
    <FormPanel title="Добавить клиента">
      <form action={createClientAction} className="grid gap-4 md:grid-cols-2">
        <Label>Имя клиента<Input name="name" required /></Label>
        <Label>Телефон<Input name="phone" required /></Label>
        <Label>Название бизнеса<Input name="businessName" /></Label>
        <Label>Контактное лицо<Input name="contactPerson" /></Label>
        <Label>WhatsApp<Input name="whatsapp" /></Label>
        <Label>Instagram<Input name="instagram" /></Label>
        <Label>Email<Input name="email" type="email" /></Label>
        <Label>Ниша<Input name="niche" /></Label>
        <Label>Город<Input name="city" /></Label>
        <Label>
          Статус
          <Select name="status" defaultValue="active">
            {clientStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Label>
        <Label className="md:col-span-2">Заметки<Textarea name="notes" /></Label>
        <Button className="md:col-span-2">Сохранить клиента</Button>
      </form>
    </FormPanel>
  );
}
