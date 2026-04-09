'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'
import type { Model } from '@/lib/models'
import { MODELS } from '@/lib/models'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface Props {
  model: Model
  locale: string
}

const SLUG_KEY: Record<string, string> = {
  'fz2-plus': 'fz2',
  'fz3-plus': 'fz3',
  'se2':      'se2',
  'rx1-plus': 'rx1',
}

export default function ProductDetailsSection({ model, locale }: Props) {
  const t        = useTranslations('pages.product')
  const descRef  = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const othersRef = useRef<HTMLDivElement>(null)
  const prefix   = locale === 'en' ? '/en' : '/fr'
  const [nameHovered, setNameHovered] = useState(false)
  const key      = SLUG_KEY[model.slug] ?? model.slug
  const desc1Key = `${key}_desc1` as Parameters<typeof t>[0]
  const desc2Key = `${key}_desc2` as Parameters<typeof t>[0]

  const otherModels = MODELS.filter((m) => m.slug !== model.slug).slice(0, 3)

  // Ajustement de zoom par modèle pour uniformiser la taille apparente du vélo
  const IMAGE_SCALE: Record<string, number> = {
    'fz2-plus': 0.88,
    'se2':      0.84,
    'rx1-plus': 0.92,
  }
  const mechSpecs = locale === 'fr' ? model.mechanical_fr : model.mechanical_en
  const elecSpecs = [
    { label: t('motor_label'),           value: model.specs.motor },
    { label: t('torque_label'),          value: model.specs.torque },
    { label: t('battery_label'),         value: model.specs.battery },
    { label: t('range_assist_label'),    value: model.specs.range_assist },
    { label: t('range_throttle_label'),  value: model.specs.range_throttle },
    { label: t('sensors_label'),         value: model.specs.sensors },
  ]

  const detailImage = model.images.length > 1
    ? model.images[model.images.length - 1]
    : model.image

  useGSAP(() => {
    // ── Description section: épuré ──
    const descEl = descRef.current
    if (descEl) {
      const descLine   = descEl.querySelector('[data-desc-line]')
      const descLabel  = descEl.querySelector('[data-desc-label]')
      const descTitle  = descEl.querySelector('[data-desc-title]')
      const descBodies = descEl.querySelectorAll('[data-desc-body]')
      const descPhoto  = descEl.querySelector('[data-desc-photo]')
      const descRange  = descEl.querySelector('[data-desc-range]')
      const st = { trigger: descEl, start: 'top 75%', toggleActions: 'play none none none' as const }

      const tl = gsap.timeline({ scrollTrigger: st })
      if (descLine)  tl.fromTo(descLine,  { scaleX: 0 },       { scaleX: 1, duration: 0.8, ease: 'power2.inOut', transformOrigin: 'left' })
      if (descLabel) tl.fromTo(descLabel, { opacity: 0 },      { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      if (descTitle) tl.fromTo(descTitle, { y: 18, opacity: 0 },{ y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.2')
      if (descBodies.length) tl.fromTo(Array.from(descBodies),
        { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.14, ease: 'power2.out' }, '-=0.4'
      )
      if (descRange) tl.fromTo(descRange, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, '-=0.25')
      if (descPhoto) gsap.fromTo(descPhoto, { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out', scrollTrigger: st })
    }

    // Specs title reveal
    const specsTitle = specsRef.current?.querySelector('[data-reveal]')
    if (specsTitle) {
      gsap.fromTo(
        specsTitle,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: specsTitle, start: 'top 88%', toggleActions: 'play none none none' },
        }
      )
    }

    // Specs rows stagger — each row slides in from left
    const specRows = specsRef.current?.querySelectorAll('[data-spec-row]')
    if (specRows?.length) {
      gsap.fromTo(
        specRows,
        { opacity: 0, x: -12 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.055, ease: 'power2.out',
          scrollTrigger: {
            trigger: specsRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Other models reveals
    const othersItems = othersRef.current?.querySelectorAll('[data-reveal]')
    othersItems?.forEach((item) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' },
        }
      )
    })
  })

  return (
    <>
      {/* ── Description — éditorial ── */}
      <section ref={descRef} className="relative bg-white px-5 lg:px-12 pt-12 pb-12 lg:pt-20 lg:pb-20 overflow-hidden">

        {/* Watermark nom du modèle — gauche, interactif */}
        <div
          className="absolute inset-y-0 left-0 flex items-center select-none"
          style={{ zIndex: 10 }}
          aria-hidden="true"
        >
          <p
            className="font-condensed uppercase leading-none cursor-default"
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setNameHovered(false)}
            style={{
              fontSize: 'clamp(140px, 22vw, 320px)',
              letterSpacing: '-0.02em',
              marginLeft: '-0.04em',
              color: nameHovered ? '#FF5A00' : 'transparent',
              WebkitTextStroke: nameHovered ? '0px transparent' : '1.5px rgba(255,90,0,0.18)',
              textShadow: nameHovered ? '0 0 60px rgba(255,90,0,0.45), 0 0 120px rgba(255,90,0,0.2)' : 'none',
              transition: 'color 0.35s ease, -webkit-text-stroke 0.35s ease, text-shadow 0.35s ease',
            }}
          >
            {model.name}
          </p>
        </div>

        <div className="relative max-w-[1400px] mx-auto" style={{ zIndex: 20 }}>

          {/* Ligne de séparation */}
          <div data-desc-line className="h-px bg-brand-black/10 mb-12" />

          {/* Texte */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20">
            <div>
              <p data-desc-label className="font-sans text-[11px] tracking-[0.22em] uppercase text-orange mb-5">
                — {t('description_title')}
              </p>
              <p data-desc-body className="font-sans font-semibold text-lg leading-relaxed text-brand-black mb-0">
                {t(desc1Key)}
              </p>
            </div>
            <div>
              {t(desc2Key).split('\n\n').map((para, i) => (
                <p key={i} data-desc-body className="font-sans text-base leading-relaxed text-brand-black/60 mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Autonomie */}
          <div data-desc-range className="mt-12 pt-8 border-t border-brand-black/10">
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-orange mb-3">
              — {t('range_title')}
            </p>
            <p className="font-sans text-sm leading-relaxed text-brand-black/45 italic">
              {t('range_note')}
            </p>
          </div>
        </div>
      </section>

      {/* ── Specs table — dark ── */}
      <section ref={specsRef} className="bg-brand-black px-5 lg:px-12 py-14 lg:py-20">
        <div className="max-w-[1400px] mx-auto">
          <h2
            data-reveal
            className="font-condensed text-[clamp(48px,6vw,80px)] uppercase text-white leading-none mb-14"
          >
            {t('specs_title')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Mechanical */}
            <div className="lg:pr-12 lg:border-r lg:border-orange/20">
              <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-orange mb-6">
                {t('mechanical_title')}
              </p>
              <div className="flex flex-col">
                {mechSpecs.map((row) => (
                  <div
                    key={row.label_fr}
                    data-spec-row
                    className="flex justify-between items-baseline py-3 gap-6 border-b border-[#1F1F1F]"
                  >
                    <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-white/35 flex-shrink-0">
                      {locale === 'fr' ? row.label_fr : row.label_en}
                    </span>
                    <span className="font-sans text-sm text-white/80 text-right">
                      {locale === 'fr' ? row.value_fr : row.value_en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Electrical */}
            <div className="lg:pl-12 mt-10 lg:mt-0">
              <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-orange mb-6">
                {t('electrical_title')}
              </p>
              <div className="flex flex-col">
                {elecSpecs.map(({ label, value }) => (
                  <div
                    key={label}
                    data-spec-row
                    className="flex justify-between items-baseline py-3 gap-6 border-b border-[#1F1F1F]"
                  >
                    <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-white/35 flex-shrink-0">
                      {label}
                    </span>
                    <span className="font-sans text-sm text-white/80 text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other models — light ── */}
      <section ref={othersRef} className="bg-white px-5 lg:px-12 py-14 lg:py-20">
        <div className="max-w-[1400px] mx-auto">
          <p data-reveal className="font-sans text-[11px] tracking-[0.22em] uppercase text-brand-black/35 mb-10">
            — {t('other_models')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherModels.map((m) => {
              const href  = `${prefix}/modeles/${m.slug}`
              const pills = locale === 'fr' ? m.pills_fr : m.pills_en
              return (
                <div key={m.slug} data-reveal>
                  <Link
                    href={href}
                    className="group block bg-[#EFEFED] overflow-hidden transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
                  >
                    <div className={`relative aspect-[4/3] overflow-hidden ${'fz2-plus,fz3-plus,rx1-plus'.includes(m.slug) ? 'bg-white ring-4 ring-white ring-inset' : 'bg-brand-lgray2'}`}>
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-105"
                        style={{ transform: `scale(${IMAGE_SCALE[m.slug] ?? 1})`, transformOrigin: 'center center' }}
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="px-6 py-5">
                      <h3 className="font-condensed text-3xl uppercase text-orange leading-none mb-2">
                        {m.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {pills.map((p) => (
                          <span
                            key={p}
                            className="font-sans text-[10px] tracking-[0.16em] uppercase text-brand-black/45"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
