'use client'

import { useRef, useState, useEffect } from 'react'

function ExpandIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M2 5V2h3M10 2h3v3M13 10v3h-3M5 13H2v-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ShrinkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M5 2v3H2M13 5h-3V2M10 13v-3h3M2 10h3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PdfViewer({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef    = useRef<HTMLIFrameElement>(null)
  const [isFs, setIsFs] = useState(false)

  useEffect(() => {
    const onFsChange = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div ref={containerRef} className="relative flex-1 bg-brand-cream flex flex-col">
      {/* Bouton plein écran */}
      <button
        type="button"
        onClick={toggleFullscreen}
        title={isFs ? 'Quitter le plein écran' : 'Plein écran'}
        className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-brand-lgray2 px-3 py-2 font-sans text-[10px] tracking-[0.2em] uppercase text-brand-black/60 hover:text-orange hover:border-orange transition-colors duration-200"
      >
        {isFs ? <ShrinkIcon /> : <ExpandIcon />}
      </button>

      <iframe
        ref={iframeRef}
        src={`${src}#toolbar=1&navpanes=0`}
        title={title}
        className="w-full flex-1"
        style={{ border: 'none', minHeight: 0 }}
        allowFullScreen
      />
    </div>
  )
}
