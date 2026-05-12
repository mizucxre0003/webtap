import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function FormPanel({
  title,
  children,
  open = false,
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}) {
  return (
    <details open={open} className="group">
      <summary className="mb-4 inline-flex cursor-pointer list-none items-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:bg-brand-dark">
        <Plus className="size-4" />
        {title}
      </summary>
      <Card className="mb-6">{children}</Card>
    </details>
  );
}
