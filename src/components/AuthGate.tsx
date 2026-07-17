import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

type Mode = "signin" | "signup" | "reset";

const NOT_ALLOWLISTED = "This portal is invite-only — ask a Facilitator to add you.";

export function AuthGate({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (loading) return null;
  if (session) return <>{children}</>;

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (error) throw error;
      } else if (mode === "signup") {
        // Pre-check allowlist for a friendlier error (RLS blocks reads when
        // signed out, so the trigger is the real gate — but we still surface
        // the friendly message when the trigger rejects).
        const { error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) {
          if (
            /not_allowlisted|check_violation|Database error saving new user/i.test(
              error.message,
            )
          ) {
            throw new Error(NOT_ALLOWLISTED);
          }
          throw error;
        }
        setInfo("Account created — you're signed in.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setInfo("If that email is registered, a reset link is on its way.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <form onSubmit={handle} className="w-full max-w-sm space-y-4">
        <div>
          <h1 className="font-display text-2xl font-bold">NGM Alliance Mod Resources</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "signin" && "Sign in to continue."}
            {mode === "signup" && "First time? Create your account with an invited email."}
            {mode === "reset" && "Enter your email to get a reset link."}
          </p>
        </div>

        <input
          type="email"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 px-3 rounded-md border border-input bg-surface focus:outline-none focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]"
          placeholder="you@nextgenmen.ca"
        />

        {mode !== "reset" && (
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-3 rounded-md border border-input bg-surface focus:outline-none focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]"
            placeholder="Password"
          />
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}
        {info && <p className="text-sm text-foreground/80">{info}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full h-12 rounded-md text-white font-semibold disabled:opacity-60"
          style={{ backgroundColor: "#5865F2" }}
        >
          {busy
            ? "Working…"
            : mode === "signin"
              ? "Sign in"
              : mode === "signup"
                ? "Create account"
                : "Send reset link"}
        </button>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          {mode !== "signin" && (
            <button type="button" onClick={() => { setMode("signin"); setError(null); setInfo(null); }} className="hover:text-white">
              Sign in
            </button>
          )}
          {mode !== "signup" && (
            <button type="button" onClick={() => { setMode("signup"); setError(null); setInfo(null); }} className="hover:text-white">
              First-time sign up
            </button>
          )}
          {mode !== "reset" && (
            <button type="button" onClick={() => { setMode("reset"); setError(null); setInfo(null); }} className="hover:text-white">
              Forgot password
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
