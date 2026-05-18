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

export function HeroSection({ whatsappHref }: { whatsappHref: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLeadFormVisible, setIsLeadFormVisible] = useState(false);
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

  useEffect(() => {
    const leadForm = document.getElementById("lead-form");
    if (!leadForm) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsLeadFormVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(leadForm);
    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <SectionShell id="home" className="relative pb-24 pt-6 sm:pb-10 sm:pt-8">
      <div className="webtap-hero-bg" aria-hidden="true">
        <div className="webtap-hero-grid" />
        <div className="webtap-hero-orbit webtap-hero-orbit-one" />
        <div className="webtap-hero-orbit webtap-hero-orbit-two" />
        <div className="webtap-hero-line webtap-hero-line-one" />
        <div className="webtap-hero-line webtap-hero-line-two" />
      </div>

      <Container className="relative">
        <div className="relative z-40 h-[4.5rem]">
          <header
            className={`fixed top-4 z-[100] flex max-w-[calc(100vw-2rem)] items-center border border-black/5 bg-white/90 shadow-[0_20px_60px_rgba(17,16,24,0.10)] backdrop-blur transition-all duration-300 ${
              compact
                ? "left-4 w-16 justify-center rounded-[1.35rem] p-2"
                : "left-4 right-4 mx-auto flex-wrap justify-between gap-3 rounded-[1.5rem] px-4 py-3 sm:max-w-7xl sm:rounded-full"
            }`}
          >
            <a
              href="#home"
              className={`min-w-0 items-center gap-2 font-black tracking-tight text-brand-ink ${
                compact ? "hidden" : "flex"
              }`}
              onClick={closeMenu}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
                <MousePointerClick className="size-5" />
              </span>
              <span className="truncate">WebTap</span>
            </a>

            <nav
              className={`order-3 w-full min-w-0 text-sm font-semibold text-black/60 transition-all duration-300 lg:order-none lg:w-auto ${
                compact
                  ? "hidden"
                  : menuOpen
                    ? "grid gap-1 rounded-[1.25rem] bg-brand-mist p-2 sm:grid-cols-2 lg:flex lg:items-center lg:gap-5 lg:bg-transparent lg:p-0"
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

            <div className={`flex shrink-0 items-center gap-2 ${compact ? "" : "ml-auto"}`}>
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
            className={`fixed inset-x-4 bottom-4 z-[90] inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-ink px-5 text-sm font-black text-white shadow-[0_20px_60px_rgba(17,16,24,0.25)] transition duration-300 hover:bg-brand-dark sm:hidden ${
              isLeadFormVisible ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            Оставить заявку
            <ArrowRight className="size-4" />
          </a>

          <a
            href="#lead-form"
            className={`fixed bottom-5 left-6 z-[90] hidden min-h-12 items-center gap-2 rounded-full bg-brand-ink px-5 text-sm font-black text-white shadow-[0_20px_60px_rgba(17,16,24,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-dark sm:inline-flex ${
              isScrolled && !isLeadFormVisible
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-4 opacity-0"
            }`}
          >
            Оставить заявку
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid min-w-0 items-center gap-8 pt-6 sm:gap-10 sm:pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-10">
          <div className="max-w-full animate-fade-up">
            <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-normal text-brand-ink sm:text-6xl sm:leading-[1.04] lg:text-7xl">
              <span className="sm:hidden">Сайт под заявки для бизнеса</span>
              <span className="hidden sm:inline">Сайт для бизнеса, который помогает получать заявки</span>
            </h1>
            <p className="hidden max-w-2xl text-black/65 sm:mt-6 sm:block sm:text-lg sm:leading-8">
              <span className="sm:hidden">
                WebTap делает понятные страницы, где клиент видит услугу, доверие и сразу пишет в WhatsApp.
              </span>
              <span className="hidden sm:inline">
                WebTap создаёт понятные страницы для услуг, экспертов и малого бизнеса.
                Клиент быстро понимает вашу услугу, видит доверие и может сразу написать
                в WhatsApp.
              </span>
            </p>

            <div className="mt-5 rounded-2xl border border-brand/15 bg-white/85 px-4 py-3 shadow-sm sm:hidden [&>p+p]:hidden">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">Запуск от 49 990 ₸</p>
              <p className="mt-1 text-sm font-semibold text-brand-ink">Далее обслуживание от 4 990 ₸/мес</p>
            </div>

            <div className="mt-6 grid gap-3 sm:mt-7 sm:flex sm:flex-row">
              <LinkButton href="#lead-form" className="w-full sm:w-auto sm:min-w-56">
                Оставить заявку
              </LinkButton>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(16,185,129,0.22)] transition hover:bg-emerald-600 sm:hidden"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3">
              {trustItems.map((item) => (
                <div key={item} className="flex min-w-0 items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-sm sm:gap-3 sm:px-4 sm:py-3">
                  <CheckCircle2 className="size-4 shrink-0 text-brand sm:size-5" />
                  <span className="break-words text-xs font-semibold leading-snug text-brand-ink sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-full sm:max-w-xl sm:animate-float">
            <div className="rounded-[1.5rem] border border-white/80 bg-white/85 p-4 shadow-soft backdrop-blur sm:hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 [&>p:first-child]:hidden [&>p:nth-child(2)]:mt-0">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-brand">WebTap page</p>
                  <p className="mt-2 text-xl font-black leading-tight text-brand-ink">Услуга понятна сразу</p>
                </div>
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand text-white">
                  <Phone className="size-5" />
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                <div className="rounded-2xl bg-brand-mist p-3">
                  <p className="text-xs font-bold text-black/45">Стоимость</p>
                  <p className="text-2xl font-black text-brand-ink">от 49 990 ₸</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-brand-ink p-3 text-white">
                    <p className="text-xs text-white/55">WhatsApp</p>
                    <p className="text-sm font-black">в один тап</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 text-brand-ink shadow-sm">
                    <p className="text-xs text-black/45">Дизайн</p>
                    <p className="text-sm font-black">любой</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block">
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
        </div>
      </Container>
    </SectionShell>
  );
}
