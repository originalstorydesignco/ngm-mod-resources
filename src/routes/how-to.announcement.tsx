import { createFileRoute } from "@tanstack/react-router";
import { Checklist } from "@/components/Checklist";

export const Route = createFileRoute("/how-to/announcement")({
  head: () => ({
    meta: [
      { title: "How to post monthly announcements — NGMA Staff Hub" },
      {
        name: "description",
        content:
          "Recap the month, flag any changes, spotlight what’s coming, and celebrate the wins — in your own voice.",
      },
    ],
  }),
  component: AnnouncementPage,
});

function AnnouncementPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        How to post monthly announcements
      </h1>

      <p className="mt-6 text-foreground/85">
        Once a month we hype up the community — recap the month, flag any changes, spotlight what’s coming, and celebrate the wins. It’s personal and high-energy, so let your voice rip. This one’s on the NGMA Coordinator, posted at the beginning of the month.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">
          The usual sections (mix &amp; match — not every month has all of these):
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
          <li>A fun opening — playful title and greeting that leans into inside jokes on the server; ping the @Announcements role.</li>
          <li>Stats for the month — VC minutes and newcomer/member counts, pulled from the Statbot Dashboard (see the Common Links List).</li>
          <li>Server changes — welcome new staff, say goodbye to anyone leaving, describe any changes to the server architecture.</li>
          <li>Celebrations &amp; events — anniversaries, in-person gatherings, big launches.</li>
          <li>Programs &amp; opportunities — ROPE, esports, YAC, contests, new features/roles.</li>
          <li>TL;DR — a few short bullets at the very bottom so the skimmers still get it.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">The vibe:</h2>
        <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
          <li>Write like you talk — hype, warm, funny.</li>
          <li>The energy can flex to the month: big-news months go full hype (new staff, stats, launches); quieter months can be a chill “here’s what’s brewing.” Both are right.</li>
          <li>Tag the relevant @roles so the right people catch the right thing, and drop event/info links where they fit.</li>
          <li>Use a bolded header per section so it’s skimmable.</li>
        </ul>
      </section>

      <section className="mt-10 rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">Quick taste of the range:</h2>
        <div className="mt-4 space-y-4 text-sm text-foreground/85 leading-relaxed">
          <p>
            Big month: “Those 24 hours without you were brutal @Announcements — stats are in, we’ve got new faces on the team, and NGMA turns 6…”
          </p>
          <p>
            Quieter month: “Another month another announcement — here’s what’s brewing on the server…”
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Before you post</h2>
        <div className="mt-3">
          <Checklist
            items={[
              { id: "a1", label: <span>@role tags point where you mean</span> },
              { id: "a2", label: <span>every link works</span> },
              { id: "a3", label: <span>the TL;DR matches the body</span> },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
