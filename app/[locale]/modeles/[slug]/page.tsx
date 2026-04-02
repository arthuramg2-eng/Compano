import { notFound } from 'next/navigation'
import { getModelBySlug } from '@/lib/models'
import ProductHeroSection from '@/components/sections/ProductHeroSection'
import ProductDetailsSection from '@/components/sections/ProductDetailsSection'

export default async function ModelPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const model = getModelBySlug(slug)

  if (!model) notFound()

  return (
    <>
      <ProductHeroSection model={model} locale={locale} />
      <ProductDetailsSection model={model} locale={locale} />
    </>
  )
}
