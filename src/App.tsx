import { Route,Routes } from "react-router"
import LogInPage from "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage"
import ArchivePage from "./pages/ArchivePage"
function App() {
  return (
    <div>
<Routes>
{/* <Route path="/" element={<LandingPage />} /> */}
       <Route path="/signup" element={ <SignUpPage /> } />
       <Route path="/login" element={ <LogInPage /> } />
<Route path="/archive" element={ <ArchivePage /> } />

</Routes>

    </div>
  )
}

export default App
