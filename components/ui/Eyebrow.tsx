interface EyebrowProps {
  children: React.ReactNode
  className?: string
  light?: boolean
}

export default function Eyebrow({ children, className = '', light = false }: EyebrowProps) {
  return (
    <div
      className={`flex items-center gap-3 text-[11px] font-condensed font-bold tracking-[0.4em] uppercase mb-3 ${light ? 'text-orange/70' : 'text-orange'} ${className}`}
    >
      <span className={`w-5 h-px flex-shrink-0 ${light ? 'bg-orange/70' : 'bg-orange'}`} />
      {children}
    </div>
  )
}
