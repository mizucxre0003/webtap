import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Clock3,
  Eye,
  MessageCircle,
  MousePointerClick,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, Container, SectionShell } from "@/components/ui/Card";

const flow = [
  {
    title: "Увидел услугу",
    text: "первый экран сразу отвечает, чем вы полезны",
    icon: Eye,
  },
  {
    title: "Понял условия",
    text: "цены, процесс и ответы не спрятаны по постам",
    icon: BadgeCheck,
  },
  {
    title: "Поверил",
    text: "фото, отзывы, FAQ и факты собирают доверие",
    icon: Sparkles,
  },
  {
    title: "Написал",
    text: "WhatsApp открыт в один тап без лишних шагов",
    icon: MessageCircle,
  },
];

const signals = [
  ["Понятный оффер", "0.4 сек"],
  ["Кнопка заявки", "видна сразу"],
  ["Доверие", "до цены"],
  ["FAQ", "до возражения"],
];

export function TapFlowSection() {
  return (
    <SectionShell className="relative overflow-hidden bg-brand-ink text-white">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
      </div>
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge className="bg-white text-brand-ink">WebTap tap-flow</Badge>
            <h2 className="mt-5 text-3xl font-black sm:text-5xl">
              Один тап — и клиент понял, куда идти дальше
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              Мы проектируем страницу как короткий маршрут: от первого взгляда до
              сообщения в WhatsApp. Без лишних переходов, сложных слов и хаоса в
              контенте.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {signals.map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.08] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-white/40">{label}</p>
                  <p className="mt-2 text-xl font-black">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 hidden rounded-3xl border border-white/10 bg-white/[0.08] p-4 shadow-glow backdrop-blur md:block">
              <div className="flex items-center gap-2 text-sm font-black">
                <Bot className="size-5 text-brand" />
                Структура собрана
              </div>
              <p className="mt-2 text-xs text-white/50">оффер · доверие · заявка</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-4 shadow-glow backdrop-blur">
              <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[1.6rem] bg-white p-4 text-brand-ink">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-brand-mist px-3 py-1 text-xs font-black text-brand-dark">
                      mobile preview
                    </span>
                    <MousePointerClick className="size-5 text-brand" />
                  </div>
                  <div className="rounded-3xl bg-brand-ink p-4 text-white">
                    <p className="text-xs text-white/45">услуга</p>
                    <p className="mt-2 text-2xl font-black leading-tight">Понятно за 5 секунд</p>
                    <div className="mt-4 h-2 rounded-full bg-white/15">
                      <div className="h-2 w-4/5 rounded-full bg-brand" />
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-brand-mist p-3">
                      <Clock3 className="mb-2 size-4 text-brand" />
                      <p className="text-xs font-black">от 5 дней</p>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-3">
                      <MessageCircle className="mb-2 size-4 text-emerald-600" />
                      <p className="text-xs font-black">WhatsApp</p>
                    </div>
                  </div>
                  <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-3 text-sm font-black text-white">
                    Написать
                    <ArrowRight className="size-4" />
                  </button>
                </div>

                <div className="grid content-between gap-3">
                  {flow.map((item, index) => (
                    <div key={item.title} className="group rounded-3xl border border-white/10 bg-white/[0.08] p-4 transition hover:bg-white/[0.14]">
                      <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
                          <item.icon className="size-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-white/35">
                              0{index + 1}
                            </span>
                            <h3 className="font-black">{item.title}</h3>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-white/55">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["быстро", "ясно", "в заявку"].map((word) => (
                <div key={word} className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-brand-ink">
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
