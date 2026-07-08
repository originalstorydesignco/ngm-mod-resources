import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/reference/$")({
  component: () => <Placeholder title="Reference" kind="Reference" />,
});
