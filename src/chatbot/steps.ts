/* ============================================
   Chatbot step definitions (buyer + seller flows)
   ============================================ */

type TFunction = (key: string, options?: Record<string, unknown>) => string

export type StepKind = 'text' | 'cards' | 'chips' | 'chips-multi' | 'phone' | 'email' | 'summary' | 'autocomplete'

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
  /** Para kind='chips-multi': label do botão de confirmação (default: "Continuar") */
  confirmLabel?: string
}

/**
 * Builds the BUYER flow with translated strings.
 * Pass i18next `t` (e.g. from `useTranslation('chat').t`) — labels read
 * from `chat.buyer.*` and validators from `chat.validate.*`.
 */
export function buildBuyerSteps(t: TFunction): Step[] {
  return [
    {
      id: 'intro',
      prompts: [
        t('buyer.intro_p1'),
        t('buyer.intro_p2'),
        t('buyer.intro_p3'),
      ],
      kind: 'cards',
      options: [
        { value: 'go',  label: t('buyer.intro_opt_go'),  sub: t('buyer.intro_opt_go_sub'),  icon: 'check' },
        { value: 'how', label: t('buyer.intro_opt_how'), sub: t('buyer.intro_opt_how_sub'), icon: 'open' },
      ],
    },
    {
      id: 'nome',
      prompts: [t('buyer.nome_prompt')],
      kind: 'text',
      placeholder: t('buyer.nome_ph'),
      validate: (v) => v.trim().length >= 2 || t('validate.min_2_chars'),
    },
    {
      id: 'cidade',
      prompts: (s) => [t('buyer.cidade_prompt', { name: (s.nome || '').split(' ')[0] })],
      kind: 'autocomplete',
      placeholder: t('buyer.cidade_ph'),
    },
    {
      id: 'bairros',
      prompts: [t('buyer.bairros_prompt')],
      kind: 'text',
      placeholder: t('buyer.bairros_ph'),
      optional: true,
    },
    {
      id: 'tipo',
      prompts: [t('buyer.tipo_prompt')],
      kind: 'cards',
      options: [
        { value: 'apt',  label: t('buyer.tipo_apt'),  icon: 'apt' },
        { value: 'casa', label: t('buyer.tipo_casa'), icon: 'casa' },
        { value: 'cob',  label: t('buyer.tipo_cob'),  icon: 'cobertura' },
        { value: 'ter',  label: t('buyer.tipo_ter'),  icon: 'terreno' },
        { value: 'com',  label: t('buyer.tipo_com'),  icon: 'comercial' },
      ],
    },
    {
      id: 'dorms',
      prompts: [t('buyer.dorms_prompt')],
      kind: 'chips',
      options: [
        { value: '1',     label: t('buyer.dorms_1') },
        { value: '2',     label: t('buyer.dorms_2') },
        { value: '3',     label: t('buyer.dorms_3') },
        { value: '4+',    label: t('buyer.dorms_4') },
        { value: 'tanto', label: t('buyer.dorms_tanto') },
      ],
    },
    {
      id: 'faixa',
      prompts: [t('buyer.faixa_prompt')],
      kind: 'cards',
      options: [
        { value: 'A', label: t('buyer.faixa_A'), icon: 'wallet' },
        { value: 'B', label: t('buyer.faixa_B'), icon: 'wallet' },
        { value: 'C', label: t('buyer.faixa_C'), icon: 'wallet' },
        { value: 'D', label: t('buyer.faixa_D'), icon: 'wallet' },
        { value: 'E', label: t('buyer.faixa_E'), icon: 'wallet' },
      ],
    },
    {
      id: 'pagamento',
      prompts: [t('buyer.pagamento_prompt')],
      kind: 'chips',
      options: [
        { value: 'AV',   label: t('buyer.pag_av') },
        { value: 'FIN',  label: t('buyer.pag_fin') },
        { value: 'MIX',  label: t('buyer.pag_mix') },
        { value: 'NSEI', label: t('buyer.pag_nsei') },
      ],
    },
    {
      id: 'prazo',
      prompts: [t('buyer.prazo_prompt')],
      kind: 'cards',
      options: [
        { value: 'urg', label: t('buyer.prazo_urg'), sub: t('buyer.prazo_urg_sub'), icon: 'clock' },
        { value: 'med', label: t('buyer.prazo_med'), sub: t('buyer.prazo_med_sub'), icon: 'clock' },
        { value: 'cal', label: t('buyer.prazo_cal'), sub: t('buyer.prazo_cal_sub'), icon: 'clock' },
        { value: 'rs',  label: t('buyer.prazo_rs'),  sub: t('buyer.prazo_rs_sub'),  icon: 'clock' },
      ],
    },
    {
      id: 'extras',
      prompts: [
        t('buyer.extras_p1'),
        t('buyer.extras_p2'),
      ],
      kind: 'chips-multi',
      options: [
        { value: 'vaga',       label: t('buyer.extras_vaga') },
        { value: 'duas-vagas', label: t('buyer.extras_duas_vagas') },
        { value: 'varanda',    label: t('buyer.extras_varanda') },
        { value: 'sol-manha',  label: t('buyer.extras_sol_manha') },
        { value: 'pet',        label: t('buyer.extras_pet') },
        { value: 'mobiliado',  label: t('buyer.extras_mobiliado') },
        { value: 'lazer',      label: t('buyer.extras_lazer') },
        { value: 'metro',      label: t('buyer.extras_metro') },
        { value: 'andar-alto', label: t('buyer.extras_andar_alto') },
        { value: 'sacada-g',   label: t('buyer.extras_sacada_g') },
        { value: 'reformado',  label: t('buyer.extras_reformado') },
        { value: 'silencioso', label: t('buyer.extras_silencioso') },
      ],
      confirmLabel: t('ui.continue'),
      optional: true,
    },
    {
      id: 'whatsapp',
      prompts: (s) => [t('buyer.whatsapp_prompt', { name: (s.nome || '').split(' ')[0] })],
      kind: 'phone',
      placeholder: t('buyer.whatsapp_ph'),
    },
    {
      id: 'summary',
      prompts: [t('buyer.summary_prompt')],
      kind: 'summary',
      role: 'buyer',
    },
  ]
}

