import { Fragment } from 'react'

type MarqueeProps = { items: string[] }

export default function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <Fragment key={i}>
            <span>{t}</span>
            <span className="marquee-dot" />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
