
-- Enums
CREATE TYPE public.card_page AS ENUM ('decide', 'reference', 'howto');
CREATE TYPE public.card_arrow AS ENUM ('internal', 'external');
CREATE TYPE public.card_variant AS ENUM ('default', 'critical', 'mod');

-- Cards table
CREATE TABLE public.cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page public.card_page NOT NULL,
  section TEXT,
  variant public.card_variant NOT NULL DEFAULT 'default',
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  cta_label TEXT NOT NULL,
  href TEXT NOT NULL,
  arrow public.card_arrow NOT NULL DEFAULT 'internal',
  sort_order INTEGER NOT NULL DEFAULT 0,
  facilitator_visible BOOLEAN NOT NULL DEFAULT TRUE,
  moderator_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cards TO authenticated;
GRANT ALL ON public.cards TO service_role;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cards_read_authenticated" ON public.cards
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "cards_admin_write" ON public.cards
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Links table
CREATE TABLE public.links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "group" TEXT NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  context_label TEXT,
  display_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.links TO authenticated;
GRANT ALL ON public.links TO service_role;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "links_read_authenticated" ON public.links
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "links_admin_write" ON public.links
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER cards_set_updated_at BEFORE UPDATE ON public.cards
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER links_set_updated_at BEFORE UPDATE ON public.links
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed cards: Decide
INSERT INTO public.cards (page, section, variant, title, caption, cta_label, href, arrow, sort_order, facilitator_visible, moderator_visible) VALUES
  ('decide', 'Safety & reporting', 'critical', 'Something serious is happening', 'Danger, grooming, abuse, threats, anything illegal.', 'Critical Incident Tool →', '/decide/critical-incident', 'internal', 10, true, true),
  ('decide', 'Safety & reporting', 'default', 'A young person disclosed something', 'I’m weighing privacy against reporting.', 'Confidentiality Tool →', '/decide/confidentiality', 'internal', 20, true, true),
  ('decide', 'Safety & reporting', 'default', 'I’m not sure who to tell', 'A concern or complaint, especially about a staff member.', 'Reporting Hierarchy Tool →', '/decide/reporting', 'internal', 30, true, true),
  ('decide', 'Conflict & moderation', 'default', 'Someone broke the Code of Conduct', 'A rule break or a conflict between members.', 'Conflict Resolution Tool →', '/decide/conflict', 'internal', 40, true, true),
  ('decide', 'Conflict & moderation', 'default', 'I just want to flag something for the team', 'A heads-up or second opinion.', 'How to use #flags-log →', '/how-to/flags-log', 'internal', 50, true, false),
  ('decide', 'Conflict & moderation', 'mod', 'I just want to flag something for the team', 'A heads-up or second opinion.', '#mod-chat on Discord ↗', 'https://discord.com/channels/720659736990842880/1357442642450976918', 'external', 51, false, true);

-- Seed cards: Reference
INSERT INTO public.cards (page, variant, title, caption, cta_label, href, arrow, sort_order) VALUES
  ('reference', 'default', 'The overarching model', 'The framework behind everything else here — how we keep this space safe, fun, connected, and youth-led.', 'Systems of Care Framework →', '/reference/systems-of-care', 'internal', 10),
  ('reference', 'default', 'What we do and what we don’t', 'A guide for how our role as Discord moderators compares to others.', 'Scope of Practice Framework →', '/reference/scope', 'internal', 20),
  ('reference', 'default', 'Channels & rituals', 'The map of admin spaces and what happens where.', '#mod-resources on Discord ↗', '#', 'external', 30),
  ('reference', 'default', 'Bots & commands', 'MEE6, NGM Bot, and onboarding automations.', '#mod-resources on Discord ↗', '#', 'external', 40),
  ('reference', 'default', 'Quick links', 'Forms, invites, and everything staff reach for.', 'Common Links List →', '/reference/links', 'internal', 50),
  ('reference', 'default', 'Who to contact in a critical incident', 'Vetted crisis lines and child protection services.', 'Critical Incident Contact List →', '/reference/contacts', 'internal', 60);

-- Seed cards: How-to
INSERT INTO public.cards (page, variant, title, caption, cta_label, href, arrow, sort_order, facilitator_visible, moderator_visible) VALUES
  ('howto', 'default', 'How to onboard new youth', 'The steps every new member goes through.', 'How to onboard new youth →', '/how-to/screening', 'internal', 10, true, false),
  ('howto', 'default', 'How to host server events', 'Suggestions on what to host, when and how.', 'How to host server events →', '/how-to/events', 'internal', 20, true, true),
  ('howto', 'default', 'How to post the weekly event board', 'Get the week’s events in front of the youth, on time and on point.', 'How to post the weekly event board →', '/how-to/event-board', 'internal', 30, true, true),
  ('howto', 'default', 'How to post monthly announcements', 'Recap the month, flag any changes, spotlight what’s coming, and celebrate the wins.', 'How to post monthly announcements →', '/how-to/announcement', 'internal', 40, true, true),
  ('howto', 'default', 'How to use #flags-log', 'Post a flag cleanly — minimal, factual, respectful.', 'How to use #flags-log →', '/how-to/flags-log', 'internal', 50, true, false);

-- Seed links
INSERT INTO public.links ("group", name, url, context_label, display_url, sort_order) VALUES
  ('Safety & reporting', 'Critical Incident Form', 'https://nextgenmen.ca/alliance/incident', 'Typeform', NULL, 10),
  ('Safety & reporting', 'Anonymous Report Form', 'https://nextgenmen.ca/alliance/anonymous', 'Typeform', NULL, 20),
  ('Promotion', 'Server invite', 'https://discord.gg/PXSJw2PFSx', 'For use on Discord', NULL, 10),
  ('Promotion', 'Server invite', 'https://nextgenmen.ca/discord', 'For use elsewhere', NULL, 20),
  ('Promotion', 'Server poster', 'https://nextgenmen.ca/alliance/poster', 'Downloadable PDF', NULL, 30),
  ('Registration & consent', 'Youth Registration Form', 'https://nextgenmen.ca/alliance/youth', 'Typeform', NULL, 10),
  ('Registration & consent', 'Parent/Guardian Registration Form', 'https://nextgenmen.ca/alliance/parents', 'Typeform', NULL, 20),
  ('Registration & consent', 'NGMA Terms of Service', 'https://nextgenmen.ca/alliance/terms', 'Google Doc', NULL, 30),
  ('Registration & consent', 'NGMA Houses Questionnaire', 'https://nextgenmen.ca/alliance/houses', 'Typeform', NULL, 40),
  ('Registration & consent', 'Twitch Media Release Form', 'https://nextgenmen.ca/alliance/twitch', 'Typeform', NULL, 50),
  ('Data & analytics', 'Statbot Dashboard', 'https://statbot.net/dashboard/720659736990842880/overview', 'External website', 'statbot.net/dashboard', 10),
  ('Data & analytics', 'Event Attendance Form', 'https://nextgenmen.ca/alliance/attendance', 'Typeform', NULL, 20);
