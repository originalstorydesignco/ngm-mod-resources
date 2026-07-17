import { createFileRoute } from "@tanstack/react-router";
import { Checklist } from "@/components/Checklist";

export const Route = createFileRoute("/how-to/announcement")({
  head: () => ({
    meta: [
      { title: "How to post monthly announcements — NGM Alliance Mod Resources" },
      {
        name: "description",
        content:
          "Recap the month, flag any changes, spotlight what’s coming, and celebrate the wins — in your own voice.",
      },
    ],
  }),
  component: AnnouncementPage,
});

function AnnouncementPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        How to post monthly announcements
      </h1>

      <p className="mt-6 text-foreground/85">
        At the start of each month, we share an update with the entire server — recapping the month, flagging any changes, spotlighting what’s coming, and celebrating the wins. It’s personal and high-energy, so let your voice shine.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold">
          The usual sections (mix & match — not every month has all of these)
        </h2>
        <div className="mt-3">
          <Checklist
            items={[
              { id: "a1", label: <span>A fun opening. Start with a playful title and short intro that leans into inside jokes on the server. Don’t forget to ping the @Announcements role.</span> },
              { id: "a2", label: <span>Stats for the month. Include a snapshot of total voice channel minutes and @Newcomers / @Members counts, pulled from the Statbot dashboard.</span> },
              { id: "a3", label: <span>Server changes. Welcome new staff, say goodbye to anyone leaving, describe any changes to the server architecture.</span> },
              { id: "a4", label: <span>Celebrations & events. Shoutout any server anniversaries, in-person gatherings, big launches.</span> },
              { id: "a5", label: <span>Programs & opportunities. Youth Lab always has a lot going on—feel free to hype up Rite of Passage Expeditions, Next Gen Esports, Youth Advisory Council or related opportunities, contests, or roles.</span> },
              { id: "a6", label: <span>TL;DR. Include a few short bullets at the very bottom so the skimmers still get it.</span> },
            ]}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Principles</h2>
        <ul className="mt-3 space-y-2 text-sm text-foreground/85 list-disc pl-5">
          <li>Write like you talk. The announcement should sound enthusiastic, warm and funny.</li>
          <li>The energy can flex to the month. Big-news months go full energy (new staff, stats, launches); quieter months can be a chill ‘here’s what’s brewing.’ Both are right.</li>
          <li>Use pings. Tag the relevant @roles so the right people catch the right thing, and drop event/info links where they fit.</li>
          <li>Make it easy to read. Use a bolded header and emojis per section so it’s skimmable.</li>
        </ul>
      </section>

      <section className="mt-10 rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">Example</h2>
        <div className="mt-4 space-y-4 text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">
          <p>
            July about to be a good month 🤝 @Announcements{"\n"}
            Especially since @Hussain is on a motive rampage tsts{"\n"}
            {"\n"}
            What we are all here for 📈{"\n"}
            We are at 88 @Members and 122 @Newcomers locking in 14,500 VC minutes 😤 shoutout @Colton for running up some events and getting ppl together, prec you bro{"\n"}
            {"\n"}
            What makes this month so great 🏔️{"\n"}
            NGM shall be off climbing rocks at the end of this month for our annual Rite of Passage Expedition, so @Jonathon and @Stephanie shall be MIA as they venture into the wilderness…and I KNOW a bunch of you are out having summer adventures as well 📸 We’ll make sure to run up an event where we can all share back some pics and such 👀{"\n"}
            {"\n"}
            Another reason why this month is so great: @NGE is back!!! 🔫{"\n"}
            After a 6 month hiatus the squad is back and better than before (@Simon gonna get us sponsored fs) Catch us on https://twitch.tv/nextgenmen to see some 5 wonderful friends have a great time 😜 if u wanna join us @Valorant for some weekly scrims lmk 😎{"\n"}
            {"\n"}
            Anonymous questionnaire{"\n"}
            Just a reminder NGMA has an anonymous questionnaire which you can use if you would like to report a concern about a @Facilitators to @Jake S CEO of NGM BTW. To do so you can follow this form here #⁠📬｜report⁠{"\n"}
            {"\n"}
            TL;DR{"\n"}
            July is ur month ☀️{"\n"}
            ROPE is happening, so is NGE{"\n"}
            If you got something on your mind and don’t want to tell us directly feel free to follow that form{"\n"}
            {"\n"}
            don’t forget to tell @Max G he’s the GOAT
          </p>
          <p>
            {"\n"}
          </p>
        </div>
      </section>
    </div>
  );
}
