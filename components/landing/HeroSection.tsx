"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { RevealAnimation } from "@/components/landing/RevealAnimation";
import { Container } from "@/components/ui/Card";
import heroWorkspace from "@/images/assets/hero-workspace.webp";

type HeroSectionProps = {
  whatsappHref: string;
};

export function HeroSection({ whatsappHref }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen max-w-full overflow-hidden bg-[#0a0a0a] px-5 pb-14 pt-24 text-white sm:px-8 lg:px-14 lg:pb-12 lg:pt-28">
      <Header whatsappHref={whatsappHref} />

      <Image
        src={heroWorkspace}
        alt=""
        priority
        fill
        sizes="100vw"
        className="object-cover object-center opacity-34 grayscale"
      />
      <div className="absolute inset-0 bg-[#0a0a0a]/72" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0a_0%,rgba(10,10,10,.88)_34%,rgba(10,10,10,.54)_100%)]" aria-hidden="true" />
      <div className="premium-grid pointer-events-none absolute inset-0 opacity-18" aria-hidden="true" />
      <div className="premium-noise pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-5 bottom-0 top-24 border-x border-white/[0.07] sm:inset-x-8 lg:inset-x-14" aria-hidden="true" />

      <Container className="relative grid min-h-[calc(100vh-8rem)] min-w-0 content-between">
        <RevealAnimation className="grid min-w-0 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-8">
            <p className="w-full max-w-[21.5rem] break-words text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/58 sm:w-auto sm:max-w-full sm:text-xs sm:tracking-[0.24em]">
              WEB DESIGN & DEVELOPMENT — KAZAKHSTAN
            </p>
            <h1 className="mt-8 max-w-[22rem] text-[clamp(2.15rem,8.2vw,3.45rem)] font-semibold leading-[0.98] tracking-[-0.025em] text-white sm:max-w-[13ch] sm:text-[clamp(4rem,7vw,7.5rem)] sm:leading-[0.9] sm:tracking-[-0.04em]">
              Создаём страницы, которые превращают посетителей в заявки
            </h1>
          </div>

          <div className="flex min-w-0 flex-col justify-end lg:col-span-3 lg:col-start-10">
            <p className="w-full max-w-[21.5rem] text-base leading-7 text-white/68 sm:w-auto sm:max-w-full lg:max-w-md lg:text-lg">
              Продумываем структуру, дизайн и разработку страницы так, чтобы посетителю было понятно, почему вам можно доверять и как сделать следующий шаг.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="#lead-form"
                className="inline-flex min-h-12 w-full max-w-[21.5rem] items-center justify-center gap-2 rounded bg-white px-5 text-sm font-semibold text-black transition hover:bg-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto sm:max-w-none lg:w-full"
              >
                Обсудить проект
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#cases"
                className="inline-flex min-h-12 w-full max-w-[21.5rem] items-center justify-center rounded border border-white/18 px-5 text-sm font-semibold text-white transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto sm:max-w-none lg:w-full"
              >
                Смотреть работы
              </a>
            </div>
          </div>
        </RevealAnimation>

        <div className="mt-16 grid min-w-0 gap-8 border-t border-white/12 pt-6 lg:grid-cols-12 lg:items-end">
          <p className="text-sm text-white/58 lg:col-span-5">
            Стратегия · UX/UI-дизайн · Разработка · Запуск
          </p>
          <a
            href="#cases"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/45 transition hover:text-white lg:col-span-1 lg:col-start-12 lg:justify-end"
          >
            Scroll
            <ArrowDown className="size-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
