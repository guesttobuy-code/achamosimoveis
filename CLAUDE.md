# Achamos Imóveis — Site Institucional — Guia para IA

> Bússola pra qualquer IA que abrir este repo. Lê este arquivo PRIMEIRO antes de mexer em código.

## Quem é o usuário

Rafael, fundador da Rendizy. **Não é programador** — todo o código é escrito por IA. Precisa de metodologia segura e explicações em pt-BR acessíveis.

## O que este repo é

**Site institucional público** da marca Achamos Imóveis. É 1 dos 3 frontends do ecossistema Rendizy:

| Frontend | Repo | Função |
|---|---|---|
| Rendizy CRM | `Rendizyoficial` (workspace pai) | Admin / Operação |
| Portal Whitelabel | `portalimobiliario-whitelabel` | Área cliente logada |
| **Site Achamos** | **este repo** | Institucional público (dark) |

Stack: Vite + React 18 + TypeScript. **Sem backend** — site puramente estático com routes hash-based via react-router-dom.

## Contrato canônico de ambientes

**FONTE DE VERDADE:** [`Pasta oficial Rendizy/governance/ENVIRONMENT_CONTRACT.md`](../../Rendizyoficial-backup_2026-01-18_21-%2045-02%20(Workspace)/Pasta%20oficial%20Rendizy/governance/ENVIRONMENT_CONTRACT.md) (no repo Rendizy pai).

**Aplicado a este repo (§5.2 do contrato):**

- **1 branch:** `main` (deploya em produção)
- **Sem staging dedicado** — site sem backend não precisa de ambiente intermediário pra schema/dados
- **Preview deploys automáticos:** qualquer branch `feature/*` ganha URL preview no Vercel
- **URL produção:** https://achamosimoveis.vercel.app

## Workflow de mudança

```
1. cd achamos-repos/achamosimoveis
2. git checkout main && git pull
3. git checkout -b feature/<algo>
4. (codar)
5. git push -u origin feature/<algo>
6. Vercel cria preview automático
7. Abrir preview pra ver mudança
8. PR feature/* → main
9. Deploya prod
```

**Não precisa de staging porque não há backend/banco.** Preview deploy já cumpre função de "ver antes de mergear".

## Estrutura do projeto

```
src/
├── App.tsx                   ← @env-aware (sem backend, sem detecção runtime)
├── main.tsx                  ← entry point
├── pages/
│   ├── HomePage.tsx          ← /
│   ├── ComecarPage.tsx       ← /comecar (escolha de jornada 3 pilares)
│   ├── CompradorPage.tsx     ← /comprador
│   ├── VendedorPage.tsx      ← /vendedor
│   ├── SobrePage.tsx         ← /sobre
│   ├── ContatoPage.tsx       ← /contato
│   └── ChatPage.tsx          ← /comecar/briefing + /comecar/anunciar
├── chatbot/
│   ├── ChatForm.tsx          ← chatbot conversacional pré-cadastro
│   └── steps.ts              ← fluxo do briefing inicial
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   └── icons.tsx
├── styles/
│   ├── global.css            ← tokens Achamos (dark)
│   └── comecar.css           ← /comecar específico
└── types.ts
```

## Convenções

1. **Não há backend** — qualquer feature que precisar de dados reais deve redirecionar pro portal (`https://portalimobiliario-whitelabel.vercel.app` via `VITE_PORTAL_URL`).
2. **Tema dark** — paleta `--brand` (roxo), `--paper` (off-white), `--accent` (coral Se hospede). Tokens em `global.css`.
3. **Tipografia:** display Bricolage Grotesque · body system · mono JetBrains Mono.
4. **Rotas via react-router-dom** — não usar hash routes manuais.
5. **TODOs históricos do README:**
   - Integrar chatbot com CRM Rendizy via webhook (PENDENTE)
   - Substituir placeholders (124 compradores, +150 imóveis) por dados reais
   - Fotos da equipe em /sobre
   - Google Analytics

## Comandos

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc + vite build
```

## Quando estiver em dúvida

1. Leia o contrato: `Pasta oficial Rendizy/governance/ENVIRONMENT_CONTRACT.md`
2. Leia o cheat sheet: `Pasta oficial Rendizy/docs/operations/AMBIENTES_CHEATSHEET.md`
3. Este repo é mais simples que os outros 2 — mas a regra do "em caso de dúvida é staging" não se aplica aqui (não há staging). Em dúvida, **use preview do Vercel** antes de mergear em main.

## Histórico relevante

- 2026-05-23: CLAUDE.md criado · `@env-aware` adicionado em App.tsx + vite.config.ts.
- 2026-05-22: PR #1 mergeado — `/comecar` com copy alinhada ao handoff + badges RECOMENDADO/EM BREVE + espaçamento ajustado.
