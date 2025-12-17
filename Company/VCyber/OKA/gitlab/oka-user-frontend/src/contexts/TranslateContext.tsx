import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { t as translate, setLanguage as setLang, getLanguage, type Language, type TranslationKey } from '@/services/translate'

export interface TranslateContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
}

const TranslateContext = createContext<TranslateContextType | undefined>(undefined)

const LANGUAGE_KEY = 'app-language'

export function TranslateProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load saved language or default to 'en'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_KEY) as Language | null
      if (saved) {
        setLang(saved)
        return saved
      }
    }
    return getLanguage()
  })

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang)
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_KEY, lang)
    }
  }, [])

  const t = useCallback((key: TranslationKey, params?: Record<string, string | number>) => {
    return translate(key, params)
  }, [])

  return (
    <TranslateContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslateContext.Provider>
  )
}

export function useTranslate() {
  const context = useContext(TranslateContext)
  if (context === undefined) {
    throw new Error('useTranslate must be used within a TranslateProvider')
  }
  return context
}

// Shorthand hook for just the t function
export function useT() {
  const { t } = useTranslate()
  return t
}

export default TranslateContext

