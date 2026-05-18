# Achamos Imóveis — Site institucional

Site público da Achamos Imóveis. Identidade preta + roxa, foco na narrativa "o vendedor te procura".

## Stack

- **Vite + React 18 + TypeScript**
- **React Router** para navegação SPA
- **Plus Jakarta Sans + Bricolage Grotesque + JetBrains Mono** (Google Fonts)

## Estrutura

| Rota | Página |
| --- | --- |
| `/` | Home institucional (hero + portais + Radar IA + 4 passos + depoimentos) |
| `/comprador` | Como funciona — Comprador |
| `/vendedor` | Como funciona — Vendedor |
| `/sobre` | Sobre / Quem somos (BH, SP, RJ + manifesto + princípios) |
| `/contato` | Contato + FAQ |
| `/comecar` | **Escolha de jornada** — distribui pros 3 produtos |
| `/comecar/briefing` | Chatbot — briefing do comprador (pilar 1) |
| `/comecar/anunciar` | Chatbot — cadastro do imóvel (vendedor) |

## Desenvolvimento

```bash
npm install
npm run dev          # local em http://localhost:5173
npm run build        # build de produção em dist/
npm run preview      # preview do build
```

## Deploy (Vercel)

Esse repo é independente do `portalimobiliario-whitelabel`. Não compartilha código, envs ou deploy com o portal logado.

URLs propostas:
- `https://achamos.com.br` — este repo (institucional)
- `https://app.achamos.com.br` — portal logado (`portalimobiliario-whitelabel`)

## Variáveis de ambiente

Nenhuma obrigatória pra este site (é estático/institucional). O CTA "começar" leva o usuário para o portal via redirect.

Variáveis opcionais (quando integrarmos com Rendizy):
- `VITE_PORTAL_URL` — URL do portal (padrão: `https://app.achamos.com.br`)
- `VITE_CRM_WEBHOOK_URL` — endpoint pra registrar leads do chatbot no Rendizy

## Próximos passos

- [ ] Integrar chatbot com o CRM Rendizy (envio de lead via webhook)
- [ ] Substituir placeholders de número (124 compradores, +150 imóveis) por dados reais
- [ ] Adicionar fotos da equipe na página Sobre
- [ ] Plugar Google Analytics
