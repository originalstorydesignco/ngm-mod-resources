import { useEffect, useMemo, useState, type ReactNode } from "react";

export type ChecklistItem = { id: string; label: ReactNode };

export function Checklist({ items }: { items: ChecklistItem[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Reset on reload — nothing persisted; state lives in component only.
  useEffect(() => {
    setChecked({});
  }, []);

  const doneCount = useMemo(
    () => items.reduce((n, it) => n + (checked[it.id] ? 1 : 0), 0),
    [checked, items],
  );

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span aria-live="polite">
          {doneCount} of {items.length}
        </span>
        <div className="h-1 flex-1 max-w-40 ml-3 rounded-full bg-card overflow-hidden">
          <div
            className="h-full bg-primary transition-[width]"
            style={{ width: `${items.length ? (doneCount / items.length) * 100 : 0}%` }}
          />
        </div>
      </div>
      <ol className="space-y-2">
        {items.map((it, i) => {
          const isDone = !!checked[it.id];
          return (
            <li key={it.id}>
              <label
                className={`flex items-start gap-3 rounded-md border border-border bg-card px-3 py-2 cursor-pointer hover:border-primary transition-colors ${
                  isDone ? "opacity-70" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={(e) =>
                    setChecked((prev) => ({ ...prev, [it.id]: e.target.checked }))
                  }
                  className="mt-1 h-4 w-4 accent-primary flex-none"
                />
                <span className="text-sm">
                  <span className="mr-2 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={isDone ? "line-through text-foreground/60" : ""}>{it.label}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function FacilitatorsBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider">
      Facilitators
    </span>
  );
}
