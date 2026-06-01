/**
 * Tradução completa EN/ES das adições recentes + adaptação cirúrgica do
 * inglês pro perfil ESTRANGEIRO que quer comprar imóvel no Rio.
 *
 * Mudanças por arquivo:
 *
 * PT (home.json):
 *   - phone_feed.ad2_body_html: adiciona "em imóvel"
 *   - phone_feed.ad3_body_html: adiciona "em imóvel"
 *
 * EN (home.json):
 *   - hero.lead_raridade: troca "civil servant" por "expat, retiree"
 *     (perfis típicos de estrangeiro comprando no Brasil)
 *   - hero.lead_tail: adiciona menção a bilingual team + CRECI + remote
 *   - hero.lead_html: refletir as duas mudanças acima
 *   - phone_feed.*: tradução completa
 *   - game_flipped.*: tradução completa
 *
 * EN (comprador.json):
 *   - hero.lead_q3: enfatiza dor do estrangeiro/out-of-town buyer
 *
 * EN (vendedor.json): tradução completa (todas as seções).
 *
 * ES (home.json, comprador.json, vendedor.json): mesmo escopo do EN,
 *   mas sem adaptações específicas pro estrangeiro — espanhol latino
 *   é mais próximo do perfil PT-BR (mesmo continente, mesmo idioma raiz).
 *
 * A "crueza" da proposta original (leilão reverso, inversão de mercado,
 * 20%-50% desconto, Diagnóstico 5x) é PRESERVADA em todas as línguas.
 * O ajuste pro estrangeiro é só na MOLDURA (bilingual, remote, CRECI).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src', 'locales');
const readJSON = (lang, file) => JSON.parse(fs.readFileSync(path.join(ROOT, lang, file), 'utf-8'));
const writeJSON = (lang, file, data) => fs.writeFileSync(
  path.join(ROOT, lang, file),
  JSON.stringify(data, null, 2) + '\n',
  'utf-8'
);

/* ═══════════════════════════════════════════════════════════
   1. PT · home.json — só ajustar "em imóvel"
   ═══════════════════════════════════════════════════════════ */
{
  const home = readJSON('pt', 'home.json');
  home.phone_feed.ad2_body_html = 'Temos comprador com <strong>R$ 2 milhões</strong> pra pagar <strong>à vista</strong> em imóvel em Flamengo ou Botafogo, com vista pro Pão de Açúcar.';
  home.phone_feed.ad3_body_html = 'Temos comprador com <strong>R$ 5 milhões</strong> pra pagar <strong>à vista</strong> em imóvel em Leblon, 4 quartos, alto padrão.';
  writeJSON('pt', 'home.json', home);
  console.log('PT home.json — phone_feed ads ajustados');
}

