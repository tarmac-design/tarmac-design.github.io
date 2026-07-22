'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function HomePage() {
  return (
    <div style={{ background: 'var(--color-surface)' }}>
      {/* Hero */}
      <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-primary)', marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          TARMAC DESIGN SYSTEM
        </motion.p>
        <motion.h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, color: 'var(--color-on-surface)', lineHeight: 1.1, marginBottom: '24px', maxWidth: '700px' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          Design once,<br />ship everywhere.
        </motion.h1>
        <motion.p style={{ fontSize: '18px', color: 'var(--color-on-surface-variant)', lineHeight: 1.7, maxWidth: '540px', marginBottom: '40px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          A unified design system powering every Delhivery product — from seller panels to customer tracking. One source of truth for design and code.
        </motion.p>
        <motion.div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Link href="/components/accordion" style={{ padding: '12px 24px', borderRadius: '8px', backgroundColor: 'var(--color-primary)', color: '#fff', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
            Browse Components
          </Link>
          <Link href="/foundations/colors" style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--color-outline)', color: 'var(--color-on-surface)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
            Explore Foundations
          </Link>
        </motion.div>

        {/* Metrics row */}
        <motion.div style={{ display: 'flex', gap: '48px', marginTop: '64px', flexWrap: 'wrap' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
          {[
            { value: '62', label: 'Components' },
            { value: '1,284', label: 'Design Tokens' },
            { value: '2', label: 'Frameworks' },
            { value: '12', label: 'Foundations' },
          ].map((m) => (
            <div key={m.label}>
              <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '4px' }}>{m.value}</p>
              <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* What we are */}
      <section style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--color-outline)' }}>
        <h2 style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>WHAT IS TARMAC</h2>
        <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '24px', maxWidth: '600px' }}>One system, every surface.</h3>
        <p style={{ fontSize: '16px', color: 'var(--color-on-surface-variant)', lineHeight: 1.8, maxWidth: '640px', marginBottom: '48px' }}>
          TARMAC is Delhivery&apos;s design system — a shared language between design and engineering. Pre-built components, design tokens, accessibility standards, and guidelines that keep every product consistent, fast, and inclusive.
        </p>

        {/* Principles grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {[
            { title: 'Token First', desc: 'Every decision starts as a design token — colors, spacing, typography. Change once, update everywhere.' },
            { title: 'Accessible by Default', desc: 'WCAG 2.1 AA compliance built into every component. Not an afterthought — a foundation.' },
            { title: 'Framework Agnostic', desc: 'React and Angular libraries shipping from the same source. One design, two implementations.' },
            { title: 'Figma ↔ Code', desc: '1:1 parity between Figma components and production code. What you design is what ships.' },
          ].map((p) => (
            <div key={p.title} style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '8px' }}>{p.title}</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--color-outline)' }}>
        <h2 style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>HOW IT WORKS</h2>
        <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '48px' }}>From design to production.</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {[
            { step: '01', title: 'Design in Figma', desc: 'Components built with Variables and Auto Layout. One library, shared across all products.' },
            { step: '02', title: 'Tokens sync', desc: 'Design decisions flow from Figma → Token Studio → Style Dictionary → code packages automatically.' },
            { step: '03', title: 'Build with components', desc: 'Engineers install @tarmac/design-system and use pre-built, tested, accessible components.' },
            { step: '04', title: 'Ship consistently', desc: 'Every product speaks the same visual language. Updates propagate without manual effort.' },
          ].map((s) => (
            <div key={s.step} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', minWidth: '32px' }}>{s.step}</span>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '4px' }}>{s.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--color-outline)' }}>
        <h2 style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>GET STARTED</h2>
        <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '48px' }}>Jump in anywhere.</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Foundations', href: '/foundations/colors', desc: 'Colors, typography, spacing' },
            { label: 'Components', href: '/components/accordion', desc: '62 production-ready components' },
            { label: 'Accessibility', href: '/accessibility/overview', desc: 'WCAG guidelines and testing' },
            { label: 'Storybook', href: 'https://tarmac-storybook.delhivery.com/storybook/', desc: 'Live interactive playground' },
          ].map((l) => (
            <Link key={l.label} href={l.href} style={{ padding: '20px', borderRadius: '10px', border: '1px solid var(--color-outline)', textDecoration: 'none', transition: 'border-color 0.15s' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '4px' }}>{l.label}</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>{l.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 5%', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--color-outline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>© 2026 Delhivery Ltd. TARMAC Design System.</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="https://www.delhivery.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>delhivery.com</a>
          <a href="https://github.com/tarmac-design" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>GitHub</a>
        </div>
      </footer>
    </div>
  );
}
