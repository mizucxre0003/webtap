import { notFound } from "next/navigation";
import {
  addNoteAction,
  createClientFromLeadAction,
  deleteLeadAction,
  updateLeadStatusAction,
} from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { WhatsAppButton } from "@/components/admin/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select, Textarea } from "@/components/ui/Form";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function LeadDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { notes: { orderBy: { createdAt: "desc" } } },
  });

  if (!lead) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-3xl font-black text-brand-ink">{lead.name}</h1>
          <p className="mt-1 text-black/55">{lead.businessNiche} · {formatDate(lead.createdAt)}</p>
        </div>
        <div className="flex gap-2">
          <StatusBadge value={lead.status} />
          <WhatsAppButton phone={lead.phone} />
          <DeleteButton
            id={lead.id}
            action={deleteLeadAction}
            confirmText="Удалить заявку вместе с заметками?"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <h2 className="text-xl font-black text-brand-ink">Данные заявки</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Info label="Телефон" value={lead.phone} />
            <Info label="Ниша" value={lead.businessNiche} />
            <Info label="Что нужно" value={lead.siteType} />
            <Info label="Бюджет" value={lead.budgetRange} />
            <Info label="Комментарий" value={lead.comment ?? "—"} wide />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-black text-brand-ink">Действия</h2>
          <form action={updateLeadStatusAction} className="mt-5 flex gap-2">
            <input type="hidden" name="id" value={lead.id} />
            <Select name="status" defaultValue={lead.status}>
              <option value="new">new</option>
              <option value="contacted">contacted</option>
              <option value="in_progress">in_progress</option>
              <option value="won">won</option>
              <option value="lost">lost</option>
            </Select>
            <Button variant="secondary">OK</Button>
          </form>
          <form action={createClientFromLeadAction} className="mt-4">
            <input type="hidden" name="leadId" value={lead.id} />
            <Button className="w-full">Создать клиента из заявки</Button>
          </form>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-black text-brand-ink">Заметки</h2>
        <form action={addNoteAction} className="mt-4 grid gap-3">
          <input type="hidden" name="leadId" value={lead.id} />
          <Textarea name="body" required placeholder="Что обсудили с клиентом?" />
          <Button>Добавить заметку</Button>
        </form>
        <div className="mt-6 space-y-3">
          {lead.notes.map((note) => (
            <div key={note.id} className="rounded-2xl bg-brand-mist p-4">
              <p className="text-sm text-black/55">{formatDate(note.createdAt)}</p>
              <p className="mt-1 font-semibold text-brand-ink">{note.body}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Info({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "md:col-span-2" : undefined}>
      <p className="text-xs font-black uppercase tracking-[0.14em] text-black/40">{label}</p>
      <p className="mt-1 font-semibold text-brand-ink">{value}</p>
    </div>
  );
}
