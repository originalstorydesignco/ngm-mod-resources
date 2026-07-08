import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/decide/conflict")({
  component: () => <Placeholder title="Conflict" kind="Decision tool" />,
});
