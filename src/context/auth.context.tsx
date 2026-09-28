// Context => shares "who is logged in" with the whole app
import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/superBaseClient";
import Loader from "../components/Loader";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
};

// Context => shares "who is logged in" with the whole app
const AuthContext = createContext<AuthContextType | null>(null);

// Wrapper => holds the logged-in user and gives it to every page / component
function AuthWrapper({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isVerifyingUser, setIsVerifyingUser] = useState(true);

  useEffect(() => {
    // is there a saved session in this browser?
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsVerifyingUser(false);
    });

    // after that supabase tells us about every login, logout and token refresh
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const passedContext: AuthContextType = {
    user: session?.user ?? null,
    session,
    isLoggedIn: session !== null,
    logout,
  };

  if (isVerifyingUser) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={passedContext}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };