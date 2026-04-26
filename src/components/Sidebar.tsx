'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type NavLink = { label: string; href: string };
type NavSubGroup = { title: string; children: NavLink[] };
type NavItem = NavLink | NavSubGroup;
type NavGroup = { title: string; items: NavItem[] };

function isSubGroup(item: NavItem): item is NavSubGroup {
  return 'children' in item;
}

const sidebarSections: NavGroup[] = [
  { title: 'Get Started', items: [
    { label: 'Introduction to TARMAC', href: '/about/overview' },
    { label: 'Philosophy', href: '/about/philosophy' },
    { label: 'Brand Language', href: '/about/brand-language' },
    { label: 'Movement Metaphors', href: '/about/movement-metaphors' },
    { label: 'TARMAC Logo', href: '/about/logo' },
    { label: 'Installation', href: '/getting-started/installation' },
    { label: 'Quick Start', href: '/getting-started/quick-start' },
  ]},
  { title: 'Foundations', items: [
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
  ]},
  { title: 'Components', items: [
    { label: 'Accordion', href: '/components/accordion' },
    { label: 'Alert', href: '/components/alert' },
    { label: 'Audio Player', href: '/components/audio-player' },
    { label: 'Avatar', href: '/components/avatar' },
    { label: 'Avatar Group', href: '/components/avatar-group' },
    { label: 'Badge', href: '/components/badge' },
    { label: 'Bottom Sheet', href: '/components/bottom-sheet' },
    { label: 'Breadcrumbs', href: '/components/breadcrumbs' },
    { label: 'Button', href: '/components/button' },
    { label: 'Cards', href: '/components/cards' },
    { label: 'Checkbox', href: '/components/checkbox' },
    { label: 'Coachmarks', href: '/components/coachmarks' },
    { label: 'Date Time Picker', href: '/components/date-time-picker' },
    { label: 'Dialog Box', href: '/components/dialog-box' },
    { label: 'Dropdown', href: '/components/dropdown' },
    { label: 'File Upload', href: '/components/file-upload' },
    { label: 'Filter', href: '/components/filter' },
    { label: 'Footer', href: '/components/footer' },
    { label: 'Header', href: '/components/header' },
    { label: 'Input', href: '/components/input' },
    { label: 'Input Area', href: '/components/input-area' },
    { label: 'Links', href: '/components/links' },
    { label: 'List', href: '/components/list' },
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
    { label: 'Tabs', href: '/components/tabs' },
    { label: 'Tags', href: '/components/tags' },
    { label: 'Toggle', href: '/components/toggle' },
    { label: 'Tooltip', href: '/components/tooltip' },
  ]},
  { title: 'Patterns', items: [
    { label: 'Layout', href: '/patterns/layout' },
    { label: 'Forms', href: '/patterns/forms' },
  ]},
  { title: 'Accessibility', items: [
    { label: 'Overview', href: '/accessibility/overview' },
    { label: 'Guidelines', href: '/accessibility/guidelines' },
    { label: 'Keyboard Navigation', href: '/accessibility/keyboard-navigation' },
    { label: 'Screen Readers', href: '/accessibility/screen-readers' },
    { label: 'Color Contrast', href: '/accessibility/color-contrast' },
    { label: 'Focus Management', href: '/accessibility/focus-management' },
    { label: 'Testing', href: '/accessibility/testing' },
  ]},
];

function SidebarSubGroup({ sub }: { sub: NavSubGroup }) {
  const pathname = usePathname();
  const hasActive = sub.children.some(c => c.href === pathname);
  const [open, setOpen] = useState(hasActive);

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2 pl-3 pr-3 py-2.5 text-[13px] rounded-lg sidebar-link ${hasActive ? 'font-semibold' : ''}`}
        style={{ color: hasActive ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)' }}
      >
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className="shrink-0"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        {sub.title}
      </button>
      {open && (
        <ul>
          {sub.children.map((child) => {
            const isActive = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={`block pl-9 pr-3 py-2 text-[13px] rounded-lg sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                  style={{ color: isActive ? undefined : 'var(--color-on-surface-variant)' }}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

function SidebarGroup({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  const allHrefs = group.items.flatMap(item =>
    isSubGroup(item) ? item.children.map(c => c.href) : [item.href]
  );
  const hasActive = allHrefs.includes(pathname);
  const [open, setOpen] = useState(hasActive);

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-semibold rounded-lg sidebar-link"
        style={{ color: 'var(--color-on-surface)' }}
      >
        {group.title}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s', color: 'var(--color-on-surface-variant)' }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {open && (
        <ul className="mt-0.5">
          {group.items.map((item) => {
            if (isSubGroup(item)) {
              return <SidebarSubGroup key={item.title} sub={item} />;
            }
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block pl-9 pr-3 py-2.5 text-[13px] rounded-lg sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                  style={{
                    color: isActive ? undefined : 'var(--color-on-surface-variant)',
                  }}
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
}

export function Sidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const sidebarContent = (
    <nav className="py-3 px-2">
      {sidebarSections.map((group) => (
        <SidebarGroup key={group.title} group={group} />
      ))}
    </nav>
  );

  return (
    <>
      <aside
        className="hidden lg:block fixed left-0 top-16 w-[var(--sidebar-width)] h-[calc(100vh-64px)] overflow-y-auto z-30 border-r sidebar-scroll"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-outline)' }}
      >
        {sidebarContent}
      </aside>

      {open && (
        <>
          <div className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
          <aside
            className="lg:hidden fixed left-0 top-16 w-[min(280px,85vw)] h-[calc(100vh-64px)] overflow-y-auto z-50 border-r"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-outline)' }}
          >
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
