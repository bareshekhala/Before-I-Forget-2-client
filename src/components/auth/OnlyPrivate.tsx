import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../context/auth.context";

function OnlyPrivate({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);

  if (auth?.isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default OnlyPrivate;