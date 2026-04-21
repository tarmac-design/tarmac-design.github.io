import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'TARMAC Design System',
  description: 'Design system documentation for Delhivery',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        {/* Top header */}
        <header className="fixed top-0 left-0 right-0 h-[var(--header-height)] bg-white border-b border-neutral-200 z-50 flex items-center px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-neutral-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="font-semibold text-[15px] text-neutral-900 tracking-tight">TARMAC</span>
            <span className="text-neutral-300 font-light">|</span>
            <span className="text-[13px] text-neutral-500 font-medium">Design System</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <a
              href="https://tarmac-storybook-dev.pntrzz.com/storybook/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1.5"
            >
              Storybook
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="https://github.com/tarmac-design/tarmac-design.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              GitHub
            </a>
          </div>
        </header>

        <div className="flex pt-[var(--header-height)]">
          <Sidebar />
          <main className="flex-1 ml-[var(--sidebar-width)] min-h-[calc(100vh-var(--header-height))]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
