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
        One of the ways we maintain engagement on the server is by posting upcoming events every week, Monday after 5 PM. The #event-board channel is where kids go to see what’s happening and what they might be interested in joining, so it needs to be clear, energizing, and on time.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Share upcoming events</h2>
        <div className="mt-3">
          <Checklist
            items={[
              {
                id: "e1",
                label: (
                  <span>
                    <strong>Make sure everyone’s events are in.</strong> All the Facilitators should have their events up ahead of time so you’ve got the full picture. If someone hasn’t posted theirs yet, send a quick nudge in #admin-chat.
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
                    <strong>Write the hype.</strong> Put together an exciting message that gives a general overview of the week. Tag the Facilitators running each event, the relevant @roles for each one, and maybe even a couple of members you know are likely to be interested (or appreciate being tagged). Consider using emojis for fun and @time for clarity.
                  </span>
                ),
              },
              {
                id: "e4",
                label: (
                  <span>
                    <strong>Drop the event links.</strong> Last step before you post: copy-paste every single event link at the bottom of your message so all the event cards follow the post.
                  </span>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Update the Houses competition</h2>
        <div className="mt-3">
          <Checklist
            items={[
              {
                id: "h1",
                label: (
                  <span>
                    <strong>Post the weekly Houses standings.</strong> Use the /houses leaderboard command to share the standings in #event-board so members can see where things stand.
                  </span>
                ),
              },
              {
                id: "h2",
                label: (
                  <span>
                    <strong>Include this week’s Houses challenge.</strong> Shout out members who earned points that week — event wins, streaks, contests — and explain the upcoming House challenge or events.
                  </span>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">Example</h2>
        <div className="mt-4 space-y-4 text-sm text-foreground/85 leading-relaxed">
          <p>
            This week’s schedule is STACKED — the insanely anticipated Minecraft server launches TODAY @7:30 PM!!!!! Be ready to get cooked by me (gonna be off OP) @Minecraft Java. 😈 Tomorrow we’ve got our music @Hangout event WHERE WE build out @Jonathon’s dope idea from last week: a server-wide NGM playlist 🎧🫡 Day after I’ll be streaming Chained Together w @Spencer and finally joining a brrrr on @Fortnite — our usual Thursday shenanigans, but bumped to @4 PM this week. LET’S GOOO ‼️‼️
            <br />
            <br />
            https://discord.com/events/720659736990842880/1503430614748106982
            <br />
            https://discord.com/events/720659736990842880/1503431680629674117
            <br />
            https://discord.com/events/720659736990842880/1503463765474017442
            <br />
            https://discord.com/events/720659736990842880/1503463765474017442
            <br />
            https://discord.com/events/720659736990842880/1503080811610771566{" "}
          </p>
          <p>
            @House of Empathy @House of Equity crushing it atp 🤯📸 But just imagine @House of Curiosity pulls a Knicks game 4 to take the month 🫣
            <br />
            <br />
            This week’s challenge should be a good fit for those of you graduating this week… @Grade 8 @Grade 9 @Grade 12 Get a photo of you celebrating a win 🥇 It can be anything from a grad ceremony to a @Fortnite dub, it’s up to you!!
          </p>
        </div>
      </section>

      <div className="mt-8 rounded-lg border-l-4 border-[#5865F2] bg-card px-4 py-3 text-sm">
        From the data: events posted ahead of time pull way more than spontaneous ones.
      </div>
    </div>
  );
}
