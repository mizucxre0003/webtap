import {
  ArrowUpRight,
  CircleDot,
  Layers3,
  MessageSquareText,
  Radar,
  ScanLine,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Card, Container, SectionShell } from "@/components/ui/Card";

const modules = [
  {
    title: "Сканируем смысл",
    text: "вынимаем из бизнеса главное: услуга, аудитория, выгода, доверие",
    icon: ScanLine,
  },
  {
    title: "Собираем маршрут",
    text: "каждый блок ведёт к следующему, а не просто занимает место",
    icon: Layers3,
  },
  {
    title: "Убираем шум",
    text: "тексты короткие, человеческие и без лишнего напряжения",
    icon: WandSparkles,
  },
  {
    title: "Делаем точки заявки",
    text: "WhatsApp и форма появляются там, где клиент уже готов написать",
    icon: MessageSquareText,
  },
];

export function NextGenShowcaseSection() {
  return (
    <SectionShell className="bg-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Упаковка</p>
            <h2 className="mt-3 text-3xl font-black text-brand-ink sm:text-5xl">
              Не просто красиво. Страница должна думать за клиента
            </h2>
            <p className="mt-5 text-lg leading-8 text-black/60">
              WebTap превращает разрозненные услуги, цены, отзывы и контакты в
              понятный экран, где клиенту не нужно гадать, что делать дальше.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {modules.map((module) => (
                <Card key={module.title} className="p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
                  <module.icon className="mb-4 size-6 text-brand" />
                  <h3 className="font-black text-brand-ink">{module.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/55">{module.text}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-brand-ink p-5 text-white shadow-soft">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-white/35">
                    decision map
                  </p>
                  <p className="mt-1 text-2xl font-black">Экран принятия решения</p>
                </div>
                <Radar className="size-7 text-brand" />
              </div>
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5">
                <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-brand to-transparent" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["оффер", "что вы делаете"],
                    ["доверие", "почему вам можно верить"],
                    ["условия", "цена, сроки, формат"],
                    ["заявка", "куда написать"],
                  ].map(([title, text], index) => (
                    <div
                      key={title}
                      className="relative rounded-3xl bg-white p-4 text-brand-ink"
                      style={{ transform: index % 2 ? "translateY(18px)" : undefined }}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <CircleDot className="size-5 text-brand" />
                        <span className="text-xs font-black text-black/30">0{index + 1}</span>
                      </div>
                      <p className="text-lg font-black">{title}</p>
                      <p className="mt-1 text-sm text-black/55">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 rounded-3xl bg-white p-4 text-brand-ink">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-black/35">
                      next action
                    </p>
                    <p className="mt-1 font-black">Клиенту понятно, зачем писать</p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-brand text-white">
                    <ArrowUpRight className="size-5" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-3xl bg-white p-4 text-brand-ink shadow-glow md:block">
              <div className="flex items-center gap-2 text-sm font-black">
                <Sparkles className="size-5 text-brand" />
                меньше хаоса
              </div>
              <p className="mt-1 text-xs text-black/50">больше понятных действий</p>
            </div>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
