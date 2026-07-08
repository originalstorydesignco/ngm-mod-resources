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
    </div>
  );
}

