import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import DiscoverySection from '../components/DiscoverySection'
import InsidePreview from '../components/InsidePreview'
import FinalCTA from '../components/FinalCTA'
import { ArrowRight, ArrowUpRight } from '../components/icons'
import type { NavigateFn } from '../types'

export default function HomePage({ navigate }: { navigate: NavigateFn }) {
  const { t } = useTranslation(['home', 'common'])

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
                <p className="lead" style={{ marginTop: 20, maxWidth: '54ch' }}>
                  <strong style={{ color: 'var(--ink)' }}>{t('home:hero.lead_audience')}</strong>
                  {t('home:hero.lead_dash')}
                  <strong style={{ color: 'var(--ink)' }}>{t('home:hero.lead_raridade')}</strong>
                  {t('home:hero.lead_tail')}
                </p>
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
                    src="/uploads/Versao%20Instagram%20Achamos%20Imoveis%201.0-a07a5d21.html"
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

      {/* PORTAIS */}
      <section>
        <div className="container">
          <Reveal>
            <div className="section-eyebrow"><span className="eyebrow">{t('home:portals.eyebrow')}</span></div>
          </Reveal>
          <Reveal>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '8px 0 36px', maxWidth: '14ch' }}>
              {t('home:portals.title')}
            </h2>
          </Reveal>
          <Reveal>
            <div className="portals">
              <div className="portal portal-buyer" onClick={() => navigate('comprador')}>
                <div className="portal-shape" />
                <div>
                  <span className="portal-eyebrow">{t('home:portals.buyer_eyebrow')}</span>
                  <div className="portal-title">{t('home:portals.buyer_title_l1')}<br />{t('home:portals.buyer_title_l2')}</div>
                </div>
                <div>
                  <p className="portal-sub">
                    {t('home:portals.buyer_sub_main')}<strong>{t('home:portals.buyer_sub_strong')}</strong>{t('home:portals.buyer_sub_tail')}
                  </p>
                  <div className="portal-cta">
                    {t('home:portals.buyer_cta')}
                    <span className="portal-cta-circle"><ArrowUpRight /></span>
                  </div>
                </div>
              </div>
              <div className="portal portal-seller" onClick={() => navigate('vendedor')}>
                <div className="portal-shape" />
                <div>
                  <span className="portal-eyebrow">{t('home:portals.seller_eyebrow')}</span>
                  <div className="portal-title">{t('home:portals.seller_title_l1')}<br />{t('home:portals.seller_title_l2')}</div>
                </div>
                <div>
                  <p className="portal-sub">
                    {t('home:portals.seller_sub_main')}<strong>{t('home:portals.seller_sub_strong')}</strong>{t('home:portals.seller_sub_tail')}
                  </p>
                  <div className="portal-cta">
                    {t('home:portals.seller_cta')}
                    <span className="portal-cta-circle"><ArrowUpRight /></span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <DiscoverySection navigate={navigate} />

      {/* INSTITUCIONAL VIDEO — "O jogo virou" (horizontal cinematic).
        Note: the motion-design HTML bundle is a single asset (~2.5MB base64-encoded
        SVG/font/JS) — the visible text inside the motion graphic is locked into
        those binary chunks and would require asset-level rebuild to translate.
        Wrapper chrome (eyebrow/title) IS i18n'd; the embedded video stays in PT. */}
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
                src="/uploads/Versao%20YouTube%20Achamos%20Imoveis%201.0-bbbe582d.html"
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
          <div className="how-head" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'end', marginBottom: 48 }}>
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
