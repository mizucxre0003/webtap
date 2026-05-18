import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, Container, SectionShell } from "@/components/ui/Card";

const problems = [
  "клиент не понимает, чем вы занимаетесь",
  "цены и условия разбросаны по постам",
  "отзывы сложно найти",
  "нет понятной кнопки заявки",
  "в директе теряются обращения",
  "рекламу некуда нормально вести",
  "бизнес выглядит менее серьёзно",
];

export function ProblemSection() {
  return (
    <SectionShell className="bg-white/70">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Проблема</p>
            <h2 className="mt-3 text-3xl font-black text-brand-ink sm:text-5xl">
              Когда Instagram уже есть, но заявки теряются
            </h2>
          </div>
          <div className="grid max-h-[23rem] snap-y gap-4 overflow-y-auto pr-1 [scrollbar-width:none] sm:max-h-none sm:overflow-visible sm:pr-0 [&::-webkit-scrollbar]:hidden">
            {problems.map((problem) => (
              <div key={problem} className="flex min-h-24 snap-start items-start gap-3 rounded-3xl bg-brand-soft p-4 sm:min-h-0">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-brand-dark" />
                <span className="font-semibold text-brand-ink">{problem}</span>
              </div>
            ))}
            <Card className="mt-2 flex snap-start items-start gap-4 bg-gradient-to-br from-brand to-brand-dark text-white">
              <CheckCircle2 className="mt-1 size-7 shrink-0" />
              <p className="text-lg font-bold leading-8">
                WebTap делает страницу, где всё важное собрано в одном месте: услуга,
                преимущества, доверие, стоимость, контакты и заявка.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
