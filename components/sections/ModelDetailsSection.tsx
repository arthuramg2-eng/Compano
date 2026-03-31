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
}: ModelRowProps) {
  const rowRef  = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imgRef  = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const textDir = reverse ? 60 : -60

      gsap.fromTo(
        textRef.current,
        { x: textDir, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        imgRef.current,
        { x: reverse ? -60 : 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: rowRef }
  )

  const textCol = (
    <div
      ref={textRef}
      className="flex flex-col justify-center py-8 lg:py-0"
      style={{ opacity: 0 }}
      id={anchorId}
    >
      <h2
        className="font-condensed uppercase mb-5"
        style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: '0.92', color: '#CC5600' }}
      >
        {name}
      </h2>
      <p className="font-sans text-[14px] leading-[1.75] text-brand-black mb-3 font-medium max-w-[480px]">
        {bodyStrong}
      </p>
      {bodyNormal && (
        <p className="font-sans text-[13px] leading-[1.75] text-brand-black/50 font-light max-w-[480px] mb-7">
          {bodyNormal}
        </p>
      )}
      <Link
        href={href}
        className="inline-flex items-center self-start px-7 h-11 bg-orange text-white font-sans text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-brand-black transition-colors duration-300"
      >
        {ctaLabel}
      </Link>
    </div>
  )

  const imgCol = (
    <div
      ref={imgRef}
      className="relative overflow-hidden"
      style={{ aspectRatio: '4/3', opacity: 0 }}
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
            />
            {i < rows.length - 1 && (
              <hr className="border-0 border-t-2 border-brand-black/8 my-4" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
