'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const nav = [
  {
    title: 'Introduction',
    items: [
      { label: 'Overview', href: '/about/overview' },
      { label: 'Philosophy', href: '/about/philosophy' },
      { label: 'Brand Language', href: '/about/brand-language' },
      { label: 'Movement Metaphors', href: '/about/movement-metaphors' },
    ],
  },
  {
    title: 'Getting Started',
    items: [
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
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="fixed top-0 left-0 w-[var(--sidebar-width)] h-screen border-r border-neutral-200 bg-neutral-50 overflow-y-auto z-40">
      <div className="p-6 border-b border-neutral-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-tarmac-red rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm leading-tight">TARMAC</span>
            <span className="text-[10px] text-neutral-400 tracking-widest">Design System</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <a
          href="https://tarmac-storybook-dev.pntrzz.com/storybook/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 hover:text-tarmac-blue transition-colors"
        >
          Storybook ↗
        </a>
        <span className="text-neutral-300">·</span>
        <a
          href="https://github.com/abhishekthakur3-sketch/TDS"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 hover:text-tarmac-blue transition-colors"
        >
          GitHub ↗
        </a>
      </div>

      <nav className="p-4 pt-2">
        {nav.map((section) => {
          const isCollapsed = collapsed[section.title];
          const hasActive = section.items.some((item) => pathname === item.href);
          return (
            <div key={section.title} className="mb-2">
              <button
                onClick={() => toggle(section.title)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider hover:text-neutral-600 transition-colors"
              >
                <span>{section.title}</span>
                <span className={`transition-transform text-[10px] ${isCollapsed ? '-rotate-90' : ''}`}>▾</span>
              </button>
              {!isCollapsed && (
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
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
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
