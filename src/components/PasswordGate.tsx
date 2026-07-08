import { useEffect, useState, type ReactNode } from "react";

const PASSWORD = "changeme-later";
const KEY = "ngma:unlocked";

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(KEY) === "1");
    } catch {
      setUnlocked(true);
    }
  }, []);

  if (unlocked === null) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value === PASSWORD) {
            try {
              localStorage.setItem(KEY, "1");
            } catch {}
            setUnlocked(true);
          } else {
            setError(true);
          }
        }}
        className="w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold">Staff hub</h1>
        <p className="text-sm text-muted-foreground">Enter the shared password to continue.</p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          className="w-full h-12 px-3 rounded-md border border-input bg-white"
          placeholder="Password"
        />
        {error && <p className="text-sm text-destructive">That’s not it — try again.</p>}
        <button
          type="submit"
          className="w-full h-12 rounded-md bg-primary text-primary-foreground font-medium"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
