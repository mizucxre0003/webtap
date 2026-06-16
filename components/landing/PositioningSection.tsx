import { RevealAnimation } from "@/components/landing/RevealAnimation";
import { Container, SectionShell } from "@/components/ui/Card";

export function PositioningSection() {
  return (
    <SectionShell className="bg-[#e8e8e5] text-black">
      <Container>
        <RevealAnimation className="grid gap-10 lg:grid-cols-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/48 lg:col-span-3">
            02 / Позиция
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            <p className="text-[clamp(2rem,4.8vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
              Сайт — это не набор блоков. Это первое впечатление о компании ещё до звонка, встречи или коммерческого предложения.
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-black/62">
              Мы соединяем позиционирование, структуру, визуальный язык и разработку, чтобы цифровой образ компании соответствовал уровню её бизнеса.
            </p>
          </div>
        </RevealAnimation>
      </Container>
    </SectionShell>
  );
}
