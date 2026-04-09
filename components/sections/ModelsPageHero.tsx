'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
interface Props {
  eyebrow: string
  title: string
  subtitle: string
}

export default function ModelsPageHero({ eyebrow, title, subtitle }: Props) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.fromTo(
        '.hero-eyebrow',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }
      )
        .fromTo(
          '.hero-title',
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-subtitle',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'expo.out' },
          '-=0.65'
        )
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="bg-white pt-[110px] pb-0 px-5 lg:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* Eyebrow + title */}
        <p
          className="hero-eyebrow font-sans text-[11px] tracking-[0.32em] uppercase text-orange font-medium mb-3"
          style={{ opacity: 0 }}
        >
          {eyebrow}
        </p>
        <h1
          className="hero-title font-condensed uppercase text-brand-black whitespace-pre-line"
          style={{ fontSize: 'clamp(52px, 6.5vw, 92px)', lineHeight: '0.92', opacity: 0 }}
        >
          {title}
        </h1>

        {/* Subtitle — séparateur + texte en bas */}
        <div className="hero-subtitle mt-6 pt-5 border-t border-brand-black/10 pb-10" style={{ opacity: 0 }}>
          <p className="font-sans font-light text-brand-black/45 text-[13px] tracking-[0.04em] leading-[1.7] max-w-[480px]">
            {subtitle}
          </p>
        </div>

      </div>
    </section>
  )
}
