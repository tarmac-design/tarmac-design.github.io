'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const allPages = [
  { label: 'Overview', href: '/about/overview' },
  { label: 'Philosophy', href: '/about/philosophy' },
  { label: 'Brand Language', href: '/about/brand-language' },
  { label: 'Movement Metaphors', href: '/about/movement-metaphors' },
  { label: 'Logo', href: '/about/logo' },
  { label: 'Installation', href: '/getting-started/installation' },
  { label: 'Quick Start', href: '/getting-started/quick-start' },
  { label: 'Colors', href: '/foundations/colors' },
  { label: 'Color Palette', href: '/foundations/colors-palette' },
  { label: 'Colors Implementation', href: '/foundations/colors-implementation' },
  { label: 'Typography', href: '/foundations/typography' },
  { label: 'Typography Styles', href: '/foundations/typography-styles' },
  { label: 'Typography Implementation', href: '/foundations/typography-implementation' },
  { label: 'Grid System', href: '/foundations/grid-system' },
  { label: 'Grid Advanced', href: '/foundations/grid-advanced' },
  { label: 'Grid Implementation', href: '/foundations/grid-implementation' },
  { label: 'Iconography', href: '/foundations/iconography' },
  { label: 'Spacing', href: '/foundations/spacing' },
  { label: 'Radius', href: '/foundations/radius' },
  { label: 'Borders', href: '/foundations/borders' },
  { label: 'Shadows', href: '/foundations/shadows' },
  { label: 'Dividers', href: '/foundations/dividers' },
  { label: 'Image Library', href: '/foundations/image-library' },
  { label: 'Avatar', href: '/components/avatar' },
  { label: 'Button', href: '/components/button' },
  { label: 'Checkbox', href: '/components/checkbox' },
  { label: 'Radio', href: '/components/radio' },
  { label: 'Input', href: '/components/input' },
  { label: 'Input Area', href: '/components/input-area' },
  { label: 'Dropdown', href: '/components/dropdown' },
  { label: 'Search', href: '/components/search' },
  { label: 'Toggle', href: '/components/toggle' },
  { label: 'Slider', href: '/components/slider' },
  { label: 'OTP Fields', href: '/components/otp-fields' },
  { label: 'File Upload', href: '/components/file-upload' },
  { label: 'Date Time Picker', href: '/components/date-time-picker' },
  { label: 'Filter', href: '/components/filter' },
  { label: 'Rating', href: '/components/rating' },
  { label: 'Badge', href: '/components/badge' },
  { label: 'Tags', href: '/components/tags' },
  { label: 'Pills', href: '/components/pills' },
  { label: 'Cards', href: '/components/cards' },
  { label: 'List', href: '/components/list' },
  { label: 'Status Indicator', href: '/components/status-indicator' },
  { label: 'Shimmer', href: '/components/shimmer' },
  { label: 'Spinner', href: '/components/spinner' },
  { label: 'Progress Bar', href: '/components/progress-bar' },
  { label: 'Navigation', href: '/components/navigation' },
  { label: 'Tabs', href: '/components/tabs' },
  { label: 'Breadcrumbs', href: '/components/breadcrumbs' },
  { label: 'Links', href: '/components/links' },
  { label: 'Pagination', href: '/components/pagination' },
  { label: 'Stepper', href: '/components/stepper' },
  { label: 'Alert', href: '/components/alert' },
  { label: 'Snackbar', href: '/components/snackbar' },
  { label: 'Tooltip', href: '/components/tooltip' },
  { label: 'Coachmarks', href: '/components/coachmarks' },
  { label: 'Dialog Box', href: '/components/dialog-box' },
  { label: 'Popups', href: '/components/popups' },
  { label: 'Side Drawer', href: '/components/side-drawer' },
  { label: 'Bottom Sheet', href: '/components/bottom-sheet' },
  { label: 'Header', href: '/components/header' },
  { label: 'Footer', href: '/components/footer' },
  { label: 'Scroll', href: '/components/scroll' },
  { label: 'Accordion', href: '/components/accordion' },
  { label: 'Audio Player', href: '/components/audio-player' },
  { label: 'Layout', href: '/patterns/layout' },
  { label: 'Forms', href: '/patterns/forms' },
  { label: 'Accessibility Overview', href: '/accessibility/overview' },
  { label: 'Guidelines', href: '/accessibility/guidelines' },
  { label: 'Keyboard Navigation', href: '/accessibility/keyboard-navigation' },
  { label: 'Screen Readers', href: '/accessibility/screen-readers' },
  { label: 'Color Contrast', href: '/accessibility/color-contrast' },
  { label: 'Focus Management', href: '/accessibility/focus-management' },
  { label: 'Testing', href: '/accessibility/testing' },
];

