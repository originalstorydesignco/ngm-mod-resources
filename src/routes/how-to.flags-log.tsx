import { createFileRoute, Link } from "@tanstack/react-router";
import { Checklist, FacilitatorsBadge } from "@/components/Checklist";
import { PastePlaceholder } from "@/components/PastePlaceholder";
import { useRole } from "@/lib/role";

export const Route = createFileRoute("/how-to/flags-log")({
  head: () => ({
    meta: [
      { title: "How to use #flags-log — NGMA Staff Hub" },
      { name: "description", content: "How to post a flag — minimal, factual, respectful." },
    ],
  }),
  component: FlagsLogPage,
});

function FlagsLogPage() {
  const { role, hydrated } = useRole();
  const isMod = hydrated && role === "moderator";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">How to use #flags-log</h1>
      <div className="mt-3"><FacilitatorsBadge /></div>

      {isMod && (
        <div className="mt-4 rounded-md bg-mod text-mod-foreground px-4 py-3 text-sm">
          <strong className="font-bold">Moderators:</strong> flags live in #flags-log, which is a Facilitator space — your version is simpler. Link the message in #mod-chat, ping @Facilitators, and add one line of context.
        </div>
      )}

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">What a flag is</h2>
        <p className="mt-2 text-foreground/85">
          A flag is a pointer, not a file — enough for the team to see it, find it, and pick it up. Minimal, factual, respectful.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">How to post one</h2>
        <div className="mt-3">
          <PastePlaceholder slot="the 5 steps from the flags-log guide" />
          <Checklist
            items={[
              { id: "s1", label: <PastePlaceholder slot="step 1" /> },
              { id: "s2", label: <PastePlaceholder slot="step 2" /> },
              { id: "s3", label: <PastePlaceholder slot="step 3" /> },
              { id: "s4", label: <PastePlaceholder slot="step 4" /> },
              { id: "s5", label: <PastePlaceholder slot="step 5" /> },
            ]}
          />
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="font-display text-lg font-semibold">✅ What belongs here</h3>
          <div className="mt-3"><PastePlaceholder slot="list of what belongs in #flags-log" /></div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="font-display text-lg font-semibold">🚫 What doesn’t</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/85">
            <li>
              critical incidents →{" "}
              <Link to="/decide/critical-incident" className="text-primary underline underline-offset-2">Critical Incident Tool →</Link>
            </li>
            <li>
              concerns about staff →{" "}
              <Link to="/decide/reporting" className="text-primary underline underline-offset-2">Reporting Hierarchy Tool →</Link>
            </li>
            <li>sensitive personal detail → bring it to the scorecard meeting, verbally</li>
            <li>already-resolved items</li>
            <li>venting</li>
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Principles</h2>
        <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
          <li>minimal, factual, respectful</li>
          <li>confidential by default</li>
          <li>Discord isn’t a vault</li>
          <li>write as if the youth could read it</li>
        </ul>
      </section>

      <div className="mt-8 rounded-md bg-accent/15 border border-accent/40 px-4 py-3 text-sm">
        <strong className="font-semibold">Rule of thumb:</strong> if you’re debating whether to flag something — flag it.
      </div>
    </div>
  );
}
