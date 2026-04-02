import { useTranslations } from 'next-intl'
import ModelDetailsSection from '@/components/sections/ModelDetailsSection'
import ModelsPageHero from '@/components/sections/ModelsPageHero'

export default async function ModelsPage({ params }: PageProps<'/[locale]/modeles'>) {
  const { locale } = await params

  return (
    <>
      <PageHeroWrapper />
      <ModelDetailsSection locale={locale} />
    </>
  )
}

function PageHeroWrapper() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('pages.models')
  return (
    <ModelsPageHero
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
    />
  )
}
