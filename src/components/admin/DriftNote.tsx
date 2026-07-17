/**
 * Muted note shown inside every admin edit modal (cards, links, wizard copy)
 * to remind editors that database edits live on the deployed site — they don't
 * update the seed values in the code. Structural or safety-critical changes
 * still belong in a code change.
 */
export function DriftNote() {
  return (
    <p className="text-xs text-muted-foreground leading-relaxed">
      Edits here save to the live site’s database, not the code. For structural
      or safety-critical changes (how a tool branches, contact numbers), use a
      code change instead.
    </p>
  );
}
