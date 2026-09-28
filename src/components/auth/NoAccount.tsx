import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../context/auth.context";

function NoAccount({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);

  if (!auth?.isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}

export default NoAccount;