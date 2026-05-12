import { FileText, Gauge, LifeBuoy, MessageCircle, Palette, PenLine, ShieldCheck, Smartphone, Target, Wrench } from "lucide-react";
import { Card, Container, SectionShell } from "@/components/ui/Card";

const features = [
  ["структура страницы", FileText],
  ["текст без воды", PenLine],
  ["современный дизайн", Palette],
  ["адаптация под телефон", Smartphone],
  ["кнопка WhatsApp", MessageCircle],
  ["форма заявки", Target],
  ["базовая настройка", Wrench],
  ["поддержка после запуска", LifeBuoy],
  ["подготовка под рекламу", Gauge],
  ["блоки доверия", ShieldCheck],
] as const;

export function FeaturesSection() {
  return (
    <SectionShell id="features">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Запуск</p>
          <h2 className="mt-3 text-3xl font-black text-brand-ink sm:text-5xl">Что входит в запуск сайта</h2>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map(([title, Icon]) => (
            <Card key={title} className="p-5">
              <Icon className="mb-5 size-7 text-brand" />
              <p className="font-black text-brand-ink">{title}</p>
            </Card>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
