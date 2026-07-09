import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useRole } from "@/lib/role";
import { SearchBox } from "@/components/SearchBox";
import { AiInvolvementModal } from "@/components/AiInvolvementModal";



function EmergencyBanner() {
  return (
    <div className="bg-accent text-accent-foreground text-sm">
      <div className="mx-auto max-w-5xl px-4 py-2">
        Someone in immediate physical danger?{" "}
        <a href="tel:911" className="font-bold underline underline-offset-2">
          Call 911 first.
        </a>{" "}
        Discord can’t dispatch help.
      </div>
    </div>
  );
}

function RoleToggle() {
  const { role, setRole } = useRole();
  const isFac = role === "facilitator";
  return (
    <div
      role="radiogroup"
      aria-label="Your role"
      className="inline-flex rounded-full border border-border bg-surface p-1 text-sm"
    >
      <button
        role="radio"
        aria-checked={isFac}
        onClick={() => setRole("facilitator")}
        className={`px-3 h-9 rounded-full font-medium transition-colors ${
          isFac ? "bg-primary text-primary-foreground" : "text-foreground/70"
        }`}
      >
        Facilitator
      </button>
      <button
        role="radio"
        aria-checked={!isFac}
        onClick={() => setRole("moderator")}
        className={`px-3 h-9 rounded-full font-medium transition-colors ${
          !isFac ? "bg-mod text-mod-foreground" : "text-foreground/70"
        }`}
      >
        Moderator
      </button>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-5xl px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
        <Link to="/" className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap inline-flex items-center gap-2">
          NGM Alliance{" "}
          <span className="inline-flex items-center rounded-full bg-[#5865F2] text-white font-semibold text-sm px-2.5 py-0.5 align-middle">
            Mod Resources
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm order-3 sm:order-2 w-full sm:w-auto">
          <Link
            to="/"
            className="px-3 py-2 rounded-md text-muted-foreground font-semibold hover:bg-card hover:text-white"
            activeOptions={{ exact: true }}
            activeProps={{ className: "px-3 py-2 rounded-md bg-card font-semibold text-white" }}
          >
            Decide
          </Link>
          <Link
            to="/reference"
            className="px-3 py-2 rounded-md text-muted-foreground font-semibold hover:bg-card hover:text-white"
            activeProps={{ className: "px-3 py-2 rounded-md bg-card font-semibold text-white" }}
          >
            Reference
          </Link>
          <Link
            to="/how-to"
            className="px-3 py-2 rounded-md text-muted-foreground font-semibold hover:bg-card hover:text-white"
            activeProps={{ className: "px-3 py-2 rounded-md bg-card font-semibold text-white" }}
          >
            How-to
          </Link>
        </nav>
        <div className="order-2 sm:order-3 flex items-center gap-2">
          <SearchBox />
          <RoleToggle />
        </div>

      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <span>Next Gen Men · NGM Alliance Mod Resources</span>
        <span>Last updated July 8, 2026</span>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <EmergencyBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
