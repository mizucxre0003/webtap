import {
  BarChart3,
  Blocks,
  FileCheck2,
  FormInput,
  LayoutGrid,
  LifeBuoy,
  MessageCircle,
  PencilRuler,
  Smartphone,
  Type,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, Container, SectionShell } from "@/components/ui/Card";

const skills = [
  {
    title: "Структура под заявки",
    text: "Расставляем блоки так, чтобы клиент быстро понял услугу и дошёл до заявки.",
    icon: LayoutGrid,
    level: 94,
  },
  {
    title: "Тексты без воды",
    text: "Пишем простым языком: что вы делаете, для кого, сколько стоит и почему вам можно доверять.",
    icon: Type,
    level: 91,
  },
  {
    title: "Современный дизайн",
    text: "Делаем аккуратный визуал, который выглядит дороже обычной страницы в Instagram.",
    icon: PencilRuler,
    level: 93,
  },
  {
    title: "Mobile-first",
    text: "Сначала думаем о телефоне, потому что большинство клиентов переходит с мобильного.",
    icon: Smartphone,
    level: 96,
  },
  {
    title: "WhatsApp-заявки",
    text: "Добавляем понятные кнопки, чтобы клиент мог написать в один тап.",
    icon: MessageCircle,
    level: 98,
  },
  {
    title: "Форма заявки",
    text: "Клиент может оставить имя, телефон, услугу и комментарий.",
    icon: FormInput,
    level: 88,
  },
  {
    title: "Блоки доверия",
    text: "Отзывы, кейсы, фото, преимущества, процесс работы и FAQ.",
    icon: FileCheck2,
    level: 90,
  },
  {
    title: "Подготовка под рекламу",
    text: "Страницу можно использовать для таргета, сторис, профиля Instagram и рекламы.",
    icon: BarChart3,
    level: 87,
  },
  {
    title: "Поддержка",
    text: "После запуска можно менять тексты, контакты, блоки и актуальную информацию.",
    icon: LifeBuoy,
    level: 89,
  },
  {
    title: "Мини-CRM",
    text: "Для себя WebTap использует CRM, чтобы вести клиентов, оплаты, расходы и напоминания.",
    icon: Blocks,
    level: 92,
  },
];

const tags = ["UI", "UX", "Text", "Mobile", "WhatsApp", "CRM", "Support"];

export function SkillsSection() {
  return (
    <SectionShell id="skills" className="bg-brand-ink text-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Скиллы</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">Что умеет WebTap</h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              Мы не просто собираем страницу. Мы упаковываем бизнес так, чтобы клиенту
              было легко понять, довериться и оставить заявку.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <Card
                key={skill.title}
                className="group border-white/10 bg-white/[0.08] p-5 text-white shadow-none transition hover:-translate-y-1 hover:bg-white/[0.13]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-glow">
                    <skill.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-black">{skill.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/65">{skill.text}</p>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-bold text-white/50">
                    <span>skill meter</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-white to-brand"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Badge className="bg-white text-brand-ink">структура</Badge>
          <Badge className="bg-white text-brand-ink">доверие</Badge>
          <Badge className="bg-white text-brand-ink">заявки</Badge>
          <Badge className="bg-white text-brand-ink">обслуживание</Badge>
        </div>
      </Container>
    </SectionShell>
  );
}
