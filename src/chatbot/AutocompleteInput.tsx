import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight } from '../components/icons'

/**
 * AutocompleteInput — input com lista filtrada de sugestões.
 * §11.13 M2 (2026-05-25): introduzido pro step `cidade` IBGE no chatbot
 * (cobertura nacional de ~5570 municípios).
 *
 * Lazy-load do JSON IBGE: importa só quando o componente monta (não pesa o
 * initial bundle). Em rede lenta, mostra placeholder "Carregando…".
 *
 * Fallback: se o texto digitado não bate com nenhum match e tem >=3 chars,
 * permite enviar como texto livre (clicando "Usar 'X' mesmo assim").
 */

type IbgeRow = { n: string; u: string }

function normalize(s: string): string {
  // NFD + strip combining diacriticals (U+0300–U+036F) — "São" → "sao"
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

type Props = {
  placeholder?: string
  onSelect: (value: string, displayLabel: string) => void
}

export default function AutocompleteInput({ placeholder, onSelect }: Props) {
  const [text, setText] = useState('')
  const [debounced, setDebounced] = useState('')
  const [cities, setCities] = useState<IbgeRow[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Lazy-load do JSON IBGE (~25KB gzipped)
  useEffect(() => {
    let cancelled = false
    import('./ibge-cities.json')
      .then((mod) => {
        if (cancelled) return
        const list = (mod.default ?? mod) as IbgeRow[]
        setCities(list)
      })
      .catch(() => {
        if (cancelled) return
        setLoadError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Debounce do filtro (250ms) — evita render pesado a cada keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebounced(text), 250)
    return () => clearTimeout(t)
  }, [text])

  // Foca o input quando o componente monta
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const suggestions = useMemo<IbgeRow[]>(() => {
    if (!cities || debounced.length < 2) return []
    const q = normalize(debounced)
    // Match: começa com query (prioridade) → contém query
    const startsWith: IbgeRow[] = []
    const contains: IbgeRow[] = []
    for (const row of cities) {
      const n = normalize(row.n)
      if (n.startsWith(q)) startsWith.push(row)
      else if (n.includes(q)) contains.push(row)
      if (startsWith.length >= 8) break
    }
    return [...startsWith, ...contains].slice(0, 8)
  }, [cities, debounced])

  const trimmed = text.trim()
  const hasExactMatch = suggestions.some(
    (s) => normalize(`${s.n}/${s.u}`) === normalize(trimmed) || normalize(s.n) === normalize(trimmed),
  )
  const canSubmitFreeText = trimmed.length >= 3 && !hasExactMatch && suggestions.length === 0

  function handleSelect(row: IbgeRow) {
    const value = `${row.n}/${row.u}`
    onSelect(value, `${row.n} / ${row.u}`)
  }

  function handleFreeText() {
    if (!canSubmitFreeText) return
    onSelect(trimmed, trimmed)
  }

  if (loadError) {
    // Fallback degradado: input livre se IBGE não carregar
    return (
      <div className="chat-input-row" key="autocomplete-fallback">
        <input
          ref={inputRef}
          className="chat-input"
          placeholder={placeholder || 'Digite a cidade'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && trimmed.length >= 3) onSelect(trimmed, trimmed)
          }}
        />
        <button
          className="chat-send"
          onClick={() => trimmed.length >= 3 && onSelect(trimmed, trimmed)}
          disabled={trimmed.length < 3}
          aria-label="Enviar"
        >
          <ArrowRight />
        </button>
      </div>
    )
  }

  return (
    <div className="autocomplete-wrap" key="autocomplete">
      {suggestions.length > 0 && (
        <div className="autocomplete-list">
          {suggestions.map((row) => (
            <button
              key={`${row.n}-${row.u}`}
              className="autocomplete-item"
              onClick={() => handleSelect(row)}
              type="button"
            >
              <span className="autocomplete-city">{row.n}</span>
              <span className="autocomplete-uf">{row.u}</span>
            </button>
          ))}
        </div>
      )}
      {canSubmitFreeText && (
        <div className="autocomplete-list">
          <button className="autocomplete-item autocomplete-item-free" onClick={handleFreeText} type="button">
            <span className="autocomplete-city">Usar "{trimmed}" mesmo assim</span>
            <span className="autocomplete-uf">→</span>
          </button>
        </div>
      )}
      <div className="chat-input-row">
        <input
          ref={inputRef}
          className="chat-input"
          placeholder={cities ? (placeholder || 'Digite a cidade') : 'Carregando lista…'}
          value={text}
          disabled={!cities}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (suggestions.length > 0) {
                handleSelect(suggestions[0])
              } else if (canSubmitFreeText) {
                handleFreeText()
              }
            }
          }}
        />
        <button
          className="chat-send"
          onClick={() => {
            if (suggestions.length > 0) handleSelect(suggestions[0])
            else if (canSubmitFreeText) handleFreeText()
          }}
          disabled={!cities || (suggestions.length === 0 && !canSubmitFreeText)}
          aria-label="Enviar"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}
