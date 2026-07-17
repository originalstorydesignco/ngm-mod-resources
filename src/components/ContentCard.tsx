import type { Card } from "@/lib/content";
import { useAuth } from "@/lib/auth";
import { CardAdminActions } from "@/components/admin/CardEditor";

export function ContentCard({
  card,
  sections,
  showSection,
}: {
  card: Card;
  sections?: string[];
  showSection?: boolean;
}) {
  const { isAdmin } = useAuth();
  const isExternal = card.arrow === "external";
  const isCritical = card.variant === "critical";
  const isMod = card.variant === "mod";

  const borderClass = isCritical
    ? "border-primary"
    : isMod
      ? "border-border hover:border-mod"
      : "border-border hover:border-primary";
  const dotClass = isCritical
    ? "bg-primary"
    : isMod
      ? "bg-muted-foreground/40 group-hover:bg-mod"
      : "bg-muted-foreground/40 group-hover:bg-primary";
  const ctaClass = isMod
    ? "mt-auto pt-4 text-sm font-medium text-mod"
    : "mt-auto pt-4 text-sm font-medium text-primary";

  const externalProps = isExternal
    ? { target: "_blank" as const, rel: "noreferrer" as const }
    : {};

  return (
    <a
      href={card.href}
      {...externalProps}
      className={`group relative flex h-full flex-col rounded-xl border ${borderClass} bg-surface p-5 hover:shadow-sm transition-all`}
    >
      {isAdmin && (
        <CardAdminActions card={card} sections={sections} showSection={showSection} />
      )}
      <div className="flex items-start gap-2">
        <span
          aria-hidden
          className={`mt-2 h-2.5 w-2.5 flex-none rounded-full transition-colors ${dotClass}`}
        />
        <h2 className="font-display text-xl font-semibold leading-snug">{card.title}</h2>
      </div>
      <p className="mt-2 text-sm text-foreground/75">{card.caption}</p>
      <p className={ctaClass}>{card.cta_label}</p>
    </a>
  );
}
