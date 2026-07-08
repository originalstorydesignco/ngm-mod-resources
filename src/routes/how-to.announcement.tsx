import { createFileRoute } from "@tanstack/react-router";
import { Checklist, FacilitatorsBadge } from "@/components/Checklist";

export const Route = createFileRoute("/how-to/announcement")({
  head: () => ({
    meta: [
      { title: "Monthly announcement — NGMA Staff Hub" },
      { name: "description", content: "NGMA Coordinator, start of each month." },
    ],
  }),
  component: AnnouncementPage,
});

function AnnouncementPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Monthly announcement</h1>
      <div className="mt-3"><FacilitatorsBadge /></div>
      <p className="mt-4 text-foreground/85">
        Once a month we hype up the community — recap the month, flag any changes, spotlight what’s coming, and celebrate the wins. It’s personal and high-energy, so let your voice rip 🫀 This one’s on the NGMA Coordinator, posted at the beginning of the month.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">The usual sections</h2>
        <p className="mt-2 text-sm text-muted-foreground">Mix &amp; match — not every month has all of these.</p>
        <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
          <li>🎬 <strong>A fun opening</strong> — playful title + greeting, ping the members role.</li>
          <li>
            📊 <strong>Stats for the month</strong> — VC minutes + newcomer/member counts (grab from Statbot —{" "}
            <a href="https://statbot.net/dashboard/720659736990842880/overview" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">Statbot Dashboard →</a>
            ).
          </li>
          <li>🔄 <strong>Big changes / roster</strong> — welcome new staff, say goodbye to anyone leaving, note role changes.</li>
          <li>🥳 <strong>Celebrations &amp; events</strong> — anniversaries, in-person gatherings, big launches.</li>
          <li>🎮 <strong>Programs &amp; opportunities</strong> — ROPE, esports, YAC, contests, new features/roles.</li>
          <li>🧾 <strong>TL;DR</strong> — a few emoji bullets at the very bottom so the skimmers still get it.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">The vibe</h2>
        <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
          <li>Write like you talk — hype, warm, funny, emoji-forward.</li>
          <li>The energy can flex to the month: big-news months go full hype (new staff, stats, launches); quieter months can be a chill “here’s what’s brewing.” Both are right.</li>
          <li>Tag the relevant @roles so the right people catch the right thing, and drop event/info links where they fit.</li>
          <li>Use a bolded/underlined header per section so it’s skimmable.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Quick taste of the range</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-card p-4 text-sm text-foreground/85">
            🥳 <strong>Big month:</strong> “Those 24 hours without you were brutal 💔 @members — stats are in, we’ve got new faces on the team, and NGMA turns 6…”
          </div>
          <div className="rounded-md border border-border bg-card p-4 text-sm text-foreground/85">
            🌨️ <strong>Quieter month:</strong> “March break’s coming 🫠 most of my time’s been emails, but here’s what’s brewing on the server…”
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Before you post</h2>
        <div className="mt-3">
          <Checklist
            items={[
              { id: "s1", label: "@role tags point where you mean" },
              { id: "s2", label: "every link works" },
              { id: "s3", label: "the TL;DR matches the body" },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
