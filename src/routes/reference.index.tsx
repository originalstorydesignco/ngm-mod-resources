import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/reference/")({
  head: () => ({
    meta: [
      { title: "Reference — NGMA Staff Hub" },
      { name: "description", content: "Look up scope, channels, bots, and key links." },
    ],
  }),
  component: ReferenceIndex,
});

const cards = [
  { to: "/reference/scope", title: "Scope of Practice", desc: "Is this mine to do?" },
  { to: "/reference/channels", title: "Channels & rituals", desc: "The map of admin spaces and what happens where." },
  { to: "/reference/bots", title: "Bot & command reference", desc: "MEE6, NGM Bot, Houses, and onboarding automations." },
  { to: "/reference/links", title: "Key links + Who-to-call", desc: "Forms, invites, and the vetted crisis-line table." },
] as const;

function ReferenceIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Reference</h1>
      <p className="mt-2 text-muted-foreground">Look things up. Nothing here is urgent — for anything urgent, start on the home page.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group block h-full rounded-xl border border-border bg-surface p-5 hover:border-primary hover:shadow-sm transition-all"
          >
            <h2 className="font-display text-xl font-semibold leading-snug">{c.title}</h2>
            <p className="mt-2 text-sm text-foreground/75">{c.desc}</p>
            <p className="mt-4 text-sm text-primary font-medium">Open →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
