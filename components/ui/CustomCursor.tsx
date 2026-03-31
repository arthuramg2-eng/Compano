'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Seulement sur les appareils avec souris précise
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Active cursor: none via CSS class (retiré proprement au cleanup)
    document.body.classList.add('custom-cursor-active')

    let mouseX = -200, mouseY = -200
    let ringX  = -200, ringY  = -200
    let raf: number

    const show = () => {
      dot.style.opacity  = '1'
      ring.style.opacity = '1'
    }
    const hide = () => {
      dot.style.opacity  = '0'
      ring.style.opacity = '0'
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      ringX = lerp(ringX, mouseX, 0.1)
      ringY = lerp(ringY, mouseY, 0.1)
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      show()
    }

    const onMouseDown = () => {
      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(0.6)`
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(0.75)`
    }
    const onMouseUp = () => {
      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1)`
    }

    // Cache le curseur custom quand la souris quitte la fenêtre
    const onDocLeave  = (e: MouseEvent) => { if (e.relatedTarget === null) hide() }
    const onDocEnter  = () => show()

    // Hover sur liens/boutons
    const onEnterInteractive = () => {
      if (!ring.classList.contains('is-bike')) ring.classList.add('is-hovering')
    }
    const onLeaveInteractive = () => ring.classList.remove('is-hovering')

    // Hover sur le vélo hero
    const onEnterBike = () => {
      ring.classList.remove('is-hovering')
      ring.classList.add('is-bike')
    }
    const onLeaveBike = () => ring.classList.remove('is-bike')

    const attachInteractive = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
      document.querySelectorAll('.hero-bike').forEach((el) => {
        el.addEventListener('mouseenter', onEnterBike)
        el.addEventListener('mouseleave', onLeaveBike)
      })
    }
    attachInteractive()

    const observer = new MutationObserver(attachInteractive)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mousedown',  onMouseDown)
    window.addEventListener('mouseup',    onMouseUp)
    document.addEventListener('mouseleave', onDocLeave)
    document.addEventListener('mouseenter', onDocEnter)
    raf = requestAnimationFrame(tick)

    return () => {
      // Restaure TOUJOURS le curseur natif au démontage
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('mouseup',    onMouseUp)
      document.removeEventListener('mouseleave', onDocLeave)
      document.removeEventListener('mouseenter', onDocEnter)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Point orange */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#FF4D00',
          willChange: 'transform',
          opacity: 0,
          transition: 'opacity 0.15s ease',
        }}
      />

      {/* Anneau avec inertie */}
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[9998] hidden md:flex items-center justify-center"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid #FF4D00',
          willChange: 'transform',
          opacity: 0,
          transition: [
            'width 0.35s cubic-bezier(0.16,1,0.3,1)',
            'height 0.35s cubic-bezier(0.16,1,0.3,1)',
            'border-color 0.3s ease',
            'background 0.3s ease',
            'opacity 0.15s ease',
          ].join(', '),
        }}
      >
        <span className="cursor-ring-label">EXPLORER →</span>
      </div>
    </>
  )
}
