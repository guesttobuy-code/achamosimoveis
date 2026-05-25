/* ============================================
   Chatbot step definitions (buyer + seller flows)
   ============================================ */

export type StepKind = 'text' | 'cards' | 'chips' | 'phone' | 'email' | 'summary'

export type StepOption = {
  value: string
  label: string
  sub?: string
  icon?: string
}

export type Answers = Record<string, string>

export type Step = {
  id: string
  prompts: string[] | ((s: Answers) => string[])
  kind: StepKind
  options?: StepOption[]
  placeholder?: string
  optional?: boolean
  validate?: (v: string) => true | string
  role?: 'buyer' | 'seller'
}

export const BUYER_STEPS: Step[] = [
  {
    id: 'intro',
    prompts: [
      'Oi! Eu sou a Achamos 👋',
      'Funciona assim: você me conta o que procura, e a gente vai até os vendedores certos. Você não fica caçando — a gente te traz as opções.',
      'Leva uns 2 minutinhos. Bora?',
    ],
    kind: 'cards',
    options: [
      { value: 'go', label: 'Bora!', sub: 'Quero começar', icon: 'check' },
      { value: 'how', label: 'Como funciona?', sub: 'Me explica antes', icon: 'open' },
    ],
  },
  {
    id: 'nome',
    prompts: ['Pra começar, como você se chama?'],
    kind: 'text',
    placeholder: 'Seu primeiro nome',
    validate: (v) => v.trim().length >= 2 || 'Me diz pelo menos 2 caracteres :)',
  },
  {
    id: 'cidade',
    prompts: (s) => [`Prazer, ${s.nome.split(' ')[0]}! Em qual região você quer comprar?`],
    kind: 'cards',
    options: [
      { value: 'SP_CAP',  label: 'São Paulo',      sub: 'Capital · SP',        icon: 'pin' },
      { value: 'RJ_CAP',  label: 'Rio de Janeiro', sub: 'Capital · RJ',        icon: 'pin' },
      { value: 'MG_CAP',  label: 'Belo Horizonte', sub: 'Capital · MG',        icon: 'pin' },
      { value: 'SP_INT',  label: 'Interior de SP', sub: 'Outras cidades · SP', icon: 'pin' },
      { value: 'RJ_INT',  label: 'Interior do RJ', sub: 'Outras cidades · RJ', icon: 'pin' },
      { value: 'MG_INT',  label: 'Interior de MG', sub: 'Outras cidades · MG', icon: 'pin' },
    ],
  },
  {
    id: 'bairros',
    prompts: ['Tem bairro ou região preferida? (pode listar separado por vírgula, ou deixar em branco)'],
    kind: 'text',
    placeholder: 'Ex: Savassi, Lourdes, Funcionários',
    optional: true,
  },
  {
    id: 'tipo',
    prompts: ['Que tipo de imóvel você está procurando?'],
    kind: 'cards',
    options: [
      { value: 'apt',  label: 'Apartamento', icon: 'apt' },
      { value: 'casa', label: 'Casa', icon: 'casa' },
      { value: 'cob',  label: 'Cobertura', icon: 'cobertura' },
      { value: 'ter',  label: 'Terreno', icon: 'terreno' },
      { value: 'com',  label: 'Comercial', icon: 'comercial' },
    ],
  },
  {
    id: 'dorms',
    prompts: ['Quantos dormitórios?'],
    kind: 'chips',
    options: [
      { value: '1',    label: '1 dorm.' },
      { value: '2',    label: '2 dorms.' },
      { value: '3',    label: '3 dorms.' },
      { value: '4+',   label: '4+ dorms.' },
      { value: 'tanto', label: 'Tanto faz' },
    ],
  },
  {
    id: 'faixa',
    prompts: ['Qual sua faixa de investimento?'],
    kind: 'cards',
    options: [
      { value: 'A', label: 'Até R$ 400 mil',          icon: 'wallet' },
      { value: 'B', label: 'R$ 400 mil – R$ 800 mil', icon: 'wallet' },
      { value: 'C', label: 'R$ 800 mil – R$ 1,5 mi',  icon: 'wallet' },
      { value: 'D', label: 'R$ 1,5 mi – R$ 3 mi',     icon: 'wallet' },
      { value: 'E', label: 'Acima de R$ 3 mi',        icon: 'wallet' },
    ],
  },
  {
    id: 'pagamento',
    prompts: ['Como pretende pagar?'],
    kind: 'chips',
    options: [
      { value: 'AV',   label: '💰 À vista' },
      { value: 'FIN',  label: '🏦 Financiamento' },
      { value: 'MIX',  label: '🤝 Misto' },
      { value: 'NSEI', label: '🤷 Ainda não sei' },
    ],
  },
  {
    id: 'prazo',
    prompts: ['Em quanto tempo você quer ter as chaves na mão?'],
    kind: 'cards',
    options: [
      { value: 'urg', label: 'Tô com pressa',    sub: 'Até 3 meses',              icon: 'clock' },
      { value: 'med', label: 'Tô olhando',       sub: '3 a 6 meses',              icon: 'clock' },
      { value: 'cal', label: 'Sem pressa',       sub: 'Mais de 6 meses',          icon: 'clock' },
      { value: 'rs',  label: 'Só pesquisando',   sub: 'Quero entender o mercado', icon: 'clock' },
    ],
  },
  {
    id: 'extras',
    prompts: ['Tem alguma característica essencial? (vaga de garagem, varanda, sol da manhã, pet-friendly...)'],
    kind: 'text',
    placeholder: 'Ex: 2 vagas, varanda gourmet, perto de metrô',
    optional: true,
  },
  {
    id: 'whatsapp',
    prompts: (s) => [`Quase lá, ${s.nome.split(' ')[0]}! Qual seu WhatsApp pra gente te chamar quando achar?`],
    kind: 'phone',
    placeholder: '(31) 99999-9999',
  },
  {
    id: 'summary',
    prompts: ['Confere se tá tudo certo:'],
    kind: 'summary',
    role: 'buyer',
  },
]

