import { createFileRoute } from "@tanstack/react-router";
import { Checklist, FacilitatorsBadge } from "@/components/Checklist";
import { PastePlaceholder } from "@/components/PastePlaceholder";

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
      <p className="mt-4 text-foreground/85">NGMA Coordinator, Mondays after 5pm.</p>

      <div className="mt-6">
        <Checklist
          items={[
            { id: "s1", label: "Confirm all of the week’s events are created." },
            { id: "s2", label: "Review the week." },
            { id: "s3", label: "Write the hype — tag Facilitators, game roles, and specific members." },
            { id: "s4", label: "Paste every event link at the bottom of the post." },
          ]}
        />
      </div>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Example</h2>
        <div className="mt-2 rounded-md border border-border bg-card p-4">
          <PastePlaceholder slot="one example event-board message" />
        </div>
      </section>
    </div>
  );
}
