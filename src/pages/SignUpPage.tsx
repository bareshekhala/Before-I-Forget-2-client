import AuthTemp from "../components/auth/AuthTemp";
import SignUpCard from "../components/auth/SignUpCard";

function SignUpPage() {
  return (
    <AuthTemp
      quote="Start with one thing you don't want to forget."
      sub="A book, a song, a dream from last night. That's how every archive begins">
      {<SignUpCard />}
    </AuthTemp>
  );
}

export default SignUpPage;
