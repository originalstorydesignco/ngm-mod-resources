import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({
    meta: [{ title: "Account — NGM Alliance Mod Resources" }],
  }),
});

type Toast = { kind: "success" | "error"; text: string };

function AccountPage() {
  const { user, accountRole, loading, session, signOut } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  if (loading) {
    return <div className="mx-auto max-w-2xl px-4 py-10">Loading…</div>;
  }
  if (!session || !user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p>You need to sign in.</p>
        <Link to="/" className="mt-4 inline-block text-primary underline">
          Home →
        </Link>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    if (next.length < 8) {
      setToast({ kind: "error", text: "New password must be at least 8 characters." });
      return;
    }
    if (next !== confirm) {
      setToast({ kind: "error", text: "New password and confirmation don’t match." });
      return;
    }
    if (!user.email) {
      setToast({ kind: "error", text: "No email on this account." });
      return;
    }
    setBusy(true);

    // Verify current password by re-signing-in (Supabase has no verify-password RPC).
    const { error: verifyErr } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: current,
    });
    if (verifyErr) {
      setBusy(false);
      setToast({ kind: "error", text: "Current password is incorrect." });
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: next });
    setBusy(false);
    if (error) {
      setToast({ kind: "error", text: error.message });
      return;
    }
    setCurrent("");
    setNext("");
    setConfirm("");
    setToast({ kind: "success", text: "Password updated." });
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-10">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold">Account</h1>

      <section className="mt-6 rounded-lg border border-border bg-card p-4">
        <dl className="grid grid-cols-3 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Email</dt>
          <dd className="col-span-2 font-medium">{user.email}</dd>
          <dt className="text-muted-foreground">Role</dt>
          <dd className="col-span-2 font-medium capitalize">
            {accountRole ?? "—"}
          </dd>
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Change password</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your current password, then choose a new one.
        </p>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <label className="block text-sm">
            <span className="text-muted-foreground">Current password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="mt-1 w-full h-11 rounded-md border border-border bg-surface px-3 text-foreground focus:border-primary focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">New password</span>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className="mt-1 w-full h-11 rounded-md border border-border bg-surface px-3 text-foreground focus:border-primary focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Confirm new password</span>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full h-11 rounded-md border border-border bg-surface px-3 text-foreground focus:border-primary focus:outline-none"
            />
          </label>

          {toast && (
            <p
              className={`text-sm ${
                toast.kind === "success" ? "text-primary" : "text-accent"
              }`}
              role="status"
            >
              {toast.text}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="h-11 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Updating…" : "Update password"}
          </button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground">
          Locked out of your account? Use{" "}
          <Link to="/reset-password" className="underline">
            Reset password
          </Link>{" "}
          instead — that sends a link to your email.
        </p>
      </section>

      <section className="mt-10 border-t border-border pt-6">
        <button
          type="button"
          onClick={() => signOut()}
          className="h-10 rounded-md border border-border bg-surface px-4 text-sm font-medium hover:bg-card"
        >
          Sign out
        </button>
      </section>
    </div>
  );
}
