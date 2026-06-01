/**
 * Adiciona seção `methodology` em home.json (pt/en/es) + ajusta o texto
 * de `inversion.outro2_html` em comprador.json (3 idiomas) com a versão
 * refinada do Rafael ("na maioria das vezes com preço justo").
 */
const fs = require('fs');
const path = require('path');

/* ─────────── home.json — seção `methodology` ─────────── */
const HOME_METHODOLOGY = {
  pt: {
    eyebrow: 'Por que a Achamos é diferente',
    title_l1: 'A gente não anuncia imóveis.',
    title_l2: 'A gente anuncia',
    title_em: 'você',
    title_dot: '.',
    lead_html: '<strong>Imóvel que vale R$ 1 milhão, anunciado por R$ 2 milhões</strong> nos portais — o vendedor não está motivado, está esperando dar sorte. Nosso modelo inverte o jogo: <strong>a tecnologia trabalha pro comprador.</strong>',
    card_handle: 'achamosimoveis',
    card_sponsor: 'Patrocinado',
    card_loc: '📍 Copacabana, RJ',
    card_body_html: 'Temos comprador com <strong>R$ 1 milhão</strong> pra pagar <strong>à vista</strong> em imóvel em Copacabana, 2 quartos, em bom estado.',
    card_cta: 'Tenho um imóvel assim',
    b1_num: '01',
    b1_title: 'O modelo',
    b1_desc_html: 'Sua busca vira <strong>campanha paga no Instagram, Facebook e YouTube</strong>. Proprietários — que ficam o dia todo no feed — vêem que tem comprador real esperando.',
    b2_num: '02',
    b2_title: 'O resultado',
    b2_desc_html: 'Quem precisa vender de verdade (saúde, investimento, divórcio) <strong>chega até você</strong> na maioria das vezes com preço justo, e em alguns casos com <strong>20% a 50% de desconto</strong> sobre o preço inflacionado dos portais.',
    b3_num: '03',
    b3_title: 'A garantia',
    b3_desc_html: 'Ganhamos comissão do <strong>vendedor</strong>, como qualquer imobiliária. Os planos custeiam só a campanha — <strong>se não entregarmos, devolvemos a maior parte. Por escrito.</strong>',
    cta_primary: 'Quero começar a buscar',
    cta_secondary: 'Como funciona em detalhe',
  },
  en: {
    eyebrow: 'Why Achamos is different',
    title_l1: 'We do not advertise properties.',
    title_l2: 'We advertise',
    title_em: 'you',
    title_dot: '.',
    lead_html: '<strong>A property worth R$ 1M listed for R$ 2M</strong> on portals — that seller is not motivated, just hoping to get lucky. Our model flips the game: <strong>technology works for the buyer.</strong>',
    card_handle: 'achamosimoveis',
    card_sponsor: 'Sponsored',
    card_loc: '📍 Copacabana, RJ',
    card_body_html: 'We have a buyer with <strong>R$ 1 million</strong> ready to pay <strong>cash</strong> for a property in Copacabana, 2 bedrooms, good condition.',
    card_cta: 'I have a property like this',
    b1_num: '01',
    b1_title: 'The model',
    b1_desc_html: 'Your search becomes a <strong>paid campaign on Instagram, Facebook and YouTube</strong>. Property owners — scrolling their feed all day — see there is a real buyer waiting.',
    b2_num: '02',
    b2_title: 'The result',
    b2_desc_html: 'Those who truly need to sell (health, investment, divorce) <strong>come to you</strong>, most of the time at a fair price, and in some cases with <strong>20% to 50% discounts</strong> off the inflated portal price.',
    b3_num: '03',
    b3_title: 'The guarantee',
    b3_desc_html: 'We earn commission from the <strong>seller</strong>, like any broker. The plans only fund the campaign — <strong>if we do not deliver, we refund most of it. In writing.</strong>',
    cta_primary: 'I want to start searching',
    cta_secondary: 'See how it works in detail',
  },
  es: {
    eyebrow: 'Por qué Achamos es diferente',
    title_l1: 'No anunciamos inmuebles.',
    title_l2: 'Anunciamos a',
    title_em: 'ti',
    title_dot: '.',
    lead_html: '<strong>Un inmueble que vale R$ 1M anunciado por R$ 2M</strong> en los portales — ese vendedor no está motivado, está esperando tener suerte. Nuestro modelo invierte el juego: <strong>la tecnología trabaja para el comprador.</strong>',
    card_handle: 'achamosimoveis',
    card_sponsor: 'Patrocinado',
    card_loc: '📍 Copacabana, RJ',
    card_body_html: 'Tenemos comprador con <strong>R$ 1 millón</strong> para pagar <strong>al contado</strong> en inmueble en Copacabana, 2 habitaciones, en buen estado.',
    card_cta: 'Tengo un inmueble así',
    b1_num: '01',
    b1_title: 'El modelo',
    b1_desc_html: 'Tu búsqueda se convierte en <strong>campaña paga en Instagram, Facebook y YouTube</strong>. Propietarios — que están todo el día en el feed — ven que hay comprador real esperando.',
    b2_num: '02',
    b2_title: 'El resultado',
    b2_desc_html: 'Quien necesita vender de verdad (salud, inversión, divorcio) <strong>llega hasta ti</strong>, la mayoría de las veces a precio justo, y en algunos casos con <strong>20% a 50% de descuento</strong> sobre el precio inflado de los portales.',
    b3_num: '03',
    b3_title: 'La garantía',
    b3_desc_html: 'Ganamos comisión del <strong>vendedor</strong>, como cualquier inmobiliaria. Los planes solo financian la campaña — <strong>si no lo logramos, devolvemos la mayor parte. Por escrito.</strong>',
    cta_primary: 'Quiero empezar a buscar',
    cta_secondary: 'Cómo funciona en detalle',
  },
};

for (const [lang, methodology] of Object.entries(HOME_METHODOLOGY)) {
  const file = path.join(__dirname, '..', 'src', 'locales', lang, 'home.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  data.methodology = methodology;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log('home.json ' + lang + ' OK');
}

/* ─────────── comprador.json — ajuste do outro2_html ─────────── */
const COMPRADOR_OUTRO2 = {
  pt: 'E quem precisa vender de verdade — pra <strong>bancar uma questão de saúde</strong>, pra <strong>investir em um negócio</strong>, por divórcio, mudança — chega até você na maioria das vezes com preço justo, e em alguns casos com <strong>20% a 50% de desconto</strong> sobre o preço inflacionado do portal.',
  en: 'And those who truly need to sell — to <strong>cover a health issue</strong>, to <strong>invest in a business</strong>, divorce, relocation — come to you, most of the time at a fair price, and in some cases with <strong>20% to 50% discounts</strong> off the inflated portal price.',
  es: 'Y quien necesita vender de verdad — para <strong>cubrir un tema de salud</strong>, para <strong>invertir en un negocio</strong>, por divorcio, mudanza — llega hasta ti, la mayoría de las veces a precio justo, y en algunos casos con <strong>20% a 50% de descuento</strong> sobre el precio inflado del portal.',
};

for (const [lang, outro2] of Object.entries(COMPRADOR_OUTRO2)) {
  const file = path.join(__dirname, '..', 'src', 'locales', lang, 'comprador.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  data.inversion.outro2_html = outro2;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log('comprador.json ' + lang + ' OK');
}