export const SELLER_STEPS: Step[] = [
  {
    id: 'intro',
    prompts: [
      'Oi! Que bom que você quer anunciar com a gente 🏡',
      'Já tem comprador esperando — só precisamos conhecer seu imóvel pra ver com quem dá match.',
      'Leva uns 2 minutos. Vamos?',
    ],
    kind: 'cards',
    options: [
      { value: 'go',  label: 'Vamos lá',     sub: 'Cadastrar imóvel',   icon: 'check' },
      { value: 'how', label: 'Como funciona?', sub: 'Me explica primeiro', icon: 'open' },
    ],
  },
  {
    id: 'nome',
    prompts: ['Qual é o seu nome?'],
    kind: 'text',
    placeholder: 'Seu primeiro nome',
    validate: (v) => v.trim().length >= 2 || 'Me diz pelo menos 2 caracteres :)',
  },
  {
    id: 'tipo',
    prompts: (s) => [`Prazer, ${s.nome.split(' ')[0]}! Que tipo de imóvel você quer anunciar?`],
    kind: 'cards',
    options: [
      // §11.13 M1 (2026-05-25): expandido de 5 → 10 opções pra cobrir mercado real.
      { value: 'apt',     label: 'Apartamento', icon: 'apt' },
      { value: 'casa',    label: 'Casa',        icon: 'casa' },
      { value: 'cob',     label: 'Cobertura',   icon: 'cobertura' },
      { value: 'studio',  label: 'Studio',      icon: 'apt' },
      { value: 'kitnet',  label: 'Kitnet',      icon: 'apt' },
      { value: 'sobrado', label: 'Sobrado',     icon: 'casa' },
      { value: 'ter',     label: 'Terreno',     icon: 'terreno' },
      { value: 'sitio',   label: 'Sítio',       icon: 'casa' },
      { value: 'com',     label: 'Comercial',   icon: 'comercial' },
      { value: 'galpao',  label: 'Galpão',      icon: 'comercial' },
    ],
  },
  {
    id: 'cidade',
    prompts: ['Em qual região o imóvel está?'],
    kind: 'cards',
    options: [
      { value: 'SP_CAP', label: 'São Paulo',      sub: 'Capital · SP',        icon: 'pin' },
      { value: 'RJ_CAP', label: 'Rio de Janeiro', sub: 'Capital · RJ',        icon: 'pin' },
      { value: 'MG_CAP', label: 'Belo Horizonte', sub: 'Capital · MG',        icon: 'pin' },
      { value: 'SP_INT', label: 'Interior de SP', sub: 'Outras cidades · SP', icon: 'pin' },
      { value: 'RJ_INT', label: 'Interior do RJ', sub: 'Outras cidades · RJ', icon: 'pin' },
      { value: 'MG_INT', label: 'Interior de MG', sub: 'Outras cidades · MG', icon: 'pin' },
    ],
  },
  { id: 'bairro', prompts: ['Qual o bairro?'], kind: 'text', placeholder: 'Ex: Lourdes' },
  {
    id: 'dorms',
    prompts: ['Quantos dormitórios o imóvel tem?'],
    kind: 'chips',
    options: [
      { value: '1',   label: '1' },
      { value: '2',   label: '2' },
      { value: '3',   label: '3' },
      { value: '4',   label: '4' },
      { value: '5+',  label: '5+' },
      { value: 'n/a', label: 'Não se aplica' },
    ],
  },
  { id: 'area', prompts: ['Qual a área útil (em m²)?'], kind: 'text', placeholder: 'Ex: 120' },
  // §11.13 M6 (2026-05-25): vagas / banheiros / mobiliado / andar
  // Condicionais por tipo: ChatForm.findNextRelevantStepIdx pula esses
  // pra tipos onde não fazem sentido (terreno, sítio, galpão puro).
  {
    id: 'vagas',
    prompts: ['Quantas vagas de garagem?'],
    kind: 'chips',
    options: [
      { value: '0',  label: '0' },
      { value: '1',  label: '1' },
      { value: '2',  label: '2' },
      { value: '3',  label: '3' },
      { value: '4+', label: '4+' },
    ],
  },
  {
    id: 'banheiros',
    prompts: ['Quantos banheiros (incluindo suítes)?'],
    kind: 'chips',
    options: [
      { value: '1',  label: '1' },
      { value: '2',  label: '2' },
      { value: '3',  label: '3' },
      { value: '4+', label: '4+' },
    ],
  },
  {
    id: 'mobiliado',
    prompts: ['O imóvel é mobiliado?'],
    kind: 'cards',
    options: [
      { value: 'mob',    label: 'Mobiliado',         sub: 'Móveis + eletros',    icon: 'check' },
      { value: 'semi',   label: 'Semi-mobiliado',    sub: 'Móveis essenciais',   icon: 'check' },
      { value: 'vazio',  label: 'Sem mobília',       sub: 'Vazio',               icon: 'open' },
    ],
  },
  {
    id: 'andar',
    prompts: ['Em qual andar fica o imóvel?'],
    kind: 'cards',
    options: [
      { value: 'terreo',  label: 'Térreo',          icon: 'pin' },
      { value: 'baixo',   label: 'Andar baixo',     sub: 'até o 3º andar',         icon: 'pin' },
      { value: 'medio',   label: 'Andar médio',     sub: 'do 4º ao 10º',           icon: 'pin' },
      { value: 'alto',    label: 'Andar alto',      sub: 'acima do 10º',           icon: 'pin' },
      { value: 'cob',     label: 'Cobertura',       sub: 'último andar',           icon: 'pin' },
    ],
  },
  // §11.13 M9 (2026-05-25): ano + documentação
  {
    id: 'ano_construcao',
    prompts: ['Em que ano o imóvel foi construído (aproximado)?'],
    kind: 'cards',
    options: [
      { value: 'novo',     label: 'Novo / na planta',  sub: 'menos de 2 anos',  icon: 'check' },
      { value: 'recente',  label: 'Recente',           sub: '2 a 10 anos',      icon: 'check' },
      { value: 'medio',    label: 'Médio',             sub: '10 a 25 anos',     icon: 'check' },
      { value: 'antigo',   label: 'Antigo',            sub: '25+ anos',         icon: 'check' },
      { value: 'na',       label: 'Não sei',           sub: '',                 icon: 'open' },
    ],
  },
  {
    id: 'documentacao',
    prompts: ['Qual a situação da documentação do imóvel?'],
    kind: 'cards',
    options: [
      { value: 'ok',         label: 'Tudo regular',      sub: 'Habite-se + matrícula em dia', icon: 'check' },
      { value: 'inventario', label: 'Em inventário',     sub: 'Tenho herança em curso',       icon: 'open' },
      { value: 'financiado', label: 'Financiado',        sub: 'Ainda pago financiamento',     icon: 'open' },
      { value: 'pendencias', label: 'Tem pendências',    sub: 'Preciso de ajuda pra regularizar', icon: 'open' },
    ],
  },
  {
    id: 'valor_modo',
    prompts: [
      'Por quanto você quer anunciar?',
      'Você pode informar o valor exato ou escolher uma faixa — fica a seu critério.',
    ],
    kind: 'cards',
    options: [
      { value: 'exato', label: 'Quero informar o valor exato', sub: 'Ex: R$ 850.000', icon: 'wallet' },
      { value: 'faixa', label: 'Prefiro uma faixa',             sub: '5 opções amplas', icon: 'check' },
    ],
  },
  {
    id: 'valor_exato',
    // Só aparece se valor_modo === 'exato' — ChatForm pula este step caso contrário
    prompts: ['Qual o valor exato em reais? (só números, ex: 850000)'],
    kind: 'text',
    placeholder: 'R$ 850.000',
    validate: (v) => {
      const n = Number(String(v).replace(/[^0-9]/g, ''))
      if (!n || n < 50_000) return 'Digite um valor maior que R$ 50.000'
      if (n > 200_000_000) return 'Valor parece muito alto — confira'
      return true
    },
  },
  {
    id: 'valor',
    // Só aparece se valor_modo === 'faixa' — ChatForm pula caso contrário
    prompts: ['Qual a faixa de valor?'],
    kind: 'cards',
    options: [
      { value: 'A', label: 'Até R$ 300 mil',          icon: 'wallet' },
      { value: 'B', label: 'R$ 300 mil – R$ 500 mil', icon: 'wallet' },
      { value: 'C', label: 'R$ 500 mil – R$ 800 mil', icon: 'wallet' },
      { value: 'D', label: 'R$ 800 mil – R$ 1,2 mi',  icon: 'wallet' },
      { value: 'E', label: 'R$ 1,2 mi – R$ 2 mi',     icon: 'wallet' },
      { value: 'F', label: 'R$ 2 mi – R$ 3,5 mi',     icon: 'wallet' },
      { value: 'G', label: 'R$ 3,5 mi – R$ 6 mi',     icon: 'wallet' },
      { value: 'H', label: 'Acima de R$ 6 mi',        icon: 'wallet' },
    ],
  },
  // §11.13 M7 (2026-05-25): step financeiro combinado (multi-toggle)
  {
    id: 'financeiro',
    prompts: [
      'Toparia receber propostas com financiamento, FGTS ou permuta?',
      'Pode escolher mais de uma opção (ou pular).',
    ],
    kind: 'chips',
    options: [
      { value: 'fin',     label: '✓ Aceito financiamento' },
      { value: 'fgts',    label: '✓ Aceito FGTS' },
      { value: 'perm',    label: '✓ Aceito permuta' },
      { value: 'avista',  label: '💰 Prefiro à vista' },
    ],
    optional: true,
  },
  // §11.13 M8 (2026-05-25): custos atuais (opcional)
  {
    id: 'custos',
    prompts: [
      'Custos mensais aproximados (opcional — ajuda o comprador a calcular)',
      'Pode digitar "300+150" pra condomínio R$ 300 e IPTU R$ 150 mensal.',
    ],
    kind: 'text',
    placeholder: 'Ex: 800+220 (condomínio + IPTU)',
    optional: true,
  },
  {
    id: 'exclusividade',
    prompts: ['Toparia trabalhar com exclusividade conosco por um período? (a gente investe mais na divulgação)'],
    kind: 'cards',
    options: [
      { value: 'sim',  label: 'Sim, exclusivo',     sub: 'Quero foco total',          icon: 'lock' },
      { value: 'nao',  label: 'Sem exclusividade',  sub: 'Outras imobiliárias também', icon: 'open' },
      { value: 'conv', label: 'Conversar antes',    sub: 'Quero entender melhor',     icon: 'check' },
    ],
  },
  {
    id: 'fotos',
    prompts: ['Você já tem fotos do imóvel?'],
    kind: 'chips',
    options: [
      { value: 'pro', label: '📸 Profissionais' },
      { value: 'cel', label: '📱 Celular' },
      { value: 'nao', label: '❌ Não tenho ainda' },
      { value: 'aj',  label: '🙏 Preciso de ajuda' },
    ],
  },
  {
    id: 'diferenciais',
    prompts: [
      'Última pergunta importante: o que você acha que é diferencial do seu imóvel?',
      'Tudo reformado, oportunidade, imóvel de inventário abaixo do preço, vista privilegiada, andar alto... Detalha aqui — é o que vai fazer o comprador se interessar em fechar negócio com você.',
    ],
    kind: 'text',
    placeholder: 'Ex: Recém reformado em 2025, vista mar, prédio com piscina e academia, aceita permuta com imóvel menor...',
    optional: true,
  },
  {
    id: 'whatsapp',
    prompts: (s) => [`Tudo certo, ${s.nome.split(' ')[0]}. Qual seu WhatsApp pra equipe entrar em contato?`],
    kind: 'phone',
    placeholder: '(31) 99999-9999',
  },
  { id: 'summary', prompts: ['Confere se tá tudo certo:'], kind: 'summary', role: 'seller' },
]

