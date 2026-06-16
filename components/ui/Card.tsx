import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-w-full rounded border border-black/10 bg-white p-4 shadow-soft sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function SectionShell({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("w-full max-w-full px-5 py-16 sm:px-8 sm:py-24 lg:px-14", className)} {...props} />;
}

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[90rem]", className)} {...props} />;
}
