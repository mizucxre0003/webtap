"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container, SectionShell } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const faqs = [
  [
    "Что такое сайт под заявки?",
    "Это страница, где человек быстро понимает вашу услугу, видит условия и может оставить обращение.",
  ],
  [
    "Чем такая страница отличается от обычного сайта?",
    "Она сфокусирована на одной задаче: понятно показать услугу и довести клиента до контакта.",
  ],
  [
    "Сколько стоит запуск?",
    "Запуск сайта начинается от 49 990 ₸. Точная сумма зависит от объёма и сложности.",
  ],
  [
    "Почему цена “от 49 990 ₸”?",
    "Разные проекты требуют разного количества блоков, текстов, дизайна и дополнительных функций.",
  ],
  [
    "Что входит в обслуживание за 4 990 ₸/мес?",
    "Мелкие правки, обновление контактов и текстов, контроль работоспособности и помощь с изменениями.",
  ],
  [
    "Можно ли оплатить обслуживание на год?",
    "Да. Годовое обслуживание начинается от 51 990 ₸/год.",
  ],
  [
    "Что нужно от клиента для старта?",
    "Нужны ниша, услуги, контакты, примеры, фото или материалы, если они уже есть.",
  ],
  [
    "Можно ли подключить WhatsApp?",
    "Да. На странице можно сделать понятные кнопки, которые открывают WhatsApp.",
  ],
  [
    "Сколько времени занимает запуск?",
    "Обычно от 5 дней, если материалы и ответы по проекту приходят без задержек.",
  ],
  [
    "Можно ли потом вносить изменения?",
    "Да. Для этого есть ежемесячное или годовое обслуживание после запуска.",
  ],
] as const;

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <SectionShell id="faq" className="bg-white/70">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">FAQ</p>
          <h2 className="mt-3 text-3xl font-black text-brand-ink sm:text-5xl">
            Частые вопросы
          </h2>
        </div>
        <div className="mx-auto mt-9 max-w-4xl space-y-3">
          {faqs.map(([question, answer], index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={question}
                className={cn(
                  "overflow-hidden rounded-[1.5rem] border bg-white shadow-sm transition-all duration-300",
                  isOpen
                    ? "border-brand/25 shadow-[0_22px_60px_rgba(147,112,219,0.14)]"
                    : "border-black/5 hover:border-brand/20 hover:shadow-[0_18px_48px_rgba(17,16,24,0.08)]",
                )}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="text-base font-black text-brand-ink sm:text-lg">
                    {question}
                  </span>
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-2xl transition",
                      isOpen ? "rotate-180 bg-brand text-white" : "bg-brand-mist text-brand",
                    )}
                  >
                    <ChevronDown className="size-5" />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-7 text-black/60 sm:px-6">
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </SectionShell>
  );
}
