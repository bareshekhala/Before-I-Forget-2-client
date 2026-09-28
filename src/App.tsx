import { Route,Routes } from "react-router"
import LogInPage from "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage"

function App() {
  return (
    <div>
<Routes>
{/* <Route path="/" element={<LandingPage />} /> */}
       <Route path="/signup" element={ <SignUpPage /> } />
       <Route path="/login" element={ <LogInPage /> } />


</Routes>

    </div>
  )
}

export default App
