import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import { ArrowRight, Check } from '../components/icons'
import type { NavigateFn } from '../types'

export default function VendedorPage({ navigate }: { navigate: NavigateFn }) {
  const { t } = useTranslation('vendedor')

  const DEMAND: { city: string; t: string; b: string; n: number }[] = [
    { city: t('demand.city1_city'), t: t('demand.city1_t'), b: t('demand.city1_b'), n: 12 },
    { city: t('demand.city2_city'), t: t('demand.city2_t'), b: t('demand.city2_b'), n: 8 },
    { city: t('demand.city3_city'), t: t('demand.city3_t'), b: t('demand.city3_b'), n: 5 },
    { city: t('demand.city4_city'), t: t('demand.city4_t'), b: t('demand.city4_b'), n: 14 },
  ]

  const OLD_WAY = [
    t('why_diff.old1'),
    t('why_diff.old2'),
    t('why_diff.old3'),
    t('why_diff.old4'),
    t('why_diff.old5'),
  ]

  const ACHAMOS_WAY = [
    t('why_diff.ach1'),
    t('why_diff.ach2'),
    t('why_diff.ach3'),
    t('why_diff.ach4'),
    t('why_diff.ach5'),
  ]

  const INCLUDED: [string, string][] = [
    [t('included.i1_t'), t('included.i1_b')],
    [t('included.i2_t'), t('included.i2_b')],
    [t('included.i3_t'), t('included.i3_b')],
    [t('included.i4_t'), t('included.i4_b')],
    [t('included.i5_t'), t('included.i5_b')],
    [t('included.i6_t'), t('included.i6_b')],
  ]

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('hero.eyebrow')}</span>
            <h1 className="page-hero-title">
              <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>{t('hero.title_em')}</em><br />
              {t('hero.title_part2')}
            </h1>
            <p className="lead" style={{ fontSize: 22 }}>
              {t('hero.lead')}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <button className="btn btn-brand btn-lg" onClick={() => navigate('vender')}>
                {t('hero.cta_primary')} <ArrowRight />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => navigate('contato')}>
                {t('hero.cta_secondary')}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('demand.eyebrow')}</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 36px', maxWidth: '18ch' }}>
              {t('demand.title')}
            </h2>
          </Reveal>
          <Reveal>
            <div className="match-grid" style={{
              background: 'var(--inverse-surface)',
              color: 'var(--inverse-fg)',
              borderRadius: 'var(--r-xl)',
              padding: 40,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
            }}>
              {DEMAND.map((m, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--brand)', letterSpacing: '0.1em' }}>{m.city}</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 72, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginTop: 8 }}>
                    {m.n}
                  </div>
                  <div style={{ marginTop: 12, fontSize: 14, opacity: 0.85 }}>{m.t}</div>
                  <div style={{ marginTop: 4, fontSize: 13, opacity: 0.6, fontFamily: 'var(--f-mono)' }}>{m.b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mono" style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 16, textAlign: 'right' }}>
              {t('demand.note')}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('why_diff.eyebrow')}</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 40px', maxWidth: '18ch' }}>
              {t('why_diff.title')}
            </h2>
          </Reveal>
          <Reveal>
            <div className="compare-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="card" style={{ padding: 32, opacity: 0.7 }}>
                <div className="eyebrow" style={{ marginBottom: 18 }}>{t('why_diff.old_way_title')}</div>
                {OLD_WAY.map(x => (
                  <div key={x} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--line-soft)', fontSize: 15 }}>
                    <span style={{ color: 'var(--ink-mute)' }}>—</span>{x}
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 32, background: 'var(--inverse-surface)', color: 'var(--inverse-fg)', borderColor: 'var(--ink)' }}>
                <div className="eyebrow" style={{ marginBottom: 18, color: 'var(--brand)' }}>{t('why_diff.achamos_way_title')}</div>
                {ACHAMOS_WAY.map(x => (
                  <div key={x} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: 15 }}>
                    <span style={{ color: 'var(--brand)' }}><Check size={16} /></span>{x}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('included.eyebrow')}</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 40px', maxWidth: '16ch' }}>
              {t('included.title')}
            </h2>
          </Reveal>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {INCLUDED.map(([label, body]) => (
                <div className="card" key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 999,
                    background: 'var(--brand)', color: 'white',
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}><Check size={14} /></div>
                  <div>
                    <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.015em' }}>{label}</div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 4 }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA navigate={navigate} role="seller" />
    </main>
  )
}
