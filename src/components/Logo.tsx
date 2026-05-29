import { useTranslation } from 'react-i18next'
import { brandName } from '../i18n'

type LogoProps = {
  onClick?: () => void
  variant?: 'auto' | 'light' | 'dark'
}

/**
 * Logo do site — brand-aware.
 *
 * A imagem de fundo (background-image) é trocada via CSS através do atributo
 * `[data-brand]` no <html>, que App.tsx mantém sincronizado com o idioma ativo.
 *
 * - pt → Achamos Imóveis (achamos-imoveis-logo.svg)
 * - en/es/outros → We Found Properties (we-found-properties.png)
 *
 * Este componente apenas renderiza o container e o alt-text correto.
 */
export default function Logo({ onClick, variant = 'auto' }: LogoProps) {
  const { i18n, t } = useTranslation('common')
  const cls = 'brand-logo' + (variant === 'light' ? ' brand-logo-light' : variant === 'dark' ? ' brand-logo-dark' : '')
  const ariaLabel = `${brandName(i18n.language)} — ${t('nav.aria_home')}`

  return (
    <div className="nav-logo" onClick={onClick} role="button" aria-label={ariaLabel}>
      <div className={cls} />
    </div>
  )
}
