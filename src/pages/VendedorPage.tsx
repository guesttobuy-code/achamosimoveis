import Reveal from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import { ArrowRight, Check } from '../components/icons'
import type { NavigateFn } from '../types'

const DEMAND: { city: string; t: string; b: string; n: number }[] = [
  { city: 'SP',  t: 'Apto 3 dorm. · capital',   b: '600k – 1,2M',    n: 47 },
  { city: 'BH',  t: 'Casa 3 dorm. · centro-sul', b: '800k – 1,5M',    n: 38 },
  { city: 'RJ',  t: 'Cobertura zona sul',       b: '1,5M+',          n: 22 },
  { city: 'INT', t: 'Interior MG · casa',       b: 'Qualquer faixa', n: 14 },
]

const OLD_WAY = [
  'Foto do imóvel no portal e reza',
  'Espera o telefone tocar',
  'Visita às cegas, sem briefing',
  'Sem ideia de quem está procurando algo similar',
  'Vende em 4-6 meses (em média)',
]

const ACHAMOS_WAY = [
  'IA descobre quem está pronto a comprar',
  'Apresentamos pra compradores qualificados',
  'Campanhas dirigidas trazem visitas reais',
  'Negociação conduzida pela equipe',
  'Vende em 30-60 dias (em média)',
]

const INCLUDED: [string, string][] = [
  ['Avaliação justa',          'Te dizemos o valor real de mercado, sem inflar'],
  ['Captação de fotos',        'Fotógrafo parceiro, sem custo adicional'],
  ['Anúncio premium',          'Site, portais, redes — e nossa base de compradores'],
  ['Triagem de visitas',       'Só vai gente qualificada na sua porta'],
  ['Negociação completa',      'Oferta, contraoferta, conduzimos tudo'],
  ['Documentação & cartório',  'Toda a parte burocrática até a escritura'],
]

export default function VendedorPage({ navigate }: { navigate: NavigateFn }) {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Para quem vende</span>
            <h1 className="page-hero-title">
              <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>Tem comprador esperando.</em><br />
              Você não vende às cegas.
            </h1>
            <p className="lead" style={{ fontSize: 22 }}>
              Mostramos quantas pessoas já procuram algo como o seu imóvel — antes mesmo de você publicar. Sem cartaz na janela, sem dois meses parado.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <button className="btn btn-brand btn-lg" onClick={() => navigate('vender')}>
                Anunciar meu imóvel <ArrowRight />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => navigate('contato')}>
                Falar antes
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Demanda real, hoje</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 36px', maxWidth: '18ch' }}>
              Quantos compradores procuram algo como o seu?
            </h2>
          </Reveal>
          <Reveal>
            <div className="match-grid" style={{
              background: 'var(--inverse-surface)',
              color: 'var(--inverse-fg)',
              borderRadius: 'var(--r-xl)',
              padding: 40,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
            }}>
              {DEMAND.map((m, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--brand)', letterSpacing: '0.1em' }}>{m.city}</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 72, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginTop: 8 }}>
                    {m.n}
                  </div>
                  <div style={{ marginTop: 12, fontSize: 14, opacity: 0.85 }}>{m.t}</div>
                  <div style={{ marginTop: 4, fontSize: 13, opacity: 0.6, fontFamily: 'var(--f-mono)' }}>{m.b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mono" style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 16, textAlign: 'right' }}>
              * Dados atualizados nas últimas 48h. Compradores ativos com briefing validado.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Por que diferente</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 40px', maxWidth: '18ch' }}>
              Imobiliária tradicional × Achamos.
            </h2>
          </Reveal>
          <Reveal>
            <div className="compare-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="card" style={{ padding: 32, opacity: 0.7 }}>
                <div className="eyebrow" style={{ marginBottom: 18 }}>O modelo antigo</div>
                {OLD_WAY.map(x => (
                  <div key={x} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--line-soft)', fontSize: 15 }}>
                    <span style={{ color: 'var(--ink-mute)' }}>—</span>{x}
                  </div>
                ))}
              </div>
              <div className="card" style={{ padding: 32, background: 'var(--inverse-surface)', color: 'var(--inverse-fg)', borderColor: 'var(--ink)' }}>
                <div className="eyebrow" style={{ marginBottom: 18, color: 'var(--brand)' }}>O jeito Achamos</div>
                {ACHAMOS_WAY.map(x => (
                  <div key={x} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: 15 }}>
                    <span style={{ color: 'var(--brand)' }}><Check size={16} /></span>{x}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <span className="eyebrow">O que está incluído</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 40px', maxWidth: '16ch' }}>
              Comissão só quando vender. Nada antes.
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

      <FinalCTA navigate={navigate} role="seller" />
    </main>
  )
}
