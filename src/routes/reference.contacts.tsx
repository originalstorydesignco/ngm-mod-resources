import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reference/contacts")({
  head: () => ({
    meta: [
      { title: "Critical incident contacts — NGMA Staff Hub" },
      { name: "description", content: "Who to call when it’s serious — emergency, crisis, exploitation, and child-protection lines." },
    ],
  }),
  component: ContactsPage,
});

type Entry = { label: string; tel?: string; display?: string; href?: string; note?: string };

function TelLink({ tel, display }: { tel: string; display?: string }) {
  return (
    <a
      href={`tel:${tel.replace(/[^0-9+]/g, "")}`}
      className="text-primary underline underline-offset-2"
    >
      {display ?? tel}
    </a>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
      {children}
    </a>
  );
}

function EntryLine({ e }: { e: Entry }) {
  return (
    <li className="flex flex-wrap items-baseline gap-x-2 gap-y-1 py-1">
      <span className="font-medium">{e.label}:</span>
      {e.href && <ExtLink href={e.href}>{e.href}</ExtLink>}
      {e.tel && <TelLink tel={e.tel} display={e.display} />}
      {!e.tel && !e.href && e.note && <span className="text-foreground/85">{e.note}</span>}
      {(e.tel || e.href) && e.note && <span className="text-foreground/70">({e.note})</span>}
    </li>
  );
}

function PillHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="print-hide">
      <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider">
        {children}
      </span>
    </div>
  );
}

type Row = {
  jur: string;
  primary?: { tel: string; display: string; note?: string };
  afterHours?: { tel: string; display: string; note?: string };
  extras?: { tel: string; display: string; note?: string }[];
  links: { label: string; href: string }[];
  note?: string;
};

const canadaRows: Row[] = [
  {
    jur: "British Columbia",
    primary: { tel: "1-800-663-9122", display: "1-800-663-9122", note: "24/7" },
    links: [
      {
        label: "Government of British Columbia →",
        href: "https://www2.gov.bc.ca/gov/content/safety/public-safety/protecting-children/reporting-child-abuse",
      },
    ],
  },
  {
    jur: "Alberta",
    primary: { tel: "1-800-638-0715", display: "1-800-638-0715", note: "24/7" },
    links: [{ label: "Government of Alberta →", href: "https://www.alberta.ca/report-child-abuse" }],
  },
  {
    jur: "Saskatchewan",
    note: "Numbers vary by region and business/after hours.",
    links: [
      {
        label: "Government of Saskatchewan (211) →",
        href: "https://sk.211.ca/services/87728256/government-of-saskatchewan-social-services-child-protection-child-abuse-and-neglect/",
      },
    ],
  },
  {
    jur: "Manitoba",
    primary: {
      tel: "1-866-345-9241",
      display: "1-866-345-9241",
      note: "province-wide, 24/7",
    },
    extras: [
      { tel: "204-944-4200", display: "204-944-4200", note: "Winnipeg, 24/7" },
    ],
    links: [{ label: "Government of Manitoba →", href: "https://www.gov.mb.ca/fs/childfam/reporting.html" }],
  },
  {
    jur: "Ontario",
    note: "Call the local Children’s Aid Society (24/7) where the youth lives.",
    links: [
      {
        label: "Find the local CAS (OACAS) →",
        href: "https://www.oacas.org/childrens-aid-child-protection/how-to-report-abuse/",
      },
      { label: "Government of Ontario →", href: "https://www.ontario.ca/page/report-child-abuse-and-neglect" },
    ],
  },
  {
    jur: "Québec",
    note: "Call the Director of Youth Protection for the region where the youth lives (24/7). Montréal: 514-896-3100 (French) / 514-935-6196 (English).",
    extras: [
      { tel: "514-896-3100", display: "514-896-3100", note: "Montréal, French" },
      { tel: "514-935-6196", display: "514-935-6196", note: "Montréal, English" },
    ],
    links: [
      {
        label: "Find the local DYP (Government of Québec) →",
        href: "https://www.quebec.ca/en/family-and-support-for-individuals/childhood/youth-protection/reporting-a-situation-to-the-director-of-youth-protection/contact-informations-of-the-dyp",
      },
    ],
  },
  {
    jur: "New Brunswick",
    primary: { tel: "1-833-733-7835", display: "1-833-733-7835", note: "business hours" },
    afterHours: { tel: "1-800-442-9799", display: "1-800-442-9799", note: "after-hours" },
    links: [
      {
        label: "Government of New Brunswick →",
        href: "https://www2.gnb.ca/content/gnb/en/services/services_renderer.9355.Child_Protection.html",
      },
    ],
  },
  {
    jur: "Nova Scotia",
    primary: { tel: "1-877-424-1177", display: "1-877-424-1177", note: "business hours" },
    afterHours: { tel: "1-866-922-2434", display: "1-866-922-2434", note: "after-hours" },
    extras: [
      {
        tel: "1-800-263-8686",
        display: "1-800-263-8686",
        note: "Mi’kmaw Family and Children’s Services, 24/7",
      },
    ],
    links: [{ label: "Government of Nova Scotia →", href: "https://novascotia.ca/report-child-abuse-or-neglect" }],
  },
  {
    jur: "Prince Edward Island",
    primary: { tel: "1-877-341-3101", display: "1-877-341-3101", note: "business hours" },
    afterHours: { tel: "1-800-341-6868", display: "1-800-341-6868", note: "after-hours" },
    links: [
      {
        label: "Government of Prince Edward Island →",
        href: "https://www.princeedwardisland.ca/en/information/social-development-and-seniors/child-protection",
      },
    ],
  },
  {
    jur: "Newfoundland and Labrador",
    primary: { tel: "1-833-552-2368", display: "1-833-552-2368", note: "24/7" },
    links: [
      {
        label: "Government of Newfoundland and Labrador →",
        href: "https://www.gov.nl.ca/sswb/childprotection/report/",
      },
    ],
  },
  {
    jur: "Yukon",
    primary: {
      tel: "867-667-3002",
      display: "867-667-3002",
      note: "Whitehorse, 24/7",
    },
    note: "If the youth lives outside of Whitehorse, call the social worker for the appropriate region.",
    links: [{ label: "Government of Yukon →", href: "https://yukon.ca/en/report-child-abuse" }],
  },
  {
    jur: "Northwest Territories",
    note: "Numbers are regional, with separate after-hours lines.",
    links: [
      {
        label: "GNWT regional numbers →",
        href: "https://www.hss.gov.nt.ca/en/contact/reporting-suspected-child-maltreatment-and-neglect",
      },
    ],
  },
  {
    jur: "Nunavut",
    note: "Call the local Community Social Services Worker; if unavailable, the local RCMP.",
    links: [
      {
        label: "Government of Nunavut →",
        href: "https://www.gov.nu.ca/en/families-parenting-elders-and-youth/child-and-youth-protection",
      },
    ],
  },
];

