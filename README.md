# Achamos Imóveis — Institutional Site

Public marketing site for **Achamos Imóveis**, a Brazilian real-estate brand, built as part of the [Rendizy](https://www.rendizy.com) ecosystem.

- **Live site:** [achamos.com.br](https://achamos.com.br) *(Portuguese)*
- **Portal (logged-in area):** [app.achamos.com.br](https://app.achamos.com.br) *(separate repo, private)*
- **Rendizy — main product:** [rendizy.com](https://www.rendizy.com)

---

## About this project

This is one of three coordinated frontends I built as sole engineer for the Rendizy platform:

1. **Rendizy** — multi-tenant Property Management SaaS ([rendizy.com](https://www.rendizy.com))
2. **Portal whitelabel** — logged-in application shared with real-estate operators *(private repo)*
3. **Achamos Imóveis** *(this repo)* — public institutional site for one of the customer brands

All three sit over two Supabase environments (staging + production), coordinated through a canonical environments contract and a machine-readable endpoint coverage matrix defined in the main Rendizy monorepo.

## Stack

- **Vite + React 18 + TypeScript**
- **React Router** for SPA navigation
- **Plus Jakarta Sans + Bricolage Grotesque + JetBrains Mono** (Google Fonts)
- **Vercel** for deployment

## Engineering notes

Built solo with an **AI-augmented workflow** — Claude and modern LLM tooling as pair-programmer, applied under strict engineering discipline:

- **`.githooks/`** — repository-managed `pre-commit` and `pre-push` hooks, installed via `scripts/install-git-hooks.mjs`
- **`scripts/guards/`** — pre-commit guards for environment leaks and hard-coded secrets
- **`scripts/`** — maintenance and content-refresh utilities that keep marketing copy in sync with product changes
- **`CLAUDE.md`** — repository conventions loaded into every AI-assisted session, encoding shared rules (LEIs) and referenced ADRs

The main Rendizy monorepo (private) applies deeper platform patterns that inform this site's conventions — hexagonal 4-layer architecture across ~100 backend modules, 75 numbered ADRs, multi-tenant PostgreSQL with Row-Level Security, transactional outbox to a legacy XML/SOAP channel manager (60+ OTAs), Brazilian e-signature with legal validity under Lei 14.063/2020, and ~121 proprietary diff-scoped CI guards running server-side in ratchet mode.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home (hero + portals + AI radar + 4-step flow + testimonials) |
| `/comprador` | How it works — for buyers |
| `/vendedor` | How it works — for sellers |
| `/sobre` | About / Who we are (BH, SP, RJ + manifesto + principles) |
| `/contato` | Contact + FAQ |
| `/comecar` | Journey selector — routes users to the three products |
| `/comecar/briefing` | Chatbot — buyer briefing |
| `/comecar/anunciar` | Chatbot — property listing (seller onboarding) |

## Development

```bash
npm install
npm run dev          # local at http://localhost:5173
npm run build        # production build in dist/
npm run preview      # preview the production build
```

## Environment variables

This site is static-institutional — no required env vars. The "Começar" CTA redirects to the portal.

Optional (for Rendizy CRM integration):

- `VITE_PORTAL_URL` — portal URL (default: `https://app.achamos.com.br`)
- `VITE_CRM_WEBHOOK_URL` — endpoint that registers chatbot leads in the Rendizy CRM

---

## About the builder

Built solo by **Rafael Milfont** — founder-engineer, 12+ years building B2B SaaS in Brazil, one successful exit (Multi Fiscal Group, 800+ retail clients, R$3M+ ARR).

- **LinkedIn:** [linkedin.com/in/rafael-milfont-87563324](https://linkedin.com/in/rafael-milfont-87563324/)
- **Main product:** [rendizy.com](https://www.rendizy.com)

Italian descent (great-grandchild). Eligible for extra-quota work authorization in Italy under D.L. 36/2025, Art. 27 §1-octies — Italian employers can hire outside the annual immigration quota, with a path to Italian citizenship after three years of legal residence.

Open to relocation (Italy priority; also Germany, Portugal, Netherlands) or remote roles in EUR/USD.

Currently looking for roles as **Forward-Deployed Engineer · Applied AI Engineer · Founding Engineer · Product Engineer**.
