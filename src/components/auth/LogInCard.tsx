import { useState} from "react";
import { supabase } from "../../lib/superBaseClient";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { CircleAlert, LoaderCircle } from "lucide-react";

function LogInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();


  const handleLogin = async (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setBusy(false);

      if (error) {
        setErrorMessage(error.message);
        return;
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      setBusy(false);
      setErrorMessage("Something went wrong, please try again.");
    }
  };


  return (
    <div className="glass grid w-full max-w-md gap-6 p-6 sm:p-10">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink dark:text-night-ink">
        Welcome back
      </h1>

      <form onSubmit={handleLogin} className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="login-email" className="field-label">
            Email
          </Label>
          <Input
            id="login-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="field"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="login-password" className="field-label">
            Password
          </Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="field"
          />
        </div>

        <Button type="submit" disabled={busy} className="btn-primary">
          {busy && <LoaderCircle className="size-4.5 animate-spin"  />}
          {busy ? "Signing in..." : "Sign in"}
        </Button>

        {errorMessage && (
          <p role="alert" className="form-error">
            <CircleAlert className="mt-0.5 size-4 shrink-0" />
            {errorMessage}
          </p>
        )}
      </form>

      <p className="text-soft">
        New to Before I Forget?{" "}
        <Link to="/signup" className="text-link">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default LogInCard;
