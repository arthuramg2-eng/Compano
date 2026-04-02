'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface Props {
  locale: string
}

export default function AboutStorySection({ locale }: Props) {
  const t      = useTranslations('pages.about')
  const prefix = locale === 'en' ? '/en' : ''

  const sectionRef   = useRef<HTMLElement>(null)
  const imgRef       = useRef<HTMLDivElement>(null)
  const originsRef   = useRef<HTMLDivElement>(null)
  const motorRef     = useRef<HTMLDivElement>(null)
  const statsRef     = useRef<HTMLDivElement>(null)
  const milesRef     = useRef<HTMLDivElement>(null)
  const timelineRef  = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // ── Image: clip-path wipe left→right ──────────────────────────────
      gsap.fromTo(
        imgRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Subtle parallax on image inner
      const imgEl = imgRef.current?.querySelector('img')
      if (imgEl) {
        gsap.to(imgEl, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        })
      }

      // ── Origins block ─────────────────────────────────────────────────
      gsap.fromTo(
        originsRef.current!.querySelectorAll('h2, p'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: originsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ── Motor block ───────────────────────────────────────────────────
      const motorEls = motorRef.current?.querySelectorAll('h2, p')
      if (motorEls) gsap.fromTo(
        motorEls,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: motorRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ── Stats ─────────────────────────────────────────────────────────
      gsap.fromTo(
        statsRef.current?.querySelectorAll('.stat-item'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ── Timeline line draw ────────────────────────────────────────────
      gsap.fromTo(
        timelineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.6,
          ease: 'expo.inOut',
          scrollTrigger: {
            trigger: milesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Milestone cards stagger
      gsap.fromTo(
        milesRef.current?.querySelectorAll('.milestone-item'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: milesRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: sectionRef }
  )

  type Milestone = { year: string; text: string }
  const milestones = (t.raw('milestones') as Milestone[])

  return (
    <section ref={sectionRef} className="bg-white px-5 lg:px-12 pb-28">
      <div className="max-w-[1400px] mx-auto">

        {/* ── Story grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-12 lg:gap-20 mb-28">

          {/* Text column */}
          <div className="flex flex-col justify-between">

            {/* Origins */}
            <div ref={originsRef} className="mb-10">
              <h2
                className="font-condensed uppercase text-brand-black mb-4"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: '1', opacity: 0 }}
              >
                {t('origins_title')}
              </h2>
              <p
                className="font-sans text-[14px] leading-[1.8] text-brand-black/65 max-w-[540px]"
                style={{ opacity: 0 }}
              >
                {t('origins_text')}
              </p>
            </div>

            {/* Motor */}
            <div ref={motorRef} className="mb-10">
              <h2
                className="font-condensed uppercase text-brand-black mb-4"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: '1', opacity: 0 }}
              >
                {t('motor_title')}
              </h2>
              <p
                className="font-sans text-[14px] leading-[1.8] text-brand-black/65 max-w-[540px] mb-4"
                style={{ opacity: 0 }}
              >
                {t('motor_text1')}
              </p>
              <p
                className="font-sans text-[14px] leading-[1.8] text-brand-black/65 max-w-[540px] mb-4"
                style={{ opacity: 0 }}
              >
                {t('motor_text2')}
              </p>
              <p
                className="font-sans text-[13px] leading-[1.75] text-orange font-medium max-w-[540px]"
                style={{ opacity: 0 }}
              >
                {t('motor_text3')}
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef}>
              <div className="grid grid-cols-3 border-t-2 border-brand-black/8 pt-8 mb-8">
                {[
                  { num: t('stat1_num'), label: t('stat1_label') },
                  { num: t('stat2_num'), label: t('stat2_label') },
                  { num: t('stat3_num'), label: t('stat3_label') },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`stat-item ${i > 0 ? 'border-l-2 border-brand-black/8 pl-6' : ''}`}
                    style={{ opacity: 0 }}
                  >
                    <p
                      className="font-condensed text-orange"
                      style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', lineHeight: 1 }}
                    >
                      {stat.num}
                    </p>
                    <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-brand-black/40 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={`${prefix}/modeles`}
                className="inline-flex items-center px-7 h-11 bg-orange text-white font-sans text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-brand-black transition-colors duration-300"
              >
                {t('cta_models')}
              </Link>
            </div>
          </div>

          {/* Image column */}
          <div
            ref={imgRef}
            className="relative overflow-hidden"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            <div className="relative w-full h-full" style={{ minHeight: '520px' }}>
              <Image
                src="https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/DSC_7741.jpg"
                alt="Compano"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>

        {/* ── Milestones ───────────────────────────────────────────────── */}
        <div>
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-orange font-medium mb-10">
            {t('timeline_title')}
          </p>

          {/* Line */}
          <div className="relative mb-8">
            <div className="h-px bg-brand-black/10 w-full" />
            <div
              ref={timelineRef}
              className="absolute inset-0 h-px bg-brand-black/30"
              style={{ scaleX: 0, transformOrigin: 'left center' }}
            />
          </div>

          {/* Milestone cards */}
          <div ref={milesRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map(({ year, text }) => (
              <div key={year} className="milestone-item" style={{ opacity: 0 }}>
                <p
                  className="font-condensed text-orange mb-2"
                  style={{ fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1 }}
                >
                  {year}
                </p>
                <p className="font-sans text-[13px] leading-[1.7] text-brand-black/60">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
