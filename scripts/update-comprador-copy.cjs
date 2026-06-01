/**
 * Atualiza src/locales/{pt,en,es}/comprador.json com novo hero + 2 seções
 * (inversion + transparency) — pedido do Rafael 2026-05-31.
 *
 * Backups originais salvos em comprador.backup.json.
 */
const fs = require('fs');
const path = require('path');

const PT = {
  hero: {
    eyebrow: 'Para quem compra',
    title_question_part1: 'Você sabia que a maioria dos vendedores nos portais anuncia o imóvel com preço',
    title_question_em: 'extremamente inflacionado?',
    lead_q1: 'Imóvel que vale ',
    lead_q1_strong1: 'R$ 1 milhão',
    lead_q2: ' ele anuncia por ',
    lead_q2_strong2: 'R$ 2 milhões',
    lead_q3: ' — e inviabiliza a venda. Esse vendedor não está realmente motivado. Está esperando dar sorte de encontrar um ingênuo que pague o preço que tirou da cabeça.',
    cta_primary: 'Iniciar minha busca',
    cta_secondary: 'Quem somos',
  },
  inversion: {
    eyebrow: 'A inversão',
    title_l1: 'A Achamos faz o',
    title_em: 'caminho contrário',
    title_l2: '. Aqui o comprador é a estrela.',
    intro_html: 'Nosso modelo usa a tecnologia <strong>a favor do comprador</strong> de uma forma simples: <strong>a gente anuncia VOCÊ, não o imóvel.</strong> Sua busca vira uma campanha paga no <strong>Instagram, Facebook e YouTube</strong> — algo assim:',
    card_a_handle: 'achamosimoveis',
    card_a_subtitle: 'Patrocinado',
    card_a_loc: '📍 Copacabana, RJ',
    card_a_text: 'Temos comprador com <strong>R$ 1 milhão</strong> pra pagar <strong>à vista</strong> em imóvel em Copacabana, 2 quartos, em bom estado.',
    card_a_cta: 'Tenho um imóvel assim',
    card_b_handle: 'achamosimoveis',
    card_b_subtitle: 'Patrocinado',
    card_b_loc: '📍 Flamengo · Botafogo, RJ',
    card_b_text: 'Temos comprador com <strong>R$ 2 milhões</strong> pra pagar <strong>à vista</strong> em imóvel no Flamengo ou Botafogo, com vista pro Pão de Açúcar.',
    card_b_cta: 'Tenho um imóvel assim',
    outro_html: 'Hoje praticamente <strong>100% dos proprietários</strong> estão rolando feed o dia todo no Instagram, YouTube e Facebook. Eles vêem essa campanha e pensam: <em>"Opa, tem comprador querendo? Eu <strong>preciso</strong> vender."</em>',
    outro2_html: 'E quem precisa vender de verdade — pra <strong>bancar uma questão de saúde</strong>, pra <strong>investir em um negócio</strong>, por divórcio, mudança — chega até você com <strong>20% a 50% de desconto</strong> sobre o preço inflacionado do portal.',
    outro3_html: 'Você fica na posição privilegiada de <strong>escolher só o que faz sentido pra você.</strong>',
  },
  transparency: {
    eyebrow: 'Transparência total',
    title_l1: 'Você não está pagando pela busca.',
    title_em: 'Está custeando a campanha.',
    body1_html: 'A Achamos ganha dinheiro de <strong>um jeito só</strong>: comissão na venda — paga pelo vendedor, como qualquer imobiliária tradicional.',
    body2_html: 'Os planos abaixo <strong>não são lucro nosso</strong>. Eles custeiam a campanha direcionada que a gente roda em mídia paga pra encontrar o vendedor certo pra você.',
    body3_q: 'E se a gente não entregar?',
    body3_html: 'Devolvemos a maior parte como garantia. <strong>Por escrito.</strong>',
  },
};

const EN = {
  hero: {
    eyebrow: 'For buyers',
    title_question_part1: 'Did you know most sellers on real-estate portals list their property at a price that is',
    title_question_em: 'extremely inflated?',
    lead_q1: 'A property worth ',
    lead_q1_strong1: 'R$ 1 million',
    lead_q2: ' they list for ',
    lead_q2_strong2: 'R$ 2 million',
    lead_q3: ' — making the sale impossible. That seller is not truly motivated. They are just hoping to find a naive buyer who will pay the price they pulled out of thin air.',
    cta_primary: 'Start my search',
    cta_secondary: 'Who we are',
  },
  inversion: {
    eyebrow: 'The flip',
    title_l1: 'Achamos takes the',
    title_em: 'opposite path',
    title_l2: '. Here the buyer is the star.',
    intro_html: 'Our model uses technology <strong>in favor of the buyer</strong> in a simple way: <strong>we advertise YOU, not the property.</strong> Your search becomes a paid campaign on <strong>Instagram, Facebook and YouTube</strong> — something like this:',
    card_a_handle: 'achamosimoveis',
    card_a_subtitle: 'Sponsored',
    card_a_loc: '📍 Copacabana, RJ',
    card_a_text: 'We have a buyer with <strong>R$ 1 million</strong> ready to pay <strong>cash</strong> for a property in Copacabana, 2 bedrooms, good condition.',
    card_a_cta: 'I have a property like this',
    card_b_handle: 'achamosimoveis',
    card_b_subtitle: 'Sponsored',
    card_b_loc: '📍 Flamengo · Botafogo, RJ',
    card_b_text: 'We have a buyer with <strong>R$ 2 million</strong> ready to pay <strong>cash</strong> for a property in Flamengo or Botafogo, with a view of Sugarloaf Mountain.',
    card_b_cta: 'I have a property like this',
    outro_html: 'Today nearly <strong>100% of property owners</strong> scroll their feed all day on Instagram, YouTube and Facebook. They see this campaign and think: <em>"Wait, there is a buyer looking? I <strong>need</strong> to sell."</em>',
    outro2_html: 'And those who truly need to sell — to <strong>cover a health issue</strong>, to <strong>invest in a business</strong>, divorce, relocation — come to you with <strong>20% to 50% discounts</strong> off the inflated portal price.',
    outro3_html: 'You get the privileged position of <strong>choosing only what makes sense for you.</strong>',
  },
  transparency: {
    eyebrow: 'Full transparency',
    title_l1: 'You are not paying for the search.',
    title_em: 'You are funding the campaign.',
    body1_html: 'Achamos makes money in <strong>one way only</strong>: sale commission — paid by the seller, like any traditional broker.',
    body2_html: 'The plans below <strong>are not our profit</strong>. They fund the targeted campaign we run in paid media to find the right seller for you.',
    body3_q: 'And if we do not deliver?',
    body3_html: 'We refund most of it as a guarantee. <strong>In writing.</strong>',
  },
};

