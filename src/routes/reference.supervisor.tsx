import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/reference/supervisor")({
  head: () => ({
    meta: [
      { title: "What to expect from your supervisor — NGM Alliance Mod Resources" },
      { name: "description", content: "What your supervisor does and doesn’t do when something serious happens." },
    ],
  }),
  component: SupervisorPage,
});

function SupervisorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        What to expect from your supervisor
      </h1>

      <p className="mt-6 text-foreground/85">
        When something serious happens, you loop in the Manager of Youth Programs — or the COO if they’re unavailable. You’re not meant to carry it alone. But being supported doesn’t move the duty off you.
      </p>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="font-display text-lg font-semibold">What your supervisor does</h2>
          <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
            <li>Thinks it through with you — without taking the decision over.</li>
            <li>
              Helps you find the right line to call for where the youth lives, using the&nbsp;
              <Link to="/reference/contacts" className="text-primary underline underline-offset-2">
                Critical Incident Contact List →
              </Link>
              .
            </li>
            <li>Makes sure it’s documented and followed up — Incident Report completed, minimal pointer in #flags-log, someone owns next steps.</li>
            <li>Handles the org-level pieces — reporting the account to Discord, running the Reporting Hierarchy if a staff member is involved.</li>
            <li>Checks on you afterward.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="font-display text-lg font-semibold">What your supervisor doesn’t do</h2>
          <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
            <li>Decide whether you report — if you have reasonable grounds to suspect abuse, neglect, or harm, the duty is yours, and no one can take it off you or tell you not to.</li>
            <li>Gatekeep or delay it — looping in staff happens alongside the report, never before it, and you don’t need sign-off.</li>
            <li>Make the report for you — unless you’re genuinely unable, in which case they’ll step in.</li>
          </ul>
        </div>
      </section>

      <div className="mt-8 rounded-lg border-l-4 border-mod bg-mod/15 px-4 py-3 text-[15px] text-foreground">
        The one rule: loop in staff and report, in parallel. The support is there so you’re not alone with it, not so someone else can decide it for you.
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        The fuller picture of navigating this with your supervisor is covered in training.
      </p>
    </div>
  );
}
