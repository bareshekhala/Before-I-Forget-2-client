import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { Archive, ChartColumn, SearchIcon, House, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo.svg";
import logoNight from "../assets/logo-night.svg";
import { ThemeContext } from "@/context/theme.context";
function Navbar() {
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (auth) {
      await auth.logout();
      navigate("/login");
    }
  };

  const theLogoPart = (
    <NavLink
      to="/"
      className="inline-flex items-center gap-2.5 rounded-lg px-1.5 py-1 text-ink dark:text-night-ink"
    >
      <img src={logo} className="h-6 w-auto dark:hidden" />
      <img src={logoNight} className="hidden h-6 w-auto dark:block" />
      <span className="font-display text-xl leading-none font-[760] tracking-[-0.01em] whitespace-nowrap font-stretch-92%">
        Before I Forget
      </span>
    </NavLink>
  );
  //this part is identical in small and big screens
  const links = [
  { to: "/", label: "Home", icon: <House /> },
  { to: "/discover", label: "Discover", icon: <SearchIcon /> },
  { to: "/archive", label: "Archive", icon: <Archive /> },
  { to: "/chart", label: "Mood chart", icon: <ChartColumn /> },
];

const themeButton = (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    onClick={theme?.toggleTheme}
    title="Day or night"
    className="text-soft"
  >
    {theme?.isDark ? <Sun /> : <Moon />}
  </Button>
);

  return (
    <>
      <div className="glass sticky top-3 m-3 mr-0 hidden h-[calc(100svh-1.5rem)] w-60 shrink-0 flex-col gap-5.5 px-3.5 pt-5 pb-4 lg:flex">
        {theLogoPart}
        <nav className="grid gap-0.5">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className="nav-link">
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2.5 border-t border-ink/10 px-1.5 pt-3.5 dark:border-white/10">
          {themeButton}
          {auth?.user ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Log out"
              title="Log out"
              className="text-soft"
            >
              <LogOut />
              
            </Button>
          ) : (
            <NavLink
              to="/login"
              className="btn-primary flex items-center justify-center"
            >
              Log in
            </NavLink>
          )}
        </div>
      </div>

      {/* small screens */}
      <header className="flex items-center justify-between px-4 pt-4 lg:hidden">
        {theLogoPart}
        <div className="flex items-center gap-1">
          {themeButton}
          {auth?.user ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Log out"
              title="Log out"
              className="text-soft"
            >
              <LogOut />
            </Button>
          ) : (
            <NavLink to="/login" className="text-link">
              Log in
            </NavLink>
          )}
        </div>
      </header>

      <nav
        className="glass fixed inset-x-2.5 bottom-[calc(0.625rem+env(safe-area-inset-bottom))] z-30 grid grid-cols-4 p-1.5 lg:hidden"
      >
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className="tab-link">
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default Navbar;

