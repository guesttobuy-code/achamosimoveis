import Logo from './Logo'
import { ArrowRight } from './icons'
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

export default function Nav({ route, navigate }: NavProps) {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Logo onClick={() => navigate('home')} />
        <nav className="nav-links">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={'nav-link' + (route === item.id ? ' active' : '')}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="nav-cta">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('vender')}>
            Quero vender
          </button>
          <button className="btn btn-brand btn-sm" onClick={() => navigate('comecar')}>
            Buscar imóvel <ArrowRight />
          </button>
        </div>
      </div>
    </header>
  )
}
