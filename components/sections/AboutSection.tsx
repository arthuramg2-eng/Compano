'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Eyebrow from '@/components/ui/Eyebrow'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function AboutSection() {
  const t = useTranslations('about')
  const containerRef = useRef<HTMLDivElement>(null)
  const imageColRef  = useRef<HTMLDivElement>(null)
  const textColRef   = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (imageColRef.current) {
        gsap.fromTo(
          imageColRef.current,
          { opacity: 0, x: -56, scale: 0.97 },
          {
            opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
          }
        )
      }
      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.18,
            scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
          }
        )
      }
    },
    { scope: containerRef }
  )

  const p1       = t('p1')
  const p1Strong = t('p1_strong')
  const p2       = t('p2')
  const p2Strong = t('p2_strong')

  const renderWithStrong = (text: string, strong: string) => {
    const parts = text.split('[[strong]]')
    return (
      <>
        {parts[0]}
        <strong className="text-white/90 font-semibold">{strong}</strong>
        {parts[1]}
      </>
    )
  }

  return (
    <section ref={containerRef} className="relative bg-brand-dark py-28 px-5 lg:px-10 overflow-hidden">
      {/* Ambient orange glow — top right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(204,86,0,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-16 lg:gap-24 items-center relative z-10">

        {/* Image column */}
        <div ref={imageColRef} className="relative opacity-0">
          <div className="relative aspect-[4/5] overflow-hidden">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-14 h-14 z-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-orange" />
              <div className="absolute top-0 left-0 h-full w-[2px] bg-orange" />
            </div>
            <div className="absolute bottom-0 right-0 w-14 h-14 z-10 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-full h-[2px] bg-orange/35" />
              <div className="absolute bottom-0 right-0 h-full w-[2px] bg-orange/35" />
            </div>

            <Image
              src="https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/DSC_7741.jpg"
              alt="Compano — vélo électrique québécois"
              fill
              className="object-cover opacity-75"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Bottom fade */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 55%)' }}
            />
          </div>

          {/* Year badge */}
          <div
            className="absolute -bottom-5 -right-5 w-[98px] h-[98px] bg-orange flex flex-col items-center justify-center z-10"
            style={{ boxShadow: '0 20px 44px rgba(204,86,0,0.32)' }}
          >
            <span className="font-condensed font-black text-[34px] text-white leading-none">2019</span>
            <span className="font-condensed font-bold text-[9px] tracking-[0.2em] uppercase text-white/65">
              {t('founded')}
            </span>
          </div>
        </div>

        {/* Text column */}
        <div ref={textColRef} className="opacity-0">
          <Eyebrow light>{t('eyebrow')}</Eyebrow>
          <h2
            className="font-condensed font-black uppercase text-white mb-7 whitespace-pre-line"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: '0.91' }}
          >
            {t('title')}
          </h2>
          <p className="text-[15px] text-white/42 leading-[1.76] mb-5">
            {renderWithStrong(p1, p1Strong)}
          </p>
          <p className="text-[15px] text-white/42 leading-[1.76] mb-10">
            {renderWithStrong(p2, p2Strong)}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 border-t border-white/[0.07] pt-8">
            {[
              { num: t('stat1_num'), label: t('stat1_label') },
              { num: t('stat2_num'), label: t('stat2_label') },
              { num: t('stat3_num'), label: t('stat3_label') },
            ].map((stat, i) => (
              <div key={i} className={i > 0 ? 'border-l border-white/[0.07] pl-5' : ''}>
                <div
                  className="font-condensed font-black text-[40px] text-orange leading-none mb-1"
                  style={{ textShadow: '0 0 28px rgba(204,86,0,0.28)' }}
                >
                  {stat.num}
                </div>
                <div className="font-condensed font-bold text-[10px] tracking-[0.22em] uppercase text-white/22">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
