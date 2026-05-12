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
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Стоимость</p>
            <h2 className="mt-3 text-3xl font-black text-brand-ink sm:text-5xl">Стоимость запуска</h2>
            <p className="mt-5 text-lg leading-8 text-black/60">
              Итоговая стоимость зависит от сложности проекта, количества блоков,
              текстов, дизайна и дополнительных функций.
            </p>
          </div>
          <Card className="border-brand/15 p-7">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-brand">Главный оффер</p>
            <h3 className="mt-3 text-4xl font-black text-brand-ink">Запуск сайта от 49 990 ₸</h3>
            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl bg-brand-mist p-4 font-bold text-brand-ink">
                Запуск: от 49 990 ₸
              </div>
              <div className="rounded-3xl bg-brand-mist p-4 font-bold text-brand-ink">
                Далее обслуживание: от 4 990 ₸/мес
              </div>
              <div className="rounded-3xl bg-brand-mist p-4 font-bold text-brand-ink">
                Годовое обслуживание: от 51 990 ₸/год
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {support.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-black/65">
                  <CheckCircle2 className="size-4 text-brand" />
                  {item}
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
