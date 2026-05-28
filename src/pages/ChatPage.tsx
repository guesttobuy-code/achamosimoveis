import { useTranslation } from 'react-i18next'
import ChatForm from '../chatbot/ChatForm'
import Logo from '../components/Logo'
import type { NavigateFn } from '../types'

type ChatPageProps = {
  role: 'buyer' | 'seller'
  navigate: NavigateFn
}

export default function ChatPage({ role, navigate }: ChatPageProps) {
  const { t } = useTranslation('chat')
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <Logo onClick={() => navigate('home')} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="eyebrow" style={{ marginRight: 8 }}>
              {role === 'seller' ? t('page.header_seller') : t('page.header_buyer')}
            </span>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('home')}>
              {t('page.exit')}
            </button>
          </div>
        </div>
      </header>
      <ChatForm role={role} navigate={navigate} />
    </>
  )
}
