import Reveal from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import type { NavigateFn } from '../types'

const CITIES = [
  { state: 'SP · capital + interior', name: 'São Paulo',     body: 'Sede comercial. Prioridade nos bairros de zona sul e oeste da capital, mas atendemos todo o estado.',           stats: [['+80', 'Imóveis'], ['2022', 'Desde'], ['44%', 'Carteira']] },
  { state: 'RJ · capital + interior', name: 'Rio de Janeiro', body: 'Foco na capital (zona sul + Barra) e Região dos Lagos. Casas, apartamentos e investimento.',                   stats: [['+40', 'Imóveis'], ['2024', 'Desde'], ['22%', 'Carteira']] },
  { state: 'MG · capital + interior', name: 'Belo Horizonte', body: 'Onde tudo começou. Toda a região metropolitana + interior, com foco na zona centro-sul.',                       stats: [['+30', 'Imóveis'], ['2018', 'Desde'], ['34%', 'Carteira']] },
]

const PRINCIPLES = [
  { n: '01', t: 'Honestidade brutal',     b: 'A gente te diz quando um imóvel está caro. Quando o bairro não combina com você. Quando seu valor pretendido tá fora da realidade.' },
  { n: '02', t: 'Tempo do comprador',     b: 'Você não tem que se moldar à nossa agenda. A gente trabalha no seu prazo.' },
  { n: '03', t: 'Vendedor não é refém',   b: 'Trabalhamos com ou sem exclusividade. Acreditamos no nosso serviço pra te convencer a ficar.' },
]

export default function SobrePage({ navigate }: { navigate: NavigateFn }) {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Quem somos</span>
            <h1 className="page-hero-title">
              Uma imobiliária que <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>inverteu o jogo.</em>
            </h1>
            <p className="lead" style={{ fontSize: 22, maxWidth: '52ch' }}>
              A gente acredita que a imobiliária tradicional gasta energia no lugar errado: enchendo vitrine. Aqui o trabalho é entender o comprador, e ir buscar exatamente o que ele quer.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="manifest-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80 }}>
            <Reveal>
              <span className="eyebrow">Manifesto</span>
            </Reveal>
            <Reveal delay={80}>
              <div style={{
                fontFamily: 'var(--f-display)',
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                textWrap: 'balance',
              }}>
                A gente acha que o comprador merece mais do que <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>rolar feed de imóvel</em> no fim de semana. Merece que alguém pegue o briefing e vá atrás. <br /><br />
                E o vendedor merece saber se tem quem queira o imóvel dele <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>antes</em> de pendurar a placa.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Onde estamos</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 40px' }}>
              Três estados, prioridade nas capitais.
            </h2>
          </Reveal>
          <Reveal>
            <div className="cities">
              {CITIES.map(c => (
                <div className="city" key={c.name}>
                  <div className="city-state">{c.state}</div>
                  <div className="city-name">{c.name}</div>
                  <div className="city-body">{c.body}</div>
                  <div className="city-stats">
                    {c.stats.map(([b, l]) => (
                      <div key={l}><b>{b}</b>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Princípios</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 40px', maxWidth: '18ch' }}>
              No que a gente acredita.
            </h2>
          </Reveal>
          <div className="principles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {PRINCIPLES.map(p => (
              <Reveal key={p.n} className="card" as="div">
                <div style={{ padding: 32 }}>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--brand)', letterSpacing: '0.1em' }}>{p.n}</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', marginTop: 18, lineHeight: 1.1 }}>
                    {p.t}
                  </div>
                  <div style={{ marginTop: 12, color: 'var(--ink-soft)', fontSize: 15 }}>{p.b}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA navigate={navigate} role="both" />
    </main>
  )
}
