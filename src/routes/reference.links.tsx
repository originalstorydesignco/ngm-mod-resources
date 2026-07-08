import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import links from "@/data/reference/links.json";

export const Route = createFileRoute("/reference/links")({
  head: () => ({
    meta: [
      { title: "Common Links List — NGMA Staff Hub" },
      { name: "description", content: "Every link you reach for as NGMA staff — invites, registration and release forms, and reporting forms — in one place." },
    ],
  }),
  component: LinksPage,
});

type LinkItem = { label: string; href: string; meta?: string; displayUrl?: string };
type Group = { heading: string; links: LinkItem[] };

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, "");
}

async function copy(url: string) {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Copied", { description: url });
  } catch {
    toast.error("Couldn’t copy");
  }
}

function LinkRow({ item }: { item: LinkItem }) {
  return (
    <li className="rounded-md border border-border bg-card px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="min-w-0 flex-1">
          <p className="font-medium">{item.label}</p>
          <p className="mt-0.5 text-xs font-mono text-muted-foreground break-all">
            {item.displayUrl ?? stripProtocol(item.href)}
          </p>
        </div>
        {item.meta && (
          <span className="text-xs text-muted-foreground whitespace-nowrap">{item.meta}</span>
        )}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => copy(item.href)}
            className="inline-flex items-center h-8 rounded-md border border-border bg-surface hover:border-primary px-3 text-xs font-medium transition-colors"
          >
            Copy
          </button>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center h-8 rounded-md border border-border bg-surface hover:border-primary hover:text-primary px-3 text-xs font-medium transition-colors"
          >
            Open ↗
          </a>
        </div>
      </div>
    </li>
  );
}

function LinksPage() {
  const groups = links.groups as Group[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Common Links List</h1>
      <p className="mt-3 text-foreground/85">
        Every link you reach for as NGMA staff — invites, registration and release forms, and reporting forms — in one place. All of these open outside the portal.
      </p>

      <div className="mt-8 space-y-8">
        {groups.map((g) => (
          <section key={g.heading}>
            <h2 className="font-display text-xl font-semibold">{g.heading}</h2>
            <ul className="mt-3 space-y-2">
              {g.links.map((l) => (
                <LinkRow key={l.href} item={l} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
