import { createFileRoute, Link } from "@tanstack/react-router";
import { Checklist, FacilitatorsBadge } from "@/components/Checklist";
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

      <p className="mt-6 text-foreground/85">
        #flags-log is how we show up for the young people we work with — and for each other. When you notice something about a kid, this is where you bring the team in, so you’re not holding it alone. It’s a pointer, not a file: a short note here, and the real conversation can happen here too — or out loud at our weekly scorecard meeting. Keep it brief, factual, and kind — to the youth, and to whoever reads it next.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">How to post a flag</h2>
        <div className="mt-3">
          <Checklist
            items={[
              { id: "s1", label: <span><strong>Create a thread.</strong> Title it with one plain line — who, where, what. e.g. “Marcus in #support-channel — rough week, keeping an eye out.”</span> },
              { id: "s2", label: <span><strong>Paste the message link</strong> in the thread, with any key details — observations, not opinions. We’re describing what happened, not deciding who someone is.</span> },
              { id: "s3", label: <span><strong>If it’s sensitive, don’t type it.</strong> Write “→ flagging to bring up at scorecard meeting on (date)” and bring it to the weekly meeting, where we talk it through together.</span> },
              { id: "s4", label: <span><strong>Say what you actually need.</strong> “Thoughts?” tends to get silence — we can’t tell what you need. Tell us plainly: an FYI, a second opinion, or a request for someone to take follow-up.</span> },
              { id: "s5", label: <span><strong>Hand it off cleanly.</strong> If follow-up’s needed, we figure out who has the strongest relationship with that young person, and they take it. If that’s you, close the loop in the thread when it’s done — with any need-to-knows — so nothing quietly falls off anyone’s plate.</span> },
            ]}
          />
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="font-display text-lg font-semibold">✅ Flag it here</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
            <li>A heads-up that might change how a youth shows up (had a setback, going through something, may be quieter or more reactive) — so we can meet them where they are.</li>
            <li>A pattern worth a second set of eyes (testing limits, withdrawing, conflict brewing, repeated small stuff).</li>
            <li>A judgment call you want input on, a check on how you handled something, or a question about how someone else responded. Asking isn’t a sign you’re not on top of it — it’s how we support our community.</li>
            <li>A lower-level concern that isn’t urgent but shouldn’t sit only with you.</li>
            <li>A mistake or learning moment for the team. We name these openly and without blame.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="font-display text-lg font-semibold">🚫 Don’t put it here — it goes elsewhere</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
            <li>
              <strong>A safeguarding / critical incident</strong> — danger to self or others, grooming or sexual exploitation, an abuse or neglect disclosure, credible threats, anything sexual involving a minor. → This isn’t a flag.{" "}
              <Link to="/decide/critical-incident" className="text-primary underline underline-offset-2">Critical Incident Tool →</Link>{" "}
              (Never screenshot or save imagery of a minor — note context only.)
            </li>
            <li><strong>Sensitive personal details</strong> — a disclosure, mental-health specifics, home/family situations, anything shared in confidence. → Name only that there’s something (“[name] — something to raise”); keep the substance for the scorecard meeting, verbally.</li>
            <li>
              <strong>A concern about a staff member.</strong>{" "}
              <Link to="/decide/reporting" className="text-primary underline underline-offset-2">Reporting Hierarchy Tool →</Link>, not here.
            </li>
            <li>Private/contact info or screenshots of sensitive content.</li>
            <li><strong>Already handled, parents involved, resolved.</strong> → Only post if you’d like advice; otherwise leave it.</li>
            <li><strong>Venting or character judgments about a kid.</strong> → Describe the behaviour, not the person.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Principles</h2>
        <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
          <li><strong>Minimal, factual, respectful.</strong> Describe what happened — not who you’ve decided someone is. No labels, no diagnoses. Listen to understand.</li>
          <li><strong>Confidential by default.</strong> Our Privacy Policy promises youth we keep their info private and only widen the circle to prevent harm or when the law requires.</li>
          <li><strong>Discord isn’t a vault.</strong> Discord can read everything — so sensitive detail belongs in the scorecard meeting, not #flags-log.</li>
          <li><strong>Write as if the youth could read it.</strong> We don’t notify youth of flags (like any school or camp) — which is exactly why the bar for respect is high.</li>
        </ul>
      </section>

      <div className="mt-8 rounded-md bg-accent/15 border border-accent/40 px-4 py-3 text-sm">
        If you’re debating whether to flag something… that means you should flag it. This is our System of Safety in practice — showing up for each other the way we show up for our community members. 💛
      </div>
    </div>
  );
}
