import { Route, Routes } from "react-router";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ArchivePage from "./pages/ArchivePage";
import DiscoverPage from "./pages/DiscoverPage";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/auth.context";
import { useContext } from "react";
function App() {
  const auth = useContext(AuthContext)
  return (
    <div className="min-h-screen lg:flex">
      {auth?.user && <Navbar />}
      <main className="min-w-0 flex-1 pb-24 lg:pb-0">
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
