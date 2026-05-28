import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import type { NavigateFn } from '../types'

export default function SobrePage({ navigate }: { navigate: NavigateFn }) {
  const { t } = useTranslation('sobre')

  const CITIES = [
    {
      state: t('cities.c1_state'),
      name: t('cities.c1_name'),
      body: t('cities.c1_body'),
      stats: [[t('cities.c1_s1_b'), t('cities.c1_s1_l')], [t('cities.c1_s2_b'), t('cities.c1_s2_l')], [t('cities.c1_s3_b'), t('cities.c1_s3_l')]],
    },
    {
      state: t('cities.c2_state'),
      name: t('cities.c2_name'),
      body: t('cities.c2_body'),
      stats: [[t('cities.c2_s1_b'), t('cities.c2_s1_l')], [t('cities.c2_s2_b'), t('cities.c2_s2_l')], [t('cities.c2_s3_b'), t('cities.c2_s3_l')]],
    },
    {
      state: t('cities.c3_state'),
      name: t('cities.c3_name'),
      body: t('cities.c3_body'),
      stats: [[t('cities.c3_s1_b'), t('cities.c3_s1_l')], [t('cities.c3_s2_b'), t('cities.c3_s2_l')], [t('cities.c3_s3_b'), t('cities.c3_s3_l')]],
    },
  ]

  const PRINCIPLES = [
    { n: '01', t: t('principles.p1_t'), b: t('principles.p1_b') },
    { n: '02', t: t('principles.p2_t'), b: t('principles.p2_b') },
    { n: '03', t: t('principles.p3_t'), b: t('principles.p3_b') },
  ]

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('hero.eyebrow')}</span>
            <h1 className="page-hero-title">
              {t('hero.title_part1')} <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>{t('hero.title_em')}</em>
            </h1>
            <p className="lead" style={{ fontSize: 22, maxWidth: '52ch' }}>
              {t('hero.lead')}
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="manifest-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80 }}>
            <Reveal>
              <span className="eyebrow">{t('manifesto.eyebrow')}</span>
            </Reveal>
            <Reveal delay={80}>
              <div style={{
                fontFamily: 'var(--f-display)',
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                textWrap: 'balance',
              }}>
                {t('manifesto.text_part1')}<em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>{t('manifesto.text_em1')}</em>{t('manifesto.text_part2')}<br /><br />
                {t('manifesto.text_part3')}<em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>{t('manifesto.text_em2')}</em>{t('manifesto.text_part4')}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('cities.eyebrow')}</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 40px' }}>
              {t('cities.title')}
            </h2>
          </Reveal>
          <Reveal>
            <div className="cities">
              {CITIES.map(c => (
                <div className="city" key={c.name}>
                  <div className="city-state">{c.state}</div>
                  <div className="city-name">{c.name}</div>
                  <div className="city-body">{c.body}</div>
                  <div className="city-stats">
                    {c.stats.map(([b, l]) => (
                      <div key={l}><b>{b}</b>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('principles.eyebrow')}</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 40px', maxWidth: '18ch' }}>
              {t('principles.title')}
            </h2>
          </Reveal>
          <div className="principles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {PRINCIPLES.map(p => (
              <Reveal key={p.n} className="card" as="div">
                <div style={{ padding: 32 }}>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--brand)', letterSpacing: '0.1em' }}>{p.n}</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', marginTop: 18, lineHeight: 1.1 }}>
                    {p.t}
                  </div>
                  <div style={{ marginTop: 12, color: 'var(--ink-soft)', fontSize: 15 }}>{p.b}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA navigate={navigate} role="both" />
    </main>
  )
}
