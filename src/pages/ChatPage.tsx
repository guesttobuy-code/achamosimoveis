import ChatForm from '../chatbot/ChatForm'
import Logo from '../components/Logo'
import type { NavigateFn } from '../types'

type ChatPageProps = {
  role: 'buyer' | 'seller'
  navigate: NavigateFn
}

export default function ChatPage({ role, navigate }: ChatPageProps) {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <Logo onClick={() => navigate('home')} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="eyebrow" style={{ marginRight: 8 }}>
              {role === 'seller' ? 'Anunciar imóvel' : 'Briefing do comprador'}
            </span>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('home')}>
              ← Sair
            </button>
          </div>
        </div>
      </header>
      <ChatForm role={role} navigate={navigate} />
    </>
  )
}
