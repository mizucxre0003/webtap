import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-w-full rounded-[1.5rem] border border-black/5 bg-white p-4 shadow-soft sm:rounded-[1.75rem] sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function SectionShell({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("w-full max-w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8", className)} {...props} />;
}

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-full xl:max-w-7xl", className)} {...props} />;
}
