import Link from 'next/link';

const sections = [
  { title: 'Introduction', desc: 'Overview, philosophy, and getting started', href: '/about/overview', count: 6 },
  { title: 'Foundations', desc: 'Colors, typography, spacing, grid, and tokens', href: '/foundations/colors', count: 17 },
  { title: 'Components', desc: 'UI building blocks with live Storybook demos', href: '/components/button', count: 43 },
  { title: 'Patterns', desc: 'Layout and form composition patterns', href: '/patterns/layout', count: 2 },
  { title: 'Accessibility', desc: 'Guidelines, keyboard nav, screen readers', href: '/accessibility/overview', count: 7 },
];

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-8 py-16">
      <div className="mb-12">
        <p className="text-[13px] font-medium text-neutral-400 uppercase tracking-widest mb-3">Documentation</p>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-3">TARMAC Design System</h1>
        <p className="text-[15px] text-neutral-500 leading-7 max-w-lg">
          The single source of truth for building consistent, accessible interfaces across Delhivery products.
        </p>
      </div>

      <div className="space-y-2 mb-12">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}
            className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50 transition-all group"
          >
            <div>
              <h3 className="text-[14px] font-semibold text-neutral-900 group-hover:text-neutral-900">{s.title}</h3>
              <p className="text-[13px] text-neutral-500 mt-0.5">{s.desc}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-neutral-400 font-medium">{s.count} pages</span>
              <svg className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-lg border border-neutral-200 p-5">
        <p className="text-[13px] font-semibold text-neutral-900 mb-3">Quick Start</p>
        <pre className="bg-[#1e1e2e] text-neutral-300 text-[13px] p-4 rounded-lg overflow-x-auto font-mono leading-6">
{`npm install @tarmac/design-system

import { Button } from '@tarmac/design-system';

<Button variant="primary">Get Started</Button>`}
        </pre>
      </div>
    </div>
  );
}
