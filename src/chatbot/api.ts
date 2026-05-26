/**
 * Cliente do endpoint público achamos-public no rendizy-server.
 *
 * Roadmap §11.12 E3 — chatbot deslogado salva contato + briefing/listing
 * no funil Radar do CRM Rendizy imediatamente, sem precisar de auth.
 *
 * #203 (2026-05-25): detecção automática de ambiente por hostname.
 *
 * Resolução de Supabase (ordem de prioridade):
 *   1. VITE_ACHAMOS_API_URL/VITE_SUPABASE_ANON_KEY (env Vercel se setadas)
 *   2. Detecção por hostname:
 *      - localhost / *.local → STAGING
 *      - URL contém 'staging' / 'preview' / 'feature-' → STAGING
 *      - URL contém 'achamosimoveis.com.br' / 'achamosimoveis.vercel.app' → PROD
 *      - default (build sem env, hostname desconhecido) → PROD (mais seguro pra release)
 *
 * Pra forçar staging num deploy específico, setar VITE_ACHAMOS_API_URL no Vercel.
 */

const STAGING_API_URL = 'https://rzbfrmvyxcxxtpdraudz.supabase.co/functions/v1/rendizy-server'
const STAGING_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YmZybXZ5eGN4eHRwZHJhdWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMDE2MDksImV4cCI6MjA5MDU3NzYwOX0.dumPp3S26uaG7Pv2Gs-UQhEq1UB6rkMuW1O_zJewFds'

const PROD_API_URL = 'https://odcgnzfremrqnvtitpcc.supabase.co/functions/v1/rendizy-server'
// anon key pública do projeto prod (publishable — anon role apenas)
const PROD_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kY2duemZyZW1ycW52dGl0cGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTI4NzksImV4cCI6MjA5MDIxMjg3OX0.KDhStyE_1JdyojnFK5vYSNCkVET-E87HCAhANDYn_eU'

function detectIsStaging(): boolean {
  if (typeof window === 'undefined') return false // SSR → assume prod
  const host = window.location.hostname.toLowerCase()
  if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) return true
  if (host.includes('staging') || host.includes('preview') || host.includes('feature-')) return true
  return false
}

function getApiUrl(): string {
  const envUrl = import.meta.env.VITE_ACHAMOS_API_URL as string | undefined
  if (envUrl) return envUrl
  return detectIsStaging() ? STAGING_API_URL : PROD_API_URL
}

function getAnonKey(): string {
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  if (envKey) return envKey
  return detectIsStaging() ? STAGING_ANON_KEY : PROD_ANON_KEY
}

export type ChatbotRole = 'buyer' | 'seller'

export interface ContactUpsertResult {
  contact_id: string
  pre_auth_token: string
  is_new: boolean
}

export interface ProgressResult {
  briefing_id?: string
  listing_id?: string
  finalized: boolean
  portal_case_id: string | null
}

interface ApiSuccessResponse<T> {
  success: true
  data: T
}

interface ApiErrorResponse {
  success: false
  error: string
  code?: string
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

async function callAchamosApi<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const url = `${getApiUrl()}/achamos-public${path}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: getAnonKey(),
      Authorization: `Bearer ${getAnonKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  let json: ApiResponse<T>
  try {
    json = (await res.json()) as ApiResponse<T>
  } catch {
    throw new Error(`achamos-public ${path}: resposta não-JSON (status ${res.status})`)
  }

  if (!json.success) {
    throw new Error(`achamos-public ${path}: ${json.error}`)
  }
  return json.data
}

// ─── Sessão pre-auth (sobrevive reload) ─────────────────────────────────
const SESSION_KEY = 'achamos.pre_auth'

interface PreAuthSession {
  contact_id: string
  pre_auth_token: string
  phone_normalized: string
  role: ChatbotRole
  created_at: string
}

export function readPreAuthSession(): PreAuthSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PreAuthSession
  } catch {
    return null
  }
}

export function writePreAuthSession(s: PreAuthSession): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(s))
  } catch {
    /* sessionStorage indisponível (modo privado) — proceed sem cache */
  }
}

export function clearPreAuthSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

// ─── Endpoints ──────────────────────────────────────────────────────────

export async function upsertContact(input: {
  full_name: string
  phone: string
  email?: string
  role: ChatbotRole
}): Promise<ContactUpsertResult> {
  return callAchamosApi<ContactUpsertResult>('/contact-upsert', input)
}

export async function sendBriefingProgress(input: {
  pre_auth_token: string
  partial_answers: Record<string, unknown>
  finalize?: boolean
}): Promise<ProgressResult> {
  return callAchamosApi<ProgressResult>('/briefing-progress', input)
}

export async function sendListingProgress(input: {
  pre_auth_token: string
  partial_answers: Record<string, unknown>
  finalize?: boolean
}): Promise<ProgressResult> {
  return callAchamosApi<ProgressResult>('/listing-progress', input)
}
