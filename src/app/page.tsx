import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">TARMAC Design System</h1>
        <p className="text-xl text-neutral-600 leading-relaxed">
          A complete design system for building consistent, accessible, and scalable user experiences at Delhivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Link href="/about/overview" className="group block p-5 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all">
          <div className="text-2xl mb-3">📖</div>
          <h3 className="text-base font-semibold mb-1 group-hover:text-tarmac-blue">About TARMAC</h3>
          <p className="text-sm text-neutral-600">Introduction, principles, and why teams choose TARMAC.</p>
        </Link>
        <Link href="/foundations/colors" className="group block p-5 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all">
          <div className="text-2xl mb-3">📐</div>
          <h3 className="text-base font-semibold mb-1 group-hover:text-tarmac-blue">Foundations</h3>
          <p className="text-sm text-neutral-600">Colors, typography, spacing, and iconography tokens.</p>
        </Link>
        <Link href="/components/button" className="group block p-5 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all">
          <div className="text-2xl mb-3">🧩</div>
          <h3 className="text-base font-semibold mb-1 group-hover:text-tarmac-blue">Components</h3>
          <p className="text-sm text-neutral-600">13 documented components with live Storybook demos.</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/" target="_blank" rel="noopener noreferrer" className="group block p-5 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all">
          <div className="text-2xl mb-3">🔬</div>
          <h3 className="text-base font-semibold mb-1 group-hover:text-tarmac-blue">Storybook</h3>
          <p className="text-sm text-neutral-600">Interactive playground with live component demos and controls.</p>
        </a>
        <div className="block p-5 rounded-xl border border-neutral-200 bg-neutral-50">
          <div className="text-2xl mb-3">🚀</div>
          <h3 className="text-base font-semibold mb-1">Quick Start</h3>
          <pre className="text-xs bg-neutral-900 text-neutral-100 rounded-lg p-3 mt-2 overflow-x-auto"><code>{`npm install @tarmac/design-system

import { Button } from '@tarmac/design-system';`}</code></pre>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Foundations at a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/foundations/colors" className="group text-center p-4 rounded-lg hover:bg-neutral-50 transition-colors">
            <div className="flex gap-1 justify-center mb-2">
              <div className="w-4 h-4 rounded-full bg-tarmac-red" />
              <div className="w-4 h-4 rounded-full bg-tarmac-blue" />
              <div className="w-4 h-4 rounded-full bg-tarmac-success" />
              <div className="w-4 h-4 rounded-full bg-tarmac-black" />
            </div>
            <span className="text-sm font-medium text-neutral-700 group-hover:text-tarmac-blue">Colors</span>
          </Link>
          <Link href="/foundations/typography" className="group text-center p-4 rounded-lg hover:bg-neutral-50 transition-colors">
            <div className="text-lg font-bold mb-1">Aa</div>
            <span className="text-sm font-medium text-neutral-700 group-hover:text-tarmac-blue">Typography</span>
          </Link>
          <Link href="/foundations/spacing" className="group text-center p-4 rounded-lg hover:bg-neutral-50 transition-colors">
            <div className="flex gap-1 justify-center items-end mb-2">
              <div className="w-2 h-2 bg-neutral-300 rounded-sm" />
              <div className="w-2 h-4 bg-neutral-400 rounded-sm" />
              <div className="w-2 h-6 bg-neutral-500 rounded-sm" />
              <div className="w-2 h-8 bg-neutral-600 rounded-sm" />
            </div>
            <span className="text-sm font-medium text-neutral-700 group-hover:text-tarmac-blue">Spacing</span>
          </Link>
          <Link href="/foundations/iconography" className="group text-center p-4 rounded-lg hover:bg-neutral-50 transition-colors">
            <div className="text-lg mb-1">⬡ ◯ △</div>
            <span className="text-sm font-medium text-neutral-700 group-hover:text-tarmac-blue">Iconography</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
