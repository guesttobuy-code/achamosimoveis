import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import { ArrowRight, Check } from '../components/icons'
import type { NavigateFn } from '../types'

export default function ContatoPage({ navigate }: { navigate: NavigateFn }) {
  const { t } = useTranslation('contato')
  const [openFaq, setOpenFaq] = useState(0)
  const [form, setForm] = useState({ nome: '', email: '', tel: '', msg: '' })
  const [sent, setSent] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  const FAQS = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
    { q: t('faq.q7'), a: t('faq.a7') },
  ]

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('hero.eyebrow')}</span>
            <h1 className="page-hero-title">
              {t('hero.title_part1')}<br /><em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>{t('hero.title_em')}</em>
            </h1>
            <p className="lead" style={{ fontSize: 22, maxWidth: '50ch' }}>
              {t('hero.lead')}
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="contact-grid">
            {/* CONTACT INFO */}
            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>{t('info.wa_label')}</div>
                  <a
                    href="https://wa.me/5521995885999"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: 'inherit', textDecoration: 'none' }}
                  >
                    {t('info.wa_phone')}
                  </a>
                  <div style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 4 }}>{t('info.wa_hours')}</div>
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>{t('info.email_label')}</div>
                  <a
                    href="mailto:oi@achamosimoveis.com.br"
                    style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: 'inherit', textDecoration: 'none' }}
                  >
                    {t('info.email_address')}
                  </a>
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 16 }}>{t('info.office_label')}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16, fontFamily: 'var(--f-display)', letterSpacing: '-0.015em' }}>{t('info.office_city')}</div>
                  </div>
                  <div style={{ marginTop: 14, fontFamily: 'var(--f-mono)', fontSize: 11.5, color: 'var(--brand)', letterSpacing: '0.04em' }}>
                    {t('info.coverage')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
                  <button className="btn btn-brand" onClick={() => navigate('comecar')}>{t('info.cta_buy')} <ArrowRight /></button>
                  <button className="btn btn-ghost" onClick={() => navigate('vender')}>{t('info.cta_sell')}</button>
                </div>
              </div>
            </Reveal>

            {/* FORM */}
            <Reveal delay={100}>
              {!sent ? (
                <form className="card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 14 }} onSubmit={submit}>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
                    {t('form.title')}
                  </div>
                  <div className="field">
                    <label>{t('form.label_name')}</label>
                    <input required value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder={t('form.ph_name')} />
                  </div>
                  <div className="field">
                    <label>{t('form.label_email')}</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder={t('form.ph_email')} />
                  </div>
                  <div className="field">
                    <label>{t('form.label_phone')}</label>
                    <input value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} placeholder={t('form.ph_phone')} />
                  </div>
                  <div className="field">
                    <label>{t('form.label_msg')}</label>
                    <textarea required value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} placeholder={t('form.ph_msg')} />
                  </div>
                  <button className="btn btn-brand" type="submit" style={{ marginTop: 8 }}>
                    {t('form.submit')} <ArrowRight />
                  </button>
                </form>
              ) : (
                <div className="card" style={{ padding: 40, textAlign: 'center', background: 'var(--brand-soft)', borderColor: 'var(--brand-soft)' }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 999, background: 'var(--brand)',
                    color: 'white', display: 'grid', placeItems: 'center', margin: '0 auto 20px'
                  }}>
                    <Check />
                  </div>
                  <div className="display" style={{ fontSize: 30, letterSpacing: '-0.02em' }}>{t('form.sent_title')}</div>
                  <div style={{ color: 'var(--ink-soft)', marginTop: 10, maxWidth: '32ch', margin: '10px auto 0' }}>
                    {t('form.sent_text')}
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('faq.eyebrow')}</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 40px' }}>
              {t('faq.title')}
            </h2>
          </Reveal>
          <Reveal>
            <div className="faq">
              {FAQS.map((f, i) => (
                <div key={i} className={'faq-item' + (openFaq === i ? ' open' : '')}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{f.q}</span>
                    <span className="faq-q-toggle">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                    </span>
                  </button>
                  <div className="faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
