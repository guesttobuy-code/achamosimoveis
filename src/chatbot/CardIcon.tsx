import type { SVGProps } from 'react'

type Props = { name: string } & SVGProps<SVGSVGElement>

export default function CardIcon({ name, ...rest }: Props) {
  const c = {
    width: 18, height: 18, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    ...rest,
  }
  switch (name) {
    case 'apt':       return <svg {...c}><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2"/></svg>
    case 'casa':      return <svg {...c}><path d="M3 12l9-8 9 8M5 10v11h14V10"/></svg>
    case 'cobertura': return <svg {...c}><path d="M3 21V8l9-5 9 5v13M9 21V12h6v9M3 8h18"/></svg>
    case 'terreno':   return <svg {...c}><path d="M3 20l4-6 5 4 4-7 5 9M3 20h18"/></svg>
    case 'comercial': return <svg {...c}><path d="M3 21V7h18v14M3 11h18M8 7V3h8v4"/></svg>
    case 'pin':       return <svg {...c}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
    case 'clock':     return <svg {...c}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
    case 'wallet':    return <svg {...c}><path d="M3 7h16a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM3 7l3-3h10l3 3M16 13h2"/></svg>
    case 'check':     return <svg {...c}><path d="M5 12l5 5L20 7"/></svg>
    case 'lock':      return <svg {...c}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
    case 'open':      return <svg {...c}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0"/></svg>
    default:          return null
  }
}
