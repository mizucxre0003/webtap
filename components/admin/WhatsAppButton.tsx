import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppButton({
  phone,
  text,
  className,
}: {
  phone?: string | null;
  text?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(phone, text)}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100",
        className,
      )}
    >
      <MessageCircle className="size-4" />
      WhatsApp
    </a>
  );
}
