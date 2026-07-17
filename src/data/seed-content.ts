// Snapshot of the original seed values for cards + links.
// Used by the "Content changes" admin screen to detect drift between the
// live database rows and the values shipped in code (the initial migration
// seed). Keep this file in sync with the seed migration.

export type SeedCard = {
  page: "decide" | "reference" | "howto";
  section: string | null;
  variant: "default" | "critical" | "mod";
  title: string;
  caption: string;
  cta_label: string;
  href: string;
  arrow: "internal" | "external";
  sort_order: number;
  facilitator_visible: boolean;
  moderator_visible: boolean;
};

export type SeedLink = {
  group: string;
  name: string;
  url: string;
  context_label: string | null;
  display_url: string | null;
  sort_order: number;
};

/** Stable identity key for matching a live row to its seed row. */
export const cardKey = (c: {
  page: string;
  href: string;
  variant: string;
}) => `${c.page}|${c.href}|${c.variant}`;

export const linkKey = (l: { group: string; url: string }) =>
  `${l.group}|${l.url}`;

export const seedCards: SeedCard[] = [
  // Decide
  { page: "decide", section: "Safety & reporting", variant: "critical", title: "Something serious is happening", caption: "Danger, grooming, abuse, threats, anything illegal.", cta_label: "Critical Incident Tool →", href: "/decide/critical-incident", arrow: "internal", sort_order: 10, facilitator_visible: true, moderator_visible: true },
  { page: "decide", section: "Safety & reporting", variant: "default", title: "A young person disclosed something", caption: "I’m weighing privacy against reporting.", cta_label: "Confidentiality Tool →", href: "/decide/confidentiality", arrow: "internal", sort_order: 20, facilitator_visible: true, moderator_visible: true },
  { page: "decide", section: "Safety & reporting", variant: "default", title: "I’m not sure who to tell", caption: "A concern or complaint, especially about a staff member.", cta_label: "Reporting Hierarchy Tool →", href: "/decide/reporting", arrow: "internal", sort_order: 30, facilitator_visible: true, moderator_visible: true },
  { page: "decide", section: "Conflict & moderation", variant: "default", title: "Someone broke the Code of Conduct", caption: "A rule break or a conflict between members.", cta_label: "Conflict Resolution Tool →", href: "/decide/conflict", arrow: "internal", sort_order: 40, facilitator_visible: true, moderator_visible: true },
  { page: "decide", section: "Conflict & moderation", variant: "default", title: "I just want to flag something for the team", caption: "A heads-up or second opinion.", cta_label: "How to use #flags-log →", href: "/how-to/flags-log", arrow: "internal", sort_order: 50, facilitator_visible: true, moderator_visible: false },
  { page: "decide", section: "Conflict & moderation", variant: "mod", title: "I just want to flag something for the team", caption: "A heads-up or second opinion.", cta_label: "#mod-chat on Discord ↗", href: "https://discord.com/channels/720659736990842880/1357442642450976918", arrow: "external", sort_order: 51, facilitator_visible: false, moderator_visible: true },

  // Reference
  { page: "reference", section: null, variant: "default", title: "The overarching model", caption: "The framework behind everything else here — how we keep this space safe, fun, connected, and youth-led.", cta_label: "Systems of Care Framework →", href: "/reference/systems-of-care", arrow: "internal", sort_order: 10, facilitator_visible: true, moderator_visible: true },
  { page: "reference", section: null, variant: "default", title: "What we do and what we don’t", caption: "A guide for how our role as Discord moderators compares to others.", cta_label: "Scope of Practice Framework →", href: "/reference/scope", arrow: "internal", sort_order: 20, facilitator_visible: true, moderator_visible: true },
  { page: "reference", section: null, variant: "default", title: "Channels & rituals", caption: "The map of admin spaces and what happens where.", cta_label: "#mod-resources on Discord ↗", href: "#", arrow: "external", sort_order: 30, facilitator_visible: true, moderator_visible: true },
  { page: "reference", section: null, variant: "default", title: "Bots & commands", caption: "MEE6, NGM Bot, and onboarding automations.", cta_label: "#mod-resources on Discord ↗", href: "#", arrow: "external", sort_order: 40, facilitator_visible: true, moderator_visible: true },
  { page: "reference", section: null, variant: "default", title: "Quick links", caption: "Forms, invites, and everything staff reach for.", cta_label: "Common Links List →", href: "/reference/links", arrow: "internal", sort_order: 50, facilitator_visible: true, moderator_visible: true },
  { page: "reference", section: null, variant: "default", title: "Who to contact in a critical incident", caption: "Vetted crisis lines and child protection services.", cta_label: "Critical Incident Contact List →", href: "/reference/contacts", arrow: "internal", sort_order: 60, facilitator_visible: true, moderator_visible: true },

  // How-to
  { page: "howto", section: null, variant: "default", title: "How to onboard new youth", caption: "The steps every new member goes through.", cta_label: "How to onboard new youth →", href: "/how-to/screening", arrow: "internal", sort_order: 10, facilitator_visible: true, moderator_visible: false },
  { page: "howto", section: null, variant: "default", title: "How to host server events", caption: "Suggestions on what to host, when and how.", cta_label: "How to host server events →", href: "/how-to/events", arrow: "internal", sort_order: 20, facilitator_visible: true, moderator_visible: true },
  { page: "howto", section: null, variant: "default", title: "How to post the weekly event board", caption: "Get the week’s events in front of the youth, on time and on point.", cta_label: "How to post the weekly event board →", href: "/how-to/event-board", arrow: "internal", sort_order: 30, facilitator_visible: true, moderator_visible: true },
  { page: "howto", section: null, variant: "default", title: "How to post monthly announcements", caption: "Recap the month, flag any changes, spotlight what’s coming, and celebrate the wins.", cta_label: "How to post monthly announcements →", href: "/how-to/announcement", arrow: "internal", sort_order: 40, facilitator_visible: true, moderator_visible: true },
  { page: "howto", section: null, variant: "default", title: "How to use #flags-log", caption: "Post a flag cleanly — minimal, factual, respectful.", cta_label: "How to use #flags-log →", href: "/how-to/flags-log", arrow: "internal", sort_order: 50, facilitator_visible: true, moderator_visible: false },
];

