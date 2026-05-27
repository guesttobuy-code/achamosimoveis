import Reveal from './Reveal'
import { ArrowRight } from './icons'
import type { NavigateFn } from '../types'

/**
 * InsidePreview — section "Lá dentro, é o vendedor que vem até você".
 * Dashboard mock (Oi Carolina + cards de imóveis com match score) + chat mock
 * (Mariana corretora com fotos enviadas pelo vendedor) + 2 callouts flutuantes.
 *
 * Imagens em /public/assets/ (referenciadas como /assets/imovel-X.png).
 * Portado de `[pasta limpa]/achamos-site/src/pages.jsx:132-329` (JSX → TSX).
 */
export default function InsidePreview({ navigate }: { navigate: NavigateFn }) {
  return (
    <section className="ip-section">
      <div className="container">
        <div className="ip-head">
          <Reveal>
            <span className="eyebrow">Quando você loga</span>
            <h2 className="display ip-title">
              Lá dentro, é o <em>vendedor</em>
              <br />que vem até você.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead ip-lead">
              Cards de imóveis com score de match, fotos enviadas direto pelo vendedor no chat, e
              ofertas <strong style={{ color: 'var(--ink)' }}>off-market</strong> que não rodam em
              portal. Você só vê o que faz sentido pra você.
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
                  app.achamos.com.br/oportunidades
                </div>
              </div>

              <div className="ip-dash-body">
                <div className="ip-dash-greet">
                  <div>
                    <div className="ip-dash-hi">
                      Oi, Carolina <span className="ip-wave">👋</span>
                    </div>
                    <div className="ip-dash-sub">Sua busca está ativa. Encontramos coisa nova pra você.</div>
                  </div>
                  <div className="ip-dash-badge">
                    <span className="ip-dot-live" />
                    Radar ligado
                  </div>
                </div>

                <div className="ip-stats">
                  <div>
                    <div className="ip-stat-lbl">Novas</div>
                    <div className="ip-stat-num">3</div>
                  </div>
                  <div>
                    <div className="ip-stat-lbl">Análise</div>
                    <div className="ip-stat-num">5</div>
                  </div>
                  <div>
                    <div className="ip-stat-lbl">Visitas</div>
                    <div className="ip-stat-num">2</div>
                  </div>
                  <div>
                    <div className="ip-stat-lbl">Match médio</div>
                    <div className="ip-stat-num ip-stat-acc">87%</div>
                  </div>
                </div>

                <div className="ip-list-head">
                  <div className="ip-list-title">Últimas oportunidades</div>
                  <div className="ip-list-link">Ver todas →</div>
                </div>

                <div className="ip-cards">
                  <div className="ip-card ip-card-new">
                    <div className="ip-thumb ip-thumb-photo" aria-hidden="true">
                      <img src="/assets/imovel-varanda-lagoa.png" alt="" loading="lazy" />
                      <span className="ip-thumb-tag">FOTO · vendedor</span>
                    </div>
                    <div className="ip-card-body">
                      <div className="ip-card-name">Apartamento · Pinheiros, SP</div>
                      <div className="ip-card-meta">3 dorm · 102m² · 1 vaga · R$ 980 mil</div>
                      <div className="ip-pills">
                        <span className="ip-pill ip-pill-off">OFF-MARKET</span>
                        <span className="ip-pill ip-pill-match">92% MATCH</span>
                        <span className="ip-pill ip-pill-new">NOVO · 12min</span>
                      </div>
                    </div>
                    <MatchRing pct={92} />
                  </div>

                  <div className="ip-card">
                    <div className="ip-thumb ip-thumb-photo" aria-hidden="true">
                      <img src="/assets/imovel-casa-jardim.png" alt="" loading="lazy" />
                      <span className="ip-thumb-tag">FOTO · vendedor</span>
                    </div>
                    <div className="ip-card-body">
                      <div className="ip-card-name">Casa térrea · Vila Madalena, SP</div>
                      <div className="ip-card-meta">3 dorm · 180m² · 2 vagas · R$ 1,2 mi</div>
                      <div className="ip-pills">
                        <span className="ip-pill ip-pill-carteira">CARTEIRA</span>
                        <span className="ip-pill ip-pill-match">88% MATCH</span>
                      </div>
                    </div>
                    <MatchRing pct={88} />
                  </div>

                  <div className="ip-card">
                    <div className="ip-thumb ip-thumb-photo" aria-hidden="true">
                      <img src="/assets/imovel-piscina.png" alt="" loading="lazy" />
                      <span className="ip-thumb-tag">FOTO · vendedor</span>
                    </div>
                    <div className="ip-card-body">
                      <div className="ip-card-name">Cobertura · Itaim Bibi, SP</div>
                      <div className="ip-card-meta">4 dorm · 240m² · 3 vagas · R$ 2,8 mi</div>
                      <div className="ip-pills">
                        <span className="ip-pill ip-pill-off">OFF-MARKET</span>
                        <span className="ip-pill ip-pill-match">85% MATCH</span>
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
                  <div className="ip-chat-name">Mariana · Achamos</div>
                  <div className="ip-chat-status">corretora · respondendo agora</div>
                </div>
                <div className="ip-chat-time">12:42</div>
              </div>

              <div className="ip-chat-body">
                <div className="ip-day">Hoje</div>

                <div className="ip-bubble ip-bubble-them">
                  Oi Carolina! Achei um apto em <strong>Pinheiros</strong> que faz muito sentido pro
                  seu briefing. <strong>Off-market</strong> — o dono nem tava anunciando, a gente
                  conversou direto.
                </div>

                <div className="ip-bubble ip-bubble-them ip-bubble-photos">
                  <div className="ip-photo-strip">
                    <div className="ip-photo">
                      <img src="/assets/imovel-varanda-lagoa.png" alt="" loading="lazy" />
                    </div>
                    <div className="ip-photo">
                      <img src="/assets/imovel-aereo-flamengo.png" alt="" loading="lazy" />
                    </div>
                    <div className="ip-photo">
                      <img src="/assets/imovel-entrada.png" alt="" loading="lazy" />
                    </div>
                    <div className="ip-photo ip-photo-more-wrap">
                      <img src="/assets/imovel-escritorio.png" alt="" loading="lazy" />
                      <span className="ip-photo-more">+8</span>
                    </div>
                  </div>
                  <div className="ip-photo-cap">
                    <PaperclipIcon /> 12 fotos · enviadas pelo vendedor
                  </div>
                </div>

                <div className="ip-bubble ip-bubble-them">
                  Preço entre o que você falou. Posso marcar visita sábado de manhã?
                </div>

                <div className="ip-typing">
                  <i />
                  <i />
                  <i /> digitando…
                </div>
              </div>

              <div className="ip-chat-input">
                <span className="ip-input-ph">Escrever mensagem…</span>
                <span className="ip-input-send">↑</span>
              </div>
            </div>

            {/* ===== Annotation labels ===== */}
            <div className="ip-anno ip-anno-1">
              <span className="ip-anno-line" />
              <span className="ip-anno-text">Match score por imóvel</span>
            </div>
            <div className="ip-anno ip-anno-3">
              <span className="ip-anno-line" />
              <span className="ip-anno-text">
                Fotos enviadas direto
                <br />pelo vendedor
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="ip-cta">
            <div className="ip-cta-text">
              <strong>É isso que te espera depois do briefing.</strong> Não é vitrine pública — é
              uma sala particular onde o vendedor vem até você.
            </div>
            <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
              Começar briefing <ArrowRight />
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
