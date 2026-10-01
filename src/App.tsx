import { Route, Routes } from "react-router";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ArchivePage from "./pages/ArchivePage";
import DiscoverPage from "./pages/DiscoverPage";
import Navbar from "./components/Navbar";
import Chart from "./pages/ChartPage";
import { AuthContext } from "./context/auth.context";
import OnlyPrivate from "./components/auth/OnlyPrivate";
import { useContext } from "react";
function App() {
  const auth = useContext(AuthContext);
  return (
    <div className="min-h-screen lg:flex">
      {auth?.user && <Navbar />}
      <main className="min-w-0 flex-1 pb-24 lg:pb-0">
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/archive" element={<OnlyPrivate><ArchivePage /></OnlyPrivate>} />
          <Route path="/discover" element={<OnlyPrivate><DiscoverPage /></OnlyPrivate>} />
         <Route path="/chart" element={ <OnlyPrivate><Chart /></OnlyPrivate>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
