import { createFileRoute } from "@tanstack/react-router";
import { Checklist, FacilitatorsBadge } from "@/components/Checklist";

export const Route = createFileRoute("/how-to/event-board")({
  head: () => ({
    meta: [
      { title: "Weekly event board — NGMA Staff Hub" },
      { name: "description", content: "NGMA Coordinator, Mondays after 5pm." },
    ],
  }),
  component: EventBoardPage,
});

function EventBoardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Weekly event board</h1>
      <div className="mt-3"><FacilitatorsBadge /></div>
      <p className="mt-4 text-foreground/85">
        This one’s on the NGMA Coordinator, every week, Monday after 5pm. The event board is where kids go to see what’s happening that week, so it’s gotta be on time and on point.
      </p>

      <div className="mt-6">
        <Checklist
          items={[
            { id: "s1", label: <span><strong>Make sure everyone’s events are in.</strong> All the Facilitators need their events up ahead of time so you’ve got the full picture. If someone hasn’t posted theirs yet, send a quick nudge in ⛳ admin-chat.</span> },
            { id: "s2", label: <span><strong>See what’s on tap.</strong> Look at everything running for the week so you know what you’re working with.</span> },
            { id: "s3", label: <span><strong>Write the hype 📣</strong> Put together an exciting message that gives a general overview of the week. Tag the Facilitators running each event, the games / relevant @roles for each one, and maybe even a couple of members you know are gonna want in.</span> },
            { id: "s4", label: <span><strong>Drop the event links.</strong> Last step before you post: copy-paste every single event link at the bottom of your message so all the events surface in the post.</span> },
          ]}
        />
      </div>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Here’s the energy to aim for 👇</h2>
        <div className="mt-2 rounded-md border border-border bg-card p-4 text-sm text-foreground/85">
          “On this week we shall be on the MOVE — starting off with @Movie Night tonight for some Arcane, then sliding into an A Way Out stream with @facilitator. Then we’ve got our @Digital Music event WHERE WE build out @facilitator’s dope initiative: a server-wide NGM playlist 🎶 After that I’ll be streaming Chained Together with @facilitator, and finally @Fortnite — our usual Thursday shindig, but bumped to 4pm this week. LET’S GOOO.”
        </div>
      </section>

      <div className="mt-8 rounded-md bg-accent/15 border border-accent/40 px-4 py-3 text-sm">
        💡 From the data: events posted ahead of time pull way more than spontaneous ones.
      </div>
    </div>
  );
}
