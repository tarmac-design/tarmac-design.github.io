'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  // Determine which sections to show based on current path
  const currentSection = pathname.split('/')[1];
  const relevantSections = nav.filter((section) =>
    section.items.some((item) => item.href.startsWith(`/${currentSection}`))
  );

  // If on homepage, don't show sidebar
  if (pathname === '/') return null;

  return (
    <aside
      className="fixed top-[var(--topbar-height)] left-0 w-[var(--sidebar-width)] h-[calc(100vh-var(--topbar-height))] overflow-y-auto z-30 border-r"
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-outline)',
      }}
    >
      <nav className="py-4 px-3">
        {relevantSections.length > 0
          ? relevantSections.map((section) => (
              <div key={section.title} className="mb-4">
                <h3
                  className="text-[11px] font-semibold uppercase tracking-wider px-3 mb-1.5"
                  style={{ color: 'var(--color-on-surface-variant)' }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block px-3 py-1.5 rounded-lg text-[13px] transition-all"
                          style={{
                            color: isActive
                              ? 'var(--color-primary)'
                              : 'var(--color-on-surface-variant)',
                            background: isActive
                              ? 'var(--color-primary-container)'
                              : 'transparent',
                            fontWeight: isActive ? 600 : 400,
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          : nav.map((section) => (
              <div key={section.title} className="mb-4">
                <h3
                  className="text-[11px] font-semibold uppercase tracking-wider px-3 mb-1.5"
                  style={{ color: 'var(--color-on-surface-variant)' }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-0.5">
                  {section.items.slice(0, 3).map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-3 py-1.5 rounded-lg text-[13px] transition-all"
                        style={{ color: 'var(--color-on-surface-variant)' }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  {section.items.length > 3 && (
                    <li>
                      <Link
                        href={section.items[0].href}
                        className="block px-3 py-1 text-[12px]"
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        View all {section.items.length} →
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
      </nav>
    </aside>
  );
}
