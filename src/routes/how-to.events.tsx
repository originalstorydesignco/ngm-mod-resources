import { createFileRoute } from "@tanstack/react-router";
import { Checklist, FacilitatorsBadge } from "@/components/Checklist";
import { PastePlaceholder } from "@/components/PastePlaceholder";

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
  const labels = [
    "pick what + when",
    "step 2",
    "schedule",
    "step 4",
    "step 5",
    "step 6",
    "Houses points",
  ];

  const items = labels.map((label, i) => {
    const id = `s${i + 1}`;
    const node = <PastePlaceholder slot={`event step ${i + 1} — ${label}`} />;
    if (i === 2) {
      // Callout after the scheduling step
      return {
        id,
        label: (
          <span>
            {node}
            <span className="mt-2 block rounded-md bg-accent/15 border border-accent/40 px-3 py-2 text-sm">
              <strong className="font-semibold">Time-zone gut-check:</strong> we span at least four time zones — sanity-check the start time against the members you’re hoping will come.
            </span>
          </span>
        ),
      };
    }
    return { id, label: node };
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">How to host an event</h1>
      <div className="mt-3"><FacilitatorsBadge /></div>
      <div className="mt-6">
        <PastePlaceholder slot="the 7 steps — pick what + when through Houses points" />
        <div className="mt-4"><Checklist items={items} /></div>
      </div>
    </div>
  );
}
