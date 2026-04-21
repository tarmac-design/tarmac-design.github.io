'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Section = { title: string; icon: string; items: { label: string; href: string }[] };

const getStartedSections: Section[] = [
  { title: 'Get Started', icon: '🚀', items: [
    { label: 'Overview', href: '/about/overview' },
    { label: 'Philosophy', href: '/about/philosophy' },
    { label: 'Brand Language', href: '/about/brand-language' },
    { label: 'Movement Metaphors', href: '/about/movement-metaphors' },
    { label: 'Logo', href: '/about/logo' },
  ]},
  { title: 'Setup', icon: '⚙️', items: [
    { label: 'Installation', href: '/getting-started/installation' },
    { label: 'Quick Start', href: '/getting-started/quick-start' },
  ]},
];

const sectionMap: Record<string, Section[]> = {
  about: getStartedSections,
  'getting-started': getStartedSections,
  foundations: [
    { title: 'Colors', icon: '🎨', items: [
      { label: 'Colors', href: '/foundations/colors' },
      { label: 'Color Palette', href: '/foundations/colors-palette' },
      { label: 'Colors Implementation', href: '/foundations/colors-implementation' },
    ]},
    { title: 'Typography', icon: '🔤', items: [
      { label: 'Typography', href: '/foundations/typography' },
      { label: 'Typography Styles', href: '/foundations/typography-styles' },
      { label: 'Typography Implementation', href: '/foundations/typography-implementation' },
    ]},
    { title: 'Grid', icon: '📐', items: [
      { label: 'Grid System', href: '/foundations/grid-system' },
      { label: 'Grid Advanced', href: '/foundations/grid-advanced' },
      { label: 'Grid Implementation', href: '/foundations/grid-implementation' },
    ]},
    { title: 'Tokens', icon: '🎯', items: [
      { label: 'Iconography', href: '/foundations/iconography' },
      { label: 'Spacing', href: '/foundations/spacing' },
      { label: 'Radius', href: '/foundations/radius' },
      { label: 'Borders', href: '/foundations/borders' },
      { label: 'Shadows', href: '/foundations/shadows' },
      { label: 'Dividers', href: '/foundations/dividers' },
      { label: 'Image Library', href: '/foundations/image-library' },
    ]},
  ],
  components: [
    { title: 'Inputs', icon: '✏️', items: [
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
    ]},
    { title: 'Display', icon: '👁️', items: [
      { label: 'Avatar', href: '/components/avatar' },
      { label: 'Badge', href: '/components/badge' },
      { label: 'Tags', href: '/components/tags' },
      { label: 'Pills', href: '/components/pills' },
      { label: 'Cards', href: '/components/cards' },
      { label: 'List', href: '/components/list' },
      { label: 'Status Indicator', href: '/components/status-indicator' },
      { label: 'Shimmer', href: '/components/shimmer' },
      { label: 'Spinner', href: '/components/spinner' },
      { label: 'Progress Bar', href: '/components/progress-bar' },
    ]},
    { title: 'Navigation', icon: '🧭', items: [
      { label: 'Navigation', href: '/components/navigation' },
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Breadcrumbs', href: '/components/breadcrumbs' },
      { label: 'Links', href: '/components/links' },
      { label: 'Pagination', href: '/components/pagination' },
      { label: 'Stepper', href: '/components/stepper' },
    ]},
    { title: 'Feedback', icon: '💬', items: [
      { label: 'Alert', href: '/components/alert' },
      { label: 'Snackbar', href: '/components/snackbar' },
      { label: 'Tooltip', href: '/components/tooltip' },
      { label: 'Coachmarks', href: '/components/coachmarks' },
    ]},
    { title: 'Overlay', icon: '🪟', items: [
      { label: 'Dialog Box', href: '/components/dialog-box' },
      { label: 'Popups', href: '/components/popups' },
      { label: 'Side Drawer', href: '/components/side-drawer' },
      { label: 'Bottom Sheet', href: '/components/bottom-sheet' },
    ]},
    { title: 'Layout', icon: '📦', items: [
      { label: 'Header', href: '/components/header' },
      { label: 'Footer', href: '/components/footer' },
      { label: 'Scroll', href: '/components/scroll' },
      { label: 'Accordion', href: '/components/accordion' },
      { label: 'Audio Player', href: '/components/audio-player' },
    ]},
  ],
  patterns: [
    { title: 'Patterns', icon: '🔷', items: [
      { label: 'Layout', href: '/patterns/layout' },
      { label: 'Forms', href: '/patterns/forms' },
    ]},
  ],
  accessibility: [
    { title: 'Accessibility', icon: '♿', items: [
      { label: 'Overview', href: '/accessibility/overview' },
      { label: 'Guidelines', href: '/accessibility/guidelines' },
      { label: 'Keyboard Navigation', href: '/accessibility/keyboard-navigation' },
      { label: 'Screen Readers', href: '/accessibility/screen-readers' },
      { label: 'Color Contrast', href: '/accessibility/color-contrast' },
      { label: 'Focus Management', href: '/accessibility/focus-management' },
      { label: 'Testing', href: '/accessibility/testing' },
    ]},
  ],
};

export function Sidebar() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const currentSection = pathname.split('/')[1];
  const sections = sectionMap[currentSection] || [];
  if (sections.length === 0) return null;

  return (
    <aside
      className="fixed left-4 top-[calc(var(--topbar-offset)+8px)] w-[var(--sidebar-width)] max-h-[calc(100vh-var(--topbar-offset)-24px)] overflow-y-auto z-30 rounded-2xl border p-3"
      style={{
        background: 'color-mix(in srgb, var(--color-surface) 70%, transparent)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderColor: 'color-mix(in srgb, var(--color-outline) 50%, transparent)',
      }}
    >
      <nav>
        {sections.map((section) => (
          <div key={section.title} className="mb-3">
            <h3
              className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-3 mb-1"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              <span className="text-xs">{section.icon}</span>
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
                        color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                        background: isActive ? 'var(--color-primary-container)' : 'transparent',
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
        ))}
      </nav>
    </aside>
  );
}
