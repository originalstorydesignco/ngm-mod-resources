import { createFileRoute, Link } from "@tanstack/react-router";
import { Checklist, FacilitatorsBadge } from "@/components/Checklist";

export const Route = createFileRoute("/how-to/events")({
  head: () => ({
    meta: [
      { title: "How to host an event — NGMA Staff Hub" },
      { name: "description", content: "From pick-what-and-when to Houses points." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const items = [
    {
      id: "s1",
      label: (
        <span>
          <strong>Pick what + when.</strong> Grab something from the Event Menu (
          <Link to="/how-to/event-menu" className="text-primary underline underline-offset-2">Event Menu →</Link>
          ) or a member suggestion (!suggest / !event).
        </span>
      ),
    },
    {
      id: "s2",
      label: (
        <span>
          <strong>Create the event.</strong> Let people know when, what, and which VC you’re hosting in. Check you’re not colliding with another Facilitator in the same VC, and avoid overlapping times as much as possible. Add a funny photo to entice people in + a short message on what you’re hosting and why they should come. Have your event up by 5pm Monday so it can make the event board.
          <span className="mt-2 block rounded-md bg-accent/15 border border-accent/40 px-3 py-2 text-sm">
            🌍 <strong>A note on timing:</strong> our youth are spread across North America — that’s a lot of time zones to juggle. Quick gut-checks before you lock a time: are you landing after school across all those zones? Is it summer, where daytime works? Is it a holiday — and remember that breaks aren’t universal, so school start/end, summer, and days off vary between our @canada and @usa members (and even state to state / province to province). When in doubt, aim for the window that catches the most people.
          </span>
        </span>
      ),
    },
    { id: "s3", label: <span><strong>Block it in your calendar.</strong> Add it to your NGM Google Calendar so it’s locked in 📅</span> },
    { id: "s4", label: <span><strong>Hype it uppppppp 📣</strong> DMing young people with the @role for that game/interest — or messaging newcomers and members who haven’t been online in a while — is a great way to pull more people in. Use the NGM Bot command /advanced-search to look up specific groups of kids by role, and DM them straight from there with the event link.</span> },
    { id: "s5", label: <span><strong>Run it.</strong> Host in the right VC/channel. The Code of Conduct still applies at events.</span> },
    {
      id: "s6",
      label: (
        <span>
          <strong>Log attendance.</strong> Fill the tracker after —{" "}
          <a href="https://nextgenmen.ca/alliance/attendance" target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">Event Attendance Form →</a>
          {" "}— then react ✅ once you’ve done it!
        </span>
      ),
    },
    { id: "s7", label: <span><strong>Houses points (if it’s a Houses event).</strong> /houses input_placements (1st/2nd/3rd) or /houses participation.</span> },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">How to host an event</h1>
      <div className="mt-3"><FacilitatorsBadge /></div>
      <p className="mt-4 text-foreground/85">Events = how we keep the community alive so it can THRIVE. The flow 👇</p>
      <div className="mt-6">
        <Checklist items={items} />
      </div>
      <div className="mt-8 rounded-md bg-accent/15 border border-accent/40 px-4 py-3 text-sm">
        💡 If anything comes up in VC that feels like a fit for 🚩 flags-log, you can always head there. If something happens, that’s what it’s for.
      </div>
    </div>
  );
}
