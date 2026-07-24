'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'motion/react';

/* ── Scroll-triggered fade-in ── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated counter ── */
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {inView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value.toLocaleString()}{suffix}
        </motion.span>
      ) : '0'}
    </motion.span>
  );
}

/* ── Grain/noise texture overlay ── */
function GrainOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }} />
  );
}

/* ── Animated floating geometric shapes ── */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[0] overflow-hidden">
      {/* Dotted arc top-right */}
      <motion.svg className="absolute" style={{ top: '5%', right: '5%', opacity: 0.04 }} width="200" height="200" viewBox="0 0 200 200"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
      </motion.svg>
      {/* Rectangular bar */}
      <motion.div
        className="absolute"
        style={{ width: 120, height: 2, top: '60%', right: '10%', background: 'rgba(255,255,255,0.03)', borderRadius: 2 }}
        animate={{ x: [0, 30, 0], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ── Horizontal scroll card showcase ── */
function HorizontalScrollCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  const cards = [
    { title: 'Button', desc: 'Primary, secondary, outline, ghost variants with loading states', color: '#ED1B36' },
    { title: 'Input', desc: 'Text fields, dropdowns, search with validation and addons', color: '#333' },
    { title: 'Card', desc: 'Content containers with media, actions, and selection states', color: '#1a1a1a' },
    { title: 'Dialog', desc: 'Modal overlays for confirmations, forms, and alerts', color: '#222' },
    { title: 'Avatar', desc: 'User representations with initials, images, and status dots', color: '#1B1D22' },
    { title: 'Badge', desc: '9 color themes with filled, outlined, and cardbox styles', color: '#2a2a2a' },
    { title: 'Tabs', desc: 'Horizontal navigation with icons, badges, and underline styles', color: '#1a1a1a' },
    { title: 'Tooltip', desc: 'Rich content tooltips with titles, actions, and positioning', color: '#222' },
  ];

  return (
    <section ref={containerRef} className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 mb-12">
        <FadeUp>
          <p className="text-sm font-medium text-red-400 mb-4 tracking-wide">SHOWCASE</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Components in action.</h2>
        </FadeUp>
      </div>
      <motion.div style={{ x }} className="flex gap-4 px-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="shrink-0 w-60 sm:w-72 p-5 sm:p-6 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300 group"
            style={{ background: card.color + '20' }}
          >
            <div className="w-full h-32 rounded-lg mb-4 flex items-center justify-center" style={{ background: card.color }}>
              <span className="text-2xl font-bold text-white/20">{card.title[0]}</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-1">{card.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ── Before/After parallax section ── */
function BeforeAfterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const beforeY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const afterY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        <FadeUp>
          <p className="text-sm font-medium text-red-400 mb-4 tracking-wide">IMPACT</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16">Before and after TARMAC.</h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <motion.div style={{ y: beforeY }} className="relative">
            <div className="p-6 rounded-xl border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <span className="text-xs text-white/40 uppercase tracking-wider">Before</span>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-3/4 rounded bg-white/5" />
                <div className="h-3 w-1/2 rounded bg-white/5" />
                <div className="flex gap-2 mt-4">
                  <div className="h-8 w-20 rounded bg-white/5" />
                  <div className="h-8 w-20 rounded bg-red-500/10 border border-red-500/20" />
                  <div className="h-8 w-24 rounded bg-white/5" />
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="h-8 w-16 rounded bg-white/5" />
                  <div className="h-8 w-28 rounded bg-white/5" />
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-xs text-white/30">Inconsistent button styles</p>
                <p className="text-xs text-white/30">Multiple color definitions</p>
                <p className="text-xs text-white/30">No shared design tokens</p>
              </div>
            </div>
          </motion.div>

          {/* After */}
          <motion.div style={{ y: afterY }} className="relative">
            <div className="p-6 rounded-xl border border-red-500/20" style={{ background: 'rgba(237,27,54,0.03)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-white/40 uppercase tracking-wider">After TARMAC</span>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-3/4 rounded bg-white/10" />
                <div className="h-3 w-1/2 rounded bg-white/10" />
                <div className="flex gap-2 mt-4">
                  <div className="h-8 w-20 rounded bg-red-500/30 border border-red-500/40" />
                  <div className="h-8 w-20 rounded bg-white/10 border border-white/15" />
                  <div className="h-8 w-24 rounded bg-white/5 border border-white/10" />
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-xs text-green-400/70">Unified component library</p>
                <p className="text-xs text-green-400/70">Single token source of truth</p>
                <p className="text-xs text-green-400/70">100% brand consistency</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <FadeUp delay={0.2}>
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto text-center">
            <div>
              <p className="text-2xl font-bold text-red-400">40%</p>
              <p className="text-xs text-white/30 mt-1">Less dev time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-400">60%</p>
              <p className="text-xs text-white/30 mt-1">Faster designs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-400">100%</p>
              <p className="text-xs text-white/30 mt-1">Consistency</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="landing-page relative" style={{ background: '#0a0a0a', color: '#ededed', overflowX: 'hidden', maxWidth: '100vw' }}>
      {/* Grain texture overlay */}
      <GrainOverlay />
      {/* Floating animated shapes */}
      <FloatingShapes />

      {/* ═══════ HERO ═══════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 overflow-hidden"
      >
        {/* Radial gradient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(237, 27, 54, 0.12) 0%, transparent 60%)',
        }} />

        {/* Grid lines background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-white/60">V 1.1.2 — Latest Release</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
            <span className="block">Build faster.</span>
            <span className="block" style={{ color: '#ED1B36' }}>Ship consistent.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            TARMAC is Delhivery&apos;s design system — 62+ components, design tokens, and accessibility standards. One source of truth for every product.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/components/button"
              className="px-6 py-3 rounded-lg font-medium text-sm text-white transition-all hover:scale-105"
              style={{ background: '#ED1B36' }}
            >
              Browse Components
            </Link>
            <Link
              href="/foundations/colors"
              className="px-6 py-3 rounded-lg font-medium text-sm text-white/80 border border-white/15 hover:border-white/30 transition-all hover:bg-white/5"
            >
              Explore Foundations
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.section>

      {/* ═══════ METRICS BAR ═══════ */}
      <section className="relative border-y border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-6xl mx-auto px-5 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 62, suffix: '+', label: 'Components' },
            { value: 1284, suffix: '', label: 'Design Tokens' },
            { value: 2, suffix: '', label: 'Frameworks' },
            { value: 43, suffix: '+', label: 'Storybook Stories' },
          ].map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.1}>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <Counter value={m.value} suffix={m.suffix} />
              </p>
              <p className="text-xs text-white/40 uppercase tracking-wider">{m.label}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ═══════ WHAT IS TARMAC ═══════ */}
      <section className="relative py-24 sm:py-32">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(237,27,54,0.06) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto px-5">
          <FadeUp>
            <p className="text-sm font-medium text-red-400 mb-4 tracking-wide">THE SYSTEM</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-2xl">
              One system.<br />Every surface.
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed mb-16">
              A shared language between design and engineering — pre-built components, design tokens, accessibility standards, and guidelines that keep every Delhivery product consistent.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '◈', title: 'Token First', desc: 'Every decision starts as a design token. Change once, update everywhere — colors, spacing, type.' },
              { icon: '◉', title: 'Accessible by Default', desc: 'WCAG 2.1 AA baked into every component. Not an afterthought — the foundation.' },
              { icon: '⟡', title: 'Figma ↔ Code', desc: '1:1 parity between Figma and production. What designers build is exactly what ships.' },
              { icon: '◎', title: 'Framework Agnostic', desc: 'React and Angular from one source. Same tokens, same behavior, two implementations.' },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div
                  className="group p-6 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <span className="text-2xl mb-4 block opacity-40 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                  <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS — PIPELINE ═══════ */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5">
          <FadeUp>
            <p className="text-sm font-medium text-red-400 mb-4 tracking-wide">WORKFLOW</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-16 max-w-xl">
              From Figma to production.
            </h2>
          </FadeUp>

          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/40 via-white/10 to-transparent hidden md:block" />

            <div className="space-y-12">
              {[
                { step: '01', title: 'Design in Figma', desc: 'Components built with Variables and Auto Layout. One shared library across all products.', color: '#ED1B36' },
                { step: '02', title: 'Tokens sync automatically', desc: 'Figma → Token Studio → Style Dictionary → npm packages. Zero manual handoff.', color: '#ED1B36' },
                { step: '03', title: 'Build with components', desc: 'npm install @tarmac/design-system — pre-built, tested, accessible React/Angular components.', color: '#ED1B36' },
                { step: '04', title: 'Ship consistently', desc: 'Every product speaks the same visual language. Updates propagate without manual effort.', color: '#ED1B36' },
              ].map((s, i) => (
                <FadeUp key={s.step} delay={i * 0.1}>
                  <div className="flex items-start gap-6 md:gap-8">
                    {/* Step indicator */}
                    <div className="relative z-10 shrink-0 w-12 h-12 rounded-full border flex items-center justify-center text-xs font-bold" style={{ borderColor: s.color + '40', color: s.color, background: s.color + '10' }}>
                      {s.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-lg font-semibold text-white mb-1">{s.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed max-w-md">{s.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ COMPONENT SHOWCASE ═══════ */}
      <section className="relative py-24 sm:py-32 border-t border-white/5 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(237,27,54,0.05) 0%, transparent 60%)' }} />

        <div className="max-w-6xl mx-auto px-5">
          <FadeUp>
            <p className="text-sm font-medium text-white/40 mb-4 tracking-wide">COMPONENTS</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              62+ production-ready<br />components.
            </h2>
            <p className="text-base text-white/40 max-w-lg mb-12">
              Every component ships with Storybook demos, accessibility built in, design tokens, and full documentation.
            </p>
          </FadeUp>

          {/* Component grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              'Button', 'Input', 'Dropdown', 'Checkbox', 'Radio',
              'Toggle', 'Badge', 'Avatar', 'Cards', 'Tooltip',
              'Alert', 'Dialog Box', 'Snackbar', 'Tabs', 'Accordion',
              'Carousel', 'Pagination', 'Stepper', 'Rating', 'Spinner',
            ].map((comp, i) => (
              <FadeUp key={comp} delay={i * 0.03}>
                <Link
                  href={`/components/${comp.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group block p-4 rounded-lg border border-white/5 hover:border-white/20 text-center transition-all duration-200 hover:bg-white/[0.03]"
                >
                  <span className="text-sm text-white/50 group-hover:text-white transition-colors">{comp}</span>
                </Link>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div className="mt-10 text-center">
              <Link href="/components/accordion" className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium">
                View all 62 components →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════ HORIZONTAL SCROLL CARDS ═══════ */}
      <HorizontalScrollCards />

      {/* ═══════ BEFORE / AFTER ═══════ */}
      <BeforeAfterSection />

      {/* ═══════ GET STARTED ═══════ */}
      <section className="relative py-24 sm:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Ready to build?
              </h2>
              <p className="text-base text-white/40">Pick a starting point and dive in.</p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Foundations', href: '/foundations/colors', desc: 'Colors, typography, spacing, grid systems', icon: '🎨' },
              { label: 'Components', href: '/components/accordion', desc: '62+ production-ready UI components', icon: '🧩' },
              { label: 'Accessibility', href: '/accessibility/overview', desc: 'WCAG guidelines, keyboard nav, testing', icon: '♿' },
              { label: 'Storybook', href: 'https://tarmac-storybook-dev.pntrzz.com/storybook/', desc: 'Live interactive playground', icon: '📖' },
            ].map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.1}>
                <Link
                  href={item.href}
                  className="group block p-6 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 h-full"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <span className="text-2xl block mb-4">{item.icon}</span>
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-red-300 transition-colors">{item.label}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{item.desc}</p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      <section className="relative py-24 sm:py-32 border-t border-white/5 text-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(237,27,54,0.08) 0%, transparent 60%)',
        }} />

        <FadeUp>
          <div className="relative z-10 max-w-2xl mx-auto px-5">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start building with TARMAC</h2>
            <p className="text-base text-white/40 mb-8">Install the package and start using production-ready components in minutes.</p>

            {/* Code snippet */}
            <div className="inline-block text-left rounded-lg border border-white/10 px-6 py-4 mb-8" style={{ background: 'rgba(0,0,0,0.4)' }}>
              <code className="text-sm text-green-400 font-mono">npm install @tarmac/design-system</code>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/components/button"
                className="px-6 py-3 rounded-lg font-medium text-sm text-white transition-all hover:scale-105"
                style={{ background: '#ED1B36' }}
              >
                Get Started
              </Link>
              <a
                href="https://github.com/tarmac-design"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-medium text-sm text-white/70 border border-white/15 hover:border-white/30 transition-all hover:text-white"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-white/5 py-10 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/30">© 2026 Delhivery Ltd. TARMAC Design System.</span>
          <div className="flex gap-6">
            <a href="https://www.delhivery.com" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white/60 transition-colors">delhivery.com</a>
            <a href="https://github.com/tarmac-design" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white/60 transition-colors">GitHub</a>
            <a href="https://www.figma.com/design/fPg3J4ckTHzyIQp8PrqDjT" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white/60 transition-colors">Figma</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
