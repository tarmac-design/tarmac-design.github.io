'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { TarmacLogoCompact } from './TarmacLogo';

const topNav = [
  { label: 'Get started', href: '/about/overview' },
  { label: 'Foundations', href: '/foundations/colors' },
  { label: 'Components', href: '/components/button' },
  { label: 'Patterns', href: '/patterns/layout' },
  { label: 'Accessibility', href: '/accessibility/overview' },
];

export function TopBar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  const isActive = (href: string) => {
    const section = href.split('/')[1];
    return pathname.startsWith(`/${section}`);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-[var(--topbar-height)] flex items-center px-6 border-b backdrop-blur-sm"
      style={{
        background: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
        borderColor: 'var(--color-outline)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mr-10 shrink-0">
        <TarmacLogoCompact size={32} />
        <div className="flex flex-col leading-tight">
          <span
            className="font-bold text-[13px] tracking-wide"
            style={{ color: 'var(--color-on-surface)' }}
          >
            <span style={{ color: '#ED1B36' }}>T</span>ARMAC
          </span>
          <span
            className="text-[9px] tracking-[0.15em] uppercase font-medium"
            style={{ color: 'var(--color-primary)' }}
          >
            Design System
          </span>
        </div>
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-1 flex-1">
        {topNav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                color: active ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                background: active ? 'var(--color-primary-container)' : 'transparent',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* GitHub */}
        <a
          href="https://github.com/abhishekthakur3-sketch/TDS"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
          style={{
            color: 'var(--color-on-surface-variant)',
            border: '1px solid var(--color-outline)',
          }}
        >
          GitHub ↗
        </a>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: 'var(--color-surface-container)',
            color: 'var(--color-on-surface)',
          }}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