/* ============================================
   Phone mask
   ============================================ */
export function maskPhone(v: string): string {
  const digits = v.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

/* ============================================
   Summary builder
   ============================================ */
export function buildSummary(role: 'buyer' | 'seller', a: Answers): [string, string][] {
  // §11.13 M1 (2026-05-25): expandido pra cobrir os 10 tipos do step `tipo`.
  const tipoMap: Record<string, string> = {
    apt: 'Apartamento',
    casa: 'Casa',
    cob: 'Cobertura',
    studio: 'Studio',
    kitnet: 'Kitnet',
    sobrado: 'Sobrado',
    ter: 'Terreno',
    sitio: 'Sítio',
    com: 'Comercial',
    galpao: 'Galpão',
  }
  const cidadeMap: Record<string, string> = {
    SP_CAP: 'São Paulo / SP (capital)',
    RJ_CAP: 'Rio de Janeiro / RJ (capital)',
    MG_CAP: 'Belo Horizonte / MG (capital)',
    SP_INT: 'Interior de São Paulo',
    RJ_INT: 'Interior do Rio de Janeiro',
    MG_INT: 'Interior de Minas Gerais',
  }
  const faixaMap: Record<string, string> = {
    // Buyer (5 faixas amplas, mantém compat)
    A: 'Até R$ 400 mil', B: 'R$ 400 mil – R$ 800 mil', C: 'R$ 800 mil – R$ 1,5 mi',
    D: 'R$ 1,5 mi – R$ 3 mi', E: 'Acima de R$ 3 mi',
  }
  const faixaSellerMap: Record<string, string> = {
    A: 'Até R$ 300 mil', B: 'R$ 300 mil – R$ 500 mil', C: 'R$ 500 mil – R$ 800 mil',
    D: 'R$ 800 mil – R$ 1,2 mi', E: 'R$ 1,2 mi – R$ 2 mi', F: 'R$ 2 mi – R$ 3,5 mi',
    G: 'R$ 3,5 mi – R$ 6 mi', H: 'Acima de R$ 6 mi',
  }
  function formatExactBrl(raw: string | undefined): string {
    if (!raw) return '—'
    const n = Number(String(raw).replace(/[^0-9]/g, ''))
    if (!n) return '—'
    return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
  }
  const prazoMap: Record<string, string> = { urg: 'Até 3 meses', med: '3 a 6 meses', cal: 'Mais de 6 meses', rs: 'Sem prazo definido' }
  const pagMap: Record<string, string> = { AV: 'À vista', FIN: 'Financiamento', MIX: 'Misto', NSEI: 'Ainda decidindo' }
  const exclMap: Record<string, string> = { sim: 'Com exclusividade', nao: 'Sem exclusividade', conv: 'Quer conversar' }
  const fotoMap: Record<string, string> = { pro: 'Profissionais', cel: 'Celular', nao: 'Sem fotos', aj: 'Quer ajuda' }

  if (role === 'buyer') {
    return [
      ['Nome',         a.nome || '—'],
      ['Cidade',       cidadeMap[a.cidade] || '—'],
      ['Bairros',      a.bairros || 'Aberto'],
      ['Tipo',         tipoMap[a.tipo] || '—'],
      ['Dormitórios',  a.dorms === 'tanto' ? 'Tanto faz' : (a.dorms || '—')],
      ['Investimento', faixaMap[a.faixa] || '—'],
      ['Pagamento',    pagMap[a.pagamento] || '—'],
      ['Prazo',        prazoMap[a.prazo] || '—'],
      ['Essenciais',   a.extras || '—'],
      ['WhatsApp',     a.whatsapp || '—'],
    ]
  }
  const valorLabel = a.valor_modo === 'exato' && a.valor_exato
    ? formatExactBrl(a.valor_exato)
    : (faixaSellerMap[a.valor] || faixaMap[a.valor] || '—')
  // §11.13 M5–M9 (2026-05-25): novos maps pros campos adicionados
  const mobMap: Record<string, string> = { mob: 'Mobiliado', semi: 'Semi-mobiliado', vazio: 'Sem mobília' }
  const andarMap: Record<string, string> = {
    terreo: 'Térreo', baixo: 'Andar baixo (até 3º)', medio: 'Andar médio (4º–10º)',
    alto: 'Andar alto (acima 10º)', cob: 'Cobertura',
  }
  const anoMap: Record<string, string> = {
    novo: 'Novo / planta', recente: 'Recente (2–10 anos)', medio: 'Médio (10–25 anos)',
    antigo: 'Antigo (25+ anos)', na: 'Não sei',
  }
  const docMap: Record<string, string> = {
    ok: 'Regular', inventario: 'Em inventário', financiado: 'Financiado', pendencias: 'Tem pendências',
  }
  const finChipMap: Record<string, string> = {
    fin: 'Financiamento', fgts: 'FGTS', perm: 'Permuta', avista: 'Só à vista',
  }
  // a.financeiro pode ser string CSV (chips) — split + map + join
  const financeiroLabel = a.financeiro
    ? a.financeiro.split(',').map((v) => finChipMap[v.trim()] || v).filter(Boolean).join(', ') || '—'
    : 'Não informado'
  const rows: [string, string][] = [
    ['Nome',             a.nome || '—'],
    ['Tipo',             tipoMap[a.tipo] || '—'],
    ['Cidade',           cidadeMap[a.cidade] || '—'],
    ['Bairro',           a.bairro || '—'],
  ]
  // §11.13 M5 condicionais: só mostra campos que fazem sentido pro tipo
  const tipoCode = a.tipo || ''
  const isResidential = ['apt', 'casa', 'cob', 'studio', 'kitnet', 'sobrado'].includes(tipoCode)
  const isLand = tipoCode === 'ter'
  if (!isLand) {
    if (isResidential) rows.push(['Dormitórios', a.dorms || '—'])
    rows.push(['Área útil', a.area ? `${a.area} m²` : '—'])
    if (isResidential) {
      rows.push(['Vagas',     a.vagas || '—'])
      rows.push(['Banheiros', a.banheiros || '—'])
      rows.push(['Mobília',   mobMap[a.mobiliado] || '—'])
      rows.push(['Andar',     andarMap[a.andar] || '—'])
    }
    rows.push(['Ano construção', anoMap[a.ano_construcao] || '—'])
    rows.push(['Documentação',   docMap[a.documentacao] || '—'])
  }
  rows.push(
    ['Valor pretendido', valorLabel],
    ['Aceita',           financeiroLabel],
    ['Custos mensais',   a.custos || '—'],
    ['Exclusividade',    exclMap[a.exclusividade] || '—'],
    ['Fotos',            fotoMap[a.fotos] || '—'],
    ['Diferenciais',     a.diferenciais || '—'],
    ['WhatsApp',         a.whatsapp || '—'],
  )
  return rows
}
