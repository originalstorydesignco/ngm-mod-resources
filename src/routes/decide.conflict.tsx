import { createFileRoute } from "@tanstack/react-router";
import { Wizard, type WizardData } from "@/components/Wizard";
import data from "@/data/conflict.json";

export const Route = createFileRoute("/decide/conflict")({
  head: () => ({
    meta: [
      { title: "Someone broke the Code of Conduct — NGM Alliance Mod Resources" },
      { name: "description", content: "Decision tool for Code of Conduct issues and conflict between members." },
    ],
  }),
  component: () => <Wizard data={data as WizardData} />,
});
