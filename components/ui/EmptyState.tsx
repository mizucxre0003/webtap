import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title = "Пока пусто",
  description = "Когда появятся данные, они будут отображаться здесь.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl border border-dashed border-black/10 bg-white p-8 text-center", className)}>
      <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-brand-mist text-brand">
        <Inbox className="size-5" />
      </div>
      <p className="font-semibold text-brand-ink">{title}</p>
      <p className="mt-1 text-sm text-black/55">{description}</p>
    </div>
  );
}
