import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Dark mode only for now — theme toggle is hidden in the navbar.
// To re-enable theming later: import { applyThemeFromStorage } from './components/ThemeToggle.jsx' and call it.
document.documentElement.dataset.theme = 'dark'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
