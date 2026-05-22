import { createReviewAction, deleteReviewAction, updateReviewAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { FormPanel } from "@/components/admin/FormPanel";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Label, Textarea } from "@/components/ui/Form";
import { prisma } from "@/lib/prisma";

function ReviewFields({
  review,
}: {
  review?: {
    clientName: string;
    businessName: string | null;
    text: string;
    rating: number;
    projectUrl: string | null;
    instagramStoryUrl: string;
    screenshotUrl: string | null;
    sortOrder: number;
    isPublished: boolean;
  };
}) {
  return (
    <>
      <Label>
        Имя клиента
        <Input name="clientName" required defaultValue={review?.clientName ?? ""} placeholder="Например: Айдана" />
      </Label>
      <Label>
        Бизнес / ниша
        <Input name="businessName" defaultValue={review?.businessName ?? ""} placeholder="Beauty studio" />
      </Label>
      <Label>
        Рейтинг
        <Input name="rating" type="number" min={1} max={5} defaultValue={review?.rating ?? 5} />
      </Label>
      <Label>
        Порядок
        <Input name="sortOrder" type="number" defaultValue={review?.sortOrder ?? 0} />
      </Label>
      <Label className="md:col-span-2">
        Текст отзыва
        <Textarea name="text" required defaultValue={review?.text ?? ""} placeholder="Короткий живой отзыв клиента" />
      </Label>
      <Label>
        Ссылка на проект клиента
        <Input name="projectUrl" defaultValue={review?.projectUrl ?? ""} placeholder="https://..." />
      </Label>
      <Label>
        Ссылка на актуальную историю Instagram
        <Input name="instagramStoryUrl" required defaultValue={review?.instagramStoryUrl ?? ""} placeholder="https://instagram.com/stories/highlights/..." />
      </Label>
      <Label className="md:col-span-2">
        Скриншот отзыва
        <Input name="screenshotUrl" defaultValue={review?.screenshotUrl ?? ""} placeholder="https://... или /reviews/review-1.webp" />
      </Label>
      <label className="flex items-center gap-3 rounded-2xl bg-brand-mist px-4 py-3 text-sm font-bold text-brand-ink md:col-span-2">
        <input
          name="isPublished"
          type="checkbox"
          defaultChecked={review?.isPublished ?? true}
          className="size-4 accent-[#9370DB]"
        />
        Показывать на лендинге
      </label>
    </>
  );
}

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-brand-ink">Отзывы</h1>
        <p className="mt-1 text-black/55">
          Управляйте отзывами, которые отображаются на лендинге и ведут в актуальные истории Instagram.
        </p>
      </div>

      <FormPanel title="Добавить отзыв">
        <form action={createReviewAction} className="grid gap-4 md:grid-cols-2">
          <ReviewFields />
          <Button className="md:col-span-2">Сохранить отзыв</Button>
        </form>
      </FormPanel>

      <div className="grid gap-4">
        {reviews.length ? (
          reviews.map((review) => (
            <Card key={review.id} className="p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-black text-brand-ink">{review.clientName}</h2>
                    {review.businessName ? (
                      <span className="rounded-full bg-brand-mist px-3 py-1 text-xs font-black text-brand-dark">
                        {review.businessName}
                      </span>
                    ) : null}
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${review.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-black/5 text-black/45"}`}>
                      {review.isPublished ? "Опубликован" : "Скрыт"}
                    </span>
                  </div>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-black/60">{review.text}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  {review.projectUrl ? (
                    <LinkButton href={review.projectUrl} target="_blank" rel="noreferrer" variant="secondary" className="min-h-10">
                      Проект
                    </LinkButton>
                  ) : null}
                  <LinkButton href={review.instagramStoryUrl} target="_blank" rel="noreferrer" variant="dark" className="min-h-10">
                    История
                  </LinkButton>
                  <DeleteButton id={review.id} action={deleteReviewAction} label="Удалить" />
                </div>
              </div>

              <details className="mt-4">
                <summary className="cursor-pointer rounded-2xl bg-brand-mist px-4 py-3 text-sm font-black text-brand-dark">
                  Редактировать отзыв
                </summary>
                <form action={updateReviewAction} className="mt-4 grid gap-4 md:grid-cols-2">
                  <input type="hidden" name="id" value={review.id} />
                  <ReviewFields review={review} />
                  <Button className="md:col-span-2">Сохранить изменения</Button>
                </form>
              </details>
            </Card>
          ))
        ) : (
          <Card className="border-dashed text-center">
            <p className="font-black text-brand-ink">Пока нет отзывов</p>
            <p className="mt-2 text-sm text-black/55">Добавьте первый отзыв, и блок появится на лендинге.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
