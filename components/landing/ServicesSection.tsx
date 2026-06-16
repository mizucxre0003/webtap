import { RevealAnimation } from "@/components/landing/RevealAnimation";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { ServiceRow } from "@/components/landing/ServiceRow";
import { Container, SectionShell } from "@/components/ui/Card";

const services = [
  {
    number: "01",
    title: "Корпоративные сайты",
    text: "Для компаний, которым важно системно представить услуги, экспертизу, проекты и преимущества.",
  },
  {
    number: "02",
    title: "Продающие лендинги",
    text: "Для запуска нового направления, продукта или рекламной кампании.",
  },
  {
    number: "03",
    title: "UX/UI-дизайн",
    text: "Проектирование интерфейсов, дизайн-систем и адаптивных пользовательских сценариев.",
  },
  {
    number: "04",
    title: "Разработка и запуск",
    text: "Адаптивная сборка, интеграции, аналитика, базовая SEO-подготовка и технический запуск.",
  },
];

export function ServicesSection() {
  return (
    <SectionShell id="services" className="bg-[#0a0a0a] text-white">
      <Container>
        <RevealAnimation>
          <SectionHeader eyebrow="03 / Услуги" title="Собираем страницу как рабочую систему, а не как набор блоков" />
        </RevealAnimation>
        <div className="mt-14 lg:mt-20">
          {services.map((service) => (
            <ServiceRow key={service.number} {...service} />
          ))}
          <div className="border-t border-white/12" />
        </div>
      </Container>
    </SectionShell>
  );
}
