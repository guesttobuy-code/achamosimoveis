import Reveal from '../components/Reveal'
import { ArrowRight, ArrowUpRight } from '../components/icons'
import type { NavigateFn } from '../types'

const PORTAL_URL = import.meta.env.VITE_PORTAL_URL || 'https://app.achamos.com.br'

export default function ComecarPage({ navigate }: { navigate: NavigateFn }) {
  return (
    <main>
      <section className="hero" style={{ paddingTop: 'clamp(28px, 4vw, 56px)', paddingBottom: 'clamp(16px, 2vw, 28px)' }}>
        <div className="container">
          <Reveal>
            <span className="hero-tag">
              <span className="hero-tag-dot" />
              PASSO 1 DE 2 · ESCOLHA A JORNADA
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display" style={{ fontSize: 'clamp(40px, 6vw, 84px)', margin: '20px 0 14px', maxWidth: '16ch', letterSpacing: '-0.03em' }}>
              Como você quer achar seu imóvel <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>hoje</em>?
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lead" style={{ marginBottom: 0 }}>Três caminhos. Escolha pelo seu momento — pode trocar quando quiser.</p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="comecar-grid">
              {/* Pilar 01 — Achamos+ (featured) */}
              <article className="comecar-card comecar-card-1" onClick={() => navigate('comprar')}>
                <span className="comecar-card-badge comecar-card-badge-recommended">RECOMENDADO</span>
                <div>
                  <div className="comecar-card-num">01 · O VENDEDOR TE PROCURA</div>
                  <div className="comecar-card-name">
                    Quero as propostas <em>correndo atrás</em> de mim.
                  </div>
                  <p className="comecar-card-desc">
                    Você descreve o que procura. IA + nossa equipe vão atrás — inclusive de vendedores que nem pensavam em vender. Você só vê o que faz sentido.
                  </p>
                </div>
                <div className="comecar-card-cta">
                  Começar briefing
                  <span className="comecar-card-cta-circle"><ArrowUpRight size={14} /></span>
                </div>
              </article>

              {/* Pilar 02 — Portal */}
              <article className="comecar-card comecar-card-2" onClick={() => window.location.href = PORTAL_URL}>
                <span className="comecar-card-badge comecar-card-badge-soon">EM BREVE</span>
                <div>
                  <div className="comecar-card-num">02 · PORTAL</div>
                  <div className="comecar-card-name">
                    Quero <em>buscar</em> agora.
                  </div>
                  <p className="comecar-card-desc">
                    Navegue o catálogo público. Filtros, mapa, agendamento de visita — tudo digital, no seu tempo. Pra quem prefere explorar antes de conversar.
                  </p>
                </div>
                <div className="comecar-card-cta">
                  Buscar imóveis
                  <span className="comecar-card-cta-circle"><ArrowUpRight size={14} /></span>
                </div>
              </article>

              {/* Pilar 03 — Se hospede */}
              <article className="comecar-card comecar-card-3" onClick={() => window.location.href = `${PORTAL_URL}/se-hospede`}>
                <span className="comecar-card-badge comecar-card-badge-soon">EM BREVE</span>
                <div>
                  <div className="comecar-card-num">03 · SE HOSPEDE PARA COMPRAR</div>
                  <div className="comecar-card-name">
                    Quero <em>experimentar</em> antes.
                  </div>
                  <p className="comecar-card-desc">
                    Hospede-se no imóvel que quer comprar. Conheça vizinhança, condomínio, rotina. Se decidir comprar, a estadia vira crédito no fechamento.
                  </p>
                </div>
                <div className="comecar-card-cta">
                  Ver imóveis disponíveis
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
                <div className="eyebrow" style={{ marginBottom: 6 }}>Quer vender, não comprar?</div>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>
                  Anuncie seu imóvel — descobrimos quem combina antes de você publicar.
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => navigate('vender')}>
                Anunciar imóvel <ArrowRight />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
