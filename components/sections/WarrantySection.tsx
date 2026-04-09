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
      // Header: fade + slide up
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0,
            duration: 0.85, ease: 'expo.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 90%' },
          }
        )
      }

      if (cardsRef.current) {
        const cards = Array.from(cardsRef.current.querySelectorAll('.warranty-card'))

        // Cards stagger: slide up + clip reveal
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0, clipPath: 'inset(8% 0 0 0)' },
            {
              y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)',
              duration: 0.85, ease: 'expo.out',
              delay: i * 0.1,
              scrollTrigger: { trigger: cardsRef.current, start: 'top 78%' },
            }
          )
        })

        // Image parallax inside each card on scroll
        cards.forEach((card) => {
          const img = card.querySelector('.warranty-img')
          if (!img) return
          gsap.fromTo(
            img,
            { y: -20 },
            {
              y: 20,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          )
        })
      }
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="bg-white pt-16 lg:pt-28 pb-12 px-5 lg:px-10">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-14 opacity-0">
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
              style={{ boxShadow: 'none' }}
            >
              {/* Image — taller, object-contain to dezoom */}
              <div className="relative h-[220px] overflow-hidden bg-white">
                <Image
                  src={WARRANTY_IMAGES[i]}
                  alt={item.title}
                  fill
                  className="warranty-img object-contain p-6 grayscale-[10%] group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  style={{ transformOrigin: 'center center' }}
                />
              </div>

              {/* Thin separator */}
              <div className="h-px bg-brand-black/6" />

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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
