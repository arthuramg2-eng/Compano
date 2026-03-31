'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Model } from '@/lib/models'

interface ModelCardProps {
  model: Model
  locale: string
  viewLabel: string
}

export default function ModelCard({ model, locale, viewLabel }: ModelCardProps) {
  const pills = locale === 'fr' ? model.pills_fr : model.pills_en
  const desc  = locale === 'fr' ? model.desc_fr  : model.desc_en
  const href  = locale === 'en'
    ? `/en/modeles/${model.slug}`
    : `/modeles/${model.slug}`

  return (
    <Link
      href={href}
      className="group block relative overflow-hidden bg-[#0D0D0D] hover:bg-[#121212] transition-colors duration-400 orange-glow-hover h-full"
    >
      {/* Top gradient line — reveals on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, #CC5600, transparent)' }}
      />

      {/* Subtle radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% -5%, rgba(204,86,0,0.07) 0%, transparent 65%)' }}
      />

      {/* Image area */}
      <div className="relative aspect-square bg-white/[0.018] p-6 overflow-hidden border-b border-white/[0.05]">
        <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.08] group-hover:-translate-y-2">
          <Image
            src={model.image}
            alt={model.name}
            fill
            className="object-contain"
            style={{ filter: 'drop-shadow(0 14px 36px rgba(0,0,0,0.55))' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-condensed font-black text-[31px] uppercase text-white leading-none mb-3 tracking-[-0.01em]">
          {model.name}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {pills.map((pill, i) => (
            <span
              key={pill}
              className={`font-condensed font-bold text-[10px] tracking-[0.2em] uppercase px-2.5 py-[3px] ${
                i === pills.length - 1
                  ? 'bg-orange/10 text-orange border border-orange/25'
                  : 'bg-white/[0.04] text-white/38 border border-white/[0.07]'
              }`}
            >
              {pill}
            </span>
          ))}
        </div>

        <p className="text-[13px] text-white/32 leading-[1.55] mb-5">{desc}</p>

        <span className="inline-flex items-center gap-2.5 font-condensed font-bold text-[11px] text-orange/55 tracking-[0.18em] uppercase group-hover:text-orange group-hover:gap-4 transition-all duration-300">
          {viewLabel}
          <span>→</span>
        </span>
      </div>
    </Link>
  )
}
