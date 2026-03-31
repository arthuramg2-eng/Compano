'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Eyebrow from '@/components/ui/Eyebrow'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const WARRANTY_IMAGES = [
  'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/garantie-macanique.jpg',
  'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/garantie-electrique.jpg',
  'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/garantie-cadre.jpg',
]

// top accent gradients: muted → orange mid → orange vibrant
const TOP_ACCENTS = [
  'linear-gradient(to right, #DEDAD4, #DEDAD4)',
  'linear-gradient(to right, #CC5600, #E06010)',
  'linear-gradient(to right, #CC5600, #FF7C28)',
]

export default function WarrantySection() {
  const t = useTranslations('warranty')
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef    = useRef<HTMLDivElement>(null)
  const cardsRef     = useRef<HTMLDivElement>(null)

  const items = t.raw('items') as Array<{
    num: string
    unit: string
    title: string
    desc: string
  }>

  useGSAP(
    () => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { opacity: 0, y: 22 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
        })
      }
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.warranty-card')
        gsap.fromTo(cards, { opacity: 0, y: 48 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
        })
      }
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="bg-brand-cream py-28 px-5 lg:px-10">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="opacity-0 mb-14">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h2
            className="font-condensed font-black uppercase text-brand-black whitespace-pre-line"
            style={{ fontSize: 'clamp(36px, 5vw, 68px)', lineHeight: '0.91' }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="warranty-card group relative bg-white overflow-hidden opacity-0"
              style={{ boxShadow: '0 2px 32px rgba(0,0,0,0.055)' }}
            >
              {/* Top accent bar */}
              <div className="h-[3px]" style={{ background: TOP_ACCENTS[i] }} />

              {/* Image */}
              <div className="relative h-[138px] overflow-hidden">
                <Image
                  src={WARRANTY_IMAGES[i]}
                  alt={item.title}
                  fill
                  className="object-cover grayscale-[15%] group-hover:scale-[1.05] transition-transform duration-600 ease-out"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.18))' }}
                />
              </div>

              {/* Content */}
              <div className="p-10 pb-12">
                <div className="font-condensed font-black text-[82px] text-brand-black leading-none tracking-[-0.02em]">
                  {item.num}
                </div>
                <div className="font-condensed font-bold text-[11px] tracking-[0.48em] uppercase text-brand-gray/55 mb-4 -mt-1">
                  {item.unit}
                </div>
                <h3 className="font-condensed font-bold text-[18px] uppercase text-brand-black mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13px] text-brand-gray leading-[1.66]">
                  {item.desc}
                </p>
              </div>

              {/* Border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange/18 transition-colors duration-400 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
