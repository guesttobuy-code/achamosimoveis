/**
 * Cliente do endpoint público achamos-public no rendizy-server.
 *
 * Roadmap §11.12 E3 — chatbot deslogado salva contato + briefing/listing
 * no funil Radar do CRM Rendizy imediatamente, sem precisar de auth.
 *
 * Configurar via env:
 *   VITE_ACHAMOS_API_URL  ex: https://rzbfrmvyxcxxtpdraudz.supabase.co/functions/v1/rendizy-server
 *   VITE_SUPABASE_ANON_KEY  apikey publica do Supabase (anon role)
 *
 * Sem essas vars, fallback pro staging URL hardcoded — usado só em dev
 * local e nunca deve chegar em prod (build CI valida).
 */

const FALLBACK_API_URL = 'https://rzbfrmvyxcxxtpdraudz.supabase.co/functions/v1/rendizy-server'
const FALLBACK_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YmZybXZ5eGN4eHRwZHJhdWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMDE2MDksImV4cCI6MjA5MDU3NzYwOX0.dumPp3S26uaG7Pv2Gs-UQhEq1UB6rkMuW1O_zJewFds'

function getApiUrl(): string {
  return (import.meta.env.VITE_ACHAMOS_API_URL as string | undefined) || FALLBACK_API_URL
}

function getAnonKey(): string {
  return (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || FALLBACK_ANON_KEY
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
