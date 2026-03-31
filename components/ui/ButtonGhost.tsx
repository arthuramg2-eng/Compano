'use client'

import Link from 'next/link'

interface ButtonGhostProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  dark?: boolean
  fullWidth?: boolean
}

export default function ButtonGhost({
  href,
  onClick,
  children,
  className = '',
  dark = true,
  fullWidth = false,
}: ButtonGhostProps) {
  const base = dark
    ? `inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-white border-2 border-white/30 font-condensed font-bold text-[13px] tracking-[0.25em] uppercase transition-all duration-[220ms] hover:border-white hover:bg-white/7 cursor-pointer${fullWidth ? ' w-full' : ''} ${className}`
    : `inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-brand-black border-2 border-brand-lgray font-condensed font-bold text-[13px] tracking-[0.25em] uppercase transition-all duration-[220ms] hover:border-brand-black hover:bg-brand-black/5 cursor-pointer${fullWidth ? ' w-full' : ''} ${className}`

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {children}
    </button>
  )
}