/**
 * Builds the SELLER flow with translated strings. Mirror of buildBuyerSteps.
 */
export function buildSellerSteps(t: TFunction): Step[] {
  return [
    {
      id: 'intro',
      prompts: [
        t('seller.intro_p1'),
        t('seller.intro_p2'),
        t('seller.intro_p3'),
      ],
      kind: 'cards',
      options: [
        { value: 'go',  label: t('seller.intro_opt_go'),  sub: t('seller.intro_opt_go_sub'),  icon: 'check' },
        { value: 'how', label: t('seller.intro_opt_how'), sub: t('seller.intro_opt_how_sub'), icon: 'open' },
      ],
    },
    {
      id: 'nome',
      prompts: [t('seller.nome_prompt')],
      kind: 'text',
      placeholder: t('seller.nome_ph'),
      validate: (v) => v.trim().length >= 2 || t('validate.min_2_chars'),
    },
    {
      id: 'tipo',
      prompts: (s) => [t('seller.tipo_prompt', { name: (s.nome || '').split(' ')[0] })],
      kind: 'cards',
      options: [
        { value: 'apt',     label: t('seller.tipo_apt'),     icon: 'apt' },
        { value: 'casa',    label: t('seller.tipo_casa'),    icon: 'casa' },
        { value: 'cob',     label: t('seller.tipo_cob'),     icon: 'cobertura' },
        { value: 'studio',  label: t('seller.tipo_studio'),  icon: 'apt' },
        { value: 'kitnet',  label: t('seller.tipo_kitnet'),  icon: 'apt' },
        { value: 'sobrado', label: t('seller.tipo_sobrado'), icon: 'casa' },
        { value: 'ter',     label: t('seller.tipo_ter'),     icon: 'terreno' },
        { value: 'sitio',   label: t('seller.tipo_sitio'),   icon: 'casa' },
        { value: 'com',     label: t('seller.tipo_com'),     icon: 'comercial' },
        { value: 'galpao',  label: t('seller.tipo_galpao'),  icon: 'comercial' },
      ],
    },
    {
      id: 'cidade',
      prompts: [t('seller.cidade_prompt')],
      kind: 'autocomplete',
      placeholder: t('seller.cidade_ph'),
    },
    { id: 'bairro', prompts: [t('seller.bairro_prompt')], kind: 'text', placeholder: t('seller.bairro_ph') },
    {
      id: 'dorms',
      prompts: [t('seller.dorms_prompt')],
      kind: 'chips',
      options: [
        { value: '1',   label: '1' },
        { value: '2',   label: '2' },
        { value: '3',   label: '3' },
        { value: '4',   label: '4' },
        { value: '5+',  label: '5+' },
        { value: 'n/a', label: t('seller.dorms_na') },
      ],
    },
    { id: 'area', prompts: [t('seller.area_prompt')], kind: 'text', placeholder: t('seller.area_ph') },
    {
      id: 'vagas',
      prompts: [t('seller.vagas_prompt')],
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
      prompts: [t('seller.banheiros_prompt')],
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
      prompts: [t('seller.mobiliado_prompt')],
      kind: 'cards',
      options: [
        { value: 'mob',    label: t('seller.mob_mob'),    sub: t('seller.mob_mob_sub'),    icon: 'check' },
        { value: 'semi',   label: t('seller.mob_semi'),   sub: t('seller.mob_semi_sub'),   icon: 'check' },
        { value: 'vazio',  label: t('seller.mob_vazio'),  sub: t('seller.mob_vazio_sub'),  icon: 'open' },
      ],
    },
    {
      id: 'andar',
      prompts: [t('seller.andar_prompt')],
      kind: 'cards',
      options: [
        { value: 'terreo', label: t('seller.andar_terreo'), icon: 'pin' },
        { value: 'baixo',  label: t('seller.andar_baixo'),  sub: t('seller.andar_baixo_sub'), icon: 'pin' },
        { value: 'medio',  label: t('seller.andar_medio'),  sub: t('seller.andar_medio_sub'), icon: 'pin' },
        { value: 'alto',   label: t('seller.andar_alto'),   sub: t('seller.andar_alto_sub'),  icon: 'pin' },
        { value: 'cob',    label: t('seller.andar_cob'),    sub: t('seller.andar_cob_sub'),   icon: 'pin' },
      ],
    },
    {
      id: 'ano_construcao',
      prompts: [t('seller.ano_prompt')],
      kind: 'cards',
      options: [
        { value: 'novo',    label: t('seller.ano_novo'),    sub: t('seller.ano_novo_sub'),    icon: 'check' },
        { value: 'recente', label: t('seller.ano_recente'), sub: t('seller.ano_recente_sub'), icon: 'check' },
        { value: 'medio',   label: t('seller.ano_medio'),   sub: t('seller.ano_medio_sub'),   icon: 'check' },
        { value: 'antigo',  label: t('seller.ano_antigo'),  sub: t('seller.ano_antigo_sub'),  icon: 'check' },
        { value: 'na',      label: t('seller.ano_na'),      sub: '',                          icon: 'open' },
      ],
    },
    {
      id: 'documentacao',
      prompts: [t('seller.doc_prompt')],
      kind: 'cards',
      options: [
        { value: 'ok',         label: t('seller.doc_ok'),         sub: t('seller.doc_ok_sub'),         icon: 'check' },
        { value: 'inventario', label: t('seller.doc_inventario'), sub: t('seller.doc_inventario_sub'), icon: 'open' },
        { value: 'financiado', label: t('seller.doc_financiado'), sub: t('seller.doc_financiado_sub'), icon: 'open' },
        { value: 'pendencias', label: t('seller.doc_pendencias'), sub: t('seller.doc_pendencias_sub'), icon: 'open' },
      ],
    },
    {
      id: 'valor_modo',
      prompts: [
        t('seller.valor_modo_p1'),
        t('seller.valor_modo_p2'),
      ],
      kind: 'cards',
      options: [
        { value: 'exato', label: t('seller.valor_modo_exato'), sub: t('seller.valor_modo_exato_sub'), icon: 'wallet' },
        { value: 'faixa', label: t('seller.valor_modo_faixa'), sub: t('seller.valor_modo_faixa_sub'), icon: 'check' },
      ],
    },
    {
      id: 'valor_exato',
      prompts: [t('seller.valor_exato_prompt')],
      kind: 'text',
      placeholder: t('seller.valor_exato_ph'),
      validate: (v) => {
        const n = Number(String(v).replace(/[^0-9]/g, ''))
        if (!n || n < 50_000) return t('validate.valor_min')
        if (n > 200_000_000) return t('validate.valor_max')
        return true
      },
    },
    {
      id: 'valor',
      prompts: [t('seller.valor_prompt')],
      kind: 'cards',
      options: [
        { value: 'A', label: t('seller.faixa_A'), icon: 'wallet' },
        { value: 'B', label: t('seller.faixa_B'), icon: 'wallet' },
        { value: 'C', label: t('seller.faixa_C'), icon: 'wallet' },
        { value: 'D', label: t('seller.faixa_D'), icon: 'wallet' },
        { value: 'E', label: t('seller.faixa_E'), icon: 'wallet' },
        { value: 'F', label: t('seller.faixa_F'), icon: 'wallet' },
        { value: 'G', label: t('seller.faixa_G'), icon: 'wallet' },
        { value: 'H', label: t('seller.faixa_H'), icon: 'wallet' },
      ],
    },
    {
      id: 'financeiro',
      prompts: [
        t('seller.fin_p1'),
        t('seller.fin_p2'),
      ],
      kind: 'chips',
      options: [
        { value: 'fin',    label: t('seller.fin_fin') },
        { value: 'fgts',   label: t('seller.fin_fgts') },
        { value: 'perm',   label: t('seller.fin_perm') },
        { value: 'avista', label: t('seller.fin_avista') },
      ],
      optional: true,
    },
    {
      id: 'custos',
      prompts: [
        t('seller.custos_p1'),
        t('seller.custos_p2'),
      ],
      kind: 'text',
      placeholder: t('seller.custos_ph'),
      optional: true,
    },
    {
      id: 'exclusividade',
      prompts: [t('seller.excl_prompt')],
      kind: 'cards',
      options: [
        { value: 'sim',  label: t('seller.excl_sim'),  sub: t('seller.excl_sim_sub'),  icon: 'lock' },
        { value: 'nao',  label: t('seller.excl_nao'),  sub: t('seller.excl_nao_sub'),  icon: 'open' },
        { value: 'conv', label: t('seller.excl_conv'), sub: t('seller.excl_conv_sub'), icon: 'check' },
      ],
    },
    {
      id: 'fotos',
      prompts: [t('seller.fotos_prompt')],
      kind: 'chips',
      options: [
        { value: 'pro', label: t('seller.fotos_pro') },
        { value: 'cel', label: t('seller.fotos_cel') },
        { value: 'nao', label: t('seller.fotos_nao') },
        { value: 'aj',  label: t('seller.fotos_aj') },
      ],
    },
    {
      id: 'diferenciais',
      prompts: [
        t('seller.diferenciais_p1'),
        t('seller.diferenciais_p2'),
      ],
      kind: 'text',
      placeholder: t('seller.diferenciais_ph'),
      optional: true,
    },
    {
      id: 'whatsapp',
      prompts: (s) => [t('seller.whatsapp_prompt', { name: (s.nome || '').split(' ')[0] })],
      kind: 'phone',
      placeholder: t('seller.whatsapp_ph'),
    },
    { id: 'summary', prompts: [t('buyer.summary_prompt')], kind: 'summary', role: 'seller' },
  ]
}

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
   Summary builder (i18n-aware)
   ============================================ */
