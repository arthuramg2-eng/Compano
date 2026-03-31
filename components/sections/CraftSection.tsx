'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function CraftSection() {
  const t = useTranslations('craft')
  const containerRef = useRef<HTMLElement>(null)
  const imgRef       = useRef<HTMLDivElement>(null)
  const textRef      = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Parallax: image moves -10% to +10% as section scrolls through viewport
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { y: '-10%' },
          {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: '70vh' }}
    >
      {/* Oversized image for parallax (110% height) */}
      <div
        ref={imgRef}
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: '-10%', height: '120%' }}
      >
        <Image
          src="https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/DSC_7741.jpg"
          alt="Compano — fabrication"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Dark gradient overlay from bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.2) 45%, transparent 80%)',
          zIndex: 1,
        }}
      />

      {/* Text overlay — fixed in section while image moves */}
      <div
        ref={textRef}
        className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-12 lg:pb-16"
        style={{ zIndex: 2 }}
      >
        <div className="max-w-[1400px] mx-auto">
          <span className="font-sans text-[11px] tracking-[0.32em] uppercase font-medium text-orange block mb-3">
            {t('eyebrow')}
          </span>
          <h2
            className="font-condensed uppercase text-white"
            style={{ fontSize: 'clamp(44px, 6vw, 90px)', lineHeight: '0.92' }}
          >
            {t('title')}
          </h2>
        </div>
      </div>
    </section>
  )
}
