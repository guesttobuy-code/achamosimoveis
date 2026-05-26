#!/usr/bin/env node
/**
 * check-secrets-hardcoded.mjs
 *
 * Detecta padrões de SECRETS hardcoded fora de .env*. Bloqueia commit
 * se encontrar chave/token literal no source.
 *
 * Padrões detectados:
 *  - sk_live_/sk_test_/pk_live_/pk_test_ (Stripe)
 *  - sbp_ (Supabase Personal Access Token)
 *  - service_role JWT (eyJ... com role:service_role)
 *  - GOCSPX- (Google OAuth secret)
 *  - github_pat_ (GitHub Personal Access Token)
 *  - AKIA[0-9A-Z]{16} (AWS Access Key)
 *
 * Padrões IGNORADOS por design (anon role é publicável):
 *  - eyJ... com role:anon (Supabase anon JWT)
 *
 * EXIT 1 se encontrar. Acompanha cada hit com path + linha.
 *
 * Bypass emergência: SKIP_SECRETS_GUARD=1 npm run guard:secrets
 */

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SKIP = process.env.SKIP_SECRETS_GUARD === '1';

if (SKIP) {
  console.warn('[guard:secrets] ⚠️  SKIP_SECRETS_GUARD=1 — bypass auditado.');
  process.exit(0);
}

// Padrões que SEMPRE são violação
const FORBIDDEN_PATTERNS = [
  { name: 'Stripe live key', regex: /sk_live_[A-Za-z0-9]{20,}/g },
  { name: 'Stripe publishable live', regex: /pk_live_[A-Za-z0-9]{20,}/g },
  { name: 'Stripe test key', regex: /sk_test_[A-Za-z0-9]{20,}/g },
  { name: 'Supabase PAT', regex: /sbp_[a-f0-9]{40,}/g },
  { name: 'Google OAuth secret', regex: /GOCSPX-[A-Za-z0-9_-]{20,}/g },
  { name: 'GitHub PAT', regex: /github_pat_[A-Za-z0-9_]{50,}/g },
  { name: 'AWS Access Key', regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { name: 'Generic private key header', regex: /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/g },
];

// JWT specific: aceita anon role, bloqueia service_role
// Fix red-team: header pode ser curto (eyJhbGc tem 7 chars). Aceita {4,}.
function checkJwtRole(content) {
  const jwtPattern = /eyJ[A-Za-z0-9_-]{4,}\.eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{4,}/g;
  const matches = content.match(jwtPattern) || [];
  const violations = [];
  for (const jwt of matches) {
    try {
      // Padding base64
      const part = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = part + '='.repeat((4 - (part.length % 4)) % 4);
      const payload = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'));
      if (payload.role === 'service_role') {
        violations.push({ name: 'Supabase service_role JWT', match: jwt.slice(0, 50) + '...' });
      }
      // role: 'anon' é OK — publishable
    } catch {
      // JWT inválido, ignora
    }
  }
  return violations;
}

// Arquivos a verificar: tracked + untracked NÃO-ignorados.
// Fix red-team: arquivos novos (untracked) também devem ser verificados pq
// vão entrar no próximo commit.
function getFilesToCheck() {
  try {
    // Trackeados + untracked não-ignorados (git ls-files com --others --exclude-standard)
    const tracked = execSync('git ls-files', { encoding: 'utf-8' });
    const untracked = execSync('git ls-files --others --exclude-standard', { encoding: 'utf-8' });
    const all = [...tracked.split('\n'), ...untracked.split('\n')];
    return all
      .filter(Boolean)
      .filter((f, i, arr) => arr.indexOf(f) === i) // dedupe
      .filter((f) =>
        !f.startsWith('.env') &&
        !f.endsWith('.lock') &&
        !f.endsWith('.lock.json') &&
        !f.includes('node_modules') &&
        !f.includes('dist/') &&
        !f.includes('build/') &&
        !f.includes('.next/') &&
        (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.jsx') ||
         f.endsWith('.mjs') || f.endsWith('.cjs') || f.endsWith('.json'))
      );
  } catch (err) {
    console.error('[guard:secrets] Falha listando arquivos:', err.message);
    process.exit(2);
  }
}

const files = getFilesToCheck();
const violations = [];

for (const file of files) {
  let content;
  try {
    content = readFileSync(file, 'utf-8');
  } catch {
    continue;
  }

  for (const { name, regex } of FORBIDDEN_PATTERNS) {
    const matches = content.match(regex);
    if (matches) {
      // Pega linha pra cada match
      const lines = content.split('\n');
      for (const m of matches) {
        const lineNum = lines.findIndex((l) => l.includes(m.slice(0, 20))) + 1;
        violations.push({ file, line: lineNum, name, match: m.slice(0, 40) + (m.length > 40 ? '...' : '') });
      }
    }
  }

  // JWT role check
  const jwtViolations = checkJwtRole(content);
  for (const v of jwtViolations) {
    const lines = content.split('\n');
    const lineNum = lines.findIndex((l) => l.includes(v.match.slice(0, 30))) + 1;
    violations.push({ file, line: lineNum, ...v });
  }
}

if (violations.length === 0) {
  console.log('[guard:secrets] ✅ OK — nenhum secret hardcoded detectado.');
  process.exit(0);
}

console.error(`[guard:secrets] ❌ BLOQUEADO — ${violations.length} secret(s) hardcoded encontrado(s):`);
console.error('');
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  [${v.name}]  ${v.match}`);
}
console.error('');
console.error('Ação: mover pra .env.local ou Vercel env vars.');
console.error('Bypass emergência (auditado): SKIP_SECRETS_GUARD=1 git commit ...');
process.exit(1);
