'use client';

/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { motion, useInView } from 'motion/react';
import HeroFoldOption2 from '@/components/HeroFoldOption2';

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

export default function Option2Page() {
  const { theme } = useTheme();

  return (
    <div>
      {/* ═══════════ HERO FOLD OPTION 2 ═══════════ */}
      <HeroFoldOption2 />

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
            <div className="rounded-2xl overflow-hidden border-2 mx-auto" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container)' }}>
              <img src="/assets/images/team-photo.jpg" alt="TARMAC Design System Team" className="w-full object-cover transition-all duration-500 grayscale hover:grayscale-0" style={{ minHeight: '420px' }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ DESIGN LEADERSHIP ═══════════ */}
      <section style={{ background: 'var(--color-surface-container-low)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="shrink-0 group">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container)' }}>
                  <img src="/assets/images/arpith-portrait.jpg" alt="Arpith — Head of Design, Delhivery" className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-4xl font-bold mb-4" style={{ color: 'var(--color-on-surface)', opacity: 0.15 }}>&ldquo;</div>
                <blockquote className="text-xl sm:text-2xl md:text-[1.75rem] font-bold leading-snug mb-6 -mt-6" style={{ color: 'var(--color-on-surface)' }}>
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
                <img src="/tarmac-logo-light.svg" alt="TARMAC Design System" className={theme === 'light' ? 'block' : 'hidden'} style={{ height: '24px', width: 'auto' }} />
                <img src="/tarmac-logo-dark.svg" alt="TARMAC Design System" className={theme === 'dark' ? 'block' : 'hidden'} style={{ height: '24px', width: 'auto' }} />
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
