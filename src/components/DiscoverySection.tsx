import { useEffect, useState } from 'react'
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

const FEED: FeedRow[] = [
  { loc: 'Itaim Bibi · SP',      desc: 'Apto 3 dorm. · sinalização pelo radar',          tag: 'RADAR IA',   cls: 't-radar', live: true  },
  { loc: 'Lourdes · BH',         desc: 'Cobertura · ativação via campanha',              tag: 'OFF-MARKET', cls: 't-off',   live: true  },
  { loc: 'Leblon · RJ',          desc: 'Apto 2 dorm. · vendedor anônimo despertado',     tag: 'RADAR IA',   cls: 't-radar', live: false },
  { loc: 'Pinheiros · SP',       desc: 'Casa · carteira ativa · match 92%',              tag: 'ATIVO',      cls: 't-ativo', live: false },
  { loc: 'Savassi · BH',         desc: 'Apto 4 dorm. · prospecção dirigida',             tag: 'RADAR IA',   cls: 't-radar', live: true  },
  { loc: 'Barra da Tijuca · RJ', desc: 'Cobertura · parceiro local',                     tag: 'MATCH',      cls: 't-match', live: false },
  { loc: 'Vila Madalena · SP',   desc: 'Sobrado · sinalização algoritmo',                tag: 'OFF-MARKET', cls: 't-off',   live: false },
  { loc: 'Belvedere · BH',       desc: 'Casa · ativação iniciada',                       tag: 'RADAR IA',   cls: 't-radar', live: false },
]

function DiscoveryFeed({ feed }: { feed: FeedRow[] }) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setOffset(o => (o + 1) % feed.length), 3500)
    return () => clearInterval(id)
  }, [feed.length])

  const visible: FeedRow[] = []
  for (let i = 0; i < 6; i++) {
    visible.push(feed[(offset + i) % feed.length])
  }

  return (
    <div className="feed">
      <div className="feed-head">
        <div className="feed-status-dot" />
        <div className="feed-title">Radar · ao vivo</div>
        <div className="feed-meta">SP · RJ · MG</div>
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

export default function DiscoverySection({ navigate }: { navigate: NavigateFn }) {
  return (
    <section>
      <div className="container">
        <Reveal>
          <div className="discovery">
            <div className="discovery-head">
              <div>
                <span className="eyebrow" style={{ color: 'rgba(244, 240, 235, 0.5)' }}>O motor por trás</span>
                <h2 className="discovery-title">
                  Achamos vendedores que <em>nem sabiam</em> que iam vender.
                </h2>
              </div>
              <p className="discovery-lead">
                Quando você diz o que procura, a gente não olha só quem já anunciou. <strong style={{ color: 'var(--inverse-fg)' }}>IA + campanhas dirigidas</strong> revelam oportunidades off-market — vendedores que têm o imóvel certo mas ainda não pensaram em vender.
              </p>
            </div>

            <div className="discovery-body">
              <div className="discovery-pillars">
                <div className="pillar">
                  <span className="pillar-num">01</span>
                  <div>
                    <div className="pillar-title">Carteira ativa</div>
                    <div className="pillar-sub">Mais de 150 imóveis já cadastrados conosco, prontos pra apresentar.</div>
                  </div>
                  <span className="pillar-tag">+150</span>
                </div>
                <div className="pillar">
                  <span className="pillar-num">02</span>
                  <div>
                    <div className="pillar-title">Rede de parceiros</div>
                    <div className="pillar-sub">Dezenas de imobiliárias e corretores parceiros em SP, RJ e MG — estoque cruzado.</div>
                  </div>
                  <span className="pillar-tag">SP · RJ · MG</span>
                </div>
                <div className="pillar featured">
                  <span className="pillar-num">03</span>
                  <div>
                    <div className="pillar-title">Radar IA + campanhas</div>
                    <div className="pillar-sub">Algoritmos identificam vendedores potenciais. Campanhas dirigidas despertam o interesse de gente que nem estava ativa.</div>
                  </div>
                  <span className="pillar-tag">Diferencial</span>
                </div>
              </div>

              <DiscoveryFeed feed={FEED} />
            </div>

            <div className="discovery-stat">
              <div className="discovery-stat-num">68%</div>
              <div className="discovery-stat-body">
                das oportunidades que apresentamos aos compradores <span>— não estão em nenhum portal de imóveis.</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
              <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
                Ativar minha busca <ArrowRight />
              </button>
              <button className="btn btn-light btn-lg" onClick={() => navigate('comprador')} style={{ background: 'transparent', color: 'var(--inverse-fg)', borderColor: 'rgba(255,255,255,0.2)' }}>
                Entender o radar
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
