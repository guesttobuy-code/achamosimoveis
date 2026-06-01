# Plano · Subdomínio + Login Unificado Achamos → Portal

> **Status:** postergado por decisão do Rafael (2026-06-01). Retomar quando tiver tempo de configurar DNS + Vercel + Supabase + Google OAuth.

## Contexto

Hoje o site Achamos (`achamosimoveis.vercel.app`) e o Portal whitelabel (`portalimobiliario-whitelabel.vercel.app`) são **dois domínios diferentes** do ponto de vista do browser. Cookies/sessões Supabase não podem ser compartilhados entre eles.

Resultado: usuário que loga em um, **não** está logado no outro.

O botão "Entrar" no Achamos hoje (commit `59f5d8b`) leva direto pra `/login` do portal — onde o usuário vê o card "Continuar com Google". Funciona, mas é 1 clique a mais do que poderia ser.

## Por que `*.vercel.app` não resolve

Sugestão considerada: usar `app.achamosimoveis.vercel.app`. **Não funciona** por dois motivos técnicos:

1. **Vercel não permite ocupação de subdomínios próprios em `.vercel.app`** — cada projeto recebe um único `<nome>.vercel.app` fixo, não dá pra criar subdomínios apontando pra outro projeto.

2. **Public Suffix List bloqueia compartilhamento de cookies** — browsers tratam `vercel.app` como TLD pública. Cookies definidos em `algumprojeto.vercel.app` não podem ser lidos por `outroprojeto.vercel.app`. Proteção de segurança do browser, não dá pra contornar.

## Solução: usar `achamosimoveis.com.br` (já comprado)

| URL | Função | Repo |
|---|---|---|
| `achamosimoveis.com.br` | Site institucional | `achamosimoveis` |
| `app.achamosimoveis.com.br` | Portal logado | `portalimobiliario-whitelabel` |

Com essa estrutura, cookies podem ser compartilhados via domínio raiz `.achamosimoveis.com.br`. Sessão criada no site institucional vale no portal automaticamente.

### "Não publicar oficial" continua possível

- Não divulgar URL nas redes sociais / marketing — só quem souber acessa
- Adicionar `<meta name="robots" content="noindex,nofollow">` no Achamos pra Google não indexar
- Os `.vercel.app` continuam funcionando em paralelo (não desligar)

## Passos de execução (quando retomar)

### 1. DNS (no painel onde o domínio foi comprado)

Adicionar 2 registros — valores exatos vêm do Vercel ao adicionar Custom Domain:

- `achamosimoveis.com.br` (apex) → CNAME ou A pro Vercel
- `app.achamosimoveis.com.br` → CNAME pro Vercel

### 2. Vercel — Custom Domains

- Projeto **achamosimoveis**: adicionar `achamosimoveis.com.br` em Settings → Domains
- Projeto **portalimobiliario-whitelabel**: adicionar `app.achamosimoveis.com.br` em Settings → Domains

### 3. Supabase do Portal (projeto staging + produção)

- Authentication → URL Configuration → Site URL: `https://app.achamosimoveis.com.br`
- Adicionar `https://app.achamosimoveis.com.br/**` e `https://achamosimoveis.com.br/**` em **Redirect URLs allowlist**

### 4. Google Cloud Console (OAuth client do Portal)

- APIs & Services → Credentials → cliente OAuth do portal
- Authorized redirect URIs: adicionar `https://<projeto-supabase>.supabase.co/auth/v1/callback` (já deve ter) e qualquer callback custom usado
- Authorized JavaScript origins: adicionar `https://app.achamosimoveis.com.br` e `https://achamosimoveis.com.br`

### 5. Variáveis de ambiente (Vercel)

- Conferir `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` continuam apontando pro projeto certo
- Adicionar variável `VITE_PORTAL_URL=https://app.achamosimoveis.com.br` no projeto **achamosimoveis** (substitui o hardcoded em `src/App.tsx` que aponta pra `vercel.app/login`)

### 6. Código (PRs separados — pequenos)

**No site Achamos** (`src/App.tsx`):
```ts
if (id === 'entrar') {
  window.location.href = (import.meta.env.VITE_PORTAL_URL ?? 'https://portalimobiliario-whitelabel.vercel.app') + '/login'
  return
}
```

**No Portal** (config Supabase client):
Configurar `auth.cookieOptions.domain = '.achamosimoveis.com.br'` no `createBrowserClient` — isso é o que de fato compartilha a sessão entre raiz e subdomínio.

### 7. Adicionar card Google direto no Achamos (a feature que motivou tudo)

Depois que a estrutura acima estiver rodando:

- Achamos chama `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: 'https://app.achamosimoveis.com.br' } })`
- Google login → callback no Supabase → cookie criado com `domain=.achamosimoveis.com.br`
- Usuário redirecionado pra `app.achamosimoveis.com.br` **já autenticado**

## Riscos / Cuidados

- **DNS propaga em até 24h** — não fazer em horário crítico
- **Não desligar os `.vercel.app`** durante a transição (rollback gratuito)
- **Variáveis de ambiente** precisam estar nos 2 projetos Vercel ANTES do código novo entrar em prod
- **Testar em staging primeiro** — Supabase tem 2 projetos (staging e prod), aplicar nessa ordem

## Tempo estimado

- DNS + Vercel + Supabase + Google OAuth: ~1h
- Código (PRs nos 2 repos): ~30min
- Testes ponta-a-ponta: ~30min
- **Total: ~2h** em uma sessão dedicada

## Histórico

- 2026-06-01: discutido, decidido postergar, plano registrado
- (próxima sessão): retomar conforme passos acima
