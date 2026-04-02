'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type Guide = {
  label: string
  href_consult: string
  href_download: string
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 1v9M4.5 6.5 8 10l3.5-3.5M2 13h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ToolsSection() {
  const t           = useTranslations('pages.tools')
  const containerRef = useRef<HTMLDivElement>(null)
  const guidesRef    = useRef<HTMLDivElement>(null)

  const guides = t.raw('guides') as Guide[]

  useGSAP(
    () => {
      if (guidesRef.current) {
        gsap.fromTo(
          guidesRef.current.querySelectorAll('.guide-row'),
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: guidesRef.current, start: 'top 84%' },
          }
        )
      }
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} className="bg-white py-14 px-5 lg:px-12">
      <div className="max-w-[1280px] mx-auto">

        {/* Owner's Guides list */}
        <div ref={guidesRef}>
          {/* Section label */}
          <div className="flex items-center gap-5 mb-2">
            <div className="h-px flex-1 bg-brand-lgray2" />
            <p className="font-sans text-[10px] tracking-[0.36em] uppercase text-brand-gray/55 font-medium shrink-0">
              {t('guides_eyebrow')}
            </p>
            <div className="h-px flex-1 bg-brand-lgray2" />
          </div>

          {/* Rows */}
          <div className="border-b border-brand-lgray2">
            {guides.map((guide, i) => (
              <div
                key={i}
                className="guide-row border-t border-brand-lgray2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 opacity-0"
              >
                <span
                  className="font-condensed font-bold uppercase text-brand-black"
                  style={{ fontSize: 'clamp(15px, 1.6vw, 20px)', letterSpacing: '0.05em' }}
                >
                  {guide.label}
                </span>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={guide.href_consult}
                    className="group flex items-center gap-2 font-sans font-medium text-[11px] tracking-[0.2em] uppercase text-brand-black/60 hover:text-orange transition-colors duration-200"
                  >
                    <span>{t('guides_consult')}</span>
                    <ArrowIcon />
                  </Link>

                  <div className="w-px h-4 bg-brand-lgray2" />

                  <Link
                    href={guide.href_download}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-sans font-medium text-[11px] tracking-[0.2em] uppercase text-orange hover:gap-3 transition-all duration-200"
                  >
                    <span>{t('guides_download')}</span>
                    <DownloadIcon />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
