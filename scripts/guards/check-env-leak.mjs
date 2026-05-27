#!/usr/bin/env node
/**
 * check-env-leak.mjs
 *
 * Bloqueia commits que contém .env.local, .env.production etc não-ignorados.
 * Verifica também se .gitignore lista .env* explicitamente.
 *
 * Bypass: SKIP_ENV_LEAK_GUARD=1
 */

import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SKIP = process.env.SKIP_ENV_LEAK_GUARD === '1';
if (SKIP) {
  console.warn('[guard:env-leak] ⚠️  SKIP_ENV_LEAK_GUARD=1 — bypass auditado.');
  process.exit(0);
}

const violations = [];

// 1. .gitignore deve listar .env*
const gitignorePath = '.gitignore';
if (existsSync(gitignorePath)) {
  const content = readFileSync(gitignorePath, 'utf-8');
  const hasEnvIgnore = /^\s*\.env\*?\s*$/m.test(content) ||
                       /^\s*\.env\.local\s*$/m.test(content);
  if (!hasEnvIgnore) {
    violations.push({ kind: 'gitignore-missing-env', msg: '.gitignore não lista .env* — adicione `.env*` no .gitignore' });
  }
} else {
  violations.push({ kind: 'gitignore-missing', msg: '.gitignore não existe' });
}

// 2. Tracked files que parecem .env*
try {
  const tracked = execSync('git ls-files', { encoding: 'utf-8' }).split('\n').filter(Boolean);
  for (const f of tracked) {
    if (/(^|\/)\.env(\.|$)/.test(f) && !f.endsWith('.example') && !f.endsWith('.template') && !f.endsWith('.sample')) {
      violations.push({ kind: 'env-tracked', msg: `Arquivo .env trackeado: ${f}` });
    }
  }
} catch (err) {
  console.error('[guard:env-leak] Falha listando arquivos:', err.message);
  process.exit(2);
}

if (violations.length === 0) {
  console.log('[guard:env-leak] ✅ OK — .env* protegidos.');
  process.exit(0);
}

console.error(`[guard:env-leak] ❌ BLOQUEADO — ${violations.length} problema(s):`);
for (const v of violations) {
  console.error(`  [${v.kind}] ${v.msg}`);
}
console.error('');
console.error('Bypass emergência: SKIP_ENV_LEAK_GUARD=1 git commit ...');
process.exit(1);
