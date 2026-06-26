/**
 * /flipping — Ferramenta de Análise de Risco (GTB Semi Flipping)
 *
 * Fase 1 (MVP): calculadora de 1 imóvel por vez, 100% client-side.
 * Aplica critérios ELIMINATÓRIOS (kill-switch) + score ponderado em 6 dimensões
 * e devolve veredito VAI / VAI COM CONDIÇÕES / NÃO VAI.
 *
 * Cada campo nasce de um risco real mapeado na análise do modelo
 * (ver ROADMAP_SOFTWARE_ANALISE_RISCO.md na pasta do projeto GTB).
 *
 * Sem backend. Rascunho persistido em localStorage.
 */
import { useEffect, useMemo, useState } from 'react'

// ─────────────────────────────────────────────────────────────
// Modelo de dados
// ─────────────────────────────────────────────────────────────
type Opt = { label: string; v: number }
type Q = { id: string; label: string; opts: Opt[] }
type Dim = { id: string; name: string; weight: number; hint: string; questions: Q[] }

const KILL_SWITCHES: { id: string; label: string; help: string }[] = [
  { id: 'E1', label: 'Proprietário inscrito em dívida ativa fiscal?', help: 'Fraude à execução fiscal = presunção ABSOLUTA (Tema 290 STJ). Sua boa-fé não protege.' },
  { id: 'E2', label: 'Penhora, arresto, indisponibilidade ou execução averbada na matrícula?', help: 'Ônus pré-existente vence a sua garantia fiduciária.' },
  { id: 'E3', label: 'Inventário com herdeiro incapaz OU litígio entre herdeiros?', help: 'Trava o alvará judicial necessário para constituir a garantia.' },
  { id: 'E4', label: 'Condomínio residencial proíbe temporada E é inviável locação residencial alternativa?', help: 'STJ 2026: temporada exige 2/3 em assembleia. Sem a perna de receita, o aporte fica exposto.' },
  { id: 'E5', label: 'Laudo aponta vício estrutural grave e irremediável?', help: 'Estoura o orçamento de obra e inviabiliza a venda.' },
  { id: 'E6', label: 'Mais-valia projetada menor que 3× o aporte?', help: 'Abaixo do piso de segurança do contrato. (calculado automaticamente se você preencher os valores acima)' },
  { id: 'E7', label: 'Titularidade irregular, cônjuge não anui ou documentação dominial inconsistente?', help: 'Inviabiliza tanto a garantia quanto a venda.' },
]

