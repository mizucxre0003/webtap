"use client";

import { MessageCircle, Send } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Form";

type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

type ContactFormProps = {
  whatsappHref: string;
};

const darkField =
  "border-white/14 bg-white/[0.04] text-white placeholder:text-white/32 focus:border-white/55 focus:ring-white/10";

export function ContactForm({ whatsappHref }: ContactFormProps) {
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
        setState({ status: "error", message: data.message ?? "Проверьте поля формы и попробуйте ещё раз." });
        return;
      }

      setState({
        status: "success",
        message: "Заявка отправлена. Мы свяжемся с вами и обсудим задачу.",
      });
      const form = document.getElementById("webtap-lead-form") as HTMLFormElement | null;
      form?.reset();
    });
  }

  return (
    <form id="webtap-lead-form" action={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="siteType" value="Оценка проекта" />
      <input type="hidden" name="budgetRange" value="После брифа" />

      <Label className="text-white/74">
        Имя
        <Input name="name" required placeholder="Ваше имя" className={darkField} />
      </Label>
      <Label className="text-white/74">
        Телефон или WhatsApp
        <Input name="phone" required placeholder="+7..." className={darkField} />
      </Label>
      <Label className="text-white/74 sm:col-span-2">
        Компания
        <Input name="businessNiche" required placeholder="Название или сфера компании" className={darkField} />
      </Label>
      <Label className="text-white/74 sm:col-span-2">
        Коротко о задаче
        <Textarea name="comment" placeholder="Что нужно создать, обновить или запустить?" className={darkField} />
      </Label>

      <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
        <Button disabled={isPending} className="w-full">
          <Send className="size-4" />
          {isPending ? "Отправляем..." : "Обсудить проект"}
        </Button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded border border-white/18 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <MessageCircle className="size-4" />
          Написать в WhatsApp
        </a>
      </div>

      {state.message ? (
        <p
          className={`sm:col-span-2 border px-4 py-3 text-sm font-semibold ${
            state.status === "success"
              ? "border-white/18 bg-white text-black"
              : "border-red-300/40 bg-red-500/12 text-red-100"
          }`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
