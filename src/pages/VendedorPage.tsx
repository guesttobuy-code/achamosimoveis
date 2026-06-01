import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import { ArrowRight, Check } from '../components/icons'
import type { NavigateFn } from '../types'

/**
 * /vendedor · Nova pegada de inversão de mercado.
 *
 * Estrutura:
 *   1. Hero — pergunta provocativa ("anunciar e torcer" vs "ir direto no comprador")
 *   2. Pain — 3 cards de dor concreta (portal pago / imobiliária 6% / 6 meses parado)
 *   3. Inversion — card de comprador anônimo (a JOIA visual)
 *   4. How — 4 passos self-service
 *   5. Guarantee — Diagnóstico 5x (3 ramos: fotos / preço / mercado)
 *   6. Demand — tabela de cidades (mantida, recontextualizada)
 *   7. Support — 6 cards full-service AGORA OPCIONAIS
 *   8. FinalCTA
 *
 * Backup do conteúdo antigo em src/locales/pt/vendedor.backup.json.
 */
export default function VendedorPage({ navigate }: { navigate: NavigateFn }) {
  const { t } = useTranslation('vendedor')

  const DEMAND: { city: string; t: string; b: string; n: number }[] = [
    { city: t('demand.city1_city'), t: t('demand.city1_t'), b: t('demand.city1_b'), n: 12 },
    { city: t('demand.city2_city'), t: t('demand.city2_t'), b: t('demand.city2_b'), n: 8 },
    { city: t('demand.city3_city'), t: t('demand.city3_t'), b: t('demand.city3_b'), n: 5 },
    { city: t('demand.city4_city'), t: t('demand.city4_t'), b: t('demand.city4_b'), n: 14 },
  ]

  const SUPPORT: [string, string][] = [
    [t('support.i1_t'), t('support.i1_b')],
    [t('support.i2_t'), t('support.i2_b')],
    [t('support.i3_t'), t('support.i3_b')],
    [t('support.i4_t'), t('support.i4_b')],
    [t('support.i5_t'), t('support.i5_b')],
    [t('support.i6_t'), t('support.i6_b')],
  ]

  return (
    <main>
      {/* ─── 1. HERO · pergunta provocativa ─── */}
      <section className="page-hero v-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('hero.eyebrow')}</span>
            <h1 className="page-hero-title v-hero-title">
              {t('hero.question_part1')}
              <em>{t('hero.question_em1')}</em>
              {t('hero.question_part2')}
              <em>{t('hero.question_em2')}</em>
              {t('hero.question_dot')}
            </h1>
            <p
              className="lead v-hero-lead"
              dangerouslySetInnerHTML={{ __html: t('hero.lead_html') }}
            />
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

      {/* ─── 2. PAIN · 3 cards de dor ─── */}
      <section className="v-pain">
        <div className="container">
          <Reveal>
            <div className="v-pain-head">
              <span className="eyebrow">{t('pain.eyebrow')}</span>
              <h2 className="display v-pain-title">
                {t('pain.title_l1')}{' '}
                <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>
                  {t('pain.title_em')}
                </em>
                {t('pain.title_dot')}
              </h2>
              <p className="lead v-pain-lead">{t('pain.lead')}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="v-pain-grid">
              {[1, 2, 3].map(n => (
                <div className="v-pain-card" key={n}>
                  <span className="v-pain-x" aria-hidden="true">×</span>
                  <div>
                    <div className="v-pain-card-title">{t(`pain.c${n}_title`)}</div>
                    <div className="v-pain-card-body">{t(`pain.c${n}_body`)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 3. INVERSION · card de comprador anônimo (a JOIA) ─── */}
      <section className="v-inversion">
        <div className="container">
          <Reveal>
            <div className="v-inv-head">
              <span className="eyebrow">{t('inversion.eyebrow')}</span>
              <h2 className="display v-inv-title">
                {t('inversion.title_l1')}{' '}
                <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>
                  {t('inversion.title_em')}
                </em>
                <br />
                {t('inversion.title_l2')}
              </h2>
              <p
                className="lead v-inv-lead"
                dangerouslySetInnerHTML={{ __html: t('inversion.lead_html') }}
              />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="v-inv-stage">
              {/* Card de comprador anônimo */}
              <article className="buyer-card">
                <div className="buyer-card-badge">
                  <span className="buyer-card-dot" />
                  {t('inversion.card_badge')}
                </div>
                <div className="buyer-card-who">{t('inversion.card_who')}</div>
                <dl className="buyer-card-meta">
                  <div>
                    <dt>{t('inversion.card_buy_label')}</dt>
                    <dd>{t('inversion.card_buy_value')}</dd>
                  </div>
                  <div>
                    <dt>{t('inversion.card_budget_label')}</dt>
                    <dd className="buyer-card-budget">{t('inversion.card_budget_value')}</dd>
                  </div>
                  <div>
                    <dt>{t('inversion.card_payment_label')}</dt>
                    <dd>
                      <span className="buyer-card-pill">{t('inversion.card_payment_value')}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>{t('inversion.card_deadline_label')}</dt>
                    <dd>{t('inversion.card_deadline_value')}</dd>
                  </div>
                </dl>
                <button
                  className="btn btn-brand buyer-card-cta"
                  onClick={() => navigate('vender')}
                  type="button"
                >
                  {t('inversion.card_cta')} <ArrowRight size={14} />
                </button>
                <div className="buyer-card-note">{t('inversion.card_note')}</div>
              </article>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p
              className="lead v-inv-outro"
              dangerouslySetInnerHTML={{ __html: t('inversion.outro_html') }}
            />
          </Reveal>
        </div>
      </section>

      {/* ─── 4. HOW · 4 passos self-service ─── */}
      <section className="surface-warm v-how">
        <div className="container">
          <Reveal>
            <div className="how-head">
              <span className="eyebrow">{t('how.eyebrow')}</span>
              <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 76px)', marginTop: 14 }}>
                {t('how.title')}
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="steps">
              {[1, 2, 3, 4].map(i => (
                <div className="step" key={i}>
                  <span className="step-num">{t(`how.s${i}_n`)}</span>
                  <div className="step-title">{t(`how.s${i}_t`)}</div>
                  <div className="step-body">{t(`how.s${i}_b`)}</div>
                  <div className="step-icon"><ArrowRight /></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 5. GUARANTEE · Diagnóstico 5x ─── */}
      <section className="v-guarantee">
        <div className="container">
          <Reveal>
            <div className="v-g-head">
              <span className="eyebrow">{t('guarantee.eyebrow')}</span>
              <div className="v-g-badge">{t('guarantee.product_name')}</div>
              <h2 className="display v-g-title">
                {t('guarantee.title_l1')}{' '}
                <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>
                  {t('guarantee.title_em')}
                </em>
                {t('guarantee.title_dot')}
              </h2>
              <p
                className="lead v-g-lead"
                dangerouslySetInnerHTML={{ __html: t('guarantee.lead_html') }}
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="v-g-branches">
              {[1, 2, 3].map(n => (
                <div className="v-g-branch" key={n}>
                  <div className="v-g-branch-icon" aria-hidden="true">{t(`guarantee.branch${n}_icon`)}</div>
                  <div className="v-g-branch-title">{t(`guarantee.branch${n}_title`)}</div>
                  <div className="v-g-branch-body">{t(`guarantee.branch${n}_body`)}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p
              className="v-g-outro"
              dangerouslySetInnerHTML={{ __html: t('guarantee.outro_html') }}
            />
          </Reveal>
        </div>
      </section>

      {/* ─── 6. DEMAND · tabela de cidades (mantida) ─── */}
      <section className="v-demand">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('demand.eyebrow')}</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 36px', maxWidth: '20ch' }}>
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
            <p className="v-demand-outro">{t('demand.outro')}</p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mono" style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 12, textAlign: 'right' }}>
              {t('demand.note')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── 7. SUPPORT · 6 cards full-service AGORA OPCIONAIS ─── */}
      <section className="v-support surface-warm">
        <div className="container">
          <Reveal>
            <div className="v-s-head">
              <span className="eyebrow">{t('support.eyebrow')}</span>
              <h2 className="display v-s-title">
                {t('support.title')}
              </h2>
              <p className="lead v-s-lead">{t('support.lead')}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="v-s-grid">
              {SUPPORT.map(([label, body]) => (
                <div className="card v-s-card" key={label}>
                  <div className="v-s-check" aria-hidden="true"><Check size={14} /></div>
                  <div>
                    <div className="v-s-card-title">{label}</div>
                    <div className="v-s-card-body">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="v-s-cta">
              <button className="btn btn-ghost btn-lg" onClick={() => navigate('contato')}>
                {t('support.cta')} <ArrowRight />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA navigate={navigate} role="seller" />
    </main>
  )
}
