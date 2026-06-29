'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

type NavLink = { label: string; href: string };
type NavGroup = { title: string; items: NavLink[] };

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
    { label: 'Input Field', href: '/components/input' },
    { label: 'Text Area', href: '/components/input-area' },
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

/* ── Search trigger button (opens the global ⌘K search) ── */
function SidebarSearch({ onSearchClick }: { onSearchClick?: () => void }) {
  return (
    <button
      onClick={onSearchClick}
      className="sidebar-search-btn"
      aria-label="Search"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" style={{ opacity: 0.5 }}>
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span style={{ opacity: 0.4 }}>Search...</span>
      <kbd className="sidebar-search-kbd">⌘K</kbd>
    </button>
  );
}

/* ── Single group — always open, flat list ── */
function SidebarGroup({ group }: { group: NavGroup }) {
  const pathname = usePathname();

  return (
    <div className="sidebar-group">
      <h3 className="sidebar-group-title">{group.title}</h3>
      <ul className="sidebar-group-list">
        {group.items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`sidebar-nav-link ${isActive ? 'sidebar-nav-link-active' : ''}`}
              >
                {/* Left accent bar for active item */}
                <span className={`sidebar-accent-bar ${isActive ? 'sidebar-accent-bar-active' : ''}`} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Sidebar({ open, onClose, onSearchClick }: { open?: boolean; onClose?: () => void; onSearchClick?: () => void }) {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const sidebarContent = (
    <nav className="sidebar-nav">
      <SidebarSearch onSearchClick={onSearchClick} />
      {sidebarSections.map((group) => (
        <SidebarGroup key={group.title} group={group} />
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:block fixed left-0 top-16 w-[var(--sidebar-width)] h-[calc(100vh-64px)] overflow-y-auto z-30 border-r sidebar-scroll"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-outline)' }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.aside
              className="lg:hidden fixed left-0 top-16 w-[min(280px,85vw)] h-[calc(100vh-64px)] overflow-y-auto z-50 border-r"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-outline)' }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
