import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from '../components/icons'
import CardIcon from './CardIcon'
import { BUYER_STEPS, SELLER_STEPS, buildSummary, maskPhone } from './steps'
import type { Answers, Step, StepOption } from './steps'
import type { NavigateFn } from '../types'

type ChatFormProps = {
  role: 'buyer' | 'seller'
  navigate: NavigateFn
}

type HistoryItem = { who: 'bot' | 'user'; text: string }

export default function ChatForm({ role, navigate }: ChatFormProps) {
  const steps = role === 'seller' ? SELLER_STEPS : BUYER_STEPS
  const [stepIdx, setStepIdx] = useState(0)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [answers, setAnswers] = useState<Answers>({})
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const stepIdxRef = useRef(0)

  const resolvePrompt = (step: Step, ans: Answers): string[] => {
    const p = typeof step.prompts === 'function' ? step.prompts(ans) : step.prompts
    return Array.isArray(p) ? p : [p]
  }

  function pushBot(textToPush: string, delay = 700): Promise<void> {
    return new Promise(resolve => {
      setTyping(true)
      setTimeout(() => {
        setHistory(h => [...h, { who: 'bot', text: textToPush }])
        setTyping(false)
        resolve()
      }, delay)
    })
  }

  async function runStep(idx: number, ans: Answers) {
    const step = steps[idx]
    if (!step) return
    const prompts = resolvePrompt(step, ans)
    for (let i = 0; i < prompts.length; i++) {
      await pushBot(prompts[i], i === 0 ? 500 : 900)
    }
  }

  useEffect(() => {
    runStep(0, {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [history, typing])

  useEffect(() => {
    stepIdxRef.current = stepIdx
  }, [stepIdx])

  /**
   * Resolve qual step deve ser exibido a seguir, pulando os que não se aplicam.
   * Hoje cobre:
   *   - valor_modo='exato' → pula step 'valor' (faixa)
   *   - valor_modo='faixa' → pula step 'valor_exato'
   */
  function findNextRelevantStepIdx(startIdx: number, ans: Answers): number {
    let idx = startIdx
    while (idx < steps.length) {
      const s = steps[idx]
      if (s.id === 'valor_exato' && ans.valor_modo !== 'exato') {
        idx++
        continue
      }
      if (s.id === 'valor' && ans.valor_modo !== 'faixa') {
        idx++
        continue
      }
      return idx
    }
    return idx
  }

  async function commitAnswer(step: Step, value: string, displayLabel: string) {
    setHistory(h => [...h, { who: 'user', text: displayLabel }])
    const nextAns: Answers = { ...answers, [step.id]: value }
    setAnswers(nextAns)
    if (step.kind === 'summary') return
    const nextIdx = findNextRelevantStepIdx(stepIdxRef.current + 1, nextAns)
    setStepIdx(nextIdx)
    if (nextIdx < steps.length) await runStep(nextIdx, nextAns)
  }

  const currentStep = steps[stepIdx]
  const progressPct = Math.round((stepIdx / (steps.length - 1)) * 100)

  function handleSendText() {
    if (!currentStep) return
    const trimmed = text.trim()
    if (!trimmed && !currentStep.optional) return
    if (currentStep.validate) {
      const ok = currentStep.validate(trimmed)
      if (ok !== true) {
        setHistory(h => [...h, { who: 'bot', text: ok }])
        return
      }
    }
    const display = trimmed || '— pular —'
    setText('')
    void commitAnswer(currentStep, trimmed, display)
  }

  function handleSelect(opt: StepOption) {
    if (!currentStep) return
    void commitAnswer(currentStep, opt.value, opt.label)
  }

  function handleSubmitFinal() {
    setDone(true)
    // TODO: integrate with Rendizy CRM webhook here
    // POST { role, answers } to import.meta.env.VITE_CRM_WEBHOOK_URL
  }

  /* render interactive control */
  let control: JSX.Element | null = null
  if (currentStep && !done) {
    if (currentStep.kind === 'cards' && currentStep.options) {
      control = (
        <div className="chat-cards" key={`ctrl-${stepIdx}`}>
          {currentStep.options.map(opt => (
            <button key={opt.value} className="chat-card" onClick={() => handleSelect(opt)}>
              {opt.icon && (
                <div className="chat-card-ico"><CardIcon name={opt.icon} /></div>
              )}
              <div>
                <div className="chat-card-title">{opt.label}</div>
                {opt.sub && <div className="chat-card-sub">{opt.sub}</div>}
              </div>
            </button>
          ))}
        </div>
      )
    } else if (currentStep.kind === 'chips' && currentStep.options) {
      control = (
        <div className="chip-row" key={`ctrl-${stepIdx}`}>
          {currentStep.options.map(opt => (
            <button key={opt.value} className="chip" onClick={() => handleSelect(opt)}>
              {opt.label}
            </button>
          ))}
        </div>
      )
    } else if (currentStep.kind === 'summary') {
      const summary = buildSummary(role, answers)
      control = (
        <div className="summary" key="summary">
          <h4><Check /> Pronto pra enviar</h4>
          {summary.map(([k, v]) => (
            <div key={k} className="summary-row">
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <div className="chat-confirm" style={{ marginTop: 16 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => { setStepIdx(1); setHistory([]); setAnswers({}); void runStep(1, {}) }}>
              Refazer
            </button>
            <button className="btn btn-brand" onClick={handleSubmitFinal}>
              {role === 'seller' ? 'Anunciar meu imóvel' : 'Enviar pra equipe'} <ArrowRight />
            </button>
          </div>
        </div>
      )
    }
  }

  if (done) {
    const firstName = (answers.nome || '').split(' ')[0] || 'você'
    return (
      <div className="chat-wrap">
        <div className="container">
          <div className="chat-frame">
            <ChatHeader role={role} />
            <div className="chat-body">
              <div className="bubble bubble-bot">
                {role === 'seller'
                  ? `Show, ${firstName}! Recebemos o cadastro do seu imóvel. 🏡`
                  : `Pronto, ${firstName}! Seu briefing já tá com a equipe. ✅`}
              </div>
              <div className="bubble bubble-bot">
                {role === 'seller'
                  ? 'Em até 1 dia útil entramos no WhatsApp pra checar a documentação e te mostrar quantos compradores compatíveis a gente já tem.'
                  : 'Vamos rodar busca ativa e em até 48h voltamos com as primeiras oportunidades no seu WhatsApp.'}
              </div>
              <div className="summary" style={{ background: 'var(--brand-soft)', borderColor: 'var(--brand-soft)' }}>
                <h4 style={{ color: 'var(--brand-deep)' }}>
                  <span style={{
                    display: 'inline-grid', placeItems: 'center', width: 30, height: 30,
                    borderRadius: 999, background: 'var(--brand)', color: 'white',
                  }}><Check /></span>
                  Próximos passos
                </h4>
                <div style={{ fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--ink)' }}>1.</strong> Mensagem no WhatsApp em até 48h<br />
                  <strong style={{ color: 'var(--ink)' }}>2.</strong> Conversa rápida pra alinhar detalhes<br />
                  <strong style={{ color: 'var(--ink)' }}>3.</strong> A gente trabalha pra você
                </div>
              </div>
              <div className="chat-confirm">
                <button className="btn btn-ghost" onClick={() => navigate('home')}>
                  Voltar pro início
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const showTextInput = currentStep && (currentStep.kind === 'text' || currentStep.kind === 'phone' || currentStep.kind === 'email')

  return (
    <div className="chat-wrap">
      <div className="container">
        <div className="chat-frame">
          <ChatHeader role={role} step={stepIdx + 1} total={steps.length} />
          <div className="chat-progress-bar"><span style={{ width: `${progressPct}%` }} /></div>
          <div className="chat-body" ref={bodyRef}>
            {history.map((m, i) => (
              <div key={i} className={'bubble ' + (m.who === 'bot' ? 'bubble-bot' : 'bubble-user')}>
                {m.text}
              </div>
            ))}
            {typing && <div className="bubble-typing"><span /><span /><span /></div>}
            {!typing && control}
          </div>
          {showTextInput && (
            <div className="chat-input-row">
              <input
                className="chat-input"
                placeholder={currentStep.placeholder || 'Digite sua resposta...'}
                value={text}
                onChange={e => {
                  let v = e.target.value
                  if (currentStep.kind === 'phone') v = maskPhone(v)
                  setText(v)
                }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendText() }}
                autoFocus
              />
              <button
                className="chat-send"
                onClick={handleSendText}
                disabled={!text.trim() && !currentStep.optional}
                aria-label="Enviar"
              >
                <ArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ChatHeader({ role, step, total }: { role: 'buyer' | 'seller'; step?: number; total?: number }) {
  return (
    <div className="chat-head">
      <div className="chat-avatar">A</div>
      <div>
        <div className="chat-head-name">Achamos Imóveis</div>
        <div className="chat-head-meta">
          {role === 'seller' ? 'Cadastro de imóvel' : 'Briefing do comprador'}
        </div>
      </div>
      <div className="chat-progress">
        {step && total ? `${Math.min(step, total)} / ${total}` : '100%'}
      </div>
    </div>
  )
}
