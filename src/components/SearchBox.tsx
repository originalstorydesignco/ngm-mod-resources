import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import Fuse from "fuse.js";
import { searchIndex, type SearchEntry } from "@/lib/search-index";

export function SearchBox() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // for mobile icon-collapse
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "snippet", weight: 0.25 },
          { name: "keywords", weight: 0.2 },
          { name: "section", weight: 0.05 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [],
  );

  const results = useMemo(() => {
    if (!q.trim()) return [] as SearchEntry[];
    return fuse.search(q, { limit: 10 }).map((r) => r.item);
  }, [q, fuse]);

  useEffect(() => {
    setActiveIdx(0);
  }, [q]);

  // Close when clicking outside.
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        if (!q) setExpanded(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [q]);

  function go(entry: SearchEntry) {
    setOpen(false);
    setQ("");
    setExpanded(false);
    navigate({ to: entry.path });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (results[activeIdx]) {
        e.preventDefault();
        go(results[activeIdx]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Mobile: icon-only until expanded */}
      <div className={`flex items-center ${expanded ? "w-full" : ""}`}>
        <button
          type="button"
          aria-label="Open search"
          onClick={() => {
            setExpanded(true);
            setOpen(true);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
          className={`sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground hover:text-white hover:border-primary ${
            expanded ? "hidden" : ""
          }`}
        >
          <SearchIcon />
        </button>

        <div className={`relative ${expanded ? "block w-full" : "hidden"} sm:block`}>
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Search reference & how-to…"
            aria-label="Search"
            className="h-9 w-full sm:w-64 rounded-md border border-border bg-surface pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {open && q.trim() && (
        <div className="absolute right-0 mt-2 w-[min(28rem,calc(100vw-2rem))] rounded-md border border-border bg-surface shadow-lg z-50 max-h-[70vh] overflow-auto">
          {results.length === 0 ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">No matches.</p>
          ) : (
            <ul>
              {results.map((r, i) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => go(r)}
                    className={`block w-full text-left px-3 py-2 border-b border-border last:border-b-0 ${
                      i === activeIdx ? "bg-card" : ""
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{r.section} · {r.snippet}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
