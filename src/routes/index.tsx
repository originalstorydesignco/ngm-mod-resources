import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

const cards = [
  {
    to: "/decide/conflict",
    title: "Someone broke the Code of Conduct",
    desc: "A rule break or a conflict between members.",
    accent: "primary",
  },
  {
    to: "/decide/confidentiality",
    title: "A young person disclosed something — do I keep it private or report it?",
    desc: "No one’s in immediate danger; I’m weighing privacy against reporting.",
    accent: "primary",
  },
  {
    to: "/decide/critical-incident",
    title: "Something serious is happening — I need to respond.",
    desc: "Danger, grooming, abuse, threats, anything criminal.",
    accent: "accent",
  },
  {
    to: "/decide/reporting",
    title: "Who do I tell?",
    desc: "A concern or complaint, especially about a staff member.",
    accent: "primary",
  },
  {
    to: "/how-to/flags-log",
    title: "I just want to flag something for the team",
    desc: "A heads-up or second opinion.",
    accent: "primary",
  },
] as const;

function Index() {
  const [showHandoff, setShowHandoff] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        Something came up — what is it?
      </h1>
      <p className="mt-2 text-muted-foreground">Pick the closest match. It’ll walk you through the rest.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {cards.map((c, i) => (
          <div key={c.to} className={i === 2 ? "sm:col-span-2" : undefined}>
            <Link
              to={c.to}
              className="group block h-full rounded-xl border border-border bg-white p-5 hover:border-primary hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-2">
                <span
                  aria-hidden
                  className={`mt-2 h-2.5 w-2.5 flex-none rounded-full ${
                    c.accent === "accent" ? "bg-accent" : "bg-primary"
                  }`}
                />
                <h2 className="font-display text-xl font-semibold leading-snug">{c.title}</h2>
              </div>
              <p className="mt-2 text-sm text-foreground/75">{c.desc}</p>
              <p className="mt-4 text-sm text-primary font-medium">Open →</p>
            </Link>

            {i === 2 && (
              <div className="mt-3 rounded-lg border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setShowHandoff((v) => !v)}
                  aria-expanded={showHandoff}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-sm font-medium">Which one? These two hand off to each other.</span>
                  <span aria-hidden className="text-muted-foreground">{showHandoff ? "−" : "+"}</span>
                </button>
                {showHandoff && (
                  <p className="px-4 pb-4 text-sm text-foreground/80 border-t border-border pt-3">
                    The Confidentiality tool is for a decision: a youth trusted you with something, and you’re working out whether it stays private. The Critical Incident tool is for a response: something is clearly serious, and you’re working out what to do. They’re built to hand off — the Confidentiality tool routes you into the Critical Incident tool the moment a disclosure crosses the reporting line, and the Critical Incident tool runs abuse disclosures through confidentiality logic to decide who gets contacted. Responding to a critical incident sometimes means breaking confidentiality; that’s by design, not a mistake. Starting in the ‘wrong’ one is fine — you’ll land in the right place.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        When two might apply, pick the more serious one and loop in @Facilitators.
      </p>

      <section className="mt-12 rounded-xl bg-card p-5">
        <h3 className="font-display text-lg font-semibold">Just looking something up?</h3>
        <p className="mt-1 text-sm text-foreground/75">
          Quick references and step-by-step how-tos live over here.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to="/reference/$"
            params={{ _splat: "" }}
            className="inline-flex items-center h-10 px-3 rounded-md border border-border bg-white text-sm hover:border-primary"
          >
            Reference
          </Link>
          <Link
            to="/how-to/$"
            params={{ _splat: "" }}
            className="inline-flex items-center h-10 px-3 rounded-md border border-border bg-white text-sm hover:border-primary"
          >
            How-to guides
          </Link>
        </div>
      </section>
    </div>
  );
}
