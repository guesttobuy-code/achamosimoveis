import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check } from '../components/icons'
import CardIcon from './CardIcon'
import AutocompleteInput from './AutocompleteInput'
import { buildBuyerSteps, buildSellerSteps, buildSummary, maskPhone } from './steps'
import type { Answers, Step, StepOption } from './steps'
import type { NavigateFn } from '../types'
import {
  upsertContact,
  sendBriefingProgress,
  sendListingProgress,
  sendAccessLink,
  writePreAuthSession,
  readPreAuthSession,
  clearPreAuthSession,
} from './api'

type ChatFormProps = {
  role: 'buyer' | 'seller'
  navigate: NavigateFn
}

type HistoryItem = { who: 'bot' | 'user'; text: string }

/**
 * Captura ?lead=ID&region=X da URL — quando vendedor vem do portal logado
 * clicando "Oferecer imóvel" no Radar de Compradores, o briefing alvo
 * é passado via querystring. listing-progress vai marcar portal_case
 * como case_type='achamos-plus-buyer-candidature' linkando ao briefing.
 */
function readCandidatureContext(): { leadId: string | null; region: string | null } {
  if (typeof window === 'undefined') return { leadId: null, region: null }
  const params = new URLSearchParams(window.location.search)
  const lead = params.get('lead')
  const region = params.get('region')
  return {
    leadId: lead && lead.length > 0 ? lead : null,
    region: region && region.length > 0 ? region : null,
  }
}

