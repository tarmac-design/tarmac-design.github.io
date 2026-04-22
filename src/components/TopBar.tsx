'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';

const topNav = [
  { label: 'About', href: '/about/overview', section: 'about' },
  { label: 'Foundations', href: '/foundations/colors', section: 'foundations' },
  { label: 'Components', href: '/components/button', section: 'components' },
  { label: 'Accessibility', href: '/accessibility/overview', section: 'accessibility' },
];

export function TopBar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (section: string) => {
    const current = pathname.split('/')[1];
    if (section === 'about') return current === 'about' || current === 'getting-started';
    return current === section;
  };

  return (
    <header
      className="fixed top-3 left-3 right-3 h-14 z-50 rounded-2xl border flex items-center px-5"
      style={{
        background: 'color-mix(in srgb, var(--color-surface) 75%, transparent)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderColor: 'color-mix(in srgb, var(--color-outline) 50%, transparent)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center mr-8 shrink-0">
        <Image
          src="/tarmac-logo-light.png"
          alt="TARMAC Design System"
          width={140}
          height={36}
          className={theme === 'light' ? 'block' : 'hidden'}
          priority
        />
        <Image
          src="/tarmac-logo-dark.png"
          alt="TARMAC Design System"
          width={140}
          height={36}
          className={theme === 'dark' ? 'block' : 'hidden'}
          priority
        />
      </Link>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-0.5 flex-1">
        {topNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-1.5 text-[13px] font-medium rounded-lg transition-colors"
            style={{
              color: isActive(item.section) ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              background: isActive(item.section) ? 'var(--color-primary-container)' : 'transparent',
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-1 ml-auto">
        <a
          href="https://tarmac-storybook-dev.pntrzz.com/storybook/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          Storybook ↗
        </a>
        <a
          href="https://github.com/abhishekthakur3-sketch/TDS"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--color-on-surface-variant)' }}
          aria-label="GitHub"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--color-on-surface-variant)' }}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          )}
        </button>
      </div>
    </header>
  );
}
