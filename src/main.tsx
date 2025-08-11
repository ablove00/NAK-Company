import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import i18n from "./i18n/i18n"; 
import { NetworkStatusProvider } from "./hooks/NetworkStatusContext";
import { ConfirmProvider } from "./hooks/useConfirm";
import './index.css'

const savedLang = localStorage.getItem("lang") || i18n.language || "en";

// تنظیم ویژگی‌های تگ HTML
document.documentElement.lang = savedLang;
document.documentElement.dir = savedLang === "fa" ? "rtl" : "ltr";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NetworkStatusProvider>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </NetworkStatusProvider>
    
  </StrictMode>,
)
