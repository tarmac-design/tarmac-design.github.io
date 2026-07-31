'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const allPages = [
  // Get Started
  { label: 'Introduction to TARMAC', href: '/about/overview' },
  { label: 'Philosophy', href: '/about/philosophy' },
  { label: 'Brand Language', href: '/about/brand-language' },
  { label: 'Movement Metaphors', href: '/about/movement-metaphors' },
  { label: 'TARMAC Logo', href: '/about/logo' },
  { label: 'Installation', href: '/getting-started/installation' },
  { label: 'Quick Start', href: '/getting-started/quick-start' },
  // Foundations
  { label: 'Colors', href: '/foundations/colors' },
  { label: 'Typography', href: '/foundations/typography' },
  { label: 'Grid System', href: '/foundations/grid-system' },
  { label: 'Iconography', href: '/foundations/iconography' },
  { label: 'Spacing', href: '/foundations/spacing' },
  { label: 'Radius', href: '/foundations/radius' },
  { label: 'Borders', href: '/foundations/borders' },
  { label: 'Shadows', href: '/foundations/shadows' },
  { label: 'Dividers', href: '/foundations/dividers' },
  { label: 'Logo', href: '/foundations/logo' },
  { label: 'Illustration', href: '/foundations/illustration' },
  { label: 'Image Library', href: '/foundations/image-library' },
  // Components (alphabetical)
  { label: 'Accordion', href: '/components/accordion' },
  { label: 'Alert', href: '/components/alert' },
  { label: 'Avatar', href: '/components/avatar' },
  { label: 'Avatar Group', href: '/components/avatar-group' },
  { label: 'Badge', href: '/components/badge' },
  { label: 'Bottom Sheet', href: '/components/bottom-sheet' },
  { label: 'Breadcrumbs', href: '/components/breadcrumbs' },
  { label: 'Button', href: '/components/button' },
  { label: 'Card Block', href: '/components/card-block' },
  { label: 'Cards', href: '/components/cards' },
  { label: 'Carousel', href: '/components/carousel' },
  { label: 'Checkbox', href: '/components/checkbox' },
  { label: 'Coachmarks', href: '/components/coachmarks' },
  { label: 'Date Time Picker', href: '/components/date-time-picker' },
  { label: 'Dialog Box', href: '/components/dialog-box' },
  { label: 'Dropdown', href: '/components/dropdown' },
  { label: 'FAB', href: '/components/fab' },
  { label: 'File Upload', href: '/components/file-upload' },
  { label: 'Filter', href: '/components/filter' },
  { label: 'Footer', href: '/components/footer' },
  { label: 'Header', href: '/components/header' },
  { label: 'Input', href: '/components/input' },
  { label: 'Input Area', href: '/components/input-area' },
  { label: 'Links', href: '/components/links' },
  { label: 'List', href: '/components/list' },
  { label: 'Menu', href: '/components/menu' },
  { label: 'Navigation', href: '/components/navigation' },
  { label: 'OTP Fields', href: '/components/otp-fields' },
  { label: 'Pagination', href: '/components/pagination' },
  { label: 'Pills', href: '/components/pills' },
  { label: 'Popups', href: '/components/popups' },
  { label: 'Progress Bar', href: '/components/progress-bar' },
  { label: 'Radio', href: '/components/radio' },
  { label: 'Rating', href: '/components/rating' },
  { label: 'Scroll', href: '/components/scroll' },
  { label: 'Search', href: '/components/search' },
  { label: 'Shimmer', href: '/components/shimmer' },
  { label: 'Side Drawer', href: '/components/side-drawer' },
  { label: 'Slider', href: '/components/slider' },
  { label: 'Snackbar', href: '/components/snackbar' },
  { label: 'Spinner', href: '/components/spinner' },
  { label: 'Status Indicator', href: '/components/status-indicator' },
  { label: 'Stepper', href: '/components/stepper' },
  { label: 'Table', href: '/components/table' },
  { label: 'Tabs', href: '/components/tabs' },
  { label: 'Tags', href: '/components/tags' },
  { label: 'Toggle', href: '/components/toggle' },
  { label: 'Tooltip', href: '/components/tooltip' },
  // Accessibility
  { label: 'Accessibility Overview', href: '/accessibility/overview' },
  { label: 'Guidelines', href: '/accessibility/guidelines' },
  { label: 'Keyboard Navigation', href: '/accessibility/keyboard-navigation' },
  { label: 'Screen Readers', href: '/accessibility/screen-readers' },
  { label: 'Color Contrast', href: '/accessibility/color-contrast' },
  { label: 'Testing', href: '/accessibility/testing' },
];

export function PageFooter() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const idx = allPages.findIndex((p) => p.href === pathname);
  const prev = idx > 0 ? allPages[idx - 1] : null;
  const next = idx < allPages.length - 1 ? allPages[idx + 1] : null;

  return (
    <footer className="pb-12">
      <div className="px-5 lg:pl-24 lg:pr-24">
        {(prev || next) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t" style={{ borderColor: 'var(--color-outline)' }}>
            {prev ? (
              <Link href={prev.href} className="group p-4 rounded-lg border transition-colors" style={{ borderColor: 'var(--color-outline)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-outline)'}
              >
                <span className="text-xs block mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>← Previous</span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface)' }}>{prev.label}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={next.href} className="group p-4 rounded-lg border text-right transition-colors" style={{ borderColor: 'var(--color-outline)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-outline)'}
              >
                <span className="text-xs block mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>Up next →</span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface)' }}>{next.label}</span>
              </Link>
            ) : <div />}
          </div>
        )}

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2" style={{ borderColor: 'var(--color-outline)' }}>
          <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
            © {new Date().getFullYear()} Delhivery Ltd. All rights reserved.
          </span>
          <div className="flex items-center gap-4 text-xs flex-wrap" style={{ color: 'var(--color-on-surface-variant)' }}>
            <span className="flex items-center gap-1">
              Crafted with <span className="inline-block" style={{ animation: 'heartPulse 2s ease-in-out infinite', color: '#ED1B36' }}>&#10084;</span>
            </span>
            <a href="https://www.delhivery.com" target="_blank" rel="noopener noreferrer" className="hover:underline">delhivery.com</a>
            <a href="https://github.com/abhishekthakur3-sketch/TDS" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
