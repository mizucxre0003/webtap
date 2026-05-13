import { CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Card, Container, SectionShell } from "@/components/ui/Card";

const support = [
  "мелкие правки",
  "обновление контактов",
  "обновление текстов",
  "контроль работоспособности",
  "помощь с изменениями",
  "поддержка после запуска",
];

export function PricingSection() {
  return (
    <SectionShell id="pricing" className="bg-brand-mist">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Стоимость</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-brand-ink sm:text-5xl">
              Стоимость запуска
            </h2>
            <p className="mt-4 text-base leading-relaxed text-black/60 sm:mt-5 sm:text-lg sm:leading-8">
              Итоговая стоимость зависит от сложности проекта, количества блоков,
              текстов, дизайна и дополнительных функций.
            </p>
          </div>
          <Card className="border-brand/15 p-5 sm:p-7">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-brand">Главный оффер</p>
            <h3 className="mt-3 text-3xl font-black leading-tight text-brand-ink sm:text-4xl">
              Запуск сайта от 49 990 ₸
            </h3>
            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl bg-brand-mist p-4 text-lg font-black text-brand-ink">
                Запуск от 49 990 ₸
              </div>
              <div className="rounded-3xl bg-brand-mist p-4 text-base font-bold text-brand-ink">
                Далее от 4 990 ₸/мес
              </div>
              <div className="rounded-3xl bg-brand-mist p-4 text-base font-bold text-brand-ink">
                Годовое обслуживание от 51 990 ₸/год
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {support.map((item) => (
                <div key={item} className="flex min-w-0 items-center gap-2 text-sm font-semibold text-black/65">
                  <CheckCircle2 className="size-4 shrink-0 text-brand" />
                  <span className="break-words">{item}</span>
                </div>
              ))}
            </div>
            <LinkButton href="#lead-form" className="mt-7 w-full">
              Узнать стоимость моего сайта
            </LinkButton>
          </Card>
        </div>
      </Container>
    </SectionShell>
  );
}
