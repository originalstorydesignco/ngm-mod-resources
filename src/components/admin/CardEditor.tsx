import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCardMutations, type Card, type CardPage } from "@/lib/content";

type Variant = "default" | "critical" | "mod";
type Arrow = "internal" | "external";

type FormState = {
  title: string;
  caption: string;
  cta_label: string;
  href: string;
  arrow: Arrow;
  variant: Variant;
  section: string;
  sort_order: number;
  facilitator_visible: boolean;
  moderator_visible: boolean;
};

function initialForm(card: Card | null, sections: string[]): FormState {
  return {
    title: card?.title ?? "",
    caption: card?.caption ?? "",
    cta_label: card?.cta_label ?? "",
    href: card?.href ?? "",
    arrow: (card?.arrow as Arrow) ?? "internal",
    variant: (card?.variant as Variant) ?? "default",
    section: card?.section ?? sections[0] ?? "",
    sort_order: card?.sort_order ?? 100,
    facilitator_visible: card?.facilitator_visible ?? true,
    moderator_visible: card?.moderator_visible ?? true,
  };
}

export function CardEditor({
  page,
  card,
  sections,
  showSection,
  trigger,
}: {
  page: CardPage;
  card: Card | null;
  sections?: string[];
  showSection?: boolean;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => initialForm(card, sections ?? []));
  const { create, update } = useCardMutations(page);

  useEffect(() => {
    if (open) setForm(initialForm(card, sections ?? []));
  }, [open, card, sections]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      caption: form.caption.trim(),
      cta_label: form.cta_label.trim(),
      href: form.href.trim(),
      arrow: form.arrow,
      variant: form.variant,
      section: showSection ? (form.section.trim() || null) : null,
      sort_order: Number(form.sort_order) || 0,
      facilitator_visible: form.facilitator_visible,
      moderator_visible: form.moderator_visible,
    };
    try {
      if (card) await update.mutateAsync({ id: card.id, patch: payload });
      else await create.mutateAsync(payload);
      toast.success(card ? "Card updated" : "Card added");
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{card ? "Edit card" : "Add card"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <Field label="Title">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </Field>
          <Field label="Caption">
            <Input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} required />
          </Field>
          <Field label="Button label">
            <Input value={form.cta_label} onChange={(e) => setForm({ ...form, cta_label: e.target.value })} required />
          </Field>
          <Field label="Link (path or URL)">
            <Input value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} required />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Arrow">
              <select
                value={form.arrow}
                onChange={(e) => setForm({ ...form, arrow: e.target.value as Arrow })}
                className="h-10 px-3 rounded-md border border-input bg-background w-full"
              >
                <option value="internal">Internal →</option>
                <option value="external">External ↗</option>
              </select>
            </Field>
            <Field label="Variant">
              <select
                value={form.variant}
                onChange={(e) => setForm({ ...form, variant: e.target.value as Variant })}
                className="h-10 px-3 rounded-md border border-input bg-background w-full"
              >
                <option value="default">Default</option>
                <option value="critical">Critical (orange at rest)</option>
                <option value="mod">Moderator (yellow)</option>
              </select>
            </Field>
          </div>
          {showSection && (
            <Field label="Section">
              <Input
                value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
                list="section-suggestions"
              />
              {sections && (
                <datalist id="section-suggestions">
                  {sections.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              )}
            </Field>
          )}
          <Field label="Sort order">
            <Input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
            />
          </Field>
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.facilitator_visible}
                onChange={(e) => setForm({ ...form, facilitator_visible: e.target.checked })}
              />
              Visible to Facilitators
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.moderator_visible}
                onChange={(e) => setForm({ ...form, moderator_visible: e.target.checked })}
              />
              Visible to Moderators
            </label>
          </div>
          <DialogFooter className="pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={create.isPending || update.isPending}>
              {card ? "Save changes" : "Add card"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export function CardAddButton({
  page,
  section,
  sections,
  showSection,
}: {
  page: CardPage;
  section?: string;
  sections?: string[];
  showSection?: boolean;
}) {
  return (
    <CardEditor
      page={page}
      card={null}
      sections={section ? [section] : sections}
      showSection={showSection}
      trigger={
        <button
          type="button"
          className="inline-flex items-center gap-1 h-8 px-3 rounded-md border border-dashed border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          aria-label="Add card"
        >
          <Plus className="h-3.5 w-3.5" /> Add card
        </button>
      }
    />
  );
}

export function CardAdminActions({
  card,
  sections,
  showSection,
}: {
  card: Card;
  sections?: string[];
  showSection?: boolean;
}) {
  const { remove } = useCardMutations(card.page);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div
      className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
      onClick={(e) => e.preventDefault()}
    >
      <CardEditor
        page={card.page}
        card={card}
        sections={sections}
        showSection={showSection}
        trigger={
          <button
            type="button"
            aria-label="Edit card"
            className="h-7 w-7 inline-flex items-center justify-center rounded-md bg-background/80 border border-border hover:border-primary hover:text-primary"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        }
      />
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            aria-label="Delete card"
            className="h-7 w-7 inline-flex items-center justify-center rounded-md bg-background/80 border border-border hover:border-destructive hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this card?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes “{card.title}” from the page. You can add it back later, but this action isn’t undoable.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await remove.mutateAsync(card.id);
                  toast.success("Card deleted");
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Delete failed");
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
