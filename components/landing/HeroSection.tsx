"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Menu, MessageCircle, X } from "lucide-react";
import { Container, SectionShell } from "@/components/ui/Card";
import heroBg from "@/images/assets/hero-bg.webp";
import heroBg2 from "@/images/assets/hero-bg 2.webp";
import mobileCardBg from "@/images/assets/mobile-card bg.webp";

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

const demoLinks = [
  ["Бьюти-салон", "/niche/beauty"],
  ["Строительная", "/niche/stroy"],
] as const;

function HeroOfferCard({ whatsappHref }: { whatsappHref: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[30rem] rounded-[2rem] border border-white/85 bg-white/90 p-4 shadow-[0_30px_95px_rgba(17,16,24,0.18)] backdrop-blur sm:max-w-[32rem] sm:rounded-[2.35rem] sm:p-5 lg:max-w-[33rem]">
      <div className="relative overflow-hidden rounded-[1.6rem] bg-brand-ink p-4 text-white sm:rounded-[1.9rem] sm:p-5">
        <Image
          src={mobileCardBg}
          alt=""
          fill
          sizes="(max-width: 640px) 92vw, 520px"
          className="object-cover object-center opacity-35"
        />
        <div className="relative z-10 grid gap-3">
          <div className="rounded-2xl bg-white px-4 py-3 text-brand-ink sm:px-5">
            <p className="text-[0.68rem] font-bold text-black/45">Стоимость</p>
            <p className="text-2xl font-black tracking-tight sm:text-3xl">от 49 990₸</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#333336]/90 px-4 py-3 ring-1 ring-white/10">
              <p className="text-[0.64rem] font-semibold text-white/45">Обслуживание</p>
              <p className="mt-1 text-base font-black sm:text-lg">от 4 990 ₸</p>
            </div>
            <div className="rounded-2xl bg-[#333336]/90 px-4 py-3 ring-1 ring-white/10">
              <p className="text-[0.64rem] font-semibold text-white/45">Срок разработки</p>
              <p className="mt-1 text-base font-black sm:text-lg">от 5 дней</p>
            </div>
          </div>

          <a
            href="#lead-form"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand px-5 text-sm font-black text-white shadow-[0_18px_48px_rgba(147,112,219,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-dark sm:min-h-14 sm:text-base"
          >
            Оставить заявку
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#57cf61] px-5 text-sm font-black text-white shadow-[0_18px_48px_rgba(87,207,97,0.24)] transition hover:-translate-y-0.5 hover:bg-emerald-500 sm:min-h-14 sm:text-base"
          >
            <MessageCircle className="size-4" />
            Написать в WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ whatsappHref }: { whatsappHref: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [demosOpen, setDemosOpen] = useState(false);
  const [isLeadFormVisible, setIsLeadFormVisible] = useState(false);
  const demosMenuRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!demosOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (demosMenuRef.current?.contains(event.target as Node)) return;
      setDemosOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDemosOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [demosOpen]);

  function closeMenu() {
    setMenuOpen(false);
    setDemosOpen(false);
  }

  return (
    <SectionShell id="home" className="relative pb-24 pt-6 sm:pb-12 sm:pt-8">
      <div className="webtap-hero-bg" aria-hidden="true">
        <Image
          src={heroBg2}
          alt=""
          priority
          sizes="(max-width: 640px) 28rem, 62rem"
          className="absolute -right-28 -top-14 w-[30rem] max-w-none opacity-34 sm:-right-20 sm:-top-24 sm:w-[52rem] sm:opacity-62 lg:-right-24 lg:-top-28 lg:w-[66rem]"
        />
        <Image
          src={heroBg}
          alt=""
          priority
          sizes="(max-width: 640px) 24rem, 44rem"
          className="absolute -left-28 top-[25rem] w-[26rem] max-w-none opacity-30 sm:-left-20 sm:top-[21rem] sm:w-[42rem] sm:opacity-52 lg:-left-16 lg:top-[25rem] lg:w-[48rem]"
        />
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
              <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand p-1.5 shadow-sm sm:size-10">
                <img src="/logo.svg" alt="WebTap" className="size-full object-contain" />
              </span>
            </a>

            <span
              className={`pointer-events-none absolute left-1/2 -translate-x-1/2 text-sm font-black tracking-tight text-brand-ink sm:hidden ${
                isScrolled ? "hidden" : "block"
              }`}
            >
              WebTap
            </span>

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
              <div className="relative" ref={demosMenuRef}>
                <button
                  type="button"
                  aria-expanded={demosOpen}
                  className="flex cursor-pointer items-center rounded-2xl px-3 py-2 transition hover:bg-white hover:text-brand-ink lg:px-0 lg:py-0 lg:hover:bg-transparent"
                  onClick={() => setDemosOpen((current) => !current)}
                >
                  Примеры
                </button>
                {demosOpen && (
                  <div className="mt-1 grid gap-1 rounded-[1.1rem] bg-white p-2 text-sm shadow-[0_18px_50px_rgba(17,16,24,0.12)] ring-1 ring-black/5 lg:absolute lg:left-1/2 lg:top-full lg:mt-3 lg:w-48 lg:-translate-x-1/2">
                    {demoLinks.map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        className="rounded-xl px-3 py-2 text-black/65 transition hover:bg-brand-mist hover:text-brand-ink"
                        onClick={closeMenu}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
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

        <div className="grid min-w-0 items-center gap-8 pt-6 sm:gap-10 sm:pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:pt-10">
          <div className="max-w-full animate-fade-up">
            <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-normal text-brand-ink sm:text-6xl sm:leading-[1.04] lg:text-7xl">
              <span className="sm:hidden">Сайт под заявки для бизнеса</span>
              <span className="hidden sm:inline">Сайт для бизнеса, который помогает получать заявки</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/65 sm:mt-6 sm:text-lg sm:leading-8">
              <span className="sm:hidden">
                WebTap делает понятные страницы, где клиент видит услугу, доверие и сразу пишет в WhatsApp.
              </span>
              <span className="hidden sm:inline">
                WebTap создаёт понятные страницы для услуг, экспертов и малого бизнеса. Клиент быстро понимает вашу услугу, видит доверие и может сразу написать
                в WhatsApp.
              </span>
            </p>

            <div className="mt-7 lg:hidden">
              <HeroOfferCard whatsappHref={whatsappHref} />
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

          <div className="relative mx-auto hidden w-full max-w-xl animate-float lg:block">
            <HeroOfferCard whatsappHref={whatsappHref} />
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
