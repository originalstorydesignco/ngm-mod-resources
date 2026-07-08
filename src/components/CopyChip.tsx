import { toast } from "sonner";

export function CopyChip({ text }: { text: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          toast.success("Copied", { description: text });
        } catch {
          toast.error("Couldn't copy");
        }
      }}
      className="inline-flex items-center rounded-md border border-border bg-surface hover:bg-surface-hover px-2 py-1 font-mono text-xs text-foreground transition-colors"
    >
      {text}
    </button>
  );
}
