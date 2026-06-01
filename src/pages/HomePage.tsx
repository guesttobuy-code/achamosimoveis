import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import DiscoverySection from '../components/DiscoverySection'
import InsidePreview from '../components/InsidePreview'
import FinalCTA from '../components/FinalCTA'
import { ArrowRight, ArrowUpRight } from '../components/icons'
import type { NavigateFn } from '../types'

export default function HomePage({ navigate }: { navigate: NavigateFn }) {
  const { t, i18n } = useTranslation(['home', 'common'])

  // Resolve videos by active language. Three localized bundles each
  // (PT/EN/ES) live under /public/uploads/. The motion graphic's visible
  // text is translated inside the JSX chunks of the bundle itself.
  const lang2 = (i18n.resolvedLanguage || 'pt').slice(0, 2).toLowerCase()
  const langKey = (lang2 === 'pt' || lang2 === 'en' || lang2 === 'es') ? lang2 : 'en'
  const videoInstaSrc = `/uploads/Versao-Instagram-${langKey}.html`
  const videoYouTubeSrc = `/uploads/Versao-YouTube-${langKey}.html`

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid hero-grid-video">
            <div className="hero-copy">
              <Reveal>
                <span className="hero-tag">
                  <span className="hero-tag-dot" />
                  {t('home:hero.tag')}
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="display hero-title" style={{ marginTop: 28 }}>
                  <span>{t('home:hero.title_part1')}{' '}</span>
                  <span>{t('home:hero.title_part2')}{' '}</span>
                  <em>{t('home:hero.title_em')}</em>
                </h1>
              </Reveal>
              <Reveal delay={140}>
                {/* lead_html contém <strong> inline; dangerouslySetInnerHTML
                    é seguro aqui porque o conteúdo vem da nossa tradução
                    própria (não de input do usuário). */}
                <p
                  className="lead lead-html"
                  style={{ marginTop: 20, maxWidth: '54ch' }}
                  dangerouslySetInnerHTML={{ __html: t('home:hero.lead_html') }}
                />
              </Reveal>
              <Reveal delay={180}>
                <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
                  <button className="btn btn-brand btn-lg" onClick={() => navigate('comecar')}>
                    {t('home:hero.cta_primary')} <ArrowRight />
                  </button>
                  <button className="btn btn-ghost btn-lg" onClick={() => navigate('vender')}>
                    {t('home:hero.cta_secondary')}
                  </button>
                </div>
              </Reveal>
            </div>

            {/* RIGHT: Phone mockup with vertical video */}
            <Reveal delay={220} className="hero-phone-wrap">
              <div className="hero-phone">
                <div className="hero-phone-notch" aria-hidden="true">
                  <span className="hero-phone-notch-bar" />
                </div>
                <div className="hero-phone-screen">
                  <iframe
                    key={videoInstaSrc}
                    src={videoInstaSrc}
                    title="Achamos — demonstração"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                    aria-hidden="true"
                  />
                </div>
                <div className="hero-phone-button" aria-hidden="true" />
              </div>
              <div className="hero-phone-caption">
                <span className="hero-phone-dot" />
                {t('home:hero.phone_caption')}
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">{t('home:hero.stat_region_num')}</div>
                <div className="hero-stat-lbl">{t('home:hero.stat_region_lbl')}</div>
              </div>
              <div>
                <div className="hero-stat-num">{t('home:hero.stat_creci_num')}</div>
                <div className="hero-stat-lbl">{t('home:hero.stat_creci_lbl')}</div>
              </div>
              <div>
                <div className="hero-stat-num">{t('home:hero.stat_sla_num')}</div>
                <div className="hero-stat-lbl">{t('home:hero.stat_sla_lbl')}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={[
        t('home:marquee.i1'),
        t('home:marquee.i2'),
        t('home:marquee.i3'),
        t('home:marquee.i4'),
        t('home:marquee.i5'),
        t('home:marquee.i6'),
        t('home:marquee.i7'),
      ]} />

      {/* ═══════════════════════════════════════════════════════════
          METODOLOGIA (NOVO) — substitui a antiga seção "Em qual lado você está?"
          Hero condensado da página /comprador trazido pro home com:
            - Pergunta provocativa + lead curto
            - 1 card Instagram fake (Copacabana R$ 1M)
            - 3 bullets (modelo / resultado / garantia)
            - 2 CTAs (buscar agora · entender em detalhe)
          ═══════════════════════════════════════════════════════════ */}
      <section className="metodologia-home">
        <div className="container">
          <Reveal>
            <div className="metodologia-home-head">
              <span className="eyebrow">{t('home:methodology.eyebrow')}</span>
              <h2 className="display metodologia-home-title">
                {t('home:methodology.title_l1')}<br />
                {t('home:methodology.title_l2')}{' '}
                <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>
                  {t('home:methodology.title_em')}
                </em>
                {t('home:methodology.title_dot')}
              </h2>
              <p
                className="lead metodologia-home-lead"
                dangerouslySetInnerHTML={{ __html: t('home:methodology.lead_html') }}
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="metodologia-home-stage">
              {/* Card Instagram fake */}
              <article className="ig-card metodologia-home-card">
                <header className="ig-card-head">
                  <div className="ig-avatar" aria-hidden="true">A</div>
                  <div className="ig-card-id">
                    <div className="ig-handle">
                      {t('home:methodology.card_handle')}
                      <svg className="ig-verified" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2l2.4 1.8 3-.3 1 2.8 2.7 1.5-.7 2.9 1.5 2.6L20 14.7l-.4 3-3 .7-1.7 2.5-2.9-.8L9.4 22l-2.2-2.1-3 .2-1-2.8-2.7-1.5.7-2.9L0 10.3l1.9-2.4.3-3 3-.4 1.8-2.5 2.9.8L12 2zm-1 13l6-6-1.4-1.4-4.6 4.6-2.2-2.2L7.4 11.4 11 15z" />
                      </svg>
                    </div>
                    <div className="ig-sponsor">
                      {t('home:methodology.card_sponsor')} · {t('home:methodology.card_loc')}
                    </div>
                  </div>
                  <span className="ig-more" aria-hidden="true">⋯</span>
                </header>
                <div
                  className="ig-card-body"
                  dangerouslySetInnerHTML={{ __html: t('home:methodology.card_body_html') }}
                />
                <footer className="ig-card-foot">
                  <button className="ig-cta" onClick={() => navigate('vender')}>
                    {t('home:methodology.card_cta')} <ArrowRight size={14} />
                  </button>
                  <div className="ig-actions" aria-hidden="true">
                    <span>♡</span><span>💬</span><span>↗</span>
                  </div>
                </footer>
              </article>

              {/* 3 bullets */}
              <div className="metodologia-home-bullets">
                {[1, 2, 3].map(n => (
                  <div className="bullet" key={n}>
                    <div className="bullet-num">{t(`home:methodology.b${n}_num`)}</div>
                    <div>
                      <div className="bullet-title">{t(`home:methodology.b${n}_title`)}</div>
                      <div
                        className="bullet-desc"
                        dangerouslySetInnerHTML={{ __html: t(`home:methodology.b${n}_desc_html`) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="metodologia-home-cta">
              <button className="btn btn-brand btn-lg" onClick={() => navigate('comecar')}>
                {t('home:methodology.cta_primary')} <ArrowRight />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => navigate('comprador')}>
                {t('home:methodology.cta_secondary')}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PORTAIS COMPACTOS — versão reduzida do "Em qual lado você está?"
          Mantém o caminho visual pra comprador/vendedor sem dominar a tela.
          ═══════════════════════════════════════════════════════════ */}
      <section className="portals-compact-section">
        <div className="container">
          <Reveal>
            <div className="portals-compact">
              <button
                className="portal-compact portal-compact-buyer"
                onClick={() => navigate('comprador')}
                type="button"
              >
                <div className="portal-compact-text">
                  <div className="portal-compact-eyebrow">{t('home:portals.buyer_eyebrow')}</div>
                  <div className="portal-compact-title">
                    {t('home:portals.buyer_title_l1')} {t('home:portals.buyer_title_l2')}
                  </div>
                </div>
                <div className="portal-compact-arrow" aria-hidden="true">
                  <ArrowUpRight />
                </div>
              </button>
              <button
                className="portal-compact portal-compact-seller"
                onClick={() => navigate('vendedor')}
                type="button"
              >
                <div className="portal-compact-text">
                  <div className="portal-compact-eyebrow">{t('home:portals.seller_eyebrow')}</div>
                  <div className="portal-compact-title">
                    {t('home:portals.seller_title_l1')} {t('home:portals.seller_title_l2')}
                  </div>
                </div>
                <div className="portal-compact-arrow" aria-hidden="true">
                  <ArrowUpRight />
                </div>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <DiscoverySection navigate={navigate} />

      {/* INSTITUCIONAL VIDEO — "O jogo virou" (horizontal cinematic).
        Bundles localizados em /public/uploads/ — Versao-YouTube-{pt,en,es}.html.
        O texto visual dentro da motion graphic é traduzido nos chunks JSX do
        próprio bundle (gerados via scripts em
        ../Rendizyoficial-backup.../{repack-video.cjs,video-i18n-dict.json}). */}
      <section className="hv-section">
        <div className="container">
          <Reveal>
            <div className="hv-head">
              <span className="eyebrow">{t('home:video.eyebrow')}</span>
              <h2 className="display hv-title">
                {t('home:video.title_part1')} <em>{t('home:video.title_em')}</em>{t('home:video.title_dot')}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="hv-frame">
              <iframe
                key={videoYouTubeSrc}
                src={videoYouTubeSrc}
                title={t('home:video.title_part1') + ' ' + t('home:video.title_em')}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CREDIBILIDADE — Imobiliária digital com CRECI + sede física */}
      <section className="cr-section">
        <div className="container">
          <div className="cr-grid">
            <Reveal>
              <div className="cr-copy">
                <span className="eyebrow">{t('home:credibility.eyebrow')}</span>
                <h2 className="display cr-title">
                  {t('home:credibility.title_l1')} <em>{t('home:credibility.title_em1')}</em>{t('home:credibility.title_dot1')}<br />
                  {t('home:credibility.title_l2')} <em>{t('home:credibility.title_em2')}</em>{t('home:credibility.title_dot2')}
                </h2>
                <p className="cr-lead">
                  {t('home:credibility.lead1_part1')}<strong>{t('home:credibility.lead1_strong1')}</strong>{t('home:credibility.lead1_part2')}<strong>{t('home:credibility.lead1_strong2')}</strong>{t('home:credibility.lead1_part3')}
                </p>
                <p className="cr-lead">
                  {t('home:credibility.lead2_part1')}<strong>{t('home:credibility.lead2_strong')}</strong>{t('home:credibility.lead2_part2')}
                </p>

                <div className="cr-features">
                  <div className="cr-feature">
                    <div className="cr-feature-num">01</div>
                    <div>
                      <strong>{t('home:credibility.feature1_strong')}</strong>
                      <span>{t('home:credibility.feature1_desc')}</span>
                    </div>
                  </div>
                  <div className="cr-feature">
                    <div className="cr-feature-num">02</div>
                    <div>
                      <strong>{t('home:credibility.feature2_strong')}</strong>
                      <span>{t('home:credibility.feature2_desc')}</span>
                    </div>
                  </div>
                  <div className="cr-feature">
                    <div className="cr-feature-num">03</div>
                    <div>
                      <strong>{t('home:credibility.feature3_strong')}</strong>
                      <span>{t('home:credibility.feature3_desc')}</span>
                    </div>
                  </div>
                  <div className="cr-feature">
                    <div className="cr-feature-num">04</div>
                    <div>
                      <strong>{t('home:credibility.feature4_strong')}</strong>
                      <span>{t('home:credibility.feature4_desc')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="cr-media">
                <figure className="cr-photo cr-photo-lg">
                  <img
                    src="/assets/rota-corretor.webp"
                    alt={t('home:credibility.photo1_alt')}
                    loading="lazy"
                  />
                  <figcaption>
                    <span className="cr-photo-eyebrow">
                      <span className="cr-photo-dot" />
                      {t('home:credibility.photo1_eyebrow')}
                    </span>
                    <strong>{t('home:credibility.photo1_strong')}</strong>
                    <span className="cr-photo-meta">
                      {t('home:credibility.photo1_meta')}
                    </span>
                  </figcaption>
                </figure>

                <figure className="cr-photo cr-photo-sm">
                  <img
                    src="/assets/corretor-cliente-carro.webp"
                    alt={t('home:credibility.photo2_alt')}
                    loading="lazy"
                  />
                  <figcaption>
                    <span className="cr-photo-eyebrow">
                      <span className="cr-photo-dot" />
                      {t('home:credibility.photo2_eyebrow')}
                    </span>
                    <strong>{t('home:credibility.photo2_strong')}</strong>
                    <span className="cr-photo-meta">{t('home:credibility.photo2_meta')}</span>
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INSIDE PREVIEW — "Lá dentro, é o vendedor que vem até você" */}
      <InsidePreview navigate={navigate} />

      {/* COMO FUNCIONA — RESUMO */}
      <section className="surface-warm">
        <div className="container">
          <div className="how-head">
            <Reveal>
              <span className="eyebrow">{t('home:how4.eyebrow')}</span>
              <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 76px)', marginTop: 14 }}>
                {t('home:how4.title')}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead">
                {t('home:how4.lead')}
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="steps">
              {[
                { n: '01', t: t('home:how4.s1_t'), b: t('home:how4.s1_b') },
                { n: '02', t: t('home:how4.s2_t'), b: t('home:how4.s2_b') },
                { n: '03', t: t('home:how4.s3_t'), b: t('home:how4.s3_b') },
                { n: '04', t: t('home:how4.s4_t'), b: t('home:how4.s4_b') },
              ].map(s => (
                <div className="step" key={s.n}>
                  <span className="step-num">{s.n}</span>
                  <div className="step-title">{s.t}</div>
                  <div className="step-body">{s.b}</div>
                  <div className="step-icon"><ArrowRight /></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section>
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('home:social.eyebrow')}</span>
          </Reveal>
          <Reveal>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '12px 0 36px', maxWidth: '18ch' }}>
              {t('home:social.title')}
            </h2>
          </Reveal>
          <Reveal>
            <div className="testi">
              {[
                { q: t('home:social.t1_q'), n: t('home:social.t1_n'), m: t('home:social.t1_m') },
                { q: t('home:social.t2_q'), n: t('home:social.t2_n'), m: t('home:social.t2_m') },
                { q: t('home:social.t3_q'), n: t('home:social.t3_n'), m: t('home:social.t3_m') },
              ].map((tt, i) => (
                <div className="testi-card" key={i}>
                  <div className="testi-quote">{tt.q}</div>
                  <div className="testi-foot">
                    <div className="testi-avatar">{tt.n.split(' ')[0][0]}</div>
                    <div>
                      <div className="testi-name">{tt.n}</div>
                      <div className="testi-meta">{tt.m}</div>
                    </div>
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
