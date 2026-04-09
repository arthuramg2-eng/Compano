'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface SplitSectionProps {
  locale: string
}

interface SplitPanelProps {
  href: string
  image: string
  tag: string
  title: string
  cta: string
}

function SplitPanel({ href, image, tag, title, cta }: SplitPanelProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden"
      style={{ aspectRatio: '4/3' }}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover opacity-55 group-hover:scale-[1.08] group-hover:opacity-42 transition-all duration-700 ease-out"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Dark gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.08) 100%)' }}
      />

      {/* Orange tint on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(204,86,0,0.1) 0%, transparent 55%)' }}
      />

      {/* Bottom-left corner bracket — hover reveal */}
      <div className="absolute bottom-0 left-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-all duration-400 delay-75 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange" />
        <div className="absolute bottom-0 left-0 h-full w-[2px] bg-orange" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-5 h-px bg-orange flex-shrink-0" />
          <span className="font-condensed font-bold text-[10px] tracking-[0.55em] uppercase text-orange">
            {tag}
          </span>
        </div>
        <h3
          className="font-condensed font-black uppercase text-white leading-[1.0] mb-5 group-hover:-translate-y-1 transition-transform duration-300"
          style={{ fontSize: 'clamp(22px, 2.8vw, 38px)' }}
        >
          {title}
        </h3>
        <span className="inline-flex items-center gap-3 font-condensed font-bold text-[11px] tracking-[0.32em] uppercase text-white/38 group-hover:text-white group-hover:gap-5 transition-all duration-300">
          {cta} →
        </span>
      </div>
    </Link>
  )
}

export default function SplitSection({ locale }: SplitSectionProps) {
  const t = useTranslations('split')
  const prefix = locale === 'en' ? '/en' : '/fr'

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <SplitPanel
        href={`${prefix}/a-propos`}
        image="https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/compano-imagedemarque.jpg"
        tag={t('brand_tag')}
        title={t('brand_title')}
        cta={t('brand_cta')}
      />
      <SplitPanel
        href={`${prefix}/garantie`}
        image="https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/banner-vaa-compano-2.jpg"
        tag={t('vaa_tag')}
        title={t('vaa_title')}
        cta={t('vaa_cta')}
      />
    </section>
  )
}
