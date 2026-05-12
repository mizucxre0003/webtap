import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  MousePointerClick,
  Phone,
  TrendingUp,
} from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container, SectionShell } from "@/components/ui/Card";

const trustItems = [
  "Запуск от 5 дней",
  "Кнопка WhatsApp",
  "Адаптация под телефон",
  "Поддержка после запуска",
];

export function HeroSection() {
  return (
    <SectionShell id="home" className="overflow-hidden pb-10 pt-6 sm:pt-8">
      <Container>
        <header className="mb-10 flex items-center justify-between rounded-full border border-black/5 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
          <a href="#home" className="flex items-center gap-2 font-black tracking-tight text-brand-ink">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-brand text-white">
              <MousePointerClick className="size-5" />
            </span>
            WebTap
          </a>
          <nav className="hidden items-center gap-5 text-sm font-semibold text-black/60 lg:flex">
            <a href="#audience">Для кого</a>
            <a href="#features">Что входит</a>
            <a href="#skills">Скиллы</a>
            <a href="#examples">Примеры</a>
            <a href="#pricing">Стоимость</a>
            <a href="#process">Процесс</a>
            <a href="#faq">FAQ</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <a
            href="#lead-form"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-brand-ink px-4 text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            Заявка
          </a>
        </header>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-fade-up">
            <Badge className="mb-5">Запуск сайта от 49 990 ₸</Badge>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-normal text-brand-ink sm:text-6xl lg:text-7xl">
              Сайт для бизнеса, который помогает получать заявки
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
              WebTap создаёт понятные страницы для услуг, экспертов и малого бизнеса.
              Клиент быстро понимает вашу услугу, видит доверие и может сразу написать
              в WhatsApp.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="#lead-form">
                Обсудить проект
                <ArrowRight className="size-4" />
              </LinkButton>
              <LinkButton href="#lead-form" variant="secondary">
                Оставить заявку
              </LinkButton>
            </div>
            <p className="mt-4 text-sm font-semibold text-brand-dark">
              Далее обслуживание от 4 990 ₸/мес
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <CheckCircle2 className="size-5 text-brand" />
                  <span className="text-sm font-semibold text-brand-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl animate-float">
            <div className="absolute -left-8 top-16 hidden rounded-3xl bg-white p-4 shadow-glow md:block">
              <p className="text-xs font-bold text-black/45">Новая заявка</p>
              <p className="mt-1 font-black text-brand-ink">Айдана, beauty</p>
              <p className="text-xs text-black/50">Хочу страницу для записи</p>
            </div>
            <div className="absolute -right-5 bottom-16 hidden rounded-3xl bg-white p-4 shadow-glow md:block">
              <div className="flex items-center gap-2 text-emerald-600">
                <MessageCircle className="size-5" />
                <span className="text-sm font-black">WhatsApp</span>
              </div>
              <p className="mt-1 text-xs text-black/55">клиент пишет в один тап</p>
            </div>
            <div className="rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-soft backdrop-blur">
              <div className="rounded-[1.5rem] bg-brand-ink p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/55">WebTap page</p>
                    <p className="text-xl font-black">Услуга понятна сразу</p>
                  </div>
                  <Phone className="size-6 text-brand" />
                </div>
                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl bg-white p-4 text-brand-ink">
                    <p className="text-xs font-bold text-black/45">Стоимость</p>
                    <p className="text-2xl font-black">от 49 990 ₸</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-white/55">Обслуживание</p>
                      <p className="font-black">от 4 990 ₸</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-white/55">Запуск</p>
                      <p className="font-black">от 5 дней</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 rounded-3xl bg-white p-4 text-brand-ink">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-black">Рост обращений</p>
                    <TrendingUp className="size-5 text-emerald-500" />
                  </div>
                  <div className="flex h-28 items-end gap-3">
                    {[28, 42, 36, 58, 74, 92].map((height, index) => (
                      <div
                        key={height}
                        className="flex-1 rounded-t-2xl bg-gradient-to-t from-brand-dark to-brand"
                        style={{ height: `${height}%`, opacity: 0.55 + index * 0.07 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
