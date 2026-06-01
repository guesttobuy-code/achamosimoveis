/**
 * Reescreve vendedor.json com nova pegada de inversão de mercado:
 *   - Hero pergunta provocativa ("E se em vez de anunciar e torcer...")
 *   - Pain: 3 cards de dor concreta
 *   - Inversion: card de comprador anônimo (a JOIA da página)
 *   - How: 4 passos self-service
 *   - Guarantee: "Diagnóstico 5x" com 3 ramos (fotos/preço/mercado)
 *   - Demand: mantém a tabela existente, recontextualizada
 *   - Support: 6 cards full-service viram OPCIONAL ("se quiser ajuda")
 *
 * PT primeiro (ground truth). EN/ES recebem cópia do PT como fallback —
 * traduzir depois quando o visual estiver aprovado.
 *
 * O conteúdo antigo está em src/locales/pt/vendedor.backup.json.
 */
const fs = require('fs');
const path = require('path');

const PT = {
  hero: {
    eyebrow: "Para quem vende",
    // Pergunta provocativa em 5 partes pra permitir <em> no meio
    question_part1: "E se em vez de ",
    question_em1: "anunciar e torcer",
    question_part2: ", você fosse direto no comprador que ",
    question_em2: "já tem o cheque na mão",
    question_dot: "?",
    lead_html: "Aqui dentro tem <strong>centenas de compradores reais</strong> — com <strong>crédito aprovado</strong> ou <strong>pagamento à vista</strong> — esperando alguém oferecer um imóvel como o seu. <strong>Você não anuncia. Você negocia.</strong>",
    cta_primary: "Ver quem está comprando",
    cta_secondary: "Falar com um especialista"
  },

  pain: {
    eyebrow: "A dor que todo vendedor conhece",
    title_l1: "Anunciar e",
    title_em: "torcer",
    title_dot: ".",
    lead: "É assim que o mercado tradicional funciona — e é por isso que imóvel fica 6, 12, 18 meses parado sem você entender o porquê.",
    c1_title: "Você paga destaque no portal",
    c1_body: "E não faz ideia se quem viu seu anúncio tem R$ 1 milhão, R$ 50 ou nenhum. Paga pra aparecer pra qualquer um, inclusive curioso.",
    c2_title: "Coloca na imobiliária",
    c2_body: "Eles levam 6% e o comprador 'vem por sorte'. Você fica refém da fila de visitas — sem feedback nenhum quando a fila seca.",
    c3_title: "6 meses depois, nada",
    c3_body: "Você baixa o preço. Tira foto nova. Espera mais 3 meses. Continua sem ideia do que está errado — só sente que algo está."
  },

  inversion: {
    eyebrow: "O jogo virou pra você também",
    title_l1: "Aqui você vê",
    title_em: "quem está comprando",
    title_l2: "antes de oferecer.",
    title_dot: "",
    lead_html: "Cada comprador chega à plataforma respondendo um briefing detalhado: <strong>bairro · verba · prazo · tipo de pagamento</strong>. Você acessa essa lista. Filtra por compatibilidade. E oferta direto pra quem combina.",
    // Card de comprador anônimo (a JOIA)
    card_badge: "VERIFICADO · ATIVO HÁ 2 DIAS",
    card_who: "Comprador #1247",
    card_buy_label: "Procura",
    card_buy_value: "Apto 2 quartos · Copacabana",
    card_budget_label: "Verba",
    card_budget_value: "R$ 1.000.000",
    card_payment_label: "Pagamento",
    card_payment_value: "À VISTA",
    card_deadline_label: "Prazo",
    card_deadline_value: "Até 30 dias",
    card_cta: "Oferecer meu imóvel",
    card_note: "Exemplo ilustrativo — dados reais aparecem após você cadastrar seu imóvel.",
    outro_html: "Não é mais portal de classificado. É um <strong>marketplace de demanda</strong> — quem tá comprando aparece pra você, com cheque na mão."
  },

  how: {
    eyebrow: "Como funciona",
    title: "4 passos. Sem mistério.",
    s1_n: "01",
    s1_t: "Cadastre seu imóvel",
    s1_b: "Fotos, preço, condições. Em 10 minutos seu imóvel está no nosso radar.",
    s2_n: "02",
    s2_t: "Veja quem combina",
    s2_b: "A plataforma mostra os compradores ativos com perfil compatível. Você vê o briefing completo de cada um.",
    s3_n: "03",
    s3_t: "Oferte direto",
    s3_b: "Mande uma proposta personalizada. Sem intermediário, sem fila — você fala direto com o comprador.",
    s4_n: "04",
    s4_t: "Negocie e feche",
    s4_b: "Conversa direta, sem 6% de imobiliária no meio. Se quiser nossa equipe junto na negociação, é opcional."
  },

  guarantee: {
    eyebrow: "Garantia exclusiva",
    title_l1: "5 tentativas. Depois a",
    title_em: "verdade",
    title_dot: ".",
    lead_html: "Você ofertou pra <strong>5 compradores certos</strong> e nenhum aceitou? Nosso time analisa seu imóvel e te mostra <strong>exatamente</strong> por que ele não vendeu. Sem rodeio, sem desculpa.",
    product_name: "Diagnóstico 5x",
    branch1_icon: "📷",
    branch1_title: "Suas fotos não convencem",
    branch1_body: "A gente te mostra exatamente o que melhorar — ângulo, luz, ambientes faltando, mobília que atrapalha a percepção de espaço.",
    branch2_icon: "💰",
    branch2_title: "Seu preço está fora do mercado",
    branch2_body: "Comparamos com imóveis similares vendidos nos últimos 90 dias — e te dizemos onde seu preço precisa cair (ou se realmente está justo e o problema é outro).",
    branch3_icon: "📍",
    branch3_title: "Não tem comprador na sua área",
    branch3_body: "Mostramos com dados reais que ninguém está procurando esse tipo de imóvel no seu bairro — pra você decidir esperar, alugar ou ajustar a estratégia.",
    outro_html: "Aqui você não fica meses no escuro torcendo por um milagre. <strong>Você sabe.</strong>"
  },

  // Mantida — mas movida e recontextualizada
  demand: {
    eyebrow: "Demanda real, hoje",
    title: "Os compradores já estão aqui — em quantos?",
    city1_city: "COPACABANA",
    city1_t: "Apto 2-3 dorm. · zona sul",
    city1_b: "900k – 1,6M",
    city2_city: "BOTAFOGO",
    city2_t: "Apto/cobertura · 3 dorm.",
    city2_b: "800k – 1,8M",
    city3_city: "IPANEMA/LEBLON",
    city3_t: "3-4 dorm. · alto padrão",
    city3_b: "2M+",
    city4_city: "TIJUCA/V.ISABEL",
    city4_t: "Apto 3 dorm. · zona norte",
    city4_b: "700k – 1,2M",
    note: "* Dados atualizados nas últimas 48h. Compradores ativos com briefing validado.",
    outro: "Cada número acima é um comprador real com briefing assinado, verba comprovada e prazo definido. Não é tráfego anônimo de portal."
  },

  // Antiga 'included' virou 'support' (opcional)
  support: {
    eyebrow: "Opcional · Se quiser nossa equipe junto",
    title: "Self-service é o padrão. Full-service é o seu pedido.",
    lead: "Quem vende pelo Achamos vai direto no comprador — esse é o ponto. Mas se você quiser que a gente assuma alguma parte (ou todas), também é possível, sem mensalidade. Comissão só na venda.",
    i1_t: "Avaliação justa",
    i1_b: "Te dizemos o valor real de mercado, sem inflar — pra você decidir o preço com convicção.",
    i2_t: "Captação de fotos",
    i2_b: "Fotógrafo parceiro, sem custo adicional. Foto profissional faz diferença na taxa de oferta.",
    i3_t: "Anúncio premium",
    i3_b: "Além do nosso radar de compradores, distribuímos seu imóvel em portais e redes sociais.",
    i4_t: "Triagem de visitas",
    i4_b: "Só vai gente qualificada na sua porta — com briefing validado e verba comprovada.",
    i5_t: "Negociação acompanhada",
    i5_b: "Se preferir, nosso time conduz a conversa — oferta, contraoferta, fechamento.",
    i6_t: "Documentação & cartório",
    i6_b: "Toda a parte burocrática até a escritura, pra você não precisar se preocupar.",
    cta: "Quero entender os pacotes"
  }
};

const updates = {
  pt: PT,
  en: PT,  // fallback — traduzir depois
  es: PT
};

for (const [lang, data] of Object.entries(updates)) {
  const file = path.join(__dirname, '..', 'src', 'locales', lang, 'vendedor.json');
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log('vendedor.json ' + lang + ' OK');
}
