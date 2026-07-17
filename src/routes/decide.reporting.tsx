import { createFileRoute } from "@tanstack/react-router";
import { Wizard, type WizardData } from "@/components/Wizard";
import reporting from "@/data/reporting.json";

export const Route = createFileRoute("/decide/reporting")({
  head: () => ({
    meta: [
      { title: "I’m not sure who to tell — NGM Alliance Mod Resources" },
      {
        name: "description",
        content: "Decision tool for reporting concerns about staff or safeguarding issues.",
      },
    ],
  }),
  component: ReportingPage,
});

function ReportingPage() {
  return <Wizard data={reporting as WizardData} />;
}
