import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

const cards = {
  criticalIncident: {
    to: "/decide/critical-incident",
    title: "Something serious is happening",
    desc: "Danger, grooming, abuse, threats, anything illegal.",
    accent: "primary",
    cta: "Critical Incident Tool →",
    defaultHover: true,
  },
  confidentiality: {
    to: "/decide/confidentiality",
    title: "A young person disclosed something — do I keep it private?",
    desc: "No one’s in immediate danger; I’m weighing privacy against reporting.",
    accent: "primary",
    cta: "Confidentiality Tool →",
  },
  reporting: {
    to: "/decide/reporting",
    title: "I’m not sure who to tell",
    desc: "A concern or complaint, especially about a staff member.",
    accent: "primary",
    cta: "Reporting Hierarchy Tool →",
  },
  conflict: {
    to: "/decide/conflict",
    title: "Someone broke the Code of Conduct",
    desc: "A rule break or a conflict between members.",
    accent: "primary",
    cta: "Conflict Resolution Tool →",
  },
  flagsLog: {
    to: "/how-to/flags-log",
    title: "I just want to flag something for the team",
    desc: "A heads-up or second opinion.",
    accent: "primary",
    cta: "How to use #flags-log →",
  },
} as const;

type CardData = {
  to: string;
  title: string;
  desc: string;
  accent: "primary" | "accent";
  cta: string;
  defaultHover?: boolean;
};

function Card({ c }: { c: CardData }) {
  const borderClass = c.defaultHover
    ? "border-primary"
    : "border-border hover:border-primary";
  const dotClass = c.defaultHover
    ? "bg-primary"
    : "bg-muted-foreground/40 group-hover:bg-primary";
  return (
    <a
      href={c.to}
      className={`group flex h-full flex-col rounded-xl border ${borderClass} bg-surface p-5 hover:shadow-sm transition-all`}
    >
      <div className="flex items-start gap-2">
        <span
          aria-hidden
          className={`mt-2 h-2.5 w-2.5 flex-none rounded-full transition-colors ${dotClass}`}
        />
        <h2 className="font-display text-xl font-semibold leading-snug">{c.title}</h2>
      </div>
      <p className="mt-2 text-sm text-foreground/75">{c.desc}</p>
      <p className="mt-auto pt-4 text-sm text-primary font-medium">{c.cta}</p>
    </a>
  );
}

function Index() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        Something came up — what is it?
      </h1>
      <p className="mt-2 text-muted-foreground">Pick the closest match. It’ll walk you through the rest.</p>

      <h2 className="mt-8 font-display text-xl font-semibold">Safety &amp; reporting</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Card c={cards.criticalIncident} />
        <Card c={cards.confidentiality} />
        <Card c={cards.reporting} />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Not sure which tool? Start anywhere — they hand off to each other, so you’ll land in the right place.
      </p>

      <h2 className="mt-8 font-display text-xl font-semibold">Conflict &amp; moderation</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Card c={cards.conflict} />
        <Card c={cards.flagsLog} />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        When two might apply, pick the more serious one and loop in @Facilitators.
      </p>

      <section className="mt-12 rounded-lg border-l-4 border-accent bg-card px-4 py-4">
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
