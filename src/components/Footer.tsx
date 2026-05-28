import { useTranslation } from 'react-i18next'
import type { NavigateFn } from '../types'

type FooterProps = {
  navigate: NavigateFn
}

export default function Footer({ navigate }: FooterProps) {
  const { t } = useTranslation('common')

  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-hero">
          <h2 className="foot-big">
            {t('footer.tagline_main')}<br />
            {t('footer.tagline_em')}
            <span style={{ color: 'var(--brand)' }}>.</span>
          </h2>
          <div className="brand-logo brand-logo-dark foot-logo-mark" aria-hidden="true" />
        </div>
        <div className="foot-grid">
          <div>
            <h4>{t('footer.about_title')}</h4>
            <div style={{ fontSize: 14.5, opacity: 0.85, maxWidth: 280 }}>
              {t('footer.about_text')}
            </div>
            <div style={{ marginTop: 22, fontFamily: 'var(--f-mono)', fontSize: 11.5, opacity: 0.5, letterSpacing: '0.08em' }}>
              {t('footer.creci')}
            </div>
          </div>
          <div>
            <h4>{t('footer.col_to_buy')}</h4>
            <ul>
              <li onClick={() => navigate('comprador')}>{t('footer.col_to_buy_how')}</li>
              <li onClick={() => navigate('comecar')}>{t('footer.col_to_buy_start')}</li>
              <li onClick={() => navigate('sobre')}>{t('footer.col_to_buy_who')}</li>
            </ul>
          </div>
          <div>
            <h4>{t('footer.col_to_sell')}</h4>
            <ul>
              <li onClick={() => navigate('vendedor')}>{t('footer.col_to_sell_how')}</li>
              <li onClick={() => navigate('vender')}>{t('footer.col_to_sell_start')}</li>
              <li onClick={() => navigate('contato')}>{t('footer.col_to_sell_talk')}</li>
            </ul>
          </div>
          <div>
            <h4>{t('footer.col_contact')}</h4>
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
                <span style={{ opacity: 0.6 }}>{t('footer.where')}</span>
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
            <div className="foot-legal-title">{t('footer.address_label')}</div>
            <div className="foot-legal-line">{t('footer.address_line1')}</div>
            <div className="foot-legal-line">{t('footer.address_line2')}</div>
          </div>
        </div>

        <div className="foot-bottom">
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.operated_by')}</span>
        </div>
      </div>
    </footer>
  )
}
