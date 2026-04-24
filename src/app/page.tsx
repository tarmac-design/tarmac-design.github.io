'use client';

/* eslint-disable @next/next/no-img-element */
import { useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const foundations = [
  { title: 'Colors', desc: 'A 3-layer color architecture — Core, Semantic, and Usage tokens.', href: '/foundations/colors' },
  { title: 'Typography', desc: 'Noto Sans type system with clear hierarchy for readability.', href: '/foundations/typography' },
  { title: 'Iconography', desc: 'Consistent icon system — 24px default, 1.5px stroke weight.', href: '/foundations/iconography' },
  { title: 'Grid', desc: 'Responsive 12-column grid with breakpoint-aware layouts.', href: '/foundations/grid-system' },
];

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
  const [showYou, setShowYou] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current || !glowRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Glow on pattern
    glowRef.current.style.maskImage = `radial-gradient(300px circle at ${x}px ${y}px, black 0%, transparent 70%)`;
    (glowRef.current.style as unknown as Record<string, string>)['webkitMaskImage'] = `radial-gradient(300px circle at ${x}px ${y}px, black 0%, transparent 70%)`;
    glowRef.current.style.opacity = '1';

    // Move "You" cursor
    if (youCursorRef.current) {
      youCursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
    if (!showYou) setShowYou(true);
  }, [showYou]);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
    setShowYou(false);
  }, []);

  return (
    <div>
      {/* Hero — Delhivery Red */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden"
        style={{ background: theme === 'dark' ? '#000000' : '#F0F0F0', minHeight: '100vh', display: 'flex', alignItems: 'center', cursor: 'none' }}
      >
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: theme === 'dark'
            ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`,
        }} />
        {/* Mouse glow — 20% near cursor */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: 0,
            backgroundImage: theme === 'dark'
              ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* "You" cursor — follows user's mouse */}
        <div
          ref={youCursorRef}
          className="absolute top-0 left-0 pointer-events-none z-30 hidden sm:flex flex-col items-start transition-opacity duration-150"
          style={{ opacity: showYou ? 1 : 0, willChange: 'transform' }}
        >
          <svg width="22" height="26" viewBox="0 0 16 20" fill="none">
            <path d="M0 0L16 12L8 12L4 20L0 0Z" fill="#CF9F02"/>
          </svg>
          <span
            className="px-3 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap shadow-lg -mt-1 ml-3"
            style={{ background: '#CF9F02', color: '#000', border: '2px solid rgba(255,255,255,0.25)' }}
          >
            You
          </span>
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28 w-full z-20">
          <div className="relative">
            {/* Animated multiplayer cursors — positioned in corners away from text */}
            {[
              { name: 'Abhishek', color: '#ED1B36', pos: { top: '-100px', left: '-10%' }, anim: 'cursorFloat1 16s ease-in-out infinite' },
              { name: 'Rohan', color: '#2396FB', pos: { top: '-50px', right: '0%' }, anim: 'cursorFloat2 20s ease-in-out infinite' },
              { name: 'Abhijeet', color: '#1BA86E', pos: { bottom: '-50px', right: '20%' }, anim: 'cursorFloat3 18s ease-in-out infinite' },
              { name: 'Arpith', color: '#A855F7', pos: { top: '-90px', left: '22%' }, anim: 'cursorFloat4 22s ease-in-out infinite' },
            ].map((c) => (
              <div key={c.name} className="absolute pointer-events-none hidden sm:flex flex-col items-start" style={{ ...c.pos, animation: c.anim }}>
                <svg width="20" height="24" viewBox="0 0 16 20" fill="none">
                  <path d="M0 0L16 12L8 12L4 20L0 0Z" fill={c.color}/>
                </svg>
                <span
                  className="px-3 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap shadow-lg -mt-1 ml-3"
                  style={{ background: c.color, color: '#fff', border: '2px solid rgba(255,255,255,0.25)' }}
                >
                  {c.name}
                </span>
              </div>
            ))}

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]"
              style={{ color: theme === 'dark' ? '#FFFFFF' : '#0D0D0D' }}>
              Build great experiences<br />
              with <span style={{ color: '#ED1B36' }}>TARMAC</span>
            </h1>
          </div>
          <p className="text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
            style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)' }}>
            Delhivery&apos;s unified design system — the single source of truth for design decisions, UI components, and interaction patterns.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about/overview"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{ background: '#ED1B36', color: '#FFFFFF' }}
            >
              Get started <ArrowRight size={16} />
            </Link>
            <Link
              href="/components/button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors border"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)',
              }}
            >
              Browse components
            </Link>
          </div>
        </div>
      </section>

      {/* Foundation highlights */}
      <section>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {foundations.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group p-5 rounded-2xl border transition-all duration-200 hover:shadow-md card-hover"
                style={{ borderColor: 'var(--color-outline)' }}
              >
                <h3 className="font-semibold text-base mb-1.5" style={{ color: 'var(--color-on-surface)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 my-0"><hr className="my-0" style={{ borderColor: 'var(--color-outline)', borderWidth: 0, borderTopWidth: '1px' }} /></div>

      {/* Discover the system — card grid like Atlassian */}
      <section>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-on-surface)' }}>
            Discover the system
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--color-on-surface-variant)' }}>
            Everything you need to design and build with TARMAC.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemCards.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group relative p-6 rounded-2xl border transition-all duration-200 hover:shadow-md card-hover"
                style={{ borderColor: 'var(--color-outline)' }}
              >
                <h3 className="font-semibold text-base mb-1.5" style={{ color: 'var(--color-on-surface)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>{s.desc}</p>
                <ArrowRight size={14} className="absolute top-6 right-6 transition-all group-hover:translate-x-0.5" style={{ color: 'var(--color-outline-variant)' }} />
              </Link>
            ))}
          </div>

          {/* Divider */}
          <hr className="my-12" style={{ borderColor: 'var(--color-outline)', borderWidth: 0, borderTopWidth: '1px' }} />

          {/* What TARMAC provides */}
          <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-on-surface)' }}>
            What TARMAC provides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container)' }}>
              <div className="text-2xl mb-3">🎨</div>
              <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--color-on-surface)' }}>Figma Library</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                Complete component library with variants, auto-layout, and design tokens baked in.
              </p>
            </div>
            <div className="p-6 rounded-2xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container)' }}>
              <div className="text-2xl mb-3">⚛️</div>
              <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--color-on-surface)' }}>React Components</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                TypeScript-first with built-in accessibility, theming support, and comprehensive docs.
              </p>
            </div>
            <div className="p-6 rounded-2xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container)' }}>
              <div className="text-2xl mb-3">♿</div>
              <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--color-on-surface)' }}>Accessible</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                WCAG 2.1 AA compliant with keyboard navigation and screen reader support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section style={{ background: 'var(--color-surface-container-low)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-on-surface)' }}>
            Designing the future of Delhivery
          </h2>
          <p className="text-base mb-10" style={{ color: 'var(--color-on-surface-variant)' }}>
            Meet the team crafting every pixel and interaction behind TARMAC — Delhivery&apos;s design system.
          </p>
          {/* Team photo */}
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
        </div>
      </section>

      {/* Life at Delhivery — fun activities grid */}
      <section>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--color-on-surface)' }}>
            Life at Delhivery
          </h2>
          <p className="text-base mb-10 max-w-2xl" style={{ color: 'var(--color-on-surface-variant)' }}>
            We work hard and have fun doing it. Here&apos;s a glimpse of our journey together.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
            {[
              { src: '/assets/images/fun-1.jpg', caption: 'Brainstorming' },
              { src: '/assets/images/fun-2.jpg', caption: 'Friday Night Out' },
              { src: '/assets/images/fun-3.jpg', caption: 'Design Review' },
              { src: '/assets/images/fun-4.jpg', caption: 'After Hours' },
              { src: '/assets/images/fun-5.jpg', caption: 'Crew Night' },
              { src: '/assets/images/fun-6.jpg', caption: 'Late Night Hustle' },
            ].map((item) => (
              <div
                key={item.src}
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
                {/* Caption overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3 text-left"
                  style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}
                >
                  <span className="text-sm font-semibold text-white">{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Leadership — Arpith quote */}
      <section style={{ background: 'var(--color-surface-container-low)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Photo */}
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
            {/* Quote */}
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
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
          <div className="flex flex-wrap justify-between gap-8">
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
                  <li><Link href="/components/button" className="hover:underline">Components</Link></li>
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
          <div className="mt-8 pt-4 border-t text-sm" style={{ borderColor: 'var(--color-outline)', color: 'var(--color-on-surface-variant)' }}>
            © {new Date().getFullYear()} Delhivery Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
