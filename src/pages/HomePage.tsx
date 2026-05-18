import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import DiscoverySection from '../components/DiscoverySection'
import FinalCTA from '../components/FinalCTA'
import { ArrowRight, ArrowUpRight } from '../components/icons'
import type { NavigateFn } from '../types'

type Headline = { main: string[]; em: string }

const HEADLINES: Headline[] = [
  { main: ['Os melhores imóveis', 'vêm', 'até você'], em: 'vêm' },
  { main: ['A imobiliária que', 'inverteu', 'o jogo'], em: 'inverteu' },
  { main: ['Pare de caçar.', 'A gente', 'acha.'], em: 'acha' },
]

export default function HomePage({ navigate }: { navigate: NavigateFn }) {
  const h = HEADLINES[0]

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <Reveal>
                <span className="hero-tag">
                  <span className="hero-tag-dot" />
                  124 compradores ativos esta semana
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="display hero-title" style={{ marginTop: 28 }}>
                  {h.main.map((w, i) =>
                    w === h.em ? <em key={i}>{w}{' '}</em> : <span key={i}>{w}{' '}</span>
                  )}
                </h1>
              </Reveal>
            </div>
            <Reveal delay={160} className="hero-side">
              <p className="lead">
                Vendedores oferecendo as <strong style={{ color: 'var(--ink)' }}>melhores oportunidades</strong> pra você comprador. <strong style={{ color: 'var(--ink)' }}>IA + campanhas</strong> vão atrás de quem tem o imóvel certo — mesmo de quem nem pensava em vender.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                <button className="btn btn-brand btn-lg" onClick={() => navigate('comecar')}>
                  Quero achar meu imóvel <ArrowRight />
                </button>
                <button className="btn btn-ghost btn-lg" onClick={() => navigate('vender')}>
                  Quero anunciar
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">+150</div>
                <div className="hero-stat-lbl">Imóveis na carteira</div>
              </div>
              <div>
                <div className="hero-stat-num">SP · RJ · MG</div>
                <div className="hero-stat-lbl">3 estados · prioridade nas capitais</div>
              </div>
              <div>
                <div className="hero-stat-num">48h</div>
                <div className="hero-stat-lbl">1ª oferta no seu Whatsapp</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={[
        'Busca ativa',
        'Sem caça ao tesouro',
        'Match comprador × vendedor',
        'BH · SP · RJ · Radar IA',
        'Você só vê o que faz sentido',
        'O comprador é a estrela',
      ]} />

      {/* PORTAIS */}
      <section>
        <div className="container">
          <Reveal>
            <div className="section-eyebrow"><span className="eyebrow">Duas portas, um match</span></div>
          </Reveal>
          <Reveal>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '8px 0 36px', maxWidth: '14ch' }}>
              Em qual lado você está?
            </h2>
          </Reveal>
          <Reveal>
            <div className="portals">
              <div className="portal portal-buyer" onClick={() => navigate('comprador')}>
                <div className="portal-shape" />
                <div>
                  <span className="portal-eyebrow">Sou comprador</span>
                  <div className="portal-title">A gente acha<br />pra você.</div>
                </div>
                <div>
                  <p className="portal-sub">
                    Você diz o que procura. <strong>IA + campanhas</strong> vão atrás — inclusive de vendedores que nem estão anunciando. Voltamos com 3 a 5 oportunidades.
                  </p>
                  <div className="portal-cta">
                    Como funciona pro comprador
                    <span className="portal-cta-circle"><ArrowUpRight /></span>
                  </div>
                </div>
              </div>
              <div className="portal portal-seller" onClick={() => navigate('vendedor')}>
                <div className="portal-shape" />
                <div>
                  <span className="portal-eyebrow">Sou vendedor</span>
                  <div className="portal-title">Tem comprador<br />esperando.</div>
                </div>
                <div>
                  <p className="portal-sub">
                    Anuncie sabendo quantas pessoas já procuram algo como o seu imóvel — nosso radar descobre <strong>compradores que combinam</strong> antes mesmo de você publicar.
                  </p>
                  <div className="portal-cta">
                    Como funciona pro vendedor
                    <span className="portal-cta-circle"><ArrowUpRight /></span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <DiscoverySection navigate={navigate} />

      {/* COMO FUNCIONA — RESUMO */}
      <section className="surface-warm">
        <div className="container">
          <div className="how-head" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'end', marginBottom: 48 }}>
            <Reveal>
              <span className="eyebrow">Como funciona</span>
              <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 76px)', marginTop: 14 }}>
                Quatro passos. Sem mistério.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead">
                A diferença entre nós e uma imobiliária tradicional cabe em quatro passos.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="steps">
              {[
                { n: '01', t: 'Você nos conta o que quer', b: 'Briefing rápido por chat — região, tipo, faixa de valor, prazo.' },
                { n: '02', t: 'A gente sai à caça', b: 'Busca ativa na nossa carteira e em uma rede de vendedores parceiros.' },
                { n: '03', t: 'Filtramos e selecionamos', b: 'Você só vê o que faz sentido pro seu perfil — não uma vitrine genérica.' },
                { n: '04', t: 'Você visita e decide', b: 'Acompanhamos a visita, a negociação e toda a documentação.' },
              ].map(s => (
                <div className="step" key={s.n}>
                  <span className="step-num">{s.n}</span>
                  <div className="step-title">{s.t}</div>
                  <div className="step-body">{s.b}</div>
                  <div className="step-icon"><ArrowRight size={20} /></div>
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
            <span className="eyebrow">Quem já confiou</span>
          </Reveal>
          <Reveal>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '12px 0 36px', maxWidth: '18ch' }}>
              Gente real, achando o que procurava.
            </h2>
          </Reveal>
          <Reveal>
            <div className="testi">
              {[
                { q: '"Em 3 semanas eu tinha as chaves. Eles trouxeram dois imóveis que eu nem sabia que existiam."', n: 'Mariana C.', m: 'Comprou apto · BH' },
                { q: '"Anunciei segunda. Quinta tinha 4 visitas marcadas. Vendeu em 22 dias."', n: 'Eduardo V.', m: 'Vendeu cobertura · SP' },
                { q: '"Não me empurraram nada. Foram entender o que eu queria de verdade antes de mostrar."', n: 'Camila R.', m: 'Comprou casa · Rio de Janeiro' },
              ].map((t, i) => (
                <div className="testi-card" key={i}>
                  <div className="testi-quote">{t.q}</div>
                  <div className="testi-foot">
                    <div className="testi-avatar">{t.n.split(' ')[0][0]}</div>
                    <div>
                      <div className="testi-name">{t.n}</div>
                      <div className="testi-meta">{t.m}</div>
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
