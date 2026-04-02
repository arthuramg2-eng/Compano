import { useTranslations } from 'next-intl'
import ModelsPageHero from '@/components/sections/ModelsPageHero'
import VaaPageSection from '@/components/sections/VaaPageSection'

export default async function GarantiePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  await params
  return (
    <>
      <GarantieHeroWrapper />
      <VaaPageSection />
    </>
  )
}

function GarantieHeroWrapper() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('pages.garantie')
  return (
    <ModelsPageHero
      eyebrow={t('hero_eyebrow')}
      title={t('hero_title')}
      subtitle={t('hero_subtitle')}
    />
  )
}
