import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import {
  seedCardsByKey,
  seedLinksByKey,
  cardKey,
  linkKey,
  CARD_COMPARE_FIELDS,
  LINK_COMPARE_FIELDS,
  type SeedCard,
  type SeedLink,
} from "@/data/seed-content";
import {
  getBaseValue,
  INTRO_NODE,
  CLOSEOUT_NODE,
  type WizardTool,
} from "@/lib/wizard-overrides";
import type { WizardData } from "@/components/Wizard";
import confidentiality from "@/data/confidentiality.json";
import criticalIncident from "@/data/critical-incident.json";
import conflict from "@/data/conflict.json";
import reporting from "@/data/reporting.json";
import type { Card as CardRow, LinkRow } from "@/lib/content";

export const Route = createFileRoute("/admin/content-changes")({
  component: ContentChangesPage,
  head: () => ({
    meta: [{ title: "Content changes — NGM Alliance Mod Resources" }],
  }),
});

const wizardBase: Record<WizardTool, WizardData> = {
  confidentiality: confidentiality as WizardData,
  "critical-incident": criticalIncident as WizardData,
  conflict: conflict as WizardData,
  reporting: reporting as WizardData,
};

const toolLabel: Record<WizardTool, string> = {
  confidentiality: "Confidentiality Tool",
  "critical-incident": "Critical Incident Tool",
  conflict: "Conflict Resolution Tool",
  reporting: "Reporting Hierarchy Tool",
};

type ProfileMap = Map<string, string>;

function useProfileMap() {
  return useQuery({
    queryKey: ["profiles-min"],
    queryFn: async (): Promise<ProfileMap> => {
      const { data, error } = await supabase.from("profiles").select("id, email");
      if (error) throw error;
      const m: ProfileMap = new Map();
      for (const p of data ?? []) m.set(p.id, p.email);
      return m;
    },
  });
}

