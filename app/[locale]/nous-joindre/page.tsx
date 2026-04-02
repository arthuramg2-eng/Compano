import ContactSection from '@/components/sections/ContactSection'

export default async function NousJoindrePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  await params
  return <ContactSection />
}
