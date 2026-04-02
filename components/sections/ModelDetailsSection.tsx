'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { MODELS } from '@/lib/models'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ModelDetailsSectionProps {
  locale: string
}

interface ModelRowProps {
  name: string
  slug: string
  image: string
  bodyStrong: string
  bodyNormal: string
  ctaLabel: string
  href: string
  reverse: boolean
  anchorId: string
  index: number
}

function ModelRow({
  name,
  image,
  bodyStrong,
  bodyNormal,
  ctaLabel,
  href,
  reverse,
  anchorId,
  index,
}: ModelRowProps) {
  const rowRef   = useRef<HTMLDivElement>(null)
  const imgRef   = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLSpanElement>(null)
  const nameRef  = useRef<HTMLHeadingElement>(null)
  const body1Ref = useRef<HTMLParagraphElement>(null)
  const body2Ref = useRef<HTMLParagraphElement>(null)
  const ctaRef   = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      // Subtle parallax on the image itself
      const imgEl = imgRef.current?.querySelector('img')
      if (imgEl) {
        gsap.to(imgEl, {
          y: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        })
      }

      // Ghost index number
      gsap.fromTo(
        ghostRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Staggered text timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rowRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo(
        nameRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out' }
      )

      if (body1Ref.current) {
        tl.fromTo(
          body1Ref.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'expo.out' },
          '-=0.6'
        )
      }

      if (body2Ref.current) {
        tl.fromTo(
          body2Ref.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'expo.out' },
          '-=0.55'
        )
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'expo.out' },
          '-=0.4'
        )
      }
    },
    { scope: rowRef }
  )

  const num = String(index + 1).padStart(2, '0')

  const textCol = (
    <div
      className="relative flex flex-col justify-center py-8 lg:py-0 overflow-hidden"
      id={anchorId}
    >
      {/* Ghost index number */}
      <span
        ref={ghostRef}
        aria-hidden="true"
        className="absolute bottom-0 right-0 font-condensed leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(100px, 14vw, 190px)',
          color: 'rgba(0,0,0,0.045)',
          opacity: 0,
          lineHeight: 0.85,
        }}
      >
        {num}
      </span>

      <div className="relative z-10">
        <h2
          ref={nameRef}
          className="font-condensed uppercase mb-5 text-orange"
          style={{
            fontSize: 'clamp(40px, 5vw, 72px)',
            lineHeight: '0.92',
            opacity: 0,
          }}
        >
          {name}
        </h2>
        <p
          ref={body1Ref}
          className="font-sans text-[14px] leading-[1.75] text-brand-black mb-3 font-medium max-w-[480px]"
          style={{ opacity: 0 }}
        >
          {bodyStrong}
        </p>
        {bodyNormal && (
          <p
            ref={body2Ref}
            className="font-sans text-[13px] leading-[1.75] text-brand-black/50 font-light max-w-[480px] mb-7"
            style={{ opacity: 0 }}
          >
            {bodyNormal}
          </p>
        )}
        <Link
          ref={ctaRef}
          href={href}
          className="inline-flex items-center self-start px-7 h-11 bg-orange text-white font-sans text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-brand-black transition-colors duration-300"
          style={{ opacity: 0 }}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  )

  const imgCol = (
    <div
      ref={imgRef}
      className="relative overflow-hidden"
      style={{ aspectRatio: '4/3' }}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-contain p-6 hover:scale-[1.04] transition-transform duration-700 ease-out"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )

  return (
    <div ref={rowRef} className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
      {reverse ? (
        <>
          {textCol}
          {imgCol}
        </>
      ) : (
        <>
          {imgCol}
          {textCol}
        </>
      )}
    </div>
  )
}

function DividerLine() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.divider-line',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: wrapRef }
  )

  return (
    <div ref={wrapRef} className="my-4">
      <div className="divider-line border-0 border-t-2 border-brand-black/8" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}

export default function ModelDetailsSection({ locale }: ModelDetailsSectionProps) {
  const t      = useTranslations('modelDetails')
  const prefix = locale === 'en' ? '/en' : ''

  const rows = [
    {
      model: MODELS.find((m) => m.slug === 'fz3-plus')!,
      bodyStrong: t('fz3_strong'),
      bodyNormal: t('fz3_normal'),
      reverse: false,
      anchorId: 'fz3',
    },
    {
      model: MODELS.find((m) => m.slug === 'fz2-plus')!,
      bodyStrong: t('fz2_strong'),
      bodyNormal: t('fz2_normal'),
      reverse: true,
      anchorId: 'fz2',
    },
    {
      model: MODELS.find((m) => m.slug === 'se2')!,
      bodyStrong: t('se2_strong'),
      bodyNormal: '',
      reverse: false,
      anchorId: 'se2',
    },
    {
      model: MODELS.find((m) => m.slug === 'rx1-plus')!,
      bodyStrong: t('rx1_strong'),
      bodyNormal: t('rx1_normal'),
      reverse: true,
      anchorId: 'rx1',
    },
  ]

  return (
    <section className="bg-white px-5 lg:px-12 pb-28">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-0">
        {rows.map((row, i) => (
          <div key={row.model.slug}>
            <ModelRow
              name={row.model.name}
              slug={row.model.slug}
              image={row.model.image}
              bodyStrong={row.bodyStrong}
              bodyNormal={row.bodyNormal}
              ctaLabel={t('cta')}
              href={`${prefix}/modeles/${row.model.slug}`}
              reverse={row.reverse}
              anchorId={row.anchorId}
              index={i}
            />
            {i < rows.length - 1 && <DividerLine />}
          </div>
        ))}
      </div>
    </section>
  )
}
