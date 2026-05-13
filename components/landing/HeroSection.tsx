"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
  MessageCircle,
  MousePointerClick,
  Phone,
  TrendingUp,
  X,
} from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container, SectionShell } from "@/components/ui/Card";

const trustItems = [
  "Любой дизайн",
  "Кнопка WhatsApp",
  "Адаптация под телефон",
  "Поддержка после запуска",
];

const navLinks = [
  ["Главная", "#home"],
  ["Для кого", "#audience"],
  ["Что мы делаем", "#tap-flow"],
  ["Условия", "#pricing"],
  ["Заявка", "#lead-form"],
  ["FAQ", "#faq"],
  ["Контакты", "#contacts"],
] as const;

export function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const compact = isScrolled && !menuOpen;

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY > 72;
      setIsScrolled(scrolled);
      if (!scrolled) setMenuOpen(false);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <SectionShell id="home" className="overflow-hidden pb-10 pt-6 sm:pt-8">
      <Container>
        <div className="relative z-40 h-[4.5rem]">
          <header
            className={`fixed top-4 z-50 flex items-center border border-black/5 bg-white/88 shadow-[0_20px_60px_rgba(17,16,24,0.10)] backdrop-blur transition-all duration-300 ${
              compact
                ? "left-4 w-16 justify-center rounded-[1.35rem] p-2"
                : "left-4 right-4 mx-auto max-w-7xl flex-wrap justify-between gap-3 rounded-[2rem] px-4 py-3 sm:rounded-full"
            }`}
          >
            <a
              href="#home"
              className={`items-center gap-2 font-black tracking-tight text-brand-ink ${
                compact ? "hidden" : "flex"
              }`}
              onClick={closeMenu}
            >
              <span className="flex size-10 items-center justify-center rounded-2xl bg-brand text-white">
                <MousePointerClick className="size-5" />
              </span>
              <span className="whitespace-nowrap">WebTap</span>
            </a>

            <nav
              className={`order-3 w-full text-sm font-semibold text-black/60 transition-all duration-300 lg:order-none lg:w-auto ${
                compact
                  ? "hidden"
                  : menuOpen
                    ? "grid gap-1 rounded-[1.5rem] bg-brand-mist p-2 sm:grid-cols-2 lg:flex lg:items-center lg:gap-5 lg:bg-transparent lg:p-0"
                    : "hidden lg:flex lg:items-center lg:gap-5"
              }`}
            >
              {navLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-2xl px-3 py-2 transition hover:bg-white hover:text-brand-ink lg:px-0 lg:py-0 lg:hover:bg-transparent"
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className={`flex items-center gap-2 ${compact ? "" : "ml-auto"}`}>
              <a
                href="#lead-form"
                className={`min-h-10 items-center justify-center rounded-full bg-brand-ink px-4 text-sm font-bold text-white transition hover:bg-brand-dark ${
                  compact ? "hidden" : "hidden sm:inline-flex"
                }`}
                onClick={closeMenu}
              >
                Оставить заявку
              </a>

              <button
                type="button"
                aria-label={menuOpen ? "Свернуть меню" : "Открыть меню"}
                aria-expanded={menuOpen}
                className={`inline-flex size-11 items-center justify-center rounded-full bg-brand-ink text-white transition hover:bg-brand-dark ${
                  !isScrolled && !menuOpen ? "lg:hidden" : ""
                }`}
                onClick={() => setMenuOpen((current) => !current)}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </header>

          <a
            href="#lead-form"
            className={`fixed bottom-5 left-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-ink px-5 text-sm font-black text-white shadow-[0_20px_60px_rgba(17,16,24,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-dark ${
              isScrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
            }`}
          >
            Оставить заявку
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid items-center gap-10 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-10">
          <div className="animate-fade-up">
            <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-normal text-brand-ink sm:text-6xl lg:text-7xl">
              Сайт для бизнеса, который помогает получать заявки
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
              WebTap создаёт понятные страницы для услуг, экспертов и малого бизнеса.
              Клиент быстро понимает вашу услугу, видит доверие и может сразу написать
              в WhatsApp.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="#lead-form" className="sm:min-w-56">
                Оставить заявку
              </LinkButton>
            </div>

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
                      <p className="text-xs text-white/55">Дизайн</p>
                      <p className="font-black">любой формат</p>
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
