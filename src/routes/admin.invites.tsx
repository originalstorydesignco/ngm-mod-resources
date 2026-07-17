import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/invites")({
  component: AdminInvites,
  head: () => ({ meta: [{ title: "Invite people — NGM Alliance Mod Resources" }] }),
});

type Row = { email: string; role: "admin" | "staff"; invited_at: string };

function AdminInvites() {
  const { isAdmin, loading, accountRole } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "staff">("staff");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("allowlist")
      .select("*")
      .order("invited_at", { ascending: false });
    if (error) setError(error.message);
    else setRows((data ?? []) as Row[]);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  if (loading || accountRole === null) {
    return <div className="mx-auto max-w-3xl px-4 py-8 text-muted-foreground">Loading…</div>;
  }
  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-display text-2xl font-bold">Admins only</h1>
        <p className="mt-2 text-foreground/80">
          You need an admin account to manage invites.{" "}
          <Link to="/" className="text-primary underline">Go home →</Link>
        </p>
      </div>
    );
  }

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error } = await supabase
      .from("allowlist")
      .insert({ email: email.trim().toLowerCase(), role });
    setBusy(false);
    if (error) return setError(error.message);
    setEmail("");
    setRole("staff");
    load();
  };

  const remove = async (targetEmail: string) => {
    const { error } = await supabase.from("allowlist").delete().eq("email", targetEmail);
    if (error) setError(error.message);
    else load();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Invite people</h1>
      <p className="mt-2 text-foreground/80">
        Emails on this list can create an account. The role assigned here is copied to their account on first sign-up.
      </p>

      <form onSubmit={add} className="mt-6 flex flex-wrap gap-2 items-end">
        <div className="flex-1 min-w-[220px]">
          <label className="block text-sm text-muted-foreground mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-3 rounded-md border border-input bg-surface focus:outline-none focus:border-[#5865F2] focus:ring-2 focus:ring-[#5865F2]"
            placeholder="person@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "staff")}
            className="h-11 px-3 rounded-md border border-input bg-surface"
          >
            <option value="staff">staff</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="h-11 px-4 rounded-md text-white font-semibold disabled:opacity-60"
          style={{ backgroundColor: "#5865F2" }}
        >
          {busy ? "Adding…" : "Add"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <div className="mt-8 rounded-lg border border-border bg-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-card text-left">
            <tr>
              <th className="px-4 py-2 font-semibold">Email</th>
              <th className="px-4 py-2 font-semibold">Role</th>
              <th className="px-4 py-2 font-semibold">Invited</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.email} className="border-t border-border">
                <td className="px-4 py-2">{r.email}</td>
                <td className="px-4 py-2">{r.role}</td>
                <td className="px-4 py-2 text-muted-foreground">
                  {new Date(r.invited_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => remove(r.email)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                  No one on the allowlist yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
