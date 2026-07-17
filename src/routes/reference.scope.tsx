import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import scope from "@/data/reference/scope.json";
import { Expandable } from "@/components/Expandable";

export const Route = createFileRoute("/reference/scope")({
  head: () => ({
    meta: [
      { title: "Scope of Practice — NGM Alliance Mod Resources" },
      { name: "description", content: "Is this mine to do? What’s in our wheelhouse and what belongs to someone else." },
    ],
  }),
  component: ScopePage,
});

type Role = "everyone" | "facilitators";
type Item = { role: Role; text: string; keywords: string[] };
type Group = { who: string; items: string[]; note?: string; keywords: string[] };

function match(q: string, haystack: string[]) {
  if (!q.trim()) return true;
  const needle = q.toLowerCase().trim();
  return haystack.some((h) => h.toLowerCase().includes(needle));
}

function RoleBadge({ role }: { role: Role }) {
  if (role === "facilitators") {
    return (
      <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
        Facilitators only
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-surface border border-border text-foreground/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
      Everyone
    </span>
  );
}

function ScopePage() {
  const [q, setQ] = useState("");
  const items = scope.inScope.items as Item[];
  const groups = scope.outOfScope.groups as Group[];

  const filteredItems = useMemo(
    () => items.filter((it) => match(q, [it.text, ...it.keywords])),
    [q, items],
  );
  const everyone = filteredItems.filter((i) => i.role === "everyone");
  const facilitators = filteredItems.filter((i) => i.role === "facilitators");

  const filteredGroups = useMemo(
    () =>
      groups
        .map((g) => {
          const matchesItems = g.items.filter((line) => match(q, [line, ...g.keywords]));
          const groupMatches = match(q, [g.who, ...g.keywords, ...(g.note ? [g.note] : [])]);
          if (!q.trim()) return { ...g, shown: g.items, autoOpen: false };
          if (matchesItems.length === 0 && !groupMatches) return null;
          return { ...g, shown: groupMatches ? g.items : matchesItems, autoOpen: true };
        })
        .filter((g): g is Group & { shown: string[]; autoOpen: boolean } => g !== null),
    [q, groups],
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        Is this mine to do?
      </h1>
      <p className="mt-3 text-foreground/85">
        What’s in the wheelhouse of NGM Alliance staff — and what belongs to a therapist, a parent, a doctor, or a lawyer instead. Search it by keyword: drive, gift, referral, suicide.
      </p>

      <div className="mt-6">
        <label htmlFor="scope-search" className="sr-only">Search scope items</label>
        <input
          id="scope-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="try: drive, gifts, referral, suicide…"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">{scope.outOfScope.title}</h2>
        <div className="mt-4 space-y-3">
          {filteredGroups.length === 0 && (
            <p className="text-sm text-muted-foreground">No matches.</p>
          )}
          {filteredGroups.map((g, i) => (
            <Expandable
              key={i}
              label={g.who}
              open={q.trim() ? g.autoOpen : undefined}
            >
              <ul className="list-disc pl-5 space-y-1">
                {g.shown.map((line, j) => (
                  <li key={j}>{line}</li>
                ))}
              </ul>
              {g.note && (
                <p className="mt-3 text-sm text-foreground/80 border-l-2 border-accent pl-3">
                  {g.note}
                </p>
              )}
            </Expandable>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">{scope.inScope.title}</h2>

        <ul className="mt-4 space-y-2">
          {everyone.length === 0 && <li className="text-sm text-muted-foreground">No matches.</li>}
          {everyone.map((it, i) => (
            <li key={`e-${i}`} className="flex items-start gap-3 rounded-md border border-border bg-card px-3 py-2">
              <RoleBadge role={it.role} />
              <span className="text-sm leading-relaxed">{it.text}</span>
            </li>
          ))}
        </ul>

        {facilitators.length > 0 && (
          <>
            <ul className="mt-6 space-y-2">
              {facilitators.map((it, i) => (
                <li key={`f-${i}`} className="flex items-start gap-3 rounded-md border border-border bg-card px-3 py-2">
                  <RoleBadge role={it.role} />
                  <span className="text-sm leading-relaxed">{it.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Moderators: these are escalate-and-hand-off items — ping @Facilitators.
            </p>
          </>
        )}
      </section>


      <div className="mt-10 rounded-lg border-l-4 border-accent bg-card px-4 py-3 text-sm">
        We don’t diagnose, prescribe, do therapy, give legal advice, or make a youth’s personal-life decisions. When in doubt, escalate to a Facilitator — we’re happy to help.
      </div>
    </div>
  );
}