function useAllOverrides() {
  return useQuery({
    queryKey: ["wizard_overrides", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wizard_overrides")
        .select("id, tool, node_id, field_path, value, updated_by, updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

function useAllCards() {
  return useQuery({
    queryKey: ["cards", "all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("cards").select("*");
      if (error) throw error;
      return data as CardRow[];
    },
  });
}

function useAllLinks() {
  return useQuery({
    queryKey: ["links", "all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("links").select("*");
      if (error) throw error;
      return data as LinkRow[];
    },
  });
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function fmtValue(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return String(v);
}

function ContentChangesPage() {
  const { isAdmin, loading, accountRole } = useAuth();

  if (loading || accountRole === null) {
    return <div className="mx-auto max-w-4xl px-4 py-8 text-muted-foreground">Loading…</div>;
  }
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="font-display text-2xl font-bold">Admins only</h1>
        <p className="mt-2 text-foreground/80">
          You need an admin account to view content changes.{" "}
          <Link to="/" className="text-primary underline">Go home →</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        Content changes
      </h1>
      <p className="mt-2 max-w-2xl text-foreground/80">
        Everything on the live site that differs from what ships in the code — wizard
        wording overrides, and cards or links that have been edited or added. Reset
        any row to hand control back to the code value.
      </p>

      <WizardChangesSection />
      <CardChangesSection />
      <LinkChangesSection />
    </div>
  );
}

/* ---------- Wizard overrides ---------- */

function WizardChangesSection() {
  const overrides = useAllOverrides();
  const profiles = useProfileMap();
  const qc = useQueryClient();

  const reset = useMutation({
    mutationFn: async ({
      tool,
      nodeId,
      fieldPath,
    }: {
      tool: WizardTool;
      nodeId: string;
      fieldPath: string;
    }) => {
      const { error } = await supabase
        .from("wizard_overrides")
        .delete()
        .eq("tool", tool)
        .eq("node_id", nodeId)
        .eq("field_path", fieldPath);
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["wizard_overrides", "all"] });
      qc.invalidateQueries({ queryKey: ["wizard_overrides", vars.tool] });
      toast.success("Reset to code default");
    },
    onError: (e) =>
      toast.error(e instanceof Error ? e.message : "Reset failed"),
  });

  const rows = useMemo(() => {
    return (overrides.data ?? []).map((o) => {
      const base = wizardBase[o.tool as WizardTool];
      const original = base ? getBaseValue(base, o.node_id, o.field_path) : undefined;
      return { ...o, original };
    });
  }, [overrides.data]);

  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold">Wizard wording overrides</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Text edits applied on top of the tool JSON at render time.
      </p>
      <TableShell
        loading={overrides.isLoading}
        empty={rows.length === 0}
        emptyText="No wizard wording overrides — the site matches the code."
        headers={["Tool", "Field", "Original (code)", "Current (live)", "Changed by", "When", ""]}
      >
        {rows.map((r) => (
          <tr key={r.id} className="border-t border-border align-top">
            <td className="px-4 py-3">{toolLabel[r.tool as WizardTool]}</td>
            <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
              {prettyNode(r.node_id)}
              <br />
              {r.field_path}
            </td>
            <td className="px-4 py-3 whitespace-pre-wrap text-foreground/80 max-w-xs">
              {r.original ?? "—"}
            </td>
            <td className="px-4 py-3 whitespace-pre-wrap max-w-xs">{r.value}</td>
            <td className="px-4 py-3 text-muted-foreground">
              {(r.updated_by && profiles.data?.get(r.updated_by)) ?? "—"}
            </td>
            <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
              {fmtDate(r.updated_at)}
            </td>
            <td className="px-4 py-3 text-right">
              <button
                onClick={() =>
                  reset.mutate({
                    tool: r.tool as WizardTool,
                    nodeId: r.node_id,
                    fieldPath: r.field_path,
                  })
                }
                className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                Reset to default
              </button>
            </td>
          </tr>
        ))}
      </TableShell>
    </section>
  );
}

function prettyNode(nodeId: string) {
  if (nodeId === INTRO_NODE) return "intro";
  if (nodeId === CLOSEOUT_NODE) return "closeout";
  return nodeId;
}

/* ---------- Cards ---------- */

type CardDiff = {
  row: CardRow;
  seed: SeedCard | undefined;
  diffs: { field: string; original: unknown; current: unknown }[];
  isNew: boolean;
};

function diffCards(rows: CardRow[]): CardDiff[] {
  const out: CardDiff[] = [];
  for (const row of rows) {
    const seed = seedCardsByKey.get(cardKey(row));
    if (!seed) {
      out.push({ row, seed: undefined, diffs: [], isNew: true });
      continue;
    }
    const diffs: CardDiff["diffs"] = [];
    for (const f of CARD_COMPARE_FIELDS) {
      const a = (row as unknown as Record<string, unknown>)[f];
      const b = (seed as unknown as Record<string, unknown>)[f];
      const aa = a === null || a === undefined ? null : a;
      const bb = b === null || b === undefined ? null : b;
      if (aa !== bb) diffs.push({ field: f, original: bb, current: aa });
    }
    if (diffs.length > 0) out.push({ row, seed, diffs, isNew: false });
  }
  return out;
}

function CardChangesSection() {
  const cards = useAllCards();
  const profiles = useProfileMap();
  const qc = useQueryClient();

  const changes = useMemo(() => diffCards(cards.data ?? []), [cards.data]);

  const resetCard = useMutation({
    mutationFn: async ({ row, seed }: { row: CardRow; seed: SeedCard }) => {
      const patch: Record<string, unknown> = {};
      for (const f of CARD_COMPARE_FIELDS) {
        patch[f] = (seed as unknown as Record<string, unknown>)[f];
      }
      const { error } = await supabase.from("cards").update(patch as never).eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cards"] });
      toast.success("Card reset to code default");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Reset failed"),
  });

  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-bold">Cards</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Cards on Decide, Reference, and How-to whose live values differ from the code
        seed — plus any cards added on top.
      </p>
      <TableShell
        loading={cards.isLoading}
        empty={changes.length === 0}
        emptyText="No card drift — the site matches the code."
        headers={["Page", "Card", "Field", "Original (code)", "Current (live)", "Created by", "Updated", ""]}
      >
        {changes.flatMap((c) => {
          if (c.isNew) {
            return [
              <tr key={c.row.id} className="border-t border-border align-top">
                <td className="px-4 py-3">{c.row.page}</td>
                <td className="px-4 py-3 max-w-xs">
                  <div className="font-medium">{c.row.title}</div>
                  <div className="text-xs text-muted-foreground">Added — not in code seed</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground" colSpan={3}>
                  New card (no code baseline to reset to)
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {(c.row.created_by && profiles.data?.get(c.row.created_by)) ?? "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                  {fmtDate(c.row.updated_at)}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground text-sm">—</td>
              </tr>,
            ];
          }
          return c.diffs.map((d, i) => (
            <tr key={`${c.row.id}-${d.field}`} className="border-t border-border align-top">
              {i === 0 && (
                <>
                  <td className="px-4 py-3" rowSpan={c.diffs.length}>
                    {c.row.page}
                  </td>
                  <td className="px-4 py-3 max-w-xs" rowSpan={c.diffs.length}>
                    <div className="font-medium">{c.row.title}</div>
                  </td>
                </>
              )}
              <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{d.field}</td>
              <td className="px-4 py-3 whitespace-pre-wrap text-foreground/80 max-w-xs">
                {fmtValue(d.original)}
              </td>
              <td className="px-4 py-3 whitespace-pre-wrap max-w-xs">{fmtValue(d.current)}</td>
              {i === 0 && (
                <>
                  <td className="px-4 py-3 text-muted-foreground" rowSpan={c.diffs.length}>
                    {(c.row.created_by && profiles.data?.get(c.row.created_by)) ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap" rowSpan={c.diffs.length}>
                    {fmtDate(c.row.updated_at)}
                  </td>
                  <td className="px-4 py-3 text-right" rowSpan={c.diffs.length}>
                    <button
                      onClick={() => c.seed && resetCard.mutate({ row: c.row, seed: c.seed })}
                      className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
                    >
                      Reset to default
                    </button>
                  </td>
                </>
              )}
            </tr>
          ));
        })}
      </TableShell>
    </section>
  );
}

/* ---------- Links ---------- */

type LinkDiff = {
  row: LinkRow;
  seed: SeedLink | undefined;
  diffs: { field: string; original: unknown; current: unknown }[];
  isNew: boolean;
};

function diffLinks(rows: LinkRow[]): LinkDiff[] {
  const out: LinkDiff[] = [];
  for (const row of rows) {
    const seed = seedLinksByKey.get(linkKey(row));
    if (!seed) {
      out.push({ row, seed: undefined, diffs: [], isNew: true });
      continue;
    }
    const diffs: LinkDiff["diffs"] = [];
    for (const f of LINK_COMPARE_FIELDS) {
      const a = (row as unknown as Record<string, unknown>)[f];
      const b = (seed as unknown as Record<string, unknown>)[f];
      const aa = a === null || a === undefined ? null : a;
      const bb = b === null || b === undefined ? null : b;
      if (aa !== bb) diffs.push({ field: f, original: bb, current: aa });
    }
    if (diffs.length > 0) out.push({ row, seed, diffs, isNew: false });
  }
  return out;
}

function LinkChangesSection() {
  const links = useAllLinks();
  const profiles = useProfileMap();
  const qc = useQueryClient();

  const changes = useMemo(() => diffLinks(links.data ?? []), [links.data]);

  const resetLink = useMutation({
    mutationFn: async ({ row, seed }: { row: LinkRow; seed: SeedLink }) => {
      const patch: Record<string, unknown> = {};
      for (const f of LINK_COMPARE_FIELDS) {
        patch[f] = (seed as unknown as Record<string, unknown>)[f];
      }
      const { error } = await supabase.from("links").update(patch).eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["links"] });
      toast.success("Link reset to code default");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Reset failed"),
  });

  return (
    <section className="mt-12 mb-16">
      <h2 className="font-display text-xl font-bold">Common Links</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Links whose live values differ from the code seed — plus any links added on top.
      </p>
      <TableShell
        loading={links.isLoading}
        empty={changes.length === 0}
        emptyText="No link drift — the site matches the code."
        headers={["Group", "Link", "Field", "Original (code)", "Current (live)", "Created by", "Updated", ""]}
      >
        {changes.flatMap((c) => {
          if (c.isNew) {
            return [
              <tr key={c.row.id} className="border-t border-border align-top">
                <td className="px-4 py-3">{c.row.group}</td>
                <td className="px-4 py-3 max-w-xs">
                  <div className="font-medium">{c.row.name}</div>
                  <div className="text-xs text-muted-foreground">Added — not in code seed</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground" colSpan={3}>
                  New link (no code baseline to reset to)
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {(c.row.created_by && profiles.data?.get(c.row.created_by)) ?? "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                  {fmtDate(c.row.updated_at)}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground text-sm">—</td>
              </tr>,
            ];
          }
          return c.diffs.map((d, i) => (
            <tr key={`${c.row.id}-${d.field}`} className="border-t border-border align-top">
              {i === 0 && (
                <>
                  <td className="px-4 py-3" rowSpan={c.diffs.length}>
                    {c.row.group}
                  </td>
                  <td className="px-4 py-3 max-w-xs" rowSpan={c.diffs.length}>
                    <div className="font-medium">{c.row.name}</div>
                  </td>
                </>
              )}
              <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{d.field}</td>
              <td className="px-4 py-3 whitespace-pre-wrap text-foreground/80 max-w-xs">
                {fmtValue(d.original)}
              </td>
              <td className="px-4 py-3 whitespace-pre-wrap max-w-xs">{fmtValue(d.current)}</td>
              {i === 0 && (
                <>
                  <td className="px-4 py-3 text-muted-foreground" rowSpan={c.diffs.length}>
                    {(c.row.created_by && profiles.data?.get(c.row.created_by)) ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap" rowSpan={c.diffs.length}>
                    {fmtDate(c.row.updated_at)}
                  </td>
                  <td className="px-4 py-3 text-right" rowSpan={c.diffs.length}>
                    <button
                      onClick={() => c.seed && resetLink.mutate({ row: c.row, seed: c.seed })}
                      className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
                    >
                      Reset to default
                    </button>
                  </td>
                </>
              )}
            </tr>
          ));
        })}
      </TableShell>
    </section>
  );
}

/* ---------- Shared table shell ---------- */

function TableShell({
  headers,
  loading,
  empty,
  emptyText,
  children,
}: {
  headers: string[];
  loading?: boolean;
  empty?: boolean;
  emptyText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 rounded-lg border border-border bg-surface overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-card text-left">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={headers.length} className="px-4 py-6 text-center text-muted-foreground">
                Loading…
              </td>
            </tr>
          )}
          {!loading && empty && (
            <tr>
              <td colSpan={headers.length} className="px-4 py-6 text-center text-muted-foreground">
                {emptyText}
              </td>
            </tr>
          )}
          {!loading && !empty && children}
        </tbody>
      </table>
    </div>
  );
}
