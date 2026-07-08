import { createFileRoute } from "@tanstack/react-router";
import { Checklist, FacilitatorsBadge } from "@/components/Checklist";
import { PastePlaceholder } from "@/components/PastePlaceholder";

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
      <p className="mt-4 text-foreground/85">NGMA Coordinator, start of each month.</p>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">The menu</h2>
        <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
          <li>opening</li>
          <li>Statbot stats</li>
          <li>roster changes</li>
          <li>celebrations</li>
          <li>programs</li>
          <li>TL;DR</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Before you post</h2>
        <div className="mt-3">
          <Checklist
            items={[
              { id: "s1", label: "Role tags in place." },
              { id: "s2", label: "Every link works." },
              { id: "s3", label: "The TL;DR matches the body." },
            ]}
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Voice note</h2>
        <div className="mt-2"><PastePlaceholder slot="the voice/tone guidance for announcements" /></div>
      </section>
    </div>
  );
}
