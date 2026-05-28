import Reveal from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import { ArrowRight, Check } from '../components/icons'
import type { NavigateFn } from '../types'

const TIMELINE = [
  { t: 'Briefing por chat', b: 'Você responde 8 perguntas curtas: cidade, tipo, dormitórios, faixa de valor, prazo, características essenciais e como pagar.' },
  { t: 'Validação humana', b: 'Em até 24h, um corretor da sua região entra em contato pra refinar o que você quer. Aqui é a hora de ajustar.' },
  { t: 'Direcionamento ativo', b: 'Aqui mora o diferencial. Mídia paga direcionada + curadoria humana identificam proprietários motivados — inclusive os que ainda nem pensaram em vender. Campanhas dirigidas despertam o interesse de quem tem o imóvel certo.' },
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
              Pare de caçar imóvel.<br />Se você é comprador <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>real</em>, o melhor do mercado vem até você.
            </h1>
            <p className="lead" style={{ fontSize: 22 }}>
              Sua busca vira direcionamento ativo nas redes sociais. Proprietários motivados se apresentam — <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>inclusive aqueles cujo imóvel nem estava à venda</em>. Você escolhe entre os melhores.
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

      {/* 3 TIERS — Light · Spotlight · Hunt */}
      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="eyebrow">3 níveis de busca</span>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px auto 14px', maxWidth: '20ch' }}>
                Escolha o seu nível.
              </h2>
              <p className="lead" style={{ fontSize: 17, maxWidth: '64ch', margin: '0 auto' }}>
                <strong>Light</strong> é grátis (busca passiva na rede). <strong>Spotlight</strong> é a busca direcionada nas redes sociais. <strong>Hunt</strong> é prospecção cirúrgica pra alto padrão. <strong>Todos creditáveis no fechamento.</strong>
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {[
                {
                  tier: 'LIGHT',
                  price: 'R$ 0',
                  desc: 'Cadastro grátis · busca passiva',
                  features: [
                    'Acesso à carteira ativa + rede de parceiros',
                    'Sem campanha social ativa',
                    'Sem KYC formal',
                    'Sem exclusividade',
                  ],
                  target: 'Pra quem está explorando, sem urgência',
                  cta: 'Cadastrar grátis',
                  featured: false,
                },
                {
                  tier: 'SPOTLIGHT  ⭐',
                  price: 'R$ 2.500',
                  desc: 'Creditável no fechamento (volta 100% se você fechar)',
                  features: [
                    'Sua busca vira anúncio direcionado',
                    'KYC validado · ficha anônima publicada',
                    'Mínimo 3 candidatos qualificados',
                    'Top 3 com curadoria humana',
                    'SLA primeira candidatura: 7 dias',
                    'Devolução parcial se < 3 candidatos',
                  ],
                  target: 'Pra quem tem prazo e quer fechar',
                  cta: 'Ativar Spotlight',
                  featured: true,
                },
                {
                  tier: 'HUNT',
                  price: 'R$ 7.500',
                  desc: 'Creditável no fechamento · prospecção cirúrgica',
                  features: [
                    'Tudo do Spotlight',
                    'Prospecção ativa porta-a-porta',
                    'Campanha premium com vídeo',
                    'Mínimo 5 candidatos qualificados',
                    'Avaliação técnica de cada finalista',
                    'Conexão bancária pra financiamento',
                  ],
                  target: 'Alto padrão (R$ 3M+) com urgência',
                  cta: 'Conhecer Hunt',
                  featured: false,
                },
              ].map(t => (
                <div key={t.tier} style={{
                  padding: 28,
                  background: 'var(--white, #FFFFFF)',
                  border: t.featured ? '2px solid var(--brand)' : '1px solid var(--line)',
                  borderRadius: 'var(--r-lg, 20px)',
                  boxShadow: t.featured ? '0 12px 32px rgba(111, 45, 225, 0.15)' : '0 2px 12px rgba(32, 31, 31, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.15em', color: t.featured ? 'var(--brand)' : 'var(--ink-soft)', marginBottom: 14, fontWeight: 700 }}>
                    {t.tier}
                  </div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1 }}>
                    {t.price}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, marginBottom: 22, lineHeight: 1.4 }}>
                    {t.desc}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px 0', display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
                    {t.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--ink)', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--brand)', flexShrink: 0, marginTop: 2 }}><Check size={14} /></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: 12, color: 'var(--ink-mute, #8B8989)', marginBottom: 18, paddingTop: 16, borderTop: '1px solid var(--line-soft)', fontStyle: 'italic' }}>
                    {t.target}
                  </div>
                  <button
                    className={t.featured ? 'btn btn-brand' : 'btn btn-ghost'}
                    onClick={() => navigate('comprar')}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {t.cta} <ArrowRight />
                  </button>
                </div>
              ))}
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

      {/* 6 PROMESSAS CRAVADAS — Spotlight garante */}
      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span className="eyebrow">Spotlight garante</span>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px auto 14px', maxWidth: '20ch' }}>
                6 promessas. Por escrito.
              </h2>
              <p className="lead" style={{ fontSize: 17, maxWidth: '60ch', margin: '0 auto' }}>
                Cada uma é uma trincheira de credibilidade. Se quebrarmos uma, marca queima.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              {[
                'Sua busca vira anúncio em até 48h',
                'Primeira candidatura qualificada em até 7 dias',
                'Mínimo de 3 finalistas curados em até 30 dias',
                'Visita sempre acompanhada por corretor Achamos',
                'Negociação intermediada (oferta + contraoferta via portal)',
                'R$ 2.500 voltam 100% se fechar — 60% se < 3 candidatos · 100% se zero',
              ].map((promise, i) => (
                <div key={i} className="card" style={{ padding: 22, display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--white, #FFFFFF)' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 999, background: 'var(--brand)', color: 'white',
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>
                    <Check size={16} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.5 }}>
                    {promise}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cp-na-pratica">
        <div className="container">
          <Reveal>
            <div className="cp-head">
              <span className="eyebrow">Na sua tela, de verdade</span>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 14px', letterSpacing: '-0.025em' }}>
                As oportunidades chegam <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>até você</em>.
              </h2>
              <p className="lead" style={{ fontSize: 17 }}>
                Você acompanha tudo pelo seu painel — com fotos, características e a porcentagem de match com seu briefing. É igual receber mensagem no celular: a equipe te avisa quando aparece imóvel novo.
              </p>
            </div>
          </Reveal>

          <div className="cp-visuals">
            {/* MOCKUP 1 — Dashboard view */}
            <Reveal>
              <div className="cp-device">
                <div className="cp-device-chrome">
                  <div className="cp-device-dots">
                    <span className="cp-device-dot" />
                    <span className="cp-device-dot" />
                    <span className="cp-device-dot" />
                  </div>
                  <div className="cp-device-url">app.achamos.com.br</div>
                </div>
                <div className="cp-dash">
                  <h3 className="cp-dash-greet">Oi, Carolina 👋</h3>
                  <p className="cp-dash-sub">Sua busca está ativa. Encontramos coisa nova pra você.</p>

                  <div className="cp-dash-eyebrow">
                    <span>Suas oportunidades</span>
                    <b>3 NOVAS</b>
                  </div>

                  <div className="cp-prop-card">
                    <div className="cp-prop-img cp-prop-img-1">
                      <span className="cp-prop-img-tag">NOVO</span>
                    </div>
                    <div>
                      <div className="cp-prop-title">Apartamento · Botafogo, RJ</div>
                      <div className="cp-prop-meta">3 dorm. · 102m² · 1 vaga · R$ 980 mil</div>
                      <div className="cp-prop-tags">
                        <span className="cp-prop-tag warn">OFF-MARKET</span>
                        <span className="cp-prop-tag brand">92% MATCH</span>
                        <span className="cp-prop-tag live">OPORTUNIDADE</span>
                      </div>
                    </div>
                    <div className="cp-prop-score" style={{ ['--pct' as string]: 92 }}><span>92</span></div>
                  </div>

                  <div className="cp-prop-card">
                    <div className="cp-prop-img cp-prop-img-2" />
                    <div>
                      <div className="cp-prop-title">Casa térrea · Vila Madalena, SP</div>
                      <div className="cp-prop-meta">3 dorm. · 180m² · 2 vagas · R$ 1,2 mi</div>
                      <div className="cp-prop-tags">
                        <span className="cp-prop-tag brand">88% MATCH</span>
                      </div>
                    </div>
                    <div className="cp-prop-score" style={{ ['--pct' as string]: 88 }}><span>88</span></div>
                  </div>

                  <div className="cp-prop-card">
                    <div className="cp-prop-img cp-prop-img-3" />
                    <div>
                      <div className="cp-prop-title">Apartamento · Lourdes, BH</div>
                      <div className="cp-prop-meta">3 dorm. · 95m² · 2 vagas · R$ 850 mil</div>
                      <div className="cp-prop-tags">
                        <span className="cp-prop-tag brand">85% MATCH</span>
                      </div>
                    </div>
                    <div className="cp-prop-score" style={{ ['--pct' as string]: 85 }}><span>85</span></div>
                  </div>
                </div>
              </div>
              <p className="cp-device-explain">
                <b>Seu painel.</b> Cada imóvel que a IA + equipe encontra entra aqui com fotos, m², valor e a porcentagem de match com seu briefing. Você organiza por favoritos, marca visita, ou descarta.
              </p>
            </Reveal>

            {/* MOCKUP 2 — Conversa com a equipe */}
            <Reveal delay={120}>
              <div className="cp-device">
                <div className="cp-device-chrome">
                  <div className="cp-device-dots">
                    <span className="cp-device-dot" />
                    <span className="cp-device-dot" />
                    <span className="cp-device-dot" />
                  </div>
                  <div className="cp-device-url">Mariana · equipe Achamos</div>
                </div>
                <div className="cp-chat">
                  <div className="cp-chat-head">
                    <div className="cp-chat-avt">MR</div>
                    <div>
                      <div className="cp-chat-name">Mariana Ribeiro · equipe Achamos</div>
                      <div className="cp-chat-meta">● Online · responde em minutos</div>
                    </div>
                  </div>

                  <div className="cp-chat-body">
                    <div className="cp-bubble them">Oi Carolina! Acabei de encontrar uma oportunidade que combina muito com seu briefing. Vendedor foi ativado pela nossa campanha — não está em portal nenhum. ✨</div>

                    <div className="cp-chat-prop">
                      <div className="cp-chat-prop-gallery">
                        <div className="cp-chat-prop-img-big">
                          <span className="cp-chat-prop-tag-on-img">OFF-MARKET</span>
                          <span className="cp-chat-prop-count">8 fotos</span>
                        </div>
                        <div className="cp-chat-prop-img-side">
                          <div className="cp-chat-prop-img-thumb a" />
                          <div className="cp-chat-prop-img-thumb b" />
                        </div>
                      </div>
                      <div className="cp-chat-prop-info">
                        <div className="cp-chat-prop-name">Apto 3 quartos · Botafogo</div>
                        <div className="cp-chat-prop-specs">102 M² · 3 DORM · 1 SUÍTE · 1 VAGA · ANDAR ALTO</div>
                        <div className="cp-chat-prop-features">
                          <span className="cp-prop-tag brand">SOL DA MANHÃ</span>
                          <span className="cp-prop-tag brand">PRÓX. METRÔ</span>
                          <span className="cp-prop-tag brand">PET-FRIENDLY</span>
                        </div>
                        <div className="cp-chat-prop-price-row">
                          <div className="cp-chat-prop-price">R$ 980 mil</div>
                          <span className="cp-prop-tag brand">92% MATCH</span>
                        </div>
                      </div>
                    </div>

                    <div className="cp-bubble them">Dá uma olhada nas fotos e me diz se quer agendar visita esse fim de semana 😊</div>

                    <div className="cp-chat-prop-cta">
                      <button className="cp-chat-mini-btn primary">Quero conhecer</button>
                      <button className="cp-chat-mini-btn ghost">Não combina</button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="cp-device-explain">
                <b>Conversa direta com sua corretora.</b> A equipe te manda cada oportunidade com fotos, m², características e análise honesta — você decide se quer visitar com 1 clique. Sem fila, sem perda de tempo.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMPARATIVO BRUTAL — Achamos vs alternativas */}
      <section>
        <div className="container">
          <Reveal>
            <div style={{ marginBottom: 40 }}>
              <span className="eyebrow">Achamos vs. as alternativas</span>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 14px', maxWidth: '24ch' }}>
                O ÚNICO modelo no Brasil onde o corretor trabalha <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>pelo comprador</em>.
              </h2>
              <p className="lead" style={{ fontSize: 17, maxWidth: '64ch' }}>
                Todos os outros têm conflito de interesse — quem paga a comissão é o vendedor. Aqui, o cliente é você.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ overflowX: 'auto', borderRadius: 'var(--r-md, 12px)', boxShadow: '0 2px 16px rgba(32,31,31,0.06)', border: '1px solid var(--line)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, background: 'var(--white, #FFFFFF)', minWidth: 700 }}>
                <thead>
                  <tr style={{ background: 'var(--ink)', color: 'var(--paper, #F4F0EB)' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, letterSpacing: '0.05em', fontWeight: 700 }}>CRITÉRIO</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700 }}>PORTAL</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700 }}>CORRETOR AUTÔNOMO</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700 }}>IMOBILIÁRIA TRAD.</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--brand)' }}>🟣 ACHAMOS SPOTLIGHT</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Custo pro comprador',         'R$ 0',           'R$ 0',                          'R$ 0',                            'R$ 2.500 (creditável)'],
                    ['Tempo médio até fechamento',  '60-120 dias',    '60-90 dias',                    '60-90 dias',                      '30-60 dias'],
                    ['Acesso a off-market',         '❌ Não',         '🟡 Limitado',                    '🟡 Limitado',                      '✅ Via mídia paga'],
                    ['Curadoria por seu perfil',    '❌ Você filtra', '🟡 Subjetivo',                   '🟡 Subjetivo',                     '✅ Match Score + corretor'],
                    ['Negociação a seu favor',      '❌ Você sozinho','🟡 Conflito (comissão vendedor)','🟡 Conflito (comissão vendedor)','✅ Mandato é seu'],
                    ['Garantia de candidatos',      '❌ Zero',        '❌ Zero',                        '❌ Zero',                          '✅ Devolução parcial'],
                    ['SLA primeira oferta',         'N/A',            '"Algum dia"',                   '"Em semanas"',                    '✅ 7 dias garantido'],
                    ['Anonimato preservado',        '❌ Expõe perfil','✅ Sim',                         '✅ Sim',                           '✅ Ficha anonimizada'],
                    ['Quem o corretor representa',  'N/A',            'Vendedor (paga comissão)',      'Vendedor (paga comissão)',        '✅ VOCÊ comprador'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid var(--line-soft)', background: i % 2 === 0 ? 'var(--paper-soft, #FAF7F2)' : 'var(--white, #FFFFFF)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--ink)' }}>{row[0]}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--ink-soft)' }}>{row[1]}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--ink-soft)' }}>{row[2]}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', color: 'var(--ink-soft)' }}>{row[3]}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 700, color: 'var(--ink)', background: 'rgba(111, 45, 225, 0.04)' }}>{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-warm">
        <div className="container">
          <Reveal>
            <span className="eyebrow">O que está incluído</span>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '12px 0 16px', maxWidth: '16ch' }}>
              Tudo isso, com você.
            </h2>
            <p className="lead" style={{ fontSize: 17, maxWidth: '56ch', marginBottom: 40 }}>
              <strong>Light é grátis.</strong> Spotlight é R$ 2.500 — <strong>creditável no fechamento</strong> (volta 100% quando você fecha pela Achamos).
            </p>
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
