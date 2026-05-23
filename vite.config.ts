/**
 * @env-aware
 * Site institucional Achamos Imóveis — frontend estático SEM backend.
 * Não detecta ambiente em runtime porque não tem Supabase.
 * Branch única `main` deploya em produção (achamosimoveis.vercel.app).
 * Branches feature/* geram preview automático no Vercel.
 *
 * Contrato canônico: Pasta oficial Rendizy/governance/ENVIRONMENT_CONTRACT.md (§5.2)
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
