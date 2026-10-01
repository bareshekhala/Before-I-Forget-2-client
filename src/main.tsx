import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthWrapper } from "./context/auth.context.tsx";
import { ThemeWrapper } from "./context/theme.context.tsx";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeWrapper>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </ThemeWrapper>
  </BrowserRouter>,
);
