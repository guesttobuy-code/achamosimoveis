/**
 * Adiciona 2 novas seções em home.json:
 *   - phone_feed: 3 anúncios Instagram que ciclam no phone mockup do hero
 *   - game_flipped: substitui a seção do vídeo "O jogo virou" por
 *     storytelling visual ANTES/DEPOIS
 *
 * PT primeiro (pedido do Rafael). EN/ES recebem cópia do PT como fallback —
 * traduzir depois quando o visual estiver aprovado.
 */
const fs = require('fs');
const path = require('path');

/* ─────────── phone_feed (3 anúncios em loop) ─────────── */
const PHONE_FEED_PT = {
  handle: 'achamosimoveis',
  verified_alt: 'Conta verificada',
  sponsor: 'Patrocinado',
  cta: 'Saber mais',
  ad1_loc: '📍 Copacabana, RJ',
  ad1_body_html: 'Temos comprador com <strong>R$ 1 milhão</strong> pra pagar <strong>à vista</strong> em imóvel em Copacabana, 2 quartos, em bom estado.',
  ad2_loc: '📍 Flamengo · Botafogo, RJ',
  ad2_body_html: 'Temos comprador com <strong>R$ 2 milhões</strong> pra pagar <strong>à vista</strong> em Flamengo ou Botafogo, com vista pro Pão de Açúcar.',
  ad3_loc: '📍 Leblon, RJ',
  ad3_body_html: 'Temos comprador com <strong>R$ 5 milhões</strong> pra pagar <strong>à vista</strong> em Leblon, 4 quartos, alto padrão.',
};

/* ─────────── game_flipped (substitui video "O jogo virou") ─────────── */
const GAME_FLIPPED_PT = {
  eyebrow: 'O jogo virou',
  headline_l1: 'Antes você caçava.',
  headline_l2: 'Hoje a gente',
  headline_em: 'acha pra você',
  headline_dot: '.',
  lead: 'A mesma jornada, dois mundos diferentes — em quantos dias?',

  // ANTES — coluna esquerda (escura, com dor)
  before_label: 'Antes · você no portal',
  before_c1_title: 'Preço inflacionado',
  before_c1_body: 'Imóvel de R$ 1 milhão anunciado por R$ 2. O vendedor está esperando dar sorte.',
  before_c2_title: 'Foto enganosa',
  before_c2_body: 'Lente grande angular, reforma escondida. Visita = decepção.',
  before_c3_title: 'Vendedor que some',
  before_c3_body: 'Mandou mensagem. Quatro dias depois, nada. Próximo anúncio.',
  before_stat_num: '60 dias',
  before_stat_label: 'caçando · 90% desistem antes de visitar',

  // DIVIDER central
  divider_text: 'O jogo virou',

  // DEPOIS — coluna direita (clara, brand)
  after_label: 'Com a Achamos · você é a estrela',
  after_c1_who: 'Vendedor A · verificado',
  after_c1_msg: 'Tenho um imóvel assim em Copacabana, 2 quartos. Posso te mandar as fotos hoje?',
  after_c2_who: 'Vendedor B · verificado',
  after_c2_msg: 'Posso abrir 15% no preço — preciso vender pra investir num negócio. Quando podemos conversar?',
  after_c3_who: 'Vendedor C · verificado',
  after_c3_msg: 'Sua proposta é justa pra mim. Aceito. Quando marcamos a visita?',
  after_stat_num: '7 dias',
  after_stat_label: 'primeira candidatura qualificada',

  cta: 'Quero estar do lado certo',
};

const updates = {
  pt: { phone_feed: PHONE_FEED_PT, game_flipped: GAME_FLIPPED_PT },
  // EN/ES recebem cópia do PT como fallback (traduzir depois)
  en: { phone_feed: PHONE_FEED_PT, game_flipped: GAME_FLIPPED_PT },
  es: { phone_feed: PHONE_FEED_PT, game_flipped: GAME_FLIPPED_PT },
};

for (const [lang, sections] of Object.entries(updates)) {
  const file = path.join(__dirname, '..', 'src', 'locales', lang, 'home.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  Object.assign(data, sections);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log('home.json ' + lang + ' OK');
}
