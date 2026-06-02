import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthContext from './context/AuthContext'
import ContextShare from './context/ContextShare.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="1087091177627-n1b51u77bdkabtnles416d83qh2ngdhq.apps.googleusercontent.com">
        <AuthContext>
          <ContextShare>
            <App />
          </ContextShare>
        </AuthContext>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
