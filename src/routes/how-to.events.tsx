import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
  { category: "GAMING", text: "co-op (Among Us, Chained Together, Supermarket Together, A Way Out)" },
  { category: "GAMING", text: "competitive (Valorant Prem / NGE)" },
  { category: "WATCH PARTY", text: "movie nights (horror slaps)" },
  { category: "WATCH PARTY", text: "sports watch parties" },
  { category: "WATCH PARTY", text: "Twitch streams" },
  { category: "WATCH PARTY", text: "Spotify radio / listening party" },
  { category: "CREATIVE", text: "art night" },
  { category: "CREATIVE", text: "baking & cooking (huge turnout)" },
  { category: "CREATIVE", text: "show & tell" },
  { category: "CREATIVE", text: "writing event" },
  { category: "QUICK GAMES", text: "Skribbl" },
  { category: "QUICK GAMES", text: "Gartic Phone" },
  { category: "QUICK GAMES", text: "Geoguessr" },
  { category: "QUICK GAMES", text: "Jeopardy" },
  { category: "QUICK GAMES", text: "Family Feud" },
  { category: "QUICK GAMES", text: "trivia" },
  { category: "QUICK GAMES", text: "Wordle" },
  { category: "CONNECT", text: "advice night / Be There cert" },
  { category: "CONNECT", text: "storytime" },
  { category: "CONNECT", text: "chill & chat" },
  { category: "CONNECT", text: "homework help" },
  { category: "CONNECT", text: "wellness check-ins" },
  { category: "HOUSES", text: "run any quick game as a Houses comp — log with /houses input_placements" },
  { category: "BIG DRAWS", text: "Minecraft launches" },
  { category: "BIG DRAWS", text: "holiday party" },
  { category: "BIG DRAWS", text: "anniversary" },
  { category: "BIG DRAWS", text: "topical watch parties" },
  { category: "BIG DRAWS", text: "YAC sessions" },
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
    { id: "s1", label: <span><strong>Pick what + when.</strong> Grab something from the Event Menu below or a member suggestion (!suggest / !event).</span> },
    { id: "s2", label: <span><strong>Create the event.</strong> Let people know when, what, and which VC you’re hosting in. Check you’re not colliding with another Facilitator in the same VC, and avoid overlapping times as much as possible. Add a funny photo to entice people in + a short message on what you’re hosting and why they should come. Have your event up by 5pm Monday so it can make the event board.</span> },
    { id: "s3", label: <span><strong>Block it in your calendar.</strong> Add it to your NGM Google Calendar so it’s locked in.</span> },
    { id: "s4", label: <span><strong>Hype it uppppppp.</strong> DMing young people with the @role for that game/interest — or messaging newcomers and members who haven’t been online in a while — is a great way to pull more people in. Use the NGM Bot command /advanced-search to look up specific groups of kids by role, and DM them straight from there with the event link.</span> },
    { id: "s5", label: <span><strong>Run it.</strong> Host in the right VC/channel. The Code of Conduct still applies at events.</span> },
    {
      id: "s6",
      label: (
        <span>
          <strong>Log attendance.</strong> Fill the tracker after —{" "}
          <a href="https://nextgenmen.ca/alliance/attendance" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">Event Attendance Form →</a>
          {" "}— then check it off once you’ve done it.
        </span>
      ),
    },
    { id: "s7", label: <span><strong>Houses points (if it’s a Houses event).</strong> /houses input_placements (1st/2nd/3rd) or /houses participation.</span> },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">How to host server events</h1>
      <p className="mt-4 text-foreground/85">Events = how we keep the community alive so it can THRIVE. The flow:</p>
      <div className="mt-6">
        <Checklist items={items} />
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