export const seedLinks: SeedLink[] = [
  { group: "Safety & reporting", name: "Critical Incident Form", url: "https://nextgenmen.ca/alliance/incident", context_label: "Typeform", display_url: null, sort_order: 10 },
  { group: "Safety & reporting", name: "Anonymous Report Form", url: "https://nextgenmen.ca/alliance/anonymous", context_label: "Typeform", display_url: null, sort_order: 20 },
  { group: "Promotion", name: "Server invite", url: "https://discord.gg/PXSJw2PFSx", context_label: "For use on Discord", display_url: null, sort_order: 10 },
  { group: "Promotion", name: "Server invite", url: "https://nextgenmen.ca/discord", context_label: "For use elsewhere", display_url: null, sort_order: 20 },
  { group: "Promotion", name: "Server poster", url: "https://nextgenmen.ca/alliance/poster", context_label: "Downloadable PDF", display_url: null, sort_order: 30 },
  { group: "Registration & consent", name: "Youth Registration Form", url: "https://nextgenmen.ca/alliance/youth", context_label: "Typeform", display_url: null, sort_order: 10 },
  { group: "Registration & consent", name: "Parent/Guardian Registration Form", url: "https://nextgenmen.ca/alliance/parents", context_label: "Typeform", display_url: null, sort_order: 20 },
  { group: "Registration & consent", name: "NGMA Terms of Service", url: "https://nextgenmen.ca/alliance/terms", context_label: "Google Doc", display_url: null, sort_order: 30 },
  { group: "Registration & consent", name: "NGMA Houses Questionnaire", url: "https://nextgenmen.ca/alliance/houses", context_label: "Typeform", display_url: null, sort_order: 40 },
  { group: "Registration & consent", name: "Twitch Media Release Form", url: "https://nextgenmen.ca/alliance/twitch", context_label: "Typeform", display_url: null, sort_order: 50 },
  { group: "Data & analytics", name: "Statbot Dashboard", url: "https://statbot.net/dashboard/720659736990842880/overview", context_label: "External website", display_url: "statbot.net/dashboard", sort_order: 10 },
  { group: "Data & analytics", name: "Event Attendance Form", url: "https://nextgenmen.ca/alliance/attendance", context_label: "Typeform", display_url: null, sort_order: 20 },
];

export const seedCardsByKey = new Map(seedCards.map((c) => [cardKey(c), c]));
export const seedLinksByKey = new Map(seedLinks.map((l) => [linkKey(l), l]));

/** Comparable card fields for drift detection. */
export const CARD_COMPARE_FIELDS: (keyof SeedCard)[] = [
  "section",
  "variant",
  "title",
  "caption",
  "cta_label",
  "href",
  "arrow",
  "sort_order",
  "facilitator_visible",
  "moderator_visible",
];

export const LINK_COMPARE_FIELDS: (keyof SeedLink)[] = [
  "name",
  "url",
  "context_label",
  "display_url",
  "sort_order",
];
