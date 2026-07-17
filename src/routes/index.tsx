import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useRole } from "@/lib/role";
import { useAuth } from "@/lib/auth";
import { useCards } from "@/lib/content";
import { ContentCard } from "@/components/ContentCard";
import { CardAddButton } from "@/components/admin/CardEditor";

export const Route = createFileRoute("/")({
  component: Index,
});

const SECTIONS = ["Safety & reporting", "Conflict & moderation"];

function Index() {
  const { role, hydrated } = useRole();
  const { isAdmin } = useAuth();
  const { data: cards = [], isLoading } = useCards("decide");

  const filtered = useMemo(() => {
    if (!hydrated) return cards;
    return cards.filter((c) =>
      role === "moderator" ? c.moderator_visible : c.facilitator_visible,
    );
  }, [cards, role, hydrated]);

  const bySection = useMemo(() => {
    const map: Record<string, typeof filtered> = {};
    for (const c of filtered) {
      const key = c.section ?? "Other";
      (map[key] ??= []).push(c);
    }
    return map;
  }, [filtered]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      {SECTIONS.map((section, idx) => {
        const items = bySection[section] ?? [];
        return (
          <section key={section} className={idx === 0 ? "" : "mt-8"}>
            <div className="flex items-center justify-between gap-3">
              <h1 className={`font-display text-3xl sm:text-4xl font-semibold tracking-tight ${idx > 0 ? "" : ""}`}>
                {section}
              </h1>
              {isAdmin && (
                <CardAddButton page="decide" section={section} sections={SECTIONS} showSection />
              )}
            </div>
            <div className={`mt-4 grid gap-3 ${section === "Safety & reporting" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
              {items.map((c) => (
                <ContentCard key={c.id} card={c} sections={SECTIONS} showSection />

              ))}
            </div>
          </section>
        );
      })}

      {isLoading && filtered.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
      )}

      <p className="mt-6 text-sm text-muted-foreground">
        Not sure which tool? Pick the more serious one and loop in @Facilitators if necessary — they hand off to each other, so you’ll land in the right place.
      </p>

      <section className="mt-12 rounded-lg border-l-4 border-[#5865F2] bg-card px-4 py-4">
        <h3 className="font-display text-lg font-semibold">Just looking something up?</h3>
        <p className="mt-1 text-sm text-foreground/75">
          Quick references and step-by-step how-tos live over here.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to="/reference"
            className="inline-flex items-center h-10 px-3 rounded-md border border-border bg-surface text-sm hover:border-primary"
          >
            Reference
          </Link>
          <Link
            to="/how-to"
            className="inline-flex items-center h-10 px-3 rounded-md border border-border bg-surface text-sm hover:border-primary"
          >
            How-to guides
          </Link>
        </div>
      </section>
    </div>
  );
}
