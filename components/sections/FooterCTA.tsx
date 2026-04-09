'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface FooterCTAProps {
  locale: string
}

export default function FooterCTA({ locale }: FooterCTAProps) {
  const t = useTranslations('footerCta')
  const containerRef = useRef<HTMLElement>(null)
  const titleRef     = useRef<HTMLDivElement>(null)
  const subtitleRef  = useRef<HTMLParagraphElement>(null)
  const btnRef       = useRef<HTMLDivElement>(null)

  const prefix = locale === 'en' ? '/en' : '/fr'

  useGSAP(
    () => {
      // Title: clip-path reveal from bottom (same as StatementSection)
      const lines = titleRef.current?.querySelectorAll('.cta-title-line') ?? []
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { clipPath: 'inset(0 0 100% 0)', y: 24 },
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            duration: 1,
            ease: 'expo.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Subtitle + button fade up with stagger
      gsap.fromTo(
        [subtitleRef.current, btnRef.current],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
          delay: 0.5,
        }
      )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="bg-brand-black py-32 px-6 lg:px-12 overflow-hidden text-center"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">

        {/* Title — clip-path lines */}
        <div ref={titleRef} className="mb-6">
          {t('title').split('\n').map((line, i) => (
            <div
              key={i}
              className="cta-title-line"
              style={{ clipPath: 'inset(0 0 100% 0)' }}
            >
              <h2
                className="font-condensed uppercase text-white"
                style={{ fontSize: 'clamp(52px, 8vw, 120px)', lineHeight: '0.9' }}
              >
                {line}
              </h2>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-sans font-light text-white/30 text-[15px] leading-[1.75] max-w-[380px] mb-10"
          style={{ opacity: 0 }}
        >
          {t('subtitle')}
        </p>

        {/* CTA button — filled orange, inverts on hover */}
        <div ref={btnRef} style={{ opacity: 0 }}>
          <Link
            href={`${prefix}/modeles`}
            className="btn-cta-invert inline-flex items-center px-10 h-14 text-white font-sans text-[12px] tracking-[0.28em] uppercase font-medium hover:text-orange transition-colors duration-300"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
