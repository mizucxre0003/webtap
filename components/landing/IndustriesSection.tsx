import { RevealAnimation } from "@/components/landing/RevealAnimation";
import { Container, SectionShell } from "@/components/ui/Card";

const industries = [
  "Строительство и недвижимость",
  "Производство",
  "B2B и профессиональные услуги",
  "Клиники и медицинские проекты",
  "Образование",
  "Сервисы и технологические компании",
];

export function IndustriesSection() {
  return (
    <SectionShell className="bg-[#e8e8e5] text-black">
      <Container>
        <RevealAnimation className="grid gap-12 lg:grid-cols-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/48 lg:col-span-3">
            06 / Сферы
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h2 className="text-[clamp(2rem,4.2vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
              Работаем с бизнесом, где доверие к компании влияет на решение клиента
            </h2>
            <div className="mt-12 grid border-t border-black/12 sm:grid-cols-2">
              {industries.map((industry, index) => (
                <div
                  key={industry}
                  className="grid min-h-28 content-between border-b border-black/12 py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
                >
                  <span className="text-sm text-black/38">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-6 text-xl font-semibold tracking-[-0.02em]">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealAnimation>
      </Container>
    </SectionShell>
  );
}
