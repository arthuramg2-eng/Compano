import { useTranslations } from 'next-intl'
import ModelDetailsSection from '@/components/sections/ModelDetailsSection'

export default async function ModelsPage({ params }: PageProps<'/[locale]/modeles'>) {
  const { locale } = await params

  return (
    <>
      <PageHero locale={locale} />
      <ModelDetailsSection locale={locale} />
    </>
  )
}

function PageHero({ locale }: { locale: string }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('pages.models')

  return (
    <section className="bg-white pt-[120px] pb-16 px-5 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-orange font-medium mb-4">
          {t('eyebrow')}
        </p>
        <h1
          className="font-condensed uppercase text-brand-black whitespace-pre-line mb-5"
          style={{ fontSize: 'clamp(52px, 7vw, 100px)', lineHeight: '0.92' }}
        >
          {t('title')}
        </h1>
        <p className="font-sans font-light text-brand-black/50 text-[15px] leading-[1.75] max-w-[520px]">
          {t('subtitle')}
        </p>
      </div>
    </section>
  )
}
