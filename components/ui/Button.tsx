import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-white text-black hover:bg-brand focus-visible:ring-white",
  secondary:
    "bg-transparent text-white ring-1 ring-white/20 hover:bg-white hover:text-black focus-visible:ring-white",
  ghost:
    "bg-transparent text-current hover:bg-white/10 focus-visible:ring-white",
  dark: "bg-brand-ink text-white ring-1 ring-black/10 hover:bg-[#242424] focus-visible:ring-black",
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
  "inline-flex min-h-11 items-center justify-center gap-2 rounded px-5 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-60";

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function LinkButton({ className, variant = "primary", href, ...props }: LinkButtonProps) {
  return <Link href={href} className={cn(base, variants[variant], className)} {...props} />;
}