export function buildSummary(role: 'buyer' | 'seller', a: Answers, t: TFunction): [string, string][] {
  // Legacy cidade codes (pre-IBGE-autocomplete). Kept literal — these were
  // never user-facing in EN/ES (legacy sessions don't exist there).
  const cidadeLegacyMap: Record<string, string> = {
    SP_CAP: 'São Paulo / SP (capital)',
    RJ_CAP: 'Rio de Janeiro / RJ (capital)',
    MG_CAP: 'Belo Horizonte / MG (capital)',
    SP_INT: 'Interior de São Paulo',
    RJ_INT: 'Interior do Rio de Janeiro',
    MG_INT: 'Interior de Minas Gerais',
  }
  function formatCidade(raw: string | undefined): string {
    if (!raw) return '—'
    if (cidadeLegacyMap[raw]) return cidadeLegacyMap[raw]
    if (raw.includes('/')) {
      const [nome, uf] = raw.split('/').map((s) => s.trim())
      return uf ? `${nome} / ${uf}` : nome
    }
    return raw
  }
  function formatExactBrl(raw: string | undefined): string {
    if (!raw) return '—'
    const n = Number(String(raw).replace(/[^0-9]/g, ''))
    if (!n) return '—'
    return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
  }

  const tipoMap: Record<string, string> = {
    apt: t('summary_maps.tipo_apt'),
    casa: t('summary_maps.tipo_casa'),
    cob: t('summary_maps.tipo_cob'),
    studio: t('summary_maps.tipo_studio'),
    kitnet: t('summary_maps.tipo_kitnet'),
    sobrado: t('summary_maps.tipo_sobrado'),
    ter: t('summary_maps.tipo_ter'),
    sitio: t('summary_maps.tipo_sitio'),
    com: t('summary_maps.tipo_com'),
    galpao: t('summary_maps.tipo_galpao'),
  }
  const faixaBuyerMap: Record<string, string> = {
    A: t('buyer.faixa_A'), B: t('buyer.faixa_B'), C: t('buyer.faixa_C'),
    D: t('buyer.faixa_D'), E: t('buyer.faixa_E'),
  }
  const faixaSellerMap: Record<string, string> = {
    A: t('seller.faixa_A'), B: t('seller.faixa_B'), C: t('seller.faixa_C'),
    D: t('seller.faixa_D'), E: t('seller.faixa_E'), F: t('seller.faixa_F'),
    G: t('seller.faixa_G'), H: t('seller.faixa_H'),
  }
  const prazoMap: Record<string, string> = {
    urg: t('summary_maps.prazo_urg'), med: t('summary_maps.prazo_med'),
    cal: t('summary_maps.prazo_cal'), rs: t('summary_maps.prazo_rs'),
  }
  const pagMap: Record<string, string> = {
    AV: t('summary_maps.pag_av'), FIN: t('summary_maps.pag_fin'),
    MIX: t('summary_maps.pag_mix'), NSEI: t('summary_maps.pag_nsei'),
  }
  const extrasLabelMap: Record<string, string> = {
    vaga: t('summary_maps.ex_vaga'), 'duas-vagas': t('summary_maps.ex_duas_vagas'),
    varanda: t('summary_maps.ex_varanda'), 'sol-manha': t('summary_maps.ex_sol_manha'),
    pet: t('summary_maps.ex_pet'), mobiliado: t('summary_maps.ex_mobiliado'),
    lazer: t('summary_maps.ex_lazer'), metro: t('summary_maps.ex_metro'),
    'andar-alto': t('summary_maps.ex_andar_alto'), 'sacada-g': t('summary_maps.ex_sacada_g'),
    reformado: t('summary_maps.ex_reformado'), silencioso: t('summary_maps.ex_silencioso'),
  }
  function formatExtrasLabels(raw: string | undefined): string {
    if (!raw) return ''
    return raw.split(',').map(v => extrasLabelMap[v.trim()] || v.trim()).filter(Boolean).join(', ')
  }
  const exclMap: Record<string, string> = {
    sim: t('summary_maps.excl_sim'), nao: t('summary_maps.excl_nao'), conv: t('summary_maps.excl_conv'),
  }
  const fotoMap: Record<string, string> = {
    pro: t('summary_maps.fotos_pro'), cel: t('summary_maps.fotos_cel'),
    nao: t('summary_maps.fotos_nao'), aj: t('summary_maps.fotos_aj'),
  }

  if (role === 'buyer') {
    return [
      [t('summary_labels.nome'),         a.nome || '—'],
      [t('summary_labels.cidade'),       formatCidade(a.cidade)],
      [t('summary_labels.bairros'),      a.bairros || t('summary_labels.aberto')],
      [t('summary_labels.tipo'),         tipoMap[a.tipo] || '—'],
      [t('summary_labels.dorms'),        a.dorms === 'tanto' ? t('summary_labels.tanto_faz') : (a.dorms || '—')],
      [t('summary_labels.investimento'), faixaBuyerMap[a.faixa] || '—'],
      [t('summary_labels.pagamento'),    pagMap[a.pagamento] || '—'],
      [t('summary_labels.prazo'),        prazoMap[a.prazo] || '—'],
      [t('summary_labels.essenciais'),   formatExtrasLabels(a.extras) || '—'],
      [t('summary_labels.whatsapp'),     a.whatsapp || '—'],
    ]
  }
  const valorLabel = a.valor_modo === 'exato' && a.valor_exato
    ? formatExactBrl(a.valor_exato)
    : (faixaSellerMap[a.valor] || faixaBuyerMap[a.valor] || '—')
  const mobMap: Record<string, string> = {
    mob: t('summary_maps.mob_mob'), semi: t('summary_maps.mob_semi'), vazio: t('summary_maps.mob_vazio'),
  }
  const andarMap: Record<string, string> = {
    terreo: t('summary_maps.andar_terreo'), baixo: t('summary_maps.andar_baixo'),
    medio: t('summary_maps.andar_medio'), alto: t('summary_maps.andar_alto'), cob: t('summary_maps.andar_cob'),
  }
  const anoMap: Record<string, string> = {
    novo: t('summary_maps.ano_novo'), recente: t('summary_maps.ano_recente'),
    medio: t('summary_maps.ano_medio'), antigo: t('summary_maps.ano_antigo'), na: t('summary_maps.ano_na'),
  }
  const docMap: Record<string, string> = {
    ok: t('summary_maps.doc_ok'), inventario: t('summary_maps.doc_inventario'),
    financiado: t('summary_maps.doc_financiado'), pendencias: t('summary_maps.doc_pendencias'),
  }
  const finChipMap: Record<string, string> = {
    fin: t('summary_maps.fin_fin'), fgts: t('summary_maps.fin_fgts'),
    perm: t('summary_maps.fin_perm'), avista: t('summary_maps.fin_avista'),
  }
  const financeiroLabel = a.financeiro
    ? a.financeiro.split(',').map((v) => finChipMap[v.trim()] || v).filter(Boolean).join(', ') || '—'
    : t('summary_labels.nao_informado')
  const rows: [string, string][] = [
    [t('summary_labels.nome'),         a.nome || '—'],
    [t('summary_labels.tipo'),         tipoMap[a.tipo] || '—'],
    [t('summary_labels.cidade'),       formatCidade(a.cidade)],
    [t('summary_labels.bairro'),       a.bairro || '—'],
  ]
  const tipoCode = a.tipo || ''
  const isResidential = ['apt', 'casa', 'cob', 'studio', 'kitnet', 'sobrado'].includes(tipoCode)
  const isLand = tipoCode === 'ter'
  if (!isLand) {
    if (isResidential) rows.push([t('summary_labels.dorms'), a.dorms || '—'])
    rows.push([t('summary_labels.area_util'), a.area ? `${a.area} m²` : '—'])
    if (isResidential) {
      rows.push([t('summary_labels.vagas'),     a.vagas || '—'])
      rows.push([t('summary_labels.banheiros'), a.banheiros || '—'])
      rows.push([t('summary_labels.mobilia'),   mobMap[a.mobiliado] || '—'])
      rows.push([t('summary_labels.andar'),     andarMap[a.andar] || '—'])
    }
    rows.push([t('summary_labels.ano_construcao'), anoMap[a.ano_construcao] || '—'])
    rows.push([t('summary_labels.documentacao'),   docMap[a.documentacao] || '—'])
  }
  rows.push(
    [t('summary_labels.valor_pretendido'), valorLabel],
    [t('summary_labels.aceita'),           financeiroLabel],
    [t('summary_labels.custos_mensais'),   a.custos || '—'],
    [t('summary_labels.exclusividade'),    exclMap[a.exclusividade] || '—'],
    [t('summary_labels.fotos'),            fotoMap[a.fotos] || '—'],
    [t('summary_labels.diferenciais'),     a.diferenciais || '—'],
    [t('summary_labels.whatsapp'),         a.whatsapp || '—'],
  )
  return rows
}
