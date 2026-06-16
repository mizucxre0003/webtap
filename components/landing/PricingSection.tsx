import { ArrowRight } from "lucide-react";
import { RevealAnimation } from "@/components/landing/RevealAnimation";
import { Container, SectionShell } from "@/components/ui/Card";

const formats = ["Лендинг", "Корпоративный сайт", "Индивидуальный digital-проект"];

export function PricingSection() {
  return (
    <SectionShell id="pricing" className="bg-[#0a0a0a] text-white">
      <Container>
        <RevealAnimation className="grid gap-12 border-y border-white/12 py-12 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">07 / Стоимость</p>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.035em]">
              Стоимость зависит от задачи, а не от количества экранов
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-8 text-white/62">
              После короткого брифа мы оцениваем структуру, объём дизайна, разработку и необходимые интеграции.
              Вы получаете понятный состав работ, сроки и фиксированную стоимость проекта.
            </p>
            <div className="mt-8 grid gap-2">
              {formats.map((format) => (
                <div key={format} className="border border-white/12 px-4 py-3 text-sm font-semibold text-white/78">
                  {format}
                </div>
              ))}
            </div>
            <a
              href="#lead-form"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded bg-white px-5 text-sm font-semibold text-black transition hover:bg-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Получить оценку проекта
              <ArrowRight className="size-4" />
            </a>
          </div>
        </RevealAnimation>
      </Container>
    </SectionShell>
  );
}
