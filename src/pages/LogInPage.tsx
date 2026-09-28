import AuthTemp from "../components/auth/AuthTemp";
import LogInCard from "../components/auth/LogInCard";

function LogInPage() {
  return (
    <AuthTemp
      quote="It's all here."
      sub="Your books, films, songs and thoughts, exactly where you left them.">
      <LogInCard />
    </AuthTemp>
  );
}

export default LogInPage;