import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UserDataProvider } from './context/userContext.jsx'  // ✅ use named import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserDataProvider>   {/* ✅ correct component name */}
        <App />
      </UserDataProvider>
    </BrowserRouter>
  </StrictMode>
)
