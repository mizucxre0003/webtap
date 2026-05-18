import {
  BriefcaseBusiness,
  GraduationCap,
  Hammer,
  Heart,
  MapPin,
  Package,
  Scale,
  Sparkles,
} from "lucide-react";
import { Card, Container, SectionShell } from "@/components/ui/Card";

const items = [
  ["Салоны и beauty-мастера", Heart],
  ["Курсы и эксперты", GraduationCap],
  ["Ремонт и услуги", Hammer],
  ["Кафе и доставка", Sparkles],
  ["Консалтинг и B2B", BriefcaseBusiness],
  ["Локальный бизнес", MapPin],
  ["Магазины и небольшие бренды", Package],
  ["Специалисты, которым нужны заявки", Scale],
] as const;

export function AudienceSection() {
  return (
    <SectionShell id="audience" className="pt-10">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Для кого</p>
          <h2 className="mt-3 text-3xl font-black text-brand-ink sm:text-5xl">
            Кому подойдёт сайт от WebTap
          </h2>
        </div>
        <div className="-mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {items.map(([title, Icon]) => (
            <Card key={title} className="group min-w-[78vw] snap-start p-5 transition hover:-translate-y-1 hover:shadow-glow sm:min-w-0">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-brand-mist text-brand transition group-hover:bg-brand group-hover:text-white">
                <Icon className="size-6" />
              </div>
              <h3 className="font-black text-brand-ink">{title}</h3>
            </Card>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
