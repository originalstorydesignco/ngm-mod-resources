import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/how-to/$")({
  component: () => <Placeholder title="How-to guides" kind="How-to" />,
});
