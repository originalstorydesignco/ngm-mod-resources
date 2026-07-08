import { createFileRoute } from "@tanstack/react-router";
import channels from "@/data/reference/channels.json";
import { PastePlaceholder } from "@/components/PastePlaceholder";

export const Route = createFileRoute("/reference/channels")({
  head: () => ({
    meta: [
      { title: "Channels & rituals — NGMA Staff Hub" },
      { name: "description", content: "The map of admin spaces and the small rituals that keep them useful." },
    ],
  }),
  component: ChannelsPage,
});

function ChannelsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Channels &amp; rituals</h1>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">The map of admin spaces on Discord</h2>
        <dl className="mt-4 space-y-3">
          {channels.map.map((c) => (
            <div key={c.name} className="rounded-md border border-border bg-card px-4 py-3">
              <dt className="font-semibold">
                <span className="mr-2" aria-hidden>{c.icon}</span>{c.name}
              </dt>
              <dd className="mt-1">
                <PastePlaceholder slot={`one-line description for ${c.name}`} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">The rituals</h2>
        <ul className="mt-4 space-y-2">
          {channels.rituals.map((r, i) => (
            <li key={i} className="rounded-md border border-border bg-card px-4 py-2 text-sm">{r}</li>
          ))}
        </ul>
        <PastePlaceholder slot="any additional rituals" />
      </section>
    </div>
  );
}
