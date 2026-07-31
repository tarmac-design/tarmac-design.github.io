'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import ComponentReveal from '@/components/ComponentReveal';

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
    { title: 'Button', desc: 'Primary, secondary, outline, ghost variants with loading states', color: '#ED1B36', img: '/assets/images/guidelines/button-do-1.png' },
    { title: 'Input', desc: 'Text fields, dropdowns, search with validation and addons', color: '#333', img: '/assets/images/guidelines/otp-fields-do-1.png' },
    { title: 'Card', desc: 'Content containers with media, actions, and selection states', color: '#1a1a1a', img: '/assets/images/guidelines/cards-do-1.png' },
    { title: 'Dialog', desc: 'Modal overlays for confirmations, forms, and alerts', color: '#222', img: '/assets/images/guidelines/dialog-box-do-1.png' },
    { title: 'Avatar', desc: 'User representations with initials, images, and status dots', color: '#1B1D22', img: '/assets/images/guidelines/avatar-do-1.png' },
    { title: 'Badge', desc: '9 color themes with filled, outlined, and cardbox styles', color: '#2a2a2a', img: '/assets/images/guidelines/badge-do-1.png' },
    { title: 'Tabs', desc: 'Horizontal navigation with icons, badges, and underline styles', color: '#1a1a1a', img: '/assets/images/guidelines/tabs-do-1.png' },
    { title: 'Tooltip', desc: 'Rich content tooltips with titles, actions, and positioning', color: '#222', img: '/assets/images/guidelines/tooltip-do-1.png' },
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
            <div className="w-full h-32 rounded-lg mb-4 overflow-hidden" style={{ background: card.color }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.img} alt={card.title} className="w-full h-full object-contain p-2 opacity-90 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">{card.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ── Scalability section ── */
function ScalabilitySection() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        <FadeUp>
          <p className="text-sm font-medium text-red-400 mb-4 tracking-wide">SCALE</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Built to scale with you.</h2>
          <p className="text-base text-white/40 max-w-xl mb-16 leading-relaxed">
            TARMAC grows with your products — from a single feature to an entire ecosystem of logistics applications serving millions.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { metric: '12+', label: 'Products using TARMAC', desc: 'From rider apps to warehouse management — one system powering all surfaces.' },
            { metric: '3x', label: 'Faster feature delivery', desc: 'Pre-built, tested components eliminate redundant UI work across teams.' },
            { metric: '100%', label: 'Cross-platform consistency', desc: 'Same tokens, same behavior on web, mobile, and internal tools.' },
          ].map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.1}>
              <div className="p-6 rounded-xl border border-white/5 hover:border-white/15 transition-all" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <p className="text-3xl font-bold text-red-400 mb-2">{item.metric}</p>
                <h3 className="text-base font-semibold text-white mb-2">{item.label}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
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
    <div className="landing-page relative" style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', overflowX: 'hidden', maxWidth: '100vw' }}>
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
          {/* Badge - removed */}

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
            <span className="block">Build faster</span>
            <span className="block" style={{ color: '#ED1B36' }}>Ship consistent</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            TARMAC is Delhivery&apos;s design system which powers the tools that move India&apos;s commerce. It helps teams build reliable, intuitive logistics products at scale.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/components/button"
              className="px-6 py-3 rounded-lg font-medium text-sm transition-all hover:scale-105"
              style={{ background: '#ED1B36', color: '#FFFFFF' }}
            >
              Browse Components
            </Link>
            <a
              href="#explore"
              className="px-6 py-3 rounded-lg font-medium text-sm text-white/80 border border-white/15 hover:border-white/30 transition-all hover:bg-white/5"
            >
              Know More ↓
            </a>
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
      <section id="explore" className="relative py-24 sm:py-32">
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
              { icon: '🎯', title: 'Token First', desc: 'Every decision starts as a design token. Change once, update everywhere — colors, spacing, type.' },
              { icon: '♿', title: 'Accessible by Default', desc: 'WCAG 2.1 AA baked into every component. Not an afterthought — the foundation.' },
              { icon: '🔗', title: 'Figma ↔ Code', desc: '1:1 parity between Figma and production. What designers build is exactly what ships.' },
              { icon: '⚙️', title: 'Framework Agnostic', desc: 'React and Angular from one source. Same tokens, same behavior, two implementations.' },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div
                  className="group p-6 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <span className="text-2xl mb-4 block opacity-40 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-white transition-colors">{item.title}</h3>
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
            {/* Vertical connecting line — behind step indicators */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/40 via-white/10 to-transparent hidden md:block z-0" />

            <div className="space-y-12">
              {[
                { step: '01', title: 'Design in Figma', desc: 'Components built with Variables and Auto Layout. One shared library across all products.', color: '#ED1B36' },
                { step: '02', title: 'Tokens sync automatically', desc: 'Figma → Token Studio → Style Dictionary → npm packages. Zero manual handoff.', color: '#ED1B36' },
                { step: '03', title: 'Build with components', desc: 'Pre-built, tested, accessible React/Angular components ready to drop into any product.', color: '#ED1B36' },
                { step: '04', title: 'Ship consistently', desc: 'Every product speaks the same visual language. Updates propagate without manual effort.', color: '#ED1B36' },
              ].map((s, i) => (
                <FadeUp key={s.step} delay={i * 0.1}>
                  <div className="flex items-start gap-6 md:gap-8">
                    {/* Step indicator — solid bg to cover the line behind it */}
                    <div className="relative z-10 shrink-0 w-12 h-12 rounded-full border flex items-center justify-center text-xs font-bold" style={{ borderColor: s.color + '40', color: s.color, background: 'var(--color-surface, #0a0a0a)', boxShadow: `0 0 0 6px var(--color-surface, #0a0a0a)` }}>
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

      {/* ═══════ COMPONENT SHOWCASE — SCROLL REVEAL ═══════ */}
      <ComponentReveal />

      {/* ═══════ SCALABILITY ═══════ */}
      <ScalabilitySection />

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
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-white transition-colors">{item.label}</h3>
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
            <p className="text-base text-white/40 mb-8">Explore the system and start using production-ready components in your products.</p>

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
          <span className="text-xs text-white/30 flex items-center gap-1">Crafted with <span style={{ color: '#ED1B36' }}>❤</span></span>
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
