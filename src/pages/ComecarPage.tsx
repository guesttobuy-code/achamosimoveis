import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import { ArrowRight, ArrowUpRight } from '../components/icons'
import type { NavigateFn } from '../types'

const PORTAL_URL = import.meta.env.VITE_PORTAL_URL || 'https://app.achamos.com.br'

export default function ComecarPage({ navigate }: { navigate: NavigateFn }) {
  const { t } = useTranslation('comecar')

  return (
    <main>
      <section className="hero" style={{ paddingTop: 'clamp(40px, 6vw, 80px)', paddingBottom: 'clamp(40px, 6vw, 80px)' }}>
        <div className="container">
          <Reveal>
            <span className="hero-tag">
              <span className="hero-tag-dot" />
              {t('hero.tag')}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display" style={{ fontSize: 'clamp(40px, 6vw, 84px)', margin: '24px 0 18px', maxWidth: '16ch', letterSpacing: '-0.03em' }}>
              {t('hero.title_part1')} <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>{t('hero.title_em')}</em>{t('hero.title_part2')}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lead">{t('hero.lead')}</p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="comecar-grid">
              {/* Pilar 01 — Achamos+ (featured) */}
              <article className="comecar-card comecar-card-1" onClick={() => navigate('comprar')}>
                <div>
                  <div className="comecar-card-num">{t('cards.c1_num')}</div>
                  <div className="comecar-card-name">
                    {t('cards.c1_name_part1')} <em>{t('cards.c1_name_em')}</em> {t('cards.c1_name_part2')}
                  </div>
                  <p className="comecar-card-desc">
                    {t('cards.c1_desc_part1')}<strong>{t('cards.c1_desc_strong')}</strong>
                  </p>
                </div>
                <div className="comecar-card-cta">
                  {t('cards.c1_cta')}
                  <span className="comecar-card-cta-circle"><ArrowUpRight size={14} /></span>
                </div>
              </article>

              {/* Pilar 02 — Portal */}
              <article className="comecar-card comecar-card-2" onClick={() => window.location.href = PORTAL_URL}>
                <div>
                  <div className="comecar-card-num">{t('cards.c2_num')}</div>
                  <div className="comecar-card-name">
                    {t('cards.c2_name_part1')} <em>{t('cards.c2_name_em')}</em> {t('cards.c2_name_part2')}
                  </div>
                  <p className="comecar-card-desc">
                    {t('cards.c2_desc')}
                  </p>
                </div>
                <div className="comecar-card-cta">
                  {t('cards.c2_cta')}
                  <span className="comecar-card-cta-circle"><ArrowUpRight size={14} /></span>
                </div>
              </article>

              {/* Pilar 03 — Se hospede */}
              <article className="comecar-card comecar-card-3" onClick={() => window.location.href = `${PORTAL_URL}/se-hospede`}>
                <div>
                  <div className="comecar-card-num">{t('cards.c3_num')}</div>
                  <div className="comecar-card-name">
                    {t('cards.c3_name_part1')} <em>{t('cards.c3_name_em')}</em> {t('cards.c3_name_part2')}
                  </div>
                  <p className="comecar-card-desc">
                    {t('cards.c3_desc')}
                  </p>
                </div>
                <div className="comecar-card-cta">
                  {t('cards.c3_cta')}
                  <span className="comecar-card-cta-circle"><ArrowUpRight size={14} /></span>
                </div>
              </article>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{
              marginTop: 56,
              padding: '24px 28px',
              background: 'var(--paper-warm)',
              borderRadius: 'var(--r-lg)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 24,
              flexWrap: 'wrap',
            }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>{t('cross.eyebrow')}</div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>
                  {t('cross.title')}
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => navigate('vender')}>
                {t('cross.cta')} <ArrowRight />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
