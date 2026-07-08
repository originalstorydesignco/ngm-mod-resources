import { createFileRoute } from "@tanstack/react-router";
import { Wizard, type WizardData } from "@/components/Wizard";
import data from "@/data/confidentiality.json";

export const Route = createFileRoute("/decide/confidentiality")({
  head: () => ({
    meta: [
      { title: "Do I keep it private or report it? — NGMA Staff Hub" },
      { name: "description", content: "Decision tool for confidentiality vs reporting a youth disclosure." },
    ],
  }),
  component: () => <Wizard data={data as WizardData} />,
});
