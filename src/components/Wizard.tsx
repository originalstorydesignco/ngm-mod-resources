import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useRole } from "@/lib/role";

type Answer = { label: string; goto: string };
type QuestionNode = {
  type: "question";
  text: string;
  hint?: string;
  answers: Answer[];
};
type RoleVariant = {
  headline: string;
  steps: string[];
  actions?: { label: string; href: string }[];
};
type EndpointNode = {
  type: "endpoint";
  urgency: "emergency" | "action" | "info";
  headline: string;
  steps: string[];
  actions?: { label: string; href: string }[];
  roleVariants?: { moderator?: RoleVariant };
};
type Node = QuestionNode | EndpointNode;

export type WizardData = {
  id: string;
  title: string;
  intro: {
    description: string;
    standingRules?: string[];
  };
  start: string;
  nodes: Record<string, Node>;
};

type Crumb = { nodeId: string; question: string; answer: string };

export function Wizard({ data }: { data: WizardData }) {
  const [started, setStarted] = useState(false);
  const [currentId, setCurrentId] = useState(data.start);
  const [trail, setTrail] = useState<Crumb[]>([]);

  const current = data.nodes[currentId];

  const reset = () => {
    setStarted(false);
    setCurrentId(data.start);
    setTrail([]);
  };

  if (!started) {
    return <Intro data={data} onStart={() => setStarted(true)} />;
  }

  if (!current) {
    return <p className="p-4">Node not found: {currentId}</p>;
  }

  const answer = (a: Answer) => {
    if (current.type !== "question") return;
    setTrail((t) => [...t, { nodeId: currentId, question: current.text, answer: a.label }]);
    setCurrentId(a.goto);
  };

  const rewindTo = (idx: number) => {
    const crumb = trail[idx];
    setTrail(trail.slice(0, idx));
    setCurrentId(crumb.nodeId);
  };

  const back = () => {
    if (trail.length === 0) {
      reset();
      return;
    }
    const last = trail[trail.length - 1];
    setTrail(trail.slice(0, -1));
    setCurrentId(last.nodeId);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
      {trail.length > 0 && <Breadcrumbs trail={trail} onRewind={rewindTo} />}

      {current.type === "question" ? (
        <QuestionView node={current} onAnswer={answer} />
      ) : (
        <EndpointView node={current} trail={trail} />
      )}

      <div className="mt-8 flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={back}
          className="h-10 px-3 rounded-md border border-border bg-white hover:bg-card"
        >
          ← Back
        </button>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            Start over
          </button>
          <Link to="/" className="text-muted-foreground hover:text-foreground underline underline-offset-2">
            Not the right tool?
          </Link>
        </div>
      </div>
    </div>
  );
}

