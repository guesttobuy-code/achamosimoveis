/**
 * @env-aware
 * Site institucional Achamos Imóveis — sem backend, sem Supabase.
 * Sem detecção de ambiente porque deploy é só pra main (produção).
 * Branches feature/* viram preview Vercel automático.
 *
 * Contrato canônico: Pasta oficial Rendizy/governance/ENVIRONMENT_CONTRACT.md (§5.2)
 */
import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Nav from './components/Nav'
import Footer from './components/Footer'

import { brandForLanguage, SUPPORTED_LANGUAGES, type SupportedLanguage } from './i18n'

import HomePage from './pages/HomePage'
import CompradorPage from './pages/CompradorPage'
import VendedorPage from './pages/VendedorPage'
import SobrePage from './pages/SobrePage'
import ContatoPage from './pages/ContatoPage'
import ComecarPage from './pages/ComecarPage'
import ChatPage from './pages/ChatPage'

// Theme: respeita preferência salva pelo ThemeToggle (default = light).
// Setado uma vez no mount; ThemeToggle no Nav atualiza depois.
function useTheme() {
  useEffect(() => {
    let initial = 'light'
    try {
      const saved = localStorage.getItem('achamos-theme')
      if (saved === 'light' || saved === 'dark') initial = saved
    } catch { /* localStorage indisponível — usa default */ }
    document.documentElement.setAttribute('data-theme', initial)
  }, [])
}

// Scroll to top on route change
function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
}

/**
 * Mantém <html lang="..." data-brand="..."> sincronizado com o idioma ativo.
 *
 * - lang: navegador, leitores de tela, SEO
 * - data-brand: CSS troca background-image do .brand-logo (Achamos vs WFP)
 *
 * Override por rota: /wefoundproperties força idioma EN (preview da versão
 * internacional enquanto o domínio wefoundproperties.com não está plugado).
 */
function useBrandAndLang() {
  const { i18n } = useTranslation()
  const { pathname } = useLocation()

  // Rota /wefoundproperties força versão internacional (EN como default)
  useEffect(() => {
    if (pathname.toLowerCase().startsWith('/wefoundproperties')) {
      const isPt = i18n.language.toLowerCase().startsWith('pt')
      if (isPt) i18n.changeLanguage('en')
    }
  }, [pathname, i18n])

  // Aplica lang + data-brand no <html> sempre que idioma muda
  useEffect(() => {
    const apply = () => {
      const lang = (i18n.resolvedLanguage || i18n.language || 'pt').slice(0, 2)
      const safeLang: SupportedLanguage = (SUPPORTED_LANGUAGES as readonly string[]).includes(lang)
        ? (lang as SupportedLanguage)
        : 'en'
      document.documentElement.setAttribute('lang', safeLang)
      document.documentElement.setAttribute('data-brand', brandForLanguage(safeLang))
    }
    apply()
    i18n.on('languageChanged', apply)
    return () => { i18n.off('languageChanged', apply) }
  }, [i18n])
}

export default function App() {
  useTheme()
  useBrandAndLang()
  useScrollToTop()

  const navigate = useNavigate()
  const location = useLocation()

  // Chat routes hide the global nav/footer (full-screen flow)
  const isChatRoute = location.pathname.startsWith('/comecar/')

  // Helper to navigate by id (used by legacy navigate('home'), etc.)
  function navigateById(id: string) {
    // Rota "entrar" — área logada vive no portal whitelabel separado.
    // Aponta direto pra /login pra evitar bounce pela home do portal.
    if (id === 'entrar') {
      window.location.href = 'https://portalimobiliario-whitelabel.vercel.app/login'
      return
    }
    const map: Record<string, string> = {
      home: '/',
      comprador: '/comprador',
      vendedor: '/vendedor',
      sobre: '/sobre',
      contato: '/contato',
      comecar: '/comecar',
      comprar: '/comecar/briefing',
      vender: '/comecar/anunciar',
    }
    navigate(map[id] ?? '/')
  }

  return (
    <div className="shell">
      {!isChatRoute && <Nav route={pathToRoute(location.pathname)} navigate={navigateById} />}

      <Routes>
        <Route path="/" element={<HomePage navigate={navigateById} />} />
        <Route path="/comprador" element={<CompradorPage navigate={navigateById} />} />
        <Route path="/vendedor" element={<VendedorPage navigate={navigateById} />} />
        <Route path="/sobre" element={<SobrePage navigate={navigateById} />} />
        <Route path="/contato" element={<ContatoPage navigate={navigateById} />} />
        <Route path="/comecar" element={<ComecarPage navigate={navigateById} />} />
        <Route path="/comecar/briefing" element={<ChatPage role="buyer" navigate={navigateById} />} />
        <Route path="/comecar/anunciar" element={<ChatPage role="seller" navigate={navigateById} />} />
        <Route path="/wefoundproperties" element={<HomePage navigate={navigateById} />} />
        <Route path="*" element={<HomePage navigate={navigateById} />} />
      </Routes>

      {!isChatRoute && <Footer navigate={navigateById} />}
    </div>
  )
}

// Map URL pathname to nav id (for active-link highlight)
function pathToRoute(pathname: string): string {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/comprador')) return 'comprador'
  if (pathname.startsWith('/vendedor')) return 'vendedor'
  if (pathname.startsWith('/sobre')) return 'sobre'
  if (pathname.startsWith('/contato')) return 'contato'
  if (pathname.startsWith('/comecar')) return 'comecar'
  return 'home'
}
