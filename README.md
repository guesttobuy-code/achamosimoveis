Software Rendizy PMS gestor de imobiliárias

www.rendizy.com

Sou autodidata e desenvolvi o Rendizy com essas caracteristicas:

Arquitetura hexagonal em 4 camadas em código real — interface/application/domain/infrastructure com CONTRACT.md por módulo. Diferencial: PME europeia raramente tem isso fora do slide.
75 ADRs numerados + LEIs internas versionadas — cultura de decisão documentada nível big-tech, protocolo de reserva de número para evitar colisão entre branches paralelas.
CI proprietário com ~121 guards e diff-scope no servidor — bloqueia só o débito que este PR introduz, não teatro de CI. Pouco time europeu de PME opera assim.
Compliance de assinatura eletrônica (Lei 14.063/2020) — hash SHA-256 verificável, endpoint público de validação, certificado PDF on-demand. Lê como eIDAS para recrutador italiano.
Multi-tenancy real com RLS Postgres + policies duplas (auth.uid + service_role). SaaS multi-tenant bem feito ao nível de banco é gargalo de contratação na Europa.
Padrão Outbox transacional completo — claim atômico via RPC, retry exponencial, dead-letter, classificação de erro por StatusID. Isso é senioridade em sistemas distribuídos.
pg_cron autenticado via Supabase Vault — nada de secret em current_setting. Detalhe pequeno que denuncia maturidade de segurança.
Guards proprietários de código: XSS innerHTML, PostgREST filter injection, token-log redaction, storage business em modo ratchet monotônico. Cultura DevSecOps.
Data governance com dicionário canônico + matriz de proveniência (CMC) exigidos no PR template. Isso é GDPR-friendly e vende sozinho na UE.
Monorepo com 3 frontends React/Vite coordenados sobre 2 Supabases com "Contrato Canônico de Ambientes" e matriz Portal↔CRM machine-readable. Complexidade real de plataforma, não CRUD.
Bônus que vale mencionar
Refactor do App.tsx de monolito → 40 linhas delegando para router + cápsulas — cultura de refactor seguro sob LEI 65 ("snapshot antes, proibido remover sem substituir").
48 testes de contrato comportamental nos módulos críticos (Reservations, Channex, Chat, Automations) rodados com node --test + c8.
Registry de estabilização de módulos (experimental → beta → stable → locked) com invariantes e backstop tests exigidos por nível.
Integrações complexas: Channex (REST/JSON), Rentals United (XML), ZAP/OLX/ImóvelWeb, WAHA/WhatsApp Cloud API, Amplitude.


O Portal Achamos Imóveis, funciona com backend conectado ao Rendizy

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
