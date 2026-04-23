'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';

const topNav = [
  { label: 'About', href: '/about/overview', section: 'about' },
  { label: 'Foundations', href: '/foundations/colors', section: 'foundations' },
  { label: 'Components', href: '/components/button', section: 'components' },
  { label: 'Accessibility', href: '/accessibility/overview', section: 'accessibility' },
];

const searchablePages = [
  { label: 'Overview', href: '/about/overview', section: 'About' },
  { label: 'Philosophy', href: '/about/philosophy', section: 'About' },
  { label: 'Brand Language', href: '/about/brand-language', section: 'About' },
  { label: 'Movement Metaphors', href: '/about/movement-metaphors', section: 'About' },
  { label: 'Logo', href: '/about/logo', section: 'About' },
  { label: 'Installation', href: '/getting-started/installation', section: 'Setup' },
  { label: 'Quick Start', href: '/getting-started/quick-start', section: 'Setup' },
  { label: 'Colors', href: '/foundations/colors', section: 'Foundations' },
  { label: 'Typography', href: '/foundations/typography', section: 'Foundations' },
  { label: 'Grid System', href: '/foundations/grid-system', section: 'Foundations' },
  { label: 'Iconography', href: '/foundations/iconography', section: 'Foundations' },
  { label: 'Spacing', href: '/foundations/spacing', section: 'Foundations' },
  { label: 'Radius', href: '/foundations/radius', section: 'Foundations' },
  { label: 'Borders', href: '/foundations/borders', section: 'Foundations' },
  { label: 'Shadows', href: '/foundations/shadows', section: 'Foundations' },
  { label: 'Dividers', href: '/foundations/dividers', section: 'Foundations' },
  { label: 'Image Library', href: '/foundations/image-library', section: 'Foundations' },
  { label: 'Button', href: '/components/button', section: 'Components' },
  { label: 'Checkbox', href: '/components/checkbox', section: 'Components' },
  { label: 'Radio', href: '/components/radio', section: 'Components' },
  { label: 'Input', href: '/components/input', section: 'Components' },
  { label: 'Input Area', href: '/components/input-area', section: 'Components' },
  { label: 'Dropdown', href: '/components/dropdown', section: 'Components' },
  { label: 'Search', href: '/components/search', section: 'Components' },
  { label: 'Toggle', href: '/components/toggle', section: 'Components' },
  { label: 'Slider', href: '/components/slider', section: 'Components' },
  { label: 'OTP Fields', href: '/components/otp-fields', section: 'Components' },
  { label: 'File Upload', href: '/components/file-upload', section: 'Components' },
  { label: 'Date Time Picker', href: '/components/date-time-picker', section: 'Components' },
  { label: 'Filter', href: '/components/filter', section: 'Components' },
  { label: 'Rating', href: '/components/rating', section: 'Components' },
  { label: 'Avatar', href: '/components/avatar', section: 'Components' },
  { label: 'Badge', href: '/components/badge', section: 'Components' },
  { label: 'Tags', href: '/components/tags', section: 'Components' },
  { label: 'Pills', href: '/components/pills', section: 'Components' },
  { label: 'Cards', href: '/components/cards', section: 'Components' },
  { label: 'List', href: '/components/list', section: 'Components' },
  { label: 'Status Indicator', href: '/components/status-indicator', section: 'Components' },
  { label: 'Shimmer', href: '/components/shimmer', section: 'Components' },
  { label: 'Spinner', href: '/components/spinner', section: 'Components' },
  { label: 'Progress Bar', href: '/components/progress-bar', section: 'Components' },
  { label: 'Navigation', href: '/components/navigation', section: 'Components' },
  { label: 'Tabs', href: '/components/tabs', section: 'Components' },
  { label: 'Breadcrumbs', href: '/components/breadcrumbs', section: 'Components' },
  { label: 'Links', href: '/components/links', section: 'Components' },
  { label: 'Pagination', href: '/components/pagination', section: 'Components' },
  { label: 'Stepper', href: '/components/stepper', section: 'Components' },
  { label: 'Alert', href: '/components/alert', section: 'Components' },
  { label: 'Snackbar', href: '/components/snackbar', section: 'Components' },
  { label: 'Tooltip', href: '/components/tooltip', section: 'Components' },
  { label: 'Coachmarks', href: '/components/coachmarks', section: 'Components' },
  { label: 'Dialog Box', href: '/components/dialog-box', section: 'Components' },
  { label: 'Popups', href: '/components/popups', section: 'Components' },
  { label: 'Side Drawer', href: '/components/side-drawer', section: 'Components' },
  { label: 'Bottom Sheet', href: '/components/bottom-sheet', section: 'Components' },
  { label: 'Header', href: '/components/header', section: 'Components' },
  { label: 'Footer', href: '/components/footer', section: 'Components' },
  { label: 'Scroll', href: '/components/scroll', section: 'Components' },
  { label: 'Accordion', href: '/components/accordion', section: 'Components' },
  { label: 'Audio Player', href: '/components/audio-player', section: 'Components' },
  { label: 'Accessibility Overview', href: '/accessibility/overview', section: 'Accessibility' },
  { label: 'Guidelines', href: '/accessibility/guidelines', section: 'Accessibility' },
  { label: 'Keyboard Navigation', href: '/accessibility/keyboard-navigation', section: 'Accessibility' },
  { label: 'Screen Readers', href: '/accessibility/screen-readers', section: 'Accessibility' },
  { label: 'Color Contrast', href: '/accessibility/color-contrast', section: 'Accessibility' },
  { label: 'Focus Management', href: '/accessibility/focus-management', section: 'Accessibility' },
  { label: 'Testing', href: '/accessibility/testing', section: 'Accessibility' },
];

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isActive = (section: string) => {
    const current = pathname.split('/')[1];
    if (section === 'about') return current === 'about' || current === 'getting-started';
    return current === section;
  };

  const filtered = query.trim()
    ? searchablePages.filter(
        (p) =>
          p.label.toLowerCase().includes(query.toLowerCase()) ||
          p.section.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
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
        <Link href="/" className="flex items-center shrink-0 p-2">
          <img
            src="/tarmac-logo-light.svg"
            alt="TARMAC Design System"
            height={24}
            className={theme === 'light' ? 'block' : 'hidden'}
            style={{ height: '24px', width: 'auto' }}
          />
          <img
            src="/tarmac-logo-dark.svg"
            alt="TARMAC Design System"
            height={24}
            className={theme === 'dark' ? 'block' : 'hidden'}
            style={{ height: '24px', width: 'auto' }}
          />
        </Link>

        {/* Centered Nav */}
        <nav className="hidden md:flex items-center justify-center gap-0.5 flex-1">
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

        {/* Right icons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-on-surface-variant)' }}
            aria-label="Search"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
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

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60]" onClick={() => setSearchOpen(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative max-w-lg mx-auto mt-24 rounded-2xl border shadow-2xl overflow-hidden"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-outline)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--color-outline)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-on-surface-variant)', flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages... (⌘K)"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--color-on-surface)' }}
              />
              <kbd
                className="text-[10px] px-1.5 py-0.5 rounded border font-mono"
                style={{ borderColor: 'var(--color-outline)', color: 'var(--color-on-surface-variant)' }}
              >
                ESC
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {query.trim() && filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  No results found
                </div>
              )}
              {filtered.map((page) => (
                <button
                  key={page.href}
                  className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  onClick={() => {
                    router.push(page.href);
                    setSearchOpen(false);
                  }}
                >
                  <span className="text-sm" style={{ color: 'var(--color-on-surface)' }}>{page.label}</span>
                  <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{page.section}</span>
                </button>
              ))}
              {!query.trim() && (
                <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Start typing to search...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
