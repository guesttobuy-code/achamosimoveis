import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../i18n'

/**
 * Seletor de idioma — botões inline (PT · EN · ES) na topbar.
 *
 * Comportamento:
 * - Lê idioma ativo via useTranslation()
 * - Ao clicar, troca via i18n.changeLanguage() (persiste em localStorage)
 * - Atualiza <html lang="..."> automaticamente
 */
type Props = {
  /** Override da classe no container — usa "lang-switcher" por padrão.
   *  Passe "lang-switcher-drawer" pra renderizar dentro do menu mobile. */
  className?: string
}

export default function LanguageSwitcher({ className = 'lang-switcher' }: Props) {
  const { i18n, t } = useTranslation('common')
  const current = (i18n.resolvedLanguage || i18n.language || 'pt').slice(0, 2) as SupportedLanguage

  function change(lang: SupportedLanguage) {
    if (lang === current) return
    i18n.changeLanguage(lang)
    document.documentElement.setAttribute('lang', lang)
  }

  return (
    <div
      className={className}
      role="group"
      aria-label={t('language.label')}
    >
      {SUPPORTED_LANGUAGES.map(lang => (
        <button
          key={lang}
          type="button"
          className={'lang-btn' + (current === lang ? ' active' : '')}
          onClick={() => change(lang)}
          aria-pressed={current === lang}
          aria-label={t(`language.${lang}_long`)}
        >
          {t(`language.${lang}`)}
        </button>
      ))}
    </div>
  )
}
