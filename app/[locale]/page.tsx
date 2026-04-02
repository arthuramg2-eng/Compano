import HeroSection      from '@/components/sections/HeroSection'
import MarqueeBand      from '@/components/sections/MarqueeBand'
import ModelsSection    from '@/components/sections/ModelsSection'
import StatementSection from '@/components/sections/StatementSection'
import FeaturesSection  from '@/components/sections/FeaturesSection'
import WarrantySection  from '@/components/sections/WarrantySection'
import FooterCTA        from '@/components/sections/FooterCTA'

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params

  return (
    <>
      <HeroSection      locale={locale} />
      <MarqueeBand />
      <ModelsSection    locale={locale} />
      <StatementSection />
      <WarrantySection />
      <FeaturesSection />
      <FooterCTA        locale={locale} />
    </>
  )
}
