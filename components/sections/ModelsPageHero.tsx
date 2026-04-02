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
    <section ref={containerRef} className="bg-white pt-[120px] pb-16 px-5 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <p
          className="hero-eyebrow font-sans text-[11px] tracking-[0.32em] uppercase text-orange font-medium mb-4"
          style={{ opacity: 0 }}
        >
          {eyebrow}
        </p>
        <div className="overflow-hidden">
          <h1
            className="hero-title font-condensed uppercase text-brand-black whitespace-pre-line mb-5"
            style={{ fontSize: 'clamp(52px, 7vw, 100px)', lineHeight: '0.92', opacity: 0 }}
          >
            {title}
          </h1>
        </div>
        <p
          className="hero-subtitle font-sans font-light text-brand-black/50 text-[15px] leading-[1.75] max-w-[520px]"
          style={{ opacity: 0 }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  )
}
