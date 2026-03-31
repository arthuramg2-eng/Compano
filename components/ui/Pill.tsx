interface PillProps {
  children: React.ReactNode
  variant?: 'dark' | 'orange'
  className?: string
}

export default function Pill({ children, variant = 'dark', className = '' }: PillProps) {
  const styles =
    variant === 'orange'
      ? 'bg-orange text-white'
      : 'bg-brand-black text-white'

  return (
    <span
      className={`inline-block px-[9px] py-[3px] font-condensed font-bold text-[10px] tracking-[0.15em] uppercase rounded-[2px] ${styles} ${className}`}
    >
      {children}
    </span>
  )
}
