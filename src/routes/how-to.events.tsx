import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Checklist } from "@/components/Checklist";

export const Route = createFileRoute("/how-to/events")({
  head: () => ({
    meta: [
      { title: "How to host server events — NGMA Staff Hub" },
      { name: "description", content: "From pick-what-and-when to Houses points, plus the event menu." },
    ],
  }),
  component: EventsPage,
});

type Category =
  | "GAMING"
  | "WATCH PARTY"
  | "CREATIVE"
  | "QUICK GAMES"
  | "CONNECT"
  | "HOUSES"
  | "BIG DRAWS";

const CATEGORIES: Category[] = [
  "GAMING",
  "WATCH PARTY",
  "CREATIVE",
  "QUICK GAMES",
  "CONNECT",
  "HOUSES",
  "BIG DRAWS",
];

type Entry = { category: Category; text: string };

const bank: Entry[] = [
  { category: "GAMING", text: "Fortnite" },
  { category: "GAMING", text: "Valorant" },
  { category: "GAMING", text: "Minecraft" },
  { category: "GAMING", text: "Roblox" },
  { category: "GAMING", text: "Pokémon Showdown" },
  { category: "GAMING", text: "Co-op games (Among Us, Chained Together, Supermarket Together, A Way Out)" },
  { category: "GAMING", text: "Competitive (NGE practice)" },
  { category: "WATCH PARTY", text: "Movie nights (horror is fun)" },
  { category: "WATCH PARTY", text: "Sports games" },
  { category: "WATCH PARTY", text: "Twitch streams" },
  { category: "WATCH PARTY", text: "Spotify radio / listening party" },
  { category: "CREATIVE", text: "Art night" },
  { category: "CREATIVE", text: "Baking & cooking" },
  { category: "CREATIVE", text: "Show & tell" },
  { category: "CREATIVE", text: "Writing event" },
  { category: "QUICK GAMES", text: "Skribbl" },
  { category: "QUICK GAMES", text: "Gartic Phone" },
  { category: "QUICK GAMES", text: "GeoGuessr" },
  { category: "QUICK GAMES", text: "Jeopardy" },
  { category: "QUICK GAMES", text: "Family Feud" },
  { category: "QUICK GAMES", text: "Chess" },
  { category: "QUICK GAMES", text: "Wordle" },
  { category: "CONNECT", text: "Advice night / Be There certificate" },
  { category: "CONNECT", text: "Storytime" },
  { category: "CONNECT", text: "Chill & chat" },
  { category: "CONNECT", text: "Homework help" },
  { category: "CONNECT", text: "Wellness check-in" },
  { category: "HOUSES", text: "Run any quick game exclusive to your House channel" },
  { category: "BIG DRAWS", text: "Minecraft campaign launch" },
  { category: "BIG DRAWS", text: "Holiday party" },
  { category: "BIG DRAWS", text: "Anniversary" },
  { category: "BIG DRAWS", text: "Highly topical watch partie" },
  { category: "BIG DRAWS", text: "Youth Advisory Council session" },
];

function CategoryBadge({ label }: { label: Category }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface border border-border text-foreground/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
      {label}
    </span>
  );
}

function EventsPage() {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<Category | null>(null);
  const [showAll, setShowAll] = useState(false);

  const isOpen = showAll || activeCat !== null || q.trim().length > 0;

  const visible = useMemo(() => {
    if (!isOpen) return [];
    const needle = q.toLowerCase().trim();
    return bank.filter((it) => {
      if (activeCat && it.category !== activeCat) return false;
      if (needle && !it.text.toLowerCase().includes(needle) && !it.category.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [q, activeCat, isOpen]);

  const items = [
    { id: "s1", label: <span><strong>Pick what and when.</strong> Grab something from the Event Menu below or a member suggestion (!suggest / !event).</span> },
    { id: "s2", label: <span><strong>Create the event.</strong> Let people know when, what, and which voice channel you’re hosting in. Check you’re not colliding with another Facilitator in the same VC, and avoid overlapping times as much as possible. Add a funny photo to entice people in and a short message on what you’re hosting and why they should come. Have your event up by 5 PM on Mondays so it can make the event board.</span> },
    { id: "s3", label: <span><strong>Block it in your calendar.</strong> Add it to your work calendar so it’s locked in.</span> },
    { id: "s4", label: <span><strong>Hype it uppppppp.</strong> DMing young people with the @role for that game/interest — or messaging newcomers and members who haven’t been online in a while — is a great way to pull more people in. Use the NGM Bot command /advanced-search to look up specific groups of kids by role, and DM them straight from there with the event link.</span> },
    { id: "s5", label: <span><strong>Run it.</strong> Host in the right voice channel. The Code of Conduct still applies at events.</span> },
    {
      id: "s6",
      label: (
        <span>
          <strong>Log attendance.</strong> Fill the event tracker after, then check it off once you’ve done it.
        </span>
      ),
    },
    { id: "s7", label: <span><strong>Houses points (if it’s a Houses event).</strong> Use /houses points_add to give a point to every youth who participated.</span> },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">How to host server events</h1>
      <p className="mt-4 text-foreground/85">Events are how we keep the community alive so it can thrive! This is the flow for putting together a suite of events that are likely to bring out youth participants.</p>
      <div className="mt-6">
        <Checklist items={items} />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <a
          href="#"
          className="inline-flex items-center h-10 px-3 rounded-md border border-border bg-surface text-sm hover:border-primary"
        >
          Bots &amp; commands →
        </a>
        <Link
          to="/reference/links"
          className="inline-flex items-center h-10 px-3 rounded-md border border-border bg-surface text-sm hover:border-primary"
        >
          Common Links List →
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Event menu</h2>
        <p className="mt-2 text-foreground/85">Steal one of these — built from what’s actually worked. Pick, post, run.</p>

        <div className="mt-4">
          <label htmlFor="menu-filter" className="sr-only">Filter events</label>
          <input
            id="menu-filter"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="try: fortnite, trivia, movie…"
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = activeCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(active ? null : cat)}
                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-surface text-foreground/85 border-border hover:border-muted-foreground"
                }`}
                aria-pressed={active}
              >
                {cat}
              </button>
            );
          })}
          {!isOpen ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="ml-auto inline-flex items-center h-7 px-3 rounded-md border border-border bg-surface text-xs hover:border-primary"
            >
              Show all
            </button>
          ) : (
            <button
              type="button"
              onClick={() => { setShowAll(false); setActiveCat(null); setQ(""); }}
              className="ml-auto inline-flex items-center h-7 px-3 rounded-md border border-border bg-surface text-xs hover:border-primary"
            >
              Collapse
            </button>
          )}
        </div>

        {isOpen && (
          <ul className="mt-4 space-y-2">
            {visible.length === 0 && <li className="text-sm text-muted-foreground">No matches.</li>}
            {visible.map((it, i) => (
              <li key={i} className="flex items-start gap-3 rounded-md border border-border bg-card px-3 py-2">
                <CategoryBadge label={it.category} />
                <span className="text-sm leading-relaxed">{it.text}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 rounded-md bg-accent/15 border border-accent/40 px-4 py-3 text-sm">
          What fills a room: launches, food, advice nights, group games, anything topical — and posting to the event board ahead of time beats spontaneous every time.
        </div>
      </section>
    </div>
  );
}
