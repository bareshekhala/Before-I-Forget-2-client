import { useState} from "react";
import { supabase } from "../../lib/superBaseClient";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Check, CircleAlert, CircleCheck, Dot, LoaderCircle } from "lucide-react";

function SignUpCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);


  const handleSignup = async (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name }, emailRedirectTo:"http://localhost:5173/login"},
      });
      setBusy(false);

      if (error) {
        setErrorMessage(error.message);
        return;
      }
      setSuccessMessage("Signup successful! Check your email for verification.");
    } catch (error) {
      console.log(error);
      setBusy(false);
      setErrorMessage("Something went wrong, please try again.");
    } 
  };

  const PassTest = /[0-9]/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password);


  return (
    <div className="glass grid w-full max-w-md gap-6 p-6 sm:p-10">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink dark:text-night-ink">
        Sign Up
      </h1>

      <form onSubmit={handleSignup} className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="signup-name" className="field-label">
            What should we call you?
          </Label>
          <Input
            id="signup-name"
            type="text"
            autoComplete="given-name"
            placeholder="Your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="field"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="signup-email" className="field-label">
            Email
          </Label>
          <Input
            id="signup-email"
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
          <Label htmlFor="signup-password" className="field-label">
            Password
          </Label>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="At least 8 characters, with one number, one uppercase letter and one lowercase letter"
            required
            className="field"
          />
          <ul className="grid gap-1 text-sm text-soft">
            <li className={password.length >= 8 ? "flex gap-2 text-success dark:text-night-success" : "flex gap-2"}>
              {password.length >= 8 ? <Check className="mt-0.5 size-4 shrink-0" /> : <Dot className="mt-0.5 size-4 shrink-0"  />}
              8 or more characters
            </li>
            <li className={PassTest ? "flex gap-2 text-success dark:text-night-success" : "flex gap-2"}>
              {PassTest ? <Check className="mt-0.5 size-4 shrink-0"  /> : <Dot className="mt-0.5 size-4 shrink-0"  />}
              At least one number, one uppercase letter and one lowercase letter
            </li>
          </ul>
        </div>

        <Button type="submit" disabled={busy} className="btn-primary">
          {busy && <LoaderCircle className="size-4.5 animate-spin" />}
          {busy ? "Creating your archive..." : "Create my archive"}
        </Button>

        {errorMessage && (
          <p role="alert" className="form-error">
            <CircleAlert className="mt-0.5 size-4 shrink-0"  />
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p role="status" className="form-success">
            <CircleCheck className="mt-0.5 size-4 shrink-0" />
            {successMessage}
          </p>
        )}
      </form>

      <p className="text-soft">
        Already have an account?{" "}
        <Link to="/login" className="text-link">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default SignUpCard;