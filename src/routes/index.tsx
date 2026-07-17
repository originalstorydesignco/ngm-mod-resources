import { createFileRoute, Link } from "@tanstack/react-router";
import { useRole } from "@/lib/role";

export const Route = createFileRoute("/")({
  component: Index,
});

const MOD_CHAT_URL =
  "https://discord.com/channels/720659736990842880/1357442642450976918";

const cards = {
  criticalIncident: {
    to: "/decide/critical-incident",
    title: "Something serious is happening",
    desc: "Danger, grooming, abuse, threats, anything illegal.",
    cta: "Critical Incident Tool →",
    defaultHover: true,
  },
  confidentiality: {
    to: "/decide/confidentiality",
    title: "A young person disclosed something",
    desc: "I’m weighing privacy against reporting.",
    cta: "Confidentiality Tool →",
  },
  reporting: {
    to: "/decide/reporting",
    title: "I’m not sure who to tell",
    desc: "A concern or complaint, especially about a staff member.",
    cta: "Reporting Hierarchy Tool →",
  },
  conflict: {
    to: "/decide/conflict",
    title: "Someone broke the Code of Conduct",
    desc: "A rule break or a conflict between members.",
    cta: "Conflict Resolution Tool →",
  },
  flagsLog: {
    to: "/how-to/flags-log",
    title: "I just want to flag something for the team",
    desc: "A heads-up or second opinion.",
    cta: "How to use #flags-log →",
  },
  flagsLogMod: {
    to: MOD_CHAT_URL,
    title: "I just want to flag something for the team",
    desc: "A heads-up or second opinion.",
    cta: "#mod-chat on Discord ↗",
    modCta: true,
    external: true,
  },
} as const;

type CardData = {
  to: string;
  title: string;
  desc: string;
  cta: string;
  defaultHover?: boolean;
  modCta?: boolean;
  external?: boolean;
};

function Card({ c }: { c: CardData }) {
  const isModCta = !!c.modCta;
  const borderClass = c.defaultHover
    ? "border-primary"
    : isModCta
      ? "border-border hover:border-mod"
      : "border-border hover:border-primary";
  const dotClass = c.defaultHover
    ? "bg-primary"
    : isModCta
      ? "bg-muted-foreground/40 group-hover:bg-mod"
      : "bg-muted-foreground/40 group-hover:bg-primary";
  const ctaClass = isModCta
    ? "mt-auto pt-4 text-sm font-medium text-mod"
    : "mt-auto pt-4 text-sm font-medium text-primary";
  const externalProps = c.external
    ? { target: "_blank" as const, rel: "noreferrer" as const }
    : {};
  return (
    <a
      href={c.to}
      {...externalProps}
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
      <p className={ctaClass}>{c.cta}</p>
    </a>
  );
}

function Index() {
  const { role, hydrated } = useRole();
  const isMod = hydrated && role === "moderator";
  const flagsCard = isMod ? cards.flagsLogMod : cards.flagsLog;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Safety &amp; reporting</h1>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Card c={cards.criticalIncident} />
        <Card c={cards.confidentiality} />
        <Card c={cards.reporting} />
      </div>

      <h2 className="mt-8 font-display text-3xl sm:text-4xl font-semibold tracking-tight">Conflict &amp; moderation</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Card c={cards.conflict} />
        <Card c={flagsCard} />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Not sure which tool? Pick the more serious one and loop in @Facilitators if necessary — they hand off to each other, so you’ll land in the right place.
      </p>

      <section className="mt-12 rounded-lg border-l-4 border-[#5865F2] bg-card px-4 py-4">
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

