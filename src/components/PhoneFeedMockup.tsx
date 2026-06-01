import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * PhoneFeedMockup — substitui o iframe vídeo Instagram antigo do phone
 * mockup do hero. Cicla 3 anúncios em loop (4s cada) com fade transition.
 *
 * Conecta visualmente com a seção .metodologia-home (mesmo formato de
 * card Instagram) — quem vê o phone bate o olho e já entende o modelo.
 */
const ADS_COUNT = 3

export default function PhoneFeedMockup() {
  const { t } = useTranslation('home')
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIdx(i => (i + 1) % ADS_COUNT)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="phone-feed" aria-label={t('phone_feed.handle')}>
      {/* Status bar fake (iPhone) */}
      <div className="phone-feed-status" aria-hidden="true">
        <span>9:41</span>
        <span className="phone-feed-status-right">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
            <rect x="0" y="6" width="2" height="4" rx="0.5" />
            <rect x="3" y="4" width="2" height="6" rx="0.5" />
            <rect x="6" y="2" width="2" height="8" rx="0.5" />
            <rect x="9" y="0" width="2" height="10" rx="0.5" />
          </svg>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M1 5 Q7 -1 13 5" />
            <path d="M3 7 Q7 3 11 7" />
            <circle cx="7" cy="9" r="0.8" fill="currentColor" />
          </svg>
          <span className="phone-feed-battery">
            <span />
          </span>
        </span>
      </div>

      {/* Header do post */}
      <div className="phone-feed-head">
        <div className="phone-feed-avatar" aria-hidden="true">A</div>
        <div className="phone-feed-id">
          <div className="phone-feed-handle">
            {t('phone_feed.handle')}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-label={t('phone_feed.verified_alt')}
            >
              <path d="M12 2l2.4 1.8 3-.3 1 2.8 2.7 1.5-.7 2.9 1.5 2.6L20 14.7l-.4 3-3 .7-1.7 2.5-2.9-.8L9.4 22l-2.2-2.1-3 .2-1-2.8-2.7-1.5.7-2.9L0 10.3l1.9-2.4.3-3 3-.4 1.8-2.5 2.9.8L12 2zm-1 13l6-6-1.4-1.4-4.6 4.6-2.2-2.2L7.4 11.4 11 15z" />
            </svg>
          </div>
          <div className="phone-feed-sub">
            {t('phone_feed.sponsor')} · {t(`phone_feed.ad${idx + 1}_loc`)}
          </div>
        </div>
        <span className="phone-feed-more" aria-hidden="true">⋯</span>
      </div>

      {/* Body (anúncio que cicla com fade) */}
      <div className="phone-feed-body">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className={'phone-feed-ad' + (idx === n - 1 ? ' is-active' : '')}
            dangerouslySetInnerHTML={{ __html: t(`phone_feed.ad${n}_body_html`) }}
          />
        ))}
      </div>

      {/* Footer (like / comment / share + CTA) */}
      <div className="phone-feed-foot">
        <div className="phone-feed-actions" aria-hidden="true">
          <span>♡</span>
          <span>💬</span>
          <span>↗</span>
        </div>
        <button className="phone-feed-cta" type="button">
          {t('phone_feed.cta')}
        </button>
      </div>

      {/* Dots de paginação */}
      <div className="phone-feed-dots" role="tablist" aria-label="Anúncios">
        {[0, 1, 2].map(n => (
          <button
            key={n}
            className={'phone-feed-dot' + (idx === n ? ' is-active' : '')}
            onClick={() => setIdx(n)}
            role="tab"
            aria-selected={idx === n}
            aria-label={`Anúncio ${n + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}
