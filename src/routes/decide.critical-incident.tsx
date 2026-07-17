import { createFileRoute } from "@tanstack/react-router";
import { Wizard, type WizardData } from "@/components/Wizard";
import data from "@/data/critical-incident.json";

export const Route = createFileRoute("/decide/critical-incident")({
  head: () => ({
    meta: [
      { title: "Something serious is happening — NGM Alliance Mod Resources" },
      { name: "description", content: "Critical-incident decision tool for youth-program staff." },
    ],
  }),
  component: () => <Wizard data={data as WizardData} />,
});
