export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      allowlist: {
        Row: {
          email: string
          invited_at: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          email: string
          invited_at?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          email?: string
          invited_at?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      cards: {
        Row: {
          arrow: Database["public"]["Enums"]["card_arrow"]
          caption: string
          created_at: string
          created_by: string | null
          cta_label: string
          facilitator_visible: boolean
          href: string
          id: string
          moderator_visible: boolean
          page: Database["public"]["Enums"]["card_page"]
          section: string | null
          sort_order: number
          title: string
          updated_at: string
          variant: Database["public"]["Enums"]["card_variant"]
        }
        Insert: {
          arrow?: Database["public"]["Enums"]["card_arrow"]
          caption: string
          created_at?: string
          created_by?: string | null
          cta_label: string
          facilitator_visible?: boolean
          href: string
          id?: string
          moderator_visible?: boolean
          page: Database["public"]["Enums"]["card_page"]
          section?: string | null
          sort_order?: number
          title: string
          updated_at?: string
          variant?: Database["public"]["Enums"]["card_variant"]
        }
        Update: {
          arrow?: Database["public"]["Enums"]["card_arrow"]
          caption?: string
          created_at?: string
          created_by?: string | null
          cta_label?: string
          facilitator_visible?: boolean
          href?: string
          id?: string
          moderator_visible?: boolean
          page?: Database["public"]["Enums"]["card_page"]
          section?: string | null
          sort_order?: number
          title?: string
          updated_at?: string
          variant?: Database["public"]["Enums"]["card_variant"]
        }
        Relationships: []
      }
      links: {
        Row: {
          context_label: string | null
          created_at: string
          created_by: string | null
          display_url: string | null
          group: string
          id: string
          name: string
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          context_label?: string | null
          created_at?: string
          created_by?: string | null
          display_url?: string | null
          group: string
          id?: string
          name: string
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          context_label?: string | null
          created_at?: string
          created_by?: string | null
          display_url?: string | null
          group?: string
          id?: string
          name?: string
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wizard_overrides: {
        Row: {
          created_at: string
          field_path: string
          id: string
          node_id: string
          tool: Database["public"]["Enums"]["wizard_tool"]
          updated_at: string
          updated_by: string | null
          value: string
        }
        Insert: {
          created_at?: string
          field_path: string
          id?: string
          node_id: string
          tool: Database["public"]["Enums"]["wizard_tool"]
          updated_at?: string
          updated_by?: string | null
          value: string
        }
        Update: {
          created_at?: string
          field_path?: string
          id?: string
          node_id?: string
          tool?: Database["public"]["Enums"]["wizard_tool"]
          updated_at?: string
          updated_by?: string | null
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff"
      card_arrow: "internal" | "external"
      card_page: "decide" | "reference" | "howto"
      card_variant: "default" | "critical" | "mod"
      wizard_tool:
        | "confidentiality"
        | "critical-incident"
        | "conflict"
        | "reporting"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
      card_arrow: ["internal", "external"],
      card_page: ["decide", "reference", "howto"],
      card_variant: ["default", "critical", "mod"],
      wizard_tool: [
        "confidentiality",
        "critical-incident",
        "conflict",
        "reporting",
      ],
    },
  },
} as const
