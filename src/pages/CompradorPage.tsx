import Reveal from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import { ArrowRight, Check } from '../components/icons'
import type { NavigateFn } from '../types'

const TIMELINE = [
  { t: 'Briefing por chat', b: 'Você responde 8 perguntas curtas: cidade, tipo, dormitórios, faixa de valor, prazo, características essenciais e como pagar.' },
  { t: 'Validação humana', b: 'Em até 24h, um corretor da sua região entra em contato pra refinar o que você quer. Aqui é a hora de ajustar.' },
  { t: 'Radar IA acionado', b: 'Aqui mora o diferencial. Algoritmos varrem nossa carteira, a rede de parceiros e — principalmente — identificam vendedores potenciais que ainda nem estão anunciando. Disparamos campanhas dirigidas pra despertar interesse desses vendedores anônimos.' },
  { t: 'Filtro & curadoria', b: 'Você recebe entre 3 e 5 opções, com fotos, vídeo de tour, e nossa avaliação honesta dos pontos fortes e fracos de cada uma — muitas vezes imóveis off-market.' },
  { t: 'Visitas guiadas', b: 'Marcamos as visitas no seu horário. Vamos juntos — e fazemos as perguntas certas pro vendedor.' },
  { t: 'Negociação', b: 'A gente conduz a oferta, contraoferta e fechamento. Sua barganha é nossa barganha.' },
  { t: 'Documentação & chaves', b: 'Cuidamos da matrícula, certidões, contrato e financiamento (se for o caso). Você só assina.' },
]

const INCLUDED: [string, string][] = [
  ['Briefing personalizado',  'Conversa real, não formulário genérico'],
  ['Busca ativa em rede',     'Carteira interna + parceiros + off-market'],
  ['Visitas acompanhadas',    'Vamos junto pra fazer as perguntas certas'],
  ['Avaliação de imóvel',     'Te dizemos o que está caro, o que vale a pena'],
  ['Negociação por você',     'Cuidamos da oferta, contraoferta, fechamento'],
  ['Documentação completa',   'Matrícula, IPTU, certidões, contrato'],
]

export default function CompradorPage({ navigate }: { navigate: NavigateFn }) {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Para quem compra</span>
            <h1 className="page-hero-title">
              Você diz o que quer.<br />A gente <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>vai atrás</em>.
            </h1>
            <p className="lead" style={{ fontSize: 22 }}>
              Esquece passar tarde inteira rolando portal de imóveis. Aqui o comprador é a estrela — a gente faz o caça.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
                Iniciar minha busca <ArrowRight />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => navigate('sobre')}>
                Quem somos
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
            <Reveal>
              <div style={{ position: 'sticky', top: 110 }}>
                <span className="eyebrow">O processo, em detalhe</span>
                <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', marginTop: 16 }}>
                  Sete passos pra você ter as chaves.
                </h2>
                <p className="lead" style={{ marginTop: 20 }}>
                  Cada passo é guiado por uma pessoa da nossa equipe. Nada é automático onde não deveria ser.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="tl">
                {TIMELINE.map((s, i) => (
                  <div className="tl-row" key={i}>
                    <div className="tl-num">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <div className="tl-title">{s.t}</div>
                      <div className="tl-body">{s.b}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <span className="eyebrow">O que está incluído</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 40px', maxWidth: '16ch' }}>
              Sem custo pra você, comprador.
            </h2>
          </Reveal>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {INCLUDED.map(([t, b]) => (
                <div className="card" key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 999,
                    background: 'var(--brand)', color: 'white',
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}><Check size={14} /></div>
                  <div>
                    <div style={{ fontFamily: 'var(--f-display)', fontWeight: 600, fontSize: 18, letterSpacing: '-0.015em' }}>{t}</div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 4 }}>{b}</div>
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
