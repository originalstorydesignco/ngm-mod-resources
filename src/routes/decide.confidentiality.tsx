import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/decide/confidentiality")({
  component: () => <Placeholder title="Confidentiality" kind="Decision tool" />,
});
