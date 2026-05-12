import { CheckCircle2, XCircle } from "lucide-react";
import { Card, Container, SectionShell } from "@/components/ui/Card";

const instagram = [
  "много контента",
  "сложно найти главное",
  "цены и условия разбросаны",
  "клиент может уйти, не написав",
  "реклама ведёт просто в профиль",
];

const webtap = [
  "всё важное на одной странице",
  "понятная структура",
  "кнопка WhatsApp",
  "заявка в 1-2 действия",
  "можно вести рекламу",
  "бизнес выглядит серьёзнее",
];

export function InstagramVsWebsiteSection() {
  return (
    <SectionShell className="bg-white/70">
      <Container>
        <h2 className="max-w-4xl text-3xl font-black text-brand-ink sm:text-5xl">
          Instagram показывает бизнес, а сайт помогает принять решение
        </h2>
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          <Card className="bg-brand-soft">
            <h3 className="mb-5 text-2xl font-black text-brand-ink">Instagram</h3>
            <div className="space-y-3">
              {instagram.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white p-4">
                  <XCircle className="mt-0.5 size-5 shrink-0 text-red-400" />
                  <span className="font-semibold text-black/65">{item}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-brand to-brand-dark text-white">
            <h3 className="mb-5 text-2xl font-black">Сайт WebTap</h3>
            <div className="space-y-3">
              {webtap.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white/12 p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </SectionShell>
  );
}
