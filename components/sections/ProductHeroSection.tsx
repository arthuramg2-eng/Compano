'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { Model } from '@/lib/models'

interface Props {
  model: Model
  locale: string
}

export default function ProductHeroSection({ model, locale }: Props) {
  const t = useTranslations('pages.product')
  const prefix = locale === 'en' ? '/en' : ''

  const colors = locale === 'fr' ? model.specs.colors_fr : model.specs.colors_en
  const allImages = model.images.length > 0 ? model.images : [model.image]
  const [activeImg, setActiveImg] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const prev = () => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length)
  const next = () => setActiveImg((i) => (i + 1) % allImages.length)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev()
    touchStartX.current = null
  }

  const electricalSpecs = [
    { label: t('motor_label'),           value: model.specs.motor },
    { label: t('torque_label'),          value: model.specs.torque },
    { label: t('battery_label'),         value: model.specs.battery },
    { label: t('range_assist_label'),    value: model.specs.range_assist },
    { label: t('range_throttle_label'),  value: model.specs.range_throttle },
    { label: t('sensors_label'),         value: model.specs.sensors },
  ]

  return (
    <>
    {/* ── Banner hero ── */}
    <div className="relative w-full overflow-hidden flex items-center justify-center bg-brand-black" style={{ height: '55vh' }}>
      {/* Background image */}
      <Image
        src="/hero-bg-fz3.jpg"
        alt=""
        fill
        className="object-cover"
        style={{ opacity: 0.62, objectPosition: 'center 70%' }}
        priority
        draggable={false}
      />
      {/* Filtre sombre */}
      <div className="absolute inset-0 bg-brand-black/40" />

      {/* Nom du modèle + Compano centrés */}
      <div className="relative z-10 flex flex-col items-center select-none">
        <p
          className="font-condensed leading-none uppercase text-white text-center"
          style={{ fontSize: 'clamp(100px, 18vw, 260px)', letterSpacing: '-0.02em' }}
        >
          {model.name}
        </p>
        <Image
          src="/logo_orange.png"
          alt="Compano"
          width={1800}
          height={400}
          className="object-contain"
          style={{ width: 'clamp(160px, 22vw, 340px)', userSelect: 'none' }}
          draggable={false}
          priority
        />
      </div>
    </div>

    <section className="bg-white pt-16 pb-12">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-12">

        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href={`${prefix}/modeles`}
            className="font-sans text-[11px] tracking-[0.22em] uppercase text-brand-black/40 hover:text-orange transition-colors"
          >
            ← {locale === 'fr' ? 'Modèles' : 'Models'}
          </Link>
        </div>

        {/* min-w-0 sur les deux colonnes = clé anti-overflow */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-14 items-start">

          {/* ── LEFT: carousel ── */}
          <div className="min-w-0">

            {/* Image + boutons (wrapper sans overflow:hidden pour que les boutons ne soient pas clippés) */}
            <div
              className="group/carousel relative w-full aspect-[4/3]"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Image container avec overflow:hidden uniquement pour le crop */}
              <div className="absolute inset-0 overflow-hidden">
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      i === activeImg ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${model.name} — ${i + 1}`}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 1024px) 100vw, calc(100vw - 500px)"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Prev / Next — overlay flex pour positionnement fiable */}
              {allImages.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-3 z-10 pointer-events-none lg:opacity-0 lg:group-hover/carousel:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={prev}
                    aria-label={t('carousel_prev')}
                    className="carousel-btn carousel-btn-prev pointer-events-auto"
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 2L4 7l5 5" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    aria-label={t('carousel_next')}
                    className="carousel-btn carousel-btn-next pointer-events-auto"
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 2l5 5-5 5" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Navigation: dots (≤ 6 images) ou compteur (> 6) */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-4 mt-4">
                {allImages.length <= 6 ? (
                  <div className="flex items-center gap-2.5">
                    {allImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        aria-label={`Image ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                          i === activeImg
                            ? 'w-5 h-1.5 bg-orange'
                            : 'w-1.5 h-1.5 bg-brand-black/25 hover:bg-brand-black/50'
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-brand-black/40 tabular-nums">
                    {activeImg + 1} / {allImages.length}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ── RIGHT: info panel ── */}
          <div className="min-w-0 lg:sticky lg:top-28 flex flex-col">

            {/* Titre */}
            <div data-fade>
              <h1 className="font-condensed text-[clamp(56px,6vw,96px)] leading-[0.88] uppercase text-brand-black tracking-[-0.01em]">
                {model.name}
              </h1>
            </div>

            {/* Prix */}
            <div data-fade className="mt-2">
              <span className="font-sans font-light text-2xl text-brand-black/55 tracking-tight">
                {locale === 'fr' ? model.price_fr : model.price_en}
              </span>
            </div>

            {/* Badge VAA */}
            <div data-fade className="mt-4">
              <span className="inline-flex items-center border border-orange/55 px-3 py-1.5 font-sans text-[10px] tracking-[0.22em] uppercase text-orange">
                {t('vaa_badge')}
              </span>
            </div>

            <div data-fade className="mt-5 mb-5 h-px bg-brand-black/10" />

            {/* Spec pills */}
            <div data-fade className="flex flex-wrap gap-2">
              {(locale === 'fr' ? model.pills_fr : model.pills_en).map((pill) => (
                <span
                  key={pill}
                  className="font-sans text-[11px] tracking-[0.18em] uppercase bg-brand-black text-white px-3 py-1.5 opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div data-fade className="mt-5 mb-5 h-px bg-brand-black/10" />

            {/* Taille + Couleurs côte à côte */}
            <div data-fade className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-brand-black/45 mb-1">
                  {t('size_label')}
                </p>
                <p className="font-sans text-sm text-brand-black">
                  {locale === 'fr' ? model.size_fr : model.size_en}
                </p>
              </div>

              {colors.length > 0 && (
                <div>
                  <p className="font-sans text-[11px] tracking-[0.18em] uppercase text-brand-black/45 mb-1">
                    {t('colors_label')}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {colors.map((c) => (
                      <span key={c} className="font-sans text-sm text-brand-black">
                        — {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div data-fade className="mt-6">
              <Link
                href={`${prefix || '/'}#detaillants`}
                className="inline-flex items-center justify-center w-full h-11 bg-orange text-white font-sans text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-brand-black transition-colors duration-300"
              >
                {t('find_dealer')}
              </Link>
            </div>

            {/* Specs électriques — valeurs tronquées si besoin */}
            <div data-fade className="mt-6 border-t border-brand-black/10 pt-5">
              <div className="flex flex-col divide-y divide-brand-black/8">
                {electricalSpecs.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start py-2 gap-3 min-w-0">
                    <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-brand-black/45 flex-shrink-0 pt-px">
                      {label}
                    </span>
                    <span className="font-sans text-sm text-brand-black text-right min-w-0 break-words">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}
