import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/how-to/")({
  head: () => ({
    meta: [
      { title: "How-to — NGMA Staff Hub" },
      {
        name: "description",
        content:
          "Step-by-step guides for the recurring work — flagging, screening, events, and announcements.",
      },
    ],
  }),
  component: HowToIndex,
});

const cards = [
  {
    to: "/how-to/flags-log",
    title: "How to use #flags-log",
    desc: "Post a flag cleanly — minimal, factual, respectful.",
    cta: "Flags Log Guide →",
  },
  {
    to: "/how-to/screening",
    title: "Screening & onboarding",
    desc: "The 15-step check every new member goes through.",
    cta: "Screening Guide →",
  },
  {
    to: "/how-to/events",
    title: "How to host an event",
    desc: "From pick-what-and-when to Houses points.",
    cta: "Event Guide →",
  },
  {
    to: "/how-to/event-board",
    title: "Weekly event board",
    desc: "NGMA Coordinator, Mondays after 5pm.",
    cta: "Event Board Guide →",
  },
  {
    to: "/how-to/announcement",
    title: "Monthly announcement",
    desc: "NGMA Coordinator, start of each month.",
    cta: "Announcement Guide →",
  },
  {
    to: "/how-to/event-menu",
    title: "Event menu",
    desc: "Run-anytime ideas you can pull off the shelf.",
    cta: "Event Menu →",
  },
] as const;

function HowToIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">How-to</h1>
      <p className="mt-2 text-muted-foreground">
        Step-by-step guides for the recurring work — flagging, screening, events, and announcements. Read them while you do the thing.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
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
