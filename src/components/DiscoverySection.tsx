import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import { ArrowRight } from './icons'
import type { NavigateFn } from '../types'

type FeedRow = {
  loc: string
  desc: string
  tag: string
  cls: 't-radar' | 't-off' | 't-ativo' | 't-match'
  live: boolean
}

function DiscoveryFeed({ feed }: { feed: FeedRow[] }) {
  const { t } = useTranslation('home')
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setOffset(o => (o + 1) % feed.length), 3500)
    return () => clearInterval(id)
  }, [feed.length])

  const visible: FeedRow[] = []
  for (let i = 0; i < 7; i++) {
    visible.push(feed[(offset + i) % feed.length])
  }

  return (
    <div className="feed">
      <div className="feed-head">
        <div className="feed-status-dot" />
        <div className="feed-title">{t('discovery.feed_title')}</div>
        <div className="feed-meta">{t('discovery.feed_meta')}</div>
      </div>
      <div className="feed-rows">
        {visible.map((row, i) => (
          <div className="feed-row" key={`${offset}-${i}`} style={{ animationDelay: `${i * 60}ms` }}>
            <div className={'feed-row-dot' + (row.live ? ' live' : '')} />
            <div className="feed-row-main">
              <div className="feed-row-loc">{row.loc}</div>
              <div className="feed-row-desc">{row.desc}</div>
            </div>
            <div className={'feed-row-tag ' + row.cls}>{row.tag}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Ícone de seta direita (chevron) para o botão de próximo card */
function ChevronRight() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export default function DiscoverySection({ navigate }: { navigate: NavigateFn }) {
  const { t } = useTranslation('home')

  /* ── Carrossel (mobile) ───────────────────────────────── */
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  function handleScroll() {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setActiveIdx(Math.max(0, Math.min(idx, PAINS.length - 1)))
  }

  function goToIdx(idx: number) {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({
      left: idx * scrollRef.current.clientWidth,
      behavior: 'smooth',
    })
  }

  /* ── Dados das dores (i18n) ───────────────────────────── */
  const PAINS = [
    {
      num: '01',
      dor: t('discovery.p1_dor'),
      dorDesc: t('discovery.p1_dor_desc'),
      resp: t('discovery.p1_resp'),
      respDesc: t('discovery.p1_resp_desc'),
    },
    {
      num: '02',
      dor: t('discovery.p2_dor'),
      dorDesc: t('discovery.p2_dor_desc'),
      resp: t('discovery.p2_resp'),
      respDesc: t('discovery.p2_resp_desc'),
    },
    {
      num: '03',
      dor: t('discovery.p3_dor'),
      dorDesc: t('discovery.p3_dor_desc'),
      resp: t('discovery.p3_resp'),
      respDesc: t('discovery.p3_resp_desc'),
    },
    {
      num: '04',
      dor: t('discovery.p4_dor'),
      dorDesc: t('discovery.p4_dor_desc'),
      resp: t('discovery.p4_resp'),
      respDesc: t('discovery.p4_resp_desc'),
    },
    {
      num: '05',
      dor: t('discovery.p5_dor'),
      dorDesc: t('discovery.p5_dor_desc'),
      resp: t('discovery.p5_resp'),
      respDesc: t('discovery.p5_resp_desc'),
    },
  ]

  const FEED: FeedRow[] = [
    { loc: t('discovery.feed_r1_loc'), desc: t('discovery.feed_r1_desc'), tag: t('discovery.tag_ativo'), cls: 't-ativo', live: true },
    { loc: t('discovery.feed_r2_loc'), desc: t('discovery.feed_r2_desc'), tag: t('discovery.tag_off'),   cls: 't-off',   live: true },
    { loc: t('discovery.feed_r3_loc'), desc: t('discovery.feed_r3_desc'), tag: t('discovery.tag_match'), cls: 't-match', live: false },
    { loc: t('discovery.feed_r4_loc'), desc: t('discovery.feed_r4_desc'), tag: t('discovery.tag_ativo'), cls: 't-ativo', live: false },
    { loc: t('discovery.feed_r5_loc'), desc: t('discovery.feed_r5_desc'), tag: t('discovery.tag_off'),   cls: 't-off',   live: true },
    { loc: t('discovery.feed_r6_loc'), desc: t('discovery.feed_r6_desc'), tag: t('discovery.tag_match'), cls: 't-match', live: false },
    { loc: t('discovery.feed_r7_loc'), desc: t('discovery.feed_r7_desc'), tag: t('discovery.tag_ativo'), cls: 't-ativo', live: false },
    { loc: t('discovery.feed_r8_loc'), desc: t('discovery.feed_r8_desc'), tag: t('discovery.tag_off'),   cls: 't-off',   live: false },
  ]

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          SEÇÃO 1 — 5 Dores Resolvidas
          Desktop: lista empilhada
          Mobile: carrossel horizontal com snap + seta ›
          ═══════════════════════════════════════════════════ */}
      <section>
        <div className="container">
          <Reveal>
            <div className="discovery">
              <div className="discovery-head">
                <div>
                  <span className="eyebrow" style={{ color: 'rgba(244, 240, 235, 0.5)' }}>
                    {t('discovery.pains_eyebrow')}
                  </span>
                  <h2 className="discovery-title">
                    {t('discovery.pains_title_l1')}<br />
                    {t('discovery.pains_title_l2')} <em>{t('discovery.pains_title_em')}</em>{t('discovery.pains_title_dot')}
                  </h2>
                </div>
                <p className="discovery-lead">
                  {t('discovery.pains_lead_part1')}
                  <strong style={{ color: 'var(--inverse-fg)' }}>{t('discovery.pains_lead_strong')}</strong>
                  {t('discovery.pains_lead_part2')}
                </p>
              </div>

              {/* Lista / Carrossel */}
              <div
                className="discovery-pillars"
                ref={scrollRef}
                onScroll={handleScroll}
                style={{ marginTop: 32 }}
              >
                {PAINS.map((p, i) => (
                  <div className="pillar" key={p.num}>
                    <span className="pillar-num">{p.num}</span>

                    {/* Conteúdo: DOR → RESPOSTA */}
                    <div className="pillar-body">
                      {/* DOR */}
                      <div>
                        <div className="pillar-label pillar-label-dor">
                          {t('discovery.pain_label_dor')}
                        </div>
                        <div className="pillar-title">{p.dor}</div>
                        <div className="pillar-sub pillar-sub-muted">{p.dorDesc}</div>
                      </div>

                      {/* Seta central */}
                      <div className="pillar-arrow-central" aria-hidden="true">→</div>

                      {/* RESPOSTA */}
                      <div>
                        <div className="pillar-label pillar-label-resp">
                          {t('discovery.pain_label_resp')}
                        </div>
                        <div className="pillar-title">{p.resp}</div>
                        <div className="pillar-sub">{p.respDesc}</div>
                      </div>
                    </div>

                    {/* Botão › próximo card — só visível/funcional no mobile */}
                    <button
                      className={'pillar-next-btn' + (i === PAINS.length - 1 ? ' pillar-next-btn--last' : '')}
                      onClick={() => i < PAINS.length - 1 ? goToIdx(i + 1) : goToIdx(0)}
                      aria-label={
                        i < PAINS.length - 1
                          ? t('discovery.carousel_next')
                          : t('discovery.carousel_first')
                      }
                      type="button"
                      tabIndex={-1}   /* não entra no tab-order no desktop */
                    >
                      <ChevronRight />
                    </button>
                  </div>
                ))}
              </div>

              {/* Dots de paginação — só visíveis no mobile */}
              <div className="pillar-dots" role="tablist">
                {PAINS.map((_, i) => (
                  <button
                    key={i}
                    className={'pillar-dot' + (i === activeIdx ? ' active' : '')}
                    onClick={() => goToIdx(i)}
                    role="tab"
                    aria-selected={i === activeIdx}
                    aria-label={`${i + 1} / ${PAINS.length}`}
                    type="button"
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 40, flexWrap: 'wrap' }}>
                <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
                  {t('discovery.pains_cta_primary')} <ArrowRight />
                </button>
                <button
                  className="btn btn-light btn-lg"
                  onClick={() => navigate('comprador')}
                  style={{ background: 'transparent', color: 'var(--inverse-fg)', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  {t('discovery.pains_cta_secondary')}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SEÇÃO 2 — Radar Achamos
          ═══════════════════════════════════════════════════ */}
      <section>
        <div className="container">
          <Reveal>
            <div className="discovery">
              <div className="discovery-head">
                <div>
                  <span className="eyebrow" style={{ color: 'rgba(244, 240, 235, 0.5)' }}>
                    {t('discovery.radar_eyebrow')}
                  </span>
                  <h2 className="discovery-title">
                    {t('discovery.radar_title_l1')}<br />
                    {t('discovery.radar_title_l2')} <em>{t('discovery.radar_title_em')}</em>{t('discovery.radar_title_dot')}
                  </h2>
                </div>
                <p className="discovery-lead">
                  {t('discovery.radar_lead_part1')}
                  <strong style={{ color: 'var(--inverse-fg)' }}>{t('discovery.radar_lead_strong1')}</strong>
                  {t('discovery.radar_lead_part2')}
                </p>
              </div>

              <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: 720 }}>
                  <DiscoveryFeed feed={FEED} />
                </div>
              </div>

              <div
                style={{
                  marginTop: 32,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 16,
                  paddingTop: 32,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--brand)', marginBottom: 8, fontWeight: 700 }}>
                    {t('discovery.tag_ativo')}
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.5 }}>{t('discovery.legend_ativo_desc')}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--brand)', marginBottom: 8, fontWeight: 700 }}>
                    {t('discovery.tag_off')}
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.5 }}>{t('discovery.legend_off_desc')}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--brand)', marginBottom: 8, fontWeight: 700 }}>
                    {t('discovery.tag_match')}
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.5 }}>{t('discovery.legend_match_desc')}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
                <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
                  {t('discovery.radar_cta')} <ArrowRight />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