function Intro({ data, onStart }: { data: WizardData; onStart: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">{data.title}</h1>
      <p className="mt-3 text-base text-foreground/80">{data.intro.description}</p>
      {data.intro.standingRules && data.intro.standingRules.length > 0 && (
        <div className="mt-6 rounded-lg bg-card p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Standing rules
          </h2>
          <ul className="mt-2 space-y-2 text-sm">
            {data.intro.standingRules.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-primary">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={onStart}
        className="mt-8 w-full sm:w-auto h-12 px-6 rounded-md bg-primary text-primary-foreground font-medium"
      >
        Start
      </button>
    </div>
  );
}

function Breadcrumbs({ trail, onRewind }: { trail: Crumb[]; onRewind: (i: number) => void }) {
  return (
    <nav aria-label="Answer trail" className="mb-6 -mx-4 px-4 overflow-x-auto">
      <ol className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
        {trail.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onRewind(i)}
              className="rounded-full bg-card px-2 py-1 hover:bg-primary/10 text-foreground/80"
              title="Rewind to this question"
            >
              <span className="text-muted-foreground">{shortQ(c.question)}</span>{" "}
              <span className="font-medium">{c.answer}</span>
            </button>
            {i < trail.length - 1 && <span aria-hidden className="text-muted-foreground">·</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function shortQ(q: string) {
  // Trim to first sentence-ish for the crumb
  const stripped = q.replace(/[?.!]$/, "");
  const short = stripped.length > 40 ? stripped.slice(0, 38) + "…" : stripped;
  return short + ":";
}

function QuestionView({ node, onAnswer }: { node: QuestionNode; onAnswer: (a: Answer) => void }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <div>
      <h1 className="font-display text-[28px] leading-tight sm:text-[32px] font-semibold">
        {node.text}
      </h1>
      {node.hint && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            aria-expanded={showHint}
            className="text-sm text-primary underline underline-offset-2"
          >
            {showHint ? "Hide" : "What counts?"}
          </button>
          {showHint && <p className="mt-2 text-sm text-foreground/80">{node.hint}</p>}
        </div>
      )}
      <div className="mt-6 space-y-3">
        {node.answers.map((a, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onAnswer(a)}
            className="w-full min-h-12 px-4 py-3 rounded-lg border border-border bg-white text-left text-base font-medium hover:border-primary hover:bg-primary/5 transition-colors"
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EndpointView({ node, trail }: { node: EndpointNode; trail: Crumb[] }) {
  const { role } = useRole();
  const modVariant = node.roleVariants?.moderator;
  const showModPrimary = role === "moderator" && modVariant;

  const primaryHeadline = showModPrimary ? modVariant!.headline : node.headline;
  const primarySteps = showModPrimary ? modVariant!.steps : node.steps;
  const primaryActions = showModPrimary ? modVariant!.actions ?? [] : node.actions ?? [];

  const [showRecap, setShowRecap] = useState(false);
  const [showFacBelow, setShowFacBelow] = useState(false);

  const urgencyClass =
    node.urgency === "emergency"
      ? "bg-accent text-accent-foreground"
      : node.urgency === "action"
        ? showModPrimary
          ? "bg-mod text-mod-foreground"
          : "bg-primary text-primary-foreground"
        : "bg-card text-foreground";

  const actionBtnClass =
    node.urgency === "action" && showModPrimary
      ? "inline-flex items-center justify-center min-h-12 px-4 rounded-md border-2 border-mod text-mod-foreground bg-mod/10 font-medium hover:bg-mod hover:text-mod-foreground transition-colors"
      : "inline-flex items-center justify-center min-h-12 px-4 rounded-md border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors";

  return (
    <div>
      <div className={`rounded-lg px-4 py-4 ${urgencyClass}`}>
        <p className="text-xs uppercase tracking-wide opacity-80">
          {node.urgency === "emergency" ? "Emergency" : node.urgency === "action" ? "Do this" : "For your info"}
        </p>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-semibold">{primaryHeadline}</h1>
      </div>

      <ol className="mt-6 space-y-3">
        {primarySteps.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span
              aria-hidden
              className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-card text-sm font-semibold"
            >
              {i + 1}
            </span>
            <p className="pt-0.5 text-base">{s}</p>
          </li>
        ))}
      </ol>

      {primaryActions.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          {primaryActions.map((a, i) => (
            <a
              key={i}
              href={a.href}
              className="inline-flex items-center justify-center min-h-12 px-4 rounded-md border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {a.label}
            </a>
          ))}
        </div>
      )}

      {showModPrimary && (
        <div className="mt-6 rounded-lg border border-border bg-white">
          <button
            type="button"
            onClick={() => setShowFacBelow((v) => !v)}
            aria-expanded={showFacBelow}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
          >
            <span className="text-sm font-medium">What the Facilitator will do</span>
            <span aria-hidden className="text-muted-foreground">{showFacBelow ? "−" : "+"}</span>
          </button>
          {showFacBelow && (
            <div className="px-4 pb-4 border-t border-border">
              <p className="mt-3 font-semibold">{node.headline}</p>
              <ol className="mt-3 space-y-2 text-sm">
                {node.steps.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-muted-foreground">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {trail.length > 0 && (
        <div className="mt-6 rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setShowRecap((v) => !v)}
            aria-expanded={showRecap}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
          >
            <span className="text-sm font-medium text-muted-foreground">Why this path</span>
            <span aria-hidden className="text-muted-foreground">{showRecap ? "−" : "+"}</span>
          </button>
          {showRecap && (
            <ul className="px-4 pb-4 space-y-2 text-sm border-t border-border pt-3">
              {trail.map((c, i) => (
                <li key={i}>
                  <span className="text-muted-foreground">{c.question}</span>{" "}
                  <span className="font-medium">{c.answer}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
