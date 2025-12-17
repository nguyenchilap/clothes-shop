import en from '@/assets/json/en.json'

export type TranslationKey = string
export type Translations = typeof en

// Supported languages
export type Language = 'en' | 'vi'

// Translation store
const translations: Record<Language, Translations> = {
  en: en,
  vi: en // Default to en, can add vi.json later
}

let currentLanguage: Language = 'en'

/**
 * Set the current language
 */
export function setLanguage(lang: Language): void {
  currentLanguage = lang
}

/**
 * Get the current language
 */
export function getLanguage(): Language {
  return currentLanguage
}

/**
 * Get a nested value from an object using dot notation
 * @example getValue(obj, 'auth.login.title')
 */
function getValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let result: unknown = obj

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key]
    } else {
      return path // Return the key if not found
    }
  }

  return typeof result === 'string' ? result : path
}

/**
 * Translate a key with optional interpolation
 * @param key - Dot notation key (e.g., 'auth.login.title')
 * @param params - Optional parameters for interpolation
 * @example t('auth.login.title')
 * @example t('validation.minLength', { min: 8 })
 */
export function t(key: TranslationKey, params?: Record<string, string | number>): string {
  const translation = getValue(translations[currentLanguage] as unknown as Record<string, unknown>, key)

  if (!params) return translation

  // Replace {param} with actual values
  return translation.replace(/\{(\w+)\}/g, (_, paramKey) => {
    return params[paramKey]?.toString() ?? `{${paramKey}}`
  })
}

/**
 * Translation service object
 */
export const translateService = {
  t,
  setLanguage,
  getLanguage,
  translations
}

export default translateService

