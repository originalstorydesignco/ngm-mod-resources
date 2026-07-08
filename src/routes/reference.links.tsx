import { createFileRoute } from "@tanstack/react-router";
import links from "@/data/reference/links.json";

export const Route = createFileRoute("/reference/links")({
  head: () => ({
    meta: [
      { title: "Key links — NGMA Staff Hub" },
      { name: "description", content: "Every link you reach for as NGMA staff — invites, registration and release forms, and reporting forms — in one place." },
    ],
  }),
  component: LinksPage,
});

function LinksPage() {
  const keyLinks = links.keyLinks as { label: string; href: string }[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Key links</h1>
      <p className="mt-3 text-foreground/85">
        Every link you reach for as NGMA staff — invites, registration and release forms, and reporting forms — in one place. All of these open outside the portal.
      </p>

      <ul className="mt-8 space-y-2">
        {keyLinks.map((k) => (
          <li key={k.href}>
            <a
              href={k.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm hover:border-primary hover:text-primary transition-colors"
            >
              <span className="font-medium">{k.label}</span>
              <span aria-hidden className="text-muted-foreground">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
