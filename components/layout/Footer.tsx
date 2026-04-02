import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface FooterProps {
  locale: string
}

function CompanoLogo() {
  return (
    <Image
      src="/logo_orange.png"
      alt="Compano"
      width={160}
      height={36}
      className="object-contain"
      style={{ height: 36, width: 'auto' }}
    />
  )
}

export default function Footer({ locale }: FooterProps) {
  const t  = useTranslations('footer')
  const tn = useTranslations('nav')

  const prefix = locale === 'en' ? '/en' : ''
  const year   = new Date().getFullYear()

  const modelLinks = [
    { href: `${prefix}/modeles/fz2-plus`, label: 'FZ2+' },
    { href: `${prefix}/modeles/fz3-plus`, label: 'FZ3+' },
    { href: `${prefix}/modeles/se2`,      label: 'SE2'  },
    { href: `${prefix}/modeles/rx1-plus`, label: 'RX1+' },
  ]

  const toolLinks = [
    { href: `${prefix}/outils`,       label: t('tools_guide')   },
    { href: `${prefix}/vaa`,          label: tn('vaa')          },
    { href: `${prefix}/enregistrement`, label: tn('register')   },
  ]

  const contactLinks = [
    { href: `${prefix}/nous-joindre`, label: t('contact_join')  },
    { href: `${prefix}/a-propos`,     label: t('contact_about') },
    { href: `${prefix}/detaillants`,  label: tn('dealers')      },
  ]

  return (
    <footer className="relative bg-[#080808]">
      {/* Orange gradient top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(to right, transparent 0%, #CC5600 28%, #CC5600 72%, transparent 100%)' }}
      />

      <div className="max-w-[1280px] mx-auto px-5 lg:px-10 pt-16 pb-8">
        {/* Column grid */}
        <div className="grid grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr] gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href={prefix || '/'} className="inline-block mb-5">
              <CompanoLogo />
            </Link>
            <p className="text-[13px] text-white/22 leading-relaxed max-w-[215px]">
              {t('tagline')}
            </p>
          </div>

          {/* Models */}
          <div>
            <h4 className="font-condensed font-bold text-[10px] tracking-[0.48em] uppercase text-white/14 mb-5">
              {t('col_models')}
            </h4>
            <ul className="flex flex-col gap-3">
              {modelLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/32 hover:text-orange transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-condensed font-bold text-[10px] tracking-[0.48em] uppercase text-white/14 mb-5">
              {t('col_tools')}
            </h4>
            <ul className="flex flex-col gap-3">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/32 hover:text-orange transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-condensed font-bold text-[10px] tracking-[0.48em] uppercase text-white/14 mb-5">
              {t('col_contact')}
            </h4>
            <ul className="flex flex-col gap-3">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/32 hover:text-orange transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:info@compano.ca"
                  className="text-[13px] text-white/32 hover:text-orange transition-colors duration-200"
                >
                  info@compano.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-white/[0.05] pt-6 flex-wrap gap-4">
          <p className="text-[11px] text-white/14">
            © {year} Compano. {t('rights')}.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/Compano-108107594367854"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center border border-white/[0.07] text-white/22 hover:border-orange/45 hover:text-orange transition-all duration-200"
              aria-label="Facebook"
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/Compano.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center border border-white/[0.07] text-white/22 hover:border-orange/45 hover:text-orange transition-all duration-200"
              aria-label="Instagram"
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
