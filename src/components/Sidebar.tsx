'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavItem { label: string; href: string; }
interface NavGroup { title: string; items: NavItem[]; }

const nav: NavGroup[] = [
  {
    title: 'Introduction',
    items: [
      { label: 'Overview', href: '/about/overview' },
      { label: 'Philosophy', href: '/about/philosophy' },
      { label: 'Brand Language', href: '/about/brand-language' },
      { label: 'Movement Metaphors', href: '/about/movement-metaphors' },
      { label: 'Installation', href: '/getting-started/installation' },
      { label: 'Quick Start', href: '/getting-started/quick-start' },
    ],
  },
  {
    title: 'Foundations',
    items: [
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
      { label: 'Logo', href: '/about/logo' },
      { label: 'Image Library', href: '/foundations/image-library' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Avatar', href: '/components/avatar' },
      { label: 'Button', href: '/components/button' },
      { label: 'Checkbox', href: '/components/checkbox' },
      { label: 'Radio', href: '/components/radio' },
      { label: 'Input', href: '/components/input' },
      { label: 'Input Area', href: '/components/input-area' },
      { label: 'Dropdown', href: '/components/dropdown' },
      { label: 'Search', href: '/components/search' },
      { label: 'Shimmer', href: '/components/shimmer' },
      { label: 'Scroll', href: '/components/scroll' },
      { label: 'Header', href: '/components/header' },
      { label: 'Footer', href: '/components/footer' },
      { label: 'Rating', href: '/components/rating' },
      { label: 'File Upload', href: '/components/file-upload' },
      { label: 'Date Time Picker', href: '/components/date-time-picker' },
      { label: 'Filter', href: '/components/filter' },
      { label: 'Dialog Box', href: '/components/dialog-box' },
      { label: 'List', href: '/components/list' },
      { label: 'Popups', href: '/components/popups' },
      { label: 'Side Drawer', href: '/components/side-drawer' },
      { label: 'Bottom Sheet', href: '/components/bottom-sheet' },
      { label: 'Navigation', href: '/components/navigation' },
      { label: 'Cards', href: '/components/cards' },
      { label: 'Badge', href: '/components/badge' },
      { label: 'Tags', href: '/components/tags' },
      { label: 'Pills', href: '/components/pills' },
      { label: 'Alert', href: '/components/alert' },
      { label: 'Progress Bar', href: '/components/progress-bar' },
      { label: 'Snackbar', href: '/components/snackbar' },
      { label: 'Accordion', href: '/components/accordion' },
      { label: 'Coachmarks', href: '/components/coachmarks' },
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Breadcrumbs', href: '/components/breadcrumbs' },
      { label: 'Toggle', href: '/components/toggle' },
      { label: 'Status Indicator', href: '/components/status-indicator' },
      { label: 'Links', href: '/components/links' },
      { label: 'Slider', href: '/components/slider' },
      { label: 'Stepper', href: '/components/stepper' },
      { label: 'Spinner', href: '/components/spinner' },
      { label: 'Pagination', href: '/components/pagination' },
      { label: 'Tooltip', href: '/components/tooltip' },
      { label: 'Audio Player', href: '/components/audio-player' },
      { label: 'OTP Fields', href: '/components/otp-fields' },
    ],
  },
  {
    title: 'Patterns',
    items: [
      { label: 'Layout', href: '/patterns/layout' },
      { label: 'Forms', href: '/patterns/forms' },
    ],
  },
  {
    title: 'Accessibility',
    items: [
      { label: 'Overview', href: '/accessibility/overview' },
      { label: 'Guidelines', href: '/accessibility/guidelines' },
      { label: 'Keyboard Navigation', href: '/accessibility/keyboard-navigation' },
      { label: 'Screen Readers', href: '/accessibility/screen-readers' },
      { label: 'Color Contrast', href: '/accessibility/color-contrast' },
      { label: 'Focus Management', href: '/accessibility/focus-management' },
      { label: 'Testing', href: '/accessibility/testing' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Contact Us', href: '/contact/contact-us' },
    ],
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function NavSection({ section }: { section: NavGroup }) {
  const pathname = usePathname();
  const hasActive = section.items.some((item) => pathname === item.href);
  const [open, setOpen] = useState(hasActive);

  return (
    <div className="mb-0.5">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 w-full px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${
          hasActive ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
        }`}
      >
        <ChevronIcon open={open} />
        <span>{section.title}</span>
      </button>
      {open && (
        <div className="ml-[18px] mt-0.5 border-l border-neutral-200">
          {section.items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block pl-3 py-[5px] text-[13px] transition-colors border-l -ml-px ${
                  active
                    ? 'border-neutral-900 text-neutral-900 font-medium'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-400'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed top-[var(--header-height)] left-0 w-[var(--sidebar-width)] h-[calc(100vh-var(--header-height))] border-r border-neutral-200 bg-white overflow-y-auto z-30">
      <nav className="py-4 px-3">
        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3 px-2">Documentation</p>
        {nav.map((section) => (
          <NavSection key={section.title} section={section} />
        ))}
      </nav>
    </aside>
  );
}
