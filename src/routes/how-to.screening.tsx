import { createFileRoute } from "@tanstack/react-router";
import { Checklist, FacilitatorsBadge } from "@/components/Checklist";
import { PastePlaceholder } from "@/components/PastePlaceholder";

export const Route = createFileRoute("/how-to/screening")({
  head: () => ({
    meta: [
      { title: "Screening & onboarding — NGMA Staff Hub" },
      { name: "description", content: "The 15-step onboarding check every new member goes through." },
    ],
  }),
  component: ScreeningPage,
});

function ScreeningPage() {
  const steps = Array.from({ length: 15 }, (_, i) => {
    const n = i + 1;
    // Highlight sub-box at the intro-writing step (step 8, illustrative).
    if (n === 8) {
      return {
        id: `s${n}`,
        label: (
          <span>
            <PastePlaceholder slot={`onboarding step ${n} (write the intro message)`} />
            <span className="mt-2 block rounded-md border border-primary/60 bg-primary/10 px-3 py-2">
              <PastePlaceholder slot="the example intro message" />
            </span>
          </span>
        ),
      };
    }
    return { id: `s${n}`, label: <PastePlaceholder slot={`onboarding step ${n}`} /> };
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Screening &amp; onboarding</h1>
      <div className="mt-3"><FacilitatorsBadge /></div>
      <p className="mt-4 text-foreground/85">
        Every new member goes through the same 15 steps — consistency is the safeguard.
      </p>

      <div className="mt-6">
        <PastePlaceholder slot="the 15 onboarding steps, in order — daily Pending check through ✅ status + /set-user-birthday" />
        <div className="mt-4"><Checklist items={steps} /></div>
      </div>
    </div>
  );
}
