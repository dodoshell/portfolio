import { MotionConfig } from 'framer-motion'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import './i18n'
import './styles/global.css'
import { LenisProvider } from '@/components/layout/LenisProvider'
import Home from '@/pages/Home'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element #root not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
          <LenisProvider>
            <Home />
          </LenisProvider>
        </MotionConfig>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
