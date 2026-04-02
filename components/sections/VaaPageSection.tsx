'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function VaaPageSection() {
  const t = useTranslations('pages.garantie')
  const containerRef  = useRef<HTMLDivElement>(null)
  const introRef      = useRef<HTMLDivElement>(null)
  const faqSection1   = useRef<HTMLDivElement>(null)
  const faqSection2   = useRef<HTMLDivElement>(null)

  const antivolFaq    = t.raw('antivol_faq')    as Array<{ q: string; a: string }>
  const assistanceFaq = t.raw('assistance_faq') as Array<{ q: string; a: string }>

  useGSAP(
    () => {
      if (introRef.current) {
        gsap.fromTo(introRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
          scrollTrigger: { trigger: introRef.current, start: 'top 88%' },
        })
      }

      ;[faqSection1, faqSection2].forEach((secRef) => {
        if (!secRef.current) return
        const title = secRef.current.querySelector('.faq-title')
        const items = secRef.current.querySelectorAll('.faq-item')

        if (title) {
          gsap.fromTo(title, { opacity: 0, y: 18 }, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: secRef.current, start: 'top 88%' },
          })
        }
        if (items.length) {
          gsap.fromTo(items, { opacity: 0, y: 14 }, {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: secRef.current, start: 'top 80%' },
          })
        }
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef}>

      {/* ── Banner image ─────────────────────────────────────── */}
      <div className="relative w-full h-[280px] lg:h-[460px] overflow-hidden">
        <Image
          src="https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/banner-vaa-compano-2.jpg"
          alt="Programme VAA Compano"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.28))' }}
        />
      </div>

      {/* ── Intro — flyer + texte ─────────────────────────────── */}
      <section className="bg-white py-20 px-5 lg:px-12">
        <div
          ref={introRef}
          className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
          style={{ opacity: 0 }}
        >
          {/* Flyer */}
          <div className="relative w-full max-w-sm mx-auto lg:mx-0" style={{ aspectRatio: '5/7' }}>
            <Image
              src="https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/flyers-compano-recto-2.jpg"
              alt="Flyer Compano VAA"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 40vw"
            />
          </div>

          {/* Texte */}
          <div>
            <p className="font-sans text-[15px] text-brand-gray leading-[1.85] mb-8">
              {t('intro')}
            </p>

            <h2
              className="font-condensed font-black uppercase text-brand-black mb-5"
              style={{ fontSize: 'clamp(22px, 2.8vw, 38px)', lineHeight: '1.06' }}
            >
              {t('velec_title')}
            </h2>

            <p className="font-sans text-[15px] text-brand-gray leading-[1.85] mb-4">
              {t('velec_desc1')}
            </p>
            <p className="font-sans text-[15px] text-brand-gray leading-[1.85]">
              {t('velec_desc2')}
            </p>
          </div>
        </div>
      </section>

      {/* ── Sticker ──────────────────────────────────────────── */}
      <div className="bg-brand-cream flex justify-center py-14">
        <div className="relative" style={{ width: 220, height: 220 }}>
          <Image
            src="https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/compano-Bike-sticker-ef1de941.png"
            alt="Badge VAA Compano"
            fill
            className="object-contain"
            sizes="220px"
          />
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-5 lg:px-12">
        <div className="max-w-[860px] mx-auto">

          {/* Section 1 : Antivol */}
          <div ref={faqSection1} className="mb-20">
            <FaqSectionTitle title={t('antivol_title')} />
            <FaqList items={antivolFaq} />
          </div>

          {/* Séparateur */}
          <div className="border-t border-brand-lgray2 mb-20" />

          {/* Section 2 : Assistance */}
          <div ref={faqSection2}>
            <FaqSectionTitle title={t('assistance_title')} />
            <FaqList items={assistanceFaq} />
          </div>

        </div>
      </section>

    </div>
  )
}

function FaqSectionTitle({ title }: { title: string }) {
  return (
    <div className="faq-title flex items-center gap-5 mb-2" style={{ opacity: 0 }}>
      <div className="h-px flex-1 bg-brand-lgray2" />
      <h2
        className="font-condensed font-black uppercase text-brand-black text-center shrink-0"
        style={{ fontSize: 'clamp(15px, 1.8vw, 20px)', letterSpacing: '0.14em' }}
      >
        {title}
      </h2>
      <div className="h-px flex-1 bg-brand-lgray2" />
    </div>
  )
}

function FaqList({ items }: { items: Array<{ q: string; a: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="border-b border-brand-lgray2">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="faq-item border-t border-brand-lgray2" style={{ opacity: 0 }}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-5 text-left group"
            >
              <span
                className={`font-condensed font-bold uppercase transition-colors duration-200 ${
                  isOpen ? 'text-orange' : 'text-brand-black group-hover:text-orange'
                }`}
                style={{ fontSize: '13px', letterSpacing: '0.2em' }}
              >
                {item.q}
              </span>

              {/* Icône + / × */}
              <span
                className={`shrink-0 w-[26px] h-[26px] border flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? 'border-orange text-orange rotate-45'
                    : 'border-brand-black/20 text-brand-black/40 group-hover:border-orange group-hover:text-orange'
                }`}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </button>

            {/* Réponse — height animée via CSS grid */}
            <div
              className="grid transition-[grid-template-rows] duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="font-sans text-[14px] text-brand-gray leading-[1.82] pb-6 pr-10">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
