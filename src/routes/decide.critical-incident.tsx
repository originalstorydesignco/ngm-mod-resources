import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/decide/critical-incident")({
  component: () => <Placeholder title="Critical incident" kind="Decision tool" />,
});
