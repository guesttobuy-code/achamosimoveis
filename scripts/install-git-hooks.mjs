#!/usr/bin/env node
/**
 * install-git-hooks.mjs
 *
 * Instala pre-commit + pre-push hooks via core.hooksPath.
 * Adaptado de Rendizyoficial/scripts/maintenance/install-git-hooks.mjs.
 *
 * Skipa em CI/Vercel (não precisa instalar hooks lá).
 */

import { execSync } from 'node:child_process';
import { chmodSync, copyFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const isCiRuntime = process.env.CI === 'true' || Boolean(process.env.VERCEL);
let gitRoot = '';
let hasGitRepo = true;

try {
  gitRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf-8' }).trim();
} catch {
  hasGitRepo = false;
}

if (isCiRuntime || !hasGitRepo) {
  const reason = isCiRuntime ? 'CI/Vercel runtime' : 'sem git repo';
  console.log(`[hooks:install] skip (${reason}).`);
  process.exit(0);
}

const projectDir = process.cwd();
const sourceHooksDir = path.join(projectDir, '.githooks');
const targetHooksDir = path.join(gitRoot, '.githooks');

const sourcePreCommit = path.join(sourceHooksDir, 'pre-commit');
const sourcePrePush = path.join(sourceHooksDir, 'pre-push');

if (!existsSync(sourcePreCommit) || !existsSync(sourcePrePush)) {
  console.error('[hooks:install] .githooks/pre-commit ou pre-push não encontrados.');
  process.exit(1);
}

mkdirSync(targetHooksDir, { recursive: true });
copyFileSync(sourcePreCommit, path.join(targetHooksDir, 'pre-commit'));
copyFileSync(sourcePrePush, path.join(targetHooksDir, 'pre-push'));

try {
  execSync('git config core.hooksPath .githooks', { stdio: 'inherit' });
  chmodSync(path.join(targetHooksDir, 'pre-commit'), 0o755);
  chmodSync(path.join(targetHooksDir, 'pre-push'), 0o755);
  console.log('[hooks:install] ✅ Hooks instalados (pre-commit, pre-push).');
} catch (err) {
  console.error('[hooks:install] Falha:', err.message);
  process.exit(1);
}
