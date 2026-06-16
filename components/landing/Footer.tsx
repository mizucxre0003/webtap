import Image from "next/image";
import { FileText, Mail, MessageCircle, Send } from "lucide-react";
import { Container } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";
import { ownerWhatsappRedirectUrl } from "@/lib/whatsapp";
import newLogo from "@/images/assets/new-logo.webp";

const links = [
  ["Кейсы", "#cases"],
  ["Услуги", "#services"],
  ["Процесс", "#process"],
  ["О студии", "#studio"],
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
  const year = new Date().getFullYear();

  return (
    <footer id="contacts" className="border-t border-white/12 bg-[#0a0a0a] px-5 py-12 text-white sm:px-8 lg:px-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#home" className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
              <Image src={newLogo} alt="" className="size-11 object-contain" />
              {brandName}
            </a>
            <p className="mt-5 max-w-md text-base leading-7 text-white/58">
              Премиальный дизайн и разработка сайтов для компаний, которым важны репутация, структура и точный цифровой образ.
            </p>
          </div>

          <nav className="lg:col-span-2 lg:col-start-7" aria-label="Навигация в подвале">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/38">Разделы</p>
            <div className="grid gap-3 text-sm text-white/62">
              {links.map(([label, href]) => (
                <a key={label} href={href} className="transition hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/38">Контакты</p>
            <div className="grid gap-3 text-sm text-white/62">
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

        <div className="mt-12 flex flex-col gap-3 border-t border-white/12 pt-6 text-xs uppercase tracking-[0.18em] text-white/34 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {brandName}</span>
          <span>Web design & development — Kazakhstan</span>
        </div>
      </Container>
    </footer>
  );
}
