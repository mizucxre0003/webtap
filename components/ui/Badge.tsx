import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const tones = {
  violet: "bg-brand/10 text-brand-dark ring-brand/20",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  gray: "bg-black/5 text-black/60 ring-black/10",
  blue: "bg-sky-50 text-sky-700 ring-sky-200",
};

export type BadgeTone = keyof typeof tones;

export function Badge({
  className,
  tone = "violet",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
