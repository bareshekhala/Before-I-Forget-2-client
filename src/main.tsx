import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { AuthWrapper } from './context/auth.context.tsx'
createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
    <AuthWrapper>
    <App />
    </AuthWrapper>
  </BrowserRouter>,

)
