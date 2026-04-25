import { useEffect, useState } from "react";
import { Lock, RefreshCw, Phone, Mail as MailIcon, MessageCircle, MapPin } from "lucide-react";
import {
  listConsultations,
  type Consultation,
} from "@workspace/api-client-react";

const TOKEN_KEY = "advocate_admin_token";

export default function Admin() {
  const [token, setToken] = useState<string>("");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      setToken(stored);
      void load(stored);
    }
  }, []);

  const load = async (t: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await listConsultations({
        headers: { "x-admin-token": t },
      });
      setItems(res.items);
      setAuthed(true);
      localStorage.setItem(TOKEN_KEY, t);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load.";
      setError(message);
      setAuthed(false);
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) void load(token.trim());
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setAuthed(false);
    setItems([]);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-card border border-border p-10 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <Lock className="text-secondary" />
            <h1 className="text-2xl font-serif text-primary">Chambers Admin</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Enter your access token to view consultation requests.
          </p>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Access token"
            autoFocus
            className="w-full bg-background border border-border text-primary px-4 py-3 outline-none focus:border-secondary mb-4"
          />
          {error && (
            <p className="text-sm text-red-600 mb-4">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 font-medium tracking-wide hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {loading ? "Verifying…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif">Consultation Requests</h1>
            <p className="text-sm text-primary-foreground/70 mt-1">
              {items.length} {items.length === 1 ? "request" : "requests"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => void load(token)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 border border-primary-foreground/30 hover:border-secondary hover:text-secondary text-sm transition-colors"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs tracking-widest uppercase text-primary-foreground/60 hover:text-secondary transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {items.length === 0 && !loading && (
          <div className="text-center py-20 text-muted-foreground">
            No consultation requests yet.
          </div>
        )}

        <div className="space-y-5">
          {items.map((c) => (
            <ConsultationCard key={c.id} consultation={c} />
          ))}
        </div>
      </main>
    </div>
  );
}

function ConsultationCard({ consultation: c }: { consultation: Consultation }) {
  const created = new Date(c.createdAt);
  const dateStr = created.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const phoneDigits = c.phone.replace(/\D/g, "");
  const waLink = `https://wa.me/${phoneDigits}`;
  const telLink = `tel:${c.phone}`;
  const mailLink = c.email ? `mailto:${c.email}` : null;

  return (
    <article className="bg-card border border-border p-6 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-serif text-primary">{c.fullName}</h2>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
            #{c.id} · {dateStr}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {c.practiceArea && (
            <span className="px-3 py-1 text-xs tracking-wide uppercase bg-secondary/15 text-secondary border border-secondary/30">
              {c.practiceArea}
            </span>
          )}
          {c.preferredContact && (
            <span className="px-3 py-1 text-xs tracking-wide uppercase border border-border text-muted-foreground">
              prefers {c.preferredContact}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-5 text-sm">
        <a href={telLink} className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors">
          <Phone size={14} /> {c.phone}
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors">
          <MessageCircle size={14} /> WhatsApp
        </a>
        {mailLink && (
          <a href={mailLink} className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors">
            <MailIcon size={14} /> {c.email}
          </a>
        )}
        {c.city && (
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <MapPin size={14} /> {c.city}
          </span>
        )}
      </div>

      <div className="border-t border-border pt-4">
        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">
          Matter
        </p>
        <p className="text-primary/90 whitespace-pre-wrap leading-relaxed">{c.matter}</p>
      </div>
    </article>
  );
}
