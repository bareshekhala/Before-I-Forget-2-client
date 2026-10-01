import { useContext } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { AuthContext } from "../context/auth.context";

function UserDashboardPage() {
  const auth = useContext(AuthContext);
  const name = auth?.user?.user_metadata.name || "Gorgeous";
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="mx-auto box-content max-w-295 px-4 pt-4.5 pb-6 lg:px-10 lg:pt-6.5 lg:pb-16">
      <div className="app-backdrop" />

      <h1 className="font-display text-[1.75rem] leading-none font-[740] tracking-[-0.02em] text-ink lg:text-[2.125rem] dark:text-night-ink">
        Hello, {name}
      </h1>
      <p className="text-soft mt-1.5 text-[15px]">{today}</p>

      <div className="glass mt-6.5 grid gap-4 p-5">
        <h2 className="font-display text-2xl leading-tight font-[760] tracking-[-0.015em] text-ink dark:text-night-ink">
          Before I forget...
        </h2>
        <Link
          to="/archive"
          className="btn-primary flex w-fit! items-center gap-2"
        >
          <Plus className="size-5" />
          Add something to your archive
        </Link>
      </div>
    </div>
  );
}

export default UserDashboardPage;