/* ═══════════════════════════════════════════════════════════
   2. EN · home.json — adaptação pro perfil estrangeiro +
   tradução completa de phone_feed e game_flipped
   ═══════════════════════════════════════════════════════════ */
{
  const home = readJSON('en', 'home.json');

  // Hero · ajuste cirúrgico pro perfil estrangeiro
  home.hero.lead_raridade = 'If you are an investor, expat, retiree, or business owner';
  home.hero.lead_tail = ' ready to buy property in Rio — Achamos turns your search into paid campaigns on Instagram, Facebook, and YouTube. Motivated owners see our post — including those whose property was not even for sale — and come to you with the best offers. Our bilingual team represents you locally with CRECI-licensed brokers and full legal support, so distance and language are not a barrier. You turn timing into your advantage.';
  home.hero.lead_html = '<strong>A buyer who can actually close is the rarest asset in Brazilian real-estate</strong>. <strong>If you are an investor, expat, retiree, or business owner</strong> ready to buy property in Rio — Achamos turns your search into <strong>paid campaigns on Instagram, Facebook, and YouTube</strong>. Motivated owners see our post — including <strong>those whose property was not even for sale</strong> — and come to you with the <strong>best offers</strong>. <strong>Our bilingual team represents you locally with CRECI-licensed brokers and full legal support</strong> — so distance and language are not a barrier. You turn timing into your advantage.';
  home.hero.lead_audience = 'A buyer who can actually close is the rarest asset in Brazilian real-estate';

  // Phone feed · tradução com R$ mantido (o estrangeiro vê e calcula)
  home.phone_feed = {
    handle: 'achamosimoveis',
    verified_alt: 'Verified account',
    sponsor: 'Sponsored',
    cta: 'Learn more',
    ad1_loc: '📍 Copacabana, Rio de Janeiro',
    ad1_body_html: 'We have a buyer with <strong>R$ 1 million</strong> ready to pay <strong>cash</strong> for a property in Copacabana, 2 bedrooms, good condition.',
    ad2_loc: '📍 Flamengo · Botafogo, Rio de Janeiro',
    ad2_body_html: 'We have a buyer with <strong>R$ 2 million</strong> ready to pay <strong>cash</strong> for a property in Flamengo or Botafogo, with Sugarloaf view.',
    ad3_loc: '📍 Leblon, Rio de Janeiro',
    ad3_body_html: 'We have a buyer with <strong>R$ 5 million</strong> ready to pay <strong>cash</strong> for a property in Leblon, 4 bedrooms, high-end.'
  };

  // Game flipped · tradução completa
  home.game_flipped = {
    eyebrow: 'The game flipped',
    headline_l1: 'Before, you hunted.',
    headline_l2: 'Now we',
    headline_em: 'find for you',
    headline_dot: '.',
    lead: 'Same journey, two different worlds — in how many days?',
    before_label: 'Before · you on the portal',
    before_c1_title: 'Inflated price',
    before_c1_body: 'A R$ 1M property listed for R$ 2M. The seller is just hoping to get lucky.',
    before_c2_title: 'Misleading photos',
    before_c2_body: 'Wide-angle lens, hidden repairs. The visit = disappointment.',
    before_c3_title: 'Sellers who vanish',
    before_c3_body: 'You messaged. Four days later, nothing. Next listing.',
    before_stat_num: '60 days',
    before_stat_label: 'hunting · 90% give up before visiting',
    divider_text: 'The game flipped',
    after_label: 'With Achamos · you are the star',
    after_c1_who: 'Seller A · verified',
    after_c1_msg: "I have a property like that in Copacabana, 2 bedrooms. Can I send photos today?",
    after_c2_who: 'Seller B · verified',
    after_c2_msg: 'I can take 15% off — I need to sell to invest in a business. When can we talk?',
    after_c3_who: 'Seller C · verified',
    after_c3_msg: 'Your offer is fair to me. Accepted. When do we schedule the visit?',
    after_stat_num: '7 days',
    after_stat_label: 'first qualified candidate',
    cta: 'I want to be on the right side'
  };

  writeJSON('en', 'home.json', home);
  console.log('EN home.json — hero adaptado + phone_feed/game_flipped traduzidos');
}

/* ═══════════════════════════════════════════════════════════
   3. EN · comprador.json — menção ao foreign buyer no lead
   ═══════════════════════════════════════════════════════════ */
{
  const comp = readJSON('en', 'comprador.json');
  // Ajuste do lead pra reconhecer que estrangeiro é alvo recorrente
  comp.hero.lead_q3 = ' — especially when they sense a foreign or out-of-town buyer who doesn\'t know the market. That seller is not truly motivated. They are just hoping to find a naive buyer who will pay the price they pulled out of thin air.';
  writeJSON('en', 'comprador.json', comp);
  console.log('EN comprador.json — lead adaptado pro foreign buyer');
}

