import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-soft",
        className,
      )}
      {...props}
    />
  );
}

export function SectionShell({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("px-4 py-16 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-7xl", className)} {...props} />;
}
