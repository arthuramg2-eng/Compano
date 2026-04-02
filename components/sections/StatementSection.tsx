'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function StatementSection() {
  const t = useTranslations('statement')
  const containerRef  = useRef<HTMLElement>(null)
  const line1Ref      = useRef<HTMLDivElement>(null)
  const line2Ref      = useRef<HTMLDivElement>(null)
  const line3Ref      = useRef<HTMLDivElement>(null)
  const accentLineRef = useRef<HTMLDivElement>(null)
  const descRef       = useRef<HTMLParagraphElement>(null)
  const imgRef        = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current]

      lines.forEach((line, i) => {
        if (!line) return
        gsap.fromTo(
          line,
          { clipPath: 'inset(0 0 100% 0)', y: 30 },
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            duration: 1,
            ease: 'expo.out',
            delay: i * 0.2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      gsap.fromTo(
        accentLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'expo.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
          delay: 0.7,
        }
      )

      gsap.fromTo(
        descRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
          delay: 0.9,
        }
      )

      // Image: fade in
      gsap.fromTo(
        imgRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Subtle parallax
      const imgEl = imgRef.current?.querySelector('img')
      if (imgEl) {
        gsap.fromTo(
          imgEl,
          { scale: 1.06, y: -20 },
          {
            scale: 1,
            y: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
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
      className="relative bg-white overflow-hidden"
      style={{ minHeight: '480px' }}
    >
      {/* Image — right strip, no empty space */}
      <div
        ref={imgRef}
        className="absolute right-0 top-0 bottom-0 pointer-events-none overflow-hidden"
        style={{ width: '52%', opacity: 0 }}
      >
        <Image
          src="https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/DSC_7741.jpg"
          alt="Compano — fabrication"
          fill
          className="object-cover object-[38%_100%]"
          sizes="52vw"
        />
        {/* Left blend */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white 0%, transparent 30%)' }}
        />
      </div>

      {/* Text */}
      <div className="relative z-10 px-6 lg:px-12 py-28 max-w-[1400px] mx-auto flex flex-col justify-center h-full" style={{ minHeight: '480px' }}>
        <div className="mb-10">
          <div ref={line1Ref} style={{ clipPath: 'inset(0 0 100% 0)' }}>
            <h2
              className="font-condensed uppercase text-brand-black"
              style={{ fontSize: 'clamp(52px, 7vw, 108px)', lineHeight: '0.92' }}
            >
              {t('line1')}
            </h2>
          </div>
          <div ref={line2Ref} style={{ clipPath: 'inset(0 0 100% 0)' }}>
            <h2
              className="font-condensed uppercase text-brand-black"
              style={{ fontSize: 'clamp(52px, 7vw, 108px)', lineHeight: '0.92' }}
            >
              {t('line2')}
            </h2>
          </div>
          <div ref={line3Ref} style={{ clipPath: 'inset(0 0 100% 0)' }}>
            <h2
              className="font-condensed uppercase text-orange"
              style={{ fontSize: 'clamp(52px, 7vw, 108px)', lineHeight: '0.92' }}
            >
              {t('line3')}
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-5 max-w-[480px]">
          <div
            ref={accentLineRef}
            className="h-[2px] bg-orange"
            style={{ width: 96, transformOrigin: 'left center', transform: 'scaleX(0)' }}
          />
          <p
            ref={descRef}
            className="font-sans font-light text-brand-black/55 text-[15px] leading-[1.8]"
            style={{ opacity: 0 }}
          >
            {t('desc')}
          </p>
        </div>
      </div>
    </section>
  )
}
