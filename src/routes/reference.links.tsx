import { createFileRoute } from "@tanstack/react-router";
import links from "@/data/reference/links.json";
import { PastePlaceholder } from "@/components/PastePlaceholder";

export const Route = createFileRoute("/reference/links")({
  head: () => ({
    meta: [
      { title: "Key links & Who-to-call — NGMA Staff Hub" },
      { name: "description", content: "Forms, invites, and the vetted crisis-line table. Always confirm before relying on it." },
    ],
  }),
  component: LinksPage,
});

type Entry = { label: string; tel?: string; display?: string; href?: string; note?: string };
type Section = { title: string; lead?: string; entries?: Entry[]; groups?: { region: string; entries: Entry[] }[] };

function EntryLine({ e }: { e: Entry }) {
  return (
    <li className="flex flex-wrap items-baseline gap-x-2 gap-y-1 py-1">
      <span className="font-medium">{e.label}:</span>
      {e.href && (
        <a href={e.href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
          {e.href}
        </a>
      )}
      {e.tel && (
        <a href={`tel:${e.tel.replace(/[^0-9+]/g, "")}`} className="text-primary underline underline-offset-2">
          {e.display ?? e.tel}
        </a>
      )}
      {!e.tel && !e.href && e.note && <span className="text-foreground/85">{e.note}</span>}
      {(e.tel || e.href) && e.note && <span className="text-foreground/70">({e.note})</span>}
    </li>
  );
}

function LinksPage() {
  const keyLinks = links.keyLinks as { label: string; href?: string; pasteSlot?: string }[];
  const sections = links.sections as Section[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 print-page">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Key links + Who-to-call</h1>

      <section className="mt-8 print-hide">
        <h2 className="font-display text-xl font-semibold">Key links</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {keyLinks.map((k) =>
            k.href ? (
              <a
                key={k.label}
                href={k.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center h-10 px-3 rounded-md border border-border bg-surface text-sm hover:border-primary"
              >
                {k.label} ↗
              </a>
            ) : (
              <div key={k.label} className="inline-flex items-center gap-2 rounded-md border border-dashed border-accent bg-accent/10 px-3 h-10 text-sm">
                <span>{k.label}:</span>
                <span className="font-mono text-xs uppercase tracking-wide text-accent">[PASTE: {k.pasteSlot}]</span>
              </div>
            ),
          )}
        </div>
      </section>

      <hr className="my-10 border-border print-hide" />

      <section>
        <div className="rounded-md border-2 border-dashed border-mod bg-mod px-4 py-3 text-sm text-mod-foreground">
          <strong>Last verified:</strong>{" "}
          <span className="font-mono text-xs uppercase tracking-wide">[PASTE: date]</span>{" "}
          by <span className="font-mono text-xs uppercase tracking-wide">[PASTE: name]</span>.
          #help-resources is our vetted source of truth for crisis lines — keep this table in sync with it.
        </div>

        <p className="mt-4 text-sm">
          <strong>Critical-incident lead:</strong> Manager of Youth Programs. <strong>Backup:</strong> COO. Contact info is pinned in #admin-chat.
        </p>

        <div className="mt-6 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              {s.lead && <p className="mt-1 text-sm text-foreground/80">{s.lead}</p>}
              {s.entries && (
                <ul className="mt-2">
                  {s.entries.map((e, i) => <EntryLine key={i} e={e} />)}
                </ul>
              )}
              {s.groups && (
                <div className="mt-2 space-y-3">
                  {s.groups.map((g) => (
                    <div key={g.region}>
                      <p className="text-sm font-semibold text-foreground/85">{g.region}</p>
                      <ul>{g.entries.map((e, i) => <EntryLine key={i} e={e} />)}</ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Confirm and localize every number before relying on this table — see #help-resources.
        </p>
      </section>
    </div>
  );
}
