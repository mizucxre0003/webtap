import { Mail, MessageCircle, Send } from "lucide-react";
import { Container } from "@/components/ui/Card";
import { ownerWhatsappUrl } from "@/lib/whatsapp";

const links = [
  ["Главная", "#home"],
  ["Для кого", "#audience"],
  ["Что мы делаем", "#tap-flow"],
  ["Условия", "#pricing"],
  ["Заявка", "#lead-form"],
  ["FAQ", "#faq"],
  ["Контакты", "#contacts"],
] as const;

export function Footer() {
  return (
    <footer id="contacts" className="px-4 pb-24 pt-10 sm:px-6 sm:pb-8 lg:px-8">
      <Container>
        <div className="grid gap-8 rounded-[1.5rem] bg-brand-ink p-5 text-white sm:rounded-[2rem] sm:p-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div>
            <p className="text-2xl font-black">WebTap</p>
            <p className="mt-4 max-w-md leading-7 text-white/60">
              Сайты и страницы для малого бизнеса. Запуск от 49 990 ₸, далее
              обслуживание от 4 990 ₸/мес.
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
              <a className="flex items-center gap-2 transition hover:text-white" href={ownerWhatsappUrl()} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
              <a className="flex items-center gap-2 transition hover:text-white" href="https://instagram.com/" target="_blank" rel="noreferrer">
                <Send className="size-4" />
                Instagram
              </a>
              <a className="flex items-center gap-2 transition hover:text-white" href="https://t.me/" target="_blank" rel="noreferrer">
                <Send className="size-4" />
                Telegram
              </a>
              <a className="flex items-center gap-2 transition hover:text-white" href="mailto:hello@webtap.kz">
                <Mail className="size-4" />
                hello@webtap.kz
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