/* ═══════════════════════════════════════════════════════════
   4. EN · vendedor.json — TRADUÇÃO COMPLETA
   ═══════════════════════════════════════════════════════════ */
{
  const vendedor_EN = {
    hero: {
      eyebrow: 'For sellers',
      question_part1: 'What if instead of ',
      question_em1: 'advertising and hoping',
      question_part2: ', you went straight to the buyer who ',
      question_em2: 'already has the check in hand',
      question_dot: '?',
      lead_html: 'Inside this platform there are <strong>hundreds of real buyers</strong> — with <strong>approved financing</strong> or <strong>cash in hand</strong> — waiting for someone to offer a property like yours. <strong>You don\'t advertise. You negotiate.</strong>',
      cta_primary: 'See who is buying',
      cta_secondary: 'Talk to a specialist'
    },
    pain: {
      eyebrow: 'The pain every seller knows',
      title_l1: 'Advertise and',
      title_em: 'hope',
      title_dot: '.',
      lead: 'That is how the traditional market works — and that is why properties sit for 6, 12, 18 months with no clue why.',
      c1_title: 'You pay to feature on a portal',
      c1_body: 'And you have no idea whether the person who saw your ad has R$ 1 million, R$ 50, or nothing. You pay to show up for anyone — window-shoppers included.',
      c2_title: 'You list with an agency',
      c2_body: 'They take 6% and the buyer "comes by luck". You are stuck with the visit queue — with zero feedback when the queue dries up.',
      c3_title: '6 months later, nothing',
      c3_body: 'You lower the price. Take new photos. Wait another 3 months. Still no idea what is wrong — you just feel something is.'
    },
    inversion: {
      eyebrow: 'The game flipped for you too',
      title_l1: 'Here you see',
      title_em: 'who is buying',
      title_l2: 'before you offer.',
      title_dot: '',
      lead_html: 'Every buyer arrives at the platform answering a detailed brief: <strong>neighborhood · budget · deadline · payment type</strong>. You access this list. Filter by compatibility. And offer directly to whoever fits.',
      card_badge: 'VERIFIED · ACTIVE FOR 2 DAYS',
      card_who: 'Buyer #1247',
      card_buy_label: 'Looking for',
      card_buy_value: '2-bedroom apt · Copacabana',
      card_budget_label: 'Budget',
      card_budget_value: 'R$ 1,000,000',
      card_payment_label: 'Payment',
      card_payment_value: 'CASH',
      card_deadline_label: 'Deadline',
      card_deadline_value: 'Within 30 days',
      card_cta: 'Offer my property',
      card_note: 'Illustrative example — real data appears after you register your property.',
      outro_html: 'This is no longer a classified portal. It is a <strong>demand marketplace</strong> — whoever is buying shows up for you, check in hand.'
    },
    how: {
      eyebrow: 'How it works',
      title: '4 steps. No mystery.',
      s1_n: '01',
      s1_t: 'Register your property',
      s1_b: 'Photos, price, conditions. In 10 minutes your property is on our radar.',
      s2_n: '02',
      s2_t: 'See who matches',
      s2_b: 'The platform shows active buyers with compatible profile. You see the full brief of each one.',
      s3_n: '03',
      s3_t: 'Offer directly',
      s3_b: 'Send a personalized offer. No middleman, no queue — you talk straight to the buyer.',
      s4_n: '04',
      s4_t: 'Negotiate and close',
      s4_b: 'Direct conversation, no 6% agency commission in the middle. If you want our team alongside, that is optional.'
    },
    guarantee: {
      eyebrow: 'Exclusive guarantee',
      title_l1: '5 attempts. Then the',
      title_em: 'truth',
      title_dot: '.',
      lead_html: 'Did you offer to <strong>5 matching buyers</strong> and none accepted? Our team analyzes your property and tells you <strong>exactly</strong> why it did not sell. No spin, no excuses.',
      product_name: '5x Diagnosis',
      branch1_icon: '📷',
      branch1_title: 'Your photos do not convince',
      branch1_body: 'We show you exactly what to improve — angle, light, missing rooms, furniture that hurts the perception of space.',
      branch2_icon: '💰',
      branch2_title: 'Your price is off the market',
      branch2_body: 'We compare with similar properties sold in the last 90 days — and tell you where your price needs to drop (or if it is actually fair and the problem is elsewhere).',
      branch3_icon: '📍',
      branch3_title: 'No buyer in your area',
      branch3_body: 'We show with real data that no one is looking for that type of property in your neighborhood — so you can decide to wait, rent, or pivot.',
      outro_html: 'Here you do not sit in the dark for months hoping for a miracle. <strong>You know.</strong>'
    },
    demand: {
      eyebrow: 'Real demand, today',
      title: 'The buyers are already here — how many?',
      city1_city: 'COPACABANA',
      city1_t: '2-3 bed apt · south zone',
      city1_b: '900k – 1.6M',
      city2_city: 'BOTAFOGO',
      city2_t: 'Apt/penthouse · 3 bed',
      city2_b: '800k – 1.8M',
      city3_city: 'IPANEMA/LEBLON',
      city3_t: '3-4 bed · high-end',
      city3_b: '2M+',
      city4_city: 'TIJUCA/V.ISABEL',
      city4_t: '3 bed apt · north zone',
      city4_b: '700k – 1.2M',
      note: '* Data updated in the last 48h. Active buyers with validated brief.',
      outro: 'Every number above is a real buyer with a signed brief, verified budget, and defined deadline. It is not anonymous portal traffic.'
    },
    support: {
      eyebrow: 'Optional · If you want our team alongside',
      title: 'Self-service is the default. Full-service is on demand.',
      lead: 'Whoever sells through Achamos goes straight to the buyer — that is the point. But if you want us to take on any part (or all of it), it is possible, no monthly fee. Commission only on the sale.',
      i1_t: 'Fair appraisal',
      i1_b: 'We tell you the real market value, no inflation — so you can price with conviction.',
      i2_t: 'Photo shoot',
      i2_b: 'Partner photographer, no extra cost. Professional photos make a difference in offer rates.',
      i3_t: 'Premium listing',
      i3_b: 'Beyond our buyer radar, we distribute your property on portals and social media.',
      i4_t: 'Visit screening',
      i4_b: 'Only qualified people show up at your door — with validated brief and verified budget.',
      i5_t: 'Negotiation support',
      i5_b: 'If you prefer, our team leads the conversation — offer, counter-offer, closing.',
      i6_t: 'Paperwork & deed',
      i6_b: 'All the bureaucracy through to the deed, so you do not have to worry.',
      cta: 'Tell me about the packages'
    }
  };
  writeJSON('en', 'vendedor.json', vendedor_EN);
  console.log('EN vendedor.json — tradução completa');
}

