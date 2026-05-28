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
              A imobiliária que inverte o jogo: vendedores oferecendo as melhores oportunidades pra você comprador.
            </div>
            <div style={{ marginTop: 22, fontFamily: 'var(--f-mono)', fontSize: 11.5, opacity: 0.5, letterSpacing: '0.08em' }}>
              CRECI-RJ • IMOBILIÁRIA DIGITAL
            </div>
          </div>
          <div>
            <h4>Para comprar</h4>
            <ul>
              <li onClick={() => navigate('comprador')}>Como funciona</li>
              <li onClick={() => navigate('comecar')}>Iniciar busca</li>
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
            <h4>Contato</h4>
            <ul>
              <li>
                <a href="mailto:oi@achamosimoveis.com.br" style={{ color: 'inherit', textDecoration: 'none' }}>
                  oi@achamosimoveis.com.br
                </a>
              </li>
              <li>
                <a href="https://wa.me/5521995885999" target="_blank" rel="noopener" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +55 21 9 9588-5999 · WhatsApp
                </a>
              </li>
              <li style={{ paddingTop: 4 }}>
                <span style={{ opacity: 0.6 }}>Rio de Janeiro · todo o estado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-legal">
          <div className="foot-legal-block">
            <div className="foot-legal-title">Bora Vender Muito BVM Aceleradora de Vendas LTDA</div>
            <div className="foot-legal-line">CNPJ 46.908.483/0001-28</div>
          </div>
          <div className="foot-legal-block">
            <div className="foot-legal-title">Endereço</div>
            <div className="foot-legal-line">Av. Treze de Maio, 47 · Apt 1609 · Centro</div>
            <div className="foot-legal-line">Rio de Janeiro — RJ · CEP 20031-007</div>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 Achamos Imóveis — Todos os direitos reservados</span>
          <span>Operado por Bora Vender Muito BVM Aceleradora de Vendas LTDA</span>
        </div>
      </div>
    </footer>
  )
}
