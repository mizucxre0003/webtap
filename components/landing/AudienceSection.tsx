import Image, { type StaticImageData } from "next/image";
import {
  BriefcaseBusiness,
  GraduationCap,
  Hammer,
  Heart,
  MapPin,
  Package,
  Scale,
  Sparkles,
} from "lucide-react";
import { Container, SectionShell } from "@/components/ui/Card";
import nicheBeauty from "@/images/assets/niche-beauty.webp";
import nicheCafe from "@/images/assets/niche-cafe.webp";
import nicheConsulting from "@/images/assets/niche-consulting.webp";
import nicheCourses from "@/images/assets/niche-courses.webp";
import nicheLocal from "@/images/assets/niche-local.webp";
import nicheRepair from "@/images/assets/niche-repair.webp";
import nicheSpecialist from "@/images/assets/niche-specialist.webp";
import nicheStore from "@/images/assets/niche-store.webp";

const items: Array<{
  title: string;
  image: StaticImageData;
  icon: typeof Heart;
  imageClassName?: string;
}> = [
  { title: "Салоны и beauty-мастера", image: nicheBeauty, icon: Heart },
  { title: "Курсы и эксперты", image: nicheCourses, icon: GraduationCap },
  { title: "Ремонт и услуги", image: nicheRepair, icon: Hammer },
  { title: "Кафе и доставка", image: nicheCafe, icon: Sparkles, imageClassName: "-translate-y-4" },
  { title: "Консалтинг и B2B", image: nicheConsulting, icon: BriefcaseBusiness },
  { title: "Локальный бизнес", image: nicheLocal, icon: MapPin },
  { title: "Магазины и небольшие бренды", image: nicheStore, icon: Package, imageClassName: "-translate-y-3" },
  { title: "Специалисты, которым нужны заявки", image: nicheSpecialist, icon: Scale },
];

export function AudienceSection() {
  return (
    <SectionShell id="audience" className="pt-10">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Для кого</p>
          <h2 className="mt-3 text-3xl font-black text-brand-ink sm:text-5xl">
            Кому подойдёт сайт от WebTap
          </h2>
        </div>
        <div className="-mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {items.map(({ title, image, icon: Icon, imageClassName }) => (
            <article
              key={title}
              className="group relative isolate min-h-[9.5rem] min-w-[78vw] snap-start overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_55px_rgba(17,16,24,0.12)] ring-1 ring-black/5 transition sm:min-h-[10rem] sm:min-w-0"
            >
              <div className={`absolute -right-3 bottom-0 top-2 w-[68%] transition duration-500 sm:-right-4 sm:w-[72%] ${imageClassName ?? ""}`}>
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 36vw, 18vw"
                  className="object-contain object-right-bottom"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/78 to-white/8" />
              <div className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-xl bg-[#F5F5F7] text-brand shadow-sm ring-1 ring-black/5">
                <Icon className="size-4" />
              </div>
              <div className="absolute bottom-3 left-3 right-4 rounded-2xl border border-white/55 bg-white/58 px-3 py-2 shadow-[0_10px_28px_rgba(17,16,24,0.12)] backdrop-blur-xl sm:right-6">
                <h3 className="text-sm font-black leading-tight text-brand-ink">{title}</h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
