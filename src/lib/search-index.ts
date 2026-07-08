import botsData from "@/data/reference/bots.json";
import channelsData from "@/data/reference/channels.json";
import linksData from "@/data/reference/links.json";
import scopeData from "@/data/reference/scope.json";

export type SearchEntry = {
  id: string;
  title: string;
  section: string; // page label
  snippet: string;
  path: string; // route path
  hash?: string;
  keywords?: string;
};

const entries: SearchEntry[] = [];

function add(e: SearchEntry) {
  entries.push(e);
}

// --- Reference: Scope ---
add({
  id: "ref-scope",
  title: "What we do and what we don’t",
  section: "Scope of Practice",
  snippet: "Is this mine to do? What’s in our wheelhouse and what belongs to someone else.",
  path: "/reference/scope",
});
for (const it of (scopeData.inScope.items as Array<{ text: string; keywords: string[] }>)) {
  add({
    id: `scope-in-${it.text}`,
    title: it.text,
    section: "Scope · In our wheelhouse",
    snippet: it.text,
    path: "/reference/scope",
    keywords: it.keywords.join(" "),
  });
}
for (const g of (scopeData.outOfScope.groups as Array<{ who: string; items: string[]; keywords: string[] }>)) {
  for (const item of g.items) {
    add({
      id: `scope-out-${g.who}-${item}`,
      title: item,
      section: `Scope · ${g.who}`,
      snippet: item,
      path: "/reference/scope",
      keywords: g.keywords.join(" "),
    });
  }
}

// --- Reference: Channels ---
add({
  id: "ref-channels",
  title: "Channels & rituals",
  section: "Channels & rituals",
  snippet: "The map of admin spaces and what happens where.",
  path: "/reference/channels",
});
for (const c of (channelsData.map as Array<{ name: string; icon: string }>)) {
  add({
    id: `chan-${c.name}`,
    title: c.name,
    section: "Channels · map",
    snippet: c.name,
    path: "/reference/channels",
  });
}
for (const r of (channelsData.rituals as string[])) {
  add({
    id: `ritual-${r}`,
    title: r,
    section: "Channels · rituals",
    snippet: r,
    path: "/reference/channels",
  });
}

// --- Reference: Bots ---
add({
  id: "ref-bots",
  title: "Bots & commands",
  section: "Bots & commands",
  snippet: "MEE6, NGM Bot, and onboarding automations.",
  path: "/reference/bots",
});
for (const g of (botsData.groups as Array<{ title: string; commands?: Array<{ cmd: string; desc?: string }> }>)) {
  add({
    id: `bots-${g.title}`,
    title: g.title,
    section: "Bots & commands",
    snippet: g.title,
    path: "/reference/bots",
  });
  for (const c of g.commands ?? []) {
    add({
      id: `bot-cmd-${c.cmd}`,
      title: c.cmd,
      section: `Bots · ${g.title}`,
      snippet: c.desc ?? c.cmd,
      path: "/reference/bots",
    });
  }
}

// --- Reference: Common Links ---
add({
  id: "ref-links",
  title: "Common Links List",
  section: "Common Links List",
  snippet: "Invites, registration and release forms, reporting forms.",
  path: "/reference/links",
});
for (const g of (linksData.groups as Array<{ heading: string; links: Array<{ label: string; href: string; meta?: string }> }>)) {
  for (const l of g.links) {
    add({
      id: `link-${g.heading}-${l.label}`,
      title: l.label,
      section: `Common Links · ${g.heading}`,
      snippet: [l.meta, l.href].filter(Boolean).join(" · "),
      path: "/reference/links",
    });
  }
}

// --- Reference: Critical Incident Contact List ---
add({
  id: "ref-contacts",
  title: "Critical Incident Contact List",
  section: "Contacts",
  snippet: "The vetted crisis-line and child-protection table.",
  path: "/reference/contacts",
});
const jurisdictions = [
  "British Columbia",
  "Alberta",
  "Saskatchewan",
  "Manitoba",
  "Ontario",
  "Québec",
  "Quebec",
  "New Brunswick",
  "Nova Scotia",
  "Prince Edward Island",
  "Newfoundland and Labrador",
  "Yukon",
  "Northwest Territories",
  "Nunavut",
];
for (const j of jurisdictions) {
  add({
    id: `contact-${j}`,
    title: j,
    section: "Critical Incident Contact List",
    snippet: `Child protection line for ${j}.`,
    path: "/reference/contacts",
  });
}

// --- Reference: Systems of Care ---
add({
  id: "ref-systems",
  title: "Systems of Care",
  section: "Systems of Care",
  snippet: "The framework behind everything else — Safety, Engagement, Connection, Empowerment.",
  path: "/reference/systems-of-care",
  keywords: "safety engagement connection empowerment belonging mastery independence purpose",
});

// --- How-to ---
const howto: Array<{ path: string; title: string; snippet: string; keywords?: string }> = [
  {
    path: "/how-to",
    title: "How-to guides",
    snippet: "Step-by-step guides for the recurring work — flagging, onboarding, and events.",
  },
  {
    path: "/how-to/flags-log",
    title: "How to use #flags-log",
    snippet: "Post a flag cleanly — minimal, factual, respectful. Scorecard meeting, thread, hand off.",
    keywords: "flag flags log heads up scorecard thread safeguarding privacy",
  },
  {
    path: "/how-to/screening",
    title: "How to onboard new youth",
    snippet: "The 15-step check every new member goes through — pending, interview, emergency contact, intro.",
    keywords: "onboarding new member intro pending emergency contact registration voice call nickname welcome team screening",
  },
  {
    path: "/how-to/events",
    title: "How to host server events",
    snippet: "Pick what + when, create, calendar, hype, run, log attendance, Houses points. Plus the Event Menu bank.",
    keywords: "event host schedule houses points attendance advanced-search calendar VC event menu Fortnite Valorant Minecraft Roblox Among Us Skribbl Gartic Geoguessr Jeopardy trivia Wordle baking movie storytime advice",
  },
];
for (const h of howto) {
  add({ id: `howto-${h.path}`, title: h.title, section: "How-to", snippet: h.snippet, path: h.path, keywords: h.keywords });
}

export const searchIndex = entries;

