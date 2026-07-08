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

type Category = { emoji: string; name: string; items: string };

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

function EventsPage() {
  const [q, setQ] = useState("");

  const visible = useMemo(() => {
    const needle = q.toLowerCase().trim();
    if (!needle) return categories;
    return categories.filter(
      (c) => c.name.toLowerCase().includes(needle) || c.items.toLowerCase().includes(needle),
    );
  }, [q]);

  const items = [
    { id: "s1", label: <span><strong>Pick what + when.</strong> Grab something from the Event Menu below or a member suggestion (!suggest / !event).</span> },
    { id: "s2", label: <span><strong>Create the event.</strong> Let people know when, what, and which VC you’re hosting in. Check you’re not colliding with another Facilitator in the same VC, and avoid overlapping times as much as possible. Add a funny photo to entice people in + a short message on what you’re hosting and why they should come. Have your event up by 5pm Monday so it can make the event board.</span> },
    { id: "s3", label: <span><strong>Block it in your calendar.</strong> Add it to your NGM Google Calendar so it’s locked in 📅</span> },
    { id: "s4", label: <span><strong>Hype it uppppppp 📣</strong> DMing young people with the @role for that game/interest — or messaging newcomers and members who haven’t been online in a while — is a great way to pull more people in. Use the NGM Bot command /advanced-search to look up specific groups of kids by role, and DM them straight from there with the event link.</span> },
    { id: "s5", label: <span><strong>Run it.</strong> Host in the right VC/channel. The Code of Conduct still applies at events.</span> },
    {
      id: "s6",
      label: (
        <span>
          <strong>Log attendance.</strong> Fill the tracker after —{" "}
          <a href="https://nextgenmen.ca/alliance/attendance" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">Event Attendance Form →</a>
          {" "}— then react ✅ once you’ve done it!
        </span>
      ),
    },
    { id: "s7", label: <span><strong>Houses points (if it’s a Houses event).</strong> /houses input_placements (1st/2nd/3rd) or /houses participation.</span> },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">How to host server events</h1>
      <p className="mt-4 text-foreground/85">Events = how we keep the community alive so it can THRIVE. The flow 👇</p>
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

        <div className="mt-6 space-y-3">
          {visible.map((cat) => (
            <div key={cat.name} className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-display text-lg font-semibold">
                <span className="mr-2">{cat.emoji}</span>
                <span className="text-primary">{cat.name}:</span>{" "}
                <span className="font-normal text-foreground/85">{cat.items}</span>
              </h3>
            </div>
          ))}
          {visible.length === 0 && <p className="text-sm text-muted-foreground">No matches.</p>}
        </div>

        <div className="mt-8 rounded-md bg-accent/15 border border-accent/40 px-4 py-3 text-sm">
          💡 What fills a room: launches, food, advice nights, group games, anything topical — and posting to the event board ahead of time beats spontaneous every time.
        </div>
      </section>
    </div>
  );
}
