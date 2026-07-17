import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { useLinks, type LinkRow } from "@/lib/content";
import { LinkAddButton, LinkAdminActions } from "@/components/admin/LinkEditor";

export const Route = createFileRoute("/reference/links")({
  head: () => ({
    meta: [
      { title: "Common Links List — NGM Alliance Mod Resources" },
      { name: "description", content: "Every link you reach for as NGMA staff — invites, registration and release forms, and reporting forms — in one place." },
    ],
  }),
  component: LinksPage,
});

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

function LinkRowItem({ item, groups }: { item: LinkRow; groups: string[] }) {
  const { isAdmin } = useAuth();
  return (
    <li className="rounded-md border border-border bg-card px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="min-w-0 flex-1">
          <p className="font-medium">{item.name}</p>
          <p className="mt-0.5 text-xs font-mono text-muted-foreground break-all">
            {item.display_url ?? stripProtocol(item.url)}
          </p>
        </div>
        {item.context_label && (
          <span className="text-xs text-muted-foreground whitespace-nowrap">{item.context_label}</span>
        )}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => copy(item.url)}
            className="inline-flex items-center h-8 rounded-md border border-border bg-surface hover:border-primary px-3 text-xs font-medium transition-colors"
          >
            Copy
          </button>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center h-8 rounded-md border border-border bg-surface hover:border-primary hover:text-primary px-3 text-xs font-medium transition-colors"
          >
            Open ↗
          </a>
          {isAdmin && <LinkAdminActions link={item} groups={groups} />}
        </div>
      </div>
    </li>
  );
}

function LinksPage() {
  const { isAdmin } = useAuth();
  const { data: links = [], isLoading } = useLinks();

  const { groupOrder, byGroup } = useMemo(() => {
    const order: string[] = [];
    const map: Record<string, LinkRow[]> = {};
    for (const l of links) {
      if (!(l.group in map)) {
        map[l.group] = [];
        order.push(l.group);
      }
      map[l.group].push(l);
    }
    return { groupOrder: order, byGroup: map };
  }, [links]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Common Links List</h1>
        {isAdmin && <LinkAddButton groups={groupOrder} />}
      </div>
      <p className="mt-3 text-foreground/85">
        Every link you reach for as NGMA staff — invites, registration and release forms, and reporting forms — in one place. All of these open outside the portal.
      </p>

      {isLoading && links.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">Loading…</p>
      )}

      <div className="mt-8 space-y-8">
        {groupOrder.map((g) => (
          <section key={g}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xl font-semibold">{g}</h2>
              {isAdmin && <LinkAddButton group={g} groups={groupOrder} />}
            </div>
            <ul className="mt-3 space-y-2">
              {byGroup[g].map((l) => (
                <LinkRowItem key={l.id} item={l} groups={groupOrder} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
