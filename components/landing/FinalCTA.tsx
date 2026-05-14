import { MessageCircle } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container, SectionShell } from "@/components/ui/Card";
import { ownerWhatsappRedirectUrl } from "@/lib/whatsapp";

export function FinalCTA() {
  return (
    <SectionShell className="pb-8">
      <Container>
        <div className="rounded-[2rem] bg-gradient-to-br from-brand to-brand-dark p-8 text-white shadow-glow sm:p-12">
          <h2 className="max-w-3xl text-3xl font-black sm:text-5xl">
            Хотите сайт, который понятно объяснит ваш бизнес?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Оставьте заявку — обсудим нишу, задачу и примерную стоимость запуска.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#lead-form" variant="secondary">
              Оставить заявку
            </LinkButton>
            <a
              href={ownerWhatsappRedirectUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-white/12 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/18"
            >
              <MessageCircle className="size-4" />
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