const DIMENSIONS: Dim[] = [
  {
    id: 'D1', name: 'Jurídico / Dominial', weight: 25,
    hint: 'O capital só entra em imóvel sem credor concorrente e com cadeia limpa.',
    questions: [
      { id: 'D1q1', label: 'Pacote de certidões (CNDT, fiscais fed/est/mun, distribuidores cíveis e exec. fiscal, protesto, matrícula atualizada)', opts: [{ label: 'Completo e limpo', v: 1 }, { label: 'Parcial / pendente', v: 0.5 }, { label: 'Não verificado', v: 0 }] },
      { id: 'D1q2', label: 'Todos os titulares e cônjuges assinam / anuem', opts: [{ label: 'Sim, todos', v: 1 }, { label: 'Parcial', v: 0.5 }, { label: 'Não', v: 0 }] },
      { id: 'D1q3', label: 'Cadeia dominial sem ações reipersecutórias', opts: [{ label: 'Limpa', v: 1 }, { label: 'Em dúvida', v: 0.5 }, { label: 'Há ações', v: 0 }] },
    ],
  },
  {
    id: 'D2', name: 'Condominial / Viabilidade da Temporada', weight: 20,
    hint: 'A receita de temporada é o que amortiza o aporte — precisa estar liberada antes.',
    questions: [
      { id: 'D2q1', label: 'A convenção do condomínio quanto à temporada', opts: [{ label: 'Permite expressamente', v: 1 }, { label: 'Omissa (precisa assembleia 2/3)', v: 0.5 }, { label: 'Proíbe', v: 0 }] },
      { id: 'D2q2', label: 'Aprovação de 2/3 obtida OU prédio já opera temporada', opts: [{ label: 'Sim', v: 1 }, { label: 'Em andamento', v: 0.5 }, { label: 'Não', v: 0 }] },
      { id: 'D2q3', label: 'Plano B de locação residencial viável (se temporada cair)', opts: [{ label: 'Sim', v: 1 }, { label: 'Não', v: 0 }] },
    ],
  },
  {
    id: 'D3', name: 'Financeiro / Mercado', weight: 25,
    hint: 'Mais-valia por comparáveis VENDIDOS (não anunciados) e venda dentro da janela de 48m.',
    questions: [
      { id: 'D3q1', label: 'Múltiplo de mais-valia sobre o aporte', opts: [{ label: '≥ 5×', v: 1 }, { label: '3× a 5×', v: 0.6 }, { label: '< 3×', v: 0 }] },
      { id: 'D3q2', label: 'Liquidez — comparáveis VENDIDOS na região/faixa (últimos 12m)', opts: [{ label: 'Vários', v: 1 }, { label: 'Poucos', v: 0.5 }, { label: 'Quase nenhum', v: 0 }] },
      { id: 'D3q3', label: 'Prazo estimado de venda vs. janela de 48 meses', opts: [{ label: '≤ 24m', v: 1 }, { label: '24–36m', v: 0.6 }, { label: '> 36m', v: 0.2 }] },
    ],
  },
  {
    id: 'D4', name: 'Obra / Físico', weight: 15,
    hint: 'Laudo antes do aporte e contingência de orçamento embutida.',
    questions: [
      { id: 'D4q1', label: 'Laudo de engenharia (estrutura / hidráulica / fachada)', opts: [{ label: 'OK', v: 1 }, { label: 'Pendências menores', v: 0.5 }, { label: 'Não feito / grave', v: 0 }] },
      { id: 'D4q2', label: 'Orçamento fechado com contingência ≥ 25%', opts: [{ label: 'Sim', v: 1 }, { label: 'Contingência < 25%', v: 0.5 }, { label: 'Sem orçamento fechado', v: 0 }] },
    ],
  },
  {
    id: 'D5', name: 'Receita de Temporada', weight: 10,
    hint: 'Ocupação conservadora (≤50%) e parcela relevante do aporte amortizável na janela.',
    questions: [
      { id: 'D5q1', label: 'Estimativa de ocupação / ADR', opts: [{ label: 'Documentada e conservadora', v: 1 }, { label: 'Estimativa otimista', v: 0.5 }, { label: 'Sem base', v: 0 }] },
      { id: 'D5q2', label: '% do aporte amortizável pela temporada na janela', opts: [{ label: 'Alto', v: 1 }, { label: 'Médio', v: 0.6 }, { label: 'Baixo', v: 0.2 }] },
    ],
  },
  {
    id: 'D6', name: 'Contraparte / Operacional', weight: 5,
    hint: 'Dono motivado e cooperativo, com menos titulares, reduz atrito.',
    questions: [
      { id: 'D6q1', label: 'Motivação / urgência de venda do proprietário', opts: [{ label: 'Alta', v: 1 }, { label: 'Média', v: 0.6 }, { label: 'Baixa', v: 0.2 }] },
      { id: 'D6q2', label: 'Cooperação / acesso facilitado ao imóvel', opts: [{ label: 'Sim', v: 1 }, { label: 'Parcial', v: 0.5 }, { label: 'Resistente', v: 0 }] },
    ],
  },
]

const STORAGE_KEY = 'gtb-flipping-analise-v1'

type Saved = {
  nome: string; valorPre: string; valorVenda: string; aporte: string
  kills: Record<string, 'sim' | 'nao'>
  answers: Record<string, number>
}

const fmtBRL = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

