import Link from 'next/link';

const sections = [
  { title: 'Introduction', desc: 'Overview, philosophy, and getting started', pages: '6 pages', href: '/about/overview' },
  { title: 'Foundations', desc: 'Colors, typography, spacing, grid, and tokens', pages: '17 pages', href: '/foundations/colors' },
  { title: 'Components', desc: 'UI building blocks with live Storybook demos', pages: '43 pages', href: '/components/button' },
  { title: 'Patterns', desc: 'Layout and form composition patterns', pages: '2 pages', href: '/patterns/layout' },
  { title: 'Accessibility', desc: 'Guidelines, keyboard nav, screen readers', pages: '7 pages', href: '/accessibility/overview' },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="mb-4">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Documentation</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">TARMAC Design System</h1>
      <p className="text-xl text-neutral-600 leading-relaxed mb-12">
        The single source of truth for building consistent, accessible interfaces across Delhivery products.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {sections.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className="group block p-6 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-tarmac-blue">{s.title}</h3>
            <p className="text-sm text-neutral-600 mb-3">{s.desc}</p>
            <span className="text-xs text-neutral-400">{s.pages}</span>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-200 p-6">
        <h3 className="text-sm font-semibold mb-3">Quick Start</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg text-sm overflow-x-auto mb-3">
          <code>npm install @tarmac/design-system</code>
        </pre>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg text-sm overflow-x-auto">
          <code>{`import { Button } from '@tarmac/design-system';

<Button variant="primary">Get Started</Button>`}</code>
        </pre>
      </div>
    </div>
  );
}
