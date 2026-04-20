import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">TARMAC Design System</h1>
        <p className="text-xl text-neutral-600 leading-relaxed">
          A comprehensive design system for building consistent, accessible, and scalable user experiences at Delhivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link href="/components/button" className="group block p-6 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all">
          <div className="text-2xl mb-3">🧩</div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-tarmac-blue">Components</h3>
          <p className="text-sm text-neutral-600">13 documented components — Button, Input, Select, Modal, and more.</p>
        </Link>
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all">
          <div className="text-2xl mb-3">📖</div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-tarmac-blue">Storybook</h3>
          <p className="text-sm text-neutral-600">Interactive playground with live component demos and controls.</p>
        </a>
      </div>
    </div>
  );
}
