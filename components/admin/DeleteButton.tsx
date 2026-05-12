"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DeleteButton({
  id,
  action,
  label = "Удалить",
  confirmText = "Удалить запись? Это действие нельзя отменить.",
  compact = false,
}: {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
  label?: string;
  confirmText?: string;
  compact?: boolean;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmText)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button
        variant="danger"
        className={compact ? "min-h-10 px-3" : "min-h-10 px-4"}
        type="submit"
      >
        <Trash2 className="size-4" />
        {compact ? null : label}
      </Button>
    </form>
  );
}
