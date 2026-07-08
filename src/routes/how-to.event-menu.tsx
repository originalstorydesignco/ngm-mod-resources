import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FacilitatorsBadge } from "@/components/Checklist";

export const Route = createFileRoute("/how-to/event-menu")({
  head: () => ({
    meta: [
      { title: "Event menu — NGMA Staff Hub" },
      { name: "description", content: "Run-anytime event ideas, grouped and filterable." },
    ],
  }),
  component: EventMenuPage,
});

type Category = { emoji: string; name: string; items: string; note?: string };

const categories: Category[] = [
  {
    emoji: "🎮",
    name: "Gaming",
    items: "Fortnite · Valorant · Minecraft · Roblox · Pokémon Showdown · co-op (Among Us, Chained Together, Supermarket Together, A Way Out) · competitive (Valorant Prem / NGE)",
  },
  {
    emoji: "🍿",
    name: "Watch & listen",
    items: "movie nights (horror slaps) · sports watch parties · Twitch streams · Spotify radio / listening party",
  },
  {
    emoji: "🎨",
    name: "Creative",
    items: "art night · baking & cooking (huge turnout) · show & tell · writing event",
  },
  {
    emoji: "🧠",
    name: "Quick games",
    items: "Skribbl · Gartic Phone · Geoguessr · Jeopardy · Family Feud · trivia · Wordle",
  },
  {
    emoji: "💬",
    name: "Connect",
    items: "advice night / Be There cert · storytime · chill & chat · homework help · wellness check-ins",
  },
  {
    emoji: "🏆",
    name: "Houses",
    items: "run any quick game as a Houses comp → log with /houses input_placements",
  },
  {
    emoji: "🌟",
    name: "Big draws (want a crowd?)",
    items: "Minecraft launches · holiday party · anniversary · topical watch parties · YAC sessions",
  },
];

function EventMenuPage() {
  const [q, setQ] = useState("");

  const visible = useMemo(() => {
    const needle = q.toLowerCase().trim();
    if (!needle) return categories;
    return categories.filter(
      (c) => c.name.toLowerCase().includes(needle) || c.items.toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Event menu</h1>
      <div className="mt-3"><FacilitatorsBadge /></div>
      <p className="mt-4 text-foreground/85">
        Steal one of these — built from what’s actually worked. Pick, post, run.
      </p>

      <div className="mt-6">
        <label htmlFor="menu-filter" className="sr-only">Filter events</label>
        <input
          id="menu-filter"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="filter events…"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <div className="mt-8 space-y-4">
        {visible.map((cat) => (
          <section key={cat.name} className="rounded-xl border border-border bg-card p-4">
            <h2 className="font-display text-lg font-semibold">
              <span className="mr-2">{cat.emoji}</span>
              <span className="text-primary">{cat.name}:</span>{" "}
              <span className="font-normal text-foreground/85">{cat.items}</span>
            </h2>
          </section>
        ))}
        {visible.length === 0 && <p className="text-sm text-muted-foreground">No matches.</p>}
      </div>

      <div className="mt-10 rounded-md bg-accent/15 border border-accent/40 px-4 py-3 text-sm">
        💡 What fills a room: launches, food, advice nights, group games, anything topical — and posting to the event board ahead of time beats spontaneous every time.
      </div>
    </div>
  );
}
