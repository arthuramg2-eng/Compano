'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function FeaturesSection() {
  const t            = useTranslations('features')
  const containerRef = useRef<HTMLElement>(null)
  const imageRef     = useRef<HTMLDivElement>(null)
  const itemsRef     = useRef<HTMLDivElement>(null)

  const features = [
    { num: '01', title: t('item1_title'), desc: t('item1_desc') },
    { num: '02', title: t('item2_title'), desc: t('item2_desc') },
    { num: '03', title: t('item3_title'), desc: t('item3_desc') },
    { num: '04', title: t('item4_title'), desc: t('item4_desc') },
  ]

  useGSAP(
    () => {
      // Image slides from left on section enter
      gsap.fromTo(imageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Feature items cascade from right
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.feature-item')
        gsap.fromTo(items,
          { x: 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'expo.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // ── Scroll-active: activate features sequentially ──────────────────────
      if (itemsRef.current) {
        const featureEls = Array.from(itemsRef.current.querySelectorAll('.feature-item'))
        const imageEl    = imageRef.current

        const activateFeature = (index: number) => {
          featureEls.forEach((el, i) => {
            const numEl   = el.querySelector('.feature-num-bg')
            const titleEl = el.querySelector('.feature-title')
            const isActive = i === index

            gsap.to(el,     { opacity: isActive ? 1 : 0.35, duration: 0.35, overwrite: 'auto' })
            if (numEl)   gsap.to(numEl,   { color: isActive ? '#FF4D00' : '#EBEBEB', duration: 0.35, overwrite: 'auto' })
            if (titleEl) gsap.to(titleEl, { color: isActive ? '#0A0A0A' : 'rgba(10,10,10,0.45)', duration: 0.35, overwrite: 'auto' })
          })

          // Image micro-zoom + slight vertical drift toward active feature
          if (imageEl) {
            gsap.to(imageEl, {
              scale: 1 + index * 0.007,
              y: index * -12,
              duration: 0.65,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }
        }

        featureEls.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 55%',
            end:   'bottom 45%',
            onEnter:      () => activateFeature(i),
            onEnterBack:  () => activateFeature(i),
          })
        })
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="bg-white pt-10 pb-16 lg:pt-12 lg:pb-28 px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

        {/* Left — sticky image */}
        <div
          ref={imageRef}
          className="relative overflow-hidden lg:sticky lg:top-24"
          style={{ opacity: 0, aspectRatio: '4/3' }}
        >
          <Image
            src="https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/Compano-fz3-A.jpg"
            alt="Compano — détail cadre"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ transformOrigin: 'center center', transition: 'transform 0.65s cubic-bezier(0.16,1,0.3,1)' }}
          />
        </div>

        {/* Right — features list */}
        <div>
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase font-medium text-orange block mb-3">
            {t('eyebrow')}
          </span>
          <h2
            className="font-condensed uppercase text-brand-black mb-10"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: '0.92' }}
          >
            {t('title')}
          </h2>

          <div ref={itemsRef} className="flex flex-col gap-0">
            {features.map((feat) => (
              <div
                key={feat.num}
                className="feature-item group relative cursor-default"
                style={{ opacity: 0, minHeight: 'clamp(90px, 13vh, 140px)', paddingTop: '3vh', paddingBottom: '3vh' }}
              >
                {/* Top separator */}
                <div className="feature-line absolute top-0 left-0 right-0 h-px bg-brand-black/10 transition-colors duration-300 group-hover:bg-orange/30" />

                {/* Big background number */}
                <span
                  className="feature-num-bg absolute right-0 top-1/2 -translate-y-1/2 font-condensed leading-none select-none pointer-events-none"
                  style={{ fontSize: 'clamp(72px, 8vw, 120px)', color: '#EBEBEB', transition: 'color 0.35s ease', lineHeight: 1 }}
                >
                  {feat.num}
                </span>

                {/* Text content */}
                <div className="relative z-10 flex gap-4 items-start">
                  {/* Small number label */}
                  <span
                    className="font-condensed text-[14px] mt-1 flex-shrink-0"
                    style={{ color: 'rgba(10,10,10,0.2)', minWidth: 28 }}
                  >
                    {feat.num}
                  </span>

                  <div>
                    <h3
                      className="feature-title font-condensed uppercase text-brand-black text-[22px] leading-none mb-2"
                      style={{ transition: 'color 0.35s ease' }}
                    >
                      {feat.title}
                    </h3>
                    <p className="font-sans font-light text-[13px] text-brand-black/40 leading-[1.65]">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
