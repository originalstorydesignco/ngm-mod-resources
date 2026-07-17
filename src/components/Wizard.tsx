import { useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { useRole } from "@/lib/role";

type Answer = { label: string; goto: string };
type Action = { label: string; href: string };
type Hint = string | { label: string; body: string };

type QuestionNode = {
  type: "question";
  text: string;
  hint?: Hint;
  note?: string;
  roleNote?: string;
  answers: Answer[];
};


type StepNode = {
  type: "step";
  urgency?: "emergency" | "action" | "info";
  headline: string;
  steps: string[];
  roleNote?: string;
  continueLabel: string;
  goto: string;
};

type RoleVariant = {
  headline: string;
  steps: string[];
  actions?: Action[];
};

type EndpointNode = {
  type: "endpoint";
  urgency: "emergency" | "action" | "info";
  category?: string;
  headline: string;
  steps: string[];
  actions?: Action[];
  roleNote?: string;
  closeout?: boolean;
  roleVariants?: { moderator?: RoleVariant };
};

type Node = QuestionNode | StepNode | EndpointNode;

type Closeout = {
  title: string;
  steps: string[];
  actions?: Action[];
};

export type WizardData = {
  id: string;
  title: string;
  intro: {
    description: string;
    standingRules?: string[];
    roleVariants?: { moderator?: { banner: string } };
  };
  closeout?: Closeout;
  start: string;
  nodes: Record<string, Node>;
};

type Crumb = { nodeId: string; kind: "question" | "step"; label: string; value: string };

export function Wizard({ data }: { data: WizardData }) {
  const search = useSearch({ strict: false }) as { start?: string };
  const startOverride = search?.start && data.nodes[search.start] ? search.start : undefined;
  const [started, setStarted] = useState(!!startOverride);
  const [currentId, setCurrentId] = useState(startOverride ?? data.start);
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
    setTrail((t) => [...t, { nodeId: currentId, kind: "question", label: current.text, value: a.label }]);
    setCurrentId(a.goto);
  };

  const continueStep = () => {
    if (current.type !== "step") return;
    setTrail((t) => [...t, { nodeId: currentId, kind: "step", label: current.headline, value: "Step done" }]);
    setCurrentId(current.goto);
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
      ) : current.type === "step" ? (
        <StepView node={current} onContinue={continueStep} />
      ) : (
        <EndpointView node={current} trail={trail} closeout={data.closeout} />
      )}

      <div className="mt-8 flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={back}
          className="h-10 px-3 rounded-md border border-border bg-surface hover:bg-card"
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
  const { role } = useRole();
  const banner = data.intro.roleVariants?.moderator?.banner;
  const showBanner = role === "moderator" && banner;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">{data.title}</h1>
      <p className="mt-3 text-base text-foreground/80">{data.intro.description}</p>

      {showBanner && (
        <div className="mt-5 rounded-lg border-l-4 border-mod bg-mod/15 px-4 py-3 text-[15px] text-foreground">
          {banner}
        </div>
      )}

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

      <p className="mt-6 text-sm text-muted-foreground">
        When in doubt, it’s not yours to carry alone — ping @Facilitators.
      </p>
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
              title="Rewind to this step"
            >
              {c.kind === "step" ? (
                <>
                  <span className="text-muted-foreground">Step:</span>{" "}
                  <span className="font-medium">{shortText(c.label)}</span>
                </>
              ) : (
                <>
                  <span className="text-muted-foreground">{shortQ(c.label)}</span>{" "}
                  <span className="font-medium">{c.value}</span>
                </>
              )}
            </button>
            {i < trail.length - 1 && <span aria-hidden className="text-muted-foreground">·</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function shortQ(q: string) {
  const stripped = q.replace(/[?.!]$/, "");
  const short = stripped.length > 40 ? stripped.slice(0, 38) + "…" : stripped;
  return short + ":";
}
function shortText(s: string) {
  return s.length > 40 ? s.slice(0, 38) + "…" : s;
}

function RoleNote({ note }: { note: string }) {
  const { role } = useRole();
  if (role !== "moderator") return null;
  return (
    <div className="mt-4 rounded-md border-l-4 border-mod bg-mod/15 px-3 py-2 text-sm text-foreground">
      {note}
    </div>
  );
}

function QuestionView({ node, onAnswer }: { node: QuestionNode; onAnswer: (a: Answer) => void }) {
  const [showHint, setShowHint] = useState(false);
  const hintLabel =
    typeof node.hint === "string" ? "What counts?" : node.hint?.label ?? "What counts?";
  const hintBody = typeof node.hint === "string" ? node.hint : node.hint?.body;

  return (
    <div>
      <h1 className="font-display text-[28px] leading-tight sm:text-[32px] font-semibold">
        {node.text}
      </h1>
      {node.hint && (
        <div className="mt-4 rounded-lg border border-border bg-card">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            aria-expanded={showHint}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
          >
            <span className="text-sm font-medium">{hintLabel}</span>
            <span aria-hidden className="text-muted-foreground">{showHint ? "−" : "+"}</span>
          </button>
          {showHint && (
            <p className="px-4 pb-4 border-t border-border pt-3 text-sm text-foreground/80">
              {hintBody}
            </p>
          )}
        </div>
      )}
      {node.note && (
        <div className="mt-4 rounded-md border-l-4 border-[#5865F2] bg-card px-4 py-3 text-sm text-foreground/85">
          {node.note}
        </div>
      )}
      {node.roleNote && <RoleNote note={node.roleNote} />}
      <div className="mt-6 space-y-3">

        {node.answers.map((a, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onAnswer(a)}
            className="w-full min-h-12 px-4 py-3 rounded-lg border border-border bg-surface text-left text-base font-medium hover:border-primary hover:bg-primary/5 transition-colors"
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepView({ node, onContinue }: { node: StepNode; onContinue: () => void }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const urgency = node.urgency ?? "info";
  const urgencyClass =
    urgency === "emergency"
      ? "bg-accent text-accent-foreground"
      : urgency === "action"
        ? "bg-primary text-primary-foreground"
        : "bg-card text-foreground";

  return (
    <div>
      <div className={`rounded-lg px-4 py-4 ${urgencyClass}`}>
        <p className="text-xs uppercase tracking-wide opacity-80">Do this, then continue</p>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-semibold">{node.headline}</h1>
      </div>

      <ul className="mt-6 space-y-3">
        {node.steps.map((s, i) => (
          <li key={i}>
            <label className="flex gap-3 items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={(e) => setChecked((c) => ({ ...c, [i]: e.target.checked }))}
                className="mt-1.5 h-4 w-4 flex-none appearance-none rounded border border-border bg-surface checked:bg-muted-foreground/50 checked:border-muted-foreground/50 group-hover:border-muted-foreground focus:outline-none"
              />
              <span className={`text-base ${checked[i] ? "text-muted-foreground line-through" : ""}`}>
                {s}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {node.roleNote && <RoleNote note={node.roleNote} />}

      <button
        type="button"
        onClick={onContinue}
        className="mt-8 w-full sm:w-auto h-12 px-6 rounded-md bg-primary text-primary-foreground font-medium"
      >
        {node.continueLabel}
      </button>
    </div>
  );
}

function EndpointView({
  node,
  trail,
  closeout,
}: {
  node: EndpointNode;
  trail: Crumb[];
  closeout?: Closeout;
}) {
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
            <a key={i} href={a.href} className={actionBtnClass}>
              {a.label}
            </a>
          ))}
        </div>
      )}

      {node.roleNote && <RoleNote note={node.roleNote} />}

      {showModPrimary && (
        <div className="mt-6 rounded-lg border border-border bg-surface">
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

      {node.closeout && closeout && (
        <section className="mt-8 rounded-lg border border-border bg-card p-4">
          <h2 className="font-display text-lg font-semibold">{closeout.title}</h2>
          <ol className="mt-3 space-y-3">
            {closeout.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-surface text-xs font-semibold"
                >
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm">{s}</p>
              </li>
            ))}
          </ol>
          {closeout.actions && closeout.actions.length > 0 && (
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              {closeout.actions.map((a, i) => (
                <a
                  key={i}
                  href={a.href}
                  className="inline-flex items-center justify-center min-h-11 px-4 rounded-md border border-border bg-surface text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {a.label}
                </a>
              ))}
            </div>
          )}
        </section>
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
                  {c.kind === "step" ? (
                    <>
                      <span className="text-muted-foreground">Step:</span>{" "}
                      <span className="font-medium">{c.label}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-muted-foreground">{c.label}</span>{" "}
                      <span className="font-medium">{c.value}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
