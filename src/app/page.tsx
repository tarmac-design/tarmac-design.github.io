import Link from 'next/link';

const sections = [
  {
    title: 'Get started',
    desc: 'Overview, philosophy, and getting started with TARMAC',
    pages: '6 pages',
    href: '/about/overview',
    icon: '🚀',
  },
  {
    title: 'Foundations',
    desc: 'Colors, typography, spacing, grid, and design tokens',
    pages: '17 pages',
    href: '/foundations/colors',
    icon: '📐',
  },
  {
    title: 'Components',
    desc: 'UI building blocks with live Storybook demos',
    pages: '43 pages',
    href: '/components/button',
    icon: '🧩',
  },
  {
    title: 'Patterns',
    desc: 'Layout and form composition patterns',
    pages: '2 pages',
    href: '/patterns/layout',
    icon: '🔷',
  },
  {
    title: 'Accessibility',
    desc: 'Guidelines, keyboard nav, screen readers',
    pages: '7 pages',
    href: '/accessibility/overview',
    icon: '♿',
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      {/* Hero */}
      <div className="mb-16">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-6"
          style={{
            background: 'var(--color-primary-container)',
            color: 'var(--color-primary)',
          }}
        >
          TARMAC Design System
        </div>
        <h1
          className="text-5xl font-bold mb-5 leading-tight"
          style={{ color: 'var(--color-on-surface)' }}
        >
          Build consistent, accessible
          <br />
          interfaces at Delhivery
        </h1>
        <p
          className="text-lg leading-relaxed max-w-2xl mb-8"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          The single source of truth for design decisions, UI components, and
          interaction patterns across all Delhivery products.
        </p>
        <div className="flex gap-3">
          <Link
            href="/about/overview"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
            }}
          >
            Get started
          </Link>
          <Link
            href="/components/button"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all border"
            style={{
              borderColor: 'var(--color-outline)',
              color: 'var(--color-on-surface)',
            }}
          >
            Browse components
          </Link>
        </div>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {sections.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group block p-6 rounded-2xl border transition-all hover:shadow-md"
            style={{
              borderColor: 'var(--color-outline)',
              background: 'var(--color-surface)',
            }}
          >
            <span className="text-2xl mb-3 block">{s.icon}</span>
            <h3
              className="text-base font-semibold mb-1.5"
              style={{ color: 'var(--color-on-surface)' }}
            >
              {s.title}
            </h3>
            <p
              className="text-sm mb-3 leading-relaxed"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              {s.desc}
            </p>
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              {s.pages}
            </span>
          </Link>
        ))}
      </div>

      {/* Quick start */}
      <div
        className="rounded-2xl border p-8"
        style={{
          borderColor: 'var(--color-outline)',
          background: 'var(--color-surface-container-low)',
        }}
      >
        <h3
          className="text-sm font-semibold mb-4"
          style={{ color: 'var(--color-on-surface)' }}
        >
          Quick Start
        </h3>
        <pre
          className="rounded-xl p-4 text-sm overflow-x-auto mb-3"
          style={{
            background: 'var(--color-surface-dim)',
            border: '1px solid var(--color-outline)',
            color: 'var(--color-on-surface)',
          }}
        >
          <code>npm install @tarmac/design-system</code>
        </pre>
        <pre
          className="rounded-xl p-4 text-sm overflow-x-auto"
          style={{
            background: 'var(--color-surface-dim)',
            border: '1px solid var(--color-outline)',
            color: 'var(--color-on-surface)',
          }}
        >
          <code>{`import { Button } from '@tarmac/design-system';

<Button variant="primary">Get Started</Button>`}</code>
        </pre>
      </div>
    </div>
  );
}
