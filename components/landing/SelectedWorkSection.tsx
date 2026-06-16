import { ProjectCard } from "@/components/landing/ProjectCard";
import { RevealAnimation } from "@/components/landing/RevealAnimation";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { Container, SectionShell } from "@/components/ui/Card";
import caseBeauty from "@/images/assets/case-beauty.webp";
import caseStroy from "@/images/assets/case-stroy.webp";

const projects = [
  {
    title: "Сайт для строительной компании",
    industry: "Строительство",
    year: "Концепт",
    task: "Пример страницы для компании, которой нужно показать масштаб, понятную структуру услуг и доверие к проектам.",
    status: "Пример из niche",
    href: "/niche/stroy",
    image: caseStroy,
    large: true,
  },
  {
    title: "Сайт для beauty-проекта",
    industry: "Beauty",
    year: "Концепт",
    task: "Пример визуальной подачи услуг, атмосферы бренда и сценария записи для локального сервиса.",
    status: "Пример из niche",
    href: "/niche/beauty",
    image: caseBeauty,
    large: true,
  },
];

export function SelectedWorkSection() {
  return (
    <SectionShell id="cases" className="bg-[#0a0a0a] text-white">
      <Container>
        <RevealAnimation>
          <SectionHeader
            eyebrow="01 / Кейсы"
            title="Примеры страниц"
            text="Ниже — реальные демонстрационные страницы из проекта. Они приглушены визуально, чтобы не спорить с общей монохромной системой сайта."
          />
        </RevealAnimation>

        <div className="mt-14 grid gap-5 lg:mt-20">
          {projects.map((project) => (
            <ProjectCard key={project.href} {...project} />
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
