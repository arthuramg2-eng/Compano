import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'

const metadataByLocale: Record<string, Metadata> = {
  fr: {
    title: 'Compano — Vélos électriques du Québec',
    description:
      "Compano fabrique des vélos à assistance électrique conçus au Québec, homologués pour le Canada. Moteur 500W, jusqu'à 140 km d'autonomie.",
  },
  en: {
    title: 'Compano — Electric Bikes from Québec',
    description:
      'Compano builds electric bikes designed in Québec, certified for Canada. 500W rear motor, up to 140 km of range.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return metadataByLocale[locale] ?? metadataByLocale.fr
}

const locales = ['fr', 'en']

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params

  if (!locales.includes(locale)) notFound()

  const messages = await getMessages()

  return (
    <>
      <SmoothScroll />
      <NextIntlClientProvider messages={messages}>
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </NextIntlClientProvider>
    </>
  )
}
