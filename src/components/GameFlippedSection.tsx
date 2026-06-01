import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import { ArrowRight } from './icons'
import type { NavigateFn } from '../types'

/**
 * GameFlippedSection — substitui a antiga .hv-section (vídeo horizontal
 * "O jogo virou" no YouTube/HTML iframe).
 *
 * Em vez de vídeo de 67s que pouca gente assiste, mostra storytelling
 * visual ANTES vs DEPOIS em 2 colunas:
 *   - ANTES (escura, com dor): 3 cards de "frustração no portal"
 *   - DEPOIS (clara, brand): 3 mensagens de chat tipo "vendedor real respondendo"
 *   - Stat embaixo de cada coluna (60 dias vs 7 dias)
 *
 * Divisor central com seta dramática e texto "O jogo virou".
 */
export default function GameFlippedSection({ navigate }: { navigate: NavigateFn }) {
  const { t } = useTranslation('home')

  return (
    <section className="game-flipped">
      <div className="container">
        <Reveal>
          <div className="game-flipped-head">
            <span className="eyebrow">{t('game_flipped.eyebrow')}</span>
            <h2 className="display game-flipped-title">
              {t('game_flipped.headline_l1')}
              <br />
              {t('game_flipped.headline_l2')}{' '}
              <em style={{ color: 'var(--brand)', fontStyle: 'normal' }}>
                {t('game_flipped.headline_em')}
              </em>
              {t('game_flipped.headline_dot')}
            </h2>
            <p className="lead game-flipped-lead">{t('game_flipped.lead')}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="game-flipped-stage">
            {/* ─── ANTES ─── */}
            <div className="gf-col gf-col-before">
              <div className="gf-col-label">{t('game_flipped.before_label')}</div>
              <div className="gf-cards">
                {[1, 2, 3].map(n => (
                  <div className="gf-card-pain" key={n}>
                    <span className="gf-x" aria-hidden="true">×</span>
                    <div>
                      <div className="gf-card-title">{t(`game_flipped.before_c${n}_title`)}</div>
                      <div className="gf-card-body">{t(`game_flipped.before_c${n}_body`)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="gf-stat gf-stat-bad">
                <div className="gf-stat-num">{t('game_flipped.before_stat_num')}</div>
                <div className="gf-stat-label">{t('game_flipped.before_stat_label')}</div>
              </div>
            </div>

            {/* ─── DIVIDER ─── */}
            <div className="gf-divider" aria-hidden="true">
              <div className="gf-divider-arrow">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </div>
              <div className="gf-divider-text">{t('game_flipped.divider_text')}</div>
            </div>

            {/* ─── DEPOIS ─── */}
            <div className="gf-col gf-col-after">
              <div className="gf-col-label">{t('game_flipped.after_label')}</div>
              <div className="gf-cards">
                {[1, 2, 3].map(n => (
                  <div className="gf-card-chat" key={n}>
                    <div className="gf-chat-avatar" aria-hidden="true">V</div>
                    <div className="gf-chat-bubble">
                      <div className="gf-chat-who">{t(`game_flipped.after_c${n}_who`)}</div>
                      <div className="gf-chat-msg">{t(`game_flipped.after_c${n}_msg`)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="gf-stat gf-stat-good">
                <div className="gf-stat-num">{t('game_flipped.after_stat_num')}</div>
                <div className="gf-stat-label">{t('game_flipped.after_stat_label')}</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="game-flipped-cta">
            <button className="btn btn-brand btn-lg" onClick={() => navigate('comprar')}>
              {t('game_flipped.cta')} <ArrowRight />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
