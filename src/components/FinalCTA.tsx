import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import { ArrowRight } from './icons'
import type { NavigateFn } from '../types'

type FinalCTAProps = {
  navigate: NavigateFn
  role: 'buyer' | 'seller' | 'both'
}

export default function FinalCTA({ navigate, role }: FinalCTAProps) {
  const { t } = useTranslation('home')
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
                {isSeller ? t('final_cta.title_seller') : isBoth ? t('final_cta.title_both') : t('final_cta.title_buyer')}
              </h2>
              <p className="lead" style={{ color: isSeller ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.7)', marginTop: 20 }}>
                {isSeller ? t('final_cta.lead_seller') : t('final_cta.lead_buyer')}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {!isSeller && (
                <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
                  {t('final_cta.cta_buyer')} <ArrowRight />
                </button>
              )}
              {(isSeller || isBoth) && (
                <button className="btn btn-light btn-lg" onClick={() => navigate('vender')}>
                  {t('final_cta.cta_seller_announce')} <ArrowRight />
                </button>
              )}
              {isBoth && (
                <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
                  {t('final_cta.cta_buyer_search')} <ArrowRight />
                </button>
              )}
              {!isSeller && !isBoth && (
                <button className="btn btn-light btn-lg" onClick={() => navigate('vender')}>
                  {t('final_cta.cta_seller_label')}
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
