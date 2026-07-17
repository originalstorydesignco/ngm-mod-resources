import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useRole } from "@/lib/role";
import { useAuth } from "@/lib/auth";
import { useCards } from "@/lib/content";
import { ContentCard } from "@/components/ContentCard";
import { CardAddButton } from "@/components/admin/CardEditor";

export const Route = createFileRoute("/how-to/")({
  head: () => ({
    meta: [
      { title: "How-to — NGM Alliance Mod Resources" },
      {
        name: "description",
        content:
          "Step-by-step guides for the recurring work — flagging, onboarding, and events.",
      },
    ],
  }),
  component: HowToIndex,
});

function HowToIndex() {
  const { role, hydrated } = useRole();
  const { isAdmin } = useAuth();
  const { data: cards = [], isLoading } = useCards("howto");

  const visible = useMemo(() => {
    if (!hydrated) return cards;
    return cards.filter((c) =>
      role === "moderator" ? c.moderator_visible : c.facilitator_visible,
    );
  }, [cards, role, hydrated]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">How-to</h1>
        {isAdmin && <CardAddButton page="howto" />}
      </div>
      <p className="mt-2 text-muted-foreground">
        Step-by-step guides for the recurring work — flagging, onboarding, and events. Read them while you do the thing.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {visible.map((c) => (
          <ContentCard key={c.id} card={c} />
        ))}
      </div>
      {isLoading && visible.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
      )}
    </div>
  );
}
