import { Container, SectionShell } from "@/components/ui/Card";

const steps = [
  "Заявка",
  "Короткий бриф",
  "Структура страницы",
  "Дизайн",
  "Сборка сайта",
  "Запуск",
  "Ежемесячное обслуживание",
];

export function ProcessSection() {
  return (
    <SectionShell id="process">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Процесс</p>
          <h2 className="mt-3 text-3xl font-black text-brand-ink sm:text-5xl">Как проходит работа</h2>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-7">
          {steps.map((step, index) => (
            <div key={step} className="rounded-[1.6rem] bg-white p-5 shadow-sm">
              <div className="mb-8 flex size-11 items-center justify-center rounded-2xl bg-brand text-lg font-black text-white">
                {index + 1}
              </div>
              <p className="font-black text-brand-ink">{step}</p>
            </div>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
