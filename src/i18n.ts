/**
 * @env-aware
 * Configuração i18n do site institucional Achamos / We Found Properties.
 *
 * Estratégia de marca dual:
 * - pt → marca "Achamos Imóveis" (logo achamos-imoveis-logo.svg)
 * - en, es e outros → marca "We Found Properties" (logo we-found-properties.png)
 *
 * Detecção:
 * 1. localStorage (escolha persistida do usuário) — prioridade máxima
 * 2. navigator.language (idioma do navegador)
 * 3. Fallback: pt-BR
 *
 * Idiomas suportados: pt, en, es.
 * Qualquer outro idioma cai no fallback EN (mais próximo internacionalmente
 * que PT para um visitante europeu/asiático/etc).
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ptCommon from './locales/pt/common.json'
import ptHome from './locales/pt/home.json'
import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import esCommon from './locales/es/common.json'
import esHome from './locales/es/home.json'

export const SUPPORTED_LANGUAGES = ['pt', 'en', 'es'] as const
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

/**
 * Decide a marca exibida baseado no idioma ativo.
 * - pt (qualquer variante BR/PT) → Achamos Imóveis
 * - resto → We Found Properties
 */
export function brandForLanguage(lang: string): 'achamos' | 'wfp' {
  return lang.toLowerCase().startsWith('pt') ? 'achamos' : 'wfp'
}

/**
 * Nome legível da marca (usado em alt-text, title, og:tags).
 */
export function brandName(lang: string): string {
  return brandForLanguage(lang) === 'achamos' ? 'Achamos Imóveis' : 'We Found Properties'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { common: ptCommon, home: ptHome },
      en: { common: enCommon, home: enHome },
      es: { common: esCommon, home: esHome },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    nonExplicitSupportedLngs: true, // 'pt-BR' → 'pt'
    defaultNS: 'common',
    ns: ['common', 'home'],
    interpolation: {
      escapeValue: false, // React já escapa por padrão
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'achamos_lang',
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
