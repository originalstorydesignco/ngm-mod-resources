import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "facilitator" | "moderator";

type Ctx = {
  role: Role;
  setRole: (r: Role) => void;
  hydrated: boolean;
};

const RoleContext = createContext<Ctx | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("facilitator");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("ngma:role");
      if (v === "moderator" || v === "facilitator") setRoleState(v);
    } catch {}
    setHydrated(true);
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    try {
      localStorage.setItem("ngma:role", r);
    } catch {}
  };

  return <RoleContext.Provider value={{ role, setRole, hydrated }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside RoleProvider");
  return ctx;
}
