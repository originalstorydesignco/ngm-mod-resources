import { createFileRoute } from "@tanstack/react-router";
import diagram from "@/assets/systems-of-care.png";

export const Route = createFileRoute("/reference/systems-of-care")({
  head: () => ({
    meta: [
      { title: "Systems of Care — NGMA Staff Hub" },
      {
        name: "description",
        content:
          "The design behind NGM Alliance: four interlocking systems — Safety, Engagement, Connection, and Empowerment.",
      },
    ],
  }),
  component: SystemsOfCarePage,
});

function Row({ emoji, name, desc }: { emoji: string; name: string; desc: string }) {
  return (
    <p className="text-sm sm:text-base">
      <span className="mr-1">{emoji}</span>
      <span className="font-semibold text-primary">{name}</span>
      <span className="text-foreground/85"> — {desc}</span>
    </p>
  );
}

function SystemsOfCarePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        Systems of Care
      </h1>
      <p className="mt-3 text-foreground/85">
        The design behind NGM Alliance: four interlocking systems — Safety, Engagement, Connection, and Empowerment — each made of concrete practices, from screening and safeguards to events, facilitator moderation, and co-leadership with youth. The outer ring is what it all adds up to for a young person: belonging, mastery, independence, and purpose, informed by Martin Brokenleg’s Circle of Courage. Every tool and guide on this site lives somewhere in this wheel.
      </p>

      <div className="mt-8 flex justify-center">
        <img
          src={diagram}
          alt="Systems of Care framework: four systems — Safety, Engagement, Connection, Empowerment — surrounded by Belonging, Mastery, Independence, and Purpose."
          className="w-full max-w-[720px] h-auto"
        />
      </div>

      <div className="mt-8 space-y-2">
        <Row emoji="🛡️" name="System of Safety" desc="how we protect youth: screening, policies, safeguards." />
        <Row emoji="🎮" name="System of Engagement" desc="how we build community: events, channels, bots." />
        <Row emoji="🫂" name="System of Connection" desc="how we support belonging and mental health: moderation, conflict resolution, identity-based spaces." />
        <Row emoji="🌱" name="System of Empowerment" desc="how we grow youth leaders: Youth Advisory Council, youth moderation, evaluation." />
      </div>
    </div>
  );
}
