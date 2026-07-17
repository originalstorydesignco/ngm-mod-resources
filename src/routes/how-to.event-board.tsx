import { createFileRoute } from "@tanstack/react-router";
import { Checklist } from "@/components/Checklist";

export const Route = createFileRoute("/how-to/event-board")({
  head: () => ({
    meta: [
      { title: "How to post the weekly event board — NGM Alliance Mod Resources" },
      {
        name: "description",
        content:
          "The NGMA Coordinator’s Monday ritual — get the week’s events in front of the kids, on time and on point.",
      },
    ],
  }),
  component: EventBoardPage,
});

function EventBoardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        How to post the weekly event board
      </h1>

      <p className="mt-6 text-foreground/85">
        This one’s on the NGMA Coordinator, every week, Monday after 5pm. The event board is where kids go to see what’s happening that week, so it’s gotta be on time and on point.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">The ritual</h2>
        <div className="mt-3">
          <Checklist
            items={[
              {
                id: "e1",
                label: (
                  <span>
                    <strong>Make sure everyone’s events are in.</strong> All the Facilitators need their events up ahead of time so you’ve got the full picture. If someone hasn’t posted theirs yet, send a quick nudge in #admin-chat.
                  </span>
                ),
              },
              {
                id: "e2",
                label: (
                  <span>
                    <strong>See what’s on tap.</strong> Look at everything running for the week so you know what you’re working with.
                  </span>
                ),
              },
              {
                id: "e3",
                label: (
                  <span>
                    <strong>Write the hype.</strong> Put together an exciting message that gives a general overview of the week. Tag the Facilitators running each event, the games / relevant @roles for each one, and maybe even a couple of members you know are gonna want in.
                  </span>
                ),
              },
              {
                id: "e4",
                label: (
                  <span>
                    <strong>Drop the event links.</strong> Last step before you post: copy-paste every single event link at the bottom of your message so all the events surface in the post.
                  </span>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Houses updates</h2>
        <div className="mt-3">
          <Checklist
            items={[
              {
                id: "h1",
                label: (
                  <span>
                    <strong>Post the weekly Houses standings.</strong> Pull the current points from the tracker and share the leaderboard in the Houses channel so members can see where things stand.
                  </span>
                ),
              },
              {
                id: "h2",
                label: (
                  <span>
                    <strong>Call out contributions.</strong> Shout out members who earned points that week — event wins, streaks, contests — so the work gets seen.
                  </span>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">The energy to aim for:</h2>
        <div className="mt-4 space-y-4 text-sm text-foreground/85 leading-relaxed">
          <p>
            On this week we shall be on the MOVE — starting off with @Movie Night tonight for some Arcane, then sliding into an A Way Out stream with @facilitator. Then we’ve got our @Digital Music event WHERE WE build out @facilitator’s dope initiative: a server-wide NGM playlist. After that I’ll be streaming Chained Together with @facilitator, and finally @Fortnite — our usual Thursday shindig, but bumped to 4pm this week. LET’S GOOO.
          </p>
          <p>
            This week’s schedule is STACKED — the insanely anticipated Minecraft server launches TODAY!!!!! Be ready to get cooked by me (gonna be off OP) @Minecraft Java. Then we’re running some Squid Game @Roblox, and closing it out with some MS Fortnite. [paste all event links here]
          </p>
        </div>
      </section>

      <div className="mt-8 rounded-lg border-l-4 border-[#5865F2] bg-card px-4 py-3 text-sm">
        From the data: events posted ahead of time pull way more than spontaneous ones.
      </div>
    </div>
  );
}
