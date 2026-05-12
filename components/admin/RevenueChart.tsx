import { Card } from "@/components/ui/Card";
import { formatKzt } from "@/lib/utils";

type Point = {
  key: string;
  label: string;
  income: number;
  expenses: number;
  profit: number;
};

export function RevenueChart({ data }: { data: Point[] }) {
  const max = Math.max(1, ...data.flatMap((item) => [item.income, item.expenses, Math.max(item.profit, 0)]));

  return (
    <Card>
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-black text-brand-ink">Финансы по месяцам</h2>
          <p className="text-sm text-black/50">Доход, расходы и прибыль за последние 6 месяцев</p>
        </div>
        <div className="flex gap-3 text-xs font-bold text-black/50">
          <span className="flex items-center gap-1"><i className="size-2 rounded-full bg-brand" /> доход</span>
          <span className="flex items-center gap-1"><i className="size-2 rounded-full bg-red-300" /> расходы</span>
          <span className="flex items-center gap-1"><i className="size-2 rounded-full bg-emerald-400" /> прибыль</span>
        </div>
      </div>
      <div className="grid min-h-72 grid-cols-6 items-end gap-3">
        {data.map((item) => (
          <div key={item.key} className="flex h-full flex-col justify-end gap-2">
            <div className="flex h-56 items-end gap-1 rounded-2xl bg-brand-mist p-2">
              <div
                className="flex-1 rounded-t-xl bg-brand"
                title={formatKzt(item.income)}
                style={{ height: `${Math.max((item.income / max) * 100, 3)}%` }}
              />
              <div
                className="flex-1 rounded-t-xl bg-red-300"
                title={formatKzt(item.expenses)}
                style={{ height: `${Math.max((item.expenses / max) * 100, 3)}%` }}
              />
              <div
                className="flex-1 rounded-t-xl bg-emerald-400"
                title={formatKzt(item.profit)}
                style={{ height: `${Math.max((Math.max(item.profit, 0) / max) * 100, 3)}%` }}
              />
            </div>
            <p className="text-center text-xs font-bold text-black/50">{item.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
