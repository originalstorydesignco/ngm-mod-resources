import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Card = Database["public"]["Tables"]["cards"]["Row"];
export type CardInsert = Database["public"]["Tables"]["cards"]["Insert"];
export type CardUpdate = Database["public"]["Tables"]["cards"]["Update"];
export type CardPage = Database["public"]["Enums"]["card_page"];

export type LinkRow = Database["public"]["Tables"]["links"]["Row"];
export type LinkInsert = Database["public"]["Tables"]["links"]["Insert"];
export type LinkUpdate = Database["public"]["Tables"]["links"]["Update"];

const cardsKey = (page: CardPage) => ["cards", page] as const;
const linksKey = ["links"] as const;

export function useCards(page: CardPage) {
  return useQuery({
    queryKey: cardsKey(page),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("page", page)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Card[];
    },
  });
}

export function useCardMutations(page: CardPage) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: cardsKey(page) });

  const create = useMutation({
    mutationFn: async (row: Omit<CardInsert, "page">) => {
      const { error } = await supabase.from("cards").insert({ ...row, page });
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: CardUpdate }) => {
      const { error } = await supabase.from("cards").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("cards").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return { create, update, remove };
}

export function useLinks() {
  return useQuery({
    queryKey: linksKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("links")
        .select("*")
        .order("group", { ascending: true })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as LinkRow[];
    },
  });
}

export function useLinkMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: linksKey });

  const create = useMutation({
    mutationFn: async (row: LinkInsert) => {
      const { error } = await supabase.from("links").insert(row);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: LinkUpdate }) => {
      const { error } = await supabase.from("links").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("links").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
