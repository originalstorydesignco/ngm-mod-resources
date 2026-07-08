import { Link } from "@tanstack/react-router";

export function Placeholder({ title, kind = "page" }: { title: string; kind?: string }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{kind}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">{title}</h1>
      <p className="mt-4 text-foreground/80">
        Coming soon — this section will land in a later update. For now, head back and use the tools that are live.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center h-12 px-4 rounded-md bg-primary text-primary-foreground font-medium"
      >
        Back to start
      </Link>
    </div>
  );
}
