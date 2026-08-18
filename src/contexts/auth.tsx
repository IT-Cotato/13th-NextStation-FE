import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getAccessToken,
  restoreAccessToken,
  subscribeToAccessTokenChange,
} from "@/api/auth";

export type AuthStatus = "checking" | "authenticated" | "guest";

export interface AuthContextValue {
  status: AuthStatus;
  isLoggedIn: boolean;
  isChecking: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(() =>
    getAccessToken() ? "authenticated" : "checking",
  );

  useEffect(() => {
    let isCancelled = false;

    const syncStatus = (token: string | null) => {
      if (isCancelled) {
        return;
      }

      setStatus(token ? "authenticated" : "guest");
    };

    const unsubscribe = subscribeToAccessTokenChange(syncStatus);

    void restoreAccessToken().then(syncStatus);

    return () => {
      isCancelled = true;
      unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      isLoggedIn: status === "authenticated",
      isChecking: status === "checking",
    }),
    [status],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
