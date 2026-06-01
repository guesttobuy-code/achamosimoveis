import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import { ArrowRight, Check } from '../components/icons'
import type { NavigateFn } from '../types'

export default function CompradorPage({ navigate }: { navigate: NavigateFn }) {
  const { t } = useTranslation('comprador')

  const TIMELINE = [
    { t: t('timeline.s1_t'), b: t('timeline.s1_b') },
    { t: t('timeline.s2_t'), b: t('timeline.s2_b') },
    { t: t('timeline.s3_t'), b: t('timeline.s3_b') },
    { t: t('timeline.s4_t'), b: t('timeline.s4_b') },
    { t: t('timeline.s5_t'), b: t('timeline.s5_b') },
    { t: t('timeline.s6_t'), b: t('timeline.s6_b') },
    { t: t('timeline.s7_t'), b: t('timeline.s7_b') },
  ]

  const INCLUDED: [string, string][] = [
    [t('included.i1_t'), t('included.i1_b')],
    [t('included.i2_t'), t('included.i2_b')],
    [t('included.i3_t'), t('included.i3_b')],
    [t('included.i4_t'), t('included.i4_b')],
    [t('included.i5_t'), t('included.i5_b')],
    [t('included.i6_t'), t('included.i6_b')],
  ]

  const PROMISES = [
    t('promises.p1'),
    t('promises.p2'),
    t('promises.p3'),
    t('promises.p4'),
    t('promises.p5'),
    t('promises.p6'),
  ]

  const TIERS = [
    {
      tier: t('tiers.light_tier'),
      price: t('tiers.light_price'),
      desc: t('tiers.light_desc'),
      features: [t('tiers.light_f1'), t('tiers.light_f2'), t('tiers.light_f3'), t('tiers.light_f4')],
      target: t('tiers.light_target'),
      cta: t('tiers.light_cta'),
      featured: false,
    },
    {
      tier: t('tiers.spotlight_tier'),
      price: t('tiers.spotlight_price'),
      desc: t('tiers.spotlight_desc'),
      features: [t('tiers.spotlight_f1'), t('tiers.spotlight_f2'), t('tiers.spotlight_f3'), t('tiers.spotlight_f4'), t('tiers.spotlight_f5'), t('tiers.spotlight_f6')],
      target: t('tiers.spotlight_target'),
      cta: t('tiers.spotlight_cta'),
      featured: true,
    },
    {
      tier: t('tiers.hunt_tier'),
      price: t('tiers.hunt_price'),
      desc: t('tiers.hunt_desc'),
      features: [t('tiers.hunt_f1'), t('tiers.hunt_f2'), t('tiers.hunt_f3'), t('tiers.hunt_f4'), t('tiers.hunt_f5'), t('tiers.hunt_f6')],
      target: t('tiers.hunt_target'),
      cta: t('tiers.hunt_cta'),
      featured: false,
    },
  ]

  const COMPARE_ROWS = [
    [t('compare.r1_label'), t('compare.r1_portal'), t('compare.r1_corretor'), t('compare.r1_imob'), t('compare.r1_achamos')],
    [t('compare.r2_label'), t('compare.r2_portal'), t('compare.r2_corretor'), t('compare.r2_imob'), t('compare.r2_achamos')],
    [t('compare.r3_label'), t('compare.r3_portal'), t('compare.r3_corretor'), t('compare.r3_imob'), t('compare.r3_achamos')],
    [t('compare.r4_label'), t('compare.r4_portal'), t('compare.r4_corretor'), t('compare.r4_imob'), t('compare.r4_achamos')],
    [t('compare.r5_label'), t('compare.r5_portal'), t('compare.r5_corretor'), t('compare.r5_imob'), t('compare.r5_achamos')],
    [t('compare.r6_label'), t('compare.r6_portal'), t('compare.r6_corretor'), t('compare.r6_imob'), t('compare.r6_achamos')],
    [t('compare.r7_label'), t('compare.r7_portal'), t('compare.r7_corretor'), t('compare.r7_imob'), t('compare.r7_achamos')],
    [t('compare.r8_label'), t('compare.r8_portal'), t('compare.r8_corretor'), t('compare.r8_imob'), t('compare.r8_achamos')],
    [t('compare.r9_label'), t('compare.r9_portal'), t('compare.r9_corretor'), t('compare.r9_imob'), t('compare.r9_achamos')],
  ]

  return (
    <main>
      {/* ═══════════════════════════════════════════════════════════
          HERO — pergunta provocativa (técnica de copywriting)
          ═══════════════════════════════════════════════════════════ */}
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('hero.eyebrow')}</span>
            <h1 className="page-hero-title">
              {t('hero.title_question_part1')}{' '}
              <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>
                {t('hero.title_question_em')}
              </em>
            </h1>
            <p className="lead" style={{ fontSize: 22 }}>
              {t('hero.lead_q1')}
              <strong style={{ color: 'var(--ink)' }}>{t('hero.lead_q1_strong1')}</strong>
              {t('hero.lead_q2')}
              <strong style={{ color: 'var(--ink)' }}>{t('hero.lead_q2_strong2')}</strong>
              {t('hero.lead_q3')}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
                {t('hero.cta_primary')} <ArrowRight />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => navigate('sobre')}>
                {t('hero.cta_secondary')}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SEÇÃO INVERSÃO — Como a Achamos faz o contrário
          Posts de Instagram fake como exemplos visuais
          ═══════════════════════════════════════════════════════════ */}
      <section className="inversion-section">
        <div className="container">
          <Reveal>
            <div className="inversion-head">
              <span className="eyebrow">{t('inversion.eyebrow')}</span>
              <h2 className="display inversion-title">
                {t('inversion.title_l1')}{' '}
                <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>{t('inversion.title_em')}</em>
                {t('inversion.title_l2')}
              </h2>
              <p
                className="lead inversion-intro"
                dangerouslySetInnerHTML={{ __html: t('inversion.intro_html') }}
              />
            </div>
          </Reveal>

          {/* 2 cards estilo post de Instagram */}
          <Reveal delay={120}>
            <div className="ig-cards">
              {/* Card A — Copacabana */}
              <article className="ig-card">
                <header className="ig-card-head">
                  <div className="ig-avatar" aria-hidden="true">A</div>
                  <div className="ig-card-id">
                    <div className="ig-handle">
                      {t('inversion.card_a_handle')}
                      <svg className="ig-verified" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2l2.4 1.8 3-.3 1 2.8 2.7 1.5-.7 2.9 1.5 2.6L20 14.7l-.4 3-3 .7-1.7 2.5-2.9-.8L9.4 22l-2.2-2.1-3 .2-1-2.8-2.7-1.5.7-2.9L0 10.3l1.9-2.4.3-3 3-.4 1.8-2.5 2.9.8L12 2zm-1 13l6-6-1.4-1.4-4.6 4.6-2.2-2.2L7.4 11.4 11 15z" />
                      </svg>
                    </div>
                    <div className="ig-sponsor">{t('inversion.card_a_subtitle')} · {t('inversion.card_a_loc')}</div>
                  </div>
                  <span className="ig-more" aria-hidden="true">⋯</span>
                </header>
                <div
                  className="ig-card-body"
                  dangerouslySetInnerHTML={{ __html: t('inversion.card_a_text') }}
                />
                <footer className="ig-card-foot">
                  <button className="ig-cta" onClick={() => navigate('vender')}>
                    {t('inversion.card_a_cta')} <ArrowRight size={14} />
                  </button>
                  <div className="ig-actions" aria-hidden="true">
                    <span>♡</span>
                    <span>💬</span>
                    <span>↗</span>
                  </div>
                </footer>
              </article>

              {/* Card B — Flamengo/Botafogo */}
              <article className="ig-card">
                <header className="ig-card-head">
                  <div className="ig-avatar" aria-hidden="true">A</div>
                  <div className="ig-card-id">
                    <div className="ig-handle">
                      {t('inversion.card_b_handle')}
                      <svg className="ig-verified" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2l2.4 1.8 3-.3 1 2.8 2.7 1.5-.7 2.9 1.5 2.6L20 14.7l-.4 3-3 .7-1.7 2.5-2.9-.8L9.4 22l-2.2-2.1-3 .2-1-2.8-2.7-1.5.7-2.9L0 10.3l1.9-2.4.3-3 3-.4 1.8-2.5 2.9.8L12 2zm-1 13l6-6-1.4-1.4-4.6 4.6-2.2-2.2L7.4 11.4 11 15z" />
                      </svg>
                    </div>
                    <div className="ig-sponsor">{t('inversion.card_b_subtitle')} · {t('inversion.card_b_loc')}</div>
                  </div>
                  <span className="ig-more" aria-hidden="true">⋯</span>
                </header>
                <div
                  className="ig-card-body"
                  dangerouslySetInnerHTML={{ __html: t('inversion.card_b_text') }}
                />
                <footer className="ig-card-foot">
                  <button className="ig-cta" onClick={() => navigate('vender')}>
                    {t('inversion.card_b_cta')} <ArrowRight size={14} />
                  </button>
                  <div className="ig-actions" aria-hidden="true">
                    <span>♡</span>
                    <span>💬</span>
                    <span>↗</span>
                  </div>
                </footer>
              </article>
            </div>
          </Reveal>

          {/* Texto pós-cards */}
          <Reveal delay={180}>
            <div className="inversion-outro">
              <p dangerouslySetInnerHTML={{ __html: t('inversion.outro_html') }} />
              <p dangerouslySetInnerHTML={{ __html: t('inversion.outro2_html') }} />
              <p dangerouslySetInnerHTML={{ __html: t('inversion.outro3_html') }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SEÇÃO TRANSPARÊNCIA — quebra objeção de preço antes dos planos
          ═══════════════════════════════════════════════════════════ */}
      <section className="transparency-section">
        <div className="container">
          <Reveal>
            <div className="transparency-inner">
              <span className="eyebrow">{t('transparency.eyebrow')}</span>
              <h2 className="display transparency-title">
                {t('transparency.title_l1')}{' '}
                <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>{t('transparency.title_em')}</em>
              </h2>
              <p
                className="lead transparency-body"
                dangerouslySetInnerHTML={{ __html: t('transparency.body1_html') }}
              />
              <p
                className="lead transparency-body"
                dangerouslySetInnerHTML={{ __html: t('transparency.body2_html') }}
              />
              <div className="transparency-guarantee">
                <strong className="transparency-q">{t('transparency.body3_q')}</strong>
                <p dangerouslySetInnerHTML={{ __html: t('transparency.body3_html') }} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 TIERS — Light · Spotlight · Hunt */}
      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="eyebrow">{t('tiers.eyebrow')}</span>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px auto 14px', maxWidth: '20ch' }}>
                {t('tiers.title')}
              </h2>
              <p className="lead" style={{ fontSize: 17, maxWidth: '64ch', margin: '0 auto' }}>
                <strong>{t('tiers.lead_part1')}</strong>{t('tiers.lead_part2')}<strong>{t('tiers.lead_part3')}</strong>{t('tiers.lead_part4')}<strong>{t('tiers.lead_part5')}</strong>{t('tiers.lead_part6')}<strong>{t('tiers.lead_part7')}</strong>
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {TIERS.map(tier => (
                <div key={tier.tier} style={{
                  padding: 28,
                  background: 'var(--white, #FFFFFF)',
                  border: tier.featured ? '2px solid var(--brand)' : '1px solid var(--line)',
                  borderRadius: 'var(--r-lg, 20px)',
                  boxShadow: tier.featured ? '0 12px 32px rgba(111, 45, 225, 0.15)' : '0 2px 12px rgba(32, 31, 31, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.15em', color: tier.featured ? 'var(--brand)' : 'var(--ink-soft)', marginBottom: 14, fontWeight: 700 }}>
                    {tier.tier}
                  </div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1 }}>
                    {tier.price}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, marginBottom: 22, lineHeight: 1.4 }}>
                    {tier.desc}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px 0', display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
                    {tier.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--ink)', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--brand)', flexShrink: 0, marginTop: 2 }}><Check size={14} /></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: 12, color: 'var(--ink-mute, #8B8989)', marginBottom: 18, paddingTop: 16, borderTop: '1px solid var(--line-soft)', fontStyle: 'italic' }}>
                    {tier.target}
                  </div>
                  <button
                    className={tier.featured ? 'btn btn-brand' : 'btn btn-ghost'}
                    onClick={() => navigate('comprar')}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {tier.cta} <ArrowRight />
                  </button>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Faixa de autoridade — sócios da maior agência de marketing digital
              BR. Posicionada logo após os 3 cards de planos pra quebrar a objeção
              "por que pago R$ 2.500?" no momento certo. */}
          <Reveal delay={180}>
            <div className="marketing-band">
              <div className="marketing-band-icon" aria-label={t('marketing.icon_alt')}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
              </div>
              <div className="marketing-band-text">
                <div className="marketing-band-eyebrow">{t('marketing.eyebrow')}</div>
                <p dangerouslySetInnerHTML={{ __html: t('marketing.body_html') }} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
            <Reveal>
              <div style={{ position: 'sticky', top: 110 }}>
                <span className="eyebrow">{t('timeline.eyebrow')}</span>
                <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', marginTop: 16 }}>
                  {t('timeline.title')}
                </h2>
                <p className="lead" style={{ marginTop: 20 }}>
                  {t('timeline.lead')}
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="tl">
                {TIMELINE.map((s, i) => (
                  <div className="tl-row" key={i}>
                    <div className="tl-num">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <div className="tl-title">{s.t}</div>
                      <div className="tl-body">{s.b}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6 PROMESSAS CRAVADAS — Spotlight garante */}
      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span className="eyebrow">{t('promises.eyebrow')}</span>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px auto 14px', maxWidth: '20ch' }}>
                {t('promises.title')}
              </h2>
              <p className="lead" style={{ fontSize: 17, maxWidth: '60ch', margin: '0 auto' }}>
                {t('promises.lead')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              {PROMISES.map((promise, i) => (
                <div key={i} className="card" style={{ padding: 22, display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--white, #FFFFFF)' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 999, background: 'var(--brand)', color: 'white',
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>
                    <Check size={16} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.5 }}>
                    {promise}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cp-na-pratica">
        <div className="container">
          <Reveal>
            <div className="cp-head">
              <span className="eyebrow">{t('mockups.eyebrow')}</span>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 14px', letterSpacing: '-0.025em' }}>
                {t('mockups.title_l1')} <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>{t('mockups.title_em')}</em>{t('mockups.title_dot')}
              </h2>
              <p className="lead" style={{ fontSize: 17 }}>
                {t('mockups.lead')}
              </p>
            </div>
          </Reveal>

          <div className="cp-visuals">
            {/* MOCKUP 1 — Dashboard view */}
            <Reveal>
              <div className="cp-device">
                <div className="cp-device-chrome">
                  <div className="cp-device-dots">
                    <span className="cp-device-dot" />
                    <span className="cp-device-dot" />
                    <span className="cp-device-dot" />
                  </div>
                  <div className="cp-device-url">{t('mockups.dash_url')}</div>
                </div>
                <div className="cp-dash">
                  <h3 className="cp-dash-greet">{t('mockups.dash_greet')}</h3>
                  <p className="cp-dash-sub">{t('mockups.dash_sub')}</p>

                  <div className="cp-dash-eyebrow">
                    <span>{t('mockups.dash_eyebrow')}</span>
                    <b>{t('mockups.dash_eyebrow_num')}</b>
                  </div>

                  <div className="cp-prop-card">
                    <div className="cp-prop-img cp-prop-img-1">
                      <span className="cp-prop-img-tag">{t('mockups.prop1_tag_new')}</span>
                    </div>
                    <div>
                      <div className="cp-prop-title">{t('mockups.prop1_title')}</div>
                      <div className="cp-prop-meta">{t('mockups.prop1_meta')}</div>
                      <div className="cp-prop-tags">
                        <span className="cp-prop-tag warn">{t('mockups.prop1_tag_off')}</span>
                        <span className="cp-prop-tag brand">{t('mockups.prop1_tag_match')}</span>
                        <span className="cp-prop-tag live">{t('mockups.prop1_tag_op')}</span>
                      </div>
                    </div>
                    <div className="cp-prop-score" style={{ ['--pct' as string]: 92 }}><span>92</span></div>
                  </div>

                  <div className="cp-prop-card">
                    <div className="cp-prop-img cp-prop-img-2" />
                    <div>
                      <div className="cp-prop-title">{t('mockups.prop2_title')}</div>
                      <div className="cp-prop-meta">{t('mockups.prop2_meta')}</div>
                      <div className="cp-prop-tags">
                        <span className="cp-prop-tag brand">{t('mockups.prop2_tag_match')}</span>
                      </div>
                    </div>
                    <div className="cp-prop-score" style={{ ['--pct' as string]: 88 }}><span>88</span></div>
                  </div>

                  <div className="cp-prop-card">
                    <div className="cp-prop-img cp-prop-img-3" />
                    <div>
                      <div className="cp-prop-title">{t('mockups.prop3_title')}</div>
                      <div className="cp-prop-meta">{t('mockups.prop3_meta')}</div>
                      <div className="cp-prop-tags">
                        <span className="cp-prop-tag brand">{t('mockups.prop3_tag_match')}</span>
                      </div>
                    </div>
                    <div className="cp-prop-score" style={{ ['--pct' as string]: 85 }}><span>85</span></div>
                  </div>
                </div>
              </div>
              <p className="cp-device-explain">
                <b>{t('mockups.dash_explain_strong')}</b>{t('mockups.dash_explain_text')}
              </p>
            </Reveal>

            {/* MOCKUP 2 — Conversa com a equipe */}
            <Reveal delay={120}>
              <div className="cp-device">
                <div className="cp-device-chrome">
                  <div className="cp-device-dots">
                    <span className="cp-device-dot" />
                    <span className="cp-device-dot" />
                    <span className="cp-device-dot" />
                  </div>
                  <div className="cp-device-url">{t('mockups.chat_url')}</div>
                </div>
                <div className="cp-chat">
                  <div className="cp-chat-head">
                    <div className="cp-chat-avt">MR</div>
                    <div>
                      <div className="cp-chat-name">{t('mockups.chat_name')}</div>
                      <div className="cp-chat-meta">{t('mockups.chat_meta')}</div>
                    </div>
                  </div>

                  <div className="cp-chat-body">
                    <div className="cp-bubble them">{t('mockups.chat_msg1')}</div>

                    <div className="cp-chat-prop">
                      <div className="cp-chat-prop-gallery">
                        <div className="cp-chat-prop-img-big">
                          <span className="cp-chat-prop-tag-on-img">{t('mockups.chat_prop_tag_off')}</span>
                          <span className="cp-chat-prop-count">{t('mockups.chat_prop_count')}</span>
                        </div>
                        <div className="cp-chat-prop-img-side">
                          <div className="cp-chat-prop-img-thumb a" />
                          <div className="cp-chat-prop-img-thumb b" />
                        </div>
                      </div>
                      <div className="cp-chat-prop-info">
                        <div className="cp-chat-prop-name">{t('mockups.chat_prop_name')}</div>
                        <div className="cp-chat-prop-specs">{t('mockups.chat_prop_specs')}</div>
                        <div className="cp-chat-prop-features">
                          <span className="cp-prop-tag brand">{t('mockups.chat_prop_f1')}</span>
                          <span className="cp-prop-tag brand">{t('mockups.chat_prop_f2')}</span>
                          <span className="cp-prop-tag brand">{t('mockups.chat_prop_f3')}</span>
                        </div>
                        <div className="cp-chat-prop-price-row">
                          <div className="cp-chat-prop-price">{t('mockups.chat_prop_price')}</div>
                          <span className="cp-prop-tag brand">{t('mockups.chat_prop_match')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="cp-bubble them">{t('mockups.chat_msg2')}</div>

                    <div className="cp-chat-prop-cta">
                      <button className="cp-chat-mini-btn primary">{t('mockups.chat_cta_primary')}</button>
                      <button className="cp-chat-mini-btn ghost">{t('mockups.chat_cta_ghost')}</button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="cp-device-explain">
                <b>{t('mockups.chat_explain_strong')}</b>{t('mockups.chat_explain_text')}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMPARATIVO BRUTAL — Achamos vs alternativas */}
      <section>
        <div className="container">
          <Reveal>
            <div style={{ marginBottom: 40 }}>
              <span className="eyebrow">{t('compare.eyebrow')}</span>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 14px', maxWidth: '24ch' }}>
                {t('compare.title_l1')} <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>{t('compare.title_em')}</em>{t('compare.title_dot')}
              </h2>
              <p className="lead" style={{ fontSize: 17, maxWidth: '64ch' }}>
                {t('compare.lead')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ overflowX: 'auto', borderRadius: 'var(--r-md, 12px)', boxShadow: '0 2px 16px rgba(32,31,31,0.06)', border: '1px solid var(--line)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, background: 'var(--white, #FFFFFF)', minWidth: 700 }}>
                <thead>
                  <tr style={{ background: 'var(--ink)', color: 'var(--paper, #F4F0EB)' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, letterSpacing: '0.05em', fontWeight: 700 }}>{t('compare.col_criterio')}</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700 }}>{t('compare.col_portal')}</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700 }}>{t('compare.col_corretor')}</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700 }}>{t('compare.col_imob')}</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--brand)' }}>{t('compare.col_achamos')}</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid var(--line-soft)', background: i % 2 === 0 ? 'var(--paper-soft, #FAF7F2)' : 'var(--white, #FFFFFF)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--ink)' }}>{row[0]}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--ink-soft)' }}>{row[1]}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--ink-soft)' }}>{row[2]}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--ink-soft)' }}>{row[3]}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 700, color: 'var(--ink)', background: 'rgba(111, 45, 225, 0.04)' }}>{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('included.eyebrow')}</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 16px', maxWidth: '16ch' }}>
              {t('included.title')}
            </h2>
            <p className="lead" style={{ fontSize: 17, maxWidth: '56ch', marginBottom: 40 }}>
              <strong>{t('included.lead_strong1')}</strong>{t('included.lead_part2')}<strong>{t('included.lead_strong2')}</strong>{t('included.lead_part3')}
            </p>
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

      <FinalCTA navigate={navigate} role="buyer" />
    </main>
  )
}
