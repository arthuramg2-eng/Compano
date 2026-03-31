'use client'

import Link from 'next/link'

interface ButtonPrimaryProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

export default function ButtonPrimary({
  href,
  onClick,
  children,
  className = '',
  fullWidth = false,
}: ButtonPrimaryProps) {
  const base = `inline-flex items-center justify-center px-8 py-3.5 bg-orange text-white border-2 border-orange font-condensed font-bold text-[13px] tracking-[0.25em] uppercase transition-all duration-[220ms] hover:bg-orange-hover hover:border-orange-hover hover:translate-x-1 cursor-pointer${fullWidth ? ' w-full' : ''} ${className}`

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
