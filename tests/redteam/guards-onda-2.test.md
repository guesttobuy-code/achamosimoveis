# Red-team dos guards (Onda 2) — achamosimoveis

**Data:** 2026-05-26
**Repo:** achamosimoveis (site institucional + chatbot público)
**Roadmap origem:** Rendizyoficial/docs/roadmaps/ROADMAP_GUARDS_ACHAMOS_PORTAL_AJUSTES_RENDIZY_2026-05-26_00-36.md

## Guards aplicados (2)

Subset menor que portal-whitelabel porque achamosimoveis **não fala com Supabase direto** —
chama backend `rendizy-server/achamos-public` via fetch HTTP. Logo, sem necessidade
de `guard:supabase-direct`.

| Guard | Por quê |
|---|---|
| `guard:secrets` | Pega Stripe/Google/service_role JWT/AWS hardcoded |
| `guard:env-leak` | Pega .env tracked + .gitignore incompleto |
| `typecheck` | TypeScript strict |

## Anon JWT hardcoded (design intencional, aceito)

Em `src/chatbot/api.ts` temos:
- `STAGING_ANON_KEY` (eyJ... com role:anon)
- `PROD_ANON_KEY` (eyJ... com role:anon)

Estes são **publicáveis** (anon role do Supabase é safe-by-design). Site público
precisa expor anon key pra chamar backend. Guard:secrets aceita explicitamente
JWTs com `role: 'anon'` no payload.

**Rotacionar anon key:** se um dia precisar rotacionar, redeploy (ou mover pra
`VITE_*` env var no Vercel pra evitar redeploy).

## Cenários red-team (validados)

| # | Cenário | Esperado | Resultado |
|---|---|---|---|
| 1 | Stripe live key `sk_live_...` | ❌ bloqueia | ✅ pegou |
| 2 | Google OAuth secret `GOCSPX-...` | ❌ bloqueia | ✅ pegou |
| 3 | service_role JWT hardcoded | ❌ bloqueia | ✅ pegou |
| 4 | anon JWT hardcoded (existente em api.ts) | ✅ permite | ✅ passou |
| 5 | `.env.local` tracked acidentalmente | ❌ bloqueia | ✅ guard:env-leak pega |

Reuso dos mesmos cenários do portal-whitelabel (mesmo código de guard).
Veja `../portalimobiliario-whitelabel/tests/redteam/guards-onda-2.test.md` pra
detalhes completos.

## Status

✅ Guards funcionais. Bloqueiam secrets sensíveis, permitem anon JWTs publicáveis.
