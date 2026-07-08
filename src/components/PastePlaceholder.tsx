export function PastePlaceholder({ slot, hint }: { slot: string; hint?: string }) {
  return (
    <div className="my-2 rounded-md border-2 border-dashed border-accent/60 bg-accent/10 px-3 py-2 text-sm text-foreground/80">
      <span className="font-mono text-xs uppercase tracking-wide text-accent">[PASTE: {slot}]</span>
      {hint && <span className="ml-2 text-foreground/70">— {hint}</span>}
    </div>
  );
}
