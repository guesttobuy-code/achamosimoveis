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

const PAINS: { num: string; dor: string; dorDesc: string; resp: string; respDesc: string }[] = [
  {
    num: '01',
    dor: 'Fadiga de feed',
    dorDesc: '30+ horas em portais. 80% é ruído: foto enganosa, preço fora, vendedor que não responde. 90% desiste antes de visitar.',
    resp: 'Você não rola mais nada.',
    respDesc: 'Top 3 já filtrado — só o que faz sentido pro seu perfil.',
  },
  {
    num: '02',
    dor: 'Off-market trancado',
    dorDesc: 'A melhor parte do mercado nunca aparece em portal. Herança, divórcio, mudança — acesso só pra quem é amigo do corretor, do síndico, do zelador.',
    resp: 'Mídia paga anuncia o seu perfil.',
    respDesc: 'Proprietários motivados se apresentam — inclusive os que nem estavam à venda.',
  },
  {
    num: '03',
    dor: 'Negociação solo',
    dorDesc: 'Vendedor + corretor experiente + outros 2-3 corretores de um lado. Comprador sozinho do outro. Paga preço cheio.',
    resp: 'Cadeira privilegiada.',
    respDesc: 'Candidatos qualificados se apresentam pra você. Negociação trabalha a seu favor.',
  },
  {
    num: '04',
    dor: 'Tempo perdido',
    dorDesc: 'Do "estou procurando" até as chaves: 60-120 dias em capitais. Pra quem tem prazo (mudança, divórcio, gravidez), é insuportável.',
    resp: 'Primeira candidatura em 7 dias.',
    respDesc: 'Fechamento médio em 30-60 dias. Você ganha mês de vida.',
  },
  {
    num: '05',
    dor: 'Medo de errar',
    dorDesc: 'Sem assessoria do lado do comprador: medo de documentação irregular, vícios escondidos, preço inflado, vendedor problemático. Resultado: paralisia.',
    resp: 'Curadoria documental.',
    respDesc: 'Visita acompanhada. Negociação intermediada. Acompanhamento até a escritura.',
  },
]

const FEED: FeedRow[] = [
  { loc: 'Copacabana · RJ',      desc: 'Apto 2-3 dorm. · busca direcionada',          tag: 'ATIVO',      cls: 't-ativo', live: true  },
  { loc: 'Botafogo · RJ',        desc: 'Cobertura · proprietário despertado',         tag: 'OFF-MARKET', cls: 't-off',   live: true  },
  { loc: 'Ipanema · RJ',         desc: 'Apto 4 dorm. · candidatura recebida',         tag: 'MATCH',      cls: 't-match', live: false },
  { loc: 'Tijuca · RJ',          desc: 'Apto 3 dorm. · primeiro imóvel',              tag: 'ATIVO',      cls: 't-ativo', live: false },
  { loc: 'Lagoa · RJ',           desc: 'Cobertura · alto padrão',                     tag: 'OFF-MARKET', cls: 't-off',   live: true  },
  { loc: 'Leblon · RJ',          desc: 'Apto 3 dorm. · negociação iniciada',          tag: 'MATCH',      cls: 't-match', live: false },
  { loc: 'Vila Isabel · RJ',     desc: 'Apto família · candidato qualificado',        tag: 'ATIVO',      cls: 't-ativo', live: false },
  { loc: 'Barra da Tijuca · RJ', desc: 'Casa em condomínio · vendedor motivado',      tag: 'OFF-MARKET', cls: 't-off',   live: false },
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
        <div className="feed-meta">Rio de Janeiro · todo o estado</div>
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
                <span className="eyebrow" style={{ color: 'rgba(244, 240, 235, 0.5)' }}>Por que a Achamos existe</span>
                <h2 className="discovery-title">
                  Cinco dores resolvidas.<br />
                  Uma decisão <em>tomada</em>.
                </h2>
              </div>
              <p className="discovery-lead">
                Você reconheceu alguma delas? A gente desenhou o <strong style={{ color: 'var(--inverse-fg)' }}>serviço inteiro</strong> pra cada uma.
              </p>
            </div>

            <div className="discovery-body">
              <div className="discovery-pillars">
                {PAINS.map(p => (
                  <div className="pillar" key={p.num} style={{ alignItems: 'stretch' }}>
                    <span className="pillar-num">{p.num}</span>
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 20, alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.18em', opacity: 0.45, marginBottom: 6, fontWeight: 700 }}>DOR</div>
                        <div className="pillar-title">{p.dor}</div>
                        <div className="pillar-sub" style={{ opacity: 0.7 }}>{p.dorDesc}</div>
                      </div>
                      <div style={{ color: 'var(--brand)', fontSize: 22, fontWeight: 700, alignSelf: 'center', marginTop: 18 }} aria-hidden="true">→</div>
                      <div>
                        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--brand)', marginBottom: 6, fontWeight: 700 }}>A ACHAMOS</div>
                        <div className="pillar-title">{p.resp}</div>
                        <div className="pillar-sub">{p.respDesc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <DiscoveryFeed feed={FEED} />
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
              <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
                Ativar minha busca <ArrowRight />
              </button>
              <button className="btn btn-light btn-lg" onClick={() => navigate('comprador')} style={{ background: 'transparent', color: 'var(--inverse-fg)', borderColor: 'rgba(255,255,255,0.2)' }}>
                Como funciona pro comprador
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
