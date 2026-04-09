'use client'

import Script from 'next/script'
import { useTranslations } from 'next-intl'

export default function RegistrationSection() {
  const t = useTranslations('pages.registration')

  return (
    <div className="bg-white flex flex-col lg:flex-row pt-[72px]" style={{ minHeight: '100vh' }}>

      {/* Colonne gauche : contenu */}
      <div className="lg:w-[380px] xl:w-[440px] shrink-0 px-8 lg:px-10 xl:px-12 py-8 flex flex-col justify-center">

        {/* Eyebrow */}
        <p className="font-sans text-[11px] tracking-[0.36em] uppercase text-orange font-medium mb-4">
          — {t('eyebrow')}
        </p>

        {/* Titre */}
        <h1
          className="font-condensed font-black uppercase text-brand-black whitespace-pre-line mb-5"
          style={{ fontSize: 'clamp(42px, 3.5vw, 58px)', lineHeight: '0.92' }}
        >
          {t('title')}
        </h1>

        {/* Intro */}
        <p className="font-sans text-[15px] leading-[1.75] text-brand-gray mb-7">
          {t('intro')}
        </p>

        {/* Numéros de série */}
        <div className="grid grid-cols-1 gap-px bg-brand-lgray2">
          <div className="bg-white py-4">
            <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-orange font-medium mb-2">{t('serial_bike_label')}</p>
            <p className="font-sans text-[14px] text-brand-black leading-[1.65]">
              {t.rich('serial_bike_desc', { b: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
          <div className="bg-white py-4">
            <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-orange font-medium mb-2">{t('serial_battery_label')}</p>
            <p className="font-sans text-[14px] text-brand-black leading-[1.65]">
              {t.rich('serial_battery_desc', { b: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
        </div>

      </div>

      {/* Colonne droite : formulaire */}
      <div className="flex-1 min-h-0 flex items-center justify-center py-6 pr-8">
        {/* Wrapper qui clippe la photo du haut (~300px) */}
        <div style={{ width: '520px', maxWidth: '100%', height: '480px', overflow: 'hidden', position: 'relative' }}>
          <div
            data-tf-widget={t('form_id')}
            data-tf-opacity="100"
            data-tf-iframe-props={`title=${t('form_title')}`}
            data-tf-transitive-search-params=""
            data-tf-medium="snippet"
            style={{ height: '880px', width: '100%', marginTop: '-400px' }}
          />
        </div>
        <Script src="//embed.typeform.com/next/embed.js" strategy="afterInteractive" />
      </div>

    </div>
  )
}
