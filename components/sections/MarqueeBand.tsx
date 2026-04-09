'use client'

import { useTranslations } from 'next-intl'

export default function MarqueeBand() {
  const t = useTranslations()
  const items = t.raw('band') as string[]
  const doubled = [...items, ...items]

  return (
    <div className="marquee-band relative bg-orange h-[56px] overflow-hidden flex items-center">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center font-sans font-medium text-[11px] tracking-[0.45em] uppercase text-white px-8"
          >
            {item}
            <span className="ml-8 text-white/40 text-[8px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
