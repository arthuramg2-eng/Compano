'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface HeroSectionProps {
  locale: string
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('hero')
  const containerRef  = useRef<HTMLElement>(null)
  const decorTextRef  = useRef<HTMLDivElement>(null)
  const line1Ref      = useRef<HTMLHeadingElement>(null)
  const line2Ref      = useRef<HTMLHeadingElement>(null)
  const subtitleRef   = useRef<HTMLParagraphElement>(null)
  const ctasRef       = useRef<HTMLDivElement>(null)
  const statsRef      = useRef<HTMLDivElement>(null)
  const bikeRef       = useRef<HTMLDivElement>(null)
  const bikeFloatRef  = useRef<HTMLDivElement>(null)
  const bikeShadowRef = useRef<HTMLDivElement>(null)
  const bikeGlowRef   = useRef<HTMLDivElement>(null)
  const scrollIndRef  = useRef<HTMLDivElement>(null)

  const prefix = locale === 'en' ? '/en' : '/fr'

  useGSAP(
    () => {
      const section = containerRef.current
      if (!section) return

      const isMobile = window.matchMedia('(max-width: 1023px)').matches

      // ── Element selectors ───────────────────────────────────────────────────
      const statItems = statsRef.current?.querySelectorAll('.stat-item')  ?? []
      const ctaBtns   = ctasRef.current?.querySelectorAll('a')            ?? []

      // ── Initial states — all set before first paint ─────────────────────────

      // Logo watermark: always visible, no scroll animation
      gsap.set(decorTextRef.current, { x: 0, opacity: 1 })

      // Bike: suspended above viewport, purposeful angle
      gsap.set(bikeRef.current, {
        y: '-90vh', opacity: 0, scale: 0.94, rotation: 2.5,
        transformPerspective: 1000,
      })
      gsap.set(bikeShadowRef.current, { scaleX: 0, opacity: 0 })
      gsap.set(bikeGlowRef.current,   { opacity: 0, scale: 0.85 })

      // Headline: behind overflow:hidden, primed for editorial wipe
      gsap.set(line1Ref.current, { y: '105%' })
      gsap.set(line2Ref.current, { y: '105%' })

      // Details: hidden
      gsap.set(subtitleRef.current, { opacity: 0, y: 12 })
      gsap.set(ctaBtns, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(statItems, { y: 20, opacity: 0 })
      gsap.set(scrollIndRef.current, { opacity: 1 })

      // ── Idle tweens (paused — engaged seamlessly once scroll sequence ends) ──

      // Float: y ±14px, rotation ±0.5deg, 3.6s sine
      const idleFloat = gsap.to(bikeFloatRef.current, {
        y: -14, rotation: 0.5, duration: 3.6,
        ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true,
      })
      // Shadow: inverse coupling — smaller when bike is high, fuller when low
      const idleShadow = gsap.to(bikeShadowRef.current, {
        scaleX: 0.65, opacity: 0.08, duration: 3.6,
        ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true,
      })
      // Glow: de-phased from float (+1.1s) — warmth pulses like sunlight through linen
      const idleGlow = gsap.to(bikeGlowRef.current, {
        opacity: 0.52, scale: 1.07, duration: 3.6,
        ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true, delay: 1.1,
      })
      // COMPANO drift: sub-perceptual, 9s period — prevents composition from going static
      const idleDrift = gsap.to(decorTextRef.current, {
        x: '+=10', duration: 9,
        ease: 'power1.inOut', yoyo: true, repeat: -1, paused: true,
      })

      let sequenceDone = false
      const startIdle = () => {
        sequenceDone = true
        idleFloat.play(); idleShadow.play(); idleGlow.play(); idleDrift.play()
      }
      const pauseIdle = () => {
        sequenceDone = false
        idleFloat.pause(); idleShadow.pause(); idleGlow.pause(); idleDrift.pause()
      }

      // ── MOBILE: elegant single-breath entrance on load (no pin) ─────────────
      if (isMobile) {
        gsap.set(scrollIndRef.current, { opacity: 0 })
        const mob = gsap.timeline({ delay: 0.2 })
        mob
          .to(line1Ref.current, { y: '0%', opacity: 1, ease: 'power3.out', duration: 0.65 }, 0.25)
          .to(line2Ref.current, { y: '0%', opacity: 1, ease: 'power3.out', duration: 0.65 }, 0.38)
          .to(subtitleRef.current,
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.7 }, 0.55)
          .to(ctaBtns,
            { scaleX: 1, stagger: 0.1, ease: 'expo.out', duration: 0.5 }, 0.75)
          .to(statItems,
            { y: 0, opacity: 1, stagger: 0.07, ease: 'power3.out', duration: 0.4 }, 0.9)
        return
      }

      // ── DESKTOP: scroll-driven timeline ─────────────────────────────────────
      // scrub: 1.8 — weighted, like fine paper turning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
          onLeave:     startIdle,
          onEnterBack: pauseIdle,
        },
      })

      // ── MOVEMENT 2 — The Object Descends (0.18 → 0.58) ──────────────────────
      // Falls the way a well-balanced object falls — with purpose, not weight.
      // Overshoot at progress 0.50 = 80% of this segment: barely perceptible breath.
      tl.to(bikeRef.current, {
        duration: 0.85,
        keyframes: [
          { percent: 80, y: 18, opacity: 1, scale: 1.012, rotation: -0.4, ease: 'power2.in' },
          { percent: 100, y: 0, scale: 1, rotation: 0, ease: 'expo.out' },
        ],
      }, 0.14)
      // Shadow: materializes from nothing — the shadow is proof the object has landed
      tl.to(bikeShadowRef.current, {
        duration: 0.85,
        keyframes: [
          { percent: 80, scaleX: 1.1, opacity: 0.28, ease: 'power2.in' },
          { percent: 100, scaleX: 1, opacity: 0.25, ease: 'expo.out' },
        ],
      }, 0.14)
      // Glow: surface warms as the bike nears its resting place
      tl.to(bikeGlowRef.current, {
        opacity: 0.28, scale: 1,
        ease: 'power2.out', duration: 0.22,
      }, 0.50)

      // ── MOVEMENT 3 — The Words Take Their Place (0.42 → 0.68) ───────────────
      // Editorial reveal: translateY wipe from overflow:hidden — the language of
      // Vogue, of Wallpaper*. Text surfaces like a photograph developing.
      // RIDE first; BEYOND begins when RIDE is 60% complete (0.42 + 0.6×0.15 = 0.51)
      tl.to(line1Ref.current, {
        y: '0%', opacity: 1,
        ease: 'power3.out', duration: 0.15,
      }, 0.42)
      tl.to(line2Ref.current, {
        y: '0%', opacity: 1,
        ease: 'power3.out', duration: 0.17,
      }, 0.51)

      // ── MOVEMENT 4 — The Details Surface (0.60 → 0.84) ──────────────────────
      // Subtitle: a whisper after the headline's declaration — slow, deliberate
      tl.to(subtitleRef.current, {
        opacity: 1, y: 0,
        ease: 'power2.out', duration: 0.16,
      }, 0.60)
      // CTA primary: draws itself left to right — a signature, an act of authorship
      if (ctaBtns.length >= 1) tl.to(ctaBtns[0], { scaleX: 1, ease: 'expo.out', duration: 0.08 }, 0.68)
      // CTA secondary: 0.04 progress units later
      if (ctaBtns.length >= 2) tl.to(ctaBtns[1], { scaleX: 1, ease: 'expo.out', duration: 0.08 }, 0.72)
      // Stats: arrive with the quiet confidence of facts
      tl.to(statItems, {
        y: 0, opacity: 1,
        ease: 'power3.out', duration: 0.07,
        stagger: 0.025,
      }, 0.74)

      // ── MOVEMENT 5 — Stillness (0.84 → 1.0) ─────────────────────────────────
      // Scroll indicator fades with dignity over 0.06 units
      tl.to(scrollIndRef.current, { opacity: 0, ease: 'power1.out', duration: 0.06 }, 0.84)
      // Hold for unpin — composition breathes
      tl.to({}, { duration: 0.16 }, 0.84)

      // ── Mouse parallax — gsap.quickTo() for silky 60fps response ─────────────
      // Three depth layers at different speeds create genuine spatial depth
      const bikeRotYTo = gsap.quickTo(bikeRef.current,      'rotateY', { duration: 0.6, ease: 'power3.out' })
      const bikeRotXTo = gsap.quickTo(bikeRef.current,      'rotateX', { duration: 0.6, ease: 'power3.out' })
      const decorXTo   = gsap.quickTo(decorTextRef.current, 'x',       { duration: 1.2, ease: 'power2.out' })
      const subtXTo    = gsap.quickTo(subtitleRef.current,  'x',       { duration: 0.8, ease: 'power2.out' })

      const onMouseMove = (e: MouseEvent) => {
        if (!sequenceDone) return
        const nx = e.clientX / window.innerWidth  - 0.5   // -0.5 → +0.5
        const ny = e.clientY / window.innerHeight - 0.5
        // Layer 2 (mid): bike — rotateX ±4deg, rotateY ±7deg
        bikeRotYTo(nx * 14)
        bikeRotXTo(ny * -8)
        // Layer 1 (deepest): COMPANO — 15% of cursor delta, opposite direction
        decorXTo(nx * -window.innerWidth * 0.15)
        // Layer 3 (surface): subtitle — 6% of cursor delta
        subtXTo(nx * window.innerWidth * 0.06)
      }
      const onMouseLeave = () => {
        if (!sequenceDone) return
        gsap.to(bikeRef.current,      { rotateX: 0, rotateY: 0, duration: 1.4, ease: 'power2.out' })
        gsap.to(decorTextRef.current, { x: 0,                   duration: 1.2, ease: 'power2.out' })
        gsap.to(subtitleRef.current,  { x: 0,                   duration: 0.8, ease: 'power2.out' })
      }
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseleave', onMouseLeave)

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseleave', onMouseLeave)
      }
    },
    { scope: containerRef }
  )

  const stats = [
    { num: '47',     label: locale === 'fr' ? 'Modèles'   : 'Models'    },
    { num: 'Ti & C', label: locale === 'fr' ? 'Matériaux' : 'Materials' },
    { num: '2019',   label: 'Est.'                                       },
  ]

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: '100svh', overflow: 'visible' }}
    >
      {/* Logo watermark — starts far left, same animation as COMPANO text */}
      <div
        ref={decorTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none hidden md:flex"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <Image
          src="/logo_black.png"
          alt=""
          width={1800}
          height={400}
          className="object-contain"
          style={{ width: '82vw', opacity: 0.06, userSelect: 'none' }}
          draggable={false}
          priority
        />
      </div>

      {/* Main content */}
      <div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 h-full flex items-center"
        style={{ paddingTop: '72px' }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">

          {/* Left — text */}
          <div className="lg:mt-[10vh]">
            {/* line1 — overflow:hidden clip for editorial translateY reveal */}
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <h1
                ref={line1Ref}
                className="font-condensed uppercase text-brand-black"
                style={{
                  fontSize: 'clamp(56px, 7.5vw, 120px)', lineHeight: '0.9',
                  transform: 'translateY(105%)', opacity: 0,
                }}
              >
                {t('line1')}
              </h1>
            </div>

            {/* line2 — same editorial reveal, begins when line1 is 60% complete */}
            <div style={{ display: 'block', overflow: 'hidden' }}>
              <h1
                ref={line2Ref}
                className="font-condensed uppercase text-orange mb-8"
                style={{
                  fontSize: 'clamp(56px, 7.5vw, 120px)', lineHeight: '0.9',
                  transform: 'translateY(105%)', opacity: 0,
                }}
              >
                {t('line2')}
              </h1>
            </div>

            {/* Subtitle — whisper: opacity + y, no clip */}
            <p
              ref={subtitleRef}
              className="font-sans font-light text-brand-black/50 text-[15px] lg:text-[17px] leading-[1.75] max-w-[400px] mb-8"
              style={{ opacity: 0 }}
            >
              {t('subtitle')}
            </p>

            {/* CTAs — each button draws itself from left edge, signature gesture */}
            <div ref={ctasRef} className="flex flex-wrap gap-4 mb-10">
              <Link
                href={`${prefix}/modeles`}
                className="inline-flex items-center px-7 h-12 bg-orange text-white font-sans text-[12px] tracking-[0.22em] uppercase font-medium hover:bg-brand-black transition-colors duration-300"
                style={{ transformOrigin: 'left center' }}
              >
                {t('cta_primary')}
              </Link>
              <Link
                href={`${prefix || '/'}#detaillants`}
                className="inline-flex items-center px-7 h-12 border border-brand-black/20 text-brand-black font-sans text-[12px] tracking-[0.22em] uppercase font-medium hover:border-orange hover:text-orange transition-colors duration-300"
                style={{ transformOrigin: 'left center' }}
              >
                {t('cta_secondary')}
              </Link>
            </div>

            {/* Stats — arrive with quiet confidence */}
            <div ref={statsRef} className="flex items-stretch gap-0 border-t border-brand-black/8 pt-7">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`stat-item flex-1 ${i > 0 ? 'pl-6 border-l border-brand-black/8' : 'pr-6'}`}
                  style={{ opacity: 0 }}
                >
                  <div className="font-condensed text-[28px] text-brand-black leading-none">{stat.num}</div>
                  <div className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-black/30 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — bike, hidden on lg+ (handled by GSAP scroll), visible as static on mobile */}
          <div
            ref={bikeRef}
            className="hero-bike hidden lg:block"
            style={{ opacity: 0, position: 'relative' }}
          >
            {/* Orange glow — surface warms as bike nears, breathes at idle */}
            <div
              ref={bikeGlowRef}
              style={{
                position: 'absolute',
                inset: '10% 5%',
                background: 'radial-gradient(ellipse at 60% 55%, rgba(255,90,0,0.18) 0%, transparent 68%)',
                filter: 'blur(32px)',
                pointerEvents: 'none',
                opacity: 0,
                zIndex: 0,
              }}
            />

            {/* Float wrapper — idle float targets this */}
            <div ref={bikeFloatRef} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                position: 'relative',
                width: '125%',
                marginLeft: '-12%',
                marginTop: '-10%',
              }}>
                <Image
                  src="/image_no_bg.png"
                  alt="Compano FZ3+"
                  width={720}
                  height={540}
                  className="object-contain w-full"
                  style={{
                    filter: 'contrast(1.06) saturate(1.08) drop-shadow(0 36px 56px rgba(0,0,0,0.18)) drop-shadow(0 8px 16px rgba(255,90,0,0.08))',
                  }}
                  priority
                />
              </div>

              {/* Wheel shadow — materializes on landing, inverse-coupled to float */}
              <div
                ref={bikeShadowRef}
                style={{
                  position: 'absolute',
                  bottom: '6%',
                  left: '18%',
                  width: '60%',
                  height: 28,
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(10px)',
                  pointerEvents: 'none',
                  transformOrigin: 'center center',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — fades with dignity in the stillness phase */}
      <div
        ref={scrollIndRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-brand-black/30 font-medium">
          {t('scroll')}
        </span>
        <div className="w-px h-10 bg-orange animate-scroll-pulse" />
      </div>
    </section>
  )
}
