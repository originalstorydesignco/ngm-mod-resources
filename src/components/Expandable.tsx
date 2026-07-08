import { useState, type ReactNode } from "react";

export function Expandable({
  label,
  children,
  defaultOpen = false,
  open: controlledOpen,
}: {
  label: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
}) {
  const [internal, setInternal] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internal;
  return (
    <div className="rounded-lg border border-border bg-card">
      <button
        type="button"
        onClick={() => !isControlled && setInternal((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-medium">{label}</span>
        <span aria-hidden className="text-muted-foreground">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border pt-3 text-sm text-foreground/85">
          {children}
        </div>
      )}
    </div>
  );
}
