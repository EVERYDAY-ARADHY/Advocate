import { useEffect, useState, useMemo } from "react";
import { Search, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { practiceAreas, searchPracticeAreas } from "@/data/practice-areas";
import { smoothScrollTo } from "@/lib/smooth-scroll";

interface PracticeSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const POPULAR_SUGGESTIONS = [
  "Bail",
  "Divorce",
  "FIR Quashing",
  "Cheque Bounce",
  "Will",
  "498A",
  "Maintenance",
  "Property",
];

export function PracticeSearch({ open, onOpenChange }: PracticeSearchProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setQuery(""), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  const results = useMemo(() => searchPracticeAreas(query), [query]);

  const scrollToArea = (areaId: string) => {
    onOpenChange(false);
    setTimeout(() => {
      const section = document.getElementById("practice-areas");
      if (section) smoothScrollTo(section, -80);
      setTimeout(() => {
        const el = document.querySelector(`[data-area-id="${areaId}"]`);
        if (el && "click" in el) {
          const isOpen = (el as HTMLElement).getAttribute("aria-expanded") === "true";
          if (!isOpen) (el as HTMLElement).click();
        }
      }, 900);
    }, 150);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-background border-border overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Legal Services</DialogTitle>
          <DialogDescription>
            Search across practice areas to see if a matter is handled.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center border-b border-border px-5 py-4">
          <Search className="text-muted-foreground shrink-0" size={20} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search a matter — e.g. "bail", "divorce", "cheque bounce"'
            className="ml-3 flex-1 bg-transparent text-base text-primary placeholder:text-muted-foreground/70 outline-none font-sans"
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!query.trim() && (
            <div className="p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {POPULAR_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1.5 text-sm border border-border bg-card hover:border-primary hover:text-primary text-muted-foreground transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">
                Browse Practice Areas
              </p>
              <div className="space-y-1">
                {practiceAreas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => scrollToArea(area.id)}
                    className="w-full text-left flex items-center justify-between px-4 py-3 hover:bg-card border border-transparent hover:border-border transition-colors group"
                  >
                    <span className="font-serif text-primary text-lg">
                      {area.name}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground group-hover:text-secondary transition-colors"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-muted-foreground mb-2">
                No direct match for{" "}
                <span className="font-semibold text-primary">"{query}"</span>
              </p>
              <p className="text-sm text-muted-foreground/80">
                For matters not listed here, please reach out directly — many
                allied matters are still handled.
              </p>
              <button
                onClick={() => {
                  onOpenChange(false);
                  setTimeout(() => {
                    smoothScrollTo("#contact", -80);
                  }, 150);
                }}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Get in Touch <ArrowRight size={14} />
              </button>
            </div>
          )}

          {query.trim() && results.length > 0 && (
            <div className="p-3">
              <p className="px-3 py-2 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                {results.length} {results.length === 1 ? "match" : "matches"}{" "}
                found
              </p>
              <div className="space-y-1">
                {results.map((r, i) => (
                  <button
                    key={`${r.area.id}-${i}`}
                    onClick={() => scrollToArea(r.area.id)}
                    className="w-full text-left flex items-center justify-between gap-4 px-4 py-3 hover:bg-card border border-transparent hover:border-border transition-colors group"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-primary truncate">
                        {highlightMatch(r.service, query)}
                      </p>
                      <p className="text-xs tracking-wide uppercase text-muted-foreground mt-0.5">
                        in {r.area.name}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground group-hover:text-secondary transition-colors shrink-0"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-border bg-card text-xs text-muted-foreground">
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px] font-mono">
            Esc
          </kbd>{" "}
          to close
        </div>
      </DialogContent>
    </Dialog>
  );
}

function highlightMatch(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-secondary/30 text-primary px-0.5 rounded-sm">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}
