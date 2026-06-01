/**
 * Adiciona seção `marketing` em comprador.json (pt/en/es) — faixa de
 * autoridade abaixo dos 3 cards de planos.
 *
 * Versão C aprovada pelo Rafael: foco no valor entregue (o mesmo nível
 * de tráfego pago dos grandes, agora pro comprador).
 */
const fs = require('fs');
const path = require('path');

const MARKETING = {
  pt: {
    icon_alt: 'Selo de autoridade',
    eyebrow: 'Por que o investimento vale',
    body_html: '<strong>Sócios vindos da maior agência de marketing digital do Brasil.</strong> O mesmo nível de tráfego pago usado por grandes marcas, agora trabalhando pra <strong>achar o vendedor certo pro seu imóvel</strong> — incluso em todos os planos, sem custo adicional.',
  },
  en: {
    icon_alt: 'Authority badge',
    eyebrow: 'Why the investment is worth it',
    body_html: '<strong>Partners from the largest digital marketing agency in Brazil.</strong> The same level of paid traffic used by major brands, now working to <strong>find the right seller for your property</strong> — included in every plan, no extra cost.',
  },
  es: {
    icon_alt: 'Sello de autoridad',
    eyebrow: 'Por qué la inversión vale la pena',
    body_html: '<strong>Socios provenientes de la mayor agencia de marketing digital de Brasil.</strong> El mismo nivel de tráfico pago usado por grandes marcas, ahora trabajando para <strong>encontrar el vendedor correcto para tu inmueble</strong> — incluido en todos los planes, sin costo adicional.',
  },
};

for (const [lang, marketing] of Object.entries(MARKETING)) {
  const file = path.join(__dirname, '..', 'src', 'locales', lang, 'comprador.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  data.marketing = marketing;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log('comprador.json ' + lang + ' OK');
}
