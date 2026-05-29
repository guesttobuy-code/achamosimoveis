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
import ptComprador from './locales/pt/comprador.json'
import ptVendedor from './locales/pt/vendedor.json'
import ptSobre from './locales/pt/sobre.json'
import ptContato from './locales/pt/contato.json'
import ptComecar from './locales/pt/comecar.json'
import ptChat from './locales/pt/chat.json'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enComprador from './locales/en/comprador.json'
import enVendedor from './locales/en/vendedor.json'
import enSobre from './locales/en/sobre.json'
import enContato from './locales/en/contato.json'
import enComecar from './locales/en/comecar.json'
import enChat from './locales/en/chat.json'

import esCommon from './locales/es/common.json'
import esHome from './locales/es/home.json'
import esComprador from './locales/es/comprador.json'
import esVendedor from './locales/es/vendedor.json'
import esSobre from './locales/es/sobre.json'
import esContato from './locales/es/contato.json'
import esComecar from './locales/es/comecar.json'
import esChat from './locales/es/chat.json'

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

/**
 * Path-aware override: rota `/wefoundproperties` força EN ANTES de qualquer
 * render React. Implementado como um detector customizado plugado antes do
 * LanguageDetector default, garantindo que o idioma já esteja resolvido na
 * primeira chamada `t()` (sem flash de PT). useBrandAndLang em App.tsx
 * mantém o sync no client-side nav (rota muda sem reload).
 */
const pathDetector = {
  name: 'pathDetector',
  lookup() {
    if (typeof window === 'undefined') return undefined
    if (window.location.pathname.toLowerCase().startsWith('/wefoundproperties')) return 'en'
    return undefined
  },
  cacheUserLanguage() { /* path-based override is not cached */ },
}

const detector = new LanguageDetector()
detector.addDetector(pathDetector as never)

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        common: ptCommon,
        home: ptHome,
        comprador: ptComprador,
        vendedor: ptVendedor,
        sobre: ptSobre,
        contato: ptContato,
        comecar: ptComecar,
        chat: ptChat,
      },
      en: {
        common: enCommon,
        home: enHome,
        comprador: enComprador,
        vendedor: enVendedor,
        sobre: enSobre,
        contato: enContato,
        comecar: enComecar,
        chat: enChat,
      },
      es: {
        common: esCommon,
        home: esHome,
        comprador: esComprador,
        vendedor: esVendedor,
        sobre: esSobre,
        contato: esContato,
        comecar: esComecar,
        chat: esChat,
      },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    nonExplicitSupportedLngs: true, // 'pt-BR' → 'pt'
    defaultNS: 'common',
    ns: ['common', 'home', 'comprador', 'vendedor', 'sobre', 'contato', 'comecar', 'chat'],
    interpolation: {
      escapeValue: false, // React já escapa por padrão
    },
    detection: {
      // pathDetector roda primeiro — força EN em /wefoundproperties
      order: ['pathDetector', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'achamos_lang',
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
