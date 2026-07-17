CREATE TYPE public.wizard_tool AS ENUM ('confidentiality','critical-incident','conflict','reporting');

CREATE TABLE public.wizard_overrides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool public.wizard_tool NOT NULL,
  node_id TEXT NOT NULL,
  field_path TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tool, node_id, field_path)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.wizard_overrides TO authenticated;
GRANT ALL ON public.wizard_overrides TO service_role;

ALTER TABLE public.wizard_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "wizard_overrides_select_authenticated"
  ON public.wizard_overrides FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "wizard_overrides_admin_all"
  ON public.wizard_overrides FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION public.wizard_overrides_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER wizard_overrides_updated_at
  BEFORE UPDATE ON public.wizard_overrides
  FOR EACH ROW EXECUTE FUNCTION public.wizard_overrides_set_updated_at();