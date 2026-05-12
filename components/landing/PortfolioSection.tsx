import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, Container, SectionShell } from "@/components/ui/Card";

const examples = [
  {
    title: "Страница для студии красоты",
    niche: "Beauty",
    task: "Показать услуги, цены, мастеров и запись в WhatsApp.",
    blocks: "услуги, фото, отзывы, запись",
    gradient: "from-pink-200 via-white to-brand-mist",
  },
  {
    title: "Сайт для онлайн-курса",
    niche: "Education",
    task: "Объяснить программу, формат и условия участия.",
    blocks: "программа, эксперт, результаты, заявка",
    gradient: "from-sky-200 via-white to-brand-mist",
  },
  {
    title: "Сайт для юридических услуг",
    niche: "Services",
    task: "Дать доверие, описать направления и консультацию.",
    blocks: "услуги, опыт, FAQ, контакты",
    gradient: "from-violet-200 via-white to-brand-mist",
  },
  {
    title: "Страница для ремонта и услуг",
    niche: "Local service",
    task: "Собрать заявки с понятной ценой и быстрым контактом.",
    blocks: "работы, цены, гарантия, WhatsApp",
    gradient: "from-amber-200 via-white to-brand-mist",
  },
];

export function PortfolioSection() {
  return (
    <SectionShell id="examples">
      <Container>
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Примеры</p>
            <h2 className="mt-3 text-3xl font-black text-brand-ink sm:text-5xl">
              Примеры страниц, которые можно сделать
            </h2>
          </div>
        </div>
        <div className="mt-9 grid gap-5 lg:grid-cols-4">
          {examples.map((example) => (
            <Card key={example.title} className="overflow-hidden p-0">
              <div className={`h-48 bg-gradient-to-br ${example.gradient} p-4`}>
                <div className="h-full rounded-3xl bg-white/78 p-4 shadow-sm">
                  <div className="mb-4 h-4 w-28 rounded-full bg-brand/30" />
                  <div className="space-y-2">
                    <div className="h-4 rounded-full bg-brand-ink/80" />
                    <div className="h-4 w-3/4 rounded-full bg-brand-ink/50" />
                    <div className="h-16 rounded-2xl bg-brand-mist" />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="h-10 rounded-2xl bg-white" />
                    <div className="h-10 rounded-2xl bg-white" />
                    <div className="h-10 rounded-2xl bg-white" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">{example.niche}</p>
                <h3 className="mt-2 text-lg font-black text-brand-ink">{example.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/60">{example.task}</p>
                <p className="mt-3 text-sm font-semibold text-brand-dark">{example.blocks}</p>
                <Button variant="secondary" className="mt-5 w-full" type="button">
                  Посмотреть пример
                  <ArrowUpRight className="size-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
