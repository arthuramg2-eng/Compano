import { useTranslations } from 'next-intl'
import ModelsPageHero from '@/components/sections/ModelsPageHero'
import ToolsSection from '@/components/sections/ToolsSection'

export default async function OutilsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  await params
  return (
    <>
      <OutilsHeroWrapper />
      <ToolsSection />
    </>
  )
}

function OutilsHeroWrapper() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('pages.tools')
  return (
    <ModelsPageHero
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      imageSrc="https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/DSC_7707.jpg"
    />
  )
}
