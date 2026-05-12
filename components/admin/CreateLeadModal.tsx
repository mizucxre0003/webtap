import { createLeadAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";
import { FormPanel } from "@/components/admin/FormPanel";

export function CreateLeadModal() {
  return (
    <FormPanel title="Добавить заявку">
      <form action={createLeadAction} className="grid gap-4 md:grid-cols-2">
        <Label>Имя<Input name="name" required /></Label>
        <Label>Телефон<Input name="phone" required /></Label>
        <Label className="md:col-span-2">Ниша<Input name="businessNiche" required /></Label>
        <Label>
          Что нужно
          <Select name="siteType" required defaultValue="сайт для услуги">
            <option>сайт для услуги</option>
            <option>страница для рекламы</option>
            <option>сайт для записи/заявок</option>
            <option>не знаю, нужна консультация</option>
          </Select>
        </Label>
        <Label>
          Бюджет
          <Select name="budgetRange" required defaultValue="49 990 - 80 000 ₸">
            <option>49 990 - 80 000 ₸</option>
            <option>80 000 - 150 000 ₸</option>
            <option>150 000 ₸+</option>
          </Select>
        </Label>
        <Label className="md:col-span-2">Комментарий<Textarea name="comment" /></Label>
        <Button className="md:col-span-2">Сохранить заявку</Button>
      </form>
    </FormPanel>
  );
}
