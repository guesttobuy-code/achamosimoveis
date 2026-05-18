import Reveal from './Reveal'
import { ArrowRight } from './icons'
import type { NavigateFn } from '../types'

type FinalCTAProps = {
  navigate: NavigateFn
  role: 'buyer' | 'seller' | 'both'
}

export default function FinalCTA({ navigate, role }: FinalCTAProps) {
  const isSeller = role === 'seller'
  const isBoth = role === 'both'

  return (
    <section>
      <div className="container">
        <Reveal>
          <div className="cta-final" style={{
            background: isSeller ? 'var(--brand)' : 'var(--inverse-surface)',
            color: isSeller ? 'white' : 'var(--inverse-fg)',
            borderRadius: 'var(--r-xl)',
            padding: 'clamp(40px, 6vw, 80px)',
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: 40,
            alignItems: 'end',
          }}>
            <div>
              <h2 className="display" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', color: 'inherit' }}>
                {isSeller ? 'Pronto pra anunciar?' : isBoth ? 'Vamos começar?' : 'Bora achar?'}
              </h2>
              <p className="lead" style={{ color: isSeller ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.7)', marginTop: 20 }}>
                {isSeller
                  ? 'A primeira conversa é gratuita. Em 48h te dizemos quantos compradores compatíveis temos.'
                  : 'Leva 2 minutos. A primeira oportunidade chega no seu WhatsApp em até 48h.'}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {!isSeller && (
                <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
                  Começar briefing <ArrowRight />
                </button>
              )}
              {(isSeller || isBoth) && (
                <button className="btn btn-light btn-lg" onClick={() => navigate('vender')}>
                  Anunciar imóvel <ArrowRight />
                </button>
              )}
              {isBoth && (
                <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
                  Buscar imóvel <ArrowRight />
                </button>
              )}
              {!isSeller && !isBoth && (
                <button className="btn btn-light btn-lg" onClick={() => navigate('vender')}>
                  Sou vendedor
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
