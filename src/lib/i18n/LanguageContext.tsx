'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, type Language } from './translations'

type TranslationsContextType = {
  t: (key: keyof typeof translations['en'], params?: Record<string, string>) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<TranslationsContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    const saved = localStorage.getItem('portal_lang') as Language
    if (saved && (saved === 'en' || saved === 'es')) {
      setLanguage(saved)
    }
  }, [])

  const setAndSaveLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('portal_lang', lang)
  }

  const t = (key: keyof typeof translations['en'], params?: Record<string, string>) => {
    let str = translations[language][key] || translations['en'][key] || key
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(`{{${k}}}`, v)
      })
    }
    return str
  }

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage: setAndSaveLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