function JurisdictionRow({ r }: { r: Row }) {
  return (
    <div className="rounded-md border border-border bg-card px-4 py-3">
      <p className="font-semibold">{r.jur}</p>
      {r.note && <p className="mt-1 text-sm text-foreground/85">{r.note}</p>}
      {r.primary && (
        <p className="mt-1 text-sm">
          <TelLink tel={r.primary.tel} display={r.primary.display} />
          {r.primary.note && <span className="text-foreground/70"> ({r.primary.note})</span>}
        </p>
      )}
      {r.afterHours && (
        <p className="mt-1 text-sm">
          <TelLink tel={r.afterHours.tel} display={r.afterHours.display} />
          {r.afterHours.note && <span className="text-foreground/70"> ({r.afterHours.note})</span>}
        </p>
      )}
      {r.extras?.map((e, i) => (
        <p key={i} className="mt-1 text-sm">
          <TelLink tel={e.tel} display={e.display} />
          {e.note && <span className="text-foreground/70"> ({e.note})</span>}
        </p>
      ))}
      <ul className="mt-2 space-y-1">
        {r.links.map((l) => (
          <li key={l.href} className="text-sm">
            <ExtLink href={l.href}>{l.label}</ExtLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 print-page">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Critical incident contacts</h1>
      <p className="mt-3 text-foreground/85">
        Who to call when it’s serious: emergency services, crisis support, exploitation reporting, and the child-protection line for wherever the youth lives. Every number is checked against official sources — the banner shows when.
      </p>

      <div
        className="mt-6 rounded-md px-4 py-3 text-sm text-white print-hide"
        style={{ backgroundColor: "#5865F2" }}
      >
        <strong>Last verified:</strong> July 8, 2026 by Jonathon Reed. #help-resources is our vetted source of truth for crisis lines — keep this table in sync with it.
      </div>

      <p className="mt-4 text-sm">
        <strong>Critical-incident lead:</strong> Manager of Youth Programs. <strong>Backup:</strong> COO. Contact info is pinned in #admin-chat.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Immediate danger</h2>
        <ul className="mt-2">
          <EntryLine e={{ label: "Emergency", tel: "911", display: "911" }} />
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Crisis support</h2>
        <div className="mt-3 space-y-3">
          <div>
            <p className="text-sm font-semibold text-foreground/85">Canada</p>
            <ul>
              <EntryLine e={{ label: "Kids Help Phone", tel: "1-800-668-6868", display: "1-800-668-6868" }} />
              <EntryLine e={{ label: "Kids Help Phone (text)", note: "text CONNECT to 686868" }} />
              <EntryLine e={{ label: "988 Suicide Crisis Helpline", tel: "988", display: "call/text 988" }} />
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground/85">United States</p>
            <ul>
              <EntryLine e={{ label: "988 Suicide & Crisis Lifeline", tel: "988", display: "call/text 988" }} />
              <EntryLine e={{ label: "Crisis Text Line", note: "text HOME to 741741" }} />
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">Online child exploitation</h2>
        <ul className="mt-2">
          <EntryLine e={{ label: "Cybertip.ca", href: "https://cybertip.ca" }} />
          <EntryLine e={{ label: "NCMEC CyberTipline", href: "https://report.cybertip.org" }} />
          <EntryLine e={{ label: "NCMEC CyberTipline (phone)", tel: "1-800-843-5678", display: "1-800-843-5678" }} />
          <EntryLine e={{ label: "Discord Trust & Safety", note: "in-app report" }} />
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Abuse / neglect — child protection</h2>

        <div className="mt-4">
          <PillHeader>Canada</PillHeader>
          <div className="mt-3 grid gap-3">
            {canadaRows.map((r) => (
              <JurisdictionRow key={r.jur} r={r} />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <PillHeader>United States</PillHeader>
          <div className="mt-3 rounded-md border border-border bg-card px-4 py-3 text-sm">
            <p>
              Report to the state CPS agency where the youth lives. Childhelp: call or text{" "}
              <TelLink tel="800-422-4453" display="800-422-4453" /> (24/7) — a guidance line that routes you to the right state agency. It is not the report itself and not 911.
            </p>
            <p className="mt-2">
              <ExtLink href="https://childhelphotline.org">Childhelp →</ExtLink>
            </p>
          </div>
        </div>
      </section>

      <p className="mt-10 text-xs text-muted-foreground">
        Confirm and localize every number before relying on this table — see #help-resources.
      </p>
    </div>
  );
}
