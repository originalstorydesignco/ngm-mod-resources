import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import bots from "@/data/reference/bots.json";
import { CopyChip } from "@/components/CopyChip";
import { PastePlaceholder } from "@/components/PastePlaceholder";

export const Route = createFileRoute("/reference/bots")({
  head: () => ({
    meta: [
      { title: "Bots & commands — NGMA Staff Hub" },
      { name: "description", content: "Slash commands for MEE6, NGM Bot, Houses, and onboarding automations." },
    ],
  }),
  component: BotsPage,
});

type Cmd = { cmd: string; desc?: string };
type Group = { title: string; commands?: Cmd[]; pasteSlot?: string };

function BotsPage() {
  const [q, setQ] = useState("");
  const groups = bots.groups as Group[];

  const filtered = useMemo(() => {
    if (!q.trim()) return groups;
    const needle = q.toLowerCase();
    return groups
      .map((g) => {
        const commands = (g.commands ?? []).filter(
          (c) => c.cmd.toLowerCase().includes(needle) || (c.desc ?? "").toLowerCase().includes(needle),
        );
        const titleHit = g.title.toLowerCase().includes(needle);
        if (titleHit) return g;
        if (commands.length === 0) return null;
        return { ...g, commands, pasteSlot: undefined };
      })
      .filter((g): g is Group => g !== null);
  }, [q, groups]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Bots &amp; commands</h1>
      <p className="mt-2 text-muted-foreground">Tap a chip to copy.</p>

      <div className="mt-6">
        <label htmlFor="bots-search" className="sr-only">Filter commands</label>
        <input
          id="bots-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="filter commands…"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      <div className="mt-8 space-y-8">
        {filtered.map((g) => (
          <section key={g.title}>
            <h2 className="font-display text-xl font-semibold">{g.title}</h2>
            {g.commands && g.commands.length > 0 && (
              <ul className="mt-3 space-y-2">
                {g.commands.map((c) => (
                  <li key={c.cmd} className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-card px-3 py-2">
                    <CopyChip text={c.cmd} />
                    {c.desc && <span className="text-sm text-foreground/80">{c.desc}</span>}
                  </li>
                ))}
              </ul>
            )}
            {g.pasteSlot && <PastePlaceholder slot={g.pasteSlot} />}
          </section>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No matches.</p>}
      </div>
    </div>
  );
}
