"use client";

import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  Eye,
  MessageCircle,
  MousePointerClick,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Container, SectionShell } from "@/components/ui/Card";

const flow = [
  {
    title: "Увидел услугу",
    text: "Первый экран сразу отвечает, что вы предлагаете и кому это подходит.",
    icon: Eye,
    chip: "Услуга",
    heading: "Понятно за 5 секунд",
    body: "Клиент сразу видит, чем вы полезны, без поиска по постам и сторис.",
  },
  {
    title: "Понял условия",
    text: "Цена, формат работы и ответы на частые вопросы показаны в нужный момент.",
    icon: BadgeCheck,
    chip: "Условия",
    heading: "Цена и процесс на виду",
    body: "Не нужно переписываться, чтобы узнать базовые условия и следующий шаг.",
  },
  {
    title: "Поверил",
    text: "Отзывы, кейсы и блоки доверия помогают принять решение спокойнее.",
    icon: Sparkles,
    chip: "Доверие",
    heading: "Есть причины написать",
    body: "Страница показывает, почему вам можно доверять и что произойдёт дальше.",
  },
  {
    title: "Написал",
    text: "Заявка и WhatsApp открываются в один тап, без лишних шагов.",
    icon: MessageCircle,
    chip: "Заявка",
    heading: "Контакт в один тап",
    body: "Когда человек готов, ему не приходится ничего искать или додумывать.",
  },
];

const microSignals = ["Цена на виду", "WhatsApp в 1 тап", "FAQ без хаоса"];

export function TapFlowSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewItemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const preview = previewRef.current;
    const item = previewItemRefs.current[activeIndex];
    if (!preview || !item) return;

    preview.scrollTo({
      top: item.offsetTop - preview.offsetTop - (preview.clientHeight - item.offsetHeight) / 2,
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <SectionShell id="tap-flow" className="relative overflow-hidden bg-brand-ink text-white">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
      </div>
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge className="bg-white text-brand-ink">WebTap tap-flow</Badge>
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">
              Один тап, и клиент понимает, куда идти дальше
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              Мы проектируем страницу как короткий маршрут: от первого взгляда до
              сообщения в WhatsApp. Без лишних переходов, сложных слов и хаоса в
              контенте.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {microSignals.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-black text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 md:hidden">
            {flow.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={`rounded-3xl border p-4 text-left transition ${
                  activeIndex === index
                    ? "border-brand/70 bg-white text-brand-ink"
                    : "border-white/10 bg-white/[0.08] text-white"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`grid size-10 shrink-0 place-items-center rounded-2xl ${
                      activeIndex === index ? "bg-brand text-white" : "bg-white/10 text-white"
                    }`}
                  >
                    <item.icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-current/45">0{index + 1}</p>
                    <h3 className="mt-1 font-black">{item.title}</h3>
                    <p className={`mt-1 text-sm leading-6 ${activeIndex === index ? "text-black/60" : "text-white/60"}`}>
                      {item.text}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="hidden rounded-[2rem] border border-white/10 bg-white/[0.08] p-3 shadow-glow backdrop-blur sm:p-4 md:block">
            <div className="grid gap-4 md:grid-cols-[0.88fr_1.12fr]">
              <div className="rounded-[1.6rem] bg-white p-3 text-brand-ink sm:p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-brand-mist px-3 py-1 text-xs font-black text-brand-dark">
                    mobile preview
                  </span>
                  <MousePointerClick className="size-5 text-brand" />
                </div>

                <div className="rounded-[1.8rem] bg-brand-ink p-3 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                  <div className="mb-3 flex justify-center">
                    <div className="h-1.5 w-16 rounded-full bg-white/15" />
                  </div>
                  <div
                    ref={previewRef}
                    className="h-[19rem] space-y-3 overflow-y-auto scroll-smooth rounded-[1.35rem] bg-white/[0.04] p-2 sm:h-[24rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {flow.map((item, index) => (
                      <div
                        key={item.title}
                        ref={(node) => {
                          previewItemRefs.current[index] = node;
                        }}
                        className={`rounded-[1.35rem] border p-3 transition sm:p-4 ${
                          activeIndex === index
                            ? "border-brand/70 bg-white text-brand-ink shadow-[0_18px_40px_rgba(147,112,219,0.18)]"
                            : "border-white/10 bg-white/[0.06] text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] ${
                              activeIndex === index
                                ? "bg-brand-mist text-brand-dark"
                                : "bg-white/10 text-white/70"
                            }`}
                          >
                            {item.chip}
                          </span>
                          <item.icon className={`size-4 ${activeIndex === index ? "text-brand" : "text-white/70"}`} />
                        </div>
                        <p className="mt-3 text-lg font-black leading-tight sm:mt-4 sm:text-xl">{item.heading}</p>
                        <p
                          className={`mt-2 text-sm leading-6 sm:mt-3 ${
                            activeIndex === index ? "text-black/60" : "text-white/65"
                          }`}
                        >
                          {item.body}
                        </p>
                        <div
                          className={`mt-4 h-2 rounded-full ${
                            activeIndex === index ? "bg-brand/15" : "bg-white/10"
                          }`}
                        >
                          <div
                            className={`h-2 rounded-full ${
                              activeIndex === index ? "bg-brand" : "bg-white/45"
                            }`}
                            style={{ width: `${72 + index * 6}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid content-start gap-3">
                {flow.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    className={`group rounded-3xl border p-3 text-left transition sm:p-4 ${
                      activeIndex === index
                        ? "border-brand/70 bg-white text-brand-ink shadow-[0_18px_40px_rgba(147,112,219,0.18)]"
                        : "border-white/10 bg-white/[0.08] text-white hover:bg-white/[0.14]"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
                          activeIndex === index
                            ? "bg-brand text-white"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        <item.icon className="size-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-black ${
                              activeIndex === index ? "text-brand/70" : "text-white/35"
                            }`}
                          >
                            0{index + 1}
                          </span>
                          <h3 className="font-black">{item.title}</h3>
                        </div>
                        <p
                          className={`mt-1 text-sm leading-6 ${
                            activeIndex === index ? "text-black/60" : "text-white/55"
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["быстро", "ясно", "в заявку"].map((word) => (
                <div
                  key={word}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-brand-ink"
                >
                  <Zap className="size-4 text-brand" />
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
