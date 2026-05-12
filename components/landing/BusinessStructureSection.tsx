import { ArrowRight } from "lucide-react";
import { Card, Container, SectionShell } from "@/components/ui/Card";

const steps = [
  "Что вы предлагаете",
  "Кому это подходит",
  "Почему вам можно доверять",
  "Сколько это стоит или как узнать цену",
  "Как проходит работа",
  "Как оставить заявку",
];

export function BusinessStructureSection() {
  return (
    <SectionShell>
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Логика страницы</p>
          <h2 className="mt-3 text-3xl font-black text-brand-ink sm:text-5xl">
            Что увидит ваш клиент на сайте
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step} className="relative overflow-hidden p-6">
              <div className="absolute right-4 top-4 text-5xl font-black text-brand-mist">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="relative z-10 text-lg font-black text-brand-ink">{step}</p>
              <div className="relative z-10 mt-6 flex size-10 items-center justify-center rounded-2xl bg-brand-mist text-brand">
                <ArrowRight className="size-5" />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
