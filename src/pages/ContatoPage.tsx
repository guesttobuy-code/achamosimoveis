import { useState } from 'react'
import type { FormEvent } from 'react'
import Reveal from '../components/Reveal'
import { ArrowRight, Check } from '../components/icons'
import type { NavigateFn } from '../types'

const FAQS = [
  { q: 'Quanto custa pro comprador?', a: 'Light é grátis (busca passiva na nossa rede). Spotlight é R$ 2.500, creditável no fechamento — volta 100% quando você fecha pela Achamos. Hunt é R$ 7.500, também creditável. Você só assume risco residual se desistir antes de fechar e não tivermos entregue o mínimo de candidatos qualificados.' },
  { q: 'Vocês têm imóveis em qual faixa de preço?', a: 'De R$ 250 mil a R$ 5 milhões. Trabalhamos com primeiro imóvel, médio e alto padrão, e investimento.' },
  { q: 'Em quanto tempo eu acho meu imóvel?', a: 'Depende muito do que você procura. Em média, primeira oferta em 48h e fechamento em 30-60 dias.' },
  { q: 'Posso vender sem exclusividade?', a: 'Pode. A gente trabalha dos dois jeitos. Com exclusividade investimos mais em divulgação; sem ela você compartilha com outras imobiliárias.' },
  { q: 'Vocês fazem financiamento?', a: 'Não somos banco, mas temos parceria com vários e a gente cuida da papelada inteira pra você.' },
  { q: 'E aluguel? Temporada?', a: 'Hoje nossa operação é foco em venda. Aluguel de temporada é institucional — atendemos sob demanda mas não temos catálogo navegável ainda.' },
  { q: 'Trabalham em quais estados?', a: 'Foco total no estado do Rio de Janeiro — capital, região metropolitana, Região dos Lagos, Serra e Costa Verde.' },
]

export default function ContatoPage({ navigate }: { navigate: NavigateFn }) {
  const [openFaq, setOpenFaq] = useState(0)
  const [form, setForm] = useState({ nome: '', email: '', tel: '', msg: '' })
  const [sent, setSent] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Fale com a gente</span>
            <h1 className="page-hero-title">
              Tem dúvida?<br /><em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>Pergunta.</em>
            </h1>
            <p className="lead" style={{ fontSize: 22, maxWidth: '50ch' }}>
              Pode mandar mensagem, ligar, ou começar direto pelo briefing — o que for mais rápido pra você.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }} className="contact-grid">
            {/* CONTACT INFO */}
            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>WhatsApp</div>
                  <a
                    href="https://wa.me/5521995885999"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: 'inherit', textDecoration: 'none' }}
                  >
                    +55 21 9 9588-5999
                  </a>
                  <div style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 4 }}>Atendimento seg–sáb · 8h às 20h</div>
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>E-mail</div>
                  <a
                    href="mailto:oi@achamosimoveis.com.br"
                    style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: 'inherit', textDecoration: 'none' }}
                  >
                    oi@achamosimoveis.com.br
                  </a>
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 16 }}>Sede</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16, fontFamily: 'var(--f-display)', letterSpacing: '-0.015em' }}>Rio de Janeiro — RJ</div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 4 }}>Av. Treze de Maio, 47 · Apt 1609 · Centro</div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: 14 }}>CEP 20031-007 · Rio de Janeiro — RJ</div>
                  </div>
                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line-soft)' }}>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 6 }}>
                      Razão social
                    </div>
                    <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                      Bora Vender Muito BVM Aceleradora de Vendas LTDA
                    </div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--ink-mute)', marginTop: 4 }}>
                      CNPJ 46.908.483/0001-28
                    </div>
                  </div>
                  <div style={{ marginTop: 14, fontFamily: 'var(--f-mono)', fontSize: 11.5, color: 'var(--brand)', letterSpacing: '0.04em' }}>
                    ★ Atendimento em todo o estado do Rio de Janeiro
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
                  <button className="btn btn-brand" onClick={() => navigate('comecar')}>Quero comprar <ArrowRight /></button>
                  <button className="btn btn-ghost" onClick={() => navigate('vender')}>Quero vender</button>
                </div>
              </div>
            </Reveal>

            {/* FORM */}
            <Reveal delay={100}>
              {!sent ? (
                <form className="card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 14 }} onSubmit={submit}>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
                    Mandar mensagem
                  </div>
                  <div className="field">
                    <label>Nome</label>
                    <input required value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Seu nome" />
                  </div>
                  <div className="field">
                    <label>E-mail</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="voce@email.com" />
                  </div>
                  <div className="field">
                    <label>Telefone</label>
                    <input value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} placeholder="(00) 00000-0000" />
                  </div>
                  <div className="field">
                    <label>Mensagem</label>
                    <textarea required value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} placeholder="No que podemos ajudar?" />
                  </div>
                  <button className="btn btn-brand" type="submit" style={{ marginTop: 8 }}>
                    Enviar mensagem <ArrowRight />
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
                  <div className="display" style={{ fontSize: 30, letterSpacing: '-0.02em' }}>Mensagem enviada!</div>
                  <div style={{ color: 'var(--ink-soft)', marginTop: 10, maxWidth: '32ch', margin: '10px auto 0' }}>
                    A gente responde em até 1 dia útil. Pra mais rápido, manda WhatsApp.
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
            <span className="eyebrow">Perguntas frequentes</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 40px' }}>
              Dúvidas comuns.
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
