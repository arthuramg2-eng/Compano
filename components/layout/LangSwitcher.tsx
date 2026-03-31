'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LangSwitcherProps {
  locale: string
}

export default function LangSwitcher({ locale }: LangSwitcherProps) {
  const pathname = usePathname()

  // Build alternate locale path
  // With localePrefix:'always', usePathname() returns the full path (/fr/... or /en/...)
  // Strip the current locale prefix before swapping
  const getAltPath = () => {
    // Strip current locale prefix, then add the target locale prefix
    // (localePrefix:'always' means both /fr/... and /en/... are used)
    const stripped = pathname.replace(/^\/(fr|en)/, '') || '/'
    const target = locale === 'fr' ? 'en' : 'fr'
    return `/${target}${stripped === '/' ? '' : stripped}`
  }

  const altLocale = locale === 'fr' ? 'en' : 'fr'

  const frPath = locale === 'fr' ? pathname : getAltPath()
  const enPath = locale === 'en' ? pathname : getAltPath()

  return (
    <div className="flex items-center gap-1 text-[11px] font-sans font-medium tracking-[0.15em]">
      <Link
        href={frPath}
        className={locale === 'fr' ? 'text-brand-black' : 'text-brand-black/30 hover:text-brand-black transition-colors'}
      >
        FR
      </Link>
      <span className="text-brand-black/20 mx-1">|</span>
      <Link
        href={enPath}
        className={locale === 'en' ? 'text-brand-black' : 'text-brand-black/30 hover:text-brand-black transition-colors'}
      >
        EN
      </Link>
    </div>
  )
}
