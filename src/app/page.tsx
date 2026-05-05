'use client';

/* eslint-disable @next/next/no-img-element */
import { useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { GrainOverlay } from '@/components/GrainOverlay';
import { motion, useInView } from 'motion/react';

/* ── Reusable scroll-triggered fade-in wrapper ── */
function FadeIn({ children, delay = 0, className = '', y = 30 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const systemCards = [
  { title: 'Foundations', desc: 'Colors, typography, spacing, grid, iconography — the building blocks.', href: '/foundations/colors' },
  { title: 'Components', desc: '43+ production-ready UI components with live Storybook demos.', href: '/components/button' },
  { title: 'Accessibility', desc: 'WCAG guidelines, keyboard nav, screen readers, and testing.', href: '/accessibility/overview' },
  { title: 'Patterns', desc: 'Layout and form composition patterns for consistent UIs.', href: '/patterns/layout' },
  { title: 'Tokens', desc: 'Design tokens as CSS variables and JS constants.', href: '/foundations/colors-implementation' },
  { title: 'Get started', desc: 'Installation, quick start, and integration guides.', href: '/about/overview' },
];

export default function Home() {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const youCursorRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [showYou, setShowYou] = useState(false);

  const handleHeroMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current || !glowRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.maskImage = `radial-gradient(300px circle at ${x}px ${y}px, black 0%, transparent 70%)`;
    (glowRef.current.style as unknown as Record<string, string>)['webkitMaskImage'] = `radial-gradient(300px circle at ${x}px ${y}px, black 0%, transparent 70%)`;
    glowRef.current.style.opacity = '1';
  }, []);

  const handleHeroMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  const handlePageMouseMove = useCallback((e: React.MouseEvent) => {
    if (youCursorRef.current) {
      youCursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
    if (!showYou) setShowYou(true);
  }, [showYou]);

  const handlePageMouseLeave = useCallback(() => {
    setShowYou(false);
  }, []);

  return (
    <div
      ref={pageRef}
      onMouseMove={handlePageMouseMove}
      onMouseLeave={handlePageMouseLeave}
      style={{ cursor: 'none' }}
    >
      {/* Spinning disc cursor — fixed, follows mouse across entire page */}
      <div
        ref={youCursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[60] hidden sm:flex items-center justify-center transition-opacity duration-150"
        style={{ opacity: showYou ? 1 : 0, willChange: 'transform', marginLeft: '-45px', marginTop: '-45px' }}
      >
        <div style={{ width: 90, height: 90, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(60, 10, 10, 0.9)' }} />
          <svg width="90" height="90" viewBox="0 0 90 90" style={{ position: 'absolute', inset: 0, animation: 'spinDisc 8s linear infinite' }}>
            <defs>
              <path id="discPath" d="M 45,45 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
            </defs>
            <text fontSize="9" fontWeight="400" letterSpacing="5.8" fill="rgba(255,255,255,0.85)" fontFamily="'Noto Sans', sans-serif" textLength="226" lengthAdjust="spacing">
              <textPath href="#discPath" startOffset="0%">DISCOVER • DESIGN • BUILD • </textPath>
            </text>
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 6, height: 6, borderRadius: '50%', background: '#ED1B36' }} />
        </div>
      </div>

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative overflow-hidden"
        style={{ background: theme === 'dark' ? '#0A0A0A' : '#F7F7F7', minHeight: '100vh', display: 'flex', alignItems: 'center', cursor: 'none' }}
      >
        <img src="/assets/images/road-texture.jpg" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0" style={{
          background: theme === 'dark'
            ? 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.4) 100%)'
            : 'rgba(247,247,247,0.99)',
        }} />
        <GrainOverlay opacity={0.15} blendMode="overlay" size={3} type="film" />
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: theme === 'dark'
            ? `radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)`
            : `radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`,
        }} />
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: 0,
            backgroundImage: theme === 'dark'
              ? `radial-gradient(circle, rgba(255,255,255,0.6) 1.5px, transparent 1.5px)`
              : `radial-gradient(circle, rgba(0,0,0,0.25) 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />
        {/* Hero content — animated */}
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28 w-full z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]"
              style={{ color: theme === 'dark' ? '#FFFFFF' : '#0D0D0D' }}>
              Build great experiences<br />
              with <span style={{ color: '#ED1B36' }}>TARMAC</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
            style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Delhivery&apos;s unified design system — the single source of truth for design decisions, UI components, and interaction patterns.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/about/overview"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{ background: '#ED1B36', color: '#FFFFFF' }}
            >
              Get started <ArrowRight size={16} />
            </Link>
            <Link
              href="/components/accordion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#000000'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)'; e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'; }}
            >
              Browse components
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ DISCOVER THE SYSTEM ═══════════ */}
      <section>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-on-surface)' }}>
              Discover the system
            </h2>
            <p className="text-base mb-8" style={{ color: 'var(--color-on-surface-variant)' }}>
              Everything you need to design and build with TARMAC.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemCards.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <Link
                  href={s.href}
                  className="group relative p-6 rounded-2xl border transition-all duration-200 hover:shadow-md card-hover block"
                  style={{ borderColor: 'var(--color-outline)' }}
                >
                  <h3 className="font-semibold text-base mb-1.5" style={{ color: 'var(--color-on-surface)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>{s.desc}</p>
                  <ArrowRight size={14} className="absolute top-6 right-6 transition-all group-hover:translate-x-0.5" style={{ color: 'var(--color-outline-variant)' }} />
                </Link>
              </FadeIn>
            ))}
          </div>

          <hr className="my-12" style={{ borderColor: 'var(--color-outline)', borderWidth: 0, borderTopWidth: '1px' }} />

          <FadeIn>
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-on-surface)' }}>
              What TARMAC provides
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🎨', title: 'Figma Library', desc: 'Complete component library with variants, auto-layout, and design tokens baked in.' },
              { emoji: '⚛️', title: 'React Components', desc: 'TypeScript-first with built-in accessibility, theming support, and comprehensive docs.' },
              { emoji: '♿', title: 'Accessible', desc: 'WCAG 2.1 AA compliant with keyboard navigation and screen reader support.' },
            ].map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl border h-full" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container)' }}>
                  <div className="text-2xl mb-3">{card.emoji}</div>
                  <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--color-on-surface)' }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TEAM SECTION ═══════════ */}
      <section style={{ background: 'var(--color-surface-container-low)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-on-surface)' }}>
              Designing the future of Delhivery
            </h2>
            <p className="text-base mb-10" style={{ color: 'var(--color-on-surface-variant)' }}>
              Meet the team crafting every pixel and interaction behind TARMAC — Delhivery&apos;s design system.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div
              className="rounded-2xl overflow-hidden border-2 mx-auto"
              style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container)' }}
            >
              <img
                src="/assets/images/team-photo.jpg"
                alt="TARMAC Design System Team"
                className="w-full object-cover transition-all duration-500 grayscale hover:grayscale-0"
                style={{ minHeight: '420px' }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.placeholder-icon')) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'placeholder-icon flex flex-col items-center justify-center w-full gap-3';
                    placeholder.style.cssText = 'min-height: 420px; padding: 2rem;';
                    placeholder.innerHTML = `
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="color: var(--color-outline-variant)">
                        <circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M21 21v-1a4 4 0 0 0-3-3.87"/><path d="M13 21v-2a5 5 0 0 0-10 0v2"/>
                      </svg>
                      <span style="font-size: 12px; color: var(--color-outline-variant)">Team photo</span>
                      <span style="font-size: 10px; color: var(--color-outline-variant); font-family: monospace">/assets/images/team-photo.jpg</span>
                    `;
                    parent.appendChild(placeholder);
                  }
                }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ LIFE AT DELHIVERY ═══════════ */}
      <section>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-on-surface)' }}>
              Life at Delhivery
            </h2>
            <p className="text-base mb-10 max-w-2xl" style={{ color: 'var(--color-on-surface-variant)' }}>
              We work hard and have fun doing it. Here&apos;s a glimpse of our journey together.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
            {[
              { src: '/assets/images/fun-1.jpg', caption: 'Brainstorming' },
              { src: '/assets/images/fun-2.jpg', caption: 'Friday Night Out' },
              { src: '/assets/images/fun-3.jpg', caption: 'Design Review' },
              { src: '/assets/images/fun-4.jpg', caption: 'After Hours' },
              { src: '/assets/images/fun-5.jpg', caption: 'Crew Night' },
              { src: '/assets/images/fun-6.jpg', caption: 'Behind the Scene' },
            ].map((item, i) => (
              <FadeIn key={item.src} delay={i * 0.08}>
                <div
                  className="group relative rounded-2xl overflow-hidden border-2 aspect-square"
                  style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container)' }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.placeholder-icon')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'placeholder-icon flex flex-col items-center justify-center w-full h-full gap-2';
                        placeholder.innerHTML = `
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="color: var(--color-outline-variant)">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                          </svg>
                          <span style="font-size: 11px; color: var(--color-outline-variant)">${item.caption}</span>
                          <span style="font-size: 9px; color: var(--color-outline-variant); font-family: monospace">${item.src}</span>
                        `;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3 text-left"
                    style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}
                  >
                    <span className="text-sm font-semibold text-white">{item.caption}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ DESIGN LEADERSHIP ═══════════ */}
      <section style={{ background: 'var(--color-surface-container-low)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="shrink-0 group">
                <div
                  className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2"
                  style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container)' }}
                >
                  <img
                    src="/assets/images/arpith-portrait.jpg"
                    alt="Arpith — Head of Design, Delhivery"
                    className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.placeholder-icon')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'placeholder-icon flex flex-col items-center justify-center w-full h-full gap-2';
                        placeholder.innerHTML = `
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="color: var(--color-outline-variant)">
                            <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
                          </svg>
                          <span style="font-size: 10px; color: var(--color-outline-variant); font-family: monospace">/assets/images/arpith-portrait.jpg</span>
                        `;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-4xl font-bold mb-4" style={{ color: 'var(--color-on-surface)', opacity: 0.15 }}>&ldquo;</div>
                <blockquote
                  className="text-xl sm:text-2xl md:text-[1.75rem] font-bold leading-snug mb-6 -mt-6"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  A design system isn&apos;t just a library of components — it&apos;s a shared language that unites design and engineering to deliver consistent, delightful experiences at scale.
                </blockquote>
                <div>
                  <p className="font-semibold text-base" style={{ color: 'var(--color-on-surface)' }}>Arpith</p>
                  <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>Head of Design, Delhivery</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-8">
            <div className="max-w-sm">
              <div className="mb-3">
                <img
                  src="/tarmac-logo-light.svg"
                  alt="TARMAC Design System"
                  className={theme === 'light' ? 'block' : 'hidden'}
                  style={{ height: '24px', width: 'auto' }}
                />
                <img
                  src="/tarmac-logo-dark.svg"
                  alt="TARMAC Design System"
                  className={theme === 'dark' ? 'block' : 'hidden'}
                  style={{ height: '24px', width: 'auto' }}
                />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                Delhivery&apos;s unified design system — the single source of truth for design decisions, UI components, and interaction patterns.
              </p>
            </div>
            <div className="flex gap-10 text-sm">
              <div>
                <p className="font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>Design system</p>
                <ul className="space-y-2" style={{ color: 'var(--color-on-surface-variant)' }}>
                  <li><Link href="/about/overview" className="hover:underline">Get started</Link></li>
                  <li><Link href="/foundations/colors" className="hover:underline">Foundations</Link></li>
                  <li><Link href="/components/accordion" className="hover:underline">Components</Link></li>
                  <li><Link href="/accessibility/overview" className="hover:underline">Accessibility</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>Resources</p>
                <ul className="space-y-2" style={{ color: 'var(--color-on-surface-variant)' }}>
                  <li><a href="https://www.delhivery.com" target="_blank" rel="noopener noreferrer" className="hover:underline">delhivery.com</a></li>
                  <li><a href="https://github.com/abhishekthakur3-sketch/TDS" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></li>
                  <li><a href="https://www.figma.com/design/fPg3J4ckTHzyIQp8PrqDjT" target="_blank" rel="noopener noreferrer" className="hover:underline">Figma</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2" style={{ borderColor: 'var(--color-outline)', color: 'var(--color-on-surface-variant)' }}>
            <span>© {new Date().getFullYear()} Delhivery Ltd. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Crafted with <span className="inline-block" style={{ animation: 'heartPulse 2s ease-in-out infinite', color: '#ED1B36' }}>&#10084;</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
