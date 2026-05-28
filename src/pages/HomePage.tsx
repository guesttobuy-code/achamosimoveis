import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import DiscoverySection from '../components/DiscoverySection'
import InsidePreview from '../components/InsidePreview'
import FinalCTA from '../components/FinalCTA'
import { ArrowRight, ArrowUpRight } from '../components/icons'
import type { NavigateFn } from '../types'

type Headline = { main: string[]; em: string }

const HEADLINES: Headline[] = [
  { main: ['Compra à vista', 'ou financiamento', 'aprovado?'], em: 'aprovado?' },
  { main: ['Pode fechar?', 'Aqui você', 'é raro.'], em: 'é raro.' },
  { main: ['Comprador com', 'capacidade', 'comprovada vence.'], em: 'capacidade' },
]

export default function HomePage({ navigate }: { navigate: NavigateFn }) {
  const h = HEADLINES[0]

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
                  Imobiliária digital · Rio de Janeiro · todo o estado
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="display hero-title" style={{ marginTop: 28 }}>
                  {h.main.map((w, i) =>
                    w === h.em ? <em key={i}>{w}{' '}</em> : <span key={i}>{w}{' '}</span>
                  )}
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="lead" style={{ marginTop: 20, maxWidth: '54ch' }}>
                  <strong style={{ color: 'var(--ink)' }}>Investidor, funcionário público, empresário</strong> — você que está no seu momento de comprar um imóvel. <strong style={{ color: 'var(--ink)' }}>Comprador de imóvel que pode fechar é raridade no mercado</strong>, e nossa missão é levar até você a melhor oportunidade. Sua busca vira anúncio direcionado nas redes sociais, e proprietários motivados — inclusive aqueles cujo imóvel nem estava à venda — correm até você.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
                  <button className="btn btn-brand btn-lg" onClick={() => navigate('comecar')}>
                    Quero achar meu imóvel <ArrowRight />
                  </button>
                  <button className="btn btn-ghost btn-lg" onClick={() => navigate('vender')}>
                    Quero anunciar
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
                Entenda em poucos segundos como trazemos as melhores oportunidades pra você
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">RJ</div>
                <div className="hero-stat-lbl">Todo o estado do Rio de Janeiro</div>
              </div>
              <div>
                <div className="hero-stat-num">CRECI</div>
                <div className="hero-stat-lbl">Corretores certificados · time jurídico próprio</div>
              </div>
              <div>
                <div className="hero-stat-num">7 DIAS</div>
                <div className="hero-stat-lbl">Primeira oportunidade qualificada na sua busca</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={[
        'Busca ativa',
        'Melhores preços pra compra',
        'Match comprador × vendedor',
        'Oportunidades off-market',
        'RJ · todo o estado',
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
                    Você diz o que procura. A gente volta com 3 a 5 oportunidades — <strong>boa parte off-market</strong>, fora de portal nenhum. Visita acompanhada e negociação conduzida.
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

      {/* INSTITUCIONAL VIDEO — "O jogo virou" (horizontal cinematic) */}
      <section className="hv-section">
        <div className="container">
          <Reveal>
            <div className="hv-head">
              <span className="eyebrow">Em 67 segundos</span>
              <h2 className="display hv-title">
                O jogo <em>virou</em>.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="hv-frame">
              <iframe
                src="/uploads/Versao%20YouTube%20Achamos%20Imoveis%201.0-bbbe582d.html"
                title="Achamos — o jogo virou"
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
                <span className="eyebrow">Imobiliária digital com sede física</span>
                <h2 className="display cr-title">
                  Tecnologia que <em>encontra</em>.<br />
                  Gente que <em>cuida</em>.
                </h2>
                <p className="cr-lead">
                  Somos uma imobiliária com <strong>sede física no Rio de Janeiro</strong> e ampla atuação digital.
                  Corretores <strong>certificados pelo CRECI</strong>, time jurídico próprio para dar
                  total segurança aos nossos clientes.
                </p>
                <p className="cr-lead">
                  Traçamos uma rota bem planejada com os imóveis selecionados e levamos você até cada um deles —
                  com <strong>conforto e organização do início ao fim</strong>.
                </p>

                <div className="cr-features">
                  <div className="cr-feature">
                    <div className="cr-feature-num">01</div>
                    <div>
                      <strong>CRECI ativo</strong>
                      <span>Corretores registrados e fiscalizados</span>
                    </div>
                  </div>
                  <div className="cr-feature">
                    <div className="cr-feature-num">02</div>
                    <div>
                      <strong>Jurídico próprio</strong>
                      <span>Contratos, documentação e segurança</span>
                    </div>
                  </div>
                  <div className="cr-feature">
                    <div className="cr-feature-num">03</div>
                    <div>
                      <strong>Sede física no RJ</strong>
                      <span>Atendimento pessoal quando você precisar</span>
                    </div>
                  </div>
                  <div className="cr-feature">
                    <div className="cr-feature-num">04</div>
                    <div>
                      <strong>Roteiro guiado</strong>
                      <span>Visitas planejadas, transporte confortável</span>
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
                    alt="Cliente e corretor planejam a rota de visitas pelo Rio de Janeiro, com tablet mostrando os imóveis a visitar"
                    loading="lazy"
                  />
                  <figcaption>
                    <span className="cr-photo-eyebrow">
                      <span className="cr-photo-dot" />
                      Rota planejada
                    </span>
                    <strong>Cada visita é desenhada antes da saída.</strong>
                    <span className="cr-photo-meta">
                      Quatro paradas · Ipanema · Copacabana · Flamengo · Centro
                    </span>
                  </figcaption>
                </figure>

                <figure className="cr-photo cr-photo-sm">
                  <img
                    src="/assets/corretor-cliente-carro.webp"
                    alt="Corretor da Achamos conversa com cliente no caminho para visitar imóveis no Rio"
                    loading="lazy"
                  />
                  <figcaption>
                    <span className="cr-photo-eyebrow">
                      <span className="cr-photo-dot" />
                      Corretor com você
                    </span>
                    <strong>A gente leva. A gente acompanha.</strong>
                    <span className="cr-photo-meta">Visitas guiadas por corretores CRECI</span>
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
                { n: '03', t: 'Filtramos e selecionamos', b: 'Você recebe 3 a 5 opções com score de match — inclusive imóveis off-market que não rodam em portal nenhum.' },
                { n: '04', t: 'Você visita e decide', b: 'Acompanhamos a visita, a negociação e toda a documentação.' },
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
                { q: '"Mudei de São Paulo querendo cobertura no Flamengo. 6 meses caçando sozinho — tudo já vendido. Em 45 dias, recebi as chaves de uma cobertura que nunca foi anunciada em portal. R$ 200 mil abaixo do mercado."', n: 'Pedro Henrique', m: 'Cobertura · Flamengo · ✦ exemplo ilustrativo' },
                { q: '"Primeiro imóvel da família. Vi 30 imóveis em portais sem fechar. Em 60 dias estava na cozinha do apto novo — escolhido entre 3 candidatos selecionados pela equipe."', n: 'Beatriz Carvalho', m: 'Apto · Vila Isabel · ✦ exemplo ilustrativo' },
                { q: '"Moro em Ipanema há 30 anos. Nunca pensei em vender. Vi um post da Achamos buscando 3 dorms aqui. Em 45 dias estava vendido — sem placa na janela, sem publicar em portal."', n: 'Maria Helena', m: 'Vendeu apto · Ipanema · ✦ exemplo ilustrativo' },
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
