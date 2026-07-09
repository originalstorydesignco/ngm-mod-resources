import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AiInvolvementModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          style={{ backgroundColor: "#5865F2" }}
        >
          How AI was involved in making this →
        </button>
      </DialogTrigger>
      <DialogContent className="border-border bg-card text-foreground sm:rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">✓ Verified human</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <p className="text-sm text-foreground/85 leading-relaxed">
            This portal was designed with help from AI. Claude was used to draft the build
            prompts and Lovable was used to assemble the web portal. The
            frameworks, decision tools, procedures, and safeguarding practices were—and continue to be—created by the Next Gen Men team.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
