import { createFileRoute } from "@tanstack/react-router";
import { Checklist } from "@/components/Checklist";
import { useRole } from "@/lib/role";

export const Route = createFileRoute("/how-to/screening")({
  head: () => ({
    meta: [
      { title: "How to onboard new youth — NGM Alliance Mod Resources" },
      { name: "description", content: "The steps every new member goes through." },
    ],
  }),
  component: ScreeningPage,
});

function ScreeningPage() {
  const { role, hydrated } = useRole();
  const isMod = hydrated && role === "moderator";

  const steps = [
    <span><strong>Check for new applicants (do this daily!)</strong> Every day you’re online, peek at the Members button and look for anyone under Pending. See someone? Click their name, and then Join Interview. That drops you into a group DM with the applicant (other Facilitators can hop in too) — this is where we start getting to know them.</span>,
    <span><strong>Read their application first.</strong> Before you say hi, give their answers a once-over: are they in our age range (13–17)? Do they read like a young person? Did they say where they found us — and does that actually make sense? Heads up: kids show up differently online — wild usernames, all of it — so we never discredit someone just for that. But if something feels off, tuck it in the back of your mind as you go.</span>,
    <span><strong>Say hi.</strong> Introduce yourself and ask them a question. Once they reply, just chat a little — get to know them, answer anything they’re wondering about the server. Keep it warm.</span>,
    <span><strong>Bring up registration + the emergency contact.</strong> Let them know there’s a quick registration step. Here’s the part to handle with care: because we’re a youth-serving org, we ask for an emergency contact — and this can be a sticking point, so keep it chill. Be super clear: it has to be a trusted adult, we’d only ever use it in an actual emergency, and we will never reach out for anything else, ever. If they’re weirded out, talk it through — that usually settles it.</span>,
    <span><strong>Send the registration form.</strong> Send the registration form using NGM Bot and ask them to give you a shout when they’re done (it’s a 3-min thing, tops).</span>,
    <span><strong>Set up their thread in #registration-forms.</strong> Once they submit, it pops into #registration-forms. Make a thread for their application. Put their first name in the thread title with a quick status (e.g. “Alex — waiting on VC call”) and mark it as in-progress. Flip it to done once they’re fully onboarded, so we can always see who’s mid-process at a glance.</span>,
    <span><strong>Double-check the form.</strong> Give it a proper look — does it all seem legit? Is the trusted adult actually a trusted adult to them?</span>,
    <span><strong>The voice call.</strong> Ask if they’re free to hop on. If not, schedule it or tell them when you’re around — sooner is better; the quicker we do this the more likely they actually join. If they’re nervous, let them know we call because we personally introduce everyone to the server, and we just need to know a bit more about them to write that intro.</span>,
    <span><strong>On the call.</strong> Get to know them for real — jot down what they share. Ask the good stuff: what grade they’re in, what games they play, hobbies or sports, a fun fact. This is also where you’re quietly listening for any red flags that this isn’t a young person. If you’re unsure, just keep asking questions — if you keep someone talking long enough, you can always tell when you’re talking to a kid. (Real talk: this system has never failed us — we’ve never had someone get in who wasn’t who they said they were.) Ask what House they’re interested in joining, or send them the Houses questionnaire if they’re not sure.</span>,
    <span><strong>Tell them about the server.</strong> Walk them through the Server Guide, the limited-access channels, the help resources, and the Get Help Now button. Then tell them you’re hyped they’re joining.</span>,
    <span><strong>Approve them.</strong> Click Approve on their application.</span>,
    <span><strong>Set their nickname.</strong> Right-click their username and change their server nickname to their first name. If we’ve already got a young person with that name, check with them that it’s cool to add an initial beside it so we can tell everyone apart.</span>,
    <span><strong>Forward the join message.</strong> As they join they’ll be picking their channels and roles — that’s your window to write the intro. An automated “they joined” message shows up in #general-chat; click it and forward it into the #introductions thread.</span>,
    <span><strong>Write their intro.</strong> Using what you learned in the call, write it up. Make it warm and use as many @roles as you can — games, hobbies, interests — so everyone with something in common sees it. Always tag @Welcome Team. Look at past intros in #introductions for the energy to aim for.</span>,
    <span><strong>Wrap up.</strong> Circle back to #registration-forms and flip their thread to done. Then configure their birthday through MEE6 and add them to their chosen House through their profile roles as well as NGM Bot. That’s it — you just brought someone new into the community!</span>,
  ].map((label, i) => ({ id: `s${i + 1}`, label }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">How to onboard new youth</h1>

      {isMod && (
        <div className="mt-5 rounded-lg border-l-4 border-mod bg-mod/15 px-4 py-3 text-[15px] text-foreground">
          <strong className="font-bold">Moderators:</strong> Only admins on the Discord server can see pending membership applications, so onboarding isn’t in your wheelhouse — this guide is here so you can see how new members reach the community.
        </div>
      )}

      <p className="mt-4 text-foreground/85">
        Every new member goes through the same steps to join the server — consistency is the safeguard.
      </p>

      <div className="mt-6">
        <Checklist items={steps} />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <a
          href="#"
          className="inline-flex items-center h-10 px-3 rounded-md border border-border bg-surface text-sm hover:border-primary"
        >
          Bots &amp; commands →
        </a>
      </div>
    </div>
  );
}

