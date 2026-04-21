'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon, Github, Menu, X, ExternalLink } from 'lucide-react';

export function TopBar({ onMenuToggle, sidebarOpen }: { onMenuToggle: () => void; sidebarOpen: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (href: string) => {
    const section = href.split('/')[1];
    return pathname.startsWith(`/${section}`);
  };

  return (
    <header
      className="fixed top-3 left-3 right-3 h-14 z-50 rounded-2xl border"
      style={{
        background: 'color-mix(in srgb, var(--color-surface) 75%, transparent)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderColor: 'color-mix(in srgb, var(--color-outline) 50%, transparent)',
      }}
    >
      <div className="flex items-center justify-between h-full px-4 lg:px-5">
        {/* Left: logo + mobile toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl transition-colors"
            style={{ color: 'var(--color-on-surface-variant)' }}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-tarmac-red rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-semibold text-[13px] leading-tight tracking-tight" style={{ color: 'var(--color-on-surface)' }}>
                TARMAC
              </span>
              <span className="text-[9px] tracking-[0.12em] font-medium" style={{ color: 'var(--color-on-surface-variant)' }}>
                DESIGN SYSTEM
              </span>
            </div>
          </Link>
        </div>

        {/* Center: nav links */}
        <nav className="hidden md:flex items-center gap-0.5">
          <NavLink href="/about/overview" active={isActive('/about')}>About</NavLink>
          <NavLink href="/foundations/colors" active={isActive('/foundations')}>Foundations</NavLink>
          <NavLink href="/components/button" active={isActive('/components')}>Components</NavLink>
          <NavLink href="/accessibility/overview" active={isActive('/accessibility')}>Accessibility</NavLink>
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-0.5">
          <a
            href="https://tarmac-storybook-dev.pntrzz.com/storybook/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            Storybook
            <ExternalLink size={11} />
          </a>
          <a
            href="https://github.com/abhishekthakur3-sketch/TDS"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-on-surface-variant)' }}
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'var(--color-on-surface-variant)' }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 text-[13px] font-medium rounded-lg transition-colors"
      style={{
        color: active ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
        background: active ? 'var(--color-primary-container)' : 'transparent',
      }}
    >
      {children}
    </Link>
  );
}
