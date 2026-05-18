import { useEffect, useRef, useState } from 'react'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  as?: ElementType
  className?: string
} & HTMLAttributes<HTMLElement>

export default function Reveal({ children, delay = 0, as: As = 'div', className = '', ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay)
          io.disconnect()
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  // @ts-expect-error — dynamic element ref typing
  return <As ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} {...rest}>{children}</As>
}
