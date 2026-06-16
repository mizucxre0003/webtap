import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  text?: string;
  theme?: "dark" | "light";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  text,
  theme = "dark",
  className,
}: SectionHeaderProps) {
  const isLight = theme === "light";

  return (
    <div className={cn("grid gap-5 lg:grid-cols-12 lg:items-end", className)}>
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.22em]",
          isLight ? "text-black/55" : "text-white/45",
        )}
      >
        {eyebrow}
      </p>
      <div className="lg:col-span-7 lg:col-start-5">
        <h2
          className={cn(
            "text-[clamp(2rem,4.2vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.02em]",
            isLight ? "text-black" : "text-white",
          )}
        >
          {title}
        </h2>
        {text ? (
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-7 sm:text-lg",
              isLight ? "text-black/62" : "text-white/58",
            )}
          >
            {text}
          </p>
        ) : null}
      </div>
    </div>
  );
}
