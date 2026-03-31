'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { MODELS } from '@/lib/models'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ModelsSectionProps {
  locale: string
}

export default function ModelsSection({ locale }: ModelsSectionProps) {
  const t = useTranslations('models')
  const MODEL_TAGS   = [t('tag1'), t('tag2'), t('tag3'), t('tag4')]
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef    = useRef<HTMLDivElement>(null)
  const cardsRef     = useRef<HTMLDivElement>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const prefix = locale === 'en' ? '/en' : ''

  // Directional origins per card index
  const fromProps = [
    { x: -80, y: 0,  opacity: 0 },
    { x: 0,   y: 80, opacity: 0 },
    { x: 80,  y: 0,  opacity: 0 },
    { x: 0,   y: 80, opacity: 0 },
  ]

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )

      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.querySelectorAll('.model-card'))
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            fromProps[i],
            {
              x: 0, y: 0, opacity: 1,
              duration: 0.85, ease: 'expo.out',
              delay: i * 0.12,
              scrollTrigger: { trigger: cardsRef.current, start: 'top 72%', toggleActions: 'play none none none' },
            }
          )
        })
      }
    },
    { scope: containerRef }
  )

  const cardWrapperStyle = (index: number): React.CSSProperties => ({
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity:    hoveredIdx !== null && hoveredIdx !== index ? 0.5 : 1,
    transform:  hoveredIdx !== null && hoveredIdx !== index ? 'scale(0.98)' : 'scale(1)',
  })

  return (
    <section
      id="modeles"
      ref={containerRef}
      className="bg-white py-28 px-5 lg:px-12"
    >
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4"
          style={{ opacity: 0 }}
        >
          <div>
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase font-medium text-orange block mb-3">
              {t('eyebrow')}
            </span>
            <h2
              className="font-condensed uppercase text-brand-black"
              style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: '0.92' }}
            >
              {t('title')}
            </h2>
          </div>
          <Link
            href={`${prefix}/modeles`}
            className="font-sans text-[11px] tracking-[0.24em] uppercase font-medium text-brand-black/30 hover:text-orange transition-colors flex-shrink-0 flex items-center gap-2"
          >
            {t('compare_cta')} →
          </Link>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-black/5">
          {MODELS.map((model, index) => {
            const desc  = locale === 'fr' ? model.desc_fr    : model.desc_en
            const pills = locale === 'fr' ? model.pills_fr   : model.pills_en
            const href  = locale === 'en' ? `/en/modeles/${model.slug}` : `/modeles/${model.slug}`
            const tag   = MODEL_TAGS[index]

            return (
              <div
                key={model.slug}
                style={cardWrapperStyle(index)}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Link
                  href={href}
                  className="model-card group relative block bg-white hover:bg-[#FAFAFA] transition-colors duration-300 overflow-hidden"
                  style={{ opacity: 0 }}
                >
                  {/* Image container — white background, no gray */}
                  <div className="relative overflow-hidden bg-white" style={{ aspectRatio: '4/3' }}>
                    {/* Tag */}
                    <span className="absolute top-4 left-4 z-10 bg-orange text-white font-sans text-[10px] tracking-[0.24em] uppercase font-medium px-3 py-1">
                      {tag}
                    </span>

                    <div className="model-card-img w-full h-full">
                      <Image
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-contain p-6"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        style={{ transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                      />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 border-t border-brand-black/5">
                    <h3
                      className="font-condensed uppercase text-brand-black mb-2"
                      style={{ fontSize: 36, lineHeight: 1 }}
                    >
                      {model.name}
                    </h3>
                    <p className="font-sans text-[13px] text-brand-black/40 leading-[1.6] mb-4 font-light">
                      {desc}
                    </p>

                    {/* Spec badge — slides up on hover */}
                    <div className="spec-badge font-condensed text-[13px] tracking-[0.16em] text-brand-black/50 mb-4">
                      {pills.slice(0, 2).join(' · ')}
                    </div>

                    <span className="font-sans text-[11px] tracking-[0.2em] uppercase font-medium text-orange/60 group-hover:text-orange transition-colors duration-200 flex items-center gap-2">
                      {t('view_cta')}
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
