import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FacilitatorsBadge } from "@/components/Checklist";
import { PastePlaceholder } from "@/components/PastePlaceholder";

export const Route = createFileRoute("/how-to/event-menu")({
  head: () => ({
    meta: [
      { title: "Event menu — NGMA Staff Hub" },
      { name: "description", content: "Run-anytime event ideas, grouped and filterable." },
    ],
  }),
  component: EventMenuPage,
});

const categories = [
  "gaming",
  "watch & listen",
  "creative",
  "quick games",
  "connect",
  "Houses",
  "big draws",
] as const;

function EventMenuPage() {
  const [q, setQ] = useState("");

  const visible = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return categories.filter((c) => !needle || c.toLowerCase().includes(needle));
  }, [q]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Event menu</h1>
      <div className="mt-3"><FacilitatorsBadge /></div>
      <p className="mt-4 text-foreground/85">
        Run-anytime event ideas — pull one off the shelf when the calendar’s thin.
      </p>

      <div className="mt-6">
        <label htmlFor="menu-filter" className="sr-only">Filter categories</label>
        <input
          id="menu-filter"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="filter categories…"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <div className="mt-8 space-y-8">
        {visible.map((cat) => (
          <section key={cat}>
            <h2 className="font-display text-xl font-semibold capitalize">{cat}</h2>
            <div className="mt-3"><PastePlaceholder slot={`the items under ${cat}`} /></div>
          </section>
        ))}
        {visible.length === 0 && <p className="text-sm text-muted-foreground">No categories match.</p>}
      </div>

      <div className="mt-10 rounded-md bg-accent/15 border border-accent/40 px-4 py-3 text-sm">
        Events posted ahead of time consistently beat spontaneous ones — put it on the board.
      </div>
    </div>
  );
}
