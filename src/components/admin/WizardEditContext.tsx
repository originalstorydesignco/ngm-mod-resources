import { createContext, useContext, useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import {
  useWizardOverrideMutations,
  getBaseValue,
  type OverridesMap,
  type WizardTool,
} from "@/lib/wizard-overrides";
import type { WizardData } from "@/components/Wizard";

type EditTarget = {
  nodeId: string;
  fieldPath: string;
  originalValue: string;
  label: string;
};

type Ctx = {
  isAdmin: boolean;
  overrides: OverridesMap;
  base: WizardData;
  openEditor: (t: EditTarget) => void;
  getOriginal: (nodeId: string, fieldPath: string) => string;
};

const EditCtx = createContext<Ctx | null>(null);

export function useWizardEdit() {
  return useContext(EditCtx);
}

export function WizardEditProvider({
  tool,
  base,
  overrides,
  children,
}: {
  tool: WizardTool;
  base: WizardData;
  overrides: OverridesMap;
  children: ReactNode;
}) {
  const { isAdmin, user } = useAuth();
  const { upsert, remove } = useWizardOverrideMutations(tool);
  const [editing, setEditing] = useState<EditTarget | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openEditor = (t: EditTarget) => {
    const current =
      overrides.get(`${t.nodeId}::${t.fieldPath}`) ?? t.originalValue;
    setDraft(current);
    setError(null);
    setEditing(t);
  };

  const close = () => {
    if (saving) return;
    setEditing(null);
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      await upsert.mutateAsync({
        nodeId: editing.nodeId,
        fieldPath: editing.fieldPath,
        value: draft,
        userId: user?.id,
      });
      setEditing(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      await remove.mutateAsync({
        nodeId: editing.nodeId,
        fieldPath: editing.fieldPath,
      });
      setEditing(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reset failed");
    } finally {
      setSaving(false);
    }
  };

  const hasOverride =
    editing &&
    overrides.has(`${editing.nodeId}::${editing.fieldPath}`);
  const isLong =
    editing !== null && (editing.originalValue.length > 80 || draft.length > 80);

  return (
    <EditCtx.Provider value={{ isAdmin, overrides, openEditor }}>
      {children}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg rounded-lg border border-border bg-background p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Edit wording
                </p>
                <h2 className="mt-0.5 font-display text-lg font-semibold">
                  {editing.label}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            {isLong ? (
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={5}
                className="mt-4 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                autoFocus
              />
            ) : (
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="mt-4 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                autoFocus
              />
            )}

            <p className="mt-3 text-xs text-muted-foreground">
              You’re editing wording only. To change how a tool branches, that’s a
              code change — ask your developer.
            </p>

            {error && (
              <p className="mt-3 text-sm text-accent">{error}</p>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={reset}
                disabled={!hasOverride || saving}
                className="text-sm text-muted-foreground underline underline-offset-2 disabled:opacity-40"
                title={
                  hasOverride
                    ? "Delete the override and revert to the built-in wording"
                    : "No override to reset"
                }
              >
                Reset to default
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={close}
                  disabled={saving}
                  className="h-10 rounded-md border border-border bg-surface px-4 text-sm font-medium hover:bg-card"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={save}
                  disabled={saving || draft === editing.originalValue && !hasOverride}
                  className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </EditCtx.Provider>
  );
}

/**
 * Wrap any editable text.
 *
 * - Renders `children` as normal.
 * - For admins: shows a hover-visible pencil next to it (block layout only
 *   for `display="block"`; inline otherwise), plus a small "edited" dot when
 *   the field currently has an override.
 */
export function EditableText({
  nodeId,
  fieldPath,
  originalValue,
  label,
  display = "inline",
  children,
}: {
  nodeId: string;
  fieldPath: string;
  originalValue: string;
  label: string;
  display?: "inline" | "block";
  children: ReactNode;
}) {
  const ctx = useWizardEdit();
  if (!ctx || !ctx.isAdmin) return <>{children}</>;
  const overridden = ctx.overrides.has(`${nodeId}::${fieldPath}`);

  const wrapperCls =
    display === "block"
      ? "relative group flex items-start gap-2"
      : "relative group inline-flex items-baseline gap-1";

  return (
    <span className={wrapperCls}>
      <span className={display === "block" ? "flex-1 min-w-0" : undefined}>
        {children}
      </span>
      <button
        type="button"
        onClick={() =>
          ctx.openEditor({ nodeId, fieldPath, originalValue, label })
        }
        title={overridden ? "Edit (overridden — click to change or reset)" : "Edit wording"}
        aria-label="Edit wording"
        className="flex-none inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-card hover:text-foreground transition-opacity"
      >
        <span aria-hidden>✎</span>
        {overridden && (
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#5865F2]"
            title="This wording has been edited"
          />
        )}
      </button>
    </span>
  );
}
