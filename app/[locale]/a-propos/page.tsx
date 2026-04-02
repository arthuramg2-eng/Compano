import { useTranslations } from 'next-intl'
import ModelsPageHero from '@/components/sections/ModelsPageHero'
import AboutStorySection from '@/components/sections/AboutStorySection'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <>
      <AboutHeroWrapper />
      <AboutStorySection locale={locale} />
    </>
  )
}

function AboutHeroWrapper() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('pages.about')
  return (
    <ModelsPageHero
      eyebrow={t('hero_eyebrow')}
      title={t('hero_title')}
      subtitle={t('hero_subtitle')}
    />
  )
}
