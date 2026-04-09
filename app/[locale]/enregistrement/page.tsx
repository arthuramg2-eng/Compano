import RegistrationSection from '@/components/sections/RegistrationSection'

export default async function EnregistrementPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  await params
  return <RegistrationSection />
}
