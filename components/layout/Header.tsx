'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import LangSwitcher from './LangSwitcher'

gsap.registerPlugin(useGSAP)

interface HeaderProps {
  locale: string
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const pathname  = usePathname()

  const isProductPage = /\/modeles\/.+/.test(pathname)
  const prefix = locale === 'en' ? '/en' : ''

  useEffect(() => {
    // Pages produit : hero = 62vh, on attend d'en sortir
    const threshold = isProductPage ? window.innerHeight * 0.45 : 60
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll() // état initial
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isProductPage])

  // Entrée depuis le haut uniquement sur les pages non-produit
  useGSAP(
    () => {
      if (isProductPage) return
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.8 }
      )
    },
    { scope: headerRef, dependencies: [isProductPage] }
  )

  // Pages produit : fade piloté par le scroll
  useEffect(() => {
    if (!isProductPage) return
    const el = headerRef.current
    if (!el) return
    gsap.to(el, {
      opacity: scrolled ? 1 : 0,
      duration: scrolled ? 0.5 : 0.3,
      ease: scrolled ? 'power2.out' : 'power2.in',
    })
  }, [scrolled, isProductPage])

  const navLinks = [
    { href: `${prefix}/modeles`,  label: t('models')   },
    { href: `${prefix}/a-propos`, label: t('about')    },
    { href: `${prefix}/outils`,   label: t('tools')    },
    { href: `${prefix}/garantie`, label: t('warranty') },
  ]

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-500 ${
          scrolled
            ? 'bg-white/92 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.07)]'
            : 'bg-transparent'
        }`}
        style={{ opacity: 0 }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 h-full grid grid-cols-[1fr_auto_1fr] items-center">

          {/* Left — nav links */}
          <nav className="hidden lg:flex items-center gap-10 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-underline relative h-full flex items-center font-sans text-[11px] tracking-[0.24em] uppercase font-medium transition-colors duration-200"
                style={{ color: 'rgba(10,10,10,0.45)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0A0A0A')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(10,10,10,0.45)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: logo left-aligned */}
          <Link href={prefix || '/'} className="lg:hidden flex items-center">
            <Image
              src="/logo_black.png"
              alt="Compano"
              width={140}
              height={32}
              className="object-contain"
              style={{ height: 40, width: 'auto' }}
              priority
            />
          </Link>

          {/* Center — logo */}
          <Link href={prefix || '/'} className="hidden lg:flex justify-center items-center">
            <Image
              src="/logo_black.png"
              alt="Compano"
              width={220}
              height={48}
              className="object-contain"
              style={{ height: 50, width: 'auto' }}
              priority
            />
          </Link>

          {/* Right — lang + CTA */}
          <div className="hidden lg:flex items-center justify-end gap-5">
            <Link
              href={`${prefix}/nous-joindre`}
              className="nav-link-underline relative h-full flex items-center font-sans text-[11px] tracking-[0.24em] uppercase font-medium transition-colors duration-200"
              style={{ color: 'rgba(10,10,10,0.45)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0A0A0A')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(10,10,10,0.45)')}
            >
              {t('contact')}
            </Link>
            <LangSwitcher locale={locale} />
            <Link
              href={`${prefix || '/'}#detaillants`}
              className="btn-nav-cta flex items-center px-5 h-9 border border-orange text-orange font-sans text-[11px] tracking-[0.22em] uppercase font-medium"
            >
              <span>{t('dealers_short')}</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex justify-end">
            <button
              type="button"
              className="flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span className={`block w-6 h-[1.5px] bg-brand-black transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`block w-6 h-[1.5px] bg-brand-black transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-[1.5px] bg-brand-black transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-white flex flex-col pt-[88px] px-6"
          onClick={() => setMobileOpen(false)}
        >
          <nav className="flex flex-col gap-0">
            {[...navLinks, { href: `${prefix}/nous-joindre`, label: t('contact') }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-condensed text-[28px] tracking-[0.12em] uppercase text-brand-black/35 hover:text-brand-black transition-colors border-b border-brand-black/8 py-5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`${prefix || '/'}#detaillants`}
              className="mt-6 flex items-center justify-center py-4 border border-orange text-orange font-sans text-[12px] tracking-[0.28em] uppercase font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {t('dealers_short')}
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
