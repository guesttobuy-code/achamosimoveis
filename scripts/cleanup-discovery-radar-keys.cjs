/**
 * Remove chaves órfãs do home.json (PT/EN/ES) após o usuário pedir pra
 * remover a seção "O Radar Achamos" do DiscoverySection.tsx — ela era
 * redundante com phone_feed, game_flipped, InsidePreview e Discovery
 * pillars que já cobrem o conceito de "anunciamos VOCÊ" no home.
 *
 * Análise feita: a seção NÃO foi replicada no /vendedor porque o angle
 * narrativo dela é do comprador ("sua busca vira anúncio, proprietários
 * despertam"). A página /vendedor já tem o equivalente narrativo do
 * outro lado: card #1247 (seção inversion) + tabela demand.
 *
 * Chaves removidas: radar_*, feed_*, tag_*, legend_*
 * Chaves PRESERVADAS: carousel_next/carousel_first (ainda usados no
 * carrossel mobile da seção 1 "5 dores resolvidas").
 */
const fs = require('fs');
const path = require('path');

const ORPHAN_PREFIXES = ['radar_', 'feed_', 'tag_', 'legend_'];

for (const lang of ['pt', 'en', 'es']) {
  const file = path.join(__dirname, '..', 'src', 'locales', lang, 'home.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  if (!data.discovery) {
    console.log(lang + ': sem discovery, pulando');
    continue;
  }

  let removed = 0;
  for (const key of Object.keys(data.discovery)) {
    if (ORPHAN_PREFIXES.some(p => key.startsWith(p))) {
      delete data.discovery[key];
      removed++;
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(lang + ': ' + removed + ' chaves órfãs removidas');
}

console.log('\n✅ Limpeza concluída.');
