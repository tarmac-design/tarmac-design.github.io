'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Overview', href: '/' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Avatar', href: '/components/avatar' },
      { label: 'Badge', href: '/components/badge' },
      { label: 'Button', href: '/components/button' },
      { label: 'Checkbox', href: '/components/checkbox' },
      { label: 'Input', href: '/components/input' },
      { label: 'Modal', href: '/components/modal' },
      { label: 'Radio', href: '/components/radio' },
      { label: 'Select', href: '/components/select' },
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Textarea', href: '/components/textarea' },
      { label: 'Toast', href: '/components/toast' },
      { label: 'Toggle', href: '/components/toggle' },
      { label: 'Tooltip', href: '/components/tooltip' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 w-[var(--sidebar-width)] h-screen border-r border-neutral-200 bg-neutral-50 overflow-y-auto z-40">
      <div className="p-6 border-b border-neutral-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-tarmac-red rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-semibold text-lg">TARMAC</span>
        </Link>
      </div>

      <nav className="p-4">
        {nav.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 px-3">
              {section.title}
            </h3>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-neutral-200 text-neutral-900 font-medium'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="mt-8 px-3">
          <a
            href="https://tarmac-storybook-dev.pntrzz.com/storybook/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-tarmac-blue transition-colors"
          >
            <span>📖</span>
            <span>Open Storybook</span>
            <span className="text-xs">↗</span>
          </a>
        </div>
      </nav>
    </aside>
  );
}