export function PageFooter() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const idx = allPages.findIndex((p) => p.href === pathname);
  const prev = idx > 0 ? allPages[idx - 1] : null;
  const next = idx < allPages.length - 1 ? allPages[idx + 1] : null;

  return (
    <footer className="ml-[calc(var(--sidebar-width)+32px)] mr-[240px] xl:mr-[280px] max-w-3xl px-8 pb-16">
      {/* Prev / Next */}
      {(prev || next) && (
        <div
          className="grid grid-cols-2 gap-4 mb-12 pt-8 border-t"
          style={{ borderColor: 'var(--color-outline)' }}
        >
          {prev ? (
            <Link
              href={prev.href}
              className="group p-4 rounded-xl border transition-all hover:shadow-sm"
              style={{ borderColor: 'var(--color-outline)' }}
            >
              <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                ← Previous
              </span>
              <span
                className="block text-sm font-semibold mt-1"
                style={{ color: 'var(--color-on-surface)' }}
              >
                {prev.label}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={next.href}
              className="group p-4 rounded-xl border text-right transition-all hover:shadow-sm"
              style={{ borderColor: 'var(--color-outline)' }}
            >
              <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                Up next →
              </span>
              <span
                className="block text-sm font-semibold mt-1"
                style={{ color: 'var(--color-on-surface)' }}
              >
                {next.label}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}

      {/* Delhivery footer */}
      <div
        className="rounded-2xl border p-8"
        style={{
          background: 'var(--color-surface-container-low)',
          borderColor: 'var(--color-outline)',
        }}
      >
        <div className="flex items-start justify-between flex-wrap gap-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="6" fill="#ED1B36" />
                <rect x="6" y="6" width="16" height="3.5" fill="#FFF" />
                <rect x="6" y="6" width="3.5" height="16" fill="#FFF" />
              </svg>
              <span className="font-bold text-sm" style={{ color: 'var(--color-on-surface)' }}>
                TARMAC Design System
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
              TARMAC is Delhivery's unified design system — the single source of truth for design decisions, UI components, and interaction patterns. Built to scale across all Delhivery products.
            </p>
          </div>
          <div className="flex gap-12 text-xs">
            <div>
              <p className="font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>Delhivery</p>
              <ul className="space-y-1.5" style={{ color: 'var(--color-on-surface-variant)' }}>
                <li><a href="https://www.delhivery.com" target="_blank" rel="noopener noreferrer" className="hover:underline">delhivery.com</a></li>
                <li><a href="https://www.delhivery.com/about-us" target="_blank" rel="noopener noreferrer" className="hover:underline">About Us</a></li>
                <li><a href="https://www.delhivery.com/careers" target="_blank" rel="noopener noreferrer" className="hover:underline">Careers</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>Resources</p>
              <ul className="space-y-1.5" style={{ color: 'var(--color-on-surface-variant)' }}>
                <li><a href="https://tarmac-storybook-dev.pntrzz.com/storybook/" target="_blank" rel="noopener noreferrer" className="hover:underline">Storybook</a></li>
                <li><a href="https://github.com/abhishekthakur3-sketch/TDS" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></li>
                <li><a href="https://www.figma.com/design/fPg3J4ckTHzyIQp8PrqDjT" target="_blank" rel="noopener noreferrer" className="hover:underline">Figma</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="mt-6 pt-4 border-t text-[11px]"
          style={{ borderColor: 'var(--color-outline)', color: 'var(--color-on-surface-variant)' }}
        >
          © {new Date().getFullYear()} Delhivery Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
