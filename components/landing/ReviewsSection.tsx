import { ExternalLink, Send, Star } from "lucide-react";
import { Container, SectionShell } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[#FFB800]" aria-label={`${rating} из 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`size-4 ${index < rating ? "fill-current" : "opacity-25"}`}
          strokeWidth={2.4}
        />
      ))}
    </div>
  );
}

export async function ReviewsSection() {
  const reviews = await prisma.review
    .findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 6,
    })
    .catch(() => []);

  if (!reviews.length) return null;

  return (
    <SectionShell id="reviews" className="relative overflow-hidden bg-[#111018] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 size-80 rounded-full bg-brand/30 blur-3xl" />
        <div className="absolute -right-24 bottom-10 size-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] bg-[size:52px_52px] opacity-30" />
      </div>
      <Container className="relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand">Отзывы</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Что говорят клиенты после запуска сайта
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
              Собираем живые отзывы, ссылки на проекты и скриншоты обратной связи в одном блоке.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-black text-white/75 backdrop-blur">
            Нажмите на отзыв, чтобы открыть историю
          </div>
        </div>

        <div className="-mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="group relative min-w-[82vw] snap-start overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.08] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12] md:min-w-0"
            >
              <a
                href={review.instagramStoryUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-0"
                aria-label={`Открыть отзыв ${review.clientName} в Instagram`}
              />
              <div className="relative z-10 flex min-h-full flex-col">
                <div className="relative overflow-hidden rounded-[1.35rem] bg-white/92 text-brand-ink">
                  {review.screenshotUrl ? (
                    <img
                      src={review.screenshotUrl}
                      alt={`Скриншот отзыва ${review.clientName}`}
                      className="aspect-[4/3] w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-brand-mist via-white to-brand/20 p-5">
                      <div className="h-full rounded-3xl bg-white/80 p-4 shadow-[0_18px_50px_rgba(17,16,24,0.12)]">
                        <div className="mb-4 h-3 w-24 rounded-full bg-brand/25" />
                        <div className="space-y-2">
                          <div className="h-3 rounded-full bg-black/10" />
                          <div className="h-3 w-4/5 rounded-full bg-black/10" />
                          <div className="h-3 w-2/3 rounded-full bg-black/10" />
                        </div>
                        <div className="mt-8 rounded-2xl bg-brand px-4 py-3 text-sm font-black text-white">
                          Screenshot
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-brand shadow-sm backdrop-blur">
                    <Send className="size-4" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-3">
                  <div className="flex items-center justify-between gap-3">
                    <Stars rating={review.rating} />
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/60">
                      {review.businessName ?? "Клиент WebTap"}
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-5 text-base font-semibold leading-7 text-white/86">
                    “{review.text}”
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-black">{review.clientName}</p>
                      <p className="text-xs text-white/45">отзыв из Instagram</p>
                    </div>
                    {review.projectUrl ? (
                      <a
                        href={review.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="relative z-20 inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-black text-brand-ink transition hover:bg-brand-mist"
                      >
                        Проект
                        <ExternalLink className="size-3.5" />
                      </a>
                    ) : (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand px-3 py-2 text-xs font-black text-white">
                        История
                        <ExternalLink className="size-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
