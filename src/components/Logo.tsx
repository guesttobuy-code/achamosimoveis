type LogoProps = {
  onClick?: () => void
  variant?: 'auto' | 'light' | 'dark'
}

export default function Logo({ onClick, variant = 'auto' }: LogoProps) {
  const cls = 'brand-logo' + (variant === 'light' ? ' brand-logo-light' : variant === 'dark' ? ' brand-logo-dark' : '')
  return (
    <div className="nav-logo" onClick={onClick} role="button" aria-label="Página inicial">
      <div className={cls} />
    </div>
  )
}
