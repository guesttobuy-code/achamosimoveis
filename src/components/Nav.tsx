import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { ArrowRight, UserIcon, SunIcon, MoonIcon } from './icons'
import type { NavigateFn } from '../types'

const NAV_IDS = ['home', 'comprador', 'vendedor', 'sobre', 'contato'] as const

type NavProps = {
  route: string
  navigate: NavigateFn
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const attr = document.documentElement.getAttribute('data-theme')
      return attr === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  function toggle() {
    const next: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('achamos-theme', next) } catch { /* ignore */ }
  }

  return (
    <button
      className="nav-theme"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
      type="button"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export default function Nav({ route, navigate }: NavProps) {
  const { t } = useTranslation('common')
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function go(r: string) {
    setMenuOpen(false)
    navigate(r)
  }

  return (
    <>
      {/* ─── Header ─────────────────────────────────────────────────────
          IMPORTANTE: header tem backdrop-filter que cria stacking context
          isolado. Por isso o drawer NÃO pode ser filho do header — ficaria
          preso nesse contexto e apareceria atrás do conteúdo da página.
          O drawer é irmão do header (mesmo nível no DOM) via Fragment.
      ─────────────────────────────────────────────────────────────────── */}
      <header className="nav">
        <div className="container nav-inner">
          <Logo onClick={() => go('home')} />
          <nav className="nav-links">
            {NAV_IDS.map(id => (
              <button
                key={id}
                className={'nav-link' + (route === id ? ' active' : '')}
                onClick={() => go(id)}
              >
                {t(`nav.${id}`)}
              </button>
            ))}
          </nav>
          <div className="nav-cta">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              className="nav-login"
              href="#entrar"
              onClick={e => { e.preventDefault(); go('entrar') }}
              aria-label={t('nav.entrar_aria')}
            >
              <UserIcon /> {t('nav.entrar')}
            </a>
            <button className="btn btn-ghost btn-sm nav-cta-vender" onClick={() => go('vender')}>
              {t('nav.cta_vender')}
            </button>
            <button className="btn btn-brand btn-sm" onClick={() => go('comecar')}>
              {t('nav.cta_buscar')} <ArrowRight />
            </button>
            <button
              className={'nav-burger' + (menuOpen ? ' open' : '')}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t('nav.menu_close') : t('nav.menu_open')}
              aria-expanded={menuOpen}
              type="button"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Drawer ───────────────────────────────────────────────
          Irmão do header no DOM (não filho) — fora do stacking context do
          backdrop-filter. z-index: 9999 garante que fica acima de tudo.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        className={'nav-drawer' + (menuOpen ? ' open' : '')}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      >
        <div className="nav-drawer-panel" onClick={e => e.stopPropagation()}>
          {/* X fechar */}
          <button
            className="nav-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label={t('nav.menu_close')}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* CTA primário */}
          <button className="btn btn-brand nav-drawer-cta" onClick={() => go('comecar')}>
            {t('nav.cta_buscar')} <ArrowRight />
          </button>

          <div className="nav-drawer-section">{t('nav.drawer_navegacao')}</div>
          {NAV_IDS.map(id => (
            <button
              key={id}
              className={'nav-drawer-link' + (route === id ? ' active' : '')}
              onClick={() => go(id)}
            >
              {t(`nav.${id}`)}
            </button>
          ))}

          <div className="nav-drawer-divider" />
          <div className="nav-drawer-section">{t('nav.drawer_conta')}</div>
          <button className="nav-drawer-link" onClick={() => go('entrar')}>
            <UserIcon /> {t('nav.entrar')}
          </button>
          <button className="nav-drawer-link" onClick={() => go('vender')}>
            {t('nav.cta_vender')}
          </button>

          <div className="nav-drawer-divider" />
          <div className="nav-drawer-section">{t('nav.drawer_idioma')}</div>
          <LanguageSwitcher className="lang-switcher-drawer" />
        </div>
      </div>
    </>
  )
}
