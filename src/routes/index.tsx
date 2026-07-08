import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

const cards = [
  {
    to: "/decide/critical-incident" as const,
    title: "Critical incident",
    desc: "Immediate risk to a young person — safety, abuse, self-harm, threats.",
    accent: "accent" as const,
  },
  {
    to: "/decide/confidentiality" as const,
    title: "Confidentiality",
    desc: "A young person disclosed something and you’re not sure what to do with it.",
    accent: "primary" as const,
  },
  {
    to: "/decide/conflict" as const,
    title: "Code of Conduct issue",
    desc: "Two members are clashing, or a situation is escalating in-channel.",
    accent: "primary" as const,
  },
  {
    to: "/decide/reporting" as const,
    title: "Reporting hierarchy",
    desc: "You’ve got a concern about a staff member — who do you bring it to?",
    accent: "primary" as const,
  },
];

function Index() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        Something came up — what is it?
      </h1>
      <p className="mt-2 text-muted-foreground">Pick the closest match. It’ll walk you through the rest.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group block rounded-xl border border-border bg-white p-5 hover:border-primary hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className={`h-2.5 w-2.5 rounded-full ${
                  c.accent === "accent" ? "bg-accent" : "bg-primary"
                }`}
              />
              <h2 className="font-display text-xl font-semibold">{c.title}</h2>
            </div>
            <p className="mt-2 text-sm text-foreground/75">{c.desc}</p>
            <p className="mt-4 text-sm text-primary font-medium">
              Open →
            </p>
          </Link>
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
