import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { WizardData } from "@/components/Wizard";

export type WizardTool =
  | "confidentiality"
  | "critical-incident"
  | "conflict"
  | "reporting";

export const INTRO_NODE = "__intro";
export const CLOSEOUT_NODE = "__closeout";

export type OverrideRow = {
  id: string;
  tool: WizardTool;
  node_id: string;
  field_path: string;
  value: string;
  updated_at: string;
};

const keyOf = (nodeId: string, fieldPath: string) => `${nodeId}::${fieldPath}`;

/** Map keyed by `${nodeId}::${fieldPath}` -> string value. */
export type OverridesMap = Map<string, string>;

export function useWizardOverrides(tool: WizardTool) {
  return useQuery({
    queryKey: ["wizard_overrides", tool],
    queryFn: async (): Promise<OverridesMap> => {
      const { data, error } = await supabase
        .from("wizard_overrides")
        .select("node_id, field_path, value")
        .eq("tool", tool);
      if (error) throw error;
      const map: OverridesMap = new Map();
      for (const row of data ?? []) {
        map.set(keyOf(row.node_id, row.field_path), row.value);
      }
      return map;
    },
  });
}

export function useWizardOverrideMutations(tool: WizardTool) {
  const qc = useQueryClient();
  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["wizard_overrides", tool] });

  const upsert = useMutation({
    mutationFn: async ({
      nodeId,
      fieldPath,
      value,
      userId,
    }: {
      nodeId: string;
      fieldPath: string;
      value: string;
      userId: string | undefined;
    }) => {
      const { error } = await supabase.from("wizard_overrides").upsert(
        {
          tool,
          node_id: nodeId,
          field_path: fieldPath,
          value,
          updated_by: userId ?? null,
        },
        { onConflict: "tool,node_id,field_path" },
      );
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async ({
      nodeId,
      fieldPath,
    }: {
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
    onSuccess: invalidate,
  });

  return { upsert, remove };
}

/** Deep-clone (structuredClone fallback) then apply text overrides in place. */
export function applyOverrides(
  base: WizardData,
  overrides: OverridesMap | undefined,
): WizardData {
  const data: WizardData =
    typeof structuredClone === "function"
      ? structuredClone(base)
      : (JSON.parse(JSON.stringify(base)) as WizardData);
  if (!overrides || overrides.size === 0) return data;

  const get = (nodeId: string, fieldPath: string) =>
    overrides.get(keyOf(nodeId, fieldPath));

  // Intro
  {
    const desc = get(INTRO_NODE, "description");
    if (desc !== undefined) data.intro.description = desc;
    if (data.intro.standingRules) {
      data.intro.standingRules = data.intro.standingRules.map((s, i) => {
        const v = get(INTRO_NODE, `standingRules.${i}`);
        return v ?? s;
      });
    }
  }

  // Closeout
  if (data.closeout) {
    const t = get(CLOSEOUT_NODE, "title");
    if (t !== undefined) data.closeout.title = t;
    data.closeout.steps = data.closeout.steps.map((s, i) => {
      const v = get(CLOSEOUT_NODE, `steps.${i}`);
      return v ?? s;
    });
  }

  // Nodes
  for (const [nodeId, node] of Object.entries(data.nodes) as [
    string,
    WizardData["nodes"][string],
  ][]) {
    if (node.type === "question") {
      const t = get(nodeId, "text");
      if (t !== undefined) node.text = t;
      if (node.note !== undefined) {
        const v = get(nodeId, "note");
        if (v !== undefined) node.note = v;
      }
      if (node.roleNote !== undefined) {
        const v = get(nodeId, "roleNote");
        if (v !== undefined) node.roleNote = v;
      }
      if (node.hint && typeof node.hint === "object") {
        const l = get(nodeId, "hint.label");
        const b = get(nodeId, "hint.body");
        if (l !== undefined) node.hint.label = l;
        if (b !== undefined) node.hint.body = b;
      }
      node.answers = node.answers.map((a, i) => {
        const v = get(nodeId, `answers.${i}.label`);
        if (v !== undefined) return { ...a, label: v };
        return a;
      });
    } else if (node.type === "step") {
      const h = get(nodeId, "headline");
      if (h !== undefined) node.headline = h;
      node.steps = node.steps.map((s, i) => {
        const v = get(nodeId, `steps.${i}`);
        return v ?? s;
      });
      const cl = get(nodeId, "continueLabel");
      if (cl !== undefined) node.continueLabel = cl;
      if (node.roleNote !== undefined) {
        const v = get(nodeId, "roleNote");
        if (v !== undefined) node.roleNote = v;
      }
    } else if (node.type === "endpoint") {
      const h = get(nodeId, "headline");
      if (h !== undefined) node.headline = h;
      node.steps = node.steps.map((s, i) => {
        const v = get(nodeId, `steps.${i}`);
        return v ?? s;
      });
      if (node.roleNote !== undefined) {
        const v = get(nodeId, "roleNote");
        if (v !== undefined) node.roleNote = v;
      }
      if (node.roleVariants?.moderator) {
        const mh = get(nodeId, "roleVariants.moderator.headline");
        if (mh !== undefined) node.roleVariants.moderator.headline = mh;
        node.roleVariants.moderator.steps =
          node.roleVariants.moderator.steps.map((s, i) => {
            const v = get(nodeId, `roleVariants.moderator.steps.${i}`);
            return v ?? s;
          });
      }
    }
  }

  return data;
}

/** Look up the base (unoverridden) value for a given path — used for "Reset to default". */
export function getBaseValue(
  base: WizardData,
  nodeId: string,
  fieldPath: string,
): string | undefined {
  const parts = fieldPath.split(".");
  const walk = (obj: unknown, keys: string[]): unknown => {
    let cur: unknown = obj;
    for (const k of keys) {
      if (cur == null) return undefined;
      if (Array.isArray(cur)) {
        const idx = Number(k);
        if (Number.isNaN(idx)) return undefined;
        cur = cur[idx];
      } else if (typeof cur === "object") {
        cur = (cur as Record<string, unknown>)[k];
      } else {
        return undefined;
      }
    }
    return cur;
  };

  let root: unknown;
  if (nodeId === INTRO_NODE) root = base.intro;
  else if (nodeId === CLOSEOUT_NODE) root = base.closeout;
  else root = base.nodes[nodeId];
  const v = walk(root, parts);
  return typeof v === "string" ? v : undefined;
}
