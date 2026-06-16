import { ArrowUpRight } from "lucide-react";

type ServiceRowProps = {
  number: string;
  title: string;
  text: string;
};

export function ServiceRow({ number, title, text }: ServiceRowProps) {
  return (
    <article className="group grid gap-5 border-t border-white/12 py-7 transition hover:border-white/38 sm:py-9 lg:grid-cols-12 lg:items-start">
      <p className="text-[clamp(2.4rem,5vw,5.6rem)] font-semibold leading-none tracking-[-0.04em] text-white/22 transition group-hover:text-white/46 lg:col-span-3">
        {number}
      </p>
      <h3 className="text-[clamp(1.7rem,3vw,3rem)] font-semibold leading-[1] tracking-[-0.03em] text-white lg:col-span-4">
        {title}
      </h3>
      <p className="max-w-2xl text-base leading-7 text-white/58 lg:col-span-4">{text}</p>
      <ArrowUpRight className="hidden size-6 justify-self-end text-white/28 transition group-hover:text-white lg:block" />
    </article>
  );
}
