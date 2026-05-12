"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, Container, SectionShell } from "@/components/ui/Card";
import { Input, Label, Select, Textarea } from "@/components/ui/Form";

type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export function LeadFormSection() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      setState({ status: "idle" });
      const response = await fetch("/api/leads", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setState({ status: "error", message: data.message ?? "Не получилось отправить заявку" });
        return;
      }
      setState({
        status: "success",
        message: "Заявка отправлена. Я свяжусь с вами в WhatsApp.",
      });
      const form = document.getElementById("webtap-lead-form") as HTMLFormElement | null;
      form?.reset();
    });
  }

  return (
    <SectionShell id="lead-form" className="bg-white/80">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Заявка</p>
            <h2 className="mt-3 text-3xl font-black text-brand-ink sm:text-5xl">
              Расскажите, какой сайт нужен бизнесу
            </h2>
            <p className="mt-5 text-lg leading-8 text-black/60">
              Оставьте контакты и пару деталей. Я посмотрю нишу, задачу и подскажу
              примерную стоимость запуска.
            </p>
          </div>
          <Card>
            <form
              id="webtap-lead-form"
              action={onSubmit}
              className="grid gap-4 sm:grid-cols-2"
            >
              <Label>
                Имя
                <Input name="name" required placeholder="Ваше имя" />
              </Label>
              <Label>
                Телефон / WhatsApp
                <Input name="phone" required placeholder="+7..." />
              </Label>
              <Label className="sm:col-span-2">
                Ниша бизнеса
                <Input name="businessNiche" required placeholder="Например: салон красоты, ремонт, курс" />
              </Label>
              <Label>
                Что нужно
                <Select name="siteType" required defaultValue="">
                  <option value="" disabled>
                    Выберите вариант
                  </option>
                  <option>сайт для услуги</option>
                  <option>страница для рекламы</option>
                  <option>сайт для записи/заявок</option>
                  <option>не знаю, нужна консультация</option>
                </Select>
              </Label>
              <Label>
                Примерный бюджет
                <Select name="budgetRange" required defaultValue="">
                  <option value="" disabled>
                    Выберите бюджет
                  </option>
                  <option>49 990 - 80 000 ₸</option>
                  <option>80 000 - 150 000 ₸</option>
                  <option>150 000 ₸+</option>
                </Select>
              </Label>
              <Label className="sm:col-span-2">
                Комментарий
                <Textarea name="comment" placeholder="Что важно показать на сайте?" />
              </Label>
              <div className="sm:col-span-2">
                <Button disabled={isPending} className="w-full">
                  <Send className="size-4" />
                  {isPending ? "Отправляю..." : "Оставить заявку"}
                </Button>
                {state.message ? (
                  <p
                    className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
                      state.status === "success"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {state.message}
                  </p>
                ) : null}
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </SectionShell>
  );
}
