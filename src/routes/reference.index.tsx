import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { useCards } from "@/lib/content";
import { ContentCard } from "@/components/ContentCard";
import { CardAddButton } from "@/components/admin/CardEditor";

export const Route = createFileRoute("/reference/")({
  head: () => ({
    meta: [
      { title: "Reference — NGM Alliance Mod Resources" },
      { name: "description", content: "Look up scope, channels, bots, key links, and critical-incident contacts." },
    ],
  }),
  component: ReferenceIndex,
});

function ReferenceIndex() {
  const { isAdmin } = useAuth();
  const { data: cards = [], isLoading } = useCards("reference");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Reference</h1>
        {isAdmin && <CardAddButton page="reference" />}
      </div>
      <p className="mt-2 text-muted-foreground">
        These resources are to help you navigate your role — for help with decision-making or for anything urgent, go to the home page.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <ContentCard key={c.id} card={c} />
        ))}
      </div>
      {isLoading && cards.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
      )}
    </div>
  );
}
