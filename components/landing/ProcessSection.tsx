import { ProcessStep } from "@/components/landing/ProcessStep";
import { RevealAnimation } from "@/components/landing/RevealAnimation";
import { Container, SectionShell } from "@/components/ui/Card";

const steps = [
  ["01", "Погружение", "Изучаем бизнес, аудиторию, конкурентов и задачу проекта."],
  ["02", "Структура", "Формируем сценарий страницы, приоритеты контента и путь пользователя."],
  ["03", "Дизайн", "Создаём визуальную концепцию и адаптивные макеты."],
  ["04", "Разработка", "Собираем интерфейс, настраиваем формы, интеграции и аналитику."],
  ["05", "Запуск", "Проверяем сайт, подключаем домен, индексацию и передаём готовый проект."],
] as const;

export function ProcessSection() {
  return (
    <SectionShell id="process" className="bg-[#0a0a0a] text-white">
      <Container>
        <RevealAnimation className="grid gap-12 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">05 / Процесс</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.035em]">
              Работа идёт от смысла к запуску.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {steps.map(([number, title, text]) => (
              <ProcessStep key={number} number={number} title={title} text={text} />
            ))}
          </div>
        </RevealAnimation>
      </Container>
    </SectionShell>
  );
}
