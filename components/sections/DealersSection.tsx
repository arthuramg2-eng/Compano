'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonGhost from '@/components/ui/ButtonGhost'
import Eyebrow from '@/components/ui/Eyebrow'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface DealersSectionProps {
  locale: string
}

export default function DealersSection({ locale }: DealersSectionProps) {
  const t = useTranslations('dealers')
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef     = useRef<HTMLDivElement>(null)
  const prefix = locale === 'en' ? '/en' : ''

  useGSAP(
    () => {
      if (innerRef.current) {
        gsap.fromTo(
          innerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
            scrollTrigger: { trigger: innerRef.current, start: 'top 88%' },
          }
        )
      }
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="relative bg-brand-black py-24 px-5 lg:px-10 overflow-hidden">
      {/* Gradient mesh orbs */}
      <div
        className="absolute left-[-80px] top-[-80px] w-[460px] h-[460px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(204,86,0,0.08) 0%, transparent 65%)' }}
      />
      <div
        className="absolute right-[-60px] bottom-[-60px] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(204,86,0,0.06) 0%, transparent 65%)' }}
      />

      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.055), transparent)' }}
      />
      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.035), transparent)' }}
      />

      <div
        ref={innerRef}
        className="opacity-0 max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 relative z-10"
      >
        {/* Left */}
        <div className="flex-1">
          <Eyebrow light>{t('eyebrow')}</Eyebrow>
          <h2
            className="font-condensed font-black uppercase text-white whitespace-pre-line mb-3"
            style={{ fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: '0.91' }}
          >
            {t('title')}
          </h2>
          <p className="text-[14px] text-white/32 max-w-md leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Right — CTAs */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
          <ButtonPrimary href={`${prefix}/detaillants`}>
            {t('cta_primary')}
          </ButtonPrimary>
          <ButtonGhost href={`${prefix}/enregistrement`}>
            {t('cta_secondary')}
          </ButtonGhost>
        </div>
      </div>
    </section>
  )
}
