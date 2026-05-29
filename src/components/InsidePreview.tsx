import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import { ArrowRight } from './icons'
import type { NavigateFn } from '../types'

/**
 * InsidePreview — section "Lá dentro, é o vendedor que vem até você".
 * Dashboard mock (Oi Carolina + cards de imóveis com match score) + chat mock
 * (Mariana corretora com fotos enviadas pelo vendedor) + 2 callouts flutuantes.
 *
 * Imagens em /public/assets/ (referenciadas como /assets/imovel-X.webp).
 * Portado de `[pasta limpa]/achamos-site/src/pages.jsx:132-329` (JSX → TSX).
 */
export default function InsidePreview({ navigate }: { navigate: NavigateFn }) {
  const { t } = useTranslation('home')

  return (
    <section className="ip-section">
      <div className="container">
        <div className="ip-head">
          <Reveal>
            <span className="eyebrow">{t('inside.eyebrow')}</span>
            <h2 className="display ip-title">
              {t('inside.title_part1')} <em>{t('inside.title_em')}</em>
              <br />{t('inside.title_part2')}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead ip-lead">
              {t('inside.lead_part1')}<strong style={{ color: 'var(--ink)' }}>{t('inside.lead_strong')}</strong>{t('inside.lead_part2')}
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="ip-stage">
            {/* ===== LEFT: Dashboard mock ===== */}
            <div className="ip-dash">
              <div className="ip-chrome">
                <div className="ip-chrome-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="ip-chrome-url">
                  <span className="ip-chrome-lock">●</span>
                  {t('inside.dash_url')}
                </div>
              </div>

              <div className="ip-dash-body">
                <div className="ip-dash-greet">
                  <div>
                    <div className="ip-dash-hi">
                      {t('inside.dash_hi')} <span className="ip-wave">👋</span>
                    </div>
                    <div className="ip-dash-sub">{t('inside.dash_sub')}</div>
                  </div>
                  <div className="ip-dash-badge">
                    <span className="ip-dot-live" />
                    {t('inside.dash_badge')}
                  </div>
                </div>

                <div className="ip-stats">
                  <div>
                    <div className="ip-stat-lbl">{t('inside.stat_novas')}</div>
                    <div className="ip-stat-num">3</div>
                  </div>
                  <div>
                    <div className="ip-stat-lbl">{t('inside.stat_analise')}</div>
                    <div className="ip-stat-num">5</div>
                  </div>
                  <div>
                    <div className="ip-stat-lbl">{t('inside.stat_visitas')}</div>
                    <div className="ip-stat-num">2</div>
                  </div>
                  <div>
                    <div className="ip-stat-lbl">{t('inside.stat_match')}</div>
                    <div className="ip-stat-num ip-stat-acc">87%</div>
                  </div>
                </div>

                <div className="ip-list-head">
                  <div className="ip-list-title">{t('inside.list_title')}</div>
                  <div className="ip-list-link">{t('inside.list_link')}</div>
                </div>

                <div className="ip-cards">
                  <div className="ip-card ip-card-new">
                    <div className="ip-thumb ip-thumb-photo" aria-hidden="true">
                      <img src="/assets/imovel-varanda-lagoa.webp" alt="" loading="lazy" />
                      <span className="ip-thumb-tag">{t('inside.thumb_tag')}</span>
                    </div>
                    <div className="ip-card-body">
                      <div className="ip-card-name">{t('inside.card1_name')}</div>
                      <div className="ip-card-meta">{t('inside.card1_meta')}</div>
                      <div className="ip-pills">
                        <span className="ip-pill ip-pill-off">{t('inside.pill_off')}</span>
                        <span className="ip-pill ip-pill-match">92% {t('inside.pill_match')}</span>
                        <span className="ip-pill ip-pill-new">{t('inside.pill_new')}</span>
                      </div>
                    </div>
                    <MatchRing pct={92} />
                  </div>

                  <div className="ip-card">
                    <div className="ip-thumb ip-thumb-photo" aria-hidden="true">
                      <img src="/assets/imovel-casa-jardim.webp" alt="" loading="lazy" />
                      <span className="ip-thumb-tag">{t('inside.thumb_tag')}</span>
                    </div>
                    <div className="ip-card-body">
                      <div className="ip-card-name">{t('inside.card2_name')}</div>
                      <div className="ip-card-meta">{t('inside.card2_meta')}</div>
                      <div className="ip-pills">
                        <span className="ip-pill ip-pill-carteira">{t('inside.pill_carteira')}</span>
                        <span className="ip-pill ip-pill-match">88% {t('inside.pill_match')}</span>
                      </div>
                    </div>
                    <MatchRing pct={88} />
                  </div>

                  <div className="ip-card">
                    <div className="ip-thumb ip-thumb-photo" aria-hidden="true">
                      <img src="/assets/imovel-piscina.webp" alt="" loading="lazy" />
                      <span className="ip-thumb-tag">{t('inside.thumb_tag')}</span>
                    </div>
                    <div className="ip-card-body">
                      <div className="ip-card-name">{t('inside.card3_name')}</div>
                      <div className="ip-card-meta">{t('inside.card3_meta')}</div>
                      <div className="ip-pills">
                        <span className="ip-pill ip-pill-off">{t('inside.pill_off')}</span>
                        <span className="ip-pill ip-pill-match">85% {t('inside.pill_match')}</span>
                      </div>
                    </div>
                    <MatchRing pct={85} />
                  </div>
                </div>
              </div>
            </div>

            {/* ===== RIGHT: Chat mock ===== */}
            <div className="ip-chat">
              <div className="ip-chat-head">
                <div className="ip-chat-avatar">
                  MA
                  <span className="ip-chat-online" />
                </div>
                <div className="ip-chat-id">
                  <div className="ip-chat-name">{t('inside.chat_name')}</div>
                  <div className="ip-chat-status">{t('inside.chat_status')}</div>
                </div>
                <div className="ip-chat-time">{t('inside.chat_time')}</div>
              </div>

              <div className="ip-chat-body">
                <div className="ip-day">{t('inside.chat_day')}</div>

                <div className="ip-bubble ip-bubble-them">
                  {t('inside.chat_msg1_part1')}<strong>{t('inside.chat_msg1_strong1')}</strong>{t('inside.chat_msg1_part2')}<strong>{t('inside.chat_msg1_strong2')}</strong>{t('inside.chat_msg1_part3')}
                </div>

                <div className="ip-bubble ip-bubble-them ip-bubble-photos">
                  <div className="ip-photo-strip">
                    <div className="ip-photo">
                      <img src="/assets/imovel-varanda-lagoa.webp" alt="" loading="lazy" />
                    </div>
                    <div className="ip-photo">
                      <img src="/assets/imovel-aereo-flamengo.webp" alt="" loading="lazy" />
                    </div>
                    <div className="ip-photo">
                      <img src="/assets/imovel-entrada.webp" alt="" loading="lazy" />
                    </div>
                    <div className="ip-photo ip-photo-more-wrap">
                      <img src="/assets/imovel-escritorio.webp" alt="" loading="lazy" />
                      <span className="ip-photo-more">+8</span>
                    </div>
                  </div>
                  <div className="ip-photo-cap">
                    <PaperclipIcon /> {t('inside.chat_photo_cap')}
                  </div>
                </div>

                <div className="ip-bubble ip-bubble-them">
                  {t('inside.chat_msg2')}
                </div>

                <div className="ip-typing">
                  <i />
                  <i />
                  <i /> {t('inside.chat_typing')}
                </div>
              </div>

              <div className="ip-chat-input">
                <span className="ip-input-ph">{t('inside.chat_input_ph')}</span>
                <span className="ip-input-send">↑</span>
              </div>
            </div>

            {/* ===== Annotation labels ===== */}
            <div className="ip-anno ip-anno-1">
              <span className="ip-anno-line" />
              <span className="ip-anno-text">{t('inside.anno1')}</span>
            </div>
            <div className="ip-anno ip-anno-3">
              <span className="ip-anno-line" />
              <span className="ip-anno-text">
                {t('inside.anno3_l1')}
                <br />{t('inside.anno3_l2')}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="ip-cta">
            <div className="ip-cta-text">
              <strong>{t('inside.cta_strong')}</strong>{t('inside.cta_text')}
            </div>
            <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
              {t('inside.cta_button')} <ArrowRight />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Anel SVG do score de match (0-100) */
function MatchRing({ pct }: { pct: number }) {
  const r = 18
  const C = 2 * Math.PI * r
  const dash = (pct / 100) * C
  return (
    <svg className="ip-ring" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r={r} stroke="rgba(26,24,25,0.10)" strokeWidth="3" fill="none" />
      <circle
        cx="24"
        cy="24"
        r={r}
        stroke="#6F2DE1"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${C}`}
        transform="rotate(-90 24 24)"
      />
      <text
        x="24"
        y="27.5"
        textAnchor="middle"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        fontWeight="700"
        fill="#1A1819"
      >
        {pct}
      </text>
    </svg>
  )
}

function PaperclipIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  )
}
