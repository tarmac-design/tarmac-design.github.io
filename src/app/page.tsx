'use client';

import Link from 'next/link';
import {
  Palette, Type, Layout, Layers, Accessibility, BookOpen,
  ArrowRight, Sparkles, Zap, Shield, Box
} from 'lucide-react';

const sections = [
  {
    title: 'Foundations',
    desc: 'Colors, typography, spacing, grid, iconography — the building blocks.',
    icon: Palette,
    href: '/foundations/colors',
  },
  {
    title: 'Components',
    desc: '43+ production-ready UI components with live Storybook demos.',
    icon: Box,
    href: '/components/button',
  },
  {
    title: 'Patterns',
    desc: 'Layout and form composition patterns for consistent UIs.',
    icon: Layout,
    href: '/patterns/layout',
  },
  {
    title: 'Accessibility',
    desc: 'WCAG guidelines, keyboard nav, screen readers, and testing.',
    icon: Accessibility,
    href: '/accessibility/overview',
  },
  {
    title: 'Getting Started',
    desc: 'Installation, quick start, and integration guides.',
    icon: BookOpen,
    href: '/getting-started/installation',
  },
  {
    title: 'Tokens',
    desc: 'Design tokens as CSS variables and JS constants.',
    icon: Layers,
    href: '/foundations/colors-implementation',
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'Figma Library',
    desc: 'Complete component library with variants, auto-layout, and design tokens.',
  },
  {
    icon: Zap,
    title: 'React Components',
    desc: 'TypeScript-first with built-in accessibility and theming support.',
  },
  {
    icon: Shield,
    title: 'Accessible',
    desc: 'WCAG 2.1 AA compliant with keyboard navigation and screen reader support.',
  },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 4%, transparent), transparent 60%, color-mix(in srgb, var(--color-secondary) 4%, transparent))',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 pt-14 pb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: 'var(--color-primary-container)',
              color: 'var(--color-primary)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-tarmac-red animate-pulse" />
            v2.0 — Design System
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight mb-5 leading-[1.1]"
            style={{ color: 'var(--color-on-surface)' }}
          >
            Build consistent
            <br />
            <span style={{ color: '#ED1B36' }}>
              Delhivery experiences
            </span>
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl leading-relaxed mb-8"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            TARMAC is the single source of truth for design decisions, UI components, and interaction patterns across Delhivery products.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about/overview"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{
                background: 'var(--color-on-surface)',
                color: 'var(--color-surface)',
              }}
            >
              Get Started
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/components/button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
              style={{
                borderColor: 'var(--color-outline)',
                color: 'var(--color-on-surface-variant)',
              }}
            >
              Browse Components
            </Link>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section
        className="border-y"
        style={{
          borderColor: 'var(--color-outline)',
          background: 'var(--color-surface-container-low)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 stagger-children">
            {features.map((f) => (
              <div key={f.title} className="flex gap-3.5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'var(--color-primary-container)' }}
                >
                  <f.icon size={18} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-[13px] mb-0.5" style={{ color: 'var(--color-on-surface)' }}>
                    {f.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section cards */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 py-14">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-1.5" style={{ color: 'var(--color-on-surface)' }}>
            Explore the system
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Everything you need to design and build with TARMAC.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
          {sections.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group relative p-5 rounded-2xl border transition-all duration-200 card-glow"
              style={{ borderColor: 'var(--color-outline)' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ background: 'var(--color-primary-container)' }}
              >
                <s.icon size={18} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h3
                className="font-semibold text-[15px] mb-1 transition-colors"
                style={{ color: 'var(--color-on-surface)' }}
              >
                {s.title}
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                {s.desc}
              </p>
              <ArrowRight
                size={14}
                className="absolute top-5 right-5 transition-all group-hover:translate-x-0.5"
                style={{ color: 'var(--color-outline-variant)' }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Quick start */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 pb-16">
        <div
          className="rounded-2xl border p-6 sm:p-8"
          style={{
            borderColor: 'var(--color-outline)',
            background: 'var(--color-surface-container-low)',
          }}
        >
          <h3 className="font-bold text-base mb-1" style={{ color: 'var(--color-on-surface)' }}>
            Quick Start
          </h3>
          <p className="text-sm mb-5" style={{ color: 'var(--color-on-surface-variant)' }}>
            Get up and running in under a minute.
          </p>
          <div className="space-y-2.5">
            <div
              className="rounded-xl border p-4 overflow-x-auto"
              style={{
                background: 'var(--color-surface-dim)',
                borderColor: 'var(--color-outline)',
              }}
            >
              <code className="text-sm font-mono" style={{ color: 'var(--color-on-surface)' }}>
                npm install @tarmac/design-system
              </code>
            </div>
            <div
              className="rounded-xl border p-4 overflow-x-auto"
              style={{
                background: 'var(--color-surface-dim)',
                borderColor: 'var(--color-outline)',
              }}
            >
              <pre className="text-sm font-mono leading-relaxed" style={{ color: 'var(--color-on-surface)' }}>
{`import { Button } from '@tarmac/design-system';

<Button variant="primary">Get Started</Button>`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
