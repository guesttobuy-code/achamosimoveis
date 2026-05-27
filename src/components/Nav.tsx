import { useEffect, useState } from 'react'
import Logo from './Logo'
import { ArrowRight, UserIcon, SunIcon, MoonIcon } from './icons'
import type { NavigateFn } from '../types'

const NAV_ITEMS = [
  { id: 'home',      label: 'Início' },
  { id: 'comprador', label: 'Comprador' },
  { id: 'vendedor',  label: 'Vendedor' },
  { id: 'sobre',     label: 'Sobre' },
  { id: 'contato',   label: 'Contato' },
]

type NavProps = {
  route: string
  navigate: NavigateFn
}

/**
 * Theme toggle (sun/moon) — sync via data-theme no <html> + localStorage.
 * Default inicial vem do App.tsx (useTheme) mas aqui mantém em sync após user click.
 */
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
    try {
      localStorage.setItem('achamos-theme', next)
    } catch {
      /* sem storage = sem persistência, sem problema */
    }
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
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function go(r: string) {
    setMenuOpen(false)
    navigate(r)
  }

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Logo onClick={() => go('home')} />
        <nav className="nav-links">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={'nav-link' + (route === item.id ? ' active' : '')}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="nav-cta">
          <ThemeToggle />
          <a
            className="nav-login"
            href="#entrar"
            onClick={e => {
              e.preventDefault()
              go('entrar')
            }}
            aria-label="Acessar área logada"
          >
            <UserIcon /> Entrar
          </a>
          <button className="btn btn-ghost btn-sm nav-cta-vender" onClick={() => go('vender')}>
            Quero vender
          </button>
          <button className="btn btn-brand btn-sm" onClick={() => go('comecar')}>
            Buscar imóvel <ArrowRight />
          </button>
          <button
            className={'nav-burger' + (menuOpen ? ' open' : '')}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={'nav-drawer' + (menuOpen ? ' open' : '')}
        onClick={() => setMenuOpen(false)}
      >
        <div className="nav-drawer-panel" onClick={e => e.stopPropagation()}>
          <div className="nav-drawer-section">Navegação</div>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={'nav-drawer-link' + (route === item.id ? ' active' : '')}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
          <div className="nav-drawer-divider" />
          <div className="nav-drawer-section">Conta</div>
          <button className="nav-drawer-link" onClick={() => go('entrar')}>
            <UserIcon /> Entrar
          </button>
          <button className="nav-drawer-link" onClick={() => go('vender')}>
            Quero vender
          </button>
        </div>
      </div>
    </header>
  )
}
