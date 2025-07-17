import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { I18nextProvider } from 'react-i18next'

import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import i18n from './i18n/config';
import { LoadingProvider } from './context/LoadingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <LoadingProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LoadingProvider>
      </LanguageProvider>
    </I18nextProvider>
  </StrictMode>,
)
