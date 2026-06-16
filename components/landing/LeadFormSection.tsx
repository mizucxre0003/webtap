import { ContactForm } from "@/components/landing/ContactForm";
import { RevealAnimation } from "@/components/landing/RevealAnimation";
import { Container, SectionShell } from "@/components/ui/Card";

type LeadFormSectionProps = {
  whatsappHref: string;
};

export function LeadFormSection({ whatsappHref }: LeadFormSectionProps) {
  return (
    <SectionShell id="lead-form" className="bg-[#111111] text-white">
      <Container>
        <RevealAnimation className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">08 / Контакт</p>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.035em]">
              Давайте сделаем сайт, который соответствует уровню вашего бизнеса
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/62">
              Расскажите о задаче. Мы изучим проект и предложим подходящий формат работы.
            </p>
            <div className="mt-10 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-white/42">
              <span className="border border-white/12 px-3 py-2">Strategy</span>
              <span className="border border-white/12 px-3 py-2">Design</span>
              <span className="border border-white/12 px-3 py-2">Development</span>
            </div>
          </div>

          <div className="border border-white/12 bg-[#0a0a0a] p-5 sm:p-7 lg:col-span-5 lg:col-start-8">
            <ContactForm whatsappHref={whatsappHref} />
          </div>
        </RevealAnimation>
      </Container>
    </SectionShell>
  );
}
