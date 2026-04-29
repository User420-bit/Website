import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { PortfolioProvider } from './context/PortfolioContext'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </StrictMode>
)
