import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./global.css";
import {BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { Toaster } from './components/ui/sonner.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Router>
  <AppRoutes />
  <Toaster/>
  </Router>
  </StrictMode>,
)
