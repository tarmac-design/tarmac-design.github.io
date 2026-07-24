'use client';

/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
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

export default function Home() {
  const { theme } = useTheme();

  return (
    <div>

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