export default function ChatForm({ role, navigate }: ChatFormProps) {
  const { t, i18n } = useTranslation('chat')
  const steps = useMemo(
    () => role === 'seller' ? buildSellerSteps(t) : buildBuyerSteps(t),
    // Rebuild on language change so prompts/labels reflect the active locale.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [role, t, i18n.resolvedLanguage],
  )
  const [stepIdx, setStepIdx] = useState(0)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [answers, setAnswers] = useState<Answers>({})
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  // Token preservado no estado "done" pra construir link "Acompanhar no portal".
  // Difere do preAuthRef que é limpo em clearPreAuthSession() após submit.
  const [doneToken, setDoneToken] = useState<string | null>(null)
  // Estado do magic link enviado: null=não tentou, true=enviado, false=falhou (silencioso)
  const [accessLinkSent, setAccessLinkSent] = useState<boolean | null>(null)
  // Email mascarado retornado pelo sendAccessLink (ex: "jo***@gmail.com")
  const [emailMasked, setEmailMasked] = useState<string | null>(null)
  // Debounce de reenvio: timestamp em ms do último clique; null=nunca clicou
  const [resendCooldownUntil, setResendCooldownUntil] = useState<number | null>(null)
  const [resendSentAt, setResendSentAt] = useState<number | null>(null)
  // Contexto de candidatura — quando vem do Radar de Compradores logado
  const [candidature] = useState(() => readCandidatureContext())
  const bodyRef = useRef<HTMLDivElement>(null)
  const stepIdxRef = useRef(0)
  // pre_auth_token vive em sessionStorage + ref local pra evitar re-render
  const preAuthRef = useRef<{ token: string; contactId: string } | null>(null)

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
   * Cobre:
   *   - valor_modo='exato' → pula step 'valor' (faixa)
   *   - valor_modo='faixa' → pula step 'valor_exato'
   *   - §11.13 M5 (2026-05-25): condicionais por tipo de imóvel
   *     - terreno: pula dorms, area_util não-aplicável, vagas, banheiros, mobiliado, andar
   *     - sítio/fazenda: pula vagas, mobiliado, andar (mas mantém dorms, area, banheiros)
   *     - galpão/comercial: pula dorms, mobiliado, andar (mantém area, banheiros, vagas)
   *     - residencial (apt/casa/cob/studio/kitnet/sobrado): tudo aplicável
   */
  function findNextRelevantStepIdx(startIdx: number, ans: Answers): number {
    const tipo = ans.tipo || ''
    const isLand = tipo === 'ter'
    const isRural = tipo === 'sitio'
    const isCommercial = tipo === 'com' || tipo === 'galpao'
    const isResidential = ['apt', 'casa', 'cob', 'studio', 'kitnet', 'sobrado'].includes(tipo)

    let idx = startIdx
    while (idx < steps.length) {
      const s = steps[idx]
      // Granularidade valor (existente)
      if (s.id === 'valor_exato' && ans.valor_modo !== 'exato') { idx++; continue }
      if (s.id === 'valor' && ans.valor_modo !== 'faixa') { idx++; continue }

      // M5: condicionais por tipo de imóvel
      if (s.id === 'dorms' && (isLand || isCommercial)) { idx++; continue }
      if (s.id === 'area' && isLand) { idx++; continue }
      if (s.id === 'vagas' && (isLand || isRural)) { idx++; continue }
      if (s.id === 'banheiros' && isLand) { idx++; continue }
      if (s.id === 'mobiliado' && (isLand || isRural || isCommercial)) { idx++; continue }
      if (s.id === 'andar' && !isResidential) { idx++; continue }

      return idx
    }
    return idx
  }

  /**
   * Recupera sessão pre-auth do sessionStorage (sobrevive reload).
   * Restaurada na primeira render, antes do user mexer.
   */
  useEffect(() => {
    const cached = readPreAuthSession()
    if (cached && cached.role === role) {
      preAuthRef.current = { token: cached.pre_auth_token, contactId: cached.contact_id }
    }
  }, [role])

  /**
   * Cria/recupera contato pre-auth quando nome + whatsapp estão preenchidos.
   * Idempotente: rePOST com mesmo telefone retorna mesmo contact_id e token.
   */
  async function ensurePreAuthContact(ans: Answers): Promise<void> {
    const nome = (ans.nome || '').trim()
    const whatsapp = (ans.whatsapp || '').trim()
    if (!nome || nome.length < 2 || !whatsapp || whatsapp.replace(/\D/g, '').length < 10) {
      return
    }
    if (preAuthRef.current) return // já temos token desta sessão
    try {
      const result = await upsertContact({
        full_name: nome,
        phone: whatsapp,
        email: (ans.email || '').trim() || undefined,
        role,
      })
      preAuthRef.current = { token: result.pre_auth_token, contactId: result.contact_id }
      writePreAuthSession({
        contact_id: result.contact_id,
        pre_auth_token: result.pre_auth_token,
        phone_normalized: whatsapp,
        role,
        created_at: new Date().toISOString(),
      })
    } catch (err) {
      // Não bloqueia o chatbot — fluxo continua sem persistência.
      // Submit final tenta de novo.
      console.error('[chatbot] upsertContact error:', err)
    }
  }

  async function commitAnswer(step: Step, value: string, displayLabel: string) {
    setHistory(h => [...h, { who: 'user', text: displayLabel }])
    const nextAns: Answers = { ...answers, [step.id]: value }
    setAnswers(nextAns)
    // Quando whatsapp acabou de ser preenchido, dispara upsert em background
    if (step.id === 'whatsapp') {
      void ensurePreAuthContact(nextAns)
    }
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
    const display = trimmed || t('ui.skip_display')
    setText('')
    void commitAnswer(currentStep, trimmed, display)
  }

  function handleSelect(opt: StepOption) {
    if (!currentStep) return
    void commitAnswer(currentStep, opt.value, opt.label)
  }

  async function handleSubmitFinal() {
    setSubmitError(null)
    setSubmitting(true)
    try {
      // Garante que o contact existe (caso o upsert no whatsapp tenha falhado)
      await ensurePreAuthContact(answers)
      const token = preAuthRef.current?.token
      if (!token) {
        throw new Error(t('ui.submit_error_contact'))
      }
      // Se vier do Radar de Compradores (vendedor logado clicou "Oferecer imóvel"),
      // injeta target_briefing_id + target_region pra backend marcar case_type
      // como 'achamos-plus-buyer-candidature' e linkar ao briefing alvo.
      const answersWithCtx = candidature.leadId
        ? { ...answers, target_briefing_id: candidature.leadId, target_region: candidature.region ?? '' }
        : answers
      const payload = { pre_auth_token: token, partial_answers: answersWithCtx, finalize: true }
      if (role === 'buyer') {
        await sendBriefingProgress(payload)
      } else {
        await sendListingProgress(payload)
      }
      // Preserva token pro link "Acompanhar no portal" do done state ANTES
      // de limpar a sessão (clearPreAuthSession remove o cache).
      setDoneToken(token)
      clearPreAuthSession()
      setDone(true)
      // ADR-006 Fase 2: envia magic link pro email coletado (handoff passwordless).
      // Falha silenciosa — não bloqueia a tela done, botão de redirect é o fallback.
      const emailForLink = (answers.email || '').trim() || undefined
      sendAccessLink({
        pre_auth_token: token,
        email: emailForLink,
        redirect: role === 'seller' ? '/app/radar-compradores' : '/app/oportunidades',
      })
        .then((result) => {
          setEmailMasked(result.email_masked || null)
          setAccessLinkSent(true)
        })
        .catch((err) => {
          console.error('[chatbot] sendAccessLink error:', err)
          setAccessLinkSent(false)
        })
    } catch (err) {
      console.error('[chatbot] submitFinal error:', err)
      setSubmitError(
        err instanceof Error
          ? err.message
          : t('ui.submit_error_fallback'),
      )
    } finally {
      setSubmitting(false)
    }
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
    } else if (currentStep.kind === 'chips-multi' && currentStep.options) {
      // #202 (2026-05-25): chips multi-toggle — usuario clica varios + confirma
      control = (
        <ChipsMulti
          key={`ctrl-${stepIdx}`}
          step={currentStep}
          onConfirm={(values, labels) => {
            const csvValue = values.join(',')
            const displayLabel = labels.length > 0 ? labels.join(', ') : t('ui.skip_display')
            void commitAnswer(currentStep, csvValue, displayLabel)
          }}
        />
      )
    } else if (currentStep.kind === 'autocomplete') {
      // §11.13 M2 (2026-05-25): step `cidade` IBGE autocomplete (cobertura nacional).
      // AutocompleteInput renderiza próprio input — não usa chat-input-row global.
      control = (
        <AutocompleteInput
          key={`ctrl-${stepIdx}`}
          placeholder={currentStep.placeholder}
          onSelect={(value, label) => commitAnswer(currentStep, value, label)}
        />
      )
    } else if (currentStep.kind === 'summary') {
      const summary = buildSummary(role, answers, t)
      control = (
        <div className="summary" key="summary">
          <h4><Check /> {t('ui.summary_ready')}</h4>
          {summary.map(([k, v]) => (
            <div key={k} className="summary-row">
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
          {submitError && (
            <div style={{
              marginTop: 12,
              padding: '10px 12px',
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fecaca',
              borderRadius: 8,
              fontSize: 14,
            }} role="alert">
              {submitError}
            </div>
          )}
          <div className="chat-confirm" style={{ marginTop: 16 }}>
            <button className="btn btn-ghost btn-sm" disabled={submitting} onClick={() => { setStepIdx(1); setHistory([]); setAnswers({}); clearPreAuthSession(); preAuthRef.current = null; void runStep(1, {}) }}>
              {t('ui.redo')}
            </button>
            <button className="btn btn-brand" onClick={handleSubmitFinal} disabled={submitting}>
              {submitting
                ? t('ui.submitting')
                : role === 'seller' ? t('ui.submit_seller') : t('ui.submit_buyer')}
              {!submitting && <ArrowRight />}
            </button>
          </div>
        </div>
      )
    }
  }

  if (done) {
    const firstName = (answers.nome || '').split(' ')[0] || t('ui.default_first_name')
    const portalBase = (import.meta.env.VITE_PORTAL_URL as string | undefined) || 'https://portalimobiliario-whitelabel.vercel.app'
    // Deep-link cacheado: após signup/login no portal, redireciona pro radar
    // (vendedor) ou oportunidades (comprador). PortalApp lê o param 'redirect'
    // ou sessionStorage 'post_login_redirect'.
    const targetRoute = role === 'seller' ? '/app/radar-compradores' : '/app/oportunidades'
    const portalHref = doneToken
      ? `${portalBase}/?pre_auth=${doneToken}&redirect=${encodeURIComponent(targetRoute)}`
      : `${portalBase}/signup?redirect=${encodeURIComponent(targetRoute)}`

    const now = Date.now()
    const resendCoolingDown = resendCooldownUntil !== null && now < resendCooldownUntil
    const resendJustSent = resendSentAt !== null && now - resendSentAt < 20000

    function handleResend() {
      if (resendCoolingDown) return
      const emailForLink = (answers.email || '').trim() || undefined
      if (!doneToken) return
      setResendCooldownUntil(Date.now() + 20000)
      setResendSentAt(null)
      sendAccessLink({
        pre_auth_token: doneToken,
        email: emailForLink,
        redirect: targetRoute,
      })
        .then((result) => {
          setEmailMasked(result.email_masked || emailMasked)
          setResendSentAt(Date.now())
        })
        .catch((err) => {
          console.error('[chatbot] resend sendAccessLink error:', err)
        })
    }

    return (
      <div className="chat-wrap">
        <div className="container">
          <div className="chat-frame">
            <ChatHeader role={role} />
            <div className="chat-body">
              <div className="bubble bubble-bot">
                {role === 'seller'
                  ? t('ui.done_seller_b1', { name: firstName })
                  : t('ui.done_buyer_b1', { name: firstName })}
              </div>
              <div className="bubble bubble-bot">
                {role === 'seller' ? t('ui.done_seller_b2') : t('ui.done_buyer_b2')}
              </div>
              <div className="summary" style={{
                background: 'linear-gradient(135deg, rgba(111, 45, 225, 0.08) 0%, rgba(74, 20, 181, 0.04) 100%)',
                borderColor: 'rgba(111, 45, 225, 0.18)',
              }}>
                <h4 style={{ color: 'var(--brand-deep)' }}>
                  <span style={{
                    display: 'inline-grid', placeItems: 'center', width: 30, height: 30,
                    borderRadius: 999, background: 'var(--brand)', color: 'white',
                  }}><Check /></span>
                  {role === 'seller' ? t('ui.done_seller_h4') : t('ui.done_buyer_h4')}
                </h4>
                <div style={{ fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  {role === 'seller' ? (
                    <>
                      <strong style={{ color: 'var(--ink)' }}>1.</strong> {t('ui.done_seller_step1')}<br />
                      <strong style={{ color: 'var(--ink)' }}>2.</strong> {t('ui.done_seller_step2')}<br />
                      <strong style={{ color: 'var(--ink)' }}>3.</strong> {t('ui.done_seller_step3')}
                    </>
                  ) : (
                    <>
                      <strong style={{ color: 'var(--ink)' }}>1.</strong> {t('ui.done_buyer_step1')}<br />
                      <strong style={{ color: 'var(--ink)' }}>2.</strong> {t('ui.done_buyer_step2')}<br />
                      <strong style={{ color: 'var(--ink)' }}>3.</strong> {t('ui.done_buyer_step3')}
                    </>
                  )}
                </div>
              </div>

              {/* ── Bloco de acesso: hierarquia clara ── */}
              <div className="chat-confirm" style={{ flexDirection: 'column', gap: 10, marginTop: 16 }}>

                {/* CTA PRIMÁRIO: magic link (quando enviado com sucesso) */}
                {accessLinkSent === true && (
                  <div style={{
                    padding: '14px 16px',
                    background: 'linear-gradient(135deg, rgba(111, 45, 225, 0.08) 0%, rgba(74, 20, 181, 0.04) 100%)',
                    border: '1px solid rgba(111, 45, 225, 0.22)',
                    borderRadius: 12,
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: 'var(--ink)',
                  }}>
                    📬 {t('ui.done_magic_link_msg', { email: emailMasked || (answers.email || '').trim() })}
                  </div>
                )}

                {/* CTA PRIMÁRIO FALLBACK: botão direto pro portal (quando link não foi enviado) */}
                {accessLinkSent !== true && (
                  <>
                    <a
                      className="btn btn-brand"
                      href={portalHref}
                      onClick={() => {
                        try { sessionStorage.setItem('post_login_redirect', targetRoute) } catch { /* ignore */ }
                      }}
                      style={{ width: '100%', textAlign: 'center' }}
                    >
                      {role === 'seller' ? t('ui.done_seller_cta') : t('ui.done_buyer_cta')}
                    </a>
                    {accessLinkSent === false && (
                      <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: '2px 0 0', textAlign: 'center' }}>
                        {t('ui.done_link_failed')}
                      </p>
                    )}
                  </>
                )}

                {/* AÇÃO SECUNDÁRIA: reenviar link (só quando já foi enviado ao menos uma vez) */}
                {accessLinkSent === true && (
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: 13, opacity: resendCoolingDown ? 0.55 : 1 }}
                    disabled={resendCoolingDown}
                    onClick={handleResend}
                  >
                    {resendJustSent
                      ? t('ui.done_resent')
                      : t('ui.done_resend')}
                  </button>
                )}

                {/* AÇÃO TERCIÁRIA: entrar agora pelo portal (quando link foi enviado) */}
                {accessLinkSent === true && (
                  <a
                    href={portalHref}
                    onClick={() => {
                      try { sessionStorage.setItem('post_login_redirect', targetRoute) } catch { /* ignore */ }
                    }}
                    style={{
                      fontSize: 13,
                      color: 'var(--ink-soft)',
                      textAlign: 'center',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    {t('ui.done_enter_now')}
                  </a>
                )}

                <button className="btn btn-ghost" style={{ marginTop: 4 }} onClick={() => navigate('home')}>
                  {t('ui.done_back')}
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
          {candidature.leadId && (
            <div style={{
              padding: '10px 16px',
              background: 'linear-gradient(135deg, rgba(111, 45, 225, 0.12) 0%, rgba(74, 20, 181, 0.08) 100%)',
              borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
            }}>
              <span style={{ fontSize: 18 }}>★</span>
              <div>
                <strong style={{ color: '#4A14B5' }}>{t('ui.candidate_label')} {String(candidature.leadId).toUpperCase().slice(0, 1)}</strong>
                {candidature.region && <span style={{ color: 'var(--ink-soft, #4A4548)', marginLeft: 6 }}>· {candidature.region}</span>}
              </div>
            </div>
          )}
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
                placeholder={currentStep.placeholder || t('ui.input_default_ph')}
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
                aria-label={t('ui.send_aria')}
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

/**
 * #202 (2026-05-25): ChipsMulti — kind='chips-multi' multi-toggle UI.
 * Clica chip → toggle selected; ao clicar Continuar → commit CSV pro answers.
 * Suporta `optional` (botão "Pular" se nenhum selecionado).
 */
function ChipsMulti({
  step,
  onConfirm,
}: {
  step: Step
  onConfirm: (values: string[], labels: string[]) => void
}) {
  const { t } = useTranslation('chat')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function toggle(value: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })
  }

  const selectedValues = Array.from(selected)
  const selectedLabels = (step.options || [])
    .filter(opt => selected.has(opt.value))
    .map(opt => opt.label)
  const hasSelection = selectedValues.length > 0
  const canSkip = step.optional && !hasSelection
  const confirmLabel = step.confirmLabel || t('ui.continue')

  return (
    <div className="chips-multi-wrap">
      <div className="chip-row">
        {(step.options || []).map(opt => {
          const isSelected = selected.has(opt.value)
          return (
            <button
              key={opt.value}
              className={`chip chip-multi ${isSelected ? 'chip-selected' : ''}`}
              onClick={() => toggle(opt.value)}
              type="button"
              aria-pressed={isSelected}
            >
              {isSelected && <span className="chip-check">✓ </span>}
              {opt.label}
            </button>
          )
        })}
      </div>
      <div className="chip-row chip-row-actions">
        {canSkip && (
          <button
            className="btn btn-ghost"
            onClick={() => onConfirm([], [])}
            type="button"
          >
            {t('ui.skip')}
          </button>
        )}
        <button
          className="btn btn-brand"
          onClick={() => onConfirm(selectedValues, selectedLabels)}
          disabled={!hasSelection && !step.optional}
          type="button"
        >
          {hasSelection
            ? `${confirmLabel} (${selectedValues.length})`
            : confirmLabel}
        </button>
      </div>
    </div>
  )
}

function ChatHeader({ role, step, total }: { role: 'buyer' | 'seller'; step?: number; total?: number }) {
  const { t } = useTranslation('chat')
  return (
    <div className="chat-head">
      <div className="chat-avatar">A</div>
      <div>
        <div className="chat-head-name">{t('header.brand')}</div>
        <div className="chat-head-meta">
          {role === 'seller' ? t('header.meta_seller') : t('header.meta_buyer')}
        </div>
      </div>
      <div className="chat-progress">
        {step && total ? `${Math.min(step, total)} / ${total}` : '100%'}
      </div>
    </div>
  )
}
