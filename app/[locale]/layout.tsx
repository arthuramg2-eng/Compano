import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'
import CustomCursor from '@/components/ui/CustomCursor'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-condensed',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Compano — Vélos électriques du Québec',
  description:
    "Compano fabrique des vélos à assistance électrique conçus au Québec, homologués pour le Canada. Moteur 500W, jusqu'à 140 km d'autonomie.",
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
    <html
      lang={locale}
      className={`${barlowCondensed.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <SmoothScroll />
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
