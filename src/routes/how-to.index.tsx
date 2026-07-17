import { createFileRoute, Link } from "@tanstack/react-router";
import { useRole } from "@/lib/role";

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

type Card = {
  to: string;
  title: string;
  desc: string;
  cta: string;
  roles: ("facilitator" | "moderator")[];
};

const cards: Card[] = [
  {
    to: "/how-to/screening",
    title: "How to onboard new youth",
    desc: "The steps every new member goes through.",
    cta: "How to onboard new youth →",
    roles: ["facilitator"],
  },
  {
    to: "/how-to/events",
    title: "How to host server events",
    desc: "Suggestions on what to host, when and how.",
    cta: "How to host server events →",
    roles: ["facilitator", "moderator"],
  },
  {
    to: "/how-to/event-board",
    title: "How to post the weekly event board",
    desc: "Get the week’s events in front of the youth, on time and on point.",
    cta: "How to post the weekly event board →",
    roles: ["facilitator", "moderator"],
  },
  {
    to: "/how-to/announcement",
    title: "How to post monthly announcements",
    desc: "Recap the month, flag any changes, spotlight what’s coming, and celebrate the wins.",
    cta: "How to post monthly announcements →",
    roles: ["facilitator", "moderator"],
  },
  {
    to: "/how-to/flags-log",
    title: "How to use #flags-log",
    desc: "Post a flag cleanly — minimal, factual, respectful.",
    cta: "How to use #flags-log →",
    roles: ["facilitator"],
  },
];

function HowToIndex() {
  const { role, hydrated } = useRole();
  const visible = hydrated ? cards.filter((c) => c.roles.includes(role)) : cards;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">How-to</h1>
      <p className="mt-2 text-muted-foreground">
        Step-by-step guides for the recurring work — flagging, onboarding, and events. Read them while you do the thing.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {visible.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 hover:border-primary hover:shadow-sm transition-all"
          >
            <h2 className="font-display text-xl font-semibold leading-snug">{c.title}</h2>
            <p className="mt-2 text-sm text-foreground/75">{c.desc}</p>
            <p className="mt-auto pt-4 text-sm text-primary font-medium">{c.cta}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
