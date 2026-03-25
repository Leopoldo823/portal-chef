'use client'

import React from 'react'
import { useLanguage } from '@/src/lib/i18n/LanguageContext'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${language === 'es' ? 'bg-[--color-primary] text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${language === 'en' ? 'bg-[--color-primary] text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
      >
        EN
      </button>
    </div>
  )
}
