import { FileText, Mail, MessageCircle, Send } from "lucide-react";
import { Container } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";
import { ownerWhatsappRedirectUrl } from "@/lib/whatsapp";

const links = [
  ["Главная", "#home"],
  ["Для кого", "#audience"],
  ["Что мы делаем", "#tap-flow"],
  ["Условия", "#pricing"],
  ["Заявка", "#lead-form"],
  ["FAQ", "#faq"],
  ["Контакты", "#contacts"],
] as const;

function normalizedContactUrl(value: string | null | undefined, fallback: string, usernameBase: string) {
  const contact = value?.trim();
  if (!contact) return fallback;
  if (contact.startsWith("http://") || contact.startsWith("https://") || contact.startsWith("mailto:")) {
    return contact;
  }
  if (contact.startsWith("@")) return `${usernameBase}${contact.slice(1)}`;
  return contact;
}

export async function Footer() {
  const settings = await prisma.settings
    .findFirst({
      select: {
        brandName: true,
        email: true,
        instagram: true,
        telegram: true,
      },
    })
    .catch(() => null);

  const brandName = settings?.brandName ?? "WebTap";
  const email = settings?.email?.trim() || "hello@webtap.kz";
  const instagramHref = normalizedContactUrl(settings?.instagram, "https://instagram.com/", "https://instagram.com/");
  const telegramHref = normalizedContactUrl(settings?.telegram, "https://t.me/", "https://t.me/");

  return (
    <footer id="contacts" className="px-4 pb-24 pt-10 sm:px-6 sm:pb-8 lg:px-8">
      <Container>
        <div className="grid gap-8 rounded-[1.5rem] bg-brand-ink p-5 text-white sm:rounded-[2rem] sm:p-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div>
            <p className="text-2xl font-black">{brandName}</p>
            <p className="mt-4 max-w-md leading-7 text-white/60">
              Сайты и страницы для малого бизнеса. Запуск от 49 990 ₸, далее обслуживание от 4 990 ₸/мес.
            </p>
          </div>
          <div>
            <p className="mb-4 font-black">Разделы</p>
            <div className="grid gap-2 text-sm text-white/65 sm:grid-cols-2">
              {links.map(([label, href]) => (
                <a key={label} href={href} className="transition hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 font-black">Контакты</p>
            <div className="space-y-3 text-sm text-white/65">
              <a className="flex items-center gap-2 transition hover:text-white" href={ownerWhatsappRedirectUrl()} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
              <a className="flex items-center gap-2 transition hover:text-white" href={instagramHref} target="_blank" rel="noreferrer">
                <Send className="size-4" />
                Instagram
              </a>
              <a className="flex items-center gap-2 transition hover:text-white" href={telegramHref} target="_blank" rel="noreferrer">
                <Send className="size-4" />
                Telegram
              </a>
              <a className="flex items-center gap-2 transition hover:text-white" href={`mailto:${email}`}>
                <Mail className="size-4" />
                {email}
              </a>
              <a className="flex items-center gap-2 transition hover:text-white" href="/legal/webtap-offer.pdf" target="_blank" rel="noreferrer">
                <FileText className="size-4" />
                Публичная оферта
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
