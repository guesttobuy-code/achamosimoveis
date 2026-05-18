import type { NavigateFn } from '../types'

type FooterProps = {
  navigate: NavigateFn
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-hero">
          <h2 className="foot-big">
            Tem comprador<br />esperando<span style={{ color: 'var(--brand)' }}>.</span>
          </h2>
          <div className="brand-logo brand-logo-dark foot-logo-mark" aria-hidden="true" />
        </div>
        <div className="foot-grid">
          <div>
            <h4>Achamos Imóveis</h4>
            <div style={{ fontSize: 14.5, opacity: 0.85, maxWidth: 280 }}>
              A imobiliária que inverte o jogo: o vendedor te procura, com IA e campanhas dirigidas pra encontrar a oportunidade certa.
            </div>
            <div style={{ marginTop: 22, fontFamily: 'var(--f-mono)', fontSize: 11.5, opacity: 0.5, letterSpacing: '0.08em' }}>
              CRECI-SP • CRECI-RJ • CRECI-MG
            </div>
          </div>
          <div>
            <h4>Para comprar</h4>
            <ul>
              <li onClick={() => navigate('comprador')}>Como funciona</li>
              <li onClick={() => navigate('comecar')}>Iniciar agora</li>
              <li onClick={() => navigate('sobre')}>Quem somos</li>
            </ul>
          </div>
          <div>
            <h4>Para vender</h4>
            <ul>
              <li onClick={() => navigate('vendedor')}>Como funciona</li>
              <li onClick={() => navigate('vender')}>Anunciar imóvel</li>
              <li onClick={() => navigate('contato')}>Falar com a equipe</li>
            </ul>
          </div>
          <div>
            <h4>Onde estamos</h4>
            <ul>
              <li>São Paulo — SP</li>
              <li>Rio de Janeiro — RJ</li>
              <li>Belo Horizonte — MG</li>
              <li style={{ opacity: 0.5, fontSize: 12.5, paddingTop: 4 }}>+ todo o estado de SP, RJ e MG</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Achamos Imóveis — Todos os direitos reservados</span>
          <span>v1.0</span>
        </div>
      </div>
    </footer>
  )
}