/* ═══════════════════════════════════════════════════════════
   5. ES · home.json — phone_feed + game_flipped traduzidos
   ═══════════════════════════════════════════════════════════ */
{
  const home = readJSON('es', 'home.json');

  home.phone_feed = {
    handle: 'achamosimoveis',
    verified_alt: 'Cuenta verificada',
    sponsor: 'Patrocinado',
    cta: 'Saber más',
    ad1_loc: '📍 Copacabana, Río de Janeiro',
    ad1_body_html: 'Tenemos un comprador con <strong>R$ 1 millón</strong> listo para pagar <strong>al contado</strong> por un inmueble en Copacabana, 2 habitaciones, en buen estado.',
    ad2_loc: '📍 Flamengo · Botafogo, Río de Janeiro',
    ad2_body_html: 'Tenemos un comprador con <strong>R$ 2 millones</strong> listo para pagar <strong>al contado</strong> por un inmueble en Flamengo o Botafogo, con vista al Pan de Azúcar.',
    ad3_loc: '📍 Leblon, Río de Janeiro',
    ad3_body_html: 'Tenemos un comprador con <strong>R$ 5 millones</strong> listo para pagar <strong>al contado</strong> por un inmueble en Leblon, 4 habitaciones, alto nivel.'
  };

  home.game_flipped = {
    eyebrow: 'El juego cambió',
    headline_l1: 'Antes, tú cazabas.',
    headline_l2: 'Hoy nosotros',
    headline_em: 'encontramos por ti',
    headline_dot: '.',
    lead: 'El mismo recorrido, dos mundos diferentes — ¿en cuántos días?',
    before_label: 'Antes · tú en el portal',
    before_c1_title: 'Precio inflado',
    before_c1_body: 'Inmueble de R$ 1M anunciado por R$ 2M. El vendedor solo espera tener suerte.',
    before_c2_title: 'Fotos engañosas',
    before_c2_body: 'Lente gran angular, reforma escondida. Visita = decepción.',
    before_c3_title: 'Vendedores que desaparecen',
    before_c3_body: 'Mandaste mensaje. Cuatro días después, nada. Siguiente anuncio.',
    before_stat_num: '60 días',
    before_stat_label: 'cazando · 90% se rinden antes de visitar',
    divider_text: 'El juego cambió',
    after_label: 'Con Achamos · tú eres la estrella',
    after_c1_who: 'Vendedor A · verificado',
    after_c1_msg: 'Tengo un inmueble así en Copacabana, 2 habitaciones. ¿Puedo enviarte las fotos hoy?',
    after_c2_who: 'Vendedor B · verificado',
    after_c2_msg: 'Puedo bajar 15% el precio — necesito vender para invertir en un negocio. ¿Cuándo podemos hablar?',
    after_c3_who: 'Vendedor C · verificado',
    after_c3_msg: 'Tu oferta es justa para mí. Acepto. ¿Cuándo agendamos la visita?',
    after_stat_num: '7 días',
    after_stat_label: 'primer candidato calificado',
    cta: 'Quiero estar del lado correcto'
  };

  writeJSON('es', 'home.json', home);
  console.log('ES home.json — phone_feed/game_flipped traduzidos');
}

