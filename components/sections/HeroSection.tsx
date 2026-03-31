'use client'

import { useRef, useEffect, useState } from 'react'
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
  const line1Ref      = useRef<HTMLDivElement>(null)
  const line2Ref      = useRef<HTMLDivElement>(null)
  const subtitleRef   = useRef<HTMLParagraphElement>(null)
  const ctasRef       = useRef<HTMLDivElement>(null)
  const statsRef      = useRef<HTMLDivElement>(null)
  const bikeRef       = useRef<HTMLDivElement>(null)
  const bikeFloatRef  = useRef<HTMLDivElement>(null)
  const bikeShadowRef = useRef<HTMLDivElement>(null)
  const bikeGlowRef   = useRef<HTMLDivElement>(null)
  const scrollIndRef  = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  const prefix = locale === 'en' ? '/en' : ''

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 80) setScrolled(true) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      // Decorative COMPANO — starts at x: +100, glides slowly left
      tl.fromTo(decorTextRef.current,
        { x: 100 },
        { x: 0, duration: 2.8, ease: 'power1.out' },
        0
      )

      // RIDE — from left, synchronized with bike coming from right
      tl.fromTo(line1Ref.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2 },
        0.25
      )

      // BEYOND — 150ms after RIDE
      tl.fromTo(line2Ref.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2 },
        0.4
      )

      // Subtitle
      tl.fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.8
      )

      // CTAs
      tl.fromTo(ctasRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        0.95
      )

      // Stats stagger
      const statItems = statsRef.current?.querySelectorAll('.stat-item') ?? []
      tl.fromTo(statItems,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        1.1
      )

      // Bike — x: +300, rotate: -3° → 0°, expo.out 1.2s (launches toward text)
      tl.fromTo(bikeRef.current,
        { x: 300, rotation: -3, opacity: 0 },
        { x: 0, rotation: 0, opacity: 1, duration: 1.2 },
        0.15
      )

      // Wheel shadow — scales from 0 simultaneously with bike landing
      tl.fromTo(bikeShadowRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.2, ease: 'expo.out' },
        0.15
      )

      // Parallax — bike floats up (moves at ~70% of page speed → appears to lag)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (bikeRef.current) {
            gsap.set(bikeRef.current, { y: self.progress * -window.innerHeight * 0.35 })
          }
        },
      })

      // Parallax — COMPANO sinks downward (opposite direction = depth)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (decorTextRef.current) {
            gsap.set(decorTextRef.current, { y: self.progress * window.innerHeight * 0.18 })
          }
        },
      })

      // Floating loop — starts after entrance (1.6s delay)
      gsap.to(bikeFloatRef.current, {
        y: -20,
        rotation: 0.8,
        duration: 2.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      })

      // Shadow pulse — shrinks when bike is high, expands when it lands
      gsap.to(bikeShadowRef.current, {
        scaleX: 0.62,
        opacity: 0.35,
        duration: 2.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      })

      // Glow pulse — orange halo breathes
      gsap.to(bikeGlowRef.current, {
        opacity: 0.55,
        scale: 1.08,
        duration: 2.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      })

      // Mouse tilt — subtle 3-D rotation following cursor
      const onMouseMove = (e: MouseEvent) => {
        const { innerWidth: W, innerHeight: H } = window
        const rx = ((e.clientY / H) - 0.5) * -8   // -4° → +4°
        const ry = ((e.clientX / W) - 0.5) * 12   // -6° → +6°
        gsap.to(bikeRef.current, {
          rotateX: rx,
          rotateY: ry,
          duration: 1.2,
          ease: 'power2.out',
          transformPerspective: 900,
          transformOrigin: 'center center',
        })
      }
      const onMouseLeave = () => {
        gsap.to(bikeRef.current, {
          rotateX: 0,
          rotateY: 0,
          duration: 1.4,
          ease: 'power2.out',
        })
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
    { num: '47',   label: locale === 'fr' ? 'Modèles'   : 'Models'    },
    { num: 'Ti & C', label: locale === 'fr' ? 'Matériaux' : 'Materials' },
    { num: '2019', label: 'Est.'                                        },
  ]

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ minHeight: '100svh', height: '100svh', overflow: 'visible' }}
    >
      {/* Decorative "COMPANO" watermark — parallax background */}
      <div
        ref={decorTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden hidden md:flex"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <span
          className="font-condensed uppercase whitespace-nowrap"
          style={{ fontSize: '18vw', color: '#F0F0F0', lineHeight: 1, userSelect: 'none' }}
        >
          COMPANO
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 h-full flex items-center" style={{ paddingTop: '72px' }}>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">

          {/* Left — text */}
          <div>
            <div ref={line1Ref} style={{ opacity: 0 }}>
              <h1
                className="font-condensed uppercase text-brand-black"
                style={{ fontSize: 'clamp(72px, 10vw, 148px)', lineHeight: '0.9' }}
              >
                {t('line1')}
              </h1>
            </div>

            <div ref={line2Ref} style={{ opacity: 0 }}>
              <h1
                className="font-condensed uppercase text-orange mb-8"
                style={{ fontSize: 'clamp(72px, 10vw, 148px)', lineHeight: '0.9' }}
              >
                {t('line2')}
              </h1>
            </div>

            <p
              ref={subtitleRef}
              className="font-sans font-light text-brand-black/50 text-[15px] lg:text-[17px] leading-[1.75] max-w-[400px] mb-8"
              style={{ opacity: 0 }}
            >
              {t('subtitle')}
            </p>

            <div ref={ctasRef} className="flex flex-wrap gap-4 mb-10" style={{ opacity: 0 }}>
              <Link
                href={`${prefix}/modeles`}
                className="inline-flex items-center px-7 h-12 bg-orange text-white font-sans text-[12px] tracking-[0.22em] uppercase font-medium hover:bg-brand-black transition-colors duration-300"
              >
                {t('cta_primary')}
              </Link>
              <Link
                href={`${prefix || '/'}#detaillants`}
                className="inline-flex items-center px-7 h-12 border border-brand-black/20 text-brand-black font-sans text-[12px] tracking-[0.22em] uppercase font-medium hover:border-orange hover:text-orange transition-colors duration-300"
              >
                {t('cta_secondary')}
              </Link>
            </div>

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

          {/* Right — bike overflows frame at top and right */}
          <div
            ref={bikeRef}
            className="hero-bike hidden lg:block"
            style={{ opacity: 0, position: 'relative' }}
          >
            {/* Orange glow — behind the bike */}
            <div
              ref={bikeGlowRef}
              style={{
                position: 'absolute',
                inset: '10% 5%',
                background: 'radial-gradient(ellipse at 60% 55%, rgba(255,90,0,0.18) 0%, transparent 68%)',
                filter: 'blur(32px)',
                pointerEvents: 'none',
                opacity: 0.35,
                zIndex: 0,
              }}
            />

            {/* Float wrapper — GSAP float loop targets this div */}
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
                  style={{ filter: 'contrast(1.06) saturate(1.08) drop-shadow(0 36px 56px rgba(0,0,0,0.18)) drop-shadow(0 8px 16px rgba(255,90,0,0.08))' }}
                  priority
                />
              </div>

              {/* Wheel shadow — pulses in sync with float */}
              <div
                ref={bikeShadowRef}
                style={{
                  position: 'absolute',
                  bottom: '6%',
                  left: '18%',
                  width: '60%',
                  height: 28,
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, transparent 70%)',
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

      {/* Scroll indicator */}
      {!scrolled && (
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
      )}
    </section>
  )
}