const ES = {
  hero: {
    eyebrow: 'Para quien compra',
    title_question_part1: '¿Sabías que la mayoría de los vendedores en los portales anuncia su inmueble con un precio',
    title_question_em: 'extremadamente inflado?',
    lead_q1: 'Un inmueble que vale ',
    lead_q1_strong1: 'R$ 1 millón',
    lead_q2: ' lo anuncia por ',
    lead_q2_strong2: 'R$ 2 millones',
    lead_q3: ' — e inviabiliza la venta. Ese vendedor no está realmente motivado. Está esperando tener suerte de encontrar un ingenuo que pague el precio que sacó de su cabeza.',
    cta_primary: 'Iniciar mi búsqueda',
    cta_secondary: 'Quiénes somos',
  },
  inversion: {
    eyebrow: 'La inversión',
    title_l1: 'Achamos hace el',
    title_em: 'camino contrario',
    title_l2: '. Aquí el comprador es la estrella.',
    intro_html: 'Nuestro modelo usa la tecnología <strong>a favor del comprador</strong> de una forma simple: <strong>nosotros anunciamos a TI, no al inmueble.</strong> Tu búsqueda se convierte en una campaña paga en <strong>Instagram, Facebook y YouTube</strong> — algo así:',
    card_a_handle: 'achamosimoveis',
    card_a_subtitle: 'Patrocinado',
    card_a_loc: '📍 Copacabana, RJ',
    card_a_text: 'Tenemos comprador con <strong>R$ 1 millón</strong> para pagar <strong>al contado</strong> en inmueble en Copacabana, 2 habitaciones, en buen estado.',
    card_a_cta: 'Tengo un inmueble así',
    card_b_handle: 'achamosimoveis',
    card_b_subtitle: 'Patrocinado',
    card_b_loc: '📍 Flamengo · Botafogo, RJ',
    card_b_text: 'Tenemos comprador con <strong>R$ 2 millones</strong> para pagar <strong>al contado</strong> en inmueble en Flamengo o Botafogo, con vista al Pan de Azúcar.',
    card_b_cta: 'Tengo un inmueble así',
    outro_html: 'Hoy prácticamente <strong>100% de los propietarios</strong> rolean su feed todo el día en Instagram, YouTube y Facebook. Ven esa campaña y piensan: <em>"Espera, ¿hay comprador buscando? Yo <strong>necesito</strong> vender."</em>',
    outro2_html: 'Y quien necesita vender de verdad — para <strong>cubrir un tema de salud</strong>, para <strong>invertir en un negocio</strong>, por divorcio, mudanza — llega hasta ti con <strong>20% a 50% de descuento</strong> sobre el precio inflado del portal.',
    outro3_html: 'Tú quedas en la posición privilegiada de <strong>elegir solo lo que tiene sentido para ti.</strong>',
  },
  transparency: {
    eyebrow: 'Transparencia total',
    title_l1: 'No estás pagando por la búsqueda.',
    title_em: 'Estás financiando la campaña.',
    body1_html: 'Achamos gana dinero de <strong>una sola forma</strong>: comisión por la venta — pagada por el vendedor, como cualquier inmobiliaria tradicional.',
    body2_html: 'Los planes a continuación <strong>no son nuestra ganancia</strong>. Financian la campaña direccionada que lanzamos en medios pagos para encontrar al vendedor correcto para ti.',
    body3_q: '¿Y si no lo logramos?',
    body3_html: 'Devolvemos la mayor parte como garantía. <strong>Por escrito.</strong>',
  },
};

const updates = { pt: PT, en: EN, es: ES };

for (const [lang, newData] of Object.entries(updates)) {
  const file = path.join(__dirname, '..', 'src', 'locales', lang, 'comprador.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  data.hero = newData.hero;
  data.inversion = newData.inversion;
  data.transparency = newData.transparency;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(lang + ' OK');
}