/* ═══════════════════════════════════════════════════════════
   6. ES · vendedor.json — TRADUÇÃO COMPLETA
   ═══════════════════════════════════════════════════════════ */
{
  const vendedor_ES = {
    hero: {
      eyebrow: 'Para quien vende',
      question_part1: '¿Y si en lugar de ',
      question_em1: 'anunciar y rezar',
      question_part2: ', fueras directamente al comprador que ',
      question_em2: 'ya tiene el cheque en la mano',
      question_dot: '?',
      lead_html: 'Aquí dentro hay <strong>cientos de compradores reales</strong> — con <strong>crédito aprobado</strong> o <strong>pago al contado</strong> — esperando que alguien ofrezca un inmueble como el tuyo. <strong>No anuncias. Negocias.</strong>',
      cta_primary: 'Ver quién está comprando',
      cta_secondary: 'Hablar con un especialista'
    },
    pain: {
      eyebrow: 'El dolor que todo vendedor conoce',
      title_l1: 'Anunciar y',
      title_em: 'rezar',
      title_dot: '.',
      lead: 'Así funciona el mercado tradicional — y por eso un inmueble se queda 6, 12, 18 meses parado sin que entiendas por qué.',
      c1_title: 'Pagas destacar en el portal',
      c1_body: 'Y no tienes idea si quien vio tu anuncio tiene R$ 1 millón, R$ 50 o nada. Pagas por aparecer ante cualquiera, incluido el curioso.',
      c2_title: 'Lo pones en la inmobiliaria',
      c2_body: 'Se llevan 6% y el comprador "viene por suerte". Te quedas atado a la fila de visitas — sin feedback cuando la fila se seca.',
      c3_title: '6 meses después, nada',
      c3_body: 'Bajas el precio. Tomas fotos nuevas. Esperas 3 meses más. Sigues sin saber qué está mal — solo sientes que algo está.'
    },
    inversion: {
      eyebrow: 'El juego cambió también para ti',
      title_l1: 'Aquí ves',
      title_em: 'quién está comprando',
      title_l2: 'antes de ofrecer.',
      title_dot: '',
      lead_html: 'Cada comprador llega a la plataforma respondiendo un briefing detallado: <strong>barrio · presupuesto · plazo · forma de pago</strong>. Accedes a esa lista. Filtras por compatibilidad. Y ofreces directamente a quien encaja.',
      card_badge: 'VERIFICADO · ACTIVO HACE 2 DÍAS',
      card_who: 'Comprador #1247',
      card_buy_label: 'Busca',
      card_buy_value: 'Apto 2 habs · Copacabana',
      card_budget_label: 'Presupuesto',
      card_budget_value: 'R$ 1.000.000',
      card_payment_label: 'Pago',
      card_payment_value: 'AL CONTADO',
      card_deadline_label: 'Plazo',
      card_deadline_value: 'Hasta 30 días',
      card_cta: 'Ofrecer mi inmueble',
      card_note: 'Ejemplo ilustrativo — los datos reales aparecen después de que registres tu inmueble.',
      outro_html: 'Ya no es un portal de clasificados. Es un <strong>marketplace de demanda</strong> — quien está comprando aparece para ti, con cheque en mano.'
    },
    how: {
      eyebrow: 'Cómo funciona',
      title: '4 pasos. Sin misterio.',
      s1_n: '01',
      s1_t: 'Registra tu inmueble',
      s1_b: 'Fotos, precio, condiciones. En 10 minutos tu inmueble está en nuestro radar.',
      s2_n: '02',
      s2_t: 'Ve quién encaja',
      s2_b: 'La plataforma muestra los compradores activos con perfil compatible. Ves el briefing completo de cada uno.',
      s3_n: '03',
      s3_t: 'Ofrece directamente',
      s3_b: 'Manda una oferta personalizada. Sin intermediarios, sin fila — hablas directamente con el comprador.',
      s4_n: '04',
      s4_t: 'Negocia y cierra',
      s4_b: 'Conversación directa, sin 6% de comisión de inmobiliaria de por medio. Si quieres a nuestro equipo contigo, es opcional.'
    },
    guarantee: {
      eyebrow: 'Garantía exclusiva',
      title_l1: '5 intentos. Después la',
      title_em: 'verdad',
      title_dot: '.',
      lead_html: '¿Le ofreciste a <strong>5 compradores correctos</strong> y ninguno aceptó? Nuestro equipo analiza tu inmueble y te muestra <strong>exactamente</strong> por qué no se vendió. Sin rodeos, sin excusas.',
      product_name: 'Diagnóstico 5x',
      branch1_icon: '📷',
      branch1_title: 'Tus fotos no convencen',
      branch1_body: 'Te mostramos exactamente qué mejorar — ángulo, luz, ambientes que faltan, muebles que perjudican la percepción de espacio.',
      branch2_icon: '💰',
      branch2_title: 'Tu precio está fuera de mercado',
      branch2_body: 'Comparamos con inmuebles similares vendidos en los últimos 90 días — y te decimos dónde tu precio debe bajar (o si realmente es justo y el problema es otro).',
      branch3_icon: '📍',
      branch3_title: 'No hay comprador en tu zona',
      branch3_body: 'Te mostramos con datos reales que nadie está buscando ese tipo de inmueble en tu barrio — para que decidas esperar, alquilar o cambiar la estrategia.',
      outro_html: 'Aquí no te quedas meses a oscuras esperando un milagro. <strong>Tú sabes.</strong>'
    },
    demand: {
      eyebrow: 'Demanda real, hoy',
      title: 'Los compradores ya están aquí — ¿cuántos?',
      city1_city: 'COPACABANA',
      city1_t: 'Apto 2-3 habs · zona sur',
      city1_b: '900k – 1,6M',
      city2_city: 'BOTAFOGO',
      city2_t: 'Apto/cobertura · 3 habs',
      city2_b: '800k – 1,8M',
      city3_city: 'IPANEMA/LEBLON',
      city3_t: '3-4 habs · alto nivel',
      city3_b: '2M+',
      city4_city: 'TIJUCA/V.ISABEL',
      city4_t: 'Apto 3 habs · zona norte',
      city4_b: '700k – 1,2M',
      note: '* Datos actualizados en las últimas 48h. Compradores activos con briefing validado.',
      outro: 'Cada número arriba es un comprador real con briefing firmado, presupuesto verificado y plazo definido. No es tráfico anónimo de portal.'
    },
    support: {
      eyebrow: 'Opcional · Si quieres a nuestro equipo contigo',
      title: 'Self-service es el estándar. Full-service es bajo demanda.',
      lead: 'Quien vende con Achamos va directo al comprador — ese es el punto. Pero si quieres que asumamos alguna parte (o todas), es posible, sin mensualidad. Comisión solo en la venta.',
      i1_t: 'Tasación justa',
      i1_b: 'Te decimos el valor real de mercado, sin inflar — para que decidas el precio con convicción.',
      i2_t: 'Sesión de fotos',
      i2_b: 'Fotógrafo socio, sin costo adicional. Las fotos profesionales hacen diferencia en la tasa de ofertas.',
      i3_t: 'Anuncio premium',
      i3_b: 'Además de nuestro radar de compradores, distribuimos tu inmueble en portales y redes sociales.',
      i4_t: 'Filtro de visitas',
      i4_b: 'Solo va gente calificada a tu puerta — con briefing validado y presupuesto comprobado.',
      i5_t: 'Negociación acompañada',
      i5_b: 'Si prefieres, nuestro equipo conduce la conversación — oferta, contraoferta, cierre.',
      i6_t: 'Documentación & escritura',
      i6_b: 'Toda la parte burocrática hasta la escritura, para que no tengas que preocuparte.',
      cta: 'Cuéntame sobre los paquetes'
    }
  };
  writeJSON('es', 'vendedor.json', vendedor_ES);
  console.log('ES vendedor.json — tradução completa');
}

console.log('\n✅ Todas as traduções aplicadas.');
