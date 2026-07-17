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
import { useLinkMutations, type LinkRow } from "@/lib/content";

type FormState = {
  group: string;
  name: string;
  url: string;
  context_label: string;
  display_url: string;
  sort_order: number;
};

function initialForm(link: LinkRow | null, group?: string, groups?: string[]): FormState {
  return {
    group: link?.group ?? group ?? groups?.[0] ?? "",
    name: link?.name ?? "",
    url: link?.url ?? "",
    context_label: link?.context_label ?? "",
    display_url: link?.display_url ?? "",
    sort_order: link?.sort_order ?? 100,
  };
}

export function LinkEditor({
  link,
  group,
  groups,
  trigger,
}: {
  link: LinkRow | null;
  group?: string;
  groups?: string[];
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => initialForm(link, group, groups));
  const { create, update } = useLinkMutations();

  useEffect(() => {
    if (open) setForm(initialForm(link, group, groups));
  }, [open, link, group, groups]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      group: form.group.trim(),
      name: form.name.trim(),
      url: form.url.trim(),
      context_label: form.context_label.trim() || null,
      display_url: form.display_url.trim() || null,
      sort_order: Number(form.sort_order) || 0,
    };
    try {
      if (link) await update.mutateAsync({ id: link.id, patch: payload });
      else await create.mutateAsync(payload);
      toast.success(link ? "Link updated" : "Link added");
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
          <DialogTitle>{link ? "Edit link" : "Add link"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <Field label="Group">
            <Input
              value={form.group}
              onChange={(e) => setForm({ ...form, group: e.target.value })}
              required
              list="link-group-suggestions"
            />
            {groups && (
              <datalist id="link-group-suggestions">
                {groups.map((g) => <option key={g} value={g} />)}
              </datalist>
            )}
          </Field>
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </Field>
          <Field label="URL">
            <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
          </Field>
          <Field label="Context label (optional, e.g. Typeform)">
            <Input value={form.context_label} onChange={(e) => setForm({ ...form, context_label: e.target.value })} />
          </Field>
          <Field label="Display URL override (optional)">
            <Input value={form.display_url} onChange={(e) => setForm({ ...form, display_url: e.target.value })} />
          </Field>
          <Field label="Sort order">
            <Input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
            />
          </Field>
          <DialogFooter className="pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={create.isPending || update.isPending}>
              {link ? "Save changes" : "Add link"}
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

export function LinkAddButton({ group, groups }: { group?: string; groups?: string[] }) {
  return (
    <LinkEditor
      link={null}
      group={group}
      groups={groups}
      trigger={
        <button
          type="button"
          className="inline-flex items-center gap-1 h-8 px-3 rounded-md border border-dashed border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          aria-label="Add link"
        >
          <Plus className="h-3.5 w-3.5" /> Add link
        </button>
      }
    />
  );
}

export function LinkAdminActions({ link, groups }: { link: LinkRow; groups?: string[] }) {
  const { remove } = useLinkMutations();
  return (
    <div className="flex items-center gap-1">
      <LinkEditor
        link={link}
        groups={groups}
        trigger={
          <button
            type="button"
            aria-label="Edit link"
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-border bg-surface hover:border-primary hover:text-primary"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        }
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            aria-label="Delete link"
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-border bg-surface hover:border-destructive hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this link?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes “{link.name}” from the Common Links List.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await remove.mutateAsync(link.id);
                  toast.success("Link deleted");
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
