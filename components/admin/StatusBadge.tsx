import { Badge, type BadgeTone } from "@/components/ui/Badge";
import {
  clientStatusLabels,
  labelFrom,
  leadStatusLabels,
  paymentTypeLabels,
  projectStatusLabels,
  reminderStatusLabels,
  reminderTypeLabels,
  subscriptionStatusLabels,
  subscriptionTypeLabels,
} from "@/lib/admin-labels";

const labels = {
  ...leadStatusLabels,
  ...clientStatusLabels,
  ...projectStatusLabels,
  ...subscriptionTypeLabels,
  ...subscriptionStatusLabels,
  ...paymentTypeLabels,
  ...reminderTypeLabels,
  ...reminderStatusLabels,
};

const tones: Record<string, BadgeTone> = {
  new: "violet",
  contacted: "blue",
  in_progress: "amber",
  won: "green",
  lost: "red",
  active: "green",
  paused: "amber",
  archived: "gray",
  brief: "gray",
  design: "violet",
  development: "blue",
  waiting_payment: "amber",
  launched: "green",
  support: "green",
  closed: "gray",
  overdue: "red",
  cancelled: "gray",
  pending: "amber",
  done: "green",
};

export function StatusBadge({ value }: { value: string }) {
  return <Badge tone={tones[value] ?? "gray"}>{labelFrom(labels, value)}</Badge>;
}
