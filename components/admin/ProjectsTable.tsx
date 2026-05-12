import Link from "next/link";
import { deleteProjectAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate, formatKzt } from "@/lib/utils";

export function ProjectsTable({
  projects,
}: {
  projects: Array<{
    id: string;
    title: string;
    status: string;
    launchPrice: number;
    websiteUrl: string | null;
    launchedAt: Date | null;
    client: { name: string; businessName: string | null };
    payments: Array<{ amount: number; type: "launch_payment" | "monthly_support" | "yearly_support" | "extra_work" | "other" }>;
  }>;
}) {
  if (!projects.length) return <EmptyState title="Проектов пока нет" />;

  return (
    <div className="overflow-x-auto">
      <table className="admin-table min-w-[1040px]">
        <thead>
          <tr>
            <th>Проект</th>
            <th>Клиент</th>
            <th>Статус</th>
            <th>Запуск</th>
            <th>Остаток</th>
            <th>Дата запуска</th>
            <th>Сайт</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            const paid = project.payments
              .filter((payment) => payment.type === "launch_payment")
              .reduce((sum, payment) => sum + payment.amount, 0);
            const remaining = Math.max(project.launchPrice - paid, 0);
            return (
              <tr key={project.id}>
                <td>
                  <Link href={`/admin/projects/${project.id}`} className="font-black text-brand-ink">
                    {project.title}
                  </Link>
                </td>
                <td>{project.client.businessName ?? project.client.name}</td>
                <td><StatusBadge value={project.status} /></td>
                <td>{formatKzt(project.launchPrice)}</td>
                <td>
                  {remaining <= 0 ? (
                    <StatusBadge value="won" />
                  ) : (
                    <span className="font-black text-red-600">{formatKzt(remaining)}</span>
                  )}
                </td>
                <td>{formatDate(project.launchedAt)}</td>
                <td>
                  {project.websiteUrl ? (
                    <a href={project.websiteUrl} target="_blank" rel="noreferrer" className="font-bold text-brand-dark">
                      открыть
                    </a>
                  ) : "—"}
                </td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/projects/${project.id}`} className="rounded-2xl bg-brand-mist px-4 py-2 text-sm font-bold text-brand-dark">
                      Открыть
                    </Link>
                    <DeleteButton
                      id={project.id}
                      action={deleteProjectAction}
                      compact
                      confirmText="Удалить проект вместе с оплатами, расходами, обслуживанием и напоминаниями?"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
