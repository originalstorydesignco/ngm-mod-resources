import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/reference/")({
  head: () => ({
    meta: [
      { title: "Reference — NGMA Staff Hub" },
      { name: "description", content: "Look up scope, channels, bots, key links, and critical-incident contacts." },
    ],
  }),
  component: ReferenceIndex,
});

const cards = [
  {
    to: "/reference/scope",
    external: false,
    title: "What we do and what we don’t",
    desc: "A guide for how our role as Discord moderators compares to others.",
    cta: "Scope of Practice Tool →",
  },
  {
    to: "#",
    external: true,
    title: "Channels & rituals",
    desc: "The map of admin spaces and what happens where.",
    cta: "#mod-resources on Discord →",
  },
  {
    to: "#",
    external: true,
    title: "Bot & command reference",
    desc: "MEE6, NGM Bot, Houses, and onboarding automations.",
    cta: "#mod-resources on Discord →",
  },
  {
    to: "/reference/links",
    external: false,
    title: "Key links",
    desc: "Forms, invites, and everything staff reach for.",
    cta: "Open →",
  },
  {
    to: "/reference/contacts",
    external: false,
    title: "Critical incident contacts",
    desc: "The vetted crisis-line and child-protection table.",
    cta: "Who to call →",
  },
] as const;

function ReferenceIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Reference</h1>
      <p className="mt-2 text-muted-foreground">
        These resources are to help you navigate your role — for help with decision-making or for anything urgent, go to the home page.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {cards.map((c) =>
          c.external ? (
            <a
              key={c.title}
              href={c.to}
              className="group block h-full rounded-xl border border-border bg-surface p-5 hover:border-primary hover:shadow-sm transition-all"
            >
              <h2 className="font-display text-xl font-semibold leading-snug">{c.title}</h2>
              <p className="mt-2 text-sm text-foreground/75">{c.desc}</p>
              <p className="mt-4 text-sm text-primary font-medium">{c.cta}</p>
            </a>
          ) : (
            <Link
              key={c.title}
              to={c.to}
              className="group block h-full rounded-xl border border-border bg-surface p-5 hover:border-primary hover:shadow-sm transition-all"
            >
              <h2 className="font-display text-xl font-semibold leading-snug">{c.title}</h2>
              <p className="mt-2 text-sm text-foreground/75">{c.desc}</p>
              <p className="mt-4 text-sm text-primary font-medium">{c.cta}</p>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
