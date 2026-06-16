import Image from "next/image";
import { RevealAnimation } from "@/components/landing/RevealAnimation";
import { Container, SectionShell } from "@/components/ui/Card";
import studioProcess from "@/images/assets/studio-process.webp";

const points = [
  "Начинаем с задачи бизнеса",
  "Не используем один шаблон для всех",
  "Показываем логику решений",
  "Проектируем сразу под мобильные устройства",
  "Доводим проект до рабочего запуска",
  "Остаёмся на связи после публикации",
];

export function WhyWebTapSection() {
  return (
    <SectionShell id="studio" className="bg-[#111111] text-white">
      <Container>
        <RevealAnimation className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">04 / О студии</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.035em]">
              Дизайн начинается с того, что бизнесу нужно доказать.
            </h2>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden border border-white/12 bg-white/[0.03]">
              <Image
                src={studioProcess}
                alt="Рабочий процесс WebTap"
                fill
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover grayscale opacity-72"
              />
              <div className="absolute inset-0 bg-black/18" aria-hidden="true" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-2xl text-lg leading-8 text-white/62">
              Мы не начинаем с готового шаблона. Сначала разбираем контекст: кто принимает решение, что должно вызывать доверие, какие аргументы важны и где сайт обязан быть особенно точным.
            </p>
            <div className="mt-10 border-t border-white/12">
              {points.map((point, index) => (
                <div key={point} className="grid grid-cols-[4rem_1fr] border-b border-white/12 py-5">
                  <span className="text-sm text-white/38">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-lg font-semibold text-white">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealAnimation>
      </Container>
    </SectionShell>
  );
}
