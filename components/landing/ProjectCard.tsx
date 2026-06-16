import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title: string;
  industry: string;
  year: string;
  task: string;
  status: string;
  href: string;
  image: StaticImageData;
  large?: boolean;
};

export function ProjectCard({
  title,
  industry,
  year,
  task,
  status,
  href,
  image,
  large = false,
}: ProjectCardProps) {
  return (
    <article className={cn("group grid overflow-hidden border border-white/12 bg-[#111111]", large && "lg:grid-cols-12")}>
      <a
        href={href}
        className={cn(
          "relative block min-h-[20rem] overflow-hidden bg-[#171717] focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
          large ? "lg:col-span-7 lg:min-h-[32rem]" : "lg:min-h-[26rem]",
        )}
        aria-label={`Смотреть проект: ${title}`}
      >
        <div className="absolute inset-4 overflow-hidden border border-white/12 bg-black shadow-[0_28px_80px_rgba(0,0,0,0.32)] sm:inset-6">
          <Image
            src={image}
            alt={`Превью проекта ${title}`}
            fill
            sizes="(max-width: 1024px) 90vw, 860px"
            className="object-cover object-top grayscale opacity-62 transition duration-500 group-hover:scale-[1.015] group-hover:grayscale-[70%] group-hover:opacity-78"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.1)_0%,transparent_34%,rgba(0,0,0,.72)_100%)]" />
        </div>
        <div className="absolute bottom-5 left-5 rounded-full border border-white/16 bg-black/55 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/64 backdrop-blur">
          {status}
        </div>
      </a>

      <div className={cn("flex flex-col justify-between p-5 sm:p-7", large && "lg:col-span-5 lg:p-10")}>
        <div>
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs uppercase tracking-[0.18em] text-white/45">
            <span>{industry}</span>
            <span>{year}</span>
          </div>
          <h3 className="mt-6 text-[clamp(1.7rem,3vw,3.4rem)] font-semibold leading-[1] tracking-[-0.03em] text-white">
            {title}
          </h3>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/58">{task}</p>
        </div>
        <a
          href={href}
          className="mt-10 inline-flex w-fit items-center gap-2 border-b border-white/35 pb-1 text-sm font-semibold text-white transition hover:border-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Смотреть проект
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </article>
  );
}