const num = (s: string) => {
  const n = parseFloat(s.replace(/\./g, '').replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

// ─────────────────────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────────────────────
export default function FlippingPage() {
  const [nome, setNome] = useState('')
  const [valorPre, setValorPre] = useState('')
  const [valorVenda, setValorVenda] = useState('')
  const [aporte, setAporte] = useState('')
  const [kills, setKills] = useState<Record<string, 'sim' | 'nao'>>({})
  const [answers, setAnswers] = useState<Record<string, number>>({})

  // Carrega rascunho
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const s = JSON.parse(raw) as Saved
      setNome(s.nome ?? ''); setValorPre(s.valorPre ?? ''); setValorVenda(s.valorVenda ?? '')
      setAporte(s.aporte ?? ''); setKills(s.kills ?? {}); setAnswers(s.answers ?? {})
    } catch { /* ignora rascunho corrompido */ }
  }, [])

  // Salva rascunho
  useEffect(() => {
    const s: Saved = { nome, valorPre, valorVenda, aporte, kills, answers }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) } catch { /* quota */ }
  }, [nome, valorPre, valorVenda, aporte, kills, answers])

  // Múltiplo de mais-valia (auto)
  const multiplo = useMemo(() => {
    const pre = num(valorPre), venda = num(valorVenda), ap = num(aporte)
    if (pre == null || venda == null || ap == null || ap <= 0) return null
    return (venda - pre) / ap
  }, [valorPre, valorVenda, aporte])

  // E6 dispara automaticamente quando o múltiplo calculado < 3×
  const e6Auto = multiplo != null && multiplo < 3

  // Eliminatórios ativos
  const triggered = useMemo(() => {
    const list = KILL_SWITCHES.filter((k) => kills[k.id] === 'sim').map((k) => k.id)
    if (e6Auto && !list.includes('E6')) list.push('E6')
    return list
  }, [kills, e6Auto])

  // Score por dimensão (0–100) e total ponderado
  const dimScores = useMemo(() => {
    return DIMENSIONS.map((d) => {
      const total = d.questions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0)
      const score = (total / d.questions.length) * 100
      return { id: d.id, name: d.name, weight: d.weight, score }
    })
  }, [answers])

  const totalScore = useMemo(() => {
    const wSum = DIMENSIONS.reduce((a, d) => a + d.weight, 0)
    const acc = dimScores.reduce((a, ds) => a + ds.score * ds.weight, 0)
    return Math.round(acc / wSum)
  }, [dimScores])

  const answeredCount = Object.keys(answers).length
  const totalQuestions = DIMENSIONS.reduce((a, d) => a + d.questions.length, 0)

  // Veredito
  const verdict = useMemo(() => {
    if (triggered.length > 0) return { tag: 'NÃO VAI', tone: 'red', reason: 'Critério eliminatório acionado' }
    if (totalScore >= 75) return { tag: 'VAI', tone: 'green', reason: 'Score acima do corte e sem eliminatórios' }
    if (totalScore >= 55) return { tag: 'VAI COM CONDIÇÕES', tone: 'amber', reason: 'Resolver as pendências abaixo antes do aporte' }
    return { tag: 'NÃO VAI', tone: 'red', reason: 'Score abaixo do mínimo aceitável' }
  }, [triggered, totalScore])

  const toneColor = verdict.tone === 'green' ? 'var(--ok)' : verdict.tone === 'amber' ? '#C77700' : '#C0392B'

  function reset() {
    setNome(''); setValorPre(''); setValorVenda(''); setAporte(''); setKills({}); setAnswers({})
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* noop */ }
  }

  return (
    <main className="flip">
      <style>{flipCss}</style>

      <section className="flip-hero">
        <div className="container">
          <span className="flip-eyebrow">GTB · Semi Flipping · Análise de Risco</span>
          <h1 className="display flip-title">Vamos ou não vamos<br />neste imóvel?</h1>
          <p className="flip-lead">
            Preencha os dados do imóvel. A ferramenta aplica os critérios que <em>matam</em> o negócio
            (eliminatórios) e pontua o restante em 6 dimensões — e devolve um veredito objetivo.
          </p>
        </div>
      </section>

      <div className="container flip-grid">
        {/* Coluna de entrada */}
        <div className="flip-form">
          {/* Dados do imóvel */}
          <div className="flip-card">
            <h2 className="flip-h2">Dados do imóvel</h2>
            <div className="flip-fields">
              <label className="flip-field flip-field-wide">
                <span>Nome / endereço de referência</span>
                <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Cobertura Flamengo 400m²" />
              </label>
              <label className="flip-field">
                <span>Valor pré-reforma (R$)</span>
                <input inputMode="numeric" value={valorPre} onChange={(e) => setValorPre(e.target.value)} placeholder="5.000.000" />
              </label>
              <label className="flip-field">
                <span>Valor-alvo de venda (R$)</span>
                <input inputMode="numeric" value={valorVenda} onChange={(e) => setValorVenda(e.target.value)} placeholder="10.000.000" />
              </label>
              <label className="flip-field">
                <span>Aporte de reforma (R$)</span>
                <input inputMode="numeric" value={aporte} onChange={(e) => setAporte(e.target.value)} placeholder="500.000" />
              </label>
              <div className="flip-field flip-multiplo">
                <span>Múltiplo de mais-valia</span>
                <strong style={{ color: multiplo == null ? 'var(--ink-mute)' : e6Auto ? '#C0392B' : 'var(--ok)' }}>
                  {multiplo == null ? '—' : `${multiplo.toFixed(1)}×`}
                  {e6Auto && <em className="flip-flag"> abaixo de 3× → eliminatório</em>}
                </strong>
              </div>
            </div>
          </div>

          {/* Eliminatórios */}
          <div className="flip-card">
            <h2 className="flip-h2">1. Critérios eliminatórios</h2>
            <p className="flip-sub">Qualquer <strong>SIM</strong> aqui = <strong>NÃO VAI</strong>, independente do score.</p>
            <div className="flip-kills">
              {KILL_SWITCHES.map((k) => {
                const auto = k.id === 'E6' && e6Auto
                const val = auto ? 'sim' : kills[k.id]
                return (
                  <div key={k.id} className={`flip-kill ${val === 'sim' ? 'is-hit' : ''}`}>
                    <div className="flip-kill-text">
                      <div className="flip-kill-label"><b>{k.id}.</b> {k.label}</div>
                      <div className="flip-kill-help">{k.help}</div>
                    </div>
                    <div className="flip-toggle">
                      <button
                        type="button"
                        className={`flip-tg ${val === 'sim' ? 'sim' : ''}`}
                        disabled={auto}
                        onClick={() => setKills((p) => ({ ...p, [k.id]: 'sim' }))}
                      >Sim</button>
                      <button
                        type="button"
                        className={`flip-tg ${val === 'nao' ? 'nao' : ''}`}
                        disabled={auto}
                        onClick={() => setKills((p) => ({ ...p, [k.id]: 'nao' }))}
                      >Não</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Dimensões pontuadas */}
          <div className="flip-card">
            <h2 className="flip-h2">2. Pontuação (0–100)</h2>
            <p className="flip-sub">Só conta para imóveis que passaram dos eliminatórios.</p>
            {DIMENSIONS.map((d) => (
              <div key={d.id} className="flip-dim">
                <div className="flip-dim-head">
                  <div className="flip-dim-name">{d.name}</div>
                  <div className="flip-dim-weight">peso {d.weight}</div>
                </div>
                <div className="flip-dim-hint">{d.hint}</div>
                {d.questions.map((q) => (
                  <div key={q.id} className="flip-q">
                    <div className="flip-q-label">{q.label}</div>
                    <div className="flip-opts">
                      {q.opts.map((o) => (
                        <button
                          type="button"
                          key={o.label}
                          className={`flip-opt ${answers[q.id] === o.v ? 'sel' : ''}`}
                          onClick={() => setAnswers((p) => ({ ...p, [q.id]: o.v }))}
                        >{o.label}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Coluna de resultado (sticky) */}
        <aside className="flip-result">
          <div className="flip-verdict" style={{ borderColor: toneColor }}>
            <div className="flip-verdict-tag" style={{ color: toneColor }}>{verdict.tag}</div>
            <div className="flip-score">
              <span className="flip-score-num">{triggered.length > 0 ? '—' : totalScore}</span>
              <span className="flip-score-max">{triggered.length > 0 ? 'eliminado' : '/ 100'}</span>
            </div>
            <div className="flip-verdict-reason">{verdict.reason}</div>
            {nome && <div className="flip-verdict-imovel">{nome}</div>}

            {triggered.length > 0 && (
              <div className="flip-triggered">
                <div className="flip-triggered-title">Eliminatórios acionados</div>
                {triggered.map((id) => (
                  <div key={id} className="flip-triggered-item">
                    {id} — {KILL_SWITCHES.find((k) => k.id === id)?.label}
                  </div>
                ))}
              </div>
            )}

            {triggered.length === 0 && (
              <div className="flip-breakdown">
                {dimScores.map((ds) => (
                  <div key={ds.id} className="flip-bar">
                    <div className="flip-bar-top">
                      <span>{ds.name}</span>
                      <span>{Math.round(ds.score)}</span>
                    </div>
                    <div className="flip-bar-track">
                      <span style={{ width: `${ds.score}%`, background: ds.score >= 60 ? 'var(--ok)' : ds.score >= 35 ? '#C77700' : '#C0392B' }} />
                    </div>
                  </div>
                ))}
                {totalScore >= 55 && totalScore < 75 && (
                  <div className="flip-conds">
                    <div className="flip-conds-title">Pendências que puxaram a nota</div>
                    {dimScores.filter((d) => d.score < 60).map((d) => (
                      <div key={d.id} className="flip-conds-item">• {d.name} ({Math.round(d.score)})</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flip-progress">{answeredCount}/{totalQuestions} perguntas respondidas</div>

            <div className="flip-actions">
              <button type="button" className="btn btn-primary" onClick={() => window.print()}>Imprimir / PDF</button>
              <button type="button" className="btn btn-ghost" onClick={reset}>Limpar</button>
            </div>
          </div>
          <p className="flip-disclaimer">
            Ferramenta de apoio à decisão. Não substitui parecer de advogado imobiliário nem laudo de engenharia.
          </p>
        </aside>
      </div>
    </main>
  )
}

// ─────────────────────────────────────────────────────────────
// CSS scoped (não toca no global.css)
// ─────────────────────────────────────────────────────────────
const flipCss = `
.flip { padding-bottom: 80px; }
.flip-hero { padding: clamp(36px,5vw,64px) 0 8px; }
.flip-eyebrow { font-family: var(--f-mono); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--brand); font-weight: 600; }
.flip-title { font-size: clamp(34px,5vw,64px); margin: 16px 0 14px; letter-spacing: -.03em; }
.flip-lead { font-size: 18px; line-height: 1.5; color: var(--ink-soft); max-width: 60ch; }
.flip-lead em { color: var(--ink); font-style: italic; font-weight: 600; }

.flip-grid { display: grid; grid-template-columns: 1fr 380px; gap: 28px; align-items: start; margin-top: 28px; }
@media (max-width: 980px) { .flip-grid { grid-template-columns: 1fr; } }

.flip-form { display: flex; flex-direction: column; gap: 20px; }
.flip-card { background: var(--paper-card); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 26px; }
.flip-h2 { font-family: var(--f-display); font-size: 22px; letter-spacing: -.02em; margin: 0 0 4px; }
.flip-sub { font-size: 14px; color: var(--ink-soft); margin: 0 0 18px; }
.flip-sub strong { color: var(--ink); }

.flip-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.flip-field { display: flex; flex-direction: column; gap: 6px; }
.flip-field-wide { grid-column: 1 / -1; }
.flip-field span { font-family: var(--f-mono); font-size: 11px; letter-spacing: .04em; text-transform: uppercase; color: var(--ink-mute); }
.flip-field input { padding: 12px 14px; border-radius: var(--r-md); border: 1.5px solid var(--line); background: var(--paper-warm); font-size: 15px; outline: none; transition: border-color .15s; }
.flip-field input:focus { border-color: var(--brand); }
.flip-multiplo { justify-content: flex-end; }
.flip-multiplo strong { font-family: var(--f-display); font-size: 26px; font-weight: 700; }
.flip-flag { font-family: var(--f-body); font-size: 12px; font-style: normal; font-weight: 600; color: #C0392B; display: block; margin-top: 2px; }

.flip-kills { display: flex; flex-direction: column; gap: 8px; }
.flip-kill { display: flex; gap: 14px; align-items: center; justify-content: space-between; padding: 14px; border-radius: var(--r-md); border: 1px solid var(--line); background: var(--paper); }
.flip-kill.is-hit { border-color: #C0392B; background: color-mix(in oklab, #C0392B 8%, var(--paper-card)); }
.flip-kill-text { min-width: 0; }
.flip-kill-label { font-size: 14.5px; line-height: 1.35; color: var(--ink); }
.flip-kill-label b { color: var(--brand); }
.flip-kill-help { font-size: 12.5px; color: var(--ink-mute); margin-top: 4px; line-height: 1.4; }
.flip-toggle { display: flex; gap: 6px; flex-shrink: 0; }
.flip-tg { padding: 9px 16px; border-radius: var(--r-pill); border: 1.5px solid var(--line); background: var(--paper-card); font-size: 13.5px; font-weight: 600; cursor: pointer; transition: all .12s; }
.flip-tg:disabled { opacity: .55; cursor: not-allowed; }
.flip-tg.sim { background: #C0392B; border-color: #C0392B; color: #fff; }
.flip-tg.nao { background: var(--ok); border-color: var(--ok); color: #fff; }

.flip-dim { padding: 18px 0; border-top: 1px solid var(--line-soft); }
.flip-dim:first-of-type { border-top: none; padding-top: 4px; }
.flip-dim-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.flip-dim-name { font-family: var(--f-display); font-size: 17px; font-weight: 700; letter-spacing: -.01em; }
.flip-dim-weight { font-family: var(--f-mono); font-size: 11px; color: var(--ink-mute); text-transform: uppercase; letter-spacing: .05em; }
.flip-dim-hint { font-size: 13px; color: var(--ink-soft); margin: 4px 0 14px; line-height: 1.4; }
.flip-q { margin-bottom: 14px; }
.flip-q-label { font-size: 14px; color: var(--ink); margin-bottom: 8px; line-height: 1.4; }
.flip-opts { display: flex; flex-wrap: wrap; gap: 7px; }
.flip-opt { padding: 8px 14px; border-radius: var(--r-pill); border: 1.5px solid var(--line); background: var(--paper-card); font-size: 13px; font-weight: 500; cursor: pointer; transition: all .12s; }
.flip-opt:hover { border-color: var(--brand); }
.flip-opt.sel { background: var(--brand); border-color: var(--brand); color: #fff; }

.flip-result { position: sticky; top: 96px; }
.flip-verdict { background: var(--paper-card); border: 2px solid var(--line); border-radius: var(--r-lg); padding: 24px; }
.flip-verdict-tag { font-family: var(--f-display); font-size: 26px; font-weight: 800; letter-spacing: -.02em; line-height: 1.05; }
.flip-score { display: flex; align-items: baseline; gap: 8px; margin: 8px 0 2px; }
.flip-score-num { font-family: var(--f-display); font-size: 56px; font-weight: 800; letter-spacing: -.03em; line-height: 1; }
.flip-score-max { font-family: var(--f-mono); font-size: 13px; color: var(--ink-mute); }
.flip-verdict-reason { font-size: 13.5px; color: var(--ink-soft); line-height: 1.4; }
.flip-verdict-imovel { font-family: var(--f-mono); font-size: 12px; color: var(--ink-mute); margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--line-soft); }

.flip-triggered { margin-top: 16px; padding: 14px; border-radius: var(--r-md); background: color-mix(in oklab, #C0392B 8%, var(--paper-card)); border: 1px solid color-mix(in oklab, #C0392B 30%, transparent); }
.flip-triggered-title { font-family: var(--f-mono); font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #C0392B; font-weight: 700; margin-bottom: 8px; }
.flip-triggered-item { font-size: 13px; color: var(--ink); line-height: 1.4; padding: 4px 0; }

.flip-breakdown { margin-top: 18px; display: flex; flex-direction: column; gap: 11px; }
.flip-bar-top { display: flex; justify-content: space-between; font-size: 12.5px; color: var(--ink-soft); margin-bottom: 4px; }
.flip-bar-track { height: 7px; border-radius: 999px; background: var(--line-soft); overflow: hidden; }
.flip-bar-track > span { display: block; height: 100%; border-radius: 999px; transition: width .3s; }
.flip-conds { margin-top: 14px; padding: 12px 14px; border-radius: var(--r-md); background: color-mix(in oklab, #C77700 10%, var(--paper-card)); border: 1px solid color-mix(in oklab, #C77700 30%, transparent); }
.flip-conds-title { font-family: var(--f-mono); font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #C77700; font-weight: 700; margin-bottom: 6px; }
.flip-conds-item { font-size: 13px; color: var(--ink); padding: 2px 0; }

.flip-progress { font-family: var(--f-mono); font-size: 11.5px; color: var(--ink-mute); margin-top: 18px; text-align: center; }
.flip-actions { display: flex; gap: 8px; margin-top: 12px; }
.flip-actions .btn { flex: 1; padding: 12px 14px; font-size: 14px; }
.flip-disclaimer { font-size: 11.5px; color: var(--ink-mute); line-height: 1.45; margin: 14px 4px 0; text-align: center; }

@media print {
  .nav, footer.foot, .flip-form, .flip-actions { display: none !important; }
  .flip-grid { grid-template-columns: 1fr; }
  .flip-result { position: static; }
}
`
