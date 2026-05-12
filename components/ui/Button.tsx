import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand text-white shadow-glow hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:ring-brand",
  secondary:
    "bg-white text-brand-ink ring-1 ring-black/10 hover:-translate-y-0.5 hover:bg-brand-mist focus-visible:ring-brand",
  ghost:
    "bg-transparent text-brand-ink hover:bg-brand-mist focus-visible:ring-brand",
  dark: "bg-brand-ink text-white hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:ring-brand",
  danger:
    "bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100 focus-visible:ring-red-500",
};

type Variant = keyof typeof variants;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-60";

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function LinkButton({ className, variant = "primary", href, ...props }: LinkButtonProps) {
  return <Link href={href} className={cn(base, variants[variant], className)} {...props} />;
}
